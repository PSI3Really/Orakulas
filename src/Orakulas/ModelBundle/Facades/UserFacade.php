<?php

namespace Orakulas\ModelBundle\Facades;

use Orakulas\ModelBundle\Facades\EntityFacade;
use Orakulas\ModelBundle\Entity\User;

class UserFacade extends EntityFacade
{

    const HASH_ALGO = 'sha512';
    const SALT_LEN = 10;

    private $encoder;

    public function setEncoder($encoder)
    {
        $this->encoder = $encoder;
    }

    /**
     * @throws \InvalidArgumentException if $username or $password is NULL
     * @param \string $username
     * @param \string $password
     * @return \Orakulas\ModelBundle\Entity\User type object with hashed password if $username was successfully authenticated with given $password. Otherwise returns NULL.
     */
    public function authenticate($username, $password)
    {
        if ($username == NULL || $password == NULL)
        {
            throw new \InvalidArgumentException('parameters $user and $password cannot be null');
        }

        $entityUser = $this->loadByUserName($username);

        if ($entityUser != NULL)
        {
            if (strcmp($this->encoder->encodePassword($password, $entityUser->getSalt()), $entityUser->getPassword()) == 0)
            {
                return $entityUser;
            }
        }
        else
        {
            throw new UserFacadeException("user '$username' does not exist");
        }

        return NULL;
    }

    /**
     * Persists a $user into database, at first hashing it's password
     *
     * @throws \InvalidArgumentException if $user is NULL
     * @throws \Orakulas\ModelBundle\Facades\UserFacadeException if username already exists or password is unspecified
     * @param \Orakulas\ModelBundle\Entity\User $user
     * @return void
     */
    public function save($user)
    {
        if ($user == NULL)
        {
            throw new \InvalidArgumentException('parameter $user cannot be null');
        }

        $entityUser = $this->loadByUserName($user->getUserName());

        if ($entityUser != NULL)
        {
            $entityUser->setAdmin($user->isAdmin());
            $entityUser->setEmail($user->getEmail());
            $entityUser->setFirstName($user->getFirstName());
            $entityUser->setLastName($user->getLastName());

            if ($user->getSalt() == NULL || $user->getSalt() == '')
            {
                $entityUser->setSalt($this->rand_str(UserFacade::SALT_LEN));
                $entityUser->setPassword($this->encoder->encodePassword($user->getPassword(), $entityUser->getSalt()));
            }

            parent::save($entityUser);
        }
        else
        {
            if ($user->getSalt() == NULL || $user->getSalt() == '')
            {
                $user->setSalt($this->rand_str(UserFacade::SALT_LEN));
                $user->setPassword($this->encoder->encodePassword($user->getPassword(), $entityUser->getSalt()));
            }

            parent::save($user);
        }
    }

    public function update($class, $array)
    {
        if ($class == NULL || $array == NULL)
        {
            throw new \InvalidArgumentException('parameters $class and $array cannot be null');
        }

        if ($this->getDoctrine() == NULL)
        {
            throw new EntityFacadeException('doctrine isn\'t set');
        }

        if ($class !== EntityFacade::USER)
        {
            parent::update($class, $array);
            return;
        }

        $entity = $this->load($class, $array['id']);

        if (!isset($entity))
        {
            throw new EntityFacadeException('could not find a user with id '.$array['id']);
        }

        foreach ($array as $key => $value)
        {
            if ($key != "id")
            {
                $methodName = "set".ucfirst($key);
                $entity->$methodName($value);
            }
        }

        /** @noinspection PhpUndefinedMethodInspection */
        if (NULL == $entity->getSalt() || '' == $entity->getSalt())
        {
            /** @noinspection PhpUndefinedMethodInspection */
            $entity->setSalt($this->rand_str(UserFacade::SALT_LEN));


            /** @noinspection PhpUndefinedMethodInspection */
            $entity->setPassword($this->encoder->encodePassword($entity->getPassword(), $entity->getSalt()));
        }

        $entityManager = $this->getDoctrine()->getEntityManager();
        /** @noinspection PhpUndefinedMethodInspection */
        $entityManager->flush();
    }

    /**
     * Loads a user by name.
     *
     * @throws \InvalidArgumentException
     * @param \string $username
     * @return \Orakulas\ModelBundle\Entity\User or NULL
     */
    public function loadByUserName($username)
    {
        if ($username == NULL)
        {
            throw new \InvalidArgumentException('parameter $username cannot be null');
        }

        /** @noinspection PhpUndefinedMethodInspection */
        $users = $this->getDoctrine()->getRepository(UserFacade::BUNDLE_NAME.':'.UserFacade::USER)->findByUserName($username);

        if ($users != null && $users[0] != NULL)
        {
            return $users[0];
        }
        else
        {
            return NULL;
        }
    }

    /**
     * Generates a random string of $length characters from $chars.
     *
     * @param int $length
     * @param string $chars
     * @return \string
     */
    private function rand_str($length = 32, $chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890')
    {
        $chars_length = (strlen($chars) - 1);
        $string = $chars{ rand(0, $chars_length) };

        for ($i = 1; $i < $length; $i = strlen($string))
        {
            $r = $chars{ rand(0, $chars_length) };

            if ($r != $string{$i - 1})
                $string .=  $r;
        }

        return $string;
    }
}

class UserFacadeException extends EntityFacadeException
{
    
}
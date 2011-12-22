<?php

namespace Orakulas\ModelBundle\Facades;

use Orakulas\ModelBundle\Facades\EntityFacade;
use Orakulas\ModelBundle\Entity\User;

class UserFacade extends EntityFacade {

    const USER = 'User';

    const HASH_ALGO = 'sha512';
    const SALT_LEN = 10;

    private $encoderFactory;

    public function setEncoderFactory($encoderFactory)
    {
        $this->encoderFactory = $encoderFactory;
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
            $encoder = $this->encoderFactory->getEncoder($entityUser);
            if (strcmp($encoder->encodePassword($password, $entityUser->getSalt()), $entityUser->getPassword()) == 0)
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
                $encoder = $this->encoderFactory->getEncoder($entityUser);
                
                $entityUser->setSalt($this->rand_str(UserFacade::SALT_LEN));
                $entityUser->setPassword($encoder->encodePassword($user->getPassword(), $entityUser->getSalt()));
            }

            parent::save($entityUser);
        }
        else
        {
            if ($user->getSalt() == NULL || $user->getSalt() == '')
            {
                $encoder = $this->encoderFactory->getEncoder($user);
                
                $user->setSalt($this->rand_str(UserFacade::SALT_LEN));
                $user->setPassword($encoder->encodePassword($user->getPassword(), $user->getSalt()));
            }

            parent::save($user);
        }
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
        $users = $this->getDoctrine()->getRepository(UserFacade::BUNDLE_NAME.':'.UserFacade::USER)->findByUsername($username);

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

    /**
     * @throws InvalidArgumentException if doctrine isn't set
     * @param $id primary key of object
     * @return loaded object
     */
    public function load($id) {
        if ($id == NULL) {
            throw new \InvalidArgumentException('parameter $id cannot be null');
        }

        if ($this->getDoctrine() == NULL) {
            throw new EntityFacadeException('doctrine isn\'t set');
        }

        $repository = $this->getDoctrine()->getRepository(UserFacade::BUNDLE_NAME.':'.UserFacade::USER);
        $entity = $repository->find($id);

        return $entity;
    }


    public function loadAll() {
        if ($this->getDoctrine() == NULL) {
            throw new EntityFacadeException('doctrine isn\'t set');
        }

        $repository = $this->getDoctrine()->getRepository(UserFacade::BUNDLE_NAME.':'.UserFacade::USER);
        return $repository->findAll();
    }

    /**
     * @param \Orakulas\ModelBundle\Entity\User $entity
     * @return mixed
     */
    public function toArray($entity) {
        $array = array(
            'id'            => $entity->getId(),
            'username'      => $entity->getUsername(),
            'firstName'     => $entity->getFirstName(),
            'lastName'      => $entity->getLastName(),
            'email'         => $entity->getEmail(),
            'password'      => $entity->getPassword(),
            'salt'          => $entity->getSalt(),
            //'roles'         => $entity->getRoles(),
            'admin'         => $entity->isAdmin(),
            //'authenticated' => $entity->isAuthenticated()
        );

        return $array;
    }

    /**
     * @param array $array
     * @return \Orakulas\ModelBundle\Entity\User
     */
    public function fromArray($array) {
        $user = new User();

        if (isset($array['id']))
            $user->setId($array['id']);
        if (isset($array['username']))
            $user->setUsername($array['username']);
        if (isset($array['firstName']))
            $user->setFirstName($array['firstName']);
        if (isset($array['lastName']))
            $user->setLastName($array['lastName']);
        if (isset($array['email']))
            $user->setEmail($array['email']);
        if (isset($array['password']))
            $user->setPassword($array['password']);
        if (isset($array['salt']))
            $user->setSalt($array['salt']);
        if (isset($array['admin']))
            $user->setAdmin($array['admin']);
        //$user->setAuthenticated($array['authenticated']);

        return $user;
    }

    /**
     * @param array $source
     * @param \Orakulas\ModelBundle\Entity\User $destination
     */
    public function merge($destination, $source) {
        if (isset($source['password']) && $source['password'] != '') {
            if (isset($source['oldPassword'])) {
                $encoder = $this->encoderFactory->getEncoder($destination);

                if ($encoder->encodePassword($source['oldPassword'], $destination->getSalt()) != $destination->getPassword()) {
                    throw new UserFacadeException("old password does not match the one currently set");
                }
            }

            $destination->setPassword($source['password']);
            $destination->setSalt('');
        }

        if (isset($source['admin']))
            $destination->setAdmin($source['admin']);
        if (isset($source['email']))
            $destination->setEmail($source['email']);
        if (isset($source['firstName']))
            $destination->setFirstName($source['firstName']);
        if (isset($source['lastName']))
            $destination->setLastName($source['lastName']);
        /*if (isset($source['salt'])) {
            $destination->setSalt($source['salt']);
            $destination->setPassword('');
        }*/
        if (isset($source['username']))
            $destination->setUsername($source['username']);
    }

}

class UserFacadeException extends EntityFacadeException
{
    
}
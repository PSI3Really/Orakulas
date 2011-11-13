<?php

namespace Orakulas\ModelBundle\Facades;

use Orakulas\ModelBundle\Facades\EntityFacade;
use Orakulas\ModelBundle\Entity\User;

class UserFacade extends EntityFacade
{

    const HASH_ALGO = 'sha512';
    const SALT_LEN = 10;

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
            if (strcmp(hash(UserFacade::HASH_ALGO, $password.'{'.$entityUser->getSalt().'}'), $entityUser->getPassword()) == 0)
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

            $entityUser->setSalt($this->rand_str(UserFacade::SALT_LEN));
            $entityUser->setPassword(hash(UserFacade::HASH_ALGO, $user->getPassword().'{'.$entityUser->getSalt().'}'));

            parent::save($entityUser);
        }
        else
        {
            $user->setSalt($this->rand_str(UserFacade::SALT_LEN));
            $user->setPassword(hash(UserFacade::HASH_ALGO, $user->getPassword().'{'.$user->getSalt().'}'));

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

class UserFacadeException extends \Exception
{
    
}
<?php

namespace Orakulas\ModelBundle\Facades;

use Orakulas\ModelBundle\Facades\EntityFacade;
use Orakulas\ModelBundle\Entity\User;

class UserFacade extends EntityFacade
{

    const HASH_ALGO = 'sha512';
    const SALT_LEN = 10;

    /**
     * @throws InvalidArgumentException if $username or $password is NULL
     * @param string $username
     * @param string $password
     * @return User type object with hashed password if $username was successfully authenticated with given $password. Otherwise returns NULL.
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
     * @throws InvalidArgumentException if $user is NULL
     * @throws UserFacadeException if username already exists or password is unspecified
     * @param $user
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
            throw new UserFacadeException('username already exists');
        }

        $user->setSalt($this->rand_str(UserFacade::SALT_LEN));
        $user->setPassword(hash(UserFacade::HASH_ALGO, $user->getPassword().'{'.$user->getSalt().'}'));

        parent::save($user);
    }

    public function loadByUserName($username)
    {
        if ($username == NULL)
        {
            throw new \InvalidArgumentException('parameter $username cannot be null');
        }

        $users = $this->getDoctrine()->getRepository(UserFacade::BUNDLE_NAME.':'.UserFacade::USER)->findByUserName($username);

        if ($users != null)
        {
            return $users[0];
        }
        else
        {
            return NULL;
        }
    }

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
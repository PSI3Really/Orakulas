<?php

namespace Orakulas\ModelBundle\Entity;

use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Core\Role\Role;

/**
 * Orakulas\ModelBundle\Entity\User
 */
class User implements UserInterface, \Serializable
{
    /**
     * @var integer $id
     */
    private $id;

    /**
     * @var string $userName
     */
    private $username;

    /**
     * @var string $password
     */
    private $password;

    /**
     * @var string $salt
     */
    private $salt;

    /**
     * @var string $firstName
     */
    private $firstName;

    /**
     * @var string $lastName
     */
    private $lastName;

    /**
     * @var string $email
     */
    private $email;

    /**
     * @var boolean $admin
     */
    private $admin = false;

    /**
     * @var boolean $authenticated
     */
    private $authenticated = false;


    private function setId($id)
    {
        $this->id = $id;
    }

    /**
     * Get id
     *
     * @return integer 
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set username
     *
     * @param string $username
     */
    public function setUsername($username)
    {
        $this->username = $username;
    }

    /**
     * Get username
     *
     * @return string 
     */
    public function getUsername()
    {
        return $this->username;
    }

    /**
     * Set password
     *
     * @param string $password
     */
    public function setPassword($password)
    {
        $this->password = $password;
    }

    /**
     * Get password
     *
     * @return string 
     */
    public function getPassword()
    {
        return $this->password;
    }

    /**
     * Set salt
     *
     * @param string $salt
     */
    public function setSalt($salt)
    {
        $this->salt = $salt;
    }

    /**
     * Get salt
     *
     * @return string 
     */
    public function getSalt()
    {
        return $this->salt;
    }

    /**
     * Set firstName
     *
     * @param string $firstName
     */
    public function setFirstName($firstName)
    {
        $this->firstName = $firstName;
    }

    /**
     * Get firstName
     *
     * @return string 
     */
    public function getFirstName()
    {
        return $this->firstName;
    }

    /**
     * Set lastName
     *
     * @param string $lastName
     */
    public function setLastName($lastName)
    {
        $this->lastName = $lastName;
    }

    /**
     * Get lastName
     *
     * @return string 
     */
    public function getLastName()
    {
        return $this->lastName;
    }

    /**
     * Set email
     *
     * @param string $email
     */
    public function setEmail($email)
    {
        $this->email = $email;
    }

    /**
     * Get email
     *
     * @return string 
     */
    public function getEmail()
    {
        return $this->email;
    }

    /**
     * Set admin
     *
     * @param boolean $admin
     */
    public function setAdmin($admin)
    {
        $this->admin = $admin;
    }

    /**
     * Is admin
     *
     * @return boolean
     */
    public function isAdmin()
    {
        return $this->admin;
    }

    /**
     * Set authenticated
     *
     * @param boolean $authenticated
     */
    public function setAuthenticated($authenticated)
    {
        $this->authenticated = $authenticated;
    }

    /**
     * Is authenticated
     *
     * @return boolean
     */
    public function isAuthenticated()
    {
        return $this->authenticated;
    }

    /**
     * {@inheritdoc}
     */
    public function getRoles()
    {
        $roles = array();
        $roles[] = new Role('ROLE_USER');

        if ($this->isAdmin())
        {
            $roles[] = new Role('ROLE_ADMIN');
        }

        return $roles;
    }

    /**
     * {@inheritdoc}
     */
    public function eraseCredentials()
    {
        // TODO: Implement eraseCredentials() method.
    }

    /**
     * {@inheritdoc}
     */
    public function equals(UserInterface $user)
    {
        if (strcasecmp($this->getUsername(), $user->getUsername()) != 0)
        {
            return false;
        }

        if (strcmp($this->getPassword(), $user->getPassword()) != 0)
        {
            return false;
        }

        if (($this->isAuthenticated() && !$user->isAuthenticated())
                || (!$this->isAuthenticated() && $user->isAuthenticated()))
        {
            return false;
        }

        if (($this->isAdmin() && !$user->isAdmin())
                || (!$this->isAdmin() && $user->isAdmin()))
        {
            return false;
        }

        return true;
    }

    /**
     * @return \string Serialized string
     */
    public function serialize()
    {
        $arr = array(
            'id' => $this->getId(),
            'username' => $this->getUsername(),
            'firstName' => $this->getFirstName(),
            'lastName' => $this->getLastName(),
            'email' => $this->getEmail(),
            'salt' => $this->getSalt(),
            'password' => $this->getPassword(),
            'isAdmin' => $this->isAdmin(),
            'isAuthenticated' => $this->isAuthenticated(),
            'roles' => $this->getRoles()
        );

        return serialize($arr);
    }

    /**
     * @param \string $str
     * @return void
     */
    public function unserialize($str)
    {
        $arr = unserialize($str);
        $this->setId($arr['id']);
        $this->setUsername($arr['username']);
        $this->setFirstName($arr['firstName']);
        $this->setLastName($arr['lastName']);
        $this->setEmail($arr['email']);
        $this->setSalt($arr['salt']);
        $this->setPassword($arr['password']);
        $this->setAdmin($arr['isAdmin']);
        $this->setAuthenticated($arr['isAuthenticated']);
    }
}
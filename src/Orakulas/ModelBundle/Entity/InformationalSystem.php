<?php

namespace Orakulas\ModelBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Orakulas\ModelBundle\Entity\InformationalSystem
 */
class InformationalSystem
{
    /**
     * @var integer $id
     */
    private $id;

    /**
     * @var string $code
     */
    private $code;

    /**
     * @var string $name
     */
    private $name;

    public function setId($id) {
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
     * Set code
     *
     * @param string $code
     */
    public function setCode($code)
    {
        $this->code = $code;
    }

    /**
     * Get code
     *
     * @return string 
     */
    public function getCode()
    {
        return $this->code;
    }

    /**
     * Set name
     *
     * @param string $name
     */
    public function setName($name)
    {
        $this->name = $name;
    }

    /**
     * Get name
     *
     * @return string 
     */
    public function getName()
    {
        return $this->name;
    }
}
<?php

namespace Orakulas\ModelBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Orakulas\ModelBundle\Entity\SupportCategory
 */
class SupportCategory
{
    /**
     * @var integer $id
     */
    private $id;

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
<?php

namespace Orakulas\ModelBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Orakulas\ModelBundle\Entity\DepartmentInfoSysUsage
 */
class DepartmentInfoSysUsage
{
    /**
     * @var integer $id
     */
    private $id;

    /**
     * @var \Orakulas\ModelBundle\Entity\InformationalSystem
     */
    private $informationalSystem;

    /**
     * @var \Orakulas\ModelBundle\Entity\Department
     */
    private $department;

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
     * Set informationalSystem
     *
     * @param \Orakulas\ModelBundle\Entity\InformationalSystem $informationalSystem
     */
    public function setInformationalSystem(\Orakulas\ModelBundle\Entity\InformationalSystem $informationalSystem)
    {
        $this->informationalSystem = $informationalSystem;
    }

    /**
     * Get informationalSystem
     *
     * @return \Orakulas\ModelBundle\Entity\InformationalSystem
     */
    public function getInformationalSystem()
    {
        return $this->informationalSystem;
    }

    /**
     * Set department
     *
     * @param \Orakulas\ModelBundle\Entity\Department $department
     */
    public function setDepartment(\Orakulas\ModelBundle\Entity\Department $department)
    {
        $this->department = $department;
    }

    /**
     * Get department
     *
     * @return \Orakulas\ModelBundle\Entity\Department
     */
    public function getDepartment()
    {
        return $this->department;
    }
}
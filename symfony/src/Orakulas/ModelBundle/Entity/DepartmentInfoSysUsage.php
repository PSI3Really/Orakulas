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
     * @var datetime $createdTimestamp
     */
    private $createdTimestamp;

    /**
     * @var datetime $updatedTimestamp
     */
    private $updatedTimestamp;

    /**
     * @var Orakulas\ModelBundle\Entity\InformationalSystem
     */
    private $informationalSystem;

    /**
     * @var Orakulas\ModelBundle\Entity\Department
     */
    private $department;


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
     * Set createdTimestamp
     *
     * @param datetime $createdTimestamp
     */
    public function setCreatedTimestamp($createdTimestamp)
    {
        $this->createdTimestamp = $createdTimestamp;
    }

    /**
     * Get createdTimestamp
     *
     * @return datetime 
     */
    public function getCreatedTimestamp()
    {
        return $this->createdTimestamp;
    }

    /**
     * Set updatedTimestamp
     *
     * @param datetime $updatedTimestamp
     */
    public function setUpdatedTimestamp($updatedTimestamp)
    {
        $this->updatedTimestamp = $updatedTimestamp;
    }

    /**
     * Get updatedTimestamp
     *
     * @return datetime 
     */
    public function getUpdatedTimestamp()
    {
        return $this->updatedTimestamp;
    }

    /**
     * Set informationalSystem
     *
     * @param Orakulas\ModelBundle\Entity\InformationalSystem $informationalSystem
     */
    public function setInformationalSystem(\Orakulas\ModelBundle\Entity\InformationalSystem $informationalSystem)
    {
        $this->informationalSystem = $informationalSystem;
    }

    /**
     * Get informationalSystem
     *
     * @return Orakulas\ModelBundle\Entity\InformationalSystem 
     */
    public function getInformationalSystem()
    {
        return $this->informationalSystem;
    }

    /**
     * Set department
     *
     * @param Orakulas\ModelBundle\Entity\Department $department
     */
    public function setDepartment(\Orakulas\ModelBundle\Entity\Department $department)
    {
        $this->department = $department;
    }

    /**
     * Get department
     *
     * @return Orakulas\ModelBundle\Entity\Department 
     */
    public function getDepartment()
    {
        return $this->department;
    }
}
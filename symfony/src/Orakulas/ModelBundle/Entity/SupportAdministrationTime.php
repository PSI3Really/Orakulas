<?php

namespace Orakulas\ModelBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Orakulas\ModelBundle\Entity\SupportAdministrationTime
 */
class SupportAdministrationTime
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
     * @var float $hoursCount
     */
    private $hoursCount;

    /**
     * @var Orakulas\ModelBundle\Entity\Department
     */
    private $department;

    /**
     * @var Orakulas\ModelBundle\Entity\SupportType
     */
    private $supportType;


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
     * Set hoursCount
     *
     * @param float $hoursCount
     */
    public function setHoursCount($hoursCount)
    {
        $this->hoursCount = $hoursCount;
    }

    /**
     * Get hoursCount
     *
     * @return float 
     */
    public function getHoursCount()
    {
        return $this->hoursCount;
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

    /**
     * Set supportType
     *
     * @param Orakulas\ModelBundle\Entity\SupportType $supportType
     */
    public function setSupportType(\Orakulas\ModelBundle\Entity\SupportType $supportType)
    {
        $this->supportType = $supportType;
    }

    /**
     * Get supportType
     *
     * @return Orakulas\ModelBundle\Entity\SupportType 
     */
    public function getSupportType()
    {
        return $this->supportType;
    }
}
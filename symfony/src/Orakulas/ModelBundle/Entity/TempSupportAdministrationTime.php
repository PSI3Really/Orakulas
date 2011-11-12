<?php

namespace Orakulas\ModelBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Orakulas\ModelBundle\Entity\TempSupportAdministrationTime
 */
class TempSupportAdministrationTime
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
     * @var string $departmentCode
     */
    private $departmentCode;

    /**
     * @var string $supportTypeCode
     */
    private $supportTypeCode;

    /**
     * @var float $hoursCount
     */
    private $hoursCount;


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
     * Set departmentCode
     *
     * @param string $departmentCode
     */
    public function setDepartmentCode($departmentCode)
    {
        $this->departmentCode = $departmentCode;
    }

    /**
     * Get departmentCode
     *
     * @return string 
     */
    public function getDepartmentCode()
    {
        return $this->departmentCode;
    }

    /**
     * Set supportTypeCode
     *
     * @param string $supportTypeCode
     */
    public function setSupportTypeCode($supportTypeCode)
    {
        $this->supportTypeCode = $supportTypeCode;
    }

    /**
     * Get supportTypeCode
     *
     * @return string 
     */
    public function getSupportTypeCode()
    {
        return $this->supportTypeCode;
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
}
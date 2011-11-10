<?php

namespace Orakulas\ModelBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Orakulas\ModelBundle\Entity\TempDepartmentInfoSysUsage
 */
class TempDepartmentInfoSysUsage
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
     * @var string $infoSysCode
     */
    private $infoSysCode;

    /**
     * @var string $departmentCode
     */
    private $departmentCode;


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
     * Set infoSysCode
     *
     * @param string $infoSysCode
     */
    public function setInfoSysCode($infoSysCode)
    {
        $this->infoSysCode = $infoSysCode;
    }

    /**
     * Get infoSysCode
     *
     * @return string 
     */
    public function getInfoSysCode()
    {
        return $this->infoSysCode;
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
}
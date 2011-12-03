<?php

namespace Orakulas\ModelBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Orakulas\ModelBundle\Entity\SupportHistory
 */
class SupportHistory
{
    /**
     * @var integer $id
     */
    private $id;

    /**
     * @var date $startDate
     */
    private $startDate;

    /**
     * @var date $endDate
     */
    private $endDate;

    /**
     * @var integer $supportRequestCount
     */
    private $supportRequestCount;

    /**
     * @var \Orakulas\ModelBundle\Entity\SupportType
     */
    private $supportType;

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
     * Set startDate
     *
     * @param date $startDate
     */
    public function setStartDate($startDate)
    {
        $this->startDate = $startDate;
    }

    /**
     * Get startDate
     *
     * @return date 
     */
    public function getStartDate()
    {
        return $this->startDate;
    }

    /**
     * Set endDate
     *
     * @param date $endDate
     */
    public function setEndDate($endDate)
    {
        $this->endDate = $endDate;
    }

    /**
     * Get endDate
     *
     * @return date 
     */
    public function getEndDate()
    {
        return $this->endDate;
    }

    /**
     * Set supportRequestCount
     *
     * @param integer $supportRequestCount
     */
    public function setSupportRequestCount($supportRequestCount)
    {
        $this->supportRequestCount = $supportRequestCount;
    }

    /**
     * Get supportRequestCount
     *
     * @return integer 
     */
    public function getSupportRequestCount()
    {
        return $this->supportRequestCount;
    }

    /**
     * Set supportType
     *
     * @param \Orakulas\ModelBundle\Entity\SupportType $supportType
     */
    public function setSupportType(\Orakulas\ModelBundle\Entity\SupportType $supportType)
    {
        $this->supportType = $supportType;
    }

    /**
     * Get supportType
     *
     * @return \Orakulas\ModelBundle\Entity\SupportType
     */
    public function getSupportType()
    {
        return $this->supportType;
    }
}
<?php

namespace Orakulas\ModelBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Orakulas\ModelBundle\Entity\TempSupportHistory
 */
class TempSupportHistory
{
    /**
     * @var integer $id
     */
    private $id;

    /**
     * @var string $supportTypeCode
     */
    private $supportTypeCode;

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
     * Get id
     *
     * @return integer 
     */
    public function getId()
    {
        return $this->id;
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
}
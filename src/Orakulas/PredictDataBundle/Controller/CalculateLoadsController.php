<?php

namespace Orakulas\PredictDataBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
 
class CalculateLoadsController extends Controller {

    private $supportQuantities = array();
    private $supportAdministrationTimes = array();
    private $departmentInfoSysUsages = array();
    private $availableDates = array();
    private $supportQuantitiesForDepartments = null;
    private $hourQuantitiesForDepartments = null;

    function __construct($supportQuantities, $supportAdministrationTimes, $departmentInfoSysUsages) {
        $this->supportQuantities = $supportQuantities;
        $this->supportAdministrationTimes = $supportAdministrationTimes;
        $this->departmentInfoSysUsages = $departmentInfoSysUsages;
        //var_dump($departmentInfoSysUsages);
        //var_dump($supportQuantities);
        //var_dump($this->supportAdministrationTimes);
        //var_dump($this->departmentInfoSysUsages);
    }

    private function setAvailableDates() {
        foreach ($this->supportQuantities as $quantity) {
            $startDate = $quantity['startDate'];
            $endDate = $quantity['endDate'];
            if (!isset($this->availableDate[$startDate])) {
                $this->availableDates[$startDate] = array();
            }
            if (!isset($this->availableDate[$startDate][$endDate])) {
                $this->availableDates[$startDate][$endDate] = null;
            }
        }
    }

    public function calculateLoads() {
        $this->setAvailableDates();
        $this->supportQuantitiesForDepartments();
        var_dump($this->hourQuantitiesForDepartments );
    }

    private function supportQuantitiesForDepartments() {
        $this->supportQuantitiesForDepartments = array();
        $this->hourQuantitiesForDepartments = array();
        foreach ($this->supportQuantities as $supportQuantity) {
            $supportType = $supportQuantity['supportType'];
            $startDate = $supportQuantity['startDate'];
            $endDate = $supportQuantity['endDate'];
            $supportRequestCount = $supportQuantity['supportRequestCount'];
            foreach ($this->supportAdministrationTimes as $supportAdministrationTime) {
                $department = $supportAdministrationTime['department'];
                $hoursCount = $supportAdministrationTime['hoursCount'];
                if ($supportAdministrationTime['supportType'] === $supportType) {
                    if (!isset($this->supportQuantitiesForDepartments[$startDate][$department])) {
                        $this->supportQuantitiesForDepartments[$startDate][$department] = $supportRequestCount;
                        $this->hourQuantitiesForDepartments[$startDate][$department] = $supportRequestCount * $hoursCount;
                    } else {
                        //$this->supportQuantitiesForDepartments[$department][$startDate][$endDate] += $supportRequestCount;
                        $this->supportQuantitiesForDepartments[$startDate][$department] += $supportRequestCount;
                        $hours = $supportRequestCount * $hoursCount;
                        $this->hourQuantitiesForDepartments[$startDate][$department] += $hours;
                    }
                }
            }
        }
        //var_dump($supportQuantitiesForEachDepartment);
    }

}

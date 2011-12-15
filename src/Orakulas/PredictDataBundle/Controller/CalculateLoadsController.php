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
    private $supportQuantitiesForInformationSystems = null;
    private $hourQuantitiesForInformationSystems = null;

    function __construct($supportQuantities, $supportAdministrationTimes, $departmentInfoSysUsages) {
        $this->supportQuantities = $supportQuantities;
        $this->supportAdministrationTimes = $supportAdministrationTimes;
        $this->departmentInfoSysUsages = $departmentInfoSysUsages;
    }

    private function setAvailableDates() {
        foreach ($this->supportQuantities as $quantity) {
            $startDate = $quantity['startDate'];
            $endDate = $quantity['endDate'];
            if (!isset($this->availableDate[$startDate])) {
                $this->availableDates[$startDate] = null;
            }
        }
    }

    public function calculateLoads() {
        $this->setAvailableDates();
        $this->quantitiesForDepartments();
        $this->quantitiesForInformationSystems();
        $loads = array("supportQuantitiesForDepartments"=>$this->supportQuantitiesForDepartments,
            "hourQuantitiesForDepartments"=>$this->hourQuantitiesForDepartments,
            "supportQuantitiesForInformationalSystems"=>$this->supportQuantitiesForInformationSystems,
            "hourQuantitiesForInformationalSystems"=>$this->hourQuantitiesForInformationSystems
        );
        return $loads;
    }

    private function quantitiesForDepartments() {
        $this->supportQuantitiesForDepartments = array();
        $this->hourQuantitiesForDepartments = array();
        foreach ($this->supportQuantities as $supportQuantity) {
            $supportType = $supportQuantity['supportType'];
            $startDate = $supportQuantity['startDate'];
            $supportRequestCount = $supportQuantity['supportRequestCount'];
            foreach ($this->supportAdministrationTimes as $supportAdministrationTime) {
                $department = $supportAdministrationTime['department'];
                $hoursCount = $supportAdministrationTime['hoursCount'];
                if ($supportAdministrationTime['supportType'] === $supportType) {
                    if (!isset($this->supportQuantitiesForDepartments[$startDate][$department])) {
                        $this->supportQuantitiesForDepartments[$startDate][$department] = $supportRequestCount;
                        $this->hourQuantitiesForDepartments[$startDate][$department] = $supportRequestCount * $hoursCount;
                    } else {
                        $this->supportQuantitiesForDepartments[$startDate][$department] += $supportRequestCount;
                        $hours = $supportRequestCount * $hoursCount;
                        $this->hourQuantitiesForDepartments[$startDate][$department] += $hours;
                    }
                }
            }
        }
    }

    private function quantitiesForInformationSystems() {
        $this->supportQuantitiesForInformationSystems = array();
        $this->hourQuantitiesForInformationSystems = array();
        foreach ($this->availableDates as $currentDate=>$fakeValue) {
            foreach ($this->departmentInfoSysUsages as $informationalSystem=>$departments) {
                foreach ($departments as $department) {
                    if (!isset($this->supportQuantitiesForDepartments[$currentDate][$department])) {
                        continue;
                    }
                    if (!isset($this->supportQuantitiesForInformationSystems[$currentDate][$informationalSystem])) {
                        $this->supportQuantitiesForInformationSystems[$currentDate][$informationalSystem] = $this->supportQuantitiesForDepartments[$currentDate][$department];
                        $this->hourQuantitiesForInformationSystems[$currentDate][$informationalSystem] = $this->hourQuantitiesForDepartments[$currentDate][$department];
                    } else {
                        $this->supportQuantitiesForInformationSystems[$currentDate][$informationalSystem] += $this->supportQuantitiesForDepartments[$currentDate][$department];
                        $this->hourQuantitiesForInformationSystems[$currentDate][$informationalSystem] += $this->hourQuantitiesForDepartments[$currentDate][$department];
                    }
                }
            }
        }
    }

}

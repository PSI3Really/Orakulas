<?php

namespace Orakulas\PredictDataBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Orakulas\ModelBundle\Facades\SupportHistoryFacade;
use Orakulas\ModelBundle\Entity\SupportHistory;
use Orakulas\ModelBundle\Facades\SupportAdministrationTimeFacade;
use Orakulas\ModelBundle\Entity\SupportAdministrationTime;
use Orakulas\ModelBundle\Facades\InformationalSystemFacade;
use Orakulas\ModelBundle\Entity\InformationalSystem;
use Orakulas\ModelBundle\Facades\DepartmentInfoSysUsageFacade;
use Orakulas\ModelBundle\Entity\DepartmentInfoSysUsage;

class PredictDataController extends Controller {

    private $supportQuantities = array();
    private $supportAdministrationTimes = array();
    private $departmentInfoSysUsages = array();
    private $jsonData;

    public function predictAction() {
        $this->jsonData = $_POST['data'];
        $this->jsonData = json_decode($this->jsonData, true);

        $this->readSupportQuantitiesFromDatabase();
        $this->readSupportQuantitiesFromJsonAndMerge();

        $this->readSupportAdministrationTimesFromDatabase();
        $this->readSupportAdministrationTimesFromJsonAndMerge();

        $this->readIsDepartmentsFromDatabase();
        $this->readIsDepartmentsFromJsonAndMerge();

        exit;
    }

    private function readSupportQuantitiesFromDatabase() {
        $supportHistory = new SupportHistoryFacade();
        $supportHistory->setDoctrine($this->getDoctrine());
        $supportHistory = $supportHistory->loadAll();
        foreach ($supportHistory as $supportQuantity) {
            $supportType = $supportQuantity->getSupportType()->getCode();
            $startDate = date("Y-m-d", $supportQuantity->getStartDate()->getTimestamp());
            $endDate = date("Y-m-d", $supportQuantity->getEndDate()->getTimestamp());
            $supportRequestCount = $supportQuantity->getSupportRequestCount();
            $this->supportQuantities[] = array(
                "supportType"=>$supportType,
                "startDate"=>$startDate,
                "endDate"=>$endDate,
                "supportRequestCount"=>$supportRequestCount,
            );
        }
    }

    private function readSupportQuantitiesFromJsonAndMerge() {
        $supportQuantitiesTemp = $this->jsonData['supportQuantities'];
        foreach ($supportQuantitiesTemp as $supportQuantityTemp) {
            if (!$this->sameSupportTypeAtTheSameTime($supportQuantityTemp)) {
                $this->supportQuantities[] = array(
                    "supportType"=>$supportQuantityTemp['supportType'],
                    "startDate"=>$supportQuantityTemp['startDate'],
                    "endDate"=>$supportQuantityTemp['endDate'],
                    "supportRequestCount"=>$supportQuantityTemp['supportRequestCount'],
                );
            }
        }
    }

    private function sameSupportTypeAtTheSameTime($supportQuantity) {
        foreach ($this->supportQuantities as $currentSupQ) {
            if ($supportQuantity['supportType'] === $currentSupQ['supportType']) {
                    if ((strtotime($supportQuantity['startDate']) > strtotime($currentSupQ['startDate'])) &&
                    (strtotime($supportQuantity['startDate']) < strtotime($currentSupQ['endDate']))) {
                        return true;
                    } elseif ((strtotime($supportQuantity['endDate']) > strtotime($currentSupQ['startDate'])) &&
                    (strtotime($supportQuantity['endDate']) < strtotime($currentSupQ['endDate']))) {
                        return true;
                    } elseif (($supportQuantity['startDate'] === $currentSupQ['startDate']) ||
                              ($supportQuantity['startDate'] === $currentSupQ['endDate'])) {
                        return true;
                    } elseif (($supportQuantity['endDate'] === $currentSupQ['startDate']) ||
                              ($supportQuantity['endDate'] === $currentSupQ['endDate'])) {
                        return true;
                    }
            }
        }
        return false;
    }

    private function readSupportAdministrationTimesFromDatabase() {
        $supportAdministrationTimes = new SupportAdministrationTimeFacade();
        $supportAdministrationTimes->setDoctrine($this->getDoctrine());
        $supportAdministrationTimes = $supportAdministrationTimes->loadAll();
        foreach ($supportAdministrationTimes as $supportAdministrationTime) {
            $department = $supportAdministrationTime->getDepartment()->getCode();
            $supportType = $supportAdministrationTime->getSupportType()->getCode();
            $hoursCount = $supportAdministrationTime->getHoursCount();
            $this->supportAdministrationTimes[] = array(
                'department'=>$department,
                'supportType'=>$supportType,
                'hoursCount'=>$hoursCount,
            );
        }
    }

    private function readSupportAdministrationTimesFromJsonAndMerge() {
        $supportAdministrationTimesTemp = $this->jsonData['supportAdministrationTimes'];
        foreach ($supportAdministrationTimesTemp as $supportAdministrationTimeTemp) {
            $alreadyContainsThisSAT = false;
            foreach ($this->supportAdministrationTimes as $currentSAT) {
                if ($currentSAT['department'] === $supportAdministrationTimeTemp['department']) {
                    if ($currentSAT['supportType'] === $supportAdministrationTimeTemp['supportType']) {
                        $alreadyContainsThisSAT = true;
                    }
                }
            }
            if (!$alreadyContainsThisSAT) {
                $this->supportAdministrationTimes[] = array(
                    'department'=>$supportAdministrationTimeTemp['department'],
                    'supportType'=>$supportAdministrationTimeTemp['supportType'],
                    'hoursCount'=>$supportAdministrationTimeTemp['hoursCount'],
                );
            }
        }
    }

    private function readIsDepartmentsFromDatabase() {
        $departmentInfoSysUsages = new DepartmentInfoSysUsageFacade();
        $departmentInfoSysUsages->setDoctrine($this->getDoctrine());
        $departmentInfoSysUsages = $departmentInfoSysUsages->loadAll();
        foreach ($departmentInfoSysUsages as $departmentInfoSysUsage) {
            $department = $departmentInfoSysUsage->getDepartment()->getCode();
            $informationalSystem = $departmentInfoSysUsage->getInformationalSystem()->getCode();
            if (!isset($this->departmentInfoSysUsages[$department])) {
                $this->departmentInfoSysUsages[$department] = array();
            }
            array_push($this->departmentInfoSysUsages[$department], $informationalSystem);
        }
    }

    private function readIsDepartmentsFromJsonAndMerge() {
        $departmentInfoSysUsagesTemp = $this->jsonData['departmentInfoSysUsages'];
        foreach ($departmentInfoSysUsagesTemp as $departmentInfoSysUsageTemp) {
            $department = $departmentInfoSysUsageTemp['department'];
            $informationalSystem = $departmentInfoSysUsageTemp['IS'];
            if (!isset($this->departmentInfoSysUsages[$department])) {
                $this->departmentInfoSysUsages[$department] = array();
            }
            foreach ($informationalSystem as $currentIs) {
                if (!in_array($currentIs, $this->departmentInfoSysUsages[$department])) {
                    array_push($this->departmentInfoSysUsages[$department], $currentIs  );
                }
            }
        }
    }

}
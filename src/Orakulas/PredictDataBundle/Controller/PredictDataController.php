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
use Orakulas\PredictDataBundle\Controller\CalculateLoadsController;
use Symfony\Component\HttpFoundation\Response;

class PredictDataController extends Controller {

    private $supportQuantities = array();
    private $supportAdministrationTimes = array();
    private $departmentInfoSysUsages = array();
    private $jsonData;

    public function predictAction() {
        if (isset($_POST['data'])) {
            $this->jsonData = $_POST['data'];
            $this->jsonData = json_decode($this->jsonData, true);

            $this->readSupportQuantitiesFromDatabase();
            $this->readSupportQuantitiesFromJsonAndMerge();

            $this->readSupportAdministrationTimesFromDatabase();
            $this->readSupportAdministrationTimesFromJsonAndMerge();

            $this->readIsDepartmentsFromDatabase();
            $this->readIsDepartmentsFromJsonAndMerge();
        } else {
            $this->readSupportQuantitiesFromDatabase();
            $this->readSupportAdministrationTimesFromDatabase();
            $this->readIsDepartmentsFromDatabase();
        }

        $loads = new CalculateLoadsController($this->supportQuantities, $this->supportAdministrationTimes, $this->departmentInfoSysUsages);
        $loads = $loads->calculateLoads();

        $loads = $this->formSuitableArrays($loads);
        $loads = json_encode($loads);

        return $this->constructResponse($loads);
    }

    private function formSuitableArrays($array) {
        $loads = null;
        foreach ($array as $rootName=>$currentArray) {
            foreach ($currentArray as $startDate=>$valuesAndEntities) {
                $insideArray = array(
                    'startDate'=>$startDate,
                    'entities'=>array()
                );
                foreach ($valuesAndEntities as $name=>$value) {
                    $insideArray['entities'][] = array(
                        'name'=>$name,
                        'value'=>$value
                    );
                }
                $loads[$rootName][] = $insideArray;
            }
        }
        return $loads;
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
                    "supportType"=>$supportQuantityTemp['type'], //supportType
                    "startDate"=>$supportQuantityTemp['startDate'],
                    "endDate"=>$supportQuantityTemp['endDate'],
                    "supportRequestCount"=>$supportQuantityTemp['amount'], //supportRequestCount
                );
            }
        }
    }

    private function sameSupportTypeAtTheSameTime($supportQuantity) {
        foreach ($this->supportQuantities as $currentSupQ) {
            if ($supportQuantity['type'] === $currentSupQ['supportType']) {
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
            $department = $supportAdministrationTime->getDepartment()->getName();
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
            $indexToChange = null;
            foreach ($this->supportAdministrationTimes as $index=>$currentSAT) {
                if ($currentSAT['department'] === $supportAdministrationTimeTemp['department']) {
                    if ($currentSAT['supportType'] === $supportAdministrationTimeTemp['supportType']) {
                        $indexToChange = $index;
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
            } else { //jei neperrasyti reiksmiu senu, sita else'a nafik trinti
                $this->supportAdministrationTimes[$indexToChange]['hoursCount'] = $supportAdministrationTimeTemp['hoursCount'];
            }
        }
    }

    private function readIsDepartmentsFromDatabase() {
        $departmentInfoSysUsages = new DepartmentInfoSysUsageFacade();
        $departmentInfoSysUsages->setDoctrine($this->getDoctrine());
        $departmentInfoSysUsages = $departmentInfoSysUsages->loadAll();
        foreach ($departmentInfoSysUsages as $departmentInfoSysUsage) {
            $department = $departmentInfoSysUsage->getDepartment()->getName();
            $informationalSystem = $departmentInfoSysUsage->getInformationalSystem()->getName();
            if (!isset($this->departmentInfoSysUsages[$informationalSystem])) {
                $this->departmentInfoSysUsages[$informationalSystem] = array();
            }
            array_push($this->departmentInfoSysUsages[$informationalSystem], $department);
        }
    }

    private function readIsDepartmentsFromJsonAndMerge() {
        $departmentInfoSysUsagesTemp = $this->jsonData['departmentInfoSysUsages'];
        foreach ($departmentInfoSysUsagesTemp as $departmentInfoSysUsageTemp) {
            $departments = $departmentInfoSysUsageTemp['departments'];
            $informationalSystem = $departmentInfoSysUsageTemp['IS'];
            //atkomentuoti, jei reikia palikti padalinius is istoriniu duomenu - dabar nebepalieka
            //if (!isset($this->departmentInfoSysUsages[$informationalSystem])) {
                $this->departmentInfoSysUsages[$informationalSystem] = array();
            //}
            foreach ($departments as $currentDepartment) {
                if (!in_array($currentDepartment, $this->departmentInfoSysUsages[$informationalSystem])) {
                    array_push($this->departmentInfoSysUsages[$informationalSystem], $currentDepartment);
                }
            }
        }
    }

    /**
     * @param \string $string
     * @return \Symfony\Component\HttpFoundation\Response
     */
    protected function constructResponse($string) {
        $response = new Response($string);
        $response->headers->set('Content-Type', 'application/json');

        return $response;
    }

}

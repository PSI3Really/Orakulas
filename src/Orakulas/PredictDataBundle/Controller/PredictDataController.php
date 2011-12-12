<?php

namespace Orakulas\PredictDataBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Orakulas\ModelBundle\Facades\SupportHistoryFacade;
use Orakulas\ModelBundle\Entity\SupportHistory;
use Orakulas\ModelBundle\Facades\SupportAdministrationTimeFacade;
use Orakulas\ModelBundle\Entity\SupportAdministrationTime;

class PredictDataController extends Controller {

    private $supportQuantities = array();
    private $supportAdministrationTimes = array();
    private $jsonData;

    public function predictAction() {
        $this->jsonData = $_POST['data'];
        $this->jsonData = json_decode($this->jsonData, true);

        $this->readSupportQuantitiesFromDatabase();
        $this->readSupportQuantitiesFromJson();

        $this->readSupportAdministrationTimesFromDatabase();
        $this->readSupportAdministrationTimesFromJson();
        //test
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

    private function readSupportQuantitiesFromJson() {
        $supportQuantitiesTemp = $this->jsonData['supportQuantities'];
        foreach ($supportQuantitiesTemp as $supportQuantityTemp) {
            $this->supportQuantities[] = array(
                "supportType"=>$supportQuantityTemp['supportType'],
                "startDate"=>$supportQuantityTemp['startDate'],
                "endDate"=>$supportQuantityTemp['endDate'],
                "supportRequestCount"=>$supportQuantityTemp['supportRequestCount'],
            );
        }
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

    private function readSupportAdministrationTimesFromJson() {
        $supportAdministrationTimesTemp = $this->jsonData['supportAdministrationTimes'];
        foreach ($supportAdministrationTimesTemp as $supportAdministrationTimeTemp) {
            $this->supportAdministrationTimes[] = array(
                'department'=>$supportAdministrationTimeTemp['department'],
                'supportType'=>$supportAdministrationTimeTemp['supportType'],
                'hoursCount'=>$supportAdministrationTimeTemp['hoursCount'],
            );
        }
    }

}

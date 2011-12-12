<?php

namespace Orakulas\PredictDataBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Orakulas\ModelBundle\Facades\SupportHistoryFacade;
use Orakulas\ModelBundle\Entity\SupportHistory;

class PredictDataController extends Controller {

    private $supportQuantities = array();
    private $supportAdministrationTimes = array();
    private $jsonData;

    public function predictAction() {
        $this->jsonData = $_POST['data'];
        $this->jsonData = json_decode($this->jsonData, true);

        $this->readSupportQuantitiesFromDatabase();
        $this->readSupportQuantitiesFromJson();

        var_dump($this->supportQuantities);
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

}

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
    private $supportTypes = array();

    private $requests = array();

    function __construct($supportQuantities, $supportAdministrationTimes, $departmentInfoSysUsages) {
        $this->supportQuantities = $supportQuantities;
        $this->supportAdministrationTimes = $supportAdministrationTimes;
        $this->departmentInfoSysUsages = $departmentInfoSysUsages;
    }

    private function setSupportTyoes(){
        foreach($this->supportAdministrationTimes as $adminTime){
            $this->supportTypes[$adminTime['supportType']] = $adminTime['supportType'];
        }
    }

    private function setAvailableDates() {
        foreach ($this->supportQuantities as $quantity) {
            $startDate = $quantity['startDate'];
            if (!isset($this->availableDate[$startDate])) {
                $this->availableDates[$startDate] = null;
            }

            if (!isset($this->requests[$startDate])){
                $this->requests[$startDate] = array();
            }
            $this->requests[$startDate][$quantity['supportType']] = $quantity['supportRequestCount'];
        }

        $this->forecast();
    }

    private function forecast(){
        $totalPeriod = 12; //months
        $window = 6;

        $winterSum = 0;
        $winterCount = 0;
        $springSum = 0;
        $springCount = 0;
        $summerSum = 0;
        $summerCount = 0;
        $autumnSum = 0;
        $autumnCount = 0;
        
        foreach (array_slice($this->requests, $window) as $date => $values){//TODO: check loop limits carefully
            $seasonality[$date] = array();
            
            $month = intval(date('n', strtotime($date)));

            foreach($this->supportTypes as $supportType){
                $avg = $this->getMovingAverage($date, $supportType, $window);

                if (!isset($values[$supportType])){
                    $values[$supportType] = 0;
                }

                $val = $avg ? $values[$supportType]/$avg : 0;

                $seasonality[$date][$supportType] = $val;

                if ($month == 1 || $month == 2 || $month == 12){
                    $winterSum += $val; $winterCount++;
                } else if ($month == 3 || $month == 4 || $month == 5){
                    $springSum += $val; $springCount++;
                } else if ($month == 6 || $month == 7 || $month == 8){
                    $summerSum += $val; $summerCount++;
                } else if ($month == 9 || $month == 10 || $month == 11){
                    $autumnSum += $val; $autumnCount++;
                }
            }
        }

        //TODO: seasons by priemone

        $winterAvg = $winterSum/$winterCount;
        $springAvg = $springSum/$springCount;
        $summerAvg = $summerSum/$summerCount;
        $autumnAvg = $autumnSum/$autumnCount;
        $sumAvg = $winterAvg + $springAvg + $summerAvg + $autumnAvg;
        
        //Normalize
        $winterAvg = 4*$winterAvg/$sumAvg;
        $springAvg = 4*$springAvg/$sumAvg;
        $summerAvg = 4*$summerAvg/$sumAvg;
        $autumnAvg = 4*$autumnAvg/$sumAvg;

        $seasonalIndex = array();
        $seasonalIndex[12] = $winterAvg; $seasonalIndex[1] = $winterAvg; $seasonalIndex[2] = $winterAvg;
        $seasonalIndex[3] = $springAvg; $seasonalIndex[4] = $springAvg; $seasonalIndex[5] = $springAvg;
        $seasonalIndex[6] = $summerAvg; $seasonalIndex[7] = $summerAvg; $seasonalIndex[8] = $summerAvg;
        $seasonalIndex[9] = $autumnAvg; $seasonalIndex[10] = $autumnAvg; $seasonalIndex[11] = $autumnAvg;

        //var_dump($seasonalIndex);

        //var_dump($seasonality);

        //now the fun begins

        end($this->requests);
        for ($period = 1; $period <= $totalPeriod; $period++){ //TODO: optimize
            $date = date('Y-m-d', strtotime(key($this->requests) . ' +' . $period . ' months'));

            $month = intval(date('n', strtotime($date)));

            $this->requests[$date] = array();
            foreach($this->supportTypes as $supportType){
                $this->requests[$date][$supportType] = intval($this->getMovingAverage($date, $supportType, $window) * $seasonalIndex[$month]);
            }
        }
        reset($this->requests);

        //*/

        $this->requestsToQuantities();
    }

    private function requestsToQuantities(){
        foreach($this->requests as $date => $supportTypes){
            foreach($supportTypes as $supportType => $count){
                $this->supportQuantities[] = array(
                    "supportType"=>$supportType,
                    "startDate"=>$date,
                    "endDate"=>date('Y-m-d', strtotime($date . '+ 1 months - 1 days')),
                    "supportRequestCount"=>$count
                );
            }
        }
    }

    private function getMovingAverage($date, $supportType, $window){
        $sum = 0;

        for($i = 1; $i <= $window; $i++){ //Compute moving average
            $prevDate = date('Y-m-d', strtotime($date . ' -' . $i . ' months'));

            //echo $prevDate, ' : ';
            //echo isset($this->requests[$prevDate]), ' ';

            if (!isset($this->requests[$prevDate])){
                continue;
            }
            
            $prevCount = isset($this->requests[$prevDate][$supportType]) ? $this->requests[$prevDate][$supportType] : 0;

            //echo $prevCount, ' | ';

            $sum += $prevCount;
        }

        return intval($sum/$window);
    }

    public function calculateLoads() {
        $this->setSupportTyoes();
        $this->setAvailableDates();
        //var_dump($this->availableDates);
        //var_dump($this->supportQuantities);
        //var_dump($this->supportAdministrationTimes);
        //var_dump($this->departmentInfoSysUsages);
        $this->quantitiesForDepartments();
        //var_dump($this->supportQuantitiesForDepartments);
        $this->quantitiesForInformationSystems();
        $loads = array("departmentRequests"=>$this->supportQuantitiesForDepartments,
            "departmentHours"=>$this->hourQuantitiesForDepartments,
            "infoSysRequests"=>$this->supportQuantitiesForInformationSystems,
            "infoSysHours"=>$this->hourQuantitiesForInformationSystems
        );
        return $loads;
    }



    private function quantitiesForDepartments() {
        $this->supportQuantitiesForDepartments = array();
        $this->hourQuantitiesForDepartments = array();
        foreach ($this->supportQuantities as $supportQuantity) {
            $supportType = $supportQuantity['supportType'];
            //echo $supportType;
            $startDate = $supportQuantity['startDate'];
            $supportRequestCount = $supportQuantity['supportRequestCount'];
            foreach ($this->supportAdministrationTimes as $supportAdministrationTime) {
                $department = $supportAdministrationTime['department'];
                $hoursCount = $supportAdministrationTime['hoursCount'];
                //echo $supportAdministrationTime['supportType'];
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

    private function getGivenStartDateIndexInArray($startDate, $array) {
        foreach ($array as $key=>$value) {
            if ($value['startDate'] === $startDate) {
                return $key;
            }
        }
        return -1;
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

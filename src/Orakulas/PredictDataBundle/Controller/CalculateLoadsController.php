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

    public function calculateLoads() {
        $this->setSupportTypes();
        $this->generateRequests();
        $this->forecast();

        $this->setAvailableDates();

        $this->quantitiesForDepartments();

        $this->quantitiesForInformationSystems();
        
        $loads = array("departmentRequests"=>$this->supportQuantitiesForDepartments,
            "departmentHours"=>$this->hourQuantitiesForDepartments,
            "infoSysRequests"=>$this->supportQuantitiesForInformationSystems,
            "infoSysHours"=>$this->hourQuantitiesForInformationSystems
        );
        return $loads;
    }

    private function setSupportTypes(){
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
        }
    }

    private function generateRequests(){
        foreach ($this->supportQuantities as $quantity) {
            $startDate = $quantity['startDate'];

            if (!isset($this->requests[$startDate])){
                $this->requests[$startDate] = array();
            }
            $this->requests[$startDate][$quantity['supportType']] = $quantity['supportRequestCount'];
        }
    }

    private function forecast(){
        $totalPeriod = 60; //months
        $window = 12;
        $uptrend = 0.025;

        $fData = array();
        foreach ($this->supportTypes as $supportType){
            $fData[$supportType] = array(
                "seasonalIndex" => array_fill(1, 12, 0),
                "seasonalSums" => array_fill(1, 12, 0),
                "seasonalCounts" => array_fill(1, 12, 0)
            );
        };

        foreach (array_slice($this->requests, $window) as $date => $values){ //Calculate seasonalities
            $month = intval(date('n', strtotime($date)));

            foreach($this->supportTypes as $supportType){
                $avg = $this->getMovingAverage($date, $supportType, $window);

                if (!isset($values[$supportType])){
                    $values[$supportType] = 0;
                }

                $val = $avg ? $values[$supportType]/$avg : 0;

                $fData[$supportType]['seasonalSums'][$month] += $val;
                $fData[$supportType]['seasonalCounts'][$month]++;
            }
        }

        foreach($fData as $supportType => $values){ //Construct seasonal index
            $avgs = array_fill(1, 12, 0);
            $avgSum = 0;
            for ($i = 1; $i <= 12; $i++){
                $avgs[$i] = $fData[$supportType]['seasonalSums'][$i]/$fData[$supportType]['seasonalCounts'][$i];
                $avgSum += $avgs[$i];
            }

            if ($avgSum){
                for ($i = 1; $i <= 12; $i++){
                    $avgs[$i] = 12*$avgs[$i]/$avgSum;
                }
            }

            for ($i = 1; $i <= 12; $i++){
                $fData[$supportType]['seasonalIndex'][$i] = $avgs[$i];
            }
        }



        end($this->requests);
        $oldSize = sizeof($this->requests);
        
        for ($period = 1; $period <= $totalPeriod; $period++){ //TODO: optimize
            $date = date('Y-m-d', strtotime(key($this->requests) . ' +' . $period . ' months'));

            $month = intval(date('n', strtotime($date)));

            $this->requests[$date] = array();
            foreach($this->supportTypes as $supportType){
                $forecast = $this->getMovingAverage($date, $supportType, $window);

                $this->requests[$date][$supportType] = intval( $forecast * $fData[$supportType]['seasonalIndex'][$month] * (1 + $uptrend));
            }
        }
        reset($this->requests);

        //*/
        $this->requestsToQuantities($oldSize);
    }

    private function requestsToQuantities($offset){
        foreach(array_slice($this->requests, $offset) as $date => $supportTypes){
            foreach($supportTypes as $supportType => $count){
                $this->supportQuantities[] = array(
                    "supportType"=>$supportType,
                    "startDate"=>$date,
                    "endDate"=>date('Y-m-d', strtotime($date . '+ 1 months - 1 days')),
                    "supportRequestCount"=>$count
                );
            };
        };
    }

    private function getMovingAverage($date, $supportType, $window){
        $sum = 0;

        $weights = array();
        for ($i = $window; $i >= 1; $i--){
            $weights[$window + 1 - $i] = $i;
        }
        
        //normalize
        $sumWeights = 0;
        foreach ($weights as $weight){
            $sumWeights += $weight;
        }
        foreach ($weights as $idx => $weight){
            $weights[$idx] /= $sumWeights;
        }
        
        //echo '<p><b>', $date, '</b> ::: ';
        $expAvg = 0;

        for($i = 1; $i <= $window; $i++){ //Compute moving average
            $prevDate = date('Y-m-d', strtotime($date . ' -' . $i . ' months'));

            //echo $prevDate, ' : ';

            if (!isset($this->requests[$prevDate])){
                continue;
            }
            
            $prevCount = isset($this->requests[$prevDate][$supportType]) ? $this->requests[$prevDate][$supportType] : 0;

            //echo $prevCount, ' | ';

            $expAvg += $weights[$i] * $prevCount;

            $sum += $prevCount;
        }

        //echo '<b>', intval($sum/$window),'</b></p>';
        return $expAvg;
        //return intval($sum/$window);
    }

    private function quantitiesForDepartments() {
        //$testDate = '2011-01-01'; $testType = 'P1-1';

        $this->supportQuantitiesForDepartments = array();
        $this->hourQuantitiesForDepartments = array();
        foreach ($this->supportQuantities as $supportQuantity) {
            $supportType = $supportQuantity['supportType'];
            //echo $supportType;
            $startDate = $supportQuantity['startDate'];
            $supportRequestCount = $supportQuantity['supportRequestCount'];

            //if (!strcmp($startDate, $testDate) && !strcmp($supportType, $testType))
                //var_dump($supportQuantity);

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

        //var_dump($this->supportQuantitiesForDepartments);
        //exit();
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

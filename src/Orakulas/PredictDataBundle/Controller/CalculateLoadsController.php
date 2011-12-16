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
        $totalPeriod = 24; //months
        $window = 10;

        $averages = array();
        foreach ($this->supportTypes as $supportType){
            $averages[$supportType] = array(
                "winterSum" => 0,
                "winterCount" => 0,
                "springSum" => 0,
                "springCount" => 0,
                "summerSum" => 0,
                "summerCount" => 0,
                "autumnSum" => 0,
                "autumnCount" => 0,
                "seasonalIndex" => array_fill(1, 12, 0)
            );
        };

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
                    $averages[$supportType]['winterSum'] += $val; $averages[$supportType]['winterCount']++; //$winterSum += $val; $winterCount++;
                } else if ($month == 3 || $month == 4 || $month == 5){
                    $averages[$supportType]['springSum'] += $val; $averages[$supportType]['springCount']++; //$springSum += $val; $springCount++;
                } else if ($month == 6 || $month == 7 || $month == 8){
                    $averages[$supportType]['summerSum'] += $val; $averages[$supportType]['summerCount']++; //$summerSum += $val; $summerCount++;
                } else if ($month == 9 || $month == 10 || $month == 11){
                    $averages[$supportType]['autumnSum'] += $val; $averages[$supportType]['autumnCount']++; //$autumnSum += $val; $autumnCount++;
                }
            }
        }

        foreach($averages as $supportType => $values){
            $winterAvg = $averages[$supportType]['winterSum']/$averages[$supportType]['winterCount'];
            $springAvg = $averages[$supportType]['springSum']/$averages[$supportType]['springCount'];
            $summerAvg = $averages[$supportType]['summerSum']/$averages[$supportType]['summerCount'];
            $autumnAvg = $averages[$supportType]['autumnSum']/$averages[$supportType]['autumnCount'];

            $sumAvg = $winterAvg + $springAvg + $summerAvg + $autumnAvg;

            if ($sumAvg == 0)
                continue;

            //Normalize
            $winterAvg = 4*$winterAvg/$sumAvg;
            $springAvg = 4*$springAvg/$sumAvg;
            $summerAvg = 4*$summerAvg/$sumAvg;
            $autumnAvg = 4*$autumnAvg/$sumAvg;

            $averages[$supportType]['seasonalIndex'][12] = $winterAvg;
            $averages[$supportType]['seasonalIndex'][1] = $winterAvg;
            $averages[$supportType]['seasonalIndex'][2] = $winterAvg;
            $averages[$supportType]['seasonalIndex'][3] = $springAvg;
            $averages[$supportType]['seasonalIndex'][4] = $springAvg;
            $averages[$supportType]['seasonalIndex'][5] = $springAvg;
            $averages[$supportType]['seasonalIndex'][6] = $summerAvg;
            $averages[$supportType]['seasonalIndex'][7] = $summerAvg;
            $averages[$supportType]['seasonalIndex'][8] = $summerAvg;
            $averages[$supportType]['seasonalIndex'][9] = $autumnAvg;
            $averages[$supportType]['seasonalIndex'][10] = $autumnAvg;
            $averages[$supportType]['seasonalIndex'][11] = $autumnAvg;
        }

        //var_dump($averages);
        //exit();

        //now the fun begins
        //echo '<pre><hr>';

        end($this->requests);
        $oldSize = sizeof($this->requests);
        
        for ($period = 1; $period <= $totalPeriod; $period++){ //TODO: optimize
            $date = date('Y-m-d', strtotime(key($this->requests) . ' +' . $period . ' months'));

            $month = intval(date('n', strtotime($date)));

            $this->requests[$date] = array();
            foreach($this->supportTypes as $supportType){
                $this->requests[$date][$supportType] = intval($this->getMovingAverage($date, $supportType, $window) * $averages[$supportType]['seasonalIndex'][$month]);
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

        //echo '<p><b>', $date, '</b> ::: ';

        for($i = 1; $i <= $window; $i++){ //Compute moving average
            $prevDate = date('Y-m-d', strtotime($date . ' -' . $i . ' months'));

            //echo $prevDate, ' : ';

            if (!isset($this->requests[$prevDate])){
                continue;
            }
            
            $prevCount = isset($this->requests[$prevDate][$supportType]) ? $this->requests[$prevDate][$supportType] : 0;

            //echo $prevCount, ' | ';

            $sum += $prevCount;
        }

        //echo '<b>', intval($sum/$window),'</b></p>';

        return intval($sum/$window);
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

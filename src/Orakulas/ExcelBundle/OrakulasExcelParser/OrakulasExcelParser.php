<?php

namespace Orakulas\ExcelBundle\OrakulasExcelParser;

use \PHPExcel;
use \PHPExcel_Reader_Excel5;
use \PHPExcel_Reader_Excel2007;

class OrakulasExcelParser {

    private $filename;
    private $objPHPExcel;
    private $objReader;
    private $sheet; //sheet object
    private $rowIterator; //rowIterator object
    private $readerIsSet = false;

    function __construct($name) {
        $this->filename = $name;
        $this->objPHPExcel = new PHPExcel();
    }

    public function setObjReaderExcel5() {
        $this->objReader = new PHPExcel_Reader_Excel5();
        $this->objPHPExcel = $this->objReader->load($this->filename);
        $this->readerIsSet = true;
    }

    public function setObjReaderExcel2007() {
        $this->objReader = new PHPExcel_Reader_Excel2007();
        $this->objPHPExcel = $this->objReader->load($this->filename);
        $this->readerIsSet = true;
    }

    public function echoFilename() {
        echo $this->filename;
    }

    /**
     * @throws ExcelException
     * @param $sheetName - sheeto vardas
     * @return int - sheeto numeris. Jei -1, sheetas neegzistuoja
     */
    private function getSheetNumber($sheetName) {
        $this->objReader->setReadDataOnly(true);
        $namesArray = $this->objPHPExcel->getSheetNames();
        for ($i=0; $i<sizeof($namesArray); $i++) {
            if ($namesArray[$i] == $sheetName) {
                return $i;
            }
        }
        return -1;
    }

    /**
     * @throws OrakulasExcelParserException
     * @param $sheetName
     * @return int - 0 if everything ok, -1 if no such sheet exists
     */
    private function initReading($sheetName) {
        if (!$this->readerIsSet) {
            throw new OrakulasExcelParserException("Reader is not set");
        }

        if ($sheetName != null) {
            $sheetNumber = $this->getSheetNumber($sheetName);
        } else {
            $sheetNumber = 0;
        }

        if ($sheetNumber != -1) {
            $this->sheet = $this->objPHPExcel->getSheet($sheetNumber);
            $this->objReader->setReadDataOnly(true);
            $this->rowIterator = $this->sheet->getRowIterator();
            return 0;
        } else {
            return -1;
        }

    }

    private function nullParameters() {
        $this->sheet = null;
        $this->rowIterator = null;
    }

    /**
     * Nuskaito pirmus du stulpelius is $sheet juos masyve idedamas su $column1Name, $column2Name pavadinimais
     * @throws OrakulasExcelParserException
     * @param $column1Name - pirmo stulpelio pavadinimas
     * @param $column2Name - antro stulpelio pavadinimas
     * @param $ignoreFirstRow - ar skaityti pirma eilute
     * @return array - nuskaityti stulepiai masyve array($column1Name->xx, $column2Name->yy)
     */
    private function readFirstTwoColumns($column1Name, $column2Name, $ignoreFirstRow) {
        $array_data = array();
        foreach ($this->rowIterator as $row){
            $rowIndex = $row->getRowIndex();

            if (($rowIndex != 1) || (($rowIndex == 1) && ($ignoreFirstRow == false))) {
                $cell = $this->sheet->getCell('A'.$rowIndex);
                $cellAnValue = $cell->getCalculatedValue();
                $cell = $this->sheet->getCell('B'.$rowIndex);
                $cellBnValue = $cell->getCalculatedValue();

                if ((strlen($cellAnValue) == 0) || (strlen($cellBnValue) == "")) {
                    throw new OrakulasExcelParserException("Empty row");
                }

                $array_data[] = array(
                    $column1Name=>$cellAnValue,
                    $column2Name=>$cellBnValue,
                );
            }
        }
        return $array_data;
    }

    /**
     * @param $sheetName - norimo nuskaityt sheeto vardas. Jei null - skaitys nulini
     * @param $ignoreFirstRow - ar skaityti pirma eilute
     * @return $array_data - nuskaityti stulepiai masyve array(id->xx, subdivision->yy)
     */
    public function readDepartments($sheetName, $ignoreFirstRow) {
        $this->initReading($sheetName);
        $array_data = $this->readFirstTwoColumns("id", "department", $ignoreFirstRow);
        $this->nullParameters();
        return $array_data;
    }

    /**
     * @param $sheetName - norimo nuskaityt sheeto vardas. Jei null - skaitys nulini
     * @param $ignoreFirstRow - ar skaityti pirma eilute
     * @return $array_data - nuskaityti stulepiai masyve array(id->xx, is->yy)
     */
    public function readIS($sheetName, $ignoreFirstRow) {
        $this->initReading($sheetName);
        $array_data = $this->readFirstTwoColumns("id", "is", $ignoreFirstRow);
        $this->nullParameters();
        return $array_data;
    }

    /**
     * @throws OrakulasExcelParserException
     * @param $sheetName - norimo nuskaityt sheeto vardas. Jei null - skaitys nulini
     * @param $ignoreFirstRow - ar skaityti pirma eilute
     * @return array - nuskaityti stulepiai masyve array(id->xx, supportMean->yy)
     */
    public function readSupportMeans($sheetName, $ignoreFirstRow) {
        $this->initReading($sheetName);

        $array_data = array();
        foreach ($this->rowIterator as $row){
            $rowIndex = $row->getRowIndex();

            if (($rowIndex != 1) || (($rowIndex == 1) && ($ignoreFirstRow == false))) {
                $cell = $this->sheet->getCell('A'.$rowIndex);
                $cellAnValue = $cell->getCalculatedValue();
                $cell = $this->sheet->getCell('B'.$rowIndex);
                $cellBnValue = $cell->getCalculatedValue();

                if (strlen($cellAnValue) == 0) {
                    if ((strlen($cellBnValue) == 0) || (preg_match('/\d\sKRYPTIS\s/', $cellBnValue) == 0)) {
                        throw new OrakulasExcelParserException("Empty row");
                    }
                }

                $array_data[] = array(
                    'id'=>$cellAnValue,
                    'supportMean'=>$cellBnValue,
                );
            }
        }

        $this->nullParameters();
        return $array_data;
    }

    /**
     * @throws OrakulasExcelParserException
     * @param $sheetName - norimo nuskaityt sheeto vardas. Jei null - skaitys nulini
     * @param $ignoreFirstRow - ar skaityti pirma eilute
     * @return array - nuskaityti stulepiai masyve array(supportMean->xx, from->yy, to->zz, quantity->ww)
     */
    public function readSupportQuantities($sheetName, $ignoreFirstRow) {
        $success = true;
        $errors  = null;

        $initIndex = $this->initReading($sheetName);
        if ($initIndex == -1) {
            $success = false;
            $errors  = "NO_SUCH_SHEET";
        }

        $array_data = array();
        if ($success) {
            foreach ($this->rowIterator as $row){
                $rowIndex = $row->getRowIndex();

                if (($rowIndex != 1) || (($rowIndex == 1) && ($ignoreFirstRow == false))) {
                    $cell = $this->sheet->getCell('A'.$rowIndex);
                    $cellAnValue = $cell->getCalculatedValue();
                    $cell = $this->sheet->getCell('B'.$rowIndex);
                    $cellBnValue = $cell->getCalculatedValue();
                    $cell = $this->sheet->getCell('C'.$rowIndex);
                    $cellCnValue = $cell->getCalculatedValue();
                    $cell = $this->sheet->getCell('D'.$rowIndex);
                    $cellDnValue = $cell->getCalculatedValue();

                    $ts = mktime(0, 0, 0, 1, $cellBnValue-1, 1900);
                    $cellBnValue = $ts;
                    $ts = mktime(0, 0, 0, 1, $cellCnValue-1, 1900);
                    $cellCnValue = $ts;

                    if ((strlen($cellAnValue) == 0) || (strlen($cellBnValue) == "") || (strlen($cellCnValue) == "") || (strlen($cellDnValue) == 0)) {
                        $success = false;
                        $errors  = "INVALID_DATA";
                        break;
                    }

                    $startDate = date("Y-m-d", $cellBnValue);
                    $endDate = date("Y-m-d", $cellCnValue);

                    $array_data[] = array(
                        'type'=>$cellAnValue,
                        'startDate'=>$startDate,
                        'endDate'=>$endDate,
                        'amount'=>$cellDnValue,
                    );
                }
            }
        }

        $dataToReturn = array(
            'success' => $success,
            'errors'  => $errors,
            'data'    => $array_data,
        );

        $this->nullParameters();
        return json_encode($dataToReturn);
    }

    /**
     * @param $sheetName - norimo nuskaityt sheeto vardas. Jei null - skaitys nulini
     * @return array - masyvas[Padalinys][naudojamos informacines sistemos]
     */
    public function usabilityOfISBySubdivisions($sheetName) {
        return $this->readMatrix($sheetName);
    }

    /**
     * @param $sheetName - norimo nuskaityt sheeto vardas. Jei null - skaitys nulini
     * @return array - masyvas[Padalinys][paramos priemonė]
     */
    public function supportAdministration($sheetName) {
        return $this->readMatrix($sheetName);
    }

    /**
     * @param $sheetName
     * @return array - masyvas[Padalinys][IS arba Priemonė]
     */
    private function readMatrix($sheetName) {
        $this->initReading($sheetName);
        $subdivisionNames = $this->getNamesFromFirstRow();
        $iSnames = $this->getNamesFromFirstColumn();
        $array_data = array();
        $column = 'B';
        foreach ($subdivisionNames as $subdivision) {
            $row = 2;
            foreach ($iSnames as $iS) {
                $cell = $this->sheet->getCell($column.$row);
                $cellValue = $cell->getCalculatedValue();
                if ($cellValue == "") {
                    $cellValue = 0;
                }
                $array_data[$subdivision][$iS] = $cellValue;
                $row++;
            }
            $column++;
        }
        return $array_data;
    }

    /**
     * @throws OrakulasExcelParserException - jei langelis tuscias
     * @return array - vardai is excelio 1 eilutes pradedant stulpeliu B.
     */
    private function getNamesFromFirstRow() {
        $row = 1;
        $lastColumn = $this->sheet->getHighestColumn();
        $array_data = array();
        $i = 0;
        for ($column = 'B'; $column <= $lastColumn; $column++) {
            $cell = $this->sheet->getCell($column.$row);
            $cellValue = $cell->getCalculatedValue();
            if ($cellValue == "") {
                break;
            }
            $array_data[$i] = $cellValue;
            $i++;
        }
        return $array_data;
    }

    /**
     * @throws OrakulasExcelParserException - jei langelis tuscias
     * @return array - vardai is excelio stulpelio A pradedant 2 eilute.
     */
    private function getNamesFromFirstColumn() {
        $column = 'A';
        $lastRow = $this->sheet->getHighestRow();
        $array_data = array();
        for ($row = 2; $row <= $lastRow; $row++) {
            $cell = $this->sheet->getCell($column.$row);
            $cellValue = $cell->getCalculatedValue();
            if ($cellValue == "") {
                break;
            }
            $array_data[$row-2] = $cellValue;
        }
        return $array_data;
    }

}

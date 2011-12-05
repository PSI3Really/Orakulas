<?php

namespace Orakulas\ExcelBundle\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use \Orakulas\ExcelBundle\OrakulasExcelParser\OrakulasExcelParser;
use \Orakulas\ExcelBundle\OrakulasExcelParser\OrakulasExcelParserException;

class ImportController extends Controller {

    /**
     * $_POST["skipFirstLine"] = 0 - praleis pirma eilute, jei ne nulis, nepraleis (arba jei nera parametro)
     * $_POST["sheetName] = sheetName - skaitys parodyta sheeta, jei nera - skaitys pirma sheeta.
     * @throws \Orakulas\ExcelBundle\OrakulasExcelParser\OrakulasExcelParserException
     * @return array
     */
    public function readSupportHistoriesAction() {
        $filename = $_FILES['dataFile']['tmp_name'];

        $reader = new OrakulasExcelParser($filename);
        if ($_FILES['dataFile']['type'] === "application/vnd.ms-excel") {
            $reader->setObjReaderExcel5();
        } elseif ($_FILES['dataFile']['type'] === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
            $reader->setObjReaderExcel2007();
        } else {
            throw new OrakulasExcelParserException("Unrecognisable file format");
        }

        $skipFirstLine = 0;
        if (isset($_POST['skipFirstLine'])) {
            $skipFirstLine = $_POST['skipFirstLine'];
        }

        $sheetName = null;
        if (isset($_POST['sheetName'])) {
            $sheetName = $_POST['sheetName'];
        }

        return $this->constructResponse($reader->readSupportQuantities($sheetName, $skipFirstLine));
    }

    /**
     * @param \string $string
     * @return \Symfony\Component\HttpFoundation\Response
     */
    private function constructResponse($string) {
        $response = new Response($string);
        $response->headers->set('Content-Type', 'application/json');

        return $response;
    }

}

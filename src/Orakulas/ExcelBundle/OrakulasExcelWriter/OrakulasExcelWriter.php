<?php

namespace Orakulas\ExcelBundle\OrakulasExcelWriter;

use \PHPExcel;
use \PHPExcel_IOFactory;
use \PHPExcel_Worksheet_Drawing;

class OrakulasExcelWriter
{

    private $objPHPExcel;
    private $filename;
    private $sheetIndex = 0;

    function __construct($filename)
    {
        $this->objPHPExcel = new PHPExcel();
        $this->filename = $filename;
    }

    public function writeData($tables)
    {
        foreach ($tables as $sheetName => $sheetContent) {
            if ($this->sheetIndex != 0) {
                $this->objPHPExcel->createSheet();
            }
            $sheet = $this->objPHPExcel->setActiveSheetIndex($this->sheetIndex);
            $sheet = $this->objPHPExcel->getActiveSheet()->setTitle($sheetName);
            $rowIndex = 1;
            foreach ($sheetContent as $row) {
                foreach ($row as $columnIndex => $data) {
                    $sheet->setCellValueByColumnAndRow($columnIndex, $rowIndex, $data);
                }
                $rowIndex++;
            }
            
            $this->sheetIndex++;
        }

    }

    public function insertImages($images)
    {
        $objDrawing = new PHPExcel_Worksheet_Drawing();

        foreach ($images as $sheetName=>$image) {
            if ($this->sheetIndex != 0) {
                $this->objPHPExcel->createSheet();
            }
            $sheet = $this->objPHPExcel->setActiveSheetIndex($this->sheetIndex);
            $sheet = $this->objPHPExcel->getActiveSheet()->setTitle($sheetName);
            $objDrawing->setPath($image);
            $objDrawing->setCoordinates("A1");
            $objDrawing->setWorksheet($sheet);
            $this->sheetIndex++;
        }
    }

    public function saveFile()
    {
        $objWriter = null;
        if (preg_match('/\.xls$/', $this->filename)) {
            $objWriter = PHPExcel_IOFactory::createWriter($this->objPHPExcel, 'Excel5');
        } elseif (preg_match('/\.xlsx$/', $this->filename)) {
            $objWriter = PHPExcel_IOFactory::createWriter($this->objPHPExcel, 'Excel2007');
        } else {
            return false;
        }
        
        $directory = "savedExcels/";
        $objWriter->save($directory.$this->filename);
        return true;
    }

}

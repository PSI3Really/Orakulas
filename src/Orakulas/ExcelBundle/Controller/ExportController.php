<?php

namespace Orakulas\ExcelBundle\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use \Orakulas\ExcelBundle\OrakulasExcelWriter\OrakulasExcelWriter;

class ExportController extends Controller
{
    private $filename;

    public function exportDataAction()
    {
        $jsonData = json_decode($_POST['data'], true);
        $this->filename = $jsonData['filename'];

        $writer = new OrakulasExcelWriter($this->filename);

        if (isset($jsonData['tables'])) {
            $writer->writeData($jsonData['tables']);
        }

        if (isset($jsonData['images'])) {
            $writer->insertImages($jsonData['images']);
        }


        if (isset($jsonData['analysis'])) {
            $writer->writeData($jsonData['analysis']);
        }

        $success = $writer->saveFile();
        
        if ($success != false) {
            return $this->constructResponse($success);
        } else {
            $response = new Response('"success":"false"');
            $response->headers->set('Content-Type', 'application/json');
            
            return $response;
        }

    }

    protected function constructResponse()
    {
        $response = new Response();
        $response->headers->set('Content-Disposition', "attachment; filename=$this->filename");
        //if (preg_match('/\.xls$/', $this->filename)) {
            //$response->headers->set('Content-Type', 'application/vnd.ms-excel');
        //$response->headers->set('Content-Type', 'application/force-download');

          //  $response->headers->set('Content-Type', 'application/octet-stream');
           // $response->headers->set('Content-Type', 'application/download');

        //} else {
            
        //}
        $response->setContent(readfile("./savedExcels/".$this->filename));

        return $response;
    }

}

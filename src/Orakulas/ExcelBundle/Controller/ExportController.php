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


        $response = array(
            'success' => $success,
            'url' => "excel/download/$this->filename"
        );
        $response = json_encode($response);

        return $this->constructResponse($response);
    }

    /**
     * @param \string $string
     * @return \Symfony\Component\HttpFoundation\Response
     */
    protected function constructResponse($string)
    {
        $response = new Response($string);
        $response->headers->set('Content-Type', 'application/json');

        return $response;
    }

}

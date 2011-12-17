<?php

namespace Orakulas\ExcelBundle\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use \Orakulas\ExcelBundle\OrakulasExcelWriter\OrakulasExcelWriter;

class ExportController
{
    public function exportDataAction()
    {
        $jsonData = json_decode($_POST['data'], true);
        $filename = $jsonData['filename'];

        $writer = new OrakulasExcelWriter($filename);

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

        if ($success === "false") {
            $success = '{"success":"false"}';
        } else {
            $success = '{"success":"true"}';
        }

        return $this->constructResponse($success);
    }

    /**
     * @param \string $string
     * @return \Symfony\Component\HttpFoundation\Response
     */
    protected function constructResponse($string) {
        $response = new Response($string);
        $response->headers->set('Content-Type', 'application/json');

        return $response;
    }

}

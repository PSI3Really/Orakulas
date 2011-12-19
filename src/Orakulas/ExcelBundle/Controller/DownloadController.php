<?php

namespace Orakulas\ExcelBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;

class DownloadController extends Controller
{
    public function downloadAction($filename) {
        $response = null;
        
        if (file_exists("./savedExcels/".$filename)) {
            $response = new Response();
            $response->headers->set('Content-Disposition', "attachment; filename=$filename");
            $response->headers->set('Content-Type', 'application/vnd.ms-excel');
            $response->setContent(readfile("./savedExcels/".$filename));
        } else {
            $response = new Response("File not found");
        }
        
        return $response;
    }

}

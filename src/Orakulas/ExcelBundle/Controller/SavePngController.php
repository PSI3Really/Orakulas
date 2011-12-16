<?php

namespace Orakulas\ExcelBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;

class SavePngController extends Controller
{

    public function savePngAction()
    {

        $success = "false";
        $url = "fakeUrl";

        if (isset($_POST['imageData'])) {
            $jsonData = $_POST['imageData'];
            $jsonData = json_decode($jsonData, true);
            if (isset($jsonData['name']) && isset($jsonData['image'])) {
                $imageName = $jsonData['name'];
                $codedImage = $jsonData['image'];

                $image = base64_decode($codedImage);

                if ($image != false) {
                    $url = 'savedImages/' . $imageName . '.png';

                    file_put_contents($url, $image);
                    $success = true;
                }
            }
        }

        $response = array(
            'success'=>$success,
            'url'=>$url
        );
        $response = json_encode($response);

        return $this->constructResponse($response);
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

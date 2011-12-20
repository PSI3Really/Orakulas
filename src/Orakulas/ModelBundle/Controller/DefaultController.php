<?php

namespace Orakulas\ModelBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;
use \Orakulas\ModelBundle\Facades\EntityFacade;

class DefaultController extends Controller {

    /**
     * @var \Orakulas\ModelBundle\Facades\EntityFacade
     */
    private $entityFacade;

    public function createAction() {
        $json = $_POST["jsonValue"];

        $entityArray = array();
        if (!is_array(json_decode($json))) {
            $entityArray[] = json_decode($json, true);
        } else {
            $entityArray = json_decode($json, true);
        }

        $returnArray = array();

        foreach ($entityArray as $e) {
            $entity = $this->getEntityFacade()->fromArray($e);

            $this->getEntityFacade()->save($entity);

            $returnArray[] = $this->getEntityFacade()->toArray($entity);
        }

        return $this->constructResponse(json_encode($returnArray));
    }

    public function readAction() {
        $entities = $this->getEntityFacade()->loadAll();

        $jsonObjects = array();

        foreach ($entities as $entity) {
            $jsonObjects[] = $this->getEntityFacade()->toArray($entity);
        }

        return $this->constructResponse(json_encode($jsonObjects));
    }

    public function updateAction() {
        $json = $_POST["jsonValue"];

        $entityArray = array();
        if (!is_array(json_decode($json))) {
            $entityArray[] = json_decode($json, true);
        } else {
            $entityArray = json_decode($json, true);
        }

        $returnArray = array();

        foreach ($entityArray as $e) {
            $entity = $this->getEntityFacade()->load($e['id']);

            $this->getEntityFacade()->merge($entity, $e);

            $this->getEntityFacade()->save($entity);

            $returnArray[] = $this->getEntityFacade()->toArray($entity);
        }

        $responseObject = $returnArray;
        if (count($returnArray) == 1) {
            $responseObject = $returnArray[0];
        }

        return $this->constructResponse(json_encode($responseObject));
    }

    public function deleteAction() {
        $json = $_POST["jsonValue"];

        $entityArray = array();
        if (!is_array(json_decode($json))) {
            $entityArray[] = json_decode($json, true);
        } else {
            $entityArray = json_decode($json, true);
        }

        $returnArray = array();

        foreach ($entityArray as $e) {
            $entity = $this->getEntityFacade()->fromArray($e);

            $this->getEntityFacade()->delete($entity->getId());

            $returnArray[] = $entity->getId();
        }

        $responseObject = $returnArray;
        if (count($returnArray) == 1) {
            $responseObject = $returnArray[0];
        }

        return $this->constructResponse(json_encode($responseObject));
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

    /**
     * @param \Orakulas\ModelBundle\Facades\EntityFacade $entityFacade
     */
    public function setEntityFacade($entityFacade) {
        $this->entityFacade = $entityFacade;
    }

    /**
     * @return \Orakulas\ModelBundle\Facades\EntityFacade
     */
    protected function getEntityFacade() {
        return $this->entityFacade;
    }

}
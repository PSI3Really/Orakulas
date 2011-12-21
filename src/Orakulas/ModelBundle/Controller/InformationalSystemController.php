<?php

namespace Orakulas\ModelBundle\Controller;

use \Orakulas\ModelBundle\Controller\DefaultController;
use \Orakulas\ModelBundle\Facades\InformationalSystemFacade;

class InformationalSystemController extends DefaultController {

    public function getEntityFacade() {
        $entityFacade = parent::getEntityFacade();

        if ($entityFacade == NULL) {
            $entityFacade = new InformationalSystemFacade();
            $entityFacade->setDoctrine($this->getDoctrine());

            parent::setEntityFacade($entityFacade);
        }

        return $entityFacade;
    }

    /*public function updateAction() {
        $json = $_POST["jsonValue"];

        $entityArray = array();
        if (!is_array(json_decode($json))) {
            $entityArray[] = json_decode($json, true);
        } else {
            $entityArray = json_decode($json, true);
        }

        $returnArray = array();

        foreach ($entityArray as $e) {
            $informationalSystem = $this->getEntityFacade()->load($e['id']);

            $this->getEntityFacade()->merge($informationalSystem, $e);

            $this->getEntityFacade()->setUsedByDepartments($informationalSystem, $departments);

            $returnArray[] = $this->getEntityFacade()->toArray($informationalSystem);
        }

        $responseObject = $returnArray;
        if (count($returnArray) == 1) {
            $responseObject = $returnArray[0];
        }

        return $this->constructResponse(json_encode($responseObject));
    }*/

    /*public function createAction() {
        $json = $_POST["jsonValue"];

        $entityArray = array();
        if (!is_array(json_decode($json))) {
            $entityArray[] = json_decode($json, true);
        } else {
            $entityArray = json_decode($json, true);
        }

        $returnArray = array();

        foreach ($returnArray as $e) {
            $departments = explode(" ", trim($e['departments']));
            if (count($departments) <= 0 || $departments[0] == '') {
                $departments = array();
            }

            $informationalSystem = $this->getEntityFacade()->fromArray($e);

            $this->getEntityFacade()->save($informationalSystem);

            $this->getEntityFacade()->setUsedByDepartments($informationalSystem, $departments);

            $returnArray[] = $this->getEntityFacade()->toArray($informationalSystem);
        }

        $responseObject = $returnArray;
        if (count($returnArray) == 1) {
            $responseObject = $returnArray[0];
        }

        return $this->constructResponse(json_encode($responseObject));
    }*/

    public function usedByAction() {
        $jsonValue = $_POST["jsonValue"];

        $decodedArray = json_decode($jsonValue, true);

        $id = $decodedArray['id'];

        $departmentIds = $this->getEntityFacade()->getUsedByDepartmentsIds($id);

        return $this->constructResponse(json_encode($departmentIds));
    }

}

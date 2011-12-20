<?php

namespace Orakulas\ModelBundle\Controller;

use \Orakulas\ModelBundle\Controller\DefaultController;
use \Orakulas\ModelBundle\Facades\DepartmentFacade;

class DepartmentController extends DefaultController {

    public function getEntityFacade() {
        $entityFacade = parent::getEntityFacade();

        if ($entityFacade == NULL) {
            $entityFacade = new DepartmentFacade();
            $entityFacade->setDoctrine($this->getDoctrine());

            parent::setEntityFacade($entityFacade);
        }

        return $entityFacade;
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

        foreach ($returnArray as $e) {
            $informationalSystems = explode(" ", trim($e['informationalSystems']));
            if (count($informationalSystems) <= 0 || $informationalSystems[0] == '') {
                $informationalSystems = array();
            }

            $tempSupportTypes = explode(", ", trim($e['supportTypes']));
            $supportTypes = array();
            if (count($tempSupportTypes) > 0 && $tempSupportTypes[0] != '') {
                foreach ($tempSupportTypes as $value) {
                    $tempArray = explode(" ", $value);
                    $supportTypes[(int) $tempArray[0]] = (float) $tempArray[1];
                }
            }

            $department = $this->getEntityFacade()->load($e['id']);

            $this->getEntityFacade()->merge($department, $e);

            $this->getEntityFacade()->setUsedInfoSystems($department, $informationalSystems);
            $this->getEntityFacade()->setSupportAdministrationTimes($department, $supportTypes);

            $returnArray[] = $this->getEntityFacade()->toArray($department);
        }

        $responseObject = $returnArray;
        if (count($returnArray) == 1) {
            $responseObject = $returnArray[0];
        }

        return $this->constructResponse(json_encode($responseObject));
    }

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
            $informationalSystems = explode(" ", trim($e['informationalSystems']));
            if (count($informationalSystems) <= 0 || $informationalSystems[0] == '') {
                $informationalSystems = array();
            }

            $tempSupportTypes = explode(", ", trim($e['supportTypes']));
            $supportTypes = array();
            if (count($tempSupportTypes) > 0 && $tempSupportTypes[0] != '') {
                foreach ($tempSupportTypes as $value) {
                    $tempArray = explode(" ", $value);
                    $supportTypes[(int) $tempArray[0]] = (float) $tempArray[1];
                }
            }

            $department = $this->getEntityFacade()->fromArray($e);

            $this->getEntityFacade()->save($department);
            $this->getEntityFacade()->setUsedInfoSystems($department, $informationalSystems);
            $this->getEntityFacade()->setSupportAdministrationTimes($department, $supportTypes);

            $returnArray[] = $this->getEntityFacade()->toArray($department);
        }

        $responseObject = $returnArray;
        if (count($returnArray) == 1) {
            $responseObject = $returnArray[0];
        }

        return $this->constructResponse(json_encode($responseObject));
    }

    public function usedInfoSysAction() {
        $jsonValue = $_POST["jsonValue"];

        $decodedArray = json_decode($jsonValue, true);

        $id = $decodedArray['id'];

        $infoSysIds = $this->getEntityFacade()->getUsedInfoSysIds($id);

        return $this->constructResponse(json_encode($infoSysIds));
    }

    public function administeredSupportTypesAction() {
        $jsonValue = $_POST["jsonValue"];

        $decodedArray = json_decode($jsonValue, true);

        $id = $decodedArray['id'];

        $supportTypeIds = $this->getEntityFacade()->getAdministeredSupportTypeIds($id);

        return $this->constructResponse(json_encode($supportTypeIds));
    }

}

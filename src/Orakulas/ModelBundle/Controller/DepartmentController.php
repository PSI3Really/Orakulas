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
        $jsonValue = $_POST["jsonValue"];

        $decodedArray = json_decode($jsonValue, true);

        $informationalSystems = explode(" ", trim($decodedArray['informationalSystems']));
        if (count($informationalSystems) <= 0 || $informationalSystems[0] == '') {
            $informationalSystems = array();
        }

        $tempSupportTypes = explode(", ", trim($decodedArray['supportTypes']));
        $supportTypes = array();
        if (count($tempSupportTypes) > 0 && $tempSupportTypes[0] != '') {
            foreach ($tempSupportTypes as $value) {
                $tempArray = explode(" ", $value);
                $supportTypes[(int) $tempArray[0]] = (float) $tempArray[1];
            }
        }

        $department = $this->getEntityFacade()->load($decodedArray['id']);

        $this->getEntityFacade()->merge($department, $decodedArray);

        $this->getEntityFacade()->setUsedInfoSystems($department, $informationalSystems);
        $this->getEntityFacade()->setSupportAdministrationTimes($department, $supportTypes);

        return $this->constructResponse($this->getEntityFacade()->toJson($department));
    }

    public function createAction() {
        $jsonValue = $_POST["jsonValue"];

        $decodedArray = json_decode($jsonValue, true);

        $informationalSystems = explode(" ", trim($decodedArray['informationalSystems']));
        if (count($informationalSystems) <= 0 || $informationalSystems[0] == '') {
            $informationalSystems = array();
        }

        $tempSupportTypes = explode(", ", trim($decodedArray['supportTypes']));
        $supportTypes = array();
        if (count($tempSupportTypes) > 0 && $tempSupportTypes[0] != '') {
            foreach ($tempSupportTypes as $value) {
                $tempArray = explode(" ", $value);
                $supportTypes[(int) $tempArray[0]] = (float) $tempArray[1];
            }
        }

        $department = $this->getEntityFacade()->fromArray($decodedArray);

        $this->getEntityFacade()->save($department);
        $this->getEntityFacade()->setUsedInfoSystems($department, $informationalSystems);
        $this->getEntityFacade()->setSupportAdministrationTimes($department, $supportTypes);

        return $this->constructResponse($this->getEntityFacade()->toJson($department));
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

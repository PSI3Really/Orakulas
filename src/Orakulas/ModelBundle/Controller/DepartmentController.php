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

        $department = $this->getEntityFacade()->load($decodedArray['id']);

        $this->getEntityFacade()->merge($department, $decodedArray);

        $this->getEntityFacade()->setUsedInfoSystems($department, $informationalSystems);

        return $this->constructResponse($this->getEntityFacade()->toJson($department));
    }

    public function createAction() {
        $jsonValue = $_POST["jsonValue"];

        $decodedArray = json_decode($jsonValue, true);

        $informationalSystems = explode(" ", trim($decodedArray['informationalSystems']));

        $department = $this->getEntityFacade()->fromArray($decodedArray);

        $this->getEntityFacade()->save($department);

        $this->getEntityFacade()->setUsedInfoSystems($department, $informationalSystems);

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

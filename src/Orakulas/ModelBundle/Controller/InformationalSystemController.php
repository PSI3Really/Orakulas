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

    public function updateAction() {
        $jsonValue = $_POST["jsonValue"];

        $decodedArray = json_decode($jsonValue, true);

        $departments = explode(" ", $decodedArray['departments']);

        $informationalSystemArray = array(
            'id' => $decodedArray['id'],
            'code' => $decodedArray['code'],
            'name' => $decodedArray['name']
        );

        $returnValue = array('success' => true);

        try {
            $informationalSystem = $this->getEntityFacade()->load($informationalSystemArray['id']);

            $this->getEntityFacade()->merge($informationalSystem, $informationalSystemArray);

            $this->getEntityFacade()->setUsedByDepartments($informationalSystem, $departments);
        } catch (\Exception $e) {
            $returnValue['success'] = false;
        }

        return $this->constructResponse(json_encode($returnValue));
    }

    public function usedByAction() {
        $jsonValue = $_POST["jsonValue"];

        $decodedArray = json_decode($jsonValue, true);

        $id = $decodedArray['id'];

        $departmentIds = $this->getEntityFacade()->getUsedByDepartmentsIds($id);

        return $this->constructResponse(json_encode($departmentIds));
    }

}

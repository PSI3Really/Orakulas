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

        $informationalSystems = explode(" ", $decodedArray['informationalSystems']);

        $departmentArray = array(
            'id' => $decodedArray['id'],
            'code' => $decodedArray['code'],
            'name' => $decodedArray['name']
        );

        $returnValue = array('success' => true);

        try {
            $department = $this->getEntityFacade()->load($departmentArray['id']);

            $this->getEntityFacade()->merge($department, $departmentArray);

            $this->getEntityFacade()->setUsedInfoSystems($department, $informationalSystems);
        } catch (\Exception $e) {
            $returnValue['success'] = false;
        }

        return $this->constructResponse(json_encode($returnValue));
    }

    public function usedInfoSysAction() {
        $jsonValue = $_POST["jsonValue"];

        $decodedArray = json_decode($jsonValue, true);

        $id = $decodedArray['id'];

        $infoSysIds = $this->getEntityFacade()->getUsedInfoSysIds($id);

        return $this->constructResponse(json_encode($infoSysIds));
    }

}

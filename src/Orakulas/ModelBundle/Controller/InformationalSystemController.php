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

    public function usedByAction() {
        $jsonValue = $_POST["jsonValue"];

        $decodedArray = json_decode($jsonValue, true);

        $id = $decodedArray['id'];

        $departmentIds = $this->getEntityFacade()->getUsedByDepartmentsIds($id);

        return $this->constructResponse(json_encode($departmentIds));
    }

}

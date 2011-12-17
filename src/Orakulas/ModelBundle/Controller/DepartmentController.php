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

    public function usedInfoSysAction() {
        $jsonValue = $_POST["jsonValue"];

        $decodedArray = json_decode($jsonValue, true);

        $id = $decodedArray['id'];

        $infoSysIds = $this->getEntityFacade()->getUsedInfoSysIds($id);

        return $this->constructResponse(json_encode($infoSysIds));
    }

}

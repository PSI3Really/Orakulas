<?php

namespace Orakulas\ModelBundle\Controller;

use \Orakulas\ModelBundle\Controller\DefaultController;
use \Orakulas\ModelBundle\Facades\SupportAdministrationTimeFacade;
use \Orakulas\ModelBundle\Facades\DepartmentFacade;
use \Orakulas\ModelBundle\Facades\SupportTypeFacade;

class SupportAdministrationTimeController extends DefaultController {

    public function getEntityFacade() {
        $entityFacade = parent::getEntityFacade();

        if ($entityFacade == NULL) {
            $entityFacade = new SupportAdministrationTimeFacade();
            $departmentFacade = new DepartmentFacade();
            $supportTypeFacade = new SupportTypeFacade();

            $entityFacade->setDoctrine($this->getDoctrine());
            $departmentFacade->setDoctrine($this->getDoctrine());
            $supportTypeFacade->setDoctrine($this->getDoctrine());

            $entityFacade->setDepartmentFacade($departmentFacade);
            $entityFacade->setSupportTypeFacade($supportTypeFacade);

            parent::setEntityFacade($entityFacade);
        }

        return $entityFacade;
    }

}

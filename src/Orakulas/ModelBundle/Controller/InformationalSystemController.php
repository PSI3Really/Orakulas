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

}

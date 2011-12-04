<?php

namespace Orakulas\ModelBundle\Controller;

use \Orakulas\ModelBundle\Controller\DefaultController;
use \Orakulas\ModelBundle\Facades\SupportTypeFacade;
use \Orakulas\ModelBundle\Facades\SupportCategoryFacade;

class SupportTypeController extends DefaultController {

    public function getEntityFacade() {
        $entityFacade = parent::getEntityFacade();

        if ($entityFacade == NULL) {
            $entityFacade = new SupportTypeFacade();
            $supportCategoryFacade = new SupportCategoryFacade();

            $entityFacade->setDoctrine($this->getDoctrine());
            $supportCategoryFacade->setDoctrine($this->getDoctrine());

            $entityFacade->setSupportCategoryFacade($supportCategoryFacade);

            parent::setEntityFacade($entityFacade);
        }

        return $entityFacade;
    }

}

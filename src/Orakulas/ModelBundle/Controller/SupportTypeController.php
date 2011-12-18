<?php

namespace Orakulas\ModelBundle\Controller;

use \Orakulas\ModelBundle\Controller\DefaultController;
use \Orakulas\ModelBundle\Facades\SupportTypeFacade;
use \Orakulas\ModelBundle\Facades\SupportCategoryFacade;

class SupportTypeController extends DefaultController {

    /**
     * @var \Orakulas\ModelBundle\Facades\SupportCategoryFacade
     */
    private $supporCategoryFacade;

    public function getEntityFacade() {
        $entityFacade = parent::getEntityFacade();

        if ($entityFacade == null) {
            $entityFacade = new SupportTypeFacade();

            $entityFacade->setDoctrine($this->getDoctrine());

            $entityFacade->setSupportCategoryFacade($this->getSupportCategoryFacade());

            parent::setEntityFacade($entityFacade);
        }

        return $entityFacade;
    }

    public function getSupportCategoryFacade() {
        if ($this->supporCategoryFacade == null) {
            $this->supporCategoryFacade = new SupportCategoryFacade();

            $this->supporCategoryFacade->setDoctrine($this->getDoctrine());
        }

        return $this->supporCategoryFacade;
    }

    public function updateAction() {
        $jsonValue = $_POST["jsonValue"];

        $decodedArray = json_decode($jsonValue, true);

        $tempDepartments = explode(", ", trim($decodedArray['departments']));
        $departments = array();
        foreach ($tempDepartments as $value) {
            $tempArray = explode(" ", $value);
            $departments[(int) $tempArray[0]] = (float) $tempArray[1];
        }

        $supportType = $this->getEntityFacade()->load($decodedArray['id']);

        $this->getEntityFacade()->merge($supportType, $decodedArray);

        $this->getEntityFacade()->setSupportAdministrationTimes($supportType, $departments);

        return $this->constructResponse($this->getEntityFacade()->toJson($supportType));
    }

    public function createAction() {
        $jsonValue = $_POST["jsonValue"];

        $decodedArray = json_decode($jsonValue, true);

        $tempDepartments = explode(", ", trim($decodedArray['departments']));
        $departments = array();
        foreach ($tempDepartments as $value) {
            $tempArray = explode(" ", $value);
            $departments[(int) $tempArray[0]] = (float) $tempArray[1];
        }

        $supportType = $this->getEntityFacade()->fromArray($decodedArray);
        $supportType->setSupportCategory($this->getSupportCategoryFacade()->load($decodedArray['supportCategoryId']));

        $this->getEntityFacade()->save($supportType);

        $this->getEntityFacade()->setSupportAdministrationTimes($supportType, $departments);

        return $this->constructResponse($this->getEntityFacade()->toJson($supportType));
    }

    public function administeredByAction() {
        $jsonValue = $_POST["jsonValue"];

        $decodedArray = json_decode($jsonValue, true);

        $id = $decodedArray['id'];

        $departmentIds = $this->getEntityFacade()->getAdministeredByDepartmentIds($id);

        return $this->constructResponse(json_encode($departmentIds));
    }

}

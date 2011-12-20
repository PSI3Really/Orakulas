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
        $json = $_POST["jsonValue"];

        $entityArray = array();
        if (!is_array(json_decode($json))) {
            $entityArray[] = json_decode($json, true);
        } else {
            $entityArray = json_decode($json, true);
        }

        $returnArray = array();

        foreach ($returnArray as $e) {
            $tempDepartments = explode(", ", trim($e['departments']));
            $departments = array();
            if (count($tempDepartments) > 0 && $tempDepartments[0] != '') {
                foreach ($tempDepartments as $value) {
                    $tempArray = explode(" ", $value);
                    $departments[(int) $tempArray[0]] = (float) $tempArray[1];
                }
            }

            $supportType = $this->getEntityFacade()->load($e['id']);

            $this->getEntityFacade()->merge($supportType, $e);

            $this->getEntityFacade()->setSupportAdministrationTimes($supportType, $departments);

            $returnArray[] = $this->getEntityFacade()->toArray($supportType);
        }

        $responseObject = $returnArray;
        if (count($returnArray) == 1) {
            $responseObject = $returnArray[0];
        }

        return $this->constructResponse(json_encode($responseObject));
    }

    public function createAction() {
        $json = $_POST["jsonValue"];
        $json = $_POST["jsonValue"];

        $entityArray = array();
        if (!is_array(json_decode($json))) {
            $entityArray[] = json_decode($json, true);
        } else {
            $entityArray = json_decode($json, true);
        }

        $returnArray = array();

        foreach ($returnArray as $e) {
            $tempDepartments = explode(", ", trim($e['departments']));
            $departments = array();
            if (count($tempDepartments) > 0 && $tempDepartments[0] != '') {
                foreach ($tempDepartments as $value) {
                    $tempArray = explode(" ", $value);
                    $departments[(int) $tempArray[0]] = (float) $tempArray[1];
                }
            }

            $supportType = $this->getEntityFacade()->fromArray($e);
            $supportType->setSupportCategory($this->getSupportCategoryFacade()->load($e['supportCategoryId']));

            $this->getEntityFacade()->save($supportType);

            $this->getEntityFacade()->setSupportAdministrationTimes($supportType, $departments);
        }

        $responseObject = $returnArray;
        if (count($returnArray) == 1) {
            $responseObject = $returnArray[0];
        }

        return $this->constructResponse(json_encode($responseObject));
    }

    public function administeredByAction() {
        $jsonValue = $_POST["jsonValue"];

        $decodedArray = json_decode($jsonValue, true);

        $id = $decodedArray['id'];

        $departmentIds = $this->getEntityFacade()->getAdministeredByDepartmentIds($id);

        return $this->constructResponse(json_encode($departmentIds));
    }

}

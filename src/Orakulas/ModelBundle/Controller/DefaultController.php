<?php

namespace Orakulas\ModelBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;
use Orakulas\ModelBundle\Entity\User;
use Orakulas\ModelBundle\Facades\EntityFacade;
use Orakulas\ModelBundle\Facades\UserFacade;
use Orakulas\ModelBundle\Facades\ModelUtils;

class DefaultController extends Controller
{

    /**
     * @var \Orakulas\ModelBundle\Facades\EntityFacade
     */
    private $entityFacade;

    /**
     * @var \Orakulas\ModelBundle\Facades\UserFacade
     */
    private $userFacade;

    private function getEntityFacade()
    {
        if (!isset($this->entityFacade))
        {
            $this->entityFacade = new EntityFacade();
            $this->entityFacade->setDoctrine($this->getDoctrine());
        }

        return $this->entityFacade;
    }

    private function getUserFacade()
    {
        if (!isset($this->userFacade))
        {
            $this->userFacade = new UserFacade();
            $this->userFacade->setDoctrine($this->getDoctrine());
            $this->userFacade->setEncoderFactory($this->get('security.encoder_factory'));
        }

        return $this->userFacade;
    }

    private function getJsonResponse($class, $id = -1)
    {
        $obj = 0;
        if ($id < 0)
        {
            $obj = $this->getEntityFacade()->loadAll($class);
        }
        else
        {
            $obj = $this->getEntityFacade()->load($class, $id);
        }

        $response = new Response(ModelUtils::jsonEncodeEx($obj));
        $response->headers->set('Content-Type', 'application/json');

        return $response;
    }

    private function postValue($className)
    {
        $jsonValue = $_POST["jsonValue"];
        $jsonValueArray = json_decode($jsonValue, true);
        $jsonValueObject = ModelUtils::arrayToObject($jsonValueArray, $className);

        $facade = $this->getEntityFacade();

        if ($className === EntityFacade::USER)
        {
            $facade = $this->getUserFacade();
        }
        $facade->save($jsonValueObject);

        return $jsonValueObject->getId();
    }

    private function delete($className)
    {
        $jsonValue = $_POST["jsonValue"];
        $jsonValueArray = json_decode($jsonValue, true);
        $id = $jsonValueArray['id'];

        $facade = $this->getEntityFacade();

        if ($className === EntityFacade::USER)
        {
            $facade = $this->getUserFacade();
        }

        $facade->delete($className, $id);
    }

    private function update($className)
    {
        $jsonValue = $_POST["jsonValue"];
        $jsonValueArray = json_decode($jsonValue, true);

        $facade = $this->getEntityFacade();

        if ($className === EntityFacade::USER)
        {
            $facade = $this->getUserFacade();
        }

        $facade->update($className, $jsonValueArray);
    }

    public function departmentAction($id = -1)
    {
        return $this->getJsonResponse(EntityFacade::DEPARTMENT, $id);
    }

    public function departmentPostAction() {
        $id = $this->postValue(EntityFacade::DEPARTMENT);
        return $this->getJsonResponse(EntityFacade::DEPARTMENT, $id);
    }

    public function departmentDeleteAction() {
        $this->delete(EntityFacade::DEPARTMENT);
        exit;
    }

    public function departmentUpdateAction() {
        $this->update(EntityFacade::DEPARTMENT);
        exit;
    }

    public function departmentInfoSysUsageAction($id = -1)
    {
        return $this->getJsonResponse(EntityFacade::DEPARTMENT_INFO_SYS_USAGE, $id);
    }

    public function departmentInfoSysUsagePostAction() {
        $id = $this->postValue(EntityFacade::DEPARTMENT_INFO_SYS_USAGE);
        return $this->getJsonResponse(EntityFacade::DEPARTMENT_INFO_SYS_USAGE, $id);
    }

    public function departmentInfoSysUsageDeleteAction() {
        $this->delete(EntityFacade::DEPARTMENT_INFO_SYS_USAGE);
        exit;
    }

    public function departmentInfoSysUsageUpdateAction() {
        $this->update(EntityFacade::DEPARTMENT_INFO_SYS_USAGE);
        exit;
    }

    public function InformationalSystemAction($id = -1)
    {
        return $this->getJsonResponse(EntityFacade::INFORMATIONAL_SYSTEM, $id);
    }

    public function informationalSystemPostAction() {
        $id = $this->postValue(EntityFacade::INFORMATIONAL_SYSTEM);
        return $this->getJsonResponse(EntityFacade::INFORMATIONAL_SYSTEM, $id);
    }

    public function informationalSystemDeleteAction() {
        $this->delete(EntityFacade::INFORMATIONAL_SYSTEM);
        exit;
    }

    public function informationalSystemUpdateAction() {
        $this->update(EntityFacade::INFORMATIONAL_SYSTEM);
        exit;
    }

    public function supportAdministrationTimeAction($id = -1)
    {
        return $this->getJsonResponse(EntityFacade::SUPPORT_ADMINISTRATION_TIME, $id);
    }

    public function supportAdministrationTimePostAction() {
        $id = $this->postValue(EntityFacade::SUPPORT_ADMINISTRATION_TIME);
        return $this->getJsonResponse(EntityFacade::SUPPORT_ADMINISTRATION_TIME, $id);
    }

    public function supportAdministrationTimeDeleteAction() {
        $this->delete(EntityFacade::SUPPORT_ADMINISTRATION_TIME);
        exit;
    }

    public function supportAdministrationTimeUpdateAction() {
        $this->update(EntityFacade::SUPPORT_ADMINISTRATION_TIME);
        exit;
    }

    public function supportCategoryAction($id = -1)
    {
        return $this->getJsonResponse(EntityFacade::SUPPORT_CATEGORY, $id);
    }

    public function supportCategoryPostAction() {
        $id = $this->postValue(EntityFacade::SUPPORT_CATEGORY);
        return $this->getJsonResponse(EntityFacade::SUPPORT_CATEGORY, $id);
    }

    public function supportCategoryDeleteAction() {
        $this->delete(EntityFacade::SUPPORT_CATEGORY);
        exit;
    }

    public function supportCategoryUpdateAction() {
        $this->update(EntityFacade::SUPPORT_CATEGORY);
        exit;
    }

    public function supportHistoryAction($id = -1)
    {
        //TODO cia erroras pareina
        return $this->getJsonResponse(EntityFacade::SUPPORT_HISTORY, $id);
    }

    public function supportHistoryPostAction() {
        $id = $this->postValue(EntityFacade::SUPPORT_HISTORY);
        return $this->getJsonResponse(EntityFacade::SUPPORT_HISTORY, $id);
    }

    public function supportHistoryDeleteAction() {
        $this->delete(EntityFacade::SUPPORT_HISTORY);
        exit;
    }

    public function supportHistoryUpdateAction() {
        $this->update(EntityFacade::SUPPORT_HISTORY);
        exit;
    }

    public function supportTypeAction($id = -1)
    {
        return $this->getJsonResponse(EntityFacade::SUPPORT_TYPE, $id);
    }

    public function supportTypePostAction() {
        $id = $this->postValue(EntityFacade::SUPPORT_TYPE);
        return $this->getJsonResponse(EntityFacade::SUPPORT_TYPE, $id);
    }

    public function supportTypeDeleteAction() {
        $this->delete(EntityFacade::SUPPORT_TYPE);
        exit;
    }

    public function supportTypeUpdateAction() {
        $this->update(EntityFacade::SUPPORT_TYPE);
        exit;
    }

    public function userAction($id = -1)
    {
        return $this->getJsonResponse(EntityFacade::USER, $id);
    }

    public function userPostAction()
    {
        $id = $this->postValue(EntityFacade::USER);
        return $this->getJsonResponse(EntityFacade::USER, $id);
    }

    public function userDeleteAction()
    {
        $this->delete(EntityFacade::USER);
        exit;
    }

    public function userUpdateAction()
    {
        $this->update(EntityFacade::USER);
        exit;
    }

    public function currentUserAction() {
        $user = $this->get('security.context')->getToken()->getUser();

        $response = new Response(ModelUtils::jsonEncodeEx($user));
        $response->headers->set('Content-Type', 'application/json');

        return $response;
    }
}
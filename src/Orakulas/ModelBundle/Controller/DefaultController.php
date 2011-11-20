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

    private function getJsonResponse($class, $id = -1)
    {
        $entityFacade = new EntityFacade();
        $entityFacade->setDoctrine($this->getDoctrine());

        $obj = 0;
        if ($id < 0)
        {
            $obj = $entityFacade->loadAll($class);
        }
        else
        {
            $obj = $entityFacade->load($class, $id);
        }

        $response = new Response(ModelUtils::jsonEncodeEx($obj));
        $response->headers->set('Content-Type', 'application/json');

        return $response;
    }

    public function departmentAction($id = -1)
    {
        return $this->getJsonResponse(EntityFacade::DEPARTMENT, $id);
    }

    public function departmentInfoSysUsageAction($id = -1)
    {
        return $this->getJsonResponse(EntityFacade::DEPARTMENT_INFO_SYS_USAGE, $id);
    }

    public function InformationalSystemAction($id = -1)
    {
        return $this->getJsonResponse(EntityFacade::INFORMATIONAL_SYSTEM, $id);
    }

    public function supportAdministrationTimeAction($id = -1)
    {
        return $this->getJsonResponse(EntityFacade::SUPPORT_ADMINISTRATION_TIME, $id);
    }

    public function supportCategoryAction($id = -1)
    {
        return $this->getJsonResponse(EntityFacade::SUPPORT_CATEGORY, $id);
    }

    public function supportHistoryAction($id = -1)
    {
        return $this->getJsonResponse(EntityFacade::SUPPORT_HISTORY, $id);
    }

    public function supportTypeAction($id = -1)
    {
        return $this->getJsonResponse(EntityFacade::SUPPORT_TYPE, $id);
    }

    public function userAction($id = -1)
    {
        return $this->getJsonResponse(EntityFacade::USER, $id);
    }
}
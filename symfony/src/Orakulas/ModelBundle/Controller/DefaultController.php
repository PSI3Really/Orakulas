<?php

namespace Orakulas\ModelBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;
use Orakulas\ModelBundle\Entity\User;
use Orakulas\ModelBundle\Facades\EntityFacade;
use Orakulas\ModelBundle\Facades\UserFacade;

class DefaultController extends Controller
{

    public function indexAction($name)
    {
        /*$session = $this->getRequest()->getSession();

        $session->getUser()->setAuthenticated(false);
        $session->getUser()->shutdown();*/

        /*$session->invalidate();
        $session->close();*/

        /* initializing facade */
        $user = $this->get('security.context')->getToken()->getUser();
        echo '<pre>';
        var_dump($user);
        echo '</pre>';

        $userFacade = new UserFacade();
        $userFacade->setDoctrine($this->getDoctrine());

        /* checking output */
        return new Response('Done.');
    }
}

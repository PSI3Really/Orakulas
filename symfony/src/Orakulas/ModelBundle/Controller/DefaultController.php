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
        /* initializing facade */
        $userFacade = new UserFacade();
        $userFacade->setDoctrine($this->getDoctrine());

        /* checking output */
        echo '<pre>';
        var_dump($userFacade->loadByUserName('dev'));
        echo '</pre>';

        /* Sending response */
        return new Response('Done.');
    }
}

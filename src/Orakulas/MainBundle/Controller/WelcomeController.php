<?php

namespace Orakulas\MainBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;


class WelcomeController extends Controller
{
    
    public function indexAction()
    {
        return $this->render('::index.html.twig');
    }
}

<?php

namespace Orakulas\RedirectBundle\Controller;

use \Symfony\Bundle\FrameworkBundle\Controller\Controller;


class RedirectController extends Controller {
    
    public function redirectAction() {
        return $this->redirect($this->generateUrl('OrakulasMainBundle_homepage'));
    }
}

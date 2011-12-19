<?php

namespace Orakulas\RedirectBundle\Controller;

use \Symfony\Bundle\FrameworkBundle\Controller\Controller;


class RedirectController extends Controller {

    public function redirectAction($lang = 'lt') {
        return $this->redirect($this->generateUrl('OrakulasMainBundle_homepage')."?lang=$lang");
    }
}

<?php

namespace Orakulas\ModelBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;
use Orakulas\ModelBundle\Entity\User;
use Orakulas\ModelBundle\Facades\EntityFacade;


class DefaultController extends Controller
{
    private function rand_str($length = 32, $chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890')
    {
        $chars_length = (strlen($chars) - 1);
        $string = $chars{ rand(0, $chars_length) };

        for ($i = 1; $i < $length; $i = strlen($string))
        {
            $r = $chars{ rand(0, $chars_length) };

            if ($r != $string{$i - 1})
                $string .=  $r;
        }

        return $string;
    }
    
    public function indexAction($name)
    {
        /*$userObject = new User();
        $userObject->setEmail("$name@orakulas.com");
        $userObject->setFirstName($name);
        $userObject->setLastName("Foobar");
        $userObject->setIsAdmin(1);
        $userObject->setSalt($this->rand_str(10));
        $userObject->setPassword(hash("sha512", "123{$userObject->getSalt()}"));
        $userObject->setUserName($name);

        $entityManager = $this->getDoctrine()->getEntityManager();
        $entityManager->persist($userObject);
        $entityManager->flush();*/

        $entityFacade = new EntityFacade();
        $entityFacade->setDoctrine($this->getDoctrine());

        echo $entityFacade->load(1, EntityFacade::USER)->getUserName() . "<br />";

        return new Response("Done.");
    }
}

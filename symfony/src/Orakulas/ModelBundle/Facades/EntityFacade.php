<?php

namespace Orakulas\ModelBundle\Facades;

class EntityFacade
{
    const USER = 'User';

    private $doctrine;

    /*public function __construct()
    {
        Controller::__construct();
        $entityManager = $this->getDoctrine()->getEntityManager();
    }*/

    public function save($entity)
    {
        $entityManager = $this->getDoctrine()->getEntityManager();
        $entityManager->persist($entity);
        $entityManager->flush();
    }

    public function load($id, $class)
    {
        $repository = $this->getDoctrine()->getRepository('OrakulasModelBundle:' . $class);
        return $repository->find($id);
    }

    public function setDoctrine($doctrine)
    {
        $this->doctrine = $doctrine;
    }

    private function getDoctrine()
    {
        return $this->doctrine;
    }
}

?>
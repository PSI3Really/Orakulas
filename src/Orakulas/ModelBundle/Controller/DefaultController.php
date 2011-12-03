<?php

namespace Orakulas\ModelBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;
use \Orakulas\ModelBundle\Facades\EntityFacade;

class DefaultController extends Controller {

    /**
     * @var \Orakulas\ModelBundle\Facades\EntityFacade
     */
    private $entityFacade;

    public function createAction() {
        $json = $_POST["jsonValue"];

        $entity = $this->getEntityFacade()->fromJson($json);

        $this->getEntityFacade()->save($entity);

        return $this->constructResponse($this->getEntityFacade()->toJson($entity));
    }

    public function readAction() {
        $entities = $this->getEntityFacade()->loadAll();

        $jsonObjects = array();

        foreach ($entities as $entity) {
            $jsonObjects[] = $this->getEntityFacade()->toArray($entity);
        }

        return $this->constructResponse(json_encode($jsonObjects));
    }

    public function updateAction() {
        $json = $_POST["jsonValue"];

        $decodedArray = json_decode($json, true);

        $user = $this->getEntityFacade()->load($decodedArray['id']);

        $this->getEntityFacade()->merge($user, $decodedArray);

        $this->getEntityFacade()->save($user);

        return $this->constructResponse($this->getEntityFacade()->toJson($user));
    }

    public function deleteAction() {
        $json = $_POST["jsonValue"];

        $entity = $this->getEntityFacade()->fromJson($json);

        $this->getEntityFacade()->delete($entity->getId());

        return $this->constructResponse(json_encode($entity->getId()));
    }

    /**
     * @param \string $string
     * @return \Symfony\Component\HttpFoundation\Response
     */
    private function constructResponse($string) {
        $response = new Response($string);
        $response->headers->set('Content-Type', 'application/json');

        return $response;
    }

    /**
     * @param \Orakulas\ModelBundle\Facades\EntityFacade $entityFacade
     */
    public function setEntityFacade($entityFacade) {
        $this->entityFacade = $entityFacade;
    }

    /**
     * @return \Orakulas\ModelBundle\Facades\EntityFacade
     */
    protected function getEntityFacade() {
        return $this->entityFacade;
    }

}
<?php

namespace Orakulas\ModelBundle\Facades;

use \Symfony\Bundle\DoctrineBundle\Registry;

abstract class EntityFacade {

    const BUNDLE_NAME = 'OrakulasModelBundle';

    /**
     * @var \Symfony\Bundle\DoctrineBundle\Registry $doctrine
     */
    private $doctrine;

    /**
     * @throws \InvalidArgumentException if $entity is NULL
     * @param $entity
     */
    public function save($entity) {
        if ($entity == NULL) {
            throw new \InvalidArgumentException('parameter $argument cannot be null');
        }

        if ($this->getDoctrine() == NULL) {
            throw new EntityFacadeException('doctrine isn\'t set');
        }

        $entityManager = $this->getDoctrine()->getEntityManager();

        $entityManager->persist($entity);
        $entityManager->flush();
    }

    /**
     * @throws InvalidArgumentException if doctrine isn't set
     * @param $id primary key of object
     * @return loaded object
     */
    public abstract function load($id);

    /**
     * @abstract
     * @return array
     */
    public abstract function loadAll();

    /**
     * @param int $id
     * @throws \InvalidArgumentException|EntityFacadeException
     */
    public function delete($id) {
        if ($id == NULL) {
            throw new \InvalidArgumentException('parameter $id cannot be null');
        }

        if ($this->getDoctrine() == NULL) {
            throw new EntityFacadeException('doctrine isn\'t set');
        }

        $entity = $this->load($id);

        if (!isset($entity)) {
            throw new EntityFacadeException("could not find an entity with id $id");
        }

        $entityManager = $this->getDoctrine()->getEntityManager();

        $entityManager->remove($entity);
        $entityManager->flush();
    }

    /**
     * @abstract
     * @param array $array
     */
    public abstract function fromArray($array);

    /**
     * @param $entity
     * @return array
     */
    public abstract function toArray($entity);

    /**
     * @abstract
     * @param $source
     * @param $destination
     */
    public abstract function merge($source, $destination);

    /**
     * @param $entity
     * @return string
     */
    public function toJson($entity) {
        $array = $this->toArray($entity);

        return json_encode($array);
    }

    /**
     * @param string $json
     */
    public function fromJson($json) {
        $array = json_decode($json, true);

        return $this->fromArray($array);
    }

    /**
     * @param \Symfony\Bundle\DoctrineBundle\Registry $doctrine
     * @return void
     */
    public function setDoctrine(Registry $doctrine) {
        $this->doctrine = $doctrine;
    }

    /**
     * @return \Symfony\Bundle\DoctrineBundle\Registry
     */
    protected function getDoctrine() {
        return $this->doctrine;
    }

    /*public function update($class, $array) {
        if ($class == NULL || $array == NULL) {
            throw new \InvalidArgumentException('parameters $class and $array cannot be null');
        }

        if (!isset($this->doctrine)) {
            throw new EntityFacadeException('doctrine isn\'t set');
        }

        $entity = $this->load($class, $array['id']);

        if (!isset($entity))
        {
            throw new EntityFacadeException('could not find an entity with id '.$array['id']);
        }

        foreach ($array as $key => $value) {
            if ($key != "id") {
                $methodName = "set".ucfirst($key);
                $entity->$methodName($value);
            }
        }

        $entityManager = $this->getDoctrine()->getEntityManager();
        $entityManager->flush();
    }*/
}

class EntityFacadeException extends \Exception
{

}

?>
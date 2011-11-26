<?php

namespace Orakulas\ModelBundle\Facades;

use \Symfony\Bundle\DoctrineBundle\Registry;

class EntityFacade
{
    const DEPARTMENT = 'Department';
    const DEPARTMENT_INFO_SYS_USAGE = 'DepartmentInfoSysUsage';
    const INFORMATIONAL_SYSTEM = 'InformationalSystem';
    const SUPPORT_ADMINISTRATION_TIME = 'SupportAdministrationTime';
    const SUPPORT_CATEGORY = 'SupportCategory';
    const SUPPORT_HISTORY = 'SupportHistory';
    const SUPPORT_TYPE = 'SupportType';
    const USER = 'User';

    const BUNDLE_NAME = 'OrakulasModelBundle';

    /**
     * @var \Symfony\Bundle\DoctrineBundle\Registry $doctrine
     */
    private $doctrine;

    /**
     * @throws \InvalidArgumentException if $entity is NULL
     * @param $entity entity to be persisted
     * @return void
     */
    public function save($entity)
    {
        if ($entity == NULL)
        {
            throw new \InvalidArgumentException('parameter $argument cannot be null');
        }

        if (!isset($this->doctrine))
        {
            throw new EntityFacadeException('doctrine isn\'t set');
        }

        $entityManager = $this->getDoctrine()->getEntityManager();

        /** @noinspection PhpUndefinedMethodInspection */
        $entityManager->persist($entity);

        /** @noinspection PhpUndefinedMethodInspection */
        $entityManager->flush();
    }

    /**
     * @throws InvalidArgumentException if doctrine isn't set
     * @param $id primary key of object
     * @param \string $class class of object
     * @return loaded object
     */
    public function load($class, $id)
    {
        if ($id == NULL || $class == NULL)
        {
            throw new \InvalidArgumentException('parameters $id and $class cannot be null');
        }

        if ($this->getDoctrine() == NULL)
        {
            throw new EntityFacadeException('doctrine isn\'t set');
        }
        
        $repository = $this->getDoctrine()->getRepository(UserFacade::BUNDLE_NAME.':'.$class);
        /** @noinspection PhpUndefinedMethodInspection */
        return $repository->find($id);
    }

    public function loadAll($class)
    {
        if ($class == NULL)
        {
            throw new \InvalidArgumentException('parameter $class cannot be null');
        }

        if ($this->getDoctrine() == NULL)
        {
            throw new EntityFacadeException('doctrine isn\'t set');
        }

        $repository = $this->getDoctrine()->getRepository(UserFacade::BUNDLE_NAME.':'.$class);
        /** @noinspection PhpUndefinedMethodInspection */
        return $repository->findAll();
    }

    public function delete($class, $id) {
        if ($class == NULL || $id == NULL)
        {
            throw new \InvalidArgumentException('parameters $class and $id cannot be null');
        }

        if (!isset($this->doctrine))
        {
            throw new EntityFacadeException('doctrine isn\'t set');
        }


        $entity = $this->load($class, $id);

        if (!isset($entity))
        {
            throw new EntityFacadeException("could not find an entity with id $id");
        }

        $entityManager = $this->getDoctrine()->getEntityManager();

        /** @noinspection PhpUndefinedMethodInspection */
        $entityManager->remove($entity);

        /** @noinspection PhpUndefinedMethodInspection */
        $entityManager->flush();
    }

    public function update($class, $array) {
        if ($class == NULL || $array == NULL)
        {
            throw new \InvalidArgumentException('parameters $class and $array cannot be null');
        }

        if (!isset($this->doctrine))
        {
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
        /** @noinspection PhpUndefinedMethodInspection */
        $entityManager->flush();
    }

    /**
     * @param \Symfony\Bundle\DoctrineBundle\Registry $doctrine
     * @return void
     */
    public function setDoctrine(Registry $doctrine)
    {
        $this->doctrine = $doctrine;
    }

    /**
     * @return \Symfony\Bundle\DoctrineBundle\Registry
     */
    protected function getDoctrine()
    {
        return $this->doctrine;
    }
}

class EntityFacadeException extends \Exception
{

}

?>
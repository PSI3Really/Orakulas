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
            throw new \InvalidArgumentException('cannot save null entity');
        }

        if ($this->getDoctrine() == NULL)
        {
            throw new \InvalidArgumentException('doctrine isn\'t set');
        }

        $entityManager = $this->getDoctrine()->getEntityManager();
        $entityManager->persist($entity);
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
            throw new InvalidArgumentException('parameters $id and $class cannot be null');
        }

        if ($this->getDoctrine() == NULL)
        {
            throw new InvalidArgumentException('doctrine isn\'t set');
        }
        
        $repository = $this->getDoctrine()->getRepository(UserFacade::BUNDLE_NAME.':'.$class);
        return $repository->find($id);
    }

    public function loadAll($class)
    {
        if ($class == NULL)
        {
            throw new InvalidArgumentException('parameters $id and $class cannot be null');
        }

        if ($this->getDoctrine() == NULL)
        {
            throw new InvalidArgumentException('doctrine isn\'t set');
        }

        $repository = $this->getDoctrine()->getRepository(UserFacade::BUNDLE_NAME.':'.$class);
        return $repository->findAll();
    }

    public function deleteAll($class) {
        $entries = $this->loadAll($class);
        $entityManager = $this->getDoctrine()->getEntityManager();
        foreach ($entries as $entry) {
            $entityManager->remove($entry);
        }
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

?>
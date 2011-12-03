<?php

namespace Orakulas\ModelBundle\Facades;

use \Orakulas\ModelBundle\Facades\EntityFacade;
use \Orakulas\ModelBundle\Entity\SupportAdministrationTime;
use \Orakulas\ModelBundle\Facades\DepartmentFacade;
use \Orakulas\ModelBundle\Facades\SupportTypeFacade;

class SupportAdministrationTimeFacade extends EntityFacade {

    const SUPPORT_ADMINISTRATION_TIME = 'SupportAdministrationTime';

    /**
     * @var \Orakulas\ModelBundle\Facades\DepartmentFacade
     */
    private $departmentFacade;

    /**
     * @var \Orakulas\ModelBundle\Facades\SupportTypeFacade
     */
    private $supportTypeFacade;

    /**
     * @param int $id
     * @return \Orakulas\ModelBundle\Entity\SupportAdministrationTime
     */
     public function load($id) {
         if ($id == NULL) {
             throw new \InvalidArgumentException('parameter $id and cannot be null');
         }

         if ($this->getDoctrine() == NULL) {
             throw new EntityFacadeException('doctrine isn\'t set');
         }

         $repository = $this->getDoctrine()->getRepository(UserFacade::BUNDLE_NAME.':'.SupportAdministrationTimeFacade::SUPPORT_ADMINISTRATION_TIME);
         $entity = $repository->find($id);

         return $entity;
     }

     /**
      * @return array
      */
     public function loadAll() {
         if ($this->getDoctrine() == NULL) {
             throw new EntityFacadeException('doctrine isn\'t set');
         }

         $repository = $this->getDoctrine()->getRepository(UserFacade::BUNDLE_NAME.':'.SupportAdministrationTimeFacade::SUPPORT_ADMINISTRATION_TIME);
         return $repository->findAll();
     }

    /**
     * @param \Orakulas\ModelBundle\Entity\SupportAdministrationTime $entity
     * @return array
     */
    public function toArray($entity) {
        $array = array(
            'id'          => $entity->getId(),
            'hoursCount'  => $entity->getHoursCount(),
            'department'  => $this->getDepartmentFacade()->toArray($entity->getDepartment()),
            'supportType' => $this->getSupportTypeFacade()->toArray($entity->getSupportType())
        );

        return $array;
    }

    /**
     * @param array $array
     * @return \Orakulas\ModelBundle\Entity\SupportAdministrationTime
     */
    public function fromArray($array) {
        $supportAdministrationTime = new SupportAdministrationTime();

        if (isset($array['']))
            $supportAdministrationTime->setId($array['id']);
        if (isset($array['']))
            $supportAdministrationTime->setHoursCount($array['hoursCount']);
        if (isset($array['']))
            $supportAdministrationTime->setDepartment($this->getDepartmentFacade()->fromArray($array['department']));
        if (isset($array['']))
            $supportAdministrationTime->setSupportType($this->getSupportTypeFacade()->fromArray($array['supportType']));

        return $supportAdministrationTime;
    }

    /**
     * @param array $source
     * @param \Orakulas\ModelBundle\Entity\SupportAdministrationTime $destination
     */
    public function merge($destination, $source) {
        if (isset($source['hoursCount']))
            $destination->setHoursCount($source['hoursCount']);
        if (isset($source['department']))
            $destination->setDepartment($source['department']);
        if (isset($source['supportType']))
            $destination->setSupportType($source['supportType']);
    }

    /**
     * @param \Orakulas\ModelBundle\Facades\DepartmentFacade $departmentFacade
     */
    public function setDepartmentFacade($departmentFacade)
    {
        $this->departmentFacade = $departmentFacade;
    }

    /**
     * @return \Orakulas\ModelBundle\Facades\DepartmentFacade
     */
    public function getDepartmentFacade()
    {
        return $this->departmentFacade;
    }

    /**
     * @param \Orakulas\ModelBundle\Facades\SupportTypeFacade $supportTypeFacade
     */
    public function setSupportTypeFacade($supportTypeFacade)
    {
        $this->supportTypeFacade = $supportTypeFacade;
    }

    /**
     * @return \Orakulas\ModelBundle\Facades\SupportTypeFacade
     */
    public function getSupportTypeFacade()
    {
        return $this->supportTypeFacade;
    }
}

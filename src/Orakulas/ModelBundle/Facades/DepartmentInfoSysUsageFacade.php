<?php

namespace Orakulas\ModelBundle\Facades;

use \Orakulas\ModelBundle\Facades\EntityFacade;
use \Orakulas\ModelBundle\Facades\DepartmentFacade;
use \Orakulas\ModelBundle\Facades\InformationalSystemFacade;
use \Orakulas\ModelBundle\Entity\DepartmentInfoSysUsage;

class DepartmentInfoSysUsageFacade extends EntityFacade {

    const DEPARTMENT_INFO_SYS_USAGE = 'DepartmentInfoSysUsage';

    /**
     * @var \Orakulas\ModelBundle\Facades\DepartmentFacade
     */
    private $departmentFacade;

    /**
     * @var \Orakulas\ModelBundle\Facades\InformationalSystemFacade
     */
    private $informationalSystemFacade;

    /**
     * @param int $id
     * @return \Orakulas\ModelBundle\Entity\DepartmentInfoSysUsage
     */
     public function load($id) {
         if ($id == NULL) {
             throw new \InvalidArgumentException('parameter $id and cannot be null');
         }

         if ($this->getDoctrine() == NULL) {
             throw new EntityFacadeException('doctrine isn\'t set');
         }

         $repository = $this->getDoctrine()->getRepository(UserFacade::BUNDLE_NAME.':'.DepartmentInfoSysUsageFacade::DEPARTMENT_INFO_SYS_USAGE);
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

         $repository = $this->getDoctrine()->getRepository(UserFacade::BUNDLE_NAME.':'.DepartmentInfoSysUsageFacade::DEPARTMENT_INFO_SYS_USAGE);
         return $repository->findAll();
     }

    /**
     * @param \Orakulas\ModelBundle\Entity\DepartmentInfoSysUsage $entity
     * @return array
     */
    public function toArray($entity) {
        $array = array(
            'id'   => $entity->getId(),
            'department' => $this->getDepartmentFacade()->toArray($entity->getDepartment()),
            'informationalSystem' => $this->getInformationalSystemFacade()->toArray($entity->getInformationalSystem())
        );

        return $array;
    }

    /**
     * @param array $array
     * @return Orakulas\ModelBundle\Entity\DepartmentInfoSysUsage
     */
    public function fromArray($array) {
        $departmentInfoSysUsage = new DepartmentInfoSysUsage();

        if (isset($array['id']))
            $departmentInfoSysUsage->setId($array['id']);
        if (isset($array['department']))
            $departmentInfoSysUsage->setDepartment($this->getDepartmentFacade()->fromArray($array['department']));
        if (isset($array['informationalSystem']))
            $departmentInfoSysUsage->setInformationalSystem($this->getInformationalSystemFacade()->fromArray($array['informationalSystem']));

        return $departmentInfoSysUsage;
    }

    /**
     * @param array $source
     * @param \Orakulas\ModelBundle\Entity\DepartmentInfoSysUsage $destination
     */
    public function merge($destination, $source) {
        if (isset($source['department']))
            $destination->setDepartment($this->getDepartmentFacade()->fromArray($source['department']));
        if (isset($source['informationalSystem']))
            $destination->setInformationalSystem($this->getInformationalSystemFacade()->fromArray($source['informationalSystem']));
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
     * @param \Orakulas\ModelBundle\Facades\InformationalSystemFacade $informationalSystemFacade
     */
    public function setInformationalSystemFacade($informationalSystemFacade)
    {
        $this->informationalSystemFacade = $informationalSystemFacade;
    }

    /**
     * @return \Orakulas\ModelBundle\Facades\InformationalSystemFacade
     */
    public function getInformationalSystemFacade()
    {
        return $this->informationalSystemFacade;
    }
}

<?php

namespace Orakulas\ModelBundle\Facades;

use \Orakulas\ModelBundle\Facades\EntityFacade;
use \Orakulas\ModelBundle\Entity\Department;

class DepartmentFacade extends EntityFacade {

    const DEPARTMENT = 'Department';

    /**
     * @param int $id
     * @return \Orakulas\ModelBundle\Entity\Department
     */
     public function load($id) {
         if ($id == NULL) {
             throw new \InvalidArgumentException('parameter $id and cannot be null');
         }

         if ($this->getDoctrine() == NULL) {
             throw new EntityFacadeException('doctrine isn\'t set');
         }

         $repository = $this->getDoctrine()->getRepository(UserFacade::BUNDLE_NAME.':'.DepartmentFacade::DEPARTMENT);
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

         $repository = $this->getDoctrine()->getRepository(UserFacade::BUNDLE_NAME.':'.DepartmentFacade::DEPARTMENT);
         return $repository->findAll();
     }

    /**
     * @param \Orakulas\ModelBundle\Entity\Department $entity
     * @return array
     */
    public function toArray($entity) {
        $array = array(
            'id'   => $entity->getId(),
            'code' => $entity->getCode(),
            'name' => $entity->getName()
        );

        return $array;
    }

    /**
     * @param array $array
     * @return \Orakulas\ModelBundle\Entity\Department
     */
    public function fromArray($array) {
        $department = new Department();

        if (isset($array['id']))
            $department->setId($array['id']);
        if (isset($array['code']))
            $department->setCode($array['code']);
        if (isset($array['name']))
            $department->setName($array['name']);

        return $department;
    }

    /**
     * @param array $source
     * @param \Orakulas\ModelBundle\Entity\Department $destination
     */
    public function merge($destination, $source) {
        if (isset($source['code']))
            $destination->setCode($source['code']);
        if (isset($source['name']))
            $destination->setName($source['name']);
    }

    /**
     * @param int $id
     */
    public function getUsedInfoSysIds($id) {
        $queryString = '
        SELECT
          disu.informational_system_id
        FROM
          department_info_sys_usage disu
        WHERE
          disu.department_id = ?';

        $entityManager = $this->getDoctrine()->getEntityManager();

        $query = $entityManager->getConnection()->prepare($queryString);
        $query->bindValue(1, $id);

        $query->execute();

        $infoSysIds = array();
        foreach ($query->fetchAll() as $value) {
            $infoSysIds[] = (int) $value['informational_system_id'];
        }

        return $infoSysIds;
    }
}

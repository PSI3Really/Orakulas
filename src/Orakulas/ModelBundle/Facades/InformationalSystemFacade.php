<?php

namespace Orakulas\ModelBundle\Facades;

use \Orakulas\ModelBundle\Facades\EntityFacade;
use \Orakulas\ModelBundle\Entity\InformationalSystem;

class InformationalSystemFacade extends EntityFacade {

    const INFORMATIONAL_SYSTEM = 'InformationalSystem';

    /**
     * @param int $id
     * @return \Orakulas\ModelBundle\Entity\InformationalSystem
     */
     public function load($id) {
         if ($id == NULL) {
             throw new \InvalidArgumentException('parameter $id and cannot be null');
         }

         if ($this->getDoctrine() == NULL) {
             throw new EntityFacadeException('doctrine isn\'t set');
         }

         $repository = $this->getDoctrine()->getRepository(UserFacade::BUNDLE_NAME.':'.InformationalSystemFacade::INFORMATIONAL_SYSTEM);
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

         $repository = $this->getDoctrine()->getRepository(UserFacade::BUNDLE_NAME.':'.InformationalSystemFacade::INFORMATIONAL_SYSTEM);
         return $repository->findAll();
     }

    /**
     * @param int $id
     */
    public function getUsedByDepartmentsIds($id) {
        $queryString = '
        SELECT
          disu.department_id
        FROM
          department_info_sys_usage disu
        WHERE
          disu.informational_system_id = ?';

        $entityManager = $this->getDoctrine()->getEntityManager();

        $query = $entityManager->getConnection()->prepare($queryString);
        $query->bindValue(1, $id);

        $query->execute();

        $departmentIds = array();
        foreach ($query->fetchAll() as $value) {
            $departmentIds[] = (int) $value['department_id'];
        }

        return $departmentIds;
    }

    /**
     * @param \Orakulas\ModelBundle\Entity\InformationalSystem $entity
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
     * @return \Orakulas\ModelBundle\Entity\InformationalSystem
     */
    public function fromArray($array) {
        $informationalSystem = new InformationalSystem();

        if (isset($array['id']))
            $informationalSystem->setId($array['id']);
        if (isset($array['code']))
            $informationalSystem->setCode($array['code']);
        if (isset($array['name']))
            $informationalSystem->setName($array['name']);

        return $informationalSystem;
    }

    /**
     * @param \Orakulas\ModelBundle\Entity\InformationalSystem $source
     * @param \Orakulas\ModelBundle\Entity\InformationalSystem $destination
     */
    public function merge($destination, $source) {
        if (isset($source['code']))
            $destination->setCode($source['code']);
        if (isset($source['name']))
            $destination->setName($source['name']);
    }
}

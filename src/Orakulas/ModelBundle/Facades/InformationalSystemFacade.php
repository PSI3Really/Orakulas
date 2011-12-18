<?php

namespace Orakulas\ModelBundle\Facades;

use \Orakulas\ModelBundle\Facades\EntityFacade;
use \Orakulas\ModelBundle\Facades\DepartmentInfoSysUsageFacade;
use \Orakulas\ModelBundle\Facades\DepartmentFacade;
use \Orakulas\ModelBundle\Entity\InformationalSystem;
use \Orakulas\ModelBundle\Entity\DepartmentInfoSysUsage;

class InformationalSystemFacade extends EntityFacade {

    const INFORMATIONAL_SYSTEM = 'InformationalSystem';

    /**
     * @var \Orakulas\ModelBundle\Facades\DepartmentFacade
     */
    private $departmentFacade;

    /**
     * @var \Orakulas\ModelBundle\Facades\DepartmentInfoSysUsageFacade
     */
    private $departmentInfoSysUsageFacade;

    public function getDepartmentFacade() {
        if ($this->departmentFacade == NULL) {
            $this->departmentFacade = new DepartmentFacade();
            $this->departmentFacade->setDoctrine($this->getDoctrine());
        }

        return $this->departmentFacade;
    }

    public function getDepartmentInfoSysUsageFacade() {
        if ($this->departmentInfoSysUsageFacade == NULL) {
            $this->departmentInfoSysUsageFacade = new DepartmentInfoSysUsageFacade();

            $this->departmentInfoSysUsageFacade->setDoctrine($this->getDoctrine());

            $this->departmentInfoSysUsageFacade->setDepartmentFacade($this->getDepartmentFacade());
            $this->departmentInfoSysUsageFacade->setInformationalSystemFacade($this);
        }

        return $this->departmentInfoSysUsageFacade;
    }

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
     * @param \Orakulas\ModelBundle\Entity\InformationalSystem $informationalSystem
     * @param $departmentIds
     */
    public function setUsedByDepartments($informationalSystem, $departmentIds) {
        $this->deleteOldValues($informationalSystem, $departmentIds);

        $stmtString = '
            SELECT
              department_id
            FROM
              department_info_sys_usage
            WHERE
              informational_system_id = :infoSysId';

        $entityManager = $this->getDoctrine()->getEntityManager();

        $stmt = $entityManager->getConnection()->prepare($stmtString);

        $stmt->bindValue('infoSysId', $informationalSystem->getId());

        $stmt->execute();

        $resultArray = $stmt->fetchAll();

        $dbDepartmentIds = array();
        foreach ($resultArray as $result) {
            $dbDepartmentIds[] = (int) $result['department_id'];
        }

        $diffedArray = array_diff($departmentIds, $dbDepartmentIds);

        if (count($diffedArray) > 0) {
            foreach ($diffedArray as $id) {
                $departmentInfoSysUsage = new DepartmentInfoSysUsage();

                $departmentInfoSysUsage->setInformationalSystem($informationalSystem);
                $departmentInfoSysUsage->setDepartment($this->getDepartmentFacade()->load($id));

                $this->getDepartmentInfoSysUsageFacade()->save($departmentInfoSysUsage);
            }
        }
    }

    private function deleteOldValues($informationalSystem, $departmentIds) {
        $stmtString = '
            DELETE FROM department_info_sys_usage
            WHERE
              informational_system_id = :infoSysId AND
              department_id not in (';

        foreach ($departmentIds as $key => $id) {
            $stmtString .= ':id' . $id;
            if ($key < count($departmentIds) - 1) {
                $stmtString .= ', ';
            }
        }

        $stmtString .= ')';

        $entityManager = $this->getDoctrine()->getEntityManager();

        $stmt = $entityManager->getConnection()->prepare($stmtString);

        $stmt->bindValue('infoSysId', (int)$informationalSystem->getId());

        foreach ($departmentIds as $id) {
            $stmt->bindValue('id' . $id, (int)$id);
        }

        $stmt->execute();
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

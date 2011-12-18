<?php

namespace Orakulas\ModelBundle\Facades;

use \Orakulas\ModelBundle\Facades\EntityFacade;
use \Orakulas\ModelBundle\Facades\DepartmentInfoSysUsageFacade;
use \Orakulas\ModelBundle\Facades\InformationalSystemFacade;
use \Orakulas\ModelBundle\Entity\Department;
use \Orakulas\ModelBundle\Entity\DepartmentInfoSysUsage;

class DepartmentFacade extends EntityFacade {

    const DEPARTMENT = 'Department';

    /**
     * @var \Orakulas\ModelBundle\Facades\InformationalSystemFacade
     */
    private $informationalSystemFacade;

    /**
     * @var \Orakulas\ModelBundle\Facades\DepartmentInfoSysUsageFacade
     */
    private $departmentInfoSysUsageFacade;

    public function getInformationalSystemFacade() {
        if ($this->informationalSystemFacade == NULL) {
            $this->informationalSystemFacade = new InformationalSystemFacade();
            $this->informationalSystemFacade->setDoctrine($this->getDoctrine());
        }

        return $this->informationalSystemFacade;
    }

    public function getDepartmentInfoSysUsageFacade() {
        if ($this->departmentInfoSysUsageFacade == NULL) {
            $this->departmentInfoSysUsageFacade = new DepartmentInfoSysUsageFacade();

            $this->departmentInfoSysUsageFacade->setDoctrine($this->getDoctrine());

            $this->departmentInfoSysUsageFacade->setDepartmentFacade($this);
            $this->departmentInfoSysUsageFacade->setInformationalSystemFacade($this->getInformationalSystemFacade());
        }

        return $this->departmentInfoSysUsageFacade;
    }

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
     * @param \Orakulas\ModelBundle\Entity\Department $department
     * @param $informationalSystemIds
     */
    public function setUsedInfoSystems($department, $informationalSystemIds) {
        $this->deleteOldValues($department, $informationalSystemIds);

        $stmtString = '
            SELECT
              informational_system_id
            FROM
              department_info_sys_usage
            WHERE
              department_id = :departmentId';

        $entityManager = $this->getDoctrine()->getEntityManager();

        $stmt = $entityManager->getConnection()->prepare($stmtString);

        $stmt->bindValue('departmentId', $department->getId());

        $stmt->execute();

        $resultArray = $stmt->fetchAll();

        $dbInfoSysIds = array();
        foreach ($resultArray as $result) {
            $dbInfoSysIds[] = (int) $result['informational_system_id'];
        }

        $diffedArray = array_diff($informationalSystemIds, $dbInfoSysIds);

        if (count($diffedArray) > 0) {
            foreach ($diffedArray as $id) {
                $departmentInfoSysUsage = new DepartmentInfoSysUsage();

                $departmentInfoSysUsage->setInformationalSystem($this->getInformationalSystemFacade()->load($id));
                $departmentInfoSysUsage->setDepartment($department);

                $this->getDepartmentInfoSysUsageFacade()->save($departmentInfoSysUsage);
            }
        }
    }

    private function deleteOldValues($department, $informationalSystemIds) {
        $stmtString = '
            DELETE FROM department_info_sys_usage
            WHERE
              department_id = :departmentId AND
              informational_system_id not in (';

        foreach ($informationalSystemIds as $key => $id) {
            $stmtString .= ':id' . $id;
            if ($key < count($informationalSystemIds) - 1) {
                $stmtString .= ', ';
            }
        }

        $stmtString .= ')';

        $entityManager = $this->getDoctrine()->getEntityManager();

        $stmt = $entityManager->getConnection()->prepare($stmtString);

        $stmt->bindValue('departmentId', (int) $department->getId());

        foreach ($informationalSystemIds as $id) {
            $stmt->bindValue('id' . $id, $id);
        }

        $stmt->execute();
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

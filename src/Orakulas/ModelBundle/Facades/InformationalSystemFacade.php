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

        foreach ($diffedArray as $id) {
            $departmentInfoSysUsage = new DepartmentInfoSysUsage();

            $departmentInfoSysUsage->setInformationalSystem($informationalSystem);
            $departmentInfoSysUsage->setDepartment($this->getDepartmentFacade()->load($id));

            $this->getDepartmentInfoSysUsageFacade()->save($departmentInfoSysUsage);
        }
    }

    private function deleteOldValues($informationalSystem, $departmentIds) {
        $stmtString = '
            DELETE FROM department_info_sys_usage
            WHERE
              informational_system_id = :infoSysId';

        if (count($departmentIds) > 0) {
            $stmtString .= ' AND
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


            foreach ($departmentIds as $id) {
                $stmt->bindValue('id' . $id, (int)$id);
            }
        }
        $stmt->bindValue('infoSysId', (int)$informationalSystem->getId());

        $stmt->execute();
    }

    /**
     * @param \Orakulas\ModelBundle\Entity\InformationalSystem $entity
     * @throws \InvalidArgumentException
     */
    public function save($entity) {
        if ($entity == NULL) {
            throw new \InvalidArgumentException('parameter $entity cannot be null');
        }

        $entity->setCode(strtoupper($entity->getCode()));

        foreach ($this->getDepartmentFacade()->loadAll() as $department) {
            if ($department->getInformationalSystems()->contains($entity) && !$entity->getDepartments()->contains($department)) {
                $department->getInformationalSystems()->removeElement($entity);
            } else if (!$department->getInformationalSystems()->contains($entity) && $entity->getDepartments()->contains($department)) {
                $department->addInformationalSystem($entity);
            }
        }

        parent::save($entity);
    }

    /**
     * @param \Orakulas\ModelBundle\Entity\InformationalSystem $entity
     * @return array
     */
    public function toArray($entity) {
        $departments = array();

        foreach ($entity->getDepartments() as $department) {
            $departments[] = $this->getDepartmentFacade()->toSimpleArray($department);
        }

        $array = array(
            'id'   => $entity->getId(),
            'code' => $entity->getCode(),
            'name' => $entity->getName(),
            'departments' => $departments
        );

        return $array;
    }

    public function toSimpleArray($entity) {

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
        if (isset($array['departments'])) {
            $newIds = array();

            foreach ($array['departments'] as $department) {
                if (is_array($department))
                    $newIds[] = $department['id'];
                else
                    $newIds[] = $department;
            }

            foreach ($informationalSystem->getDepartments() as $department) {
                if (in_array($department->getId(), $newIds))
                    for ($i = 0; $i < count($newIds); $i++) {
                        if ($newIds[$i] == $department->getId()) {
                            unset($newIds[$i]);
                            $newIds = array_values($newIds);
                            break;
                        }
                    }
                else {
                    $informationalSystem->getDepartments()->removeElement($department);
                    $department->getInformationalSystems()->removeElement($informationalSystem);
                }
            }

            foreach ($newIds as $id) {
                $department = $this->getDepartmentFacade()->load($id);

                if ($department != null) {
                    $department->addInformationalSystem($informationalSystem);

                    $informationalSystem->addDepartment($department);
                }
            }
        }

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

        if (isset($source['departments'])) {
            $newIds = array();

            foreach ($source['departments'] as $department) {
                if (is_array($department))
                    $newIds[] = $department['id'];
                else
                    $newIds[] = $department;
            }

            foreach ($destination->getDepartments() as $department) {
                if (in_array($department->getId(), $newIds))
                    for ($i = 0; $i < count($newIds); $i++) {
                        if ($newIds[$i] == $department->getId()) {
                            unset($newIds[$i]);
                            $newIds = array_values($newIds);
                            break;
                        }
                    }
                else {
                    $destination->getDepartments()->removeElement($department);
                    $department->getInformationalSystems()->removeElement($destination);
                }
            }

            foreach ($newIds as $id) {
                $department = $this->getDepartmentFacade()->load($id);

                if ($department != null) {
                    $department->addInformationalSystem($destination);

                    $destination->addDepartment($department);
                }
            }
        }
    }
}

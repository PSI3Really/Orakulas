<?php

namespace Orakulas\ModelBundle\Facades;

use \Orakulas\ModelBundle\Facades\EntityFacade;
use \Orakulas\ModelBundle\Facades\DepartmentInfoSysUsageFacade;
use \Orakulas\ModelBundle\Facades\InformationalSystemFacade;
use \Orakulas\ModelBundle\Facades\SupportTypeFacade;
use \Orakulas\ModelBundle\Facades\SupportCategoryFacade;
use \Orakulas\ModelBundle\Facades\SupportAdministrationTimeFacade;

use \Orakulas\ModelBundle\Entity\Department;
use \Orakulas\ModelBundle\Entity\DepartmentInfoSysUsage;
use \Orakulas\ModelBundle\Entity\SupportAdministrationTime;
use \Orakulas\ModelBundle\Entity\SupportType;

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

    /**
     * @var \Orakulas\ModelBundle\Facades\SupportTypeFacade
     */
    private $supportTypeFacade;

    /**
     * @var \Orakulas\ModelBundle\Facades\SupportAdministrationTimeFacade
     */
    private $supportAdministrationTimeFacade;

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

    public function getSupportTypeFacade() {
        if ($this->supportTypeFacade == null) {
            $this->supportTypeFacade = new SupportTypeFacade();
            $supportCategoryFacade = new SupportCategoryFacade();

            $this->supportTypeFacade->setDoctrine($this->getDoctrine());
            $supportCategoryFacade->setDoctrine($this->getDoctrine());

            $this->supportTypeFacade->setSupportCategoryFacade($supportCategoryFacade);
        }

        return $this->supportTypeFacade;
    }

    public function getSupportAdministrationTimeFacade() {
        if ($this->supportAdministrationTimeFacade == null) {
            $this->supportAdministrationTimeFacade = new SupportAdministrationTimeFacade();

            $this->supportAdministrationTimeFacade->setDoctrine($this->getDoctrine());

            $this->supportAdministrationTimeFacade->setDepartmentFacade($this);
            $this->supportAdministrationTimeFacade->setSupportTypeFacade($this->getSupportTypeFacade());
        }

        return $this->supportAdministrationTimeFacade;
    }

    public function getEntityFacade() {
        $entityFacade = parent::getEntityFacade();

        if ($entityFacade == null) {
            $entityFacade = new SupportTypeFacade();

            $entityFacade->setDoctrine($this->getDoctrine());

            $entityFacade->setSupportCategoryFacade($this->getSupportCategoryFacade());

            parent::setEntityFacade($entityFacade);
        }

        return $entityFacade;
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
        $this->deleteOldValuesFromDepInfoSysUsage($department, $informationalSystemIds);

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

    private function deleteOldValuesFromDepInfoSysUsage($department, $informationalSystemIds) {
        $stmtString = '
            DELETE FROM department_info_sys_usage
            WHERE
              department_id = :departmentId';

        if (count($informationalSystemIds) > 0) {
            $stmtString .= ' AND
              informational_system_id not in (';

            foreach ($informationalSystemIds as $key => $id) {
                $stmtString .= ':id' . $id;
                if ($key < count($informationalSystemIds) - 1) {
                    $stmtString .= ', ';
                }
            }

            $stmtString .= ')';
        }

        $entityManager = $this->getDoctrine()->getEntityManager();

        $stmt = $entityManager->getConnection()->prepare($stmtString);

        $stmt->bindValue('departmentId', (int) $department->getId());

        if (count($informationalSystemIds)) {
            foreach ($informationalSystemIds as $id) {
                $stmt->bindValue('id' . $id, $id);
            }
        }

        $stmt->execute();
    }

    /**
     * @param \Orakulas\ModelBundle\Entity\Department $department
     * @param $supportTypes
     */
    public function setSupportAdministrationTimes($department, $supportTypes) {
        $this->deleteOldValuesFromSupportAdminTime($department, array_keys($supportTypes));

        $dbSupportTypeIds = $this->getAdministeredSupportTypeIds($department->getId());
        $tempIds = array();
        foreach ($dbSupportTypeIds as $supportType) {
            $tempIds[] = $supportType['id'];
        }

        $diffedArray = array_diff(array_keys($supportTypes), $tempIds);
        $intersectedArray = array_intersect(array_keys($supportTypes), $tempIds);

        foreach ($diffedArray as $id) {
            $supportAdministrationTime = new SupportAdministrationTime();

            $supportAdministrationTime->setDepartment($department);
            $supportAdministrationTime->setSupportType($this->getSupportTypeFacade()->load($id));
            $supportAdministrationTime->setHoursCount($supportTypes[$id]);

            $this->getSupportAdministrationTimeFacade()->save($supportAdministrationTime);
        }

        $entityManager = $this->getDoctrine()->getEntityManager();

        $resultArray = array();
        if (count($intersectedArray) != 0) {
            $stmtString = '
                SELECT
                  id
                FROM
                  support_administration_time
                WHERE
                  department_id = :departmentId AND
                  support_type_id in (';

            foreach ($intersectedArray as $key => $id) {
                $stmtString .= ':id'.$id;
                if ($key < count($intersectedArray) - 1) {
                    $stmtString .= ", ";
                }
            }
            $stmtString .= ")";

            $stmt = $entityManager->getConnection()->prepare($stmtString);

            $stmt->bindValue('departmentId', $department->getId());
            foreach ($intersectedArray as $key => $id) {
                $stmt->bindValue('id'.$id, $id);
            }

            $stmt->execute();

            $resultArray = $stmt->fetchAll();
        }

        $dbSupportAdministrationTimeIds = array();
        foreach ($resultArray as $result) {
            $dbSupportAdministrationTimeIds[] = (int) $result['id'];
        }

        if (count($dbSupportAdministrationTimeIds) > 0) {
            foreach($dbSupportAdministrationTimeIds as $id) {
                $supportAdministrationTime = $this->getSupportAdministrationTimeFacade()->load($id);

                $supportAdministrationTime->setHoursCount($supportTypes[$supportAdministrationTime->getSupportType()->getId()]);
            }
        }

        $entityManager->flush();
    }

    private function deleteOldValuesFromSupportAdminTime($department, $supportTypeIds) {
        $stmtString = '
            DELETE FROM support_administration_time
            WHERE
              department_id = :departmentId';

        if (count($supportTypeIds) > 0) {
            $stmtString .= ' AND
              support_type_id not in (';

            foreach ($supportTypeIds as $key => $id) {
                $stmtString .= ':id' . $id;
                if ($key < count($supportTypeIds) - 1) {
                    $stmtString .= ', ';
                }
            }

            $stmtString .= ')';
        }

        $entityManager = $this->getDoctrine()->getEntityManager();

        $stmt = $entityManager->getConnection()->prepare($stmtString);

        $stmt->bindValue('departmentId', (int) $department->getId());

        if (count($supportTypeIds) > 0) {
            foreach ($supportTypeIds as $id) {
                $stmt->bindValue('id' . $id, (int) $id);
            }
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

    public function getAdministeredSupportTypeIds($departmentId) {
        $stmtString = '
            SELECT
              support_type_id, hours_count
            FROM
              support_administration_time
            WHERE
              department_id = :departmentId';

        $entityManager = $this->getDoctrine()->getEntityManager();

        $stmt = $entityManager->getConnection()->prepare($stmtString);

        $stmt->bindValue('departmentId', $departmentId);

        $stmt->execute();

        $resultArray = $stmt->fetchAll();

        $dbSupportTypeIds = array();
        foreach ($resultArray as $result) {
            $dbSupportTypeIds[] = array(
                'id' => (int) $result['support_type_id'],
                'hours' => (float) $result['hours_count']
            );
        }

        return $dbSupportTypeIds;
    }
}

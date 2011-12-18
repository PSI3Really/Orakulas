<?php

namespace Orakulas\ModelBundle\Facades;

use \Orakulas\ModelBundle\Facades\EntityFacade;
use \Orakulas\ModelBundle\Facades\SupportCategoryFacade;
use \Orakulas\ModelBundle\Facades\DepartmentFacade;
use \Orakulas\ModelBundle\Facades\SupportAdministrationTimeFacade;
use \Orakulas\ModelBundle\Entity\SupportType;
use \Orakulas\ModelBundle\Entity\SupportAdministrationTime;

class SupportTypeFacade extends EntityFacade {

    const SUPPORT_TYPE = 'SupportType';

    /**
     * @var \Orakulas\ModelBundle\Facades\SupportCategoryFacade
     */
    private $supportCategoryFacade;

    /**
     * @var \Orakulas\ModelBundle\Facades\DepartmentFacade
     */
    private $departmentFacade;

    /**
     * @var \Orakulas\ModelBundle\Facades\SupportAdministrationTimeFacade
     */
    private $supportAdministrationTimeFacade;

    /**
     * @return \Orakulas\ModelBundle\Facades\DepartmentFacade
     */
    public function getDepartmentFacade() {
        if ($this->departmentFacade == null) {
            $this->departmentFacade = new DepartmentFacade();

            $this->departmentFacade->setDoctrine($this->getDoctrine());
        }

        return $this->departmentFacade;
    }

    /**
     * @return \Orakulas\ModelBundle\Facades\SupportAdministrationTimeFacade
     */
    public function getSupportAdministrationTimeFacade() {
        if ($this->supportAdministrationTimeFacade == null) {
            $this->supportAdministrationTimeFacade = new SupportAdministrationTimeFacade();

            $this->supportAdministrationTimeFacade->setDoctrine($this->getDoctrine());

            $this->supportAdministrationTimeFacade->setDepartmentFacade($this->getDepartmentFacade());
            $this->supportAdministrationTimeFacade->setSupportTypeFacade($this);
        }

        return $this->supportAdministrationTimeFacade;
    }

    /**
     * @param \Orakulas\ModelBundle\Facades\SupportCategoryFacade $supportCategoryFacade
     */
    public function setSupportCategoryFacade($supportCategoryFacade) {
        $this->supportCategoryFacade = $supportCategoryFacade;
    }

    /**
     * @return \Orakulas\ModelBundle\Facades\SupportCategoryFacade
     */
    private function getSupportCategoryFacade() {
        return $this->supportCategoryFacade;
    }

    /**
     * @param \Orakulas\ModelBundle\Entity\SupportType $entity
     */
    public function save($entity) {
        $this->supportCategoryFacade->save($entity->getSupportCategory());

        parent::save($entity);
    }

    /**
     * @param int $id
     * @return \Orakulas\ModelBundle\Entity\SupportType
     */
    public function load($id) {
        if ($id == NULL) {
            throw new \InvalidArgumentException('parameter $id cannot be null');
        }

        if ($this->getDoctrine() == NULL) {
            throw new EntityFacadeException('doctrine isn\'t set');
        }

        $repository = $this->getDoctrine()->getRepository(UserFacade::BUNDLE_NAME.':'.SupportTypeFacade::SUPPORT_TYPE);
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

        $repository = $this->getDoctrine()->getRepository(UserFacade::BUNDLE_NAME.':'.SupportTypeFacade::SUPPORT_TYPE);
        return $repository->findAll();
    }

    /**
     * @param \Orakulas\ModelBundle\Entity\SupportType $supportType
     * @param $departments
     */
    public function setSupportAdministrationTimes($supportType, $departments) {
        $this->deleteOldValues($supportType, array_keys($departments));

        $dbDepartmentIds = $this->getAdministeredByDepartmentIds($supportType->getId());

        $diffedArray = array_diff(array_keys($departments), $dbDepartmentIds);
        $intersectedArray = array_intersect(array_keys($departments), $dbDepartmentIds);

        if (count($diffedArray) > 0) {
            foreach ($diffedArray as $id) {
                $supportAdministrationTime = new SupportAdministrationTime();

                $supportAdministrationTime->setDepartment($this->getDepartmentFacade()->load($id));
                $supportAdministrationTime->setSupportType($supportType);
                $supportAdministrationTime->setHoursCount($departments[$id]);

                $this->getSupportAdministrationTimeFacade()->save($supportAdministrationTime);
            }
        }

        $stmtString = '
            SELECT
              id
            FROM
              support_administration_time
            WHERE
              support_type_id = :supportTypeId AND
              department_id in (';

        foreach ($intersectedArray as $key => $id) {
            $stmtString .= ':id'.$id;
            if ($key < count($intersectedArray) - 1) {
                $stmtString .= ", ";
            }
        }
        $stmtString .= ")";

        $entityManager = $this->getDoctrine()->getEntityManager();

        $stmt = $entityManager->getConnection()->prepare($stmtString);

        $stmt->bindValue('supportTypeId', $supportType->getId());
        foreach ($intersectedArray as $key => $id) {
            $stmt->bindValue('id'.$id, $id);
        }

        $stmt->execute();

        $resultArray = $stmt->fetchAll();
        $dbSupportAdministrationTimeIds = array();
        foreach ($resultArray as $result) {
            $dbSupportAdministrationTimeIds[] = (int) $result['id'];
        }

        if (count($dbSupportAdministrationTimeIds) > 0) {
            foreach($dbSupportAdministrationTimeIds as $id) {
                $supportAdministrationTime = $this->getSupportAdministrationTimeFacade()->load($id);

                $supportAdministrationTime->setHoursCount($departments[$supportAdministrationTime->getDepartment()->getId()]);
            }
        }

        $entityManager->flush();
    }

    private function deleteOldValues($supportType, $departmentIds) {
        $stmtString = '
            DELETE FROM support_administration_time
            WHERE
              support_type_id = :supportTypeId AND
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

        $stmt->bindValue('supportTypeId', (int) $supportType->getId());

        foreach ($departmentIds as $id) {
            $stmt->bindValue('id' . $id, (int) $id);
        }

        $stmt->execute();
    }

    public function getAdministeredByDepartmentIds($supportTypeId) {
        $stmtString = '
            SELECT
              department_id, hours_count
            FROM
              support_administration_time
            WHERE
              support_type_id = :supportTypeId';

        $entityManager = $this->getDoctrine()->getEntityManager();

        $stmt = $entityManager->getConnection()->prepare($stmtString);

        $stmt->bindValue('supportTypeId', $supportTypeId);

        $stmt->execute();

        $resultArray = $stmt->fetchAll();

        $dbDepartmentIds = array();
        foreach ($resultArray as $result) {
            $dbDepartmentIds[] = array(
                'id' => (int) $result['department_id'],
                'hours' => (float) $result['hours_count']
            );
        }

        return $dbDepartmentIds;
    }

    /**
     * @param \Orakulas\ModelBundle\Entity\SupportType $entity
     * @return array
     */
    public function toArray($entity) {
        $supportCategory = $this->getSupportCategoryFacade()->load($entity->getSupportCategory()->getId());

        $array = array(

            'id' => $entity->getId(),
            'name' => $entity->getName(),
            'code' => $entity->getCode(),
            'supportCategory' => $this->getSupportCategoryFacade()->toArray($supportCategory)
        );

        return $array;
    }

    /**
     * @param array $array
     * @return \Orakulas\ModelBundle\Entity\SupportType
     */
    public function fromArray($array) {
        $supportType = new SupportType();

        if (isset($array['id']))
            $supportType->setId($array['id']);
        if (isset($array['name']))
            $supportType->setName($array['name']);
        if (isset($array['code']))
            $supportType->setCode($array['code']);
        if (isset($array['supportCategory']))
            $supportType->setSupportCategory($this->getSupportCategoryFacade()->fromArray($array['supportCategory']));

        return $supportType;
    }

    /**
     * @param \Orakulas\ModelBundle\Entity\SupportType $source
     * @param \Orakulas\ModelBundle\Entity\SupportType $destination
     */
    public function merge($destination, $source) {
        if (isset($source['code']))
            $destination->setCode($source['code']);
        if (isset($source['name']))
          $destination->setName($source['name']);
        if (isset($source['supportCategory']))
            $destination->setSupportCategory($this->getSupportCategoryFacade()->fromArray($source['supportCategory']));
    }
}

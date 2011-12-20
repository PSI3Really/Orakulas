<?php

namespace Orakulas\ModelBundle\Facades;

use \Orakulas\ModelBundle\Facades\EntityFacade;
use \Orakulas\ModelBundle\Facades\SupportTypeFacade;
use \Orakulas\ModelBundle\Entity\SupportHistory;

class SupportHistoryFacade extends EntityFacade {

    const SUPPORT_HISTORY = 'SupportHistory';

    /**
     * @var \Orakulas\ModelBundle\Facades\SupportTypeFacade
     */
    private $supportTypeFacade;

    /**
     * @param \Orakulas\ModelBundle\Facades\SupportTypeFacade $supportTypeFacade
     */
    public function setSupportTypeFacade($supportTypeFacade) {
        $this->supportTypeFacade = $supportTypeFacade;
    }

    /**
     * @return \Orakulas\ModelBundle\Facades\SupportTypeFacade
     */
    private function getSupportTypeFacade() {
        return $this->supportTypeFacade;
    }

    /**
     * @param \Orakulas\ModelBundle\Entity\SupportHistory $entity
     */
    public function save($entity) {
        $this->getSupportTypeFacade()->save($entity->getSupportType());

        parent::save($entity);
    }

    /**
     * @param int $id
     * @return \Orakulas\ModelBundle\Entity\SupportHistory
     */
    public function load($id) {
        if ($id == NULL) {
            throw new \InvalidArgumentException('parameter $id and cannot be null');
        }

        if ($this->getDoctrine() == NULL) {
            throw new EntityFacadeException('doctrine isn\'t set');
        }

        $repository = $this->getDoctrine()->getRepository(UserFacade::BUNDLE_NAME.':'.SupportHistoryFacade::SUPPORT_HISTORY);
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

        $repository = $this->getDoctrine()->getRepository(UserFacade::BUNDLE_NAME.':'.SupportHistoryFacade::SUPPORT_HISTORY);
        return $repository->findAll();
    }

    /**
     * @param \Orakulas\ModelBundle\Entity\SupportHistory $entity
     * @return array
     */
    public function toArray($entity) {
        $supportType = $this->getSupportTypeFacade()->load($entity->getSupportType()->getId());

        $array = array(
            'id'                  => $entity->getId(),
            'startDate'           => date('Y-m-d', $entity->getStartDate()->getTimestamp()),
            'endDate'             => date('Y-m-d', $entity->getEndDate()->getTimestamp()),
            'supportRequestCount' => $entity->getSupportRequestCount(),
            'supportType'         => $this->getSupportTypeFacade()->toArray($supportType)
        );

        return $array;
    }

    /**
     * @param array $array
     * @return \Orakulas\ModelBundle\Entity\SupportHistory
     */
    public function fromArray($array) {
        $supportHistory = new SupportHistory();

        if (isset($array['id']))
            $supportHistory->setId($array['id']);
        if (isset($array['startDate']))
            $supportHistory->setStartDate(new DateTime(date("Y-m-01", strtotime($array['startDate']))));
        if (isset($array['endDate']))
            $supportHistory->setEndDate(new DateTime(date("Y-m-d", strtotime("-1 second", strtotime("+1 month", strtotime(date("Y-m-01", strtotime($array['endDate']))))))));
        if (isset($array['supportRequestCount']))
            $supportHistory->setSupportRequestCount($array['supportRequestCount']);
        if (isset($array['supportType']))
            $supportHistory->setSupportType($this->getSupportTypeFacade()->fromArray($array['supportType']));

        return $supportHistory;
    }

    /**
     * @param \Orakulas\ModelBundle\Entity\SupportHistory $source
     * @param \Orakulas\ModelBundle\Entity\SupportHistory $destination
     */
    public function merge($destination, $source) {
        if (isset($source['startDate']))
            $destination->setStartDate(new DateTime(date("Y-m-01", strtotime($source['startDate']))));
        if (isset($source['endDate']))
            $destination->setEndDate(new DateTime(date("Y-m-d", strtotime("-1 second", strtotime("+1 month", strtotime(date("Y-m-01", strtotime($source['endDate']))))))));
        if (isset($source['supportRequestCount']))
            $destination->setSupportRequestCount($source['supportRequestCount']);
        if (isset($source['supportType']))
            $destination->setSupportType($this->getSupportTypeFacade()->fromArray($source['supportType']));
    }

    public function import($jsonData) {
        $supportTypes = array();
        foreach ($this->getSupportTypeFacade()->loadAll() as $supportType) {
            $supportTypes[strtolower($supportType->getCode())] = $supportType;
        }

        $supportHistories = array();
        foreach ($this->loadAll() as $supportHistory) {
            if (!isset($supportHistories[$supportHistory->getStartDate()->getTimestamp()])) {
                $supportHistories[$supportHistory->getStartDate()->getTimestamp()] = array();
            }
            $supportHistories[$supportHistory->getStartDate()->getTimestamp()][strtolower($supportHistory->getSupportType()->getCode())] = $supportHistory;
        }

        $arrayData = json_decode($jsonData, true);
        $newHistories = array();

        foreach ($arrayData as $key => $value) {
            $startDate = date("Y-m-01", strtotime($value['startDate']));
            $endDate = date("Y-m-d", strtotime("-1 second", strtotime("+1 month", strtotime(date("Y-m-01", strtotime($value['endDate']))))));

            $startDateKey = strtotime($startDate);
            $typeKey = strtolower($value['type']);

            $supportHistory = null;
            if ((!isset($supportHistories[$startDateKey]) || !isset($supportHistories[$startDateKey][$typeKey]))) {
                $supportHistory = new SupportHistory();
                $supportHistory->setStartDate(new \DateTime($startDate));
                $supportHistory->setEndDate(new \DateTime($endDate));
                $supportHistory->setSupportRequestCount($value['amount']);
                $supportHistory->setSupportType($supportTypes[$typeKey]);

                $newHistories[] = $supportHistory;
            } else {
                $supportHistory = $supportHistories[strtotime($startDate)][strtolower($value['type'])];

                $supportHistory->setSupportRequestCount($supportHistory->getSupportRequestCount() + $value['amount']);

                $supportHistories[strtotime($startDate)][strtolower($value['type'])] = $supportHistory;
            }
        }

        foreach ($newHistories as $key => $history) {
            $this->save($history);
        }

        $this->getDoctrine()->getEntityManager()->flush();
    }
}

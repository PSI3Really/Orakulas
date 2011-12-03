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
            'startDate'           => $entity->getStartDate(),
            'endDate'             => $entity->getEndDate(),
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
            $supportHistory->setStartDate($array['startDate']);
        if (isset($array['endDate']))
            $supportHistory->setEndDate($array['endDate']);
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
    public function merge($source, $destination) {
        if (isset($source['startDate']))
            $destination->setStartDate($source['startDate']);
        if (isset($source['endDate']))
            $destination->setEndDate($source['endDate']);
        if (isset($source['supportRequestCount']))
            $destination->setSupportRequestCount($source['supportRequestCount']);
        if (isset($source['supportType']))
            $destination->setSupportType($this->getSupportTypeFacade()->fromArray($source['supportType']));
    }
}

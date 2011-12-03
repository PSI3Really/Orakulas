<?php

namespace Orakulas\ModelBundle\Facades;

use \Orakulas\ModelBundle\Facades\EntityFacade;
use \Orakulas\ModelBundle\Facades\SupportCategoryFacade;
use \Orakulas\ModelBundle\Entity\SupportType;

class SupportTypeFacade extends EntityFacade {

    const SUPPORT_TYPE = 'SupportType';

    /**
     * @var \Orakulas\ModelBundle\Facades\SupportCategoryFacade
     */
    private $supportCategoryFacade;

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

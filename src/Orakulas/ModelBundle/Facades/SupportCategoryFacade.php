<?php

namespace Orakulas\ModelBundle\Facades;

use \Orakulas\ModelBundle\Facades\EntityFacade;
use \Orakulas\ModelBundle\Facades\EntityFacadeException;
use \Orakulas\ModelBundle\Entity\SupportCategory;

class SupportCategoryFacade extends EntityFacade {

    const SUPPORT_CATEGORY = 'SupportCategory';

    /**
     * @param int $id
     * @return \Orakulas\ModelBundle\Entity\SupportCategory
     */
     public function load($id) {
         if ($id == NULL) {
             throw new \InvalidArgumentException('parameter $id and cannot be null');
         }

         if ($this->getDoctrine() == NULL) {
             throw new EntityFacadeException('doctrine isn\'t set');
         }

         $repository = $this->getDoctrine()->getRepository(UserFacade::BUNDLE_NAME.':'.SupportCategoryFacade::SUPPORT_CATEGORY);
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

         $repository = $this->getDoctrine()->getRepository(UserFacade::BUNDLE_NAME.':'.SupportCategoryFacade::SUPPORT_CATEGORY);
         return $repository->findAll();
     }

    /**
     * @param \Orakulas\ModelBundle\Entity\SupportCategory $entity
     * @return array
     */
    public function toArray($entity) {
        $array = array(
            'id' => $entity->getId(),
            'name' => $entity->getName()
        );

        return $array;
    }

    /**
     * @param array $array
     * @return \Orakulas\ModelBundle\Entity\SupportCategory
     */
    public function fromArray($array) {
        $supportCategory = new SupportCategory();

        if (isset($array['id']))
            $supportCategory->setId($array['id']);
        if (isset($array['name']))
            $supportCategory->setName($array['name']);

        return $supportCategory;
    }

    /**
     * @param array $source
     * @param \Orakulas\ModelBundle\Entity\SupportCategory $destination
     */
    public function merge($destination, $source) {
        if (isset($source['name']))
            $destination->setName($source['name']);
    }
}

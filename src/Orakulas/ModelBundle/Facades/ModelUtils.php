<?php

namespace Orakulas\ModelBundle\Facades;

use Orakulas\ModelBundle\Entity\Department;

class ModelUtils
{
    protected static function getterFilter($string)
    {
        return preg_match('/(get)|(is)/', $string);
    }

    public static function objectToArray($var)
    {
        $result = array();
        $references = array();

        if (is_array($var))
        {
            foreach ($var as $key => $value)
            {
                $result[$key] = ModelUtils::objectToArray($value);
            }
        }

        else
        {
            foreach (array_filter(get_class_methods(get_class($var)), 'Orakulas\ModelBundle\Facades\ModelUtils::getterFilter') as $getter)
            {
                $key = lcfirst(substr($getter, preg_match('/get/', $getter) ? 3 : 2));
                $value = $var->$getter();

                //var_dump($key);

                if (is_object($value) || is_array($value))
                {
                    if (!in_array($value, $references))
                    {
                        $result[$key] = ModelUtils::objectToArray($value);
                        $references[] = $value;
                    }
                }
                else
                {
                    $result[$key] = $value;
                }
            }
        }

        return $result;
    }

    public static function arrayToObject($array, $className) {
        $className = "Orakulas\\ModelBundle\\Entity\\".$className;
        $object = new $className();
        foreach ($array as $key => $value) {
            $methodName = "set".ucfirst($key);
            $object->$methodName($value);
        }
        return $object;
    }

    public static function jsonEncodeEx($param) {
        if (is_object($param) || is_array($param)) {
            $param = ModelUtils::objectToArray($param);
        }
        return json_encode($param);
    }
}

?>
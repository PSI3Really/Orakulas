<?php

namespace Orakulas\ModelBundle\Facades;

class ModelUtils
{
    protected static function getterFilter($string)
    {
        return preg_match('/(get)|(is)/', $string);
    }

    protected static function objectToArray($var)
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

    public static function jsonEncodeEx($param) {
        if (is_object($param) || is_array($param)) {
            $param = ModelUtils::objectToArray($param);
        }
        return json_encode($param);
    }
}

?>
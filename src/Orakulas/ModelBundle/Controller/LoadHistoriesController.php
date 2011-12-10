<?php
/**
 * Created by JetBrains PhpStorm.
 * User: Igratel
 * Date: 12/9/11
 * Time: 8:58 PM
 * To change this template use File | Settings | File Templates.
 */

namespace Orakulas\ModelBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;
use \Orakulas\ModelBundle\Facades;


class LoadHistoriesController extends Controller
{

    public function viewLoadHistoriesAction ($loadType, $dataType)
    {
        return new Response(json_encode($this->getPivot($loadType, $dataType)));
    }

    public function viewDepartmentsByHoursAction ()
    {
        $departmentsLoad = $this->getDepartmentsLoad();
        $pivot = Array();
        $dates = $this->getDates();
        
        $pivot['startDate'] = Array();
        foreach ($dates as $date)
            $pivot['startDate'][count($pivot['startDate'])] = $date['startDate'];

        foreach ($departmentsLoad as $row)
        {
            try
            {
                $pivot[$row['entityName']][$this->getDateIndex($pivot, $row['startDate'])] = $row['hoursSpent'];
            }
            catch (\Exception $e)
            {
                $pivot[$row['entityName']] = Array();
                $pivot[$row['entityName']][$this->getDateIndex($pivot, $row['startDate'])] = $row['hoursSpent'];
            }
        }

        return new Response(json_encode($pivot));
    }

    /**
     * @param $loadType departments or is
     * @param $dataType hours or requests
     * @return Array
     */
    public function getPivot ($loadType, $dataType)
    {
        $pivot = Array();
        $data = null;
        $fieldName = null;
        if ($loadType == 'departments' && $dataType == 'hours')
        {
            $data = $this->getDepartmentsLoad();
            $fieldName = 'hoursSpent';
        }
        else if ($loadType == 'departments' && $dataType == 'requests')
        {
            $data = $this->getDepartmentsLoad();
            $fieldName = 'supportCount';
        }
        else if ($loadType == 'is' && $dataType == 'hours')
        {
            $data = $this->getISLoad();
            $fieldName = 'hoursSpent';
        }
        else if ($loadType == 'is' && $dataType == 'requests')
        {
            $data = $this->getISLoad();
            $fieldName = 'supportCount';
        }

        $dates = $this->getDates();

        $pivot['startDate'] = Array();
        foreach ($dates as $date)
            $pivot['startDate'][count($pivot['startDate'])] = $date['startDate'];

        foreach ($data as $row)
        {
            try
            {
                $pivot[$row['entityName']][$this->getDateIndex($pivot, $row['startDate'])] = $row[$fieldName];
            }
            catch (\Exception $e)
            {
                $pivot[$row['entityName']] = Array();
                $pivot[$row['entityName']][$this->getDateIndex($pivot, $row['startDate'])] = $row[$fieldName];
            }
        }

        return $pivot;
    }

    private function getDateIndex ($pivot, $date)
    {
        for ($i = 0; $i < count($pivot['startDate']); $i++)
            if ($pivot['startDate'][$i] == $date)
                return $i;
        return -1;
    }

    private function getDates ()
    {
        $stmt = $this->getDoctrine()->getEntityManager()->getConnection()->prepare
        ('
            select distinct
                year(support_history.start_date) as year,
                month(support_history.start_date) as month,
                case when month(support_history.start_date) < 10
                    then concat(concat(concat(year(support_history.start_date), \'-0\'), month(support_history.start_date)), \'-01\')
                    else concat(concat(concat(year(support_history.start_date), \'-\'), month(support_history.start_date)), \'-01\')
                end as startDate
            from
                support_history
            order by
                year(support_history.start_date), month(support_history.start_date)
        ');
        $stmt->execute();
        return $stmt->fetchAll();
    }

    private function getDepartmentsLoad ()
    {
        $stmt = $this->getDoctrine()->getEntityManager()->getConnection()->prepare
        ('
            select
                department_name as entityName,
                \'department\' as entityType,
                year,
                month,
                case when month < 10
                    then concat(concat(concat(year, \'-0\'), month), \'-01\')
                    else concat(concat(concat(year, \'-\'), month), \'-01\')
                end as startDate,
                sum(request_count) as supportCount,
                sum(time) as hoursSpent
            from
            (
                select
                    department.code as department_code,
                    department.name as department_name,
                    support_type.code as support_type_code,
                    year(support_history.start_date) as year,
                    month(support_history.start_date) as month,
                    sum(support_history.support_request_count) as request_count,
                    support_administration_time.hours_count * sum(support_history.support_request_count) as time

                from
                    department
                    inner join support_administration_time
                    on department.id = support_administration_time.department_id
                    inner join support_type
                    on support_type.id = support_administration_time.support_type_id
                    inner join support_history
                    on support_type.id = support_history.support_type_id
                group by
                    department.code,
                    department.name,
                    support_type.name,
                    year(support_history.start_date),
                    month(support_history.start_date)
                order by
                    year, month, department.name
            ) as temp_departments_administration_time
            group by
                department_code,
                department_name,
                year,
                month
            order by
                entityName,
                startDate
        ');
        $stmt->execute();
        return $stmt->fetchAll();
    }

    private function getISLoad()
    {
        $stmt = $this->getDoctrine()->getEntityManager()->getConnection()->prepare
        ('
            select
                is_name as entityName,
                \'informational system\' as entityType,
                year,
                month,
                case when month < 10
                    then concat(concat(concat(year, \'-0\'), month), \'-01\')
                    else concat(concat(concat(year, \'-\'), month), \'-01\')
                end as startDate,
                sum(request_count) as supportCount,
                sum(time) as hoursSpent
            from
            (
                select
                    informational_system.code as is_code,
                    informational_system.name as is_name,
                    support_type.code as support_type_code,
                    year(support_history.start_date) as year,
                    month(support_history.start_date) as month,
                    sum(support_history.support_request_count) as request_count,
                    support_administration_time.hours_count * sum(support_history.support_request_count) as time
                from
                    informational_system
                    inner join department_info_sys_usage
                    on informational_system.id = department_info_sys_usage.informational_system_id
                    inner join department
                    on department.id = department_info_sys_usage.department_id
                    inner join support_administration_time
                    on department.id = support_administration_time.department_id
                    inner join support_type
                    on support_type.id = support_administration_time.support_type_id
                    inner join support_history
                    on support_type.id = support_history.support_type_id
                group by
                    informational_system.code,
                    informational_system.name,
                    support_type.name,
                    year(support_history.start_date),
                    month(support_history.start_date)
                order by
                    year, month, is_code
            ) as temp_departments_administration_time
            group by
                is_name,
                year,
                month
        ');
        $stmt->execute();
        return $stmt->fetchAll();
    }
}

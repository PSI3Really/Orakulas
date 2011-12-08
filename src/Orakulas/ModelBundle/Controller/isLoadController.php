<?php
/**
 * Created by JetBrains PhpStorm.
 * User: Igratel
 * Date: 12/8/11
 * Time: 2:27 PM
 * To change this template use File | Settings | File Templates.
 */
 
namespace Orakulas\ModelBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;
use \Orakulas\ModelBundle\Facades;

class isLoadController extends Controller
{

    public function viewAction()
    {
        $stmt = $this->getDoctrine()->getEntityManager()->getConnection()->prepare
        ('
            select
                is_name as entityName,
                \'informational system\' as entityType,
                year,
                month,
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
        $result = $stmt->fetchAll();

        return new Response(json_encode($result));
    }

    public function viewFullDateAction()
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
        $result = $stmt->fetchAll();

        return new Response(json_encode($result));
    }
}

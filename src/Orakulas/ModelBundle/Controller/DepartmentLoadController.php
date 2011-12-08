<?php
/**
 * Created by JetBrains PhpStorm.
 * User: Igratel
 * Date: 12/4/11
 * Time: 11:45 PM
 * To change this template use File | Settings | File Templates.
 */

namespace Orakulas\ModelBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;
use \Orakulas\ModelBundle\Facades;

class DepartmentLoadController extends Controller {

    public function viewAction ()
    {
        $stmt = $this->getDoctrine()->getEntityManager()->getConnection()->prepare
        ('
            select
                department_name as departmentName,
                year,
                month,
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
                department_name as departmentName,
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
        ');
        $stmt->execute();
        $result = $stmt->fetchAll();

        return new Response(json_encode($result));
    }
}

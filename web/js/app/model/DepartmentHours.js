Ext.define(CONFIG.APP_NS+'.model.DepartmentHours', {
    extend: 'Ext.data.Model',
    alias: 'widget.departmentHoursModel',

    fields: [
        {name: 'startDate', type: 'date'}
    ]
});
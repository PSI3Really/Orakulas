Ext.define(CONFIG.APP_NS+'.model.DepartmentRequests', {
    extend: 'Ext.data.Model',
    alias: 'widget.departmentRequestsModel',

    fields: [
        {name: 'startDate', type: 'date'}
    ]
});
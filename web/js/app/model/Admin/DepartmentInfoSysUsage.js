Ext.define(CONFIG.APP_NS+'.model.Admin.DepartmentInfoSysUsage', {
    extend: 'Ext.data.Model',
    alias: 'widget.adminDepartmentInfoSysUsageModel',
    idProperty: 'id',

    requires:[
        CONFIG.APP_NS+'.model.Admin.InformationalSystem',
        CONFIG.APP_NS+'.model.Admin.Department'
    ],

    fields: [
        {name: 'id',                    type: 'int', persist:false},
        {name: 'informationalSystem',   model: CONFIG.APP_NS+'.model.Admin.InformationalSystem'},
        {name: 'department',            model: CONFIG.APP_NS+'.model.Admin.Department'}
    ]
});
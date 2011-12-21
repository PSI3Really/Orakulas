Ext.define(CONFIG.APP_NS+'.model.Admin.SupportAdministrationTime', {
    extend: 'Ext.data.Model',
    alias: 'widget.adminSupportAdministrationTimeModel',
    idProperty: 'id',

    requires:[
        CONFIG.APP_NS+'.model.Admin.Department',
        CONFIG.APP_NS+'.model.Admin.SupportType',
        CONFIG.APP_NS+'.model.Admin.SupportCategory'
    ],

    fields: [
        {name: 'id',                type: 'int', persist:false},
        {name: 'hoursCount',        type: 'float'},
        {name: 'department',        model: CONFIG.APP_NS+'.model.Admin.Department'},
        {name: 'supportType',       model: CONFIG.APP_NS+'.model.Admin.SupportType'},
        {name: "supportTypeName",   mapping: "supportType.code"}
    ]
});

//model/supportType/
//
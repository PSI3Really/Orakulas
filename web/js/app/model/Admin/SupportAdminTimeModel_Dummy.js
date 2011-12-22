Ext.define(CONFIG.APP_NS+'.model.Admin.SupportAdminTimeModel_Dummy', {
    extend: 'Ext.data.Model',
    alias: 'widget.adminSupportAdministrationTimeModel_Dummy',
    idProperty: 'id',

    fields: [
        {name: 'id',                type: 'int', persist:false},
        {name: 'hoursCount',        type: 'float'},
        {name: 'department',        mapping: 'department.id'},
        {name: 'supportType',       mapping: 'supportType.id'},
        {name: "supportTypeName",   mapping: "supportType.code"}
    ]
});

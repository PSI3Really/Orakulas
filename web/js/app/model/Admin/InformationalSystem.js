Ext.define(CONFIG.APP_NS+'.model.Admin.InformationalSystem', {
    extend: 'Ext.data.Model',
    alias: 'widget.adminInformationalSystemModel',
    idProperty: 'id',
    
    fields: [
        {name: 'id',            type: 'int', persist:false},
        {name: 'code',          type: 'string'},
        {name: 'name',          type: 'string'},
        {name: 'departments'}
    ],

    hasMany: [
        {model: CONFIG.APP_NS+'.model.Admin.DepartmentInfoSysUsage', name: 'usages'}
    ]
});
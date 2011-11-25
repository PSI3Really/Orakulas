Ext.define(CONFIG.APP_NS+'.model.Admin.Department', {
    extend: 'Ext.data.Model',
    alias: 'widget.adminDepartmentModel',
    idProperty: 'id',
    
    fields: [
        {name: 'id',            type: 'int', persist:false},
        {name: 'code',          type: 'string'},
        {name: 'name',          type: 'string'}
    ]
});
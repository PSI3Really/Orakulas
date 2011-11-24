Ext.define(CONFIG.APP_NS+'.model.Admin.Department', {
    extend: 'Ext.data.Model',
    idProperty: 'id',
    fields: [
        {name: 'id',            type: 'int'},
        {name: 'code',          type: 'string'},
        {name: 'name',          type: 'string'}
    ]
});
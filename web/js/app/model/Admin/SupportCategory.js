Ext.define(CONFIG.APP_NS+'.model.Admin.SupportCategory', {
    extend: 'Ext.data.Model',
    idProperty: 'id',
    fields: [
        {name: 'id',            type: 'int'},
        {name: 'name',          type: 'string'}
    ]
});
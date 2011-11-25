Ext.define(CONFIG.APP_NS+'.model.Admin.SupportCategory', {
    extend: 'Ext.data.Model',
    idProperty: 'id',
    fields: [
        {name: 'id',            type: 'int', persist:false},
        {name: 'name',          type: 'string'}
    ]
});
Ext.define(CONFIG.APP_NS+'.model.Admin.SupportType', {
    extend: 'Ext.data.Model',
    alias: 'widget.adminSupportTypeModel',
    idProperty: 'id',

    requires:[
        CONFIG.APP_NS+'.model.Admin.SupportCategory'
    ],

    fields: [
        {name: 'id',            type: 'int', persist:false},
        {name: 'code',          type: 'string'},
        {name: 'name',          type: 'string'},
        {name: 'supportCategory', model: CONFIG.APP_NS+'.model.Admin.SupportCategory'}
    ]
});
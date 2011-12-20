Ext.define(CONFIG.APP_NS+'.model.Admin.SupportQuantity', {
    extend: 'Ext.data.Model',
    alias: 'widget.supportQuantityModel',
    idProperty: 'id',

    requires:[
        CONFIG.APP_NS+'.model.Admin.Department',
        CONFIG.APP_NS+'.model.Admin.SupportType',
        CONFIG.APP_NS+'.model.Admin.SupportCategory'
    ],
    
    fields: [
        {name: 'id',                    type: 'int', persist:false},
        {name: 'supportTypeObject',     mapping: 'supportType', model: CONFIG.APP_NS+'.model.Admin.SupportType'},
        {name: 'supportType',           mapping: 'supportType.id'},
        {name: 'startDate',             type: 'date'},
        {name: 'endDate',               type: 'date'},
        {name: 'supportRequestCount',   type: 'int'},
        {name: 'supportTypeCode',       mapping: 'supportType.code'}
    ]
});
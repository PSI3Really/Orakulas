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
        {name: 'supportCategory',
            convert: function(value, record){
                if (Ext.isObject(value)){
                    return value.id
                } else {
                    return value;
                }
            }
            //model: CONFIG.APP_NS+'.model.Admin.SupportCategory'
        }
        //{name: 'departments'}
    ],

    hasMany: {model: CONFIG.APP_NS+'.model.Admin.SupportType', name: 'departments'}
});
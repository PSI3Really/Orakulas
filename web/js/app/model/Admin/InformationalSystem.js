Ext.define(CONFIG.APP_NS+'.model.Admin.InformationalSystem', {
    extend: 'Ext.data.Model',
    alias: 'widget.adminInformationalSystemModel',
    idProperty: 'id',
    
    fields: [
        {name: 'id',            type: 'int', persist:false},
        {name: 'code',          type: 'string'},
        {name: 'name',          type: 'string'},
        {name: 'departments',
            convert: function(value, record){
                var idArr = [];
                for (var i in value){
                    if (Ext.isObject(value[i])){
                        idArr.push(value[i].id);
                    } else {
                        idArr.push(value[i]);
                    }
                }
                return idArr;
            }
        }
    ],

    hasMany: [
        //{model: CONFIG.APP_NS+'.model.Admin.Department', name: 'departments'}
    ]
});
Ext.define(CONFIG.APP_NS+'.model.Admin.Department', {
    extend: 'Ext.data.Model',
    alias: 'widget.adminDepartmentModel',
    idProperty: 'id',
    
    fields: [
        {name: 'id',            type: 'int', persist:false},
        {name: 'code',          type: 'string'},
        {name: 'name',          type: 'string'},
        {name: 'informationalSystems',
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
        },
        {name: 'supporttypes'}
    ],

    hasMany: [
        //{model: CONFIG.APP_NS+'.model.Admin.DepartmentInfoSysUsage', name: 'infoSys'},
        {model: CONFIG.APP_NS+'.model.Admin.SupportAdministrationTime', name: 'supportTime'}
    ]
});
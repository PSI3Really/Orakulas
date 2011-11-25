Ext.define(CONFIG.APP_NS+'.store.Admin.Departments', {
    extend: 'Ext.data.Store',
    alias: 'widget.adminDepartmentsStore',
    requires: CONFIG.APP_NS+'.model.Admin.Department',
    model: CONFIG.APP_NS+'.model.Admin.Department',

    proxy: {
        type: 'ajax',
        api: {
                read: 'model/departments/read',
                create: 'model/departments/create',
                update: 'model/departments/update',
                destroy: 'model/departments/delete'
        },
        reader: {
            type: 'json'
        },
        writer: {
            type: 'json',
            root: 'jsonValue',
            encode: true,
            writeAllFields: false
        }
    }
});
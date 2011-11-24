Ext.define(CONFIG.APP_NS+'.store.Admin.Departments', {
    extend: 'Ext.data.Store',
    alias: 'widget.adminDepartmentsStore',
    requires: CONFIG.APP_NS+'.model.Admin.Department',
    model: CONFIG.APP_NS+'.model.Admin.Department',

    proxy: {
        type: 'ajax',
        url: 'model/departments',
        reader: {
            type: 'json'
        },
    }
});
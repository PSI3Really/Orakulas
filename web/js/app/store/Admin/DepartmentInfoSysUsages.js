Ext.define(CONFIG.APP_NS+'.store.Admin.DepartmentInfoSysUsages', {
    extend: 'Ext.data.Store',
    alias: 'widget.adminDepartmentInfoSysUsagesStore',
    requires: CONFIG.APP_NS+'.model.Admin.DepartmentInfoSysUsage',
    model: CONFIG.APP_NS+'.model.Admin.DepartmentInfoSysUsage',

    proxy: {
        type: 'ajax',
        api: {
            read: 'model/departmentInfoSysUsages/read',
            create: 'model/departmentInfoSysUsages/create',
            update: 'model/departmentInfoSysUsages/update',
            destroy: 'model/departmentInfoSysUsages/delete'
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
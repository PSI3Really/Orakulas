Ext.define(CONFIG.APP_NS+'.store.Admin.DepartmentInfoSysUsages', {
    extend: 'Ext.data.Store',
    alias: 'widget.adminDepartmentInfoSysUsagesStore',
    requires: CONFIG.APP_NS+'.model.Admin.DepartmentInfoSysUsage',
    model: CONFIG.APP_NS+'.model.Admin.DepartmentInfoSysUsage',

    proxy: {
        type: 'ajax',
        url: 'model/departmentInfoSysUsages',
        reader: {
            type: 'json'
        }
    }
});
Ext.define(CONFIG.APP_NS+'.store.DepartmentRequests', {
    extend: 'Ext.data.Store',
    alias: 'widget.departmentRequests',

    requires: CONFIG.APP_NS+'.model.DepartmentRequests',
    model: CONFIG.APP_NS+'.model.DepartmentRequests',

    proxy: {
        type: 'memory',
        //api: {
        //    read: 'model/loadHistories/departments/requests'
        //},
        reader: Ext.create(CONFIG.APP_NS+'.util.DynamicReaderJSON', {})
    }
});
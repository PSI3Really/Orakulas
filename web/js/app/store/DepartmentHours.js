Ext.define(CONFIG.APP_NS+'.store.DepartmentHours', {
    extend: 'Ext.data.Store',
    alias: 'widget.departmentHours',

    requires: CONFIG.APP_NS+'.model.DepartmentHours',
    model: CONFIG.APP_NS+'.model.DepartmentHours',

    proxy: {
        type: 'ajax',
        api: {
            read: 'model/loadHistories/departments/hours'
        },
        reader: Ext.create(CONFIG.APP_NS+'.util.DynamicReaderJSON', {})
    }
});
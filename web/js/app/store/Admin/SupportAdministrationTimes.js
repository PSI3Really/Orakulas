Ext.define(CONFIG.APP_NS+'.store.Admin.SupportAdministrationTimes', {
    extend: 'Ext.data.Store',
    alias: 'widget.adminSupportAdministrationTimesStore',
    requires: CONFIG.APP_NS+'.model.Admin.SupportAdministrationTime',
    model: CONFIG.APP_NS+'.model.Admin.SupportAdministrationTime',

    proxy: {
        type: 'ajax',
        api: {
            read: 'model/supportAdministrationTimes/read',
            create: 'model/supportAdministrationTimes/create',
            update: 'model/supportAdministrationTimes/update',
            destroy: 'model/supportAdministrationTimes/delete'
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
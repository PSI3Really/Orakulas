Ext.define(CONFIG.APP_NS+'.store.Admin.SupportAdministrationTimes', {
    extend: 'Ext.data.Store',
    alias: 'widget.adminSupportAdministrationTimesStore',
    requires: CONFIG.APP_NS+'.model.Admin.SupportAdministrationTime',
    model: CONFIG.APP_NS+'.model.Admin.SupportAdministrationTime',

    proxy: {
        type: 'ajax',
        url: 'model/supportAdministrationTimes',
        reader: {
            type: 'json'
        }
    }
});
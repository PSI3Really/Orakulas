Ext.define(CONFIG.APP_NS+'.store.Admin.SupportTypes', {
    extend: 'Ext.data.Store',
    alias: 'widget.adminSupportTypesStore',
    requires: CONFIG.APP_NS+'.model.Admin.SupportType',
    model: CONFIG.APP_NS+'.model.Admin.SupportType',

    proxy: {
        type: 'ajax',
        url: 'model/supportTypes',
        reader: {
            type: 'json'
        }
    }
});
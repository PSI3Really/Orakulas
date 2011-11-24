Ext.define(CONFIG.APP_NS+'.store.Admin.InformationalSystems', {
    extend: 'Ext.data.Store',
    alias: 'widget.adminInformationalSystemsStore',
    requires: CONFIG.APP_NS+'.model.Admin.InformationalSystem',
    model: CONFIG.APP_NS+'.model.Admin.InformationalSystem',

    proxy: {
        type: 'ajax',
        url: 'model/informationalSystems',
        reader: {
            type: 'json'
        }
    }
});
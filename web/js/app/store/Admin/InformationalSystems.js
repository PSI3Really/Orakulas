Ext.define(CONFIG.APP_NS+'.store.Admin.InformationalSystems', {
    extend: 'Ext.data.Store',
    alias: 'widget.adminInformationalSystemsStore',
    requires: CONFIG.APP_NS+'.model.Admin.InformationalSystem',
    model: CONFIG.APP_NS+'.model.Admin.InformationalSystem',

    proxy: {
        type: 'ajax',
        api: {
            read: 'model/informationalSystems/read',
            create: 'model/informationalSystems/create',
            update: 'model/informationalSystems/update',
            destroy: 'model/informationalSystems/delete'
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
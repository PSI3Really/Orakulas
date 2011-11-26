Ext.define(CONFIG.APP_NS+'.store.Admin.SupportTypes', {
    extend: 'Ext.data.Store',
    alias: 'widget.adminSupportTypesStore',
    requires: CONFIG.APP_NS+'.model.Admin.SupportType',
    model: CONFIG.APP_NS+'.model.Admin.SupportType',

    proxy: {
        type: 'ajax',
        api: {
            read: 'model/supportTypes/read',
            create: 'model/supportTypes/create',
            update: 'model/supportTypes/update',
            destroy: 'model/supportTypes/delete'
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
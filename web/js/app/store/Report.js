Ext.define(CONFIG.APP_NS+'.store.Report', {
    extend: 'Ext.data.Store',
    alias: 'widget.reportStore',
    requires: CONFIG.APP_NS+'.model.Load',
    model: CONFIG.APP_NS+'.model.Load'

    /*
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
    */
});
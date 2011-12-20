Ext.define(CONFIG.APP_NS+'.store.Admin.SupportQuantities', {
    extend: 'Ext.data.Store',
    alias: 'widget.adminSupportQuantitiesStore',
    requires: CONFIG.APP_NS+'.model.Admin.SupportQuantity',
    model: CONFIG.APP_NS+'.model.Admin.SupportQuantity',
    
    proxy: {
        type: 'ajax',
        api: {
            create: 'model/supportHistories/create',
            read: 'model/supportHistories/read',
            update: 'model/supportHistories/update',
            destroy: 'model/supportHistories/delete'
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
    },

    listeners:{
        update: function (store, record, operation){
            console.log(record);
        }
    }
})
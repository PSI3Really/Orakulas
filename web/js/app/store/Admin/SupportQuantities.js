Ext.define(CONFIG.APP_NS+'.store.Admin.SupportQuantities', {
    extend: 'Ext.data.Store',
    alias: 'widget.adminSupportQuantitiesStore',
    requires: CONFIG.APP_NS+'.model.Admin.SupportQuantity',
    model: CONFIG.APP_NS+'.model.Admin.SupportQuantity',
    
    proxy: {
        type: 'ajax',
        writer: 'json',
        api: {
            create: 'model/supportHistories/create',
            read: 'model/supportHistories/read',
            update: 'model/supportHistories/update',
            delete: 'model/supportHistories/delete'
        }
    }
})
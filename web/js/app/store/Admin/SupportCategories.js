Ext.define(CONFIG.APP_NS+'.store.Admin.SupportCategories', {
    extend: 'Ext.data.Store',
    alias: 'widget.adminSupportCategoriesStore',
    requires: CONFIG.APP_NS+'.model.Admin.SupportCategory',
    model: CONFIG.APP_NS+'.model.Admin.SupportCategory',

    proxy: {
        type: 'ajax',
        api: {
            read: 'model/supportCategories/read',
            create: 'model/supportCategories/create',
            update: 'model/supportCategories/update',
            destroy: 'model/supportCategories/delete'
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
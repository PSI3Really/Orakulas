Ext.define(CONFIG.APP_NS+'.store.Admin.SupportCategories', {
    extend: 'Ext.data.Store',
    alias: 'widget.adminSupportCategoriesStore',
    requires: CONFIG.APP_NS+'.model.Admin.SupportCategory',
    model: CONFIG.APP_NS+'.model.Admin.SupportCategory',

    proxy: {
        type: 'ajax',
        url: 'model/supportCategories',
        reader: {
            type: 'json'
        }
    }
});
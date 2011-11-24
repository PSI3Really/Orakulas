Ext.define(CONFIG.APP_NS+'.store.Admin.Users', {
    extend: 'Ext.data.Store',
    alias: 'widget.adminUsersStore',
    requires: CONFIG.APP_NS+'.model.Admin.User',
    model: CONFIG.APP_NS+'.model.Admin.User',

    proxy: {
        type: 'ajax',
        url: 'model/users',
        reader: {
            type: 'json'
        }
    }
});
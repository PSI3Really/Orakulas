Ext.define(CONFIG.APP_NS+'.store.Admin.Users', {
    extend: 'Ext.data.Store',
    alias: 'widget.adminUsersStore',
    requires: CONFIG.APP_NS+'.model.Admin.User',
    model: CONFIG.APP_NS+'.model.Admin.User',

    proxy: {
        type: 'ajax',
        api: {
            read: 'model/users/read',
            create: 'model/users/create',
            update: 'model/users/update',
            destroy: 'model/users/delete'
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
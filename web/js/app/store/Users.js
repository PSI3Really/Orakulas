Ext.require(CONFIG.APP_NS+'.model.User');

Ext.define(CONFIG.APP_NS+'store.Users', {
    extend: 'Ext.data.Store',
    alias: 'widget.usersstore',
    model: CONFIG.APP_NS+'.model.User',
    
    proxy: {
        type: 'ajax',
        url: 'model/users',
        reader: {
            type: 'json'
        }
    }
});
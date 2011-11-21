Ext.define(CONFIG.APP_NS+'.store.Users', {
    extend: 'Ext.data.Store',
    alias: 'widget.usersstore',
    requires: CONFIG.APP_NS+'.model.User',
    model: CONFIG.APP_NS+'.model.User'
});
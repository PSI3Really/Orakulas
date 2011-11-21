Ext.define(CONFIG.APP_NS+'.controller.Admin', {
    extend: 'Ext.app.Controller',

    stores: ['Users'],
    models: ['User'],
    views: ['Admin.Window', 'Admin.TabPanel', 'Admin.Users.UsersGrid']
});
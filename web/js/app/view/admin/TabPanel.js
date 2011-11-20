Ext.define(CONFIG.APP_NS+'.view.Admin.TabPanel', {
    extend: 'Ext.tab.Panel',
    alias: 'widget.admintabpanel',

    requires: [
        CONFIG.APP_NS+'.view.Admin.Users.UsersGrid'
    ],

    initComponent: function() {
        this.items = [
            {
                title: 'Asmeniniai nustatymai'
            },
            {
                title: 'Vartotojai',
                items: [
                    {
                        xtype: 'adminusersgrid'
                    }
                ]
            },
            {
                title: 'Informacines sistemos'
            },
            {
                title: 'Padaliniai'
            },
            {
                title: 'Priemones'
            }
        ];

        this.callParent();
    }
});
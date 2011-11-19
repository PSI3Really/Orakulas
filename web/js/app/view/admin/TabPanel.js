Ext.define(CONFIG.APP_NS+'.view.admin.TabPanel', {
    extend: 'Ext.tab.Panel',
    alias: 'widget.admintabpanel',

    requires: [
        CONFIG.APP_NS+'.view.admin.users.UsersGrid'
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
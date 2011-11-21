Ext.define(CONFIG.APP_NS+'.view.Admin.TabPanel', {
    extend: 'Ext.tab.Panel',
    alias: 'widget.admintabpanel',

    requires: [
        CONFIG.APP_NS+'.view.Admin.Users.UsersGrid',
        CONFIG.APP_NS+'.view.Admin.Departaments.DepartamentsGrid'
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
                title: 'Padaliniai',
                items: [
                    {
                        xtype: 'admindepartamentsgrid'
                    }
                ]
            },
            {
                title: 'Priemones'
            }
        ];

        this.callParent();
    }
});
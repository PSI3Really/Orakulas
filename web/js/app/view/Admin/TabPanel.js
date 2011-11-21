Ext.define(CONFIG.APP_NS+'.view.Admin.TabPanel', {
    extend: 'Ext.tab.Panel',
    alias: 'widget.admintabpanel',

    requires: [
        CONFIG.APP_NS+'.view.Admin.Users.UsersGrid',
        CONFIG.APP_NS+'.view.Admin.Departaments.DepartamentsGrid',
        CONFIG.APP_NS+'.view.Admin.InformationalSystems.ISGrid'
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
                title: 'Informacines sistemos',
                items: [
                    {
                        xtype: 'adminisgrid'
                    }
                ]
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
Ext.define(CONFIG.APP_NS+'.view.Admin.TabPanel', {
    extend: 'Ext.tab.Panel',
    alias: 'widget.admintabpanel',

    requires: [
        CONFIG.APP_NS+'.view.Admin.Users.Users',
        CONFIG.APP_NS+'.view.Admin.Departaments.Departaments',
        CONFIG.APP_NS+'.view.Admin.InformationalSystems.IS',
        CONFIG.APP_NS+'.view.Admin.SupportTypes.SupportTypes'
    ],

    initComponent: function() {
        this.items = [
            {
                layout: 'fit',
                title: 'Asmeniniai nustatymai'
            },
            {
                title: 'Vartotojai',
                layout: 'fit',
                items: [
                    {
                        border: false,
                        layout:'fit',
                        xtype: 'adminuserspanel'
                    }
                ]
            },
            {
                title: 'Informacinės sistemos',
                layout: 'fit',
                items: [
                    {
                        border: false,
                        layout: 'fit',
                        xtype: 'adminispanel'
                    }
                ]
            },
            {
                title: 'Padaliniai',
                layout: 'fit',
                items: [
                    {
                        border: false,
                        layout: 'fit',
                        xtype: 'admindepartamentspanel'
                    }
                ]
            },
            {
                title: 'Priemonės',
                layout: 'fit',
                items: [
                    {
                        border: false,
                        layout: 'fit',
                        xtype: 'adminsupporttypes'
                    }
                ]
            }
        ];

        this.callParent(arguments);
    }
});
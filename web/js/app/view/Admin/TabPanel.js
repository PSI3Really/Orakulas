Ext.define(CONFIG.APP_NS+'.view.Admin.TabPanel', {
    extend: 'Ext.tab.Panel',
    alias: 'widget.admintabpanel',

    requires: [
        CONFIG.APP_NS+'.view.Admin.Users.Users',
        CONFIG.APP_NS+'.view.Admin.Departments.Departments',
        CONFIG.APP_NS+'.view.Admin.InformationalSystems.IS',
        CONFIG.APP_NS+'.view.Admin.SupportTypes.SupportTypes'
    ],

    plain: true,

    initComponent: function() {
        this.items = [
            {
                title: LANG.ADMIN.TAB.USERS,
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
                title: LANG.ADMIN.TAB.IS,
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
                title: LANG.ADMIN.TAB.DEPARTMENTS,
                layout: 'fit',
                items: [
                    {
                        border: false,
                        layout: 'fit',
                        xtype: 'admindepartmentspanel'
                    }
                ]
            },
            {
                title: LANG.ADMIN.TAB.SUPPORT_TYPES,
                layout: 'fit',
                items: [
                    {
                        border: false,
                        layout: 'fit',
                        xtype: 'adminsupporttypes'
                    }
                ]
            },
            {
                title: LANG.ADMIN.TAB.SUPPORT_QUANTITIES,
                layout: 'fit',
                items: [{
                    border: false,
                    layout: 'fit',
                    xtype: 'adminsupportquantities'
                }]
            },
            {
                title: LANG.ADMIN.TAB.SUPPORT_ADMIN,
                layout: 'fit',
                items: [{
                    layout: 'fit',
                    border: false,
                    xtype: 'adminsupportadministration'
                }]
            }

        ];

        this.callParent(arguments);
    }
});
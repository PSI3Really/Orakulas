Ext.define(CONFIG.APP_NS+'.view.Admin.Users.Users', {
    extend: 'Ext.form.Panel',
    alias: 'widget.adminuserspanel',

    //store: CONFIG.APP_NS+'.store.Users', //Does not seem to work

    requires: [
        CONFIG.APP_NS+'.view.Admin.Users.UsersGrid'
    ],

    border: false,

    items: [
        {
            xtype: 'adminusersgrid',
            border: false,
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock:  'top',
                    items: [
                        {
                            iconCls: 'icon-plus-circle',
                            xtype:  'button',
                            action: 'add',
                            text:   'Pridėti'
                        },
                        {
                            iconCls: 'icon-minus-circle',
                            xtype:  'button',
                            action: 'delete',
                            text:   'Pašalinti'
                        }
                    ]
                }
            ]
        }
    ],

    initComponent: function() {
        this.callParent(arguments);
    }
});
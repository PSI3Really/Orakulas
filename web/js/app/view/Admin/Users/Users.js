Ext.define(CONFIG.APP_NS+'.view.Admin.Users.Users', {
    extend: 'Ext.form.Panel',
    alias: 'widget.adminuserspanel',

    //store: CONFIG.APP_NS+'.store.Users', //Does not seem to work

    requires: [
        CONFIG.APP_NS+'.view.Admin.Users.UsersGrid'
    ],

    initComponent: function() {
        this.border = false;

        this.items = [
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
                                text:   LANG.BUTTON.ADD
                            },
                            {
                                iconCls: 'icon-minus-circle',
                                xtype:  'button',
                                action: 'delete',
                                text:   LANG.BUTTON.REMOVE
                            },
                            '->',
                            {
                                iconCls: 'icon-disk-black',
                                xtype: 'button',
                                action: 'sync',
                                text: LANG.BUTTON.SYNC
                            },
                            {
                                iconCls: 'icon-arrow-return',
                                xtype: 'button',
                                action: 'undo',
                                text: LANG.BUTTON.CANCEL_CHANGES
                            }
                        ]
                    }
                ]
            }
        ];
        this.callParent(arguments);
    }
});
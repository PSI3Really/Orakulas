Ext.define(CONFIG.APP_NS+'.view.Admin.SupportQuantities.SupportQuantities', {
    extend: 'Ext.form.Panel',
    alias: 'widget.adminsupportquantities',

    requires: [
        CONFIG.APP_NS+'.view.Admin.SupportQuantities.Grid'
    ],

    initComponent: function() {
        this.border = false;

        this.items = [
            {
                xtype: 'adminsupportquantitiesgrid',
                border: false,
                dockedItems: [
                    {
                        xtype: 'toolbar',
                        dock: 'top',
                        items: [{
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
                            text: LANG.ADMIN.REFRESH
                        }]
                    }
                ]
           }
        ];

        this.callParent(arguments);
    }
});
Ext.define(CONFIG.APP_NS+'.view.Admin.SupportTypes.SupportTypes', {
    extend: 'Ext.form.Panel',
    alias: 'widget.adminsupporttypes',

    //store: CONFIG.APP_NS+'.store.Users', //Does not seem to work

    requires: [
        CONFIG.APP_NS+'.view.Admin.SupportTypes.SupportTypesGrid'
    ],

    initComponent: function() {
        this.border = false;

        this.items = [
            {
                xtype: 'adminsupporttypesgrid',
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
                                id: 'supportTypesSync',
                                disabled: true,
                                action: 'sync',
                                text: LANG.BUTTON.SYNC
                            },
                            {
                                iconCls: 'icon-arrow-return',
                                xtype: 'button',
                                action: 'undo',
                                text: LANG.ADMIN.REFRESH
                            }
                        ]
                    }
                ]
            }
        ];

        this.callParent(arguments);
    }
});
Ext.define(CONFIG.APP_NS+'.view.Admin.InformationalSystems.IS', {
    extend: 'Ext.form.Panel',
    alias: 'widget.adminispanel',

    requires: [
        CONFIG.APP_NS+'.view.Admin.InformationalSystems.ISGrid'
    ],

    initComponent: function() {
        this.border = false;

        this.items = [
            {
                xtype: 'adminisgrid',
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
        ];

        this.callParent(arguments);
    }
});
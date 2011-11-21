Ext.define(CONFIG.APP_NS+'.view.Admin.Departaments.Departaments', {
    extend: 'Ext.form.Panel',
    alias: 'widget.admindepartamentspanel',

    requires: [
        CONFIG.APP_NS+'.view.Admin.Departaments.DepartamentsGrid'
    ],

    border: false,

    items: [
        {
            xtype: 'admindepartamentsgrid',
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
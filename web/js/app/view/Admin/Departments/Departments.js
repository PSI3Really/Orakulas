Ext.define(CONFIG.APP_NS+'.view.Admin.Departments.Departments', {
    extend: 'Ext.form.Panel',
    alias: 'widget.admindepartmentspanel',

    requires: [
        CONFIG.APP_NS+'.view.Admin.Departments.DepartmentsGrid'
    ],

    initComponent: function() {
        this.border = false;

        this.items = [
            {
                xtype: 'admindepartmentsgrid',
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
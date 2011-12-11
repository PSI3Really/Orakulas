Ext.define(CONFIG.APP_NS+'.view.Admin.Departments.DepartmentsAddPanel', {
    extend: 'Ext.form.Panel',
    alias: 'widget.admindepartmentsaddpanel',

    requires: [
        CONFIG.APP_NS+'.view.Admin.Departments.DepartmentsSTAddGrid',
        CONFIG.APP_NS+'.view.Admin.Departments.DepartmentsISAddGrid'
    ],

    initComponent: function() {
        this.border = false;

        this.layout =  {
            type:   'hbox',
            pack:   'start',
            align:  'stretch'
        };

        this.items = [
            {
                xtype:  'admindepartmentsstaddgrid',
                flex:1
            },
            {
                xtype:  'admindepartmentsisaddgrid',
                flex:1
            }
        ];

       this.dockedItems = [
            {
                xtype: 'toolbar',
                dock:  'bottom',

                items: [
                    '->',
                    {
                        iconCls: 'icon-tick',
                        xtype:  'button',
                        action: 'confirm',
                        text:   LANG.BUTTON.OK
                    },
                    {
                        iconCls: 'icon-cross',
                        xtype:  'button',
                        action: 'cancel',
                        text:   LANG.BUTTON.CANCEL
                    }
                ]
            },
            {
                xtype:  'toolbar',
                dock:   'top',

                layout: {
                    type:   'hbox',
                    pack:   'start',
                    align:  'stretch'
                },

                style: {
                    paddingTop:     '5px',
                    paddingBottom:  '5px',
                    paddingLeft:    '10px',
                    paddingRight:   '10px'
                },

                height: 35,

                items: [
                    {
                        xtype:  'label',
                        text:   '~~Kodas',
                        flex:   0,
                        style: {
                            paddingRight: '5px',
                            paddingTop:   '5px'
                        }
                    },
                    {
                        xtype:  'textfield',
                        name:   'code',
                        flex:   0,
                        style: {
                            width: '40px !Important'
                        }
                    },
                    {
                        xtype:  'label',
                        text:   '~~Pavadinimas',
                        style: {
                            paddingRight: '5px',
                            paddingLeft:  '15px',
                            paddingTop:   '5px'
                        },
                        flex:   0
                    },
                    {
                        xtype:  'textfield',
                        name:   'name',
                        flex:   1
                    }
                ]
            }
        ];

        this.callParent(arguments);
    }
});
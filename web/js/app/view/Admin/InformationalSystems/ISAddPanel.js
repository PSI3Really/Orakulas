Ext.define(CONFIG.APP_NS+'.view.Admin.InformationalSystems.ISAddPanel', {
    extend: 'Ext.form.Panel',
    alias: 'widget.adminisaddpanel',

    requires: [
        CONFIG.APP_NS+'.view.Admin.InformationalSystems.ISAddGrid'
    ],

    initComponent: function() {
        this.border = false;

        this.items = [
            {
                xtype:  'adminisaddgrid'
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
                        text:   LANG.ENTITY.CODE,
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
                        text:   LANG.ENTITY.ENTITY_NAME,
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
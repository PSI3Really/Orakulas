Ext.define(CONFIG.APP_NS+'.view.Admin.SupportTypes.SupportTypesAddPanel', {
    extend: 'Ext.form.Panel',
    alias: 'widget.adminsupporttypesaddpanel',

    requires: [
        CONFIG.APP_NS+'.view.Admin.SupportTypes.SupportTypesAddGrid'
    ],

    initComponent: function() {
        this.border = false;

        this.items = [
            {
                xtype:  'adminsupporttypesaddgrid'
            }
        ];

        var supportTypesStore = Ext.create('widget.adminSupportTypesStore', {});

       this.dockedItems = [
            {
                xtype:  'toolbar',
                dock:   'bottom',

                items: [
                    '->',
                    {
                        iconCls:    'icon-tick',
                        xtype:      'button',
                        action:     'confirm',
                        text:       LANG.BUTTON.OK
                    },
                    {
                        iconCls:    'icon-cross',
                        xtype:      'button',
                        action:     'cancel',
                        text:       LANG.BUTTON.CANCEL
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
                        },
                        value: this.record.get("code")
                    },
                    {
                        xtype:  'label',
                        text:  LANG.ENTITY.ENTITY_NAME,
                        flex:   0,

                        style: {
                            paddingRight: '5px',
                            paddingLeft:  '15px',
                            paddingTop:   '5px'
                        }
                    },
                    {
                        xtype:  'textfield',
                        name:   'name',
                        flex:   1,
                        value: this.record.get("name")
                    }
                ]
            },
            {
                xtype: 'toolbar',

                layout: {
                    type:   'hbox',
                    pack:   'start',
                    align:  'stretch'
                },

                height: 35,

                style: {
                    paddingTop:     '5px',
                    paddingBottom:  '5px',
                    paddingLeft:    '10px',
                    paddingRight:   '10px'
                },
                
                items: [
                    {
                        xtype:  'label',
                        text:   LANG.ENTITY.DIRECTION,
                        flex:   0,

                        style: {
                            paddingRight: '5px',
                            paddingTop:   '5px'
                        }
                    },
                    {
                        xtype: 'combo',
                        flex: 1,

                        name: "supporttype",
                        triggerAction: "all",
                        loadingText: LANG.ENTITY.LOADING,
                        store: supportTypesStore,
                        mode:'local',
                        displayField: "name",
                        valueField: "id",
                        forceSelection: true,
                        emptyText:  LANG.ADMIN.SUPPORT_TYPES.CHOOSE_DIRECTION
                        //this.record.get('supportCategory').id
                    }
                ]
            }
        ];

        //debugger;

        this.callParent(arguments);
    }
});
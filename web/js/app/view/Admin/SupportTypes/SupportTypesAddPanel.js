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
                        flex:   1
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
                        text:   '~~Kryptis',
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
                        loadingText: "~~Kraunama...",
                        store: supportTypesStore,
                        mode:'local',
                        displayField: "name",
                        valueField: "name",
                        forceSelection: true,
                        emptyText:  '~~Pasirinkite krypti'
                    }
                ]
            }
        ];

        this.callParent(arguments);
    }
});
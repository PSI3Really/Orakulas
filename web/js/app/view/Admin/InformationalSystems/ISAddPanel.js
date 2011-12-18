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
                        value: this.record.get("code"),

                        allowBlank: false,

                        style: {
                            width: '40px !Important'
                        }
                    },
                    {
                        xtype:  'label',
                        text:   LANG.ENTITY.ENTITY_NAME,
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

                        value: this.record.get("name"),
                        allowBlank: false
                    }
                ]
            }
        ];

        if(this.editing) {
            var params = {
                id: this.record.get("id")
            };

            Ext.Ajax.request({
                url : 'model/informationalSystems/usedBy',
                method: 'POST',
                params: {
                    jsonValue: Ext.encode(params)
                },
                success:
                    function(response, opts) {
                        
                        var obj = Ext.decode(response.responseText);
                        if(obj.length > 0) {
                            var grid = Ext.getCmp('adminisaddgridid');
                            var store = grid.getStore();
                            store.load({
                                callback: function(ret, options, success) {
                                    if (success) {
                                        for(var i=0; i<obj.length; i++) {
                                            var ats = store.find('id', obj[i]);
                                            grid.selModel.select(ats, true, false);
                                        }
                                    }
                                }
                            });
                        }
                    }
            });
        }

        this.callParent(arguments);
    }
});
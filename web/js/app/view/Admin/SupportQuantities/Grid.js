Ext.define(CONFIG.APP_NS+'.view.Admin.SupportQuantities.Grid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.adminsupportquantities',

    store: null,
    selType: 'rowmodel',
    multiSelect: true,

    initComponent: function() {
        this.store = Ext.create('widget.adminSupportQuantitiesStore', {});

        this.columns = [{
            header: LANG.ENTITY.SUPPORT_TYPE,
            dataIndex: 'supportTypeCode',
            flex: 1,
            editor: {
                xtype: 'combobox',
                allowBlank: false,
                queryMode: 'remote',
                displayField: 'name',
                valueField: 'code',
                forceSelection: true,
                store: {
                    fields: ['id', 'name', 'code'],
                    proxy: {
                        type: 'ajax',
                        reader: 'json',
                        api: {read: 'model/supportTypes/read'}
                    }
                }
            }
        },{
            header: LANG.ENTITY.START_DATE,
            dataIndex: 'startDate',
            flex: 1,
            xtype: 'datecolumn',
            format: 'Y-m-d',
            editor: {
                xtype: 'datefield',
                format: 'Y-m-d',
                allowBlank: false
            }
        },{
            header: LANG.ENTITY.END_DATE,
            dataIndex: 'endDate',
            flex: 1,
            xtype: 'datecolumn',
            format: 'Y-m-d',
            editor: {
                xtype: 'datefield',
                format: 'Y-m-d',
                allowBlank: false
            }
        },{
            header: LANG.ENTITY.AMOUNT,
            dataIndex: 'supportRequestCount',
            flex: 1,
            editor: {
                xtype: 'numberfield',
                minValue: 0,
                allowBlank: false
            }
        }];

        /*
        this.dockedItems = {
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
                xtype: 'button',
                action: 'accept',
                text: LANG.BUTTON.OK
            },
            {
                xtype: 'button',
                action: 'cancel',
                text: LANG.BUTTON.CANCEL
            }]
        };
        */

        this.plugins = [
            Ext.create('Ext.grid.plugin.RowEditing', {
                clicksToEdit: 2,
                listeners: { //It doesn't work if put in the controller :/
                    canceledit: {
                        fn: function(element, eOpts){
                            var data = element.record.data;
                            if (data.type == "" || data.endDate == null || data.startDate == ""){
                                this.grid.store.remove(element.record);
                            }
                        }
                    }
                }
            })
        ];

        this.store.load();

        this.callParent(arguments);
    }
});
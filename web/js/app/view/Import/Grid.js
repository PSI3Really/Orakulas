Ext.define(CONFIG.APP_NS+'.view.Import.Grid', { //TODO: merge with predictgrid
    extend: 'Ext.grid.Panel',
    alias: 'widget.importgrid',

    store: null,
    selType: 'rowmodel',
    multiSelect: true,

    initComponent: function() {
        this.store = Ext.create('Ext.data.Store', {
            fields: [
                {name: 'type', type: 'string'},
                {name: 'startDate', type: 'date'},
                {name: 'endDate', type: 'date'},
                {name: 'amount', type: 'int'}
            ],
            data: [],
            proxy: {
                type: 'ajax',
                writer: 'json',
                api: {
                    //create: 'model/supportHistories/create',
                    //update: 'model/supportHistories/update'
                }
            }
        });
        
        this.columns = [{
            header: LANG.ENTITY.SUPPORT_TYPE,
            dataIndex: 'type',
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
                format: 'Y-m-d', //TODO: Y-m works!
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
            dataIndex: 'amount',
            flex: 1,
            editor: {
                xtype: 'numberfield',
                minValue: 0,
                allowBlank: false
            }
        }];

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

        this.callParent(arguments);
    }
});
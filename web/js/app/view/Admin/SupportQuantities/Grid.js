Ext.define(CONFIG.APP_NS+'.view.Admin.SupportQuantities.Grid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.adminsupportquantitiesgrid',

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
                queryMode: 'local',
                displayField: 'name',
                valueField: 'code',
                forceSelection: true,
                store: {
                    fields: ['id', 'name', 'code'],
                    proxy: {
                        type: 'ajax',
                        reader: 'json',
                        api: {read: 'model/supportTypes/read'}
                    },
                    autoLoad: true
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

        this.plugins = [
            Ext.create('Ext.grid.plugin.RowEditing', {
                clicksToEdit: 2,
                listeners: { //It doesn't work if put in the controller :/
                    canceledit: {
                        fn: function(element, eOpts){
                            var data = element.record.data;
                            if (data.supportTypeCode == "" || data.endDate == null || data.startDate == ""){
                                this.grid.store.remove(element.record);
                            }
                        }
                    },
                    edit: {
                        fn: function(event){
                            if (event.field == 'supportTypeCode'){
                                var editorStore = event.column.getEditor().store;
                                var newValue = event.record.get('supportTypeCode');
                                var recordIdx = editorStore.find('code', newValue);
                                var supportId = editorStore.getAt(recordIdx).get('id');

                                event.record.set('supportType', supportId);
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
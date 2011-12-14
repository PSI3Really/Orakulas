Ext.define(CONFIG.APP_NS+'.view.Import.Grid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.importgrid',

    store: null,

    initComponent: function() {
        this.store = Ext.create('Ext.data.Store', {
            fields: [
                {name: 'type', type: 'string'},
                {name: 'startDate', type: 'date'},
                {name: 'endDate', type: 'date'},
                {name: 'amount', type: 'int'}
            ],
            data: []
        });
        
        this.columns = [
            {header: LANG.ENTITY.SUPPORT_TYPE,  dataIndex: 'type',  flex: 1},
            {header: LANG.ENTITY.START_DATE,    dataIndex: 'startDate',  flex: 1,  xtype: 'datecolumn', format: 'Y-m-d'},
            {header: LANG.ENTITY.END_DATE,      dataIndex: 'endDate',  flex: 1,  xtype: 'datecolumn', format: 'Y-m-d'},
            {header: LANG.ENTITY.AMOUNT,        dataIndex: 'amount',  flex: 1}
        ];

        this.callParent(arguments);
    }
});
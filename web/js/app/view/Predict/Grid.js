Ext.define(CONFIG.APP_NS+'.view.Predict.Grid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.predictgrid',

    store: null,

    initComponent: function() {
        this.store = Ext.create('Ext.data.Store', {
            fields: ['type', 'startDate', 'endDate', 'amount'],
            data: []
        });
        
        this.columns = [
            {header: LANG.ENTITY.SUPPORT_TYPE,  dataIndex: 'type',  flex: 1},
            {header: LANG.ENTITY.START_DATE,    dataIndex: 'startDate',  flex: 1},
            {header: LANG.ENTITY.END_DATE,      dataIndex: 'endDate',  flex: 1},
            {header: LANG.ENTITY.AMOUNT,        dataIndex: 'amount',  flex: 1}
        ];

        this.callParent(arguments);
    }
});
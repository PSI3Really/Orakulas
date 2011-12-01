Ext.define(CONFIG.APP_NS+'.view.Import.Grid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.importgrid',

    initComponent: function() {
        this.store = Ext.create('Ext.data.Store', {
            fields: ['type', 'from', 'to', 'amount'],
            data: []
        });
        
        this.columns = [
            {header: LANG.ENTITY.SUPPORT_TYPE,  dataIndex: 'type',  flex: 1},
            {header: LANG.ENTITY.FROM,          dataIndex: 'from',  flex: 1},
            {header: LANG.ENTITY.TO,            dataIndex: 'to',  flex: 1},
            {header: LANG.ENTITY.AMOUNT,        dataIndex: 'amount',  flex: 1}
        ];

        this.callParent(arguments);
    }
});
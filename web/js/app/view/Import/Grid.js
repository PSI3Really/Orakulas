Ext.define(CONFIG.APP_NS+'.view.Import.Grid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.importgrid',

    initComponent: function() {
        this.store = Ext.create('Ext.data.Store', {
            fields: ['type', 'from', 'to', 'amount'],
            data: []
        });
        
        this.columns = [
            {header: 'Priemonė',  dataIndex: 'type',  flex: 1},
            {header: 'Nuo', dataIndex: 'from',  flex: 1},
            {header: 'Iki', dataIndex: 'to',  flex: 1},
            {header: 'Kiekis', dataIndex: 'amount',  flex: 1}
        ];

        this.callParent(arguments);
    }
});
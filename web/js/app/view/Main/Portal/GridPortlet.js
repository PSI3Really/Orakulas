Ext.require('Ext.ux.grid.FiltersFeature');

Ext.define(CONFIG.APP_NS+'.view.Main.Portal.GridPortlet', {
    extend: 'Ext.ux.Portlet',
    alias: 'widget.gridportlet',

    filters: null,

    initComponent: function(){

        this.filters = Ext.create('Ext.ux.grid.FiltersFeature', {
            ftype: 'filters',
            autoReload: false,
            local: true
        });

        this.dataView = Ext.create('Ext.grid.Panel',{
            store: this.store,
            columns: [
                {header: LANG.ENTITY.MONTH, dataIndex: 'startDate', flex: 1, xtype: 'datecolumn', format: 'Y-m'} //TODO
            ],
            features: [this.filters]
        });

        this.items = [
            this.dataView
        ];

        this.dockedItems = [{
            xtype: 'portletbar',
            dock: 'top',
            gridlet: true
        }];

        this.callParent();
    },

    setStore: function(store){ //TODO: make filters work
        this.store = store;

        this.filters.removeAll();

        var columns = [{header: LANG.ENTITY.MONTH, dataIndex: 'startDate', flex: 1, xtype: 'datecolumn', format: 'Y-m-d', filter:{type: 'date'}}];
        
        var fields = store.model.prototype.fields.keys; //Really ExtJS, really?
        //console.log(fields);
        for (var i = 1; i < fields.length; i++){ //TODO: for i = 0 to length (in case 0th field is not startDate)
            columns.push({header: fields[i], dataIndex: fields[i], flex: 1, xtype: 'numbercolumn', filter:{type:'numeric'}});
        }

        this.dataView.reconfigure(store, columns);
        //this.dataView.bindStore(store);
    }
});
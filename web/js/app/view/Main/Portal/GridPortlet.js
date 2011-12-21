Ext.require('Ext.ux.grid.FiltersFeature');
Ext.require('Ext.ux.grid.SelectFeature');

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

        this.tools = [
            {
                type: 'gear',
                handler: function (event, toolEl, owner) {
                    Ext.Msg.prompt(LANG.MAIN.PORTAL.RENAME.TITLE, LANG.MAIN.PORTAL.RENAME.MSG, function(btn, text){
                        if (btn == 'ok'){
                            if (text.length > 0) {
                                var portlets = owner.up('portal').query('portlet'),
                                    similar  = '';
                                Ext.each(portlets, function () {
                                    if (this.title.substring(0, text.length) == text) {
                                        if (similar == '') {
                                            similar = 0;
                                        }
                                        similar++;
                                    }
                                });
                                owner.setTitle(text+similar);
                                owner.up('gridportlet').title = text+similar;
                            }
                        }
                    });
                }
            }
        ];

        this.callParent();
    },

    setStore: function(store){
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
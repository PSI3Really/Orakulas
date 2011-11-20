Ext.define(CONFIG.APP_NS+'.view.Import.Grid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.importgrid',

    //requires: [CONFIG.APP_NS+'.store.Users'],

    //store: CONFIG.APP_NS+'.store.Users',

    initComponent: function() {


        this.store = Ext.create('Ext.data.Store', {
            model: CONFIG.APP_NS+'.model.User',
            proxy: {
                type: 'ajax',
                url: 'model/users',
                reader: {
                    type: 'json'
                }
            }
        });
        //*/
        //this.store = Ext.create(CONFIG.APP_NS+'.store.Users', {});

        this.store.load();
        
        this.columns = [
            {header: 'Name',  dataIndex: 'username',  flex: 1},
            {header: 'Email', dataIndex: 'email', flex: 1}
        ];

        this.callParent(arguments);
    }
});
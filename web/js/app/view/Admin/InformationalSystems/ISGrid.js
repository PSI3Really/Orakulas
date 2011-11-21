Ext.define(CONFIG.APP_NS+'.view.Admin.InformationalSystems.ISGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.adminisgrid',

    //store: CONFIG.APP_NS+'.store.Users', //Does not seem to work

    initComponent: function() {
        this.store = Ext.create('widget.adminInformationalSystemsStore', {});

        this.columns = [
            {header: 'Kodas',                    dataIndex: 'code',  flex: 0},
            {header: 'Informacinė sistema',      dataIndex: 'name', flex: 1}
        ];

        this.store.load();

        this.callParent(arguments);
    }
});
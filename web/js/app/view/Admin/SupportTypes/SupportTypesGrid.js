Ext.define(CONFIG.APP_NS+'.view.Admin.SupportTypes.SupportTypesGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.adminsupporttypesgrid',

    //store: CONFIG.APP_NS+'.store.Users', //Does not seem to work

    initComponent: function() {
        this.store = Ext.create('widget.adminSupportTypesStore', {});

        this.columns = [
            {header: 'Kodas',                    dataIndex: 'code',  flex: 0},
            {header: 'Priemonė',                 dataIndex: 'name', flex: 1}
        ];

        this.store.load();

        this.callParent(arguments);
    }
});
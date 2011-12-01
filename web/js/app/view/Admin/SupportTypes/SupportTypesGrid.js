Ext.define(CONFIG.APP_NS+'.view.Admin.SupportTypes.SupportTypesGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.adminsupporttypesgrid',

    //store: CONFIG.APP_NS+'.store.Users', //Does not seem to work

    initComponent: function() {
        this.store = Ext.create('widget.adminSupportTypesStore', {});

        this.columns = [
            {header: LANG.ENTITY.CODE,           dataIndex: 'code',  flex: 0},
            {header: LANG.ENTITY.SUPPORT_TYPE,   dataIndex: 'name', flex: 1}
        ];

        this.store.load();

        this.callParent(arguments);
    }
});
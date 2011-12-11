Ext.define(CONFIG.APP_NS+'.view.Admin.SupportTypes.SupportTypesAddGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.adminsupporttypesaddgrid',

    initComponent: function() {
        this.border = false;
        this.store = Ext.create('widget.adminDepartmentsStore', {});
        this.columns = [
            {header: '~~Padalinys',     dataIndex: 'code',  flex: 1},
            {header: '~~Valandos',     dataIndex: 'code',  flex: 1}
        ];

        this.multiSelect = true;
        this.store.load();
        this.callParent(arguments);
    }
});
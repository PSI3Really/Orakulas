Ext.define(CONFIG.APP_NS+'.view.Admin.Departments.DepartmentsISAddGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.admindepartmentsisaddgrid',

    initComponent: function() {
        this.border = false;
        this.store = Ext.create('widget.adminInformationalSystemsStore', {});
        this.columns = [
            {header: LANG.ENTITY.INFO_SYS_PLURAL,          dataIndex: 'code',  flex: 1}
        ];

        this.multiSelect = true;
        this.store.load();
        this.callParent(arguments);
    }
});
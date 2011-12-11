Ext.define(CONFIG.APP_NS+'.view.Admin.Departments.DepartmentsISAddGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.admindepartmentsisaddgrid',

    initComponent: function() {
        this.border = false;

        this.store = Ext.create('widget.adminDepartmentsStore', {});

        this.columns = [
            {header: '~~Padaliniai',          dataIndex: 'code',  flex: 1}
        ];

        this.multiSelect = true;

        this.store.load();

        this.callParent(arguments);
    }
});
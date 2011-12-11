Ext.define(CONFIG.APP_NS+'.view.Admin.Departments.DepartmentsSTAddGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.admindepartmentsstaddgrid',

    initComponent: function() {
        this.border = false;

        this.store = Ext.create('widget.adminSupportAdministrationTimesStore', {});

        this.columns = [
            {header: '~~Padaliniai',          dataIndex: 'hoursCount',  flex: 1}
        ];

        this.multiSelect = true;

        this.store.load();

        this.callParent(arguments);
    }
});
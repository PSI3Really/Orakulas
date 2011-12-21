Ext.define(CONFIG.APP_NS+'.view.Admin.Departments.DepartmentsSTAddGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.admindepartmentsstaddgrid',

    initComponent: function() {
        this.border = false;
        this.store = Ext.create('widget.adminSupportAdministrationTimesStore', {});
        this.columns = [
            {header: LANG.ENTITY.SUPPORT_COUNT_PLURAL,     dataIndex: 'supportTypeName',  flex: 1},
            {header: LANG.ENTITY.HOURS_SPENT,      dataIndex: 'hoursCount',  flex: 1}
        ];

        this.multiSelect = true;
        this.store.load();
        this.callParent(arguments);
    }
});
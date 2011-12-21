Ext.define(CONFIG.APP_NS+'.view.Admin.Departments.DepartmentsGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.admindepartmentsgrid',
    
    initComponent: function() {
        this.store = Ext.create('widget.adminDepartmentsStore', {});
        this.columns = [
            {
                header: LANG.ENTITY.CODE,
                dataIndex: 'code',
                flex: 0
            },
            {
                header: LANG.ENTITY.DEPARTMENT,
                dataIndex: 'name',
                flex: 1
            }
        ];

        this.store.load();
        this.callParent(arguments);
    }
});
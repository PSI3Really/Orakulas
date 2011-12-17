Ext.define(CONFIG.APP_NS+'.view.Admin.Departments.DepartmentsGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.admindepartmentsgrid',
    
    initComponent: function() {
        this.store = Ext.create('widget.adminDepartmentsStore', {});
        this.columns = [
            {
                header: LANG.ENTITY.CODE,
                dataIndex: 'code',
                flex: 0,

                editor: {
                    xtype: 'textfield'
                }
            },
            {
                header: LANG.ENTITY.DEPARTMENT,
                dataIndex: 'name',
                flex: 1,

                editor: {
                    xtype: 'textfield'
                }
            }
        ];

        this.plugins = [
            Ext.create('Ext.grid.plugin.RowEditing', {
                clicksToEdit: 2
            })
        ];

        this.store.load();
        this.callParent(arguments);
    }
});
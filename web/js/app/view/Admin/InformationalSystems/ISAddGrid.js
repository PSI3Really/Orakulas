Ext.define(CONFIG.APP_NS+'.view.Admin.InformationalSystems.ISAddGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.adminisaddgrid',

    initComponent: function() {
        this.border = false;

        this.store = Ext.create('widget.adminDepartmentsStore', {});

        this.columns = [
            {header: LANG.ENTITY.DEPARTMENT_PLURAL,          dataIndex: 'code',  flex: 1}
        ];

        this.multiSelect = true;

        this.store.load();

        this.callParent(arguments);
    }
});
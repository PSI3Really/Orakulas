Ext.define(CONFIG.APP_NS+'.view.Admin.SupportTypes.SupportTypesAddGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.adminsupporttypesaddgrid',

    initComponent: function() {
        this.border = false;
        this.store = Ext.create('widget.adminDepartmentsStore', {});
        this.columns = [
            {header: LANG.ENTITY.DEPARTMENT,     dataIndex: 'code',  flex: 1},
            {header: LANG.ENTITY.HOURS_SPENT,     dataIndex: 'hours',  flex: 1}
        ];
        
        this.store.load();
        this.callParent(arguments);
    }
});
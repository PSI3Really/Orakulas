Ext.define(CONFIG.APP_NS+'.view.Admin.Departments.DepartmentsAddWindow', {
    extend: 'Ext.window.Window',
    alias:  'widget.admindepartmentsaddwindow',

    requires: [
        CONFIG.APP_NS+'.view.Admin.Departments.DepartmentsAddPanel'
    ],

    store: null,
    saved: false,
    editing: false,
    record: Ext.create('widget.adminDepartmentModel'),

    initComponent: function() {
        this.layout     = 'fit';
        this.floatable  = true;
        this.modal      = true;
        this.height     = 350;
        this.width      = 600;
        this.title      = LANG.ENTITY.DEPARTMENT;

        this.items = [
            {
                xtype:  'admindepartmentsaddpanel',
                layout: 'fit',
                record: this.record

            }
        ];
        this.callParent(arguments);
    }
});
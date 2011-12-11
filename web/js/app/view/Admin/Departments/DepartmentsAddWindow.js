Ext.define(CONFIG.APP_NS+'.view.Admin.Departments.DepartmentsAddWindow', {
    extend: 'Ext.window.Window',
    alias:  'widget.admindepartmentsaddwindow',

    requires: [
        CONFIG.APP_NS+'.view.Admin.Departments.DepartmentsAddPanel'
    ],

    initComponent: function() {
        this.layout = 'fit';
        this.floatable = true;
        this.modal = true;

        this.height = 350;
        this.width = 600;

        this.title = LANG.ADMIN.ADD_INFORMATIONAL_SYSTEM.TITLE;

        this.items = [
            {
                xtype: 'admindepartmentsaddpanel',
                layout: 'fit'
            }
        ];
        this.callParent(arguments);
    }
});
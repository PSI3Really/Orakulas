Ext.define(CONFIG.APP_NS+'.view.Admin.InformationalSystems.ISAddWindow', {
    extend: 'Ext.window.Window',
    alias:  'widget.adminisaddWindow',

    requires:[
        CONFIG.APP_NS+'.view.Admin.InformationalSystems.ISAddPanel'
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
                xtype: 'adminisaddpanel'
            }
        ];
        this.callParent(arguments);
    }
});
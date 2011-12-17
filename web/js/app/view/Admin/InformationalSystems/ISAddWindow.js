Ext.define(CONFIG.APP_NS+'.view.Admin.InformationalSystems.ISAddWindow', {
    extend: 'Ext.window.Window',
    alias:  'widget.adminisaddWindow',

    requires:[
        CONFIG.APP_NS+'.view.Admin.InformationalSystems.ISAddPanel'
    ],

    editing: false, //Are we creating a new user or editing an existing one?
    record: Ext.create('widget.adminInformationalSystemModel'),
    store: null,
    saved: false,

    initComponent: function() {
        this.layout     = 'fit';
        this.floatable  = true;
        this.modal      = true;
        this.height     = 350;
        this.width      = 600;

        if (this.editing){
            this.title = "~~IS Redagavimas";
        } else {
            this.title = LANG.ADMIN.ADD_INFORMATIONAL_SYSTEM.TITLE;
        }

        this.items = [
            {
                xtype: 'adminisaddpanel',
                record: this.record,
                editing: this.editing,
                layout: 'fit'
            }
        ];
        
        this.callParent(arguments);
    }
});
Ext.define(CONFIG.APP_NS+'.view.Admin.SupportTypes.SupportTypesAddWindow', {
    extend: 'Ext.window.Window',
    alias:  'widget.adminsupporttypesaddWindow',

    requires:[
        CONFIG.APP_NS+'.view.Admin.SupportTypes.SupportTypesAddPanel'
    ],

    store: null,
    saved: false,
    editing: false,
    record: Ext.create('widget.adminSupportTypeModel'),

    initComponent: function() {
        this.layout     = 'fit';
        this.floatable  = true;
        this.modal      = true;
        this.height     = 350;
        this.width      = 600;
        this.title      = LANG.ENTITY.SUPPORT_TYPE;

        this.items = [
            {
                xtype:  'adminsupporttypesaddpanel',
                layout: 'fit',
                record: this.record
            }
        ];

        this.callParent(arguments);
    }
});
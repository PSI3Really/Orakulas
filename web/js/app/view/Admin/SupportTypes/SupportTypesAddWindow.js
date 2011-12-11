Ext.define(CONFIG.APP_NS+'.view.Admin.SupportTypes.SupportTypesAddWindow', {
    extend: 'Ext.window.Window',
    alias:  'widget.adminsupporttypesaddWindow',

    requires:[
        CONFIG.APP_NS+'.view.Admin.SupportTypes.SupportTypesAddPanel'
    ],

    initComponent: function() {
        this.layout     = 'fit';
        this.floatable  = true;
        this.modal      = true;
        this.height     = 350;
        this.width      = 600;
        this.title      = '~~Priemone';

        this.items = [
            {
                xtype:  'adminsupporttypesaddpanel',
                layout: 'fit'
            }
        ];

        this.callParent(arguments);
    }
});
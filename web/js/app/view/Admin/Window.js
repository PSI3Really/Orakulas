Ext.define(CONFIG.APP_NS+'.view.Admin.Window', {
    extend: 'Ext.window.Window',
    alias:  'widget.adminWindow',

    title: 'Administravimas / Nustatymai',

    requires: [
        CONFIG.APP_NS+'.view.Admin.TabPanel'
    ],

    initComponent: function() {
        this.layout = 'fit';
        this.floatable = true;
        this.modal = true;

        this.height = 500;
        this.width = 600;


        this.items = [
            {
                xtype: 'admintabpanel'
            }
        ];
        this.callParent(arguments);
    }
});
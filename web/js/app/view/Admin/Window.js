Ext.define(CONFIG.APP_NS+'.view.Admin.Window', {
    extend: 'Ext.window.Window',
    alias:  'widget.adminWindow',

    layout: 'fit',
    floatable: true,
    modal: true,

    height: 500,
    width: 600,
    title: 'Administravimas / Nustatymai',

    requires: [
        CONFIG.APP_NS+'.view.Admin.TabPanel'
    ],

    initComponent: function() {
        this.items = [
            {
                xtype: 'admintabpanel'
            }
        ];
        this.callParent(arguments);
    }
});
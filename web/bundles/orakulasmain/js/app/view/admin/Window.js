Ext.define(CONFIG.APP_NS+'.view.admin.Window', {
    extend: 'Ext.window.Window',
    alias:  'widget.adminWindow',

    layout: 'border',
    floatable: true,
    modal: true,

    height: 500,
    width: 600,
    title: 'Administruoti',

    requires: [
        CONFIG.APP_NS+'.view.admin.TabPanel'
    ],

    initComponent: function() {
        this.items = [
            {
                region: 'center',
                xtype: 'admintabpanel'
            }
        ];
        this.callParent(arguments);
    }
});
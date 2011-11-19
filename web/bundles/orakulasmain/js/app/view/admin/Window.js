Ext.define(CONFIG.APP_NS+'.view.admin.Window', {
    extend: 'Ext.window.Window',
    alias:  'widget.adminWindow',

    layout: 'border',
    floatable: true,
    modal: true,

    height: 250,
    width: 500,
    title: 'Administruoti',

    initComponent: function() {
        this.items = [{
            region: 'center',
            xtype: 'panel',
            border: false,
        }];
        this.callParent(arguments);
    }
});
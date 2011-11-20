Ext.define(CONFIG.APP_NS+'.view.Export.Window', {
    extend: 'Ext.window.Window',
    alias: 'widget.exportwindow',

    layout: 'fit',
    floatable: true,
    modal: true,

    height: 250,
    width: 500,
    title: 'Eksportuoti',

    initComponent: function () {

        this.items = {
            xtype: 'exportcontrols',
            border: false
        }

        this.callParent(arguments);
    }
})
Ext.define(CONFIG.APP_NS+'.view.Export.Window', {
    extend: 'Ext.window.Window',
    alias: 'widget.exportwindow',

    layout: 'fit',
    floatable: true,
    modal: true,

    height: 212,
    width: 500,

    panels: null,

    initComponent: function () {

        this.title = LANG.EXPORT.TITLE;

        this.items = {
            xtype: 'exportcontrols',
            panels: this.panels,
            border: false,

            // form config
            url: 'excel/export'
        }

        this.callParent(arguments);
    }
})
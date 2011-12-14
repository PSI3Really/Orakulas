Ext.define(CONFIG.APP_NS+'.view.Import.Window', {
    extend: 'Ext.window.Window',
    alias: 'widget.importwindow',

    requires: [
        CONFIG.APP_NS+'.view.Import.Toolbar'
    ],

    layout: 'border',
    floatable: true,
    modal: true,

    height: 400,
    width: 500,

    initComponent: function () {

        this.title = LANG.IMPORT.TITLE;

        this.items = [{
            region: 'center',
            xtype: 'importgrid',
            border: false
        },{
            region: 'south',
            border: false,
            xtype: 'importtoolbar'
        }];

        this.callParent(arguments);
    }
})
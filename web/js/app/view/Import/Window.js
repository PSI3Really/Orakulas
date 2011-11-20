Ext.define(CONFIG.APP_NS+'.view.Import.Window', {
    extend: 'Ext.window.Window',
    alias: 'widget.importwindow',

    requires: [
        CONFIG.APP_NS+'.view.Import.Toolbar'
    ],

    layout: 'border',
    floatable: true,
    modal: true,

    height: 250,
    width: 500,

    title: 'Įkelti duomenis', //TODO

    initComponent: function () {

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
Ext.define(CONFIG.APP_NS+'.view.Predict.Window', {
    extend: 'Ext.window.Window',
    alias: 'widget.predictwindow',

    requires: [
        CONFIG.APP_NS+'.view.Predict.Toolbar'
    ],
    //*/

    layout: 'border',
    floatable: true,
    modal: true,

    height: 250,
    width: 500,

    initComponent: function () {

        this.title = LANG.PREDICT.TITLE;

        this.items = [{
            region: 'center',
            xtype: 'panel',
            border: false,
            html: '<h1>NEED A GRID HERE</h1>' //TODO
        },{
            region: 'south',
            border: false,
            xtype: 'predicttoolbar'
        }];

        this.callParent(arguments);
    }
})
Ext.define(CONFIG.APP_NS+'.view.Predict.Window', {
    extend: 'Ext.window.Window',
    alias: 'widget.predictwindow',

    requires: [
        CONFIG.APP_NS+'.view.Predict.Toolbar'
    ],

    layout: 'border',
    floatable: true,
    modal: true,

    height: 400,
    width: 500,

    infoSysDepartmentsStore: null,
    supportDepartmentsStore: null,

    initComponent: function () {

        this.title = LANG.PREDICT.TITLE;

        this.items = [{
            region: 'center',
            xtype: 'predictgrid',
            border: false
        },{
            region: 'south',
            border: false,
            xtype: 'predicttoolbar'
        }];

        this.callParent(arguments);
    }
})
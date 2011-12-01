Ext.define(CONFIG.APP_NS+'.view.Main.SubToolbar', {
    extend: 'Ext.toolbar.Toolbar',
    alias: 'widget.subtoolbar',

    requires: [
        CONFIG.APP_NS+'.view.Predict.Window'
    ],

    initComponent: function () {
        this.height = 30,
        this.items = [
            {
                text: LANG.MAIN.SUB_TOOLBAR.BUTTON.PREDICT,
                iconCls: 'icon-chart-up',
                action: 'predict'
            },
            {
                text: LANG.MAIN.SUB_TOOLBAR.BUTTON.ANALYZE,
                iconCls: 'icon-light-bulb',
                action: 'analyze'
            },
            {
                text: LANG.MAIN.SUB_TOOLBAR.BUTTON.EXPORT,
                iconCls: 'icon-table-export',
                action: 'export'
            },
            '->',
            {
                xtype: 'splitbutton',
                iconCls: 'icon-application-plus',
                tooltip: LANG.MAIN.SUB_TOOLBAR.TOOLTIP.NEW_PORTLET,
                handler: function () {
                    this.showMenu();
                },
                menu: { //TODO: does not point upwards to the parent tab for some reason, might need to change to 2 buttons
                    items: [
                        {
                            text: LANG.MAIN.SUB_TOOLBAR.BUTTON.TABLE,
                            iconCls: 'icon-table',
                            action: 'addTable'
                        },
                        {
                            text: LANG.MAIN.SUB_TOOLBAR.BUTTON.GRAPH,
                            iconCls: 'icon-chart',
                            action: 'addChart'
                        }
                    ]
                }
            }
        ];

        this.callParent();
    }
});
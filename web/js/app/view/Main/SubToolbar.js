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
                text: 'Prognozuoti&hellip;',
                iconCls: 'icon-chart-up',
                action: 'predict'
            },
            {
                text: 'Analizuoti&hellip;',
                iconCls: 'icon-light-bulb',
                action: 'analyze'
            },
            {
                text: 'Eksportuoti&hellip;',
                iconCls: 'icon-table-export',
                action: 'export'
            },
            '->',
            {
                xtype: 'splitbutton',
                iconCls: 'icon-application-plus',
                tooltip: 'Naujas vaizdas',
                handler: function () {
                    this.showMenu();
                },
                menu: { //TODO: does not point upwards to the parent tab for some reason, might need to change to 2 buttons
                    items: [
                        {
                            text: 'Lentelė',
                            iconCls: 'icon-table',
                            action: 'addTable'
                        },
                        {
                            text: 'Grafikas',
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
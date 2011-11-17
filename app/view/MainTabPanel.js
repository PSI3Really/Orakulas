Ext.define(CONFIG.APP_NS+'.view.MainTabPanel', {
    extend: 'Ext.tab.Panel',
    alias: 'widget.maintabpanel',

    requires: [
        CONFIG.APP_NS+'.view.Predict.Window'
    ],

    initComponent: function() {
        this.items = [
            {
                title: 'Istoriniai duomenys',
                layout: 'border',
                items: [
                    {
                        region: 'north',
                        xtype: 'toolbar',
                        height: 28,
                        items: [
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
                                menu: new Ext.menu.Menu({
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
                                })
                            }
                        ]
                    },
                    {
                        region: 'center',
                        border: false
                    }
                ]
            },
            {
                title: 'Ataskaita #1',
                closable: true,
                autoScroll: true,
                html: '<p>Turinys: Ataskaita #1</p>'
            },
            {
                title: 'Ataskaita #2',
                closable: true,
                autoScroll: true,
                html: '<p>Turinys: Ataskaita #2</p>'
            }
        ]
        
        this.callParent();
    }
});
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
                layout: 'fit',
                dockedItems: [
                    {
                        xtype: 'toolbar',
                        height: 30,
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
                        ]
                    }
                ],
                items: [
                    {
                        border: false,
                        html: 'Hi'
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
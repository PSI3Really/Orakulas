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
                                handler: function () {
                                    var wnd = Ext.create('widget.predict.window', {});

                                    wnd.show();
                                }
                            },
                            {
                                text: 'Analizuoti&hellip;',
                                iconCls: 'icon-light-bulb',
                                handler: function () {
                                    alert('TODO: Analizavimo langas');
                                }
                            },
                            {
                                text: 'Eksportuoti&hellip;',
                                iconCls: 'icon-table-export',
                                handler: function () {
                                    var wnd = Ext.create('widget.export.window', {});

                                    wnd.show();
                                }
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
                                            handler: function () {
                                                alert('TODO: Naujas lentelės vaizdas');
                                            }
                                        },
                                        {
                                            text: 'Grafikas',
                                            iconCls: 'icon-chart',
                                            handler: function () {
                                                alert('TODO: Naujas grafiko vaizdas');
                                            }
                                        }
                                    ]
                                })
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
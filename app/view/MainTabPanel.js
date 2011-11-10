Ext.define(CONFIG.APP_NS+'.view.MainTabPanel', {
    extend: 'Ext.tab.Panel',
    alias: 'widget.maintabpanel',
    
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
                                handler: function () {
                                    alert('TODO: Prognozavimo langas');
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
                                    alert('TODO: Eksportavimo langas');
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
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
                        height: 30,
                        items: [
                            {
                                text: 'Prognozuoti&hellip;',
                                iconCls: 'icon-chart-up'
                            },
                            {
                                text: 'Analizuoti&hellip;',
                                iconCls: 'icon-light-bulb'
                            },
                            {
                                text: 'Eksportuoti&hellip;',
                                iconCls: 'icon-table-export'
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
                                                alert('TODO: Nauja lentelės vaizdas');
                                            }
                                        },
                                        {
                                            text: 'Grafikas',
                                            iconCls: 'icon-chart',
                                            handler: function () {
                                                alert('TODO: Nauja grafiko vaizdas');
                                            }
                                        }
                                    ]
                                })
                            }
                        ]
                    },
                    {
                        region: 'center'
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
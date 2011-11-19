Ext.define(CONFIG.APP_NS+'.view.Main.TabPanel', {
    extend: 'Ext.tab.Panel',
    alias: 'widget.maintabpanel',

    requires: [
        CONFIG.APP_NS+'.view.Main.SubToolbar'
    ],

    initComponent: function() {
        this.items = [
            {
                title: 'Istoriniai duomenys',
                dockedItems: [
                    {
                        xtype: 'subtoolbar'
                    }
                ],
                items: [
                    {
                        border: false,
                        html: '<p>Istoriniai duomenys</p>'
                    }
                ]
            },
            {
                title: 'Ataskaita #1',
                closable: true,
                autoScroll: true,
                dockedItems: [
                    {
                        xtype: 'subtoolbar'
                    }
                ],
                items: [
                    {
                        border: false,
                        html: '<p>Turinys: Ataskaita #1</p>'
                    }
                ]
            },
            {
                title: 'Ataskaita #2',
                closable: true,
                autoScroll: true,
                dockedItems: [
                    {
                        xtype: 'subtoolbar'
                    }
                ],
                items: [
                    {
                        border: false,
                        html: '<p>Turinys: Ataskaita #2</p>'
                    }
                ]
            }
        ];
        
        this.callParent();
    }
});
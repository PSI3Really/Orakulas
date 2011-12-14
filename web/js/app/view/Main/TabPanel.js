Ext.define(CONFIG.APP_NS+'.view.Main.TabPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.maintabpanel',

    requires: [
        CONFIG.APP_NS+'.view.Main.SubToolbar'
    ],

    initComponent: function() {
        this.items = [
            {
                //title: 'Istoriniai duomenys',
                xtype: 'maintab'
            }/*,
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
                        xtype: 'portal'
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
                        xtype: 'portal'
                    }
                ]
            }
            //*/
        ];

        
        this.callParent();
    }
});
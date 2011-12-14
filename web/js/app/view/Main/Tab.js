Ext.define(CONFIG.APP_NS+'.view.Main.Tab', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.maintab',

    requires: [
        CONFIG.APP_NS+'.view.Main.SubToolbar'
    ],

    //autoScroll: true,

    initComponent: function(){

        this.dockedItems = [
            {
                xtype: 'subtoolbar'
            }
        ],
        this.items = [
            {
                border: false,
                xtype: 'portal'
            }
        ]

        this.callParent(arguments);
    }
})
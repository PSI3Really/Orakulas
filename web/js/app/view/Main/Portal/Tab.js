Ext.define(CONFIG.APP_NS+'.view.Main.Portal.Tab', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.maintab',

    requires: [
        CONFIG.APP_NS+'.view.Main.Portal.SubToolbar'
    ],


    border: false,
    //autoScroll: true,

    initComponent: function(){

        this.dockedItems = [
            {
                xtype: 'subtoolbar',
                border: false
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
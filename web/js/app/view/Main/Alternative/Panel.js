Ext.define(CONFIG.APP_NS+'.view.Main.Alternative.Panel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.alternativetab',

    requires: [
        CONFIG.APP_NS+'.view.Main.Portal.SubToolbar'
    ],


    border: false,
    autoScroll: true,
    layout: 'accordion',

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
                xtype: 'gridportlet',
                title: LANG.MAIN.PORTAL.TABLE.TITLE,
                frame: true,
                closable: false,
                collapsible: false,
                animCollapse: false,
                draggable: false,
                store: {
                    fields: [],
                    data: []
                }
            },{
                border: false,
                xtype: 'chartportlet',
                title: LANG.MAIN.PORTAL.CHART.TITLE,
                frame: true,
                closable: false,
                collapsible: false,
                animCollapse: false,
                draggable: false,
                store: {
                    fields: [],
                    data: []
                }
            },{
                border: false,
                xtype: 'infoportlet',
                title: LANG.MAIN.PORTAL.INFO.TITLE,
                frame: true,
                closable: false,
                collapsible: false,
                animCollapse: false,
                draggable: false,
                store: {
                    fields: [],
                    data: []
                }
            }
        ]

        this.callParent(arguments);
    }
})
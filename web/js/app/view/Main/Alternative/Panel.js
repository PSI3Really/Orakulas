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
                //xtype: 'panel',
                title: LANG.MAIN.PORTAL.TABLE.TITLE,
                frame: true,
                closable: false,
                collapsible: false,
                animCollapse: false,
                draggable: false,
                cls: null,
                store: {
                    fields: [],
                    data: []
                }
            },{
                border: false,
                xtype: 'chartportlet',
                //xtype: 'panel',
                title: LANG.MAIN.PORTAL.CHART.TITLE,
                frame: true,
                closable: false,
                collapsible: false,
                animCollapse: false,
                draggable: false,
                cls: null,
                store: {
                    fields: [],
                    data: []
                }
            },{
                border: false,
                xtype: 'infoportlet',
                //xtype: 'panel',
                title: LANG.MAIN.PORTAL.INFO.TITLE,
                frame: true,
                closable: false,
                collapsible: false,
                animCollapse: false,
                draggable: false,
                cls: null,
                store: {
                    fields: [],
                    data: []
                }
            }
        ]

        this.callParent(arguments);
    }
})
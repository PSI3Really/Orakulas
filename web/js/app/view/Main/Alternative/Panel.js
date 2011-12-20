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
        var me = this;

        this.dockedItems = [
            {
                xtype: 'subtoolbar',
                border: false
            }
        ];
        this.items = [
            {
                border: false,
                xtype: 'gridportlet',
                title: LANG.MAIN.PORTAL.TABLE.TITLE,
                frame: false,
                closable: false,
                collapsible: false,
                animCollapse: false,
                draggable: false,
                cls: null,
                store: {
                    fields: [],
                    data: []
                },
                listeners: {
                    afterrender: function () {
                        me.addPlaceholder(this, 29);
                    }
                }
            },{
                border: false,
                xtype: 'chartportlet',
                title: LANG.MAIN.PORTAL.CHART.TITLE,
                frame: false,
                closable: false,
                collapsible: false,
                animCollapse: false,
                draggable: false,
                cls: null,
                store: {
                    fields: [],
                    data: []
                },
                listeners: {
                    afterrender: function () {
                        me.addPlaceholder(this);
                    }
                }
            },{
                border: false,
                xtype: 'infoportlet',
                title: LANG.MAIN.PORTAL.INFO.TITLE,
                frame: false,
                closable: false,
                collapsible: false,
                animCollapse: false,
                draggable: false,
                cls: null,
                store: {
                    fields: [],
                    data: []
                },
                listeners: {
                    afterrender: function () {
                        me.addPlaceholder(this);
                    }
                }
            }
        ]

        this.callParent(arguments);
    },

    addPlaceholder: function (portlet, top) {
        var $body        = $('#'+portlet.getId()+' > .x-panel-body');
        $body.append('<div class="or-placeholder">~~Norėdami pradėti, pasirinkite ataskaitos tipą</div>');

        var $placeholder = $body.children('.or-placeholder');
        if (top !== undefined) {
            $placeholder.css('top', top);
        }
    }
})
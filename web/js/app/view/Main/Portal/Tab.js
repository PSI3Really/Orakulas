Ext.define(CONFIG.APP_NS+'.view.Main.Portal.Tab', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.maintab',

    requires: [
        CONFIG.APP_NS+'.view.Main.Portal.SubToolbar'
    ],

    //autoScroll: true,

    initComponent: function() {
        this.dockedItems = [
            {
                xtype: 'subtoolbar'
            }
        ];
        this.items = [
            {
                xtype: 'portal',
                _alternative: (this._alternative !== undefined) ? this._alternative : false
            }
        ];

        this.callParent(arguments);
    }
})
Ext.define(CONFIG.APP_NS+'.view.Viewport', {
    extend: 'Ext.container.Viewport',
    layout: {
        type: 'border'
    },
    
    requires: [
        CONFIG.APP_NS+'.view.MainToolbar',
        CONFIG.APP_NS+'.view.MainTabPanel'
    ],
    
    initComponent: function() {
        this.dockedItems = [
            {
                xtype: 'maintoolbar'
            }
        ],
        this.items = [
            {
                region: 'center',
                xtype: 'maintabpanel'
            }
        ];
        
        this.callParent();
    }
});
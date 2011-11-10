Ext.define(CONFIG.APP_NS+'.view.Viewport', {
    extend: 'Ext.container.Viewport',
    layout: {
        type: 'border',
        padding: '0 5 5 5'
    },
    
    requires: [
        CONFIG.APP_NS+'.view.MainToolbar',
        CONFIG.APP_NS+'.view.MainTabPanel'
    ],
    
    initComponent: function() {
        this.items = [
            {
                region: 'north',
                xtype: 'maintoolbar',
                height: 30
            },
            {
                region: 'center',
                xtype: 'maintabpanel'
            }
        ];
        
        this.callParent();
    }
});
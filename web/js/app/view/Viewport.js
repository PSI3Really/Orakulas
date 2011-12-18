Ext.define(CONFIG.APP_NS+'.view.Viewport', {
    extend: 'Ext.container.Viewport',
    layout: {
        type: 'border',
        padding: '0 5 5 5'
    },
    
    requires: [
        CONFIG.APP_NS+'.view.Main.Toolbar',
        CONFIG.APP_NS+'.view.Main.TabPanel'
    ],
    
    initComponent: function() {
        this.items = [
            {
                region: 'north',
                xtype: 'maintoolbar'
            },
            {
                region: 'center',
                xtype: 'maintabpanel'
            }
        ];
        
        this.callParent();
    },

    listeners: {
        beforerender: function () {
            $('#loading').fadeOut({ remove: true });
        }
    }
});
Ext.require('Ext.container.Viewport');

Ext.application({
    name: CONFIG.APP_NS,
    
    appFolder: 'app',
    
    controllers: [],
    
    launch: function() {
        Ext.create('Ext.container.Viewport', {
            layout: 'fit',
            items: [
                {
                    title: CONFIG.APP_NAME,
                    html : 'Hi there! Welcome to '+CONFIG.APP_NAME+'!'
                }
            ]
        });
    }
});
Ext.require(['Ext.container.Viewport']);

Ext.application({
    name: CONFIG.APP_NS,
    appFolder: 'app',
    autoCreateViewport: true,
    
    controllers: [
        'Main',
        'Tab',
        'Import',
        'Export',
        'Predict'
    ]
});
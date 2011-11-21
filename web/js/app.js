Ext.require(['Ext.container.Viewport']);

Ext.application({
    name: CONFIG.APP_NS,
    appFolder: '../js/app',
    autoCreateViewport: true,

    paths: {
        'Ext.ux': '../js/ux'
    },

    models: [
        'User'
    ],

    stores: [
        'Users'
    ],
    //*/

    controllers: [
        'Main',
        'Tab',
        'Import',
        'Export',
        'Predict',
        'Admin'
    ]

});

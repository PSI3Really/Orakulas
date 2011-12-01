Ext.require(['Ext.container.Viewport']);

Ext.application({
    name: CONFIG.APP_NS,
    appFolder: '../js/app',
    autoCreateViewport: true,

    paths: {
        'Ext.ux': '../js/ux'
    },

    models: [
        'Admin.User',
        'Admin.Department',
        'Admin.InformationalSystem',
        'Admin.DepartmentInfoSysUsage',
        'Report'
    ],

    stores: [
        'Admin.Users',
        'Admin.Departments',
        'Admin.InformationalSystems',
        'Admin.DepartmentInfoSysUsages'
    ],
    //*/

    controllers: [
        'Main',
        'Tab',
        'Import',
        'Export',
        'Predict',
        'Admin.Users',
        'Admin.Departments',
        'Admin.InformationalSystems',
        'Admin.SupportTypes',
        'Admin',
        'Admin.PersonalSettings'
    ]

});

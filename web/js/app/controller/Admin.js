Ext.define(CONFIG.APP_NS+'.controller.Admin', {
    extend: 'Ext.app.Controller',

    models: [
        'Admin.User',
        'Admin.Department',
        'Admin.InformationalSystem',
        'Admin.DepartmentInfoSysUsage',
        'Admin.SupportAdministrationTime',
        'Admin.SupportType',
        //'Admin.SupportHistory', //TODO
        'Admin.SupportCategory'
    ],

    stores: [
        'Admin.Users',
        'Admin.Departments',
        'Admin.InformationalSystems',
        'Admin.DepartmentInfoSysUsages',
        'Admin.SupportAdministrationTimes',
        'Admin.SupportTypes',
        //'Admin.SupportHistories', //TODO
        'Admin.SupportCategories'
    ],
    
    views: ['Admin.Window', 'Admin.TabPanel', 'Admin.Users.UsersGrid']
});
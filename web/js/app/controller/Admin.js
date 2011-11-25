Ext.define(CONFIG.APP_NS+'.controller.Admin', {
    extend: 'Ext.app.Controller',

    models: [
        'Admin.DepartmentInfoSysUsage',
        'Admin.SupportAdministrationTime',
        //'Admin.SupportHistory', //TODO
        'Admin.SupportCategory'
    ],

    stores: [
        'Admin.DepartmentInfoSysUsages',
        'Admin.SupportAdministrationTimes',
        //'Admin.SupportHistories', //TODO
        'Admin.SupportCategories'
    ],
    
    views: ['Admin.Window', 'Admin.TabPanel']
});
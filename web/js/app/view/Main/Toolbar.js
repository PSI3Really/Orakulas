Ext.define(CONFIG.APP_NS+'.view.Main.Toolbar', {
    extend: 'Ext.toolbar.Toolbar',
    alias: 'widget.maintoolbar',

    requires: [
        CONFIG.APP_NS+'.view.Import.Window',
        CONFIG.APP_NS+'.view.Export.Window',
        CONFIG.APP_NS+'.view.Admin.Window',
        CONFIG.APP_NS+'.view.Admin.PersonalSettings.Window'
    ],

    initComponent: function () {

        this.id = 'toolbar';
        this.height = 30;
        this.items = [
            {
                id: 'logo',
                xtype: 'box',
                html: '<h1>'+CONFIG.APP_NAME+'</h1>'
            },
            /*{
                xtype: 'buttongroup',
                items: [
                    {
                        pressed: LANG_CODE === 'lt',
                        lang: 'lt',
                        iconCls: 'icon-flag-lt',
                        tooltip: LANG.MAIN.TOOLBAR.TOOLTIP.LANG_LT,
                        action: 'switchLang'
                    },
                    {
                        pressed: LANG_CODE === 'en',
                        lang: 'en',
                        iconCls: 'icon-flag-gb',
                        tooltip: LANG.MAIN.TOOLBAR.TOOLTIP.LANG_EN,
                        action: 'switchLang'
                    }
                ]
            },*/
            '->',
            {
                text: LANG.MAIN.TOOLBAR.BUTTON.IMPORT_DATA,
                iconCls: 'icon-arrow-270',
                action: 'importData',
                hidden: CURRENT_USER.data.admin ? false : true
            },
            ' ',
            {
                text: LANG.MAIN.TOOLBAR.BUTTON.ADMIN,
                iconCls: 'icon-building',
                action: 'admin',
                hidden: CURRENT_USER.data.admin ? false : true
            },
            {
                text: CURRENT_USER.data.firstName + ' ' + CURRENT_USER.data.lastName + ' (' + CURRENT_USER.data.username + ')',
                iconCls: CURRENT_USER.data.admin ? 'icon-user-admin' : 'icon-user', 
                action: 'adminpersonalsettings'
            },
            {
                iconCls: 'icon-door-open-out',
                tooltip: LANG.MAIN.TOOLBAR.TOOLTIP.LOGOUT,
                action: 'logout'
            }
        ];
        
        this.callParent();
    }
});
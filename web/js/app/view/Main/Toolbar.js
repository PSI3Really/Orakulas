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
            },{
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
            },
            '->',
            {
                xtype: 'splitbutton',
                text: LANG.MAIN.TOOLBAR.BUTTON.NEW_REPORT,
                iconCls: 'icon-tab-plus',
                handler: function () {
                    this.showMenu();
                },
                menu: new Ext.menu.Menu({
                    items: [
                        {
                            text: LANG.MAIN.TOOLBAR.BUTTON.CLONE_TAB,
                            iconCls: 'icon-document-copy',
                            action: 'cloneTab'
                        },
                        {
                            text: LANG.MAIN.TOOLBAR.BUTTON.IMPORT_REPORT,
                            iconCls: 'icon-folder-open',
                            action: 'importReport'
                        }
                    ]
                })
            },
            {
                text: LANG.MAIN.TOOLBAR.BUTTON.IMPORT_DATA,
                iconCls: 'icon-arrow-270',
                action: 'importData'
            },
            ' ',
            {
                text: LANG.MAIN.TOOLBAR.BUTTON.ADMIN,
                iconCls: 'icon-building',
                action: 'admin'
            },
            {
                text: 'Vardenis Pavardenis (dev)',
                iconCls: 'icon-user-admin', // TODO: icon-user or icon-user-admin based on current user role
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
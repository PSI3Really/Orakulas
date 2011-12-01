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
                        pressed: true,
                        lang: 'lt',
                        iconCls: 'icon-flag-lt',
                        tooltip: 'Perjungti kalbą į lietuvių',
                        action: 'switchLang'
                    },
                    {
                        lang: 'en',
                        iconCls: 'icon-flag-gb',
                        tooltip: 'Perjungti kalbą į anglų',
                        action: 'switchLang'
                    }
                ]
            },
            '->',
            {
                xtype: 'splitbutton',
                text: 'Nauja ataskaita&hellip;',
                iconCls: 'icon-tab-plus',
                handler: function () {
                    this.showMenu();
                },
                menu: new Ext.menu.Menu({
                    items: [
                        {
                            text: 'Klonuoti atidarytą kortelę',
                            iconCls: 'icon-document-copy',
                            action: 'cloneTab'
                        },
                        {
                            text: 'Įkelti iš failo&hellip;',
                            iconCls: 'icon-folder-open',
                            action: 'importReport'
                        }
                    ]
                })
            },
            {
                text: 'Įkelti istorinius duomenis&hellip;',
                iconCls: 'icon-arrow-270',
                action: 'importData'
            },
            ' ',
            {
                text: 'Administravimas',
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
                tooltip: 'Atsijungti',
                action: 'logout'
            }
        ];
        
        this.callParent();
    }
});
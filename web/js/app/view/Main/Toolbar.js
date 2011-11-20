Ext.define(CONFIG.APP_NS+'.view.Main.Toolbar', {
    extend: 'Ext.toolbar.Toolbar',
    alias: 'widget.maintoolbar',

    requires: [
        CONFIG.APP_NS+'.view.Import.Window',
        CONFIG.APP_NS+'.view.Export.Window',
        CONFIG.APP_NS+'.view.Admin.Window'
    ],

    initComponent: function () {
        this.id = 'toolbar',
        this.height = 30,
        this.items = [
            {
                id: 'logo',
                xtype: 'box',
                html: '<h1>'+CONFIG.APP_NAME+'</h1>'
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
            {
                iconCls: 'icon-gear',
                tooltip: 'Administravimas / Nustatymai',
                action: 'admin'
            },
            {
                pressed: true,
                lang: 'LT',
                iconCls: 'icon-flag-lt',
                tooltip: 'Perjungti kalbą į lietuvių',
                action: 'switchLang'
                /*
                handler: function () {
                    if (!this.pressed) {
                        alert('TODO: Perjungti kalbą į lietuvių');
                    }
                }
                */
            },
            {
                lang: 'EN',
                iconCls: 'icon-flag-gb',
                tooltip: 'Perjungti kalbą į anglų',
                action: 'switchLang'
                /*
                handler: function () {
                    if (!this.pressed) {
                        alert('TODO: Perjungti kalbą į anglų');
                    }
                }
                //*/
            }
        ];
        
        this.callParent();
    }
});
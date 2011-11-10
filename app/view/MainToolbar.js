Ext.define(CONFIG.APP_NS+'.view.MainToolbar', {
    extend: 'Ext.toolbar.Toolbar',
    alias: 'widget.maintoolbar',

    id: 'toolbar',
    
    initComponent: function () {
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
                            handler: function () {
                                alert('TODO: Nauja kortelė');
                            }
                        },
                        {
                            text: 'Įkelti iš failo&hellip;',
                            iconCls: 'icon-folder-open',
                            handler: function () {
                                alert('TODO: Įkėlimo iš failo dialogas');
                            }
                        }
                    ]
                })
            },
            {
                text: 'Įkelti istorinius duomenis&hellip;',
                iconCls: 'icon-arrow-270',
                handler: function () {
                    alert('TODO: Istorinių duomenų įkėlimo dialogas');
                }
            },
            '-',
            {
                iconCls: 'icon-gear',
                tooltip: 'Administravimas / Nustatymai',
                handler: function () {
                    alert('TODO: Administravimo / Nustatymų langas');
                }
            },
            {
                type: 'splitbutton',
                pressed: true,
                iconCls: 'icon-flag-lt',
                tooltip: 'Perjungti kalbą į lietuvių',
                toggleGroup: 'languages',
                enableToggle: true,
                handler: function () {
                    if (!this.pressed) {
                        alert('TODO: Perjungti kalbą į lietuvių');
                    }
                }
            },
            {
                type: 'splitbutton',
                iconCls: 'icon-flag-gb',
                tooltip: 'Perjungti kalbą į anglų',
                toggleGroup: 'languages',
                enableToggle: true,
                handler: function () {
                    if (!this.pressed) {
                        alert('TODO: Perjungti kalbą į anglų');
                    }
                }
            }
        ]
        
        
        this.callParent();
    }
});
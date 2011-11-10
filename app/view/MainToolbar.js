Ext.define(CONFIG.APP_NS+'.view.MainToolbar', {
    extend: 'Ext.toolbar.Toolbar',
    alias: 'widget.maintoolbar',
    
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
                                alert('TODO: Dialogas įkėlimui iš failo');
                            }
                        }
                    ]
                })
            },
            {
                text: 'Įkelti istorinius duomenis&hellip;',
                iconCls: 'icon-arrow-270',
                handler: function () {
                    alert('TODO: Dialogas istorinių duomenų įkėlimui');
                }
            },
            {
                iconCls: 'icon-gear',
                tooltip: 'Administravimas / Nustatymai',
                handler: function () {
                    alert('TODO: Administravimo / Nustatymų langas');
                }
            },
            {
                pressed: true,
                iconCls: 'icon-flag-lt',
                tooltip: 'Perjungti kalbą į lietuvių',
                handler: function () {
                    if (!this.pressed) {
                        alert('TODO: Perjungti kalbą į lietuvių');
                    }
                }
            },
            {
                iconCls: 'icon-flag-gb',
                tooltip: 'Perjungti kalbą į anglų',
                handler: function () {
                    alert('TODO: Perjungti kalbą į anglų');
                }
            }
        ]
        
        
        this.callParent();
    }
});
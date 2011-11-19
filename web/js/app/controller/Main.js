Ext.define(CONFIG.APP_NS+'.controller.Main', {
    extend: 'Ext.app.Controller',

    views: ['Main.Toolbar'],

    init: function(){
        this.control({
            'maintoolbar > button[action=importData]': {
                click: this.importData
            },
            'maintoolbar menuitem[action=cloneTab]': {
                click: this.cloneTab
            },
            'maintoolbar menuitem[action=importReport]': {
                click: this.importReport
            },
            'maintoolbar > button[action=admin]': {
                click: this.admin
            },
            'maintoolbar > button[action=switchLang]': {
                click: this.switchLang
            }
        });
    },

    importData: function(){
        var wnd = Ext.create('widget.importwindow', {});

        wnd.show();
    },

    cloneTab: function(){
        alert('TODO: Nauja kortelė');
    },

    importReport: function(){
        alert('TODO: Dialogas įkėlimui iš failo');
    },

    admin: function(){
        //alert('TODO: Administravimo / Nustatymų langas');
        Ext.create('widget.adminWindow', {}).show();
    },

    switchLang: function(btn){
        if (!btn.pressed){
            alert('TODO: change language to ' + btn.lang);
        }
    }
});
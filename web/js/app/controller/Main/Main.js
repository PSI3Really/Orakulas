Ext.define(CONFIG.APP_NS+'.controller.Main.Main', {
    extend: 'Ext.app.Controller',

    views: ['Main.Toolbar'],

    init: function(){
        this.control({
            'maintoolbar > button[action=logout]': {
                click: this.logout
            },
            'maintoolbar > button[action=importData]': {
                click: this.importData
            },
            'maintoolbar button[action=admin]': {
                click: this.admin
            },
            'maintoolbar button[action=switchLang]': {
                click: this.switchLang
            },
            'maintoolbar button[action=adminpersonalsettings]': {
                click: this.adminpersonalsettings
            }
        });
    },

    logout: function(){
        Ext.MessageBox.confirm(LANG.MAIN.TOOLBAR.LOGOUT_TITLE, LANG.MAIN.TOOLBAR.LOGOUT_BODY, function (btn) {
            if (btn == 'yes') {
                window.location.href = window.location.href.substr(0, window.location.href.lastIndexOf('/'))+'/logout';
            }
        });
    },

    importData: function(){
        var wnd = Ext.create('widget.importwindow', {});

        wnd.show();
    },

    admin: function(){
        Ext.create('widget.adminWindow', {}).show();
    },

    adminpersonalsettings: function () {
        Ext.create('widget.adminpersonalsettingswindow', {}).show();
    },

    switchLang: function(btn){
        if (!btn.pressed){
            window.location.search = Ext.urlEncode({"lang":btn.lang});
        }
    }
});
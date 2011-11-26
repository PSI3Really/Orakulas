Ext.define(CONFIG.APP_NS+'.controller.Main', {
    extend: 'Ext.app.Controller',

    views: ['Main.Toolbar'],
    
    //models: ['User'],
    //stores: ['Users'],

    //requires: [CONFIG.APP_NS+'.model.User'],

    init: function(){
        this.control({
            'maintoolbar > button[action=logout]': {
                click: this.logout
            },
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
            'maintoolbar button[action=switchLang]': {
                click: this.switchLang
            }
        });
    },

    logout: function(){
        Ext.MessageBox.confirm('Patvirtinimas', 'Ar tikrai norite atsijungti nuo sistemos?', function (btn) {
            if (btn == 'yes') {
                var loc = window.location.href.split('?');
                window.location.href = loc+'logout';
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
            var url = Ext.util.Format.format('../js/extjs/locale/ext-lang-{0}.js', btn.lang);

            Ext.Ajax.request({ //check if locale file exists
                url: url,
                success: function(response){ //change the language

                    //make only the clicked button active
                    var buttons = btn.up('buttongroup');
                    for (var idx = 0; idx < buttons.items.getCount(); idx++){ //
                        buttons.items.getAt(idx).toggle(false);
                    }
                    btn.toggle(true);

                    //TODO: 
                    eval(response.responseText);
                },
                failure: function(){
                    Ext.Msg.alert('Failure', 'Failed to load locale file.');
                },
                scope: this
            });
        }
    }
});
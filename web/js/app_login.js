//TODO: ext-lang doesnt really localize for some reason

Ext.require(['Ext.container.Viewport']);

var LANG = null;
var LANG_CODE = 'lt';

var login = function (form) {
    if (form.isValid()) {
        form.submit({
            success: function(form, action) {
                window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/'))+'/redirect/'+LANG_CODE;
            },
            failure: function(form, action) {
                Ext.Msg.alert(LANG.LOGIN.INVALID_CREDENTIALS_TITLE, LANG.LOGIN.INVALID_CREDENTIALS_BODY);
                Ext.getCmp('loginButton').toggle(false);
            }
        });
    } else {
        Ext.Msg.alert(LANG.LOGIN.INVALID_FORM_TITLE, LANG.LOGIN.INVALID_FORM_BODY);
    }

}

Ext.application({
    name: CONFIG.APP_NS,
    appFolder: '../js/app_login',

    launch: function () {
        var params = Ext.urlDecode(window.location.search.substring(1));

        var lang = params.lang ? params.lang : CONFIG.DEFAULT_LANG;

        var urlExt = Ext.util.Format.format('../js/locale/ext-lang-{0}.js', lang);
        var urlApp = Ext.util.Format.format('../js/locale/{0}-lang-{1}.json', CONFIG.APP_NS, lang);

        Ext.Ajax.request({ //ExtJS localization
            url: urlExt,
            success: function(response){ //change the language
                eval(response.responseText);
            },
            failure: function(){
                Ext.Msg.alert('Failure', 'Failed to load locale file.');
            },
            scope: this
        });

        Ext.Ajax.request({ //Orakulas localization
            url: urlApp,
            success: function(response){
                var text = response.responseText;

                LANG = Ext.JSON.decode(text, true);
                LANG_CODE = lang;

                Ext.create('Ext.window.Window', {
                    width: 300,
                    height: 124,
                    title: LANG.LOGIN.TITLE,
                    closable: false,
                    draggable: false,
                    resizable: false,
                    layout: 'fit',
                    items: {
                        xtype: 'form',
                        url: 'check_login',
                        border: false,
                        bodyPadding: 5,
                        defaults: {
                            xtype: 'textfield',
                            anchor: '100%',
                            listeners: {
                                specialkey: function (field, event) {
                                    if (event.getKey() == event.ENTER) {
                                        var btn = Ext.getCmp('loginButton');
                                        btn.toggle(true);
                                        login(field.up('form').getForm());
                                    };
                                }
                            }
                        },
                        items: [
                            {
                                fieldLabel: LANG.ENTITY.USERNAME,
                                name: '_username',
                                allowBlank: false
                            },
                            {
                                fieldLabel: LANG.ENTITY.PASSWORD,
                                name: '_password',
                                inputType:'password',
                                allowBlank: false
                            }
                        ],
                        dockedItems: [{
                            xtype: 'toolbar',
                            dock:  'bottom',
                            items: [
                                {
                                    xtype: 'buttongroup',
                                    items: [
                                        {
                                            pressed: LANG_CODE === 'lt',
                                            lang: 'lt',
                                            iconCls: 'icon-flag-lt',
                                            tooltip: LANG.MAIN.TOOLBAR.TOOLTIP.LANG_LT,
                                            handler: function (btn) {
                                                if (!btn.pressed){
                                                    LANG_CODE = 'lt';
                                                    btn.toggle(true);
                                                    btn.next().toggle(false);
                                                    window.location.search = Ext.urlEncode({"lang":btn.lang});
                                                }
                                            }
                                        },
                                        {
                                            pressed: LANG_CODE === 'en',
                                            lang: 'en',
                                            iconCls: 'icon-flag-gb',
                                            tooltip: LANG.MAIN.TOOLBAR.TOOLTIP.LANG_EN,
                                            handler: function (btn) {
                                                if (!btn.pressed){
                                                    LANG_CODE = 'en';
                                                    btn.toggle(true);
                                                    btn.prev().toggle(false);
                                                    window.location.search = Ext.urlEncode({"lang":btn.lang});
                                                }
                                            }
                                        }
                                    ]
                                },
                                '->',
                                {
                                    xtype: 'button',
                                    formBind: true,
                                    disabled: true,
                                    id: 'loginButton',
                                    text: LANG.LOGIN.LOGIN,
                                    iconCls: 'icon-key',
                                    handler: function () {
                                        login(this.up('form').getForm());
                                    }
                                }
                            ]
                        }]
                    }
                }).show();
            }
        });
    }
});
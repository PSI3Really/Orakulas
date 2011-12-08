Ext.require(['Ext.container.Viewport']);

var LANG_CODE = 'lt';

var login = function (form) {
    if (form.isValid()) {
        form.submit({
            success: function(form, action) {
                window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/'))+'/redirect/'+LANG_CODE;
            },
            failure: function(form, action) {
                Ext.Msg.alert('~~Invalid Credentials', '~~Please enter valid user credentials.');
            }
        });
    } else {
        Ext.Msg.alert('~~Invalid Form', '~~Please correct form errors.');
    }
}

Ext.application({
    name: CONFIG.APP_NS,
    appFolder: '../js/app_login',

    launch: function () {
        Ext.create('Ext.window.Window', {
            width: 300,
            height: 124,
            title: '~~Prisijungimas',//LANG.???
            closable: false,
            draggable: false,
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
                                login(field.up('form').getForm());
                            };
                        }
                    }
                },
                items: [
                    {
                        fieldLabel: '~~Vartotojas',//LANG.ENTITY.USERNAME
                        name: '_username',
                        allowBlank: false
                    },
                    {
                        fieldLabel: '~~Slaptažodis',//LANG.ENTITY.PASSWORD
                        name: '_password',
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
                                    tooltip: '~~Lietuvių',//LANG.MAIN.TOOLBAR.TOOLTIP.LANG_LT,
                                    handler: function (btn) {
                                        LANG_CODE = 'lt';
                                        btn.toggle(true);
                                        btn.next().toggle(false);
                                    }
                                },
                                {
                                    pressed: LANG_CODE === 'en',
                                    lang: 'en',
                                    iconCls: 'icon-flag-gb',
                                    tooltip: '~~Anglų',//LANG.MAIN.TOOLBAR.TOOLTIP.LANG_EN,
                                    handler: function (btn) {
                                        LANG_CODE = 'en';
                                        btn.toggle(true);
                                        btn.prev().toggle(false);
                                    }
                                }
                            ]
                        },
                        '->',
                        {
                            xtype: 'button',
                            formBind: true,
                            disabled: true,
                            text: '~~Prisijungti',//LANG.???
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
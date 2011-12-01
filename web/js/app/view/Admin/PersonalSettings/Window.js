Ext.define(CONFIG.APP_NS+'.view.Admin.PersonalSettings.Window', {
    extend: 'Ext.window.Window',
    alias:  'widget.adminpersonalsettingswindow',

    title: 'Asmeniniai nustatymai',

    requires: [
        CONFIG.APP_NS+'.view.Admin.PersonalSettings.PersonalSettingsPanel'
    ],

    initComponent: function() {
        this.layout = 'fit';
        this.floatable = true;
        this.modal = true;

        this.height = 180;
        this.width = 300;

        this.items = [
            {
                xtype: 'adminpersonalsettingspanel',
                dockedItems: [
                    {
                        xtype: 'toolbar',
                        dock:  'bottom',
                        items: [
                            '->',
                            {
                                xtype:  'button',
                                action: 'confirm',
                                text:   'Gerai'
                            },
                            {
                                xtype:  'button',
                                action: 'cancel',
                                text:   'Atšaukti'
                            }
                        ]
                    }
                ]
            }
        ];
        this.callParent(arguments);
    }
});
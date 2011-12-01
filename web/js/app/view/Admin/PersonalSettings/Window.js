Ext.define(CONFIG.APP_NS+'.view.Admin.PersonalSettings.Window', {
    extend: 'Ext.window.Window',
    alias:  'widget.adminpersonalsettingswindow',

    requires: [
        CONFIG.APP_NS+'.view.Admin.PersonalSettings.PersonalSettingsPanel'
    ],

    initComponent: function() {
        this.layout = 'fit';
        this.floatable = true;
        this.modal = true;

        this.height = 180;
        this.width = 300;

        this.title = LANG.ADMIN.PERSONAL_SETTINGS.TITLE,

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
                                iconCls: 'icon-tick',
                                xtype:  'button',
                                action: 'confirm',
                                text:   LANG.BUTTON.OK
                            },
                            {
                                iconCls: 'icon-cross',
                                xtype:  'button',
                                action: 'cancel',
                                text:   LANG.BUTTON.CANCEL
                            }
                        ]
                    }
                ]
            }
        ];
        this.callParent(arguments);
    }
});
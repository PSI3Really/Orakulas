Ext.define(CONFIG.APP_NS+'.view.Admin.PersonalSettings.PersonalSettingsPanel', {
    extend: 'Ext.form.Panel',
    alias: 'widget.adminpersonalsettingspanel',

    style: {
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: 'auto',
        marginBottom: 'auto'
    },

    initComponent: function() {
        this.height = 130;
        this.width = 280;
        this.bodyPadding= 10;
        this.defaultType = 'textfield';
        this.items = [
            {
                fieldLabel: LANG.ADMIN.PERSONAL_SETTINGS.OLD_PASS,
                name: 'oldpassword',
                inputType:'password',
                allowBlank: false
            },
            {
                fieldLabel: LANG.ADMIN.PERSONAL_SETTINGS.NEW_PASS,
                name: 'newpassword',
                inputType:'password',
                allowBlank: false
            },
            {
                xtype: 'textfield',
                fieldLabel: LANG.ADMIN.PERSONAL_SETTINGS.REPEAT_PASS,
                name: 'newpasswordagain',
                inputType:'password',
                allowBlank: false
            }
        ];
        this.callParent(arguments);
    }
});
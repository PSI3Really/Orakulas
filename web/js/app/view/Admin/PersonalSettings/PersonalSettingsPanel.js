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
        this.plain = true;
        this.border = 0;
        this.bodyPadding = 5;
        this.fieldDefaults = {
            labelWidth: 150,
            anchor: '100%'
        };
        this.layout = {
            type: 'vbox',
            align: 'stretch'
        };
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
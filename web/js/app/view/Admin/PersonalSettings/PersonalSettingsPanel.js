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
                fieldLabel: 'Senas slaptažodis',
                name: 'oldpassword',
                inputType:'password'
            },
            {
                fieldLabel: 'Naujas slaptažodis',
                name: 'newpassword',
                inputType:'password'
            },
            {
                xtype: 'textfield',
                fieldLabel: 'Pakartoti naują slaptažodį',
                name: 'newpasswordagain',
                inputType:'password'
            }
        ];
        this.callParent(arguments);
    }
});
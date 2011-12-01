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
                fieldLabel: 'Senas slaptazodis',
                name: 'firstName'
            },
            {
                fieldLabel: 'Naujas slaptazodis',
                name: 'lastName'
            },
            {
                xtype: 'textfield',
                fieldLabel: 'Pakartoti nauja slaptazodi',
                name: 'birthDate'
            }
        ];
        this.callParent(arguments);
    }
});
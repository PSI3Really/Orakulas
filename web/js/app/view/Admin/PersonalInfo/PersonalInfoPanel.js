Ext.define(CONFIG.APP_NS+'.view.PersonalInfo.PersonalInfoPanel', {
    extend: 'Ext.form.Panel',
    alias: 'widget.adminpersonalinfopanel',

    initComponent: function() {
        this.border = false;

        this.items = [
            {
            }
        ];
        this.callParent(arguments);
    }
});
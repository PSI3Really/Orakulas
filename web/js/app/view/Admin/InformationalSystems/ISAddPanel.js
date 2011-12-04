Ext.define(CONFIG.APP_NS+'.view.Admin.InformationalSystems.ISAddPanel', {
    extend: 'Ext.form.Panel',
    alias: 'widget.adminisaddpanel',

    initComponent: function() {
        this.border = false;

        this.items = [
        ];

       this.dockedItems = [
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
        ];

        this.callParent(arguments);
    }
});
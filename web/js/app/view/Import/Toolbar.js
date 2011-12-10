Ext.define(CONFIG.APP_NS+'.view.Import.Toolbar', {
    extend: 'Ext.toolbar.Toolbar',
    alias: 'widget.importtoolbar',

    border: false,

    initComponent: function() {
        this.items = [
            {
                cls: "dummy-form",
                xtype: 'form',
                items: [{
                    xtype: 'filefield', //TODO: make every button look the same
                    name: 'dataFile',
                    action: 'openFile',
                    buttonOnly: true,
                    hideLabel: true,
                    buttonText: LANG.BUTTON.OPEN_FILE,
                    buttonConfig: {
                        iconCls: 'icon-folder-open'
                    }
                }]
            },
            '->',
            {
                xtype: 'button',
                action: 'accept',
                text: LANG.BUTTON.OK
            },
            {
                xtype: 'button',
                action: 'cancel',
                text: LANG.BUTTON.CANCEL
            }
        ];

        this.callParent(arguments);
    }
})
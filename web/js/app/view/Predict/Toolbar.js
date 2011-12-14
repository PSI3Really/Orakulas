Ext.define(CONFIG.APP_NS+'.view.Predict.Toolbar', {
    extend: 'Ext.toolbar.Toolbar',
    alias: 'widget.predicttoolbar',

    border: false,

    initComponent: function(){
        this.items = [{
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
        },'-',{
            xtype: 'button',
            action: 'infoSysDepartments',
            text: LANG.PREDICT.BUTTON.INFO_SYS_AND_DEPARTMENTS
        },{
            xtype: 'button',
            action: 'supportDepartments',
            text: LANG.PREDICT.BUTTON.SUPPORT_AND_DEPARTMENTS
        },'->',{
            xtype: 'button',
            action: 'accept',
            text: LANG.BUTTON.OK
        },{
            xtype: 'button',
            action: 'cancel',
            text: LANG.BUTTON.CANCEL
        }];

        this.callParent(arguments);
    }
})
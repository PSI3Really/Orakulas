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
        },{
            xtype: 'button',
            tooltip: LANG.IMPORT.EXAMPLE.TOOLTIP,
            iconCls: 'icon-question',
            handler: function () {
                Ext.MessageBox.show({
                    title: LANG.IMPORT.EXAMPLE.TITLE,
                    msg: LANG.IMPORT.EXAMPLE.MSG,
                    icon: Ext.MessageBox.QUESTION,
                    buttons: Ext.MessageBox.YESNO,
                    fn: function (buttonId) {
                        if (buttonId == 'yes') {
                            window.open('../resources/duomenu-pavyzdys.xls');
                        }
                    }
                });
            }
        },'-',{
            xtype: 'button',
            action: 'editEntities',
            text: LANG.PREDICT.BUTTON.EDIT_ENTITIES
        },{
            iconCls: 'icon-plus-circle',
            xtype:  'button',
            action: 'add',
            text:   LANG.BUTTON.ADD
        },{
            iconCls: 'icon-minus-circle',
            xtype:  'button',
            action: 'delete',
            text:   LANG.BUTTON.REMOVE
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
Ext.define(CONFIG.APP_NS+'.view.Predict.Toolbar', {
    extend: 'Ext.toolbar.Toolbar',
    alias: 'widget.predicttoolbar',

    border: false,

    initComponent: function(){
        this.items = [{
            xtype: 'button',
            iconCls: 'icon-folder-open',
            action: 'openFile',
            text: LANG.BUTTON.OPEN_FILE
        },'-',{
            xtype: 'button',
            action: 'infoSysAndDepartments',
            text: LANG.PREDICT.BUTTON.INFO_SYS_AND_DEPARTMENTS
        },{
            xtype: 'button',
            action: 'supportAndDepartments',
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
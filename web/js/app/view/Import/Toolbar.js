Ext.define(CONFIG.APP_NS+'.view.Import.Toolbar', {
    extend: 'Ext.toolbar.Toolbar',
    alias: 'widget.importtoolbar',

    border: false,

    initComponent: function(){
        this.items = [{
            xtype: 'button',
            iconCls: 'icon-folder-open',
            action: 'openFile',
            text: LANG.BUTTON.OPEN_FILE
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
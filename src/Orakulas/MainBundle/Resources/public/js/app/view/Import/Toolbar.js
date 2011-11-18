Ext.define(CONFIG.APP_NS+'.view.Import.Toolbar', {
    extend: 'Ext.toolbar.Toolbar',
    alias: 'widget.importtoolbar',

    border: false,

    initComponent: function(){
        this.items = [{
            xtype: 'button',
            iconCls: 'icon-folder-open',
            action: 'openFile',
            text: 'Įkelti iš failo'
        },'->',{
            xtype: 'button',
            action: 'accept',
            text: 'Gerai'
        },{
            xtype: 'button',
            action: 'cancel',
            text: 'Atšaukti'
        }];

        this.callParent(arguments);
    }
})
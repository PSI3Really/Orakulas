Ext.define(CONFIG.APP_NS+'.view.Import.Toolbar', {
    extend: 'Ext.toolbar.Toolbar',
    alias: 'widget.import.toolbar',

    border: false,

    initComponent: function(){
        this.items = [{
            xtype: 'button',
            iconCls: 'icon-folder-open',
            text: 'Įkelti iš failo'
        },'->',{
            xtype: 'button',
            text: 'Atšaukti'
        },{
            xtype: 'button',
            text: 'Gerai'
        }];

        this.callParent(arguments);
    }
})
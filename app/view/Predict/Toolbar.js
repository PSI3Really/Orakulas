Ext.define(CONFIG.APP_NS+'.view.Predict.Toolbar', {
    extend: 'Ext.toolbar.Toolbar',
    alias: 'widget.predict.toolbar',

    border: false,

    initComponent: function(){
        this.items = [{
            xtype: 'button',
            iconCls: 'icon-folder-open',
            text: 'Įkelti iš failo'
        },'-',{
            xtype: 'button',
            text: 'IS/Padaliniai...'
        },{
            xtype: 'button',
            text: 'Priemonės/Padaliniai...'
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
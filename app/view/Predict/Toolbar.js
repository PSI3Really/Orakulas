Ext.define(CONFIG.APP_NS+'.view.Predict.Toolbar', {
    extend: 'Ext.toolbar.Toolbar',
    alias: 'widget.predicttoolbar',

    border: false,

    initComponent: function(){
        this.items = [{
            xtype: 'button',
            iconCls: 'icon-folder-open',
            action: 'openFile',
            text: 'Įkelti iš failo'
        },'-',{
            xtype: 'button',
            action: 'infSysAndDepartments',
            text: 'IS/Padaliniai...'
        },{
            xtype: 'button',
            action: 'supportAndDepartments',
            text: 'Priemonės/Padaliniai...'
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
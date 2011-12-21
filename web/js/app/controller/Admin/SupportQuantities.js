Ext.define(CONFIG.APP_NS+'.controller.Admin.SupportQuantities', {
    extend: 'Ext.app.Controller',

    views: ['Admin.SupportQuantities.Grid', 'Admin.SupportQuantities.SupportQuantities'],
    models: ['Admin.SupportQuantity'],
    stores: ['Admin.SupportQuantities'],

    init: function(){
        this.control({
            'adminsupportquantities button[action=add]':{
                click: this.add
            },
            'adminsupportquantities button[action=delete]':{
                click: this.remove
            },
            'adminsupportquantities':{
                itemdblclick: this.edit
            },
            'adminsupportquantities button[action=sync]':{
                click: this.sync
            },
            'adminsupportquantities button[action=undo]':{
                click: this.reload
            }
        });
    },

    add: function(btn){
        var grid = btn.up('adminsupportquantities').down('adminsupportquantitiesgrid');
        var store = grid.getStore();

        var rowEditor = grid.plugins[0];
        rowEditor.cancelEdit();
        store.insert(0, Ext.create(store.model));
        rowEditor.startEdit(0, 0);
        //Ext.getCmp('supportQuantitiesSync').setDisabled(false);
    },

    remove: function(btn){
        var grid = btn.up('adminsupportquantities').down('adminsupportquantitiesgrid');
        var store = grid.getStore();
        var selected = grid.getSelectionModel().getSelection();

        var rowEditor = grid.plugins[0];
        rowEditor.cancelEdit();
        store.remove(selected);
        Ext.getCmp('supportQuantitiesSync').setDisabled(false);
    },

    sync: function(btn){
        var grid = btn.up('adminsupportquantities').down('adminsupportquantitiesgrid');
        var store = grid.getStore();
        store.sync();
        Ext.getCmp('supportQuantitiesSync').setDisabled(true);
    },

    reload: function(btn){
        var grid = btn.up('adminsupportquantities').down('adminsupportquantitiesgrid');
        grid.getStore().load();
        Ext.getCmp('supportQuantitiesSync').setDisabled(true);
    }
});
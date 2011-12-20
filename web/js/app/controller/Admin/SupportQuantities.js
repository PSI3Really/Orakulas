Ext.define(CONFIG.APP_NS+'.controller.Admin.SupportQuantities', {
    extend: 'Ext.app.Controller',

    views: ['Admin.SupportQuantities.Grid'],
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
            }
        });
    },

    add: function(btn){
        var grid = btn.up('adminsupportquantities');
        var store = grid.getStore();

        var rowEditor = grid.plugins[0];
        rowEditor.cancelEdit();
        store.insert(0, Ext.create(store.model));
        rowEditor.startEdit(0, 0);
    },

    remove: function(btn){
        var grid = btn.up('importwindow').down('importgrid');
        var store = grid.getStore();
        var selected = grid.getSelectionModel().getSelection();

        var rowEditor = grid.plugins[0];
        rowEditor.cancelEdit();
        store.remove(selected);
    },

    sync: function(btn){
        var grid = btn.up('adminsupportquantities');
        var store = grid.getStore();
        store.sync();
    }
});
Ext.define(CONFIG.APP_NS+'.controller.Admin.SupportTypes', {
    extend: 'Ext.app.Controller',

    models: [
        'Admin.SupportType', 'Admin.SupportType'
    ],

    stores: [
        'Admin.SupportTypes'
    ],

    views: [
        'Admin.SupportTypes.SupportTypes'
    ],

    init: function(){
        this.control({
            'adminsupporttypes button[action=add]':{
                click: this.add
            },
            'adminsupporttypes button[action=delete]':{
                click: this.remove
            },
            'adminsupporttypesgrid button[action=sync]': {
                click: this.sync
            },
            'adminsupporttypesgrid button[action=undo]':{
                click: this.reload
            }
        });
    },

    sync: function(btn) {
        var grid = btn.up('adminsupporttypesgrid');
        var store = grid.getStore();
        store.sync();
        Ext.getCmp('supportTypesSync').setDisabled(true);
    },

    reload: function(btn){
        var grid = btn.up('adminsupporttypesgrid');
        grid.getStore().load();
        Ext.getCmp('supportTypesSync').setDisabled(true);
    },

    add: function(btn){
        var grid = btn.up('adminsupporttypesgrid');
        var store = grid.getStore();

        var rowEditor = grid.plugins[0];
        rowEditor.cancelEdit();
        store.insert(0, Ext.create(store.model));
        rowEditor.startEdit(0, 0);
    },

    remove: function(btn){
        var grid = btn.up('adminsupporttypesgrid');
        var store = grid.getStore();
        var selected = grid.getSelectionModel().getSelection();

        for (var index in selected){
            var item = selected[index];
            store.remove(item);
        }

        Ext.getCmp('supportTypesSync').setDisabled(false);
    }
});
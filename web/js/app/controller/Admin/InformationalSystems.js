Ext.define(CONFIG.APP_NS+'.controller.Admin.InformationalSystems', {
    extend: 'Ext.app.Controller',

    models: [
        'Admin.InformationalSystem', 'Admin.Department'
    ],

    stores: [
        'Admin.InformationalSystems'
    ],

    views: [
        'Admin.InformationalSystems.IS',
        'Admin.InformationalSystems.ISGrid'
    ],

    init: function(){
        this.control({
            'adminispanel button[action=add]':{
                click: this.add
            },
            'adminispanel button[action=delete]':{
                click: this.remove
            },
            'adminisgrid button[action=sync]': {
                click: this.sync
            },
            'adminisgrid button[action=undo]':{
                click: this.reload
            }
        });
    },

    add: function(btn){
        var grid = btn.up('adminispanel').down('adminisgrid');
        var store = grid.getStore();

        var rowEditor = grid.plugins[0];
        rowEditor.cancelEdit();
        store.insert(0, Ext.create(store.model));
        rowEditor.startEdit(0, 0);
    },

    remove: function(btn){
        var grid = btn.up('adminisgrid');
        var store = grid.getStore();
        var selected = grid.getSelectionModel().getSelection();

        for (var index in selected){
            var item = selected[index];
            store.remove(item);
        }

        Ext.getCmp('infoSysSync').setDisabled(false);
    },


    sync: function(btn) {
        var grid = btn.up('adminisgrid');
        var store = grid.getStore();
        store.sync();
        Ext.getCmp('infoSysSync').setDisabled(true);
    },

    reload: function(btn){
        var grid = btn.up('adminisgrid');
        grid.getStore().load();
        grid.departments.load();
        Ext.getCmp('infoSysSync').setDisabled(true);
    }
});

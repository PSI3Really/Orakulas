Ext.define(CONFIG.APP_NS+'.controller.Admin.Departments', {
    extend: 'Ext.app.Controller',

    models: [
        'Admin.Department', 'Admin.InformationalSystem'
    ],

    stores: [
        'Admin.Departments'
    ],

    views: [
        'Admin.Departments.Departments'
    ],

    init: function(){
        this.control({
            'admindepartmentsgrid button[action=add]':{
                click: this.add
            },
            'admindepartmentsgrid button[action=delete]':{
                click: this.remove
            },
            'admindepartmentsgrid button[action=sync]': {
                click: this.sync
            },
            'admindepartmentsgrid button[action=undo]':{
                click: this.reload
            }
        });
    },

    add: function(btn){
        var grid = btn.up('admindepartmentsgrid');
        var store = grid.getStore();

        var rowEditor = grid.plugins[0];
        rowEditor.cancelEdit();
        store.insert(0, Ext.create(store.model));
        rowEditor.startEdit(0, 0);
    },

    remove: function(btn){
        var grid = btn.up('admindepartmentsgrid');
        var store = grid.getStore();
        var selected = grid.getSelectionModel().getSelection();

        for (var index in selected){
            var item = selected[index];
            store.remove(item);
        }

        Ext.getCmp('departmentsSync').setDisabled(false);
    },

    sync: function(btn) {
        var grid = btn.up('admindepartmentsgrid');
        var store = grid.getStore();
        store.sync();
        Ext.getCmp('departmentsSync').setDisabled(true);
    },


    reload: function(btn){
        var grid = btn.up('admindepartmentsgrid');
        grid.getStore().load();
        Ext.getCmp('departmentsSync').setDisabled(true);
    }
});
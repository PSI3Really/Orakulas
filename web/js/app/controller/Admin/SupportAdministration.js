Ext.define(CONFIG.APP_NS+'.controller.Admin.SupportAdministration', {
    extend: 'Ext.app.Controller',

    views: ['Admin.SupportAdministration.Grid', 'Admin.SupportAdministration.SupportAdministration'],
    models: ['Admin.SupportAdministrationTime', 'Admin.SupportAdminTimeModel_Dummy'],
    stores: ['Admin.SupportAdministrationTimes'],

    init: function(){
        this.control({
            'adminsupportadministration button[action=add]':{
                click: this.add
            },
            'adminsupportadministration button[action=delete]':{
                click: this.remove
            },
            'adminsupportadministration':{
                itemdblclick: this.edit
            },
            'adminsupportadministration button[action=sync]':{
                click: this.sync
            },
            'adminsupportadministration button[action=undo]':{
                click: this.reload
            }
        });
    },

    add: function(btn){
        var grid = btn.up('adminsupportadministration').down('adminsupportadministrationgrid');
        var store = grid.getStore();

        var rowEditor = grid.plugins[0];
        rowEditor.cancelEdit();
        store.insert(0, Ext.create(store.model));
        rowEditor.startEdit(0, 0);
        //Ext.getCmp('supportQuantitiesSync').setDisabled(false);
    },

    remove: function(btn){
        var grid = btn.up('adminsupportadministration').down('adminsupportadministrationgrid');
        var store = grid.getStore();
        var selected = grid.getSelectionModel().getSelection();

        var rowEditor = grid.plugins[0];
        rowEditor.cancelEdit();
        store.remove(selected);
        Ext.getCmp('supportAdminSync').setDisabled(false);
    },

    sync: function(btn){
        var grid = btn.up('adminsupportadministration').down('adminsupportadministrationgrid');
        var store = grid.getStore();
        store.sync();
        Ext.getCmp('supportAdminSync').setDisabled(true);
    },

    reload: function(btn){
        var grid = btn.up('adminsupportadministration').down('adminsupportadministrationgrid');
        grid.getStore().load();
        Ext.getCmp('supportAdminSync').setDisabled(true);
    }
});
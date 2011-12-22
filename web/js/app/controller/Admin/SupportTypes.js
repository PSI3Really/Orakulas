Ext.define(CONFIG.APP_NS+'.controller.Admin.SupportTypes', {
    extend: 'Ext.app.Controller',

    models: [
        'Admin.SupportType', 'Admin.SupportType'
    ],

    stores: [
        'Admin.SupportTypes'
    ],

    views: [
        'Admin.SupportTypes.SupportTypes',
        'Admin.SupportTypes.SupportTypesAddWindow'
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
            },
            'adminsupporttypesgrid': {
                itemdblclick: this.edit
            }/*,
            'adminUsersEditWindow button[action=save]':{
                click: this.onSaveEdit
            },
            'adminUsersEditWindow button[action=cancel]':{
                click: this.onCancelEdit
            }*/
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
        Ext.create('widget.adminsupporttypesaddWindow', {}).show();
        /*
        var grid = btn.up('adminsupporttypesgrid');
        var store = grid.getStore();

        var record = Ext.create(CONFIG.APP_NS+'.model.Admin.SupportType', {
            'name': 'test'
        });

        store.add(record);
        store.sync();
        */

        //Ext.getCmp('supportTypesSync').setDisabled(false);
    },

    edit: function(view, record, item, index){
        var wnd = Ext.create('widget.adminsupporttypesaddWindow', {
            editing: true,
            record: record,
            store: record.store
        });

        wnd.show();
    },

    remove: function(btn){
        alert('Pressed Delete');
        Ext.getCmp('supportTypesSync').setDisabled(false);
    },

    onSaveEdit: function(btn){
        var wnd = btn.up('adminUsersEditWindow');
        var form = wnd.down('form');

        if (!form.getForm().isValid())
            return;

        //Save all the form fields into the record
        var values = form.getValues();
        for (var property in values){
            wnd.record.set(property, values[property]);
        };

        if (wnd.store && !wnd.editing){ //are we creating a new entry? Add it to the store!
            wnd.store.add(wnd.record);
            form.getForm().reset();
        };

        wnd.close();
        Ext.getCmp('supportTypesSync').setDisabled(false);
        //wnd.store.sync();
    },

    onCancelEdit: function(btn){
        var wnd = btn.up('adminUsersEditWindow');
        wnd.close();
    }
});
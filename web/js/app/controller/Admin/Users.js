Ext.define(CONFIG.APP_NS+'.controller.Admin.Users', {
    extend: 'Ext.app.Controller',

    models: [
        'Admin.User'
    ],

    stores: [
        'Admin.Users'
    ],

    views: ['Admin.Users.Users', 'Admin.Users.EditWindow'],

    init: function(){
        this.control({
            'adminusersgrid button[action=add]':{
                click: this.add
            },
            'adminusersgrid button[action=delete]':{
                click: this.delete
            },
            'adminusersgrid':{
                itemdblclick: this.edit
            },
            'adminUsersEditWindow button[action=save]':{
                click: this.onSaveEdit
            },
            'adminUsersEditWindow button[action=cancel]':{
                click: this.onCancelEdit
            },
            'adminusersgrid button[action=sync]':{
                click: this.sync
            }
        });
    },

    add: function(btn){
        var grid = btn.up('adminusersgrid');
        var store = grid.getStore();

        var wnd = Ext.create('widget.adminUsersEditWindow', {
            editing: false,
            store: store
        });

        wnd.show();
    },

    edit: function(view, record, item, index){
        var wnd = Ext.create('widget.adminUsersEditWindow', {
            editing: true,
            record: record,
            store: record.store
        });

        wnd.show();
    },

    delete: function(btn){
        var grid = btn.up('adminusersgrid');
        var store = grid.getStore();
        var selected = grid.getSelectionModel().getSelection();

        for (var index in selected){
            var item = selected[index];
            Ext.Msg.show({
                title: 'Trinti įrašą?',
                msg: 'Ar tikrai norite ištrinti vartotoją "' + item.get('username') + '"?',
                buttons: Ext.Msg.YESNO,
                icon: Ext.Msg.QUESTION,
                fn: function(btn) {
                    if (btn === 'yes'){
                        store.remove(item);
                        //store.sync();
                    }
                }
            });
        }
    },

    sync: function(btn){
        var grid = btn.up('adminusersgrid');
        var store = grid.getStore();
        store.sync();
    },

    onSaveEdit: function(btn){
        var wnd = btn.up('adminUsersEditWindow');
        var form = wnd.down('form');

        //Save all the form fields into the record
        var values = form.getValues();
        for (var property in values){
            wnd.record.set(property, values[property]);
        };

        if (wnd.store && !wnd.editing){ //are we creating a new entry? Add it to the store!
            wnd.store.add(wnd.record);
        };

        wnd.close();
        //wnd.store.sync();
    },

    onCancelEdit: function(btn){
        var wnd = btn.up('adminUsersEditWindow');
        wnd.close();
    }
});
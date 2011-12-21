Ext.define(CONFIG.APP_NS+'.controller.Admin.SupportTypes', {
    extend: 'Ext.app.Controller',

    models: [
        'Admin.SupportType'
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
            }
        });
    },

    sync: function(btn) {
        var grid = btn.up('adminsupporttypesgrid');
        var store = grid.getStore();
        store.sync();
    },

    reload: function(btn){
        var grid = btn.up('adminsupporttypesgrid');
        grid.getStore().load();
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
        //alert('Pressed Delete');
    }
});
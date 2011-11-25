Ext.define(CONFIG.APP_NS+'.controller.Admin.SupportTypes', {
    extend: 'Ext.app.Controller',

    models: [
        'Admin.SupportType'
    ],

    stores: [
        'Admin.SupportTypes'
    ],

    views: ['Admin.SupportTypes.SupportTypes'],

    init: function(){
        this.control({
            'adminsupporttypes button[action=add]':{
                click: this.add
            },
            'adminsupporttypes button[action=delete]':{
                click: this.delete
            }
        });
    },

    add: function(btn){
        var grid = btn.up('adminsupporttypesgrid');
        var store = grid.getStore();

        var record = Ext.create(CONFIG.APP_NS+'.model.Admin.SupportType', {
            'name': 'test'
        });

        store.add(record);
        store.sync();
    },

    delete: function(btn){

        //alert('Pressed Delete');
    }
});
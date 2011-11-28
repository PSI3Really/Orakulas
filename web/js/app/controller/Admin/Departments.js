Ext.define(CONFIG.APP_NS+'.controller.Admin.Departments', {
    extend: 'Ext.app.Controller',

    models: [
        'Admin.Department'
    ],

    stores: [
        'Admin.Departments'
    ],

    views: ['Admin.Departments.Departments'],

    init: function(){
        this.control({
            'admindepartmentsgrid button[action=add]':{
                click: this.add
            },
            'admindepartmentsgrid button[action=delete]':{
                click: this.delete
            }
        });
    },

    add: function(btn){
        var grid = btn.up('admindepartmentsgrid');
        var store = grid.getStore();

        var record = Ext.create(CONFIG.APP_NS+'.model.Admin.Department', {
            'code': 'testCode',
            'name': 'testName'
        });

        store.add(record);
        store.sync();
    },

    delete: function(btn){
        //TODO: At the moment deletes the last entry
        var grid = btn.up('admindepartmentsgrid');
        var store = grid.getStore();

        store.removeAt(store.getCount() - 1);
        store.sync();
    }
});
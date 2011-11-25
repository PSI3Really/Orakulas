Ext.define(CONFIG.APP_NS+'.controller.Admin.Users', {
    extend: 'Ext.app.Controller',

    models: [
        'Admin.User'
    ],

    stores: [
        'Admin.Users'
    ],

    views: ['Admin.Users.Users'],

    init: function(){
        this.control({
            'adminusersgrid button[action=add]':{
                click: this.add
            },
            'adminusersgrid button[action=delete]':{
                click: this.delete
            }
        });
    },

    add: function(btn){
        var grid = btn.up('adminusersgrid');
        var store = grid.getStore();

        var record = Ext.create(CONFIG.APP_NS+'.model.Admin.User', {
            'username': 'test',
            'admin': false
        });

        //store.insert(0, record);
        store.add(record);
        store.sync();
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
                        store.sync();
                    }
                }
            });
        }
    }
});
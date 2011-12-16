Ext.define(CONFIG.APP_NS+'.controller.Admin.InformationalSystems', {
    extend: 'Ext.app.Controller',

    models: [
        'Admin.InformationalSystem'
    ],

    stores: [
        'Admin.InformationalSystems'
    ],

    views: ['Admin.InformationalSystems.IS', 'Admin.InformationalSystems.ISAddWindow'],

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
            }
        });
    },

    add: function(btn){
        Ext.create('widget.adminisaddWindow', {}).show();
        var grid = btn.up('adminisgrid');
        var store = grid.getStore();
        
        var record = Ext.create(CONFIG.APP_NS+'.model.Admin.InformationalSystem', {
            'name': 'test'
        });

        store.add(record);
        store.sync();
    },

    remove: function(btn){
        var grid = btn.up('adminisgrid');
        var store = grid.getStore();
        var selected = grid.getSelectionModel().getSelection();
        
        //alert('Selected: ' + selected[0].getId());

        for (var index in selected){
            var item = selected[index];
            Ext.Msg.show({
                title: 'Trinti įrašą?',
                msg: 'Ar tikrai norite ištrinti informacinę sistemą "' + item.get('name') + '"?',
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
    },


    sync: function(btn) {
        var grid = btn.up('adminisgrid');
        var store = grid.getStore();
        store.sync();
    }
});

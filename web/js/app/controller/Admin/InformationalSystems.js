Ext.define(CONFIG.APP_NS+'.controller.Admin.InformationalSystems', {
    extend: 'Ext.app.Controller',

    models: [
        'Admin.InformationalSystem'
    ],

    stores: [
        'Admin.InformationalSystems'
    ],

    views: ['Admin.InformationalSystems.IS'],

    init: function(){
        this.control({
            'adminispanel button[action=add]':{
                click: this.add
            },
            'adminispanel button[action=delete]':{
                click: this.delete
            }
        });
    },

    add: function(btn){
        var grid = btn.up('adminisgrid');
        var store = grid.getStore();
        
        var record = Ext.create(CONFIG.APP_NS+'.model.Admin.InformationalSystem', {
            'name': 'test'
        });

        store.add(record);
        store.sync();

        
    },

    delete: function(btn){
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
    }
});

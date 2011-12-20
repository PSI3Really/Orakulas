Ext.define(CONFIG.APP_NS+'.controller.Admin.InformationalSystems', {
    extend: 'Ext.app.Controller',

    models: [
        'Admin.InformationalSystem'
    ],

    stores: [
        'Admin.InformationalSystems'
    ],

    views: [
        'Admin.InformationalSystems.IS',
        'Admin.InformationalSystems.ISAddWindow'
    ],

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
            },
            'adminisgrid button[action=undo]': {
                click: this.undo
            },
            'adminisaddpanel button[action=confirm]': {
                click: this.addConfirm
            },
            'adminisaddpanel button[action=cancel]': {
                click: this.addCancel
            },
            'adminisgrid':{
                itemdblclick: this.edit
            },
            'adminisgrid button[action=undo]':{
                click: this.reload
            }
        });
    },

    add: function(btn){
        Ext.create('widget.adminisaddWindow', {}).show();
        /*
        var grid = btn.up('adminisgrid');
        var store = grid.getStore();
        
        var record = Ext.create(CONFIG.APP_NS+'.model.Admin.InformationalSystem', {
            'name': 'test'
        });

        store.add(record);
        store.sync();
        */
    },

    remove: function(btn){
        var grid = btn.up('adminisgrid');
        var store = grid.getStore();
        var selected = grid.getSelectionModel().getSelection();

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
    },

    reload: function(btn){
        var grid = btn.up('adminisgrid');
        grid.getStore().load();
    },

    undo: function(btn) {
    },

    addConfirm: function(btn) {
        var grid = btn.up('adminisaddWindow').down('adminisaddgrid');
        var code = btn.up('adminisaddpanel').down('textfield[name=code]');
        var name = btn.up('adminisaddpanel').down('textfield[name=name]');

        var selected = grid.getSelectionModel().getSelection();
        var selected_id = "";

        for (var index in selected){
            var item = selected[index];
            selected_id += item.get("id")+" ";
        }

        var params;
        var url = "";
        var panel = btn.up('adminisaddpanel');
        if(panel.editing) {
            url = "model/informationalSystems/update";
            params = {
                id: panel.record.get("id"),
                code: code.value,
                name: name.value,
                departments: selected_id
            };
        }
        else {
            url = "model/informationalSystems/create"
            params = {
                code: code.value,
                name: name.value,
                departments: selected_id
            };

        }

        Ext.Ajax.request({
            url : url,
            method: 'POST',
            params: {
                jsonValue: Ext.encode(params)
            },
            success:
                function(response, opts) {
                    var obj = Ext.decode(response.responseText);
                    var store = Ext.getCmp('adminisgridid').getStore();
                    store.loadRawData(obj, true);
                    btn.up('adminisaddWindow').close();
                }
        });
    },

    addCancel: function(btn) {
        btn.up('adminisaddWindow').close();
    },

    edit: function(view, record, item, index){
        var wnd = Ext.create('widget.adminisaddWindow', {
            editing: true,
            record: record,
            store: record.store
        });

        wnd.show();
    }
});

Ext.define(CONFIG.APP_NS+'.controller.Predict', {
    extend: 'Ext.app.Controller',

    views: ['Predict.Window', 'Predict.Toolbar', 'Predict.Grid'],

    init: function(){
        this.control({
            'predicttoolbar button[action=accept]':{
                click: this.accept
            },
            'predicttoolbar button[action=cancel]':{
                click: this.cancel
            },
            'predicttoolbar filefield[action=openFile]':{
                change: this.openFile
            },
            'predicttoolbar button[action=editEntities]':{
                click: this.editEntities
            },
            'predicttoolbar button[action=add]':{
                click: this.add
            },
            'predicttoolbar button[action=delete]':{
                click: this.remove
            }
        });
    },

    add: function(btn){
        var grid = btn.up('predictwindow').down('predictgrid');
        var store = grid.getStore();

        var rowEditor = grid.plugins[0];
        rowEditor.cancelEdit();
        store.insert(0, Ext.create(store.model));
        rowEditor.startEdit(0, 0);
    },

    remove: function(btn){
        var grid = btn.up('predictwindow').down('predictgrid');
        var store = grid.getStore();
        var selected = grid.getSelectionModel().getSelection();

        var rowEditor = grid.plugins[0];
        rowEditor.cancelEdit();
        store.remove(selected);
    },

    accept: function(btn){
        alert('TODO: Pressed Accept');
        btn.up('predictwindow').close();
    },

    cancel: function(btn){
        btn.up('predictwindow').close();
    },

    openFile: function(field, value){
        var msg = function(title, msg, icon) {
            Ext.Msg.show({
                title: title,
                msg: msg,
                minWidth: 200,
                modal: true,
                icon: icon,
                buttons: Ext.Msg.OK
            });
        };

        var form = field.up('form').getForm();
        if (form.isValid()) {
            form.submit({
                url: 'excel/import/supportHistories',
                waitMsg: LANG.IMPORT.WAIT_MSG,
                success: function(form, action) {
                    var grid = form.owner.up('predictwindow').down('predictgrid');

                    grid.store.loadData(action.result.data, false); //replace old data
                },
                failure: function(form, action) {
                    var message = LANG.IMPORT.FAIL.UNKNOWN; // unknown error
                    switch (action.result.errors) {
                        case 'INVALID_FILE_TYPE':
                            message = LANG.IMPORT.FAIL.INVALID_FILE_TYPE;
                            break;
                        case 'NO_SUCH_SHEET':
                            message = LANG.IMPORT.FAIL.NO_SUCH_SHEET;
                            break;
                        case 'INVALID_DATA':
                            message = LANG.IMPORT.FAIL.INVALID_DATA;
                            break;
                    }
                    msg(LANG.IMPORT.FAIL.TITLE, message, Ext.Msg.ERROR);
                }
            });
        }
    },

    editEntities: function(btn){
        alert("TODO");
    }
});
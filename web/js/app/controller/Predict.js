Ext.define(CONFIG.APP_NS+'.controller.Predict', {
    extend: 'Ext.app.Controller',

    views: ['Predict.Window', 'Predict.Toolbar', 'Predict.Grid', 'Predict.EditEntitiesWnd'],

    models: ['Admin.InformationalSystem'],

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
        var grid = btn.up('predictwindow').down('predictgrid');
        var store = grid.getStore();
        var wnd = btn.up('predictwindow');

        var supportQuantities = Ext.encode(Ext.pluck(store.data.items, 'data'));

        //params: 'data={"supportQuantities":{},"supportAdministrationTimes":{},"departmentInfoSysUsages":{}}'

        var jsonData = 'data={"supportQuantities":' + supportQuantities +
            ',"supportAdministrationTimes":' + wnd.supportJson ? wnd.supportJson : '{}' +
            ',"departmentInfoSysUsages":' + wnd.infoSysJson ? wnd.infoSysJson : '{}'+ '}';
        
        wnd.setLoading(LANG.LOADING.PREDICTING);

        Ext.Ajax.request({
            url: 'predictData',
            method: 'POST',
            params: jsonData,
            success: function(response){
                var tabpanel = wnd.parentTab.up('maintabpanel');
                tabpanel.fireEvent('loadPrediction', tabpanel, Ext.JSON.decode(response.responseText));
                wnd.setLoading(false);
                wnd.close();
            },
            failure: function(response){
                wnd.setLoading(false);
            }
        });
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
                    if (action.result.errors == 'INVALID_FILE_TYPE'){
                        message = LANG.IMPORT.FAIL.INVALID_FILE_TYPE;
                    } else if (action.result.errors == 'NO_SUCH_SHEET'){
                        message = LANG.IMPORT.FAIL.NO_SUCH_SHEET;
                    } else if (action.result.errors.substring(0, 12) == 'INVALID_DATA'){
                        message = LANG.IMPORT.FAIL.INVALID_DATA + action.result.errors.substring(13);
                    }
                    msg(LANG.IMPORT.FAIL.TITLE, message, Ext.Msg.ERROR);
                }
            });
        }
    },

    editEntities: function(btn){
        var parentWnd = btn.up('predictwindow');
        if (!parentWnd.editEntitiesWnd) {
            parentWnd.editEntitiesWnd = Ext.create('widget.editEntitiesWnd', {parentWnd: parentWnd});
        }
        
        parentWnd.editEntitiesWnd.show();
    }
});
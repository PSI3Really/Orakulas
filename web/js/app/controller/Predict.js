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
            },
            'predictwindow':{
                beforeshow: this.beforeShow
            }
        });
    },

    beforeShow: function(window){
        var entitiesButton = window.down('[action=editEntities]');
        if (entitiesButton) {
            entitiesButton.setDisabled(true);
        }
        window.oneStoreLoaded = false;

        //entitiesButton.setLoading(true);

        var loadCallback = function(){
            if (window.oneStoreLoaded){
                if (entitiesButton) {
                    entitiesButton.setDisabled(false);
                }
                //entitiesButton.setLoading(false);
            } else {
                window.oneStoreLoaded = true;
            }
        }

        if (!window.infoSysDepartmentsStore){
            window.infoSysDepartmentsStore = Ext.create('widget.adminDepartmentInfoSysUsagesStore', {
                listeners:{
                    load: loadCallback
                }
            });
        } 

        if (!window.supportDepartmentsStore){
            window.supportDepartmentsStore = Ext.create('widget.adminSupportAdministrationTimesStore', {
                listeners:{
                    load: loadCallback
                }
            });
        }

        window.infoSysDepartmentsStore.load();
        window.supportDepartmentsStore.load();
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

        wnd.supportJson = wnd.supportJson ? wnd.supportJson : '{}';
        wnd.infoSysJson = wnd.infoSysJson ? wnd.infoSysJson : '{}';
        wnd.optionsJson = wnd.optionsJson ? wnd.optionsJson : '{}';

        var jsonData = 'data={"supportQuantities":' + supportQuantities +
            ',"supportAdministrationTimes":' + wnd.supportJson +
            ',"departmentInfoSysUsages":' + wnd.infoSysJson +
            ',"options":' + wnd.optionsJson + '}';

        wnd.setLoading(LANG.LOADING.PREDICTING);

        Ext.Ajax.request({
            url: 'predictData',
            method: 'POST',
            params: jsonData,
            success: function(response){
                var tabpanel = wnd.parentTab;

                var resp = Ext.JSON.decode(response.responseText);

                if (!resp.infoSysRequests) resp.infoSysRequests = [];
                if (!resp.infoSysHours) resp.infoSysHours = [];

                //debugger;

                tabpanel.fireEvent('loadPrediction', tabpanel, resp);
                //wnd.setLoading(false);
                wnd.hide();
            },
            failure: function(response){
                Ext.Msg.alert(LANG.ERROR.TITLE, LANG.ERROR.CANNOT_CONNECT + ': ' + response.responseText);
            },
            callback: function(){
                wnd.setLoading(false);
            }
        });
    },

    cancel: function(btn){
        btn.up('predictwindow').hide();
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
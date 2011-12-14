Ext.define(CONFIG.APP_NS+'.controller.Import', {
    extend: 'Ext.app.Controller',

    views: ['Import.Window', 'Import.Toolbar', 'Import.Grid'],
    
    init: function(){
        this.control({
            'importtoolbar button[action=accept]':{
                click: this.accept
            },
            'importtoolbar button[action=cancel]':{
                click: this.cancel
            },
            'importtoolbar filefield[action=openFile]':{
                change: this.openFile
            }
        });
    },

    accept: function(btn){
        alert('Pressed Accept');
        btn.up('importwindow').close();
    },

    cancel: function(btn){
        btn.up('importwindow').close();
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
                    msg('Data Received', 'Populate the grid with action.result.data array', Ext.Msg.INFO);
                    var grid = form.up('importwindow').down('importgrid');

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
    }
});
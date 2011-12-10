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
                waitMsg: '~~Duomenų failas saugomas ir skaitomas&hellip;',
                success: function(form, action) {
                    msg('Data Received', 'Populate the grid with action.result.data array', Ext.Msg.INFO);
                },
                failure: function(form, action) {
                    var message = '~~Nepavyko perskaityti duomenų failo.'; // unknown error
                    switch (action.result.errors) {
                        case 'INVALID_FILE_TYPE':
                            message = '~~Klaidingas duomenų failo formatas. Turėtų būti XLS arba XLSX.';
                            break;
                        case 'NO_SUCH_SHEET':
                            message = '~~Tokio puslapio duomenų faile nėra.';
                            break;
                        case 'INVALID_DATA':
                            message = '~~Klaidingai suformuotas duomenų failas.';
                            break;
                    }
                    msg('~~Įvyko klaida', message, Ext.Msg.ERROR);
                }
            });
        }
    }
});
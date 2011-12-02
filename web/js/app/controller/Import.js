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
        alert('Open file: ' + value);
    }
});
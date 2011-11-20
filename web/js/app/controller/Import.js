Ext.define(CONFIG.APP_NS+'.controller.Import', {
    extend: 'Ext.app.Controller',
    
    //stores: ['Users'], 
    models: ['User'],
    views: ['Import.Window', 'Import.Toolbar', 'Import.Grid'],


    init: function(){
        this.control({
            'importtoolbar button[action=accept]':{
                click: this.accept
            },
            'importtoolbar button[action=cancel]':{
                click: this.cancel
            },
            'importtoolbar button[action=openFile]':{
                click: this.openFile
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

    openFile: function(btn){
        alert('Pressed OpenFile');
    }
});
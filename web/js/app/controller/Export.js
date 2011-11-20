Ext.define(CONFIG.APP_NS+'.controller.Export', {
    extend: 'Ext.app.Controller',

    views: ['Export.Window', 'Export.Controls'],

    init: function(){
        this.control({
            'exportwindow button[action=accept]':{
                click: this.accept
            },
            'exportwindow button[action=cancel]':{
                click: this.cancel
            }
        });
    },

    accept: function(btn){
        if (btn.up('exportcontrols').getForm().isValid()){
            btn.up('exportwindow').close();
        }
    },

    cancel: function(btn){
        btn.up('exportwindow').close();
    }
});
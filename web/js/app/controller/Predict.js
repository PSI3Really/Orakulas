Ext.define(CONFIG.APP_NS+'.controller.Predict', {
    extend: 'Ext.app.Controller',

    views: ['Predict.Window', 'Predict.Toolbar'],

    init: function(){
        this.control({
            'predicttoolbar button[action=accept]':{
                click: this.accept
            },
            'predicttoolbar button[action=cancel]':{
                click: this.cancel
            },
            'predicttoolbar button[action=openFile]':{
                click: this.openFile
            },
            'predicttoolbar button[action=infoSysAndDepartments]':{
                click: this.infSysAndDepartments
            },
            'predicttoolbar button[action=supportAndDepartments]':{
                click: this.supportAndDepartments
            }
        });
    },

    accept: function(btn){
        alert('TODO: Pressed Accept');
        btn.up('predictwindow').close();
    },

    cancel: function(btn){
        btn.up('predictwindow').close();
    },

    openFile: function(btn){
        alert('TODO: Pressed OpenFile');
    },

    infSysAndDepartments: function(btn){
        alert('TODO: Pressed infSysAndDepartments');
    },

    supportAndDepartments: function(btn){
        alert('TODO: Pressed supportAndDepartments');
    }
});
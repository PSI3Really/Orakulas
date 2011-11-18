Ext.define(CONFIG.APP_NS+'.controller.Tab', {
    extend: 'Ext.app.Controller',

    views: ['MainTabPanel'],

    init: function(){
        this.control({
            'maintabpanel button[action=predict]':{
                click: this.predict
            },
            'maintabpanel button[action=analyze]':{
                click: this.analyze
            },
            'maintabpanel button[action=export]':{
                click: this.exportTab
            },
            'maintabpanel menuitem[action=addTable]':{
                click: this.addTable
            },
            'maintabpanel menuitem[action=addChart]':{
                click: this.addChart
            }
        });
    },

    predict: function(btn){
        var tab = btn.up('tabpanel').getActiveTab();
        var wnd = Ext.create('widget.predictwindow', {});

        wnd.show();
    },

    analyze: function(btn){
        //alert(btn.ownerCt.ownerCt.getXType());
        var tab = btn.up('tabpanel').getActiveTab();
        alert('TODO: Analizavimo langas ' + tab.title);
    },

    exportTab: function(btn){
        var tab = btn.up('tabpanel').getActiveTab();
        var wnd = Ext.create('widget.exportwindow', {});

        wnd.show();
    },

    addTable: function(item){
        //TODO: item.up does not point to parent tab
        //var tab = item.up('menu').up('tabpanel').getActiveTab();
        alert('TODO: Naujas lentelės vaizdas');
    },

    addChart: function(item){
        //TODO: item.up does not point to parent tab
        //var tab = item.up('tabpanel').getActiveTab();
        alert('TODO: Naujas grafiko vaizdas');
    }
});

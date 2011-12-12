Ext.define(CONFIG.APP_NS+'.controller.Main.Tab', {
    extend: 'Ext.app.Controller',

    views: ['Main.TabPanel', 'Main.Tab'],

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
        var tab = btn.up('tabpanel').getActiveTab();
        var portal = tab.down('portal');

        portal.fireEvent('addInfo', portal);
    },

    exportTab: function(btn){
        var tab = btn.up('tabpanel').getActiveTab();
        var wnd = Ext.create('widget.exportwindow', {});

        wnd.show();
    },

    addTable: function(item){
        var tab = item.up('menu').floatParent.up('tabpanel').getActiveTab();
        var portal = tab.down('portal');

        portal.fireEvent('addTable', portal);
    },

    addChart: function(item){
        var tab = item.up('menu').floatParent.up('tabpanel').getActiveTab();
        var portal = tab.down('portal');

        portal.fireEvent('addChart', portal);
    }
});

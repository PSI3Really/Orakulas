Ext.define(CONFIG.APP_NS+'.controller.Main.Tab', {
    extend: 'Ext.app.Controller',

    views: ['Main.TabPanel', 'Main.Portal.Tab', 'Main.Alternative.Panel'],

    models: ['Load', 'InfoSysRequests', 'InfoSysHours', 'DepartmentRequests', 'DepartmentHours'],
    stores: ['InfoSysHours', 'InfoSysRequests', 'DepartmentHours', 'DepartmentRequests'],

    init: function(){
        this.control({
            'maintabpanel button[action=predict]':{
                click: this.predict
            },
            'maintab button[action=export]':{
                click: this.exportPortal
            },
            'maintab button[action=addTable]':{
                click: this.addTable
            },
            'maintab button[action=addChart]':{
                click: this.addChart
            },
            'maintab button[action=analyze]':{
                click: this.addInfo
            },
            'alternativetab button[action=export]':{
                click: this.exportAlternative
            },
            'alternativetab button[action=addTable]':{
                click: this.showTable
            },
            'alternativetab button[action=addChart]':{
                click: this.showChart
            },
            'alternativetab button[action=analyze]':{
                click: this.showInfo
            },
            'maintabpanel':{
                loadReports: this.loadReports
            }
        });
    },

    showTable: function(btn){
        var tab = btn.up('alternativetab');

        tab.down('gridportlet').expand(true);
    },

    showInfo: function(btn){
        var tab = btn.up('alternativetab');

        tab.down('infoportlet').expand(true);
    },

    showChart: function(btn){
        var tab = btn.up('alternativetab');
        
        tab.down('chartportlet').expand(true);
    },

    loadReports: function(tabpanel){
        tabpanel.setLoading("~~Kraunami duomenys");
        Ext.Ajax.request({
            url: 'predictData',
            params: 'data={"supportQuantities":{},"supportAdministrationTimes":{},"departmentInfoSysUsages":{}}',
            success: function(response){
                var data = Ext.JSON.decode(response.responseText);
                console.log(data);

                tabpanel.reports.infoSysHours = Ext.create('widget.infoSysHours', {
                    data: data.infoSysHours
                });
                tabpanel.reports.infoSysHours.load();

                tabpanel.reports.infoSysRequests = Ext.create('widget.infoSysRequests', {
                    data: data.infoSysRequests
                });
                tabpanel.reports.infoSysRequests.load();

                tabpanel.reports.departmentHours = Ext.create('widget.departmentHours', {
                    data: data.departmentHours
                });
                tabpanel.reports.departmentHours.load();

                tabpanel.reports.departmentRequests = Ext.create('widget.departmentRequests', {
                    data: data.departmentRequests
                });
                tabpanel.reports.departmentRequests.load();

                tabpanel.setLoading(false);
            },
            failure: function(response){
                Ext.Msg.alert("~~Error", "~~Could not establish connection to the database");
            }
        });
    },

    predict: function(btn){
        var tab = btn.up('maintab'); //.getActiveTab();
        var wnd = Ext.create('widget.predictwindow', {});

        wnd.show();
    },

    addInfo: function(btn){
        var tab = btn.up('maintab'); //.getActiveTab();
        var portal = tab.down('portal');

        portal.fireEvent('addInfo', portal);
    },

    exportPortal: function(btn){
        var portal = btn.up('maintab').down('portal'); //.getActiveTab();

        var panels = [];

        portal.items.each(function(column){
            column.items.each(function(panel){
                //console.log(panel);
                panels.push(panel);
            });
        });

        var wnd = Ext.create('widget.exportwindow', {panels: panels});

        wnd.show();
    },

    exportAlternative: function(btn){
        var parentPanel = btn.up('alternativetab'); //.getActiveTab();

        var panels = [];

        parentPanel.items.each(function(panel){
            console.log(panel);
            panels.push(panel);
        });

        var wnd = Ext.create('widget.exportwindow', {panels: panels});

        wnd.show();
    },

    addTable: function(btn){
        //var tab = item.up('menu').floatParent.up('maintab'); //.getActiveTab();
        var tab = btn.up('maintab');
        var portal = tab.down('portal');

        portal.fireEvent('addTable', portal);
    },

    addChart: function(btn){
        //var tab = item.up('menu').floatParent.up('maintab'); //.getActiveTab();
        var tab = btn.up('maintab');
        var portal = tab.down('portal');

        portal.fireEvent('addChart', portal);
    }
});

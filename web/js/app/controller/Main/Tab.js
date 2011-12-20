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
            'maintabpanel button[action=reload]':{
                click: this.reload
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
                loadReports: this.loadReports,
                loadPrediction: this.loadPrediction
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

    reload: function(btn){
        var tabpanel = btn.up('maintabpanel');
        this.loadReports(tabpanel);
    },

    loadReports: function(tabpanel){
        tabpanel.setLoading(LANG.LOADING.RELOADING);
        var me = this;
        Ext.Ajax.request({
            url: 'predictData',
            params: 'data={"supportQuantities":{},"supportAdministrationTimes":{},"departmentInfoSysUsages":{}}',
            success: function(response){
                var data = Ext.JSON.decode(response.responseText);

                me.loadPrediction(tabpanel, data);
                
                tabpanel.setLoading(false);
            },
            failure: function(response){
                Ext.Msg.alert(LANG.ERROR.TITLE, LANG.ERROR.CANNOT_CONNECT);
            }
        });
    },

    loadPrediction: function(tabpanel, data){
        tabpanel.reports.infoSysHours.sort('startDate', 'ASC');
        tabpanel.reports.infoSysRequests.sort('startDate', 'ASC');
        tabpanel.reports.departmentHours.sort('startDate', 'ASC');
        tabpanel.reports.departmentRequests.sort('startDate', 'ASC');

        tabpanel.reports.infoSysHours.loadRawData(data.infoSysHours);
        tabpanel.reports.infoSysRequests.loadRawData(data.infoSysRequests);
        tabpanel.reports.departmentHours.loadRawData(data.departmentHours);
        tabpanel.reports.departmentRequests.loadRawData(data.departmentRequests);
    },

    predict: function(btn){
        var tabpanel = btn.up('maintabpanel'); //.getActiveTab();
        
        if (!tabpanel.predictWindow){
            tabpanel.predictWindow = Ext.create('widget.predictwindow', {parentTab: tabpanel});
        }

        tabpanel.predictWindow.show();
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

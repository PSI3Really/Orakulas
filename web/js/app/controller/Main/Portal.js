Ext.define(CONFIG.APP_NS+'.controller.Main.Portal', {
    extend: 'Ext.app.Controller',

    require: [
        'Ext.ux.Portlet'
    ],

    views: ['Main.Portal', 'Main.GridPortlet', 'Main.ChartPortlet'],

    models: ['Load', 'InfoSysRequests', 'InfoSysHours', 'DepartmentRequests', 'DepartmentHours'],
    stores: ['InfoSysHours', 'InfoSysRequests', 'DepartmentHours', 'DepartmentRequests'],

    refs: [
        {ref: 'portalPanel', selector: 'portal'}
    ],

    init: function(){
        this.control({
            'portal':{
                addTable:       this.addTable,
                addChart:       this.addChart,
                loadReports:    this.loadReports
            }
        });
    },

    addTable: function(portal){
        var minCol = this.findMinColumn(portal);
        var portletId = portal.portletCount++;

        minCol.add(Ext.create('widget.gridportlet', {
            title: LANG.MAIN.PORTAL.TABLE.TITLE + ' ' + portletId, 
            store: portal.reports.departmentHours
        }));
    },

    addChart: function(portal){
        var minCol = this.findMinColumn(portal);
        var portletId = portal.portletCount++;

        minCol.add(Ext.create('widget.chartportlet', {
            title: LANG.MAIN.PORTAL.CHART.TITLE + ' ' + portletId,
            store: portal.reports.departmentHours,
            
            leftAxisTitle: LANG.ENTITY.SUPPORT_COUNT,
            leftAxisFields: ['supportCount', 'entityName']
        }));
    },

    loadReports: function(portal){
        portal.reports.infoSysHours = Ext.create('widget.infoSysHours', {});
        portal.reports.infoSysHours.load();
        //console.log(portal.reports.infoSysHours);

        portal.reports.infoSysRequests = Ext.create('widget.infoSysRequests', {});
        portal.reports.infoSysRequests.load();
        //console.log(portal.reports.infoSysRequests);

        portal.reports.departmentHours = Ext.create('widget.departmentHours', {});
        portal.reports.departmentHours.load();
        //console.log(portal.reports.departmentHours);

        portal.reports.departmentRequests = Ext.create('widget.departmentRequests', {});
        portal.reports.departmentRequests.load();
        //console.log(portal.reports.departmentRequests);
    },

    //private
    findMinColumn: function(portal){
        //Find the column with the least elements
        var minCol = portal.getComponent(0);
        for (var colIdx = 0; colIdx < portal.items.getCount(); colIdx++){
            var currCol = portal.getComponent(colIdx);
            if (currCol.items.getCount() < minCol.items.getCount()){
                minCol = currCol;
            }
        }
        return minCol;
    }
});
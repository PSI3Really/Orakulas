Ext.define(CONFIG.APP_NS+'.controller.Main.Portal', {
    extend: 'Ext.app.Controller',

    require: ['Ext.ux.Portlet'],

    views: ['Main.Portal', 'Main.GridPortlet', 'Main.ChartPortlet'],

    models: ['Load'],
    stores: ['Report'],

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
            title: LANG.MAIN.PORTAL.TABLE.TITLE + ' ' + portletId, //TODO: separate by table/chart
            store: portal.reports.department
        }));
    },

    addChart: function(portal){
        var minCol = this.findMinColumn(portal);
        var portletId = portal.portletCount++;

        minCol.add(Ext.create('widget.chartportlet', {
            title: LANG.MAIN.PORTAL.CHART.TITLE + ' ' + portletId,
            store: portal.reports.department,
            leftAxisFields: ['supportCount'], //TODO: generalize
            leftAxisTitle: LANG.ENTITY.SUPPORT_COUNT
        }));
    },

    loadReports: function(portal){
        portal.reports.infoSys = Ext.create('widget.reportStore', {});
        portal.reports.department = Ext.create('widget.reportStore', {});
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
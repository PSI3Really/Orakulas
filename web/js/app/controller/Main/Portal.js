Ext.define(CONFIG.APP_NS+'.controller.Main.Portal', {
    extend: 'Ext.app.Controller',

    require: ['Ext.ux.Portlet'],

    views: ['Main.Portal'],

    models: ['Usage'],
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

        //TODO
        minCol.add(Ext.create('Ext.ux.Portlet', {
            title: 'Portlet mofo',
            html: '<h1>TABLES UP IN THIS YO</h1>'
        }))
    },

    addChart: function(portal){
        var minCol = this.findMinColumn(portal);

        //TODO
        minCol.add(Ext.create('Ext.ux.Portlet', {
            title: 'Portlet mofo',
            html: '<h1>CHARTS AND SHIZZ YO</h1>'
        }))
    },

    loadReports: function(portal){
        portal.reports = {
            infoSys: Ext.create('widget.reportStore', {}),
            department: Ext.create('widget.reportStore', {})
        }
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
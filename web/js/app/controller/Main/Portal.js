Ext.define(CONFIG.APP_NS+'.controller.Main.Portal', {
    extend: 'Ext.app.Controller',

    require: [
        'Ext.ux.Portlet'
    ],

    views: ['Main.Portal.Portal', 'Main.Portal.GridPortlet', 'Main.Portal.ChartPortlet', 'Main.Portal.InfoPortlet'],

    refs: [
        {ref: 'portalPanel', selector: 'portal'}
    ],

    defaultCfg: {},

    init: function(){
        this.defaultCfg = {
            listeners: {
                beforeexpand: this.onAltBeforeExpand
            },
            collapsed: true
        };

        var selectors = {
            portal: {
                addTable:       this.addTable,
                addChart:       this.addChart,
                addInfo:        this.addInfo,
                render: function (view) {
                    if (view.alternative) {
                        var cfg = $.extend({}, this.defaultCfg);

                        cfg.collapsed = false;
                        this.addTable(view, cfg);
                        cfg.collapsed = true;
                        this.addChart(view, cfg);
                        this.addInfo(view, cfg);
                    }
                }
                //loadReports:    this.loadReports
            }
        };
        this.control(selectors);
    },

    addTable: function(portal, cfg){
        if ((portal.id == 'alternative') && ((cfg === undefined) || (cfg.collapsed === undefined))) {
            if (cfg === undefined) {
                var cfg = this.defaultCfg;
            } else {
                cfg = this.defaultCfg;
            }
        }

        var minCol = this.findMinColumn(portal);
        var portletId = portal.portletCount++;

        var config = $.extend({
            title: LANG.MAIN.PORTAL.TABLE.TITLE + ' ' + portletId,
            store: {            //portal.reports.departmentHours,
                fields: [],
                data: []
            }
        }, (cfg !== undefined) ? cfg : {});
        var newPortlet = Ext.create('widget.gridportlet', config);

        minCol.add(newPortlet);
        newPortlet.doLayout();

        this.addPlaceholder(newPortlet, 29);
    },

    addChart: function(portal, cfg){
        if ((portal.id == 'alternative') && ((cfg === undefined) || (cfg.collapsed === undefined))) {
            if (cfg === undefined) {
                var cfg = this.defaultCfg;
            } else {
                cfg = this.defaultCfg;
            }
        }

        var minCol = this.findMinColumn(portal);
        var portletId = portal.portletCount++;

        var config = $.extend({
            title: LANG.MAIN.PORTAL.CHART.TITLE + ' ' + portletId,
            store: {            //portal.reports.departmentHours,
                fields: [],
                data: []
            },

            leftAxisTitle: LANG.ENTITY.SUPPORT_COUNT,
            leftAxisFields: ['supportCount', 'entityName']
        }, (cfg !== undefined) ? cfg : {});
        var newPortlet = Ext.create('widget.chartportlet', config);
        
        minCol.add(newPortlet);

        this.addPlaceholder(newPortlet);
    },

    addInfo:function(portal, cfg){
        if ((portal.id == 'alternative') && ((cfg === undefined) || (cfg.collapsed === undefined))) {
            if (cfg === undefined) {
                var cfg = this.defaultCfg;
            } else {
                cfg = this.defaultCfg;
            }
        }

        var minCol = this.findMinColumn(portal);
        var portletId = portal.portletCount++;

        var config = $.extend({
            title: LANG.MAIN.PORTAL.INFO.TITLE + ' ' + portletId,
            store: {            //portal.reports.departmentHours,
                fields: [],
                data: []
            }
        }, (cfg !== undefined) ? cfg : {});
        var newPortlet = Ext.create('widget.infoportlet', config);

        minCol.add(newPortlet);

        this.addPlaceholder(newPortlet);
    },

    /*
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
    */

    addPlaceholder: function (portlet, top) {
        var $body        = $('#'+portlet.getId()+' > .x-panel-body');
        $body.append('<div class="or-placeholder">'+LANG.MAIN.PORTAL.SELECT_TO_START+'</div>');

        var $placeholder = $body.children('.or-placeholder');
        if (top !== undefined) {
            $placeholder.css('top', top);
        }
    },

    onAltBeforeExpand: function (panel) {
        Ext.each(panel.up('portal').query('portlet'), function () {
            if (this != panel) {
                this.collapse(panel.collapseDirection);
            }
        });
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
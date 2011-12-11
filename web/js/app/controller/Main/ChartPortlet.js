Ext.define(CONFIG.APP_NS+'.controller.Main.ChartPortlet', {
    extend: 'Ext.app.Controller',

    require: ['Ext.ux.Portlet'],

    views: ['Main.GridPortlet', 'Main.PortletBar'],

    models: ['Load'],
    stores: ['InfoSysHours', 'InfoSysRequests', 'DepartmentHours', 'DepartmentRequests'],

    init: function(){
        this.control({
            'chartportlet':{

            },
            'chartportlet button[action=chooseDepartments]':{
                click: this.chooseDepartments
            },
            'chartportlet button[action=chooseInfoSys]':{
                click: this.chooseInfoSys
            },
            'chartportlet button[action=chooseSupportCount]':{
                click: this.chooseSupportCount
            },
            'chartportlet button[action=chooseHoursSpent]':{
                click: this.chooseHoursSpent
            }
        });
    },

    chooseDepartments: function(btn){
        if(!btn.pressed){
            var portlet = btn.up('chartportlet');
            var portletBar = btn.up('portletbar');
            var portal = portlet.up('portal');

            portletBar.down('button[action=chooseInfoSys]').toggle(false);
            btn.toggle(true);

            //Are we displaying hours or requests?
            var hours = portletBar.down('button[action=chooseHoursSpent]').pressed;

            if (hours){
                portlet.setStore(portal.reports.departmentHours);
            } else {
                portlet.setStore(portal.reports.departmentRequests);
            }
        }
    },

    chooseInfoSys: function(btn){
        if(!btn.pressed){
            var portlet = btn.up('chartportlet');
            var portletBar = btn.up('portletbar');
            var portal = portlet.up('portal');

            portletBar.down('button[action=chooseDepartments]').toggle(false);
            btn.toggle(true);

            //Are we displaying hours or requests?
            var hours = portletBar.down('button[action=chooseHoursSpent]').pressed;

            if (hours){
                portlet.setStore(portal.reports.infoSysHours);
            } else {
                portlet.setStore(portal.reports.infoSysRequests);
            }
        }
    },

    chooseSupportCount: function(btn){
        if(!btn.pressed){
            var portlet = btn.up('chartportlet');
            var portletBar = btn.up('portletbar');
            var portal = portlet.up('portal');

            portletBar.down('button[action=chooseHoursSpent]').toggle(false);
            btn.toggle(true);

            //Are we displaying infoSys or departments?
            var infoSys = portletBar.down('button[action=chooseInfoSys]').pressed;

            if (infoSys){
                portlet.setStore(portal.reports.infoSysRequests);
            } else {
                portlet.setStore(portal.reports.departmentRequests);
            }
        }
    },

    chooseHoursSpent: function(btn){
        if(!btn.pressed){
            var portlet = btn.up('chartportlet');
            var portletBar = btn.up('portletbar');
            var portal = portlet.up('portal');

            portletBar.down('button[action=chooseSupportCount]').toggle(false);
            btn.toggle(true);

            //Are we displaying infoSys or departments?
            var infoSys = portletBar.down('button[action=chooseInfoSys]').pressed;

            if (infoSys){
                portlet.setStore(portal.reports.infoSysHours);
            } else {
                portlet.setStore(portal.reports.departmentHours);
            }
        }
    }
});
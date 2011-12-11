Ext.define(CONFIG.APP_NS+'.controller.Main.GridPortlet', {
    extend: 'Ext.app.Controller',

    require: ['Ext.ux.Portlet'],

    views: ['Main.GridPortlet', 'Main.PortletBar'],

    models: ['Load'],
    stores: ['InfoSysHours', 'InfoSysRequests', 'DepartmentHours', 'DepartmentRequests'],
    
    init: function(){
        this.control({
            'gridportlet':{

            },
            'gridportlet button[action=chooseDepartments]':{
                click: this.chooseDepartments
            },
            'gridportlet button[action=chooseInfoSys]':{
                click: this.chooseInfoSys
            },
            'gridportlet button[action=chooseSupportCount]':{
                click: this.chooseSupportCount
            },
            'gridportlet button[action=chooseHoursSpent]':{
                click: this.chooseHoursSpent
            }
        });
    },

    chooseDepartments: function(btn){
        if(!btn.pressed){
            var portlet = btn.up('gridportlet');
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
            var portlet = btn.up('gridportlet');
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
            var portlet = btn.up('gridportlet');
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
            var portlet = btn.up('gridportlet');
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
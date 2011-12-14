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
            },
            'chartportlet tool[type=save]':{
                click: this.saveImage
            },
            'chartportlet combobox':{
                change: this.onPickerChange
            }
        });
    },

    onPickerChange: function(field, newValue, oldValue, eOpts){ //TODO
        field.up('chartportlet').showSeries(newValue);
    },

    setPickerOptions: function(portletBar, store){
        var picker = portletBar.down('combobox');
        var entityList = [];
        var fields = store.model.prototype.fields.keys;
        for (var i = 0; i < fields.length; i++){
            if (fields[i] != 'startDate'){
                entityList.push({'entity':fields[i]});
            }
        }

        picker.store.loadData(entityList);
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

            this.setPickerOptions(portletBar, portlet.store);
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

            this.setPickerOptions(portletBar, portlet.store);
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

            this.setPickerOptions(portletBar, portlet.store);
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

            this.setPickerOptions(portletBar, portlet.store);
        }
    },

    saveImage: function(tool, e, eOpts){
        alert("omg");
    }
});
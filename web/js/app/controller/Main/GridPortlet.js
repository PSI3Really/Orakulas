Ext.define(CONFIG.APP_NS+'.controller.Main.GridPortlet', {
    extend: 'Ext.app.Controller',

    require: ['Ext.ux.Portlet'],

    views: ['Main.Portal.GridPortlet', 'Main.Portal.PortletBar'],

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
            },
            'gridportlet combobox':{
                change: this.onPickerChange
            }
        });
    },

    onPickerChange: function(field, newValue, oldValue, eOpts){
        var grid = field.up('gridportlet').dataView;
        var columns = grid.columns;
        for (var i = 0; i < columns.length; i++){
            if (columns[i].dataIndex == 'startDate'){ //date column
                continue;
            }

            columns[i].hide();
            for (var j = 0; j < newValue.length; j++){ //TODO: optimize from worst n^2 to 2n - use hashtable
                if (newValue[j] == columns[i].dataIndex){
                    columns[i].show();
                    break;
                }
            }
        }
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
            var portlet = btn.up('gridportlet');
            var portletBar = btn.up('portletbar');
            var maintabpanel = portlet.up('maintabpanel');

            portletBar.down('button[action=chooseInfoSys]').toggle(false);
            btn.toggle(true);

            //Are we displaying hours or requests?
            var hours = portletBar.down('button[action=chooseHoursSpent]').pressed;

            if (hours){
                portlet.setStore(maintabpanel.reports.departmentHours);
                portletBar.down('button[action=chooseHoursSpent]').toggle(true);
                portletBar.down('button[action=chooseSupportCount]').toggle(false);
            } else {
                portlet.setStore(maintabpanel.reports.departmentRequests);
                portletBar.down('button[action=chooseHoursSpent]').toggle(false);
                portletBar.down('button[action=chooseSupportCount]').toggle(true);
            }

            this.setPickerOptions(portletBar, portlet.store);
        }
    },

    chooseInfoSys: function(btn){
        if(!btn.pressed){
            var portlet = btn.up('gridportlet');
            var portletBar = btn.up('portletbar');
            var maintabpanel = portlet.up('maintabpanel');

            portletBar.down('button[action=chooseDepartments]').toggle(false);
            btn.toggle(true);

            //Are we displaying hours or requests?
            var hours = portletBar.down('button[action=chooseHoursSpent]').pressed;

            if (hours){
                portlet.setStore(maintabpanel.reports.infoSysHours);
                portletBar.down('button[action=chooseHoursSpent]').toggle(true);
                portletBar.down('button[action=chooseSupportCount]').toggle(false);
            } else {
                portlet.setStore(maintabpanel.reports.infoSysRequests);
                portletBar.down('button[action=chooseHoursSpent]').toggle(false);
                portletBar.down('button[action=chooseSupportCount]').toggle(true);
            }

            this.setPickerOptions(portletBar, portlet.store);
        }
    },

    chooseSupportCount: function(btn){
        if(!btn.pressed){
            var portlet = btn.up('gridportlet');
            var portletBar = btn.up('portletbar');
            var maintabpanel = portlet.up('maintabpanel');

            portletBar.down('button[action=chooseHoursSpent]').toggle(false);
            btn.toggle(true);

            //Are we displaying infoSys or departments?
            var infoSys = portletBar.down('button[action=chooseInfoSys]').pressed;

            if (infoSys){
                portlet.setStore(maintabpanel.reports.infoSysRequests);
                portletBar.down('button[action=chooseDepartments]').toggle(false);
                portletBar.down('button[action=chooseInfoSys]').toggle(true);
            } else {
                portlet.setStore(maintabpanel.reports.departmentRequests);
                portletBar.down('button[action=chooseDepartments]').toggle(true);
                portletBar.down('button[action=chooseInfoSys]').toggle(false);
            }

            this.setPickerOptions(portletBar, portlet.store);
        }
    },

    chooseHoursSpent: function(btn){
        if(!btn.pressed){
            var portlet = btn.up('gridportlet');
            var portletBar = btn.up('portletbar');
            var maintabpanel = portlet.up('maintabpanel');

            portletBar.down('button[action=chooseSupportCount]').toggle(false);
            btn.toggle(true);

            //Are we displaying infoSys or departments?
            var infoSys = portletBar.down('button[action=chooseInfoSys]').pressed;

            if (infoSys){
                portlet.setStore(maintabpanel.reports.infoSysHours);
                portletBar.down('button[action=chooseDepartments]').toggle(false);
                portletBar.down('button[action=chooseInfoSys]').toggle(true);
            } else {
                portlet.setStore(maintabpanel.reports.departmentHours);
                portletBar.down('button[action=chooseDepartments]').toggle(true);
                portletBar.down('button[action=chooseInfoSys]').toggle(false);
            }

            this.setPickerOptions(portletBar, portlet.store);
        }
    }
});
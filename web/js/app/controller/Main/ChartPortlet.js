Ext.define(CONFIG.APP_NS+'.controller.Main.ChartPortlet', {
    extend: 'Ext.app.Controller',

    require: ['Ext.ux.Portlet'],

    views: ['Main.Portal.GridPortlet', 'Main.Portal.PortletBar'],

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
            var portlet = btn.up('chartportlet');
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
            var portlet = btn.up('chartportlet');
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
            var portlet = btn.up('chartportlet');
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
    },

    saveImage: function(tool, e, eOpts) {
        var chart = tool.up('chartportlet').down('chart');

        var popup = Ext.create('widget.window', {
            id: 'canvas-window',
            title: '~~To save generated image right-click and choose "Save Image As&hellip;"',
            resizable: false,
            layout: 'fit',
            plain: false,
            html: '<canvas width="'+chart.getWidth()+'" height="'+chart.getHeight()+'"></canvas>',
            listeners: {
                afterrender: function (window, eOpts) {
                    var canvas = $('#'+window.getId()).find('canvas')[0];
                    canvg(canvas, $('#'+chart.getId()).html().trim());
                    var img = canvas.toDataURL('image/png');
                    $('canvas').replaceWith('<img src="'+img+'">');

                    window.center();
                }
            }
        }).show();
    }
});
Ext.define(CONFIG.APP_NS+'.controller.Main.ChartPortlet', {
    extend: 'Ext.app.Controller',

    require: ['Ext.ux.Portlet'],

    views: ['Main.Portal.GridPortlet', 'Main.Portal.PortletBar', 'Main.Portal.FilterBar'],

    models: ['Load'],
    stores: ['InfoSysHours', 'InfoSysRequests', 'DepartmentHours', 'DepartmentRequests'],

    init: function(){
        this.control({
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
            'chartportlet button[action=applyFilters]':{
                click: this.applyFilters
            },
            'chartportlet button[action=resetFilters]':{
                click: this.resetFilters
            },
            'chartportlet tool[type=save]':{
                click: this.saveImage
            },
            'chartportlet datefield':{
                change: this.onDateFieldChange
            },
            'chartportlet portletbar button':{
                click: function (btn) {
                    $('#'+btn.up('chartportlet').id+' .or-placeholder').fadeOut('fast');
                }
            }
            /*
            'chartportlet combobox':{
                change: this.onPickerChange
            }
            */
        });
    },

    /*
    onPickerChange: function(field, newValue, oldValue, eOpts){ //TODO
        console.log(newValue);
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
    */

    afterRedraw: function(portlet) {
        var filterBar = portlet.down('filterbar');

        portlet.down('tool[type=save]').setDisabled(false);

        var children = filterBar.query('*');
        Ext.each(children, function () {
            if (this.isDisabled()) {
                this.setDisabled(false);
            }
            if (['combobox', 'datefield'].indexOf(this.getXType()) != -1) {
                this.reset();
            }
        });
        filterBar.child('button[action=resetFilters]').setDisabled(true);

        var picker     = filterBar.down('combobox'),
            entityList = [],
            fields     = portlet.store.model.prototype.fields.keys;
        for (var i = 0; i < fields.length; i++){
            if (fields[i] != 'startDate'){
                entityList.push({ entity: fields[i] });
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

            //this.setPickerOptions(portletBar, portlet.store);
            this.afterRedraw(portlet);
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

            //this.setPickerOptions(portletBar, portlet.store);
            this.afterRedraw(portlet);
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

            //this.setPickerOptions(portletBar, portlet.store);
            this.afterRedraw(portlet);
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

            //this.setPickerOptions(portletBar, portlet.store);
            this.afterRedraw(portlet);
        }
    },

    applyFilters: function(btn) {
        var portlet        = btn.up('chartportlet'),
            filterbar      = btn.up('filterbar'),
            combobox       = filterbar.child('combobox'),
            datefield_from = filterbar.child('datefield'),
            datefield_to   = datefield_from.next(),
            range_from     = datefield_from.getValue(),
            range_to       = datefield_to.getValue(),
            selected       = combobox.getValue();

        if (range_from) range_from = Ext.Date.add(range_from, Ext.Date.MONTH, -1);

        if (range_from || range_to || selected.length) {
            if (range_from || range_to) {
                portlet.store.filterBy(function (record, id) {
                    var start_date = record.get('startDate');
                    if (range_from && !range_to) {
                        return (start_date >= range_from);
                    } else if (range_to && !range_from) {
                        return (start_date <= range_to);
                    }
                    return ((start_date >= range_from) && (start_date <= range_to));
                });
            }

            if (selected.length) {
                portlet.showSeries(selected);
            } else {
                portlet.setStore(portlet.store);
            }
            portlet.store.clearFilter();

            btn.next().enable();
        }
    },

    onDateFieldChange: function(field) {
        var sibling = null;
        if (field.prev().getXType() == 'datefield') {
            sibling = field.prev();
        } else {
            sibling = field.next();
        }

        var sibling_value = sibling.getValue(),
            value         = field.getValue();
        if (value && sibling_value) {
            if ((value.getMonth() == sibling_value.getMonth() && (value.getDay() == sibling_value.getDay()))) {
                Ext.Msg.show({
                    title: LANG.ERROR.TITLE,
                    msg:  LANG.ERROR.INVALID_RANGE,
                    icon:  Ext.MessageBox.ERROR,
                    buttons: Ext.MessageBox.OK,
                    fn: function () {
                        field.reset();
                    }
                });
            }
        }
    },

    resetFilters: function(btn) {
        var portlet   = btn.up('chartportlet'),
            filterbar = btn.up('filterbar');

        portlet.setStore(portlet.store);

        filterbar.child('combobox').reset();
        Ext.each(filterbar.query('datefield'), function () {
            this.reset();
        });

        btn.disable();
    },

    saveImage: function(tool, e, eOpts) {
        var chart = tool.up('chartportlet').down('chart');

        var popup = Ext.create('widget.window', {
            id: 'canvas-window',
            title: LANG.MAIN.PORTAL.SAVE_PICTURE_AS,
            resizable: false,
            layout: 'fit',
            modal: true,
            width: chart.getWidth() + 12,
            height: chart.getHeight() + 34,
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
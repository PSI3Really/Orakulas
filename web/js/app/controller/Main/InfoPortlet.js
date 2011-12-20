Ext.define(CONFIG.APP_NS+'.controller.Main.InfoPortlet', {
    extend: 'Ext.app.Controller',

    require: ['Ext.ux.Portlet'],

    views: ['Main.Portal.InfoPortlet', 'Main.Portal.PortletBar', 'Main.Portal.AnalysisBar'],

    models: ['Load'],
    stores: ['InfoSysHours', 'InfoSysRequests', 'DepartmentHours', 'DepartmentRequests'],

    init: function(){
        this.control({
            'infoportlet':{

            },
            'infoportlet button[action=chooseDepartments]':{
                click: this.chooseDepartments
            },
            'infoportlet button[action=chooseInfoSys]':{
                click: this.chooseInfoSys
            },
            'infoportlet button[action=chooseSupportCount]':{
                click: this.chooseSupportCount
            },
            'infoportlet button[action=chooseHoursSpent]':{
                click: this.chooseHoursSpent
            },
            'infoportlet button[action=applyAnalysis]':{
                click: this.applyAnalysis
            },
            'infoportlet combobox':{
                //change: this.onPickerChange
            },
            'infoportlet portletbar button':{
                click: function (btn) {
                    $('#'+btn.up('infoportlet').id+' .or-placeholder').fadeOut('fast');
                }
            }
        });
    },

    applyAnalysis: function(btn){
        var portlet         = btn.up('infoportlet'),
            analysisBar      = btn.up('analysisbar'),
            combobox        = analysisBar.child('combobox'),
            datefieldFrom   = analysisBar.child('datefield'),
            datefieldTo     = datefieldFrom.next(),
            intervalPicker  = analysisBar.child('numberfield'),
            rangeFrom       = datefieldFrom.getValue(),
            rangeTo         = datefieldTo.getValue(),
            selected        = combobox.getValue(),
            intervalSize    = intervalPicker.getValue();

        if (!selected || selected == ""){
            return;
        }

        if (rangeFrom) {
            rangeFrom.setDate(1);
        } else {
            rangeFrom = portlet.store.min('startDate');
        }
        if (rangeTo) {
            rangeTo.setDate(1);
        } else {
            rangeTo = portlet.store.max('startDate');
        }
        
        if (!intervalSize){
            intervalSize = 1;
        }

        var records = portlet.store.queryBy(function(record){
            var startDate = record.get('startDate');
            if (!rangeFrom || rangeFrom <= startDate){
                if (!rangeTo || startDate <= rangeTo){
                    return true;
                }
            }
            return false;
        })

        records.sort('startDate', 'ASC');

        var minValue = Number.MAX_VALUE;
        var minDateStart = 0;
        var maxValue = Number.MIN_VALUE;
        var maxDateStart = 0;

        for (var i = 0; i <= records.getCount() - intervalSize; i++){ //go through all records
            //Calc sum of values
            var sum = 0;
            for (var  j = 0; j < intervalSize; j++){
                for (var idx in selected){
                    var entityName = selected[idx];

                    sum += records.getAt(i + j).get(entityName);
                }
            }

            if (sum < minValue){
                minValue = sum;
                minDateStart = records.getAt(i).get('startDate');
            }

            if (sum > maxValue){
                maxValue = sum;
                maxDateStart = records.getAt(i).get('startDate');
            }
        }

        var data = {
            rangeFrom: rangeFrom,
            rangeTo: rangeTo,
            selected: selected,
            intervalSize: intervalSize,

            minValue: minValue,
            minDateStart: minDateStart,
            maxValue: maxValue,
            maxDateStart: maxDateStart
        }

        portlet.setData(data);
    },

    setPickerOptions: function(picker, store){
        var entityList = [];
        var fields = store.model.prototype.fields.keys;
        for (var i = 0; i < fields.length; i++){
            if (fields[i] != 'startDate'){
                entityList.push({'entity':fields[i]});
            }
        }

        picker.store.loadData(entityList);
    },

    afterSetStore: function(portlet){
        var analysisBar = portlet.down('analysisbar');

        this.setPickerOptions(analysisBar.down('combobox'), portlet.store)

        var children = analysisBar.query('*');
        Ext.each(children, function () {
            if (this.isDisabled()) {
                this.setDisabled(false);
            }
            if (['combobox', 'datefield'].indexOf(this.getXType()) != -1) {
                this.reset();
            }
        });
    },

    chooseDepartments: function(btn){
        if(!btn.pressed){
            var portlet = btn.up('infoportlet');
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

            this.afterSetStore(portlet);
        }
    },

    chooseInfoSys: function(btn){
        if(!btn.pressed){
            var portlet = btn.up('infoportlet');
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

            this.afterSetStore(portlet);
        }
    },

    chooseSupportCount: function(btn){
        if(!btn.pressed){
            var portlet = btn.up('infoportlet');
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

            this.afterSetStore(portlet);
        }
    },

    chooseHoursSpent: function(btn){
        if(!btn.pressed){
            var portlet = btn.up('infoportlet');
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

            this.afterSetStore(portlet);
        }
    }
});
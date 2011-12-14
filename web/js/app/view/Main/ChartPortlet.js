Ext.define(CONFIG.APP_NS+'.view.Main.ChartPortlet', {
    extend: 'Ext.ux.Portlet',
    alias: 'widget.chartportlet',

    width: 200,

    leftAxisFields: null,
    leftAxisTitle: null,

    initComponent: function(){
        if (!this.leftAxisTitle)
            this.leftAxisTitle = LANG.ENTITY.LOAD;
        if (!this.leftAxisTitle)
            this.leftAxisTitle = LANG.ENTITY.HOURS_SPENT;

        this.dataView = Ext.create('Ext.chart.Chart', {
            store: this.store,

            legend: {
                position: 'right'
            },
            axes: [{
                type: 'Time',
                position: 'bottom',
                fields: ['startDate'],
                dateFormat: 'Y m',
                grid: true,
                label: {
                    rotate: {
                        degrees: 315
                    }
                }
            },{
                type: 'Numeric',
                position: 'left',
                fields: ['Padalinys 1'],
                title: this.leftAxisTitle,
                grid: true
            }],
            series: [/*{
                type: 'line',
                axis: 'left',
                highlight: true,
                xField: 'startDate',
                yField: 'Padalinys 1'
            }*/]
        })

        this.items = [
            this.dataView
        ];

        this.dockedItems = [{
            xtype: 'portletbar',
            dock: 'top'
        }];

        this.tools = [{
            type: 'save'

        }];

        this.callParent();
    },

    removeOldSeries: function(){
        for (var i = 0; i<this.dataView.series.getCount(); i++){
            var series = this.dataView.series.getAt(i);
            var group = series.group;
            while(group.getCount() > 0){
                group.first().remove();
            }

            var shadows = series.line.shadows;
            for (var sIdx = 0; sIdx < shadows.length; sIdx++){
                shadows[sIdx].remove();
            }

            series.line.remove();
        };

        this.dataView.series.clear();
    },

    showSeries: function(fields){
        this.removeOldSeries();

        this.dataView.axes.items[1].fields = fields;

        for (var i = 0; i<fields.length; i++){
            this.dataView.series.add({type: 'line', axis: 'left', highlight: true, xField: 'startDate', yField: fields[i]});
        }

        this.dataView.refresh();
    },

    setStore: function(store){ //TODO
        this.store = store;

        this.dataView.store = store;

        this.showSeries(this.store.model.prototype.fields.keys.slice(1)); //don't show [0] - startDate
    }
});
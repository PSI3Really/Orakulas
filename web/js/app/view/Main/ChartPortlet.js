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
                grid: true
            },{
                type: 'Numeric',
                position: 'left',
                fields: ['Padalinys 1'],
                title: this.leftAxisTitle,
                grid: true
            }],
            series: [{
                type: 'line',
                axis: 'left',
                highlight: true,
                xField: 'startDate',
                yField: 'Padalinys 1'
            }]
        })

        this.items = [
            this.dataView
        ];

        this.dockedItems = [{
            xtype: 'portletbar',
            dock: 'top'
        }];

        this.callParent();
    },

    setStore: function(store){ //TODO
        this.store = store;

        debugger;

        for (var i = 0; i<this.dataView.series.getCount(); i++){
            var series = this.dataView.series.getAt(i);
            var group = series.group;
            while(group.getCount() > 0){
                group.first().remove();
            }
            /*

            var markerGroup = series.markerGroup;
            while (markerGroup.getCount() > 0){
                markerGroup.first().remove();
            }
            series.line.remove();
            var shadowGroups = series.shadowGroups;
            while (shadowGroups.getCount() > 0){
                shadowGroups.first().remove();
            }
            */
        }

        debugger;

        var fields = this.store.model.prototype.fields.keys;

        this.dataView.series.clear();
        this.dataView.axes.items[1].fields = fields;

        for (var i = 1; i<fields.length; i++){
            this.dataView.series.add({type: 'line', axis: 'left', highlight: true, xField: 'startDate', yField: fields[i]});
        }

        //debugger;

        this.dataView.store = store;
        this.dataView.refresh();
    }
});
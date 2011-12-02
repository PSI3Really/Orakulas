Ext.define(CONFIG.APP_NS+'.view.Main.ChartPortlet', {
    extend: 'Ext.ux.Portlet',
    alias: 'widget.chartportlet',

    height: 300,

    store: null,
    leftAxisFields: null,
    leftAxisTitle: null,

    initComponent: function(){
        if (!this.leftAxisTitle)
            this.leftAxisTitle = LANG.ENTITY.LOAD;

        this.items = {
            xtype: 'chart',
            store: this.store,
            legend: {
                position: 'bottom'
            },
            axes: [{
                type: 'Numeric',
                position: 'left',
                fields: this.leftAxisFields,
                title: this.leftAxisTitle
            },{
                type: 'Time',
                position: 'bottom',
                fields: ['startDate'],
                dateFormat: 'Y m',
                grid: false
            }],
            series: [{
                type: 'column',
                axis: 'left',
                highlight: true,
                xField: 'startDate',
                yField: this.leftAxisFields[0]
            }]
        };

        this.callParent();
    }
});
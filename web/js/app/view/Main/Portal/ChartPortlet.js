Ext.define(CONFIG.APP_NS+'.view.Main.Portal.ChartPortlet', {
    extend: 'Ext.ux.Portlet',
    alias: 'widget.chartportlet',

    width: 200,

    leftAxisTitle: null,

    colors:       ['#FF3333', '#FF8533', '#FFAD33', '#FFD633', '#FFFF33', '#BCEB2F', '#2BD62B', '#2BABD6', '#2B72D6', '#472BD6', '#9D2BD6', '#E02D96'],
    colorsBright: ['#FF9999', '#FFC299', '#FFD699', '#FFEB99', '#FFFF99', '#DCF593', '#8DEB8D', '#8DD3EB', '#8DB4EB', '#9C8DEB', '#CB8DEB', '#F090C8'],

    initComponent: function(){
        this.shuffle(this.colors);
        this.shuffle(this.colorsBright);

        this.dataView = Ext.create('Ext.chart.Chart', {
            store: this.store,

            legend: {
                position: 'right',
                boxFill: '#F3F6FC',
                itemSpacing: 5,
                labelFont: '11px Helvetica, Arial, sans-serif'
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
                    },
                    font: '10px Helvetica, Arial, sans-serif'
                }
            },{
                type: 'Numeric',
                position: 'left',
                title: this.leftAxisTitle,
                grid: true,
                label: {
                    font: '10px Helvetica, Arial, sans-serif'
                }
            }],
            series: [],

            shadow: false,
            background: {
                fill: '#FFF'
            }
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

            /* shadows were removed
            var shadows = series.line.shadows;
            for (var sIdx = 0; sIdx < shadows.length; sIdx++){
                shadows[sIdx].remove();
            }
            */

            series.line.remove();
        };

        this.dataView.series.clear();
    },

    showSeries: function(fields){
        this.removeOldSeries();

        this.dataView.axes.items[1].fields = fields;

        var colorSource = this.colors;
        var colors = colorSource.slice(0);
        for (var i = 0; i<fields.length; i++){
            if (!colors.length) {
                colorSource = (colorSource == this.colors) ? this.colorsBright : this.colors;
                colors = colorSource.splice(0);
            }
            var color = colors.pop();
            this.dataView.series.add({
                type: 'line',
                axis: 'left',
                xField: 'startDate',
                yField: fields[i],
                selectionTolerance: 3,
                tips: {
                    trackMouse: true,
                    renderer: function (storeItem, item) {
                        var date  = storeItem.get('startDate'),
                            value = item.value[1],
                            label = null;

                        $.each(storeItem.data, function (key, val) {
                            if (val == value) {
                                label = key;
                            }
                        });
                        this.setTitle('<span style="font-size: 12px">'+label+'</span><br>'+Ext.Date.format(date, 'Y F').toLowerCase());
                        this.update(item.series.chart.axes.map.left.title+': '+value);
                    }
                },
                smooth: true,
                style: {
                    stroke: color,
                    'stroke-width': 2
                },
                markerConfig: {
                    type: 'circle',
                    radius: 2,
                    'stroke-width': 0,
                    fill: color
                },
                highlight: true,
                highlightCfg: {
                    fill: color,
                    radius: 5,
                    stroke: color
                }
            });
        }

        this.dataView.refresh();
    },

    setStore: function(store){ //TODO
        this.store = store;

        this.dataView.store = store;

        this.dataView.axes.items[1].title = store.typeName;

        this.showSeries(this.store.model.prototype.fields.keys.slice(1)); //don't show [0] - startDate
    },

    // helper methods
    shuffle: function (array) {
        var tmp, current, top = array.length;

        if(top) while(--top) {
            current = Math.floor(Math.random() * (top + 1));
            tmp = array[current];
            array[current] = array[top];
            array[top] = tmp;
        }

        return array;
    }
});
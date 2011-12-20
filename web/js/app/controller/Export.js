Ext.define(CONFIG.APP_NS+'.controller.Export', {
    extend: 'Ext.app.Controller',

    views: ['Export.Window', 'Export.Controls'],

    init: function(){
        this.control({
            'exportwindow button[action=accept]':{
                click: this.accept
            },
            'exportwindow button[action=cancel]':{
                click: this.cancel
            }
        });
    },

    accept: function(btn){
        var me = this;

        var cont   = btn.up('exportcontrols'),
            panels = cont.down('checkboxgroup').getValue(),
            form   = cont.getForm();

        var panels_tmp = [];
        for (var key in panels) {
            panels_tmp.push(panels[key]);
        }
        panels = panels_tmp;

        if (form.isValid()) {
            var windw = window.open('excel/download/generating');

            var data = {
                filename: cont.down('textfield').getValue()+'.'+cont.down('combobox').getValue(),
                tables: {},
                images: {},
                analysis: {}
            };

            var i_grid = 0,
                i_chart = 0,
                i_info = 0;

            var charts = [];
            Ext.each(panels, function () {
                switch (this.getXType()) {
                    case 'gridportlet':
                        var name = LANG.MAIN.PORTAL.TABLE.TITLE+(++i_grid);
                        data.tables[name] = [];

                        this.store.each(function (rec) {
                            if (!data.tables[name].length) {
                                var fields = [];
                                rec.fields.each(function () {
                                    fields.push(this.name);
                                });
                                data.tables[name].push(fields);
                            }
                            var recs = [];
                            for (var i = 0; i < data.tables[name][0].length; i++) {
                                var val = rec.get(data.tables[name][0][i]);
                                if (val instanceof Date) {
                                    val = Ext.Date.format(val, 'Y-m');
                                }
                                recs.push(val);
                            }
                            data.tables[name].push(recs);
                        });

                        break;
                    case 'chartportlet':
                        data.images[LANG.MAIN.PORTAL.CHART.TITLE+(++i_chart)] = '';

                        charts.push(this);

                        break;
                    case 'infoportlet':
                        var name = LANG.MAIN.PORTAL.INFO.TITLE+(++i_info);
                        data.analysis[name] = [];

                        var fields = this.query('form > textfield');
                        Ext.each(fields, function () {
                            data.analysis[name].push([this.getFieldLabel(), this.getValue()]);
                        });

                        break;
                }
            });

            if (i_chart) {
                var images = [];
                for (var i = 0; i < i_chart; i++) {
                    this.convertToPng(charts[i].down('chart'), function (img) {
                        Ext.Ajax.request({
                            url: 'excel/savePng',
                            params: {
                                imageData: Ext.JSON.encode({
                                    name:  cont.down('textfield').getValue()+'_chart-'+i,
                                    image: img
                                })
                            },
                            success: function (response) {
                                var response_json = Ext.JSON.decode(response.responseText);
                                if (response_json.success) {
                                    images.push(response_json.url);
                                    if (images.length == i_chart) {
                                        var j = 0;
                                        for (var k = 0; k < images.length; k++) {
                                            data.images[LANG.MAIN.PORTAL.CHART.TITLE+(++j)] = images[k];
                                        }

                                        me.finalRequest(data, function (url) {
                                            windw.location.href = url;

                                            btn.up('exportwindow').close()
                                        });
                                    }
                                }
                            }
                        });
                    });
                }
            } else {
                me.finalRequest(data, function (url) {
                    windw.location.href = url;

                    btn.up('exportwindow').close()
                });
            }
        }
    },

    cancel: function(btn){
        btn.up('exportwindow').close();
    },

    convertToPng: function(chart, callback) {
        $('body').append('<canvas width="'+chart.getWidth()+'" height="'+chart.getHeight()+'" style="display: none"></canvas>');
        var canvas = $('body > canvas:last')[0];
        canvg(canvas, $('#'+chart.getId()).html().trim());
        var img = canvas.toDataURL('image/png').replace('data:image/png;base64,', '');
        $(canvas).remove();

        callback(img);
    },

    finalRequest: function (data, callback) {
        Ext.Ajax.request({
            url: 'excel/export',
            params: {
                data: Ext.JSON.encode(data)
            },
            success: function (response) {
                var response_json = Ext.JSON.decode(response.responseText);

                callback(response_json.url);
            }
        });
    }
});
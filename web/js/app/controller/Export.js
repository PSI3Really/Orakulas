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
        var cont = btn.up('exportcontrols');
        var form = cont.getForm();
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
            Ext.each(cont.panels, function () {
                switch (this.getXType()) {
                    case 'gridportlet':
                        data.tables[LANG.MAIN.PORTAL.TABLE.TITLE+(++i_grid)] = [];

                        break;
                    case 'chartportlet':
                        data.images[LANG.MAIN.PORTAL.CHART.TITLE+(++i_chart)] = '';

                        charts.push(this);

                        break;
                    case 'infoportlet':
                        data.analysis[LANG.MAIN.PORTAL.INFO.TITLE+(++i_info)] = [];

                        break;
                }
            });

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
                                    };

                                    Ext.Ajax.request({
                                        url: 'excel/export',
                                        params: {
                                            data: Ext.JSON.encode(data)
                                        },
                                        success: function (response) {
                                            var response_json = Ext.JSON.decode(response.responseText);

                                            windw.location.href = response_json.url;
                                        }
                                    });
                                }
                            }
                        }
                    });
                });
            }

            //btn.up('exportwindow').close();
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
    }
});
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
            Ext.each(cont.panels, function () {
                switch (this.getXType()) {
                    case 'gridportlet':
                        data.tables[LANG.MAIN.PORTAL.TABLE.TITLE+(++i_grid)] = {};

                        break;
                    case 'chartportlet':
                        data.tables[LANG.MAIN.PORTAL.CHART.TITLE+(++i_chart)] = {};


                        break;
                    case 'infoportlet':
                        data.tables[LANG.MAIN.PORTAL.INFO.TITLE+(++i_info)] = {};

                        break;
                }
            });

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

            //btn.up('exportwindow').close();
        }
    },

    cancel: function(btn){
        btn.up('exportwindow').close();
    }
});
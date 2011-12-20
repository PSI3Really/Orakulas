Ext.require('Ext.container.Viewport');
Ext.require('Ext.Ajax');
Ext.require('Ext.chart.*');

var LANG = null;
var LANG_CODE = 'lt';
var CURRENT_USER = null;

Ext.application({
    name: CONFIG.APP_NS,
    appFolder: '../js/app',

    paths: {
        'Ext.ux': '../js/ux'
    },
    models: [ //TODO: remove, only load when needed
        'Admin.User',
        'Admin.Department',
        'Admin.InformationalSystem',
        'Admin.DepartmentInfoSysUsage'
    ],
    stores: [ //TODO: remove, only load when needed
        'Admin.Users',
        'Admin.Departments',
        'Admin.InformationalSystems',
        'Admin.DepartmentInfoSysUsages'
    ],
    controllers: [
        'Main.Main',
        'Main.Portal',
        'Main.GridPortlet',
        'Main.ChartPortlet',
        'Main.InfoPortlet',
        'Main.Tab',
        'Import',
        'Export',
        'Predict',
        'Admin.Admin',
        'Admin.Users',
        'Admin.Departments',
        'Admin.InformationalSystems',
        'Admin.SupportTypes',
        'Admin.SupportQuantities',
        'Admin.PersonalSettings'
    ],

    require:[
        CONFIG.APP_NS+'.util.DynamicReader',
        CONFIG.APP_NS+'.util.DynamicReaderJSON'
    ],

    launch: function(){

        /*
        Ext.override(Ext.view.Table, { //Allows the selecting of grid cells
           afterRender: function() {
               var me = this;

               me.callParent();
               me.mon(me.el, {
                   scroll: me.fireBodyScroll,
                   scope: me
               });
               if (!me.featuresMC &&
                   (me.featuresMC.findIndex('ftype', 'unselectable') >= 0)) {
                   me.el.unselectable();
               }

               me.attachEventsForFeatures();
           }
        });
        */

        var params = Ext.urlDecode(window.location.search.substring(1));

        var lang = params.lang ? params.lang : CONFIG.DEFAULT_LANG;

        var urlExt = Ext.util.Format.format('../js/locale/ext-lang-{0}.js', lang);
        var urlApp = Ext.util.Format.format('../js/locale/{0}-lang-{1}.json', CONFIG.APP_NS, lang);
        
        Ext.Ajax.request({
            url:  'model/users/current',
            success: function(response){
                CURRENT_USER = Ext.create('widget.adminUserModel', Ext.JSON.decode(response.responseText, true));

                Ext.Ajax.request({ //ExtJS localization
                    url: urlExt,
                    success: function(response){ //change the language
                        eval(response.responseText);
                    },
                    failure: function(){
                        Ext.Msg.alert('Failure', 'Failed to load locale file.');
                    },
                    scope: this
                });

                Ext.Ajax.request({ //Orakulas localization
                    url: urlApp,
                    success: function(response){

                        var text = response.responseText;

                        LANG = Ext.JSON.decode(text, true);
                        LANG_CODE = lang;

                        Ext.override(Ext.grid.View,{
                            loadingText: LANG.LOADING.LOADING
                        });

                        Ext.create(CONFIG.APP_NS+'.view.Viewport');
                    }
                });
            },
            failure: function(){
                Ext.Msg.alert('Failure', 'Could not get user');
            },
            scope: this
        });


    }
});

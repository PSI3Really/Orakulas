Ext.require(['Ext.container.Viewport']);
Ext.require(['Ext.Ajax']);

var LANG = null;
var LANG_CODE = 'lt';

Ext.application({
    name: CONFIG.APP_NS,
    appFolder: '../js/app',
    //autoCreateViewport: true,

    paths: {
        'Ext.ux': '../js/ux'
    },

    models: [
        'Admin.User',
        'Admin.Department',
        'Admin.InformationalSystem',
        'Admin.DepartmentInfoSysUsage',
        'Report'
    ],

    stores: [
        'Admin.Users',
        'Admin.Departments',
        'Admin.InformationalSystems',
        'Admin.DepartmentInfoSysUsages'
    ],
    //*/

    controllers: [
        'Main.Main',
        'Main.Portal',
        'Main.Tab',
        'Import',
        'Export',
        'Predict',
        'Admin.Admin',
        'Admin.Users',
        'Admin.Departments',
        'Admin.InformationalSystems',
        'Admin.SupportTypes',
        'Admin.PersonalSettings'
    ],

    launch: function(){
        var params = Ext.urlDecode(window.location.search.substring(1));
        
        var lang = params.lang ? params.lang : CONFIG.DEFAULT_LANG;

        var urlExt = Ext.util.Format.format('../js/locale/ext-lang-{0}.js', lang);
        var urlApp = Ext.util.Format.format('../js/locale/{0}-lang-{1}.json', CONFIG.APP_NS, lang);

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
                Ext.create(CONFIG.APP_NS+'.view.Viewport');
            }
        });
    }
});

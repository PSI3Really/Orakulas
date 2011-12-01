Ext.define(CONFIG.APP_NS+'.controller.Admin.PersonalSettings', {
    extend: 'Ext.app.Controller',

    views: [
        'Admin.PersonalSettings.PersonalSettingsPanel',
        'Admin.PersonalSettings.Window'
    ],

    init: function(){
        this.control({
            'adminpersonalsettingswindow button[action=confirm]':{
                click: this.confirm
            },
            'adminpersonalsettingswindow button[action=cancel]':{
                click: this.cancel
            }
        });
    },

    confirm: function() {
        alert('TO DO: confirm');
    },

    cancel: function(btn) {
        btn.up('adminpersonalsettingswindow').close();
    }
});
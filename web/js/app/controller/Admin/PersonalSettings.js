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

    confirm: function(btn) {
        var panel = btn.up('adminpersonalsettingspanel');
        var oldpassword = panel.down('textfield[name=oldpassword]');
        var newpassword = panel.down('textfield[name=newpassword]');
        var repeatpassword = panel.down('textfield[name=newpasswordagain]');


        if((oldpassword.value.length == 0) || (newpassword.value.length == 0) || (repeatpassword.value.length == 0)) {
            Ext.Msg.alert('~~Klaida', '~~Visus laukelius užpildyti būtina');
            repeatpassword.setValue('');
        }
        else {
            if(newpassword.value == repeatpassword.value) {
                var paramet = {
                    id: CURRENT_USER.get('id'),
                    password: newpassword.value
                };
                
                Ext.Ajax.request({
                    url : 'model/users/update',
                    method: 'POST',
                    params: {
                        jsonValue: Ext.encode(paramet)
                    }
                });

                btn.up('adminpersonalsettingswindow').close();
            }
            else {
                Ext.Msg.alert('~~Klaida', '~~Slaptazodziai nesutampa');
            }
        }

    },

    cancel: function(btn) {
        btn.up('adminpersonalsettingswindow').close();
    }
});
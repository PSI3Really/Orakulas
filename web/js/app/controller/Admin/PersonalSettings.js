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

    confirm: function(btn) { //TODO: change error messages to validations
        var panel = btn.up('adminpersonalsettingspanel');
        var oldpassword = panel.down('textfield[name=oldpassword]');
        var newpassword = panel.down('textfield[name=newpassword]');
        var repeatpassword = panel.down('textfield[name=newpasswordagain]');


        if(newpassword.value == repeatpassword.value) {
            var params = {
                id: CURRENT_USER.get('id'),
                oldPassword: oldpassword.value,
                password: newpassword.value
            };

            Ext.Ajax.request({
                url : 'model/users/update',
                method: 'POST',
                params: {
                    jsonValue: Ext.encode(params)
                },
                success: function() {
                    btn.up('adminpersonalsettingswindow').close();
                },
                failure: function() {
                    Ext.Msg.alert(LANG.ERROR.TITLE, LANG.ERROR.PASSWORD_INCORRECT);
                    oldpassword.setValue('');
                }
            });
        }
        else {
            Ext.Msg.alert(LANG.ERROR.TITLE, LANG.ERROR.PASSWORD_MISMATCH);
            newpassword.setValue('');
            repeatpassword.setValue('');
        }

    },

    cancel: function(btn) {
        btn.up('adminpersonalsettingswindow').close();
    }
});
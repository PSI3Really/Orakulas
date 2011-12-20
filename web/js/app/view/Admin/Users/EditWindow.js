Ext.define(CONFIG.APP_NS+'.view.Admin.Users.EditWindow', {
    extend: 'Ext.window.Window',
    alias:  'widget.adminUsersEditWindow',
    
    editing: false, //Are we creating a new user or editing an existing one?
    record: Ext.create('widget.adminUserModel'),
    store: null,
    saved: false,

    initComponent: function() {
        this.layout = 'fit';
        this.floatable = true;
        this.modal = true;
        this.width = 330;
        this.height = 230;

        if (this.editing){
            this.title = LANG.ADMIN.USERS.TITLE_CHANGE + this.record.get('username');
        } else {
            this.title = LANG.ADMIN.USERS.TITLE_NEW;
        }

        this.items = [
            {
                xtype: 'form',
                plain: true,
                border: false,
                bodyPadding: 5,
                defaultType: 'textfield',
                fieldDefaults: {
                    labelWidth: 100,
                    anchor: '100%'
                },
                layout: {
                    type: 'vbox',
                    align: 'stretch'
                },
                items: [{ // SOME REAL BLACK MAGIC HERE GUYS
                    fieldLabel: LANG.ENTITY.USERNAME, //Show this if we are creating a new user
                    name: 'username',
                    value: this.record.get('username'),
                    allowBlank: false,
                    hidden: this.editing,
                    readOnly: this.editing //do not let them change their user name
                },{
                    fieldLabel: LANG.ENTITY.USERNAME, //Show this if we are editing an existing user
                    value: this.record.get('username'),
                    hidden: !this.editing,
                    disabled: true
                },{
                    fieldLabel: LANG.ENTITY.PASSWORD,
                    name: 'password',
                    inputType:'password',
                    allowBlank: false
                },{
                    fieldLabel: LANG.ENTITY.FIRST_NAME,
                    name: 'firstName',
                    value: this.record.get('firstName')
                },{
                    fieldLabel: LANG.ENTITY.LAST_NAME,
                    name: 'lastName',
                    value: this.record.get('lastName')
                },{
                    fieldLabel: LANG.ENTITY.EMAIL,
                    name: 'email',
                    value: this.record.get('email'),
                    vtype: 'email'
                },{
                    fieldLabel: LANG.ENTITY.ADMIN + "?",
                    name: 'admin',
                    checked: this.record.get('admin'),
                    inputValue: 'true',
                    disabled: this.record.get('id') == CURRENT_USER.get('id'),
                    xtype: 'checkbox'
                }],

                buttons:[{
                    //formBind: true,
                    text: LANG.BUTTON.SAVE,
                    action: 'save'
                },{
                    text: LANG.BUTTON.CANCEL,
                    action: 'cancel'
                }]
            }
        ];
        this.callParent(arguments);
    }
});
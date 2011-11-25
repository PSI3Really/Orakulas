Ext.define(CONFIG.APP_NS+'.view.Admin.Users.EditWindow', {
    extend: 'Ext.window.Window',
    alias:  'widget.adminUsersEditWindow',

    //TODO: disallow changing your own admin rights

    editing: false, //Are we creating a new user or editing an existing one?
    record: Ext.create('widget.adminUserModel'),
    store: null,
    saved: false,

    initComponent: function() {
        this.layout = 'fit';
        this.floatable = true;
        this.modal = true;

        if (this.editing){
            this.title = 'Keičiamas vartotojas ' + this.record.get('username');
        } else {
            this.title = 'Naujas vartotojas';
        }

        this.items = [
            {
                xtype: 'form',
                border: false,
                defaultType: 'textfield',
                items: [{ // SOME REAL BLACK MAGIC HERE GUYS
                    fieldLabel: 'Vartotojo vardas', //Show this if we are creating a new user
                    name: 'username',
                    value: this.record.get('username'),
                    allowBlank: false,
                    hidden: this.editing,
                    readOnly: this.editing //do not let them change their user name
                },{
                    fieldLabel: 'Vartotojo vardas', //Show this if we are editing an existing user
                    value: this.record.get('username'),
                    hidden: !this.editing,
                    disabled: true
                },{
                    fieldLabel: 'Slaptažodis',
                    name: 'password',
                    allowBlank: false
                },{
                    fieldLabel: 'Vardas',
                    name: 'firstName',
                    value: this.record.get('firstName')
                },{
                    fieldLabel: 'Pavardė',
                    name: 'lastName',
                    value: this.record.get('lastName')
                },{
                    fieldLabel: 'El. Paštas',
                    name: 'email',
                    value: this.record.get('email'),
                    vtype: 'email'
                },{
                    fieldLabel: 'Administratorius?',
                    name: 'admin',
                    checked: this.record.get('admin'),
                    inputValue: 'true',
                    xtype: 'checkbox'
                }],

                buttons:[{
                    //formBind: true,
                    text: 'Išsaugoti',
                    action: 'save'
                },{
                    text: 'Atšaukti',
                    action: 'cancel'
                }]
            }
        ];
        this.callParent(arguments);
    }
});
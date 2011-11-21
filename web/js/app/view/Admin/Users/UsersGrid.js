Ext.define(CONFIG.APP_NS+'.view.Admin.Users.UsersGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.adminusersgrid',

    //store: CONFIG.APP_NS+'.store.Users', //Does not seem to work

    initComponent: function() {
        this.border = false;
        
        this.store = Ext.create('widget.adminUsersStore', {});

        this.columns = [
            {header: 'Vartotojas',          dataIndex: 'username',  flex: 0},
            {header: 'Vardas',              dataIndex: 'firstName', flex: 0},
            {header: 'Pavardė',             dataIndex: 'lastName',  flex: 0},
            {header: 'El. paštas',          dataIndex: 'email',     flex: 1},
            {header: 'Administratorius?',   dataIndex: 'admin',     flex: 0,
                renderer: this.boolRenderer
            }
        ];

        this.store.load();

        this.callParent(arguments);
    },

    boolRenderer: function(value){
        var checkBox = '';
        var imgCls = 'icon-tick';
        if (value){
            checkBox = '<div class="' + imgCls + '">&#160;</div>';
        }
        return checkBox;
    }
});
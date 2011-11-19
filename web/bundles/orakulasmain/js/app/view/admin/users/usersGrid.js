Ext.define(CONFIG.APP_NS+'.view.admin.users.UsersGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.adminusersgrid',

    initComponent: function() {
        this.store = {
            fields: ['name', 'email', 'veiksmai'],
            data  : []
        };
        
        this.columns = [
            {header: 'Vartotojo vardas',  dataIndex: 'name',  flex: 1},
            {header: 'Vartotojo lenteles', dataIndex: 'email', flex: 1},
            {header: 'Veiksmai', dataIndex: 'veiksmai', flex: 1}
        ];

        this.callParent(arguments);
    }
});
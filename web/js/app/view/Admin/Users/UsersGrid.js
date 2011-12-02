Ext.define(CONFIG.APP_NS+'.view.Admin.Users.UsersGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.adminusersgrid',

    initComponent: function() {
        this.border = false;
        
        this.store = Ext.create('widget.adminUsersStore', {});

        this.columns = [
            {header: LANG.ENTITY.USERNAME,      dataIndex: 'username',  flex: 0},
            {header: LANG.ENTITY.FIRST_NAME,    dataIndex: 'firstName', flex: 0},
            {header: LANG.ENTITY.LAST_NAME,     dataIndex: 'lastName',  flex: 0},
            {header: LANG.ENTITY.EMAIL,         dataIndex: 'email',     flex: 1},
            {header: LANG.ENTITY.ADMIN + "?",   dataIndex: 'admin',     flex: 0,
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
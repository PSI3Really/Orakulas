Ext.define(CONFIG.APP_NS+'.view.Admin.InformationalSystems.ISGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.adminisgrid',

    //store: CONFIG.APP_NS+'.store.Users', //Does not seem to work

    initComponent: function() {
        this.store = Ext.create('widget.adminInformationalSystemsStore', {});

        this.columns = [
            {
                header: LANG.ENTITY.CODE,
                dataIndex: 'code',
                flex: 0,

                editor: {
                    xtype: 'textfield'
                }
            },
            {
                header: LANG.ENTITY.INFO_SYS,
                dataIndex: 'name',
                flex: 1,

                editor: {
                    xtype: 'textfield'
                }
            }
        ];

        this.store.load();

        this.plugins = [
            Ext.create('Ext.grid.plugin.RowEditing', {
                clicksToEdit: 2
            })
        ];


        this.callParent(arguments);
    }
});
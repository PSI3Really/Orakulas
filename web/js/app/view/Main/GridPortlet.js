Ext.define(CONFIG.APP_NS+'.view.Main.GridPortlet', {
    extend: 'Ext.ux.Portlet',
    alias: 'widget.gridportlet',

    height: 300,

    store: null,

    initComponent: function(){

        this.items = {
            xtype: 'grid',
            store: this.store,
            columns: [
                {header: LANG.ENTITY.FROM,              dataIndex: 'from',          flex: 1},
                {header: LANG.ENTITY.TO,                dataIndex: 'to',            flex: 1},
                {header: LANG.ENTITY.SUPPORT_COUNT,     dataIndex: 'supportCount',  flex: 1},
                {header: LANG.ENTITY.HOURS_SPENT,       dataIndex: 'hoursSpent',    flex: 1}
            ]
        };

        this.callParent();
    }
});
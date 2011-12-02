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
                {header: LANG.ENTITY.START_DATE,        dataIndex: 'startDate',     flex: 1},
                {header: LANG.ENTITY.END_DATE,          dataIndex: 'endDate',       flex: 1},
                {header: LANG.ENTITY.SUPPORT_COUNT,     dataIndex: 'supportCount',  flex: 1},
                {header: LANG.ENTITY.HOURS_SPENT,       dataIndex: 'hoursSpent',    flex: 1}
            ]
        };

        this.callParent();
    }
});
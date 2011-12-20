Ext.define(CONFIG.APP_NS+'.view.Main.Portal.FilterBar', {
    extend: 'Ext.toolbar.Toolbar',
    alias: 'widget.filterbar',

    initComponent: function(){
        this.items = [
            {
                xtype: 'combobox',
                multiSelect: true,
                editable: false,
                emptyText: LANG.MAIN.PORTAL.CHOOSE_ENTITIES,
                store:{
                    fields: ['entity'],
                    data: []
                },
                queryMode: 'local',
                displayField: 'entity',
                valueField: 'entity'
            },
            {
                xtype: 'datefield',
                editable: true,
                format: 'Y m',
                emptyText: LANG.ENTITY.START_DATE
            },
            {
                xtype: 'datefield',
                editable: true,
                format: 'Y m',
                emptyText: LANG.ENTITY.END_DATE
            },
            '->',
            {
                text: LANG.BUTTON.FILTER,
                action: 'applyFilters'
            },
            {
                text: LANG.BUTTON.RESET_FILTER,
                action: 'resetFilters',
                disabled: true
            }
        ];
        for (var i = 0; i < this.items.length; i++) {
            this.items[i].disabled = true;
        }

        this.callParent();
    }
});
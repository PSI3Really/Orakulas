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
                editable: false,
                format: 'Y m',
                emptyText: '~~Nuo'
            },
            {
                xtype: 'datefield',
                editable: false,
                format: 'Y m',
                emptyText: '~~Iki'
            },
            '->',
            {
                text: '~~Filtruoti',
                action: 'applyFilters'
            },
            {
                text: '~~Atstatyti',
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
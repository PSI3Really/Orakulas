Ext.define(CONFIG.APP_NS+'.view.Main.Portal.AnalysisBar', {
    extend: 'Ext.toolbar.Toolbar',
    alias: 'widget.analysisbar',

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
            {
                xtype: 'numberfield',
                allowDecimals: false,
                minValue: 1,
                emptyText: LANG.MAIN.PORTAL.INFO.INTERVAL_SIZE
            },
            '->',
            {
                text: LANG.BUTTON.ANALYZE,
                action: 'applyAnalysis'
            }
        ];
        for (var i = 0; i < this.items.length; i++) {
            this.items[i].disabled = true;
        }

        this.callParent();
    }
});
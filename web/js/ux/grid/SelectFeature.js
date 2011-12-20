Ext.define('Ext.ux.grid.SelectFeature', {
    extend: 'Ext.grid.feature.Feature',
    alias: 'feature.selectable',

    mutateMetaRowTpl: function(metaRowTpl) {
        var i,
        ln = metaRowTpl.length;

        for (i = 0; i < ln; i++) {
            tpl = metaRowTpl[i];
            tpl = tpl.replace(/x-grid-row/, 'x-grid-row x-selectable');
            tpl = tpl.replace(/x-grid-cell-inner x-unselectable/g, 'x-grid-cell-inner');
            tpl = tpl.replace(/unselectable="on"/g, '');
            metaRowTpl[i] = tpl;
        }
    }
});

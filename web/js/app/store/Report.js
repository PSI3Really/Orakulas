Ext.define(CONFIG.APP_NS+'.store.Report', {
    extend: 'Ext.data.Store',
    alias: 'widget.reportStore',
    requires: CONFIG.APP_NS+'.model.Load',
    model: CONFIG.APP_NS+'.model.Load'
});
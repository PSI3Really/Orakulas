Ext.define(CONFIG.APP_NS+'.store.InfoSysHours', {
    extend: 'Ext.data.Store',
    alias: 'widget.infoSysHours',

    requires: CONFIG.APP_NS+'.model.InfoSysHours',
    model: CONFIG.APP_NS+'.model.InfoSysHours',

    proxy: {
        type: 'memory',
        //api: {
        //    read: 'model/loadHistories/is/hours'
        //},
        reader: Ext.create(CONFIG.APP_NS+'.util.DynamicReaderJSON', {})
    }
});
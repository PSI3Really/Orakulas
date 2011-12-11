Ext.define(CONFIG.APP_NS+'.store.InfoSysRequests', {
    extend: 'Ext.data.Store',
    alias: 'widget.infoSysRequests',

    requires: CONFIG.APP_NS+'.model.InfoSysRequests',
    model: CONFIG.APP_NS+'.model.InfoSysRequests',

    proxy: {
        type: 'ajax',
        api: {
            read: 'model/loadHistories/is/requests'
        },
        reader: Ext.create(CONFIG.APP_NS+'.util.DynamicReaderJSON', {})
    }
});
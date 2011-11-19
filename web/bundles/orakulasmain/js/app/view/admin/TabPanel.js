Ext.define(CONFIG.APP_NS+'.view.admin.TabPanel', {
    extend: 'Ext.tab.Panel',
    alias: 'widget.admintabpanel',

    initComponent: function() {
        this.items = [
            {
                title: 'Asmeniniai nustatymai'
            },
            {
                title: 'Vartotojai'
            },
            {
                title: 'IS'
            },
            {
                title: 'Padaliniai'
            },
            {
                title: 'Priemones'
            }
        ];

        this.callParent();
    }
});
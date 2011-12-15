Ext.define(CONFIG.APP_NS+'.view.Main.TabPanel', {
    extend: 'Ext.tab.Panel',
    alias: 'widget.maintabpanel',

    requires: [
        CONFIG.APP_NS+'.view.Main.Portal.SubToolbar'
    ],

    border: false,
    reports: {
        infoSysHours: null,
        infoSysRequests: null,
        departmentHours: null,
        departmentRequests: null
    },

    initComponent: function() {
        this.items = [
            {
                title: LANG.MAIN.PORTAL_VIEW,
                bodyBorder: false,
                layout: 'fit',
                xtype: 'maintab'
            }, {
                title: LANG.MAIN.ALTERNATIVE_VIEW,
                bodyBorder: false,
                xtype: 'alternativetab'
            }
        ];

        this.fireEvent('loadReports', this);

        this.callParent();
    }
});
Ext.define(CONFIG.APP_NS+'.view.Main.TabPanel', {
    extend: 'Ext.tab.Panel',
    alias: 'widget.maintabpanel',

    requires: [
        CONFIG.APP_NS+'.view.Main.Portal.SubToolbar'
    ],

    id: 'maintabpanel',
    border: false,
    reports: {
        infoSysHours: null,
        infoSysRequests: null,
        departmentHours: null,
        departmentRequests: null
    },
    plain: true,

    predictWindow: null,

    initComponent: function() {
        this.items = [
            {
                title: LANG.MAIN.PORTAL_VIEW,
                border: false,
                xtype: 'maintab',
                layout: 'fit'
            },{
                border: false,
                title: LANG.MAIN.ALTERNATIVE_VIEW,
                //bodyBorder: false,
                xtype: 'alternativetab'
            }
            /*{
                 title: LANG.MAIN.ALTERNATIVE_VIEW,
                 xtype: 'maintab',
                 layout: 'fit',
                 _alternative: true
                 }
            }*/
        ];

        this.setupStores();

        this.fireEvent('loadReports', this);

        this.callParent();
    },

    setupStores: function(){
        this.reports.infoSysHours = Ext.create('widget.infoSysHours', {
            typeName: LANG.ENTITY.HOURS_SPENT
        });
        this.reports.infoSysRequests = Ext.create('widget.infoSysRequests', {
            typeName: LANG.ENTITY.SUPPORT_COUNT
        });
        this.reports.departmentHours = Ext.create('widget.departmentHours', {
            typeName: LANG.ENTITY.HOURS_SPENT
        });
        this.reports.departmentRequests = Ext.create('widget.departmentRequests', {
            typeName: LANG.ENTITY.SUPPORT_COUNT
        });
    }
});
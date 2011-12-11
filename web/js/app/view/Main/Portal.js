Ext.define(CONFIG.APP_NS+'.view.Main.Portal', {
    extend: 'Ext.ux.PortalPanel',
    alias: 'widget.portal',
    
    requires: [
        'Ext.ux.PortalColumn',
        'Ext.ux.PortalPanel'
    ],

    border: false,
    reports: {
        infoSysHours: null,
        infoSysRequests: null,
        departmentHours: null,
        departmentRequests: null
    },
    parentTab: null,
    portletCount: 0,

    initComponent: function(){
        //TODO: dynamic number of columns
        this.items = [{

        },{

        }];

        this.callParent();

        this.fireEvent('loadReports', this);
    }
});
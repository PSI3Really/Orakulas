Ext.define(CONFIG.APP_NS+'.view.Main.Portal', {
    extend: 'Ext.ux.PortalPanel',
    alias: 'widget.portal',
    
    requires: [
        'Ext.ux.PortalColumn',
        'Ext.ux.PortalPanel'
    ],

    initComponent: function(){
        this.items = [{

        },{

        }];

        this.callParent();
    }
});
Ext.define(CONFIG.APP_NS+'.view.Main.Portal', {
    extend: 'Ext.ux.PortalPanel',
    alias: 'widget.portal',
    
    requires: [
        'Ext.ux.PortalColumn',
        'Ext.ux.PortalPanel'
    ],

    border: false,

    initComponent: function(){
        //TODO: dynamic number of columns
        this.items = [{

        },{

        }];

        this.callParent();
    }
});
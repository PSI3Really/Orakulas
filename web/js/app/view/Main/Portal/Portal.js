Ext.define(CONFIG.APP_NS+'.view.Main.Portal.Portal', {
    extend: 'Ext.ux.PortalPanel',
    alias: 'widget.portal',
    
    requires: [
        'Ext.ux.PortalColumn',
        'Ext.ux.PortalPanel'
    ],

    alternative: false,
    portletCount: 0,

    initComponent: function(){
        this.alternative = this._alternative;
        delete(this._alternative);

        this.items = [{}];

        if (!this.alternative) {
            this.items.push({});
        }

        this.callParent();
    }
});
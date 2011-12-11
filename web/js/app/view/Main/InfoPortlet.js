Ext.define(CONFIG.APP_NS+'.view.Main.InfoPortlet', {
    extend: 'Ext.ux.Portlet',
    alias: 'widget.infoportlet',
    initComponent: function(){

        this.items = [{
            html: '<p>Informacija</p>'
        }]

        this.dockedItems = [{
            xtype: 'portletbar',
            dock: 'top'
        }];

        this.callParent();
    }
});
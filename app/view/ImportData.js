Ext.define(CONFIG.APP_NS+'.view.ImportData', {
    extend: 'Ext.window.Window',
    alias: 'widget.importdata',

    layout: 'fit',
    floatable: true,

    height: 250,
    width: 500,

    title: 'Įkelti duomenis', //TODO

    initComponent: function () {

        this.items = [
            {
                xtype: 'component',
                html: '<p>Test</p>'
            }
        ];
        //*/

        this.callParent(arguments);
    }
})
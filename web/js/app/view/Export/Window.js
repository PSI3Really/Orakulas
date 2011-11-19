Ext.define(CONFIG.APP_NS+'.view.Export.Window', {
    extend: 'Ext.window.Window',
    alias: 'widget.exportwindow',

    layout: 'border',
    floatable: true,
    modal: true,

    height: 250,
    width: 500,
    title: 'Eksportuoti',

    initComponent: function () {

        this.items = [{
            region: 'center',
            xtype: 'panel',
            title: 'Istoriniai duomenys', //TODO
            border: false,
            html: '<h1>NEED A LIST HERE</h1>' //TODO
        },{
            region: 'east',
            border: false,
            xtype: 'panel',
            layout: 'vbox',
            items: [{
                xtype: 'textfield'
            },{

                xtype: 'combobox',
                forceSelection: true,
                store: {
                    fields: ['filetype', 'extension', 'code'],
                    data: [
                        {'filetype':'Excel', 'extension':'.xls', 'code':'excel'},
                        {'filetype':'Vidinis', 'extension':'.xls', 'code':'internal'}
                    ]
                },
                queryMode: 'local',
                valueField: 'code',
                displayField: 'filetype'
            },{
                xtype: 'button',
                text: 'Atšaukti'
            },{
                xtype: 'button',
                text: 'Gerai'
            }]
        }];

        this.callParent(arguments);
    }
})
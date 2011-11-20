//TODO: Move fileTypes to store

var fileTypes = Ext.create('Ext.data.Store', {
    fields: ['filetype', 'code'],
    data: [
        {'filetype':'Excel - .xls', 'code':'excel'},
        {'filetype':'Vidinis - .xls', 'code':'internal'}
    ]
});

Ext.define(CONFIG.APP_NS+'.view.Export.Controls', {
    extend: 'Ext.form.Panel',
    alias: 'widget.exportcontrols',

    layout: 'border',

    initComponent: function(){
        this.items = [{
            xtype: 'panel',
            region: 'center',
            title: 'Istoriniai duomenys', //TODO
            border: false,
            html: '<h1>NEED A LIST HERE</h1>' //TODO
        },{
            xtype: 'panel',
            region: 'east',
            border: 'false',
            items: [{
                xtype: 'textfield',
                fieldLabel: 'Pavadinimas',
                allowBlank: false
            },{
                xtype: 'combobox',
                fieldLabel: 'Failo tipas',
                action: 'typeChoose',
                forceSelection: true,
                editable: false,
                allowBlank: false,
                store: fileTypes,
                queryMode: 'local',
                valueField: 'code',
                displayField: 'filetype'
        }]
        }];

        this.dockedItems = {
            xtype: 'toolbar',
            dock: 'bottom',
            items: ['->',{
                xtype: 'button',
                action: 'accept',
                text: 'Gerai'
            },{
                xtype: 'button',
                action: 'cancel',
                text: 'Atšaukti'
            }]
        };

        this.callParent(arguments);
    }

});
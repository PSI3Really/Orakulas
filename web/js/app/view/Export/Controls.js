//TODO: Move fileTypes to store

Ext.define(CONFIG.APP_NS+'.view.Export.Controls', {
    extend: 'Ext.form.Panel',
    alias: 'widget.exportcontrols',

    layout: 'border',

    initComponent: function(){
        this.fileTypes = Ext.create('Ext.data.Store', {
            fields: ['filetype', 'code'],
            data: [
                {'filetype': LANG.FILETYPE.EXCEL_XLS, 'code':'excel'},
                {'filetype': LANG.FILETYPE.INTERNAL, 'code':'internal'}
            ]
        });
        
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
                fieldLabel: LANG.ENTITY.FILE_NAME,
                allowBlank: false
            },{
                xtype: 'combobox',
                fieldLabel: LANG.ENTITY.FILE_TYPE,
                action: 'typeChoose',
                forceSelection: true,
                editable: false,
                allowBlank: false,
                store: this.fileTypes,
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
                text: LANG.BUTTON.OK
            },{
                xtype: 'button',
                action: 'cancel',
                text: LANG.BUTTON.CANCEL
            }]
        };

        this.callParent(arguments);
    }

});
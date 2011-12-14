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
                //{'filetype': LANG.FILETYPE.INTERNAL, 'code':'internal'}
            ]
        });
        
        this.items = [{ //TODO!important
            xtype: 'panel',
            region: 'center',
            border: false,
            store: {
                fields: ['dummy'],
                data: [{dummy:'Lentelė 0'}]
            },
            columns: {header: 'Istoriniai duomenys', dataIndex: 'dummy'}
        },{
            xtype: 'panel',
            region: 'east',
            border: 'false',
            items: [{
                xtype: 'textfield',
                fieldLabel: LANG.ENTITY.FILE_NAME,
                value: 'Istoriniai duomenys',
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
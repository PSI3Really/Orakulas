//TODO: Move fileTypes to store

Ext.define(CONFIG.APP_NS+'.view.Export.Controls', {
    extend: 'Ext.form.Panel',
    alias: 'widget.exportcontrols',

    layout: 'border',

    panels: null,

    initComponent: function(){
        this.fileTypes = Ext.create('Ext.data.Store', {
            fields: ['filetype', 'code'],
            data: [
                {'filetype': LANG.FILETYPE.EXCEL_XLS, 'code':'excel'}
                //{'filetype': LANG.FILETYPE.INTERNAL, 'code':'internal'}
            ]
        });


        var panelCheckBoxes = [];
        for (var i = 0; i < this.panels.length; i++){
            var checked = !this.panels[i].collapsed;
            panelCheckBoxes.push({boxLabel: this.panels[i].title, inputValue: i, checked:checked});
        }

        this.items = [{
            xtype: 'checkboxgroup',
            region: 'center',
            border: false,
            columns: 2,
            allowBlank: false,
            items: panelCheckBoxes
        },{
            xtype: 'panel',
            region: 'east',
            border: 'false',
            items: [{
                xtype: 'textfield',
                fieldLabel: LANG.ENTITY.FILE_NAME,
                value: LANG.ENTITY.REPORT,
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
                displayField: 'filetype',
                value: 'excel'
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
Ext.define(CONFIG.APP_NS+'.view.Admin.SupportTypes.SupportTypesGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.adminsupporttypesgrid',

    //store: CONFIG.APP_NS+'.store.Users', //Does not seem to work

    initComponent: function() {
        this.store = Ext.create('widget.adminSupportTypesStore', {});

        this.categories = Ext.create('Ext.data.Store', {
            fields: ['id', 'name'],
            proxy: {
                type: 'ajax',
                reader: 'json',
                api: {read: 'model/supportCategories/read'}
            }
        });
        this.categories.load();

        this.columns = [{
            header: LANG.ENTITY.CODE,
            dataIndex: 'code',
            flex: 0,
            editor: {
                xtype: 'textfield',
                allowBlank: false
            }
        },{
            header: LANG.ENTITY.SUPPORT_TYPE,
            dataIndex: 'name',
            flex: 1,
            editor: {
                xtype: 'textfield',
                allowBlank: false
            }
        },{
            header: LANG.ENTITY.CATEGORY,
            dataIndex: 'supportCategory',
            flex: 1,
            renderer: function (value){
                //console.log(value);
                var str = '';
                var recordIdx = this.categories.find('id', value);

                if (recordIdx >= 0){
                    str += this.categories.getAt(recordIdx).get('name');
                }
                return str;
            },
            editor: {
                xtype: 'combobox',
                allowBlank: true,
                queryMode: 'local',
                displayField: 'name',
                valueField: 'id',
                multiSelect: false,
                forceSelection: true,
                store: this.categories
            }
        }];

        this.plugins = Ext.create('Ext.grid.plugin.RowEditing', {
            clicksToEdit: 2,
            listeners: {
                canceledit: {
                    fn: function(element, eOpts){
                        var data = element.record.data;
                        if (data.id == "" || data.name == ""){
                            element.store.remove(element.record);
                        }
                    }
                },
                edit: {
                    fn: function(event){
                        Ext.getCmp('supportTypesSync').setDisabled(false);
                    }
                }
            }
        }),

        this.store.load();

        this.callParent(arguments);
    }
});
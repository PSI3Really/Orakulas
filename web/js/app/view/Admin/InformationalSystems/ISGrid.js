Ext.define(CONFIG.APP_NS+'.view.Admin.InformationalSystems.ISGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.adminisgrid',

    //store: CONFIG.APP_NS+'.store.Users', //Does not seem to work

    initComponent: function() {
        this.store = Ext.create('widget.adminInformationalSystemsStore', {});

        this.id = 'adminisgridid';

        this.departments = Ext.create('Ext.data.Store', {
            fields: ['id', 'name', 'code'],
            proxy: {
                type: 'ajax',
                reader: 'json',
                api: {read: 'model/departments/read'}
            }
        });
        this.departments.load();

        this.columns = [{
            header: LANG.ENTITY.CODE,
            dataIndex: 'code',
            flex: 0,
            editor: {
                xtype: 'textfield',
                allowBlank: false
            }
        },{
            header: LANG.ENTITY.INFO_SYS,
            dataIndex: 'name',
            flex: 1,
            editor: {
                xtype: 'textfield',
                allowBlank: false
            }
        },{
            header: LANG.ENTITY.DEPARTMENT_PLURAL,
            dataIndex: 'departments',
            flex: 1,
            renderer: function (values){
                //console.log(value);
                var str = '';
                for(var i in values){
                    var value = values[i]
                    var recordIdx = this.departments.find('id', value);

                    if (recordIdx >= 0){
                        str += this.departments.getAt(recordIdx).get('name');
                        if (i < values.length - 1){
                            str += ', ';
                        }
                    }
                }
                return str;
            },
            editor: {
                xtype: 'combobox',
                allowBlank: true,
                queryMode: 'local',
                displayField: 'name',
                valueField: 'id',
                multiSelect: true,
                forceSelection: true,
                store: this.departments
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
                        Ext.getCmp('infoSysSync').setDisabled(false);
                    }
                }
            }
        }),

        this.store.load();
        
        //console.log(this.store);

        this.callParent(arguments);
    }
});
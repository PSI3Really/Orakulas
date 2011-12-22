Ext.define(CONFIG.APP_NS+'.view.Admin.SupportAdministration.Grid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.adminsupportadministrationgrid',

    store: null,
    selType: 'rowmodel',
    multiSelect: true,

    initComponent: function() {
        this.store = Ext.create('Ext.data.Store', {
            model: CONFIG.APP_NS+'.model.Admin.SupportAdminTimeModel_Dummy',
            proxy: {
                type: 'ajax',
                api: {
                    read: 'model/supportAdministrationTimes/read',
                    create: 'model/supportAdministrationTimes/create',
                    update: 'model/supportAdministrationTimes/update',
                    destroy: 'model/supportAdministrationTimes/delete'
                },
                reader: {
                    type: 'json'
                },
                writer: {
                    type: 'json',
                    root: 'jsonValue',
                    encode: true,
                    writeAllFields: false
                }
            }
        });

        this.departments = Ext.create('Ext.data.Store', {
            fields: ['id', 'name', 'code'],
            proxy: {
                type: 'ajax',
                reader: 'json',
                api: {read: 'model/departments/read'}
            }
        });
        this.departments.load();

        this.supportTypes = Ext.create('Ext.data.Store', {
            fields: ['id', 'name', 'code'],
            proxy: {
                type: 'ajax',
                reader: 'json',
                api: {read: 'model/supportTypes/read'}
            }
        });
        this.supportTypes.load();

        this.columns = [{
            header: LANG.ENTITY.SUPPORT_TYPE,
            dataIndex: 'supportType',
            flex: 1,
            editor: {
                xtype: 'combobox',
                queryMode: 'local',
                displayField: 'name',
                forceSelection: true,
                allowBlank: false,
                valueField: 'id',
                store: this.supportTypes
            },
            renderer: function (value){
                //console.log(value);
                var str = '';
                var recordIdx = this.supportTypes.find('id', value);

                if (recordIdx >= 0){
                    str += this.supportTypes.getAt(recordIdx).get('code');
                }
                return str;
            }
        },{
            header: LANG.ENTITY.DEPARTMENT,
            dataIndex: 'department',
            flex: 1,
            editor: {
                xtype: 'combobox',
                queryMode: 'local',
                displayField: 'name',
                allowBlank: false,
                forceSelection: true,
                valueField: 'id',
                store: this.departments
            },
            renderer: function (value){
                //console.log(value);
                var str = '';
                var recordIdx = this.departments.find('id', value);

                if (recordIdx >= 0){
                    str += this.departments.getAt(recordIdx).get('code');
                }
                return str;
            }
        },{
            header: LANG.ENTITY.HOURS_SPENT,
            dataIndex: 'hoursCount',
            flex: 1,
            editor: {
                xtype: 'numberfield',
                minValue: 0
            }
        }];

        this.plugins = [
            Ext.create('Ext.grid.plugin.RowEditing', {
                clicksToEdit: 2,
                listeners: { //It doesn't work if put in the controller :/
                    canceledit: {
                        fn: function(element, eOpts){
                            var data = element.record.data;
                            if (data.supportType == "" || data.department == ""){
                                element.store.remove(element.record);
                            }
                        }
                    },
                    edit: {
                        fn: function(event){
                            if (event.field == 'supportTypeCode'){
                                var editorStore = event.column.getEditor().store;
                                var newValue = event.record.get('supportTypeCode');
                                var recordIdx = editorStore.find('code', newValue);
                                var supportId = editorStore.getAt(recordIdx).get('id');

                                event.record.set('supportType', supportId);
                            }
                            Ext.getCmp('supportAdminSync').setDisabled(false);
                        }
                    }
                }
            })
        ];


        this.store.load();

        this.callParent(arguments);
    }
});
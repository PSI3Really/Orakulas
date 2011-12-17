Ext.define(CONFIG.APP_NS+'.view.Predict.EditEntitiesWnd', {
    extend: 'Ext.window.Window',
    alias: 'widget.editEntitiesWnd',

    layout: 'accordion',
    floatable: true,
    modal: true,

    height: 300,
    width: 400,

    parentWnd: null,
    infoSys: null,
    support: null,
    departments: null,
    supportTypes: null,

    generateGrids: function(){
        this.infoSys = Ext.create('Ext.data.Store', {
            fields: [
                {name: 'IS'},
                {name: 'departments'}
            ],
            data: []
        });

        this.departments = new Ext.util.HashMap();
        this.supportTypes = new Ext.util.HashMap();

        for(var i = 0; i < this.parentWnd.infoSysDepartmentsStore.getCount(); i++){
            var record = this.parentWnd.infoSysDepartmentsStore.getAt(i);

            var department = record.get('department').name;
            var infoSys = record.get('informationalSystem').name;

            this.departments.add(department, {'name': department});

            var recordIndex = this.infoSys.find('IS', infoSys);

            if (recordIndex >= 0){
                var record = this.infoSys.getAt(recordIndex);
            } else {
                var record = this.infoSys.add({'IS':infoSys, 'departments':[]})[0];
            }

            Ext.Array.include(record.data.departments, department);
        }

        this.support = Ext.create('Ext.data.Store', { //TODO: convert to something more user friendly
            fields: [
                {name: 'supportType'},
                {name: 'department'},
                {name: 'hoursCount'}
            ],
            data: []
        });

        for(var i = 0; i < this.parentWnd.supportDepartmentsStore.getCount(); i++){
            var record = this.parentWnd.supportDepartmentsStore.getAt(i);

            var department = record.get('department').name;
            var supportType = record.get('supportType').name;
            var hoursCount = record.get('hoursCount');

            this.supportTypes.add(supportType, {'name': supportType});

            this.support.add({'supportType': supportType, 'department': department, 'hoursCount': hoursCount});
        }
    },

    initComponent: function(){
        var me = this;

        this.generateGrids();

        this.title = LANG.PREDICT.BUTTON.EDIT_ENTITIES;

        this.items = [{
            title: LANG.PREDICT.BUTTON.INFO_SYS_AND_DEPARTMENTS,
            xtype: 'grid',
            store: this.infoSys,
            columns: [ //TODO: can change IS name?
                {
                    header: LANG.ENTITY.INFO_SYS,
                    dataIndex: 'IS',
                    flex: 1,
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false
                    }
                },{
                    header: LANG.ENTITY.DEPARTMENT_PLURAL,
                    dataIndex: 'departments',
                    flex: 1,
                    editor: {
                        xtype: 'combobox',
                        queryMode: 'local',
                        displayField: 'name',
                        valueField: 'name',
                        multiSelect: true,
                        store: {
                            fields: ['name'],
                            data: this.departments.getValues()
                        }
                    }
                }
            ],

            plugins: Ext.create('Ext.grid.plugin.RowEditing', {
                clicksToEdit: 2,
                listeners: {
                    canceledit: {
                        fn: function(element, eOpts){
                            var data = element.record.data;
                            if (data.infoSys == ""){
                                element.store.remove(element.record);
                            }
                        }
                    }
                }
            }),

            dockedItems: [{
                dock: 'top',
                xtype: 'toolbar',
                items: [{
                    iconCls: 'icon-plus-circle',
                    xtype:  'button',
                    text:   LANG.BUTTON.ADD,
                    handler: function(btn, e){
                        var grid = btn.up('gridpanel');
                        var store = grid.getStore();

                        var rowEditor = grid.plugins[0];
                        rowEditor.cancelEdit();
                        store.insert(0, Ext.create(store.model));
                        rowEditor.startEdit(0, 0);
                    }
                },{
                    iconCls: 'icon-minus-circle',
                    xtype:  'button',
                    text:   LANG.BUTTON.REMOVE,
                    handler: function(btn, e){
                        var grid = btn.up('gridpanel');
                        var store = grid.getStore();
                        var selected = grid.getSelectionModel().getSelection();

                        var rowEditor = grid.plugins[0];
                        rowEditor.cancelEdit();
                        store.remove(selected);
                    }
                }]
            }]
        },{
            title: LANG.PREDICT.BUTTON.SUPPORT_AND_DEPARTMENTS,
            xtype: 'grid',
            store: this.support,
            columns: [ //TODO: can change IS name?
                {
                    header: LANG.ENTITY.SUPPORT_TYPE,
                    dataIndex: 'supportType',
                    flex: 1,
                    editor: {
                        xtype: 'combobox',
                        queryMode: 'local',
                        displayField: 'name',
                        valueField: 'name',
                        store: {
                            fields: ['name'],
                            data: this.supportTypes.getValues()
                        }
                    }
                },{
                    header: LANG.ENTITY.DEPARTMENT,
                    dataIndex: 'department',
                    flex: 1,
                    editor: {
                        xtype: 'combobox',
                        queryMode: 'local',
                        displayField: 'name',
                        valueField: 'name',
                        store: {
                            fields: ['name'],
                            data: this.departments.getValues()
                        }
                    }
                },{
                    header: LANG.ENTITY.HOURS_SPENT,
                    dataIndex: 'hoursCount',
                    flex: 1,
                    editor: {
                        xtype: 'numberfield',
                        minValue: 0
                    }
                }
            ],

            plugins: Ext.create('Ext.grid.plugin.RowEditing', {
                clicksToEdit: 2,
                listeners: {
                    canceledit: {
                        fn: function(element, eOpts){
                            var data = element.record.data;
                            if (data.infoSys == ""){
                                element.store.remove(element.record);
                            }
                        }
                    }
                }
            }),

            dockedItems: [{
                dock: 'top',
                xtype: 'toolbar',
                items: [{
                    iconCls: 'icon-plus-circle',
                    xtype:  'button',
                    text:   LANG.BUTTON.ADD,
                    handler: function(btn, e){
                        var grid = btn.up('gridpanel');
                        var store = grid.getStore();

                        var rowEditor = grid.plugins[0];
                        rowEditor.cancelEdit();
                        store.insert(0, Ext.create(store.model));
                        rowEditor.startEdit(0, 0);
                    }
                },{
                    iconCls: 'icon-minus-circle',
                    xtype:  'button',
                    text:   LANG.BUTTON.REMOVE,
                    handler: function(btn, e){
                        var grid = btn.up('gridpanel');
                        var store = grid.getStore();
                        var selected = grid.getSelectionModel().getSelection();

                        var rowEditor = grid.plugins[0];
                        rowEditor.cancelEdit();
                        store.remove(selected);
                    }
                }]
            }]
        }]

        this.dockedItems = [{
            dock: 'bottom',
            xtype: 'toolbar',
            items: ['->',{
                xtype: 'button',
                text: LANG.BUTTON.OK,
                handler: function(btn){ 
                    var jsonInfoSys = Ext.encode(Ext.pluck(me.infoSys.data.items, 'data'));
                    var jsonSupport = Ext.encode(Ext.pluck(me.support.data.items, 'data'));

                    me.parentWnd.infoSysJson = jsonInfoSys;
                    me.parentWnd.supportJson = jsonSupport;
                    me.close();
                }
            },{
                xtype: 'button',
                text: LANG.BUTTON.CANCEL,
                handler: function(btn){
                    me.close();
                }
            }]
        }]

        this.callParent(arguments);
    }
})
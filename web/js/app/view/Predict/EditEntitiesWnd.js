Ext.define(CONFIG.APP_NS+'.view.Predict.EditEntitiesWnd', {
    extend: 'Ext.window.Window',
    alias: 'widget.editEntitiesWnd',

    layout: 'accordion',
    floatable: true,
    modal: true,

    closeAction: 'hide',

    height: 300,
    width: 400,

    parentWnd: null,
    infoSys: null,
    support: null,
    departments: null,
    supportTypes: null,
    ignoreLast: null,
    windowSize: null,
    uptrend: null,

    generateGrids: function(){
        if (!this.infoSys) {
            this.infoSys = Ext.create('Ext.data.Store', {
                fields: [
                    {name: 'IS'},
                    {name: 'departments'}
                ],
                data: []
            });
        } else {
            this.infoSys.loadData([]);
        }

        if (!this.departments){
            this.departments = new Ext.util.HashMap();
        } else {
            this.departments.clear();
        }
        if (!this.supportTypes){
            this.supportTypes = new Ext.util.HashMap();
        } else{
            this.supportTypes.clear();
        }

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

        if (!this.support){
            this.support = Ext.create('Ext.data.Store', { //TODO: convert to something more user friendly
                fields: [
                    {name: 'supportType'},
                    {name: 'department'},
                    {name: 'hoursCount'}
                ],
                data: []
            });
        } else {
            this.support.loadData([]);
        }

        for(var i = 0; i < this.parentWnd.supportDepartmentsStore.getCount(); i++){
            var record = this.parentWnd.supportDepartmentsStore.getAt(i);

            var department = record.get('department').name;
            var supportType = record.get('supportType').code;
            var hoursCount = record.get('hoursCount');

            this.supportTypes.add(supportType, {'name': supportType});

            this.support.add({'supportType': supportType, 'department': department, 'hoursCount': hoursCount});
        }
    },

    initComponent: function(){
        var me = this;

        this.generateGrids();

        this.title = LANG.PREDICT.BUTTON.EDIT_ENTITIES;

        this.ignoreLast = Ext.create('Ext.form.field.Checkbox', { //TODO: remake to choose dates
            value: 1,
            allowDecimals: false,
            checked: true,
            minValue: 0,
            maxValue: 12,
            fieldLabel: LANG.PREDICT.IGNORE_LAST_DATE
        });

        this.windowSize = Ext.create('Ext.form.field.Number', {
            xtype: 'numberfield', //TODO: check boundaries
            value: 12,
            allowDecimals: false,
            minValue: 0,
            maxValue: 24, //TODO
            fieldLabel: LANG.PREDICT.WINDOW_SIZE
        });

        this.uptrend = Ext.create('Ext.form.field.Number', {
            xtype: 'numberfield',
            value: 2.5,
            fieldLabel: LANG.PREDICT.UPTREND
        });

        this.infoSysGrid = Ext.create('Ext.grid.Panel', {
            title: LANG.PREDICT.BUTTON.INFO_SYS_AND_DEPARTMENTS,
            store: this.infoSys,
            multiSelect: true,
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
                    text:   LANG.PREDICT.BUTTON.CLEAR_DEPARTMENTS,
                    handler: function(btn, e){
                        var grid = btn.up('gridpanel');
                        var store = grid.getStore();
                        var selected = grid.getSelectionModel().getSelection();

                        var rowEditor = grid.plugins[0];
                        rowEditor.cancelEdit();

                        for (var idx in selected){
                            selected[idx].set('departments', []);
                        }
                    }
                }]
            }]
        })

        this.supportGrid = Ext.create('Ext.grid.Panel', {
            title: LANG.PREDICT.BUTTON.SUPPORT_AND_DEPARTMENTS,
            store: this.support,
            multiSelect: true,
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
                    text:   LANG.PREDICT.BUTTON.CLEAR_HOURS,
                    handler: function(btn, e){
                        var grid = btn.up('gridpanel');
                        var store = grid.getStore();
                        var selected = grid.getSelectionModel().getSelection();

                        var rowEditor = grid.plugins[0];
                        rowEditor.cancelEdit();

                        for (var idx in selected){
                            selected[idx].set('hoursCount', 0);
                        }
                    }
                }]
            }]
        })

        this.items = [this.infoSysGrid, this.supportGrid,{
            title: LANG.PREDICT.BUTTON.OPTIONS, //NEED TOOLTIPS
            xtype: 'form',
            plain: true,
            border: 0,
            bodyPadding: 5,
            fieldDefaults: {
                labelWidth: 200,
                anchor: '100%'
            },
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [this.ignoreLast, this.windowSize, this.uptrend]
        }]

        this.dockedItems = [{
            dock: 'bottom',
            xtype: 'toolbar',
            items: [{
                xtype: 'button',
                text: LANG.PREDICT.BUTTON.RESTORE,
                handler: function(btn){
                    me.generateGrids();

                    var fields = Ext.ComponentQuery.query('field', me);
                    for (var i in fields){
                        fields[i].reset();
                    }
                }
            },'->',{
                xtype: 'button',
                text: LANG.BUTTON.OK,
                handler: function(btn){ 
                    var jsonInfoSys = Ext.encode(Ext.pluck(me.infoSys.data.items, 'data'));
                    var jsonSupport = Ext.encode(Ext.pluck(me.support.data.items, 'data'));

                    var options = {
                        ignoreLast: me.ignoreLast.getValue() ? 1 : 0,
                        window: me.windowSize.getValue(),
                        uptrend: me.uptrend.getValue()
                    }

                    var jsonOptions = Ext.encode(options);

                    me.parentWnd.infoSysJson = jsonInfoSys;
                    me.parentWnd.supportJson = jsonSupport;
                    me.parentWnd.optionsJson = jsonOptions;
                    me.hide();
                }
            },{
                xtype: 'button',
                text: LANG.BUTTON.CANCEL,
                handler: function(btn){
                    me.hide();
                }
            }]
        }]

        this.callParent(arguments);
    }
})
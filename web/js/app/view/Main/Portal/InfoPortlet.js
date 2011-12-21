Ext.define(CONFIG.APP_NS+'.view.Main.Portal.InfoPortlet', {
    extend: 'Ext.ux.Portlet',
    alias: 'widget.infoportlet',

    data: null,
    
    rangeFromField: null,
    rangeToField: null,
    selectedField: null,
    intervalSizeField: null,

    minValueField: null,
    minDateStartField: null,
    maxValueField: null,
    maxDateStartField: null,

    initComponent: function(){

        this.rangeFromField = Ext.create('Ext.form.field.Text', {
            fieldLabel: LANG.MAIN.PORTAL.INFO.RANGE_FROM,
            readOnly: true
        });
        this.rangeToField = Ext.create('Ext.form.field.Text', {
            fieldLabel: LANG.MAIN.PORTAL.INFO.RANGE_TO,
            readOnly: true
        });
        this.selectedField = Ext.create('Ext.form.field.Text', {
            fieldLabel: LANG.MAIN.PORTAL.INFO.SELECTED,
            readOnly: true
        });
        this.intervalSizeField = Ext.create('Ext.form.field.Text', {
            fieldLabel: LANG.MAIN.PORTAL.INFO.INTERVAL_SIZE,
            readOnly: true
        });
        this.minValueField = Ext.create('Ext.form.field.Text', {
            fieldLabel: LANG.MAIN.PORTAL.INFO.MIN_VALUE,
            readOnly: true
        });
        this.minDateStartField = Ext.create('Ext.form.field.Text', {
            fieldLabel: LANG.MAIN.PORTAL.INFO.MIN_DATE,
            readOnly: true
        });
        this.maxValueField = Ext.create('Ext.form.field.Text', {
            fieldLabel: LANG.MAIN.PORTAL.INFO.MAX_VALUE,
            readOnly: true
        });
        this.maxDateStartField = Ext.create('Ext.form.field.Text', {
            fieldLabel: LANG.MAIN.PORTAL.INFO.MAX_DATE,
            readOnly: true
        });

        this.dataView = Ext.create('Ext.form.Panel', {
            bodyPadding: '15',
            fieldDefaults: {
                labelWidth: 200,
                anchor: '100%'
            },
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [
                this.rangeFromField,
                this.rangeToField,
                this.selectedField,
                this.intervalSizeField,
                this.minValueField,
                this.minDateStartField,
                this.maxValueField,
                this.maxDateStartField
            ]
        });

        this.items = [
            this.dataView
        ]

        this.dockedItems = [{
            xtype: 'portletbar',
            dock: 'top'
        },{
            xtype: 'analysisbar',
            dock: 'bottom'
        }];

        this.tools = [
            {
                type: 'gear',
                handler: function (event, toolEl, owner) {
                    Ext.Msg.prompt(LANG.MAIN.PORTAL.RENAME.TITLE, LANG.MAIN.PORTAL.RENAME.MSG, function(btn, text){
                        if (btn == 'ok'){
                            if (text.length > 0) {
                                owner.setTitle(text);
                                owner.up('infoportlet').title = text;
                            }
                        }
                    });
                }
            }
        ];

        this.callParent();
    },

    setStore: function(store){
        this.store = store;
    },

    setData: function(data){
        this.data = data;

        //console.log(data);

        this.rangeFromField.setValue(Ext.Date.format(data.rangeFrom, 'Y-m-d'));
        this.rangeToField.setValue(Ext.Date.format(data.rangeTo, 'Y-m-d'));
        this.selectedField.setValue(data.selected.join(', '));
        this.intervalSizeField.setValue(data.intervalSize);
        this.minValueField.setValue(data.minValue);
        this.minDateStartField.setValue(Ext.Date.format(data.minDateStart, 'Y-m-d'));
        this.maxValueField.setValue(data.maxValue);
        this.maxDateStartField.setValue(Ext.Date.format(data.maxDateStart, 'Y-m-d'));
    }
});
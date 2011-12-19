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

        this.rangeFromField = Ext.create('Ext.form.field.Display', {
            fieldLabel: LANG.MAIN.PORTAL.INFO.RANGE_FROM
        });
        this.rangeToField = Ext.create('Ext.form.field.Display', {
            fieldLabel: LANG.MAIN.PORTAL.INFO.RANGE_TO
        });
        this.selectedField = Ext.create('Ext.form.field.Display', {
            fieldLabel: LANG.MAIN.PORTAL.INFO.SELECTED
        });
        this.intervalSizeField = Ext.create('Ext.form.field.Display', {
            fieldLabel: LANG.MAIN.PORTAL.INFO.INTERVAL_SIZE
        });
        this.minValueField = Ext.create('Ext.form.field.Display', {
            fieldLabel: LANG.MAIN.PORTAL.INFO.MIN_VALUE
        });
        this.minDateStartField = Ext.create('Ext.form.field.Display', {
            fieldLabel: LANG.MAIN.PORTAL.INFO.MIN_DATE
        });
        this.maxValueField = Ext.create('Ext.form.field.Display', {
            fieldLabel: LANG.MAIN.PORTAL.INFO.MAX_VALUE
        });
        this.maxDateStartField = Ext.create('Ext.form.field.Display', {
            fieldLabel: LANG.MAIN.PORTAL.INFO.MAX_DATE
        });

        this.dataView = Ext.create('Ext.form.Panel', {
            items: [
                this.rangeFromField,
                this.rangeToField,
                this.selectedField,
                this.intervalSizeField,
                this.minValueField,
                this.minDateStartField,
                this.maxValueField,
                this.maxDateStartField,
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

        this.callParent();
    },

    setStore: function(store){
        this.store = store;
    },

    setData: function(data){
        this.data = data;

        this.rangeFromField.setValue(data.rangeFrom);
        this.rangeToField.setValue(data.rangeTo);
        this.selectedField.setValue(data.selected);
        this.intervalSizeField.setValue(data.intervalSize);
        this.minValueField.setValue(data.minValue);
        this.minDateStartField.setValue(data.minDateStart);
        this.maxValueField.setValue(data.maxValue);
        this.maxDateStartField.setValue(data.maxDateStart);
    }
});
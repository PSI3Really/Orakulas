Ext.define(CONFIG.APP_NS+'.view.Predict.Window', {
    extend: 'Ext.window.Window',
    alias: 'widget.predictwindow',

    requires: [
        CONFIG.APP_NS+'.view.Predict.Toolbar'
    ],

    layout: 'border',
    floatable: true,
    modal: true,

    height: 400,
    width: 500,

    parentTab: null,

    infoSysDepartmentsStore: null,
    supportDepartmentsStore: null,

    infoSysJson: null,
    supportJson: null,
    optionsJson: null,

    editEntitiesWnd: null,

    initComponent: function () {

        this.title = LANG.PREDICT.TITLE;

        this.items = [{
            region: 'center',
            xtype: 'predictgrid',
            border: false
        },{
            region: 'south',
            border: false,
            xtype: 'predicttoolbar'
        }];
        
        this.infoSysDepartmentsStore = Ext.create('widget.adminDepartmentInfoSysUsagesStore', {});
        this.infoSysDepartmentsStore.load();

        this.supportDepartmentsStore = Ext.create('widget.adminSupportAdministrationTimesStore', {});
        this.supportDepartmentsStore.load();

        this.callParent(arguments);
    }
})
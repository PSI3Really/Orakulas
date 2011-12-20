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

    oneStoreLoaded: false,

    initComponent: function () {
        var me = this;

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

        this.callParent(arguments);

        var entitiesButton = this.down('[action=editEntities]');
        entitiesButton.setDisabled(true);

        var loadCallback = function(){
            if (me.oneStoreLoaded){
                entitiesButton.setDisabled(false);
            } else {
                me.oneStoreLoaded = true;
            }
        }

        this.infoSysDepartmentsStore = Ext.create('widget.adminDepartmentInfoSysUsagesStore', {
            listeners:{
                load: loadCallback
            }
        });
        this.infoSysDepartmentsStore.load();

        this.supportDepartmentsStore = Ext.create('widget.adminSupportAdministrationTimesStore', {
            listeners:{
                load: loadCallback
            }
        });
        this.supportDepartmentsStore.load();
    }
})
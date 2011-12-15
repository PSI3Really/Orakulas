Ext.define(CONFIG.APP_NS+'.view.Main.Portal.PortletBar', {
    extend: 'Ext.toolbar.Toolbar',
    alias: 'widget.portletbar',

    initComponent: function(){

        this.items = [{
            text: LANG.ENTITY.DEPARTMENT_PLURAL,
            action: 'chooseDepartments'
        },{
            text: LANG.ENTITY.INFO_SYS_PLURAL,
            action: 'chooseInfoSys'
        },'-',{
            text: LANG.ENTITY.SUPPORT_COUNT_PLURAL,
            action: 'chooseSupportCount'
        },{
            text: LANG.ENTITY.HOURS_SPENT,
            action: 'chooseHoursSpent'
        },'->',{
            xtype: 'combobox',
            //fieldLabel: LANG.MAIN.PORTAL.CHOOSE_ENTITIES,
            multiSelect: true,
            editable: false,
            //disabled: true,
            emptyText: LANG.MAIN.PORTAL.CHOOSE_ENTITIES,
            store:{
                fields: ['entity'],
                data: []
            },
            queryMode: 'local',
            displayField: 'entity',
            valueField: 'entity'
        }];

        this.callParent();
    }
});
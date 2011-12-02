Ext.define(CONFIG.APP_NS+'.model.Load', {
    extend: 'Ext.data.Model',
    alias: 'widget.loadModel',
    idProperty: 'id',

    fields: [
        {name: 'id',                    type: 'int'},
        {name: 'startDate',             type: 'date'},
        {name: 'endDate',               type: 'date'},
        {name: 'supportCount',          type: 'int'},
        {name: 'hoursSpent',            type: 'int'}
    ]
});
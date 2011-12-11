Ext.define(CONFIG.APP_NS+'.model.Load', {
    extend: 'Ext.data.Model',
    alias: 'widget.loadModel',

    fields: [
        {name: 'startDate', type: 'date'}
    ],

    hasMany: {model: CONFIG.APP_NS+'.model.Entity', name: 'entities'}
});

Ext.define(CONFIG.APP_NS+'.model.Entity', {
    extend: 'Ext.data.Model',
    alias: 'widget.entityModel',

    belongsTo: CONFIG.APP_NS+'.model.Load',

    fields: [
        {name: 'name', type: 'string'},
        {name: 'value', type: 'float'}
    ]
});
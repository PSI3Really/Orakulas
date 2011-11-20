Ext.define(CONFIG.APP_NS+'.model.User', {
    extend: 'Ext.data.Model',
    alias: 'widget.usermodel',
    fields: [
        {name: 'id',            type: 'int'},
        {name: 'username',      type: 'string'},
        {name: 'password',      type: 'string'},
        {name: 'salt',          type: 'string'},
        {name: 'firstName',     type: 'string'},
        {name: 'lastName',      type: 'string'},
        {name: 'email',         type: 'string'},
        {name: 'admin',         type: 'boolean'},
        {name: 'authenticated', type: 'boolean'}
    ],

    hasMany: {model: CONFIG.APP_NS+'.model.Roles', name: 'roles'}
});

Ext.define(CONFIG.APP_NS+'.model.User', {
    extend: 'Ext.data.Model',

    fields: [
        {name: 'role',          type: 'string'}
    ],

    belongsTo: CONFIG.APP_NS+'.model.User'
});
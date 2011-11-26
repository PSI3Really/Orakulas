Ext.define(CONFIG.APP_NS+'.model.Admin.User', {
    extend: 'Ext.data.Model',
    alias: 'widget.adminUserModel',
    idProperty: 'id',
    
    fields: [
        {name: 'id',            type: 'int', persist:false},
        {name: 'username',      type: 'string'},
        {name: 'password',      type: 'string'},
        //{name: 'salt',          type: 'string'},
        {name: 'firstName',     type: 'string'},
        {name: 'lastName',      type: 'string'},
        {name: 'email',         type: 'string'},
        {name: 'admin',         type: 'boolean', defaultValue: false},
        {name: 'authenticated', type: 'boolean'}
    ],

    hasMany: {model: CONFIG.APP_NS+'.model.Admin.Roles', name: 'roles'}
});

Ext.define(CONFIG.APP_NS+'.model.Admin.Roles', {
    extend: 'Ext.data.Model',

    fields: [
        {name: 'role',          type: 'string'}
    ],

    belongsTo: CONFIG.APP_NS+'.model.Admin.User'
});
Ext.define(CONFIG.APP_NS+'.util.DynamicReaderJSON', {
    extend: CONFIG.APP_NS+'.util.DynamicReader',
    alias : 'reader.dynamicjson',

    root: '',

    useSimpleAccessors: false,

    readRecords: function(data) {
        //this has to be before the call to super because we use the meta data in the superclass readRecords
        if (data.metaData) {
            this.onMetaChange(data.metaData);
        }

        /**
         * @deprecated will be removed in Ext JS 5.0. This is just a copy of this.rawData - use that instead
         * @property {Object} jsonData
         */
        this.jsonData = data;
        return this.callParent([data]);
    },

    getResponseData: function(response) {
        var data;
        try {
            data = Ext.decode(response.responseText);
        }
        catch (ex) {
            Ext.Error.raise({
                response: response,
                json: response.responseText,
                parseError: ex,
                msg: 'Unable to parse the JSON returned by the server: ' + ex.toString()
            });
        }
        //<debug>
        if (!data) {
            Ext.Error.raise('JSON object not found');
        }
        //</debug>

        return data;
    },

    buildExtractors : function() {
        var me = this;

        me.callParent(arguments);

        if (me.root) {
            me.getRoot = me.createAccessor(me.root);
        } else {
            me.getRoot = function(root) {
                return root;
            };
        }
    },

    extractData: function(root) {
        var recordName = this.record,
            data = [],
            length, i;

        if (recordName) {
            length = root.length;

            if (!length && Ext.isObject(root)) {
                length = 1;
                root = [root];
            }

            for (i = 0; i < length; i++) {
                data[i] = root[i][recordName];
            }
        } else {
            data = root;
        }
        return this.callParent([data]);
    },

    createAccessor: function() {
        var re = /[\[\.]/;

        return function(expr) {
            if (Ext.isEmpty(expr)) {
                return Ext.emptyFn;
            }
            if (Ext.isFunction(expr)) {
                return expr;
            }
            if (this.useSimpleAccessors !== true) {
                var i = String(expr).search(re);
                if (i >= 0) {
                    return Ext.functionFactory('obj', 'return obj' + (i > 0 ? '.' : '') + expr);
                }
            }
            return function(obj) {
                return obj[expr];
            };
        };
    }()
});
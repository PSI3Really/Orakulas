Ext.define(CONFIG.APP_NS+'.util.DynamicReader', {
    extend: 'Ext.data.reader.Reader',

    /*
        Extracts values from a nested JSON object into columns:
        Input:
            {
                "<someName>":"<someValue>",
                <...>,
                "entities":[
                    {"name":"<entityName>","value":"<entityValue>"},
                    <...>
                ]
            }

        Output:
            someName  <...> entityName1  entityName2  <...>
            someValue <...> entityValue1 entityValue2 <...>
            <..>
     */
    initialFieldLength: null,

    extractValues: function(data) {
        var fields = this.getFields(),
            i      = 0,
            length = this.initialFieldLength,
            output = {},
            field, value;

        for (; i < length; i++) {
            field = fields[i];
            value = this.extractorFunctions[i](data);

            output[field.name] = value;
        }

        //TODO: atm only two levels, generalize
        for (i = 0; i < data['entities'].length; i++){
            field = data['entities'][i]['name'];
            value = data['entities'][i]['value'];

            this.addField(field, 'float'); //TODO: change based on field type
            output[field] = value;
        }
        return output;
    },

    buildFieldExtractors: function() {
        this.initialFieldLength = this.getFields().length;
        this.callParent();
    },

    addField: function(fieldName, fieldType){
        if (!this.containsField(fieldName)){//TODO: optimize
            var newField = Ext.create('Ext.data.Field', {name: fieldName, type: fieldType});
            this.model.prototype.fields.add(newField);
        }
    },

    containsField: function(fieldName){
        var contains = false;
        var fields = this.getFields();
        for (i = 0; i < fields.length; i++){
            if (fields[i].name === fieldName){
                contains = true;
            }
        }
        return contains;
    }
});
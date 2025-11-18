export interface FormField {
    key: string;
    type: string;
    label: string;
    required?: boolean;
    disabled?: boolean;
    source?: string;
    items?: { text: string; value: any }[];
    itemText?: string; 
    itemValue?: string; 
    fields?: FormField[];
    addButton?: string;
    itemType?: string;
}

function parseProperties(
    properties: any,
    requiredFields: string[] = []
): FormField[] {
    const formSchema: FormField[] = [];

    for (const key in properties) {
        const prop = properties[key];
        const required = requiredFields.includes(key);

        const label = key
            .replace(/([A-Z])/g, " $1")
            .replace(/^./, (str) => str.toUpperCase());

        const field: FormField = {
            key,
            label: required ? `${label}*` : label,
            required: required,
            type: "",
        };

        if (key === "vehicleBrand") {
            field.type = "select";
            field.source = "NSI_046";
            field.itemText = "ru_name";
            field.itemValue = "code";
        }
        else if (prop.enum) {
            field.type = "select";
            field.items = prop.enum.map((value: any) => ({
                text: value,
                value: value,
            }));
            field.itemText = "text";
            field.itemValue = "value";
        } else if (prop.type === "string") {
            field.type = "text";
        } else if (prop.type === "number") {
            field.type = "number";
        } else if (prop.type === "boolean") {
            field.type = "checkbox";
        } else if (prop.type === "array") {
            field.type = "array";
            field.itemType = "group";
            field.fields = parseProperties(
                prop.items.properties || {},
                prop.items.required || []
            );
            field.addButton = `Добавить ${label.toLowerCase()}`;
        }

        formSchema.push(field);
    }

    return formSchema;
}

export function parseOpenApiToFormSchema(
    openApi: any,
    schemaName: string
): FormField[] {
    const schema = openApi?.components?.schemas?.[schemaName];
    if (!schema) {
        console.error(`Схема ${schemaName} не найдена!`);
        return [];
    }

    return parseProperties(schema.properties, schema.required);
}

# Как запускать мок-API
Открыть терминал в корне проекта. Запустить команду:
npm run serve:mock

# Как запускать Frontend
Открыть другой терминал в корне проекта. Запустить команду:
npm run serve

#  Где лежат правила
Правила лежат в:
src/services/rules/rules-map.ts

# Как добавить новое поле

В файле `mocks/db.json` можно добавлять поля перейдя в объекте на `openapi.components.schemas.VehicleOverallDimensionDetails.properties`

Пример нового поля:             
"newField": {
    "type": "string",
    "description": "Field Description"
},

# Как добавить новое правило
В файле `src/services/rules/rules-map.ts` добавить ключ поля:

"fieldName": {
  visibleIf: (model) => model.value === true,
  requiredIf: (model) => model.otherValue === 'A'
}

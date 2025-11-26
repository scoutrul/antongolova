# Prettier Configuration

Этот проект использует Prettier для автоматического форматирования кода и поддержания единого стиля.

## Настройки

Конфигурация находится в файле `.prettierrc`:

- **semi**: `true` - точка с запятой в конце строк
- **singleQuote**: `false` - двойные кавычки для строк
- **tabWidth**: `2` - отступ 2 пробела
- **useTabs**: `false` - использовать пробелы, а не табы
- **trailingComma**: `"es5"` - висячие запятые где возможно (ES5)
- **printWidth**: `80` - максимальная длина строки 80 символов
- **bracketSpacing**: `true` - пробелы внутри фигурных скобок
- **arrowParens**: `"always"` - всегда использовать скобки для arrow functions
- **endOfLine**: `"lf"` - Unix-стиль переводов строк
- **vueIndentScriptAndStyle**: `false` - не делать отступ для `<script>` и `<style>` в Vue файлах
- **htmlWhitespaceSensitivity**: `"css"` - чувствительность к пробелам в HTML по правилам CSS

## Команды

### Форматировать все файлы

```bash
pnpm run format
```

### Проверить форматирование без изменений

```bash
pnpm run format:check
```

## Интеграция с редактором

### VS Code

Установите расширение [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

Добавьте в `.vscode/settings.json`:

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "[vue]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

### WebStorm / IntelliJ IDEA

1. Откройте Settings → Languages & Frameworks → JavaScript → Prettier
2. Укажите путь к Prettier: `node_modules/prettier`
3. Включите "On save" для автоматического форматирования

## Игнорируемые файлы

Файлы и папки, которые не нужно форматировать, указаны в `.prettierignore`:

- `node_modules/`
- `dist/`
- `build/`
- Lock-файлы пакетных менеджеров
- IDE конфигурации
- Системные файлы

## Перед коммитом

Рекомендуется запускать форматирование перед каждым коммитом:

```bash
pnpm run format
git add .
git commit -m "Your message"
```

Или используйте `format:check` в CI/CD pipeline для проверки соответствия стилю.


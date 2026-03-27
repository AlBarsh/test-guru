# Test IT Guru

Веб-приложение для управления товарами с авторизацией и таблицей продуктов.

## Технологии

- **React 19** + **React Router 7**
- **TypeScript**
- **Tailwind CSS v4**
- **TanStack Query** + **TanStack Table**
- **React Hook Form** + **Zod**
- **Radix UI** компоненты

## Архитектура

Проект построен по методологии **Feature-Sliced Design (FSD)**:

- `app/` - конфигурация приложения, стили, роуты
- `pages/` - страницы приложения
- `widgets/` - сложные составные блоки
- `features/` - функциональные возможности
- `entities/` - бизнес-сущности
- `shared/` - переиспользуемые компоненты и утилиты

## Установка и запуск

```bash
# Установка зависимостей
npm install

# Запуск dev сервера
npm run dev

# Сборка проекта
npm run build

# Запуск production сервера
npm start
```

## Тестовые данные для входа

API: `https://dummyjson.com`

Для авторизации используйте:
- **Username:** `emilys`
- **Password:** `emilyspass`

Или любые другие учетные данные из [DummyJSON Users](https://dummyjson.com/users)

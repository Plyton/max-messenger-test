# MAX Messenger Test

## Описание

MAX Messenger Test — минималистичное frontend-приложение для отправки и получения текстовых сообщений в MAX. Внешний вид интерфейса основан на web.max.ru.

Проект тестового задания использует React, TypeScript и Vite. Для работы с MAX используется GREEN-API.

## Требования

- Node.js
- npm
- Настроенный GREEN-API instance и его credentials

## Локальный запуск

```bash
git clone <repository-url>
cd max-messenger-test
npm install
```

Создайте файл `.env` на основе `.env.example` и укажите credentials своего GREEN-API instance и идентификатор чата:

```env
VITE_GREEN_API_BASE_URL=
VITE_GREEN_API_ID_INSTANCE=
VITE_GREEN_API_TOKEN_INSTANCE=
VITE_GREEN_API_CHAT_ID=
```

Запустите dev-сервер:

```bash
npm run dev
```

## Как работает обмен сообщениями

- Исходящие сообщения отправляются через GREEN-API методом `SendMessage`.
- Входящие сообщения получаются через GREEN-API HTTP API методом `ReceiveNotification` с использованием **long polling**.
- Поддерживаются только текстовые сообщения.
- После получения notification приложение обрабатывает только входящее текстовое сообщение.
- Обработанное notification удаляется через `DeleteNotification`.
- Входящие сообщения появляются в интерфейсе без перезагрузки страницы.
- Polling выполняется последовательно и продолжается, пока приложение открыто.
- При ошибке polling выполняется повторная попытка с небольшой задержкой.
- Для остановки polling при размонтировании React-компонента используется `AbortController`.

## Безопасность

- Реальные credentials GREEN-API не должны попадать в Git-репозиторий.
- Файл `.env` исключён из репозитория с помощью `.gitignore`.
- `.env.example` содержит только названия переменных без реальных credentials.
- Приложение напрямую взаимодействует с GREEN-API из frontend. Переменные `VITE_*` доступны клиентскому приложению и не являются скрытыми от браузера.
- Онлайн-версия приложения не предоставляется: frontend-приложению для работы нужны credentials конкретного GREEN-API instance.

## Технологии

- React
- TypeScript
- Vite
- GREEN-API
- SCSS Modules

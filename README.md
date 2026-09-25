# MAX Messenger Test

## Описание

MAX Messenger Test — небольшое React-приложение для обмена текстовыми сообщениями в стиле MAX.

Проект использует React, TypeScript и Vite. Исходящие сообщения отправляются через GREEN-API, а входящие сообщения получаются через GREEN-API HTTP API. Для ожидания новых сообщений используется механизм **long polling**.

## Требования

- Node.js
- npm
- Настроенный GREEN-API instance

## Локальный запуск

```bash
git clone <repository-url>
cd max-messenger-test
npm install
```

Создайте файл `.env` на основе `.env.example` и заполните его значениями своего GREEN-API instance:

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

## Проверка проекта

Проверка кода и production-сборки выполняется командами:

```bash
npm run lint
npm run build
```

Команда `lint` проверяет исходный код с помощью ESLint. Команда `build` проверяет TypeScript и собирает production-версию приложения через Vite.

## Как работает обмен сообщениями

- Исходящие сообщения отправляются через GREEN-API методом `SendMessage`.
- Входящие сообщения получаются через GREEN-API методом `ReceiveNotification`.
- Для ожидания новых сообщений используется **long polling**.
- После получения notification приложение проверяет его тип и обрабатывает только входящее текстовое сообщение.
- Обработанное notification удаляется через `DeleteNotification`.
- Входящие сообщения появляются в интерфейсе без перезагрузки страницы.
- Polling выполняется последовательно и продолжается, пока приложение открыто.
- При ошибке polling выполняется повторная попытка с небольшой задержкой.
- Для остановки polling при размонтировании React-компонента используется `AbortController`.

## Безопасность

- `.env` добавлен в `.gitignore`.
- Реальные GREEN-API credentials нельзя публиковать в GitHub.
- `.env.example` содержит только имена переменных без секретных значений.
- Токен GREEN-API не должен находиться в исходном коде или README.

## Технологии

- React
- TypeScript
- Vite
- GREEN-API
- CSS

# MAX Messenger Test
Минималистичное frontend-приложение для отправки и получения текстовых сообщений в MAX через GREEN-API.

## Стек

- React
- TypeScript
- Vite
- SCSS Modules
- GREEN-API

## Требования

- Node.js
- npm
- GREEN-API instance
- `idInstance` и `apiTokenInstance`

## Запуск

```bash
git clone <repository-url>
cd max-messenger-test
npm install
```

Введите `idInstance` и `apiTokenInstance` в форме подключения. Приложение проверит подключение через `GetStateInstance`.

После подключения укажите номер получателя. Приложение проверит аккаунт через `CheckAccount` и получит `chatId`.

## Обмен сообщениями

- Отправка — `SendMessage`.
- Получение — `ReceiveNotification` через long polling.
- Поддерживаются текстовые сообщения.
- Обработанные notifications удаляются через `DeleteNotification`.
- Входящие сообщения отображаются без перезагрузки страницы.
- При ошибке polling выполняется повторная попытка.

## Хранение данных

Приложение работает без backend.

`idInstance` и `apiTokenInstance` хранятся только в памяти приложения и не сохраняются после перезагрузки страницы.

## Скрипты

```bash
npm run dev
npm run build
npm run lint
```

### Описание проекта:

Ремейк логической игры "Взлом" из вселенной Cyberpunk2077.
Подробное объяснение правил - в разделе "Tutorial".

### Видео с описанием функциональности приложения:

https://www.loom.com/share/14336d4fb05949e6adf23a34c9e223c0

### Проект на Netlify:

https://cybreach.netlify.app

### Как запускать?

1. Убедитесь что у вас установлен `node` и `docker`
2. Выполните команду `yarn bootstrap`

I) Запустить только клиент:

1. Выполните команду `yarn dev --scope=client`

II) Запустить только сервер:

Предварительно требуется произвести build клиента, чтобы корректно работал server side rendering, для этого:

1. Перейти в каталог `packages/client`

```
cd packages/client
```

2. Произвести build клиента

```
yarn build:ssr
```

3. Перейти в каталог `packages/server`

```
cd ../packages/server
```

4. Запустить сервер

```
yarn dev
```

5. По адресу http://localhost:3001 будет доступно приложение

III) Запустить клиент и серве:

Предварительно требуется произвести build клиента, чтобы корректно работал server side rendering, для этого:

1. Перейти в каталог `packages/client`

```
cd packages/client
```

2. Запустить локальный сервер клиент

```
yarn dev:ssr
```

3. Перейти в каталог `packages/server`

```
cd ../packages/server
```

4. Запустить сервер

```
yarn dev
```

5. По адресу http://localhost:3001 будет доступно приложение

### Как добавить зависимости?

В этом проекте используется `monorepo` на основе [`lerna`](https://github.com/lerna/lerna)

Чтобы добавить зависимость для клиента
`yarn lerna add {your_dep} --scope client`

Для сервера
`yarn lerna add {your_dep} --scope server`

И для клиента и для сервера
`yarn lerna add {your_dep}`

Если вы хотите добавить dev зависимость, проделайте то же самое, но с флагом `dev`
`yarn lerna add {your_dep} --dev --scope server`

### Тесты

Для клиента используется [`react-testing-library`](https://testing-library.com/docs/react-testing-library/intro/)

`yarn test`

### Линтинг

`yarn lint`

### Форматирование prettier

`yarn format`

### Production build

`yarn build`

И чтобы посмотреть что получилось

`yarn preview --scope client`
`yarn preview --scope server`

## Хуки

В проекте используется [lefthook](https://github.com/evilmartians/lefthook)
Если очень-очень нужно пропустить проверки, используйте `--no-verify` (но не злоупотребляйте :)

## Ой, ничего не работает :(

Откройте issue, я приду :)

## Автодеплой статики на vercel

Зарегистрируйте аккаунт на [vercel](https://vercel.com/)
Следуйте [инструкции](https://vitejs.dev/guide/static-deploy.html#vercel-for-git)
В качестве `root directory` укажите `packages/client`

Все ваши PR будут автоматически деплоиться на vercel. URL вам предоставит деплоящий бот

## Production окружение в докере

Перед первым запуском выполните `node init.js`

`docker compose up` - запустит три сервиса

1. nginx, раздающий клиентскую статику (client)
2. node, ваш сервер (server)
3. postgres, вашу базу данных (postgres)

Если вам понадобится только один сервис, просто уточните какой в команде
`docker compose up {sevice_name}`, например `docker compose up server`

[Документация](docs/README.md)

# Для запуска проекта, необходимо выполнить следующие шаги:

1. Склонировать репозиторий с api

2. Переименовать файл ".env.local" в ".env" (убрать .local)

3. Запустить БД с помощьб команды 
```
docker-compose up -d
```

4. Перейдите в папку backend_books
```
cd backend
```

5. Создайте миграцию
```
yarn migration
```

5. Выполните миграцию
```
yarn migrate
```

7. Запустить backend 
```
yarn dev или yarn start
```

# 2. CRUD операции 

- `POST /users/register` – регистрация нового пользователя.
- `POST /users/login` – аутентификация пользователя и возврат JWT токена.

# Для работы с преоктом необходимо установить Docker

```
https://www.docker.com
```

# Для запуска проекта, необходимо выполнить следующие шаги:

1. Склонировать репозиторий с api
   ```
   git clone https://github.com/fra1m/Books_test_zadanie.git
   ```

2. Перейдите в папку backend_books
   ```
   cd backend_books
   ```

3. Запустить БД и REST API с помощью команды 
   ```
   docker-compose up --build
   ```
   или в фоновом режиме 
   ```
   docker-compose up --build -d
   ```

4. Создайте миграцию
   ```
   yarn migration
   ```

5. Выполните миграцию
   ```
   yarn migrate
   ```

   Для отката миграции
   ```
   yarn revert
   ```

# Если команды `yarn migration` или `yarn migrate` не работают то тогда установитe зависимости вручную
1. Перейдите в папку backend_books
   ```
   cd backend_books
   ```
2. Установите зависимости
   ```
   yarn
   ```
# CRUD операции 

- `POST http://localhost:3000/users/register` – регистрация нового пользователя.
- `POST http://localhost:3000/users/login` – аутентификация пользователя и возврат JWT токена.
- `POST http://localhost:3000/books` – добавление новой книги (только для аутентифицированных пользователей).
- `GET http://localhost:3000/books` – получение списка всех книг.
- `GET http://localhost:3000/books/:id` – получение детальной информации о книге по ID.
- `PUT http://localhost:3000/books/:id` – обновление информации о книге по ID (только владелец книги).
- `DELETE http://localhost:3000/books/:id` – удаление книги по ID (только владелец книги).

# Library Control - UTE

# How to Run

### Create a file .env
```sh
    APP_PORT=4000
    MYSQL_HOST=127.0.0.1
    MYSQL_USERNAME=root
    MYSQL_PASSWORD=test
    MYSQL_PORT=3306
    MYSQL_DATABASE=library_control_ute
    JWT_SECRET=library_control_ute2020
    JWT_EXPIRE_IN=7d
```

### Create file ormconfig.json

```sh
{
    "type": "mysql",
    "username": "root",
    "password": "test",
    "host": "localhost",
    "port": 3306,
    "database": "library_control_ute",
    "entities": [
        "src/modules/**/*.entity.{ts,js}"
    ],
    "migrations": ["src/database/migrations/*{.ts, .js}"],
    "cli": {
        "migrationsDir": "src/database/migrations"
    }
}
```

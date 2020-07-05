# Library Control - UTE

# How to Run

### Create a file .env
```sh
    APP_PORT=4000
    MYSQL_HOST=localhost
    MYSQL_USERNAME=root
    MYSQL_PASSWORD=test
    MYSQL_PORT=3306
    MYSQL_DATABASE=library_control_ute
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

#!/bin/sh

if [ "$DATABASE" = "postgres" ]
then
    echo "Waiting for postgres..."

    while ! nc -z $SQL_HOST $SQL_PORT; do
      	sleep 0.1
    done

    echo "PostgreSQL started"
fi

python manage.py migrate
python manage.py create_group
python manage.py collectstatic --noinput

exec "$@"
# pull official base image
FROM python:3.9.13

# set work directory
WORKDIR /usr/src/protecrud

# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# install psycopg2 dependecies
RUN apt-get update \
	&& apt-get install -y postgresql gcc python3-dev musl-dev netcat

# install dependecies
RUN pip install --upgrade pip
COPY ./requirements.txt .
RUN pip install -r requirements.txt

# copy entrypoint.sh
COPY ./entrypoint.sh .
RUN sed -i 's/\r$//g' /usr/src/protecrud/entrypoint.sh
RUN chmod +x /usr/src/protecrud/entrypoint.sh

# copy project
COPY . .

# run entrypoint.sh
ENTRYPOINT ["/usr/src/protecrud/entrypoint.sh"]
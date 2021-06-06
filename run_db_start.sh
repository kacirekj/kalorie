#!/bin/bash

docker volume create mywebdata2

docker run --rm --name myweb-docker --mount source=mywebdata2,target=/var/lib/postgresql/data -e POSTGRES_PASSWORD=myPasswd123456789 -d -p 50000:5432 postgres:10.16

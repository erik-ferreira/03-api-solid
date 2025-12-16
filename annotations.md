# Anotações

## Docker

Comando para rodar o Postgres via Docker

```base
docker run --name api-solid-pg -e POSTGRESQL_USERNAME=username -e POSTGRESQL_PASSWORD=password -e POSTGRESQL_DATABASE=database -p 5432:5432 bitname/postgresql
```

O -e server para informar uma variável de ambiente, no caso o usuário, senha e database do Postgres
O -p serve para mapear a porta do container com a porta da máquina local, quando eu acessar a porta 5432 da minha máquina local, eu estarei acessando a porta 5432 do container

### Comandos

- `docker ps` - Mostra todos os containers rodando no momento
- `docker ps -a` - Mostra todos os containers que executei em algum momento, mesmo os que não estão rodando
- `docker start <nome ou id do container>` - Inicia um container parado
- `docker stop <nome ou id do container>` - Para um container em execução
- `docker rm <nome ou id do container>` - Remove um container em execução

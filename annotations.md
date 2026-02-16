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

## Docker Compose

Arquivo `docker-compose.yml` para subir o Postgres sem ter que ficar digitando o comando todo hora

```yml
version: "3"

services:
  api-solid-pg:
    image: bitnami/postgresql:latest
    ports:
      - 5432:5432
    environment:
      - POSTGRESQL_USERNAME=docker
      - POSTGRESQL_PASSWORD=docker
      - POSTGRESQL_DATABASE=apisolid
```

### Comandos

- `docker compose up -d` - Sobe os containers em segundo plano
- `docker compose stop` - Para os containers em execução
- `docker compose down` - Para e deleta os containers

## Prisma

- `npx prisma migrate dev` - Roda as migrations pendentes no banco de dados de desenvolvimento
- `npx prisma migrate build` - Roda as migrations pendentes no banco de dados de produção

## Princípios SOLID

- `D` - Dependency Inversion Principle (Princípio da Inversão de Dependência)
  - Ex: Meu caso de uso para criar um usuário depende do user repository para criar um usuário no banco de dados. Nesse princípio, vai mudar como o meu caso de uso tem acesso as dependências. Ao invés do meu caso de uso instanciar e usar o user repository diretamente, ele vai receber essa instância por parâmetro no construtor de uma classe.

```ts
class RegisterUserCas {
  private userRepository: any

  constructor(userRepository: any) {}
    this.userRepository = userRepository
  }
}


/*
Quando eu quero que um parâmetro recebido no meu construtor, vire automaticamente uma propriedade
da minha classe, basta informar uma keyword de acesso (private, public, protected) antes do nome do parâmetro,
ficando dessa forma:
*/

class RegisterUserCas {
  constructor(private userRepository: any) {}
}
```

## Testes

```js
describe("Register Use Case", () => {
  it("should hash user password upon registration", async () => {
    const userRepository = new PrismaUsersRepository()
    const registerUseCase = new RegisterUseCase(userRepository)

    const { user } = await registerUseCase.execute({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123456",
    })

    const isPasswordCorrectlyHashed = await compare(
      "123456",
      user.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })
})
```

- Teste unitário testa uma única parte isolada da aplicação
- Teste unitário nunca vai tocar em camadas externas da aplicação
- Ao usar o PrismaUsersRepository, eu estou testando a integração do meu caso de uso com o banco de dados, ou seja, não é um teste unitário, e sim um teste de integração

```js
const registerUseCase = new RegisterUseCase({
  async findByEmail(email) {
    return null
  },

  async create(data) {
    return {
      id: "user-1",
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      created_at: new Date(),
    }
  },
})
```

- Dessa forma eu consigo criar um repositório fake, que implementa a mesma interface do repositório real, mas não toca no banco de dados, assim eu consigo isolar o meu caso de uso e testar apenas ele

## Factory Pattern

- Fábrica de criação de coisas comuns que tem muitas dependências

## TDD

- Test-driven development - Desenvolvimento dirigido a testes
- Se eu desenvolvo o teste de alguma funcionalidade antes da implementação, o teste ajuda a validar se a implementação ta ok ou não

### 1º etapa - red

- Erro no teste, funcionalidade não esta implementada ainda

### 2º etapa - green

- Desenvolver o mínimo possível para que os testes passem

### 3º etapa - refactor

- Para melhorar o código

## Testes E2E

- Testes E2E precisam bater no banco de dados, se tiver muito mock, não é uma boa estratégia, deve ser o mais fiel possível; Não utilizar o banco de produção da aplicação, deve se criar um banco para testes.
- Um teste não deve afetar outros testes, ou seja, um teste que cria usuários, não pode afetar um teste que lista usuários

### Suíte de testes

- Um arquivo com vários testes ja é uma suíte de testes
- Uma boa estratégia pode ser criar um ambiente isolado no banco de dados para cada suíte de testes; Dessa forma não abro mão do isolamento e nem da performance;
- Pode-se utilizar o conceito de Test Environment, que tem tanto no jest quanto no vitest; Com essa funcionalidade, eu posso dizer que todos os testes que estiverem naquele arquivo específico, devem usar variáveis específicas.

### Configurações

- No `vite.config.ts`:

```ts
export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    dir: "src",
    projects: [
      {
        // property to extend only the test settings
        extends: true,
        test: {
          name: "unit",
          dir: "src/use-cases",
        },
      },
      {
        extends: true,
        test: {
          name: "e2e",
          dir: "src/http/controllers",
          environment:
            "./prisma/vitest-environment-prisma/prisma-test-environment.ts",
        },
      },
    ],
  },
})
```

## Ambiente de CI/CD

- CI = Continuous Integration
- CD = Continuous Delivery / Continuous Deployment

- Ambiente de Integração Contínua, onde o código é integrado e testado automaticamente a cada mudança, garantindo que o código esteja sempre funcionando e que os testes estejam passando

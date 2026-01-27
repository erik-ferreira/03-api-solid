# App

Gympass style app.

## RFs(Requisitos funcionais)

Funcionalidades da aplicação, ou seja, o que vai ser possível do usuário fazer na aplicação

- [x] Deve ser possível se cadastrar;
- [ ] Deve ser possível se autenticar;
- [ ] Deve ser possível obter o perfil de um usuário logado;
- [ ] Deve ser possível obter o número de check-ins realizados pelo usuário logado;
- [ ] Deve ser possível o usuário ver seu histórico de check-ins;
- [ ] Deve ser possível o usuário buscar academias próximas;
- [ ] Deve ser possível o usuário buscar academias pelo nome;
- [ ] Deve ser possível o usuário realizar check-in em uma academia;
- [ ] Deve ser possível validar o check-in de um usuário;

## RNs(Regras de negócio)

São caminhos e condições que cada requisito funcional pode tomar

- [x] O usuário não deve poder se cadastrar com email duplicado;
- [ ] O usuário não pode fazer dois check-in no mesmo dia;
- [ ] O usuário não pode fazer check-in se não estiver perto(100m) da academia;
- [ ] O check-in só pode ser validado até 20 minutos após ser criado;
- [ ] O check-in só pode ser validado por administradores;
- [ ] A academia só pode ser cadastrada com administradores;

## RNFs(Requisitos não funcionai)

Requisitos que não partem do cliente, são mais técnicos do que funcionalidades, como qual banco utilizar, qual estratégia de autenticação e etc

- [x] A senha precisa estar criptografada;
- [ ] Os dados da aplicação precisam estar persistidos em um banco PostgresSQL;
- [ ] Todas as listas de dados precisam estar paginadas com 20 itens por página;
- [ ] O usuário deve ser identificado por um JWT (JSON Web Token);

## Ex:

- RF: Deve ser possível o usuário fazer check-in
- RN: O usuário só vai poder fazer check-in se tiver a menos de 10km da academia

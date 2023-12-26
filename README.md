# TESTE FE - ACTIVE BI

## O que será avaliado?

1. Integração com API
1. Tratamento de Erro
1. Validação de JWT
1. Utilização de formulários

## Apresentação do Projeto

Um sistema feito para um campeonato de robótica, utilizado para o lançamento de pontos __POR EQUIPE__ em determinadas modalidades.
ao final do teste o Usuário seleciona a equipe, a pontuação em cada aspecto e efetua o lançamento.

### Aspectos técnicos

1. O sitema conta com uma tela de login, com usuário e senha.
1. O sistema conta com uma tela de lançamento de pontuação.
1. A estilização é feita com bootstrap 5 e foi desenvolvida para mobile.
   
## Requisitos mínimos :white_check_mark: :white_square_button: :white_square_button: :triangular_flag_on_post:

### Rotas da aplicação

O primeiro ponto ao se olhar pra uma apliação são as rotas e os componentes que as compõem. E oque define se a rota será renderizada ou não são os __GUARDS__:

1. Quando o usuário loga na aplicação, um Token é salvo no LocalStorage. Ao entrar novamente na aplicação devemos verificar se esse token já existe (isso inidica que o usuário já está logado), e caso exista redirecionamos para a tela de lançamento da pontuação do time (TeamScoreComponent). Caso não exista token no localStorage o usuário deverá ser redirecionado para a tela de LOGIN (LoginComponent).

1. Ao passar 24 horas, o __Token__ do usuário expira, e a aplicação deverá fazer a verificação de validade do Token. Caso o token esteja expirado o Usuário tem o localStorage Limpo e volta para o Login.

### Login

```normalmente a verificação da segurança de senha é feita no cadastro, porém faremos no login por fins avaliativos.```

1. Faça uma verificação de senha, de modo que uma senha segura precise ser inserida antes da solicitação de Login.
    - Precisa ter no mínimo 6 caracteres
    - Precisa ter no mínimos uma letra maiúscula
    - Precisa ter no mínimo uma letra minúscula
    - Precisa ter no mínimo um caracter especial

### Lançamento da pontuação

1. Verificar se uma __EQUIPE__ foi selecionada antes de lançar a pontuação.
2. Fazer um tratamento de erro caso a requisição falhe
3. ```(BÔNUS) - Faça com que a mensagem 'Falha ao lançar pontuação' seja exibida para o usuário. Dica: use o ngx-toastr```


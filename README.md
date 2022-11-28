# Projeto - Jogo de Trivia 🃏

Bem vindo ao repositório do **Jogo Trivia**.

###### Projeto desenvolvido em time pelos integrantes: 🎯
- **Guilherme Artigas _[LinkeDIn](https://www.linkedin.com/in/guilherme-artigas/)_**
- Felipe Pinto _[LinkeDIn](https://www.linkedin.com/in/felipe-pinto-coder/)_
- Igor Cruz _[LinkeDIn](https://www.linkedin.com/in/igorcruzcf/)_
- Marcel Guimarães _[LinkeDIn](https://www.linkedin.com/in/marcel-guimar%C3%A3es/)_

## Introdução 😀

O objetivo aqui, foi colocar em prática tudo o que você aprendei sobre **React** e **Redux**, enquanto praticava a organização de um projeto em equipe com a metodologia agile **Kanban**. Projetos raramente são individuais. Eles são sempre o resultado do esforço conjunto de um time que precisa gerenciar demandas mais e menos prioritárias, que dependem umas das outras para entregar um produto rápido e bem feito.

## Caracteristicas/Funcionalidades 🪛

Eu e meus colegas recebos o desafio de desenvolver um jogo de perguntas e respostas baseado no jogo Trivia, parecido um show do milhão americano, utilizando **React**, **Redux**, **React-Router**, **RTL**.

O app começa com uma tela na qual a pessoa que joga coloca seu nome e seu e-mail. O e-mail será usado para buscar a foto associada no site Gravatar, se houver.

Logo após, ela é redirecionada para o jogo em que deve escolher uma das respostas disponíveis para cada uma das perguntas. A resposta deve ser marcada antes de o contador de tempo chegar a zero; caso contrário, a resposta deve ser considerada como errada.

Cada acerto dá pontos que deverão ser computados num placar, no header da aplicação, à pessoa que joga. Após 5 perguntas respondidas, a pessoa que joga é redirecionada para uma tela de score, em que o texto mostrado vai depender do número de acertos. No fim de cada jogo, a pessoa que joga pode acessar o ranking com as melhores pontuações.

#### Funcionalidades desenvolvidas por mim:

- Tela inicial do jogo e configuração do **Redux** (feito por toda a equipe);
- Componente que redireciona a pessoa para a página de configurações;
- Requisição para a API para popular o jogo com as perguntas, categoria e alternativas;
- Timer da tela de game;
- Lógica que assinala as perguntas corretas e erradas;
- Lógica de soma quando as perguntas são respondidos de forma correta;
- Opção da pessoa jogar novamente;
- Cobertura de testes na página "Feedback" e ajuda na cobertura total da aplicação.

## Tecnologias Utilizadas ✅

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
<br />
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
<br />
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
<br />
![Testing-Library](https://img.shields.io/badge/-TestingLibrary-%23E33332?style=for-the-badge&logo=testing-library&logoColor=white)

### Para acessar o projeto basta acessar este link

- https://guilherme-artigas.github.io/Trivia/

Obrigado pela visita! ❤️
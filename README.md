# 📧  config - curso para orientação de configuração de email profissional 


URL do repositório:
# 📧 URL do repositório : 
https://github.com/UthieleGuim/Config_quiz.git

# 📧 URL  pública :
https://uthielequizconfig.netlify.app/

# 📧  config

 Configuração de E-mail Profissional - Processo criativo 
 Ao analisar o tema a solução por questão do prazo foi realizar duas telas, onde na primeira ter a informação, observações importantes de como configurar um email profissional, isso é titulos em h2 para chamar atenção, além das observação com emoticon💡 Importante e um na cor #34D399.

O curso tem as informação que precisa para realizar o teste sobre configuração de contas de e-mail profissional, foi desenvolvido com React.


## Decisões Técnicas e Uso de Inteligência Artificial 

O projeto foi desenvolvido com o auxílio de Inteligência Artificial (Claude AI).
Na questão sobre o tema e questões, além disso foi uma forma de acelerar  para realização de ajustes e se caso ocorre bugs.
O processo  de desenvolvimento foi para garantir a implementação de boas práticas. 

Além disso com o uso permitiu criar rapidamente uma estrutura completa e funcional, economizando tempo no desenvolvimento.


Assim foi realizado 
HTML semântico com padrões de código limpo, estrutura de componentes React, e bootstrap
Responsividade
Sistema de temas
Persistência de dados
Integração com APIs

Foi mantido um padrão consistente em todo o projeto, para facilitar a manutenção futura.

Assim otimizações:
   - Imagens SVG vetoriais
   - CSS com variáveis para temas
   - Estrutura de componentes reutilizáveis

Referente ao quiz, fiz de uma forma que o usuario consegue realizar o teste mais de uma vez, onde tem três tentativas, ao errar as 3 ou acerta passa para o próximo e assim em diante. 



As Funcionalidades:

- **Tema Profissional**: Foco em configuração de e-mail profissional
- **3 Tipos de Exercícios**: Escolha Única, Múltipla Escolha e Combobox
- **Sistema de Tentativas**: Máximo de 3 tentativas por exercício
- **Feedback Imediato**: Receba feedback após cada tentativa
- **Persistência**: Seu progresso é salvo automaticamente
- **Resultados Finais**: Você consegue ver sua pontuação e aproveitamento ao termina o exercicio combobox.
- **Persistência de Dados**: Progresso salvo automaticamente no localStorage
- **Modo Escuro/Claro**: Alternância de temas com preferência salva
- **Integração com API**: Dados dinâmicos de API pública
- **Design Responsivo**: Interface adaptável para desktop e mobile
- **HTML Semântico**: Estrutura acessível com tags apropriadas
- **Paleta de Cores Personalizada**: Cores profissionais (#1E3A8A, #34D399, #D1D5DB)




## Desafios Enfrentados e Soluções

Primeiramente, tive o desafio sobre as cores e a estrutura, pensei no começo realizar em mais de uma página, só que a lógica de soma entre as questões começou a falha(erros e só um dos exercisos era somado), além disso, não conseguia deixar habilitado a primeira questão (como estava salvando no localstorage) tinha que recarregar a pagina e realizar a limpeza devido a falta do node, além disso começou a apresentar erros.
A solução foi no  useEffect a const existsResults, pois se já existir pelo menos uma chave no localStorage que comece com "exercise_" será true e false caso contrário.

Além disso se limpar o localStorage ou não tiver nenhuma chave que comece com "exercise_", existsResults será false.

Ainda referente aos exercios :

As Solução: foi criação de um sistema de estado local para cada exercício, implementação de localStorage para persistir tentativas e respostas e lógica de pontuação baseada em tentativas (3-2-1-0 pontos)

Sobre os componentes distintos para Escolha Única, Múltipla Escolha e Combobox a solução foi: 
Criação de componentes especializados para cada tipo, sistema unificado de feedback e pontuação e reutilização de estilos e estrutura base.

Sobre integração com API Externa: usei a API pública(GitHub API) em um dos exercícios para demonstrar requisições assíncronas.
E o uso dela foi para buscar dados do repositório VS Code, implementação de loading states e tratamento de erros e exibição dos dados de forma contextual no exercício Combobox.

A implementar alternância entre modo claro e escuro com persistência de preferência:
Foi uso de CSS Variables para cores dinâmicas, implementação de toggle com localStorage e transições suaves entre temas.

Já a responsividade completa que é garantir que a aplicação funcione perfeitamente em desktop e mobile.
A solução foi o Design mobile-first com CSS Grid e Flexbox, Breakpoints responsivos e Componentes adaptáveis para diferentes tamanhos de tela.
Porém ainda não apresenta total e estou resolvendo sobre.

Sentir muita dificuldade na persistência de Dados Complexa, pois o 
desafio era salvar o progresso de múltiplos exercícios com diferentes estados (tentativas, respostas, conclusão).

Nisso a solução foi sistema de chaves únicas para cada exercício no localStorage, estrutura de dados hierárquica para organizar o progresso
e recuperação automática do estado ao recarregar a página

Já na paleta de Cores Específica onde desafio de Implementar exatamente as cores especificadas (#1E3A8A, #34D399, #D1D5DB) mantendo acessibilidade.
Só que referente a acessibilidade tanto nos select, input, textarea teve que ser adicionado attributes de acessibilidade como aria-label/title. 
Então assim no input range foi adicionado aria-label,title,aria-valuemin e aria-valuemax, no select foi adicionado aria-label e title.
Teve também a solução do uso de CSS Variables para facilitar manutenção, teste de contraste para garantir legibilidade e implementação de cores de fallback para compatibilidade.
Em alguns botões foi colocado as cores #34D399(principalmente na nav).



## 🎨 Tecnologias Utilizadas

- **React 18**: Biblioteca para interface de usuário
- **React Router**: Navegação entre páginas
- **CSS Variables**: Sistema de temas dinâmicos
- **LocalStorage**: Armazenamento local de dados
- **Fetch API**: Requisições assíncronas para APIs externas
- **SVG**: Imagens vetoriais otimizadas para web



##  Como rodar localmente:

## 🛠️ Instalação

1. git clone <url> ou baixe o projeto 

2. Navegue até a pasta do projeto:
   ```bash
   cd quiz-desafio
   ```

3. Instale as dependências:
   ```bash
   npm install
   ```

4. Execute o projeto:
   ```bash
   npm start



## 📋 Pré-requisitos

- Node.js (versão 14 ou superior)
- npm ou yarn





## 🚀 Deploy

Para fazer o build de produção:

```bash
npm run build
```

Os arquivos otimizados serão gerados na pasta `build/`.





## 📁 Estrutura do Projeto

```
src/
├── components/
│   ├── Home.js                    # Página inicial do curso
│   ├── Exercises.js               # Componente principal dos exercícios
│   └── exercises/
│       ├── SingleChoice.js        # Exercício de escolha única
│       ├── MultipleChoice.js      # Exercício de múltipla escolha
│       └── Combobox.js            # Exercício com combobox
├── App.js                         # Componente principal com roteamento e tema
├── index.js                       # Ponto de entrada da aplicação
└── index.css                      # Estilos personalizados com variáveis CSS
public/
└── images/
    └── email-setup.svg            # Imagem otimizada para web
```











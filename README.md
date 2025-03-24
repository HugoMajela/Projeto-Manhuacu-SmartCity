# API do site Manhuaçu Smart City

Esse projeto se trata de uma API para o site de promoções e busca de produtos da região de Manhuaçu

## Importações Utilizadas  
- **Node.js** - Ambiente de execução JavaScript  
- **Express** - Framework para aplicações web  
- **MongoDB** - Banco de dados
- **Mongoose** - Biblioteca para manipular os dados no MongoDB
- **Cors** e **Body-parser** - Ferramentas para manipular requisições

## Funcionalidades  
- Criar, listar e deletar empresas  
- Criar, listar e deletar produtos  
- Associar produtos a empresas  
- Buscar produtos por nome e descrição
- Cadastro, login e autenticação de usuários

## Estrutura de Arquivos
- db.js: Conexão com o banco de dados MongoDB.
- models/Empresa.js: Define o modelo de dados para empresas.
- models/Produto.js: Define o modelo de dados para produtos.
- models/Usuario.js: Define o modelo de dados para usuários.
- routes/rotasEmpresa.js: Rotas para criação, listagem e exclusão de empresas.
- routes/rotasProduto.js: Rotas para criação, listagem, exclusão e pesquisa de produtos.
- routes/rotasUsuario.js: Rotas para cadastro, login e autenticação de usuários.

# Rotas

## Empresas
<table>
  <tr>
    <th>Método</th>
    <th>Rota</th>
    <th>Descrição</th>
  </tr>
  <tr>
    <td>POST</td>
    <td>/api/empresas</td>
    <td>Criar uma nova empresa</td>
  </tr>
  <tr>
    <td>GET</td>
    <td>/api/empresas</td>
    <td>Listar todas as empresas</td>
  </tr>
  <tr>
    <td>DELETE</td>
    <td>/api/empresas/:id</td>
    <td>Remover uma empresa</td>
  </tr>
  <tr>
    <td>POST</td>
    <td>/api/empresas/:id/produtos</td>
    <td>Associar um produto a uma empresa</td>
  </tr>
</table>

## Produtos
<table>
  <tr>
    <th>Método</th>
    <th>Rota</th>
    <th>Descrição</th>
  </tr>
  <tr>
    <td>POST</td>
    <td>/api/produtos</td>
    <td>Criar um novo produto</td>
  </tr>
  <tr>
    <td>GET</td>
    <td>/api/produtos</td>
    <td>Listar todos os produtos</td>
  </tr>
  <tr>
    <td>GET</td>
    <td>/api/produtos?pesquisa=pesquisa_usuario</td>
    <td>Buscar produtos por nome ou descrição</td>
  </tr>
  <tr>
    <td>GET</td>
    <td>/api/produtos/:id</td>
    <td>Obter um produto pelo ID</td>
  </tr>
  <tr>
    <td>DELETE</td>
    <td>/api/produtos/:id</td>
    <td>Remover um produto pelo ID</td>
  </tr>
</table>

## Usuários
<table>
  <tr>
    <th>Método</th>
    <th>Rota</th>
    <th>Descrição</th>
  </tr>
  <tr>
    <td>POST</td>
    <td>/api/usuarios/cadastro</td>
    <td>Cadastro de um novo usuário</td>
  </tr>
  <tr>
    <td>POST</td>
    <td>/api/usuarios/login</td>
    <td>Login de um usuário</td>
  </tr>
</table>

## Instruções de uso

Instale o git: https://git-scm.com/downloads

Instale o Node.js: https://nodejs.org/en/download

Descubra onde eles estão instalados

Adiciones ele ao PATH:

No Windows, abra o Painel de Controle → Sistema → Configurações Avançadas → Variáveis de Ambiente.
Encontre a variável Path, clique em Editar e adicione o caminho da pasta bin na pasta Git e da pasta Node.js.

Clone o repositório e instale as dependências:

```bash
git clone https://github.com/HugoMajela/Projeto-Manhuacu-SmartCity.git
cd Projeto-Manhuacu-SmartCity/
npm install
```

## Configuração do Banco de Dados
É necessário possuir o **MongoDB** instalado e rodando localmente: https://www.mongodb.com/try/download/community

## Instale o MongoDB Database Tools para importar o banco de dados da API
Baixe no site: https://www.mongodb.com/try/download/database-tools

Adicione o MongoDB Tools ao PATH

Utilize o código abaixo para recuperar o banco de dados e adicioná-lo ao seu MongoDB via terminal:

```bash
mongorestore --db=produtos backup/produtos/
```

## Executando a API
Inicie o servidor:

```bash
npm start
```
A API rodará em: http://localhost:5000

## Melhorias a serem feitas

Ao fazer o login pela primeira vez, um token de autentificação é criado, porém o sistema não entende
e não carrega para a página principal, só após fazer o login pela segunda vez que o usuário é redirecionado.

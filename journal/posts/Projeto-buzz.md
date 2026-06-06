## ideia

comecei esse projeto pq achei o gerenciador de arquivos do BuzzHeavier meio limitado e queria algo mais organizado e rápido de usar. a ideia é basicamente fazer uma interface própria pra gerenciar tudo sem precisar ficar dependente do site.

## stack

- React
- JavaScript
- Vite
- HTML
- CSS
- BuzzHeavier API

## como funciona

o app faz login usando a API Key da conta do buzzheavier.

depois disso ele busca a estrutura de pastas e arquivos e monta tudo numa interface parecida com um explorador de arquivos.

atualmente dá pra:

- navegar entre pastas
- criar pastas
- renomear arquivos
- renomear pastas
- deletar arquivos
- deletar pastas
- adicionar notas aos arquivos
- fazer upload
- pesquisar arquivos
- ordenar por nome, tamanho, data e expiração
- copiar links rapidamente
- abrir arquivos direto no navegador

## desenvolvimento

até agora a maior parte do tempo foi gasta entendendo como a API do BuzzHeavier funciona pq a documentação não cobre absolutamente tudo.

algumas funções foram relativamente tranquilas de implementar, tipo navegação e renomeação.

outras foram mais chatas, principalmente upload e movimentação de arquivos entre pastas.

teve um momento em que tentei trocar o sistema de mover arquivos por drag and drop. parecia simples mas acabou quebrando metade do projeto pq coloquei uma função no lugar errado dentro do app.jsx e o react simplesmente decidiu nao funcionar.

também teve aquela clássica experiência de apagar arquivos, fazer commit, perceber que fez merda e ter que ressuscitar tudo usando git reflog.

## organização

o projeto tá dividido em componentes menores:

- Header
- Toolbar
- Breadcrumb
- StatsBar
- TableHeader
- FileRow
- Modal
- LoginScreen

isso ajuda bastante pq cada parte da interface fica responsável só pelo que realmente precisa fazer.

## situação atual

o projeto já funciona como um gerenciador de arquivos completo.

agora o foco tá sendo melhorar a experiência de uso, deixar a interface mais limpa e adicionar recursos que o site original não tem.

também tô tentando implementar drag and drop sem destruir o resto da aplicação no processo.

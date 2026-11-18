# Nextfit Context MCP

MCP local para fornecer ao Codex contexto funcional documentado da Nextfit durante tarefas. Projeto independente do repositório de documentação, que é usado apenas para leitura.

## Executar

Requer Node.js 24 ou superior. Na pasta deste projeto:

```powershell
npm ci
npm test
```

A entrega inclui índice inicial com 357 artigos da revisão `926ab74ea888576b7db1d0c1d1d578919e8330e4` da fonte. O servidor funciona sem rede depois da instalação.

## Conectar ao Codex

Adicione o servidor stdio pelo gerenciamento de MCP do Codex, usando:

- Nome: `nextfit-context`
- Comando: caminho absoluto de `node.exe` (nesta máquina, `C:\Program Files\nodejs\node.exe`).
- Argumento: caminho absoluto de `src/server.mjs` desta pasta.

Alternativa, se o CLI Codex estiver disponível:

```powershell
codex mcp add nextfit-context -- node 'C:\CAMINHO\nextfit-context-mcp\src\server.mjs'
```

Consulte `codex-config.example.toml` para configuração manual. Não substitua seu arquivo inteiro: acrescente apenas a seção do servidor. Inicie uma nova conversa após registrar o MCP.

Incorpore o conteúdo de `AGENTS.nextfit.md` ao `AGENTS.md` de cada projeto em que deseja esse contexto, preservando instruções existentes. Esse passo orienta a consulta sem você ter de solicitá-la. Registrar o MCP sozinho não carrega a base automaticamente. Nesta entrega, a configuração global não foi modificada.

## Ferramentas

- `obter_visao_geral`: mapa das categorias e subtemas, contagens, versão e limites.
- `buscar_contexto`: busca textual por seções, sem distinção de acentos, com prioridade para título e cabeçalho. Até 10 resultados, trecho de até 1.800 caracteres por resultado. Sem correspondências retorna lista vazia.
- `ler_artigo`: lê pelo identificador original; páginas de até 12.000 caracteres. Use `nextOffset` para continuar. Links relacionados são IDs aceitos por essa ferramenta.

## Atualizar a base

```powershell
npm run sync
```

Fonte fixa: `VitorTinelli/obsidian-next`, branch `main`, somente arquivos `.md` em `DocsNext/Central Next Fit/`. Apenas notas com `article_id` e título são indexadas. Não executa scripts da fonte. Falhas de download ou análise preservam o índice anterior.

Se o repositório exigir autenticação, disponibilize `GITHUB_TOKEN` no ambiente do processo de sincronização, com acesso de leitura ao repositório. Não grave tokens no código ou no Git. O conector GitHub do Codex não transfere suas credenciais automaticamente para o Node.js. A sincronização não roda ao iniciar o servidor. O índice atualizado fica disponível na chamada seguinte.

## Limitações

Busca textual inicial, sem embeddings, OCR ou transcrição de vídeo. Links entre artigos são aproveitados quando resolvidos; podem existir referências externas sem cópia local. A visão geral é um catálogo de módulos, não um resumo validado de todas as regras. Artigos são referência de uso e podem divergir do código ou do produto atual; a data de importação não comprova atualização da regra. Trechos recuperados passam a compor o contexto enviado ao modelo utilizado pelo Codex.

## Repositório separado

O projeto deve ser mantido em `nextfit-context-mcp`. O arquivo `data/index.json` contém uma cópia derivada da documentação; mantenha o novo repositório privado. Não há alterações no repositório de origem.

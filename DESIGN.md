# Contexto Nextfit para o Codex

Arquitetura aprovada em 18/11/2026: MCP local + contexto geral + instruções AGENTS.md.

Objetivo: fornecer contexto funcional durante tarefas de desenvolvimento e discussão do produto.
Fonte: somente artigos Markdown em DocsNext/Central Next Fit, do repositório VitorTinelli/obsidian-next.
Excluir scripts, plugins, anexos, guias de importação, índices e registros de manutenção do conteúdo pesquisável.

Alternativas consideradas: acesso direto aos Markdown (mais simples, exige disponibilizar os arquivos em cada ambiente); MCP local (escolhido, centraliza recuperação em diferentes projetos).

Implementação proposta: Node.js 24, SDK oficial MCP, YAML para propriedades, índice JSON local e busca textual por seções, sem API de IA nem banco externo. Transporte stdio. Operações: obter_visao_geral, buscar_contexto, ler_artigo. Resultados incluem fonte, versão e links relacionados. Visão geral é um mapa de módulos baseado no catálogo; não inventa regras nem resume artigos automaticamente.

Sincronização explícita do GitHub: listar árvore, baixar somente Markdown do diretório autorizado, indexar somente artigos com article_id. Publicar índice completo por troca atômica; falhas preservam índice anterior. Servidor recarrega índice a cada chamada. Sem executar código do repositório.

Limites: texto somente; imagens e vídeos não interpretados. Data de importação não prova atualização do produto. MCP não injeta toda a base nem garante consulta: instruções no projeto orientam o uso. Sem modificar configuração global do Codex nesta entrega.

Validação: isolamento do escopo, acentos e relevância, links Obsidian, referências, paginação, índice real e chamadas MCP via cliente stdio.

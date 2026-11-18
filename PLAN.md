# Nextfit Context MCP Implementation Plan

**Goal:** entregar servidor local utilizável pelo Codex com fonte rastreável.
**Architecture:** sincronização explícita, índice local e três ferramentas MCP.
**Tech Stack:** Node.js, SDK MCP oficial, YAML, node:test.
**Spec:** DESIGN.md.

## Restrições
Somente artigos Markdown da Central Next Fit; nenhum script remoto executado. Sem configuração global automática. Respostas limitadas e paginadas.

## Riscos a verificar
Unicode; links Obsidian; nenhum resultado; identificadores inexistentes; falha de sincronização preservando índice.

## Tarefas
- [x] Escrever testes de ingestão, busca e leitura; observar falha inicial.
- [x] Implementar core.mjs: buildIndex(files, revision), search(index, query, limit), readArticle(index, id, offset, limit).
- [x] Implementar sync.mjs: sincronizar só Markdown permitido por GitHub e gravar índice atômico.
- [x] Implementar server.mjs com obter_visao_geral, buscar_contexto e ler_artigo.
- [x] Instalar dependências e sincronizar base real.
- [x] Executar testes e cliente MCP sobre stdio.
- [x] Entregar instruções AGENTS.md e configuração local reproduzível.

Ruling: execução na pasta de entrega deste chat; não há checkout de produto a isolar nem branch a integrar. Arquitetura já aprovada; prosseguir sem nova rodada de autorização.


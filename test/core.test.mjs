import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildIndex, search, readArticle } from '../src/core.mjs';

const article = (id, title, text, category='Contratos') => ({path:`DocsNext/Central Next Fit/${category}/${title}.md`,content:`---\ntitle: ${title}\narticle_id: '${id}'\ncategory: ${category}\nsource: https://ajuda.nextfit.com.br/${id}\n---\n# ${title}\n${text}`});
const files = [article('1','Cobrança recorrente','## Regras\nCobrança via cartão.\n[[Central Next Fit/Contratos/Agenda|Agenda]]'), article('2','Agenda','Reserva de aula'), {path:'DocsNext/fora.md',content:'segredo'}, {path:'DocsNext/Central Next Fit/Índice.md',content:'# Índice'}];
test('ingere somente artigos e mantém fontes e relações',()=>{const i=buildIndex(files,'abc');assert.equal(i.articles.length,2);assert.equal(i.revision,'abc');assert.equal(i.articles[0].related[0],'2');assert.equal(i.articles[0].source,'https://ajuda.nextfit.com.br/1');});
test('busca sem acento e retorna seção pertinente',()=>{const r=search(buildIndex(files,'abc'),'cobranca cartao',5);assert.equal(r[0].id,'1');assert.match(r[0].excerpt,/cartão/);assert.equal(search(buildIndex(files,'abc'),'inexistente',5).length,0);});
test('leitura paginada não permite acesso arbitrário',()=>{const i=buildIndex(files,'abc');assert.throws(()=>readArticle(i,'../../secret',0,100));const r=readArticle(i,'1',0,15);assert.equal(r.text.length,15);assert.equal(r.nextOffset,15);assert.equal(readArticle(i,'1',99999,100).nextOffset,null);});

test('encontra bloqueios com variação de termos',()=>{const i=buildIndex([article('1','Configurações de bloqueio','Bloqueio por inadimplência.'),article('2','Cadastro de aluno','Aluno aluno aluno')],'abc');assert.equal(search(i,'bloquear aluno inadimplente',3)[0].id,'1');});

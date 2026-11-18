import { test } from 'node:test';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';

test('cliente stdio consulta catálogo, busca, leitura e valida parâmetros',async()=>{
  const client=new Client({name:'nextfit-check',version:'1.0.0'});
  const transport=new StdioClientTransport({command:process.execPath,args:[fileURLToPath(new URL('../src/server.mjs',import.meta.url))],stderr:'pipe'});
  try {
    await client.connect(transport);
    assert.equal((await client.listTools()).tools.length,3);
    const call=async(name,args={})=>client.callTool({name,arguments:args});
    const overview=JSON.parse((await call('obter_visao_geral')).content[0].text);
    assert.ok(overview.totalArticles>300);
    const found=JSON.parse((await call('buscar_contexto',{consulta:'contrato recorrente'})).content[0].text);
    assert.equal(found.results[0].id,'69000813234');
    const article=JSON.parse((await call('ler_artigo',{id:found.results[0].id})).content[0].text);
    assert.ok(article.source.startsWith('https://'));assert.ok(article.text.length>100);
    assert.equal((await call('ler_artigo',{id:'../../secret'})).isError,true);
    const invalid=await call('buscar_contexto',{consulta:'teste',limite:999});
    assert.equal(invalid.isError,true);
  } finally {await client.close();}
});

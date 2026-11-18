import { mkdir, writeFile, rename } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { buildIndex, ROOT } from './core.mjs';
const repo='VitorTinelli/obsidian-next';
export const indexPath=fileURLToPath(new URL('../data/index.json',import.meta.url));
async function get(url,json=true) {
  const headers={'User-Agent':'nextfit-context-mcp'};
  if(process.env.GITHUB_TOKEN) headers.Authorization=`Bearer ${process.env.GITHUB_TOKEN}`;
  const response=await fetch(url,{headers,signal:AbortSignal.timeout(60000)});
  if(!response.ok) throw new Error(`GitHub HTTP ${response.status}: ${url}`);
  return json?response.json():response.text();
}
async function sync() {
  const tree=await get(`https://api.github.com/repos/${repo}/git/trees/main?recursive=1`);
  if(tree.truncated) throw new Error('Árvore incompleta; índice anterior preservado.');
  const paths=tree.tree.filter(f=>f.type==='blob'&&f.path.startsWith(ROOT)&&f.path.endsWith('.md'));
  const files=[];
  for(let start=0;start<paths.length;start+=8) {
    files.push(...await Promise.all(paths.slice(start,start+8).map(async f=>({path:f.path,content:await get(`https://raw.githubusercontent.com/${repo}/${tree.sha}/${f.path.split('/').map(encodeURIComponent).join('/')}`,false)}))));
    console.error(`Markdown: ${files.length}/${paths.length}`);
  }
  const index=buildIndex(files,tree.sha);
  if(!index.articles.length) throw new Error('Nenhum artigo; índice anterior preservado.');
  await mkdir(new URL('../data/',import.meta.url),{recursive:true});
  const temp=`${indexPath}.${process.pid}.tmp`;
  await writeFile(temp,JSON.stringify(index));
  await rename(temp,indexPath);
  console.error(`Índice atualizado: ${index.articles.length} artigos, revisão ${tree.sha}`);
}
sync().catch(error=>{console.error(error.message);process.exitCode=1;});

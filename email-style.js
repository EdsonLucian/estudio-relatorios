// Inline the actual report styles so selection and clipboard carry the same composition.
function styledReportHTML(){
 const source=document.querySelector('#preview'),clone=source.cloneNode(true);
 const originals=[source,...source.querySelectorAll('*')],copies=[clone,...clone.querySelectorAll('*')];
 originals.forEach((el,i)=>{const css=getComputedStyle(el);copies[i].removeAttribute('id');copies[i].removeAttribute('tabindex');for(let j=0;j<css.length;j++){const key=css[j];copies[i].style.setProperty(key,css.getPropertyValue(key));}});
 clone.style.width='800px';clone.style.maxWidth='100%';clone.style.margin='0';clone.style.boxShadow='none';clone.style.boxSizing='border-box';return clone.outerHTML;
}
let emailImageBlob=null,emailImageData='',emailImageBusy=false,emailParts=[];
const EMAIL_WIDTH=720,EMAIL_SCALE=3,EMAIL_SLICE=1200;
function emailCompositionHTML(){return window.EmailLayout(document.querySelector('#draftMessage')?.value||'',emailParts)}
function selectEmailComposition(){if(!emailParts.length){toast('Aguarde a preparação da composição completa.');return}selectContents(document.querySelector('#emailPages'));toast('Relatório selecionado em alta resolução. Pressione Ctrl+C e cole com Ctrl+V.')}
async function copyEmailComposition(){
 if(!emailParts.length){toast('Aguarde a preparação do relatório.');return}
 try{if(!navigator.clipboard?.write||!window.ClipboardItem)throw Error();const data={'text/html':new Blob([emailCompositionHTML()],{type:'text/html'})};await navigator.clipboard.write([new ClipboardItem(data)]);document.querySelector('#imageStatus').textContent='Composição copiada em alta resolução. Cole no e-mail com Ctrl+V. Se o editor reduzir a imagem, mantenha a largura original de 720 px.'}
 catch{document.querySelector('#imageStatus').textContent='A cópia automática foi bloqueada. Use Selecionar tudo e Ctrl+C ou baixe a versão para e-mail.';selectEmailComposition()}
}
async function prepareEmailImage(){
 if(emailImageBusy)return;emailImageBusy=true;emailImageBlob=null;emailImageData='';emailParts=[];
 const q=s=>document.querySelector(s),button=q('#makeEmailImage');button.disabled=true;q('#copyEmailImage').disabled=true;q('#downloadEmailImage').disabled=true;q('#emailImageTools').hidden=false;q('#emailContent').hidden=true;q('#emailImage').hidden=true;q('#emailImage').removeAttribute('src');let pages=q('#emailPages');if(!pages){pages=document.createElement('div');pages.id='emailPages';pages.className='email-hd-pages';pages.tabIndex=0;q('#emailImageTools').append(pages)}pages.replaceChildren();q('#imageStatus').textContent='Preparando a composição em alta resolução…';let host;
 try{const captured=await ReportSnapshot.capture();const parts=await Promise.all(captured.map(async p=>({data:p.data,height:Math.round(p.height/p.width*EMAIL_WIDTH),blob:await(await fetch(p.data)).blob()})));
 emailParts=parts;emailImageBlob=parts[0].blob;emailImageData=parts[0].data;for(const part of parts){const img=document.createElement('img');img.src=part.data;img.width=EMAIL_WIDTH;img.height=part.height;img.alt='Parte '+(pages.children.length+1)+' do relatório completo';pages.append(img)}
 q('#imageStatus').textContent='Pronto: 2160 pixels de largura, exibidos a 720 px para maior nitidez. '+(parts.length>1?'O relatório foi dividido em '+parts.length+' partes contínuas, copiadas juntas. ':'')+'Clique em Copiar relatório completo. Alguns aplicativos de e-mail podem recomprimir imagens.';q('#copyEmailImage').disabled=false;q('#downloadEmailImage').disabled=false;q('#downloadEmailImage').textContent=parts.length===1?'Baixar PNG em alta resolução':'Baixar versão para e-mail (.html)';
 }catch(e){emailParts=[];pages.replaceChildren();q('#imageStatus').textContent=e.message||'Não foi possível preparar a composição. Tente novamente.'}finally{host?.remove();emailImageBusy=false;button.disabled=false;button.textContent='Preparar novamente'}}
document.addEventListener('DOMContentLoaded',()=>{
 document.querySelector('#makeEmailImage').onclick=prepareEmailImage;document.querySelector('#copyEmailImage').onclick=copyEmailComposition;
 document.querySelector('#downloadEmailImage').onclick=()=>{if(!emailParts.length)return;const a=document.createElement('a');if(emailParts.length===1){a.href=emailImageData;a.download='relatorio-alta-resolucao.png'}else{a.href=URL.createObjectURL(new Blob(['<!doctype html><meta charset="UTF-8"><title>Relatório de treinamento</title>'+emailCompositionHTML()],{type:'text/html'}));a.download='relatorio-email.html';setTimeout(()=>URL.revokeObjectURL(a.href),30000)}a.click()};
 document.querySelector('#emailDialog').addEventListener('keydown',e=>{if(e.target.matches('input,textarea'))return;if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='a'){e.preventDefault();selectEmailComposition()}if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='c'&&emailParts.length&&navigator.clipboard?.write&&window.ClipboardItem){e.preventDefault();copyEmailComposition()}});
 document.addEventListener('copy',e=>{if(document.activeElement?.matches('input,textarea'))return;if(!document.querySelector('#emailDialog').open||!emailParts.length||!e.clipboardData)return;e.clipboardData.setData('text/html',emailCompositionHTML());e.preventDefault()});
});

// A draft is downloaded locally. No recipients, accounts or sending APIs are used.
(function(root){
 const escape=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 root.EmailLayout=(message,parts)=>'<table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse"><tr><td align="center" style="text-align:center;padding:16px 0"><table role="presentation" align="center" width="720" border="0" cellpadding="0" cellspacing="0" style="width:100%;max-width:720px;margin:0 auto;border-collapse:collapse;text-align:left"><tr><td style="font:15px Arial,sans-serif;line-height:1.6;color:#5f5f5f;padding:0 0 24px">'+escape(message).replace(/\r\n|\r|\n/g,'<br>')+'</td></tr>'+parts.map((p,i)=>'<tr><td align="center" style="padding:0;font-size:0;line-height:0"><img src="'+escape(p.src||p.data)+'" width="720" alt="Relatório — parte '+(i+1)+'" style="display:block;width:100%;max-width:720px;height:auto;margin:0 auto;border:0"></td></tr>').join('')+'</table></td></tr></table>';
 const base64=s=>{const bytes=new TextEncoder().encode(String(s));let binary='';for(let i=0;i<bytes.length;i+=8192)binary+=String.fromCharCode(...bytes.subarray(i,i+8192));return btoa(binary)};
 const lines=s=>s.match(/.{1,76}/g)?.join('\r\n')||'';
 function subjectHeader(s){const words=[];let chunk='';for(const ch of s){if(new TextEncoder().encode(chunk+ch).length>42){words.push('=?UTF-8?B?'+base64(chunk)+'?=');chunk=''}chunk+=ch}if(chunk)words.push('=?UTF-8?B?'+base64(chunk)+'?=');return words.join('\r\n ')}
 function build({subject,message,parts}){
  subject=String(subject||'').replace(/[\r\n\x00-\x1f\x7f]+/g,' ').trim().slice(0,200);
  if(!subject)throw Error('Preencha o assunto do e-mail.');
  if(!parts?.length)throw Error('Aguarde a preparação do relatório.');
  const id=crypto.randomUUID(),related='rel_'+id,alternative='alt_'+id;
  const pictures=parts.map((p,i)=>{const match=/^data:image\/png;base64,([A-Za-z0-9+/=]+)$/.exec(p.data);if(!match||!Number.isFinite(p.height)||p.height<1)throw Error('Não foi possível incorporar uma imagem. Prepare o relatório novamente.');return{cid:'relatorio-'+i+'-'+id+'@local.invalid',data:match[1],height:Math.round(p.height)}});
  const body='<!doctype html><html lang="pt-BR"><head><meta charset="UTF-8"></head><body style="margin:0;padding:0;background:#ffffff">'+root.EmailLayout(message,pictures.map(p=>({src:'cid:'+p.cid,height:p.height})))+'</body></html>';
  const text=String(message)+'\r\n\r\nO relatório completo está incorporado à versão visual desta mensagem.';
  const out=['X-Unsent: 1','MIME-Version: 1.0','Date: '+new Date().toUTCString(),'Subject: '+subjectHeader(subject),'Content-Type: multipart/related; boundary="'+related+'"; type="multipart/alternative"','','--'+related,'Content-Type: multipart/alternative; boundary="'+alternative+'"','','--'+alternative,'Content-Type: text/plain; charset=UTF-8','Content-Transfer-Encoding: base64','',lines(base64(text)),'--'+alternative,'Content-Type: text/html; charset=UTF-8','Content-Transfer-Encoding: base64','',lines(base64(body)),'--'+alternative+'--'];
  for(const [i,p]of pictures.entries())out.push('--'+related,'Content-Type: image/png; name="relatorio-'+(i+1)+'.png"','Content-Transfer-Encoding: base64','Content-ID: <'+p.cid+'>','Content-Disposition: inline; filename="relatorio-'+(i+1)+'.png"','',lines(p.data));
  out.push('--'+related+'--','');return out.join('\r\n');
 }
 root.EmailDraft={build};
 let lastSubject='',lastMessage='';
 root.prepareEmailDraftFields=function(){const report=TrainingNarrative.prepare(state),subject='Relatório '+(report.reportMode==='annual'?'anual — ':'de treinamento — ')+(report.title||'Treinamento'),message='Olá,\n\nCompartilho o relatório '+(report.reportMode==='annual'?'anual de treinamentos':'do treinamento “'+(report.title||'Treinamento')+'”')+(report.period?', referente ao período de '+report.period:'')+'.\n\nAbaixo, você encontra os resultados e os destaques do período. Fico à disposição para esclarecer dúvidas.\n\nAtenciosamente,'+(report.author||report.facilitator?'\n'+(report.author||report.facilitator):'');const q=s=>document.querySelector(s);if(!q('#draftSubject').value||q('#draftSubject').value===lastSubject)q('#draftSubject').value=subject.slice(0,200);if(!q('#draftMessage').value||q('#draftMessage').value===lastMessage)q('#draftMessage').value=message;lastSubject=subject.slice(0,200);lastMessage=message;q('#draftStatus').textContent='Revise a mensagem. Os destinatários serão preenchidos no seu programa de e-mail.';};

 async function openWebEmail(provider){
  const q=s=>document.querySelector(s),status=q('#draftStatus'),fallback=q('#webmailFallback');
  fallback.hidden=true;
  if(emailImageBusy||!emailParts.length){status.textContent='Aguarde a preparação do relatório e clique novamente no botão do e-mail.';return}
  if(navigator.onLine===false){status.textContent='Conecte-se à internet para abrir o e-mail na web. Você pode baixar o arquivo .eml enquanto está offline.';return}
  const subject=q('#draftSubject').value.trim();if(!subject){status.textContent='Preencha o assunto do e-mail.';q('#draftSubject').focus();return}
  const url=provider==='gmail'?'https://mail.google.com/mail/?view=cm&fs=1&su='+encodeURIComponent(subject):'https://outlook.office.com/mail/deeplink/compose?subject='+encodeURIComponent(subject);
  fallback.href=url;fallback.textContent=provider==='gmail'?'Abrir nova mensagem no Gmail':'Abrir nova mensagem no Outlook Web';
  const buttons=[q('#openOutlookWeb'),q('#openGmailWeb')];buttons.forEach(b=>b.disabled=true);
  try{
   if(!navigator.clipboard?.write||!window.ClipboardItem)throw Error('clipboard');
   const content={'text/html':new Blob([emailCompositionHTML()],{type:'text/html'}),'text/plain':new Blob([q('#draftMessage').value],{type:'text/plain'})};

   await navigator.clipboard.write([new ClipboardItem(content)]);
   fallback.hidden=false;status.textContent='Mensagem e relatório copiados. No corpo do novo e-mail, pressione Ctrl+V e preencha os destinatários. Se a nova aba não abrir, use o link acima.';
   window.open(url,'_blank','noopener,noreferrer');
  }catch(e){fallback.hidden=false;selectEmailComposition();status.textContent='A cópia automática foi bloqueada. O relatório está selecionado: pressione Ctrl+C, abra o link acima e cole com Ctrl+V no corpo do e-mail.'}
  finally{buttons.forEach(b=>b.disabled=false)}
 }
 document.addEventListener('DOMContentLoaded',()=>{
  document.querySelector('#openOutlookWeb').onclick=()=>openWebEmail('outlook');document.querySelector('#openGmailWeb').onclick=()=>openWebEmail('gmail');
  document.querySelector('#downloadEmailDraft').onclick=async()=>{const q=s=>document.querySelector(s),button=q('#downloadEmailDraft');button.disabled=true;try{if(emailImageBusy)throw Error('Aguarde a preparação das imagens do relatório.');if(!emailParts.length)await prepareEmailImage();const eml=build({subject:q('#draftSubject').value,message:q('#draftMessage').value,parts:emailParts});const blob=new Blob([eml],{type:'message/rfc822'});download(blob,'relatorio-para-enviar.eml','message/rfc822');q('#draftStatus').textContent='E-mail preparado ('+(blob.size/1024/1024).toLocaleString('pt-BR',{maximumFractionDigits:1})+' MB). Abra o arquivo baixado no seu programa de e-mail e preencha os destinatários. Se abrir somente para leitura, use Encaminhar ou copie a composição.';}catch(e){q('#draftStatus').textContent=e.message||'Não foi possível preparar o e-mail.';}finally{button.disabled=false}};
 });
})(typeof window!=='undefined'?window:globalThis);

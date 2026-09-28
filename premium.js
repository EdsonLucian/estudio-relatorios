function atlasReport(html,s,m){
 const box=document.createElement('div');box.innerHTML=html;
 const oldChart=box.querySelector('.distribution-bar');
 if(oldChart&&m.registered){
  const values=[['Aprovados',m.approved,'#ff9934'],['Reprovados',m.failed,'#da3541'],['Pendentes',m.pending,'#ff9cba'],['Ausentes',m.absent,'#a6afb5']];
  const max=Math.max(1,...values.map(v=>v[1]));
  const chart=document.createElement('div');chart.className='results-chart';chart.setAttribute('role','img');chart.setAttribute('aria-label','Gráfico do panorama da turma');
  chart.innerHTML='<div class="chart-scale"><span>'+max+'</span><span>'+Math.round(max/2)+'</span><span>0</span></div><div class="chart-plot">'+values.map(([label,value,color])=>'<div class="chart-column"><strong>'+value+'</strong><i style="height:'+Math.max(value?8:0,value/max*100)+'%;background:'+color+'"></i><span>'+label+'</span></div>').join('')+'</div>';
  oldChart.replaceWith(chart);
 }
 box.querySelector('.preview-cover')?.remove();box.querySelector('.report-logo')?.remove();box.querySelector('.subtitle')?.remove();box.querySelector('.meta')?.remove();
 const e=t=>String(t??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const cover=`<div class="atlas-masthead"><span>TREINAMENTO & DESENVOLVIMENTO</span><span>${s.reportMode==='annual'?'BALANÇO ANUAL':'RELATÓRIO DE TREINAMENTO'}</span></div><div class="atlas-cover"><div class="atlas-orbits" aria-hidden="true"><i></i><i></i><i></i><b></b></div><div class="atlas-portrait"><img src="${e(s.reportPortrait||BrandMedia.portraitURL)}" alt="Personagem do relatório"></div><div class="atlas-brand">${s.reportLogo?`<img src="${e(s.reportLogo)}" alt="Logotipo">`:`<span class="atlas-mark">T&D</span>`}<span>${e(s.company||'Treinamento & desenvolvimento')}</span></div><div class="atlas-edition"><span></span> CONHECIMENTO QUE APROXIMA</div><h1>${e(s.title||'Nome do treinamento')}</h1>${s.reportSubtitle?`<p class="atlas-deck">${e(s.reportSubtitle)}</p>`:''}<div class="atlas-cover-bottom"><div><small>PERÍODO</small><strong>${e(s.period||'A informar')}</strong></div><div><small>RESPONSÁVEL</small><strong>${e(s.facilitator||'A informar')}</strong></div></div></div><div class="atlas-ribbon"><span>${e(s.scopeLabel||'Visão consolidada da turma')}</span><b>${e(s.hours!==''?Report.fmt(s.hours)+' HORAS':'TREINAMENTO & DESENVOLVIMENTO')}</b></div>`;
 return cover+'<div class="atlas-body">'+box.innerHTML+'</div>';
}

(()=>{
const gallery=document.querySelector('.model-gallery');if(!gallery)return;
const buttons=[...gallery.querySelectorAll('button[data-model-choice]')];
for(const button of buttons){const old=button.querySelector('.model-thumbnail');const stage=document.createElement('span');stage.className='model-live-preview';stage.setAttribute('aria-hidden','true');old.replaceWith(stage);const caption=document.createElement('span');caption.className='model-caption';caption.append(button.querySelector('strong'),button.querySelector('small'));const badge=document.createElement('span');badge.className='model-selection';badge.textContent='Selecionado';caption.append(badge);button.append(caption)}
let rendering=false;
function refresh(){if(rendering)return;rendering=true;const saved=state;try{for(const button of buttons){state={...saved,reportStyle:button.dataset.modelChoice};preview();const sheet=document.getElementById('preview').cloneNode(true);sheet.removeAttribute('id');sheet.removeAttribute('tabindex');sheet.querySelectorAll('[id]').forEach(n=>n.removeAttribute('id'));const stage=button.querySelector('.model-live-preview');stage.replaceChildren(sheet)}}finally{state=saved;preview();rendering=false}resize()}
function resize(){for(const b of buttons){const stage=b.querySelector('.model-live-preview'),sheet=stage.firstElementChild;if(!sheet)continue;const width=stage.clientWidth-24;sheet.style.transform='scale('+Math.max(.1,width/720)+')'}}
if(typeof ResizeObserver!=='undefined')new ResizeObserver(resize).observe(gallery);window.addEventListener('resize',resize);
document.querySelectorAll('.identity-home [data-brand]').forEach(b=>b.addEventListener('click',()=>queueMicrotask(refresh)));
document.querySelector('.tab[data-tab=design]').addEventListener('click',()=>queueMicrotask(refresh));
const next=document.getElementById('next');next.addEventListener('click',()=>{if(tab===3)queueMicrotask(refresh)});
refresh();
})();

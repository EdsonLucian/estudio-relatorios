(function(){
 const button=document.getElementById('motionToggle');
 const preference=window.matchMedia?window.matchMedia('(prefers-reduced-motion: reduce)'):null;
 let disabled=false;try{disabled=localStorage.getItem('studio-motion')==='off'}catch{}
 function apply(){const reduced=disabled||!!preference?.matches;document.body.classList.toggle('motion-off',reduced);button.setAttribute('aria-pressed',String(!reduced));button.textContent=reduced?'Efeitos: desligados':'Efeitos: ligados';button.title=preference?.matches?'Movimento reduzido conforme a preferência do dispositivo':'Ativar ou desativar animações';button.disabled=!!preference?.matches}
 button.addEventListener('click',()=>{disabled=!disabled;try{localStorage.setItem('studio-motion',disabled?'off':'on')}catch{}apply()});
 preference?.addEventListener?.('change',apply);apply();
})();

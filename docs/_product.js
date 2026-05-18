/* STIQO – shared product page JS */
(function(){
  // Gallery switching
  document.querySelectorAll('.gallery__thumb').forEach(t=>{
    t.addEventListener('click',()=>{
      document.querySelectorAll('.gallery__thumb').forEach(x=>x.classList.remove('active'));
      t.classList.add('active');
      const main=document.getElementById('mainImg');
      if(main) main.src = t.dataset.img;
    });
  });

  // Variant pills + price update
  const sel = window.STIQO_DEFAULTS || {};
  const priceMap = window.STIQO_PRICES || {};
  document.querySelectorAll('.pill').forEach(p=>{
    p.addEventListener('click',()=>{
      document.querySelectorAll('.pill[data-set="'+p.dataset.set+'"]').forEach(x=>x.classList.remove('active'));
      p.classList.add('active');
      sel[p.dataset.set]=p.dataset.val;
      const lbl = document.querySelector('legend [data-label="'+p.dataset.set+'"]');
      if(lbl) lbl.textContent = p.dataset.val;
      if(p.dataset.set==='size' && priceMap[p.dataset.val]){
        const el = document.getElementById('atcPrice');
        if(el) el.textContent = priceMap[p.dataset.val] + ' €';
      }
    });
  });

  // Quantity
  const qty = document.getElementById('qty');
  const qUp = document.getElementById('qUp');
  const qDn = document.getElementById('qDown');
  if(qUp && qty) qUp.addEventListener('click',()=>qty.value=parseInt(qty.value||'1',10)+1);
  if(qDn && qty) qDn.addEventListener('click',()=>qty.value=Math.max(1,parseInt(qty.value||'1',10)-1));

  // Add to cart
  const atc = document.getElementById('atc');
  if(atc){
    atc.addEventListener('click',()=>{
      const text = Object.entries(sel).map(([k,v])=>v).filter(Boolean).join(' / ');
      alert('Demo: "'+(window.STIQO_PRODUCT||'Produkt')+'" ('+text+') wird in den Warenkorb gelegt.');
    });
  }
})();

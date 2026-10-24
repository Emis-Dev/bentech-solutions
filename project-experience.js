// Project examples only prepare local text. No enquiry, tracking or storage.
(() => {
 'use strict';
 const description=document.getElementById('q-details');
 const feedback=document.getElementById('starterFeedback');
 if(!description || !feedback) return;
 const examples={
  plc:'Mijn PLC-toepassing:\n\nGewenste werking en volgorde:\n\nBeschikbare hardware en signalen (indien bekend):\n\nWat moet gebeuren bij afwijkingen:\n\nGewenste timing:',
  logo:'Mijn LOGO!-toepassing:\n\nGewenste functies:\n\nSchakelmomenten en handmatige bediening:\n\nLOGO!-type (indien bekend):\n\nGewenste timing:',
  troubleshooting:'Mijn bestaande besturing:\n\nVerwacht gedrag:\n\nWerkelijk gedrag en sinds wanneer:\n\nHardwaretype, programma en foutmelding (indien beschikbaar):\n\nGewenste timing:'
 };
 document.querySelectorAll('[data-project-example]').forEach(link=>link.addEventListener('click',()=>{
  const example=examples[link.dataset.projectExample];
  if(!example || description.matches(':disabled')) return;
  const hasDraft=description.value.trim().length>0;
  if(!hasDraft) description.value=example;
  feedback.hidden=false;
  feedback.textContent=hasDraft?'Uw eerdere beschrijving is behouden. Vul ze gerust aan met de vragen uit het voorbeeld.':'Uw startpunten staan klaar. Vul aan wat u al weet; de rest bespreken we samen.';
  description.dispatchEvent(new Event('input',{bubbles:true}));
  requestAnimationFrame(()=>description.focus({preventScroll:true}));
 }));
})();

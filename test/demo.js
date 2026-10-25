import{pumpDecision,lightDecision}from'./logic.js?v=20261025';
const $=id=>document.getElementById(id);
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
let level=20,pump=true,fault=false,requestedRun=false,visible=false,timer,scenario='pump';
const setText=(id,text)=>{if($(id).textContent!==text)$(id).textContent=text;};
const renderPump=()=>{
 pump=pumpDecision(level,pump,fault);
 $('level').value=String(Math.round(level));setText('level-value',Math.round(level)+'%');setText('tank-level',Math.round(level)+'%');
 $('water-fill').style.transform=`scaleY(${level/100})`;
 $('pump-stage').dataset.pump=pump?'on':'off';$('pump-stage').dataset.fault=String(fault);
 for(const[id,on]of[['sensor-high',level>75&&!fault],['sensor-low',level<25&&!fault],['led-high',level>75&&!fault],['led-low',level<25&&!fault],['led-pump',pump]])$(id).classList.toggle('active',on);
 const state=fault?'Signaal ontbreekt':pump?'Pomp aan':'Pomp uit';
 const explanation=fault?'De voorbeeldlogica blokkeert de uitgang zolang het niveausignaal ontbreekt.':level<25?'Het niveau is laag. De voorbeeldlogica schakelt de pomp in.':level>75?'Het hoge niveau is bereikt. De voorbeeldlogica schakelt de pomp uit.':`Het niveau ligt tussen de grenzen. De vorige toestand blijft behouden: ${pump?'aan':'uit'}.`;
 setText('pump-state',state);setText('pump-explanation',explanation);setText('pump-announcement',state+'. '+explanation);
 $('fault-explanation').hidden=!fault;
};
const syncMotion=()=>{
 clearInterval(timer);
 const moving=requestedRun&&visible&&!document.hidden&&!reduced.matches&&scenario==='pump';
 $('pump-stage').dataset.moving=String(moving);$('run').disabled=reduced.matches;
 $('run').setAttribute('aria-pressed',String(requestedRun&&!reduced.matches));
 $('run').querySelector('span').textContent=reduced.matches?'Beweging uitgeschakeld':requestedRun?'Pauzeer simulatie':'Start simulatie';
 setText('simulation-state',moving?'Simulatie actief':'Simulatie gepauzeerd');
 setText('motion-note',reduced.matches?'Uw voorkeur voor minder beweging is actief. U kunt het niveau en de signalen zelf blijven wijzigen.':'Versnelde voorbeeldwerking. U bepaalt wanneer de beweging start.');
 if(moving)timer=setInterval(()=>{level=Math.max(0,Math.min(100,level+(pump?2:0)-($('consumption').checked ? .75 : 0)));renderPump();},250);
};
$('level').addEventListener('input',e=>{level=Number(e.target.value);renderPump();});
$('fault').addEventListener('change',e=>{fault=e.target.checked;renderPump();});
$('run').addEventListener('click',()=>{requestedRun=!requestedRun;syncMotion();});
$('reset').addEventListener('click',()=>{requestedRun=false;level=20;pump=true;fault=false;$('fault').checked=false;$('consumption').checked=true;renderPump();syncMotion();});
const renderLight=()=>{
 const hour=Number($('hour').value),manual=$('manual').checked,on=lightDecision(hour,manual),time=String(hour).padStart(2,'0')+':00';
 setText('hour-value',time);setText('clock',time);$('light-stage').dataset.light=on?'on':'off';
 const state='Verlichting '+(on?'aan':'uit');
 const explanation=manual?'De handmatige keuze schakelt de verlichting in, ook buiten het tijdschema.':on?'Het is tussen 18:00 en 23:00. Het tijdschema schakelt de verlichting in.':'Het tijdschema is niet actief en er is geen handmatige inschakeling. De verlichting blijft uit.';
 setText('light-state',state);setText('light-explanation',explanation);setText('light-announcement',state+'. '+explanation);
};
for(const id of['hour','manual'])$(id).addEventListener('input',renderLight);
const choose=next=>{
 scenario=next;
 for(const key of['pump','light']){$('tab-'+key).setAttribute('aria-selected',String(key===next));$('tab-'+key).tabIndex=key===next?0:-1;$(key+'-panel').hidden=key!==next;}
 $('project-link').href=next==='pump'?'/?dienst=PLC-automatisering#offerte':'/?dienst=LOGO!%2Ddomotica#offerte';
 syncMotion();
};
for(const key of['pump','light']){
 $('tab-'+key).addEventListener('click',()=>choose(key));
 $('tab-'+key).addEventListener('keydown',e=>{if(['ArrowLeft','ArrowRight','Home','End'].includes(e.key)){e.preventDefault();const next=e.key==='Home'?'pump':e.key==='End'?'light':key==='pump'?'light':'pump';choose(next);$('tab-'+next).focus();}});
}
if('IntersectionObserver'in window)new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;syncMotion();}).observe($('demo'));
else visible=true;
document.addEventListener('visibilitychange',syncMotion);
reduced.addEventListener('change',()=>{if(reduced.matches)requestedRun=false;syncMotion();});
window.addEventListener('pagehide',()=>{clearInterval(timer);$('pump-stage').dataset.moving='false';});
window.addEventListener('pageshow',syncMotion);
$('demo-controls').disabled=false;
renderPump();renderLight();syncMotion();

export function pumpDecision(level,previous,fault){
 if(fault)return false;
 if(level<25)return true;
 if(level>75)return false;
 return Boolean(previous);
}
export function lightDecision(hour,manual){return Boolean(manual)||(hour>=18&&hour<23);}

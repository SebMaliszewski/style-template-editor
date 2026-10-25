/* Shared template renderer (editor + CLI). Style derived from hermes-nous-calendar by BkashJosi (MIT). */
window.NT = (function(){
const FONTS={display:'"NT Anton",Impact,sans-serif',body:'"NT Instrument Sans",system-ui,sans-serif',mono:'"NT JetBrains Mono",ui-monospace,monospace'};
/* Rzeczywiste grubości w plikach fontów (Anton: tylko 400; Instrument Sans: 400–700; JetBrains Mono: 400–800). Inne wartości -> najbliższa dostępna, bez sztucznego pogrubienia. */
const WEIGHTS={display:[400],body:[400,500,600,700],mono:[400,500,600,700,800]};
function fixWeight(font,w){const a=WEIGHTS[font||'body']||WEIGHTS.body;w=+w||400;return a.reduce((b,x)=>Math.abs(x-w)<Math.abs(b-w)?x:b,a[0])}
/* Cień: wartości domyślne = dotychczasowy cień kart (0 6px 18px rgba(13,22,48,.10)). */
const SHD={shColor:'#0d1630',shOpacity:.10,shBlur:18,shX:0,shY:6,shSpread:0,shadowMode:'box'};
function rgba(hex,a){const h=(hex||'#000').replace('#','');const n=h.length===3?h.split('').map(c=>c+c).join(''):h;return `rgba(${parseInt(n.slice(0,2),16)},${parseInt(n.slice(2,4),16)},${parseInt(n.slice(4,6),16)},${a})`}
function shadowCss(e){if(!e.shadow)return '';const g=k=>e[k]??SHD[k];const c=rgba(g('shColor'),g('shOpacity'));
 if(e.type==='image'&&g('shadowMode')==='outline')return `filter:drop-shadow(${g('shX')}px ${g('shY')}px ${g('shBlur')/2}px ${c});`;
 if(e.shColor===undefined&&e.shOpacity===undefined&&e.shBlur===undefined&&e.shX===undefined&&e.shY===undefined&&e.shSpread===undefined)return 'box-shadow:0 6px 18px rgba(13,22,48,.10);';
 return `box-shadow:${g('shX')}px ${g('shY')}px ${g('shBlur')}px ${g('shSpread')}px ${c};`}
function docSize(d){let w=d.w,h=d.h;if(d.orientation==='horizontal'&&h>w||d.orientation==='vertical'&&w>h){[w,h]=[h,w]}return {w,h};}
function textCss(s){return `font-family:${FONTS[s.font||'body']};font-weight:${fixWeight(s.font||'body',s.weight)};font-synthesis:none;font-size:${s.size||16}px;color:${s.color||'#0d0c0a'};letter-spacing:${s.ls||0}em;text-transform:${s.upper?'uppercase':'none'};line-height:${s.lh||1.2};text-align:${s.align==='justify-all'?'justify':(s.align||'left')};${s.align==='justify-all'?'text-align-last:justify;':''}${s.hyph?'hyphens:auto;-webkit-hyphens:auto;':''}`}
function esc(t){return String(t??'').replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]))}
function render(doc,root,fields){
  fields=fields||{};const {w,h}=docSize(doc);
  root.innerHTML='';root.style.cssText=`position:relative;width:${w}px;height:${h}px;background:${doc.bg||'#f3f6fd'};overflow:hidden;`;
  const H=doc.header||{};
  if(H.visible!==false){const p=document.createElement('div');p.className='nt-el nt-header';p.dataset.id='__header';
    p.style.cssText=`position:absolute;top:${H.y??24}px;left:${H.x??24}px;background:${H.bg||'#e2f3f0'};border:${H.bw??1}px solid ${H.border||'#0d8a7a'};border-radius:${H.radius??6}px;padding:${H.py??5}px ${H.px??10}px;white-space:nowrap;z-index:9999;`+textCss({font:'mono',weight:H.weight||600,size:H.size||13,color:H.color||'#0d8a7a',ls:H.ls??.04,upper:H.upper});
    p.textContent=H.text||'style inspired by @BkashJosi';root.appendChild(p);}
  (doc.elements||[]).forEach((e,i)=>{if(e.hidden)return;const d=document.createElement('div');d.className='nt-el';d.dataset.id=e.id;
    let txt=(e.field&&fields[e.field]!=null)?fields[e.field]:e.text;
    let css=`position:absolute;left:${e.x}px;top:${e.y}px;z-index:${i+1};white-space:pre-wrap;`;
    if(e.type==='image'){css+=`box-sizing:border-box;width:${e.w}px;height:${e.h}px;border:${e.bw??0}px solid ${e.border||'#dbe2f2'};border-radius:${e.radius??0}px;overflow:hidden;opacity:${e.opacity??1};background:${e.bg||'transparent'};`;
      css+=shadowCss(e);
      const src=(e.field&&fields[e.field]!=null)?fields[e.field]:e.src;const im=document.createElement('img');im.draggable=false;
      im.src=(window.NT_ASSET_BASE||'/assets/')+encodeURIComponent(src||'');im.style.cssText=`display:block;width:100%;height:100%;object-fit:${{contain:'contain',cover:'cover',stretch:'fill'}[e.fit||'contain']};pointer-events:none`;d.appendChild(im);
      if(e.bar){const b=document.createElement('i');b.style.cssText=`position:absolute;left:0;top:0;bottom:0;width:${e.barW||4}px;background:${e.barColor||'#0a4cff'}`;d.appendChild(b);}
      d.style.cssText=css;root.appendChild(d);return;}
    if(e.type==='box'){css+=`box-sizing:border-box;display:flex;align-items:${e.valign||"center"};justify-content:${{left:"flex-start",center:"center",right:"flex-end"}[e.align||"left"]||"flex-start"};width:${e.w}px;height:${e.h}px;background:${e.bg||'#fff'};border:${e.bw??1}px solid ${e.border||'#dbe2f2'};border-radius:${e.radius??14}px;overflow:hidden;padding:${e.pad??0}px;${e.shadow?shadowCss(e):'box-shadow:none;'}`+textCss(e);
      if(e.bar){const b=document.createElement('i');b.style.cssText=`position:absolute;left:0;top:0;bottom:0;width:${e.barW||4}px;background:${e.barColor||'#0a4cff'}`;d.appendChild(b);}
    } else {css+=(e.w?`width:${e.w}px;`:'')+textCss(e);}
    if(e.hyph)d.lang=e.lang||doc.lang||'pl';d.style.cssText=css;const s=document.createElement('span');s.style.position='relative';if(/^justify/.test(e.align||''))s.style.cssText='position:relative;display:block;width:100%';s.textContent=txt||'';d.appendChild(s);root.appendChild(d);});
  return {w,h};}
return {render,docSize,FONTS,WEIGHTS,fixWeight,SHD};})();

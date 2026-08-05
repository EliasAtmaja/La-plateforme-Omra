import{a as e,c as t,d as n,i as r,l as i,n as a,o,r as s,s as c}from"./supabase.DxFm7Jm5.js";import{n as l}from"./guide-activities.BET7D3PP.js";var u=n(r,s,{auth:{persistSession:!1,autoRefreshToken:!1}}),d=document.getElementById(`login-gate`),f=document.getElementById(`dashboard`),p=[],m=[],h=[],g={},_=[],v=[],y=[],b=[],x=[];async function S(){let[e,n,r,a,s,l,u,d]=await Promise.all([i.from(`guides`).select(`*`).order(`created_at`),i.from(`bookings`).select(`*`).order(`date`),i.from(`reviews`).select(`*`).order(`created_at`,{ascending:!1}),i.from(`availability`).select(`guide_id, activity_slug, date`),i.from(`call_slots`).select(`*`).order(`date`),i.from(`call_bookings`).select(`*`).order(`slot_date`),i.from(`visa_requests`).select(`*`).order(`created_at`,{ascending:!1}),i.from(`guide_applications`).select(`*`).order(`created_at`,{ascending:!1})]);y=u.data||[],b=d.data||[],d.error&&console.warn(`Candidatures indisponibles :`,d.error.message),p=(e.data||[]).map(c),m=(n.data||[]).map(o),x=n.data||[],h=(r.data||[]).map(t),g={},(a.data||[]).forEach(e=>{let t=g[e.guide_id]=g[e.guide_id]||{};(t[e.activity_slug||``]=t[e.activity_slug||``]||[]).push(e.date)}),_=s.data||[],v=l.data||[]}async function C(){await S(),d.classList.add(`is-hidden`),f.classList.remove(`is-hidden`),ce(),Q(),Ge(),Ve()}(async()=>{await e()&&await C()})(),document.getElementById(`login-form`).addEventListener(`submit`,async t=>{t.preventDefault();let n=document.getElementById(`login-email`).value.trim(),r=document.getElementById(`login-pass`).value,a=document.getElementById(`login-error`);a.classList.add(`is-hidden`);let{error:o}=await i.auth.signInWithPassword({email:n,password:r});if(o||!await e()){await i.auth.signOut(),a.classList.remove(`is-hidden`);return}await C()}),document.getElementById(`logout-btn`).addEventListener(`click`,async()=>{await i.auth.signOut(),d.classList.remove(`is-hidden`),f.classList.add(`is-hidden`)});var w=document.getElementById(`modal-overlay`),T=document.getElementById(`photo-input`),ee=document.getElementById(`photo-empty`),te=document.getElementById(`photo-editor`),ne=document.getElementById(`photo-result`),E=document.getElementById(`photo-crop-img`),D=document.getElementById(`photo-crop`),O=document.getElementById(`photo-zoom`),k=document.getElementById(`photo-result-circle`),A={x:0,y:0,scale:1,dragging:!1,startX:0,startY:0,origX:0,origY:0,imgSrc:``};function j(e){ee.classList.toggle(`is-hidden`,e!==`empty`),te.classList.toggle(`is-hidden`,e!==`editor`),ne.classList.toggle(`is-hidden`,e!==`result`)}function M(){E.style.transform=`translate(${A.x}px, ${A.y}px) scale(${A.scale})`}function N(){let e=E.naturalWidth*A.scale,t=E.naturalHeight*A.scale,n=160-e,r=160-t;A.x=Math.min(0,Math.max(n,A.x)),A.y=Math.min(0,Math.max(r,A.y))}document.getElementById(`photo-btn`).addEventListener(`click`,()=>T.click()),document.getElementById(`photo-placeholder`).addEventListener(`click`,()=>T.click()),document.getElementById(`photo-change-btn`).addEventListener(`click`,()=>T.click()),T.addEventListener(`change`,()=>{let e=T.files?.[0];if(!e)return;let t=new FileReader;t.onload=e=>{A.imgSrc=e.target?.result,E.src=A.imgSrc,E.onload=()=>{A.scale=160/Math.min(E.naturalWidth,E.naturalHeight),A.x=(160-E.naturalWidth*A.scale)/2,A.y=(160-E.naturalHeight*A.scale)/2,O.min=String(Math.round(A.scale*100)),O.max=String(Math.round(A.scale*100*3)),O.value=String(Math.round(A.scale*100)),M(),j(`editor`)}},t.readAsDataURL(e)}),D.addEventListener(`mousedown`,e=>{e.preventDefault(),A.dragging=!0,A.startX=e.clientX,A.startY=e.clientY,A.origX=A.x,A.origY=A.y,D.style.cursor=`grabbing`}),window.addEventListener(`mousemove`,e=>{A.dragging&&(A.x=A.origX+(e.clientX-A.startX),A.y=A.origY+(e.clientY-A.startY),N(),M())}),window.addEventListener(`mouseup`,()=>{A.dragging=!1,D.style.cursor=`grab`}),D.addEventListener(`touchstart`,e=>{e.touches.length===1&&(A.dragging=!0,A.startX=e.touches[0].clientX,A.startY=e.touches[0].clientY,A.origX=A.x,A.origY=A.y)},{passive:!0}),window.addEventListener(`touchmove`,e=>{!A.dragging||e.touches.length!==1||(A.x=A.origX+(e.touches[0].clientX-A.startX),A.y=A.origY+(e.touches[0].clientY-A.startY),N(),M())},{passive:!0}),window.addEventListener(`touchend`,()=>{A.dragging=!1}),O.addEventListener(`input`,()=>{let e=A.scale;A.scale=parseInt(O.value)/100;let t=A.scale/e;A.x=80-(80-A.x)*t,A.y=80-(80-A.y)*t,N(),M()}),D.addEventListener(`wheel`,e=>{e.preventDefault();let t=parseInt(O.min)/100,n=parseInt(O.max)/100,r=e.deltaY>0?-.05:.05,i=A.scale;A.scale=Math.min(n,Math.max(t,A.scale+r));let a=A.scale/i;A.x=80-(80-A.x)*a,A.y=80-(80-A.y)*a,N(),O.value=String(Math.round(A.scale*100)),M()},{passive:!1}),document.getElementById(`photo-crop-cancel`).addEventListener(`click`,()=>{j(`empty`),T.value=``}),document.getElementById(`photo-crop-confirm`).addEventListener(`click`,()=>{let e=document.createElement(`canvas`);e.width=320,e.height=320,e.getContext(`2d`).drawImage(E,A.x*2,A.y*2,E.naturalWidth*A.scale*2,E.naturalHeight*A.scale*2);let t=e.toDataURL(`image/jpeg`,.9);k.style.backgroundImage=`url(${t})`,j(`result`)});function P(){return p}function F(){return m}function re(e,t){let n=g[e]||{};return t?n[t]||[]:[].concat(...Object.values(n))}function I(e){return e.replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`)}function ie(e){let t={};for(let n of e){let e=String(n.date||``),r=e.length>=7?e.slice(0,7):`sans-date`;(t[r]=t[r]||[]).push(n)}return Object.keys(t).sort((e,t)=>t.localeCompare(e)).map(e=>{let n=t[e].sort((e,t)=>String(e.date||``).localeCompare(String(t.date||``))),r=`Sans date`;if(e!==`sans-date`){let[t,n]=e.split(`-`).map(Number);r=`${ae[(n||1)-1]} ${t}`}return{key:e,label:r,items:n}})}var ae=[`Janvier`,`Février`,`Mars`,`Avril`,`Mai`,`Juin`,`Juillet`,`Août`,`Septembre`,`Octobre`,`Novembre`,`Décembre`],oe=[`Lu`,`Ma`,`Me`,`Je`,`Ve`,`Sa`,`Di`];function se(e,t,n,r){let i=new Set(re(t)),a=new Set(F().filter(e=>e.guideId===t&&e.status!==`reassigned`).map(e=>e.date)),o=new Date(r,n,1).getDay(),s=o===0?6:o-1,c=new Date(r,n+1,0).getDate(),l=new Date,u=oe.map(e=>`<span class="adm-cal__day-label">${e}</span>`).join(``);for(let e=0;e<s;e++)u+=`<span class="adm-cal__empty"></span>`;for(let e=1;e<=c;e++){let t=`${r}-${String(n+1).padStart(2,`0`)}-${String(e).padStart(2,`0`)}`,o=a.has(t),s=i.has(t),c=new Date(r,n,e)<new Date(l.getFullYear(),l.getMonth(),l.getDate()),d=`adm-cal__day`;c?d+=` adm-cal__day--past`:o?d+=` adm-cal__day--booked`:s?d+=` adm-cal__day--avail`:d+=` adm-cal__day--busy`,u+=`<span class="${d}">${e}</span>`}let d=e.querySelector(`.adm-cal__grid`),f=e.querySelector(`.adm-cal__title`);d&&(d.innerHTML=u),f&&(f.textContent=`${ae[n]} ${r}`);let p=e.querySelector(`[data-cal-nav]`);p&&(p.dataset.month=n.toString(),p.dataset.year=r.toString())}function ce(){let e=document.getElementById(`panel-guides`);e.innerHTML=``,P().forEach(t=>e.appendChild(le(t))),ue(),Ge()}function le(e){let t=e.city===`medina`?`Medine`:`La Mecque`,n=(e.firstName?.[0]||``)+(e.lastName?.[0]||``),a=e.photo?`<div class="adm-g__avatar adm-g__avatar--photo" style="background-image:url(${e.photo})"></div>`:`<div class="adm-g__avatar adm-g__avatar--${e.city}">${I(n)}</div>`,o=F().filter(t=>t.guideId===e.id&&t.status!==`reassigned`),c=o.filter(e=>e.status===`pending-refusal`),l=c.length>0,u=o.length>0,d=document.createElement(`div`);d.className=`adm-g`,d.dataset.guideId=e.id;let f=``;f=l?`<div class="adm-g__notif">
        <button class="adm-g__dot adm-g__dot--red" data-toggle-refusal="${e.id}" title="Mission refusee — cliquez pour voir le motif">
          <span class="adm-g__dot-pulse"></span>
        </button>
      </div>`:`<div class="adm-g__notif">
        <span class="adm-g__dot adm-g__dot--green" title="Aucun probleme"></span>
      </div>`;let m=``;m=u?`<button class="adm-g__booking-btn" data-toggle-bookings="${e.id}">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><rect x="1" y="2" width="10" height="9" rx="1.5" stroke="currentColor" stroke-width="1.1"/><path d="M3.5 1v2M8.5 1v2M1 5h10" stroke="currentColor" stroke-width="1.1" stroke-linecap="round"/></svg>
        Reservations
        <span class="adm-g__booking-count">${o.length}</span>
      </button>`:`<span class="adm-g__status adm-g__status--free">Libre</span>`;let h=``;if(u){let t=e=>{let t=e.date?new Date(e.date+`T00:00:00`).toLocaleDateString(`fr-FR`,{day:`numeric`,month:`long`,year:`numeric`}):e.dates||``,n=e.status===`pending-refusal`?`<span class="adm-g__bk-status adm-g__bk-status--refused">Refus en attente</span>`:e.replacementOf?`<span class="adm-g__bk-status adm-g__bk-status--replaced">En remplacement de ${I(e.replacementOf)}</span>`:``;return`
          <div class="adm-g__bk-row" data-bk-row>
            <button class="adm-g__bk-summary" data-toggle-bk-detail>
              <div class="adm-g__bk-summary-left">
                <span class="adm-g__bk-client">${I(e.clientName||e.client||`Client`)}</span>
                <span class="adm-g__bk-dates">${I(t)}${e.slot?` &middot; `+I(e.slot):``}</span>
                ${e.seen?`<span class="adm-g__bk-status adm-g__bk-status--seen">✓ Vu par le guide</span>`:`<span class="adm-g__bk-status adm-g__bk-status--unseen">Non vu</span>`}
                ${e.activityName?`<span class="adm-g__bk-status adm-g__bk-status--activity">${I(e.activityName)}</span>`:``}
                ${n}
              </div>
              <svg class="adm-g__bk-arrow" width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M4 5.5L7 8.5L10 5.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </button>
            <div class="adm-g__bk-detail is-hidden">
              <div class="adm-g__bk-detail-grid">
                <div class="adm-g__bk-detail-item">
                  <span class="adm-g__bk-label">Nom &amp; pr&eacute;nom</span>
                  <span class="adm-g__bk-value">${I(e.clientName||`Non renseigné`)}</span>
                </div>
                <div class="adm-g__bk-detail-item">
                  <span class="adm-g__bk-label">T&eacute;l&eacute;phone</span>
                  <span class="adm-g__bk-value">${I(e.clientPhone||`Non renseigné`)}</span>
                </div>
                <div class="adm-g__bk-detail-item">
                  <span class="adm-g__bk-label">E-mail</span>
                  <span class="adm-g__bk-value">${I(e.clientEmail||`Non renseigné`)}</span>
                </div>
              </div>
            </div>
          </div>
        `},n=ie(o).map((e,n)=>`
        <div class="adm-bkmonth">
          <button type="button" class="adm-bkmonth__toggle ${n===0?`is-open`:``}" data-bkmonth-toggle>
            <span class="adm-bkmonth__label">${I(e.label)}</span>
            <span class="adm-bkmonth__count">${e.items.length}</span>
            <svg class="adm-bkmonth__arrow" width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M4 5.5l3 3 3-3" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </button>
          <div class="adm-bkmonth__body ${n===0?``:`is-hidden`}">
            ${e.items.map(t).join(``)}
          </div>
        </div>`).join(``);h=`
        <div class="adm-g__bookings is-hidden" id="bookings-${e.id}">
          <div class="adm-g__bookings-header">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="1.5" y="2.5" width="13" height="11.5" rx="2" stroke="currentColor" stroke-width="1.2"/><path d="M4.5 1v3M11.5 1v3M1.5 6.5h13" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>
            <span>Reservations (${o.length})</span>
          </div>
          ${n}
        </div>
      `}let g=``;if(l){let t=P().filter(t=>t.id!==e.id&&t.city===e.city&&(t.pricePerDay||0)<=(e.pricePerDay||0)),n=new Date,r=n.getMonth(),i=n.getFullYear(),a=c.map((n,a)=>{let o=n.date?new Date(n.date+`T00:00:00`).toLocaleDateString(`fr-FR`,{day:`numeric`,month:`long`,year:`numeric`}):``,s=n.refusalReason||``,c=`replace-${e.id}-${n.id}`,l=n.activitySlug?t.filter(e=>(e.services||[]).includes(n.activitySlug)):t,u=``;return u=l.length>0?l.map(e=>{let t=(e.firstName?.[0]||``)+(e.lastName?.[0]||``),a=(e.languages||[]).join(`, `),o=new Set(re(e.id,n.activitySlug||void 0)),s=new Set(F().filter(t=>t.guideId===e.id&&t.status!==`reassigned`).map(e=>e.date)),l=!n.date||o.has(n.date)&&!s.has(n.date);return`
              <div class="adm-g__rcard ${l?``:`adm-g__rcard--unavailable`}" data-rcard data-rcard-guide-id="${e.id}">
                <div class="adm-g__rcard-header" data-toggle-rcard>
                  <input type="radio" name="${c}" value="${e.id}" class="adm-g__rcard-radio" ${l?``:`disabled`} />
                  ${e.photo?`<div class="adm-g__replace-av adm-g__replace-av--photo" style="background-image:url(${e.photo})"></div>`:`<div class="adm-g__replace-av adm-g__replace-av--${e.city}">${I(t)}</div>`}
                  <div class="adm-g__rcard-info">
                    <span class="adm-g__replace-name">${I(e.firstName)} ${I(e.lastName)}</span>
                    <span class="adm-g__replace-info">${e.pricePerDay?e.pricePerDay+`€`:``} ${a?`— `+I(a):``}
                      ${l?`<span class="adm-g__rcard-avail">Disponible</span>`:`<span class="adm-g__rcard-unavail">Indisponible a cette date</span>`}
                    </span>
                  </div>
                  <svg class="adm-g__rcard-arrow" width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M4 5.5L7 8.5L10 5.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                </div>
                <div class="adm-g__rcard-body is-hidden">
                  <div class="adm-g__rcard-profile">
                    ${e.diploma?`<div class="adm-g__rcard-detail"><span class="adm-g__rcard-label">Expertise</span><span class="adm-g__rcard-value">${I(e.diploma)}</span></div>`:``}
                    <a href="/guides/profil/?id=${e.id}" class="adm-g__rcard-profile-link">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M1 6s2-4 5-4 5 4 5 4-2 4-5 4-5-4-5-4z" stroke="currentColor" stroke-width="1.1"/><circle cx="6" cy="6" r="1.5" stroke="currentColor" stroke-width="1.1"/></svg>
                      Voir le profil complet
                    </a>
                  </div>
                  <div class="adm-cal">
                    <div class="adm-cal__header">
                      <span class="adm-cal__title">${ae[r]} ${i}</span>
                      <div class="adm-cal__legend">
                        <span class="adm-cal__legend-item"><span class="adm-cal__dot adm-cal__dot--avail"></span>Disponible</span>
                        <span class="adm-cal__legend-item"><span class="adm-cal__dot adm-cal__dot--busy"></span>Indisponible</span>
                        <span class="adm-cal__legend-item"><span class="adm-cal__dot adm-cal__dot--booked"></span>R&eacute;serv&eacute;</span>
                      </div>
                    </div>
                    <div class="adm-cal__grid"></div>
                    <div class="adm-cal__nav" data-cal-nav data-guide-id="${e.id}" data-month="${r}" data-year="${i}">
                      <button class="adm-cal__nav-btn" data-cal-prev>
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M7.5 2.5L4 6l3.5 3.5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
                      </button>
                      <button class="adm-cal__nav-btn" data-cal-next>
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M4.5 2.5L8 6l-3.5 3.5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            `}).join(``):n.activitySlug?`<p class="adm-g__no-replace">Aucun autre guide affect&eacute; &agrave; ce service dans cette ville.</p>`:`<p class="adm-g__no-replace">Aucun autre guide dans cette ville.</p>`,`
          <div class="adm-g__ref-row" data-ref-row>
            <button class="adm-g__ref-summary" data-toggle-ref-detail>
              <span class="adm-g__ref-dot"></span>
              <div class="adm-g__ref-summary-left">
                <span class="adm-g__ref-date">${I(o)}</span>
                <span class="adm-g__ref-client">${I(n.clientName||`Client non renseigne`)}</span>
              </div>
              <svg class="adm-g__ref-arrow" width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M4 5.5L7 8.5L10 5.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </button>
            <div class="adm-g__ref-detail is-hidden">
              <div class="adm-g__ref-reason">
                <span class="adm-g__ref-reason-label">Motif du refus :</span>
                <blockquote class="adm-g__refusal-msg">"${I(s)}"</blockquote>
              </div>
              <div class="adm-g__replace">
                <p class="adm-g__replace-label">Reassigner a un autre guide (optionnel) :</p>
                <div class="adm-g__replace-list">${u}</div>
              </div>
              <div class="adm-g__refusal-actions">
                <button class="adm-g__refusal-confirm" data-confirm-refusal="${e.id}" data-booking-id="${n.id}" data-radio-name="${c}">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7.5L5.5 10L11 4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
                  Confirmer le refus
                </button>
              </div>
            </div>
          </div>
        `}).join(``);g=`
        <div class="adm-g__refusal" id="refusal-${e.id}">
          <div class="adm-g__refusal-header">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="7.5" stroke="currentColor" stroke-width="1.4"/><path d="M9 5.5v4M9 12.5v.01" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
            <span>Refus en attente (${c.length})</span>
          </div>
          ${a}
        </div>
      `}d.innerHTML=`
      ${f}
      ${a}
      <div class="adm-g__info">
        <h3 class="adm-g__name">${I(e.firstName)} ${I(e.lastName)}</h3>
        <div class="adm-g__meta">
          <span class="adm-g__city adm-g__city--${e.city}">${I(t)}</span>
          ${m}
        </div>
      </div>
      <div class="adm-g__actions">
        <button class="adm-g__btn adm-g__btn--outline" data-open-creds="${e.id}">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="2" y="6" width="10" height="6.5" rx="1.5" stroke="currentColor" stroke-width="1.2"/><path d="M4.5 6V4.5a2.5 2.5 0 015 0V6" stroke="currentColor" stroke-width="1.2"/></svg>
          Identifiants
        </button>
        <button class="adm-g__btn adm-g__btn--outline" data-edit-guide="${e.id}">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M8.5 2.5l3 3M2 8.5L9.5 1l3 3L5 11.5 1.5 12l.5-3.5z" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          Modifier
        </button>
        <a href="/guides/profil/?id=${e.id}&login=1" class="adm-g__btn adm-g__btn--outline">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 7s2.5-5 6-5 6 5 6 5-2.5 5-6 5-6-5-6-5z" stroke="currentColor" stroke-width="1.2"/><circle cx="7" cy="7" r="2" stroke="currentColor" stroke-width="1.2"/></svg>
          Voir le profil
        </a>
        <button class="adm-g__btn adm-g__btn--outline adm-g__btn--danger" data-delete-guide="${e.id}">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 4h8M5.5 4V3a1 1 0 011-1h1a1 1 0 011 1v1M4.5 4v7a1.5 1.5 0 001.5 1.5h2a1.5 1.5 0 001.5-1.5V4" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          Supprimer
        </button>
      </div>
      ${h}
      ${g}
      <div class="adm-g__creds is-hidden" id="creds-${e.id}">
        <h4>Identifiants de ${I(e.firstName)} ${I(e.lastName)}</h4>
        <div class="adm-g__creds-form">
          <div class="adm-g__creds-field">
            <label>Identifiant</label>
            <input type="text" value="${I(e.login||``)}" readonly />
          </div>
        </div>
        <div class="adm-g__creds-reset">
          <div class="adm-g__creds-field">
            <label>Nouveau mot de passe</label>
            <input type="text" id="reset-pwd-${e.id}" placeholder="6 caractères min." autocomplete="off" />
          </div>
          <button type="button" class="adm-g__creds-save" data-reset-pwd="${e.id}" data-auth-id="${e.authUserId||``}">R&eacute;initialiser</button>
        </div>
      </div>
    `,d.querySelector(`[data-open-creds="${e.id}"]`).addEventListener(`click`,()=>{document.getElementById(`creds-${e.id}`)?.classList.toggle(`is-hidden`)}),d.querySelector(`[data-reset-pwd="${e.id}"]`)?.addEventListener(`click`,async()=>{let t=d.querySelector(`[data-reset-pwd="${e.id}"]`),n=t.dataset.authId,a=document.getElementById(`reset-pwd-${e.id}`),o=a.value.trim();if(!o||o.length<6){alert(`Le mot de passe doit contenir au moins 6 caractères.`);return}if(!n){alert(`Erreur : identifiant Auth introuvable pour ce guide.`);return}t.disabled=!0,t.textContent=`...`;try{let{data:{session:e}}=await i.auth.getSession(),t=await(await fetch(`${r}/functions/v1/reset-guide-password`,{method:`POST`,headers:{"Content-Type":`application/json`,Authorization:`Bearer ${e?.access_token}`,apikey:s},body:JSON.stringify({authUserId:n,newPassword:o})})).json();t.ok?(alert(`Mot de passe réinitialisé avec succès.`),a.value=``):alert(t.error||`Erreur lors de la réinitialisation.`)}catch{alert(`Erreur de connexion.`)}t.disabled=!1,t.textContent=`Réinitialiser`}),d.querySelector(`[data-delete-guide="${e.id}"]`).addEventListener(`click`,async()=>{if(!confirm(`Supprimer ${e.firstName} ${e.lastName} ?`))return;let{error:t}=await i.from(`guides`).delete().eq(`id`,e.id);if(t){alert(`Erreur lors de la suppression. Réessayez.`);return}p=p.filter(t=>t.id!==e.id),d.remove(),ue()}),d.querySelector(`[data-edit-guide="${e.id}"]`).addEventListener(`click`,()=>{ye(e.id)});let _=d.querySelector(`[data-toggle-bookings="${e.id}"]`);_&&_.addEventListener(`click`,()=>{document.getElementById(`bookings-${e.id}`)?.classList.toggle(`is-hidden`)}),d.querySelectorAll(`[data-bkmonth-toggle]`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.nextElementSibling;if(!t)return;let n=e.classList.toggle(`is-open`);t.classList.toggle(`is-hidden`,!n)})}),d.querySelectorAll(`[data-toggle-bk-detail]`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.closest(`[data-bk-row]`);if(!t)return;let n=t.querySelector(`.adm-g__bk-detail`),r=e.querySelector(`.adm-g__bk-arrow`);if(n){let e=!n.classList.contains(`is-hidden`);n.classList.toggle(`is-hidden`),r&&(r.style.transform=e?``:`rotate(180deg)`)}})});let v=d.querySelector(`[data-toggle-refusal="${e.id}"]`);return v&&v.addEventListener(`click`,()=>{document.getElementById(`refusal-${e.id}`)?.classList.toggle(`is-hidden`)}),d.querySelectorAll(`[data-toggle-rcard]`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.closest(`[data-rcard]`);if(!t)return;let n=t.querySelector(`.adm-g__rcard-body`),r=e.querySelector(`.adm-g__rcard-arrow`);if(n){let e=!n.classList.contains(`is-hidden`);n.classList.toggle(`is-hidden`),r&&(r.style.transform=e?``:`rotate(180deg)`)}})}),d.querySelectorAll(`.adm-cal`).forEach(e=>{let t=e.querySelector(`[data-cal-nav]`);if(!t)return;let n=t.dataset.guideId;se(e,n,parseInt(t.dataset.month),parseInt(t.dataset.year));let r=e.querySelector(`[data-cal-prev]`),i=e.querySelector(`[data-cal-next]`);r&&r.addEventListener(`click`,()=>{let r=parseInt(t.dataset.month),i=parseInt(t.dataset.year);r--,r<0&&(r=11,i--),se(e,n,r,i)}),i&&i.addEventListener(`click`,()=>{let r=parseInt(t.dataset.month),i=parseInt(t.dataset.year);r++,r>11&&(r=0,i++),se(e,n,r,i)})}),d.querySelectorAll(`[data-toggle-ref-detail]`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.closest(`[data-ref-row]`);if(!t)return;let n=t.querySelector(`.adm-g__ref-detail`),r=e.querySelector(`.adm-g__ref-arrow`);if(n){let e=!n.classList.contains(`is-hidden`);n.classList.toggle(`is-hidden`),r&&(r.style.transform=e?``:`rotate(180deg)`)}})}),d.querySelectorAll(`.adm-g__rcard-radio`).forEach(e=>{e.addEventListener(`click`,e=>{e.stopPropagation()})}),d.querySelectorAll(`[data-confirm-refusal]`).forEach(t=>{t.addEventListener(`click`,async()=>{let n=t,r=n.dataset.bookingId,a=n.dataset.radioName,o=d.querySelector(`input[name="${a}"]:checked`),s=o?o.value:null,c=F().find(e=>e.id===r);if(!c)return;n.disabled=!0;let{error:l}=await i.from(`bookings`).update({status:`reassigned`}).eq(`id`,r);if(l){n.disabled=!1,alert(`Une erreur est survenue. Réessayez.`);return}if(s){let t=P().find(t=>t.id===e.id),{error:n}=await i.from(`bookings`).insert({guide_id:s,date:c.date,slot:c.slot||null,activity_slug:c.activitySlug||null,activity_name:c.activityName||null,client_name:c.clientName||null,client_email:c.clientEmail||null,client_phone:c.clientPhone||null,status:`confirmed`,replacement_of:t?`${t.firstName} ${t.lastName}`:null});n&&alert(`Le refus a été confirmé, mais la réassignation a échoué (date déjà prise ?).`)}await S(),ce()})}),d}function ue(){let e=document.querySelector(`.adm-top__sub`);if(e){let t=P().length;e.textContent=`${t} guide${t===1?``:`s`} enregistre${t===1?``:`s`}`}}var L=null,de=document.getElementById(`modal-title`),R=document.getElementById(`add-guide-form`),z=document.getElementById(`act-prices-list`);function fe(){return R.querySelector(`[name="ville"]`)?.value||``}function pe(){return R.querySelector(`[name="gender"]`)?.value||``}function me(){let e=fe(),t=pe();return l.filter(n=>(!e||n.city===e)&&(n.gender===`all`||!t||n.gender===t))}function he(e){let t=me(),n=new Set(t.map(e=>e.slug)),r=t;if(e&&!n.has(e)){let n=l.find(t=>t.slug===e);n&&(r=[n,...t])}return`<option value="">— Choisir une activité —</option>`+r.map(t=>`<option value="${t.slug}"${t.slug===e?` selected`:``}>${Z(t.label)}</option>`).join(``)}function ge(){let e=new Set(me().map(e=>e.slug));z.querySelectorAll(`.adm-actprice`).forEach(t=>{let n=t.querySelector(`.adm-actprice__act`),r=e.has(n.value)?n.value:``;n.innerHTML=he(r),n.value=r})}R.querySelector(`[name="ville"]`)?.addEventListener(`change`,ge),R.querySelector(`[name="gender"]`)?.addEventListener(`change`,ge);function B(e=``,t=``){let n=document.createElement(`div`);n.className=`adm-actprice`,n.innerHTML=`
      <div class="adm-actprice__select-wrap">
        <select class="adm-actprice__act">${he(e)}</select>
        <svg class="adm-actprice__chev" width="12" height="12" viewBox="0 0 20 20" fill="none"><path d="M4 7l6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </div>
      <input type="number" class="adm-actprice__price" min="0" placeholder="Prix €" value="${t}" />
      <button type="button" class="adm-actprice__remove" aria-label="Retirer">&times;</button>`,n.querySelector(`.adm-actprice__remove`).addEventListener(`click`,()=>n.remove()),z.appendChild(n)}function _e(){let e={};return z.querySelectorAll(`.adm-actprice`).forEach(t=>{let n=t.querySelector(`.adm-actprice__act`).value,r=parseInt(t.querySelector(`.adm-actprice__price`).value);n&&r>0&&(e[n]=r)}),e}function ve(e){z.innerHTML=``;let t=Object.entries(e||{});if(t.length===0){B();return}t.forEach(([e,t])=>B(e,String(t)))}document.getElementById(`act-prices-add`)?.addEventListener(`click`,()=>B());function ye(e){let t=P().find(t=>t.id===e);if(!t)return;L=e,de.textContent=`Modifier le guide`,R.querySelector(`[name="prenom"]`).value=t.firstName||``,R.querySelector(`[name="nom"]`).value=t.lastName||``,R.querySelector(`[name="ville"]`).value=t.city||``,R.querySelector(`[name="gender"]`).value=t.gender||`homme`,R.querySelector(`[name="service_percent"]`).value=t.servicePercent?String(t.servicePercent):``,R.querySelector(`[name="supplement_prix"]`).value=t.supplement710?String(t.supplement710):``,R.querySelector(`[name="diplome"]`).value=t.diploma||``,R.querySelector(`[name="langues"]`).value=(t.languages||[]).join(`, `),R.querySelector(`[name="description"]`).value=t.description||``;let n=t.activityPrices&&Object.keys(t.activityPrices).length?{...t.activityPrices}:{};Object.keys(n).length===0&&(t.services||[]).length&&(t.services||[]).forEach(e=>{n[e]=t.pricePerDay||0}),ve(n);let r=R.querySelector(`[name="identifiant"]`),i=R.querySelector(`[name="mdp"]`);r.value=t.login||``,r.disabled=!0,i.value=``,i.placeholder=`Non modifiable ici`,i.disabled=!0,t.photo?(k.style.backgroundImage=`url(${t.photo})`,j(`result`)):j(`empty`),w.classList.remove(`is-hidden`)}function V(){L=null,de.textContent=`Ajouter un guide`,R.reset(),ve({});let e=R.querySelector(`[name="identifiant"]`),t=R.querySelector(`[name="mdp"]`);e.disabled=!1,t.disabled=!1,t.placeholder=`mot de passe (6 caractères min.)`,j(`empty`),k.style.backgroundImage=``}document.getElementById(`open-add-guide`).addEventListener(`click`,()=>{V(),w.classList.remove(`is-hidden`)}),document.getElementById(`close-modal`).addEventListener(`click`,()=>{w.classList.add(`is-hidden`),V()}),document.getElementById(`cancel-modal`).addEventListener(`click`,()=>{w.classList.add(`is-hidden`),V()}),w.addEventListener(`click`,e=>{e.target===w&&(w.classList.add(`is-hidden`),V())}),R.addEventListener(`submit`,async e=>{e.preventDefault();let t=R,n=t.querySelector(`[name="prenom"]`).value.trim(),r=t.querySelector(`[name="nom"]`).value.trim(),o=t.querySelector(`[name="ville"]`).value,s=t.querySelector(`[name="gender"]`).value,l=t.querySelector(`[name="service_percent"]`).value,d=t.querySelector(`[name="supplement_prix"]`).value,f=t.querySelector(`[name="diplome"]`).value.trim(),m=t.querySelector(`[name="langues"]`).value.trim(),h=t.querySelector(`[name="description"]`).value.trim(),g=t.querySelector(`[name="identifiant"]`).value.trim().toLowerCase(),_=t.querySelector(`[name="mdp"]`).value;if(!n||!r)return;let v=t.querySelector(`.adm-modal__submit`);v.disabled=!0,v.textContent=`Enregistrement...`;let y=()=>{v.disabled=!1,v.textContent=`Enregistrer`},b=k.style.backgroundImage.match(/url\("?([^"]*)"?\)/),x=b?b[1]:``,S=_e(),C=Object.keys(S),T=Object.values(S),ee=T.length?Math.min(...T):0,te={first_name:n,last_name:r,city:o||`medina`,gender:s||`homme`,diploma:f||null,description:h||null,languages:m?m.split(`,`).map(e=>e.trim()).filter(Boolean):[],price_per_day:ee,service_percent:l?parseInt(l):0,supplement_7_10:d?parseInt(d):0,services:C,activity_prices:S};if(L){let e=P().find(e=>e.id===L);if(!e){y();return}!x&&e.photo&&(x=e.photo);let{data:t,error:n}=await i.from(`guides`).update({...te,photo:x||null}).eq(`id`,L).select().single();if(y(),n||!t){alert(`Erreur lors de la mise à jour. Réessayez.`);return}let r=c(t),a=p.findIndex(e=>e.id===L);a!==-1&&(p[a]=r);let o=document.querySelector(`[data-guide-id="${L}"]`);if(o){let e=le(r);o.replaceWith(e),e.scrollIntoView({behavior:`smooth`,block:`center`})}}else{if(!g||!/^[a-z0-9._-]+$/.test(g)){y(),alert(`Identifiant invalide : lettres minuscules, chiffres, points, tirets uniquement (sans espaces ni accents).`);return}if(!_||_.length<6){y(),alert(`Le mot de passe doit contenir au moins 6 caractères.`);return}let{data:e,error:t}=await u.auth.signUp({email:g+a,password:_});if(t||!e.user){y(),alert(`Impossible de créer le compte du guide : ${t?.message||`erreur inconnue`}.\n(Identifiant déjà utilisé ?)`);return}let{data:n,error:r}=await i.from(`guides`).insert({...te,photo:x||null,login:g,auth_user_id:e.user.id}).select().single();if(y(),r||!n){alert(`Le compte a été créé mais l'enregistrement du guide a échoué. Réessayez.`);return}let o=c(n);p.push(o);let s=document.getElementById(`panel-guides`),l=le(o);s.appendChild(l),l.scrollIntoView({behavior:`smooth`,block:`center`})}ue(),w.classList.add(`is-hidden`),V()});var be=document.querySelectorAll(`[data-nav-tab]`),xe=document.getElementById(`panel-home`),Se=document.getElementById(`panel-guides-header`),Ce=document.getElementById(`panel-guides`),we=document.getElementById(`panel-reviews`);be.forEach(e=>{e.addEventListener(`click`,t=>{t.preventDefault();let n=e.dataset.navTab;be.forEach(e=>e.classList.remove(`adm-side__link--active`)),e.classList.add(`adm-side__link--active`),xe.classList.add(`is-hidden`),Se.classList.add(`is-hidden`),Ce.classList.add(`is-hidden`),we.classList.add(`is-hidden`),n===`home`?(xe.classList.remove(`is-hidden`),Ve(),He()):n===`reviews`?(we.classList.remove(`is-hidden`),$()):(Se.classList.remove(`is-hidden`),Ce.classList.remove(`is-hidden`))})});var H=[`Janvier`,`Février`,`Mars`,`Avril`,`Mai`,`Juin`,`Juillet`,`Août`,`Septembre`,`Octobre`,`Novembre`,`Décembre`];function U(e){return(Math.round(e)/100).toLocaleString(`fr-FR`,{minimumFractionDigits:0,maximumFractionDigits:2})+` €`}function W(e){return`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,`0`)}-${String(e.getDate()).padStart(2,`0`)}`}function G(e){let[t,n,r]=e.split(`-`).map(Number);return`${r} ${H[n-1].toLowerCase()} ${t}`}function Te(){let e=[];return x.forEach(t=>{t.status===`paid`&&t.amount_paid&&e.push({date:(t.created_at||``).slice(0,10),amount:t.amount_paid})}),v.forEach(t=>{t.status===`paid`&&t.amount_paid&&e.push({date:(t.created_at||``).slice(0,10),amount:t.amount_paid})}),e}function Ee(){let e=Te(),t=new Date,n=W(t),r=new Date(t),i=(t.getDay()+6)%7;r.setDate(t.getDate()-i);let a=W(r),o=`${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,`0`)}-01`,s=0,c=0,l=0,u=0;e.forEach(e=>{u+=e.amount,e.date===n&&(s+=e.amount),e.date>=a&&(c+=e.amount),e.date>=o&&(l+=e.amount)});let d=(e,t)=>{let n=document.getElementById(e);n&&(n.textContent=U(t))};d(`stat-today`,s),d(`stat-week`,c),d(`stat-month`,l),d(`stat-total`,u),Oe()}var De=`day`;function Oe(){let e=document.getElementById(`stat-breakdown`);if(!e)return;let t=Te(),n={};t.forEach(e=>{if(!e.date)return;let[t,r,i]=e.date.split(`-`).map(Number),a=``,o=``,s=``;if(De===`day`)a=e.date,o=G(e.date),s=e.date;else if(De===`month`)a=`${t}-${String(r).padStart(2,`0`)}`,o=`${H[r-1]} ${t}`,s=a;else{let e=new Date(t,r-1,i),n=(e.getDay()+6)%7;e.setDate(e.getDate()-n);let c=W(e);a=c,o=`Semaine du ${G(c)}`,s=c}n[a]||(n[a]={label:o,sort:s,amount:0}),n[a].amount+=e.amount});let r=Object.values(n).sort((e,t)=>t.sort.localeCompare(e.sort));if(r.length===0){e.innerHTML=`<p class="adm-breakdown__empty">Aucun encaissement pour le moment.</p>`;return}e.innerHTML=r.map(e=>`
      <div class="adm-breakdown__row">
        <span class="adm-breakdown__label">${Z(e.label)}</span>
        <span class="adm-breakdown__amount">${U(e.amount)}</span>
      </div>`).join(``)}document.querySelectorAll(`[data-stat-period]`).forEach(e=>{e.addEventListener(`click`,()=>{De=e.dataset.statPeriod,document.querySelectorAll(`[data-stat-period]`).forEach(e=>e.classList.remove(`adm-seg__btn--active`)),e.classList.add(`adm-seg__btn--active`),Oe()})});var ke=`Le matin`,K={year:0,month:0,editing:!1},q=!1;function Ae(){let e=new Set;return _.forEach(t=>e.add(t.date)),e}function je(e){let t=_.find(t=>t.date===e);return t?t.id:null}function J(){let e=document.getElementById(`call-cal-month`),t=document.getElementById(`call-cal-grid`);if(!e||!t)return;if(!K.year){let e=new Date;K.year=e.getFullYear(),K.month=e.getMonth()}e.textContent=`${H[K.month]} ${K.year}`;let n=Ae(),r=W(new Date);t.innerHTML=``;let i=(new Date(K.year,K.month,1).getDay()+6)%7,a=new Date(K.year,K.month+1,0).getDate();for(let e=0;e<i;e++){let e=document.createElement(`span`);e.className=`adm-callcal__cell adm-callcal__cell--empty`,t.appendChild(e)}for(let e=1;e<=a;e++){let i=`${K.year}-${String(K.month+1).padStart(2,`0`)}-${String(e).padStart(2,`0`)}`,a=n.has(i),o=i<r,s=document.createElement(`button`);s.type=`button`,s.className=`adm-callcal__cell`,s.innerHTML=`<span>${e}</span>`,a&&s.classList.add(`adm-callcal__cell--has`),o&&s.classList.add(`adm-callcal__cell--past`),K.editing&&!o?(s.classList.add(`adm-callcal__cell--edit`),s.addEventListener(`click`,()=>Me(i))):s.disabled=!0,t.appendChild(s)}}async function Me(e){if(q)return;q=!0;let t=je(e);if(t){if(v.some(t=>t.status===`paid`&&t.slot_date===e)&&!confirm(`Ce jour a une réservation payée. Le fermer ne supprime pas la réservation. Continuer ?`)){q=!1;return}let{error:n}=await i.from(`call_slots`).delete().eq(`id`,t);n?alert(`Erreur. Réessayez.`):_=_.filter(e=>e.id!==t)}else{let{data:t,error:n}=await i.from(`call_slots`).insert({date:e,time:ke}).select().single();!n&&t?_.push(t):alert(`Erreur. Réessayez.`)}q=!1,J()}async function Ne(){if(q)return;q=!0;let e=W(new Date),t=Ae(),n=new Date(K.year,K.month+1,0).getDate(),r=[];for(let i=1;i<=n;i++){let n=`${K.year}-${String(K.month+1).padStart(2,`0`)}-${String(i).padStart(2,`0`)}`;n>=e&&!t.has(n)&&r.push({date:n,time:ke})}if(r.length){let{data:e,error:t}=await i.from(`call_slots`).insert(r).select();!t&&e?_.push(...e):alert(`Erreur. Réessayez.`)}q=!1,J()}async function Pe(){if(q)return;let e=`${K.year}-${String(K.month+1).padStart(2,`0`)}-`,t=_.filter(t=>t.date.startsWith(e));if(t.length===0||v.some(t=>t.status===`paid`&&t.slot_date.startsWith(e))&&!confirm(`Certains jours ont des réservations payées. Les fermer ne supprime pas les réservations. Continuer ?`)||!confirm(`Fermer tous les jours de ce mois ?`))return;q=!0;let n=t.map(e=>e.id),{error:r}=await i.from(`call_slots`).delete().in(`id`,n);r?alert(`Erreur. Réessayez.`):_=_.filter(t=>!t.date.startsWith(e)),q=!1,J()}document.getElementById(`call-cal-selectall`)?.addEventListener(`click`,Ne),document.getElementById(`call-cal-clearall`)?.addEventListener(`click`,Pe),document.getElementById(`call-cal-prev`)?.addEventListener(`click`,()=>{K.month--,K.month<0&&(K.month=11,K.year--),J()}),document.getElementById(`call-cal-next`)?.addEventListener(`click`,()=>{K.month++,K.month>11&&(K.month=0,K.year++),J()});var Y=!1;document.getElementById(`call-cal-show`)?.addEventListener(`click`,()=>{Y=!Y;let e=document.getElementById(`call-cal-show`),t=document.getElementById(`call-cal-edit`),n=document.getElementById(`call-cal-container`),r=document.getElementById(`call-cal-hint`),i=document.getElementById(`call-cal-monthactions`);Y?(n.classList.remove(`is-hidden`),t.classList.remove(`is-hidden`),e.textContent=`Masquer`,J()):(K.editing=!1,n.classList.add(`is-hidden`),t.classList.add(`is-hidden`),t.textContent=`Modifier`,t.classList.remove(`adm-cal-toggle--on`),r?.classList.add(`is-hidden`),i?.classList.add(`is-hidden`),e.textContent=`Voir le calendrier`)}),document.getElementById(`call-cal-edit`)?.addEventListener(`click`,()=>{K.editing=!K.editing;let e=document.getElementById(`call-cal-edit`),t=document.getElementById(`call-cal-hint`),n=document.getElementById(`call-cal-monthactions`);e.textContent=K.editing?`Terminer`:`Modifier`,e.classList.toggle(`adm-cal-toggle--on`,K.editing),t&&(t.textContent=`Cliquez sur un jour pour l'ouvrir ou le fermer à la réservation.`,t.classList.toggle(`is-hidden`,!K.editing)),n?.classList.toggle(`is-hidden`,!K.editing),J()});function Fe(){let e=document.getElementById(`call-bookings-list`),t=document.getElementById(`call-bookings-count`);if(!e)return;let n=v.filter(e=>e.status===`paid`).sort((e,t)=>(t.slot_date+t.slot_time).localeCompare(e.slot_date+e.slot_time));if(t&&(t.textContent=n.length?String(n.length):``),n.length===0){e.innerHTML=`<p class="adm-callbookings__empty">Aucun appel réservé pour le moment.</p>`;return}e.innerHTML=n.map(e=>Le({title:e.name||`Client`,meta:`Appel le ${G(e.slot_date)}${e.slot_time?` à ${e.slot_time}`:``}`,tag:e.amount_paid?U(e.amount_paid):`Payé`,tone:`green`,fields:[[`Nom & prénom`,e.name||`—`],[`Téléphone`,e.phone||`—`],[`E-mail`,e.email||`—`],[`Nombre de personnes`,e.group_size?String(e.group_size):`—`],[`Date d'arrivée`,e.arrival?G(e.arrival):`—`],[`Date de départ`,e.departure?G(e.departure):`—`],[`Billets d'avion`,e.has_tickets?`Oui, déjà réservés`:`Non, pas encore`],[`Montant payé`,e.amount_paid?U(e.amount_paid):`—`]]})).join(``)}function Ie(e){return(e||`?`).trim().split(/\s+/).slice(0,2).map(e=>e[0]||``).join(``).toUpperCase()||`?`}function Le(e){let{title:t,meta:n,tag:r,tone:i=`green`,fields:a,note:o}=e,s=a.filter(([,e])=>e&&e!==`—`).map(([e,t])=>`
        <div class="adm-dcard__cell">
          <span class="adm-dcard__k">${Z(e)}</span>
          <span class="adm-dcard__v">${Z(t)}</span>
        </div>`).join(``),c=o&&o.text?`<div class="adm-dcard__note">
           <span class="adm-dcard__k">${Z(o.label)}</span>
           <p>${Z(o.text)}</p>
         </div>`:``;return`
      <div class="adm-dcard" data-cb>
        <button type="button" class="adm-dcard__head" data-cb-toggle>
          <span class="adm-dcard__avatar adm-dcard__avatar--${i}">${Z(Ie(t))}</span>
          <span class="adm-dcard__id">
            <span class="adm-dcard__name">${Z(t)}</span>
            <span class="adm-dcard__meta">${Z(n)}</span>
          </span>
          ${r?`<span class="adm-dcard__tag adm-dcard__tag--${i}">${Z(r)}</span>`:``}
          <svg class="adm-dcard__chevron" width="16" height="16" viewBox="0 0 20 20" fill="none"><path d="M5 8l5 5 5-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </button>
        <div class="adm-dcard__body">
          <div class="adm-dcard__grid">${s}</div>
          ${c}
        </div>
      </div>`}function Re(){let e=document.getElementById(`visa-requests-list`),t=document.getElementById(`visa-requests-count`);if(e){if(t&&(t.textContent=y.length?String(y.length):``),y.length===0){e.innerHTML=`<p class="adm-callbookings__empty">Aucune demande de visa pour le moment.</p>`;return}e.innerHTML=y.map(e=>Le({title:e.name||`Demandeur`,meta:`Reçue le ${G(String(e.created_at||``).slice(0,10))}`,tag:e.visa_type||`Visa`,tone:`gold`,fields:[[`Nom & prénom`,e.name||`—`],[`Type de visa`,e.visa_type||`—`],[`Pays`,e.country||`—`],[`N° de passeport`,e.passport||`—`],[`Type de passeport`,e.passport_type||`—`],[`Date d'arrivée`,e.arrival?G(e.arrival):`—`],[`Date de départ`,e.departure?G(e.departure):`—`]]})).join(``)}}function ze(){let e=document.getElementById(`applications-list`),t=document.getElementById(`applications-count`);if(e){if(t&&(t.textContent=b.length?String(b.length):``),b.length===0){e.innerHTML=`<p class="adm-callbookings__empty">Aucune candidature pour le moment.</p>`;return}e.innerHTML=b.map(e=>{let t=e.city===`mecca`?`Makkah`:e.city===`medina`?`Médine`:e.city||`—`;return Le({title:`${e.first_name||``} ${e.last_name||``}`.trim()||`Candidat`,meta:`Reçue le ${G(String(e.created_at||``).slice(0,10))}`,tag:t,tone:`blue`,fields:[[`Nom & prénom`,`${e.first_name||``} ${e.last_name||``}`.trim()||`—`],[`E-mail`,e.email||`—`],[`Téléphone`,e.phone||`—`],[`Ville de résidence`,t],[`Langues parlées`,e.languages||`—`]],note:{label:`Expérience`,text:e.experience||``}})}).join(``)}}document.querySelectorAll(`[data-dpanel]`).forEach(e=>{e.addEventListener(`click`,e=>{let t=e.target.closest(`[data-cb-toggle]`);t&&t.parentElement?.classList.toggle(`adm-dcard--open`)})}),document.querySelectorAll(`[data-dtab]`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.dataset.dtab;document.querySelectorAll(`[data-dtab]`).forEach(t=>t.classList.toggle(`adm-dtab--active`,t===e)),document.querySelectorAll(`[data-dpanel]`).forEach(e=>e.classList.toggle(`is-hidden`,e.dataset.dpanel!==t))})});function Be(){let e=document.getElementById(`all-bookings-list`),t=document.getElementById(`all-bookings-count`);if(!e)return;let n=F().filter(e=>e.status!==`reassigned`);t&&(t.textContent=n.length?String(n.length):``);let r=e=>{let t=P().find(t=>t.id===e);return t?`${t.firstName} ${t.lastName}`:`Guide supprimé`},i={};for(let e of n){let t=e.activitySlug||`__sans`;(i[t]=i[t]||[]).push(e)}let a=l.map(e=>({slug:e.slug,label:e.label,items:i[e.slug]||[]}));(i.__sans||[]).length>0&&a.push({slug:`__sans`,label:`Activité non précisée`,items:i.__sans});let o=e=>{let t=e.status===`pending-refusal`,n=e.date?G(e.date):`—`;return`
        <div class="adm-abk" data-abk>
          <button type="button" class="adm-abk__head" data-abk-toggle>
            <span class="adm-abk__main">
              <span class="adm-abk__activity">${I(n)}${e.slot?` &middot; `+I(e.slot):``}</span>
              <span class="adm-abk__sub">${I(r(e.guideId))} &mdash; ${I(e.clientName||`Client non renseigné`)}</span>
            </span>
            ${t?`<span class="adm-abk__flag">Refus en attente</span>`:``}
            ${e.seen?``:`<span class="adm-abk__flag adm-abk__flag--new">Non vu</span>`}
            <svg class="adm-abk__chev" width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M4 5.5l3 3 3-3" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </button>
          <div class="adm-abk__body">
            <div class="adm-dcard__grid">
              <div class="adm-dcard__cell"><span class="adm-dcard__k">Client</span><span class="adm-dcard__v">${I(e.clientName||`Non renseigné`)}</span></div>
              <div class="adm-dcard__cell"><span class="adm-dcard__k">Téléphone</span><span class="adm-dcard__v">${I(e.clientPhone||`Non renseigné`)}</span></div>
              <div class="adm-dcard__cell"><span class="adm-dcard__k">E-mail</span><span class="adm-dcard__v">${I(e.clientEmail||`Non renseigné`)}</span></div>
              <div class="adm-dcard__cell"><span class="adm-dcard__k">Guide</span><span class="adm-dcard__v">${I(r(e.guideId))}</span></div>
              <div class="adm-dcard__cell"><span class="adm-dcard__k">Date</span><span class="adm-dcard__v">${I(n)}</span></div>
              <div class="adm-dcard__cell"><span class="adm-dcard__k">Créneau</span><span class="adm-dcard__v">${I(e.slot||`Journée`)}</span></div>
              ${t&&e.refusalReason?`<div class="adm-dcard__cell adm-dcard__cell--full"><span class="adm-dcard__k">Motif du refus</span><span class="adm-dcard__v">${I(e.refusalReason)}</span></div>`:``}
            </div>
          </div>
        </div>`};e.innerHTML=a.map(e=>{let t=e.items.length===0?`<p class="adm-callbookings__empty">Aucune réservation pour cette activité.</p>`:ie(e.items).map((e,t)=>`
            <div class="adm-bkmonth">
              <button type="button" class="adm-bkmonth__toggle ${t===0?`is-open`:``}" data-bkmonth-toggle>
                <span class="adm-bkmonth__label">${I(e.label)}</span>
                <span class="adm-bkmonth__count">${e.items.length}</span>
                <svg class="adm-bkmonth__arrow" width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M4 5.5l3 3 3-3" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
              </button>
              <div class="adm-bkmonth__body ${t===0?``:`is-hidden`}">
                <div class="adm-abkday__rows">${e.items.map(o).join(``)}</div>
              </div>
            </div>`).join(``);return`
        <div class="adm-actgrp">
          <button type="button" class="adm-actgrp__head" data-actgrp-toggle>
            <span class="adm-actgrp__name">${I(e.label)}</span>
            <span class="adm-actgrp__count ${e.items.length===0?`adm-actgrp__count--zero`:``}">${e.items.length}</span>
            <svg class="adm-actgrp__chev" width="15" height="15" viewBox="0 0 14 14" fill="none"><path d="M4 5.5l3 3 3-3" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </button>
          <div class="adm-actgrp__body is-hidden">${t}</div>
        </div>`}).join(``),e.querySelectorAll(`[data-actgrp-toggle]`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.nextElementSibling;if(!t)return;let n=e.classList.toggle(`is-open`);t.classList.toggle(`is-hidden`,!n)})}),e.querySelectorAll(`[data-bkmonth-toggle]`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.nextElementSibling;if(!t)return;let n=e.classList.toggle(`is-open`);t.classList.toggle(`is-hidden`,!n)})}),e.querySelectorAll(`[data-abk-toggle]`).forEach(e=>{e.addEventListener(`click`,()=>{e.parentElement?.classList.toggle(`adm-abk--open`)})})}function Ve(){Ee(),J(),Fe(),Re(),ze(),Be()}async function He(){let[e,t,n,r,a]=await Promise.all([i.from(`call_slots`).select(`*`).order(`date`),i.from(`call_bookings`).select(`*`).order(`slot_date`),i.from(`bookings`).select(`*`).order(`date`),i.from(`visa_requests`).select(`*`).order(`created_at`,{ascending:!1}),i.from(`guide_applications`).select(`*`).order(`created_at`,{ascending:!1})]);e.data&&(_=e.data),t.data&&(v=t.data),n.data&&(x=n.data,m=n.data.map(o)),r.data&&(y=r.data),a.data&&(b=a.data),Ve()}document.getElementById(`home-refresh`)?.addEventListener(`click`,async()=>{let e=document.getElementById(`home-refresh`);e.disabled=!0;let t=e.innerHTML;e.textContent=`Actualisation…`,await He(),e.disabled=!1,e.innerHTML=t});var X=`pending`;function Ue(){return h}async function We(e,t){let{error:n}=await i.from(`reviews`).update({status:t}).eq(`id`,e);if(n)return alert(`Erreur, réessayez.`),!1;let r=h.find(t=>t.id===e);return r&&(r.status=t),!0}function Z(e){return e.replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`)}function Q(){let e=Ue().filter(e=>e.status===`pending`),t=document.getElementById(`pending-count`);t&&(t.textContent=String(e.length),t.hidden=e.length===0)}function Ge(){let e=F().filter(e=>e.status===`pending-refusal`),t=document.getElementById(`refusal-count`);t&&(t.textContent=String(e.length),t.hidden=e.length===0)}function $(){let e=Ue(),t=e.filter(e=>e.status===`pending`),n=e.filter(e=>e.status===`approved`),r=e.filter(e=>e.status===`rejected`),a=document.getElementById(`reviews-sub`);a&&(a.textContent=`${e.length} avis au total — ${t.length} en attente`);let o=document.getElementById(`rtab-pending-count`),s=document.getElementById(`rtab-approved-count`),c=document.getElementById(`rtab-rejected-count`);o&&(o.textContent=t.length>0?`(${t.length})`:``),s&&(s.textContent=n.length>0?`(${n.length})`:``),c&&(c.textContent=r.length>0?`(${r.length})`:``);let l=X===`pending`?t:X===`approved`?n:r,u=document.getElementById(`reviews-list`);if(u){if(l.length===0){u.innerHTML=`<div class="adm-reviews__empty">Aucun avis ${X===`pending`?`en attente`:X===`approved`?`approuvé`:`refusé`}.</div>`;return}u.innerHTML=l.map(e=>{let t=`★`.repeat(e.stars||5)+`☆`.repeat(5-(e.stars||5)),n=e.date?new Date(e.date).toLocaleDateString(`fr-FR`,{day:`numeric`,month:`long`,year:`numeric`}):``,r=``;return r=e.status===`pending`?`
          <button class="adm-rv__btn adm-rv__btn--approve" data-rv-approve="${e.id}">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7.5L5.5 10L11 4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
            Approuver
          </button>
          <button class="adm-rv__btn adm-rv__btn--reject" data-rv-reject="${e.id}">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M4 4l6 6M10 4l-6 6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>
            Refuser
          </button>
        `:e.status===`approved`?`
          <button class="adm-rv__btn adm-rv__btn--reject" data-rv-reject="${e.id}">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M4 4l6 6M10 4l-6 6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>
            Retirer
          </button>
        `:`
          <button class="adm-rv__btn adm-rv__btn--approve" data-rv-approve="${e.id}">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7.5L5.5 10L11 4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
            Approuver
          </button>
          <button class="adm-rv__btn adm-rv__btn--delete" data-rv-delete="${e.id}">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 4h8M5.5 4V3a1 1 0 011-1h1a1 1 0 011 1v1M4.5 4v7a1.5 1.5 0 001.5 1.5h2a1.5 1.5 0 001.5-1.5V4" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            Supprimer
          </button>
        `,`
        <div class="adm-rv">
          <div class="adm-rv__stars">${t}</div>
          <div class="adm-rv__body">
            <p class="adm-rv__text">${Z(e.text)}</p>
            <div class="adm-rv__meta">
              <span class="adm-rv__name">${Z(e.name)}</span>
              <span class="adm-rv__sep">·</span>
              <span class="adm-rv__service">${Z(e.service)}</span>
              ${n?`<span class="adm-rv__sep">·</span><span class="adm-rv__date">${n}</span>`:``}
            </div>
          </div>
          <div class="adm-rv__actions">${r}</div>
        </div>
      `}).join(``),u.querySelectorAll(`[data-rv-approve]`).forEach(e=>{e.addEventListener(`click`,async()=>{let t=e.dataset.rvApprove;await We(t,`approved`)&&($(),Q())})}),u.querySelectorAll(`[data-rv-reject]`).forEach(e=>{e.addEventListener(`click`,async()=>{let t=e.dataset.rvReject;await We(t,`rejected`)&&($(),Q())})}),u.querySelectorAll(`[data-rv-delete]`).forEach(e=>{e.addEventListener(`click`,async()=>{let t=e.dataset.rvDelete,{error:n}=await i.from(`reviews`).delete().eq(`id`,t);if(n){alert(`Erreur, réessayez.`);return}h=h.filter(e=>e.id!==t),$(),Q()})})}}document.querySelectorAll(`[data-rtab]`).forEach(e=>{e.addEventListener(`click`,()=>{X=e.dataset.rtab,document.querySelectorAll(`[data-rtab]`).forEach(e=>e.classList.remove(`adm-reviews__tab--active`)),e.classList.add(`adm-reviews__tab--active`),$()})}),Q(),Ge();
import{a as e,c as t,d as n,i as r,l as i,n as a,o,r as s,s as c}from"./supabase.BampuV_k.js";var l=n(r,s,{auth:{persistSession:!1,autoRefreshToken:!1}}),u=document.getElementById(`login-gate`),d=document.getElementById(`dashboard`),f=[],p=[],m=[],h={},g=[],_=[],v=[];async function y(){let[e,n,r,a,s,l]=await Promise.all([i.from(`guides`).select(`*`).order(`created_at`),i.from(`bookings`).select(`*`).order(`date`),i.from(`reviews`).select(`*`).order(`created_at`,{ascending:!1}),i.from(`availability`).select(`guide_id, date`),i.from(`call_slots`).select(`*`).order(`date`),i.from(`call_bookings`).select(`*`).order(`slot_date`)]);f=(e.data||[]).map(c),p=(n.data||[]).map(o),v=n.data||[],m=(r.data||[]).map(t),h={},(a.data||[]).forEach(e=>{(h[e.guide_id]=h[e.guide_id]||[]).push(e.date)}),g=s.data||[],_=l.data||[]}async function b(){await y(),u.classList.add(`is-hidden`),d.classList.remove(`is-hidden`),ae(),Z(),Q(),we()}(async()=>{await e()&&await b()})(),document.getElementById(`login-form`).addEventListener(`submit`,async t=>{t.preventDefault();let n=document.getElementById(`login-email`).value.trim(),r=document.getElementById(`login-pass`).value,a=document.getElementById(`login-error`);a.classList.add(`is-hidden`);let{error:o}=await i.auth.signInWithPassword({email:n,password:r});if(o||!await e()){await i.auth.signOut(),a.classList.remove(`is-hidden`);return}await b()}),document.getElementById(`logout-btn`).addEventListener(`click`,async()=>{await i.auth.signOut(),u.classList.remove(`is-hidden`),d.classList.add(`is-hidden`)});var x=document.getElementById(`modal-overlay`),S=document.getElementById(`photo-input`),C=document.getElementById(`photo-empty`),ee=document.getElementById(`photo-editor`),w=document.getElementById(`photo-result`),T=document.getElementById(`photo-crop-img`),E=document.getElementById(`photo-crop`),D=document.getElementById(`photo-zoom`),O=document.getElementById(`photo-result-circle`),k={x:0,y:0,scale:1,dragging:!1,startX:0,startY:0,origX:0,origY:0,imgSrc:``};function A(e){C.classList.toggle(`is-hidden`,e!==`empty`),ee.classList.toggle(`is-hidden`,e!==`editor`),w.classList.toggle(`is-hidden`,e!==`result`)}function j(){T.style.transform=`translate(${k.x}px, ${k.y}px) scale(${k.scale})`}function M(){let e=T.naturalWidth*k.scale,t=T.naturalHeight*k.scale,n=160-e,r=160-t;k.x=Math.min(0,Math.max(n,k.x)),k.y=Math.min(0,Math.max(r,k.y))}document.getElementById(`photo-btn`).addEventListener(`click`,()=>S.click()),document.getElementById(`photo-placeholder`).addEventListener(`click`,()=>S.click()),document.getElementById(`photo-change-btn`).addEventListener(`click`,()=>S.click()),S.addEventListener(`change`,()=>{let e=S.files?.[0];if(!e)return;let t=new FileReader;t.onload=e=>{k.imgSrc=e.target?.result,T.src=k.imgSrc,T.onload=()=>{k.scale=160/Math.min(T.naturalWidth,T.naturalHeight),k.x=(160-T.naturalWidth*k.scale)/2,k.y=(160-T.naturalHeight*k.scale)/2,D.min=String(Math.round(k.scale*100)),D.max=String(Math.round(k.scale*100*3)),D.value=String(Math.round(k.scale*100)),j(),A(`editor`)}},t.readAsDataURL(e)}),E.addEventListener(`mousedown`,e=>{e.preventDefault(),k.dragging=!0,k.startX=e.clientX,k.startY=e.clientY,k.origX=k.x,k.origY=k.y,E.style.cursor=`grabbing`}),window.addEventListener(`mousemove`,e=>{k.dragging&&(k.x=k.origX+(e.clientX-k.startX),k.y=k.origY+(e.clientY-k.startY),M(),j())}),window.addEventListener(`mouseup`,()=>{k.dragging=!1,E.style.cursor=`grab`}),E.addEventListener(`touchstart`,e=>{e.touches.length===1&&(k.dragging=!0,k.startX=e.touches[0].clientX,k.startY=e.touches[0].clientY,k.origX=k.x,k.origY=k.y)},{passive:!0}),window.addEventListener(`touchmove`,e=>{!k.dragging||e.touches.length!==1||(k.x=k.origX+(e.touches[0].clientX-k.startX),k.y=k.origY+(e.touches[0].clientY-k.startY),M(),j())},{passive:!0}),window.addEventListener(`touchend`,()=>{k.dragging=!1}),D.addEventListener(`input`,()=>{let e=k.scale;k.scale=parseInt(D.value)/100;let t=k.scale/e;k.x=80-(80-k.x)*t,k.y=80-(80-k.y)*t,M(),j()}),E.addEventListener(`wheel`,e=>{e.preventDefault();let t=parseInt(D.min)/100,n=parseInt(D.max)/100,r=e.deltaY>0?-.05:.05,i=k.scale;k.scale=Math.min(n,Math.max(t,k.scale+r));let a=k.scale/i;k.x=80-(80-k.x)*a,k.y=80-(80-k.y)*a,M(),D.value=String(Math.round(k.scale*100)),j()},{passive:!1}),document.getElementById(`photo-crop-cancel`).addEventListener(`click`,()=>{A(`empty`),S.value=``}),document.getElementById(`photo-crop-confirm`).addEventListener(`click`,()=>{let e=document.createElement(`canvas`);e.width=320,e.height=320,e.getContext(`2d`).drawImage(T,k.x*2,k.y*2,T.naturalWidth*k.scale*2,T.naturalHeight*k.scale*2);let t=e.toDataURL(`image/jpeg`,.9);O.style.backgroundImage=`url(${t})`,A(`result`)});function N(){return f}function P(){return p}function te(e){return h[e]||[]}function F(e){return e.replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`)}var ne=[`Janvier`,`Février`,`Mars`,`Avril`,`Mai`,`Juin`,`Juillet`,`Août`,`Septembre`,`Octobre`,`Novembre`,`Décembre`],re=[`Lu`,`Ma`,`Me`,`Je`,`Ve`,`Sa`,`Di`];function ie(e,t,n,r){let i=new Set(te(t)),a=new Set(P().filter(e=>e.guideId===t&&e.status!==`reassigned`).map(e=>e.date)),o=new Date(r,n,1).getDay(),s=o===0?6:o-1,c=new Date(r,n+1,0).getDate(),l=new Date,u=re.map(e=>`<span class="adm-cal__day-label">${e}</span>`).join(``);for(let e=0;e<s;e++)u+=`<span class="adm-cal__empty"></span>`;for(let e=1;e<=c;e++){let t=`${r}-${String(n+1).padStart(2,`0`)}-${String(e).padStart(2,`0`)}`,o=a.has(t),s=i.has(t),c=new Date(r,n,e)<new Date(l.getFullYear(),l.getMonth(),l.getDate()),d=`adm-cal__day`;c?d+=` adm-cal__day--past`:o?d+=` adm-cal__day--booked`:s?d+=` adm-cal__day--avail`:d+=` adm-cal__day--busy`,u+=`<span class="${d}">${e}</span>`}let d=e.querySelector(`.adm-cal__grid`),f=e.querySelector(`.adm-cal__title`);d&&(d.innerHTML=u),f&&(f.textContent=`${ne[n]} ${r}`);let p=e.querySelector(`[data-cal-nav]`);p&&(p.dataset.month=n.toString(),p.dataset.year=r.toString())}function ae(){let e=document.getElementById(`panel-guides`);e.innerHTML=``,N().forEach(t=>e.appendChild(I(t))),oe(),Q()}function I(e){let t=e.city===`medina`?`Medine`:`La Mecque`,n=(e.firstName?.[0]||``)+(e.lastName?.[0]||``),r=e.photo?`<div class="adm-g__avatar adm-g__avatar--photo" style="background-image:url(${e.photo})"></div>`:`<div class="adm-g__avatar adm-g__avatar--${e.city}">${F(n)}</div>`,a=P().filter(t=>t.guideId===e.id&&t.status!==`reassigned`),o=a.filter(e=>e.status===`pending-refusal`),s=o.length>0,c=a.length>0,l=document.createElement(`div`);l.className=`adm-g`,l.dataset.guideId=e.id;let u=``;u=s?`<div class="adm-g__notif">
        <button class="adm-g__dot adm-g__dot--red" data-toggle-refusal="${e.id}" title="Mission refusee — cliquez pour voir le motif">
          <span class="adm-g__dot-pulse"></span>
        </button>
      </div>`:`<div class="adm-g__notif">
        <span class="adm-g__dot adm-g__dot--green" title="Aucun probleme"></span>
      </div>`;let d=``;d=c?`<button class="adm-g__booking-btn" data-toggle-bookings="${e.id}">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><rect x="1" y="2" width="10" height="9" rx="1.5" stroke="currentColor" stroke-width="1.1"/><path d="M3.5 1v2M8.5 1v2M1 5h10" stroke="currentColor" stroke-width="1.1" stroke-linecap="round"/></svg>
        Reservations
        <span class="adm-g__booking-count">${a.length}</span>
      </button>`:`<span class="adm-g__status adm-g__status--free">Libre</span>`;let p=``;if(c){let t=a.map(e=>{let t=e.date?new Date(e.date+`T00:00:00`).toLocaleDateString(`fr-FR`,{day:`numeric`,month:`long`,year:`numeric`}):e.dates||``,n=e.status===`pending-refusal`?`<span class="adm-g__bk-status adm-g__bk-status--refused">Refus en attente</span>`:e.replacementOf?`<span class="adm-g__bk-status adm-g__bk-status--replaced">En remplacement de ${F(e.replacementOf)}</span>`:``;return`
          <div class="adm-g__bk-row" data-bk-row>
            <button class="adm-g__bk-summary" data-toggle-bk-detail>
              <div class="adm-g__bk-summary-left">
                <span class="adm-g__bk-client">${F(e.clientName||e.client||`Client`)}</span>
                <span class="adm-g__bk-dates">${F(t)}${e.slot?` &middot; `+F(e.slot):``}</span>
                ${e.seen?`<span class="adm-g__bk-status adm-g__bk-status--seen">✓ Vu par le guide</span>`:`<span class="adm-g__bk-status adm-g__bk-status--unseen">Non vu</span>`}
                ${e.activityName?`<span class="adm-g__bk-status adm-g__bk-status--activity">${F(e.activityName)}</span>`:``}
                ${n}
              </div>
              <svg class="adm-g__bk-arrow" width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M4 5.5L7 8.5L10 5.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </button>
            <div class="adm-g__bk-detail is-hidden">
              <div class="adm-g__bk-detail-grid">
                <div class="adm-g__bk-detail-item">
                  <span class="adm-g__bk-label">T&eacute;l&eacute;phone</span>
                  <span class="adm-g__bk-value">${F(e.clientPhone||`Non renseigne`)}</span>
                </div>
                <div class="adm-g__bk-detail-item">
                  <span class="adm-g__bk-label">Email</span>
                  <span class="adm-g__bk-value">${F(e.clientEmail||`Non renseigne`)}</span>
                </div>
              </div>
            </div>
          </div>
        `}).join(``);p=`
        <div class="adm-g__bookings is-hidden" id="bookings-${e.id}">
          <div class="adm-g__bookings-header">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="1.5" y="2.5" width="13" height="11.5" rx="2" stroke="currentColor" stroke-width="1.2"/><path d="M4.5 1v3M11.5 1v3M1.5 6.5h13" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>
            <span>Reservations (${a.length})</span>
          </div>
          ${t}
        </div>
      `}let m=``;if(s){let t=N().filter(t=>t.id!==e.id&&t.city===e.city&&(t.pricePerDay||0)<=(e.pricePerDay||0)),n=new Date,r=n.getMonth(),i=n.getFullYear(),a=o.map((n,a)=>{let o=n.date?new Date(n.date+`T00:00:00`).toLocaleDateString(`fr-FR`,{day:`numeric`,month:`long`,year:`numeric`}):``,s=n.refusalReason||``,c=`replace-${e.id}-${n.id}`,l=n.activitySlug?t.filter(e=>(e.services||[]).includes(n.activitySlug)):t,u=``;return u=l.length>0?l.map(e=>{let t=(e.firstName?.[0]||``)+(e.lastName?.[0]||``),a=(e.languages||[]).join(`, `),o=new Set(te(e.id)),s=new Set(P().filter(t=>t.guideId===e.id&&t.status!==`reassigned`).map(e=>e.date)),l=!n.date||o.has(n.date)&&!s.has(n.date);return`
              <div class="adm-g__rcard ${l?``:`adm-g__rcard--unavailable`}" data-rcard data-rcard-guide-id="${e.id}">
                <div class="adm-g__rcard-header" data-toggle-rcard>
                  <input type="radio" name="${c}" value="${e.id}" class="adm-g__rcard-radio" ${l?``:`disabled`} />
                  ${e.photo?`<div class="adm-g__replace-av adm-g__replace-av--photo" style="background-image:url(${e.photo})"></div>`:`<div class="adm-g__replace-av adm-g__replace-av--${e.city}">${F(t)}</div>`}
                  <div class="adm-g__rcard-info">
                    <span class="adm-g__replace-name">${F(e.firstName)} ${F(e.lastName)}</span>
                    <span class="adm-g__replace-info">${e.pricePerDay?e.pricePerDay+`€`:``} ${a?`— `+F(a):``}
                      ${l?`<span class="adm-g__rcard-avail">Disponible</span>`:`<span class="adm-g__rcard-unavail">Indisponible a cette date</span>`}
                    </span>
                  </div>
                  <svg class="adm-g__rcard-arrow" width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M4 5.5L7 8.5L10 5.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                </div>
                <div class="adm-g__rcard-body is-hidden">
                  <div class="adm-g__rcard-profile">
                    ${e.diploma?`<div class="adm-g__rcard-detail"><span class="adm-g__rcard-label">Expertise</span><span class="adm-g__rcard-value">${F(e.diploma)}</span></div>`:``}
                    <a href="/guides/profil/?id=${e.id}" class="adm-g__rcard-profile-link">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M1 6s2-4 5-4 5 4 5 4-2 4-5 4-5-4-5-4z" stroke="currentColor" stroke-width="1.1"/><circle cx="6" cy="6" r="1.5" stroke="currentColor" stroke-width="1.1"/></svg>
                      Voir le profil complet
                    </a>
                  </div>
                  <div class="adm-cal">
                    <div class="adm-cal__header">
                      <span class="adm-cal__title">${ne[r]} ${i}</span>
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
                <span class="adm-g__ref-date">${F(o)}</span>
                <span class="adm-g__ref-client">${F(n.clientName||`Client non renseigne`)}</span>
              </div>
              <svg class="adm-g__ref-arrow" width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M4 5.5L7 8.5L10 5.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </button>
            <div class="adm-g__ref-detail is-hidden">
              <div class="adm-g__ref-reason">
                <span class="adm-g__ref-reason-label">Motif du refus :</span>
                <blockquote class="adm-g__refusal-msg">"${F(s)}"</blockquote>
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
        `}).join(``);m=`
        <div class="adm-g__refusal" id="refusal-${e.id}">
          <div class="adm-g__refusal-header">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="7.5" stroke="currentColor" stroke-width="1.4"/><path d="M9 5.5v4M9 12.5v.01" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
            <span>Refus en attente (${o.length})</span>
          </div>
          ${a}
        </div>
      `}l.innerHTML=`
      ${u}
      ${r}
      <div class="adm-g__info">
        <h3 class="adm-g__name">${F(e.firstName)} ${F(e.lastName)}</h3>
        <div class="adm-g__meta">
          <span class="adm-g__city adm-g__city--${e.city}">${F(t)}</span>
          ${d}
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
      ${p}
      ${m}
      <div class="adm-g__creds is-hidden" id="creds-${e.id}">
        <h4>Identifiants de ${F(e.firstName)} ${F(e.lastName)}</h4>
        <div class="adm-g__creds-form">
          <div class="adm-g__creds-field">
            <label>Identifiant</label>
            <input type="text" value="${F(e.login||``)}" readonly />
          </div>
          <p class="adm-g__creds-note">Le mot de passe est chiffr&eacute; et n'est plus visible.<br/>Pour le r&eacute;initialiser : Supabase &rarr; Authentication &rarr; Users.</p>
        </div>
      </div>
    `,l.querySelector(`[data-open-creds="${e.id}"]`).addEventListener(`click`,()=>{document.getElementById(`creds-${e.id}`)?.classList.toggle(`is-hidden`)}),l.querySelector(`[data-delete-guide="${e.id}"]`).addEventListener(`click`,async()=>{if(!confirm(`Supprimer ${e.firstName} ${e.lastName} ?`))return;let{error:t}=await i.from(`guides`).delete().eq(`id`,e.id);if(t){alert(`Erreur lors de la suppression. Réessayez.`);return}f=f.filter(t=>t.id!==e.id),l.remove(),oe()}),l.querySelector(`[data-edit-guide="${e.id}"]`).addEventListener(`click`,()=>{ce(e.id)});let h=l.querySelector(`[data-toggle-bookings="${e.id}"]`);h&&h.addEventListener(`click`,()=>{document.getElementById(`bookings-${e.id}`)?.classList.toggle(`is-hidden`)}),l.querySelectorAll(`[data-toggle-bk-detail]`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.closest(`[data-bk-row]`);if(!t)return;let n=t.querySelector(`.adm-g__bk-detail`),r=e.querySelector(`.adm-g__bk-arrow`);if(n){let e=!n.classList.contains(`is-hidden`);n.classList.toggle(`is-hidden`),r&&(r.style.transform=e?``:`rotate(180deg)`)}})});let g=l.querySelector(`[data-toggle-refusal="${e.id}"]`);return g&&g.addEventListener(`click`,()=>{document.getElementById(`refusal-${e.id}`)?.classList.toggle(`is-hidden`)}),l.querySelectorAll(`[data-toggle-rcard]`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.closest(`[data-rcard]`);if(!t)return;let n=t.querySelector(`.adm-g__rcard-body`),r=e.querySelector(`.adm-g__rcard-arrow`);if(n){let e=!n.classList.contains(`is-hidden`);n.classList.toggle(`is-hidden`),r&&(r.style.transform=e?``:`rotate(180deg)`)}})}),l.querySelectorAll(`.adm-cal`).forEach(e=>{let t=e.querySelector(`[data-cal-nav]`);if(!t)return;let n=t.dataset.guideId;ie(e,n,parseInt(t.dataset.month),parseInt(t.dataset.year));let r=e.querySelector(`[data-cal-prev]`),i=e.querySelector(`[data-cal-next]`);r&&r.addEventListener(`click`,()=>{let r=parseInt(t.dataset.month),i=parseInt(t.dataset.year);r--,r<0&&(r=11,i--),ie(e,n,r,i)}),i&&i.addEventListener(`click`,()=>{let r=parseInt(t.dataset.month),i=parseInt(t.dataset.year);r++,r>11&&(r=0,i++),ie(e,n,r,i)})}),l.querySelectorAll(`[data-toggle-ref-detail]`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.closest(`[data-ref-row]`);if(!t)return;let n=t.querySelector(`.adm-g__ref-detail`),r=e.querySelector(`.adm-g__ref-arrow`);if(n){let e=!n.classList.contains(`is-hidden`);n.classList.toggle(`is-hidden`),r&&(r.style.transform=e?``:`rotate(180deg)`)}})}),l.querySelectorAll(`.adm-g__rcard-radio`).forEach(e=>{e.addEventListener(`click`,e=>{e.stopPropagation()})}),l.querySelectorAll(`[data-confirm-refusal]`).forEach(t=>{t.addEventListener(`click`,async()=>{let n=t,r=n.dataset.bookingId,a=n.dataset.radioName,o=l.querySelector(`input[name="${a}"]:checked`),s=o?o.value:null,c=P().find(e=>e.id===r);if(!c)return;n.disabled=!0;let{error:u}=await i.from(`bookings`).update({status:`reassigned`}).eq(`id`,r);if(u){n.disabled=!1,alert(`Une erreur est survenue. Réessayez.`);return}if(s){let t=N().find(t=>t.id===e.id),{error:n}=await i.from(`bookings`).insert({guide_id:s,date:c.date,slot:c.slot||null,activity_slug:c.activitySlug||null,activity_name:c.activityName||null,client_name:c.clientName||null,client_email:c.clientEmail||null,client_phone:c.clientPhone||null,status:`confirmed`,replacement_of:t?`${t.firstName} ${t.lastName}`:null});n&&alert(`Le refus a été confirmé, mais la réassignation a échoué (date déjà prise ?).`)}await y(),ae()})}),l}function oe(){let e=document.querySelector(`.adm-top__sub`);if(e){let t=N().length;e.textContent=`${t} guide${t===1?``:`s`} enregistre${t===1?``:`s`}`}}var L=null,se=document.getElementById(`modal-title`),R=document.getElementById(`add-guide-form`);function ce(e){let t=N().find(t=>t.id===e);if(!t)return;L=e,se.textContent=`Modifier le guide`,R.querySelector(`[name="prenom"]`).value=t.firstName||``,R.querySelector(`[name="nom"]`).value=t.lastName||``,R.querySelector(`[name="ville"]`).value=t.city||``,R.querySelector(`[name="gender"]`).value=t.gender||`homme`,R.querySelector(`[name="prix"]`).value=t.pricePerDay?String(t.pricePerDay):``,R.querySelector(`[name="service_prix"]`).value=t.servicePrice?String(t.servicePrice):``,R.querySelector(`[name="supplement_prix"]`).value=t.supplement710?String(t.supplement710):``,R.querySelector(`[name="diplome"]`).value=t.diploma||``,R.querySelector(`[name="langues"]`).value=(t.languages||[]).join(`, `),R.querySelector(`[name="description"]`).value=t.description||``,R.querySelectorAll(`[name="services"]`).forEach(e=>{e.checked=(t.services||[]).includes(e.value)});let n=R.querySelector(`[name="identifiant"]`),r=R.querySelector(`[name="mdp"]`);n.value=t.login||``,n.disabled=!0,r.value=``,r.placeholder=`Non modifiable ici`,r.disabled=!0,t.photo?(O.style.backgroundImage=`url(${t.photo})`,A(`result`)):A(`empty`),x.classList.remove(`is-hidden`)}function z(){L=null,se.textContent=`Ajouter un guide`,R.reset();let e=R.querySelector(`[name="identifiant"]`),t=R.querySelector(`[name="mdp"]`);e.disabled=!1,t.disabled=!1,t.placeholder=`mot de passe (6 caractères min.)`,A(`empty`),O.style.backgroundImage=``}document.getElementById(`open-add-guide`).addEventListener(`click`,()=>{z(),x.classList.remove(`is-hidden`)}),document.getElementById(`close-modal`).addEventListener(`click`,()=>{x.classList.add(`is-hidden`),z()}),document.getElementById(`cancel-modal`).addEventListener(`click`,()=>{x.classList.add(`is-hidden`),z()}),x.addEventListener(`click`,e=>{e.target===x&&(x.classList.add(`is-hidden`),z())}),R.addEventListener(`submit`,async e=>{e.preventDefault();let t=R,n=t.querySelector(`[name="prenom"]`).value.trim(),r=t.querySelector(`[name="nom"]`).value.trim(),o=t.querySelector(`[name="ville"]`).value,s=t.querySelector(`[name="gender"]`).value,u=t.querySelector(`[name="prix"]`).value,d=t.querySelector(`[name="service_prix"]`).value,p=t.querySelector(`[name="supplement_prix"]`).value,m=t.querySelector(`[name="diplome"]`).value.trim(),h=t.querySelector(`[name="langues"]`).value.trim(),g=t.querySelector(`[name="description"]`).value.trim(),_=t.querySelector(`[name="identifiant"]`).value.trim().toLowerCase(),v=t.querySelector(`[name="mdp"]`).value;if(!n||!r)return;let y=t.querySelector(`.adm-modal__submit`);y.disabled=!0,y.textContent=`Enregistrement...`;let b=()=>{y.disabled=!1,y.textContent=`Enregistrer`},S=O.style.backgroundImage.match(/url\("?([^"]*)"?\)/),C=S?S[1]:``,ee=Array.from(t.querySelectorAll(`[name="services"]:checked`)).map(e=>e.value),w={first_name:n,last_name:r,city:o||`medina`,gender:s||`homme`,diploma:m||null,description:g||null,languages:h?h.split(`,`).map(e=>e.trim()).filter(Boolean):[],price_per_day:u?parseInt(u):0,service_price:d?parseInt(d):0,supplement_7_10:p?parseInt(p):0,services:ee};if(L){let e=N().find(e=>e.id===L);if(!e){b();return}!C&&e.photo&&(C=e.photo);let{data:t,error:n}=await i.from(`guides`).update({...w,photo:C||null}).eq(`id`,L).select().single();if(b(),n||!t){alert(`Erreur lors de la mise à jour. Réessayez.`);return}let r=c(t),a=f.findIndex(e=>e.id===L);a!==-1&&(f[a]=r);let o=document.querySelector(`[data-guide-id="${L}"]`);if(o){let e=I(r);o.replaceWith(e),e.scrollIntoView({behavior:`smooth`,block:`center`})}}else{if(!_||!/^[a-z0-9._-]+$/.test(_)){b(),alert(`Identifiant invalide : lettres minuscules, chiffres, points, tirets uniquement (sans espaces ni accents).`);return}if(!v||v.length<6){b(),alert(`Le mot de passe doit contenir au moins 6 caractères.`);return}let{data:e,error:t}=await l.auth.signUp({email:_+a,password:v});if(t||!e.user){b(),alert(`Impossible de créer le compte du guide : ${t?.message||`erreur inconnue`}.\n(Identifiant déjà utilisé ?)`);return}let{data:n,error:r}=await i.from(`guides`).insert({...w,photo:C||null,login:_,auth_user_id:e.user.id}).select().single();if(b(),r||!n){alert(`Le compte a été créé mais l'enregistrement du guide a échoué. Réessayez.`);return}let o=c(n);f.push(o);let s=document.getElementById(`panel-guides`),u=I(o);s.appendChild(u),u.scrollIntoView({behavior:`smooth`,block:`center`})}oe(),x.classList.add(`is-hidden`),z()});var le=document.querySelectorAll(`[data-nav-tab]`),ue=document.getElementById(`panel-home`),de=document.getElementById(`panel-guides-header`),fe=document.getElementById(`panel-guides`),pe=document.getElementById(`panel-reviews`);le.forEach(e=>{e.addEventListener(`click`,t=>{t.preventDefault();let n=e.dataset.navTab;le.forEach(e=>e.classList.remove(`adm-side__link--active`)),e.classList.add(`adm-side__link--active`),ue.classList.add(`is-hidden`),de.classList.add(`is-hidden`),fe.classList.add(`is-hidden`),pe.classList.add(`is-hidden`),n===`home`?(ue.classList.remove(`is-hidden`),we()):n===`reviews`?(pe.classList.remove(`is-hidden`),$()):(de.classList.remove(`is-hidden`),fe.classList.remove(`is-hidden`))})});var B=[`Janvier`,`Février`,`Mars`,`Avril`,`Mai`,`Juin`,`Juillet`,`Août`,`Septembre`,`Octobre`,`Novembre`,`Décembre`];function V(e){return(Math.round(e)/100).toLocaleString(`fr-FR`,{minimumFractionDigits:0,maximumFractionDigits:2})+` €`}function H(e){return`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,`0`)}-${String(e.getDate()).padStart(2,`0`)}`}function U(e){let[t,n,r]=e.split(`-`).map(Number);return`${r} ${B[n-1].toLowerCase()} ${t}`}function me(){let e=[];return v.forEach(t=>{t.status===`paid`&&t.amount_paid&&e.push({date:(t.created_at||``).slice(0,10),amount:t.amount_paid})}),_.forEach(t=>{t.status===`paid`&&t.amount_paid&&e.push({date:(t.created_at||``).slice(0,10),amount:t.amount_paid})}),e}function he(){let e=me(),t=new Date,n=H(t),r=new Date(t),i=(t.getDay()+6)%7;r.setDate(t.getDate()-i);let a=H(r),o=`${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,`0`)}-01`,s=0,c=0,l=0,u=0;e.forEach(e=>{u+=e.amount,e.date===n&&(s+=e.amount),e.date>=a&&(c+=e.amount),e.date>=o&&(l+=e.amount)});let d=(e,t)=>{let n=document.getElementById(e);n&&(n.textContent=V(t))};d(`stat-today`,s),d(`stat-week`,c),d(`stat-month`,l),d(`stat-total`,u),ge()}var W=`day`;function ge(){let e=document.getElementById(`stat-breakdown`);if(!e)return;let t=me(),n={};t.forEach(e=>{if(!e.date)return;let[t,r,i]=e.date.split(`-`).map(Number),a=``,o=``,s=``;if(W===`day`)a=e.date,o=U(e.date),s=e.date;else if(W===`month`)a=`${t}-${String(r).padStart(2,`0`)}`,o=`${B[r-1]} ${t}`,s=a;else{let e=new Date(t,r-1,i),n=(e.getDay()+6)%7;e.setDate(e.getDate()-n);let c=H(e);a=c,o=`Semaine du ${U(c)}`,s=c}n[a]||(n[a]={label:o,sort:s,amount:0}),n[a].amount+=e.amount});let r=Object.values(n).sort((e,t)=>t.sort.localeCompare(e.sort));if(r.length===0){e.innerHTML=`<p class="adm-breakdown__empty">Aucun encaissement pour le moment.</p>`;return}e.innerHTML=r.map(e=>`
      <div class="adm-breakdown__row">
        <span class="adm-breakdown__label">${X(e.label)}</span>
        <span class="adm-breakdown__amount">${V(e.amount)}</span>
      </div>`).join(``)}document.querySelectorAll(`[data-stat-period]`).forEach(e=>{e.addEventListener(`click`,()=>{W=e.dataset.statPeriod,document.querySelectorAll(`[data-stat-period]`).forEach(e=>e.classList.remove(`adm-seg__btn--active`)),e.classList.add(`adm-seg__btn--active`),ge()})});var _e=`Le matin`,G={year:0,month:0,editing:!1},K=!1;function ve(){let e=new Set;return g.forEach(t=>e.add(t.date)),e}function ye(e){let t=g.find(t=>t.date===e);return t?t.id:null}function q(){let e=document.getElementById(`call-cal-month`),t=document.getElementById(`call-cal-grid`);if(!e||!t)return;if(!G.year){let e=new Date;G.year=e.getFullYear(),G.month=e.getMonth()}e.textContent=`${B[G.month]} ${G.year}`;let n=ve(),r=H(new Date);t.innerHTML=``;let i=(new Date(G.year,G.month,1).getDay()+6)%7,a=new Date(G.year,G.month+1,0).getDate();for(let e=0;e<i;e++){let e=document.createElement(`span`);e.className=`adm-callcal__cell adm-callcal__cell--empty`,t.appendChild(e)}for(let e=1;e<=a;e++){let i=`${G.year}-${String(G.month+1).padStart(2,`0`)}-${String(e).padStart(2,`0`)}`,a=n.has(i),o=i<r,s=document.createElement(`button`);s.type=`button`,s.className=`adm-callcal__cell`,s.innerHTML=`<span>${e}</span>`,a&&s.classList.add(`adm-callcal__cell--has`),o&&s.classList.add(`adm-callcal__cell--past`),G.editing&&!o?(s.classList.add(`adm-callcal__cell--edit`),s.addEventListener(`click`,()=>be(i))):s.disabled=!0,t.appendChild(s)}}async function be(e){if(K)return;K=!0;let t=ye(e);if(t){if(_.some(t=>t.status===`paid`&&t.slot_date===e)&&!confirm(`Ce jour a une réservation payée. Le fermer ne supprime pas la réservation. Continuer ?`)){K=!1;return}let{error:n}=await i.from(`call_slots`).delete().eq(`id`,t);n?alert(`Erreur. Réessayez.`):g=g.filter(e=>e.id!==t)}else{let{data:t,error:n}=await i.from(`call_slots`).insert({date:e,time:_e}).select().single();!n&&t?g.push(t):alert(`Erreur. Réessayez.`)}K=!1,q()}async function xe(){if(K)return;K=!0;let e=H(new Date),t=ve(),n=new Date(G.year,G.month+1,0).getDate(),r=[];for(let i=1;i<=n;i++){let n=`${G.year}-${String(G.month+1).padStart(2,`0`)}-${String(i).padStart(2,`0`)}`;n>=e&&!t.has(n)&&r.push({date:n,time:_e})}if(r.length){let{data:e,error:t}=await i.from(`call_slots`).insert(r).select();!t&&e?g.push(...e):alert(`Erreur. Réessayez.`)}K=!1,q()}async function Se(){if(K)return;let e=`${G.year}-${String(G.month+1).padStart(2,`0`)}-`,t=g.filter(t=>t.date.startsWith(e));if(t.length===0||_.some(t=>t.status===`paid`&&t.slot_date.startsWith(e))&&!confirm(`Certains jours ont des réservations payées. Les fermer ne supprime pas les réservations. Continuer ?`)||!confirm(`Fermer tous les jours de ce mois ?`))return;K=!0;let n=t.map(e=>e.id),{error:r}=await i.from(`call_slots`).delete().in(`id`,n);r?alert(`Erreur. Réessayez.`):g=g.filter(t=>!t.date.startsWith(e)),K=!1,q()}document.getElementById(`call-cal-selectall`)?.addEventListener(`click`,xe),document.getElementById(`call-cal-clearall`)?.addEventListener(`click`,Se),document.getElementById(`call-cal-prev`)?.addEventListener(`click`,()=>{G.month--,G.month<0&&(G.month=11,G.year--),q()}),document.getElementById(`call-cal-next`)?.addEventListener(`click`,()=>{G.month++,G.month>11&&(G.month=0,G.year++),q()});var J=!1;document.getElementById(`call-cal-show`)?.addEventListener(`click`,()=>{J=!J;let e=document.getElementById(`call-cal-show`),t=document.getElementById(`call-cal-edit`),n=document.getElementById(`call-cal-container`),r=document.getElementById(`call-cal-hint`),i=document.getElementById(`call-cal-monthactions`);J?(n.classList.remove(`is-hidden`),t.classList.remove(`is-hidden`),e.textContent=`Masquer`,q()):(G.editing=!1,n.classList.add(`is-hidden`),t.classList.add(`is-hidden`),t.textContent=`Modifier`,t.classList.remove(`adm-cal-toggle--on`),r?.classList.add(`is-hidden`),i?.classList.add(`is-hidden`),e.textContent=`Voir le calendrier`)}),document.getElementById(`call-cal-edit`)?.addEventListener(`click`,()=>{G.editing=!G.editing;let e=document.getElementById(`call-cal-edit`),t=document.getElementById(`call-cal-hint`),n=document.getElementById(`call-cal-monthactions`);e.textContent=G.editing?`Terminer`:`Modifier`,e.classList.toggle(`adm-cal-toggle--on`,G.editing),t&&(t.textContent=`Cliquez sur un jour pour l'ouvrir ou le fermer à la réservation (appel le matin).`,t.classList.toggle(`is-hidden`,!G.editing)),n?.classList.toggle(`is-hidden`,!G.editing),q()});function Ce(){let e=document.getElementById(`call-bookings-list`),t=document.getElementById(`call-bookings-count`);if(!e)return;let n=_.filter(e=>e.status===`paid`).sort((e,t)=>(t.slot_date+t.slot_time).localeCompare(e.slot_date+e.slot_time));if(t&&(t.textContent=n.length?String(n.length):``),n.length===0){e.innerHTML=`<p class="adm-callbookings__empty">Aucun appel réservé pour le moment.</p>`;return}e.innerHTML=n.map(e=>{let t=[[`Date de l'appel`,U(e.slot_date)],[`Heure`,e.slot_time||`—`],[`Nom & prénom`,e.name||`—`],[`Nombre de personnes`,e.group_size?String(e.group_size):`—`],[`Date d'arrivée`,e.arrival?U(e.arrival):`—`],[`Date de départ`,e.departure?U(e.departure):`—`],[`Téléphone`,e.phone||`—`],[`Email`,e.email||`—`],[`Billets d'avion`,e.has_tickets?`Oui, déjà réservés`:`Non, pas encore`],[`Montant payé`,e.amount_paid?V(e.amount_paid):`—`]].map(([e,t])=>`
        <div class="adm-cb__row"><span class="adm-cb__k">${X(e)}</span><span class="adm-cb__v">${X(t)}</span></div>`).join(``);return`
        <div class="adm-cb" data-cb>
          <button type="button" class="adm-cb__head" data-cb-toggle>
            <span class="adm-cb__title">${X(e.name||`Client`)}</span>
            <span class="adm-cb__meta">${X(U(e.slot_date))} · ${X(e.slot_time||``)}</span>
            <svg class="adm-cb__chevron" width="16" height="16" viewBox="0 0 20 20" fill="none"><path d="M5 8l5 5 5-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </button>
          <div class="adm-cb__body">${t}</div>
        </div>`}).join(``)}document.getElementById(`call-bookings-list`)?.addEventListener(`click`,e=>{let t=e.target.closest(`[data-cb-toggle]`);t&&t.parentElement?.classList.toggle(`adm-cb--open`)});function we(){he(),q(),Ce()}var Y=`pending`;function Te(){return m}async function Ee(e,t){let{error:n}=await i.from(`reviews`).update({status:t}).eq(`id`,e);if(n)return alert(`Erreur, réessayez.`),!1;let r=m.find(t=>t.id===e);return r&&(r.status=t),!0}function X(e){return e.replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`)}function Z(){let e=Te().filter(e=>e.status===`pending`),t=document.getElementById(`pending-count`);t&&(t.textContent=String(e.length),t.hidden=e.length===0)}function Q(){let e=P().filter(e=>e.status===`pending-refusal`),t=document.getElementById(`refusal-count`);t&&(t.textContent=String(e.length),t.hidden=e.length===0)}function $(){let e=Te(),t=e.filter(e=>e.status===`pending`),n=e.filter(e=>e.status===`approved`),r=e.filter(e=>e.status===`rejected`),a=document.getElementById(`reviews-sub`);a&&(a.textContent=`${e.length} avis au total — ${t.length} en attente`);let o=document.getElementById(`rtab-pending-count`),s=document.getElementById(`rtab-approved-count`),c=document.getElementById(`rtab-rejected-count`);o&&(o.textContent=t.length>0?`(${t.length})`:``),s&&(s.textContent=n.length>0?`(${n.length})`:``),c&&(c.textContent=r.length>0?`(${r.length})`:``);let l=Y===`pending`?t:Y===`approved`?n:r,u=document.getElementById(`reviews-list`);if(u){if(l.length===0){u.innerHTML=`<div class="adm-reviews__empty">Aucun avis ${Y===`pending`?`en attente`:Y===`approved`?`approuvé`:`refusé`}.</div>`;return}u.innerHTML=l.map(e=>{let t=`★`.repeat(e.stars||5)+`☆`.repeat(5-(e.stars||5)),n=e.date?new Date(e.date).toLocaleDateString(`fr-FR`,{day:`numeric`,month:`long`,year:`numeric`}):``,r=``;return r=e.status===`pending`?`
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
            <p class="adm-rv__text">${X(e.text)}</p>
            <div class="adm-rv__meta">
              <span class="adm-rv__name">${X(e.name)}</span>
              <span class="adm-rv__sep">·</span>
              <span class="adm-rv__service">${X(e.service)}</span>
              ${n?`<span class="adm-rv__sep">·</span><span class="adm-rv__date">${n}</span>`:``}
            </div>
          </div>
          <div class="adm-rv__actions">${r}</div>
        </div>
      `}).join(``),u.querySelectorAll(`[data-rv-approve]`).forEach(e=>{e.addEventListener(`click`,async()=>{let t=e.dataset.rvApprove;await Ee(t,`approved`)&&($(),Z())})}),u.querySelectorAll(`[data-rv-reject]`).forEach(e=>{e.addEventListener(`click`,async()=>{let t=e.dataset.rvReject;await Ee(t,`rejected`)&&($(),Z())})}),u.querySelectorAll(`[data-rv-delete]`).forEach(e=>{e.addEventListener(`click`,async()=>{let t=e.dataset.rvDelete,{error:n}=await i.from(`reviews`).delete().eq(`id`,t);if(n){alert(`Erreur, réessayez.`);return}m=m.filter(e=>e.id!==t),$(),Z()})})}}document.querySelectorAll(`[data-rtab]`).forEach(e=>{e.addEventListener(`click`,()=>{Y=e.dataset.rtab,document.querySelectorAll(`[data-rtab]`).forEach(e=>e.classList.remove(`adm-reviews__tab--active`)),e.classList.add(`adm-reviews__tab--active`),$()})}),Z(),Q();
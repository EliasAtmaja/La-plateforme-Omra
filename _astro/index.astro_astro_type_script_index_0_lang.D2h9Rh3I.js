import{a as e,c as t,d as n,i as r,l as i,n as a,o,r as s,s as c}from"./supabase.D_JG6q5l.js";var l=n(r,s,{auth:{persistSession:!1,autoRefreshToken:!1}}),u=document.getElementById(`login-gate`),d=document.getElementById(`dashboard`),f=[],p=[],m=[],h={};async function g(){let[e,n,r,a]=await Promise.all([i.from(`guides`).select(`*`).order(`created_at`),i.from(`bookings`).select(`*`).order(`date`),i.from(`reviews`).select(`*`).order(`created_at`,{ascending:!1}),i.from(`availability`).select(`guide_id, date`)]);f=(e.data||[]).map(c),p=(n.data||[]).map(o),m=(r.data||[]).map(t),h={},(a.data||[]).forEach(e=>{(h[e.guide_id]=h[e.guide_id]||[]).push(e.date)})}async function _(){await g(),u.classList.add(`is-hidden`),d.classList.remove(`is-hidden`),L(),Z(),Q()}(async()=>{await e()&&await _()})(),document.getElementById(`login-form`).addEventListener(`submit`,async t=>{t.preventDefault();let n=document.getElementById(`login-email`).value.trim(),r=document.getElementById(`login-pass`).value,a=document.getElementById(`login-error`);a.classList.add(`is-hidden`);let{error:o}=await i.auth.signInWithPassword({email:n,password:r});if(o||!await e()){await i.auth.signOut(),a.classList.remove(`is-hidden`);return}await _()}),document.getElementById(`logout-btn`).addEventListener(`click`,async()=>{await i.auth.signOut(),u.classList.remove(`is-hidden`),d.classList.add(`is-hidden`)});var v=document.getElementById(`modal-overlay`),y=document.getElementById(`photo-input`),b=document.getElementById(`photo-empty`),x=document.getElementById(`photo-editor`),S=document.getElementById(`photo-result`),C=document.getElementById(`photo-crop-img`),w=document.getElementById(`photo-crop`),T=document.getElementById(`photo-zoom`),E=document.getElementById(`photo-result-circle`),D={x:0,y:0,scale:1,dragging:!1,startX:0,startY:0,origX:0,origY:0,imgSrc:``};function O(e){b.classList.toggle(`is-hidden`,e!==`empty`),x.classList.toggle(`is-hidden`,e!==`editor`),S.classList.toggle(`is-hidden`,e!==`result`)}function k(){C.style.transform=`translate(${D.x}px, ${D.y}px) scale(${D.scale})`}function A(){let e=C.naturalWidth*D.scale,t=C.naturalHeight*D.scale,n=160-e,r=160-t;D.x=Math.min(0,Math.max(n,D.x)),D.y=Math.min(0,Math.max(r,D.y))}document.getElementById(`photo-btn`).addEventListener(`click`,()=>y.click()),document.getElementById(`photo-placeholder`).addEventListener(`click`,()=>y.click()),document.getElementById(`photo-change-btn`).addEventListener(`click`,()=>y.click()),y.addEventListener(`change`,()=>{let e=y.files?.[0];if(!e)return;let t=new FileReader;t.onload=e=>{D.imgSrc=e.target?.result,C.src=D.imgSrc,C.onload=()=>{D.scale=160/Math.min(C.naturalWidth,C.naturalHeight),D.x=(160-C.naturalWidth*D.scale)/2,D.y=(160-C.naturalHeight*D.scale)/2,T.min=String(Math.round(D.scale*100)),T.max=String(Math.round(D.scale*100*3)),T.value=String(Math.round(D.scale*100)),k(),O(`editor`)}},t.readAsDataURL(e)}),w.addEventListener(`mousedown`,e=>{e.preventDefault(),D.dragging=!0,D.startX=e.clientX,D.startY=e.clientY,D.origX=D.x,D.origY=D.y,w.style.cursor=`grabbing`}),window.addEventListener(`mousemove`,e=>{D.dragging&&(D.x=D.origX+(e.clientX-D.startX),D.y=D.origY+(e.clientY-D.startY),A(),k())}),window.addEventListener(`mouseup`,()=>{D.dragging=!1,w.style.cursor=`grab`}),w.addEventListener(`touchstart`,e=>{e.touches.length===1&&(D.dragging=!0,D.startX=e.touches[0].clientX,D.startY=e.touches[0].clientY,D.origX=D.x,D.origY=D.y)},{passive:!0}),window.addEventListener(`touchmove`,e=>{!D.dragging||e.touches.length!==1||(D.x=D.origX+(e.touches[0].clientX-D.startX),D.y=D.origY+(e.touches[0].clientY-D.startY),A(),k())},{passive:!0}),window.addEventListener(`touchend`,()=>{D.dragging=!1}),T.addEventListener(`input`,()=>{let e=D.scale;D.scale=parseInt(T.value)/100;let t=D.scale/e;D.x=80-(80-D.x)*t,D.y=80-(80-D.y)*t,A(),k()}),w.addEventListener(`wheel`,e=>{e.preventDefault();let t=parseInt(T.min)/100,n=parseInt(T.max)/100,r=e.deltaY>0?-.05:.05,i=D.scale;D.scale=Math.min(n,Math.max(t,D.scale+r));let a=D.scale/i;D.x=80-(80-D.x)*a,D.y=80-(80-D.y)*a,A(),T.value=String(Math.round(D.scale*100)),k()},{passive:!1}),document.getElementById(`photo-crop-cancel`).addEventListener(`click`,()=>{O(`empty`),y.value=``}),document.getElementById(`photo-crop-confirm`).addEventListener(`click`,()=>{let e=document.createElement(`canvas`);e.width=320,e.height=320,e.getContext(`2d`).drawImage(C,D.x*2,D.y*2,C.naturalWidth*D.scale*2,C.naturalHeight*D.scale*2);let t=e.toDataURL(`image/jpeg`,.9);E.style.backgroundImage=`url(${t})`,O(`result`)});function j(){return f}function M(){return p}function N(e){return h[e]||[]}function P(e){return e.replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`)}var F=[`Janvier`,`Février`,`Mars`,`Avril`,`Mai`,`Juin`,`Juillet`,`Août`,`Septembre`,`Octobre`,`Novembre`,`Décembre`],ee=[`Lu`,`Ma`,`Me`,`Je`,`Ve`,`Sa`,`Di`];function I(e,t,n,r){let i=new Set(N(t)),a=new Set(M().filter(e=>e.guideId===t&&e.status!==`reassigned`).map(e=>e.date)),o=new Date(r,n,1).getDay(),s=o===0?6:o-1,c=new Date(r,n+1,0).getDate(),l=new Date,u=ee.map(e=>`<span class="adm-cal__day-label">${e}</span>`).join(``);for(let e=0;e<s;e++)u+=`<span class="adm-cal__empty"></span>`;for(let e=1;e<=c;e++){let t=`${r}-${String(n+1).padStart(2,`0`)}-${String(e).padStart(2,`0`)}`,o=a.has(t),s=i.has(t),c=new Date(r,n,e)<new Date(l.getFullYear(),l.getMonth(),l.getDate()),d=`adm-cal__day`;c?d+=` adm-cal__day--past`:o?d+=` adm-cal__day--booked`:s?d+=` adm-cal__day--avail`:d+=` adm-cal__day--busy`,u+=`<span class="${d}">${e}</span>`}let d=e.querySelector(`.adm-cal__grid`),f=e.querySelector(`.adm-cal__title`);d&&(d.innerHTML=u),f&&(f.textContent=`${F[n]} ${r}`);let p=e.querySelector(`[data-cal-nav]`);p&&(p.dataset.month=n.toString(),p.dataset.year=r.toString())}function L(){let e=document.getElementById(`panel-guides`);e.innerHTML=``,j().forEach(t=>e.appendChild(R(t))),z(),Q()}function R(e){let t=e.city===`medina`?`Medine`:`La Mecque`,n=(e.firstName?.[0]||``)+(e.lastName?.[0]||``),r=e.photo?`<div class="adm-g__avatar adm-g__avatar--photo" style="background-image:url(${e.photo})"></div>`:`<div class="adm-g__avatar adm-g__avatar--${e.city}">${P(n)}</div>`,a=M().filter(t=>t.guideId===e.id&&t.status!==`reassigned`),o=a.filter(e=>e.status===`pending-refusal`),s=o.length>0,c=a.length>0,l=document.createElement(`div`);l.className=`adm-g`,l.dataset.guideId=e.id;let u=``;u=s?`<div class="adm-g__notif">
        <button class="adm-g__dot adm-g__dot--red" data-toggle-refusal="${e.id}" title="Mission refusee — cliquez pour voir le motif">
          <span class="adm-g__dot-pulse"></span>
        </button>
      </div>`:`<div class="adm-g__notif">
        <span class="adm-g__dot adm-g__dot--green" title="Aucun probleme"></span>
      </div>`;let d=``;d=c?`<button class="adm-g__booking-btn" data-toggle-bookings="${e.id}">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><rect x="1" y="2" width="10" height="9" rx="1.5" stroke="currentColor" stroke-width="1.1"/><path d="M3.5 1v2M8.5 1v2M1 5h10" stroke="currentColor" stroke-width="1.1" stroke-linecap="round"/></svg>
        Reservations
        <span class="adm-g__booking-count">${a.length}</span>
      </button>`:`<span class="adm-g__status adm-g__status--free">Libre</span>`;let p=``;if(c){let t=a.map(e=>{let t=e.date?new Date(e.date+`T00:00:00`).toLocaleDateString(`fr-FR`,{day:`numeric`,month:`long`,year:`numeric`}):e.dates||``,n=e.status===`pending-refusal`?`<span class="adm-g__bk-status adm-g__bk-status--refused">Refus en attente</span>`:e.replacementOf?`<span class="adm-g__bk-status adm-g__bk-status--replaced">En remplacement de ${P(e.replacementOf)}</span>`:``;return`
          <div class="adm-g__bk-row" data-bk-row>
            <button class="adm-g__bk-summary" data-toggle-bk-detail>
              <div class="adm-g__bk-summary-left">
                <span class="adm-g__bk-client">${P(e.clientName||e.client||`Client`)}</span>
                <span class="adm-g__bk-dates">${P(t)}${e.slot?` &middot; `+P(e.slot):``}</span>
                ${e.seen?`<span class="adm-g__bk-status adm-g__bk-status--seen">✓ Vu par le guide</span>`:`<span class="adm-g__bk-status adm-g__bk-status--unseen">Non vu</span>`}
                ${e.activityName?`<span class="adm-g__bk-status adm-g__bk-status--activity">${P(e.activityName)}</span>`:``}
                ${n}
              </div>
              <svg class="adm-g__bk-arrow" width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M4 5.5L7 8.5L10 5.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </button>
            <div class="adm-g__bk-detail is-hidden">
              <div class="adm-g__bk-detail-grid">
                <div class="adm-g__bk-detail-item">
                  <span class="adm-g__bk-label">T&eacute;l&eacute;phone</span>
                  <span class="adm-g__bk-value">${P(e.clientPhone||`Non renseigne`)}</span>
                </div>
                <div class="adm-g__bk-detail-item">
                  <span class="adm-g__bk-label">Email</span>
                  <span class="adm-g__bk-value">${P(e.clientEmail||`Non renseigne`)}</span>
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
      `}let m=``;if(s){let t=j().filter(t=>t.id!==e.id&&t.city===e.city&&(t.pricePerDay||0)<=(e.pricePerDay||0)),n=new Date,r=n.getMonth(),i=n.getFullYear(),a=o.map((n,a)=>{let o=n.date?new Date(n.date+`T00:00:00`).toLocaleDateString(`fr-FR`,{day:`numeric`,month:`long`,year:`numeric`}):``,s=n.refusalReason||``,c=`replace-${e.id}-${n.id}`,l=n.activitySlug?t.filter(e=>(e.services||[]).includes(n.activitySlug)):t,u=``;return u=l.length>0?l.map(e=>{let t=(e.firstName?.[0]||``)+(e.lastName?.[0]||``),a=(e.languages||[]).join(`, `),o=new Set(N(e.id)),s=new Set(M().filter(t=>t.guideId===e.id&&t.status!==`reassigned`).map(e=>e.date)),l=!n.date||o.has(n.date)&&!s.has(n.date);return`
              <div class="adm-g__rcard ${l?``:`adm-g__rcard--unavailable`}" data-rcard data-rcard-guide-id="${e.id}">
                <div class="adm-g__rcard-header" data-toggle-rcard>
                  <input type="radio" name="${c}" value="${e.id}" class="adm-g__rcard-radio" ${l?``:`disabled`} />
                  ${e.photo?`<div class="adm-g__replace-av adm-g__replace-av--photo" style="background-image:url(${e.photo})"></div>`:`<div class="adm-g__replace-av adm-g__replace-av--${e.city}">${P(t)}</div>`}
                  <div class="adm-g__rcard-info">
                    <span class="adm-g__replace-name">${P(e.firstName)} ${P(e.lastName)}</span>
                    <span class="adm-g__replace-info">${e.pricePerDay?e.pricePerDay+`€`:``} ${a?`— `+P(a):``}
                      ${l?`<span class="adm-g__rcard-avail">Disponible</span>`:`<span class="adm-g__rcard-unavail">Indisponible a cette date</span>`}
                    </span>
                  </div>
                  <svg class="adm-g__rcard-arrow" width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M4 5.5L7 8.5L10 5.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                </div>
                <div class="adm-g__rcard-body is-hidden">
                  <div class="adm-g__rcard-profile">
                    ${e.diploma?`<div class="adm-g__rcard-detail"><span class="adm-g__rcard-label">Expertise</span><span class="adm-g__rcard-value">${P(e.diploma)}</span></div>`:``}
                    <a href="/guides/profil/?id=${e.id}" class="adm-g__rcard-profile-link">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M1 6s2-4 5-4 5 4 5 4-2 4-5 4-5-4-5-4z" stroke="currentColor" stroke-width="1.1"/><circle cx="6" cy="6" r="1.5" stroke="currentColor" stroke-width="1.1"/></svg>
                      Voir le profil complet
                    </a>
                  </div>
                  <div class="adm-cal">
                    <div class="adm-cal__header">
                      <span class="adm-cal__title">${F[r]} ${i}</span>
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
                <span class="adm-g__ref-date">${P(o)}</span>
                <span class="adm-g__ref-client">${P(n.clientName||`Client non renseigne`)}</span>
              </div>
              <svg class="adm-g__ref-arrow" width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M4 5.5L7 8.5L10 5.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </button>
            <div class="adm-g__ref-detail is-hidden">
              <div class="adm-g__ref-reason">
                <span class="adm-g__ref-reason-label">Motif du refus :</span>
                <blockquote class="adm-g__refusal-msg">"${P(s)}"</blockquote>
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
        <h3 class="adm-g__name">${P(e.firstName)} ${P(e.lastName)}</h3>
        <div class="adm-g__meta">
          <span class="adm-g__city adm-g__city--${e.city}">${P(t)}</span>
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
        <h4>Identifiants de ${P(e.firstName)} ${P(e.lastName)}</h4>
        <div class="adm-g__creds-form">
          <div class="adm-g__creds-field">
            <label>Identifiant</label>
            <input type="text" value="${P(e.login||``)}" readonly />
          </div>
          <p class="adm-g__creds-note">Le mot de passe est chiffr&eacute; et n'est plus visible.<br/>Pour le r&eacute;initialiser : Supabase &rarr; Authentication &rarr; Users.</p>
        </div>
      </div>
    `,l.querySelector(`[data-open-creds="${e.id}"]`).addEventListener(`click`,()=>{document.getElementById(`creds-${e.id}`)?.classList.toggle(`is-hidden`)}),l.querySelector(`[data-delete-guide="${e.id}"]`).addEventListener(`click`,async()=>{if(!confirm(`Supprimer ${e.firstName} ${e.lastName} ?`))return;let{error:t}=await i.from(`guides`).delete().eq(`id`,e.id);if(t){alert(`Erreur lors de la suppression. Réessayez.`);return}f=f.filter(t=>t.id!==e.id),l.remove(),z()}),l.querySelector(`[data-edit-guide="${e.id}"]`).addEventListener(`click`,()=>{te(e.id)});let h=l.querySelector(`[data-toggle-bookings="${e.id}"]`);h&&h.addEventListener(`click`,()=>{document.getElementById(`bookings-${e.id}`)?.classList.toggle(`is-hidden`)}),l.querySelectorAll(`[data-toggle-bk-detail]`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.closest(`[data-bk-row]`);if(!t)return;let n=t.querySelector(`.adm-g__bk-detail`),r=e.querySelector(`.adm-g__bk-arrow`);if(n){let e=!n.classList.contains(`is-hidden`);n.classList.toggle(`is-hidden`),r&&(r.style.transform=e?``:`rotate(180deg)`)}})});let _=l.querySelector(`[data-toggle-refusal="${e.id}"]`);return _&&_.addEventListener(`click`,()=>{document.getElementById(`refusal-${e.id}`)?.classList.toggle(`is-hidden`)}),l.querySelectorAll(`[data-toggle-rcard]`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.closest(`[data-rcard]`);if(!t)return;let n=t.querySelector(`.adm-g__rcard-body`),r=e.querySelector(`.adm-g__rcard-arrow`);if(n){let e=!n.classList.contains(`is-hidden`);n.classList.toggle(`is-hidden`),r&&(r.style.transform=e?``:`rotate(180deg)`)}})}),l.querySelectorAll(`.adm-cal`).forEach(e=>{let t=e.querySelector(`[data-cal-nav]`);if(!t)return;let n=t.dataset.guideId;I(e,n,parseInt(t.dataset.month),parseInt(t.dataset.year));let r=e.querySelector(`[data-cal-prev]`),i=e.querySelector(`[data-cal-next]`);r&&r.addEventListener(`click`,()=>{let r=parseInt(t.dataset.month),i=parseInt(t.dataset.year);r--,r<0&&(r=11,i--),I(e,n,r,i)}),i&&i.addEventListener(`click`,()=>{let r=parseInt(t.dataset.month),i=parseInt(t.dataset.year);r++,r>11&&(r=0,i++),I(e,n,r,i)})}),l.querySelectorAll(`[data-toggle-ref-detail]`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.closest(`[data-ref-row]`);if(!t)return;let n=t.querySelector(`.adm-g__ref-detail`),r=e.querySelector(`.adm-g__ref-arrow`);if(n){let e=!n.classList.contains(`is-hidden`);n.classList.toggle(`is-hidden`),r&&(r.style.transform=e?``:`rotate(180deg)`)}})}),l.querySelectorAll(`.adm-g__rcard-radio`).forEach(e=>{e.addEventListener(`click`,e=>{e.stopPropagation()})}),l.querySelectorAll(`[data-confirm-refusal]`).forEach(t=>{t.addEventListener(`click`,async()=>{let n=t,r=n.dataset.bookingId,a=n.dataset.radioName,o=l.querySelector(`input[name="${a}"]:checked`),s=o?o.value:null,c=M().find(e=>e.id===r);if(!c)return;n.disabled=!0;let{error:u}=await i.from(`bookings`).update({status:`reassigned`}).eq(`id`,r);if(u){n.disabled=!1,alert(`Une erreur est survenue. Réessayez.`);return}if(s){let t=j().find(t=>t.id===e.id),{error:n}=await i.from(`bookings`).insert({guide_id:s,date:c.date,slot:c.slot||null,activity_slug:c.activitySlug||null,activity_name:c.activityName||null,client_name:c.clientName||null,client_email:c.clientEmail||null,client_phone:c.clientPhone||null,status:`confirmed`,replacement_of:t?`${t.firstName} ${t.lastName}`:null});n&&alert(`Le refus a été confirmé, mais la réassignation a échoué (date déjà prise ?).`)}await g(),L()})}),l}function z(){let e=document.querySelector(`.adm-top__sub`);if(e){let t=j().length;e.textContent=`${t} guide${t===1?``:`s`} enregistre${t===1?``:`s`}`}}var B=null,V=document.getElementById(`modal-title`),H=document.getElementById(`add-guide-form`);function te(e){let t=j().find(t=>t.id===e);if(!t)return;B=e,V.textContent=`Modifier le guide`,H.querySelector(`[name="prenom"]`).value=t.firstName||``,H.querySelector(`[name="nom"]`).value=t.lastName||``,H.querySelector(`[name="ville"]`).value=t.city||``,H.querySelector(`[name="gender"]`).value=t.gender||`homme`,H.querySelector(`[name="prix"]`).value=t.pricePerDay?String(t.pricePerDay):``,H.querySelector(`[name="diplome"]`).value=t.diploma||``,H.querySelector(`[name="langues"]`).value=(t.languages||[]).join(`, `),H.querySelector(`[name="description"]`).value=t.description||``,H.querySelectorAll(`[name="services"]`).forEach(e=>{e.checked=(t.services||[]).includes(e.value)});let n=H.querySelector(`[name="identifiant"]`),r=H.querySelector(`[name="mdp"]`);n.value=t.login||``,n.disabled=!0,r.value=``,r.placeholder=`Non modifiable ici`,r.disabled=!0,t.photo?(E.style.backgroundImage=`url(${t.photo})`,O(`result`)):O(`empty`),v.classList.remove(`is-hidden`)}function U(){B=null,V.textContent=`Ajouter un guide`,H.reset();let e=H.querySelector(`[name="identifiant"]`),t=H.querySelector(`[name="mdp"]`);e.disabled=!1,t.disabled=!1,t.placeholder=`mot de passe (6 caractères min.)`,O(`empty`),E.style.backgroundImage=``}document.getElementById(`open-add-guide`).addEventListener(`click`,()=>{U(),v.classList.remove(`is-hidden`)}),document.getElementById(`close-modal`).addEventListener(`click`,()=>{v.classList.add(`is-hidden`),U()}),document.getElementById(`cancel-modal`).addEventListener(`click`,()=>{v.classList.add(`is-hidden`),U()}),v.addEventListener(`click`,e=>{e.target===v&&(v.classList.add(`is-hidden`),U())}),H.addEventListener(`submit`,async e=>{e.preventDefault();let t=H,n=t.querySelector(`[name="prenom"]`).value.trim(),r=t.querySelector(`[name="nom"]`).value.trim(),o=t.querySelector(`[name="ville"]`).value,s=t.querySelector(`[name="gender"]`).value,u=t.querySelector(`[name="prix"]`).value,d=t.querySelector(`[name="diplome"]`).value.trim(),p=t.querySelector(`[name="langues"]`).value.trim(),m=t.querySelector(`[name="description"]`).value.trim(),h=t.querySelector(`[name="identifiant"]`).value.trim().toLowerCase(),g=t.querySelector(`[name="mdp"]`).value;if(!n||!r)return;let _=t.querySelector(`.adm-modal__submit`);_.disabled=!0,_.textContent=`Enregistrement...`;let y=()=>{_.disabled=!1,_.textContent=`Enregistrer`},b=E.style.backgroundImage.match(/url\("?([^"]*)"?\)/),x=b?b[1]:``,S=Array.from(t.querySelectorAll(`[name="services"]:checked`)).map(e=>e.value),C={first_name:n,last_name:r,city:o||`medina`,gender:s||`homme`,diploma:d||null,description:m||null,languages:p?p.split(`,`).map(e=>e.trim()).filter(Boolean):[],price_per_day:u?parseInt(u):0,services:S};if(B){let e=j().find(e=>e.id===B);if(!e){y();return}!x&&e.photo&&(x=e.photo);let{data:t,error:n}=await i.from(`guides`).update({...C,photo:x||null}).eq(`id`,B).select().single();if(y(),n||!t){alert(`Erreur lors de la mise à jour. Réessayez.`);return}let r=c(t),a=f.findIndex(e=>e.id===B);a!==-1&&(f[a]=r);let o=document.querySelector(`[data-guide-id="${B}"]`);if(o){let e=R(r);o.replaceWith(e),e.scrollIntoView({behavior:`smooth`,block:`center`})}}else{if(!h||!/^[a-z0-9._-]+$/.test(h)){y(),alert(`Identifiant invalide : lettres minuscules, chiffres, points, tirets uniquement (sans espaces ni accents).`);return}if(!g||g.length<6){y(),alert(`Le mot de passe doit contenir au moins 6 caractères.`);return}let{data:e,error:t}=await l.auth.signUp({email:h+a,password:g});if(t||!e.user){y(),alert(`Impossible de créer le compte du guide : ${t?.message||`erreur inconnue`}.\n(Identifiant déjà utilisé ?)`);return}let{data:n,error:r}=await i.from(`guides`).insert({...C,photo:x||null,login:h,auth_user_id:e.user.id}).select().single();if(y(),r||!n){alert(`Le compte a été créé mais l'enregistrement du guide a échoué. Réessayez.`);return}let o=c(n);f.push(o);let s=document.getElementById(`panel-guides`),u=R(o);s.appendChild(u),u.scrollIntoView({behavior:`smooth`,block:`center`})}z(),v.classList.add(`is-hidden`),U()});var W=document.querySelectorAll(`[data-nav-tab]`),G=document.getElementById(`panel-guides-header`),K=document.getElementById(`panel-guides`),q=document.getElementById(`panel-reviews`);W.forEach(e=>{e.addEventListener(`click`,t=>{t.preventDefault();let n=e.dataset.navTab;W.forEach(e=>e.classList.remove(`adm-side__link--active`)),e.classList.add(`adm-side__link--active`),n===`reviews`?(G.classList.add(`is-hidden`),K.classList.add(`is-hidden`),q.classList.remove(`is-hidden`),$()):(G.classList.remove(`is-hidden`),K.classList.remove(`is-hidden`),q.classList.add(`is-hidden`))})});var J=`pending`;function Y(){return m}async function ne(e,t){let{error:n}=await i.from(`reviews`).update({status:t}).eq(`id`,e);if(n)return alert(`Erreur, réessayez.`),!1;let r=m.find(t=>t.id===e);return r&&(r.status=t),!0}function X(e){return e.replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`)}function Z(){let e=Y().filter(e=>e.status===`pending`),t=document.getElementById(`pending-count`);t&&(t.textContent=String(e.length),t.hidden=e.length===0)}function Q(){let e=M().filter(e=>e.status===`pending-refusal`),t=document.getElementById(`refusal-count`);t&&(t.textContent=String(e.length),t.hidden=e.length===0)}function $(){let e=Y(),t=e.filter(e=>e.status===`pending`),n=e.filter(e=>e.status===`approved`),r=e.filter(e=>e.status===`rejected`),a=document.getElementById(`reviews-sub`);a&&(a.textContent=`${e.length} avis au total — ${t.length} en attente`);let o=document.getElementById(`rtab-pending-count`),s=document.getElementById(`rtab-approved-count`),c=document.getElementById(`rtab-rejected-count`);o&&(o.textContent=t.length>0?`(${t.length})`:``),s&&(s.textContent=n.length>0?`(${n.length})`:``),c&&(c.textContent=r.length>0?`(${r.length})`:``);let l=J===`pending`?t:J===`approved`?n:r,u=document.getElementById(`reviews-list`);if(u){if(l.length===0){u.innerHTML=`<div class="adm-reviews__empty">Aucun avis ${J===`pending`?`en attente`:J===`approved`?`approuvé`:`refusé`}.</div>`;return}u.innerHTML=l.map(e=>{let t=`★`.repeat(e.stars||5)+`☆`.repeat(5-(e.stars||5)),n=e.date?new Date(e.date).toLocaleDateString(`fr-FR`,{day:`numeric`,month:`long`,year:`numeric`}):``,r=``;return r=e.status===`pending`?`
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
      `}).join(``),u.querySelectorAll(`[data-rv-approve]`).forEach(e=>{e.addEventListener(`click`,async()=>{let t=e.dataset.rvApprove;await ne(t,`approved`)&&($(),Z())})}),u.querySelectorAll(`[data-rv-reject]`).forEach(e=>{e.addEventListener(`click`,async()=>{let t=e.dataset.rvReject;await ne(t,`rejected`)&&($(),Z())})}),u.querySelectorAll(`[data-rv-delete]`).forEach(e=>{e.addEventListener(`click`,async()=>{let t=e.dataset.rvDelete,{error:n}=await i.from(`reviews`).delete().eq(`id`,t);if(n){alert(`Erreur, réessayez.`);return}m=m.filter(e=>e.id!==t),$(),Z()})})}}document.querySelectorAll(`[data-rtab]`).forEach(e=>{e.addEventListener(`click`,()=>{J=e.dataset.rtab,document.querySelectorAll(`[data-rtab]`).forEach(e=>e.classList.remove(`adm-reviews__tab--active`)),e.classList.add(`adm-reviews__tab--active`),$()})}),Z(),Q();
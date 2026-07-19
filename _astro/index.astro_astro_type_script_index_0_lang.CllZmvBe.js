import{c as e,l as t,s as n,t as r}from"./supabase.B7wVJYeJ.js";var i=[`Janvier`,`Février`,`Mars`,`Avril`,`Mai`,`Juin`,`Juillet`,`Août`,`Septembre`,`Octobre`,`Novembre`,`Décembre`],a={},o={"formule-essentielle":`Formule Essentielle`,"formule-confort":`Formule Confort`,"formule-sur-mesure":`Formule Sur Mesure`,"omra-classique":`Omra classique`,"guide-pmr-omra":`Guide PMR (Spécial Omra)`,"omra-masjid-aicha":`Omra au départ du Masjid Aïcha`,"visite-historique-makkah":`Visite historique de Makkah`,"visite-historique-medine":`Visite historique de Médine`,"visite-masjid-nabawi":`Visite du Masjid En-Nabawi`,"shopping-guide-medine":`Shopping guidé à Médine`,"visa-omra-standard":`Visa Omra standard`,"visa-omra-express":`Visa Omra express`,"visa-groupe-famille":`Visa groupe / famille`},s=new URLSearchParams(window.location.search).get(`activite`),c=s?o[s]||s:null,l=new URLSearchParams(window.location.search).get(`ville`),u=l===`medine`?`medina`:l===`makkah`?`mecca`:null;function d(){let e=document.getElementById(`activity-banner`),t=document.getElementById(`activity-banner-name`),n=document.getElementById(`activity-banner-clear`);!e||!t||!n||(s&&c&&(t.textContent=c,e.hidden=!1),n.addEventListener(`click`,t=>{t.preventDefault(),s=null,c=null,e.hidden=!0;let n=new URL(window.location.href);n.searchParams.delete(`activite`),history.replaceState(null,``,n.toString())}))}d();function f(e){return e.replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`)}var p=[],m=[],h={},g={};function _(){return p}function v(e){return m.filter(t=>t.guideId===e)}function y(e,t){let n=(h[e]||{})[t];if(!n||n.length===0)return[];let r=(g[e]||{})[t]||[];return r.includes(`*`)?[]:n.filter(e=>!r.includes(e))}async function b(){let[i,a,o,s]=await Promise.all([t.from(`guides`).select(`*`).order(`created_at`),t.from(`reviews`).select(`*`).not(`guide_id`,`is`,null),t.from(`availability`).select(`guide_id, date, slots`),t.from(`booked_dates`).select(`guide_id, date, slot`)]);p=(i.data||[]).map(n),m=(a.data||[]).map(e),h={},(o.data||[]).forEach(e=>{(h[e.guide_id]=h[e.guide_id]||{})[e.date]=e.slots||r.slice()}),g={},(s.data||[]).forEach(e=>{let t=g[e.guide_id]=g[e.guide_id]||{};(t[e.date]=t[e.date]||[]).push(e.slot||`*`)})}var x={français:`FR`,francais:`FR`,arabe:`AR`,anglais:`EN`,espagnol:`ES`,turc:`TR`,ourdou:`UR`,indonésien:`ID`,indonesien:`ID`};function S(e){return x[e.trim().toLowerCase()]||e.trim().slice(0,2).toUpperCase()}function C(e){let t=Math.round(e),n=``;for(let e=1;e<=5;e++)n+=`<span class="gp-star ${e<=t?`gp-star--full`:``}">★</span>`;return n}function w(){let e=document.getElementById(`guides-list`),t=document.getElementById(`guides-empty`);if(!e)return;let n=u?_().filter(e=>e.city===u):_();if(e.querySelectorAll(`.gp-card`).forEach(e=>e.remove()),document.querySelectorAll(`body > .gp-cal`).forEach(e=>e.remove()),n.length===0){t&&(t.hidden=!1);return}t&&(t.hidden=!0),n.forEach(t=>{let n=t.city===`medina`?`Médine`:`La Mecque`,r=(t.firstName?.[0]||``)+(t.lastName?.[0]||``),i=(t.languages||[]).map(e=>S(e)),a=i.map(e=>`<span class="gp-card__lang">${f(e)}</span>`).join(``),o=(t.languages||[]).map(e=>`<span class="gp-profile__lang">${f(e.trim())}</span>`).join(``),s=v(t.id),c=s.length,l=c>0?s.reduce((e,t)=>e+(t.stars||5),0)/c:0,u=l.toFixed(1).replace(`.`,`,`),d=c>0?`<div class="gp-card__rating"><span class="gp-card__rating-star">★</span><span class="gp-card__rating-num">${u}</span><span class="gp-card__reviews">(${c} avis)</span></div>`:`<div class="gp-card__rating"><span class="gp-card__rating-star">★</span><span class="gp-card__reviews">(0 avis)</span></div>`,p=t.photo?`<div class="gp-card__avatar gp-card__avatar--photo" style="background-image:url(${t.photo})"></div>`:`<div class="gp-card__avatar gp-card__avatar--${t.city}">${f(r)}</div>`,m=t.photo?`<img src="${t.photo}" alt="${f(t.firstName)} ${f(t.lastName)}" class="guide-visual__image" />`:`<div class="guide-visual__image guide-visual__image--initials guide-visual__image--${t.city}">${f(r)}</div>`,h=s.filter(e=>(e.text||``).trim().length>0),g=h.length>0?h[Math.floor(Math.random()*h.length)]:null,_=c>0?`
          <div class="gp-profile__reviews">
            <div class="gp-profile__rv-avg">
              <span class="gp-profile__rv-label">Moyenne des avis</span>
              <span class="gp-profile__rv-score">${u}<em>/5</em></span>
              <span class="gp-profile__rv-stars">${C(l)}</span>
              <span class="gp-profile__rv-count">Bas&eacute; sur ${c} avis</span>
            </div>
            <div class="gp-profile__rv-quote">
              <span class="gp-profile__rv-label">Ils ont voyag&eacute; avec ${f(t.firstName)}</span>
              ${g?`<p class="gp-profile__rv-text">&ldquo;${f(g.text)}&rdquo;</p><span class="gp-profile__rv-author">&ndash; ${f(g.name||`Anonyme`)}</span>`:`<p class="gp-profile__rv-text gp-profile__rv-text--empty">Aucun commentaire d&eacute;taill&eacute; pour le moment.</p>`}
              <button type="button" class="gp-profile__rv-all" data-all-reviews="${t.id}">
                Voir tous les avis
                <svg width="13" height="13" viewBox="0 0 20 20" fill="none"><path d="M4 10h12M12 5l5 5-5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
              </button>
            </div>
          </div>`:`
          <div class="gp-profile__reviews gp-profile__reviews--empty">
            <span class="gp-profile__rv-label">Avis</span>
            <p class="gp-profile__rv-text gp-profile__rv-text--empty">Aucun avis pour le moment. Soyez le premier &agrave; voyager avec ${f(t.firstName)} !</p>
          </div>`,y=document.createElement(`article`);y.className=`gp-card reveal is-visible`,y.dataset.guideId=t.id,y.innerHTML=`
        <div class="gp-card__body">
          <div class="gp-card__main">
            ${p}
            <div class="gp-card__info">
              <h2 class="gp-card__name">${f(t.firstName)} ${f(t.lastName)}</h2>
              ${t.diploma?`<p class="gp-card__diploma">${f(t.diploma)}</p>`:``}
              ${i.length?`<div class="gp-card__langs">${a}</div>`:``}
              ${d}
            </div>
            <div class="gp-card__right">
              ${t.pricePerDay?`<div class="gp-card__price"><span class="gp-card__amount">${f(String(t.pricePerDay))}&euro;</span><span class="gp-card__unit">Frais inclus</span></div>`:``}
              <button class="gp-card__avail-btn" type="button" data-open-cal="${t.id}">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><rect x="4" y="5.5" width="16" height="15" rx="2" stroke="currentColor" stroke-width="1.5"/><path d="M4 10h16M8.5 3.5v3.5M15.5 3.5v3.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
                Les disponibilit&eacute;s
              </button>
            </div>
          </div>

          <button class="gp-card__toggle" type="button" data-toggle-profile="${t.id}" aria-expanded="false">
            Voir le profil
            <svg class="gp-card__toggle-icon" width="16" height="16" viewBox="0 0 20 20" fill="none"><path d="M4 7l6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </button>

          <div class="gp-profile" id="profile-${t.id}">
            <div class="gp-profile__inner">
              <div class="gp-profile__sheet">
                <div class="gp-profile__top">
                  <div class="guide-visual">
                    ${m}
                  </div>
                  <div class="gp-profile__id">
                    <span class="gp-profile__city">
                      <svg width="13" height="13" viewBox="0 0 20 20" fill="none"><path d="M10 18s6-5.2 6-9.5A6 6 0 0 0 4 8.5C4 12.8 10 18 10 18z" stroke="currentColor" stroke-width="1.6"/><circle cx="10" cy="8.5" r="2" stroke="currentColor" stroke-width="1.6"/></svg>
                      ${f(n.toUpperCase())}
                    </span>
                    <h3 class="gp-profile__name">${f(t.firstName)} ${f(t.lastName)}</h3>
                    ${t.diploma?`<p class="gp-profile__diploma">${f(t.diploma)}</p>`:``}
                    ${o?`<div class="gp-profile__langs">${o}</div>`:``}
                    ${t.description?`<p class="gp-profile__desc">${f(t.description)}</p>`:``}
                  </div>
                </div>

                ${_}
              </div>
            </div>
          </div>

          <div class="gp-cal is-hidden" id="cal-${t.id}">
          <div class="gp-cal__panel">
          <button type="button" class="gp-cal__close" data-cal-close="${t.id}" aria-label="Fermer">
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none"><path d="M5 5l10 10M15 5L5 15" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
          </button>
          <div class="gp-cal__header">
            <h3 class="gp-cal__title">Choisissez quand effectuer votre Omra</h3>
            <p class="gp-cal__guide-name">avec ${f(t.firstName)} ${f(t.lastName)}</p>
          </div>
          <div class="gp-cal__calwrap" id="cal-wrap-${t.id}">
            <div class="gp-cal__calwrap-inner">
            <div class="gp-cal__nav">
              <button type="button" class="gp-cal__arrow" data-cal-prev="${t.id}" aria-label="Mois pr&eacute;c&eacute;dent">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M11 4L6 9L11 14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
              </button>
              <span class="gp-cal__month" id="cal-month-${t.id}"></span>
              <button type="button" class="gp-cal__arrow" data-cal-next="${t.id}" aria-label="Mois suivant">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M7 4L12 9L7 14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
              </button>
            </div>
            <div class="gp-cal__weekdays">
              <span>Lun</span><span>Mar</span><span>Mer</span><span>Jeu</span><span>Ven</span><span>Sam</span><span>Dim</span>
            </div>
            <div class="gp-cal__grid" id="cal-grid-${t.id}"></div>
            <div class="gp-cal__legend">
              <span class="gp-cal__legend-item"><span class="gp-cal__dot gp-cal__dot--available"></span> Disponible</span>
              <span class="gp-cal__legend-item"><span class="gp-cal__dot gp-cal__dot--unavailable"></span> Indisponible</span>
            </div>
            </div>
          </div>
          <button type="button" class="gp-cal__reopen is-hidden" id="cal-reopen-${t.id}" data-cal-reopen="${t.id}">
            <svg class="gp-cal__reopen-icon" width="14" height="14" viewBox="0 0 20 20" fill="none"><path d="M4 7l6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            Rouvrir le calendrier
          </button>
          <div class="gp-cal__selection is-hidden" id="cal-sel-${t.id}">
            <p class="gp-cal__selected-date" id="cal-date-${t.id}"></p>
            <div class="gp-cal__slots">
              <p class="gp-cal__slots-label">Choisissez un cr&eacute;neau :</p>
              <div class="gp-cal__slots-grid">
                <button type="button" class="gp-cal__slot" data-slot="Matin" data-guide-id="${t.id}">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="14" r="4" stroke="currentColor" stroke-width="1.5"/><path d="M12 6.5V4.5M5.5 14h-2M20.5 14h-2M7.4 9.4L6 8M16.6 9.4L18 8M3 18.5h18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
                  Matin
                </button>
                <button type="button" class="gp-cal__slot" data-slot="Après-midi" data-guide-id="${t.id}">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="4.5" stroke="currentColor" stroke-width="1.5"/><path d="M12 3.5v2M12 18.5v2M3.5 12h2M18.5 12h2M6 6l1.4 1.4M18 6l-1.4 1.4M6 18l1.4-1.4M18 18l-1.4-1.4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
                  Apr&egrave;s-midi
                </button>
                <button type="button" class="gp-cal__slot" data-slot="Soir" data-guide-id="${t.id}">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="16" r="4" stroke="currentColor" stroke-width="1.5"/><path d="M3 20.5h18M5.5 16h-2M20.5 16h-2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
                  Soir
                </button>
                <button type="button" class="gp-cal__slot" data-slot="Nuit" data-guide-id="${t.id}">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M19 14.5A7.5 7.5 0 0 1 9.5 5 7.5 7.5 0 1 0 19 14.5z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>
                  Nuit
                </button>
              </div>
            </div>
            <div class="gp-cal__actions">
              <button type="button" class="gp-cal__action gp-cal__action--secondary" data-action="browse" data-guide-id="${t.id}" disabled>R&eacute;server et continuer de surfer</button>
              <button type="button" class="gp-cal__action gp-cal__action--primary" data-action="pay" data-guide-id="${t.id}" disabled>Proc&eacute;der au paiement</button>
            </div>
          </div>
          </div>
        </div>
        </div>
      `,e.appendChild(y)}),e.querySelectorAll(`.gp-cal`).forEach(e=>document.body.appendChild(e)),D()}function T(e){let t=a[e];if(!t)return;let n=document.getElementById(`cal-month-${e}`),r=document.getElementById(`cal-grid-${e}`);if(!n||!r)return;n.textContent=`${i[t.month]} ${t.year}`,r.innerHTML=``;let o=new Date(t.year,t.month,1).getDay(),s=o===0?6:o-1,c=new Date(t.year,t.month+1,0).getDate(),l=new Date;l.setHours(0,0,0,0);for(let e=0;e<s;e++){let e=document.createElement(`span`);e.className=`gp-cal__day gp-cal__day--empty`,r.appendChild(e)}for(let n=1;n<=c;n++){let i=`${t.year}-${String(t.month+1).padStart(2,`0`)}-${String(n).padStart(2,`0`)}`,a=new Date(t.year,t.month,n)<l,o=(a?[]:y(e,i)).length>0,s=t.selectedDate===i,c=document.createElement(`button`);c.type=`button`,c.textContent=String(n),c.className=`gp-cal__day`,o?c.classList.add(`gp-cal__day--available`):c.classList.add(`gp-cal__day--unavailable`),a&&c.classList.add(`gp-cal__day--past`),s&&c.classList.add(`gp-cal__day--selected`),o?c.addEventListener(`click`,()=>{t.selectedDate=i,t.selectedSlot=null,T(e);let n=document.getElementById(`cal-sel-${e}`),r=document.getElementById(`cal-date-${e}`);if(n&&r){let[t,a,o]=i.split(`-`).map(Number);r.textContent=`Date sélectionnée : ${new Date(t,a-1,o).toLocaleDateString(`fr-FR`,{weekday:`long`,day:`numeric`,month:`long`,year:`numeric`})}`,n.classList.remove(`is-hidden`);let s=document.getElementById(`cal-wrap-${e}`),c=document.getElementById(`cal-reopen-${e}`);s&&c&&(s.classList.add(`is-collapsed`),c.classList.remove(`is-hidden`),c.classList.remove(`is-open`));let l=y(e,i);n.querySelectorAll(`.gp-cal__slot`).forEach(e=>{let t=e.dataset.slot,n=l.includes(t);e.disabled=!n,e.classList.toggle(`is-unavailable`,!n),e.classList.remove(`is-selected`)}),n.querySelectorAll(`.gp-cal__action`).forEach(e=>e.disabled=!0)}}):c.disabled=!0,r.appendChild(c)}}function E(e){let t=_().find(t=>t.id===e);if(!t)return;let n=v(e),r=n.map(e=>`
      <article class="gp-rvmodal__item">
        <div class="gp-rvmodal__item-head">
          <span class="gp-rvmodal__stars">${C(e.stars||5)}</span>
          <span class="gp-rvmodal__author">${f(e.name||`Anonyme`)}</span>
        </div>
        ${(e.text||``).trim()?`<p class="gp-rvmodal__text">&ldquo;${f(e.text)}&rdquo;</p>`:``}
      </article>`).join(``),i=document.createElement(`div`);i.className=`gp-rvmodal`,i.innerHTML=`
      <div class="gp-rvmodal__panel">
        <button type="button" class="gp-rvmodal__close" aria-label="Fermer">
          <svg width="16" height="16" viewBox="0 0 20 20" fill="none"><path d="M5 5l10 10M15 5L5 15" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
        </button>
        <h3 class="gp-rvmodal__title">Tous les avis</h3>
        <p class="gp-rvmodal__guide">sur ${f(t.firstName)} ${f(t.lastName)} &middot; ${n.length} avis</p>
        <div class="gp-rvmodal__list">${r}</div>
      </div>`,document.body.appendChild(i),document.body.style.overflow=`hidden`;function a(){i.remove(),document.body.style.overflow=``,document.removeEventListener(`keydown`,o)}function o(e){e.key===`Escape`&&a()}i.addEventListener(`click`,e=>{e.target===i&&a()}),i.querySelector(`.gp-rvmodal__close`)?.addEventListener(`click`,a),document.addEventListener(`keydown`,o)}function D(){document.querySelectorAll(`[data-all-reviews]`).forEach(e=>{e.addEventListener(`click`,()=>{E(e.dataset.allReviews)})}),document.querySelectorAll(`[data-toggle-profile]`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.dataset.toggleProfile,n=document.getElementById(`profile-${t}`);if(!n)return;let r=n.classList.toggle(`is-open`);if(e.setAttribute(`aria-expanded`,String(r)),e.classList.toggle(`is-open`,r),!r){let e=document.getElementById(`cal-${t}`);e&&e.classList.add(`is-hidden`)}})}),document.querySelectorAll(`[data-open-cal]`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.dataset.openCal,n=document.getElementById(`cal-${t}`);if(!n)return;if(document.querySelectorAll(`.gp-cal`).forEach(e=>e.classList.add(`is-hidden`)),!a[t]){let e=new Date;a[t]={year:e.getFullYear(),month:e.getMonth(),selectedDate:null,selectedSlot:null}}T(t);let r=document.getElementById(`cal-wrap-${t}`),i=document.getElementById(`cal-reopen-${t}`);r?.classList.remove(`is-collapsed`),i?.classList.add(`is-hidden`),n.classList.remove(`is-hidden`),document.body.style.overflow=`hidden`})}),document.querySelectorAll(`[data-cal-reopen]`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.dataset.calReopen,n=document.getElementById(`cal-wrap-${t}`);if(!n)return;let r=n.classList.toggle(`is-collapsed`);e.classList.toggle(`is-open`,!r)})});function e(e){e.classList.add(`is-hidden`),document.body.style.overflow=``}document.querySelectorAll(`[data-cal-close]`).forEach(t=>{t.addEventListener(`click`,()=>{let n=t.closest(`.gp-cal`);n&&e(n)})}),document.querySelectorAll(`.gp-cal`).forEach(t=>{t.addEventListener(`click`,n=>{n.target===t&&e(t)})}),document.addEventListener(`keydown`,t=>{t.key===`Escape`&&document.querySelectorAll(`.gp-cal:not(.is-hidden)`).forEach(t=>e(t))}),document.querySelectorAll(`.gp-cal__slot`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.dataset.guideId,n=a[t];if(!n?.selectedDate)return;n.selectedSlot=e.dataset.slot;let r=document.getElementById(`cal-sel-${t}`);r&&(r.querySelectorAll(`.gp-cal__slot`).forEach(e=>e.classList.remove(`is-selected`)),e.classList.add(`is-selected`),r.querySelectorAll(`.gp-cal__action`).forEach(e=>e.disabled=!1))})}),document.querySelectorAll(`[data-cal-prev]`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.dataset.calPrev,n=a[t];n&&(n.month--,n.month<0&&(n.month=11,n.year--),T(t))})}),document.querySelectorAll(`[data-cal-next]`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.dataset.calNext,n=a[t];n&&(n.month++,n.month>11&&(n.month=0,n.year++),T(t))})}),document.querySelectorAll(`[data-action="browse"]`).forEach(t=>{t.addEventListener(`click`,async()=>{let n=t.dataset.guideId,r=a[n];if(!r?.selectedDate||!r.selectedSlot||!await O(n,r.selectedDate,r.selectedSlot))return;r.selectedDate=null,r.selectedSlot=null,T(n);let i=document.getElementById(`cal-sel-${n}`);i&&i.classList.add(`is-hidden`);let o=document.getElementById(`cal-${n}`);o&&e(o);let s=document.querySelector(`article[data-guide-id="${n}"]`);if(s&&(s.style.borderColor=`#14513A`,s.style.boxShadow=`0 0 0 2px rgba(20,81,58,0.15)`,!s.querySelector(`.gp-card__booked`))){let e=document.createElement(`span`);e.className=`gp-card__booked`,e.textContent=`Réservé`,s.querySelector(`.gp-card__right`)?.prepend(e)}})}),document.querySelectorAll(`[data-action="pay"]`).forEach(t=>{t.addEventListener(`click`,async()=>{let n=t.dataset.guideId,r=a[n];if(!r?.selectedDate||!r.selectedSlot||!await O(n,r.selectedDate,r.selectedSlot))return;alert(`Réservation confirmée pour le ${r.selectedDate} (${r.selectedSlot}).\n(Page de paiement à venir)`),r.selectedDate=null,r.selectedSlot=null,T(n);let i=document.getElementById(`cal-sel-${n}`);i&&i.classList.add(`is-hidden`);let o=document.getElementById(`cal-${n}`);o&&e(o)})})}async function O(e,n,r){let i=_().find(t=>t.id===e),{data:a,error:o}=await t.rpc(`create_booking`,{p_guide_id:e,p_date:n,p_slot:r,p_activity_slug:s,p_activity_name:c});if(o||!a)return alert(`Cette date n'est plus disponible. Le calendrier a été mis à jour.`),await b(),T(e),!1;let l=g[e]=g[e]||{};(l[n]=l[n]||[]).push(r);let u=JSON.parse(localStorage.getItem(`omra-cart`)||`[]`);return u.push({bookingId:a.id,cancelToken:a.cancel_token,guideId:e,guideName:i?`${i.firstName} ${i.lastName}`:`Guide`,guidePhoto:i?.photo||``,date:n,slot:r,activityName:c||``,price:i?.pricePerDay||0}),localStorage.setItem(`omra-cart`,JSON.stringify(u)),window.dispatchEvent(new Event(`cart-updated`)),!0}b().then(w);
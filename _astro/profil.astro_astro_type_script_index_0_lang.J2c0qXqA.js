import{a as e,c as t,l as n,o as r,s as i,t as a}from"./supabase.DxFm7Jm5.js";import{i as o,r as s,t as c}from"./guide-activities.BET7D3PP.js";var l=[`Janvier`,`Février`,`Mars`,`Avril`,`Mai`,`Juin`,`Juillet`,`Août`,`Septembre`,`Octobre`,`Novembre`,`Décembre`],u={Français:`🇫🇷`,Arabe:`🇸🇦`,Anglais:`🇬🇧`,Espagnol:`🇪🇸`,Turc:`🇹🇷`,Ourdou:`🇵🇰`,Indonésien:`🇮🇩`,Malais:`🇲🇾`};function d(e){return e.replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`)}var f=[],p={},m={},h=[],g=[];function _(){return f}function v(e){return h}function y(e){return c[e]||a.slice()}async function b(e,t,r){let i={};Object.keys(r).forEach(e=>{r[e]&&r[e].length>0&&(i[e]=r[e])});let a=Object.keys(i).map(n=>({guide_id:e,activity_slug:t,date:n,slots:i[n]}));if(a.length>0){let{error:e}=await n.from(`availability`).upsert(a,{onConflict:`guide_id,activity_slug,date`});if(e)return alert(`L'enregistrement a échoué : ${e.message}\n\nVos disponibilités n'ont PAS été modifiées.`),!1}let{data:o,error:s}=await n.from(`availability`).select(`date`).eq(`guide_id`,e).eq(`activity_slug`,t);if(!s&&o){let r=o.map(e=>e.date).filter(e=>!i[e]);if(r.length>0){let{error:i}=await n.from(`availability`).delete().eq(`guide_id`,e).eq(`activity_slug`,t).in(`date`,r);i&&alert(`Certains jours n'ont pas pu être retirés : ${i.message}`)}}return p[t]=i,!0}function x(e,t){let n=t[e]||[],r=m[e]||[];return r.includes(`*`)?[]:n.filter(e=>!r.includes(e))}var S={},C=new URLSearchParams(window.location.search),w=C.get(`id`),T=!1,E=document.getElementById(`profile-section`);function D(){E.innerHTML=`<div class="gpr__error"><p>Guide introuvable.</p><a href="/guides/">Retour aux guides</a></div>`}(async function(){if(!w){D();return}let{data:s}=await n.from(`guides`).select(`*`).eq(`id`,w).maybeSingle();if(!s){D();return}let c=i(s);if(C.get(`login`)===`1`){let{data:t}=await n.auth.getSession(),r=t.session?.user;r&&(T=c.authUserId&&r.id===c.authUserId?!0:await e())}g=o(c).map(e=>({slug:e.slug,label:e.label}));let[l,u,d]=await Promise.all([n.from(`reviews`).select(`*`).eq(`guide_id`,w),n.from(`availability`).select(`activity_slug, date, slots`).eq(`guide_id`,w),n.from(`booked_dates`).select(`date, slot`).eq(`guide_id`,w)]);if(f=(l.data||[]).map(t).filter(e=>e.status===`approved`),u.error&&T&&alert(`Erreur de chargement des disponibilités : ${u.error.message}\n\n(La migration SQL « disponibilités par activité » a-t-elle été exécutée dans Supabase ?)`),p={},g.forEach(e=>{p[e.slug]={}}),(u.data||[]).forEach(e=>{let t=e.activity_slug||``;(p[t]=p[t]||{})[e.date]=e.slots||a.slice()}),m={},(d.data||[]).forEach(e=>{(m[e.date]=m[e.date]||[]).push(e.slot||`*`)}),T){let{data:e}=await n.from(`bookings`).select(`*`).eq(`guide_id`,w).order(`date`);h=(e||[]).map(r).filter(e=>e.status!==`reassigned`)}k(c)})();function O(e){let t=Date.now(),n=new Date(e).getTime(),r=Math.floor((t-n)/1e3);if(r<60)return`A l'instant`;if(r<3600)return`Il y a ${Math.floor(r/60)} min`;if(r<86400)return`Il y a ${Math.floor(r/3600)}h`;let i=Math.floor(r/86400);if(i===1)return`Il y a 1 jour`;if(i<7)return`Il y a ${i} jours`;let a=Math.floor(i/7);if(a===1)return`Il y a 1 semaine`;if(a<5)return`Il y a ${a} semaines`;let o=Math.floor(i/30);return o===1?`Il y a 1 mois`:`Il y a ${o} mois`}function k(e){let t=e.city===`medina`?`Medine`:`La Mecque`,r=(e.firstName?.[0]||``)+(e.lastName?.[0]||``),i=e.city===`medina`?`/assets/images/madinah-bg.webp`:`/assets/images/makkah-bg.webp`,a=_().filter(t=>t.guideId===e.id&&t.status===`approved`),o=a.length>0?a.reduce((e,t)=>e+(t.stars||5),0)/a.length:0;document.title=`${e.firstName} ${e.lastName} | La plateforme Omra`;let s=e.photo?`<div class="gpr__avatar" style="background-image:url(${e.photo})"></div>`:`<div class="gpr__avatar gpr__avatar--initials gpr__avatar--${e.city}">${d(r)}</div>`,c=(e.languages||[]).map(e=>`<span class="gpr__lang-chip">${u[e]||`🌐`} ${d(e)}</span>`).join(``),l=a.length===0?`<p class="gpr__no-reviews">Aucun avis pour le moment.</p>`:a.map(e=>{let t=e.date?O(e.date):``,n=(e.name||`A`)[0].toUpperCase();return`
            <div class="gpr__rv-card">
              <div class="gpr__rv-top">
                ${e.photo?`<div class="gpr__rv-avatar" style="background-image:url(${e.photo})"></div>`:`<div class="gpr__rv-avatar gpr__rv-avatar--initials">${n}</div>`}
                <div class="gpr__rv-meta">
                  <span class="gpr__rv-name">${d(e.name||`Anonyme`)}</span>
                  <span class="gpr__rv-stars">${A(e.stars||5)}</span>
                  <span class="gpr__rv-date">${t}</span>
                </div>
              </div>
              <p class="gpr__rv-text">${d(e.text||``)}</p>
            </div>
          `}).join(``);E.innerHTML=`
      ${T?`
      <div class="gpr__guide-bar">
        <span class="gpr__guide-bar-text">
          <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="5" r="3" stroke="currentColor" stroke-width="1.4"/><path d="M2.5 14c0-3 2.5-5.5 5.5-5.5s5.5 2.5 5.5 5.5" stroke="currentColor" stroke-width="1.4"/></svg>
          Espace guide — g&eacute;rez vos disponibilit&eacute;s et vos r&eacute;servations
        </span>
        <button type="button" class="gpr__guide-bar-logout" id="guide-logout">Se d&eacute;connecter</button>
      </div>
      `:``}
      <!-- ═══ HERO ═══ -->
      <div class="gpr__hero" style="background-image:url(${i})">
        <div class="gpr__hero-fade"></div>
      </div>

      <div class="gpr__profile-head">
        <div class="gpr__container">
          ${s}
          <span class="gpr__city-pill gpr__city-pill--${e.city}">
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M8 1.5C5 1.5 2.5 4 2.5 7c0 4 5.5 7.5 5.5 7.5s5.5-3.5 5.5-7.5c0-3-2.5-5.5-5.5-5.5z" stroke="currentColor" stroke-width="1.2"/><circle cx="8" cy="7" r="2" stroke="currentColor" stroke-width="1.2"/></svg>
            ${d(t)}
          </span>
          <h1 class="gpr__name">${d(e.firstName)} <span class="gpr__name-end">${d(e.lastName)}<img src="/assets/images/verified.png" alt="Guide vérifié" title="Guide vérifié" class="gpr__verified" /></span></h1>
          <p class="gpr__subtitle">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M8 1.5C5 1.5 2.5 4 2.5 7c0 4 5.5 7.5 5.5 7.5s5.5-3.5 5.5-7.5c0-3-2.5-5.5-5.5-5.5z" stroke="currentColor" stroke-width="1.2"/><circle cx="8" cy="7" r="2" stroke="currentColor" stroke-width="1.2"/></svg>
            Guide certifié${e.diploma?`  &middot;  ${d(e.diploma)}`:``}
          </p>
        </div>
      </div>

      <!-- ═══ CONTENT ═══ -->
      <div class="gpr__container gpr__content">

        ${e.description?`
        <!-- A PROPOS -->
        <div class="gpr__card gpr__card--about">
          <div class="gpr__card-icon">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><circle cx="11" cy="7.5" r="4" stroke="currentColor" stroke-width="1.4"/><path d="M3 20c0-4.4 3.6-8 8-8s8 3.6 8 8" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>
          </div>
          <h2 class="gpr__card-title">A propos</h2>
          <p class="gpr__bio">${d(e.description)}</p>
        </div>
        `:``}

        ${(e.languages||[]).length>0?`
        <!-- LANGUES -->
        <div class="gpr__card gpr__card--langs">
          <div class="gpr__card-icon">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><circle cx="11" cy="11" r="9" stroke="currentColor" stroke-width="1.4"/><ellipse cx="11" cy="11" rx="4" ry="9" stroke="currentColor" stroke-width="1.2"/><path d="M2.5 8.5h17M2.5 13.5h17" stroke="currentColor" stroke-width="1.1"/></svg>
          </div>
          <h2 class="gpr__card-title">Langues parlées</h2>
          <div class="gpr__langs">${c}</div>
        </div>
        `:``}

        <!-- DISPONIBILITÉS PAR ACTIVITÉ -->
        <div class="gpr__card gpr__card--acts">
          <div class="gpr__card-icon">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><rect x="3" y="4" width="16" height="15" rx="3" stroke="currentColor" stroke-width="1.4"/><path d="M3 9h16M7 2v4M15 2v4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>
          </div>
          <h2 class="gpr__card-title">Disponibilit&eacute;s</h2>
          <p class="gpr__acts-hint">${T?`Chaque activit&eacute; a son propre calendrier. Ouvrez-en une pour indiquer vos jours et vos cr&eacute;neaux.`:`Choisissez une activit&eacute; pour voir les dates disponibles.`}</p>
          ${g.length===0?`<p class="gpr__no-reviews">Aucune activit&eacute; assign&eacute;e pour le moment.</p>`:`<div class="gpr__acts">${g.map(e=>j(e)).join(``)}</div>`}
        </div>

        ${T?`
        <!-- RESERVATIONS (guide only) -->
        <div class="gpr__card">
          <div class="gpr__card-icon">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><rect x="3" y="4" width="16" height="14" rx="2" stroke="currentColor" stroke-width="1.4"/><path d="M3 9h16M8 2v4M14 2v4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>
          </div>
          <h2 class="gpr__card-title">R&eacute;servations effectu&eacute;es</h2>
          <div id="bookings-list"></div>
        </div>
        `:``}

        <!-- MOYENNE DES AVIS -->
        <div class="gpr__card gpr__card--rating">
          <div class="gpr__card-icon">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M11 2l2.7 5.5 6 .9-4.35 4.25 1.03 5.95L11 15.9l-5.38 2.7 1.03-5.95L2.3 8.4l6-.9L11 2z" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/></svg>
          </div>
          <h2 class="gpr__card-title">Moyenne des avis</h2>
          ${a.length>0?`
            <div class="gpr__rating-left">
              <div class="gpr__rating-big-star">
                <svg width="28" height="28" viewBox="0 0 20 20" fill="#D4A843"><path d="M10 1.5l2.5 5 5.5.8-4 3.9.9 5.5-4.9-2.6L5.1 16.7l.9-5.5-4-3.9 5.5-.8L10 1.5z"/></svg>
              </div>
              <span class="gpr__rating-num">${o.toFixed(1)}</span>
              <span class="gpr__rating-slash">/ 5</span>
              <div class="gpr__rating-stars">${A(o)}</div>
              <span class="gpr__rating-count">Bas&eacute;e sur ${a.length} avis</span>
            </div>
          `:`<p class="gpr__no-reviews">Aucun avis pour le moment.</p>`}
        </div>

        <!-- LES AVIS -->
        <div class="gpr__card gpr__card--reviews">
          <div class="gpr__card-icon">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M4 4h14a2 2 0 012 2v8a2 2 0 01-2 2H8l-4 3v-3a2 2 0 01-2-2V6a2 2 0 012-2z" stroke="currentColor" stroke-width="1.4"/></svg>
          </div>
          <h2 class="gpr__card-title">Les avis${a.length>0?` (${a.length})`:``}</h2>
          <div class="gpr__rv-list" id="reviews-list">
            ${l}
          </div>

        </div>

      </div>

      ${T?`
      <!-- MODAL REFUS -->
      <div class="gpr__modal-overlay is-hidden" id="refuse-modal">
        <div class="gpr__modal">
          <h3 class="gpr__modal-title">Faire part d'un emp&ecirc;chement</h3>
          <p class="gpr__modal-sub">R&eacute;servation du <strong id="refuse-modal-date"></strong></p>
          <p class="gpr__modal-hint">Veuillez indiquer la raison de votre emp&ecirc;chement. Cette information sera transmise &agrave; l'administrateur.</p>
          <textarea class="gpr__modal-textarea" id="refuse-reason" rows="4" placeholder="Raison de l'emp&ecirc;chement..."></textarea>
          <div class="gpr__modal-actions">
            <button type="button" class="gpr__modal-cancel" id="refuse-cancel">Annuler</button>
            <button type="button" class="gpr__modal-confirm" id="refuse-confirm">Envoyer</button>
          </div>
        </div>
      </div>
      `:``}
    `,document.getElementById(`guide-logout`)?.addEventListener(`click`,async()=>{let{data:t}=await n.auth.getUser();t.user&&e.authUserId&&t.user.id===e.authUserId&&await n.auth.signOut(),window.location.href=`/guides/profil/?id=${e.id}`});try{M(e)}catch(e){console.error(`Calendar init error:`,e)}try{L(e)}catch(e){console.error(`Bookings init error:`,e)}try{V(e)}catch(e){console.error(`Refuse modal init error:`,e)}}function A(e){let t=``;for(let n=1;n<=5;n++)n<=Math.floor(e)?t+=`<span class="gpr__star gpr__star--full">&#9733;</span>`:n-e<1&&n-e>0?t+=`<span class="gpr__star gpr__star--half">&#9733;</span>`:t+=`<span class="gpr__star gpr__star--empty">&#9734;</span>`;return t}function j(e){let t=e.slug,n=y(t);return`
      <div class="gpr__act" data-act="${t}">
        <button type="button" class="gpr__act-head" data-act-toggle="${t}" aria-expanded="false">
          <span class="gpr__act-text">
            <span class="gpr__act-name">${d(e.label)}</span>
            <span class="gpr__act-meta" data-act-meta="${t}"></span>
          </span>
          <svg class="gpr__act-chev" width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </button>
        <div class="gpr__act-panel is-hidden" data-act-panel="${t}">
          <div class="gpr__cal-nav">
            <button type="button" class="gpr__cal-arrow" data-cal-prev="${t}" aria-label="Mois pr&eacute;c&eacute;dent">
              <svg width="17" height="17" viewBox="0 0 18 18" fill="none"><path d="M11 4L6 9l5 5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </button>
            <span class="gpr__cal-month" data-cal-month="${t}"></span>
            <button type="button" class="gpr__cal-arrow" data-cal-next="${t}" aria-label="Mois suivant">
              <svg width="17" height="17" viewBox="0 0 18 18" fill="none"><path d="M7 4l5 5-5 5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </button>
          </div>
          <div class="gpr__cal-weekdays">
            <span>LUN</span><span>MAR</span><span>MER</span><span>JEU</span><span>VEN</span><span>SAM</span><span>DIM</span>
          </div>
          <div class="gpr__cal-grid" data-cal-grid="${t}"></div>
          <div class="gpr__cal-legend">
            <span class="gpr__cal-legend-item"><span class="gpr__cal-dot gpr__cal-dot--avail"></span> Disponible</span>
            <span class="gpr__cal-legend-item"><span class="gpr__cal-dot gpr__cal-dot--busy"></span> Indisponible</span>
            ${T?`<span class="gpr__cal-legend-item"><span class="gpr__cal-dot gpr__cal-dot--booked"></span> R&eacute;serv&eacute;</span>`:``}
          </div>
          ${T?`
          <div class="gpr__slot-editor is-hidden" data-slot-editor="${t}">
            <p class="gpr__slot-editor-title" data-slot-title="${t}"></p>
            <div class="gpr__slot-editor-chips">
              ${n.map(e=>`<button type="button" class="gpr__slot-chip" data-eslot="${e}" data-eslot-act="${t}">${e}</button>`).join(``)}
            </div>
            <button type="button" class="gpr__slot-dayoff" data-slot-dayoff="${t}">Rendre ce jour indisponible</button>
          </div>
          <button type="button" class="gpr__cal-edit-btn" data-cal-edit="${t}">Modifier mes disponibilit&eacute;s</button>
          <div class="gpr__cal-edit-tools is-hidden" data-cal-tools="${t}">
            <label class="gpr__check-all">
              <input type="checkbox" data-check-all="${t}" />
              <span>Cocher tout le mois</span>
            </label>
            <button type="button" class="gpr__cal-save-btn" data-cal-save="${t}">Enregistrer</button>
          </div>
          `:``}
        </div>
      </div>`}function M(e){let t=new Date;g.forEach(n=>{let r=n.slug;S[r]={month:t.getMonth(),year:t.getFullYear(),editing:!1,draft:{},selDate:null},I(e,r),N(r);let i=document.querySelector(`[data-act-toggle="${r}"]`),a=document.querySelector(`[data-act-panel="${r}"]`);if(i?.addEventListener(`click`,()=>{let e=a.classList.contains(`is-hidden`);a.classList.toggle(`is-hidden`,!e),i.classList.toggle(`is-open`,e),i.setAttribute(`aria-expanded`,String(e))}),document.querySelector(`[data-cal-prev="${r}"]`)?.addEventListener(`click`,()=>{let t=S[r];t.month--,t.month<0&&(t.month=11,t.year--),I(e,r)}),document.querySelector(`[data-cal-next="${r}"]`)?.addEventListener(`click`,()=>{let t=S[r];t.month++,t.month>11&&(t.month=0,t.year++),I(e,r)}),!T)return;let o=document.querySelector(`[data-cal-edit="${r}"]`),s=document.querySelector(`[data-cal-tools="${r}"]`),c=document.querySelector(`[data-cal-save="${r}"]`),l=document.querySelector(`[data-check-all="${r}"]`);o?.addEventListener(`click`,()=>{let t=S[r];t.editing=!0,t.draft=JSON.parse(JSON.stringify(p[r]||{})),t.selDate=null,o.classList.add(`is-hidden`),s?.classList.remove(`is-hidden`),I(e,r),F(e,r)}),c?.addEventListener(`click`,async()=>{let t=S[r];c.disabled=!0,c.textContent=`Enregistrement...`;let n=await b(e.id,r,t.draft);c.disabled=!1,c.textContent=`Enregistrer`,n&&(t.editing=!1,t.selDate=null,o?.classList.remove(`is-hidden`),s?.classList.add(`is-hidden`),I(e,r),F(e,r),N(r))}),l?.addEventListener(`change`,()=>{let t=S[r],n=new Date(t.year,t.month+1,0).getDate(),i=new Date;i.setHours(0,0,0,0);for(let e=1;e<=n;e++){let n=`${t.year}-${String(t.month+1).padStart(2,`0`)}-${String(e).padStart(2,`0`)}`;new Date(t.year,t.month,e)<i||(l.checked?t.draft[n]||(t.draft[n]=y(r).slice()):delete t.draft[n])}t.selDate=null,I(e,r),F(e,r)}),P(e,r)})}function N(e){let t=document.querySelector(`[data-act-meta="${e}"]`);if(!t)return;let n=p[e]||{},r=new Date;r.setHours(0,0,0,0);let i=0;Object.keys(n).forEach(e=>{new Date(e+`T00:00:00`)<r||x(e,n).length>0&&i++}),t.innerHTML=i>0?`<span class="gpr__act-dot gpr__act-dot--on"></span>${i} jour${i>1?`s`:``} disponible${i>1?`s`:``}`:`<span class="gpr__act-dot"></span>Aucune date ouverte`}function P(e,t){let n=document.querySelector(`[data-slot-editor="${t}"]`);n&&(n.querySelectorAll(`[data-eslot]`).forEach(n=>{n.addEventListener(`click`,()=>{let r=S[t];if(!r.selDate)return;let i=n.dataset.eslot,a=m[r.selDate]||[];if(a.includes(i)||a.includes(`*`))return;let o=r.draft[r.selDate]||[];o.includes(i)?(r.draft[r.selDate]=o.filter(e=>e!==i),r.draft[r.selDate].length===0&&delete r.draft[r.selDate]):r.draft[r.selDate]=[...o,i],I(e,t),F(e,t)})}),document.querySelector(`[data-slot-dayoff="${t}"]`)?.addEventListener(`click`,()=>{let n=S[t];if(n.selDate){if((m[n.selDate]||[]).length>0){alert(`Ce jour a déjà une réservation : signalez un empêchement depuis vos réservations.`);return}delete n.draft[n.selDate],n.selDate=null,I(e,t),F(e,t)}}))}function F(e,t){let n=document.querySelector(`[data-slot-editor="${t}"]`),r=document.querySelector(`[data-slot-title="${t}"]`);if(!n||!r)return;let i=S[t];if(!i.editing||!i.selDate){n.classList.add(`is-hidden`);return}let[a,o,s]=i.selDate.split(`-`).map(Number);r.textContent=`Créneaux du ${new Date(a,o-1,s).toLocaleDateString(`fr-FR`,{weekday:`long`,day:`numeric`,month:`long`})}`;let c=i.draft[i.selDate]||[],l=m[i.selDate]||[];n.querySelectorAll(`[data-eslot]`).forEach(e=>{let t=e.dataset.eslot,n=l.includes(t)||l.includes(`*`);e.classList.toggle(`is-on`,c.includes(t)||n),e.classList.toggle(`is-booked`,n),e.disabled=n}),n.classList.remove(`is-hidden`)}function I(e,t){let n=document.querySelector(`[data-cal-grid="${t}"]`),r=document.querySelector(`[data-cal-month="${t}"]`);if(!n||!r)return;let i=S[t];r.textContent=`${l[i.month]} ${i.year}`;let a=i.editing?i.draft:p[t]||{},o=y(t).length,s=new Date(i.year,i.month,1).getDay(),c=s===0?6:s-1,u=new Date(i.year,i.month+1,0).getDate(),d=new Date;d.setHours(0,0,0,0);let f=``;for(let e=0;e<c;e++)f+=`<span class="gpr__cal-cell gpr__cal-cell--empty"></span>`;for(let e=1;e<=u;e++){let t=`${i.year}-${String(i.month+1).padStart(2,`0`)}-${String(e).padStart(2,`0`)}`,n=new Date(i.year,i.month,e)<d,r=a[t]||[],s=(m[t]||[]).length>0,c=x(t,a),l=s&&c.length===0,u=`gpr__cal-cell`;n?u+=` gpr__cal-cell--past`:T&&l?u+=` gpr__cal-cell--booked`:c.length>0?(u+=` gpr__cal-cell--avail`,(r.length<o||s)&&(u+=` gpr__cal-cell--partial`)):u+=` gpr__cal-cell--busy`,i.editing&&!n&&(u+=` gpr__cal-cell--editable`),i.editing&&i.selDate===t&&(u+=` gpr__cal-cell--editsel`),f+=`<button type="button" class="${u}" data-date="${t}" ${n?`disabled`:``}>${e}</button>`}n.innerHTML=f;let h=document.querySelector(`[data-check-all="${t}"]`);if(h&&i.editing){let e=!0;for(let t=1;t<=u;t++){let n=`${i.year}-${String(i.month+1).padStart(2,`0`)}-${String(t).padStart(2,`0`)}`;if(!(new Date(i.year,i.month,t)<d)&&(!a[n]||a[n].length===0)){e=!1;break}}h.checked=e}i.editing&&n.querySelectorAll(`.gpr__cal-cell--editable`).forEach(n=>{n.addEventListener(`click`,()=>{let r=n.dataset.date;i.selDate===r?i.selDate=null:(i.draft[r]||(i.draft[r]=y(t).slice()),i.selDate=r),I(e,t),F(e,t)})})}function L(e){let t=document.getElementById(`bookings-list`);t&&R(e,t)}function R(e,t){let r=v(e.id),i=new Date,a=new Date(i.getFullYear(),i.getMonth(),i.getDate()-1),o=r.filter(e=>new Date(e.date+`T23:59:59`)>a);if(o.length===0){t.innerHTML=`<p class="gpr__no-reviews">Aucune réservation active pour le moment.</p>`;return}let c=o.sort((e,t)=>e.date.localeCompare(t.date)),l={};for(let e of c)e.activitySlug&&(l[e.activitySlug]=l[e.activitySlug]||[]).push(e);let u=[...g.map(e=>e.slug).filter(e=>l[e]),...Object.keys(l).filter(e=>!g.some(t=>t.slug===e))];if(u.length===0){t.innerHTML=`<p class="gpr__no-reviews">Aucune réservation active pour le moment.</p>`;return}t.innerHTML=u.map((e,t)=>{let n=l[e],r=s(e),i=t===0;return`
        <div class="gpr__bk-act">
          <button type="button" class="gpr__bk-act-toggle ${i?`is-open`:``}" data-bk-act="${d(e)}">
            <span class="gpr__bk-act-label">${d(String(r))}</span>
            <span class="gpr__bk-act-count">${n.length}</span>
            <svg class="gpr__bk-act-arrow" width="15" height="15" viewBox="0 0 14 14" fill="none"><path d="M4 5.5l3 3 3-3" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </button>
          <div class="gpr__bk-act-body ${i?``:`is-hidden`}" data-bk-act-body="${d(e)}">
            ${f(e,n)}
          </div>
        </div>`}).join(``);function f(e,t){let n={};for(let e of t){let t=new Date(e.date+`T00:00:00`),r=`${t.getFullYear()}-${String(t.getMonth()).padStart(2,`0`)}`,i=t.toLocaleDateString(`fr-FR`,{month:`long`,year:`numeric`});n[r]||(n[r]=[]),n[r].__label=i,n[r].push(e)}return Object.keys(n).sort().map((t,r)=>{let i=`${e}|${t}`,a=n[t],o=a.__label||t,s=o.charAt(0).toUpperCase()+o.slice(1),c=r===0,l=a.map(e=>{let t=new Date(e.date+`T00:00:00`).toLocaleDateString(`fr-FR`,{weekday:`long`,day:`numeric`,month:`long`}),n=e.status===`pending-refusal`;return`
          <div class="gpr__booking ${n?`gpr__booking--pending`:``}">
            <div class="gpr__booking-date">
              <span class="gpr__booking-dot ${n?`gpr__booking-dot--pending`:``}"></span>
              ${d(t)}
              ${e.slot?`<span class="gpr__booking-slot">${d(e.slot)}</span>`:``}
              ${n?`<span class="gpr__booking-pending-label">En attente de validation admin</span>`:``}
            </div>
            ${e.clientName?`
            <div class="gpr__booking-client">
              <svg width="13" height="13" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="5" r="2.6" stroke="currentColor" stroke-width="1.3"/><path d="M2.8 13.5c0-2.7 2.3-4.8 5.2-4.8s5.2 2.1 5.2 4.8" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>
              ${d(e.clientName)}
            </div>`:``}
            <div class="gpr__booking-actions">
              ${e.seen?`<span class="gpr__booking-seen"><svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M2.5 7.5L5.5 10.5L11.5 3.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg> Vu</span>`:`<button type="button" class="gpr__booking-info" data-booking-id="${d(e.id)}">Marquer comme pris en compte</button>`}
              ${n?``:`<button type="button" class="gpr__booking-refuse" data-booking-id="${d(e.id)}" data-booking-date="${d(t)}">Faire part d'un emp&ecirc;chement</button>`}
            </div>
          </div>
        `}).join(``);return`
        <div class="gpr__bk-month">
          <button type="button" class="gpr__bk-month-toggle ${c?`is-open`:``}" data-bk-month="${d(i)}">
            <span class="gpr__bk-month-label">${d(s)}</span>
            <span class="gpr__bk-month-count">${a.length}</span>
            <svg class="gpr__bk-month-arrow" width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M4 5.5l3 3 3-3" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </button>
          <div class="gpr__bk-month-body ${c?``:`is-hidden`}" data-bk-body="${d(i)}">
            ${l}
          </div>
        </div>
      `}).join(``)}t.querySelectorAll(`.gpr__bk-act-toggle`).forEach(e=>{e.addEventListener(`click`,()=>{let n=e.dataset.bkAct,r=t.querySelector(`[data-bk-act-body="${CSS.escape(n)}"]`);if(!r)return;let i=e.classList.toggle(`is-open`);r.classList.toggle(`is-hidden`,!i)})}),t.querySelectorAll(`.gpr__bk-month-toggle`).forEach(e=>{e.addEventListener(`click`,()=>{let n=e.dataset.bkMonth,r=t.querySelector(`[data-bk-body="${CSS.escape(n)}"]`);if(!r)return;let i=e.classList.toggle(`is-open`);r.classList.toggle(`is-hidden`,!i)})}),t.querySelectorAll(`.gpr__booking-info`).forEach(r=>{r.addEventListener(`click`,async()=>{let i=r.dataset.bookingId;r.disabled=!0;let{error:a}=await n.from(`bookings`).update({seen:!0}).eq(`id`,i);if(a){r.disabled=!1,alert(`Une erreur est survenue. Réessayez.`);return}let o=h.find(e=>e.id===i);o&&(o.seen=!0),R(e,t)})}),t.querySelectorAll(`.gpr__booking-refuse`).forEach(t=>{t.addEventListener(`click`,()=>{let n=t.dataset.bookingId,r=t.dataset.bookingDate;B(e,n,r)})})}var z=``;function B(e,t,n){z=t;let r=document.getElementById(`refuse-modal`),i=document.getElementById(`refuse-modal-date`),a=document.getElementById(`refuse-reason`);!r||!i||(i.textContent=n,a&&(a.value=``),r.classList.remove(`is-hidden`))}function V(e){let t=document.getElementById(`refuse-modal`),r=document.getElementById(`refuse-cancel`),i=document.getElementById(`refuse-confirm`);!t||!r||!i||(r.addEventListener(`click`,()=>t.classList.add(`is-hidden`)),t.addEventListener(`click`,e=>{e.target===t&&t.classList.add(`is-hidden`)}),i.addEventListener(`click`,async()=>{let r=document.getElementById(`refuse-reason`).value.trim();if(!r){alert(`Veuillez indiquer une raison.`);return}i.disabled=!0;let{error:a}=await n.from(`bookings`).update({status:`pending-refusal`,refusal_reason:r,refusal_date:new Date().toISOString()}).eq(`id`,z);if(i.disabled=!1,a){alert(`Une erreur est survenue. Veuillez réessayer.`);return}let o=h.find(e=>e.id===z);o&&(o.status=`pending-refusal`,o.refusalReason=r),t.classList.add(`is-hidden`);let s=document.getElementById(`bookings-list`);s&&R(e,s),g.forEach(t=>{I(e,t.slug),N(t.slug)})}))}
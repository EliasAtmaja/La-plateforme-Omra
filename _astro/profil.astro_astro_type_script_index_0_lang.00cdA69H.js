import{a as e,c as t,l as n,o as r,s as i,t as a}from"./supabase.B7wVJYeJ.js";var o=[`Janvier`,`Février`,`Mars`,`Avril`,`Mai`,`Juin`,`Juillet`,`Août`,`Septembre`,`Octobre`,`Novembre`,`Décembre`],s={Français:`🇫🇷`,Arabe:`🇸🇦`,Anglais:`🇬🇧`,Espagnol:`🇪🇸`,Turc:`🇹🇷`,Ourdou:`🇵🇰`,Indonésien:`🇮🇩`,Malais:`🇲🇾`};function c(e){return e.replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`)}var l=[],u={},d={},f=[];function p(){return l}function m(e){return f}async function h(e,t){let r={};Object.keys(t).forEach(e=>{t[e]&&t[e].length>0&&(r[e]=t[e])});let i=Object.keys(r).map(t=>({guide_id:e,date:t,slots:r[t]}));if(i.length>0){let{error:e}=await n.from(`availability`).upsert(i,{onConflict:`guide_id,date`});if(e)return alert(`L'enregistrement a échoué : ${e.message}\n\nVos disponibilités n'ont PAS été modifiées.`),!1}let{data:a,error:o}=await n.from(`availability`).select(`date`).eq(`guide_id`,e);if(!o&&a){let t=a.map(e=>e.date).filter(e=>!r[e]);if(t.length>0){let{error:r}=await n.from(`availability`).delete().eq(`guide_id`,e).in(`date`,t);r&&alert(`Certains jours n'ont pas pu être retirés : ${r.message}`)}}return u=r,!0}function g(e,t){let n=t[e]||[],r=d[e]||[];return r.includes(`*`)?[]:n.filter(e=>!r.includes(e))}var _,v,y=!1,b={},x=null,S=new URLSearchParams(window.location.search),C=S.get(`id`),w=!1,T=document.getElementById(`profile-section`);function E(){T.innerHTML=`<div class="gpr__error"><p>Guide introuvable.</p><a href="/guides/">Retour aux guides</a></div>`}(async function(){if(!C){E();return}let{data:o}=await n.from(`guides`).select(`*`).eq(`id`,C).maybeSingle();if(!o){E();return}let s=i(o);if(S.get(`login`)===`1`){let{data:t}=await n.auth.getSession(),r=t.session?.user;r&&(w=s.authUserId&&r.id===s.authUserId?!0:await e())}let[c,p,m]=await Promise.all([n.from(`reviews`).select(`*`).eq(`guide_id`,C),n.from(`availability`).select(`date, slots`).eq(`guide_id`,C),n.from(`booked_dates`).select(`date, slot`).eq(`guide_id`,C)]);if(l=(c.data||[]).map(t).filter(e=>e.status===`approved`),p.error&&w&&alert(`Erreur de chargement des disponibilités : ${p.error.message}\n\n(La migration SQL « créneaux » a-t-elle été exécutée dans Supabase ?)`),u={},(p.data||[]).forEach(e=>{u[e.date]=e.slots||a.slice()}),d={},(m.data||[]).forEach(e=>{(d[e.date]=d[e.date]||[]).push(e.slot||`*`)}),w){let{data:e}=await n.from(`bookings`).select(`*`).eq(`guide_id`,C).order(`date`);f=(e||[]).map(r).filter(e=>e.status!==`reassigned`)}O(s)})();function D(e){let t=Date.now(),n=new Date(e).getTime(),r=Math.floor((t-n)/1e3);if(r<60)return`A l'instant`;if(r<3600)return`Il y a ${Math.floor(r/60)} min`;if(r<86400)return`Il y a ${Math.floor(r/3600)}h`;let i=Math.floor(r/86400);if(i===1)return`Il y a 1 jour`;if(i<7)return`Il y a ${i} jours`;let a=Math.floor(i/7);if(a===1)return`Il y a 1 semaine`;if(a<5)return`Il y a ${a} semaines`;let o=Math.floor(i/30);return o===1?`Il y a 1 mois`:`Il y a ${o} mois`}function O(e){let t=e.city===`medina`?`Medine`:`La Mecque`,r=(e.firstName?.[0]||``)+(e.lastName?.[0]||``),i=e.city===`medina`?`/assets/images/madinah-bg.jpg`:`/assets/images/makkah-bg.jpg`,o=p().filter(t=>t.guideId===e.id&&t.status===`approved`),l=o.length>0?o.reduce((e,t)=>e+(t.stars||5),0)/o.length:0,u=[0,0,0,0,0];o.forEach(e=>{u[(e.stars||5)-1]++});let d=Math.max(...u,1);document.title=`${e.firstName} ${e.lastName} | La plateforme Omra`;let f=e.photo?`<div class="gpr__avatar" style="background-image:url(${e.photo})"></div>`:`<div class="gpr__avatar gpr__avatar--initials gpr__avatar--${e.city}">${c(r)}</div>`,m=(e.languages||[]).map(e=>`<span class="gpr__lang-chip">${s[e]||`🌐`} ${c(e)}</span>`).join(``),h=[`Accompagnement personnalise`,`Itineraires sur mesure`,`Conseils & bonnes adresses`,`Support avant, pendant et apres`],g=o.length===0?`<p class="gpr__no-reviews">Aucun avis pour le moment.</p>`:o.map(e=>{let t=e.date?D(e.date):``,n=(e.name||`A`)[0].toUpperCase();return`
            <div class="gpr__rv-card">
              <div class="gpr__rv-top">
                ${e.photo?`<div class="gpr__rv-avatar" style="background-image:url(${e.photo})"></div>`:`<div class="gpr__rv-avatar gpr__rv-avatar--initials">${n}</div>`}
                <div class="gpr__rv-meta">
                  <span class="gpr__rv-name">${c(e.name||`Anonyme`)}</span>
                  <span class="gpr__rv-stars">${k(e.stars||5)}</span>
                  <span class="gpr__rv-date">${t}</span>
                </div>
              </div>
              <p class="gpr__rv-text">${c(e.text||``)}</p>
            </div>
          `}).join(``),_=[5,4,3,2,1].map(e=>{let t=u[e-1],n=t/d*100;return`
        <div class="gpr__bar-row">
          <span class="gpr__bar-label">${e} etoile${e>1?`s`:``}</span>
          <span class="gpr__bar-dot">●</span>
          <div class="gpr__bar-track"><div class="gpr__bar-fill" style="width:${n}%"></div></div>
          <span class="gpr__bar-count">${t}</span>
        </div>
      `}).join(``);T.innerHTML=`
      ${w?`
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
          ${f}
          <span class="gpr__city-pill gpr__city-pill--${e.city}">
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M8 1.5C5 1.5 2.5 4 2.5 7c0 4 5.5 7.5 5.5 7.5s5.5-3.5 5.5-7.5c0-3-2.5-5.5-5.5-5.5z" stroke="currentColor" stroke-width="1.2"/><circle cx="8" cy="7" r="2" stroke="currentColor" stroke-width="1.2"/></svg>
            ${c(t)}
          </span>
          <h1 class="gpr__name">${c(e.firstName)} ${c(e.lastName)}
            <svg class="gpr__verified" width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill="#14513A"/><path d="M7.5 12.5l3 3 6-6" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </h1>
          <p class="gpr__subtitle">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M8 1.5C5 1.5 2.5 4 2.5 7c0 4 5.5 7.5 5.5 7.5s5.5-3.5 5.5-7.5c0-3-2.5-5.5-5.5-5.5z" stroke="currentColor" stroke-width="1.2"/><circle cx="8" cy="7" r="2" stroke="currentColor" stroke-width="1.2"/></svg>
            Guide certifié${e.diploma?`  &middot;  ${c(e.diploma)}`:``}
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
          <p class="gpr__bio">${c(e.description)}</p>
        </div>
        `:``}

        ${(e.languages||[]).length>0?`
        <!-- LANGUES -->
        <div class="gpr__card gpr__card--langs">
          <div class="gpr__card-icon">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><circle cx="11" cy="11" r="9" stroke="currentColor" stroke-width="1.4"/><ellipse cx="11" cy="11" rx="4" ry="9" stroke="currentColor" stroke-width="1.2"/><path d="M2.5 8.5h17M2.5 13.5h17" stroke="currentColor" stroke-width="1.1"/></svg>
          </div>
          <h2 class="gpr__card-title">Langues parlées</h2>
          <div class="gpr__langs">${m}</div>
        </div>
        `:``}

        ${e.pricePerDay?`
        <!-- TARIFS -->
        <div class="gpr__card gpr__card--price">
          <div class="gpr__card-icon">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M12 2v18M7.5 6.5h6.75a2.75 2.75 0 010 5.5H6.5h8.25a2.75 2.75 0 010 5.5H7" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </div>
          <h2 class="gpr__card-title">Tarifs</h2>
          <div class="gpr__price-layout">
            <div class="gpr__price-left">
              <span class="gpr__price-amount">${c(String(e.pricePerDay))}<span class="gpr__price-currency">&euro;</span></span>
              <span class="gpr__price-note">Frais inclus</span>
            </div>
            <div class="gpr__price-right">
              ${h.map(e=>`
                <div class="gpr__price-feat">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" fill="#EDF5F0"/><path d="M5 8.2l2 2 4-4" stroke="#14513A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                  <span>${e}</span>
                </div>
              `).join(``)}
            </div>
          </div>
        </div>
        `:``}

        <!-- CTA DISPONIBILITES -->
        <div class="gpr__cta-card" id="cta-dispo">
          <div class="gpr__cta-left">
            <div class="gpr__cta-icon">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none"><rect x="3" y="5" width="22" height="20" rx="3" stroke="currentColor" stroke-width="1.5"/><path d="M3 11h22M9 2v5M19 2v5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="10" cy="17" r="1.5" fill="currentColor"/><circle cx="14" cy="17" r="1.5" fill="currentColor"/><circle cx="18" cy="17" r="1.5" fill="currentColor"/></svg>
            </div>
            <div>
              <h2 class="gpr__cta-title">Les disponibilités</h2>
              <p class="gpr__cta-sub">Consultez les dates disponibles et réservez votre guide en quelques clics.</p>
            </div>
          </div>
          <button type="button" class="gpr__cta-btn" id="scroll-to-cal">
            Voir le calendrier
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 3l5 5-5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </button>
        </div>

        <!-- CALENDRIER (hidden par defaut, ouvert via CTA) -->
        <div class="gpr__card gpr__card--cal is-hidden" id="cal-section">
          <div class="gpr__card-header-row">
            <h2 class="gpr__card-title">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="2" y="3" width="16" height="15" rx="2.5" stroke="currentColor" stroke-width="1.4"/><path d="M2 8h16M6 1v4M14 1v4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>
              Calendrier
            </h2>
            ${w?`<button type="button" class="gpr__cal-edit-btn" id="cal-edit-btn">Modifier</button>`:``}
          </div>
          <div class="gpr__cal-nav">
            <button type="button" class="gpr__cal-arrow" id="cal-prev">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M11 4L6 9l5 5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </button>
            <span class="gpr__cal-month" id="cal-month"></span>
            <button type="button" class="gpr__cal-arrow" id="cal-next">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M7 4l5 5-5 5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </button>
          </div>
          <div class="gpr__cal-weekdays">
            <span>LUN</span><span>MAR</span><span>MER</span><span>JEU</span><span>VEN</span><span>SAM</span><span>DIM</span>
          </div>
          <div class="gpr__cal-grid" id="cal-grid"></div>
          <div class="gpr__cal-legend">
            <span class="gpr__cal-legend-item"><span class="gpr__cal-dot gpr__cal-dot--avail"></span> Disponible</span>
            <span class="gpr__cal-legend-item"><span class="gpr__cal-dot gpr__cal-dot--busy"></span> Indisponible</span>
            ${w?`<span class="gpr__cal-legend-item"><span class="gpr__cal-dot gpr__cal-dot--booked"></span> Réservé</span>`:``}
          </div>
          ${w?`
          <div class="gpr__slot-editor is-hidden" id="slot-editor">
            <p class="gpr__slot-editor-title" id="slot-editor-title"></p>
            <div class="gpr__slot-editor-chips">
              ${a.map(e=>`<button type="button" class="gpr__slot-chip" data-eslot="${e}">${e}</button>`).join(``)}
            </div>
            <button type="button" class="gpr__slot-dayoff" id="slot-dayoff">Rendre ce jour indisponible</button>
          </div>
          `:``}
          <div class="gpr__cal-edit-tools is-hidden" id="cal-edit-tools">
            <label class="gpr__check-all">
              <input type="checkbox" id="check-all-month" />
              <span>Cocher tout le mois</span>
            </label>
            <button type="button" class="gpr__cal-save-btn" id="cal-save-btn">Enregistrer</button>
          </div>
        </div>

        ${w?`
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
          ${o.length>0?`
            <div class="gpr__rating-layout">
              <div class="gpr__rating-left">
                <div class="gpr__rating-big-star">
                  <svg width="28" height="28" viewBox="0 0 20 20" fill="#D4A843"><path d="M10 1.5l2.5 5 5.5.8-4 3.9.9 5.5-4.9-2.6L5.1 16.7l.9-5.5-4-3.9 5.5-.8L10 1.5z"/></svg>
                </div>
                <span class="gpr__rating-num">${l.toFixed(1)}</span>
                <span class="gpr__rating-slash">/ 5</span>
                <div class="gpr__rating-stars">${k(l)}</div>
                <span class="gpr__rating-count">Basee sur ${o.length} avis</span>
              </div>
              <div class="gpr__rating-bars">
                ${_}
              </div>
            </div>
          `:`<p class="gpr__no-reviews">Aucun avis pour le moment.</p>`}
        </div>

        <!-- LES AVIS -->
        <div class="gpr__card gpr__card--reviews">
          <div class="gpr__card-icon">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M4 4h14a2 2 0 012 2v8a2 2 0 01-2 2H8l-4 3v-3a2 2 0 01-2-2V6a2 2 0 012-2z" stroke="currentColor" stroke-width="1.4"/></svg>
          </div>
          <h2 class="gpr__card-title">Les avis${o.length>0?` (${o.length})`:``}</h2>
          <div class="gpr__rv-list" id="reviews-list">
            ${g}
          </div>

          <!-- FORM -->
          <div class="gpr__rv-form-wrap">
            <h3 class="gpr__rv-form-title">Laisser un avis</h3>
            <form class="gpr__rv-form" id="review-form">
              <div class="gpr__rf-stars" id="rf-stars">
                ${[1,2,3,4,5].map(e=>`
                  <button type="button" class="gpr__rf-star" data-star="${e}" aria-label="${e} etoile${e>1?`s`:``}">
                    <svg viewBox="0 0 20 20" width="32" height="32"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                  </button>
                `).join(``)}
              </div>
              <input type="text" name="reviewer-name" class="gpr__rf-input" placeholder="Votre nom" required />
              <textarea name="reviewer-text" class="gpr__rf-textarea" rows="3" placeholder="Partagez votre experience..." required></textarea>
              <button type="submit" class="gpr__rf-submit" id="rf-submit" disabled>Publier mon avis</button>
              <div class="gpr__rf-success is-hidden" id="rf-success">
                <p>Merci ! Votre avis a &eacute;t&eacute; envoy&eacute; et sera publi&eacute; apr&egrave;s validation.</p>
              </div>
            </form>
          </div>
        </div>

      </div>

      ${w?`
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
    `,document.getElementById(`guide-logout`)?.addEventListener(`click`,async()=>{let{data:t}=await n.auth.getUser();t.user&&e.authUserId&&t.user.id===e.authUserId&&await n.auth.signOut(),window.location.href=`/guides/profil/?id=${e.id}`});try{A(e)}catch(e){console.error(`Calendar init error:`,e)}try{P(e)}catch(e){console.error(`Review form init error:`,e)}try{F()}catch(e){console.error(`Scroll btn init error:`,e)}try{I(e)}catch(e){console.error(`Bookings init error:`,e)}try{B(e)}catch(e){console.error(`Refuse modal init error:`,e)}}function k(e){let t=``;for(let n=1;n<=5;n++)n<=Math.floor(e)?t+=`<span class="gpr__star gpr__star--full">&#9733;</span>`:n-e<1&&n-e>0?t+=`<span class="gpr__star gpr__star--half">&#9733;</span>`:t+=`<span class="gpr__star gpr__star--empty">&#9734;</span>`;return t}function A(e){let t=new Date;_=t.getMonth(),v=t.getFullYear(),b=JSON.parse(JSON.stringify(u)),N(e),j(e),document.getElementById(`cal-prev`)?.addEventListener(`click`,()=>{_--,_<0&&(_=11,v--),N(e)}),document.getElementById(`cal-next`)?.addEventListener(`click`,()=>{_++,_>11&&(_=0,v++),N(e)});let n=document.getElementById(`cal-edit-btn`),r=document.getElementById(`cal-edit-tools`),i=document.getElementById(`cal-save-btn`),o=document.getElementById(`check-all-month`);n&&r&&i&&(n.addEventListener(`click`,()=>{y=!0,b=JSON.parse(JSON.stringify(u)),x=null,n.classList.add(`is-hidden`),r.classList.remove(`is-hidden`),N(e),M(e)}),i.addEventListener(`click`,async()=>{i.disabled=!0,i.textContent=`Enregistrement...`;let t=await h(e.id,b);i.disabled=!1,i.textContent=`Enregistrer`,t&&(y=!1,x=null,n.classList.remove(`is-hidden`),r.classList.add(`is-hidden`),N(e),M(e))}),o&&o.addEventListener(`change`,()=>{let t=new Date(v,_+1,0).getDate(),n=new Date;n.setHours(0,0,0,0);for(let e=1;e<=t;e++){let t=`${v}-${String(_+1).padStart(2,`0`)}-${String(e).padStart(2,`0`)}`;new Date(v,_,e)<n||(o.checked?b[t]||(b[t]=a.slice()):delete b[t])}x=null,N(e),M(e)}))}function j(e){let t=document.getElementById(`slot-editor`);t&&(t.querySelectorAll(`[data-eslot]`).forEach(t=>{t.addEventListener(`click`,()=>{if(!x)return;let n=t.dataset.eslot,r=d[x]||[];if(r.includes(n)||r.includes(`*`))return;let i=b[x]||[];i.includes(n)?(b[x]=i.filter(e=>e!==n),b[x].length===0&&delete b[x]):b[x]=[...i,n],N(e),M(e)})}),document.getElementById(`slot-dayoff`)?.addEventListener(`click`,()=>{if(x){if((d[x]||[]).length>0){alert(`Ce jour a déjà une réservation : signalez un empêchement depuis vos réservations.`);return}delete b[x],x=null,N(e),M(e)}}))}function M(e){let t=document.getElementById(`slot-editor`),n=document.getElementById(`slot-editor-title`);if(!t||!n)return;if(!y||!x){t.classList.add(`is-hidden`);return}let[r,i,a]=x.split(`-`).map(Number);n.textContent=`Créneaux du ${new Date(r,i-1,a).toLocaleDateString(`fr-FR`,{weekday:`long`,day:`numeric`,month:`long`})}`;let o=b[x]||[],s=d[x]||[];t.querySelectorAll(`[data-eslot]`).forEach(e=>{let t=e.dataset.eslot,n=s.includes(t)||s.includes(`*`);e.classList.toggle(`is-on`,o.includes(t)||n),e.classList.toggle(`is-booked`,n),e.disabled=n}),t.classList.remove(`is-hidden`)}function N(e){let t=document.getElementById(`cal-grid`),n=document.getElementById(`cal-month`);if(!t||!n)return;n.textContent=`${o[_]} ${v}`;let r=y?b:u,i=new Date(v,_,1).getDay(),s=i===0?6:i-1,c=new Date(v,_+1,0).getDate(),l=new Date;l.setHours(0,0,0,0);let f=``;for(let e=0;e<s;e++)f+=`<span class="gpr__cal-cell gpr__cal-cell--empty"></span>`;for(let e=1;e<=c;e++){let t=`${v}-${String(_+1).padStart(2,`0`)}-${String(e).padStart(2,`0`)}`,n=new Date(v,_,e)<l,i=r[t]||[],o=(d[t]||[]).length>0,s=g(t,r),c=o&&s.length===0,u=`gpr__cal-cell`;n?u+=` gpr__cal-cell--past`:w&&c?u+=` gpr__cal-cell--booked`:s.length>0?(u+=` gpr__cal-cell--avail`,(i.length<a.length||o)&&(u+=` gpr__cal-cell--partial`)):u+=` gpr__cal-cell--busy`,y&&!n&&(u+=` gpr__cal-cell--editable`),y&&x===t&&(u+=` gpr__cal-cell--editsel`),f+=`<button type="button" class="${u}" data-date="${t}" ${n?`disabled`:``}>${e}</button>`}t.innerHTML=f;let p=document.getElementById(`check-all-month`);if(p&&y){let e=!0;for(let t=1;t<=c;t++){let n=`${v}-${String(_+1).padStart(2,`0`)}-${String(t).padStart(2,`0`)}`;if(!(new Date(v,_,t)<l)&&(!r[n]||r[n].length===0)){e=!1;break}}p.checked=e}y&&t.querySelectorAll(`.gpr__cal-cell--editable`).forEach(t=>{t.addEventListener(`click`,()=>{let n=t.dataset.date;x===n?x=null:(b[n]||(b[n]=a.slice()),x=n),N(e),M(e)})})}function P(e){let t=0,r=document.querySelectorAll(`#rf-stars .gpr__rf-star`),i=document.getElementById(`rf-submit`),a=document.getElementById(`review-form`);r.forEach(e=>{e.addEventListener(`click`,()=>{t=parseInt(e.dataset.star),r.forEach((e,n)=>e.classList.toggle(`gpr__rf-star--active`,n<t)),i.disabled=!1}),e.addEventListener(`mouseenter`,()=>{let t=parseInt(e.dataset.star);r.forEach((e,n)=>e.classList.toggle(`gpr__rf-star--hover`,n<t))}),e.addEventListener(`mouseleave`,()=>{r.forEach(e=>e.classList.remove(`gpr__rf-star--hover`))})}),a.addEventListener(`submit`,async r=>{if(r.preventDefault(),t===0)return;let o=a.querySelector(`[name="reviewer-name"]`).value.trim(),s=a.querySelector(`[name="reviewer-text"]`).value.trim();if(!o||!s)return;i.disabled=!0;let{error:c}=await n.from(`reviews`).insert({guide_id:e.id,name:o,text:s,stars:t,service:`Guide - ${e.firstName} ${e.lastName}`,status:`pending`});if(i.disabled=!1,c){alert(`Une erreur est survenue lors de l'envoi. Veuillez réessayer.`);return}a.classList.add(`is-hidden`),document.getElementById(`rf-success`).classList.remove(`is-hidden`)})}function F(){document.getElementById(`scroll-to-cal`)?.addEventListener(`click`,()=>{let e=document.getElementById(`cal-section`);e&&(e.classList.contains(`is-hidden`)?(e.classList.remove(`is-hidden`),e.scrollIntoView({behavior:`smooth`,block:`center`})):e.classList.add(`is-hidden`))})}function I(e){let t=document.getElementById(`bookings-list`);t&&L(e,t)}function L(e,t){let r=m(e.id);if(r.length===0){t.innerHTML=`<p class="gpr__no-reviews">Aucune réservation pour le moment.</p>`;return}t.innerHTML=r.sort((e,t)=>e.date.localeCompare(t.date)).map(e=>{let t=new Date(e.date+`T00:00:00`).toLocaleDateString(`fr-FR`,{weekday:`long`,day:`numeric`,month:`long`,year:`numeric`}),n=e.status===`pending-refusal`;return`
        <div class="gpr__booking ${n?`gpr__booking--pending`:``}">
          <div class="gpr__booking-date">
            <span class="gpr__booking-dot ${n?`gpr__booking-dot--pending`:``}"></span>
            ${c(t)}
            ${e.slot?`<span class="gpr__booking-slot">${c(e.slot)}</span>`:``}
            ${e.activityName?`<span class="gpr__booking-activity">${c(e.activityName)}</span>`:``}
            ${n?`<span class="gpr__booking-pending-label">En attente de validation admin</span>`:``}
          </div>
          <div class="gpr__booking-actions">
            ${e.seen?`<span class="gpr__booking-seen"><svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M2.5 7.5L5.5 10.5L11.5 3.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg> Vu</span>`:`<button type="button" class="gpr__booking-info" data-booking-id="${c(e.id)}">Marquer comme vu</button>`}
            ${n?``:`<button type="button" class="gpr__booking-refuse" data-booking-id="${c(e.id)}" data-booking-date="${c(t)}">Faire part d'un emp&ecirc;chement</button>`}
          </div>
        </div>
      `}).join(``),t.querySelectorAll(`.gpr__booking-info`).forEach(r=>{r.addEventListener(`click`,async()=>{let i=r.dataset.bookingId;r.disabled=!0;let{error:a}=await n.from(`bookings`).update({seen:!0}).eq(`id`,i);if(a){r.disabled=!1,alert(`Une erreur est survenue. Réessayez.`);return}let o=f.find(e=>e.id===i);o&&(o.seen=!0),L(e,t)})}),t.querySelectorAll(`.gpr__booking-refuse`).forEach(t=>{t.addEventListener(`click`,()=>{let n=t.dataset.bookingId,r=t.dataset.bookingDate;z(e,n,r)})})}var R=``;function z(e,t,n){R=t;let r=document.getElementById(`refuse-modal`),i=document.getElementById(`refuse-modal-date`),a=document.getElementById(`refuse-reason`);!r||!i||(i.textContent=n,a&&(a.value=``),r.classList.remove(`is-hidden`))}function B(e){let t=document.getElementById(`refuse-modal`),r=document.getElementById(`refuse-cancel`),i=document.getElementById(`refuse-confirm`);!t||!r||!i||(r.addEventListener(`click`,()=>t.classList.add(`is-hidden`)),t.addEventListener(`click`,e=>{e.target===t&&t.classList.add(`is-hidden`)}),i.addEventListener(`click`,async()=>{let r=document.getElementById(`refuse-reason`).value.trim();if(!r){alert(`Veuillez indiquer une raison.`);return}i.disabled=!0;let{error:a}=await n.from(`bookings`).update({status:`pending-refusal`,refusal_reason:r,refusal_date:new Date().toISOString()}).eq(`id`,R);if(i.disabled=!1,a){alert(`Une erreur est survenue. Veuillez réessayer.`);return}let o=f.find(e=>e.id===R);o&&(o.status=`pending-refusal`,o.refusalReason=r),t.classList.add(`is-hidden`);let s=document.getElementById(`bookings-list`);s&&L(e,s),N(e)}))}
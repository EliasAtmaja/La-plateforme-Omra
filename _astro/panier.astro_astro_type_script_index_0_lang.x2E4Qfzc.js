import{l as e}from"./supabase.B7wVJYeJ.js";function t(e){return String(e).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`)}function n(){return JSON.parse(localStorage.getItem(`omra-cart`)||`[]`)}function r(e){localStorage.setItem(`omra-cart`,JSON.stringify(e))}function i(e){if(!e)return``;let[t,n,r]=e.split(`-`).map(Number);return new Date(t,n-1,r).toLocaleDateString(`fr-FR`,{weekday:`long`,day:`numeric`,month:`long`,year:`numeric`})}function a(){let o=n(),s=document.getElementById(`cart-page-sub`),c=document.getElementById(`cart-page-empty`),l=document.getElementById(`cart-page-content`),u=document.getElementById(`cart-page-items`),d=document.getElementById(`cart-page-rows`),f=document.getElementById(`cart-page-total`);if(!c||!l||!u||!d||!f)return;if(s&&(s.textContent=o.length===0?``:`${o.length} réservation${o.length>1?`s`:``} en attente de paiement`),o.length===0){c.classList.remove(`is-hidden`),l.classList.add(`is-hidden`);return}c.classList.add(`is-hidden`),l.classList.remove(`is-hidden`);let p=0;u.innerHTML=o.map(e=>{let n=e.price||0;p+=n;let r=(e.guideName||`G`).split(` `).map(e=>e[0]||``).join(``).slice(0,2);return`
        <article class="cart-item">
          ${e.guidePhoto?`<span class="cart-item__av" style="background-image:url(${e.guidePhoto})"></span>`:`<span class="cart-item__av cart-item__av--initials">${t(r)}</span>`}
          <div class="cart-item__info">
            <h3 class="cart-item__name">${t(e.guideName||`Guide`)}</h3>
            <div class="cart-item__details">
              <span class="cart-item__detail">
                <svg width="13" height="13" viewBox="0 0 20 20" fill="none"><rect x="3" y="4.5" width="14" height="12.5" rx="2" stroke="currentColor" stroke-width="1.4"/><path d="M3 8.5h14M7 3v3M13 3v3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>
                ${t(i(e.date))}
              </span>
              ${e.slot?`<span class="cart-item__detail"><svg width="13" height="13" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="7" stroke="currentColor" stroke-width="1.4"/><path d="M10 6.5V10l3 2" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>${t(e.slot)}</span>`:``}
              ${e.activityName?`<span class="cart-item__detail"><svg width="13" height="13" viewBox="0 0 20 20" fill="none"><path d="M10 2l2.4 5 5.6.8-4 4 1 5.7-5-2.7-5 2.7 1-5.7-4-4L7.6 7 10 2z" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/></svg>${t(e.activityName)}</span>`:``}
            </div>
          </div>
          <div class="cart-item__right">
            ${n?`<span class="cart-item__price">${n}&euro;</span>`:``}
            <button type="button" class="cart-item__remove" data-remove="${t(e.bookingId)}">
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M3 4h8M5.5 4V3a1 1 0 011-1h1a1 1 0 011 1v1M4.5 4v7a1.5 1.5 0 001.5 1.5h2a1.5 1.5 0 001.5-1.5V4" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
              Retirer
            </button>
          </div>
        </article>
      `}).join(``),d.innerHTML=o.map(e=>{let n=e.price||0;return`<div class="cart-summary__row"><span>${t(e.guideName||`Guide`)}</span><span>${n?n+`€`:`—`}</span></div>`}).join(``),f.textContent=p+`€`,u.querySelectorAll(`[data-remove]`).forEach(t=>{t.addEventListener(`click`,async i=>{i.stopPropagation();let o=t.dataset.remove,s=n().find(e=>e.bookingId===o);if(s)try{await e.rpc(`cancel_booking`,{p_booking_id:s.bookingId,p_token:s.cancelToken})}catch{}r(n().filter(e=>e.bookingId!==o)),window.dispatchEvent(new Event(`cart-updated`)),a()})})}document.getElementById(`cart-page-pay`)?.addEventListener(`click`,()=>{alert(`Page de paiement à venir`)}),a(),window.addEventListener(`cart-updated`,a);
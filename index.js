import{a as g,i as $,S as C,N as B}from"./assets/vendor-DircHDZc.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const n of s)if(n.type==="childList")for(const d of n.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&r(d)}).observe(document,{childList:!0,subtree:!0});function o(s){const n={};return s.integrity&&(n.integrity=s.integrity),s.referrerPolicy&&(n.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?n.credentials="include":s.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function r(s){if(s.ep)return;s.ep=!0;const n=o(s);fetch(s.href,n)}})();const u={modalMenuMobile:document.querySelector(".js-nav-mobile"),openMenuMobile:document.querySelector(".js-burger-menu"),closeMenuMobile:document.querySelector(".js-burger-button-close"),bodyLock:document.querySelector("body"),bodyUnlock:document.querySelector(".js-active")};function M(){u.modalMenuMobile.classList.toggle("isActive"),u.bodyLock.classList.toggle("lock")}function j(){u.openMenuMobile.addEventListener("click",M),u.closeMenuMobile.addEventListener("click",M),u.bodyUnlock.addEventListener("click",()=>{u.bodyLock.classList.remove("lock"),u.modalMenuMobile.classList.remove("isActive")})}g.defaults.baseURL="https://sound-wave.b.goit.study/api";const I=async(t={})=>{try{return(await g.get("/artists",{params:t})).data}catch(e){throw console.error("Помилка під час завантаження виконавців:",e),e}},x=async(t={})=>{try{return(await g.get("/feedbacks",{params:t})).data}catch(e){throw console.error("Помилка під час завантаження відгуків:",e),e}},H=async t=>{try{return(await g.get(`/artists/${t}`)).data}catch(e){throw console.error(`Помилка під час завантаження виконавця з id ${t}:`,e),e}},O=async t=>{try{return(await g.get(`/artists/${t}/albums`)).data}catch(e){throw console.error(`Помилка під час завантаження альбомів для виконавця з id ${t}:`,e),e}},w="/projectRise/assets/icons-oErLsqgQ.svg";$.settings({position:"topRight",timeout:4500,closeOnClick:!0,progressBar:!0,transitionIn:"fadeInUp",transitionOut:"fadeOut"});const P={error(t="Something went wrong. Please try again."){$.error({title:"Error",message:t,backgroundColor:"var(--color-affair-dark)",titleColor:"var(--color-white)",messageColor:"var(--opacity-white-60)",progressBarColor:"var(--color-affair-light)",overlay:!1})}};function D(t){var e,o;return t!=null&&t.response?`Server error: ${((e=t.response.data)==null?void 0:e.message)||((o=t.response.data)==null?void 0:o.error)||t.message}`:t!=null&&t.request?"Network error: no response from server.":(t==null?void 0:t.message)||"Unexpected error."}const a={list:null,loadMore:null},c={page:1,limit:8,total:0,loading:!1,lastBatchCount:0};document.addEventListener("DOMContentLoaded",()=>{if(a.list=document.getElementById("artists-list"),a.loadMore=document.getElementById("artists-load-more"),!a.list||!a.loadMore){console.warn("[Artists] Section markup not found");return}U()});function U(){F(),a.loadMore.addEventListener("click",z),a.list.addEventListener("click",K)}async function F(){c.page=1,a.list.innerHTML="",await k(c.page)}async function z(){await k(c.page+1)}async function k(t){if(!c.loading){E(!0);try{const e=await I({page:t,limit:c.limit}),{items:o,page:r,limit:s,total:n}=R(e,t,c.limit);c.page=r,c.limit=s,c.total=n,c.lastBatchCount=o.length,V(o),_(),G()}catch(e){console.error(e),P.error(D(e))}finally{E(!1)}}}function R(t,e,o){const r=Array.isArray(t==null?void 0:t.artists)?t.artists:[],s=Number((t==null?void 0:t.totalArtists)??0)||0,n=Number((t==null?void 0:t.page)??e)||e,d=Number((t==null?void 0:t.limit)??o)||o;return{items:r.map(Y),total:s,page:n,limit:d}}function Y(t){const e=t._id,o=t.strArtist,r=t.strArtistThumb||"",s=Array.isArray(t.genres)?t.genres.filter(Boolean):[],n=t.strBiographyEN||"";return{id:e,name:o,photo:r,genres:s,short:n}}function V(t){const e=t.map(W).join("");a.list.insertAdjacentHTML("beforeend",e)}function W(t){const e=(t.genres||[]).map(o=>`<span class="tag">${h(o)}</span>`).join("");return`
    <li class="artist-card" data-id="${t.id}">
      ${t.photo?`<img class="artist-cover" src="${t.photo}" alt="${h(t.name)}" loading="lazy" />`:""}
      <div class="tags">${e}</div>
      <h4 class="artist-name">${h(t.name)}</h4>
      <p class="artist-desc">${h(t.short)}</p>
      <div class="card-actions">
        <button class="link-more" type="button" data-learn-more>
          Learn More
          <svg class="icon-learn-more" width="24" height="24" aria-hidden="true">
            <use href="${w}#icon-filled-arrow"></use>
          </svg>
        </button>
      </div>
    </li>
  `}function _(){if(!a.loadMore)return;const t=a.list.children.length,e=c.total>0&&t>=c.total;a.loadMore.hidden=!1,a.loadMore.disabled=e||c.loading}function G(){a.list.children.length===0&&(a.list.innerHTML='<li class="artists-empty">No artists found</li>')}function E(t){c.loading=t,a.loadMore&&(a.loadMore.disabled=t||a.loadMore.hidden)}function K(t){if(!t.target.closest("[data-learn-more]"))return;const o=t.target.closest(".artist-card"),r=o==null?void 0:o.dataset.id;if(!r)return;const s=new CustomEvent("artists:open",{bubbles:!0,detail:{id:r,fetchDetails:async()=>{try{return await O(r)}catch{return await H(r)}}}});o.dispatchEvent(s)}function h(t=""){return String(t).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}function Q(){const t=document.getElementById("artist-modal"),e=document.getElementById("artist-modal-overlay"),o=document.getElementById("artist-modal-close"),r=t.querySelector(".artist-name"),s=t.querySelector(".artist-image img"),n=t.querySelector(".artist-info"),d=t.querySelector(".artist-bio p"),S=t.querySelector(".artist-genres"),L=t.querySelector(".artist-albums");let p=null;const N=l=>l?l.startsWith("http")?l:`https://www.youtube.com/watch?v=${l}`:"",T=l=>{if(!l||isNaN(l))return"-";const v=Math.floor(l/1e3),y=Math.floor(v/60),i=v%60;return`${y}:${i.toString().padStart(2,"0")}`};document.addEventListener("artists:open",async l=>{const{id:v,fetchDetails:y}=l.detail;try{const i=await y();r.textContent=i.strArtist||"Unknown Artist",s.src=i.strArtistThumb||"",s.alt=i.strArtist||"Artist",n.innerHTML=`
        <li><strong>Years active:</strong> ${i.intFormedYear||"N/A"} – ${i.strDisbanded||"present"}</li>
        <li><strong>Sex:</strong> ${i.strGender||"N/A"}</li>
        <li><strong>Members:</strong> ${i.intMembers||"N/A"}</li>
        <li><strong>Country:</strong> ${i.strCountry||"N/A"}</li>
      `,d.textContent=i.strBiographyEN||"No biography available.",S.innerHTML=(i.genres||[]).map(m=>`<span>${m}</span>`).join(""),i.albumsList&&i.albumsList.length>0?L.innerHTML=i.albumsList.map(m=>`
            <div class="album">
              <h4>${m.strAlbum||"Untitled"}</h4>
              ${Array.isArray(m.tracks)&&m.tracks.length>0?`
                    <table>
                      <thead>
                        <tr><th>Title</th><th>Duration</th><th>Link</th></tr>
                      </thead>
                      <tbody>
                        ${m.tracks.map(f=>`
                            <tr>
                              <td>${f.strTrack||"N/A"}</td>
                              <td>${T(f.intDuration)}</td>
                              <td>${f.movie?`<a href="${N(f.movie)}" target="_blank" rel="noopener noreferrer">▶</a>`:'<span style="opacity: 0.5;">—</span>'}</td>
                            </tr>
                          `).join("")}
                      </tbody>
                    </table>
                  `:"<p>No tracks</p>"}
            </div>
          `).join(""):L.innerHTML="<p>No albums found</p>",q()}catch(i){console.error("Modal error:",i)}});function q(){p=document.activeElement,t.setAttribute("aria-hidden","false"),t.classList.add("open"),o.focus()}function b(){document.activeElement&&document.activeElement.blur(),t.setAttribute("aria-hidden","true"),t.classList.remove("open"),p&&p.focus()}o.addEventListener("click",b),e.addEventListener("click",b),document.addEventListener("keydown",l=>{l.key==="Escape"&&b()})}async function J(){const{data:t}=await x({limit:10,page:1}),e=document.querySelector(".swiper-wrapper");e.innerHTML=t.map(o=>`
    <div class="swiper-slide">
      <div class="feedback-slide">
        <div class="rating" data-score="${o.rating}"></div>
        <p class="feedback-text">${o.descr}</p>
        <h4 class="feedback-name">${o.name}</h4>
      </div>
    </div>
      `).join(""),X(),new C(".swiper",{modules:[B],slidesPerView:1,navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},allowTouchMove:!0,on:{init(){Z(this),A(this)},slideChange(){A(this)}}})}function X(){document.querySelectorAll(".rating").forEach(e=>{const o=parseInt(e.dataset.score,10)||0;e.innerHTML="";for(let r=1;r<=5;r++){const s=`
        <svg width="20" height="20" class="star" style="fill: ${r<=o?"var(--color-affair)":"var(--color-scheme-1-text)"}">
          <use href="${w}#icon-star"></use>
        </svg>
      `;e.insertAdjacentHTML("beforeend",s)}})}function Z(t){const e=document.querySelector(".swiper-pagination");e.innerHTML="",["first","middle","last"].forEach(r=>{const s=document.createElement("button");s.classList.add("custom-dot",`dot-${r}`),s.setAttribute("type","button"),s.addEventListener("click",()=>{r==="first"&&t.slideTo(0),r==="middle"&&t.slideTo(Math.floor(t.slides.length/2)),r==="last"&&t.slideTo(t.slides.length-1)}),e.appendChild(s)})}function A(t){document.querySelectorAll(".custom-dot").forEach(o=>o.classList.remove("active")),t.realIndex===0?document.querySelector(".dot-first").classList.add("active"):t.realIndex===t.slides.length-1?document.querySelector(".dot-last").classList.add("active"):document.querySelector(".dot-middle").classList.add("active")}J();j();document.addEventListener("DOMContentLoaded",()=>{Q()});
//# sourceMappingURL=index.js.map

(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function t(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerpolicy&&(r.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?r.credentials="include":e.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(e){if(e.ep)return;e.ep=!0;const r=t(e);fetch(e.href,r)}})();const l="https://pixabay.com/api/",d="40888017-179b7a421750c84ea86ef3d3f";function u(s){const o=new URLSearchParams({key:d,q:s,image_type:"photo",orientation:"horizontal",safesearch:"true"});return fetch(`${l}?${o}`).then(t=>{if(!t.ok)throw new Error(t.statusText);return t.json()})}const a=document.querySelector(".search-form"),f=document.querySelector(".card-list");a.addEventListener("submit",p);function p(s){s.preventDefault();const o=a.searchQuery.value;u(o).then(t=>{f.innerHTML=h(t.hits)}).catch(t=>console.log(t)),a.reset()}function h(s){return s.map(({webformatURL:o,largeImageURL:t,tags:i,likes:e,views:r,comments:n,downloads:c})=>`
    <li class="card-item">
      <img src="${o}" alt="${i}" data-largeImage="${t}" class="image" />
      <div class="card-stats">
        <div class="wrapper">
          <h3>Likes</h3>
          <p>${e}</p>
        </div>
        <div class="wrapper">
          <h3>Views</h3>
          <p>${r}</p>
        </div>
        <div class="wrapper">
          <h3>Comments</h3>
          <p>${n}</p>
        </div>
        <div class="wrapper">
          <h3>Downloads</h3>
          <p>${c}</p>
        </div>
      </div>
    </li>`).join("")}
//# sourceMappingURL=commonHelpers.js.map

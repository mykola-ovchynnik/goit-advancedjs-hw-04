import{a as c,S as y,i as f}from"./assets/vendor-f67ecabd.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function i(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerpolicy&&(r.referrerPolicy=o.referrerpolicy),o.crossorigin==="use-credentials"?r.credentials="include":o.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(o){if(o.ep)return;o.ep=!0;const r=i(o);fetch(o.href,r)}})();const b="https://pixabay.com/api/",w="40888017-179b7a421750c84ea86ef3d3f";c.defaults.baseURL=b;c.defaults.params={key:w,image_type:"photo",orientation:"horizontal",safesearch:"true",per_page:40};async function L(e,t){const s=await c.create({params:{q:e,page:t}}).get();if(!s.data.totalHits)throw new Error("Sorry, there are no images matching your search query. Please try again.");return t+=1,s.data}const n={searchForm:document.querySelector(".search-form"),gallery:document.querySelector(".gallery"),guard:document.querySelector(".js-guard")};n.searchForm.addEventListener("submit",S);const v={root:null,rootMargin:"300px",threshold:1},d=new IntersectionObserver(E,v);let l,m,u=0;async function S(e){e.preventDefault();try{m=n.searchForm.searchQuery.value,l=1;const t=await h();$(t),d.observe(n.guard)}catch(t){M(t.message)}finally{n.searchForm.reset()}}async function h(){const{hits:e,totalHits:t}=await L(m,l);return n.gallery.insertAdjacentHTML("beforeend",x(e)),u+=40,u>=t&&d.disconnect(),I(),t}function x(e){return e.map(t=>{const{webformatURL:i,largeImageURL:s,tags:o,likes:r,views:a,comments:g,downloads:p}=t;return`
      <a href="${s}" class="photo-card" data-lightbox="gallery">
        <img src="${i}" alt="${o}" loading="lazy" />
        <div class="info">
          <p class="info-item">
            <b>Likes</b> ${r}
          </p>
          <p class="info-item">
            <b>Views</b> ${a}
          </p>
          <p class="info-item">
            <b>Comments</b> ${g}
          </p>
          <p class="info-item">
            <b>Downloads</b> ${p}
          </p>
        </div>
      </a>`}).join("")}function E(e){e.forEach(async t=>{t.isIntersecting&&(l+=1,R(),h())})}function I(){new y(".gallery a").refresh()}function $(e){f.success({message:`Hooray! We found ${e} images.`,position:"topRight"})}function M(e){f.error({message:e,position:"topRight"})}function R(){const{height:e}=n.gallery.firstElementChild.getBoundingClientRect();window.scrollBy({top:e*2,behavior:"smooth"})}
//# sourceMappingURL=commonHelpers.js.map

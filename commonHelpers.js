import{a as l,S as w,i as d}from"./assets/vendor-f67ecabd.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))n(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function s(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerpolicy&&(o.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?o.credentials="include":t.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(t){if(t.ep)return;t.ep=!0;const o=s(t);fetch(t.href,o)}})();const v="https://pixabay.com/api/",L="40888017-179b7a421750c84ea86ef3d3f";l.defaults.baseURL=v;l.defaults.params={key:L,image_type:"photo",orientation:"horizontal",safesearch:"true",per_page:40};async function S(e,r=1){const n=await l.create({params:{q:e,page:r}}).get();if(!n.data.totalHits)throw new Error("Sorry, there are no images matching your search query. Please try again.");return n.data}const a={searchForm:document.querySelector(".search-form"),gallery:document.querySelector(".gallery"),guard:document.querySelector(".js-guard")};a.searchForm.addEventListener("submit",H);const E=new w(".gallery a"),I={root:null,rootMargin:"300px",threshold:1},c=new IntersectionObserver($,I);let u,m,f=0;async function H(e){e.preventDefault();try{c.disconnect(),a.gallery.innerHTML="",m=x(a.searchForm.searchQuery.value),u=1,f=0;const r=await h();R(r),c.observe(a.guard),p(r)}catch(r){g(r.message)}finally{a.searchForm.reset()}}async function h(){const{hits:e,totalHits:r}=await S(m,u);return f+=40,a.gallery.insertAdjacentHTML("beforeend",M(e)),E.refresh(),r}function M(e){return e.map(r=>{const{webformatURL:s,largeImageURL:n,tags:t,likes:o,views:i,comments:y,downloads:b}=r;return`
      <a href="${n}" class="photo-card" data-lightbox="gallery">
        <img src="${s}" alt="${t}" loading="lazy" />
        <div class="info">
          <p class="info-item">
            <b>Likes</b> ${o}
          </p>
          <p class="info-item">
            <b>Views</b> ${i}
          </p>
          <p class="info-item">
            <b>Comments</b> ${y}
          </p>
          <p class="info-item">
            <b>Downloads</b> ${b}
          </p>
        </div>
      </a>`}).join("")}function $(e){e.forEach(async r=>{try{if(r.isIntersecting){u+=1;const s=await h();p(s),q()}}catch(s){g(s.message)}})}function R(e){d.success({message:`Hooray! We found ${e} images.`,position:"topRight"})}function g(e){d.error({message:e,position:"topRight"})}function q(){const{height:e}=a.gallery.firstElementChild.getBoundingClientRect();window.scrollBy({top:e*2,behavior:"smooth"})}function x(e){if(e=e.trim(),e==="")throw new Error("Search field cannot be empty!");return e}function p(e){if(f>=e)throw c.disconnect(),new Error("We're sorry, but you've reached the end of search results.")}
//# sourceMappingURL=commonHelpers.js.map

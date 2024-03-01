import{a as h,i as f,S as b}from"./assets/vendor-527658dd.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function r(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(e){if(e.ep)return;e.ep=!0;const s=r(e);fetch(e.href,s)}})();h.defaults.baseURL="https://pixabay.com/api/";const C="26468965-37c536f46ba330a607460f03f";async function m(o,t=15,r){const i=new URLSearchParams({key:C,q:o,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:t,page:r});return(await h.get("",{params:i})).data}const g=document.querySelector(".gallery"),w=document.querySelector(".search-form"),l=document.querySelector(".loader"),n=document.querySelector(".load-more");let c="",d,p;w.addEventListener("submit",B);n.addEventListener("click",q);n.classList.add("is-hidden");function B(o){if(o.preventDefault(),g.innerHTML="",l.classList.remove("is-hidden"),c=o.currentTarget.elements.search.value.trim(),c===""){f.error({title:"Error",message:"Please enter a search query.",backgroundColor:"#EF4040",messageColor:"#fff",titleColor:"#fff",progressBarColor:"#B51B1B",position:"topRight"}),l.classList.add("is-hidden");return}l.classList.remove("is-hidden"),m(c,15,1).then(t=>{if(t.hits.length===0)throw new Error("No images found");y(t.hits),p=c,d=1,n.classList.remove("is-hidden"),o.target.reset()}).catch(t=>{f.error({title:"Error",message:`${t.message||"Something went wrong"}`,backgroundColor:"#EF4040",messageColor:"#fff",titleColor:"#fff",progressBarColor:"#B51B1B",position:"topRight"}),n.classList.add("is-hidden")}).finally(()=>{l.classList.add("is-hidden")})}const S=new b(".gallery-item a",{captionsData:"alt",captionDelay:250,captionPosition:"bottom"});let u=0;function y(o){const t=o.map(({webformatURL:r,largeImageURL:i,tags:e,likes:s,views:a,comments:v,downloads:L})=>`<li class ='gallery-item'>
        <a class="gallery-link" href="${i}">
            <img class="gallery-image"
                src="${r}"
                alt="${e}"
                width="360"
                height="152"/>
        </a>  
        <div class='info-block'>
            <div class="info">
                <h3 class = "head-likes">Likes</h3>
                <p>${s}</p>
            </div>
            <div class="info">
                <h3 class = "head-views">Views</h3>
                <p>${a}</p>
            </div>
            <div class="info">
                <h3 class = "head-comments">Comments</h3>
                <p>${v}</p>
            </div>
            <div class="info">
                <h3 class = "head-downloads">Downloads</h3>
                <p>${L}</p>
            </div>
        </div>
    </li>`).join("");if(g.insertAdjacentHTML("beforeend",t),S.refresh(),u>=1){const r=document.querySelector(".gallery-item").getBoundingClientRect().height;window.scrollBy({top:r*2,behavior:"smooth"})}u++}function q(o){d++,m(p,15,d).then(t=>{const r=t.totalHits||0;d*15>=r?(n.classList.add("is-hidden"),f.info({title:"Info",message:"We're sorry, but you've reached the end of search results.",backgroundColor:"#4CAF50",messageColor:"#fff",titleColor:"#fff",progressBarColor:"#4CAF50",position:"topRight"})):y(t.hits)})}
//# sourceMappingURL=commonHelpers.js.map

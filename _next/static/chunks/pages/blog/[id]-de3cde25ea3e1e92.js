(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[358],{9794:(e,a,s)=>{(window.__NEXT_P=window.__NEXT_P||[]).push(["/blog/[id]",function(){return s(5305)}])},2251:(e,a,s)=>{"use strict";s.d(a,{A:()=>n});var t=s(4848);let r=()=>(0,t.jsx)("header",{className:"nav",children:(0,t.jsxs)("div",{className:"nav-container",children:[(0,t.jsx)("a",{href:"/",className:"nav-brand",children:"我的博客"}),(0,t.jsxs)("div",{className:"nav-links",children:[(0,t.jsx)("a",{href:"/",className:"nav-link",children:"首页"}),(0,t.jsx)("a",{href:"/blog",className:"nav-link",children:"文章"}),(0,t.jsx)("a",{href:"/categories",className:"nav-link",children:"分类"}),(0,t.jsx)("a",{href:"/about",className:"nav-link",children:"关于我"})]})]})}),c=()=>(0,t.jsx)("footer",{className:"footer",children:(0,t.jsx)("p",{children:"\xa9 2024 个人博客. All rights reserved."})}),n=e=>{let{children:a}=e;return(0,t.jsxs)("div",{className:"layout",children:[(0,t.jsx)(r,{}),(0,t.jsx)("main",{children:a}),(0,t.jsx)(c,{})]})}},9089:(e,a,s)=>{"use strict";s.d(a,{A:()=>l});var t=s(4848),r=s(6540),c=s(9941),n=s.n(c);let l=e=>{let{articleId:a}=e,[s,c]=(0,r.useState)(0),[l,i]=(0,r.useState)(!0);return((0,r.useEffect)(()=>{(async()=>{try{let e=await fetch("/api/articles/".concat(a,"/views"),{method:"POST"}),s=await e.json();c(s.views),i(!1)}catch(e){console.error("Error incrementing views:",e),i(!1)}})()},[a]),l)?(0,t.jsx)("span",{className:n().viewCount,children:"--"}):(0,t.jsxs)("span",{className:n().viewCount,children:[(0,t.jsx)("i",{className:"far fa-eye"})," ",s," 次浏览"]})}},5305:(e,a,s)=>{"use strict";s.r(a),s.d(a,{__N_SSG:()=>d,default:()=>_});var t=s(4848),r=s(2251),c=s(9089),n=s(1106),l=s.n(n),i=s(3721),o=s.n(i),d=!0;let _=e=>{let{article:a}=e;return a?(0,t.jsx)(r.A,{children:(0,t.jsxs)("article",{className:o().container,children:[(0,t.jsxs)("header",{className:o().header,children:[(0,t.jsx)("h1",{className:o().title,children:a.title}),(0,t.jsxs)("div",{className:o().meta,children:[(0,t.jsx)("span",{className:o().date,children:a.date}),(0,t.jsx)(l(),{href:"/articles?category=".concat(encodeURIComponent(a.category)),className:o().category,children:a.category}),(0,t.jsx)(c.A,{articleId:a.id})]}),(0,t.jsx)("div",{className:o().tags,children:a.tags.map(e=>(0,t.jsxs)(l(),{href:"/articles?tag=".concat(encodeURIComponent(e)),className:o().tag,children:["#",e]},e))})]}),(0,t.jsx)("div",{className:o().content,dangerouslySetInnerHTML:{__html:a.contentHtml}}),(0,t.jsx)("footer",{className:o().footer,children:(0,t.jsx)("div",{className:o().navigation,children:(0,t.jsx)(l(),{href:"/blog",className:o().backButton,children:"返回文章列表"})})})]})}):(0,t.jsx)(r.A,{children:(0,t.jsx)("div",{className:o().container,children:(0,t.jsx)("div",{className:o().errorMessage,children:"文章不存在"})})})}},9941:e=>{e.exports={viewCount:"ViewCounter_viewCount__CArR4"}},3721:e=>{e.exports={container:"article_container__uEGY_",header:"article_header__Dfu8i",title:"article_title__Kemkb",meta:"article_meta__EQMJH",date:"article_date__8Zsel",category:"article_category__FEprG",tags:"article_tags__SeZQL",tag:"article_tag__xFxqV",content:"article_content__xXtEi",footer:"article_footer__5JN_G",navigation:"article_navigation__fJhBJ",backButton:"article_backButton__FZQSF",errorMessage:"article_errorMessage__DYWZw"}}},e=>{var a=a=>e(e.s=a);e.O(0,[106,636,593,792],()=>a(9794)),_N_E=e.O()}]);
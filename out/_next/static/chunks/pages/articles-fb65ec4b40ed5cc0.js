(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[977],{8319:(e,a,s)=>{(window.__NEXT_P=window.__NEXT_P||[]).push(["/articles",function(){return s(5675)}])},6785:(e,a,s)=>{"use strict";s.d(a,{A:()=>d});var r=s(4848),t=s(9089),c=s(9033),i=s.n(c),l=s(1106),n=s.n(l);let d=e=>{let{articles:a=[]}=e,s=Array.isArray(a)?a:[];return(0,r.jsx)("div",{className:i().articlesGrid,children:s.map(e=>(0,r.jsxs)("div",{className:i().articleCard,children:[(0,r.jsx)("h2",{children:(0,r.jsx)(n(),{href:"/blog/".concat(e.id),className:i().title,children:e.title})}),(0,r.jsxs)("div",{className:i().articleMeta,children:[(0,r.jsx)("span",{className:i().date,children:e.date}),(0,r.jsx)("span",{className:i().category,children:e.category}),(0,r.jsx)(t.A,{articleId:e.id})]}),(0,r.jsx)("p",{className:i().summary,children:e.summary}),(0,r.jsx)(n(),{href:"/blog/".concat(e.id),className:i().readMore,children:"阅读更多"})]},e.id))})}},2251:(e,a,s)=>{"use strict";s.d(a,{A:()=>i});var r=s(4848);let t=()=>(0,r.jsx)("header",{className:"nav",children:(0,r.jsxs)("div",{className:"nav-container",children:[(0,r.jsx)("a",{href:"/",className:"nav-brand",children:"我的博客"}),(0,r.jsxs)("div",{className:"nav-links",children:[(0,r.jsx)("a",{href:"/",className:"nav-link",children:"首页"}),(0,r.jsx)("a",{href:"/blog",className:"nav-link",children:"文章"}),(0,r.jsx)("a",{href:"/categories",className:"nav-link",children:"分类"}),(0,r.jsx)("a",{href:"/about",className:"nav-link",children:"关于我"})]})]})}),c=()=>(0,r.jsx)("footer",{className:"footer",children:(0,r.jsx)("p",{children:"\xa9 2024 个人博客. All rights reserved."})}),i=e=>{let{children:a}=e;return(0,r.jsxs)("div",{className:"layout",children:[(0,r.jsx)(t,{}),(0,r.jsx)("main",{children:a}),(0,r.jsx)(c,{})]})}},4454:(e,a,s)=>{"use strict";s.d(a,{A:()=>n});var r=s(4848),t=s(1106),c=s.n(t),i=s(1673),l=s.n(i);let n=e=>{let{articles:a=[],currentCategory:s,currentTag:t}=e,i=Array.isArray(a)?a:[],n=i.reduce((e,a)=>(e[a.category]=(e[a.category]||0)+1,e),{}),d=i.reduce((e,a)=>(a.tags.forEach(a=>{e[a]=(e[a]||0)+1}),e),{});return(0,r.jsxs)("div",{className:l().sidebar,children:[(0,r.jsxs)("section",{className:l().section,children:[(0,r.jsx)("h2",{className:l().sectionTitle,children:"分类"}),(0,r.jsx)("ul",{className:l().categoryList,children:Object.entries(n).map(e=>{let[a,t]=e;return(0,r.jsx)("li",{className:"".concat(l().categoryItem," ").concat(s===a?l().active:""),children:(0,r.jsxs)(c(),{href:"/articles?category=".concat(encodeURIComponent(a)),className:l().categoryLink,children:[a," (",t,")"]})},a)})})]}),(0,r.jsxs)("section",{className:l().section,children:[(0,r.jsx)("h2",{className:l().sectionTitle,children:"标签"}),(0,r.jsx)("div",{className:l().tagCloud,children:Object.entries(d).map(e=>{let[a,s]=e;return(0,r.jsxs)(c(),{href:"/articles?tag=".concat(encodeURIComponent(a)),className:"".concat(l().tag," ").concat(t===a?l().activeTag:""),children:[a," (",s,")"]},a)})})]})]})}},9089:(e,a,s)=>{"use strict";s.d(a,{A:()=>l});var r=s(4848),t=s(6540),c=s(9941),i=s.n(c);let l=e=>{let{articleId:a}=e,[s,c]=(0,t.useState)(0),[l,n]=(0,t.useState)(!0);return((0,t.useEffect)(()=>{(async()=>{try{let e=await fetch("/api/articles/".concat(a,"/views"),{method:"POST"}),s=await e.json();c(s.views),n(!1)}catch(e){console.error("Error incrementing views:",e),n(!1)}})()},[a]),l)?(0,r.jsx)("span",{className:i().viewCount,children:"--"}):(0,r.jsxs)("span",{className:i().viewCount,children:[(0,r.jsx)("i",{className:"far fa-eye"})," ",s," 次浏览"]})}},5675:(e,a,s)=>{"use strict";s.r(a),s.d(a,{__N_SSG:()=>o,default:()=>_});var r=s(4848),t=s(2251),c=s(4454),i=s(6785),l=s(6715),n=s(913),d=s.n(n),o=!0;let _=e=>{let{articles:a}=e,{category:s,tag:n}=(0,l.useRouter)().query,o=a||[],_="所有文章";return s&&(o=o.filter(e=>e.category===s),_="".concat(s," 分类下的文章")),n&&(o=o.filter(e=>e.tags.includes(n)),_="标签：".concat(n)),(0,r.jsx)(t.A,{children:(0,r.jsxs)("div",{className:d().pageContainer,children:[(0,r.jsx)(c.A,{articles:a,currentCategory:s,currentTag:n}),(0,r.jsxs)("main",{className:d().mainContent,children:[(0,r.jsx)("h1",{className:d().pageTitle,children:_}),o.length>0?(0,r.jsx)(i.A,{articles:o}):(0,r.jsx)("div",{className:d().noResults,children:"没有找到相关文章"})]})]})})}},9033:e=>{e.exports={articlesGrid:"ArticlesList_articlesGrid__xgK4j",articleCard:"ArticlesList_articleCard__kb_PD",articleMeta:"ArticlesList_articleMeta__HNQR7",date:"ArticlesList_date__y3z4m",category:"ArticlesList_category__MYezr",summary:"ArticlesList_summary__Ryzez",readMore:"ArticlesList_readMore__jrSyT"}},1673:e=>{e.exports={sidebar:"Sidebar_sidebar__86IlD",section:"Sidebar_section__GtWJr",sectionTitle:"Sidebar_sectionTitle__s0c_b",categoryList:"Sidebar_categoryList__WMLpr",categoryItem:"Sidebar_categoryItem__e2_Ed",active:"Sidebar_active__vqrO1",tagCloud:"Sidebar_tagCloud__5097Z",tag:"Sidebar_tag__GRs72",activeTag:"Sidebar_activeTag__9siW1",count:"Sidebar_count__9n4rX"}},9941:e=>{e.exports={viewCount:"ViewCounter_viewCount__CArR4"}},913:e=>{e.exports={pageContainer:"articles_pageContainer___Us9_",mainContent:"articles_mainContent__ihItd",pageTitle:"articles_pageTitle__l0cPO",noResults:"articles_noResults__s3A8k"}},6715:(e,a,s)=>{e.exports=s(8440)}},e=>{var a=a=>e(e.s=a);e.O(0,[106,636,593,792],()=>a(8319)),_N_E=e.O()}]);
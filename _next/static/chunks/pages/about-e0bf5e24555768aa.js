(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[239],{2127:(e,t,s)=>{(window.__NEXT_P=window.__NEXT_P||[]).push(["/about",function(){return s(5881)}])},6526:(e,t,s)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"Image",{enumerable:!0,get:function(){return j}});let i=s(7677),a=s(544),r=s(4848),l=a._(s(6540)),n=i._(s(961)),o=i._(s(6085)),c=s(7282),d=s(2105),u=s(9641);s(7679);let f=s(7644),h=i._(s(5472)),m=s(1903),g={deviceSizes:[640,750,828,1080,1200,1920,2048,3840],imageSizes:[16,32,48,64,96,128,256,384],path:"/yyxblog/_next/image",loader:"default",dangerouslyAllowSVG:!1,unoptimized:!0};function p(e,t,s,i,a,r,l){let n=null==e?void 0:e.src;e&&e["data-loaded-src"]!==n&&(e["data-loaded-src"]=n,("decode"in e?e.decode():Promise.resolve()).catch(()=>{}).then(()=>{if(e.parentElement&&e.isConnected){if("empty"!==t&&a(!0),null==s?void 0:s.current){let t=new Event("load");Object.defineProperty(t,"target",{writable:!1,value:e});let i=!1,a=!1;s.current({...t,nativeEvent:t,currentTarget:e,target:e,isDefaultPrevented:()=>i,isPropagationStopped:()=>a,persist:()=>{},preventDefault:()=>{i=!0,t.preventDefault()},stopPropagation:()=>{a=!0,t.stopPropagation()}})}(null==i?void 0:i.current)&&i.current(e)}}))}function _(e){return l.use?{fetchPriority:e}:{fetchpriority:e}}let x=(0,l.forwardRef)((e,t)=>{let{src:s,srcSet:i,sizes:a,height:n,width:o,decoding:c,className:d,style:u,fetchPriority:f,placeholder:h,loading:g,unoptimized:x,fill:v,onLoadRef:j,onLoadingCompleteRef:b,setBlurComplete:y,setShowAltText:N,sizesInput:w,onLoad:k,onError:C,...S}=e,P=(0,l.useCallback)(e=>{e&&(C&&(e.src=e.src),e.complete&&p(e,h,j,b,y,x,w))},[s,h,j,b,y,C,x,w]),z=(0,m.useMergedRef)(t,P);return(0,r.jsx)("img",{...S,..._(f),loading:g,width:o,height:n,decoding:c,"data-nimg":v?"fill":"1",className:d,style:u,sizes:a,srcSet:i,src:s,ref:z,onLoad:e=>{p(e.currentTarget,h,j,b,y,x,w)},onError:e=>{N(!0),"empty"!==h&&y(!0),C&&C(e)}})});function v(e){let{isAppRouter:t,imgAttributes:s}=e,i={as:"image",imageSrcSet:s.srcSet,imageSizes:s.sizes,crossOrigin:s.crossOrigin,referrerPolicy:s.referrerPolicy,..._(s.fetchPriority)};return t&&n.default.preload?(n.default.preload(s.src,i),null):(0,r.jsx)(o.default,{children:(0,r.jsx)("link",{rel:"preload",href:s.srcSet?void 0:s.src,...i},"__nimg-"+s.src+s.srcSet+s.sizes)})}let j=(0,l.forwardRef)((e,t)=>{let s=(0,l.useContext)(f.RouterContext),i=(0,l.useContext)(u.ImageConfigContext),a=(0,l.useMemo)(()=>{var e;let t=g||i||d.imageConfigDefault,s=[...t.deviceSizes,...t.imageSizes].sort((e,t)=>e-t),a=t.deviceSizes.sort((e,t)=>e-t),r=null==(e=t.qualities)?void 0:e.sort((e,t)=>e-t);return{...t,allSizes:s,deviceSizes:a,qualities:r}},[i]),{onLoad:n,onLoadingComplete:o}=e,m=(0,l.useRef)(n);(0,l.useEffect)(()=>{m.current=n},[n]);let p=(0,l.useRef)(o);(0,l.useEffect)(()=>{p.current=o},[o]);let[_,j]=(0,l.useState)(!1),[b,y]=(0,l.useState)(!1),{props:N,meta:w}=(0,c.getImgProps)(e,{defaultLoader:h.default,imgConf:a,blurComplete:_,showAltText:b});return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(x,{...N,unoptimized:w.unoptimized,placeholder:w.placeholder,fill:w.fill,onLoadRef:m,onLoadingCompleteRef:p,setBlurComplete:j,setShowAltText:y,sizesInput:e.sizes,ref:t}),w.priority?(0,r.jsx)(v,{isAppRouter:!s,imgAttributes:N}):null]})});("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},1903:(e,t,s)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"useMergedRef",{enumerable:!0,get:function(){return a}});let i=s(6540);function a(e,t){let s=(0,i.useRef)(()=>{}),a=(0,i.useRef)(()=>{});return(0,i.useMemo)(()=>e&&t?i=>{null===i?(s.current(),a.current()):(s.current=r(e,i),a.current=r(t,i))}:e||t,[e,t])}function r(e,t){if("function"!=typeof e)return e.current=t,()=>{e.current=null};{let s=e(t);return"function"==typeof s?s:()=>e(null)}}("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},7282:(e,t,s)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"getImgProps",{enumerable:!0,get:function(){return n}}),s(7679);let i=s(9197),a=s(2105);function r(e){return void 0!==e.default}function l(e){return void 0===e?e:"number"==typeof e?Number.isFinite(e)?e:NaN:"string"==typeof e&&/^[0-9]+$/.test(e)?parseInt(e,10):NaN}function n(e,t){var s,n;let o,c,d,{src:u,sizes:f,unoptimized:h=!1,priority:m=!1,loading:g,className:p,quality:_,width:x,height:v,fill:j=!1,style:b,overrideSrc:y,onLoad:N,onLoadingComplete:w,placeholder:k="empty",blurDataURL:C,fetchPriority:S,decoding:P="async",layout:z,objectFit:E,objectPosition:M,lazyBoundary:O,lazyRoot:R,...T}=e,{imgConf:I,showAltText:L,blurComplete:A,defaultLoader:D}=t,B=I||a.imageConfigDefault;if("allSizes"in B)o=B;else{let e=[...B.deviceSizes,...B.imageSizes].sort((e,t)=>e-t),t=B.deviceSizes.sort((e,t)=>e-t),i=null==(s=B.qualities)?void 0:s.sort((e,t)=>e-t);o={...B,allSizes:e,deviceSizes:t,qualities:i}}if(void 0===D)throw Error("images.loaderFile detected but the file is missing default export.\nRead more: https://nextjs.org/docs/messages/invalid-images-config");let G=T.loader||D;delete T.loader,delete T.srcSet;let F="__next_img_default"in G;if(F){if("custom"===o.loader)throw Error('Image with src "'+u+'" is missing "loader" prop.\nRead more: https://nextjs.org/docs/messages/next-image-missing-loader')}else{let e=G;G=t=>{let{config:s,...i}=t;return e(i)}}if(z){"fill"===z&&(j=!0);let e={intrinsic:{maxWidth:"100%",height:"auto"},responsive:{width:"100%",height:"auto"}}[z];e&&(b={...b,...e});let t={responsive:"100vw",fill:"100vw"}[z];t&&!f&&(f=t)}let W="",q=l(x),U=l(v);if((n=u)&&"object"==typeof n&&(r(n)||void 0!==n.src)){let e=r(u)?u.default:u;if(!e.src)throw Error("An object should only be passed to the image component src parameter if it comes from a static image import. It must include src. Received "+JSON.stringify(e));if(!e.height||!e.width)throw Error("An object should only be passed to the image component src parameter if it comes from a static image import. It must include height and width. Received "+JSON.stringify(e));if(c=e.blurWidth,d=e.blurHeight,C=C||e.blurDataURL,W=e.src,!j){if(q||U){if(q&&!U){let t=q/e.width;U=Math.round(e.height*t)}else if(!q&&U){let t=U/e.height;q=Math.round(e.width*t)}}else q=e.width,U=e.height}}let Y=!m&&("lazy"===g||void 0===g);(!(u="string"==typeof u?u:W)||u.startsWith("data:")||u.startsWith("blob:"))&&(h=!0,Y=!1),o.unoptimized&&(h=!0),F&&!o.dangerouslyAllowSVG&&u.split("?",1)[0].endsWith(".svg")&&(h=!0);let V=l(_),J=Object.assign(j?{position:"absolute",height:"100%",width:"100%",left:0,top:0,right:0,bottom:0,objectFit:E,objectPosition:M}:{},L?{}:{color:"transparent"},b),X=A||"empty"===k?null:"blur"===k?'url("data:image/svg+xml;charset=utf-8,'+(0,i.getImageBlurSvg)({widthInt:q,heightInt:U,blurWidth:c,blurHeight:d,blurDataURL:C||"",objectFit:J.objectFit})+'")':'url("'+k+'")',H=X?{backgroundSize:J.objectFit||"cover",backgroundPosition:J.objectPosition||"50% 50%",backgroundRepeat:"no-repeat",backgroundImage:X}:{},K=function(e){let{config:t,src:s,unoptimized:i,width:a,quality:r,sizes:l,loader:n}=e;if(i)return{src:s,srcSet:void 0,sizes:void 0};let{widths:o,kind:c}=function(e,t,s){let{deviceSizes:i,allSizes:a}=e;if(s){let e=/(^|\s)(1?\d?\d)vw/g,t=[];for(let i;i=e.exec(s);i)t.push(parseInt(i[2]));if(t.length){let e=.01*Math.min(...t);return{widths:a.filter(t=>t>=i[0]*e),kind:"w"}}return{widths:a,kind:"w"}}return"number"!=typeof t?{widths:i,kind:"w"}:{widths:[...new Set([t,2*t].map(e=>a.find(t=>t>=e)||a[a.length-1]))],kind:"x"}}(t,a,l),d=o.length-1;return{sizes:l||"w"!==c?l:"100vw",srcSet:o.map((e,i)=>n({config:t,src:s,quality:r,width:e})+" "+("w"===c?e:i+1)+c).join(", "),src:n({config:t,src:s,quality:r,width:o[d]})}}({config:o,src:u,unoptimized:h,width:q,quality:V,sizes:f,loader:G});return{props:{...T,loading:Y?"lazy":g,fetchPriority:S,width:q,height:U,decoding:P,className:p,style:{...J,...H},sizes:K.sizes,srcSet:K.srcSet,src:y||K.src},meta:{unoptimized:h,priority:m,placeholder:k,fill:j}}}},9197:(e,t)=>{"use strict";function s(e){let{widthInt:t,heightInt:s,blurWidth:i,blurHeight:a,blurDataURL:r,objectFit:l}=e,n=i?40*i:t,o=a?40*a:s,c=n&&o?"viewBox='0 0 "+n+" "+o+"'":"";return"%3Csvg xmlns='http://www.w3.org/2000/svg' "+c+"%3E%3Cfilter id='b' color-interpolation-filters='sRGB'%3E%3CfeGaussianBlur stdDeviation='20'/%3E%3CfeColorMatrix values='1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 100 -1' result='s'/%3E%3CfeFlood x='0' y='0' width='100%25' height='100%25'/%3E%3CfeComposite operator='out' in='s'/%3E%3CfeComposite in2='SourceGraphic'/%3E%3CfeGaussianBlur stdDeviation='20'/%3E%3C/filter%3E%3Cimage width='100%25' height='100%25' x='0' y='0' preserveAspectRatio='"+(c?"none":"contain"===l?"xMidYMid":"cover"===l?"xMidYMid slice":"none")+"' style='filter: url(%23b);' href='"+r+"'/%3E%3C/svg%3E"}Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"getImageBlurSvg",{enumerable:!0,get:function(){return s}})},2364:(e,t,s)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var s in t)Object.defineProperty(e,s,{enumerable:!0,get:t[s]})}(t,{default:function(){return o},getImageProps:function(){return n}});let i=s(7677),a=s(7282),r=s(6526),l=i._(s(5472));function n(e){let{props:t}=(0,a.getImgProps)(e,{defaultLoader:l.default,imgConf:{deviceSizes:[640,750,828,1080,1200,1920,2048,3840],imageSizes:[16,32,48,64,96,128,256,384],path:"/yyxblog/_next/image",loader:"default",dangerouslyAllowSVG:!1,unoptimized:!0}});for(let[e,s]of Object.entries(t))void 0===s&&delete t[e];return{props:t}}let o=r.Image},5472:(e,t)=>{"use strict";function s(e){var t;let{config:s,src:i,width:a,quality:r}=e,l=r||(null==(t=s.qualities)?void 0:t.reduce((e,t)=>Math.abs(t-75)<Math.abs(e-75)?t:e))||75;return s.path+"?url="+encodeURIComponent(i)+"&w="+a+"&q="+l+(i.startsWith("/_next/static/media/"),"")}Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"default",{enumerable:!0,get:function(){return i}}),s.__next_img_default=!0;let i=s},2251:(e,t,s)=>{"use strict";s.d(t,{A:()=>l});var i=s(4848);let a=()=>(0,i.jsx)("header",{className:"nav",children:(0,i.jsxs)("div",{className:"nav-container",children:[(0,i.jsx)("a",{href:"/",className:"nav-brand",children:"我的博客"}),(0,i.jsxs)("div",{className:"nav-links",children:[(0,i.jsx)("a",{href:"/",className:"nav-link",children:"首页"}),(0,i.jsx)("a",{href:"/blog",className:"nav-link",children:"文章"}),(0,i.jsx)("a",{href:"/categories",className:"nav-link",children:"分类"}),(0,i.jsx)("a",{href:"/about",className:"nav-link",children:"关于我"})]})]})}),r=()=>(0,i.jsx)("footer",{className:"footer",children:(0,i.jsx)("p",{children:"\xa9 2024 个人博客. All rights reserved."})}),l=e=>{let{children:t}=e;return(0,i.jsxs)("div",{className:"layout",children:[(0,i.jsx)(a,{}),(0,i.jsx)("main",{className:"container",children:t}),(0,i.jsx)(r,{})]})}},5881:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>c});var i=s(4848),a=s(2251),r=s(133),l=s.n(r),n=s(9965),o=s.n(n);let c=()=>(0,i.jsx)(a.A,{children:(0,i.jsx)("div",{className:l().container,children:(0,i.jsxs)("div",{className:l().content,children:[(0,i.jsxs)("div",{className:l().header,children:[(0,i.jsx)("div",{className:l().avatarContainer,children:(0,i.jsx)(o(),{src:"/images/avatar.svg",alt:"头像",width:120,height:120,className:l().avatar})}),(0,i.jsx)("h1",{className:l().name,children:"杨叶轩"}),(0,i.jsx)("p",{className:l().bio,children:"全栈开发工程师 / 技术写作者"}),(0,i.jsxs)("div",{className:l().social,children:[(0,i.jsx)("a",{href:"https://github.com/yexuanyang",target:"_blank",rel:"noopener noreferrer",className:l().socialLink,children:(0,i.jsx)("i",{className:"fab fa-github"})}),(0,i.jsx)("a",{href:"mailto:myemailyyxg@gmail.com",className:l().socialLink,children:(0,i.jsx)("i",{className:"fas fa-envelope"})})]})]}),(0,i.jsxs)("section",{className:l().section,children:[(0,i.jsx)("h2",{className:l().sectionTitle,children:"关于我"}),(0,i.jsxs)("div",{className:l().sectionContent,children:[(0,i.jsx)("p",{children:"你好！我是一名热爱技术的全栈开发工程师。我喜欢探索新技术，解决具有挑战性的问题，并与他人分享我的知识和经验。"}),(0,i.jsx)("p",{children:"在这个博客中，我会分享我在技术领域的学习心得、开发经验和一些有趣的项目。希望这些内容能够帮助到其他开发者。"})]})]}),(0,i.jsxs)("section",{className:l().section,children:[(0,i.jsx)("h2",{className:l().sectionTitle,children:"技能专长"}),(0,i.jsxs)("div",{className:l().skills,children:[(0,i.jsxs)("div",{className:l().skillCategory,children:[(0,i.jsx)("h3",{children:"前端开发"}),(0,i.jsxs)("div",{className:l().skillTags,children:[(0,i.jsx)("span",{className:l().skillTag,children:"React"}),(0,i.jsx)("span",{className:l().skillTag,children:"Next.js"}),(0,i.jsx)("span",{className:l().skillTag,children:"TypeScript"}),(0,i.jsx)("span",{className:l().skillTag,children:"CSS3"})]})]}),(0,i.jsxs)("div",{className:l().skillCategory,children:[(0,i.jsx)("h3",{children:"后端开发"}),(0,i.jsxs)("div",{className:l().skillTags,children:[(0,i.jsx)("span",{className:l().skillTag,children:"Node.js"}),(0,i.jsx)("span",{className:l().skillTag,children:"Express"}),(0,i.jsx)("span",{className:l().skillTag,children:"MongoDB"}),(0,i.jsx)("span",{className:l().skillTag,children:"MySQL"})]})]})]})]}),(0,i.jsxs)("section",{className:l().section,children:[(0,i.jsx)("h2",{className:l().sectionTitle,children:"联系我"}),(0,i.jsxs)("div",{className:l().contact,children:[(0,i.jsx)("p",{children:"如果你对我的文章有任何问题，或者想要交流技术话题，欢迎通过以下方式联系我："}),(0,i.jsxs)("ul",{className:l().contactList,children:[(0,i.jsxs)("li",{children:["邮箱：",(0,i.jsx)("a",{href:"mailto:myemailyyxg@gmail.com",children:"myemailyyxg@gmail.com"})]}),(0,i.jsxs)("li",{children:["GitHub：",(0,i.jsx)("a",{href:"https://github.com/yexuanyang",target:"_blank",rel:"noopener noreferrer",children:"@yexuanyang"})]})]})]})]})]})})})},133:e=>{e.exports={container:"about_container__DbOxo",content:"about_content__MdIKS",header:"about_header__cQYUK",avatarContainer:"about_avatarContainer__exjx6",avatar:"about_avatar__JGekB",name:"about_name__olLEj",bio:"about_bio__ACbUc",social:"about_social__27cGE",socialLink:"about_socialLink__ePWIW",section:"about_section__7V_vO",sectionTitle:"about_sectionTitle__Y8YAo",sectionContent:"about_sectionContent__PkhtL",skills:"about_skills___ocRX",skillCategory:"about_skillCategory__Luuth",skillTags:"about_skillTags__nueub",skillTag:"about_skillTag__Bf5Ij",contact:"about_contact__f5_9F",contactList:"about_contactList__wjdRR"}},9965:(e,t,s)=>{e.exports=s(2364)}},e=>{var t=t=>e(e.s=t);e.O(0,[636,593,792],()=>t(2127)),_N_E=e.O()}]);
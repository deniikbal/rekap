(()=>{var t={};t.id=636,t.ids=[636],t.modules={361:t=>{"use strict";t.exports=require("next/dist/compiled/next-server/pages.runtime.prod.js")},2015:t=>{"use strict";t.exports=require("react")},2326:t=>{"use strict";t.exports=require("react-dom")},2768:()=>{},2893:t=>{"use strict";t.exports=import("react-hot-toast")},3939:t=>{"use strict";t.exports=require("@supabase/supabase-js")},4075:t=>{"use strict";t.exports=require("zlib")},4386:(t,e,r)=>{"use strict";r.d(e,{O:()=>p,A:()=>h});var s=r(8732),i=r(2015),a=r(4233),u=r(3939);let o="https://vghiuntkpycdcstjrcbe.supabase.co",n="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZnaGl1bnRrcHljZGNzdGpyY2JlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA5NTMyNzcsImV4cCI6MjA1NjUyOTI3N30.zClSS5E0T2z85zM5Xnt_iWL5T9ltBPljvq81XcwxPl8";if(!o||!n)throw Error("Missing Supabase environment variables");let c=(0,u.createClient)(o,n,{auth:{persistSession:!1},db:{schema:"public"},global:{headers:{"x-application-name":"nextjs-app"},fetch:fetch.bind(globalThis)}}),l=(0,i.createContext)();function p({children:t}){let[e,r]=(0,i.useState)(null),[u,o]=(0,i.useState)(!0),n=(0,a.useRouter)(),p=async(t,e)=>{try{let{data:r,error:s}=await c.auth.signInWithPassword({email:t,password:e});if(s)throw s;return{data:r,error:null}}catch(t){return{data:null,error:t}}},h=async(t,e,r={})=>{try{let{data:s,error:i}=await c.auth.signUp({email:t,password:e,options:{data:r}});if(i)throw i;return{data:s,error:null}}catch(t){return{data:null,error:t}}},d=async()=>{try{let{error:t}=await c.auth.signOut();if(t)throw t;n.push("/login")}catch(t){console.error("Error logging out:",t.message)}};return(0,s.jsx)(l.Provider,{value:{user:e,loading:u,login:p,register:h,logout:d,isAuthenticated:!!e},children:t})}function h(){let t=(0,i.useContext)(l);if(void 0===t)throw Error("useAuth must be used within an AuthProvider");return t}},7091:(t,e,r)=>{"use strict";r.a(t,async(t,s)=>{try{r.r(e),r.d(e,{default:()=>n});var i=r(8732);r(2768);var a=r(4386),u=r(2893),o=t([u]);u=(o.then?(await o)():o)[0];let n=function({Component:t,pageProps:e}){return(0,i.jsxs)(a.O,{children:[(0,i.jsx)(t,{...e}),(0,i.jsx)(u.Toaster,{position:"top-right",toastOptions:{duration:4e3,success:{style:{background:"#10B981",color:"white"}},error:{style:{background:"#EF4444",color:"white"}}}})]})};s()}catch(t){s(t)}})},7910:t=>{"use strict";t.exports=require("stream")},8732:t=>{"use strict";t.exports=require("react/jsx-runtime")},9021:t=>{"use strict";t.exports=require("fs")}};var e=require("../webpack-runtime.js");e.C(t);var r=t=>e(e.s=t),s=e.X(0,[518,4233],()=>r(7091));module.exports=s})();
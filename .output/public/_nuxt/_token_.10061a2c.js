import{a as E,r as P,t as H,b as N,e as O,w as q,u as T,f as K,h as V,i as I,j as F,k as W,l as J,m as $,p as k,q as d,s as D,F as z,v as j,x as G,y as A,z as R,o as B,A as Y,B as Q}from"./entry.01ef7356.js";import{_ as X}from"./_plugin-vue_export-helper.c27b6911.js";const Z=()=>null;function ee(...s){const r=typeof s[s.length-1]=="string"?s.pop():void 0;typeof s[0]!="string"&&s.unshift(r);let[n,e,t={}]=s;if(typeof n!="string")throw new TypeError("[nuxt] [asyncData] key must be a string.");if(typeof e!="function")throw new TypeError("[nuxt] [asyncData] handler must be a function.");t.server=t.server??!0,t.default=t.default??Z,t.lazy=t.lazy??!1,t.immediate=t.immediate??!0;const a=E(),o=()=>a.isHydrating?a.payload.data[n]:a.static.data[n],l=()=>o()!==void 0;a._asyncData[n]||(a._asyncData[n]={data:P(o()??t.default()),pending:P(!l()),error:H(a.payload._errors,n)});const i={...a._asyncData[n]};i.refresh=i.execute=(u={})=>{if(a._asyncDataPromises[n]){if(u.dedupe===!1)return a._asyncDataPromises[n];a._asyncDataPromises[n].cancelled=!0}if((u._initial||a.isHydrating&&u._initial!==!1)&&l())return o();i.pending.value=!0;const g=new Promise((f,y)=>{try{f(e(a))}catch(w){y(w)}}).then(f=>{if(g.cancelled)return a._asyncDataPromises[n];let y=f;t.transform&&(y=t.transform(f)),t.pick&&(y=te(y,t.pick)),i.data.value=y,i.error.value=null}).catch(f=>{if(g.cancelled)return a._asyncDataPromises[n];i.error.value=f,i.data.value=T(t.default())}).finally(()=>{g.cancelled||(i.pending.value=!1,a.payload.data[n]=i.data.value,i.error.value&&(a.payload._errors[n]=K(i.error.value)),delete a._asyncDataPromises[n])});return a._asyncDataPromises[n]=g,a._asyncDataPromises[n]};const h=()=>i.refresh({_initial:!0}),c=t.server!==!1&&a.payload.serverRendered;{const u=V();if(u&&!u._nuxtOnBeforeMountCbs){u._nuxtOnBeforeMountCbs=[];const f=u._nuxtOnBeforeMountCbs;u&&(N(()=>{f.forEach(y=>{y()}),f.splice(0,f.length)}),O(()=>f.splice(0,f.length)))}c&&a.isHydrating&&l()?i.pending.value=!1:u&&(a.payload.serverRendered&&a.isHydrating||t.lazy)&&t.immediate?u._nuxtOnBeforeMountCbs.push(h):t.immediate&&h(),t.watch&&q(t.watch,()=>i.refresh());const g=a.hook("app:data:refresh",f=>{if(!f||f.includes(n))return i.refresh()});u&&O(g)}const p=Promise.resolve(a._asyncDataPromises[n]).then(()=>i);return Object.assign(p,i),p}function te(s,r){const n={};for(const e of r)n[e]=s[e];return n}const re={ignoreUnknown:!1,respectType:!1,respectFunctionNames:!1,respectFunctionProperties:!1,unorderedObjects:!0,unorderedArrays:!1,unorderedSets:!1};function se(s,r={}){r={...re,...r};const n=L(r);return n.dispatch(s),n.toString()}function L(s){const r=[];let n=[];const e=t=>{r.push(t)};return{toString(){return r.join("")},getContext(){return n},dispatch(t){return s.replacer&&(t=s.replacer(t)),this["_"+(t===null?"null":typeof t)](t)},_object(t){if(t&&typeof t.toJSON=="function")return this._object(t.toJSON());const a=/\[object (.*)]/i,o=Object.prototype.toString.call(t),l=a.exec(o),i=l?l[1].toLowerCase():"unknown:["+o.toLowerCase()+"]";let h=null;if((h=n.indexOf(t))>=0)return this.dispatch("[CIRCULAR:"+h+"]");if(n.push(t),typeof Buffer<"u"&&Buffer.isBuffer&&Buffer.isBuffer(t))return e("buffer:"),e(t.toString("utf8"));if(i!=="object"&&i!=="function"&&i!=="asyncfunction")this["_"+i]?this["_"+i](t):s.ignoreUnknown||this._unkown(t,i);else{let c=Object.keys(t);s.unorderedObjects&&(c=c.sort()),s.respectType!==!1&&!U(t)&&c.splice(0,0,"prototype","__proto__","letructor"),s.excludeKeys&&(c=c.filter(function(p){return!s.excludeKeys(p)})),e("object:"+c.length+":");for(const p of c)this.dispatch(p),e(":"),s.excludeValues||this.dispatch(t[p]),e(",")}},_array(t,a){if(a=typeof a<"u"?a:s.unorderedArrays!==!1,e("array:"+t.length+":"),!a||t.length<=1){for(const i of t)this.dispatch(i);return}const o=[],l=t.map(i=>{const h=L(s);return h.dispatch(i),o.push(h.getContext()),h.toString()});return n=[...n,...o],l.sort(),this._array(l,!1)},_date(t){return e("date:"+t.toJSON())},_symbol(t){return e("symbol:"+t.toString())},_unkown(t,a){if(e(a),!!t&&(e(":"),t&&typeof t.entries=="function"))return this._array(Array.from(t.entries()),!0)},_error(t){return e("error:"+t.toString())},_boolean(t){return e("bool:"+t.toString())},_string(t){e("string:"+t.length+":"),e(t.toString())},_function(t){e("fn:"),U(t)?this.dispatch("[native]"):this.dispatch(t.toString()),s.respectFunctionNames!==!1&&this.dispatch("function-name:"+String(t.name)),s.respectFunctionProperties&&this._object(t)},_number(t){return e("number:"+t.toString())},_xml(t){return e("xml:"+t.toString())},_null(){return e("Null")},_undefined(){return e("Undefined")},_regexp(t){return e("regex:"+t.toString())},_uint8array(t){return e("uint8array:"),this.dispatch(Array.prototype.slice.call(t))},_uint8clampedarray(t){return e("uint8clampedarray:"),this.dispatch(Array.prototype.slice.call(t))},_int8array(t){return e("int8array:"),this.dispatch(Array.prototype.slice.call(t))},_uint16array(t){return e("uint16array:"),this.dispatch(Array.prototype.slice.call(t))},_int16array(t){return e("int16array:"),this.dispatch(Array.prototype.slice.call(t))},_uint32array(t){return e("uint32array:"),this.dispatch(Array.prototype.slice.call(t))},_int32array(t){return e("int32array:"),this.dispatch(Array.prototype.slice.call(t))},_float32array(t){return e("float32array:"),this.dispatch(Array.prototype.slice.call(t))},_float64array(t){return e("float64array:"),this.dispatch(Array.prototype.slice.call(t))},_arraybuffer(t){return e("arraybuffer:"),this.dispatch(new Uint8Array(t))},_url(t){return e("url:"+t.toString())},_map(t){e("map:");const a=[...t];return this._array(a,s.unorderedSets!==!1)},_set(t){e("set:");const a=[...t];return this._array(a,s.unorderedSets!==!1)},_file(t){return e("file:"),this.dispatch([t.name,t.size,t.type,t.lastModfied])},_blob(){if(s.ignoreUnknown)return e("[blob]");throw new Error(`Hashing Blob objects is currently not supported
Use "options.replacer" or "options.ignoreUnknown"
`)},_domwindow(){return e("domwindow")},_bigint(t){return e("bigint:"+t.toString())},_process(){return e("process")},_timer(){return e("timer")},_pipe(){return e("pipe")},_tcp(){return e("tcp")},_udp(){return e("udp")},_tty(){return e("tty")},_statwatcher(){return e("statwatcher")},_securecontext(){return e("securecontext")},_connection(){return e("connection")},_zlib(){return e("zlib")},_context(){return e("context")},_nodescript(){return e("nodescript")},_httpparser(){return e("httpparser")},_dataview(){return e("dataview")},_signal(){return e("signal")},_fsevent(){return e("fsevent")},_tlswrap(){return e("tlswrap")}}}function U(s){return typeof s!="function"?!1:/^function\s+\w*\s*\(\s*\)\s*{\s+\[native code]\s+}$/i.exec(Function.prototype.toString.call(s))!=null}class C{constructor(r,n){r=this.words=r||[],this.sigBytes=n!==void 0?n:r.length*4}toString(r){return(r||ne).stringify(this)}concat(r){if(this.clamp(),this.sigBytes%4)for(let n=0;n<r.sigBytes;n++){const e=r.words[n>>>2]>>>24-n%4*8&255;this.words[this.sigBytes+n>>>2]|=e<<24-(this.sigBytes+n)%4*8}else for(let n=0;n<r.sigBytes;n+=4)this.words[this.sigBytes+n>>>2]=r.words[n>>>2];return this.sigBytes+=r.sigBytes,this}clamp(){this.words[this.sigBytes>>>2]&=4294967295<<32-this.sigBytes%4*8,this.words.length=Math.ceil(this.sigBytes/4)}clone(){return new C([...this.words])}}const ne={stringify(s){const r=[];for(let n=0;n<s.sigBytes;n++){const e=s.words[n>>>2]>>>24-n%4*8&255;r.push((e>>>4).toString(16),(e&15).toString(16))}return r.join("")}},ae={stringify(s){const r="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",n=[];for(let e=0;e<s.sigBytes;e+=3){const t=s.words[e>>>2]>>>24-e%4*8&255,a=s.words[e+1>>>2]>>>24-(e+1)%4*8&255,o=s.words[e+2>>>2]>>>24-(e+2)%4*8&255,l=t<<16|a<<8|o;for(let i=0;i<4&&e*8+i*6<s.sigBytes*8;i++)n.push(r.charAt(l>>>6*(3-i)&63))}return n.join("")}},oe={parse(s){const r=s.length,n=[];for(let e=0;e<r;e++)n[e>>>2]|=(s.charCodeAt(e)&255)<<24-e%4*8;return new C(n,r)}},ie={parse(s){return oe.parse(unescape(encodeURIComponent(s)))}};class ce{constructor(){this._minBufferSize=0,this.blockSize=512/32,this.reset()}reset(){this._data=new C,this._nDataBytes=0}_append(r){typeof r=="string"&&(r=ie.parse(r)),this._data.concat(r),this._nDataBytes+=r.sigBytes}_doProcessBlock(r,n){}_process(r){let n,e=this._data.sigBytes/(this.blockSize*4);r?e=Math.ceil(e):e=Math.max((e|0)-this._minBufferSize,0);const t=e*this.blockSize,a=Math.min(t*4,this._data.sigBytes);if(t){for(let o=0;o<t;o+=this.blockSize)this._doProcessBlock(this._data.words,o);n=this._data.words.splice(0,t),this._data.sigBytes-=a}return new C(n,a)}}class le extends ce{update(r){return this._append(r),this._process(),this}finalize(r){r&&this._append(r)}}const ue=[1779033703,-1150833019,1013904242,-1521486534,1359893119,-1694144372,528734635,1541459225],de=[1116352408,1899447441,-1245643825,-373957723,961987163,1508970993,-1841331548,-1424204075,-670586216,310598401,607225278,1426881987,1925078388,-2132889090,-1680079193,-1046744716,-459576895,-272742522,264347078,604807628,770255983,1249150122,1555081692,1996064986,-1740746414,-1473132947,-1341970488,-1084653625,-958395405,-710438585,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,-2117940946,-1838011259,-1564481375,-1474664885,-1035236496,-949202525,-778901479,-694614492,-200395387,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,-2067236844,-1933114872,-1866530822,-1538233109,-1090935817,-965641998],x=[];class fe extends le{constructor(){super(),this.reset()}reset(){super.reset(),this._hash=new C([...ue])}_doProcessBlock(r,n){const e=this._hash.words;let t=e[0],a=e[1],o=e[2],l=e[3],i=e[4],h=e[5],c=e[6],p=e[7];for(let u=0;u<64;u++){if(u<16)x[u]=r[n+u]|0;else{const v=x[u-15],m=(v<<25|v>>>7)^(v<<14|v>>>18)^v>>>3,b=x[u-2],M=(b<<15|b>>>17)^(b<<13|b>>>19)^b>>>10;x[u]=m+x[u-7]+M+x[u-16]}const g=i&h^~i&c,f=t&a^t&o^a&o,y=(t<<30|t>>>2)^(t<<19|t>>>13)^(t<<10|t>>>22),w=(i<<26|i>>>6)^(i<<21|i>>>11)^(i<<7|i>>>25),S=p+w+g+de[u]+x[u],_=y+f;p=c,c=h,h=i,i=l+S|0,l=o,o=a,a=t,t=S+_|0}e[0]=e[0]+t|0,e[1]=e[1]+a|0,e[2]=e[2]+o|0,e[3]=e[3]+l|0,e[4]=e[4]+i|0,e[5]=e[5]+h|0,e[6]=e[6]+c|0,e[7]=e[7]+p|0}finalize(r){super.finalize(r);const n=this._nDataBytes*8,e=this._data.sigBytes*8;return this._data.words[e>>>5]|=128<<24-e%32,this._data.words[(e+64>>>9<<4)+14]=Math.floor(n/4294967296),this._data.words[(e+64>>>9<<4)+15]=n,this._data.sigBytes=this._data.words.length*4,this._process(),this._hash}}function he(s){return new fe().finalize(s).toString(ae)}function pe(s,r={}){const n=typeof s=="string"?s:se(s,r);return he(n).slice(0,10)}function ye(s,r,n){const[e={},t]=typeof r=="string"?[{},r]:[r,n],a=e.key||pe([t,T(e.baseURL),typeof s=="string"?s:"",T(e.params||e.query)]);if(!a||typeof a!="string")throw new TypeError("[nuxt] [useFetch] key must be a string: "+a);if(!s)throw new Error("[nuxt] [useFetch] request is missing.");const o=a===t?"$f"+a:a,l=I(()=>{let m=s;return typeof m=="function"&&(m=m()),T(m)});if(!e.baseURL&&typeof l.value=="string"&&l.value.startsWith("//"))throw new Error('[nuxt] [useFetch] the request URL must not start with "//".');const{server:i,lazy:h,default:c,transform:p,pick:u,watch:g,immediate:f,...y}=e,w=F({...y,cache:typeof e.cache=="boolean"?void 0:e.cache}),S={server:i,lazy:h,default:c,transform:p,pick:u,immediate:f,watch:g===!1?[]:[w,l,...g||[]]};let _;return ee(o,()=>{var b;return(b=_==null?void 0:_.abort)==null||b.call(_),_=typeof AbortController<"u"?new AbortController:{},typeof l.value=="string"&&l.value.startsWith("/"),(e.$fetch||globalThis.$fetch)(l.value,{signal:_.signal,...w})},S)}const ge={setup(){const s=W();J(()=>{s.params.token?r.chat.key="sk-"+s.params.token:r.chat.key="sk-"});const r=F({drafter:{body:{label:"Body",text:"",rows:25},signature:{label:"Signature",text:"",rows:4},references:{label:"References",text:"",rows:5}},notes:{label:"Notes",text:"",rows:15},refresh:0,loading:!1,chat:{options:[{label:"Tell a customer that",value:"TELLC"},{label:"Ask a customer",value:"ASKC"},{label:"",value:"EMPTY"}],key:"sk-",input:"",query:"",selectedRadio:"TELLC",response:{message:"-"},tokens:["Prompt","Completion","Total"]}});async function n(){switch(r.loading=!0,r.chat.selectedRadio){case"TELLC":r.chat.query="Tell a customer that "+r.chat.input;break;case"ASKC":r.chat.query="Ask a customer "+r.chat.input;break;case"EMPTY":r.chat.query=r.chat.input;break}await ye("https://api.openai.com/v1/chat/completions",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${r.chat.key}`},body:{model:"gpt-3.5-turbo",messages:[{role:"user",content:r.chat.query}],max_tokens:500}},"$5KhHpJMoxT").then(c=>{console.log(c),r.chat.response=c.data._rawValue,r.chat.response.message=r.chat.response.choices[0].message.content.replace(/\n/g,"<br />")}).catch(c=>{console.error(c),alert(c.message)}).finally(()=>{r.loading=!1,t()})}function e(){Object.keys(r.drafter).forEach(c=>{r.drafter[c].text=""}),r.refresh++}function t(){const c=r.chat.response.message.replace(/<br\s*[\/]?>/gi,`
`);r.drafter.body.text.length>0?(r.drafter.body.text+=`

=========================
`,r.drafter.body.text+=c,r.drafter.body.text+=`
=========================`):r.drafter.body.text+=c,r.refresh++}function a(){r.chat.input="",r.chat.response.message="-"}function o(){r.notes.text=""}function l(){e(),a(),o(),r.refresh++}function i(){const c=`${this.drafter.body.text}

${this.drafter.signature.text}

${this.drafter.references.text}`;try{navigator.clipboard.writeText(c)}catch(p){console.error("Failed to copy text: ",p)}}function h(){const c=this.chat.response.message.replace(/<br\s*[\/]?>/gi,`
`);try{navigator.clipboard.writeText(c)}catch(p){console.error("Failed to copy text: ",p)}}return{...$(r),copyToClipboard:i,copyChatToClipboard:h,clearDraft:e,clearChat:a,clearAll:l,fetchGpt3Response:n,useChat:t}}},_e=s=>(Y("data-v-20be7371"),s=s(),Q(),s),be={class:"grid grid-cols-2 gap-2 min-h-screen bg-gray-900 p-2"},me={class:"flex flex-col space-y-2"},xe={class:"flex w-full bg-gray-800 text-white text-2xl font-semibold whitespace-nowrap rounded-lg border-gray-500 border"},we=_e(()=>d("p",{class:"flex-1 ml-2 w-1/4 self-center border-r border-gray-500"}," CR's Drafts ",-1)),ve={class:"border border-gray-500 rounded-lg bg-gray-800 text-white p-4"},ke={class:"flex flex-row items-center space-x-2"},Be={for:"header",class:"flex grow font-bold text-xs text-gray-400"},Ce={class:"flex"},Se={class:"flex justify-end space-x-4 items-center w-full py-1 ml-1"},De=["value","checked"],Te={class:"font-bold"},Ae={key:0,class:"loading-spinner"},Re={class:"flex my-2"},Pe={class:"grid grid-cols-2 gap-2 mt-2"},Oe={class:"border flex-1 h-full border-gray-500 rounded-lg bg-gray-800 text-white p-4"},ze={class:"font-bold"},je=["rows"],Ue={class:"border border-gray-500 rounded-lg bg-gray-800 text-white p-4 flex flex-col"},Fe={class:"font-bold"},Le=["onUpdate:modelValue","rows"],Me={class:"grid grid-cols-2 gap-2 mt-2"};function Ee(s,r,n,e,t,a){return B(),k("div",be,[d("div",me,[d("div",xe,[we,d("button",{onClick:r[0]||(r[0]=(...o)=>e.clearAll&&e.clearAll(...o)),class:"flex-1 w-1/4 grow rounded-r-md text-sm text-white font-semibold bg-red-500"}," Clear all ")]),d("div",ve,[d("div",ke,[d("label",Be," Chat: "+D(s.chat.key),1),d("div",Ce,[d("div",Se,[(B(!0),k(z,null,j(s.chat.options,o=>(B(),k("label",{key:o.value,class:"text-xs text-gray-400 flex flex-row items-center space-x-2"},[d("input",{class:"h-3 w-3 text-blue-600 bg-gray-100 border-gray-300 rounded",type:"radio",value:o.value,checked:s.chat.selectedRadio===o.value,onChange:r[1]||(r[1]=l=>{console.log(l),s.chat.selectedRadio=l.target.value})},null,40,De),d("p",Te,D(o.value),1)]))),128))])]),s.loading?(B(),k("div",Ae)):G("",!0)]),d("div",Re,[A(d("textarea",{class:"w-full p-3 text-sm text-white border border-gray-500 rounded-lg bg-gray-900 focus:ring-blue-500 focus:border-blue-500","onUpdate:modelValue":r[2]||(r[2]=o=>s.chat.input=o),required:"",rows:10},null,512),[[R,s.chat.input]])]),d("div",Pe,[d("button",{onClick:r[3]||(r[3]=(...o)=>e.fetchGpt3Response&&e.fetchGpt3Response(...o)),class:"inline-flex items-center p-2 font-medium justify-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-800"}," Submit "),d("button",{onClick:r[4]||(r[4]=(...o)=>e.clearChat&&e.clearChat(...o)),class:"inline-flex items-center p-2 font-medium justify-center text-white bg-red-800 rounded-lg focus:ring-4 focus:ring-red-200 hover:bg-red-800"}," Clear ")])]),d("div",Oe,[d("label",ze,D(s.notes.label),1),A(d("textarea",{"onUpdate:modelValue":r[5]||(r[5]=o=>s.notes.text=o),rows:s.notes.rows,class:"w-full h-[95%] p-4 rounded-xl my-2 text-sm text-white bg-gray-900 border-1 border-gray-500 focus:ring-0"},null,8,je),[[R,s.notes.text]])])]),d("div",Ue,[(B(!0),k(z,null,j(s.drafter,o=>(B(),k("div",{key:s.refresh},[d("label",Fe,D(o.label),1),A(d("textarea",{"onUpdate:modelValue":l=>o.text=l,rows:o.rows,class:"w-full p-4 rounded-xl my-2 text-sm text-white bg-gray-900 border-1 border-gray-500 focus:ring-0"},null,8,Le),[[R,o.text]])]))),128)),d("div",Me,[d("button",{onClick:r[6]||(r[6]=(...o)=>e.copyToClipboard&&e.copyToClipboard(...o)),class:"inline-flex items-center p-2 font-medium justify-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-800"}," Copy to clipboard "),d("button",{onClick:r[7]||(r[7]=(...o)=>e.clearDraft&&e.clearDraft(...o)),class:"inline-flex items-center p-2 font-medium justify-center text-white bg-red-800 rounded-lg focus:ring-4 focus:ring-red-200 hover:bg-red-800"}," Clear ")])])])}const qe=X(ge,[["render",Ee],["__scopeId","data-v-20be7371"]]);export{qe as default};

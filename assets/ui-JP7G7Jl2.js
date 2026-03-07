import{r as O,R as k}from"./react-C_I0sf9b.js";/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const X=(...l)=>l.filter((i,s,c)=>!!i&&i.trim()!==""&&c.indexOf(i)===s).join(" ").trim();/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ue=l=>l.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase();/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const de=l=>l.replace(/^([A-Z])|[\s-_]+(\w)/g,(i,s,c)=>c?c.toUpperCase():s.toLowerCase());/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const G=l=>{const i=de(l);return i.charAt(0).toUpperCase()+i.slice(1)};/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var fe={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const me=l=>{for(const i in l)if(i.startsWith("aria-")||i==="role"||i==="title")return!0;return!1};/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ge=O.forwardRef(({color:l="currentColor",size:i=24,strokeWidth:s=2,absoluteStrokeWidth:c,className:f="",children:u,iconNode:C,...p},e)=>O.createElement("svg",{ref:e,...fe,width:i,height:i,stroke:l,strokeWidth:c?Number(s)*24/Number(i):s,className:X("lucide",f),...!u&&!me(p)&&{"aria-hidden":"true"},...p},[...C.map(([o,t])=>O.createElement(o,t)),...Array.isArray(u)?u:[u]]));/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const M=(l,i)=>{const s=O.forwardRef(({className:c,...f},u)=>O.createElement(ge,{ref:u,iconNode:i,className:X(`lucide-${ue(G(l))}`,`lucide-${l}`,c),...f}));return s.displayName=G(l),s};/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ye=[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]],Ke=M("arrow-right",ye);/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const pe=[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}]],Ze=M("calendar",pe);/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Me=[["path",{d:"m15 18-6-6 6-6",key:"1wnfg3"}]],qe=M("chevron-left",Me);/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ee=[["path",{d:"M21.801 10A10 10 0 1 1 17 3.335",key:"yps3ct"}],["path",{d:"m9 11 3 3L22 4",key:"1pflzl"}]],Je=M("circle-check-big",Ee);/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ce=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]],et=M("circle-check",Ce);/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const we=[["path",{d:"M12 6v6l4 2",key:"mmk7yg"}],["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}]],tt=M("clock",we);/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ke=[["path",{d:"M3 5h.01",key:"18ugdj"}],["path",{d:"M3 12h.01",key:"nlz23k"}],["path",{d:"M3 19h.01",key:"noohij"}],["path",{d:"M8 5h13",key:"1pao27"}],["path",{d:"M8 12h13",key:"1za7za"}],["path",{d:"M8 19h13",key:"m83p4d"}]],ot=M("list",ke);/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ve=[["rect",{width:"18",height:"11",x:"3",y:"11",rx:"2",ry:"2",key:"1w4ew1"}],["path",{d:"M7 11V7a5 5 0 0 1 9.9-1",key:"1mm8w8"}]],nt=M("lock-open",ve);/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Re=[["rect",{width:"18",height:"11",x:"3",y:"11",rx:"2",ry:"2",key:"1w4ew1"}],["path",{d:"M7 11V7a5 5 0 0 1 10 0v4",key:"fwvmzm"}]],rt=M("lock",Re);/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ne=[["path",{d:"m10 17 5-5-5-5",key:"1bsop3"}],["path",{d:"M15 12H3",key:"6jk70r"}],["path",{d:"M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4",key:"u53s6r"}]],st=M("log-in",Ne);/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ae=[["path",{d:"m16 17 5-5-5-5",key:"1bji2h"}],["path",{d:"M21 12H9",key:"dn1m92"}],["path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",key:"1uf3rs"}]],it=M("log-out",Ae);/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Pe=[["path",{d:"m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7",key:"132q7q"}],["rect",{x:"2",y:"4",width:"20",height:"16",rx:"2",key:"izxlao"}]],at=M("mail",Pe);/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _e=[["path",{d:"M12 19v3",key:"npa21l"}],["path",{d:"M19 10v2a7 7 0 0 1-14 0v-2",key:"1vc78b"}],["rect",{x:"9",y:"2",width:"6",height:"13",rx:"3",key:"s6n7sd"}]],lt=M("mic",_e);/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ie=[["path",{d:"M9 18V5l12-2v13",key:"1jmyc2"}],["circle",{cx:"6",cy:"18",r:"3",key:"fqmcym"}],["circle",{cx:"18",cy:"16",r:"3",key:"1hluhg"}]],ct=M("music",Ie);/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Se=[["path",{d:"M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z",key:"10ikf1"}]],ht=M("play",Se);/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Le=[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]],ut=M("plus",Le);/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const be=[["path",{d:"M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915",key:"1i5ecw"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]],dt=M("settings",be);/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Oe=[["circle",{cx:"18",cy:"5",r:"3",key:"gq8acd"}],["circle",{cx:"6",cy:"12",r:"3",key:"w7nqdw"}],["circle",{cx:"18",cy:"19",r:"3",key:"1xt0gg"}],["line",{x1:"8.59",x2:"15.42",y1:"13.51",y2:"17.49",key:"47mynk"}],["line",{x1:"15.41",x2:"8.59",y1:"6.51",y2:"10.49",key:"1n3mei"}]],ft=M("share-2",Oe);/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ze=[["line",{x1:"10",x2:"14",y1:"2",y2:"2",key:"14vaq8"}],["line",{x1:"12",x2:"15",y1:"14",y2:"11",key:"17fdiu"}],["circle",{cx:"12",cy:"14",r:"8",key:"1e1u0o"}]],mt=M("timer",ze);/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xe=[["path",{d:"M10 11v6",key:"nco0om"}],["path",{d:"M14 11v6",key:"outv1u"}],["path",{d:"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6",key:"miytrc"}],["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2",key:"e791ji"}]],gt=M("trash-2",xe);/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Fe=[["path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2",key:"975kel"}],["circle",{cx:"12",cy:"7",r:"4",key:"17ys0d"}]],yt=M("user",Fe);/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Te=[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["path",{d:"M16 3.128a4 4 0 0 1 0 7.744",key:"16gr8j"}],["path",{d:"M22 21v-2a4 4 0 0 0-3-3.87",key:"kshegd"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}]],pt=M("users",Te);/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Be=[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]],Mt=M("x",Be);var $e=Object.defineProperty,x=Object.getOwnPropertySymbols,W=Object.prototype.hasOwnProperty,K=Object.prototype.propertyIsEnumerable,Y=(l,i,s)=>i in l?$e(l,i,{enumerable:!0,configurable:!0,writable:!0,value:s}):l[i]=s,B=(l,i)=>{for(var s in i||(i={}))W.call(i,s)&&Y(l,s,i[s]);if(x)for(var s of x(i))K.call(i,s)&&Y(l,s,i[s]);return l},$=(l,i)=>{var s={};for(var c in l)W.call(l,c)&&i.indexOf(c)<0&&(s[c]=l[c]);if(l!=null&&x)for(var c of x(l))i.indexOf(c)<0&&K.call(l,c)&&(s[c]=l[c]);return s};/**
 * @license QR Code generator library (TypeScript)
 * Copyright (c) Project Nayuki.
 * SPDX-License-Identifier: MIT
 */var I;(l=>{const i=class y{constructor(e,o,t,n){if(this.version=e,this.errorCorrectionLevel=o,this.modules=[],this.isFunction=[],e<y.MIN_VERSION||e>y.MAX_VERSION)throw new RangeError("Version value out of range");if(n<-1||n>7)throw new RangeError("Mask value out of range");this.size=e*4+17;let r=[];for(let a=0;a<this.size;a++)r.push(!1);for(let a=0;a<this.size;a++)this.modules.push(r.slice()),this.isFunction.push(r.slice());this.drawFunctionPatterns();const h=this.addEccAndInterleave(t);if(this.drawCodewords(h),n==-1){let a=1e9;for(let g=0;g<8;g++){this.applyMask(g),this.drawFormatBits(g);const d=this.getPenaltyScore();d<a&&(n=g,a=d),this.applyMask(g)}}f(0<=n&&n<=7),this.mask=n,this.applyMask(n),this.drawFormatBits(n),this.isFunction=[]}static encodeText(e,o){const t=l.QrSegment.makeSegments(e);return y.encodeSegments(t,o)}static encodeBinary(e,o){const t=l.QrSegment.makeBytes(e);return y.encodeSegments([t],o)}static encodeSegments(e,o,t=1,n=40,r=-1,h=!0){if(!(y.MIN_VERSION<=t&&t<=n&&n<=y.MAX_VERSION)||r<-1||r>7)throw new RangeError("Invalid value");let a,g;for(a=t;;a++){const m=y.getNumDataCodewords(a,o)*8,w=C.getTotalBits(e,a);if(w<=m){g=w;break}if(a>=n)throw new RangeError("Data too long")}for(const m of[y.Ecc.MEDIUM,y.Ecc.QUARTILE,y.Ecc.HIGH])h&&g<=y.getNumDataCodewords(a,m)*8&&(o=m);let d=[];for(const m of e){s(m.mode.modeBits,4,d),s(m.numChars,m.mode.numCharCountBits(a),d);for(const w of m.getData())d.push(w)}f(d.length==g);const R=y.getNumDataCodewords(a,o)*8;f(d.length<=R),s(0,Math.min(4,R-d.length),d),s(0,(8-d.length%8)%8,d),f(d.length%8==0);for(let m=236;d.length<R;m^=253)s(m,8,d);let v=[];for(;v.length*8<d.length;)v.push(0);return d.forEach((m,w)=>v[w>>>3]|=m<<7-(w&7)),new y(a,o,v,r)}getModule(e,o){return 0<=e&&e<this.size&&0<=o&&o<this.size&&this.modules[o][e]}getModules(){return this.modules}drawFunctionPatterns(){for(let t=0;t<this.size;t++)this.setFunctionModule(6,t,t%2==0),this.setFunctionModule(t,6,t%2==0);this.drawFinderPattern(3,3),this.drawFinderPattern(this.size-4,3),this.drawFinderPattern(3,this.size-4);const e=this.getAlignmentPatternPositions(),o=e.length;for(let t=0;t<o;t++)for(let n=0;n<o;n++)t==0&&n==0||t==0&&n==o-1||t==o-1&&n==0||this.drawAlignmentPattern(e[t],e[n]);this.drawFormatBits(0),this.drawVersion()}drawFormatBits(e){const o=this.errorCorrectionLevel.formatBits<<3|e;let t=o;for(let r=0;r<10;r++)t=t<<1^(t>>>9)*1335;const n=(o<<10|t)^21522;f(n>>>15==0);for(let r=0;r<=5;r++)this.setFunctionModule(8,r,c(n,r));this.setFunctionModule(8,7,c(n,6)),this.setFunctionModule(8,8,c(n,7)),this.setFunctionModule(7,8,c(n,8));for(let r=9;r<15;r++)this.setFunctionModule(14-r,8,c(n,r));for(let r=0;r<8;r++)this.setFunctionModule(this.size-1-r,8,c(n,r));for(let r=8;r<15;r++)this.setFunctionModule(8,this.size-15+r,c(n,r));this.setFunctionModule(8,this.size-8,!0)}drawVersion(){if(this.version<7)return;let e=this.version;for(let t=0;t<12;t++)e=e<<1^(e>>>11)*7973;const o=this.version<<12|e;f(o>>>18==0);for(let t=0;t<18;t++){const n=c(o,t),r=this.size-11+t%3,h=Math.floor(t/3);this.setFunctionModule(r,h,n),this.setFunctionModule(h,r,n)}}drawFinderPattern(e,o){for(let t=-4;t<=4;t++)for(let n=-4;n<=4;n++){const r=Math.max(Math.abs(n),Math.abs(t)),h=e+n,a=o+t;0<=h&&h<this.size&&0<=a&&a<this.size&&this.setFunctionModule(h,a,r!=2&&r!=4)}}drawAlignmentPattern(e,o){for(let t=-2;t<=2;t++)for(let n=-2;n<=2;n++)this.setFunctionModule(e+n,o+t,Math.max(Math.abs(n),Math.abs(t))!=1)}setFunctionModule(e,o,t){this.modules[o][e]=t,this.isFunction[o][e]=!0}addEccAndInterleave(e){const o=this.version,t=this.errorCorrectionLevel;if(e.length!=y.getNumDataCodewords(o,t))throw new RangeError("Invalid argument");const n=y.NUM_ERROR_CORRECTION_BLOCKS[t.ordinal][o],r=y.ECC_CODEWORDS_PER_BLOCK[t.ordinal][o],h=Math.floor(y.getNumRawDataModules(o)/8),a=n-h%n,g=Math.floor(h/n);let d=[];const R=y.reedSolomonComputeDivisor(r);for(let m=0,w=0;m<n;m++){let N=e.slice(w,w+g-r+(m<a?0:1));w+=N.length;const z=y.reedSolomonComputeRemainder(N,R);m<a&&N.push(0),d.push(N.concat(z))}let v=[];for(let m=0;m<d[0].length;m++)d.forEach((w,N)=>{(m!=g-r||N>=a)&&v.push(w[m])});return f(v.length==h),v}drawCodewords(e){if(e.length!=Math.floor(y.getNumRawDataModules(this.version)/8))throw new RangeError("Invalid argument");let o=0;for(let t=this.size-1;t>=1;t-=2){t==6&&(t=5);for(let n=0;n<this.size;n++)for(let r=0;r<2;r++){const h=t-r,g=(t+1&2)==0?this.size-1-n:n;!this.isFunction[g][h]&&o<e.length*8&&(this.modules[g][h]=c(e[o>>>3],7-(o&7)),o++)}}f(o==e.length*8)}applyMask(e){if(e<0||e>7)throw new RangeError("Mask value out of range");for(let o=0;o<this.size;o++)for(let t=0;t<this.size;t++){let n;switch(e){case 0:n=(t+o)%2==0;break;case 1:n=o%2==0;break;case 2:n=t%3==0;break;case 3:n=(t+o)%3==0;break;case 4:n=(Math.floor(t/3)+Math.floor(o/2))%2==0;break;case 5:n=t*o%2+t*o%3==0;break;case 6:n=(t*o%2+t*o%3)%2==0;break;case 7:n=((t+o)%2+t*o%3)%2==0;break;default:throw new Error("Unreachable")}!this.isFunction[o][t]&&n&&(this.modules[o][t]=!this.modules[o][t])}}getPenaltyScore(){let e=0;for(let r=0;r<this.size;r++){let h=!1,a=0,g=[0,0,0,0,0,0,0];for(let d=0;d<this.size;d++)this.modules[r][d]==h?(a++,a==5?e+=y.PENALTY_N1:a>5&&e++):(this.finderPenaltyAddHistory(a,g),h||(e+=this.finderPenaltyCountPatterns(g)*y.PENALTY_N3),h=this.modules[r][d],a=1);e+=this.finderPenaltyTerminateAndCount(h,a,g)*y.PENALTY_N3}for(let r=0;r<this.size;r++){let h=!1,a=0,g=[0,0,0,0,0,0,0];for(let d=0;d<this.size;d++)this.modules[d][r]==h?(a++,a==5?e+=y.PENALTY_N1:a>5&&e++):(this.finderPenaltyAddHistory(a,g),h||(e+=this.finderPenaltyCountPatterns(g)*y.PENALTY_N3),h=this.modules[d][r],a=1);e+=this.finderPenaltyTerminateAndCount(h,a,g)*y.PENALTY_N3}for(let r=0;r<this.size-1;r++)for(let h=0;h<this.size-1;h++){const a=this.modules[r][h];a==this.modules[r][h+1]&&a==this.modules[r+1][h]&&a==this.modules[r+1][h+1]&&(e+=y.PENALTY_N2)}let o=0;for(const r of this.modules)o=r.reduce((h,a)=>h+(a?1:0),o);const t=this.size*this.size,n=Math.ceil(Math.abs(o*20-t*10)/t)-1;return f(0<=n&&n<=9),e+=n*y.PENALTY_N4,f(0<=e&&e<=2568888),e}getAlignmentPatternPositions(){if(this.version==1)return[];{const e=Math.floor(this.version/7)+2,o=this.version==32?26:Math.ceil((this.version*4+4)/(e*2-2))*2;let t=[6];for(let n=this.size-7;t.length<e;n-=o)t.splice(1,0,n);return t}}static getNumRawDataModules(e){if(e<y.MIN_VERSION||e>y.MAX_VERSION)throw new RangeError("Version number out of range");let o=(16*e+128)*e+64;if(e>=2){const t=Math.floor(e/7)+2;o-=(25*t-10)*t-55,e>=7&&(o-=36)}return f(208<=o&&o<=29648),o}static getNumDataCodewords(e,o){return Math.floor(y.getNumRawDataModules(e)/8)-y.ECC_CODEWORDS_PER_BLOCK[o.ordinal][e]*y.NUM_ERROR_CORRECTION_BLOCKS[o.ordinal][e]}static reedSolomonComputeDivisor(e){if(e<1||e>255)throw new RangeError("Degree out of range");let o=[];for(let n=0;n<e-1;n++)o.push(0);o.push(1);let t=1;for(let n=0;n<e;n++){for(let r=0;r<o.length;r++)o[r]=y.reedSolomonMultiply(o[r],t),r+1<o.length&&(o[r]^=o[r+1]);t=y.reedSolomonMultiply(t,2)}return o}static reedSolomonComputeRemainder(e,o){let t=o.map(n=>0);for(const n of e){const r=n^t.shift();t.push(0),o.forEach((h,a)=>t[a]^=y.reedSolomonMultiply(h,r))}return t}static reedSolomonMultiply(e,o){if(e>>>8||o>>>8)throw new RangeError("Byte out of range");let t=0;for(let n=7;n>=0;n--)t=t<<1^(t>>>7)*285,t^=(o>>>n&1)*e;return f(t>>>8==0),t}finderPenaltyCountPatterns(e){const o=e[1];f(o<=this.size*3);const t=o>0&&e[2]==o&&e[3]==o*3&&e[4]==o&&e[5]==o;return(t&&e[0]>=o*4&&e[6]>=o?1:0)+(t&&e[6]>=o*4&&e[0]>=o?1:0)}finderPenaltyTerminateAndCount(e,o,t){return e&&(this.finderPenaltyAddHistory(o,t),o=0),o+=this.size,this.finderPenaltyAddHistory(o,t),this.finderPenaltyCountPatterns(t)}finderPenaltyAddHistory(e,o){o[0]==0&&(e+=this.size),o.pop(),o.unshift(e)}};i.MIN_VERSION=1,i.MAX_VERSION=40,i.PENALTY_N1=3,i.PENALTY_N2=3,i.PENALTY_N3=40,i.PENALTY_N4=10,i.ECC_CODEWORDS_PER_BLOCK=[[-1,7,10,15,20,26,18,20,24,30,18,20,24,26,30,22,24,28,30,28,28,28,28,30,30,26,28,30,30,30,30,30,30,30,30,30,30,30,30,30,30],[-1,10,16,26,18,24,16,18,22,22,26,30,22,22,24,24,28,28,26,26,26,26,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28],[-1,13,22,18,26,18,24,18,22,20,24,28,26,24,20,30,24,28,28,26,30,28,30,30,30,30,28,30,30,30,30,30,30,30,30,30,30,30,30,30,30],[-1,17,28,22,16,22,28,26,26,24,28,24,28,22,24,24,30,28,28,26,28,30,24,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30]],i.NUM_ERROR_CORRECTION_BLOCKS=[[-1,1,1,1,1,1,2,2,2,2,4,4,4,4,4,6,6,6,6,7,8,8,9,9,10,12,12,12,13,14,15,16,17,18,19,19,20,21,22,24,25],[-1,1,1,1,2,2,4,4,4,5,5,5,8,9,9,10,10,11,13,14,16,17,17,18,20,21,23,25,26,28,29,31,33,35,37,38,40,43,45,47,49],[-1,1,1,2,2,4,4,6,6,8,8,8,10,12,16,12,17,16,18,21,20,23,23,25,27,29,34,34,35,38,40,43,45,48,51,53,56,59,62,65,68],[-1,1,1,2,4,4,4,5,6,8,8,11,11,16,16,18,16,19,21,25,25,25,34,30,32,35,37,40,42,45,48,51,54,57,60,63,66,70,74,77,81]],l.QrCode=i;function s(p,e,o){if(e<0||e>31||p>>>e)throw new RangeError("Value out of range");for(let t=e-1;t>=0;t--)o.push(p>>>t&1)}function c(p,e){return(p>>>e&1)!=0}function f(p){if(!p)throw new Error("Assertion error")}const u=class E{constructor(e,o,t){if(this.mode=e,this.numChars=o,this.bitData=t,o<0)throw new RangeError("Invalid argument");this.bitData=t.slice()}static makeBytes(e){let o=[];for(const t of e)s(t,8,o);return new E(E.Mode.BYTE,e.length,o)}static makeNumeric(e){if(!E.isNumeric(e))throw new RangeError("String contains non-numeric characters");let o=[];for(let t=0;t<e.length;){const n=Math.min(e.length-t,3);s(parseInt(e.substring(t,t+n),10),n*3+1,o),t+=n}return new E(E.Mode.NUMERIC,e.length,o)}static makeAlphanumeric(e){if(!E.isAlphanumeric(e))throw new RangeError("String contains unencodable characters in alphanumeric mode");let o=[],t;for(t=0;t+2<=e.length;t+=2){let n=E.ALPHANUMERIC_CHARSET.indexOf(e.charAt(t))*45;n+=E.ALPHANUMERIC_CHARSET.indexOf(e.charAt(t+1)),s(n,11,o)}return t<e.length&&s(E.ALPHANUMERIC_CHARSET.indexOf(e.charAt(t)),6,o),new E(E.Mode.ALPHANUMERIC,e.length,o)}static makeSegments(e){return e==""?[]:E.isNumeric(e)?[E.makeNumeric(e)]:E.isAlphanumeric(e)?[E.makeAlphanumeric(e)]:[E.makeBytes(E.toUtf8ByteArray(e))]}static makeEci(e){let o=[];if(e<0)throw new RangeError("ECI assignment value out of range");if(e<128)s(e,8,o);else if(e<16384)s(2,2,o),s(e,14,o);else if(e<1e6)s(6,3,o),s(e,21,o);else throw new RangeError("ECI assignment value out of range");return new E(E.Mode.ECI,0,o)}static isNumeric(e){return E.NUMERIC_REGEX.test(e)}static isAlphanumeric(e){return E.ALPHANUMERIC_REGEX.test(e)}getData(){return this.bitData.slice()}static getTotalBits(e,o){let t=0;for(const n of e){const r=n.mode.numCharCountBits(o);if(n.numChars>=1<<r)return 1/0;t+=4+r+n.bitData.length}return t}static toUtf8ByteArray(e){e=encodeURI(e);let o=[];for(let t=0;t<e.length;t++)e.charAt(t)!="%"?o.push(e.charCodeAt(t)):(o.push(parseInt(e.substring(t+1,t+3),16)),t+=2);return o}};u.NUMERIC_REGEX=/^[0-9]*$/,u.ALPHANUMERIC_REGEX=/^[A-Z0-9 $%*+.\/:-]*$/,u.ALPHANUMERIC_CHARSET="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ $%*+-./:";let C=u;l.QrSegment=u})(I||(I={}));(l=>{(i=>{const s=class{constructor(f,u){this.ordinal=f,this.formatBits=u}};s.LOW=new s(0,1),s.MEDIUM=new s(1,0),s.QUARTILE=new s(2,3),s.HIGH=new s(3,2),i.Ecc=s})(l.QrCode||(l.QrCode={}))})(I||(I={}));(l=>{(i=>{const s=class{constructor(f,u){this.modeBits=f,this.numBitsCharCount=u}numCharCountBits(f){return this.numBitsCharCount[Math.floor((f+7)/17)]}};s.NUMERIC=new s(1,[10,12,14]),s.ALPHANUMERIC=new s(2,[9,11,13]),s.BYTE=new s(4,[8,16,16]),s.KANJI=new s(8,[8,10,12]),s.ECI=new s(7,[0,0,0]),i.Mode=s})(l.QrSegment||(l.QrSegment={}))})(I||(I={}));var S=I;/**
 * @license qrcode.react
 * Copyright (c) Paul O'Shannessy
 * SPDX-License-Identifier: ISC
 */var De={L:S.QrCode.Ecc.LOW,M:S.QrCode.Ecc.MEDIUM,Q:S.QrCode.Ecc.QUARTILE,H:S.QrCode.Ecc.HIGH},Z=128,q="L",J="#FFFFFF",ee="#000000",te=!1,oe=1,Ue=4,Qe=0,He=.1;function ne(l,i=0){const s=[];return l.forEach(function(c,f){let u=null;c.forEach(function(C,p){if(!C&&u!==null){s.push(`M${u+i} ${f+i}h${p-u}v1H${u+i}z`),u=null;return}if(p===c.length-1){if(!C)return;u===null?s.push(`M${p+i},${f+i} h1v1H${p+i}z`):s.push(`M${u+i},${f+i} h${p+1-u}v1H${u+i}z`);return}C&&u===null&&(u=p)})}),s.join("")}function re(l,i){return l.slice().map((s,c)=>c<i.y||c>=i.y+i.h?s:s.map((f,u)=>u<i.x||u>=i.x+i.w?f:!1))}function Ve(l,i,s,c){if(c==null)return null;const f=l.length+s*2,u=Math.floor(i*He),C=f/i,p=(c.width||u)*C,e=(c.height||u)*C,o=c.x==null?l.length/2-p/2:c.x*C,t=c.y==null?l.length/2-e/2:c.y*C,n=c.opacity==null?1:c.opacity;let r=null;if(c.excavate){let a=Math.floor(o),g=Math.floor(t),d=Math.ceil(p+o-a),R=Math.ceil(e+t-g);r={x:a,y:g,w:d,h:R}}const h=c.crossOrigin;return{x:o,y:t,h:e,w:p,excavation:r,opacity:n,crossOrigin:h}}function je(l,i){return i!=null?Math.max(Math.floor(i),0):l?Ue:Qe}function se({value:l,level:i,minVersion:s,includeMargin:c,marginSize:f,imageSettings:u,size:C,boostLevel:p}){let e=k.useMemo(()=>{const a=(Array.isArray(l)?l:[l]).reduce((g,d)=>(g.push(...S.QrSegment.makeSegments(d)),g),[]);return S.QrCode.encodeSegments(a,De[i],s,void 0,void 0,p)},[l,i,s,p]);const{cells:o,margin:t,numCells:n,calculatedImageSettings:r}=k.useMemo(()=>{let h=e.getModules();const a=je(c,f),g=h.length+a*2,d=Ve(h,C,a,u);return{cells:h,margin:a,numCells:g,calculatedImageSettings:d}},[e,C,u,c,f]);return{qrcode:e,margin:t,cells:o,numCells:n,calculatedImageSettings:r}}var Ge=(function(){try{new Path2D().addPath(new Path2D)}catch{return!1}return!0})(),Ye=k.forwardRef(function(i,s){const c=i,{value:f,size:u=Z,level:C=q,bgColor:p=J,fgColor:e=ee,includeMargin:o=te,minVersion:t=oe,boostLevel:n,marginSize:r,imageSettings:h}=c,g=$(c,["value","size","level","bgColor","fgColor","includeMargin","minVersion","boostLevel","marginSize","imageSettings"]),{style:d}=g,R=$(g,["style"]),v=h==null?void 0:h.src,m=k.useRef(null),w=k.useRef(null),N=k.useCallback(_=>{m.current=_,typeof s=="function"?s(_):s&&(s.current=_)},[s]),[z,D]=k.useState(!1),{margin:L,cells:F,numCells:T,calculatedImageSettings:A}=se({value:f,level:C,minVersion:t,boostLevel:n,includeMargin:o,marginSize:r,imageSettings:h,size:u});k.useEffect(()=>{if(m.current!=null){const _=m.current,P=_.getContext("2d");if(!P)return;let Q=F;const b=w.current,H=A!=null&&b!==null&&b.complete&&b.naturalHeight!==0&&b.naturalWidth!==0;H&&A.excavation!=null&&(Q=re(F,A.excavation));const V=window.devicePixelRatio||1;_.height=_.width=u*V;const j=u/T*V;P.scale(j,j),P.fillStyle=p,P.fillRect(0,0,T,T),P.fillStyle=e,Ge?P.fill(new Path2D(ne(Q,L))):F.forEach(function(ae,le){ae.forEach(function(ce,he){ce&&P.fillRect(he+L,le+L,1,1)})}),A&&(P.globalAlpha=A.opacity),H&&P.drawImage(b,A.x+L,A.y+L,A.w,A.h)}}),k.useEffect(()=>{D(!1)},[v]);const ie=B({height:u,width:u},d);let U=null;return v!=null&&(U=k.createElement("img",{src:v,key:v,style:{display:"none"},onLoad:()=>{D(!0)},ref:w,crossOrigin:A==null?void 0:A.crossOrigin})),k.createElement(k.Fragment,null,k.createElement("canvas",B({style:ie,height:u,width:u,ref:N,role:"img"},R)),U)});Ye.displayName="QRCodeCanvas";var Xe=k.forwardRef(function(i,s){const c=i,{value:f,size:u=Z,level:C=q,bgColor:p=J,fgColor:e=ee,includeMargin:o=te,minVersion:t=oe,boostLevel:n,title:r,marginSize:h,imageSettings:a}=c,g=$(c,["value","size","level","bgColor","fgColor","includeMargin","minVersion","boostLevel","title","marginSize","imageSettings"]),{margin:d,cells:R,numCells:v,calculatedImageSettings:m}=se({value:f,level:C,minVersion:t,boostLevel:n,includeMargin:o,marginSize:h,imageSettings:a,size:u});let w=R,N=null;a!=null&&m!=null&&(m.excavation!=null&&(w=re(R,m.excavation)),N=k.createElement("image",{href:a.src,height:m.h,width:m.w,x:m.x+d,y:m.y+d,preserveAspectRatio:"none",opacity:m.opacity,crossOrigin:m.crossOrigin}));const z=ne(w,d);return k.createElement("svg",B({height:u,width:u,viewBox:`0 0 ${v} ${v}`,ref:s,role:"img"},g),!!r&&k.createElement("title",null,r),k.createElement("path",{fill:p,d:`M0,0 h${v}v${v}H0z`,shapeRendering:"crispEdges"}),k.createElement("path",{fill:e,d:z,shapeRendering:"crispEdges"}),N)});Xe.displayName="QRCodeSVG";export{Ke as A,Ze as C,it as L,lt as M,ut as P,Xe as Q,dt as S,gt as T,pt as U,Mt as X,nt as a,rt as b,ct as c,ht as d,at as e,st as f,mt as g,qe as h,tt as i,yt as j,Je as k,ft as l,et as m,ot as n};

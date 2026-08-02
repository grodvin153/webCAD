import{U as Yn,c as Lf,N as Jn,S as Eu,C as Mt,R as Nf,e as Tt,w as _t,V as Wt,l as Gs,M as yn,F as yu,W as Vs,a as Qn,b as Ut,L as $i,H as Ti,D as tn,B as En,d as Gr,f as $,p as Uf,g as Vr,h as ii,i as kr,j as Ff,k as jt,O as os,m as At,E as Of,P as Ji,A as zf,n as ta,o as et,q as mi,r as qi,s as nr,t as Hr,u as Oi,v as Bf,x as Gf,y as ir,z as Sn,G as Fa,I as Vf,J as Yi,K as rr,Q as kf,T as Hf,X as yr,Y as Wf,Z as Xf,_ as Yf,$ as $f,a0 as qf,a1 as Kf,a2 as jf,a3 as Zf,a4 as Jf,a5 as Qf,a6 as ep,a7 as tp,a8 as np,a9 as ip,aa as rp,ab as op,ac as ap,ad as na,ae as po,af as sp,ag as Di,ah as lp,ai as cp,aj as as,ak as up,al as ss,am as dp,an as fp,ao as pp,ap as ct,aq as Fo,ar as hp,as as mp,at as zn,au as Li,av as Po,aw as gp,ax as gi,ay as wr,az as yi,aA as _p,aB as Mu,aC as bu,aD as Au,aE as Oo,aF as Tu,aG as Pu,aH as wu,aI as Qr,aJ as xp,aK as vp,aL as Sp,aM as Ep,aN as Ru,aO as yp,aP as Mp,aQ as bp,aR as ia,aS as ra,aT as oa,aU as aa,aV as ks,aW as Hs,aX as Ws,aY as Xs,aZ as Ys,a_ as $s,a$ as qs,b0 as Ks,b1 as js,b2 as Oa,b3 as Zs,b4 as Js,b5 as Qs,b6 as el,b7 as tl,b8 as nl,b9 as il,ba as rl,bb as ol,bc as al,bd as sl,be as ll,bf as cl,bg as ul,bh as dl,bi as fl,bj as pl,bk as hl,bl as ml,bm as gl,bn as za,bo as _l,bp as Ap,bq as Tp,br as Pp,bs as wp,bt as Rp,bu as Cp,bv as Ip,bw as Dp,bx as xl,by as Lp,bz as wo,bA as Np,bB as vl,bC as Sl,bD as El,bE as Cu,bF as ls,bG as Yo,bH as yl,bI as Up,bJ as Iu,bK as cs,bL as Ba,bM as Du,bN as Fp,bO as Lu,bP as Nu,bQ as Uu,bR as Fu,bS as Ou,bT as zu,bU as Bu,bV as hn,bW as Ml,bX as Gu,bY as sa,bZ as la,b_ as Op,b$ as zp,c0 as bl,c1 as Bp,c2 as Vu,c3 as Wr,c4 as or,c5 as dr,c6 as Gp,c7 as Vp,c8 as kp,c9 as Hp,ca as Wp,cb as Xp,cc as Yp,cd as $p,ce as qp,cf as Kp,cg as _i,ch as Ki,ci as Kn,cj as Al,ck as ku,cl as xi,cm as jp,cn as Ga,co as ji,cp as Zp,cq as Mn,cr as us,cs as Jp,ct as qt,cu as eo,cv as Hu,cw as ri,cx as ds,cy as Wu,cz as Dn,cA as Xu,cB as Qp,cC as eh,cD as th,cE as fs,cF as Yu,cG as $u,cH as rn,cI as ps,cJ as hs,cK as Ur,cL as Xr,cM as qu,cN as ms,cO as $o,cP as cn,cQ as nh,cR as Ku,cS as ju,cT as ar,cU as gs,cV as ih,cW as _s,cX as Fr,cY as rh,cZ as oh,c_ as ah,c$ as Or,d0 as nn,d1 as Zu,d2 as zi,d3 as sh,d4 as lh,d5 as fr,d6 as xs,d7 as Ju,d8 as Rr,d9 as ch,da as uh,db as dh,dc as fh,dd as Qu,de as ph,df as hh,dg as mh,dh as gh,di as _h,dj as ed,dk as xh,dl as vh,dm as Tl,dn as Sh,dp as Eh,dq as yh,dr as Mh,ds as vs,dt as Ss,du as bh,dv as Ah,dw as Yr,dx as td,dy as Th,dz as Ph,dA as wh,dB as Es,dC as nd,dD as qo,dE as id,dF as Va,dG as rd,dH as Rh,dI as Ch,dJ as Ih,dK as od,dL as Dh,dM as Pl,dN as Lh,dO as ca,dP as Nh,dQ as Uh,dR as wl,dS as Fh,dT as Oh,dU as zh,dV as Rl,dW as ho,dX as Bh,dY as Gh,dZ as ua}from"./main-BPnEq6Tt.js";function ad(){let e=null,t=!1,n=null,i=null;function r(o,a){n(o,a),i=e.requestAnimationFrame(r)}return{start:function(){t!==!0&&n!==null&&e!==null&&(i=e.requestAnimationFrame(r),t=!0)},stop:function(){e!==null&&e.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(o){n=o},setContext:function(o){e=o}}}function Vh(e){const t=new WeakMap;function n(s,l){const c=s.array,h=s.usage,d=c.byteLength,u=e.createBuffer();e.bindBuffer(l,u),e.bufferData(l,c,h),s.onUploadCallback();let m;if(c instanceof Float32Array)m=e.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)m=e.HALF_FLOAT;else if(c instanceof Uint16Array)s.isFloat16BufferAttribute?m=e.HALF_FLOAT:m=e.UNSIGNED_SHORT;else if(c instanceof Int16Array)m=e.SHORT;else if(c instanceof Uint32Array)m=e.UNSIGNED_INT;else if(c instanceof Int32Array)m=e.INT;else if(c instanceof Int8Array)m=e.BYTE;else if(c instanceof Uint8Array)m=e.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)m=e.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:u,type:m,bytesPerElement:c.BYTES_PER_ELEMENT,version:s.version,size:d}}function i(s,l,c){const h=l.array,d=l.updateRanges;if(e.bindBuffer(c,s),d.length===0)e.bufferSubData(c,0,h);else{d.sort((m,S)=>m.start-S.start);let u=0;for(let m=1;m<d.length;m++){const S=d[u],x=d[m];x.start<=S.start+S.count+1?S.count=Math.max(S.count,x.start+x.count-S.start):(++u,d[u]=x)}d.length=u+1;for(let m=0,S=d.length;m<S;m++){const x=d[m];e.bufferSubData(c,x.start*h.BYTES_PER_ELEMENT,h,x.start,x.count)}l.clearUpdateRanges()}l.onUploadCallback()}function r(s){return s.isInterleavedBufferAttribute&&(s=s.data),t.get(s)}function o(s){s.isInterleavedBufferAttribute&&(s=s.data);const l=t.get(s);l&&(e.deleteBuffer(l.buffer),t.delete(s))}function a(s,l){if(s.isInterleavedBufferAttribute&&(s=s.data),s.isGLBufferAttribute){const h=t.get(s);(!h||h.version<s.version)&&t.set(s,{buffer:s.buffer,type:s.type,bytesPerElement:s.elementSize,version:s.version});return}const c=t.get(s);if(c===void 0)t.set(s,n(s,l));else if(c.version<s.version){if(c.size!==s.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,s,l),c.version=s.version}}return{get:r,remove:o,update:a}}var kh=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Hh=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Wh=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Xh=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Yh=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,$h=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,qh=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Kh=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,jh=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,Zh=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Jh=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Qh=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,em=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,tm=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,nm=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,im=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,rm=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,om=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,am=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,sm=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,lm=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,cm=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,um=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,dm=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,fm=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,pm=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,hm=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,mm=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,gm=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,_m=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,xm="gl_FragColor = linearToOutputTexel( gl_FragColor );",vm=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Sm=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,Em=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,ym=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Mm=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,bm=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Am=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Tm=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Pm=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,wm=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Rm=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Cm=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Im=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Dm=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Lm=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,Nm=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Um=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Fm=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Om=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,zm=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Bm=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Gm=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
		vec3 iridescenceFresnelDielectric;
		vec3 iridescenceFresnelMetallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
vec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 dfgV = texture2D( dfgLUT, vec2( material.roughness, dotNV ) ).rg;
	vec2 dfgL = texture2D( dfgLUT, vec2( material.roughness, dotNL ) ).rg;
	vec3 FssEss_V = material.specularColorBlended * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColorBlended * dfgL.x + material.specularF90 * dfgL.y;
	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;
	vec3 Favg = material.specularColorBlended + ( 1.0 - material.specularColorBlended ) * 0.047619;
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg + EPSILON );
	float compensationFactor = Ems_V * Ems_L;
	vec3 multiScatter = Fms * compensationFactor;
	return singleScatter + multiScatter;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnelDielectric, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceFresnelMetallic, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Vm=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( material.iridescenceFresnelDielectric, material.iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,km=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Hm=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Wm=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,Xm=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Ym=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,$m=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,qm=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Km=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,jm=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Zm=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Jm=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Qm=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,eg=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,tg=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,ng=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,ig=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,rg=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,og=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,ag=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,sg=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,lg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,cg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,ug=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,dg=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,fg=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,pg=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,hg=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,mg=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,gg=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,_g=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,xg=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,vg=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Sg=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Eg=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,yg=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Mg=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,bg=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,Ag=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Tg=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Pg=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,wg=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Rg=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Cg=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Ig=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Dg=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Lg=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Ng=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Ug=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Fg=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Og=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,zg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Bg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Gg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Vg=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const kg=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Hg=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Wg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Xg=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Yg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,$g=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,qg=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Kg=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,jg=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Zg=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,Jg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Qg=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,e_=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,t_=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,n_=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,i_=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,r_=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,o_=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,a_=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,s_=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,l_=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,c_=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,u_=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,d_=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,f_=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,p_=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,h_=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,m_=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,g_=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,__=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,x_=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,v_=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,S_=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,E_=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,ot={alphahash_fragment:kh,alphahash_pars_fragment:Hh,alphamap_fragment:Wh,alphamap_pars_fragment:Xh,alphatest_fragment:Yh,alphatest_pars_fragment:$h,aomap_fragment:qh,aomap_pars_fragment:Kh,batching_pars_vertex:jh,batching_vertex:Zh,begin_vertex:Jh,beginnormal_vertex:Qh,bsdfs:em,iridescence_fragment:tm,bumpmap_pars_fragment:nm,clipping_planes_fragment:im,clipping_planes_pars_fragment:rm,clipping_planes_pars_vertex:om,clipping_planes_vertex:am,color_fragment:sm,color_pars_fragment:lm,color_pars_vertex:cm,color_vertex:um,common:dm,cube_uv_reflection_fragment:fm,defaultnormal_vertex:pm,displacementmap_pars_vertex:hm,displacementmap_vertex:mm,emissivemap_fragment:gm,emissivemap_pars_fragment:_m,colorspace_fragment:xm,colorspace_pars_fragment:vm,envmap_fragment:Sm,envmap_common_pars_fragment:Em,envmap_pars_fragment:ym,envmap_pars_vertex:Mm,envmap_physical_pars_fragment:Nm,envmap_vertex:bm,fog_vertex:Am,fog_pars_vertex:Tm,fog_fragment:Pm,fog_pars_fragment:wm,gradientmap_pars_fragment:Rm,lightmap_pars_fragment:Cm,lights_lambert_fragment:Im,lights_lambert_pars_fragment:Dm,lights_pars_begin:Lm,lights_toon_fragment:Um,lights_toon_pars_fragment:Fm,lights_phong_fragment:Om,lights_phong_pars_fragment:zm,lights_physical_fragment:Bm,lights_physical_pars_fragment:Gm,lights_fragment_begin:Vm,lights_fragment_maps:km,lights_fragment_end:Hm,lightprobes_pars_fragment:Wm,logdepthbuf_fragment:Xm,logdepthbuf_pars_fragment:Ym,logdepthbuf_pars_vertex:$m,logdepthbuf_vertex:qm,map_fragment:Km,map_pars_fragment:jm,map_particle_fragment:Zm,map_particle_pars_fragment:Jm,metalnessmap_fragment:Qm,metalnessmap_pars_fragment:eg,morphinstance_vertex:tg,morphcolor_vertex:ng,morphnormal_vertex:ig,morphtarget_pars_vertex:rg,morphtarget_vertex:og,normal_fragment_begin:ag,normal_fragment_maps:sg,normal_pars_fragment:lg,normal_pars_vertex:cg,normal_vertex:ug,normalmap_pars_fragment:dg,clearcoat_normal_fragment_begin:fg,clearcoat_normal_fragment_maps:pg,clearcoat_pars_fragment:hg,iridescence_pars_fragment:mg,opaque_fragment:gg,packing:_g,premultiplied_alpha_fragment:xg,project_vertex:vg,dithering_fragment:Sg,dithering_pars_fragment:Eg,roughnessmap_fragment:yg,roughnessmap_pars_fragment:Mg,shadowmap_pars_fragment:bg,shadowmap_pars_vertex:Ag,shadowmap_vertex:Tg,shadowmask_pars_fragment:Pg,skinbase_vertex:wg,skinning_pars_vertex:Rg,skinning_vertex:Cg,skinnormal_vertex:Ig,specularmap_fragment:Dg,specularmap_pars_fragment:Lg,tonemapping_fragment:Ng,tonemapping_pars_fragment:Ug,transmission_fragment:Fg,transmission_pars_fragment:Og,uv_pars_fragment:zg,uv_pars_vertex:Bg,uv_vertex:Gg,worldpos_vertex:Vg,background_vert:kg,background_frag:Hg,backgroundCube_vert:Wg,backgroundCube_frag:Xg,cube_vert:Yg,cube_frag:$g,depth_vert:qg,depth_frag:Kg,distance_vert:jg,distance_frag:Zg,equirect_vert:Jg,equirect_frag:Qg,linedashed_vert:e_,linedashed_frag:t_,meshbasic_vert:n_,meshbasic_frag:i_,meshlambert_vert:r_,meshlambert_frag:o_,meshmatcap_vert:a_,meshmatcap_frag:s_,meshnormal_vert:l_,meshnormal_frag:c_,meshphong_vert:u_,meshphong_frag:d_,meshphysical_vert:f_,meshphysical_frag:p_,meshtoon_vert:h_,meshtoon_frag:m_,points_vert:g_,points_frag:__,shadow_vert:x_,shadow_frag:v_,sprite_vert:S_,sprite_frag:E_},Re={common:{diffuse:{value:new Mt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ct},alphaMap:{value:null},alphaMapTransform:{value:new ct},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ct}},envmap:{envMap:{value:null},envMapRotation:{value:new ct},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ct}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ct}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ct},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ct},normalScale:{value:new et(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ct},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ct}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ct}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ct}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Mt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new $},probesMax:{value:new $},probesResolution:{value:new $}},points:{diffuse:{value:new Mt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ct},alphaTest:{value:0},uvTransform:{value:new ct}},sprite:{diffuse:{value:new Mt(16777215)},opacity:{value:1},center:{value:new et(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ct},alphaMap:{value:null},alphaMapTransform:{value:new ct},alphaTest:{value:0}}},mn={basic:{uniforms:hn([Re.common,Re.specularmap,Re.envmap,Re.aomap,Re.lightmap,Re.fog]),vertexShader:ot.meshbasic_vert,fragmentShader:ot.meshbasic_frag},lambert:{uniforms:hn([Re.common,Re.specularmap,Re.envmap,Re.aomap,Re.lightmap,Re.emissivemap,Re.bumpmap,Re.normalmap,Re.displacementmap,Re.fog,Re.lights,{emissive:{value:new Mt(0)},envMapIntensity:{value:1}}]),vertexShader:ot.meshlambert_vert,fragmentShader:ot.meshlambert_frag},phong:{uniforms:hn([Re.common,Re.specularmap,Re.envmap,Re.aomap,Re.lightmap,Re.emissivemap,Re.bumpmap,Re.normalmap,Re.displacementmap,Re.fog,Re.lights,{emissive:{value:new Mt(0)},specular:{value:new Mt(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:ot.meshphong_vert,fragmentShader:ot.meshphong_frag},standard:{uniforms:hn([Re.common,Re.envmap,Re.aomap,Re.lightmap,Re.emissivemap,Re.bumpmap,Re.normalmap,Re.displacementmap,Re.roughnessmap,Re.metalnessmap,Re.fog,Re.lights,{emissive:{value:new Mt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ot.meshphysical_vert,fragmentShader:ot.meshphysical_frag},toon:{uniforms:hn([Re.common,Re.aomap,Re.lightmap,Re.emissivemap,Re.bumpmap,Re.normalmap,Re.displacementmap,Re.gradientmap,Re.fog,Re.lights,{emissive:{value:new Mt(0)}}]),vertexShader:ot.meshtoon_vert,fragmentShader:ot.meshtoon_frag},matcap:{uniforms:hn([Re.common,Re.bumpmap,Re.normalmap,Re.displacementmap,Re.fog,{matcap:{value:null}}]),vertexShader:ot.meshmatcap_vert,fragmentShader:ot.meshmatcap_frag},points:{uniforms:hn([Re.points,Re.fog]),vertexShader:ot.points_vert,fragmentShader:ot.points_frag},dashed:{uniforms:hn([Re.common,Re.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ot.linedashed_vert,fragmentShader:ot.linedashed_frag},depth:{uniforms:hn([Re.common,Re.displacementmap]),vertexShader:ot.depth_vert,fragmentShader:ot.depth_frag},normal:{uniforms:hn([Re.common,Re.bumpmap,Re.normalmap,Re.displacementmap,{opacity:{value:1}}]),vertexShader:ot.meshnormal_vert,fragmentShader:ot.meshnormal_frag},sprite:{uniforms:hn([Re.sprite,Re.fog]),vertexShader:ot.sprite_vert,fragmentShader:ot.sprite_frag},background:{uniforms:{uvTransform:{value:new ct},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ot.background_vert,fragmentShader:ot.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new ct}},vertexShader:ot.backgroundCube_vert,fragmentShader:ot.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ot.cube_vert,fragmentShader:ot.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ot.equirect_vert,fragmentShader:ot.equirect_frag},distance:{uniforms:hn([Re.common,Re.displacementmap,{referencePosition:{value:new $},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ot.distance_vert,fragmentShader:ot.distance_frag},shadow:{uniforms:hn([Re.lights,Re.fog,{color:{value:new Mt(0)},opacity:{value:1}}]),vertexShader:ot.shadow_vert,fragmentShader:ot.shadow_frag}};mn.physical={uniforms:hn([mn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ct},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ct},clearcoatNormalScale:{value:new et(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ct},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ct},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ct},sheen:{value:0},sheenColor:{value:new Mt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ct},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ct},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ct},transmissionSamplerSize:{value:new et},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ct},attenuationDistance:{value:0},attenuationColor:{value:new Mt(0)},specularColor:{value:new Mt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ct},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ct},anisotropyVector:{value:new et},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ct}}]),vertexShader:ot.meshphysical_vert,fragmentShader:ot.meshphysical_frag};const mo={r:0,b:0,g:0},y_=new yn,sd=new ct;sd.set(-1,0,0,0,1,0,0,0,1);function M_(e,t,n,i,r,o){const a=new Mt(0);let s=r===!0?0:1,l,c,h=null,d=0,u=null;function m(M){let A=M.isScene===!0?M.background:null;if(A&&A.isTexture){const v=M.backgroundBlurriness>0;A=t.get(A,v)}return A}function S(M){let A=!1;const v=m(M);v===null?f(a,s):v&&v.isColor&&(f(v,1),A=!0);const y=e.xr.getEnvironmentBlendMode();y==="additive"?n.buffers.color.setClear(0,0,0,1,o):y==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(e.autoClear||A)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil))}function x(M,A){const v=m(A);v&&(v.isCubeTexture||v.mapping===Yo)?(c===void 0&&(c=new jt(new cs(1,1,1),new zn({name:"BackgroundCubeMaterial",uniforms:Ba(mn.backgroundCube.uniforms),vertexShader:mn.backgroundCube.vertexShader,fragmentShader:mn.backgroundCube.fragmentShader,side:En,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(y,E,T){this.matrixWorld.copyPosition(T.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(c)),c.material.uniforms.envMap.value=v,c.material.uniforms.backgroundBlurriness.value=A.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=A.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(y_.makeRotationFromEuler(A.backgroundRotation)).transpose(),v.isCubeTexture&&v.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(sd),c.material.toneMapped=Ut.getTransfer(v.colorSpace)!==At,(h!==v||d!==v.version||u!==e.toneMapping)&&(c.material.needsUpdate=!0,h=v,d=v.version,u=e.toneMapping),c.layers.enableAll(),M.unshift(c,c.geometry,c.material,0,0,null)):v&&v.isTexture&&(l===void 0&&(l=new jt(new Qr(2,2),new zn({name:"BackgroundMaterial",uniforms:Ba(mn.background.uniforms),vertexShader:mn.background.vertexShader,fragmentShader:mn.background.fragmentShader,side:Gr,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=v,l.material.uniforms.backgroundIntensity.value=A.backgroundIntensity,l.material.toneMapped=Ut.getTransfer(v.colorSpace)!==At,v.matrixAutoUpdate===!0&&v.updateMatrix(),l.material.uniforms.uvTransform.value.copy(v.matrix),(h!==v||d!==v.version||u!==e.toneMapping)&&(l.material.needsUpdate=!0,h=v,d=v.version,u=e.toneMapping),l.layers.enableAll(),M.unshift(l,l.geometry,l.material,0,0,null))}function f(M,A){M.getRGB(mo,Iu(e)),n.buffers.color.setClear(mo.r,mo.g,mo.b,A,o)}function p(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(M,A=1){a.set(M),s=A,f(a,s)},getClearAlpha:function(){return s},setClearAlpha:function(M){s=M,f(a,s)},render:S,addToRenderList:x,dispose:p}}function b_(e,t){const n=e.getParameter(e.MAX_VERTEX_ATTRIBS),i={},r=u(null);let o=r,a=!1;function s(I,U,V,k,B){let Y=!1;const D=d(I,k,V,U);o!==D&&(o=D,c(o.object)),Y=m(I,k,V,B),Y&&S(I,k,V,B),B!==null&&t.update(B,e.ELEMENT_ARRAY_BUFFER),(Y||a)&&(a=!1,v(I,U,V,k),B!==null&&e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,t.get(B).buffer))}function l(){return e.createVertexArray()}function c(I){return e.bindVertexArray(I)}function h(I){return e.deleteVertexArray(I)}function d(I,U,V,k){const B=k.wireframe===!0;let Y=i[U.id];Y===void 0&&(Y={},i[U.id]=Y);const D=I.isInstancedMesh===!0?I.id:0;let j=Y[D];j===void 0&&(j={},Y[D]=j);let ae=j[V.id];ae===void 0&&(ae={},j[V.id]=ae);let q=ae[B];return q===void 0&&(q=u(l()),ae[B]=q),q}function u(I){const U=[],V=[],k=[];for(let B=0;B<n;B++)U[B]=0,V[B]=0,k[B]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:U,enabledAttributes:V,attributeDivisors:k,object:I,attributes:{},index:null}}function m(I,U,V,k){const B=o.attributes,Y=U.attributes;let D=0;const j=V.getAttributes();for(const ae in j)if(j[ae].location>=0){const ne=B[ae];let ue=Y[ae];if(ue===void 0&&(ae==="instanceMatrix"&&I.instanceMatrix&&(ue=I.instanceMatrix),ae==="instanceColor"&&I.instanceColor&&(ue=I.instanceColor)),ne===void 0||ne.attribute!==ue||ue&&ne.data!==ue.data)return!0;D++}return o.attributesNum!==D||o.index!==k}function S(I,U,V,k){const B={},Y=U.attributes;let D=0;const j=V.getAttributes();for(const ae in j)if(j[ae].location>=0){let ne=Y[ae];ne===void 0&&(ae==="instanceMatrix"&&I.instanceMatrix&&(ne=I.instanceMatrix),ae==="instanceColor"&&I.instanceColor&&(ne=I.instanceColor));const ue={};ue.attribute=ne,ne&&ne.data&&(ue.data=ne.data),B[ae]=ue,D++}o.attributes=B,o.attributesNum=D,o.index=k}function x(){const I=o.newAttributes;for(let U=0,V=I.length;U<V;U++)I[U]=0}function f(I){p(I,0)}function p(I,U){const V=o.newAttributes,k=o.enabledAttributes,B=o.attributeDivisors;V[I]=1,k[I]===0&&(e.enableVertexAttribArray(I),k[I]=1),B[I]!==U&&(e.vertexAttribDivisor(I,U),B[I]=U)}function M(){const I=o.newAttributes,U=o.enabledAttributes;for(let V=0,k=U.length;V<k;V++)U[V]!==I[V]&&(e.disableVertexAttribArray(V),U[V]=0)}function A(I,U,V,k,B,Y,D){D===!0?e.vertexAttribIPointer(I,U,V,B,Y):e.vertexAttribPointer(I,U,V,k,B,Y)}function v(I,U,V,k){x();const B=k.attributes,Y=V.getAttributes(),D=U.defaultAttributeValues;for(const j in Y){const ae=Y[j];if(ae.location>=0){let q=B[j];if(q===void 0&&(j==="instanceMatrix"&&I.instanceMatrix&&(q=I.instanceMatrix),j==="instanceColor"&&I.instanceColor&&(q=I.instanceColor)),q!==void 0){const ne=q.normalized,ue=q.itemSize,we=t.get(q);if(we===void 0)continue;const Le=we.buffer,ze=we.type,J=we.bytesPerElement,ce=ze===e.INT||ze===e.UNSIGNED_INT||q.gpuType===Ru;if(q.isInterleavedBufferAttribute){const O=q.data,xe=O.stride,ee=q.offset;if(O.isInstancedInterleavedBuffer){for(let W=0;W<ae.locationSize;W++)p(ae.location+W,O.meshPerAttribute);I.isInstancedMesh!==!0&&k._maxInstanceCount===void 0&&(k._maxInstanceCount=O.meshPerAttribute*O.count)}else for(let W=0;W<ae.locationSize;W++)f(ae.location+W);e.bindBuffer(e.ARRAY_BUFFER,Le);for(let W=0;W<ae.locationSize;W++)A(ae.location+W,ue/ae.locationSize,ze,ne,xe*J,(ee+ue/ae.locationSize*W)*J,ce)}else{if(q.isInstancedBufferAttribute){for(let O=0;O<ae.locationSize;O++)p(ae.location+O,q.meshPerAttribute);I.isInstancedMesh!==!0&&k._maxInstanceCount===void 0&&(k._maxInstanceCount=q.meshPerAttribute*q.count)}else for(let O=0;O<ae.locationSize;O++)f(ae.location+O);e.bindBuffer(e.ARRAY_BUFFER,Le);for(let O=0;O<ae.locationSize;O++)A(ae.location+O,ue/ae.locationSize,ze,ne,ue*J,ue/ae.locationSize*O*J,ce)}}else if(D!==void 0){const ne=D[j];if(ne!==void 0)switch(ne.length){case 2:e.vertexAttrib2fv(ae.location,ne);break;case 3:e.vertexAttrib3fv(ae.location,ne);break;case 4:e.vertexAttrib4fv(ae.location,ne);break;default:e.vertexAttrib1fv(ae.location,ne)}}}}M()}function y(){P();for(const I in i){const U=i[I];for(const V in U){const k=U[V];for(const B in k){const Y=k[B];for(const D in Y)h(Y[D].object),delete Y[D];delete k[B]}}delete i[I]}}function E(I){if(i[I.id]===void 0)return;const U=i[I.id];for(const V in U){const k=U[V];for(const B in k){const Y=k[B];for(const D in Y)h(Y[D].object),delete Y[D];delete k[B]}}delete i[I.id]}function T(I){for(const U in i){const V=i[U];for(const k in V){const B=V[k];if(B[I.id]===void 0)continue;const Y=B[I.id];for(const D in Y)h(Y[D].object),delete Y[D];delete B[I.id]}}}function g(I){for(const U in i){const V=i[U],k=I.isInstancedMesh===!0?I.id:0,B=V[k];if(B!==void 0){for(const Y in B){const D=B[Y];for(const j in D)h(D[j].object),delete D[j];delete B[Y]}delete V[k],Object.keys(V).length===0&&delete i[U]}}}function P(){C(),a=!0,o!==r&&(o=r,c(o.object))}function C(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:s,reset:P,resetDefaultState:C,dispose:y,releaseStatesOfGeometry:E,releaseStatesOfObject:g,releaseStatesOfProgram:T,initAttributes:x,enableAttribute:f,disableUnusedAttributes:M}}function A_(e,t,n){let i;function r(l){i=l}function o(l,c){e.drawArrays(i,l,c),n.update(c,i,1)}function a(l,c,h){h!==0&&(e.drawArraysInstanced(i,l,c,h),n.update(c,i,h))}function s(l,c,h){if(h===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,c,0,h);let u=0;for(let m=0;m<h;m++)u+=c[m];n.update(u,i,1)}this.setMode=r,this.render=o,this.renderInstances=a,this.renderMultiDraw=s}function T_(e,t,n,i){let r;function o(){if(r!==void 0)return r;if(t.has("EXT_texture_filter_anisotropic")===!0){const T=t.get("EXT_texture_filter_anisotropic");r=e.getParameter(T.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function a(T){return!(T!==mi&&i.convert(T)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT))}function s(T){const g=T===Ti&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(T!==Yn&&i.convert(T)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE)&&T!==yi&&!g)}function l(T){if(T==="highp"){if(e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).precision>0)return"highp";T="mediump"}return T==="mediump"&&e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=n.precision!==void 0?n.precision:"highp";const h=l(c);h!==c&&(_t("WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const d=n.logarithmicDepthBuffer===!0,u=n.reversedDepthBuffer===!0&&t.has("EXT_clip_control");n.reversedDepthBuffer===!0&&u===!1&&_t("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const m=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),S=e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=e.getParameter(e.MAX_TEXTURE_SIZE),f=e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),p=e.getParameter(e.MAX_VERTEX_ATTRIBS),M=e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),A=e.getParameter(e.MAX_VARYING_VECTORS),v=e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),y=e.getParameter(e.MAX_SAMPLES),E=e.getParameter(e.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:o,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:s,precision:c,logarithmicDepthBuffer:d,reversedDepthBuffer:u,maxTextures:m,maxVertexTextures:S,maxTextureSize:x,maxCubemapSize:f,maxAttributes:p,maxVertexUniforms:M,maxVaryings:A,maxFragmentUniforms:v,maxSamples:y,samples:E}}function P_(e){const t=this;let n=null,i=0,r=!1,o=!1;const a=new Fo,s=new ct,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,u){const m=d.length!==0||u||i!==0||r;return r=u,i=d.length,m},this.beginShadows=function(){o=!0,h(null)},this.endShadows=function(){o=!1},this.setGlobalState=function(d,u){n=h(d,u,0)},this.setState=function(d,u,m){const S=d.clippingPlanes,x=d.clipIntersection,f=d.clipShadows,p=e.get(d);if(!r||S===null||S.length===0||o&&!f)o?h(null):c();else{const M=o?0:i,A=M*4;let v=p.clippingState||null;l.value=v,v=h(S,u,A,m);for(let y=0;y!==A;++y)v[y]=n[y];p.clippingState=v,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=M}};function c(){l.value!==n&&(l.value=n,l.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function h(d,u,m,S){const x=d!==null?d.length:0;let f=null;if(x!==0){if(f=l.value,S!==!0||f===null){const p=m+x*4,M=u.matrixWorldInverse;s.getNormalMatrix(M),(f===null||f.length<p)&&(f=new Float32Array(p));for(let A=0,v=m;A!==x;++A,v+=4)a.copy(d[A]).applyMatrix4(M,s),a.normal.toArray(f,v),f[v+3]=a.constant}l.value=f,l.needsUpdate=!0}return t.numPlanes=x,t.numIntersection=0,f}}const Mi=4,Cl=[.125,.215,.35,.446,.526,.582],Ri=20,w_=256,Mr=new os,Il=new Mt;let da=null,fa=0,pa=0,ha=!1;const R_=new $;class Dl{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(t,n=0,i=.1,r=100,o={}){const{size:a=256,position:s=R_}=o;da=this._renderer.getRenderTarget(),fa=this._renderer.getActiveCubeFace(),pa=this._renderer.getActiveMipmapLevel(),ha=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(t,i,r,l,s),n>0&&this._blur(l,0,0,n),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(t,n=null){return this._fromTexture(t,n)}fromCubemap(t,n=null){return this._fromTexture(t,n)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Ul(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Nl(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodMeshes.length;t++)this._lodMeshes[t].geometry.dispose()}_cleanup(t){this._renderer.setRenderTarget(da,fa,pa),this._renderer.xr.enabled=ha,t.scissorTest=!1,Wi(t,0,0,t.width,t.height)}_fromTexture(t,n){t.mapping===Wr||t.mapping===or?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),da=this._renderer.getRenderTarget(),fa=this._renderer.getActiveCubeFace(),pa=this._renderer.getActiveMipmapLevel(),ha=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=n||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),n=4*this._cubeSize,i={magFilter:Sn,minFilter:Sn,generateMipmaps:!1,type:Ti,format:mi,colorSpace:Vu,depthBuffer:!1},r=Ll(t,n,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==n){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Ll(t,n,i);const{_lodMax:o}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=C_(o)),this._blurMaterial=D_(o,t,n),this._ggxMaterial=I_(o,t,n)}return r}_compileMaterial(t){const n=new jt(new ii,t);this._renderer.compile(n,Mr)}_sceneToCubeUV(t,n,i,r,o){const l=new Ji(90,1,n,i),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],d=this._renderer,u=d.autoClear,m=d.toneMapping;d.getClearColor(Il),d.toneMapping=Jn,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(r),d.clearDepth(),d.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new jt(new cs,new dr({name:"PMREM.Background",side:En,depthWrite:!1,depthTest:!1})));const x=this._backgroundBox,f=x.material;let p=!1;const M=t.background;M?M.isColor&&(f.color.copy(M),t.background=null,p=!0):(f.color.copy(Il),p=!0);for(let A=0;A<6;A++){const v=A%3;v===0?(l.up.set(0,c[A],0),l.position.set(o.x,o.y,o.z),l.lookAt(o.x+h[A],o.y,o.z)):v===1?(l.up.set(0,0,c[A]),l.position.set(o.x,o.y,o.z),l.lookAt(o.x,o.y+h[A],o.z)):(l.up.set(0,c[A],0),l.position.set(o.x,o.y,o.z),l.lookAt(o.x,o.y,o.z+h[A]));const y=this._cubeSize;Wi(r,v*y,A>2?y:0,y,y),d.setRenderTarget(r),p&&d.render(x,l),d.render(t,l)}d.toneMapping=m,d.autoClear=u,t.background=M}_textureToCubeUV(t,n){const i=this._renderer,r=t.mapping===Wr||t.mapping===or;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Ul()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Nl());const o=r?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=o;const s=o.uniforms;s.envMap.value=t;const l=this._cubeSize;Wi(n,0,0,3*l,2*l),i.setRenderTarget(n),i.render(a,Mr)}_applyPMREM(t){const n=this._renderer,i=n.autoClear;n.autoClear=!1;const r=this._lodMeshes.length;for(let o=1;o<r;o++)this._applyGGXFilter(t,o-1,o);n.autoClear=i}_applyGGXFilter(t,n,i){const r=this._renderer,o=this._pingPongRenderTarget,a=this._ggxMaterial,s=this._lodMeshes[i];s.material=a;const l=a.uniforms,c=i/(this._lodMeshes.length-1),h=n/(this._lodMeshes.length-1),d=Math.sqrt(c*c-h*h),u=0+c*1.25,m=d*u,{_lodMax:S}=this,x=this._sizeLods[i],f=3*x*(i>S-Mi?i-S+Mi:0),p=4*(this._cubeSize-x);l.envMap.value=t.texture,l.roughness.value=m,l.mipInt.value=S-n,Wi(o,f,p,3*x,2*x),r.setRenderTarget(o),r.render(s,Mr),l.envMap.value=o.texture,l.roughness.value=0,l.mipInt.value=S-i,Wi(t,f,p,3*x,2*x),r.setRenderTarget(t),r.render(s,Mr)}_blur(t,n,i,r,o){const a=this._pingPongRenderTarget;this._halfBlur(t,a,n,i,r,"latitudinal",o),this._halfBlur(a,t,i,i,r,"longitudinal",o)}_halfBlur(t,n,i,r,o,a,s){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&Tt("blur direction must be either latitudinal or longitudinal!");const h=3,d=this._lodMeshes[r];d.material=c;const u=c.uniforms,m=this._sizeLods[i]-1,S=isFinite(o)?Math.PI/(2*m):2*Math.PI/(2*Ri-1),x=o/S,f=isFinite(o)?1+Math.floor(h*x):Ri;f>Ri&&_t(`sigmaRadians, ${o}, is too large and will clip, as it requested ${f} samples when the maximum is set to ${Ri}`);const p=[];let M=0;for(let T=0;T<Ri;++T){const g=T/x,P=Math.exp(-g*g/2);p.push(P),T===0?M+=P:T<f&&(M+=2*P)}for(let T=0;T<p.length;T++)p[T]=p[T]/M;u.envMap.value=t.texture,u.samples.value=f,u.weights.value=p,u.latitudinal.value=a==="latitudinal",s&&(u.poleAxis.value=s);const{_lodMax:A}=this;u.dTheta.value=S,u.mipInt.value=A-i;const v=this._sizeLods[r],y=3*v*(r>A-Mi?r-A+Mi:0),E=4*(this._cubeSize-v);Wi(n,y,E,3*v,2*v),l.setRenderTarget(n),l.render(d,Mr)}}function C_(e){const t=[],n=[],i=[];let r=e;const o=e-Mi+1+Cl.length;for(let a=0;a<o;a++){const s=Math.pow(2,r);t.push(s);let l=1/s;a>e-Mi?l=Cl[a-e+Mi-1]:a===0&&(l=0),n.push(l);const c=1/(s-2),h=-c,d=1+c,u=[h,h,d,h,d,d,h,h,d,d,h,d],m=6,S=6,x=3,f=2,p=1,M=new Float32Array(x*S*m),A=new Float32Array(f*S*m),v=new Float32Array(p*S*m);for(let E=0;E<m;E++){const T=E%3*2/3-1,g=E>2?0:-1,P=[T,g,0,T+2/3,g,0,T+2/3,g+1,0,T,g,0,T+2/3,g+1,0,T,g+1,0];M.set(P,x*S*E),A.set(u,f*S*E);const C=[E,E,E,E,E,E];v.set(C,p*S*E)}const y=new ii;y.setAttribute("position",new Li(M,x)),y.setAttribute("uv",new Li(A,f)),y.setAttribute("faceIndex",new Li(v,p)),i.push(new jt(y,null)),r>Mi&&r--}return{lodMeshes:i,sizeLods:t,sigmas:n}}function Ll(e,t,n){const i=new Qn(e,t,n);return i.texture.mapping=Yo,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Wi(e,t,n,i,r){e.viewport.set(t,n,i,r),e.scissor.set(t,n,i,r)}function I_(e,t,n){return new zn({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:w_,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Ko(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:gi,depthTest:!1,depthWrite:!1})}function D_(e,t,n){const i=new Float32Array(Ri),r=new $(0,1,0);return new zn({name:"SphericalGaussianBlur",defines:{n:Ri,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:Ko(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:gi,depthTest:!1,depthWrite:!1})}function Nl(){return new zn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Ko(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:gi,depthTest:!1,depthWrite:!1})}function Ul(){return new zn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ko(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:gi,depthTest:!1,depthWrite:!1})}function Ko(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}class ld extends Qn{constructor(t=1,n={}){super(t,t,n),this.isWebGLCubeRenderTarget=!0;const i={width:t,height:t,depth:1},r=[i,i,i,i,i,i];this.texture=new Du(r),this._setTextureOptions(n),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,n){this.texture.type=n.type,this.texture.colorSpace=n.colorSpace,this.texture.generateMipmaps=n.generateMipmaps,this.texture.minFilter=n.minFilter,this.texture.magFilter=n.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new cs(5,5,5),o=new zn({name:"CubemapFromEquirect",uniforms:Ba(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:En,blending:gi});o.uniforms.tEquirect.value=n;const a=new jt(r,o),s=n.minFilter;return n.minFilter===$i&&(n.minFilter=Sn),new Fp(1,10,this).update(t,a),n.minFilter=s,a.geometry.dispose(),a.material.dispose(),this}clear(t,n=!0,i=!0,r=!0){const o=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(n,i,r);t.setRenderTarget(o)}}function L_(e){let t=new WeakMap,n=new WeakMap,i=null;function r(u,m=!1){return u==null?null:m?a(u):o(u)}function o(u){if(u&&u.isTexture){const m=u.mapping;if(m===sa||m===la)if(t.has(u)){const S=t.get(u).texture;return s(S,u.mapping)}else{const S=u.image;if(S&&S.height>0){const x=new ld(S.height);return x.fromEquirectangularTexture(e,u),t.set(u,x),u.addEventListener("dispose",c),s(x.texture,u.mapping)}else return null}}return u}function a(u){if(u&&u.isTexture){const m=u.mapping,S=m===sa||m===la,x=m===Wr||m===or;if(S||x){let f=n.get(u);const p=f!==void 0?f.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==p)return i===null&&(i=new Dl(e)),f=S?i.fromEquirectangular(u,f):i.fromCubemap(u,f),f.texture.pmremVersion=u.pmremVersion,n.set(u,f),f.texture;if(f!==void 0)return f.texture;{const M=u.image;return S&&M&&M.height>0||x&&M&&l(M)?(i===null&&(i=new Dl(e)),f=S?i.fromEquirectangular(u):i.fromCubemap(u),f.texture.pmremVersion=u.pmremVersion,n.set(u,f),u.addEventListener("dispose",h),f.texture):null}}}return u}function s(u,m){return m===sa?u.mapping=Wr:m===la&&(u.mapping=or),u}function l(u){let m=0;const S=6;for(let x=0;x<S;x++)u[x]!==void 0&&m++;return m===S}function c(u){const m=u.target;m.removeEventListener("dispose",c);const S=t.get(m);S!==void 0&&(t.delete(m),S.dispose())}function h(u){const m=u.target;m.removeEventListener("dispose",h);const S=n.get(m);S!==void 0&&(n.delete(m),S.dispose())}function d(){t=new WeakMap,n=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:r,dispose:d}}function N_(e){const t={};function n(i){if(t[i]!==void 0)return t[i];const r=e.getExtension(i);return t[i]=r,r}return{has:function(i){return n(i)!==null},init:function(){n("EXT_color_buffer_float"),n("WEBGL_clip_cull_distance"),n("OES_texture_float_linear"),n("EXT_color_buffer_half_float"),n("WEBGL_multisampled_render_to_texture"),n("WEBGL_render_shared_exponent")},get:function(i){const r=n(i);return r===null&&Vf("WebGLRenderer: "+i+" extension not supported."),r}}}function U_(e,t,n,i){const r={},o=new WeakMap;function a(d){const u=d.target;u.index!==null&&t.remove(u.index);for(const S in u.attributes)t.remove(u.attributes[S]);u.removeEventListener("dispose",a),delete r[u.id];const m=o.get(u);m&&(t.remove(m),o.delete(u)),i.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,n.memory.geometries--}function s(d,u){return r[u.id]===!0||(u.addEventListener("dispose",a),r[u.id]=!0,n.memory.geometries++),u}function l(d){const u=d.attributes;for(const m in u)t.update(u[m],e.ARRAY_BUFFER)}function c(d){const u=[],m=d.index,S=d.attributes.position;let x=0;if(S===void 0)return;if(m!==null){const M=m.array;x=m.version;for(let A=0,v=M.length;A<v;A+=3){const y=M[A+0],E=M[A+1],T=M[A+2];u.push(y,E,E,T,T,y)}}else{const M=S.array;x=S.version;for(let A=0,v=M.length/3-1;A<v;A+=3){const y=A+0,E=A+1,T=A+2;u.push(y,E,E,T,T,y)}}const f=new(S.count>=65535?Op:zp)(u,1);f.version=x;const p=o.get(d);p&&t.remove(p),o.set(d,f)}function h(d){const u=o.get(d);if(u){const m=d.index;m!==null&&u.version<m.version&&c(d)}else c(d);return o.get(d)}return{get:s,update:l,getWireframeAttribute:h}}function F_(e,t,n){let i;function r(d){i=d}let o,a;function s(d){o=d.type,a=d.bytesPerElement}function l(d,u){e.drawElements(i,u,o,d*a),n.update(u,i,1)}function c(d,u,m){m!==0&&(e.drawElementsInstanced(i,u,o,d*a,m),n.update(u,i,m))}function h(d,u,m){if(m===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,u,0,o,d,0,m);let x=0;for(let f=0;f<m;f++)x+=u[f];n.update(x,i,1)}this.setMode=r,this.setIndex=s,this.render=l,this.renderInstances=c,this.renderMultiDraw=h}function O_(e){const t={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function i(o,a,s){switch(n.calls++,a){case e.TRIANGLES:n.triangles+=s*(o/3);break;case e.LINES:n.lines+=s*(o/2);break;case e.LINE_STRIP:n.lines+=s*(o-1);break;case e.LINE_LOOP:n.lines+=s*o;break;case e.POINTS:n.points+=s*o;break;default:Tt("WebGLInfo: Unknown draw mode:",a);break}}function r(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:t,render:n,programs:null,autoReset:!0,reset:r,update:i}}function z_(e,t,n){const i=new WeakMap,r=new Wt;function o(a,s,l){const c=a.morphTargetInfluences,h=s.morphAttributes.position||s.morphAttributes.normal||s.morphAttributes.color,d=h!==void 0?h.length:0;let u=i.get(s);if(u===void 0||u.count!==d){let P=function(){T.dispose(),i.delete(s),s.removeEventListener("dispose",P)};u!==void 0&&u.texture.dispose();const m=s.morphAttributes.position!==void 0,S=s.morphAttributes.normal!==void 0,x=s.morphAttributes.color!==void 0,f=s.morphAttributes.position||[],p=s.morphAttributes.normal||[],M=s.morphAttributes.color||[];let A=0;m===!0&&(A=1),S===!0&&(A=2),x===!0&&(A=3);let v=s.attributes.position.count*A,y=1;v>t.maxTextureSize&&(y=Math.ceil(v/t.maxTextureSize),v=t.maxTextureSize);const E=new Float32Array(v*y*4*d),T=new Cu(E,v,y,d);T.type=yi,T.needsUpdate=!0;const g=A*4;for(let C=0;C<d;C++){const I=f[C],U=p[C],V=M[C],k=v*y*4*C;for(let B=0;B<I.count;B++){const Y=B*g;m===!0&&(r.fromBufferAttribute(I,B),E[k+Y+0]=r.x,E[k+Y+1]=r.y,E[k+Y+2]=r.z,E[k+Y+3]=0),S===!0&&(r.fromBufferAttribute(U,B),E[k+Y+4]=r.x,E[k+Y+5]=r.y,E[k+Y+6]=r.z,E[k+Y+7]=0),x===!0&&(r.fromBufferAttribute(V,B),E[k+Y+8]=r.x,E[k+Y+9]=r.y,E[k+Y+10]=r.z,E[k+Y+11]=V.itemSize===4?r.w:1)}}u={count:d,texture:T,size:new et(v,y)},i.set(s,u),s.addEventListener("dispose",P)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(e,"morphTexture",a.morphTexture,n);else{let m=0;for(let x=0;x<c.length;x++)m+=c[x];const S=s.morphTargetsRelative?1:1-m;l.getUniforms().setValue(e,"morphTargetBaseInfluence",S),l.getUniforms().setValue(e,"morphTargetInfluences",c)}l.getUniforms().setValue(e,"morphTargetsTexture",u.texture,n),l.getUniforms().setValue(e,"morphTargetsTextureSize",u.size)}return{update:o}}function B_(e,t,n,i,r){let o=new WeakMap;function a(c){const h=r.render.frame,d=c.geometry,u=t.get(c,d);if(o.get(u)!==h&&(t.update(u),o.set(u,h)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),o.get(c)!==h&&(n.update(c.instanceMatrix,e.ARRAY_BUFFER),c.instanceColor!==null&&n.update(c.instanceColor,e.ARRAY_BUFFER),o.set(c,h))),c.isSkinnedMesh){const m=c.skeleton;o.get(m)!==h&&(m.update(),o.set(m,h))}return u}function s(){o=new WeakMap}function l(c){const h=c.target;h.removeEventListener("dispose",l),i.releaseStatesOfObject(h),n.remove(h.instanceMatrix),h.instanceColor!==null&&n.remove(h.instanceColor)}return{update:a,dispose:s}}const G_={[Bu]:"LINEAR_TONE_MAPPING",[zu]:"REINHARD_TONE_MAPPING",[Ou]:"CINEON_TONE_MAPPING",[Fu]:"ACES_FILMIC_TONE_MAPPING",[Uu]:"AGX_TONE_MAPPING",[Nu]:"NEUTRAL_TONE_MAPPING",[Lu]:"CUSTOM_TONE_MAPPING"};function V_(e,t,n,i,r,o){const a=new Qn(t,n,{type:e,depthBuffer:r,stencilBuffer:o,samples:i?4:0,depthTexture:r?new Vr(t,n):void 0}),s=new Qn(t,n,{type:Ti,depthBuffer:!1,stencilBuffer:!1}),l=new ii;l.setAttribute("position",new kr([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute("uv",new kr([0,2,0,0,2,0],2));const c=new Ff({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),h=new jt(l,c),d=new os(-1,1,1,-1,0,1);let u=null,m=null,S=!1,x,f=null,p=[],M=!1;this.setSize=function(A,v){a.setSize(A,v),s.setSize(A,v);for(let y=0;y<p.length;y++){const E=p[y];E.setSize&&E.setSize(A,v)}},this.setEffects=function(A){p=A,M=p.length>0&&p[0].isRenderPass===!0;const v=a.width,y=a.height;for(let E=0;E<p.length;E++){const T=p[E];T.setSize&&T.setSize(v,y)}},this.begin=function(A,v){if(S||A.toneMapping===Jn&&p.length===0)return!1;if(f=v,v!==null){const y=v.width,E=v.height;(a.width!==y||a.height!==E)&&this.setSize(y,E)}return M===!1&&A.setRenderTarget(a),x=A.toneMapping,A.toneMapping=Jn,!0},this.hasRenderPass=function(){return M},this.end=function(A,v){A.toneMapping=x,S=!0;let y=a,E=s;for(let T=0;T<p.length;T++){const g=p[T];if(g.enabled!==!1&&(g.render(A,E,y,v),g.needsSwap!==!1)){const P=y;y=E,E=P}}if(u!==A.outputColorSpace||m!==A.toneMapping){u=A.outputColorSpace,m=A.toneMapping,c.defines={},Ut.getTransfer(u)===At&&(c.defines.SRGB_TRANSFER="");const T=G_[m];T&&(c.defines[T]=""),c.needsUpdate=!0}c.uniforms.tDiffuse.value=y.texture,A.setRenderTarget(f),A.render(h,d),f=null,S=!1},this.isCompositing=function(){return S},this.dispose=function(){a.depthTexture&&a.depthTexture.dispose(),a.dispose(),s.dispose(),l.dispose(),c.dispose()}}const cd=new Xp,ka=new Vr(1,1),ud=new Cu,dd=new Gp,fd=new Du,Fl=[],Ol=[],zl=new Float32Array(16),Bl=new Float32Array(9),Gl=new Float32Array(4);function pr(e,t,n){const i=e[0];if(i<=0||i>0)return e;const r=t*n;let o=Fl[r];if(o===void 0&&(o=new Float32Array(r),Fl[r]=o),t!==0){i.toArray(o,0);for(let a=1,s=0;a!==t;++a)s+=n,e[a].toArray(o,s)}return o}function Yt(e,t){if(e.length!==t.length)return!1;for(let n=0,i=e.length;n<i;n++)if(e[n]!==t[n])return!1;return!0}function $t(e,t){for(let n=0,i=t.length;n<i;n++)e[n]=t[n]}function jo(e,t){let n=Ol[t];n===void 0&&(n=new Int32Array(t),Ol[t]=n);for(let i=0;i!==t;++i)n[i]=e.allocateTextureUnit();return n}function k_(e,t){const n=this.cache;n[0]!==t&&(e.uniform1f(this.addr,t),n[0]=t)}function H_(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2f(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Yt(n,t))return;e.uniform2fv(this.addr,t),$t(n,t)}}function W_(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3f(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else if(t.r!==void 0)(n[0]!==t.r||n[1]!==t.g||n[2]!==t.b)&&(e.uniform3f(this.addr,t.r,t.g,t.b),n[0]=t.r,n[1]=t.g,n[2]=t.b);else{if(Yt(n,t))return;e.uniform3fv(this.addr,t),$t(n,t)}}function X_(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4f(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Yt(n,t))return;e.uniform4fv(this.addr,t),$t(n,t)}}function Y_(e,t){const n=this.cache,i=t.elements;if(i===void 0){if(Yt(n,t))return;e.uniformMatrix2fv(this.addr,!1,t),$t(n,t)}else{if(Yt(n,i))return;Gl.set(i),e.uniformMatrix2fv(this.addr,!1,Gl),$t(n,i)}}function $_(e,t){const n=this.cache,i=t.elements;if(i===void 0){if(Yt(n,t))return;e.uniformMatrix3fv(this.addr,!1,t),$t(n,t)}else{if(Yt(n,i))return;Bl.set(i),e.uniformMatrix3fv(this.addr,!1,Bl),$t(n,i)}}function q_(e,t){const n=this.cache,i=t.elements;if(i===void 0){if(Yt(n,t))return;e.uniformMatrix4fv(this.addr,!1,t),$t(n,t)}else{if(Yt(n,i))return;zl.set(i),e.uniformMatrix4fv(this.addr,!1,zl),$t(n,i)}}function K_(e,t){const n=this.cache;n[0]!==t&&(e.uniform1i(this.addr,t),n[0]=t)}function j_(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2i(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Yt(n,t))return;e.uniform2iv(this.addr,t),$t(n,t)}}function Z_(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3i(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(Yt(n,t))return;e.uniform3iv(this.addr,t),$t(n,t)}}function J_(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4i(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Yt(n,t))return;e.uniform4iv(this.addr,t),$t(n,t)}}function Q_(e,t){const n=this.cache;n[0]!==t&&(e.uniform1ui(this.addr,t),n[0]=t)}function ex(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2ui(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Yt(n,t))return;e.uniform2uiv(this.addr,t),$t(n,t)}}function tx(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3ui(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(Yt(n,t))return;e.uniform3uiv(this.addr,t),$t(n,t)}}function nx(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4ui(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Yt(n,t))return;e.uniform4uiv(this.addr,t),$t(n,t)}}function ix(e,t,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(e.uniform1i(this.addr,r),i[0]=r);let o;this.type===e.SAMPLER_2D_SHADOW?(ka.compareFunction=n.isReversedDepthBuffer()?as:ss,o=ka):o=cd,n.setTexture2D(t||o,r)}function rx(e,t,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(e.uniform1i(this.addr,r),i[0]=r),n.setTexture3D(t||dd,r)}function ox(e,t,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(e.uniform1i(this.addr,r),i[0]=r),n.setTextureCube(t||fd,r)}function ax(e,t,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(e.uniform1i(this.addr,r),i[0]=r),n.setTexture2DArray(t||ud,r)}function sx(e){switch(e){case 5126:return k_;case 35664:return H_;case 35665:return W_;case 35666:return X_;case 35674:return Y_;case 35675:return $_;case 35676:return q_;case 5124:case 35670:return K_;case 35667:case 35671:return j_;case 35668:case 35672:return Z_;case 35669:case 35673:return J_;case 5125:return Q_;case 36294:return ex;case 36295:return tx;case 36296:return nx;case 35678:case 36198:case 36298:case 36306:case 35682:return ix;case 35679:case 36299:case 36307:return rx;case 35680:case 36300:case 36308:case 36293:return ox;case 36289:case 36303:case 36311:case 36292:return ax}}function lx(e,t){e.uniform1fv(this.addr,t)}function cx(e,t){const n=pr(t,this.size,2);e.uniform2fv(this.addr,n)}function ux(e,t){const n=pr(t,this.size,3);e.uniform3fv(this.addr,n)}function dx(e,t){const n=pr(t,this.size,4);e.uniform4fv(this.addr,n)}function fx(e,t){const n=pr(t,this.size,4);e.uniformMatrix2fv(this.addr,!1,n)}function px(e,t){const n=pr(t,this.size,9);e.uniformMatrix3fv(this.addr,!1,n)}function hx(e,t){const n=pr(t,this.size,16);e.uniformMatrix4fv(this.addr,!1,n)}function mx(e,t){e.uniform1iv(this.addr,t)}function gx(e,t){e.uniform2iv(this.addr,t)}function _x(e,t){e.uniform3iv(this.addr,t)}function xx(e,t){e.uniform4iv(this.addr,t)}function vx(e,t){e.uniform1uiv(this.addr,t)}function Sx(e,t){e.uniform2uiv(this.addr,t)}function Ex(e,t){e.uniform3uiv(this.addr,t)}function yx(e,t){e.uniform4uiv(this.addr,t)}function Mx(e,t,n){const i=this.cache,r=t.length,o=jo(n,r);Yt(i,o)||(e.uniform1iv(this.addr,o),$t(i,o));let a;this.type===e.SAMPLER_2D_SHADOW?a=ka:a=cd;for(let s=0;s!==r;++s)n.setTexture2D(t[s]||a,o[s])}function bx(e,t,n){const i=this.cache,r=t.length,o=jo(n,r);Yt(i,o)||(e.uniform1iv(this.addr,o),$t(i,o));for(let a=0;a!==r;++a)n.setTexture3D(t[a]||dd,o[a])}function Ax(e,t,n){const i=this.cache,r=t.length,o=jo(n,r);Yt(i,o)||(e.uniform1iv(this.addr,o),$t(i,o));for(let a=0;a!==r;++a)n.setTextureCube(t[a]||fd,o[a])}function Tx(e,t,n){const i=this.cache,r=t.length,o=jo(n,r);Yt(i,o)||(e.uniform1iv(this.addr,o),$t(i,o));for(let a=0;a!==r;++a)n.setTexture2DArray(t[a]||ud,o[a])}function Px(e){switch(e){case 5126:return lx;case 35664:return cx;case 35665:return ux;case 35666:return dx;case 35674:return fx;case 35675:return px;case 35676:return hx;case 5124:case 35670:return mx;case 35667:case 35671:return gx;case 35668:case 35672:return _x;case 35669:case 35673:return xx;case 5125:return vx;case 36294:return Sx;case 36295:return Ex;case 36296:return yx;case 35678:case 36198:case 36298:case 36306:case 35682:return Mx;case 35679:case 36299:case 36307:return bx;case 35680:case 36300:case 36308:case 36293:return Ax;case 36289:case 36303:case 36311:case 36292:return Tx}}class wx{constructor(t,n,i){this.id=t,this.addr=i,this.cache=[],this.type=n.type,this.setValue=sx(n.type)}}class Rx{constructor(t,n,i){this.id=t,this.addr=i,this.cache=[],this.type=n.type,this.size=n.size,this.setValue=Px(n.type)}}class Cx{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,n,i){const r=this.seq;for(let o=0,a=r.length;o!==a;++o){const s=r[o];s.setValue(t,n[s.id],i)}}}const ma=/(\w+)(\])?(\[|\.)?/g;function Vl(e,t){e.seq.push(t),e.map[t.id]=t}function Ix(e,t,n){const i=e.name,r=i.length;for(ma.lastIndex=0;;){const o=ma.exec(i),a=ma.lastIndex;let s=o[1];const l=o[2]==="]",c=o[3];if(l&&(s=s|0),c===void 0||c==="["&&a+2===r){Vl(n,c===void 0?new wx(s,e,t):new Rx(s,e,t));break}else{let d=n.map[s];d===void 0&&(d=new Cx(s),Vl(n,d)),n=d}}}class Ro{constructor(t,n){this.seq=[],this.map={};const i=t.getProgramParameter(n,t.ACTIVE_UNIFORMS);for(let a=0;a<i;++a){const s=t.getActiveUniform(n,a),l=t.getUniformLocation(n,s.name);Ix(s,l,this)}const r=[],o=[];for(const a of this.seq)a.type===t.SAMPLER_2D_SHADOW||a.type===t.SAMPLER_CUBE_SHADOW||a.type===t.SAMPLER_2D_ARRAY_SHADOW?r.push(a):o.push(a);r.length>0&&(this.seq=r.concat(o))}setValue(t,n,i,r){const o=this.map[n];o!==void 0&&o.setValue(t,i,r)}setOptional(t,n,i){const r=n[i];r!==void 0&&this.setValue(t,i,r)}static upload(t,n,i,r){for(let o=0,a=n.length;o!==a;++o){const s=n[o],l=i[s.id];l.needsUpdate!==!1&&s.setValue(t,l.value,r)}}static seqWithValue(t,n){const i=[];for(let r=0,o=t.length;r!==o;++r){const a=t[r];a.id in n&&i.push(a)}return i}}function kl(e,t,n){const i=e.createShader(t);return e.shaderSource(i,n),e.compileShader(i),i}const Dx=37297;let Lx=0;function Nx(e,t){const n=e.split(`
`),i=[],r=Math.max(t-6,0),o=Math.min(t+6,n.length);for(let a=r;a<o;a++){const s=a+1;i.push(`${s===t?">":" "} ${s}: ${n[a]}`)}return i.join(`
`)}const Hl=new ct;function Ux(e){Ut._getMatrix(Hl,Ut.workingColorSpace,e);const t=`mat3( ${Hl.elements.map(n=>n.toFixed(4))} )`;switch(Ut.getTransfer(e)){case Gu:return[t,"LinearTransferOETF"];case At:return[t,"sRGBTransferOETF"];default:return _t("WebGLProgram: Unsupported color space: ",e),[t,"LinearTransferOETF"]}}function Wl(e,t,n){const i=e.getShaderParameter(t,e.COMPILE_STATUS),o=(e.getShaderInfoLog(t)||"").trim();if(i&&o==="")return"";const a=/ERROR: 0:(\d+)/.exec(o);if(a){const s=parseInt(a[1]);return n.toUpperCase()+`

`+o+`

`+Nx(e.getShaderSource(t),s)}else return o}function Fx(e,t){const n=Ux(t);return[`vec4 ${e}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,"}"].join(`
`)}const Ox={[Bu]:"Linear",[zu]:"Reinhard",[Ou]:"Cineon",[Fu]:"ACESFilmic",[Uu]:"AgX",[Nu]:"Neutral",[Lu]:"Custom"};function zx(e,t){const n=Ox[t];return n===void 0?(_t("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+e+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+e+"( vec3 color ) { return "+n+"ToneMapping( color ); }"}const go=new $;function Bx(){Ut.getLuminanceCoefficients(go);const e=go.x.toFixed(4),t=go.y.toFixed(4),n=go.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${e}, ${t}, ${n} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Gx(e){return[e.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",e.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Cr).join(`
`)}function Vx(e){const t=[];for(const n in e){const i=e[n];i!==!1&&t.push("#define "+n+" "+i)}return t.join(`
`)}function kx(e,t){const n={},i=e.getProgramParameter(t,e.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const o=e.getActiveAttrib(t,r),a=o.name;let s=1;o.type===e.FLOAT_MAT2&&(s=2),o.type===e.FLOAT_MAT3&&(s=3),o.type===e.FLOAT_MAT4&&(s=4),n[a]={type:o.type,location:e.getAttribLocation(t,a),locationSize:s}}return n}function Cr(e){return e!==""}function Xl(e,t){const n=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return e.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Yl(e,t){return e.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const Hx=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ha(e){return e.replace(Hx,Xx)}const Wx=new Map;function Xx(e,t){let n=ot[t];if(n===void 0){const i=Wx.get(t);if(i!==void 0)n=ot[i],_t('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+t+">")}return Ha(n)}const Yx=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function $l(e){return e.replace(Yx,$x)}function $x(e,t,n,i){let r="";for(let o=parseInt(t);o<parseInt(n);o++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+o+" ]").replace(/UNROLLED_LOOP_INDEX/g,o);return r}function ql(e){let t=`precision ${e.precision} float;
	precision ${e.precision} int;
	precision ${e.precision} sampler2D;
	precision ${e.precision} samplerCube;
	precision ${e.precision} sampler3D;
	precision ${e.precision} sampler2DArray;
	precision ${e.precision} sampler2DShadow;
	precision ${e.precision} samplerCubeShadow;
	precision ${e.precision} sampler2DArrayShadow;
	precision ${e.precision} isampler2D;
	precision ${e.precision} isampler3D;
	precision ${e.precision} isamplerCube;
	precision ${e.precision} isampler2DArray;
	precision ${e.precision} usampler2D;
	precision ${e.precision} usampler3D;
	precision ${e.precision} usamplerCube;
	precision ${e.precision} usampler2DArray;
	`;return e.precision==="highp"?t+=`
#define HIGH_PRECISION`:e.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:e.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}const qx={[Po]:"SHADOWMAP_TYPE_PCF",[wr]:"SHADOWMAP_TYPE_VSM"};function Kx(e){return qx[e.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const jx={[Wr]:"ENVMAP_TYPE_CUBE",[or]:"ENVMAP_TYPE_CUBE",[Yo]:"ENVMAP_TYPE_CUBE_UV"};function Zx(e){return e.envMap===!1?"ENVMAP_TYPE_CUBE":jx[e.envMapMode]||"ENVMAP_TYPE_CUBE"}const Jx={[or]:"ENVMAP_MODE_REFRACTION"};function Qx(e){return e.envMap===!1?"ENVMAP_MODE_REFLECTION":Jx[e.envMapMode]||"ENVMAP_MODE_REFLECTION"}const ev={[Wp]:"ENVMAP_BLENDING_MULTIPLY",[Hp]:"ENVMAP_BLENDING_MIX",[kp]:"ENVMAP_BLENDING_ADD"};function tv(e){return e.envMap===!1?"ENVMAP_BLENDING_NONE":ev[e.combine]||"ENVMAP_BLENDING_NONE"}function nv(e){const t=e.envMapCubeUVHeight;if(t===null)return null;const n=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,n),112)),texelHeight:i,maxMip:n}}function iv(e,t,n,i){const r=e.getContext(),o=n.defines;let a=n.vertexShader,s=n.fragmentShader;const l=Kx(n),c=Zx(n),h=Qx(n),d=tv(n),u=nv(n),m=Gx(n),S=Vx(o),x=r.createProgram();let f,p,M=n.glslVersion?"#version "+n.glslVersion+`
`:"";n.isRawShaderMaterial?(f=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,S].filter(Cr).join(`
`),f.length>0&&(f+=`
`),p=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,S].filter(Cr).join(`
`),p.length>0&&(p+=`
`)):(f=[ql(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,S,n.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",n.batching?"#define USE_BATCHING":"",n.batchingColor?"#define USE_BATCHING_COLOR":"",n.instancing?"#define USE_INSTANCING":"",n.instancingColor?"#define USE_INSTANCING_COLOR":"",n.instancingMorph?"#define USE_INSTANCING_MORPH":"",n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.map?"#define USE_MAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+h:"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.displacementMap?"#define USE_DISPLACEMENTMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.mapUv?"#define MAP_UV "+n.mapUv:"",n.alphaMapUv?"#define ALPHAMAP_UV "+n.alphaMapUv:"",n.lightMapUv?"#define LIGHTMAP_UV "+n.lightMapUv:"",n.aoMapUv?"#define AOMAP_UV "+n.aoMapUv:"",n.emissiveMapUv?"#define EMISSIVEMAP_UV "+n.emissiveMapUv:"",n.bumpMapUv?"#define BUMPMAP_UV "+n.bumpMapUv:"",n.normalMapUv?"#define NORMALMAP_UV "+n.normalMapUv:"",n.displacementMapUv?"#define DISPLACEMENTMAP_UV "+n.displacementMapUv:"",n.metalnessMapUv?"#define METALNESSMAP_UV "+n.metalnessMapUv:"",n.roughnessMapUv?"#define ROUGHNESSMAP_UV "+n.roughnessMapUv:"",n.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+n.anisotropyMapUv:"",n.clearcoatMapUv?"#define CLEARCOATMAP_UV "+n.clearcoatMapUv:"",n.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+n.clearcoatNormalMapUv:"",n.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+n.clearcoatRoughnessMapUv:"",n.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+n.iridescenceMapUv:"",n.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+n.iridescenceThicknessMapUv:"",n.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+n.sheenColorMapUv:"",n.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+n.sheenRoughnessMapUv:"",n.specularMapUv?"#define SPECULARMAP_UV "+n.specularMapUv:"",n.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+n.specularColorMapUv:"",n.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+n.specularIntensityMapUv:"",n.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+n.transmissionMapUv:"",n.thicknessMapUv?"#define THICKNESSMAP_UV "+n.thicknessMapUv:"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexNormals?"#define HAS_NORMAL":"",n.vertexColors?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.flatShading?"#define FLAT_SHADED":"",n.skinning?"#define USE_SKINNING":"",n.morphTargets?"#define USE_MORPHTARGETS":"",n.morphNormals&&n.flatShading===!1?"#define USE_MORPHNORMALS":"",n.morphColors?"#define USE_MORPHCOLORS":"",n.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+n.morphTextureStride:"",n.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+n.morphTargetsCount:"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+l:"",n.sizeAttenuation?"#define USE_SIZEATTENUATION":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",n.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Cr).join(`
`),p=[ql(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,S,n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",n.map?"#define USE_MAP":"",n.matcap?"#define USE_MATCAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+c:"",n.envMap?"#define "+h:"",n.envMap?"#define "+d:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoat?"#define USE_CLEARCOAT":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.dispersion?"#define USE_DISPERSION":"",n.iridescence?"#define USE_IRIDESCENCE":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaTest?"#define USE_ALPHATEST":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.sheen?"#define USE_SHEEN":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors||n.instancingColor?"#define USE_COLOR":"",n.vertexAlphas||n.batchingColor?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.gradientMap?"#define USE_GRADIENTMAP":"",n.flatShading?"#define FLAT_SHADED":"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+l:"",n.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",n.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",n.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",n.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",n.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",n.toneMapping!==Jn?"#define TONE_MAPPING":"",n.toneMapping!==Jn?ot.tonemapping_pars_fragment:"",n.toneMapping!==Jn?zx("toneMapping",n.toneMapping):"",n.dithering?"#define DITHERING":"",n.opaque?"#define OPAQUE":"",ot.colorspace_pars_fragment,Fx("linearToOutputTexel",n.outputColorSpace),Bx(),n.useDepthPacking?"#define DEPTH_PACKING "+n.depthPacking:"",`
`].filter(Cr).join(`
`)),a=Ha(a),a=Xl(a,n),a=Yl(a,n),s=Ha(s),s=Xl(s,n),s=Yl(s,n),a=$l(a),s=$l(s),n.isRawShaderMaterial!==!0&&(M=`#version 300 es
`,f=[m,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+f,p=["#define varying in",n.glslVersion===bl?"":"layout(location = 0) out highp vec4 pc_fragColor;",n.glslVersion===bl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const A=M+f+a,v=M+p+s,y=kl(r,r.VERTEX_SHADER,A),E=kl(r,r.FRAGMENT_SHADER,v);r.attachShader(x,y),r.attachShader(x,E),n.index0AttributeName!==void 0?r.bindAttribLocation(x,0,n.index0AttributeName):n.hasPositionAttribute===!0&&r.bindAttribLocation(x,0,"position"),r.linkProgram(x);function T(I){if(e.debug.checkShaderErrors){const U=r.getProgramInfoLog(x)||"",V=r.getShaderInfoLog(y)||"",k=r.getShaderInfoLog(E)||"",B=U.trim(),Y=V.trim(),D=k.trim();let j=!0,ae=!0;if(r.getProgramParameter(x,r.LINK_STATUS)===!1)if(j=!1,typeof e.debug.onShaderError=="function")e.debug.onShaderError(r,x,y,E);else{const q=Wl(r,y,"vertex"),ne=Wl(r,E,"fragment");Tt("WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(x,r.VALIDATE_STATUS)+`

Material Name: `+I.name+`
Material Type: `+I.type+`

Program Info Log: `+B+`
`+q+`
`+ne)}else B!==""?_t("WebGLProgram: Program Info Log:",B):(Y===""||D==="")&&(ae=!1);ae&&(I.diagnostics={runnable:j,programLog:B,vertexShader:{log:Y,prefix:f},fragmentShader:{log:D,prefix:p}})}r.deleteShader(y),r.deleteShader(E),g=new Ro(r,x),P=kx(r,x)}let g;this.getUniforms=function(){return g===void 0&&T(this),g};let P;this.getAttributes=function(){return P===void 0&&T(this),P};let C=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return C===!1&&(C=r.getProgramParameter(x,Dx)),C},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(x),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=Lx++,this.cacheKey=t,this.usedTimes=1,this.program=x,this.vertexShader=y,this.fragmentShader=E,this}let rv=0;class ov{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t,n,i){const r=this._getShaderCacheForMaterial(t);return r.has(n)===!1&&(r.add(n),n.usedTimes++),r.has(i)===!1&&(r.add(i),i.usedTimes++),this}remove(t){const n=this.materialCache.get(t);for(const i of n)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderStage(t){return this._getShaderStage(t.vertexShader)}getFragmentShaderStage(t){return this._getShaderStage(t.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const n=this.materialCache;let i=n.get(t);return i===void 0&&(i=new Set,n.set(t,i)),i}_getShaderStage(t){const n=this.shaderCache;let i=n.get(t);return i===void 0&&(i=new av(t),n.set(t,i)),i}}class av{constructor(t){this.id=rv++,this.code=t,this.usedTimes=0}}function sv(e){return e===ir||e===Oa||e===za}function lv(e,t,n,i,r,o){const a=new Bp,s=new ov,l=new Set,c=[],h=new Map,d=i.logarithmicDepthBuffer;let u=i.precision;const m={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function S(g){return l.add(g),g===0?"uv":`uv${g}`}function x(g,P,C,I,U,V){const k=I.fog,B=U.geometry,Y=g.isMeshStandardMaterial||g.isMeshLambertMaterial||g.isMeshPhongMaterial?I.environment:null,D=g.isMeshStandardMaterial||g.isMeshLambertMaterial&&!g.envMap||g.isMeshPhongMaterial&&!g.envMap,j=t.get(g.envMap||Y,D),ae=j&&j.mapping===Yo?j.image.height:null,q=m[g.type];g.precision!==null&&(u=i.getMaxPrecision(g.precision),u!==g.precision&&_t("WebGLProgram.getParameters:",g.precision,"not supported, using",u,"instead."));const ne=B.morphAttributes.position||B.morphAttributes.normal||B.morphAttributes.color,ue=ne!==void 0?ne.length:0;let we=0;B.morphAttributes.position!==void 0&&(we=1),B.morphAttributes.normal!==void 0&&(we=2),B.morphAttributes.color!==void 0&&(we=3);let Le,ze,J,ce;if(q){const Oe=mn[q];Le=Oe.vertexShader,ze=Oe.fragmentShader}else{Le=g.vertexShader,ze=g.fragmentShader;const Oe=s.getVertexShaderStage(g),Ct=s.getFragmentShaderStage(g);s.update(g,Oe,Ct),J=Oe.id,ce=Ct.id}const O=e.getRenderTarget(),xe=e.state.buffers.depth.getReversed(),ee=U.isInstancedMesh===!0,W=U.isBatchedMesh===!0,me=!!g.map,de=!!g.matcap,G=!!j,oe=!!g.aoMap,ge=!!g.lightMap,Ce=!!g.bumpMap&&g.wireframe===!1,Xe=!!g.normalMap,Je=!!g.displacementMap,Ve=!!g.emissiveMap,tt=!!g.metalnessMap,dt=!!g.roughnessMap,z=g.anisotropy>0,Pt=g.clearcoat>0,te=g.dispersion>0,w=g.iridescence>0,_=g.sheen>0,F=g.transmission>0,X=z&&!!g.anisotropyMap,re=Pt&&!!g.clearcoatMap,_e=Pt&&!!g.clearcoatNormalMap,Me=Pt&&!!g.clearcoatRoughnessMap,ie=w&&!!g.iridescenceMap,le=w&&!!g.iridescenceThicknessMap,ve=_&&!!g.sheenColorMap,Fe=_&&!!g.sheenRoughnessMap,be=!!g.specularMap,Ee=!!g.specularColorMap,Be=!!g.specularIntensityMap,$e=F&&!!g.transmissionMap,je=F&&!!g.thicknessMap,N=!!g.gradientMap,Pe=!!g.alphaMap,fe=g.alphaTest>0,Ae=!!g.alphaHash,De=!!g.extensions;let pe=Jn;g.toneMapped&&(O===null||O.isXRRenderTarget===!0)&&(pe=e.toneMapping);const He={shaderID:q,shaderType:g.type,shaderName:g.name,vertexShader:Le,fragmentShader:ze,defines:g.defines,customVertexShaderID:J,customFragmentShaderID:ce,isRawShaderMaterial:g.isRawShaderMaterial===!0,glslVersion:g.glslVersion,precision:u,batching:W,batchingColor:W&&U._colorsTexture!==null,instancing:ee,instancingColor:ee&&U.instanceColor!==null,instancingMorph:ee&&U.morphTexture!==null,outputColorSpace:O===null?e.outputColorSpace:O.isXRRenderTarget===!0?O.texture.colorSpace:Ut.workingColorSpace,alphaToCoverage:!!g.alphaToCoverage,map:me,matcap:de,envMap:G,envMapMode:G&&j.mapping,envMapCubeUVHeight:ae,aoMap:oe,lightMap:ge,bumpMap:Ce,normalMap:Xe,displacementMap:Je,emissiveMap:Ve,normalMapObjectSpace:Xe&&g.normalMapType===Up,normalMapTangentSpace:Xe&&g.normalMapType===yl,packedNormalMap:Xe&&g.normalMapType===yl&&sv(g.normalMap.format),metalnessMap:tt,roughnessMap:dt,anisotropy:z,anisotropyMap:X,clearcoat:Pt,clearcoatMap:re,clearcoatNormalMap:_e,clearcoatRoughnessMap:Me,dispersion:te,iridescence:w,iridescenceMap:ie,iridescenceThicknessMap:le,sheen:_,sheenColorMap:ve,sheenRoughnessMap:Fe,specularMap:be,specularColorMap:Ee,specularIntensityMap:Be,transmission:F,transmissionMap:$e,thicknessMap:je,gradientMap:N,opaque:g.transparent===!1&&g.blending===wo&&g.alphaToCoverage===!1,alphaMap:Pe,alphaTest:fe,alphaHash:Ae,combine:g.combine,mapUv:me&&S(g.map.channel),aoMapUv:oe&&S(g.aoMap.channel),lightMapUv:ge&&S(g.lightMap.channel),bumpMapUv:Ce&&S(g.bumpMap.channel),normalMapUv:Xe&&S(g.normalMap.channel),displacementMapUv:Je&&S(g.displacementMap.channel),emissiveMapUv:Ve&&S(g.emissiveMap.channel),metalnessMapUv:tt&&S(g.metalnessMap.channel),roughnessMapUv:dt&&S(g.roughnessMap.channel),anisotropyMapUv:X&&S(g.anisotropyMap.channel),clearcoatMapUv:re&&S(g.clearcoatMap.channel),clearcoatNormalMapUv:_e&&S(g.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Me&&S(g.clearcoatRoughnessMap.channel),iridescenceMapUv:ie&&S(g.iridescenceMap.channel),iridescenceThicknessMapUv:le&&S(g.iridescenceThicknessMap.channel),sheenColorMapUv:ve&&S(g.sheenColorMap.channel),sheenRoughnessMapUv:Fe&&S(g.sheenRoughnessMap.channel),specularMapUv:be&&S(g.specularMap.channel),specularColorMapUv:Ee&&S(g.specularColorMap.channel),specularIntensityMapUv:Be&&S(g.specularIntensityMap.channel),transmissionMapUv:$e&&S(g.transmissionMap.channel),thicknessMapUv:je&&S(g.thicknessMap.channel),alphaMapUv:Pe&&S(g.alphaMap.channel),vertexTangents:!!B.attributes.tangent&&(Xe||z),vertexNormals:!!B.attributes.normal,vertexColors:g.vertexColors,vertexAlphas:g.vertexColors===!0&&!!B.attributes.color&&B.attributes.color.itemSize===4,pointsUvs:U.isPoints===!0&&!!B.attributes.uv&&(me||Pe),fog:!!k,useFog:g.fog===!0,fogExp2:!!k&&k.isFogExp2,flatShading:g.wireframe===!1&&(g.flatShading===!0||B.attributes.normal===void 0&&Xe===!1&&(g.isMeshLambertMaterial||g.isMeshPhongMaterial||g.isMeshStandardMaterial||g.isMeshPhysicalMaterial)),sizeAttenuation:g.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:xe,skinning:U.isSkinnedMesh===!0,hasPositionAttribute:B.attributes.position!==void 0,morphTargets:B.morphAttributes.position!==void 0,morphNormals:B.morphAttributes.normal!==void 0,morphColors:B.morphAttributes.color!==void 0,morphTargetsCount:ue,morphTextureStride:we,numDirLights:P.directional.length,numPointLights:P.point.length,numSpotLights:P.spot.length,numSpotLightMaps:P.spotLightMap.length,numRectAreaLights:P.rectArea.length,numHemiLights:P.hemi.length,numDirLightShadows:P.directionalShadowMap.length,numPointLightShadows:P.pointShadowMap.length,numSpotLightShadows:P.spotShadowMap.length,numSpotLightShadowsWithMaps:P.numSpotLightShadowsWithMaps,numLightProbes:P.numLightProbes,numLightProbeGrids:V.length,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:g.dithering,shadowMapEnabled:e.shadowMap.enabled&&C.length>0,shadowMapType:e.shadowMap.type,toneMapping:pe,decodeVideoTexture:me&&g.map.isVideoTexture===!0&&Ut.getTransfer(g.map.colorSpace)===At,decodeVideoTextureEmissive:Ve&&g.emissiveMap.isVideoTexture===!0&&Ut.getTransfer(g.emissiveMap.colorSpace)===At,premultipliedAlpha:g.premultipliedAlpha,doubleSided:g.side===tn,flipSided:g.side===En,useDepthPacking:g.depthPacking>=0,depthPacking:g.depthPacking||0,index0AttributeName:g.index0AttributeName,extensionClipCullDistance:De&&g.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(De&&g.extensions.multiDraw===!0||W)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:g.customProgramCacheKey()};return He.vertexUv1s=l.has(1),He.vertexUv2s=l.has(2),He.vertexUv3s=l.has(3),l.clear(),He}function f(g){const P=[];if(g.shaderID?P.push(g.shaderID):(P.push(g.customVertexShaderID),P.push(g.customFragmentShaderID)),g.defines!==void 0)for(const C in g.defines)P.push(C),P.push(g.defines[C]);return g.isRawShaderMaterial===!1&&(p(P,g),M(P,g),P.push(e.outputColorSpace)),P.push(g.customProgramCacheKey),P.join()}function p(g,P){g.push(P.precision),g.push(P.outputColorSpace),g.push(P.envMapMode),g.push(P.envMapCubeUVHeight),g.push(P.mapUv),g.push(P.alphaMapUv),g.push(P.lightMapUv),g.push(P.aoMapUv),g.push(P.bumpMapUv),g.push(P.normalMapUv),g.push(P.displacementMapUv),g.push(P.emissiveMapUv),g.push(P.metalnessMapUv),g.push(P.roughnessMapUv),g.push(P.anisotropyMapUv),g.push(P.clearcoatMapUv),g.push(P.clearcoatNormalMapUv),g.push(P.clearcoatRoughnessMapUv),g.push(P.iridescenceMapUv),g.push(P.iridescenceThicknessMapUv),g.push(P.sheenColorMapUv),g.push(P.sheenRoughnessMapUv),g.push(P.specularMapUv),g.push(P.specularColorMapUv),g.push(P.specularIntensityMapUv),g.push(P.transmissionMapUv),g.push(P.thicknessMapUv),g.push(P.combine),g.push(P.fogExp2),g.push(P.sizeAttenuation),g.push(P.morphTargetsCount),g.push(P.morphAttributeCount),g.push(P.numDirLights),g.push(P.numPointLights),g.push(P.numSpotLights),g.push(P.numSpotLightMaps),g.push(P.numHemiLights),g.push(P.numRectAreaLights),g.push(P.numDirLightShadows),g.push(P.numPointLightShadows),g.push(P.numSpotLightShadows),g.push(P.numSpotLightShadowsWithMaps),g.push(P.numLightProbes),g.push(P.shadowMapType),g.push(P.toneMapping),g.push(P.numClippingPlanes),g.push(P.numClipIntersection),g.push(P.depthPacking)}function M(g,P){a.disableAll(),P.instancing&&a.enable(0),P.instancingColor&&a.enable(1),P.instancingMorph&&a.enable(2),P.matcap&&a.enable(3),P.envMap&&a.enable(4),P.normalMapObjectSpace&&a.enable(5),P.normalMapTangentSpace&&a.enable(6),P.clearcoat&&a.enable(7),P.iridescence&&a.enable(8),P.alphaTest&&a.enable(9),P.vertexColors&&a.enable(10),P.vertexAlphas&&a.enable(11),P.vertexUv1s&&a.enable(12),P.vertexUv2s&&a.enable(13),P.vertexUv3s&&a.enable(14),P.vertexTangents&&a.enable(15),P.anisotropy&&a.enable(16),P.alphaHash&&a.enable(17),P.batching&&a.enable(18),P.dispersion&&a.enable(19),P.batchingColor&&a.enable(20),P.gradientMap&&a.enable(21),P.packedNormalMap&&a.enable(22),P.vertexNormals&&a.enable(23),g.push(a.mask),a.disableAll(),P.fog&&a.enable(0),P.useFog&&a.enable(1),P.flatShading&&a.enable(2),P.logarithmicDepthBuffer&&a.enable(3),P.reversedDepthBuffer&&a.enable(4),P.skinning&&a.enable(5),P.morphTargets&&a.enable(6),P.morphNormals&&a.enable(7),P.morphColors&&a.enable(8),P.premultipliedAlpha&&a.enable(9),P.shadowMapEnabled&&a.enable(10),P.doubleSided&&a.enable(11),P.flipSided&&a.enable(12),P.useDepthPacking&&a.enable(13),P.dithering&&a.enable(14),P.transmission&&a.enable(15),P.sheen&&a.enable(16),P.opaque&&a.enable(17),P.pointsUvs&&a.enable(18),P.decodeVideoTexture&&a.enable(19),P.decodeVideoTextureEmissive&&a.enable(20),P.alphaToCoverage&&a.enable(21),P.numLightProbeGrids>0&&a.enable(22),P.hasPositionAttribute&&a.enable(23),g.push(a.mask)}function A(g){const P=m[g.type];let C;if(P){const I=mn[P];C=ls.clone(I.uniforms)}else C=g.uniforms;return C}function v(g,P){let C=h.get(P);return C!==void 0?++C.usedTimes:(C=new iv(e,P,g,r),c.push(C),h.set(P,C)),C}function y(g){if(--g.usedTimes===0){const P=c.indexOf(g);c[P]=c[c.length-1],c.pop(),h.delete(g.cacheKey),g.destroy()}}function E(g){s.remove(g)}function T(){s.dispose()}return{getParameters:x,getProgramCacheKey:f,getUniforms:A,acquireProgram:v,releaseProgram:y,releaseShaderCache:E,programs:c,dispose:T}}function cv(){let e=new WeakMap;function t(a){return e.has(a)}function n(a){let s=e.get(a);return s===void 0&&(s={},e.set(a,s)),s}function i(a){e.delete(a)}function r(a,s,l){e.get(a)[s]=l}function o(){e=new WeakMap}return{has:t,get:n,remove:i,update:r,dispose:o}}function uv(e,t){return e.groupOrder!==t.groupOrder?e.groupOrder-t.groupOrder:e.renderOrder!==t.renderOrder?e.renderOrder-t.renderOrder:e.material.id!==t.material.id?e.material.id-t.material.id:e.materialVariant!==t.materialVariant?e.materialVariant-t.materialVariant:e.z!==t.z?e.z-t.z:e.id-t.id}function Kl(e,t){return e.groupOrder!==t.groupOrder?e.groupOrder-t.groupOrder:e.renderOrder!==t.renderOrder?e.renderOrder-t.renderOrder:e.z!==t.z?t.z-e.z:e.id-t.id}function jl(){const e=[];let t=0;const n=[],i=[],r=[];function o(){t=0,n.length=0,i.length=0,r.length=0}function a(u){let m=0;return u.isInstancedMesh&&(m+=2),u.isSkinnedMesh&&(m+=1),m}function s(u,m,S,x,f,p){let M=e[t];return M===void 0?(M={id:u.id,object:u,geometry:m,material:S,materialVariant:a(u),groupOrder:x,renderOrder:u.renderOrder,z:f,group:p},e[t]=M):(M.id=u.id,M.object=u,M.geometry=m,M.material=S,M.materialVariant=a(u),M.groupOrder=x,M.renderOrder=u.renderOrder,M.z=f,M.group=p),t++,M}function l(u,m,S,x,f,p){const M=s(u,m,S,x,f,p);S.transmission>0?i.push(M):S.transparent===!0?r.push(M):n.push(M)}function c(u,m,S,x,f,p){const M=s(u,m,S,x,f,p);S.transmission>0?i.unshift(M):S.transparent===!0?r.unshift(M):n.unshift(M)}function h(u,m,S){n.length>1&&n.sort(u||uv),i.length>1&&i.sort(m||Kl),r.length>1&&r.sort(m||Kl),S&&(n.reverse(),i.reverse(),r.reverse())}function d(){for(let u=t,m=e.length;u<m;u++){const S=e[u];if(S.id===null)break;S.id=null,S.object=null,S.geometry=null,S.material=null,S.group=null}}return{opaque:n,transmissive:i,transparent:r,init:o,push:l,unshift:c,finish:d,sort:h}}function dv(){let e=new WeakMap;function t(i,r){const o=e.get(i);let a;return o===void 0?(a=new jl,e.set(i,[a])):r>=o.length?(a=new jl,o.push(a)):a=o[r],a}function n(){e=new WeakMap}return{get:t,dispose:n}}function fv(){const e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case"DirectionalLight":n={direction:new $,color:new Mt};break;case"SpotLight":n={position:new $,direction:new $,color:new Mt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":n={position:new $,color:new Mt,distance:0,decay:0};break;case"HemisphereLight":n={direction:new $,skyColor:new Mt,groundColor:new Mt};break;case"RectAreaLight":n={color:new Mt,position:new $,halfWidth:new $,halfHeight:new $};break}return e[t.id]=n,n}}}function pv(){const e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case"DirectionalLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new et};break;case"SpotLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new et};break;case"PointLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new et,shadowCameraNear:1,shadowCameraFar:1e3};break}return e[t.id]=n,n}}}let hv=0;function mv(e,t){return(t.castShadow?2:0)-(e.castShadow?2:0)+(t.map?1:0)-(e.map?1:0)}function gv(e){const t=new fv,n=pv(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new $);const r=new $,o=new yn,a=new yn;function s(c){let h=0,d=0,u=0;for(let P=0;P<9;P++)i.probe[P].set(0,0,0);let m=0,S=0,x=0,f=0,p=0,M=0,A=0,v=0,y=0,E=0,T=0;c.sort(mv);for(let P=0,C=c.length;P<C;P++){const I=c[P],U=I.color,V=I.intensity,k=I.distance;let B=null;if(I.shadow&&I.shadow.map&&(I.shadow.map.texture.format===ir?B=I.shadow.map.texture:B=I.shadow.map.depthTexture||I.shadow.map.texture),I.isAmbientLight)h+=U.r*V,d+=U.g*V,u+=U.b*V;else if(I.isLightProbe){for(let Y=0;Y<9;Y++)i.probe[Y].addScaledVector(I.sh.coefficients[Y],V);T++}else if(I.isDirectionalLight){const Y=t.get(I);if(Y.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){const D=I.shadow,j=n.get(I);j.shadowIntensity=D.intensity,j.shadowBias=D.bias,j.shadowNormalBias=D.normalBias,j.shadowRadius=D.radius,j.shadowMapSize=D.mapSize,i.directionalShadow[m]=j,i.directionalShadowMap[m]=B,i.directionalShadowMatrix[m]=I.shadow.matrix,M++}i.directional[m]=Y,m++}else if(I.isSpotLight){const Y=t.get(I);Y.position.setFromMatrixPosition(I.matrixWorld),Y.color.copy(U).multiplyScalar(V),Y.distance=k,Y.coneCos=Math.cos(I.angle),Y.penumbraCos=Math.cos(I.angle*(1-I.penumbra)),Y.decay=I.decay,i.spot[x]=Y;const D=I.shadow;if(I.map&&(i.spotLightMap[y]=I.map,y++,D.updateMatrices(I),I.castShadow&&E++),i.spotLightMatrix[x]=D.matrix,I.castShadow){const j=n.get(I);j.shadowIntensity=D.intensity,j.shadowBias=D.bias,j.shadowNormalBias=D.normalBias,j.shadowRadius=D.radius,j.shadowMapSize=D.mapSize,i.spotShadow[x]=j,i.spotShadowMap[x]=B,v++}x++}else if(I.isRectAreaLight){const Y=t.get(I);Y.color.copy(U).multiplyScalar(V),Y.halfWidth.set(I.width*.5,0,0),Y.halfHeight.set(0,I.height*.5,0),i.rectArea[f]=Y,f++}else if(I.isPointLight){const Y=t.get(I);if(Y.color.copy(I.color).multiplyScalar(I.intensity),Y.distance=I.distance,Y.decay=I.decay,I.castShadow){const D=I.shadow,j=n.get(I);j.shadowIntensity=D.intensity,j.shadowBias=D.bias,j.shadowNormalBias=D.normalBias,j.shadowRadius=D.radius,j.shadowMapSize=D.mapSize,j.shadowCameraNear=D.camera.near,j.shadowCameraFar=D.camera.far,i.pointShadow[S]=j,i.pointShadowMap[S]=B,i.pointShadowMatrix[S]=I.shadow.matrix,A++}i.point[S]=Y,S++}else if(I.isHemisphereLight){const Y=t.get(I);Y.skyColor.copy(I.color).multiplyScalar(V),Y.groundColor.copy(I.groundColor).multiplyScalar(V),i.hemi[p]=Y,p++}}f>0&&(e.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=Re.LTC_FLOAT_1,i.rectAreaLTC2=Re.LTC_FLOAT_2):(i.rectAreaLTC1=Re.LTC_HALF_1,i.rectAreaLTC2=Re.LTC_HALF_2)),i.ambient[0]=h,i.ambient[1]=d,i.ambient[2]=u;const g=i.hash;(g.directionalLength!==m||g.pointLength!==S||g.spotLength!==x||g.rectAreaLength!==f||g.hemiLength!==p||g.numDirectionalShadows!==M||g.numPointShadows!==A||g.numSpotShadows!==v||g.numSpotMaps!==y||g.numLightProbes!==T)&&(i.directional.length=m,i.spot.length=x,i.rectArea.length=f,i.point.length=S,i.hemi.length=p,i.directionalShadow.length=M,i.directionalShadowMap.length=M,i.pointShadow.length=A,i.pointShadowMap.length=A,i.spotShadow.length=v,i.spotShadowMap.length=v,i.directionalShadowMatrix.length=M,i.pointShadowMatrix.length=A,i.spotLightMatrix.length=v+y-E,i.spotLightMap.length=y,i.numSpotLightShadowsWithMaps=E,i.numLightProbes=T,g.directionalLength=m,g.pointLength=S,g.spotLength=x,g.rectAreaLength=f,g.hemiLength=p,g.numDirectionalShadows=M,g.numPointShadows=A,g.numSpotShadows=v,g.numSpotMaps=y,g.numLightProbes=T,i.version=hv++)}function l(c,h){let d=0,u=0,m=0,S=0,x=0;const f=h.matrixWorldInverse;for(let p=0,M=c.length;p<M;p++){const A=c[p];if(A.isDirectionalLight){const v=i.directional[d];v.direction.setFromMatrixPosition(A.matrixWorld),r.setFromMatrixPosition(A.target.matrixWorld),v.direction.sub(r),v.direction.transformDirection(f),d++}else if(A.isSpotLight){const v=i.spot[m];v.position.setFromMatrixPosition(A.matrixWorld),v.position.applyMatrix4(f),v.direction.setFromMatrixPosition(A.matrixWorld),r.setFromMatrixPosition(A.target.matrixWorld),v.direction.sub(r),v.direction.transformDirection(f),m++}else if(A.isRectAreaLight){const v=i.rectArea[S];v.position.setFromMatrixPosition(A.matrixWorld),v.position.applyMatrix4(f),a.identity(),o.copy(A.matrixWorld),o.premultiply(f),a.extractRotation(o),v.halfWidth.set(A.width*.5,0,0),v.halfHeight.set(0,A.height*.5,0),v.halfWidth.applyMatrix4(a),v.halfHeight.applyMatrix4(a),S++}else if(A.isPointLight){const v=i.point[u];v.position.setFromMatrixPosition(A.matrixWorld),v.position.applyMatrix4(f),u++}else if(A.isHemisphereLight){const v=i.hemi[x];v.direction.setFromMatrixPosition(A.matrixWorld),v.direction.transformDirection(f),x++}}}return{setup:s,setupView:l,state:i}}function Zl(e){const t=new gv(e),n=[],i=[],r=[];function o(u){d.camera=u,n.length=0,i.length=0,r.length=0}function a(u){n.push(u)}function s(u){i.push(u)}function l(u){r.push(u)}function c(){t.setup(n)}function h(u){t.setupView(n,u)}const d={lightsArray:n,shadowsArray:i,lightProbeGridArray:r,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:o,state:d,setupLights:c,setupLightsView:h,pushLight:a,pushShadow:s,pushLightProbeGrid:l}}function _v(e){let t=new WeakMap;function n(r,o=0){const a=t.get(r);let s;return a===void 0?(s=new Zl(e),t.set(r,[s])):o>=a.length?(s=new Zl(e),a.push(s)):s=a[o],s}function i(){t=new WeakMap}return{get:n,dispose:i}}const xv=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,vv=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,Sv=[new $(1,0,0),new $(-1,0,0),new $(0,1,0),new $(0,-1,0),new $(0,0,1),new $(0,0,-1)],Ev=[new $(0,-1,0),new $(0,-1,0),new $(0,0,1),new $(0,0,-1),new $(0,-1,0),new $(0,-1,0)],Jl=new yn,br=new $,ga=new $;function yv(e,t,n){let i=new yu;const r=new et,o=new et,a=new Wt,s=new hp,l=new mp,c={},h=n.maxTextureSize,d={[Gr]:En,[En]:Gr,[tn]:tn},u=new zn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new et},radius:{value:4}},vertexShader:xv,fragmentShader:vv}),m=u.clone();m.defines.HORIZONTAL_PASS=1;const S=new ii;S.setAttribute("position",new Li(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const x=new jt(S,u),f=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Po;let p=this.type;this.render=function(E,T,g){if(f.enabled===!1||f.autoUpdate===!1&&f.needsUpdate===!1||E.length===0)return;this.type===gp&&(_t("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=Po);const P=e.getRenderTarget(),C=e.getActiveCubeFace(),I=e.getActiveMipmapLevel(),U=e.state;U.setBlending(gi),U.buffers.depth.getReversed()===!0?U.buffers.color.setClear(0,0,0,0):U.buffers.color.setClear(1,1,1,1),U.buffers.depth.setTest(!0),U.setScissorTest(!1);const V=p!==this.type;V&&T.traverse(function(k){k.material&&(Array.isArray(k.material)?k.material.forEach(B=>B.needsUpdate=!0):k.material.needsUpdate=!0)});for(let k=0,B=E.length;k<B;k++){const Y=E[k],D=Y.shadow;if(D===void 0){_t("WebGLShadowMap:",Y,"has no shadow.");continue}if(D.autoUpdate===!1&&D.needsUpdate===!1)continue;r.copy(D.mapSize);const j=D.getFrameExtents();r.multiply(j),o.copy(D.mapSize),(r.x>h||r.y>h)&&(r.x>h&&(o.x=Math.floor(h/j.x),r.x=o.x*j.x,D.mapSize.x=o.x),r.y>h&&(o.y=Math.floor(h/j.y),r.y=o.y*j.y,D.mapSize.y=o.y));const ae=e.state.buffers.depth.getReversed();if(D.camera._reversedDepth=ae,D.map===null||V===!0){if(D.map!==null&&(D.map.depthTexture!==null&&(D.map.depthTexture.dispose(),D.map.depthTexture=null),D.map.dispose()),this.type===wr){if(Y.isPointLight){_t("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}D.map=new Qn(r.x,r.y,{format:ir,type:Ti,minFilter:Sn,magFilter:Sn,generateMipmaps:!1}),D.map.texture.name=Y.name+".shadowMap",D.map.depthTexture=new Vr(r.x,r.y,yi),D.map.depthTexture.name=Y.name+".shadowMapDepth",D.map.depthTexture.format=nr,D.map.depthTexture.compareFunction=null,D.map.depthTexture.minFilter=Di,D.map.depthTexture.magFilter=Di}else Y.isPointLight?(D.map=new ld(r.x),D.map.depthTexture=new _p(r.x,Oi)):(D.map=new Qn(r.x,r.y),D.map.depthTexture=new Vr(r.x,r.y,Oi)),D.map.depthTexture.name=Y.name+".shadowMap",D.map.depthTexture.format=nr,this.type===Po?(D.map.depthTexture.compareFunction=ae?as:ss,D.map.depthTexture.minFilter=Sn,D.map.depthTexture.magFilter=Sn):(D.map.depthTexture.compareFunction=null,D.map.depthTexture.minFilter=Di,D.map.depthTexture.magFilter=Di);D.camera.updateProjectionMatrix()}const q=D.map.isWebGLCubeRenderTarget?6:1;for(let ne=0;ne<q;ne++){if(D.map.isWebGLCubeRenderTarget)e.setRenderTarget(D.map,ne),e.clear();else{ne===0&&(e.setRenderTarget(D.map),e.clear());const ue=D.getViewport(ne);a.set(o.x*ue.x,o.y*ue.y,o.x*ue.z,o.y*ue.w),U.viewport(a)}if(Y.isPointLight){const ue=D.camera,we=D.matrix,Le=Y.distance||ue.far;Le!==ue.far&&(ue.far=Le,ue.updateProjectionMatrix()),br.setFromMatrixPosition(Y.matrixWorld),ue.position.copy(br),ga.copy(ue.position),ga.add(Sv[ne]),ue.up.copy(Ev[ne]),ue.lookAt(ga),ue.updateMatrixWorld(),we.makeTranslation(-br.x,-br.y,-br.z),Jl.multiplyMatrices(ue.projectionMatrix,ue.matrixWorldInverse),D._frustum.setFromProjectionMatrix(Jl,ue.coordinateSystem,ue.reversedDepth)}else D.updateMatrices(Y);i=D.getFrustum(),v(T,g,D.camera,Y,this.type)}D.isPointLightShadow!==!0&&this.type===wr&&M(D,g),D.needsUpdate=!1}p=this.type,f.needsUpdate=!1,e.setRenderTarget(P,C,I)};function M(E,T){const g=t.update(x);u.defines.VSM_SAMPLES!==E.blurSamples&&(u.defines.VSM_SAMPLES=E.blurSamples,m.defines.VSM_SAMPLES=E.blurSamples,u.needsUpdate=!0,m.needsUpdate=!0),E.mapPass===null&&(E.mapPass=new Qn(r.x,r.y,{format:ir,type:Ti})),u.uniforms.shadow_pass.value=E.map.depthTexture,u.uniforms.resolution.value=E.mapSize,u.uniforms.radius.value=E.radius,e.setRenderTarget(E.mapPass),e.clear(),e.renderBufferDirect(T,null,g,u,x,null),m.uniforms.shadow_pass.value=E.mapPass.texture,m.uniforms.resolution.value=E.mapSize,m.uniforms.radius.value=E.radius,e.setRenderTarget(E.map),e.clear(),e.renderBufferDirect(T,null,g,m,x,null)}function A(E,T,g,P){let C=null;const I=g.isPointLight===!0?E.customDistanceMaterial:E.customDepthMaterial;if(I!==void 0)C=I;else if(C=g.isPointLight===!0?l:s,e.localClippingEnabled&&T.clipShadows===!0&&Array.isArray(T.clippingPlanes)&&T.clippingPlanes.length!==0||T.displacementMap&&T.displacementScale!==0||T.alphaMap&&T.alphaTest>0||T.map&&T.alphaTest>0||T.alphaToCoverage===!0){const U=C.uuid,V=T.uuid;let k=c[U];k===void 0&&(k={},c[U]=k);let B=k[V];B===void 0&&(B=C.clone(),k[V]=B,T.addEventListener("dispose",y)),C=B}if(C.visible=T.visible,C.wireframe=T.wireframe,P===wr?C.side=T.shadowSide!==null?T.shadowSide:T.side:C.side=T.shadowSide!==null?T.shadowSide:d[T.side],C.alphaMap=T.alphaMap,C.alphaTest=T.alphaToCoverage===!0?.5:T.alphaTest,C.map=T.map,C.clipShadows=T.clipShadows,C.clippingPlanes=T.clippingPlanes,C.clipIntersection=T.clipIntersection,C.displacementMap=T.displacementMap,C.displacementScale=T.displacementScale,C.displacementBias=T.displacementBias,C.wireframeLinewidth=T.wireframeLinewidth,C.linewidth=T.linewidth,g.isPointLight===!0&&C.isMeshDistanceMaterial===!0){const U=e.properties.get(C);U.light=g}return C}function v(E,T,g,P,C){if(E.visible===!1)return;if(E.layers.test(T.layers)&&(E.isMesh||E.isLine||E.isPoints)&&(E.castShadow||E.receiveShadow&&C===wr)&&(!E.frustumCulled||i.intersectsObject(E))){E.modelViewMatrix.multiplyMatrices(g.matrixWorldInverse,E.matrixWorld);const V=t.update(E),k=E.material;if(Array.isArray(k)){const B=V.groups;for(let Y=0,D=B.length;Y<D;Y++){const j=B[Y],ae=k[j.materialIndex];if(ae&&ae.visible){const q=A(E,ae,P,C);E.onBeforeShadow(e,E,T,g,V,q,j),e.renderBufferDirect(g,null,V,q,E,j),E.onAfterShadow(e,E,T,g,V,q,j)}}}else if(k.visible){const B=A(E,k,P,C);E.onBeforeShadow(e,E,T,g,V,B,null),e.renderBufferDirect(g,null,V,B,E,null),E.onAfterShadow(e,E,T,g,V,B,null)}}const U=E.children;for(let V=0,k=U.length;V<k;V++)v(U[V],T,g,P,C)}function y(E){E.target.removeEventListener("dispose",y);for(const g in c){const P=c[g],C=E.target.uuid;C in P&&(P[C].dispose(),delete P[C])}}}function Mv(e,t){function n(){let N=!1;const Pe=new Wt;let fe=null;const Ae=new Wt(0,0,0,0);return{setMask:function(De){fe!==De&&!N&&(e.colorMask(De,De,De,De),fe=De)},setLocked:function(De){N=De},setClear:function(De,pe,He,Oe,Ct){Ct===!0&&(De*=Oe,pe*=Oe,He*=Oe),Pe.set(De,pe,He,Oe),Ae.equals(Pe)===!1&&(e.clearColor(De,pe,He,Oe),Ae.copy(Pe))},reset:function(){N=!1,fe=null,Ae.set(-1,0,0,0)}}}function i(){let N=!1,Pe=!1,fe=null,Ae=null,De=null;return{setReversed:function(pe){if(Pe!==pe){const He=t.get("EXT_clip_control");pe?He.clipControlEXT(He.LOWER_LEFT_EXT,He.ZERO_TO_ONE_EXT):He.clipControlEXT(He.LOWER_LEFT_EXT,He.NEGATIVE_ONE_TO_ONE_EXT),Pe=pe;const Oe=De;De=null,this.setClear(Oe)}},getReversed:function(){return Pe},setTest:function(pe){pe?O(e.DEPTH_TEST):xe(e.DEPTH_TEST)},setMask:function(pe){fe!==pe&&!N&&(e.depthMask(pe),fe=pe)},setFunc:function(pe){if(Pe&&(pe=Yp[pe]),Ae!==pe){switch(pe){case Ip:e.depthFunc(e.NEVER);break;case Cp:e.depthFunc(e.ALWAYS);break;case Rp:e.depthFunc(e.LESS);break;case rr:e.depthFunc(e.LEQUAL);break;case wp:e.depthFunc(e.EQUAL);break;case Pp:e.depthFunc(e.GEQUAL);break;case Tp:e.depthFunc(e.GREATER);break;case Ap:e.depthFunc(e.NOTEQUAL);break;default:e.depthFunc(e.LEQUAL)}Ae=pe}},setLocked:function(pe){N=pe},setClear:function(pe){De!==pe&&(De=pe,Pe&&(pe=1-pe),e.clearDepth(pe))},reset:function(){N=!1,fe=null,Ae=null,De=null,Pe=!1}}}function r(){let N=!1,Pe=null,fe=null,Ae=null,De=null,pe=null,He=null,Oe=null,Ct=null;return{setTest:function(ft){N||(ft?O(e.STENCIL_TEST):xe(e.STENCIL_TEST))},setMask:function(ft){Pe!==ft&&!N&&(e.stencilMask(ft),Pe=ft)},setFunc:function(ft,on,bn){(fe!==ft||Ae!==on||De!==bn)&&(e.stencilFunc(ft,on,bn),fe=ft,Ae=on,De=bn)},setOp:function(ft,on,bn){(pe!==ft||He!==on||Oe!==bn)&&(e.stencilOp(ft,on,bn),pe=ft,He=on,Oe=bn)},setLocked:function(ft){N=ft},setClear:function(ft){Ct!==ft&&(e.clearStencil(ft),Ct=ft)},reset:function(){N=!1,Pe=null,fe=null,Ae=null,De=null,pe=null,He=null,Oe=null,Ct=null}}}const o=new n,a=new i,s=new r,l=new WeakMap,c=new WeakMap;let h={},d={},u={},m=new WeakMap,S=[],x=null,f=!1,p=null,M=null,A=null,v=null,y=null,E=null,T=null,g=new Mt(0,0,0),P=0,C=!1,I=null,U=null,V=null,k=null,B=null;const Y=e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let D=!1,j=0;const ae=e.getParameter(e.VERSION);ae.indexOf("WebGL")!==-1?(j=parseFloat(/^WebGL (\d)/.exec(ae)[1]),D=j>=1):ae.indexOf("OpenGL ES")!==-1&&(j=parseFloat(/^OpenGL ES (\d)/.exec(ae)[1]),D=j>=2);let q=null,ne={};const ue=e.getParameter(e.SCISSOR_BOX),we=e.getParameter(e.VIEWPORT),Le=new Wt().fromArray(ue),ze=new Wt().fromArray(we);function J(N,Pe,fe,Ae){const De=new Uint8Array(4),pe=e.createTexture();e.bindTexture(N,pe),e.texParameteri(N,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(N,e.TEXTURE_MAG_FILTER,e.NEAREST);for(let He=0;He<fe;He++)N===e.TEXTURE_3D||N===e.TEXTURE_2D_ARRAY?e.texImage3D(Pe,0,e.RGBA,1,1,Ae,0,e.RGBA,e.UNSIGNED_BYTE,De):e.texImage2D(Pe+He,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,De);return pe}const ce={};ce[e.TEXTURE_2D]=J(e.TEXTURE_2D,e.TEXTURE_2D,1),ce[e.TEXTURE_CUBE_MAP]=J(e.TEXTURE_CUBE_MAP,e.TEXTURE_CUBE_MAP_POSITIVE_X,6),ce[e.TEXTURE_2D_ARRAY]=J(e.TEXTURE_2D_ARRAY,e.TEXTURE_2D_ARRAY,1,1),ce[e.TEXTURE_3D]=J(e.TEXTURE_3D,e.TEXTURE_3D,1,1),o.setClear(0,0,0,1),a.setClear(1),s.setClear(0),O(e.DEPTH_TEST),a.setFunc(rr),Ce(!1),Xe(xl),O(e.CULL_FACE),oe(gi);function O(N){h[N]!==!0&&(e.enable(N),h[N]=!0)}function xe(N){h[N]!==!1&&(e.disable(N),h[N]=!1)}function ee(N,Pe){return u[N]!==Pe?(e.bindFramebuffer(N,Pe),u[N]=Pe,N===e.DRAW_FRAMEBUFFER&&(u[e.FRAMEBUFFER]=Pe),N===e.FRAMEBUFFER&&(u[e.DRAW_FRAMEBUFFER]=Pe),!0):!1}function W(N,Pe){let fe=S,Ae=!1;if(N){fe=m.get(Pe),fe===void 0&&(fe=[],m.set(Pe,fe));const De=N.textures;if(fe.length!==De.length||fe[0]!==e.COLOR_ATTACHMENT0){for(let pe=0,He=De.length;pe<He;pe++)fe[pe]=e.COLOR_ATTACHMENT0+pe;fe.length=De.length,Ae=!0}}else fe[0]!==e.BACK&&(fe[0]=e.BACK,Ae=!0);Ae&&e.drawBuffers(fe)}function me(N){return x!==N?(e.useProgram(N),x=N,!0):!1}const de={[yr]:e.FUNC_ADD,[Hf]:e.FUNC_SUBTRACT,[kf]:e.FUNC_REVERSE_SUBTRACT};de[$p]=e.MIN,de[qp]=e.MAX;const G={[rp]:e.ZERO,[ip]:e.ONE,[np]:e.SRC_COLOR,[tp]:e.SRC_ALPHA,[ep]:e.SRC_ALPHA_SATURATE,[Qf]:e.DST_COLOR,[Jf]:e.DST_ALPHA,[Zf]:e.ONE_MINUS_SRC_COLOR,[jf]:e.ONE_MINUS_SRC_ALPHA,[Kf]:e.ONE_MINUS_DST_COLOR,[qf]:e.ONE_MINUS_DST_ALPHA,[$f]:e.CONSTANT_COLOR,[Yf]:e.ONE_MINUS_CONSTANT_COLOR,[Xf]:e.CONSTANT_ALPHA,[Wf]:e.ONE_MINUS_CONSTANT_ALPHA};function oe(N,Pe,fe,Ae,De,pe,He,Oe,Ct,ft){if(N===gi){f===!0&&(xe(e.BLEND),f=!1);return}if(f===!1&&(O(e.BLEND),f=!0),N!==Np){if(N!==p||ft!==C){if((M!==yr||y!==yr)&&(e.blendEquation(e.FUNC_ADD),M=yr,y=yr),ft)switch(N){case wo:e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case El:e.blendFunc(e.ONE,e.ONE);break;case Sl:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case vl:e.blendFuncSeparate(e.DST_COLOR,e.ONE_MINUS_SRC_ALPHA,e.ZERO,e.ONE);break;default:Tt("WebGLState: Invalid blending: ",N);break}else switch(N){case wo:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case El:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE,e.ONE,e.ONE);break;case Sl:Tt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case vl:Tt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Tt("WebGLState: Invalid blending: ",N);break}A=null,v=null,E=null,T=null,g.set(0,0,0),P=0,p=N,C=ft}return}De=De||Pe,pe=pe||fe,He=He||Ae,(Pe!==M||De!==y)&&(e.blendEquationSeparate(de[Pe],de[De]),M=Pe,y=De),(fe!==A||Ae!==v||pe!==E||He!==T)&&(e.blendFuncSeparate(G[fe],G[Ae],G[pe],G[He]),A=fe,v=Ae,E=pe,T=He),(Oe.equals(g)===!1||Ct!==P)&&(e.blendColor(Oe.r,Oe.g,Oe.b,Ct),g.copy(Oe),P=Ct),p=N,C=!1}function ge(N,Pe){N.side===tn?xe(e.CULL_FACE):O(e.CULL_FACE);let fe=N.side===En;Pe&&(fe=!fe),Ce(fe),N.blending===wo&&N.transparent===!1?oe(gi):oe(N.blending,N.blendEquation,N.blendSrc,N.blendDst,N.blendEquationAlpha,N.blendSrcAlpha,N.blendDstAlpha,N.blendColor,N.blendAlpha,N.premultipliedAlpha),a.setFunc(N.depthFunc),a.setTest(N.depthTest),a.setMask(N.depthWrite),o.setMask(N.colorWrite);const Ae=N.stencilWrite;s.setTest(Ae),Ae&&(s.setMask(N.stencilWriteMask),s.setFunc(N.stencilFunc,N.stencilRef,N.stencilFuncMask),s.setOp(N.stencilFail,N.stencilZFail,N.stencilZPass)),Ve(N.polygonOffset,N.polygonOffsetFactor,N.polygonOffsetUnits),N.alphaToCoverage===!0?O(e.SAMPLE_ALPHA_TO_COVERAGE):xe(e.SAMPLE_ALPHA_TO_COVERAGE)}function Ce(N){I!==N&&(N?e.frontFace(e.CW):e.frontFace(e.CCW),I=N)}function Xe(N){N!==Dp?(O(e.CULL_FACE),N!==U&&(N===xl?e.cullFace(e.BACK):N===Lp?e.cullFace(e.FRONT):e.cullFace(e.FRONT_AND_BACK))):xe(e.CULL_FACE),U=N}function Je(N){N!==V&&(D&&e.lineWidth(N),V=N)}function Ve(N,Pe,fe){N?(O(e.POLYGON_OFFSET_FILL),(k!==Pe||B!==fe)&&(k=Pe,B=fe,a.getReversed()&&(Pe=-Pe),e.polygonOffset(Pe,fe))):xe(e.POLYGON_OFFSET_FILL)}function tt(N){N?O(e.SCISSOR_TEST):xe(e.SCISSOR_TEST)}function dt(N){N===void 0&&(N=e.TEXTURE0+Y-1),q!==N&&(e.activeTexture(N),q=N)}function z(N,Pe,fe){fe===void 0&&(q===null?fe=e.TEXTURE0+Y-1:fe=q);let Ae=ne[fe];Ae===void 0&&(Ae={type:void 0,texture:void 0},ne[fe]=Ae),(Ae.type!==N||Ae.texture!==Pe)&&(q!==fe&&(e.activeTexture(fe),q=fe),e.bindTexture(N,Pe||ce[N]),Ae.type=N,Ae.texture=Pe)}function Pt(){const N=ne[q];N!==void 0&&N.type!==void 0&&(e.bindTexture(N.type,null),N.type=void 0,N.texture=void 0)}function te(){try{e.compressedTexImage2D(...arguments)}catch(N){Tt("WebGLState:",N)}}function w(){try{e.compressedTexImage3D(...arguments)}catch(N){Tt("WebGLState:",N)}}function _(){try{e.texSubImage2D(...arguments)}catch(N){Tt("WebGLState:",N)}}function F(){try{e.texSubImage3D(...arguments)}catch(N){Tt("WebGLState:",N)}}function X(){try{e.compressedTexSubImage2D(...arguments)}catch(N){Tt("WebGLState:",N)}}function re(){try{e.compressedTexSubImage3D(...arguments)}catch(N){Tt("WebGLState:",N)}}function _e(){try{e.texStorage2D(...arguments)}catch(N){Tt("WebGLState:",N)}}function Me(){try{e.texStorage3D(...arguments)}catch(N){Tt("WebGLState:",N)}}function ie(){try{e.texImage2D(...arguments)}catch(N){Tt("WebGLState:",N)}}function le(){try{e.texImage3D(...arguments)}catch(N){Tt("WebGLState:",N)}}function ve(N){return d[N]!==void 0?d[N]:e.getParameter(N)}function Fe(N,Pe){d[N]!==Pe&&(e.pixelStorei(N,Pe),d[N]=Pe)}function be(N){Le.equals(N)===!1&&(e.scissor(N.x,N.y,N.z,N.w),Le.copy(N))}function Ee(N){ze.equals(N)===!1&&(e.viewport(N.x,N.y,N.z,N.w),ze.copy(N))}function Be(N,Pe){let fe=c.get(Pe);fe===void 0&&(fe=new WeakMap,c.set(Pe,fe));let Ae=fe.get(N);Ae===void 0&&(Ae=e.getUniformBlockIndex(Pe,N.name),fe.set(N,Ae))}function $e(N,Pe){const Ae=c.get(Pe).get(N);l.get(Pe)!==Ae&&(e.uniformBlockBinding(Pe,Ae,N.__bindingPointIndex),l.set(Pe,Ae))}function je(){e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.POLYGON_OFFSET_FILL),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ZERO),e.blendFuncSeparate(e.ONE,e.ZERO,e.ONE,e.ZERO),e.blendColor(0,0,0,0),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0),e.depthMask(!0),e.depthFunc(e.LESS),a.setReversed(!1),e.clearDepth(1),e.stencilMask(4294967295),e.stencilFunc(e.ALWAYS,0,4294967295),e.stencilOp(e.KEEP,e.KEEP,e.KEEP),e.clearStencil(0),e.cullFace(e.BACK),e.frontFace(e.CCW),e.polygonOffset(0,0),e.activeTexture(e.TEXTURE0),e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),e.bindFramebuffer(e.READ_FRAMEBUFFER,null),e.useProgram(null),e.lineWidth(1),e.scissor(0,0,e.canvas.width,e.canvas.height),e.viewport(0,0,e.canvas.width,e.canvas.height),e.pixelStorei(e.PACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!1),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,e.BROWSER_DEFAULT_WEBGL),e.pixelStorei(e.PACK_ROW_LENGTH,0),e.pixelStorei(e.PACK_SKIP_PIXELS,0),e.pixelStorei(e.PACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_ROW_LENGTH,0),e.pixelStorei(e.UNPACK_IMAGE_HEIGHT,0),e.pixelStorei(e.UNPACK_SKIP_PIXELS,0),e.pixelStorei(e.UNPACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_SKIP_IMAGES,0),h={},d={},q=null,ne={},u={},m=new WeakMap,S=[],x=null,f=!1,p=null,M=null,A=null,v=null,y=null,E=null,T=null,g=new Mt(0,0,0),P=0,C=!1,I=null,U=null,V=null,k=null,B=null,Le.set(0,0,e.canvas.width,e.canvas.height),ze.set(0,0,e.canvas.width,e.canvas.height),o.reset(),a.reset(),s.reset()}return{buffers:{color:o,depth:a,stencil:s},enable:O,disable:xe,bindFramebuffer:ee,drawBuffers:W,useProgram:me,setBlending:oe,setMaterial:ge,setFlipSided:Ce,setCullFace:Xe,setLineWidth:Je,setPolygonOffset:Ve,setScissorTest:tt,activeTexture:dt,bindTexture:z,unbindTexture:Pt,compressedTexImage2D:te,compressedTexImage3D:w,texImage2D:ie,texImage3D:le,pixelStorei:Fe,getParameter:ve,updateUBOMapping:Be,uniformBlockBinding:$e,texStorage2D:_e,texStorage3D:Me,texSubImage2D:_,texSubImage3D:F,compressedTexSubImage2D:X,compressedTexSubImage3D:re,scissor:be,viewport:Ee,reset:je}}function bv(e,t,n,i,r,o,a){const s=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new et,h=new WeakMap,d=new Set;let u;const m=new WeakMap;let S=!1;try{S=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function x(w,_){return S?new OffscreenCanvas(w,_):Vp("canvas")}function f(w,_,F){let X=1;const re=te(w);if((re.width>F||re.height>F)&&(X=F/Math.max(re.width,re.height)),X<1)if(typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&w instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&w instanceof ImageBitmap||typeof VideoFrame<"u"&&w instanceof VideoFrame){const _e=Math.floor(X*re.width),Me=Math.floor(X*re.height);u===void 0&&(u=x(_e,Me));const ie=_?x(_e,Me):u;return ie.width=_e,ie.height=Me,ie.getContext("2d").drawImage(w,0,0,_e,Me),_t("WebGLRenderer: Texture has been resized from ("+re.width+"x"+re.height+") to ("+_e+"x"+Me+")."),ie}else return"data"in w&&_t("WebGLRenderer: Image in DataTexture is too big ("+re.width+"x"+re.height+")."),w;return w}function p(w){return w.generateMipmaps}function M(w){e.generateMipmap(w)}function A(w){return w.isWebGLCubeRenderTarget?e.TEXTURE_CUBE_MAP:w.isWebGL3DRenderTarget?e.TEXTURE_3D:w.isWebGLArrayRenderTarget||w.isCompressedArrayTexture?e.TEXTURE_2D_ARRAY:e.TEXTURE_2D}function v(w,_,F,X,re,_e=!1){if(w!==null){if(e[w]!==void 0)return e[w];_t("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+w+"'")}let Me;X&&(Me=t.get("EXT_texture_norm16"),Me||_t("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let ie=_;if(_===e.RED&&(F===e.FLOAT&&(ie=e.R32F),F===e.HALF_FLOAT&&(ie=e.R16F),F===e.UNSIGNED_BYTE&&(ie=e.R8),F===e.UNSIGNED_SHORT&&Me&&(ie=Me.R16_EXT),F===e.SHORT&&Me&&(ie=Me.R16_SNORM_EXT)),_===e.RED_INTEGER&&(F===e.UNSIGNED_BYTE&&(ie=e.R8UI),F===e.UNSIGNED_SHORT&&(ie=e.R16UI),F===e.UNSIGNED_INT&&(ie=e.R32UI),F===e.BYTE&&(ie=e.R8I),F===e.SHORT&&(ie=e.R16I),F===e.INT&&(ie=e.R32I)),_===e.RG&&(F===e.FLOAT&&(ie=e.RG32F),F===e.HALF_FLOAT&&(ie=e.RG16F),F===e.UNSIGNED_BYTE&&(ie=e.RG8),F===e.UNSIGNED_SHORT&&Me&&(ie=Me.RG16_EXT),F===e.SHORT&&Me&&(ie=Me.RG16_SNORM_EXT)),_===e.RG_INTEGER&&(F===e.UNSIGNED_BYTE&&(ie=e.RG8UI),F===e.UNSIGNED_SHORT&&(ie=e.RG16UI),F===e.UNSIGNED_INT&&(ie=e.RG32UI),F===e.BYTE&&(ie=e.RG8I),F===e.SHORT&&(ie=e.RG16I),F===e.INT&&(ie=e.RG32I)),_===e.RGB_INTEGER&&(F===e.UNSIGNED_BYTE&&(ie=e.RGB8UI),F===e.UNSIGNED_SHORT&&(ie=e.RGB16UI),F===e.UNSIGNED_INT&&(ie=e.RGB32UI),F===e.BYTE&&(ie=e.RGB8I),F===e.SHORT&&(ie=e.RGB16I),F===e.INT&&(ie=e.RGB32I)),_===e.RGBA_INTEGER&&(F===e.UNSIGNED_BYTE&&(ie=e.RGBA8UI),F===e.UNSIGNED_SHORT&&(ie=e.RGBA16UI),F===e.UNSIGNED_INT&&(ie=e.RGBA32UI),F===e.BYTE&&(ie=e.RGBA8I),F===e.SHORT&&(ie=e.RGBA16I),F===e.INT&&(ie=e.RGBA32I)),_===e.RGB&&(F===e.UNSIGNED_SHORT&&Me&&(ie=Me.RGB16_EXT),F===e.SHORT&&Me&&(ie=Me.RGB16_SNORM_EXT),F===e.UNSIGNED_INT_5_9_9_9_REV&&(ie=e.RGB9_E5),F===e.UNSIGNED_INT_10F_11F_11F_REV&&(ie=e.R11F_G11F_B10F)),_===e.RGBA){const le=_e?Gu:Ut.getTransfer(re);F===e.FLOAT&&(ie=e.RGBA32F),F===e.HALF_FLOAT&&(ie=e.RGBA16F),F===e.UNSIGNED_BYTE&&(ie=le===At?e.SRGB8_ALPHA8:e.RGBA8),F===e.UNSIGNED_SHORT&&Me&&(ie=Me.RGBA16_EXT),F===e.SHORT&&Me&&(ie=Me.RGBA16_SNORM_EXT),F===e.UNSIGNED_SHORT_4_4_4_4&&(ie=e.RGBA4),F===e.UNSIGNED_SHORT_5_5_5_1&&(ie=e.RGB5_A1)}return(ie===e.R16F||ie===e.R32F||ie===e.RG16F||ie===e.RG32F||ie===e.RGBA16F||ie===e.RGBA32F)&&t.get("EXT_color_buffer_float"),ie}function y(w,_){let F;return w?_===null||_===Oi||_===Hr?F=e.DEPTH24_STENCIL8:_===yi?F=e.DEPTH32F_STENCIL8:_===Oo&&(F=e.DEPTH24_STENCIL8,_t("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):_===null||_===Oi||_===Hr?F=e.DEPTH_COMPONENT24:_===yi?F=e.DEPTH_COMPONENT32F:_===Oo&&(F=e.DEPTH_COMPONENT16),F}function E(w,_){return p(w)===!0||w.isFramebufferTexture&&w.minFilter!==Di&&w.minFilter!==Sn?Math.log2(Math.max(_.width,_.height))+1:w.mipmaps!==void 0&&w.mipmaps.length>0?w.mipmaps.length:w.isCompressedTexture&&Array.isArray(w.image)?_.mipmaps.length:1}function T(w){const _=w.target;_.removeEventListener("dispose",T),P(_),_.isVideoTexture&&h.delete(_),_.isHTMLTexture&&d.delete(_)}function g(w){const _=w.target;_.removeEventListener("dispose",g),I(_)}function P(w){const _=i.get(w);if(_.__webglInit===void 0)return;const F=w.source,X=m.get(F);if(X){const re=X[_.__cacheKey];re.usedTimes--,re.usedTimes===0&&C(w),Object.keys(X).length===0&&m.delete(F)}i.remove(w)}function C(w){const _=i.get(w);e.deleteTexture(_.__webglTexture);const F=w.source,X=m.get(F);delete X[_.__cacheKey],a.memory.textures--}function I(w){const _=i.get(w);if(w.depthTexture&&(w.depthTexture.dispose(),i.remove(w.depthTexture)),w.isWebGLCubeRenderTarget)for(let X=0;X<6;X++){if(Array.isArray(_.__webglFramebuffer[X]))for(let re=0;re<_.__webglFramebuffer[X].length;re++)e.deleteFramebuffer(_.__webglFramebuffer[X][re]);else e.deleteFramebuffer(_.__webglFramebuffer[X]);_.__webglDepthbuffer&&e.deleteRenderbuffer(_.__webglDepthbuffer[X])}else{if(Array.isArray(_.__webglFramebuffer))for(let X=0;X<_.__webglFramebuffer.length;X++)e.deleteFramebuffer(_.__webglFramebuffer[X]);else e.deleteFramebuffer(_.__webglFramebuffer);if(_.__webglDepthbuffer&&e.deleteRenderbuffer(_.__webglDepthbuffer),_.__webglMultisampledFramebuffer&&e.deleteFramebuffer(_.__webglMultisampledFramebuffer),_.__webglColorRenderbuffer)for(let X=0;X<_.__webglColorRenderbuffer.length;X++)_.__webglColorRenderbuffer[X]&&e.deleteRenderbuffer(_.__webglColorRenderbuffer[X]);_.__webglDepthRenderbuffer&&e.deleteRenderbuffer(_.__webglDepthRenderbuffer)}const F=w.textures;for(let X=0,re=F.length;X<re;X++){const _e=i.get(F[X]);_e.__webglTexture&&(e.deleteTexture(_e.__webglTexture),a.memory.textures--),i.remove(F[X])}i.remove(w)}let U=0;function V(){U=0}function k(){return U}function B(w){U=w}function Y(){const w=U;return w>=r.maxTextures&&_t("WebGLTextures: Trying to use "+w+" texture units while this GPU supports only "+r.maxTextures),U+=1,w}function D(w){const _=[];return _.push(w.wrapS),_.push(w.wrapT),_.push(w.wrapR||0),_.push(w.magFilter),_.push(w.minFilter),_.push(w.anisotropy),_.push(w.internalFormat),_.push(w.format),_.push(w.type),_.push(w.generateMipmaps),_.push(w.premultiplyAlpha),_.push(w.flipY),_.push(w.unpackAlignment),_.push(w.colorSpace),_.join()}function j(w,_){const F=i.get(w);if(w.isVideoTexture&&z(w),w.isRenderTargetTexture===!1&&w.isExternalTexture!==!0&&w.version>0&&F.__version!==w.version){const X=w.image;if(X===null)_t("WebGLRenderer: Texture marked for update but no image data found.");else if(X.complete===!1)_t("WebGLRenderer: Texture marked for update but image is incomplete");else{xe(F,w,_);return}}else w.isExternalTexture&&(F.__webglTexture=w.sourceTexture?w.sourceTexture:null);n.bindTexture(e.TEXTURE_2D,F.__webglTexture,e.TEXTURE0+_)}function ae(w,_){const F=i.get(w);if(w.isRenderTargetTexture===!1&&w.version>0&&F.__version!==w.version){xe(F,w,_);return}else w.isExternalTexture&&(F.__webglTexture=w.sourceTexture?w.sourceTexture:null);n.bindTexture(e.TEXTURE_2D_ARRAY,F.__webglTexture,e.TEXTURE0+_)}function q(w,_){const F=i.get(w);if(w.isRenderTargetTexture===!1&&w.version>0&&F.__version!==w.version){xe(F,w,_);return}n.bindTexture(e.TEXTURE_3D,F.__webglTexture,e.TEXTURE0+_)}function ne(w,_){const F=i.get(w);if(w.isCubeDepthTexture!==!0&&w.version>0&&F.__version!==w.version){ee(F,w,_);return}n.bindTexture(e.TEXTURE_CUBE_MAP,F.__webglTexture,e.TEXTURE0+_)}const ue={[ap]:e.REPEAT,[Fa]:e.CLAMP_TO_EDGE,[op]:e.MIRRORED_REPEAT},we={[Di]:e.NEAREST,[sp]:e.NEAREST_MIPMAP_NEAREST,[po]:e.NEAREST_MIPMAP_LINEAR,[Sn]:e.LINEAR,[na]:e.LINEAR_MIPMAP_NEAREST,[$i]:e.LINEAR_MIPMAP_LINEAR},Le={[pp]:e.NEVER,[fp]:e.ALWAYS,[dp]:e.LESS,[ss]:e.LEQUAL,[up]:e.EQUAL,[as]:e.GEQUAL,[cp]:e.GREATER,[lp]:e.NOTEQUAL};function ze(w,_){if(_.type===yi&&t.has("OES_texture_float_linear")===!1&&(_.magFilter===Sn||_.magFilter===na||_.magFilter===po||_.magFilter===$i||_.minFilter===Sn||_.minFilter===na||_.minFilter===po||_.minFilter===$i)&&_t("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),e.texParameteri(w,e.TEXTURE_WRAP_S,ue[_.wrapS]),e.texParameteri(w,e.TEXTURE_WRAP_T,ue[_.wrapT]),(w===e.TEXTURE_3D||w===e.TEXTURE_2D_ARRAY)&&e.texParameteri(w,e.TEXTURE_WRAP_R,ue[_.wrapR]),e.texParameteri(w,e.TEXTURE_MAG_FILTER,we[_.magFilter]),e.texParameteri(w,e.TEXTURE_MIN_FILTER,we[_.minFilter]),_.compareFunction&&(e.texParameteri(w,e.TEXTURE_COMPARE_MODE,e.COMPARE_REF_TO_TEXTURE),e.texParameteri(w,e.TEXTURE_COMPARE_FUNC,Le[_.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(_.magFilter===Di||_.minFilter!==po&&_.minFilter!==$i||_.type===yi&&t.has("OES_texture_float_linear")===!1)return;if(_.anisotropy>1||i.get(_).__currentAnisotropy){const F=t.get("EXT_texture_filter_anisotropic");e.texParameterf(w,F.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(_.anisotropy,r.getMaxAnisotropy())),i.get(_).__currentAnisotropy=_.anisotropy}}}function J(w,_){let F=!1;w.__webglInit===void 0&&(w.__webglInit=!0,_.addEventListener("dispose",T));const X=_.source;let re=m.get(X);re===void 0&&(re={},m.set(X,re));const _e=D(_);if(_e!==w.__cacheKey){re[_e]===void 0&&(re[_e]={texture:e.createTexture(),usedTimes:0},a.memory.textures++,F=!0),re[_e].usedTimes++;const Me=re[w.__cacheKey];Me!==void 0&&(re[w.__cacheKey].usedTimes--,Me.usedTimes===0&&C(_)),w.__cacheKey=_e,w.__webglTexture=re[_e].texture}return F}function ce(w,_,F){return Math.floor(Math.floor(w/F)/_)}function O(w,_,F,X){const _e=w.updateRanges;if(_e.length===0)n.texSubImage2D(e.TEXTURE_2D,0,0,0,_.width,_.height,F,X,_.data);else{_e.sort((Fe,be)=>Fe.start-be.start);let Me=0;for(let Fe=1;Fe<_e.length;Fe++){const be=_e[Me],Ee=_e[Fe],Be=be.start+be.count,$e=ce(Ee.start,_.width,4),je=ce(be.start,_.width,4);Ee.start<=Be+1&&$e===je&&ce(Ee.start+Ee.count-1,_.width,4)===$e?be.count=Math.max(be.count,Ee.start+Ee.count-be.start):(++Me,_e[Me]=Ee)}_e.length=Me+1;const ie=n.getParameter(e.UNPACK_ROW_LENGTH),le=n.getParameter(e.UNPACK_SKIP_PIXELS),ve=n.getParameter(e.UNPACK_SKIP_ROWS);n.pixelStorei(e.UNPACK_ROW_LENGTH,_.width);for(let Fe=0,be=_e.length;Fe<be;Fe++){const Ee=_e[Fe],Be=Math.floor(Ee.start/4),$e=Math.ceil(Ee.count/4),je=Be%_.width,N=Math.floor(Be/_.width),Pe=$e,fe=1;n.pixelStorei(e.UNPACK_SKIP_PIXELS,je),n.pixelStorei(e.UNPACK_SKIP_ROWS,N),n.texSubImage2D(e.TEXTURE_2D,0,je,N,Pe,fe,F,X,_.data)}w.clearUpdateRanges(),n.pixelStorei(e.UNPACK_ROW_LENGTH,ie),n.pixelStorei(e.UNPACK_SKIP_PIXELS,le),n.pixelStorei(e.UNPACK_SKIP_ROWS,ve)}}function xe(w,_,F){let X=e.TEXTURE_2D;(_.isDataArrayTexture||_.isCompressedArrayTexture)&&(X=e.TEXTURE_2D_ARRAY),_.isData3DTexture&&(X=e.TEXTURE_3D);const re=J(w,_),_e=_.source;n.bindTexture(X,w.__webglTexture,e.TEXTURE0+F);const Me=i.get(_e);if(_e.version!==Me.__version||re===!0){if(n.activeTexture(e.TEXTURE0+F),(typeof ImageBitmap<"u"&&_.image instanceof ImageBitmap)===!1){const fe=Ut.getPrimaries(Ut.workingColorSpace),Ae=_.colorSpace===Yi?null:Ut.getPrimaries(_.colorSpace),De=_.colorSpace===Yi||fe===Ae?e.NONE:e.BROWSER_DEFAULT_WEBGL;n.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,_.flipY),n.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),n.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,De)}n.pixelStorei(e.UNPACK_ALIGNMENT,_.unpackAlignment);let le=f(_.image,!1,r.maxTextureSize);le=Pt(_,le);const ve=o.convert(_.format,_.colorSpace),Fe=o.convert(_.type);let be=v(_.internalFormat,ve,Fe,_.normalized,_.colorSpace,_.isVideoTexture);ze(X,_);let Ee;const Be=_.mipmaps,$e=_.isVideoTexture!==!0,je=Me.__version===void 0||re===!0,N=_e.dataReady,Pe=E(_,le);if(_.isDepthTexture)be=y(_.format===qi,_.type),je&&($e?n.texStorage2D(e.TEXTURE_2D,1,be,le.width,le.height):n.texImage2D(e.TEXTURE_2D,0,be,le.width,le.height,0,ve,Fe,null));else if(_.isDataTexture)if(Be.length>0){$e&&je&&n.texStorage2D(e.TEXTURE_2D,Pe,be,Be[0].width,Be[0].height);for(let fe=0,Ae=Be.length;fe<Ae;fe++)Ee=Be[fe],$e?N&&n.texSubImage2D(e.TEXTURE_2D,fe,0,0,Ee.width,Ee.height,ve,Fe,Ee.data):n.texImage2D(e.TEXTURE_2D,fe,be,Ee.width,Ee.height,0,ve,Fe,Ee.data);_.generateMipmaps=!1}else $e?(je&&n.texStorage2D(e.TEXTURE_2D,Pe,be,le.width,le.height),N&&O(_,le,ve,Fe)):n.texImage2D(e.TEXTURE_2D,0,be,le.width,le.height,0,ve,Fe,le.data);else if(_.isCompressedTexture)if(_.isCompressedArrayTexture){$e&&je&&n.texStorage3D(e.TEXTURE_2D_ARRAY,Pe,be,Be[0].width,Be[0].height,le.depth);for(let fe=0,Ae=Be.length;fe<Ae;fe++)if(Ee=Be[fe],_.format!==mi)if(ve!==null)if($e){if(N)if(_.layerUpdates.size>0){const De=Ml(Ee.width,Ee.height,_.format,_.type);for(const pe of _.layerUpdates){const He=Ee.data.subarray(pe*De/Ee.data.BYTES_PER_ELEMENT,(pe+1)*De/Ee.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,fe,0,0,pe,Ee.width,Ee.height,1,ve,He)}_.clearLayerUpdates()}else n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,fe,0,0,0,Ee.width,Ee.height,le.depth,ve,Ee.data)}else n.compressedTexImage3D(e.TEXTURE_2D_ARRAY,fe,be,Ee.width,Ee.height,le.depth,0,Ee.data,0,0);else _t("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else $e?N&&n.texSubImage3D(e.TEXTURE_2D_ARRAY,fe,0,0,0,Ee.width,Ee.height,le.depth,ve,Fe,Ee.data):n.texImage3D(e.TEXTURE_2D_ARRAY,fe,be,Ee.width,Ee.height,le.depth,0,ve,Fe,Ee.data)}else{$e&&je&&n.texStorage2D(e.TEXTURE_2D,Pe,be,Be[0].width,Be[0].height);for(let fe=0,Ae=Be.length;fe<Ae;fe++)Ee=Be[fe],_.format!==mi?ve!==null?$e?N&&n.compressedTexSubImage2D(e.TEXTURE_2D,fe,0,0,Ee.width,Ee.height,ve,Ee.data):n.compressedTexImage2D(e.TEXTURE_2D,fe,be,Ee.width,Ee.height,0,Ee.data):_t("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):$e?N&&n.texSubImage2D(e.TEXTURE_2D,fe,0,0,Ee.width,Ee.height,ve,Fe,Ee.data):n.texImage2D(e.TEXTURE_2D,fe,be,Ee.width,Ee.height,0,ve,Fe,Ee.data)}else if(_.isDataArrayTexture)if($e){if(je&&n.texStorage3D(e.TEXTURE_2D_ARRAY,Pe,be,le.width,le.height,le.depth),N)if(_.layerUpdates.size>0){const fe=Ml(le.width,le.height,_.format,_.type);for(const Ae of _.layerUpdates){const De=le.data.subarray(Ae*fe/le.data.BYTES_PER_ELEMENT,(Ae+1)*fe/le.data.BYTES_PER_ELEMENT);n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,Ae,le.width,le.height,1,ve,Fe,De)}_.clearLayerUpdates()}else n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,0,le.width,le.height,le.depth,ve,Fe,le.data)}else n.texImage3D(e.TEXTURE_2D_ARRAY,0,be,le.width,le.height,le.depth,0,ve,Fe,le.data);else if(_.isData3DTexture)$e?(je&&n.texStorage3D(e.TEXTURE_3D,Pe,be,le.width,le.height,le.depth),N&&n.texSubImage3D(e.TEXTURE_3D,0,0,0,0,le.width,le.height,le.depth,ve,Fe,le.data)):n.texImage3D(e.TEXTURE_3D,0,be,le.width,le.height,le.depth,0,ve,Fe,le.data);else if(_.isFramebufferTexture){if(je)if($e)n.texStorage2D(e.TEXTURE_2D,Pe,be,le.width,le.height);else{let fe=le.width,Ae=le.height;for(let De=0;De<Pe;De++)n.texImage2D(e.TEXTURE_2D,De,be,fe,Ae,0,ve,Fe,null),fe>>=1,Ae>>=1}}else if(_.isHTMLTexture){if("texElementImage2D"in e){const fe=e.canvas;if(fe.hasAttribute("layoutsubtree")||fe.setAttribute("layoutsubtree","true"),le.parentNode!==fe){fe.appendChild(le),d.add(_),fe.onpaint=Ae=>{const De=Ae.changedElements;for(const pe of d)De.includes(pe.image)&&(pe.needsUpdate=!0)},fe.requestPaint();return}if(e.texElementImage2D.length===3)e.texElementImage2D(e.TEXTURE_2D,e.RGBA8,le);else{const De=e.RGBA,pe=e.RGBA,He=e.UNSIGNED_BYTE;e.texElementImage2D(e.TEXTURE_2D,0,De,pe,He,le)}e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE)}}else if(Be.length>0){if($e&&je){const fe=te(Be[0]);n.texStorage2D(e.TEXTURE_2D,Pe,be,fe.width,fe.height)}for(let fe=0,Ae=Be.length;fe<Ae;fe++)Ee=Be[fe],$e?N&&n.texSubImage2D(e.TEXTURE_2D,fe,0,0,ve,Fe,Ee):n.texImage2D(e.TEXTURE_2D,fe,be,ve,Fe,Ee);_.generateMipmaps=!1}else if($e){if(je){const fe=te(le);n.texStorage2D(e.TEXTURE_2D,Pe,be,fe.width,fe.height)}N&&n.texSubImage2D(e.TEXTURE_2D,0,0,0,ve,Fe,le)}else n.texImage2D(e.TEXTURE_2D,0,be,ve,Fe,le);p(_)&&M(X),Me.__version=_e.version,_.onUpdate&&_.onUpdate(_)}w.__version=_.version}function ee(w,_,F){if(_.image.length!==6)return;const X=J(w,_),re=_.source;n.bindTexture(e.TEXTURE_CUBE_MAP,w.__webglTexture,e.TEXTURE0+F);const _e=i.get(re);if(re.version!==_e.__version||X===!0){n.activeTexture(e.TEXTURE0+F);const Me=Ut.getPrimaries(Ut.workingColorSpace),ie=_.colorSpace===Yi?null:Ut.getPrimaries(_.colorSpace),le=_.colorSpace===Yi||Me===ie?e.NONE:e.BROWSER_DEFAULT_WEBGL;n.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,_.flipY),n.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),n.pixelStorei(e.UNPACK_ALIGNMENT,_.unpackAlignment),n.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,le);const ve=_.isCompressedTexture||_.image[0].isCompressedTexture,Fe=_.image[0]&&_.image[0].isDataTexture,be=[];for(let pe=0;pe<6;pe++)!ve&&!Fe?be[pe]=f(_.image[pe],!0,r.maxCubemapSize):be[pe]=Fe?_.image[pe].image:_.image[pe],be[pe]=Pt(_,be[pe]);const Ee=be[0],Be=o.convert(_.format,_.colorSpace),$e=o.convert(_.type),je=v(_.internalFormat,Be,$e,_.normalized,_.colorSpace),N=_.isVideoTexture!==!0,Pe=_e.__version===void 0||X===!0,fe=re.dataReady;let Ae=E(_,Ee);ze(e.TEXTURE_CUBE_MAP,_);let De;if(ve){N&&Pe&&n.texStorage2D(e.TEXTURE_CUBE_MAP,Ae,je,Ee.width,Ee.height);for(let pe=0;pe<6;pe++){De=be[pe].mipmaps;for(let He=0;He<De.length;He++){const Oe=De[He];_.format!==mi?Be!==null?N?fe&&n.compressedTexSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+pe,He,0,0,Oe.width,Oe.height,Be,Oe.data):n.compressedTexImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+pe,He,je,Oe.width,Oe.height,0,Oe.data):_t("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):N?fe&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+pe,He,0,0,Oe.width,Oe.height,Be,$e,Oe.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+pe,He,je,Oe.width,Oe.height,0,Be,$e,Oe.data)}}}else{if(De=_.mipmaps,N&&Pe){De.length>0&&Ae++;const pe=te(be[0]);n.texStorage2D(e.TEXTURE_CUBE_MAP,Ae,je,pe.width,pe.height)}for(let pe=0;pe<6;pe++)if(Fe){N?fe&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+pe,0,0,0,be[pe].width,be[pe].height,Be,$e,be[pe].data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+pe,0,je,be[pe].width,be[pe].height,0,Be,$e,be[pe].data);for(let He=0;He<De.length;He++){const Ct=De[He].image[pe].image;N?fe&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+pe,He+1,0,0,Ct.width,Ct.height,Be,$e,Ct.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+pe,He+1,je,Ct.width,Ct.height,0,Be,$e,Ct.data)}}else{N?fe&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+pe,0,0,0,Be,$e,be[pe]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+pe,0,je,Be,$e,be[pe]);for(let He=0;He<De.length;He++){const Oe=De[He];N?fe&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+pe,He+1,0,0,Be,$e,Oe.image[pe]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+pe,He+1,je,Be,$e,Oe.image[pe])}}}p(_)&&M(e.TEXTURE_CUBE_MAP),_e.__version=re.version,_.onUpdate&&_.onUpdate(_)}w.__version=_.version}function W(w,_,F,X,re,_e){const Me=o.convert(F.format,F.colorSpace),ie=o.convert(F.type),le=v(F.internalFormat,Me,ie,F.normalized,F.colorSpace),ve=i.get(_),Fe=i.get(F);if(Fe.__renderTarget=_,!ve.__hasExternalTextures){const be=Math.max(1,_.width>>_e),Ee=Math.max(1,_.height>>_e);re===e.TEXTURE_3D||re===e.TEXTURE_2D_ARRAY?n.texImage3D(re,_e,le,be,Ee,_.depth,0,Me,ie,null):n.texImage2D(re,_e,le,be,Ee,0,Me,ie,null)}n.bindFramebuffer(e.FRAMEBUFFER,w),dt(_)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,X,re,Fe.__webglTexture,0,tt(_)):(re===e.TEXTURE_2D||re>=e.TEXTURE_CUBE_MAP_POSITIVE_X&&re<=e.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&e.framebufferTexture2D(e.FRAMEBUFFER,X,re,Fe.__webglTexture,_e),n.bindFramebuffer(e.FRAMEBUFFER,null)}function me(w,_,F){if(e.bindRenderbuffer(e.RENDERBUFFER,w),_.depthBuffer){const X=_.depthTexture,re=X&&X.isDepthTexture?X.type:null,_e=y(_.stencilBuffer,re),Me=_.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;dt(_)?s.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,tt(_),_e,_.width,_.height):F?e.renderbufferStorageMultisample(e.RENDERBUFFER,tt(_),_e,_.width,_.height):e.renderbufferStorage(e.RENDERBUFFER,_e,_.width,_.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,Me,e.RENDERBUFFER,w)}else{const X=_.textures;for(let re=0;re<X.length;re++){const _e=X[re],Me=o.convert(_e.format,_e.colorSpace),ie=o.convert(_e.type),le=v(_e.internalFormat,Me,ie,_e.normalized,_e.colorSpace);dt(_)?s.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,tt(_),le,_.width,_.height):F?e.renderbufferStorageMultisample(e.RENDERBUFFER,tt(_),le,_.width,_.height):e.renderbufferStorage(e.RENDERBUFFER,le,_.width,_.height)}}e.bindRenderbuffer(e.RENDERBUFFER,null)}function de(w,_,F){const X=_.isWebGLCubeRenderTarget===!0;if(n.bindFramebuffer(e.FRAMEBUFFER,w),!(_.depthTexture&&_.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const re=i.get(_.depthTexture);if(re.__renderTarget=_,(!re.__webglTexture||_.depthTexture.image.width!==_.width||_.depthTexture.image.height!==_.height)&&(_.depthTexture.image.width=_.width,_.depthTexture.image.height=_.height,_.depthTexture.needsUpdate=!0),X){if(re.__webglInit===void 0&&(re.__webglInit=!0,_.depthTexture.addEventListener("dispose",T)),re.__webglTexture===void 0){re.__webglTexture=e.createTexture(),n.bindTexture(e.TEXTURE_CUBE_MAP,re.__webglTexture),ze(e.TEXTURE_CUBE_MAP,_.depthTexture);const ve=o.convert(_.depthTexture.format),Fe=o.convert(_.depthTexture.type);let be;_.depthTexture.format===nr?be=e.DEPTH_COMPONENT24:_.depthTexture.format===qi&&(be=e.DEPTH24_STENCIL8);for(let Ee=0;Ee<6;Ee++)e.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+Ee,0,be,_.width,_.height,0,ve,Fe,null)}}else j(_.depthTexture,0);const _e=re.__webglTexture,Me=tt(_),ie=X?e.TEXTURE_CUBE_MAP_POSITIVE_X+F:e.TEXTURE_2D,le=_.depthTexture.format===qi?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;if(_.depthTexture.format===nr)dt(_)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,le,ie,_e,0,Me):e.framebufferTexture2D(e.FRAMEBUFFER,le,ie,_e,0);else if(_.depthTexture.format===qi)dt(_)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,le,ie,_e,0,Me):e.framebufferTexture2D(e.FRAMEBUFFER,le,ie,_e,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function G(w){const _=i.get(w),F=w.isWebGLCubeRenderTarget===!0;if(_.__boundDepthTexture!==w.depthTexture){const X=w.depthTexture;if(_.__depthDisposeCallback&&_.__depthDisposeCallback(),X){const re=()=>{delete _.__boundDepthTexture,delete _.__depthDisposeCallback,X.removeEventListener("dispose",re)};X.addEventListener("dispose",re),_.__depthDisposeCallback=re}_.__boundDepthTexture=X}if(w.depthTexture&&!_.__autoAllocateDepthBuffer)if(F)for(let X=0;X<6;X++)de(_.__webglFramebuffer[X],w,X);else{const X=w.texture.mipmaps;X&&X.length>0?de(_.__webglFramebuffer[0],w,0):de(_.__webglFramebuffer,w,0)}else if(F){_.__webglDepthbuffer=[];for(let X=0;X<6;X++)if(n.bindFramebuffer(e.FRAMEBUFFER,_.__webglFramebuffer[X]),_.__webglDepthbuffer[X]===void 0)_.__webglDepthbuffer[X]=e.createRenderbuffer(),me(_.__webglDepthbuffer[X],w,!1);else{const re=w.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,_e=_.__webglDepthbuffer[X];e.bindRenderbuffer(e.RENDERBUFFER,_e),e.framebufferRenderbuffer(e.FRAMEBUFFER,re,e.RENDERBUFFER,_e)}}else{const X=w.texture.mipmaps;if(X&&X.length>0?n.bindFramebuffer(e.FRAMEBUFFER,_.__webglFramebuffer[0]):n.bindFramebuffer(e.FRAMEBUFFER,_.__webglFramebuffer),_.__webglDepthbuffer===void 0)_.__webglDepthbuffer=e.createRenderbuffer(),me(_.__webglDepthbuffer,w,!1);else{const re=w.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,_e=_.__webglDepthbuffer;e.bindRenderbuffer(e.RENDERBUFFER,_e),e.framebufferRenderbuffer(e.FRAMEBUFFER,re,e.RENDERBUFFER,_e)}}n.bindFramebuffer(e.FRAMEBUFFER,null)}function oe(w,_,F){const X=i.get(w);_!==void 0&&W(X.__webglFramebuffer,w,w.texture,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,0),F!==void 0&&G(w)}function ge(w){const _=w.texture,F=i.get(w),X=i.get(_);w.addEventListener("dispose",g);const re=w.textures,_e=w.isWebGLCubeRenderTarget===!0,Me=re.length>1;if(Me||(X.__webglTexture===void 0&&(X.__webglTexture=e.createTexture()),X.__version=_.version,a.memory.textures++),_e){F.__webglFramebuffer=[];for(let ie=0;ie<6;ie++)if(_.mipmaps&&_.mipmaps.length>0){F.__webglFramebuffer[ie]=[];for(let le=0;le<_.mipmaps.length;le++)F.__webglFramebuffer[ie][le]=e.createFramebuffer()}else F.__webglFramebuffer[ie]=e.createFramebuffer()}else{if(_.mipmaps&&_.mipmaps.length>0){F.__webglFramebuffer=[];for(let ie=0;ie<_.mipmaps.length;ie++)F.__webglFramebuffer[ie]=e.createFramebuffer()}else F.__webglFramebuffer=e.createFramebuffer();if(Me)for(let ie=0,le=re.length;ie<le;ie++){const ve=i.get(re[ie]);ve.__webglTexture===void 0&&(ve.__webglTexture=e.createTexture(),a.memory.textures++)}if(w.samples>0&&dt(w)===!1){F.__webglMultisampledFramebuffer=e.createFramebuffer(),F.__webglColorRenderbuffer=[],n.bindFramebuffer(e.FRAMEBUFFER,F.__webglMultisampledFramebuffer);for(let ie=0;ie<re.length;ie++){const le=re[ie];F.__webglColorRenderbuffer[ie]=e.createRenderbuffer(),e.bindRenderbuffer(e.RENDERBUFFER,F.__webglColorRenderbuffer[ie]);const ve=o.convert(le.format,le.colorSpace),Fe=o.convert(le.type),be=v(le.internalFormat,ve,Fe,le.normalized,le.colorSpace,w.isXRRenderTarget===!0),Ee=tt(w);e.renderbufferStorageMultisample(e.RENDERBUFFER,Ee,be,w.width,w.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+ie,e.RENDERBUFFER,F.__webglColorRenderbuffer[ie])}e.bindRenderbuffer(e.RENDERBUFFER,null),w.depthBuffer&&(F.__webglDepthRenderbuffer=e.createRenderbuffer(),me(F.__webglDepthRenderbuffer,w,!0)),n.bindFramebuffer(e.FRAMEBUFFER,null)}}if(_e){n.bindTexture(e.TEXTURE_CUBE_MAP,X.__webglTexture),ze(e.TEXTURE_CUBE_MAP,_);for(let ie=0;ie<6;ie++)if(_.mipmaps&&_.mipmaps.length>0)for(let le=0;le<_.mipmaps.length;le++)W(F.__webglFramebuffer[ie][le],w,_,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+ie,le);else W(F.__webglFramebuffer[ie],w,_,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0);p(_)&&M(e.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(Me){for(let ie=0,le=re.length;ie<le;ie++){const ve=re[ie],Fe=i.get(ve);let be=e.TEXTURE_2D;(w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)&&(be=w.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(be,Fe.__webglTexture),ze(be,ve),W(F.__webglFramebuffer,w,ve,e.COLOR_ATTACHMENT0+ie,be,0),p(ve)&&M(be)}n.unbindTexture()}else{let ie=e.TEXTURE_2D;if((w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)&&(ie=w.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(ie,X.__webglTexture),ze(ie,_),_.mipmaps&&_.mipmaps.length>0)for(let le=0;le<_.mipmaps.length;le++)W(F.__webglFramebuffer[le],w,_,e.COLOR_ATTACHMENT0,ie,le);else W(F.__webglFramebuffer,w,_,e.COLOR_ATTACHMENT0,ie,0);p(_)&&M(ie),n.unbindTexture()}w.depthBuffer&&G(w)}function Ce(w){const _=w.textures;for(let F=0,X=_.length;F<X;F++){const re=_[F];if(p(re)){const _e=A(w),Me=i.get(re).__webglTexture;n.bindTexture(_e,Me),M(_e),n.unbindTexture()}}}const Xe=[],Je=[];function Ve(w){if(w.samples>0){if(dt(w)===!1){const _=w.textures,F=w.width,X=w.height;let re=e.COLOR_BUFFER_BIT;const _e=w.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,Me=i.get(w),ie=_.length>1;if(ie)for(let ve=0;ve<_.length;ve++)n.bindFramebuffer(e.FRAMEBUFFER,Me.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+ve,e.RENDERBUFFER,null),n.bindFramebuffer(e.FRAMEBUFFER,Me.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+ve,e.TEXTURE_2D,null,0);n.bindFramebuffer(e.READ_FRAMEBUFFER,Me.__webglMultisampledFramebuffer);const le=w.texture.mipmaps;le&&le.length>0?n.bindFramebuffer(e.DRAW_FRAMEBUFFER,Me.__webglFramebuffer[0]):n.bindFramebuffer(e.DRAW_FRAMEBUFFER,Me.__webglFramebuffer);for(let ve=0;ve<_.length;ve++){if(w.resolveDepthBuffer&&(w.depthBuffer&&(re|=e.DEPTH_BUFFER_BIT),w.stencilBuffer&&w.resolveStencilBuffer&&(re|=e.STENCIL_BUFFER_BIT)),ie){e.framebufferRenderbuffer(e.READ_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.RENDERBUFFER,Me.__webglColorRenderbuffer[ve]);const Fe=i.get(_[ve]).__webglTexture;e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,Fe,0)}e.blitFramebuffer(0,0,F,X,0,0,F,X,re,e.NEAREST),l===!0&&(Xe.length=0,Je.length=0,Xe.push(e.COLOR_ATTACHMENT0+ve),w.depthBuffer&&w.resolveDepthBuffer===!1&&(Xe.push(_e),Je.push(_e),e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,Je)),e.invalidateFramebuffer(e.READ_FRAMEBUFFER,Xe))}if(n.bindFramebuffer(e.READ_FRAMEBUFFER,null),n.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),ie)for(let ve=0;ve<_.length;ve++){n.bindFramebuffer(e.FRAMEBUFFER,Me.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+ve,e.RENDERBUFFER,Me.__webglColorRenderbuffer[ve]);const Fe=i.get(_[ve]).__webglTexture;n.bindFramebuffer(e.FRAMEBUFFER,Me.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+ve,e.TEXTURE_2D,Fe,0)}n.bindFramebuffer(e.DRAW_FRAMEBUFFER,Me.__webglMultisampledFramebuffer)}else if(w.depthBuffer&&w.resolveDepthBuffer===!1&&l){const _=w.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,[_])}}}function tt(w){return Math.min(r.maxSamples,w.samples)}function dt(w){const _=i.get(w);return w.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&_.__useRenderToTexture!==!1}function z(w){const _=a.render.frame;h.get(w)!==_&&(h.set(w,_),w.update())}function Pt(w,_){const F=w.colorSpace,X=w.format,re=w.type;return w.isCompressedTexture===!0||w.isVideoTexture===!0||F!==Vu&&F!==Yi&&(Ut.getTransfer(F)===At?(X!==mi||re!==Yn)&&_t("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Tt("WebGLTextures: Unsupported texture color space:",F)),_}function te(w){return typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement?(c.width=w.naturalWidth||w.width,c.height=w.naturalHeight||w.height):typeof VideoFrame<"u"&&w instanceof VideoFrame?(c.width=w.displayWidth,c.height=w.displayHeight):(c.width=w.width,c.height=w.height),c}this.allocateTextureUnit=Y,this.resetTextureUnits=V,this.getTextureUnits=k,this.setTextureUnits=B,this.setTexture2D=j,this.setTexture2DArray=ae,this.setTexture3D=q,this.setTextureCube=ne,this.rebindTextures=oe,this.setupRenderTarget=ge,this.updateRenderTargetMipmap=Ce,this.updateMultisampleRenderTarget=Ve,this.setupDepthRenderbuffer=G,this.setupFrameBufferTexture=W,this.useMultisampledRTT=dt,this.isReversedDepthBuffer=function(){return n.buffers.depth.getReversed()}}function Av(e,t){function n(i,r=Yi){let o;const a=Ut.getTransfer(r);if(i===Yn)return e.UNSIGNED_BYTE;if(i===Tu)return e.UNSIGNED_SHORT_4_4_4_4;if(i===Pu)return e.UNSIGNED_SHORT_5_5_5_1;if(i===xp)return e.UNSIGNED_INT_5_9_9_9_REV;if(i===vp)return e.UNSIGNED_INT_10F_11F_11F_REV;if(i===Sp)return e.BYTE;if(i===Ep)return e.SHORT;if(i===Oo)return e.UNSIGNED_SHORT;if(i===Ru)return e.INT;if(i===Oi)return e.UNSIGNED_INT;if(i===yi)return e.FLOAT;if(i===Ti)return e.HALF_FLOAT;if(i===yp)return e.ALPHA;if(i===Mp)return e.RGB;if(i===mi)return e.RGBA;if(i===nr)return e.DEPTH_COMPONENT;if(i===qi)return e.DEPTH_STENCIL;if(i===bp)return e.RED;if(i===Au)return e.RED_INTEGER;if(i===ir)return e.RG;if(i===bu)return e.RG_INTEGER;if(i===Mu)return e.RGBA_INTEGER;if(i===ia||i===ra||i===oa||i===aa)if(a===At)if(o=t.get("WEBGL_compressed_texture_s3tc_srgb"),o!==null){if(i===ia)return o.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===ra)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===oa)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===aa)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(o=t.get("WEBGL_compressed_texture_s3tc"),o!==null){if(i===ia)return o.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===ra)return o.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===oa)return o.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===aa)return o.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===ks||i===Hs||i===Ws||i===Xs)if(o=t.get("WEBGL_compressed_texture_pvrtc"),o!==null){if(i===ks)return o.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Hs)return o.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Ws)return o.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Xs)return o.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Ys||i===$s||i===qs||i===Ks||i===js||i===Oa||i===Zs)if(o=t.get("WEBGL_compressed_texture_etc"),o!==null){if(i===Ys||i===$s)return a===At?o.COMPRESSED_SRGB8_ETC2:o.COMPRESSED_RGB8_ETC2;if(i===qs)return a===At?o.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:o.COMPRESSED_RGBA8_ETC2_EAC;if(i===Ks)return o.COMPRESSED_R11_EAC;if(i===js)return o.COMPRESSED_SIGNED_R11_EAC;if(i===Oa)return o.COMPRESSED_RG11_EAC;if(i===Zs)return o.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===Js||i===Qs||i===el||i===tl||i===nl||i===il||i===rl||i===ol||i===al||i===sl||i===ll||i===cl||i===ul||i===dl)if(o=t.get("WEBGL_compressed_texture_astc"),o!==null){if(i===Js)return a===At?o.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:o.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Qs)return a===At?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:o.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===el)return a===At?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:o.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===tl)return a===At?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:o.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===nl)return a===At?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:o.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===il)return a===At?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:o.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===rl)return a===At?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:o.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===ol)return a===At?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:o.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===al)return a===At?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:o.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===sl)return a===At?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:o.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===ll)return a===At?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:o.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===cl)return a===At?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:o.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===ul)return a===At?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:o.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===dl)return a===At?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:o.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===fl||i===pl||i===hl)if(o=t.get("EXT_texture_compression_bptc"),o!==null){if(i===fl)return a===At?o.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:o.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===pl)return o.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===hl)return o.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===ml||i===gl||i===za||i===_l)if(o=t.get("EXT_texture_compression_rgtc"),o!==null){if(i===ml)return o.COMPRESSED_RED_RGTC1_EXT;if(i===gl)return o.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===za)return o.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===_l)return o.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Hr?e.UNSIGNED_INT_24_8:e[i]!==void 0?e[i]:null}return{convert:n}}const Tv=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Pv=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class wv{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,n){if(this.texture===null){const i=new wu(t.texture);(t.depthNear!==n.depthNear||t.depthFar!==n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=i}}getMesh(t){if(this.texture!==null&&this.mesh===null){const n=t.cameras[0].viewport,i=new zn({vertexShader:Tv,fragmentShader:Pv,uniforms:{depthColor:{value:this.texture},depthWidth:{value:n.z},depthHeight:{value:n.w}}});this.mesh=new jt(new Qr(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Rv extends Of{constructor(t,n){super();const i=this;let r=null,o=1,a=null,s="local-floor",l=1,c=null,h=null,d=null,u=null,m=null,S=null;const x=typeof XRWebGLBinding<"u",f=new wv,p={},M=n.getContextAttributes();let A=null,v=null;const y=[],E=[],T=new et;let g=null;const P=new Ji;P.viewport=new Wt;const C=new Ji;C.viewport=new Wt;const I=[P,C],U=new zf;let V=null,k=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(J){let ce=y[J];return ce===void 0&&(ce=new ta,y[J]=ce),ce.getTargetRaySpace()},this.getControllerGrip=function(J){let ce=y[J];return ce===void 0&&(ce=new ta,y[J]=ce),ce.getGripSpace()},this.getHand=function(J){let ce=y[J];return ce===void 0&&(ce=new ta,y[J]=ce),ce.getHandSpace()};function B(J){const ce=E.indexOf(J.inputSource);if(ce===-1)return;const O=y[ce];O!==void 0&&(O.update(J.inputSource,J.frame,c||a),O.dispatchEvent({type:J.type,data:J.inputSource}))}function Y(){r.removeEventListener("select",B),r.removeEventListener("selectstart",B),r.removeEventListener("selectend",B),r.removeEventListener("squeeze",B),r.removeEventListener("squeezestart",B),r.removeEventListener("squeezeend",B),r.removeEventListener("end",Y),r.removeEventListener("inputsourceschange",D);for(let J=0;J<y.length;J++){const ce=E[J];ce!==null&&(E[J]=null,y[J].disconnect(ce))}V=null,k=null,f.reset();for(const J in p)delete p[J];t.setRenderTarget(A),m=null,u=null,d=null,r=null,v=null,ze.stop(),i.isPresenting=!1,t.setPixelRatio(g),t.setSize(T.width,T.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(J){o=J,i.isPresenting===!0&&_t("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(J){s=J,i.isPresenting===!0&&_t("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(J){c=J},this.getBaseLayer=function(){return u!==null?u:m},this.getBinding=function(){return d===null&&x&&(d=new XRWebGLBinding(r,n)),d},this.getFrame=function(){return S},this.getSession=function(){return r},this.setSession=async function(J){if(r=J,r!==null){if(A=t.getRenderTarget(),r.addEventListener("select",B),r.addEventListener("selectstart",B),r.addEventListener("selectend",B),r.addEventListener("squeeze",B),r.addEventListener("squeezestart",B),r.addEventListener("squeezeend",B),r.addEventListener("end",Y),r.addEventListener("inputsourceschange",D),M.xrCompatible!==!0&&await n.makeXRCompatible(),g=t.getPixelRatio(),t.getSize(T),x&&"createProjectionLayer"in XRWebGLBinding.prototype){let O=null,xe=null,ee=null;M.depth&&(ee=M.stencil?n.DEPTH24_STENCIL8:n.DEPTH_COMPONENT24,O=M.stencil?qi:nr,xe=M.stencil?Hr:Oi);const W={colorFormat:n.RGBA8,depthFormat:ee,scaleFactor:o};d=this.getBinding(),u=d.createProjectionLayer(W),r.updateRenderState({layers:[u]}),t.setPixelRatio(1),t.setSize(u.textureWidth,u.textureHeight,!1),v=new Qn(u.textureWidth,u.textureHeight,{format:mi,type:Yn,depthTexture:new Vr(u.textureWidth,u.textureHeight,xe,void 0,void 0,void 0,void 0,void 0,void 0,O),stencilBuffer:M.stencil,colorSpace:t.outputColorSpace,samples:M.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1})}else{const O={antialias:M.antialias,alpha:!0,depth:M.depth,stencil:M.stencil,framebufferScaleFactor:o};m=new XRWebGLLayer(r,n,O),r.updateRenderState({baseLayer:m}),t.setPixelRatio(1),t.setSize(m.framebufferWidth,m.framebufferHeight,!1),v=new Qn(m.framebufferWidth,m.framebufferHeight,{format:mi,type:Yn,colorSpace:t.outputColorSpace,stencilBuffer:M.stencil,resolveDepthBuffer:m.ignoreDepthValues===!1,resolveStencilBuffer:m.ignoreDepthValues===!1})}v.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await r.requestReferenceSpace(s),ze.setContext(r),ze.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return f.getDepthTexture()};function D(J){for(let ce=0;ce<J.removed.length;ce++){const O=J.removed[ce],xe=E.indexOf(O);xe>=0&&(E[xe]=null,y[xe].disconnect(O))}for(let ce=0;ce<J.added.length;ce++){const O=J.added[ce];let xe=E.indexOf(O);if(xe===-1){for(let W=0;W<y.length;W++)if(W>=E.length){E.push(O),xe=W;break}else if(E[W]===null){E[W]=O,xe=W;break}if(xe===-1)break}const ee=y[xe];ee&&ee.connect(O)}}const j=new $,ae=new $;function q(J,ce,O){j.setFromMatrixPosition(ce.matrixWorld),ae.setFromMatrixPosition(O.matrixWorld);const xe=j.distanceTo(ae),ee=ce.projectionMatrix.elements,W=O.projectionMatrix.elements,me=ee[14]/(ee[10]-1),de=ee[14]/(ee[10]+1),G=(ee[9]+1)/ee[5],oe=(ee[9]-1)/ee[5],ge=(ee[8]-1)/ee[0],Ce=(W[8]+1)/W[0],Xe=me*ge,Je=me*Ce,Ve=xe/(-ge+Ce),tt=Ve*-ge;if(ce.matrixWorld.decompose(J.position,J.quaternion,J.scale),J.translateX(tt),J.translateZ(Ve),J.matrixWorld.compose(J.position,J.quaternion,J.scale),J.matrixWorldInverse.copy(J.matrixWorld).invert(),ee[10]===-1)J.projectionMatrix.copy(ce.projectionMatrix),J.projectionMatrixInverse.copy(ce.projectionMatrixInverse);else{const dt=me+Ve,z=de+Ve,Pt=Xe-tt,te=Je+(xe-tt),w=G*de/z*dt,_=oe*de/z*dt;J.projectionMatrix.makePerspective(Pt,te,w,_,dt,z),J.projectionMatrixInverse.copy(J.projectionMatrix).invert()}}function ne(J,ce){ce===null?J.matrixWorld.copy(J.matrix):J.matrixWorld.multiplyMatrices(ce.matrixWorld,J.matrix),J.matrixWorldInverse.copy(J.matrixWorld).invert()}this.updateCamera=function(J){if(r===null)return;let ce=J.near,O=J.far;f.texture!==null&&(f.depthNear>0&&(ce=f.depthNear),f.depthFar>0&&(O=f.depthFar)),U.near=C.near=P.near=ce,U.far=C.far=P.far=O,(V!==U.near||k!==U.far)&&(r.updateRenderState({depthNear:U.near,depthFar:U.far}),V=U.near,k=U.far),U.layers.mask=J.layers.mask|6,P.layers.mask=U.layers.mask&-5,C.layers.mask=U.layers.mask&-3;const xe=J.parent,ee=U.cameras;ne(U,xe);for(let W=0;W<ee.length;W++)ne(ee[W],xe);ee.length===2?q(U,P,C):U.projectionMatrix.copy(P.projectionMatrix),ue(J,U,xe)};function ue(J,ce,O){O===null?J.matrix.copy(ce.matrixWorld):(J.matrix.copy(O.matrixWorld),J.matrix.invert(),J.matrix.multiply(ce.matrixWorld)),J.matrix.decompose(J.position,J.quaternion,J.scale),J.updateMatrixWorld(!0),J.projectionMatrix.copy(ce.projectionMatrix),J.projectionMatrixInverse.copy(ce.projectionMatrixInverse),J.isPerspectiveCamera&&(J.fov=Bf*2*Math.atan(1/J.projectionMatrix.elements[5]),J.zoom=1)}this.getCamera=function(){return U},this.getFoveation=function(){if(!(u===null&&m===null))return l},this.setFoveation=function(J){l=J,u!==null&&(u.fixedFoveation=J),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=J)},this.hasDepthSensing=function(){return f.texture!==null},this.getDepthSensingMesh=function(){return f.getMesh(U)},this.getCameraTexture=function(J){return p[J]};let we=null;function Le(J,ce){if(h=ce.getViewerPose(c||a),S=ce,h!==null){const O=h.views;m!==null&&(t.setRenderTargetFramebuffer(v,m.framebuffer),t.setRenderTarget(v));let xe=!1;O.length!==U.cameras.length&&(U.cameras.length=0,xe=!0);for(let de=0;de<O.length;de++){const G=O[de];let oe=null;if(m!==null)oe=m.getViewport(G);else{const Ce=d.getViewSubImage(u,G);oe=Ce.viewport,de===0&&(t.setRenderTargetTextures(v,Ce.colorTexture,Ce.depthStencilTexture),t.setRenderTarget(v))}let ge=I[de];ge===void 0&&(ge=new Ji,ge.layers.enable(de),ge.viewport=new Wt,I[de]=ge),ge.matrix.fromArray(G.transform.matrix),ge.matrix.decompose(ge.position,ge.quaternion,ge.scale),ge.projectionMatrix.fromArray(G.projectionMatrix),ge.projectionMatrixInverse.copy(ge.projectionMatrix).invert(),ge.viewport.set(oe.x,oe.y,oe.width,oe.height),de===0&&(U.matrix.copy(ge.matrix),U.matrix.decompose(U.position,U.quaternion,U.scale)),xe===!0&&U.cameras.push(ge)}const ee=r.enabledFeatures;if(ee&&ee.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&x){d=i.getBinding();const de=d.getDepthInformation(O[0]);de&&de.isValid&&de.texture&&f.init(de,r.renderState)}if(ee&&ee.includes("camera-access")&&x){t.state.unbindTexture(),d=i.getBinding();for(let de=0;de<O.length;de++){const G=O[de].camera;if(G){let oe=p[G];oe||(oe=new wu,p[G]=oe);const ge=d.getCameraImage(G);oe.sourceTexture=ge}}}}for(let O=0;O<y.length;O++){const xe=E[O],ee=y[O];xe!==null&&ee!==void 0&&ee.update(xe,ce,c||a)}we&&we(J,ce),ce.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:ce}),S=null}const ze=new ad;ze.setAnimationLoop(Le),this.setAnimationLoop=function(J){we=J},this.dispose=function(){}}}const Cv=new yn,pd=new ct;pd.set(-1,0,0,0,1,0,0,0,1);function Iv(e,t){function n(f,p){f.matrixAutoUpdate===!0&&f.updateMatrix(),p.value.copy(f.matrix)}function i(f,p){p.color.getRGB(f.fogColor.value,Iu(e)),p.isFog?(f.fogNear.value=p.near,f.fogFar.value=p.far):p.isFogExp2&&(f.fogDensity.value=p.density)}function r(f,p,M,A,v){p.isNodeMaterial?p.uniformsNeedUpdate=!1:p.isMeshBasicMaterial?o(f,p):p.isMeshLambertMaterial?(o(f,p),p.envMap&&(f.envMapIntensity.value=p.envMapIntensity)):p.isMeshToonMaterial?(o(f,p),d(f,p)):p.isMeshPhongMaterial?(o(f,p),h(f,p),p.envMap&&(f.envMapIntensity.value=p.envMapIntensity)):p.isMeshStandardMaterial?(o(f,p),u(f,p),p.isMeshPhysicalMaterial&&m(f,p,v)):p.isMeshMatcapMaterial?(o(f,p),S(f,p)):p.isMeshDepthMaterial?o(f,p):p.isMeshDistanceMaterial?(o(f,p),x(f,p)):p.isMeshNormalMaterial?o(f,p):p.isLineBasicMaterial?(a(f,p),p.isLineDashedMaterial&&s(f,p)):p.isPointsMaterial?l(f,p,M,A):p.isSpriteMaterial?c(f,p):p.isShadowMaterial?(f.color.value.copy(p.color),f.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function o(f,p){f.opacity.value=p.opacity,p.color&&f.diffuse.value.copy(p.color),p.emissive&&f.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(f.map.value=p.map,n(p.map,f.mapTransform)),p.alphaMap&&(f.alphaMap.value=p.alphaMap,n(p.alphaMap,f.alphaMapTransform)),p.bumpMap&&(f.bumpMap.value=p.bumpMap,n(p.bumpMap,f.bumpMapTransform),f.bumpScale.value=p.bumpScale,p.side===En&&(f.bumpScale.value*=-1)),p.normalMap&&(f.normalMap.value=p.normalMap,n(p.normalMap,f.normalMapTransform),f.normalScale.value.copy(p.normalScale),p.side===En&&f.normalScale.value.negate()),p.displacementMap&&(f.displacementMap.value=p.displacementMap,n(p.displacementMap,f.displacementMapTransform),f.displacementScale.value=p.displacementScale,f.displacementBias.value=p.displacementBias),p.emissiveMap&&(f.emissiveMap.value=p.emissiveMap,n(p.emissiveMap,f.emissiveMapTransform)),p.specularMap&&(f.specularMap.value=p.specularMap,n(p.specularMap,f.specularMapTransform)),p.alphaTest>0&&(f.alphaTest.value=p.alphaTest);const M=t.get(p),A=M.envMap,v=M.envMapRotation;A&&(f.envMap.value=A,f.envMapRotation.value.setFromMatrix4(Cv.makeRotationFromEuler(v)).transpose(),A.isCubeTexture&&A.isRenderTargetTexture===!1&&f.envMapRotation.value.premultiply(pd),f.reflectivity.value=p.reflectivity,f.ior.value=p.ior,f.refractionRatio.value=p.refractionRatio),p.lightMap&&(f.lightMap.value=p.lightMap,f.lightMapIntensity.value=p.lightMapIntensity,n(p.lightMap,f.lightMapTransform)),p.aoMap&&(f.aoMap.value=p.aoMap,f.aoMapIntensity.value=p.aoMapIntensity,n(p.aoMap,f.aoMapTransform))}function a(f,p){f.diffuse.value.copy(p.color),f.opacity.value=p.opacity,p.map&&(f.map.value=p.map,n(p.map,f.mapTransform))}function s(f,p){f.dashSize.value=p.dashSize,f.totalSize.value=p.dashSize+p.gapSize,f.scale.value=p.scale}function l(f,p,M,A){f.diffuse.value.copy(p.color),f.opacity.value=p.opacity,f.size.value=p.size*M,f.scale.value=A*.5,p.map&&(f.map.value=p.map,n(p.map,f.uvTransform)),p.alphaMap&&(f.alphaMap.value=p.alphaMap,n(p.alphaMap,f.alphaMapTransform)),p.alphaTest>0&&(f.alphaTest.value=p.alphaTest)}function c(f,p){f.diffuse.value.copy(p.color),f.opacity.value=p.opacity,f.rotation.value=p.rotation,p.map&&(f.map.value=p.map,n(p.map,f.mapTransform)),p.alphaMap&&(f.alphaMap.value=p.alphaMap,n(p.alphaMap,f.alphaMapTransform)),p.alphaTest>0&&(f.alphaTest.value=p.alphaTest)}function h(f,p){f.specular.value.copy(p.specular),f.shininess.value=Math.max(p.shininess,1e-4)}function d(f,p){p.gradientMap&&(f.gradientMap.value=p.gradientMap)}function u(f,p){f.metalness.value=p.metalness,p.metalnessMap&&(f.metalnessMap.value=p.metalnessMap,n(p.metalnessMap,f.metalnessMapTransform)),f.roughness.value=p.roughness,p.roughnessMap&&(f.roughnessMap.value=p.roughnessMap,n(p.roughnessMap,f.roughnessMapTransform)),p.envMap&&(f.envMapIntensity.value=p.envMapIntensity)}function m(f,p,M){f.ior.value=p.ior,p.sheen>0&&(f.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),f.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(f.sheenColorMap.value=p.sheenColorMap,n(p.sheenColorMap,f.sheenColorMapTransform)),p.sheenRoughnessMap&&(f.sheenRoughnessMap.value=p.sheenRoughnessMap,n(p.sheenRoughnessMap,f.sheenRoughnessMapTransform))),p.clearcoat>0&&(f.clearcoat.value=p.clearcoat,f.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(f.clearcoatMap.value=p.clearcoatMap,n(p.clearcoatMap,f.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(f.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,n(p.clearcoatRoughnessMap,f.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(f.clearcoatNormalMap.value=p.clearcoatNormalMap,n(p.clearcoatNormalMap,f.clearcoatNormalMapTransform),f.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===En&&f.clearcoatNormalScale.value.negate())),p.dispersion>0&&(f.dispersion.value=p.dispersion),p.iridescence>0&&(f.iridescence.value=p.iridescence,f.iridescenceIOR.value=p.iridescenceIOR,f.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],f.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(f.iridescenceMap.value=p.iridescenceMap,n(p.iridescenceMap,f.iridescenceMapTransform)),p.iridescenceThicknessMap&&(f.iridescenceThicknessMap.value=p.iridescenceThicknessMap,n(p.iridescenceThicknessMap,f.iridescenceThicknessMapTransform))),p.transmission>0&&(f.transmission.value=p.transmission,f.transmissionSamplerMap.value=M.texture,f.transmissionSamplerSize.value.set(M.width,M.height),p.transmissionMap&&(f.transmissionMap.value=p.transmissionMap,n(p.transmissionMap,f.transmissionMapTransform)),f.thickness.value=p.thickness,p.thicknessMap&&(f.thicknessMap.value=p.thicknessMap,n(p.thicknessMap,f.thicknessMapTransform)),f.attenuationDistance.value=p.attenuationDistance,f.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(f.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(f.anisotropyMap.value=p.anisotropyMap,n(p.anisotropyMap,f.anisotropyMapTransform))),f.specularIntensity.value=p.specularIntensity,f.specularColor.value.copy(p.specularColor),p.specularColorMap&&(f.specularColorMap.value=p.specularColorMap,n(p.specularColorMap,f.specularColorMapTransform)),p.specularIntensityMap&&(f.specularIntensityMap.value=p.specularIntensityMap,n(p.specularIntensityMap,f.specularIntensityMapTransform))}function S(f,p){p.matcap&&(f.matcap.value=p.matcap)}function x(f,p){const M=t.get(p).light;f.referencePosition.value.setFromMatrixPosition(M.matrixWorld),f.nearDistance.value=M.shadow.camera.near,f.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function Dv(e,t,n,i){let r={},o={},a=[];const s=e.getParameter(e.MAX_UNIFORM_BUFFER_BINDINGS);function l(v,y){const E=y.program;i.uniformBlockBinding(v,E)}function c(v,y){let E=r[v.id];E===void 0&&(f(v),E=h(v),r[v.id]=E,v.addEventListener("dispose",M));const T=y.program;i.updateUBOMapping(v,T);const g=t.render.frame;o[v.id]!==g&&(u(v),o[v.id]=g)}function h(v){const y=d();v.__bindingPointIndex=y;const E=e.createBuffer(),T=v.__size,g=v.usage;return e.bindBuffer(e.UNIFORM_BUFFER,E),e.bufferData(e.UNIFORM_BUFFER,T,g),e.bindBuffer(e.UNIFORM_BUFFER,null),e.bindBufferBase(e.UNIFORM_BUFFER,y,E),E}function d(){for(let v=0;v<s;v++)if(a.indexOf(v)===-1)return a.push(v),v;return Tt("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(v){const y=r[v.id],E=v.uniforms,T=v.__cache;e.bindBuffer(e.UNIFORM_BUFFER,y);for(let g=0,P=E.length;g<P;g++){const C=E[g];if(Array.isArray(C))for(let I=0,U=C.length;I<U;I++)m(C[I],g,I,T);else m(C,g,0,T)}e.bindBuffer(e.UNIFORM_BUFFER,null)}function m(v,y,E,T){if(x(v,y,E,T)===!0){const g=v.__offset,P=v.value;if(Array.isArray(P)){let C=0;for(let I=0;I<P.length;I++){const U=P[I],V=p(U);S(U,v.__data,C),typeof U!="number"&&typeof U!="boolean"&&!U.isMatrix3&&!ArrayBuffer.isView(U)&&(C+=V.storage/Float32Array.BYTES_PER_ELEMENT)}}else S(P,v.__data,0);e.bufferSubData(e.UNIFORM_BUFFER,g,v.__data)}}function S(v,y,E){typeof v=="number"||typeof v=="boolean"?y[0]=v:v.isMatrix3?(y[0]=v.elements[0],y[1]=v.elements[1],y[2]=v.elements[2],y[3]=0,y[4]=v.elements[3],y[5]=v.elements[4],y[6]=v.elements[5],y[7]=0,y[8]=v.elements[6],y[9]=v.elements[7],y[10]=v.elements[8],y[11]=0):ArrayBuffer.isView(v)?y.set(new v.constructor(v.buffer,v.byteOffset,y.length)):v.toArray(y,E)}function x(v,y,E,T){const g=v.value,P=y+"_"+E;if(T[P]===void 0)return typeof g=="number"||typeof g=="boolean"?T[P]=g:ArrayBuffer.isView(g)?T[P]=g.slice():T[P]=g.clone(),!0;{const C=T[P];if(typeof g=="number"||typeof g=="boolean"){if(C!==g)return T[P]=g,!0}else{if(ArrayBuffer.isView(g))return!0;if(C.equals(g)===!1)return C.copy(g),!0}}return!1}function f(v){const y=v.uniforms;let E=0;const T=16;for(let P=0,C=y.length;P<C;P++){const I=Array.isArray(y[P])?y[P]:[y[P]];for(let U=0,V=I.length;U<V;U++){const k=I[U],B=Array.isArray(k.value)?k.value:[k.value];for(let Y=0,D=B.length;Y<D;Y++){const j=B[Y],ae=p(j),q=E%T,ne=q%ae.boundary,ue=q+ne;E+=ne,ue!==0&&T-ue<ae.storage&&(E+=T-ue),k.__data=new Float32Array(ae.storage/Float32Array.BYTES_PER_ELEMENT),k.__offset=E,E+=ae.storage}}}const g=E%T;return g>0&&(E+=T-g),v.__size=E,v.__cache={},this}function p(v){const y={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(y.boundary=4,y.storage=4):v.isVector2?(y.boundary=8,y.storage=8):v.isVector3||v.isColor?(y.boundary=16,y.storage=12):v.isVector4?(y.boundary=16,y.storage=16):v.isMatrix3?(y.boundary=48,y.storage=48):v.isMatrix4?(y.boundary=64,y.storage=64):v.isTexture?_t("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(v)?(y.boundary=16,y.storage=v.byteLength):_t("WebGLRenderer: Unsupported uniform value type.",v),y}function M(v){const y=v.target;y.removeEventListener("dispose",M);const E=a.indexOf(y.__bindingPointIndex);a.splice(E,1),e.deleteBuffer(r[y.id]),delete r[y.id],delete o[y.id]}function A(){for(const v in r)e.deleteBuffer(r[v]);a=[],r={},o={}}return{bind:l,update:c,dispose:A}}const Lv=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let kn=null;function Nv(){return kn===null&&(kn=new Gf(Lv,16,16,ir,Ti),kn.name="DFG_LUT",kn.minFilter=Sn,kn.magFilter=Sn,kn.wrapS=Fa,kn.wrapT=Fa,kn.generateMipmaps=!1,kn.needsUpdate=!0),kn}class Uv{constructor(t={}){const{canvas:n=Lf(),context:i=null,depth:r=!0,stencil:o=!1,alpha:a=!1,antialias:s=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:u=!1,outputBufferType:m=Yn}=t;this.isWebGLRenderer=!0;let S;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");S=i.getContextAttributes().alpha}else S=a;const x=m,f=new Set([Mu,bu,Au]),p=new Set([Yn,Oi,Oo,Hr,Tu,Pu]),M=new Uint32Array(4),A=new Int32Array(4),v=new $;let y=null,E=null;const T=[],g=[];let P=null;this.domElement=n,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Jn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const C=this;let I=!1,U=null,V=null,k=null,B=null;this._outputColorSpace=Eu;let Y=0,D=0,j=null,ae=-1,q=null;const ne=new Wt,ue=new Wt;let we=null;const Le=new Mt(0);let ze=0,J=n.width,ce=n.height,O=1,xe=null,ee=null;const W=new Wt(0,0,J,ce),me=new Wt(0,0,J,ce);let de=!1;const G=new yu;let oe=!1,ge=!1;const Ce=new yn,Xe=new $,Je=new Wt,Ve={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let tt=!1;function dt(){return j===null?O:1}let z=i;function Pt(b,H){return n.getContext(b,H)}try{const b={alpha:!0,depth:r,stencil:o,antialias:s,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in n&&n.setAttribute("data-engine",`three.js r${Nf}`),n.addEventListener("webglcontextlost",Ct,!1),n.addEventListener("webglcontextrestored",ft,!1),n.addEventListener("webglcontextcreationerror",on,!1),z===null){const H="webgl2";if(z=Pt(H,b),z===null)throw Pt(H)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}}catch(b){throw Tt("WebGLRenderer: "+b.message),b}let te,w,_,F,X,re,_e,Me,ie,le,ve,Fe,be,Ee,Be,$e,je,N,Pe,fe,Ae,De,pe;function He(){te=new N_(z),te.init(),Ae=new Av(z,te),w=new T_(z,te,t,Ae),_=new Mv(z,te),w.reversedDepthBuffer&&u&&_.buffers.depth.setReversed(!0),V=z.createFramebuffer(),k=z.createFramebuffer(),B=z.createFramebuffer(),F=new O_(z),X=new cv,re=new bv(z,te,_,X,w,Ae,F),_e=new L_(C),Me=new Vh(z),De=new b_(z,Me),ie=new U_(z,Me,F,De),le=new B_(z,ie,Me,De,F),N=new z_(z,w,re),Be=new P_(X),ve=new lv(C,_e,te,w,De,Be),Fe=new Iv(C,X),be=new dv,Ee=new _v(te),je=new M_(C,_e,_,le,S,l),$e=new yv(C,le,w),pe=new Dv(z,F,w,_),Pe=new A_(z,te,F),fe=new F_(z,te,F),F.programs=ve.programs,C.capabilities=w,C.extensions=te,C.properties=X,C.renderLists=be,C.shadowMap=$e,C.state=_,C.info=F}He(),x!==Yn&&(P=new V_(x,n.width,n.height,s,r,o));const Oe=new Rv(C,z);this.xr=Oe,this.getContext=function(){return z},this.getContextAttributes=function(){return z.getContextAttributes()},this.forceContextLoss=function(){const b=te.get("WEBGL_lose_context");b&&b.loseContext()},this.forceContextRestore=function(){const b=te.get("WEBGL_lose_context");b&&b.restoreContext()},this.getPixelRatio=function(){return O},this.setPixelRatio=function(b){b!==void 0&&(O=b,this.setSize(J,ce,!1))},this.getSize=function(b){return b.set(J,ce)},this.setSize=function(b,H,Q=!0){if(Oe.isPresenting){_t("WebGLRenderer: Can't change size while VR device is presenting.");return}J=b,ce=H,n.width=Math.floor(b*O),n.height=Math.floor(H*O),Q===!0&&(n.style.width=b+"px",n.style.height=H+"px"),P!==null&&P.setSize(n.width,n.height),this.setViewport(0,0,b,H)},this.getDrawingBufferSize=function(b){return b.set(J*O,ce*O).floor()},this.setDrawingBufferSize=function(b,H,Q){J=b,ce=H,O=Q,n.width=Math.floor(b*Q),n.height=Math.floor(H*Q),this.setViewport(0,0,b,H)},this.setEffects=function(b){if(x===Yn){Tt("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(b){for(let H=0;H<b.length;H++)if(b[H].isOutputPass===!0){_t("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}P.setEffects(b||[])},this.getCurrentViewport=function(b){return b.copy(ne)},this.getViewport=function(b){return b.copy(W)},this.setViewport=function(b,H,Q,K){b.isVector4?W.set(b.x,b.y,b.z,b.w):W.set(b,H,Q,K),_.viewport(ne.copy(W).multiplyScalar(O).round())},this.getScissor=function(b){return b.copy(me)},this.setScissor=function(b,H,Q,K){b.isVector4?me.set(b.x,b.y,b.z,b.w):me.set(b,H,Q,K),_.scissor(ue.copy(me).multiplyScalar(O).round())},this.getScissorTest=function(){return de},this.setScissorTest=function(b){_.setScissorTest(de=b)},this.setOpaqueSort=function(b){xe=b},this.setTransparentSort=function(b){ee=b},this.getClearColor=function(b){return b.copy(je.getClearColor())},this.setClearColor=function(){je.setClearColor(...arguments)},this.getClearAlpha=function(){return je.getClearAlpha()},this.setClearAlpha=function(){je.setClearAlpha(...arguments)},this.clear=function(b=!0,H=!0,Q=!0){let K=0;if(b){let Z=!1;if(j!==null){const Ie=j.texture.format;Z=f.has(Ie)}if(Z){const Ie=j.texture.type,Ue=p.has(Ie),ye=je.getClearColor(),ke=je.getClearAlpha(),We=ye.r,nt=ye.g,it=ye.b;Ue?(M[0]=We,M[1]=nt,M[2]=it,M[3]=ke,z.clearBufferuiv(z.COLOR,0,M)):(A[0]=We,A[1]=nt,A[2]=it,A[3]=ke,z.clearBufferiv(z.COLOR,0,A))}else K|=z.COLOR_BUFFER_BIT}H&&(K|=z.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),Q&&(K|=z.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),K!==0&&z.clear(K)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(b){b.setRenderer(this),U=b},this.dispose=function(){n.removeEventListener("webglcontextlost",Ct,!1),n.removeEventListener("webglcontextrestored",ft,!1),n.removeEventListener("webglcontextcreationerror",on,!1),je.dispose(),be.dispose(),Ee.dispose(),X.dispose(),_e.dispose(),le.dispose(),De.dispose(),pe.dispose(),ve.dispose(),Oe.dispose(),Oe.removeEventListener("sessionstart",_r),Oe.removeEventListener("sessionend",xr),si.stop()};function Ct(b){b.preventDefault(),Gs("WebGLRenderer: Context Lost."),I=!0}function ft(){Gs("WebGLRenderer: Context Restored."),I=!1;const b=F.autoReset,H=$e.enabled,Q=$e.autoUpdate,K=$e.needsUpdate,Z=$e.type;He(),F.autoReset=b,$e.enabled=H,$e.autoUpdate=Q,$e.needsUpdate=K,$e.type=Z}function on(b){Tt("WebGLRenderer: A WebGL context could not be created. Reason: ",b.statusMessage)}function bn(b){const H=b.target;H.removeEventListener("dispose",bn),oo(H)}function oo(b){ai(b),X.remove(b)}function ai(b){const H=X.get(b).programs;H!==void 0&&(H.forEach(function(Q){ve.releaseProgram(Q)}),b.isShaderMaterial&&ve.releaseShaderCache(b))}this.renderBufferDirect=function(b,H,Q,K,Z,Ie){H===null&&(H=Ve);const Ue=Z.isMesh&&Z.matrixWorld.determinantAffine()<0,ye=Qo(b,H,Q,K,Z);_.setMaterial(K,Ue);let ke=Q.index,We=1;if(K.wireframe===!0){if(ke=ie.getWireframeAttribute(Q),ke===void 0)return;We=2}const nt=Q.drawRange,it=Q.attributes.position;let Ye=nt.start*We,ht=(nt.start+nt.count)*We;Ie!==null&&(Ye=Math.max(Ye,Ie.start*We),ht=Math.min(ht,(Ie.start+Ie.count)*We)),ke!==null?(Ye=Math.max(Ye,0),ht=Math.min(ht,ke.count)):it!=null&&(Ye=Math.max(Ye,0),ht=Math.min(ht,it.count));const It=ht-Ye;if(It<0||It===1/0)return;De.setup(Z,K,ye,Q,ke);let bt,mt=Pe;if(ke!==null&&(bt=Me.get(ke),mt=fe,mt.setIndex(bt)),Z.isMesh)K.wireframe===!0?(_.setLineWidth(K.wireframeLinewidth*dt()),mt.setMode(z.LINES)):mt.setMode(z.TRIANGLES);else if(Z.isLine){let Bt=K.linewidth;Bt===void 0&&(Bt=1),_.setLineWidth(Bt*dt()),Z.isLineSegments?mt.setMode(z.LINES):Z.isLineLoop?mt.setMode(z.LINE_LOOP):mt.setMode(z.LINE_STRIP)}else Z.isPoints?mt.setMode(z.POINTS):Z.isSprite&&mt.setMode(z.TRIANGLES);if(Z.isBatchedMesh)if(te.get("WEBGL_multi_draw"))mt.renderMultiDraw(Z._multiDrawStarts,Z._multiDrawCounts,Z._multiDrawCount);else{const Bt=Z._multiDrawStarts,Ne=Z._multiDrawCounts,sn=Z._multiDrawCount,lt=ke?Me.get(ke).bytesPerElement:1,un=X.get(K).currentProgram.getUniforms();for(let _n=0;_n<sn;_n++)un.setValue(z,"_gl_DrawID",_n),mt.render(Bt[_n]/lt,Ne[_n])}else if(Z.isInstancedMesh)mt.renderInstances(Ye,It,Z.count);else if(Q.isInstancedBufferGeometry){const Bt=Q._maxInstanceCount!==void 0?Q._maxInstanceCount:1/0,Ne=Math.min(Q.instanceCount,Bt);mt.renderInstances(Ye,It,Ne)}else mt.render(Ye,It)};function mr(b,H,Q){b.transparent===!0&&b.side===tn&&b.forceSinglePass===!1?(b.side=En,b.needsUpdate=!0,Ln(b,H,Q),b.side=Gr,b.needsUpdate=!0,Ln(b,H,Q),b.side=tn):Ln(b,H,Q)}this.compile=function(b,H,Q=null){Q===null&&(Q=b),E=Ee.get(Q),E.init(H),g.push(E),Q.traverseVisible(function(Z){Z.isLight&&Z.layers.test(H.layers)&&(E.pushLight(Z),Z.castShadow&&E.pushShadow(Z))}),b!==Q&&b.traverseVisible(function(Z){Z.isLight&&Z.layers.test(H.layers)&&(E.pushLight(Z),Z.castShadow&&E.pushShadow(Z))}),E.setupLights();const K=new Set;return b.traverse(function(Z){if(!(Z.isMesh||Z.isPoints||Z.isLine||Z.isSprite))return;const Ie=Z.material;if(Ie)if(Array.isArray(Ie))for(let Ue=0;Ue<Ie.length;Ue++){const ye=Ie[Ue];mr(ye,Q,Z),K.add(ye)}else mr(Ie,Q,Z),K.add(Ie)}),E=g.pop(),K},this.compileAsync=function(b,H,Q=null){const K=this.compile(b,H,Q);return new Promise(Z=>{function Ie(){if(K.forEach(function(Ue){X.get(Ue).currentProgram.isReady()&&K.delete(Ue)}),K.size===0){Z(b);return}setTimeout(Ie,10)}te.get("KHR_parallel_shader_compile")!==null?Ie():setTimeout(Ie,10)})};let gn=null;function gr(b){gn&&gn(b)}function _r(){si.stop()}function xr(){si.start()}const si=new ad;si.setAnimationLoop(gr),typeof self<"u"&&si.setContext(self),this.setAnimationLoop=function(b){gn=b,Oe.setAnimationLoop(b),b===null?si.stop():si.start()},Oe.addEventListener("sessionstart",_r),Oe.addEventListener("sessionend",xr),this.render=function(b,H){if(H!==void 0&&H.isCamera!==!0){Tt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(I===!0)return;U!==null&&U.renderStart(b,H);const Q=Oe.enabled===!0&&Oe.isPresenting===!0,K=P!==null&&(j===null||Q)&&P.begin(C,j);if(b.matrixWorldAutoUpdate===!0&&b.updateMatrixWorld(),H.parent===null&&H.matrixWorldAutoUpdate===!0&&H.updateMatrixWorld(),Oe.enabled===!0&&Oe.isPresenting===!0&&(P===null||P.isCompositing()===!1)&&(Oe.cameraAutoUpdate===!0&&Oe.updateCamera(H),H=Oe.getCamera()),b.isScene===!0&&b.onBeforeRender(C,b,H,j),E=Ee.get(b,g.length),E.init(H),E.state.textureUnits=re.getTextureUnits(),g.push(E),Ce.multiplyMatrices(H.projectionMatrix,H.matrixWorldInverse),G.setFromProjectionMatrix(Ce,Vs,H.reversedDepth),ge=this.localClippingEnabled,oe=Be.init(this.clippingPlanes,ge),y=be.get(b,T.length),y.init(),T.push(y),Oe.enabled===!0&&Oe.isPresenting===!0){const Ue=C.xr.getDepthSensingMesh();Ue!==null&&vr(Ue,H,-1/0,C.sortObjects)}vr(b,H,0,C.sortObjects),y.finish(),C.sortObjects===!0&&y.sort(xe,ee,H.reversedDepth),tt=Oe.enabled===!1||Oe.isPresenting===!1||Oe.hasDepthSensing()===!1,tt&&je.addToRenderList(y,b),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),oe===!0&&Be.beginShadows();const Z=E.state.shadowsArray;if($e.render(Z,b,H),oe===!0&&Be.endShadows(),(K&&P.hasRenderPass())===!1){const Ue=y.opaque,ye=y.transmissive;if(E.setupLights(),H.isArrayCamera){const ke=H.cameras;if(ye.length>0)for(let We=0,nt=ke.length;We<nt;We++){const it=ke[We];Gi(Ue,ye,b,it)}tt&&je.render(b);for(let We=0,nt=ke.length;We<nt;We++){const it=ke[We];an(y,b,it,it.viewport)}}else ye.length>0&&Gi(Ue,ye,b,H),tt&&je.render(b),an(y,b,H)}j!==null&&D===0&&(re.updateMultisampleRenderTarget(j),re.updateRenderTargetMipmap(j)),K&&P.end(C),b.isScene===!0&&b.onAfterRender(C,b,H),De.resetDefaultState(),ae=-1,q=null,g.pop(),g.length>0?(E=g[g.length-1],re.setTextureUnits(E.state.textureUnits),oe===!0&&Be.setGlobalState(C.clippingPlanes,E.state.camera)):E=null,T.pop(),T.length>0?y=T[T.length-1]:y=null,U!==null&&U.renderEnd()};function vr(b,H,Q,K){if(b.visible===!1)return;if(b.layers.test(H.layers)){if(b.isGroup)Q=b.renderOrder;else if(b.isLOD)b.autoUpdate===!0&&b.update(H);else if(b.isLightProbeGrid)E.pushLightProbeGrid(b);else if(b.isLight)E.pushLight(b),b.castShadow&&E.pushShadow(b);else if(b.isSprite){if(!b.frustumCulled||G.intersectsSprite(b)){K&&Je.setFromMatrixPosition(b.matrixWorld).applyMatrix4(Ce);const Ue=le.update(b),ye=b.material;ye.visible&&y.push(b,Ue,ye,Q,Je.z,null)}}else if((b.isMesh||b.isLine||b.isPoints)&&(!b.frustumCulled||G.intersectsObject(b))){const Ue=le.update(b),ye=b.material;if(K&&(b.boundingSphere!==void 0?(b.boundingSphere===null&&b.computeBoundingSphere(),Je.copy(b.boundingSphere.center)):(Ue.boundingSphere===null&&Ue.computeBoundingSphere(),Je.copy(Ue.boundingSphere.center)),Je.applyMatrix4(b.matrixWorld).applyMatrix4(Ce)),Array.isArray(ye)){const ke=Ue.groups;for(let We=0,nt=ke.length;We<nt;We++){const it=ke[We],Ye=ye[it.materialIndex];Ye&&Ye.visible&&y.push(b,Ue,Ye,Q,Je.z,it)}}else ye.visible&&y.push(b,Ue,ye,Q,Je.z,null)}}const Ie=b.children;for(let Ue=0,ye=Ie.length;Ue<ye;Ue++)vr(Ie[Ue],H,Q,K)}function an(b,H,Q,K){const{opaque:Z,transmissive:Ie,transparent:Ue}=b;E.setupLightsView(Q),oe===!0&&Be.setGlobalState(C.clippingPlanes,Q),K&&_.viewport(ne.copy(K)),Z.length>0&&An(Z,H,Q),Ie.length>0&&An(Ie,H,Q),Ue.length>0&&An(Ue,H,Q),_.buffers.depth.setTest(!0),_.buffers.depth.setMask(!0),_.buffers.color.setMask(!0),_.setPolygonOffset(!1)}function Gi(b,H,Q,K){if((Q.isScene===!0?Q.overrideMaterial:null)!==null)return;if(E.state.transmissionRenderTarget[K.id]===void 0){const Ye=te.has("EXT_color_buffer_half_float")||te.has("EXT_color_buffer_float");E.state.transmissionRenderTarget[K.id]=new Qn(1,1,{generateMipmaps:!0,type:Ye?Ti:Yn,minFilter:$i,samples:Math.max(4,w.samples),stencilBuffer:o,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Ut.workingColorSpace})}const Ie=E.state.transmissionRenderTarget[K.id],Ue=K.viewport||ne;Ie.setSize(Ue.z*C.transmissionResolutionScale,Ue.w*C.transmissionResolutionScale);const ye=C.getRenderTarget(),ke=C.getActiveCubeFace(),We=C.getActiveMipmapLevel();C.setRenderTarget(Ie),C.getClearColor(Le),ze=C.getClearAlpha(),ze<1&&C.setClearColor(16777215,.5),C.clear(),tt&&je.render(Q);const nt=C.toneMapping;C.toneMapping=Jn;const it=K.viewport;if(K.viewport!==void 0&&(K.viewport=void 0),E.setupLightsView(K),oe===!0&&Be.setGlobalState(C.clippingPlanes,K),An(b,Q,K),re.updateMultisampleRenderTarget(Ie),re.updateRenderTargetMipmap(Ie),te.has("WEBGL_multisampled_render_to_texture")===!1){let Ye=!1;for(let ht=0,It=H.length;ht<It;ht++){const bt=H[ht],{object:mt,geometry:Bt,material:Ne,group:sn}=bt;if(Ne.side===tn&&mt.layers.test(K.layers)){const lt=Ne.side;Ne.side=En,Ne.needsUpdate=!0,Sr(mt,Q,K,Bt,Ne,sn),Ne.side=lt,Ne.needsUpdate=!0,Ye=!0}}Ye===!0&&(re.updateMultisampleRenderTarget(Ie),re.updateRenderTargetMipmap(Ie))}C.setRenderTarget(ye,ke,We),C.setClearColor(Le,ze),it!==void 0&&(K.viewport=it),C.toneMapping=nt}function An(b,H,Q){const K=H.isScene===!0?H.overrideMaterial:null;for(let Z=0,Ie=b.length;Z<Ie;Z++){const Ue=b[Z],{object:ye,geometry:ke,group:We}=Ue;let nt=Ue.material;nt.allowOverride===!0&&K!==null&&(nt=K),ye.layers.test(Q.layers)&&Sr(ye,H,Q,ke,nt,We)}}function Sr(b,H,Q,K,Z,Ie){b.onBeforeRender(C,H,Q,K,Z,Ie),b.modelViewMatrix.multiplyMatrices(Q.matrixWorldInverse,b.matrixWorld),b.normalMatrix.getNormalMatrix(b.modelViewMatrix),Z.onBeforeRender(C,H,Q,K,b,Ie),Z.transparent===!0&&Z.side===tn&&Z.forceSinglePass===!1?(Z.side=En,Z.needsUpdate=!0,C.renderBufferDirect(Q,H,K,Z,b,Ie),Z.side=Gr,Z.needsUpdate=!0,C.renderBufferDirect(Q,H,K,Z,b,Ie),Z.side=tn):C.renderBufferDirect(Q,H,K,Z,b,Ie),b.onAfterRender(C,H,Q,K,Z,Ie)}function Ln(b,H,Q){H.isScene!==!0&&(H=Ve);const K=X.get(b),Z=E.state.lights,Ie=E.state.shadowsArray,Ue=Z.state.version,ye=ve.getParameters(b,Z.state,Ie,H,Q,E.state.lightProbeGridArray),ke=ve.getProgramCacheKey(ye);let We=K.programs;K.environment=b.isMeshStandardMaterial||b.isMeshLambertMaterial||b.isMeshPhongMaterial?H.environment:null,K.fog=H.fog;const nt=b.isMeshStandardMaterial||b.isMeshLambertMaterial&&!b.envMap||b.isMeshPhongMaterial&&!b.envMap;K.envMap=_e.get(b.envMap||K.environment,nt),K.envMapRotation=K.environment!==null&&b.envMap===null?H.environmentRotation:b.envMapRotation,We===void 0&&(b.addEventListener("dispose",bn),We=new Map,K.programs=We);let it=We.get(ke);if(it!==void 0){if(K.currentProgram===it&&K.lightsStateVersion===Ue)return Nn(b,ye),it}else ye.uniforms=ve.getUniforms(b),U!==null&&b.isNodeMaterial&&U.build(b,Q,ye),b.onBeforeCompile(ye,C),it=ve.acquireProgram(ye,ke),We.set(ke,it),K.uniforms=ye.uniforms;const Ye=K.uniforms;return(!b.isShaderMaterial&&!b.isRawShaderMaterial||b.clipping===!0)&&(Ye.clippingPlanes=Be.uniform),Nn(b,ye),K.needsLights=ea(b),K.lightsStateVersion=Ue,K.needsLights&&(Ye.ambientLightColor.value=Z.state.ambient,Ye.lightProbe.value=Z.state.probe,Ye.directionalLights.value=Z.state.directional,Ye.directionalLightShadows.value=Z.state.directionalShadow,Ye.spotLights.value=Z.state.spot,Ye.spotLightShadows.value=Z.state.spotShadow,Ye.rectAreaLights.value=Z.state.rectArea,Ye.ltc_1.value=Z.state.rectAreaLTC1,Ye.ltc_2.value=Z.state.rectAreaLTC2,Ye.pointLights.value=Z.state.point,Ye.pointLightShadows.value=Z.state.pointShadow,Ye.hemisphereLights.value=Z.state.hemi,Ye.directionalShadowMatrix.value=Z.state.directionalShadowMatrix,Ye.spotLightMatrix.value=Z.state.spotLightMatrix,Ye.spotLightMap.value=Z.state.spotLightMap,Ye.pointShadowMatrix.value=Z.state.pointShadowMatrix),K.lightProbeGrid=E.state.lightProbeGridArray.length>0,K.currentProgram=it,K.uniformsList=null,it}function Vi(b){if(b.uniformsList===null){const H=b.currentProgram.getUniforms();b.uniformsList=Ro.seqWithValue(H.seq,b.uniforms)}return b.uniformsList}function Nn(b,H){const Q=X.get(b);Q.outputColorSpace=H.outputColorSpace,Q.batching=H.batching,Q.batchingColor=H.batchingColor,Q.instancing=H.instancing,Q.instancingColor=H.instancingColor,Q.instancingMorph=H.instancingMorph,Q.skinning=H.skinning,Q.morphTargets=H.morphTargets,Q.morphNormals=H.morphNormals,Q.morphColors=H.morphColors,Q.morphTargetsCount=H.morphTargetsCount,Q.numClippingPlanes=H.numClippingPlanes,Q.numIntersection=H.numClipIntersection,Q.vertexAlphas=H.vertexAlphas,Q.vertexTangents=H.vertexTangents,Q.toneMapping=H.toneMapping}function ki(b,H){if(b.length===0)return null;if(b.length===1)return b[0].texture!==null?b[0]:null;v.setFromMatrixPosition(H.matrixWorld);for(let Q=0,K=b.length;Q<K;Q++){const Z=b[Q];if(Z.texture!==null&&Z.boundingBox.containsPoint(v))return Z}return null}function Qo(b,H,Q,K,Z){H.isScene!==!0&&(H=Ve),re.resetTextureUnits();const Ie=H.fog,Ue=K.isMeshStandardMaterial||K.isMeshLambertMaterial||K.isMeshPhongMaterial?H.environment:null,ye=j===null?C.outputColorSpace:j.isXRRenderTarget===!0?j.texture.colorSpace:Ut.workingColorSpace,ke=K.isMeshStandardMaterial||K.isMeshLambertMaterial&&!K.envMap||K.isMeshPhongMaterial&&!K.envMap,We=_e.get(K.envMap||Ue,ke),nt=K.vertexColors===!0&&!!Q.attributes.color&&Q.attributes.color.itemSize===4,it=!!Q.attributes.tangent&&(!!K.normalMap||K.anisotropy>0),Ye=!!Q.morphAttributes.position,ht=!!Q.morphAttributes.normal,It=!!Q.morphAttributes.color;let bt=Jn;K.toneMapped&&(j===null||j.isXRRenderTarget===!0)&&(bt=C.toneMapping);const mt=Q.morphAttributes.position||Q.morphAttributes.normal||Q.morphAttributes.color,Bt=mt!==void 0?mt.length:0,Ne=X.get(K),sn=E.state.lights;if(oe===!0&&(ge===!0||b!==q)){const vt=b===q&&K.id===ae;Be.setState(K,b,vt)}let lt=!1;K.version===Ne.__version?(Ne.needsLights&&Ne.lightsStateVersion!==sn.state.version||Ne.outputColorSpace!==ye||Z.isBatchedMesh&&Ne.batching===!1||!Z.isBatchedMesh&&Ne.batching===!0||Z.isBatchedMesh&&Ne.batchingColor===!0&&Z.colorTexture===null||Z.isBatchedMesh&&Ne.batchingColor===!1&&Z.colorTexture!==null||Z.isInstancedMesh&&Ne.instancing===!1||!Z.isInstancedMesh&&Ne.instancing===!0||Z.isSkinnedMesh&&Ne.skinning===!1||!Z.isSkinnedMesh&&Ne.skinning===!0||Z.isInstancedMesh&&Ne.instancingColor===!0&&Z.instanceColor===null||Z.isInstancedMesh&&Ne.instancingColor===!1&&Z.instanceColor!==null||Z.isInstancedMesh&&Ne.instancingMorph===!0&&Z.morphTexture===null||Z.isInstancedMesh&&Ne.instancingMorph===!1&&Z.morphTexture!==null||Ne.envMap!==We||K.fog===!0&&Ne.fog!==Ie||Ne.numClippingPlanes!==void 0&&(Ne.numClippingPlanes!==Be.numPlanes||Ne.numIntersection!==Be.numIntersection)||Ne.vertexAlphas!==nt||Ne.vertexTangents!==it||Ne.morphTargets!==Ye||Ne.morphNormals!==ht||Ne.morphColors!==It||Ne.toneMapping!==bt||Ne.morphTargetsCount!==Bt||!!Ne.lightProbeGrid!=E.state.lightProbeGridArray.length>0)&&(lt=!0):(lt=!0,Ne.__version=K.version);let un=Ne.currentProgram;lt===!0&&(un=Ln(K,H,Z),U&&K.isNodeMaterial&&U.onUpdateProgram(K,un,Ne));let _n=!1,ln=!1,Tn=!1;const xt=un.getUniforms(),Nt=Ne.uniforms;if(_.useProgram(un.program)&&(_n=!0,ln=!0,Tn=!0),K.id!==ae&&(ae=K.id,ln=!0),Ne.needsLights){const vt=ki(E.state.lightProbeGridArray,Z);Ne.lightProbeGrid!==vt&&(Ne.lightProbeGrid=vt,ln=!0)}if(_n||q!==b){_.buffers.depth.getReversed()&&b.reversedDepth!==!0&&(b._reversedDepth=!0,b.updateProjectionMatrix()),xt.setValue(z,"projectionMatrix",b.projectionMatrix),xt.setValue(z,"viewMatrix",b.matrixWorldInverse);const Gn=xt.map.cameraPosition;Gn!==void 0&&Gn.setValue(z,Xe.setFromMatrixPosition(b.matrixWorld)),w.logarithmicDepthBuffer&&xt.setValue(z,"logDepthBufFC",2/(Math.log(b.far+1)/Math.LN2)),(K.isMeshPhongMaterial||K.isMeshToonMaterial||K.isMeshLambertMaterial||K.isMeshBasicMaterial||K.isMeshStandardMaterial||K.isShaderMaterial)&&xt.setValue(z,"isOrthographic",b.isOrthographicCamera===!0),q!==b&&(q=b,ln=!0,Tn=!0)}if(Ne.needsLights&&(sn.state.directionalShadowMap.length>0&&xt.setValue(z,"directionalShadowMap",sn.state.directionalShadowMap,re),sn.state.spotShadowMap.length>0&&xt.setValue(z,"spotShadowMap",sn.state.spotShadowMap,re),sn.state.pointShadowMap.length>0&&xt.setValue(z,"pointShadowMap",sn.state.pointShadowMap,re)),Z.isSkinnedMesh){xt.setOptional(z,Z,"bindMatrix"),xt.setOptional(z,Z,"bindMatrixInverse");const vt=Z.skeleton;vt&&(vt.boneTexture===null&&vt.computeBoneTexture(),xt.setValue(z,"boneTexture",vt.boneTexture,re))}Z.isBatchedMesh&&(xt.setOptional(z,Z,"batchingTexture"),xt.setValue(z,"batchingTexture",Z._matricesTexture,re),xt.setOptional(z,Z,"batchingIdTexture"),xt.setValue(z,"batchingIdTexture",Z._indirectTexture,re),xt.setOptional(z,Z,"batchingColorTexture"),Z._colorsTexture!==null&&xt.setValue(z,"batchingColorTexture",Z._colorsTexture,re));const Pn=Q.morphAttributes;if((Pn.position!==void 0||Pn.normal!==void 0||Pn.color!==void 0)&&N.update(Z,Q,un),(ln||Ne.receiveShadow!==Z.receiveShadow)&&(Ne.receiveShadow=Z.receiveShadow,xt.setValue(z,"receiveShadow",Z.receiveShadow)),(K.isMeshStandardMaterial||K.isMeshLambertMaterial||K.isMeshPhongMaterial)&&K.envMap===null&&H.environment!==null&&(Nt.envMapIntensity.value=H.environmentIntensity),Nt.dfgLUT!==void 0&&(Nt.dfgLUT.value=Nv()),ln){if(xt.setValue(z,"toneMappingExposure",C.toneMappingExposure),Ne.needsLights&&Er(Nt,Tn),Ie&&K.fog===!0&&Fe.refreshFogUniforms(Nt,Ie),Fe.refreshMaterialUniforms(Nt,K,O,ce,E.state.transmissionRenderTarget[b.id]),Ne.needsLights&&Ne.lightProbeGrid){const vt=Ne.lightProbeGrid;Nt.probesSH.value=vt.texture,Nt.probesMin.value.copy(vt.boundingBox.min),Nt.probesMax.value.copy(vt.boundingBox.max),Nt.probesResolution.value.copy(vt.resolution)}Ro.upload(z,Vi(Ne),Nt,re)}if(K.isShaderMaterial&&K.uniformsNeedUpdate===!0&&(Ro.upload(z,Vi(Ne),Nt,re),K.uniformsNeedUpdate=!1),K.isSpriteMaterial&&xt.setValue(z,"center",Z.center),xt.setValue(z,"modelViewMatrix",Z.modelViewMatrix),xt.setValue(z,"normalMatrix",Z.normalMatrix),xt.setValue(z,"modelMatrix",Z.matrixWorld),K.uniformsGroups!==void 0){const vt=K.uniformsGroups;for(let Gn=0,li=vt.length;Gn<li;Gn++){const ao=vt[Gn];pe.update(ao,un),pe.bind(ao,un)}}return un}function Er(b,H){b.ambientLightColor.needsUpdate=H,b.lightProbe.needsUpdate=H,b.directionalLights.needsUpdate=H,b.directionalLightShadows.needsUpdate=H,b.pointLights.needsUpdate=H,b.pointLightShadows.needsUpdate=H,b.spotLights.needsUpdate=H,b.spotLightShadows.needsUpdate=H,b.rectAreaLights.needsUpdate=H,b.hemisphereLights.needsUpdate=H}function ea(b){return b.isMeshLambertMaterial||b.isMeshToonMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isShadowMaterial||b.isShaderMaterial&&b.lights===!0}this.getActiveCubeFace=function(){return Y},this.getActiveMipmapLevel=function(){return D},this.getRenderTarget=function(){return j},this.setRenderTargetTextures=function(b,H,Q){const K=X.get(b);K.__autoAllocateDepthBuffer=b.resolveDepthBuffer===!1,K.__autoAllocateDepthBuffer===!1&&(K.__useRenderToTexture=!1),X.get(b.texture).__webglTexture=H,X.get(b.depthTexture).__webglTexture=K.__autoAllocateDepthBuffer?void 0:Q,K.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(b,H){const Q=X.get(b);Q.__webglFramebuffer=H,Q.__useDefaultFramebuffer=H===void 0},this.setRenderTarget=function(b,H=0,Q=0){j=b,Y=H,D=Q;let K=null,Z=!1,Ie=!1;if(b){const ye=X.get(b);if(ye.__useDefaultFramebuffer!==void 0){_.bindFramebuffer(z.FRAMEBUFFER,ye.__webglFramebuffer),ne.copy(b.viewport),ue.copy(b.scissor),we=b.scissorTest,_.viewport(ne),_.scissor(ue),_.setScissorTest(we),ae=-1;return}else if(ye.__webglFramebuffer===void 0)re.setupRenderTarget(b);else if(ye.__hasExternalTextures)re.rebindTextures(b,X.get(b.texture).__webglTexture,X.get(b.depthTexture).__webglTexture);else if(b.depthBuffer){const nt=b.depthTexture;if(ye.__boundDepthTexture!==nt){if(nt!==null&&X.has(nt)&&(b.width!==nt.image.width||b.height!==nt.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");re.setupDepthRenderbuffer(b)}}const ke=b.texture;(ke.isData3DTexture||ke.isDataArrayTexture||ke.isCompressedArrayTexture)&&(Ie=!0);const We=X.get(b).__webglFramebuffer;b.isWebGLCubeRenderTarget?(Array.isArray(We[H])?K=We[H][Q]:K=We[H],Z=!0):b.samples>0&&re.useMultisampledRTT(b)===!1?K=X.get(b).__webglMultisampledFramebuffer:Array.isArray(We)?K=We[Q]:K=We,ne.copy(b.viewport),ue.copy(b.scissor),we=b.scissorTest}else ne.copy(W).multiplyScalar(O).floor(),ue.copy(me).multiplyScalar(O).floor(),we=de;if(Q!==0&&(K=V),_.bindFramebuffer(z.FRAMEBUFFER,K)&&_.drawBuffers(b,K),_.viewport(ne),_.scissor(ue),_.setScissorTest(we),Z){const ye=X.get(b.texture);z.framebufferTexture2D(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_CUBE_MAP_POSITIVE_X+H,ye.__webglTexture,Q)}else if(Ie){const ye=H;for(let ke=0;ke<b.textures.length;ke++){const We=X.get(b.textures[ke]);z.framebufferTextureLayer(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0+ke,We.__webglTexture,Q,ye)}}else if(b!==null&&Q!==0){const ye=X.get(b.texture);z.framebufferTexture2D(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_2D,ye.__webglTexture,Q)}ae=-1},this.readRenderTargetPixels=function(b,H,Q,K,Z,Ie,Ue,ye=0){if(!(b&&b.isWebGLRenderTarget)){Tt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let ke=X.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&Ue!==void 0&&(ke=ke[Ue]),ke){_.bindFramebuffer(z.FRAMEBUFFER,ke);try{const We=b.textures[ye],nt=We.format,it=We.type;if(b.textures.length>1&&z.readBuffer(z.COLOR_ATTACHMENT0+ye),!w.textureFormatReadable(nt)){Tt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!w.textureTypeReadable(it)){Tt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}H>=0&&H<=b.width-K&&Q>=0&&Q<=b.height-Z&&z.readPixels(H,Q,K,Z,Ae.convert(nt),Ae.convert(it),Ie)}finally{const We=j!==null?X.get(j).__webglFramebuffer:null;_.bindFramebuffer(z.FRAMEBUFFER,We)}}},this.readRenderTargetPixelsAsync=async function(b,H,Q,K,Z,Ie,Ue,ye=0){if(!(b&&b.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let ke=X.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&Ue!==void 0&&(ke=ke[Ue]),ke)if(H>=0&&H<=b.width-K&&Q>=0&&Q<=b.height-Z){_.bindFramebuffer(z.FRAMEBUFFER,ke);const We=b.textures[ye],nt=We.format,it=We.type;if(b.textures.length>1&&z.readBuffer(z.COLOR_ATTACHMENT0+ye),!w.textureFormatReadable(nt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!w.textureTypeReadable(it))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Ye=z.createBuffer();z.bindBuffer(z.PIXEL_PACK_BUFFER,Ye),z.bufferData(z.PIXEL_PACK_BUFFER,Ie.byteLength,z.STREAM_READ),z.readPixels(H,Q,K,Z,Ae.convert(nt),Ae.convert(it),0);const ht=j!==null?X.get(j).__webglFramebuffer:null;_.bindFramebuffer(z.FRAMEBUFFER,ht);const It=z.fenceSync(z.SYNC_GPU_COMMANDS_COMPLETE,0);return z.flush(),await Uf(z,It,4),z.bindBuffer(z.PIXEL_PACK_BUFFER,Ye),z.getBufferSubData(z.PIXEL_PACK_BUFFER,0,Ie),z.deleteBuffer(Ye),z.deleteSync(It),Ie}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(b,H=null,Q=0){const K=Math.pow(2,-Q),Z=Math.floor(b.image.width*K),Ie=Math.floor(b.image.height*K),Ue=H!==null?H.x:0,ye=H!==null?H.y:0;re.setTexture2D(b,0),z.copyTexSubImage2D(z.TEXTURE_2D,Q,0,0,Ue,ye,Z,Ie),_.unbindTexture()},this.copyTextureToTexture=function(b,H,Q=null,K=null,Z=0,Ie=0){let Ue,ye,ke,We,nt,it,Ye,ht,It;const bt=b.isCompressedTexture?b.mipmaps[Ie]:b.image;if(Q!==null)Ue=Q.max.x-Q.min.x,ye=Q.max.y-Q.min.y,ke=Q.isBox3?Q.max.z-Q.min.z:1,We=Q.min.x,nt=Q.min.y,it=Q.isBox3?Q.min.z:0;else{const Nt=Math.pow(2,-Z);Ue=Math.floor(bt.width*Nt),ye=Math.floor(bt.height*Nt),b.isDataArrayTexture?ke=bt.depth:b.isData3DTexture?ke=Math.floor(bt.depth*Nt):ke=1,We=0,nt=0,it=0}K!==null?(Ye=K.x,ht=K.y,It=K.z):(Ye=0,ht=0,It=0);const mt=Ae.convert(H.format),Bt=Ae.convert(H.type);let Ne;H.isData3DTexture?(re.setTexture3D(H,0),Ne=z.TEXTURE_3D):H.isDataArrayTexture||H.isCompressedArrayTexture?(re.setTexture2DArray(H,0),Ne=z.TEXTURE_2D_ARRAY):(re.setTexture2D(H,0),Ne=z.TEXTURE_2D),_.activeTexture(z.TEXTURE0),_.pixelStorei(z.UNPACK_FLIP_Y_WEBGL,H.flipY),_.pixelStorei(z.UNPACK_PREMULTIPLY_ALPHA_WEBGL,H.premultiplyAlpha),_.pixelStorei(z.UNPACK_ALIGNMENT,H.unpackAlignment);const sn=_.getParameter(z.UNPACK_ROW_LENGTH),lt=_.getParameter(z.UNPACK_IMAGE_HEIGHT),un=_.getParameter(z.UNPACK_SKIP_PIXELS),_n=_.getParameter(z.UNPACK_SKIP_ROWS),ln=_.getParameter(z.UNPACK_SKIP_IMAGES);_.pixelStorei(z.UNPACK_ROW_LENGTH,bt.width),_.pixelStorei(z.UNPACK_IMAGE_HEIGHT,bt.height),_.pixelStorei(z.UNPACK_SKIP_PIXELS,We),_.pixelStorei(z.UNPACK_SKIP_ROWS,nt),_.pixelStorei(z.UNPACK_SKIP_IMAGES,it);const Tn=b.isDataArrayTexture||b.isData3DTexture,xt=H.isDataArrayTexture||H.isData3DTexture;if(b.isDepthTexture){const Nt=X.get(b),Pn=X.get(H),vt=X.get(Nt.__renderTarget),Gn=X.get(Pn.__renderTarget);_.bindFramebuffer(z.READ_FRAMEBUFFER,vt.__webglFramebuffer),_.bindFramebuffer(z.DRAW_FRAMEBUFFER,Gn.__webglFramebuffer);for(let li=0;li<ke;li++)Tn&&(z.framebufferTextureLayer(z.READ_FRAMEBUFFER,z.COLOR_ATTACHMENT0,X.get(b).__webglTexture,Z,it+li),z.framebufferTextureLayer(z.DRAW_FRAMEBUFFER,z.COLOR_ATTACHMENT0,X.get(H).__webglTexture,Ie,It+li)),z.blitFramebuffer(We,nt,Ue,ye,Ye,ht,Ue,ye,z.DEPTH_BUFFER_BIT,z.NEAREST);_.bindFramebuffer(z.READ_FRAMEBUFFER,null),_.bindFramebuffer(z.DRAW_FRAMEBUFFER,null)}else if(Z!==0||b.isRenderTargetTexture||X.has(b)){const Nt=X.get(b),Pn=X.get(H);_.bindFramebuffer(z.READ_FRAMEBUFFER,k),_.bindFramebuffer(z.DRAW_FRAMEBUFFER,B);for(let vt=0;vt<ke;vt++)Tn?z.framebufferTextureLayer(z.READ_FRAMEBUFFER,z.COLOR_ATTACHMENT0,Nt.__webglTexture,Z,it+vt):z.framebufferTexture2D(z.READ_FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_2D,Nt.__webglTexture,Z),xt?z.framebufferTextureLayer(z.DRAW_FRAMEBUFFER,z.COLOR_ATTACHMENT0,Pn.__webglTexture,Ie,It+vt):z.framebufferTexture2D(z.DRAW_FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_2D,Pn.__webglTexture,Ie),Z!==0?z.blitFramebuffer(We,nt,Ue,ye,Ye,ht,Ue,ye,z.COLOR_BUFFER_BIT,z.NEAREST):xt?z.copyTexSubImage3D(Ne,Ie,Ye,ht,It+vt,We,nt,Ue,ye):z.copyTexSubImage2D(Ne,Ie,Ye,ht,We,nt,Ue,ye);_.bindFramebuffer(z.READ_FRAMEBUFFER,null),_.bindFramebuffer(z.DRAW_FRAMEBUFFER,null)}else xt?b.isDataTexture||b.isData3DTexture?z.texSubImage3D(Ne,Ie,Ye,ht,It,Ue,ye,ke,mt,Bt,bt.data):H.isCompressedArrayTexture?z.compressedTexSubImage3D(Ne,Ie,Ye,ht,It,Ue,ye,ke,mt,bt.data):z.texSubImage3D(Ne,Ie,Ye,ht,It,Ue,ye,ke,mt,Bt,bt):b.isDataTexture?z.texSubImage2D(z.TEXTURE_2D,Ie,Ye,ht,Ue,ye,mt,Bt,bt.data):b.isCompressedTexture?z.compressedTexSubImage2D(z.TEXTURE_2D,Ie,Ye,ht,bt.width,bt.height,mt,bt.data):z.texSubImage2D(z.TEXTURE_2D,Ie,Ye,ht,Ue,ye,mt,Bt,bt);_.pixelStorei(z.UNPACK_ROW_LENGTH,sn),_.pixelStorei(z.UNPACK_IMAGE_HEIGHT,lt),_.pixelStorei(z.UNPACK_SKIP_PIXELS,un),_.pixelStorei(z.UNPACK_SKIP_ROWS,_n),_.pixelStorei(z.UNPACK_SKIP_IMAGES,ln),Ie===0&&H.generateMipmaps&&z.generateMipmap(Ne),_.unbindTexture()},this.initRenderTarget=function(b){X.get(b).__webglFramebuffer===void 0&&re.setupRenderTarget(b)},this.initTexture=function(b){b.isCubeTexture?re.setTextureCube(b,0):b.isData3DTexture?re.setTexture3D(b,0):b.isDataArrayTexture||b.isCompressedArrayTexture?re.setTexture2DArray(b,0):re.setTexture2D(b,0),_.unbindTexture()},this.resetState=function(){Y=0,D=0,j=null,_.reset(),De.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Vs}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const n=this.getContext();n.drawingBufferColorSpace=Ut._getDrawingBufferColorSpace(t),n.unpackColorSpace=Ut._getUnpackColorSpace()}}const Ql={type:"change"},ys={type:"start"},hd={type:"end"},_o=new ku,ec=new Fo,Fv=Math.cos(70*xi.DEG2RAD),kt=new $,pn=2*Math.PI,yt={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},_a=1e-6;class Ov extends Kp{constructor(t,n=null){super(t,n),this.state=yt.NONE,this.target=new $,this.cursor=new $,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:_i.ROTATE,MIDDLE:_i.DOLLY,RIGHT:_i.PAN},this.touches={ONE:Ki.ROTATE,TWO:Ki.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new $,this._lastQuaternion=new Kn,this._lastTargetPosition=new $,this._quat=new Kn().setFromUnitVectors(t.up,new $(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Al,this._sphericalDelta=new Al,this._scale=1,this._panOffset=new $,this._rotateStart=new et,this._rotateEnd=new et,this._rotateDelta=new et,this._panStart=new et,this._panEnd=new et,this._panDelta=new et,this._dollyStart=new et,this._dollyEnd=new et,this._dollyDelta=new et,this._dollyDirection=new $,this._mouse=new et,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=Bv.bind(this),this._onPointerDown=zv.bind(this),this._onPointerUp=Gv.bind(this),this._onContextMenu=$v.bind(this),this._onMouseWheel=Hv.bind(this),this._onKeyDown=Wv.bind(this),this._onTouchStart=Xv.bind(this),this._onTouchMove=Yv.bind(this),this._onMouseDown=Vv.bind(this),this._onMouseMove=kv.bind(this),this._interceptControlDown=qv.bind(this),this._interceptControlUp=Kv.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(t){this._cursorStyle=t,t==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(t){super.connect(t),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction=""}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Ql),this.update(),this.state=yt.NONE}pan(t,n){this._pan(t,n),this.update()}dollyIn(t){this._dollyIn(t),this.update()}dollyOut(t){this._dollyOut(t),this.update()}rotateLeft(t){this._rotateLeft(t),this.update()}rotateUp(t){this._rotateUp(t),this.update()}update(t=null){const n=this.object.position;kt.copy(n).sub(this.target),kt.applyQuaternion(this._quat),this._spherical.setFromVector3(kt),this.autoRotate&&this.state===yt.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let i=this.minAzimuthAngle,r=this.maxAzimuthAngle;isFinite(i)&&isFinite(r)&&(i<-Math.PI?i+=pn:i>Math.PI&&(i-=pn),r<-Math.PI?r+=pn:r>Math.PI&&(r-=pn),i<=r?this._spherical.theta=Math.max(i,Math.min(r,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(i+r)/2?Math.max(i,this._spherical.theta):Math.min(r,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let o=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const a=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),o=a!=this._spherical.radius}if(kt.setFromSpherical(this._spherical),kt.applyQuaternion(this._quatInverse),n.copy(this.target).add(kt),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let a=null;if(this.object.isPerspectiveCamera){const s=kt.length();a=this._clampDistance(s*this._scale);const l=s-a;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),o=!!l}else if(this.object.isOrthographicCamera){const s=new $(this._mouse.x,this._mouse.y,0);s.unproject(this.object);const l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),o=l!==this.object.zoom;const c=new $(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(s),this.object.updateMatrixWorld(),a=kt.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;a!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(a).add(this.object.position):(_o.origin.copy(this.object.position),_o.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(_o.direction))<Fv?this.object.lookAt(this.target):(ec.setFromNormalAndCoplanarPoint(this.object.up,this.target),_o.intersectPlane(ec,this.target))))}else if(this.object.isOrthographicCamera){const a=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),a!==this.object.zoom&&(this.object.updateProjectionMatrix(),o=!0)}return this._scale=1,this._performCursorZoom=!1,o||this._lastPosition.distanceToSquared(this.object.position)>_a||8*(1-this._lastQuaternion.dot(this.object.quaternion))>_a||this._lastTargetPosition.distanceToSquared(this.target)>_a?(this.dispatchEvent(Ql),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?pn/60*this.autoRotateSpeed*t:pn/60/60*this.autoRotateSpeed}_getZoomScale(t){const n=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*n)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,n){kt.setFromMatrixColumn(n,0),kt.multiplyScalar(-t),this._panOffset.add(kt)}_panUp(t,n){this.screenSpacePanning===!0?kt.setFromMatrixColumn(n,1):(kt.setFromMatrixColumn(n,0),kt.crossVectors(this.object.up,kt)),kt.multiplyScalar(t),this._panOffset.add(kt)}_pan(t,n){const i=this.domElement;if(this.object.isPerspectiveCamera){const r=this.object.position;kt.copy(r).sub(this.target);let o=kt.length();o*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*o/i.clientHeight,this.object.matrix),this._panUp(2*n*o/i.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/i.clientWidth,this.object.matrix),this._panUp(n*(this.object.top-this.object.bottom)/this.object.zoom/i.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,n){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const i=this.domElement.getBoundingClientRect(),r=t-i.left,o=n-i.top,a=i.width,s=i.height;this._mouse.x=r/a*2-1,this._mouse.y=-(o/s)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const n=this.domElement;this._rotateLeft(pn*this._rotateDelta.x/n.clientHeight),this._rotateUp(pn*this._rotateDelta.y/n.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let n=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(pn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),n=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(-pn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),n=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(pn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),n=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(-pn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),n=!0;break}n&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{const n=this._getSecondPointerPosition(t),i=.5*(t.pageX+n.x),r=.5*(t.pageY+n.y);this._rotateStart.set(i,r)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{const n=this._getSecondPointerPosition(t),i=.5*(t.pageX+n.x),r=.5*(t.pageY+n.y);this._panStart.set(i,r)}}_handleTouchStartDolly(t){const n=this._getSecondPointerPosition(t),i=t.pageX-n.x,r=t.pageY-n.y,o=Math.sqrt(i*i+r*r);this._dollyStart.set(0,o)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{const i=this._getSecondPointerPosition(t),r=.5*(t.pageX+i.x),o=.5*(t.pageY+i.y);this._rotateEnd.set(r,o)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const n=this.domElement;this._rotateLeft(pn*this._rotateDelta.x/n.clientHeight),this._rotateUp(pn*this._rotateDelta.y/n.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{const n=this._getSecondPointerPosition(t),i=.5*(t.pageX+n.x),r=.5*(t.pageY+n.y);this._panEnd.set(i,r)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){const n=this._getSecondPointerPosition(t),i=t.pageX-n.x,r=t.pageY-n.y,o=Math.sqrt(i*i+r*r);this._dollyEnd.set(0,o),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const a=(t.pageX+n.x)*.5,s=(t.pageY+n.y)*.5;this._updateZoomParameters(a,s)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let n=0;n<this._pointers.length;n++)if(this._pointers[n]==t.pointerId){this._pointers.splice(n,1);return}}_isTrackingPointer(t){for(let n=0;n<this._pointers.length;n++)if(this._pointers[n]==t.pointerId)return!0;return!1}_trackPointer(t){let n=this._pointerPositions[t.pointerId];n===void 0&&(n=new et,this._pointerPositions[t.pointerId]=n),n.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){const n=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[n]}_customWheelEvent(t){const n=t.deltaMode,i={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(n){case 1:i.deltaY*=16;break;case 2:i.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(i.deltaY*=10),i}}function zv(e){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(e.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(e)&&(this._addPointer(e),e.pointerType==="touch"?this._onTouchStart(e):this._onMouseDown(e),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function Bv(e){this.enabled!==!1&&(e.pointerType==="touch"?this._onTouchMove(e):this._onMouseMove(e))}function Gv(e){switch(this._removePointer(e),this._pointers.length){case 0:this.domElement.releasePointerCapture(e.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(hd),this.state=yt.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:const t=this._pointers[0],n=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:n.x,pageY:n.y});break}}function Vv(e){let t;switch(e.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case _i.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(e),this.state=yt.DOLLY;break;case _i.ROTATE:if(e.ctrlKey||e.metaKey||e.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(e),this.state=yt.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(e),this.state=yt.ROTATE}break;case _i.PAN:if(e.ctrlKey||e.metaKey||e.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(e),this.state=yt.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(e),this.state=yt.PAN}break;default:this.state=yt.NONE}this.state!==yt.NONE&&this.dispatchEvent(ys)}function kv(e){switch(this.state){case yt.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(e);break;case yt.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(e);break;case yt.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(e);break}}function Hv(e){this.enabled===!1||this.enableZoom===!1||this.state!==yt.NONE||(e.preventDefault(),this.dispatchEvent(ys),this._handleMouseWheel(this._customWheelEvent(e)),this.dispatchEvent(hd))}function Wv(e){this.enabled!==!1&&this._handleKeyDown(e)}function Xv(e){switch(this._trackPointer(e),this._pointers.length){case 1:switch(this.touches.ONE){case Ki.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(e),this.state=yt.TOUCH_ROTATE;break;case Ki.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(e),this.state=yt.TOUCH_PAN;break;default:this.state=yt.NONE}break;case 2:switch(this.touches.TWO){case Ki.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(e),this.state=yt.TOUCH_DOLLY_PAN;break;case Ki.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(e),this.state=yt.TOUCH_DOLLY_ROTATE;break;default:this.state=yt.NONE}break;default:this.state=yt.NONE}this.state!==yt.NONE&&this.dispatchEvent(ys)}function Yv(e){switch(this._trackPointer(e),this.state){case yt.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(e),this.update();break;case yt.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(e),this.update();break;case yt.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(e),this.update();break;case yt.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(e),this.update();break;default:this.state=yt.NONE}}function $v(e){this.enabled!==!1&&e.preventDefault()}function qv(e){e.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function Kv(e){e.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function jv(e){return[...new Set((e??[]).filter(Boolean))]}function Zv(e){return jv([...Array.isArray(e?.sourceEntities)?e.sourceEntities:[],e?.sourceEntity])}function Jv(e,t){if(!e||!t)return null;if(t.line3dGroupId){const o=(e.model3d?.lines??[]).filter(s=>s?.groupId===t.line3dGroupId&&s.locked!==!0).map(s=>s.id),a=o.length?e.remove3dLines?.(o)??0:0;return a?{count:a,kind:"line3d"}:null}const n=Zv(t);if(!n.length)return null;if(t.sketchId){const o=e.model3d?.sketches?.find(l=>l?.id===t.sketchId),a=n.filter(l=>o?.entities?.includes(l)),s=a.length?e.remove3dSketchEntities?.(t.sketchId,a)??0:0;return s?{count:s,kind:"sketch"}:null}const i=n.filter(o=>e.entities?.includes(o)),r=i.length?e.removeEntities?.(i)??0:0;return r?{count:r,kind:"entities"}:null}const ei=Math.PI*2,Qv=Math.PI/18,eS=.25,tS=128;function Wa(e){const t=e%ei;return t<0?t+ei:t}function tc(e,t){return Wa(Math.atan2(t.y-e.y,t.x-e.x))}function Ms(e,t,n=!0){return Wa(n?t-e:e-t)}function md(e,t,n={}){const i=Math.abs(Number(e)),r=Math.abs(Number(t));if(!Number.isFinite(i)||!Number.isFinite(r)||i<=0||r<=0)return 0;const o=Math.max(Math.PI/180,Number(n.maxArcSegmentAngle)||Qv),a=Math.max(2,Number(n.maxArcSegments)||tS),s=Math.max(0,Number(n.arcChordTolerance)||eS),l=Math.ceil(r/o);let c=1;if(s>0&&s<i){const h=2*Math.acos(Math.max(-1,Math.min(1,1-s/i)));Number.isFinite(h)&&h>0&&(c=Math.ceil(r/h))}return Math.min(a,Math.max(2,l,c))}function nS({start:e,end:t,center:n,clockwise:i=!0},r={}){const o=Math.hypot(e.x-n.x,e.y-n.y),a=tc(n,e),s=tc(n,t),l=Ms(a,s,i),c=md(o,l,r);if(!c)return[];const h=i?1:-1;return Array.from({length:c+1},(d,u)=>{if(u===0)return{...e};if(u===c)return{...t};const m=u/c,S=a+h*l*m;return{x:n.x+Math.cos(S)*o,y:n.y+Math.sin(S)*o,z:(Number(e.z)||0)+((Number(t.z)||0)-(Number(e.z)||0))*m}})}function gd(e,t={}){const n=Number(e?.center?.x),i=Number(e?.center?.y),r=Number(e?.center?.z)||0,o=Math.abs(Number(e?.radiusX)),a=Math.abs(Number(e?.radiusY)),s=Number(e?.rotation)||0;if(![n,i,o,a,s].every(Number.isFinite)||o<=0||a<=0)return[];const l=e.type==="ELLIPSE",c=l?0:Number(e.startParameter),h=l?ei:Number(e.endParameter);if(![c,h].every(Number.isFinite))return[];const d=l||e.clockwise!==!1,u=l?ei:Ms(c,h,d),m=Math.max(0,Number(t.curveSegments)||0),S=m?Math.max(2,Math.ceil(m*u/ei)):md(Math.max(o,a),u,t);if(!S)return[];const x=d?1:-1,f=Math.cos(s),p=Math.sin(s);return Array.from({length:S+1},(M,A)=>{const v=c+x*u*A/S,y=Math.cos(v),E=Math.sin(v);return{x:n+o*y*f-a*E*p,y:i+o*y*p+a*E*f,z:r}})}const iS=64;function Ni(e,t){const n=Number(e?.x),i=Number(e?.y),r=e?.z===void 0?0:Number(e.z);return[n,i,r].every(Number.isFinite)?{x:n,y:t?-i:i,z:r}:null}function $r(e,t,n,i=null){return{start:e,end:t,entity:n,segmentIndex:i}}function rS(e,t){const n=Ni(e?.center,t.invertY),i=Number(e?.radius);if(!n||!Number.isFinite(i)||i<=0)return[];const r=e.type==="CIRCLE",o=r?0:Number(e.startAngle),a=r?ei:Number(e.endAngle);if(![o,a].every(Number.isFinite))return[];const s=e.clockwise!==!1,l=r?ei:Ms(o,a,s),c=Math.max(2,Math.ceil(t.curveSegments*l/ei)),h=s?1:-1,d=Array.from({length:c+1},(u,m)=>{const S=o+h*l*m/c;return{x:n.x+Math.cos(S)*i,y:n.y+(t.invertY?-Math.sin(S):Math.sin(S))*i,z:n.z}});return Array.from({length:c},(u,m)=>$r(d[m],d[m+1],e,m))}function oS(e,t){const n=gd(e,t).map(i=>Ni(i,t.invertY)).filter(Boolean);return Array.from({length:Math.max(0,n.length-1)},(i,r)=>$r(n[r],n[r+1],e,r))}function aS(e,t){if(!Array.isArray(e?.vertices)||e.vertices.length<2)return[];const n=e.closed?e.vertices.length:e.vertices.length-1,i=[];for(let r=0;r<n;r+=1){const o=e.segments?.[r],a=Ni(e.vertices[r],t.invertY),s=Ni(e.vertices[(r+1)%e.vertices.length],t.invertY);if(!(!a||!s)){if(o?.type==="ARC"){const l=Ni(o.center,t.invertY);if(!l){t.onWarning?.("Arco interno de POLYLINE omitido por centro no valido",e);continue}const c=nS({start:a,end:s,center:l,clockwise:sS(o.clockwise!==!1,t.invertY)},t);for(let h=0;h<c.length-1;h+=1)i.push($r(c[h],c[h+1],e,r));continue}i.push($r(a,s,e,r))}}return i}function sS(e,t){return t?!e:e}function lS(e,t={}){const n={curveSegments:Math.max(8,Number(t.curveSegments)||iS),invertY:t.invertY!==!1,arcChordTolerance:t.arcChordTolerance,maxArcSegmentAngle:t.maxArcSegmentAngle,maxArcSegments:t.maxArcSegments,onWarning:t.onWarning};if(e?.type==="LINE"){const i=Ni(e.start,n.invertY),r=Ni(e.end,n.invertY);return i&&r?[$r(i,r,e)]:[]}return e?.type==="POLYLINE"?aS(e,n):e?.type==="CIRCLE"||e?.type==="ARC"?rS(e,n):e?.type==="ELLIPSE"||e?.type==="ELLIPSE_ARC"?oS(e,n):(n.onWarning?.(`Entidad ${e?.type??"desconocida"} omitida en la vista 3D`,e),[])}const cS=new Set(["auxiliar","ejes"]);function uS(e){return String(e||"").trim().toLowerCase()}function dS(e){return!(!e||cS.has(uS(e.layer)))}function _d(e){return(Array.isArray(e)?e:[]).filter(dS)}Re.line={worldUnits:{value:1},linewidth:{value:1},resolution:{value:new et},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}};mn.line={uniforms:ls.merge([Re.common,Re.fog,Re.line]),vertexShader:`
		#include <common>
		#include <color_pars_vertex>
		#include <fog_pars_vertex>
		#include <logdepthbuf_pars_vertex>
		#include <clipping_planes_pars_vertex>

		uniform float linewidth;
		uniform vec2 resolution;

		attribute vec3 instanceStart;
		attribute vec3 instanceEnd;

		attribute vec3 instanceColorStart;
		attribute vec3 instanceColorEnd;

		#ifdef WORLD_UNITS

			varying vec4 worldPos;
			varying vec3 worldStart;
			varying vec3 worldEnd;

			#ifdef USE_DASH

				varying vec2 vUv;

			#endif

		#else

			varying vec2 vUv;

		#endif

		#ifdef USE_DASH

			uniform float dashScale;
			attribute float instanceDistanceStart;
			attribute float instanceDistanceEnd;
			varying float vLineDistance;

		#endif

		float trimSegmentAlpha( const in vec4 start, const in vec4 end ) {

			// compute the interpolation factor needed to trim the segment so it terminates
			// between the camera plane and the near plane

			// conservative estimate of the near plane
			float a = projectionMatrix[ 2 ][ 2 ]; // 3nd entry in 3th column
			float b = projectionMatrix[ 3 ][ 2 ]; // 3nd entry in 4th column

			// we need different nearEstimate formula for reversed and default depth buffer
			// a is positive with a reversed depth buffer so it can be used for controlling the code flow
			float nearEstimate = ( a > 0.0 ) ? ( - b / ( a + 1.0 ) ) : ( - 0.5 * b / a );

			return ( nearEstimate - start.z ) / ( end.z - start.z );

		}

		void main() {

			#ifdef USE_COLOR

				vColor.xyz = ( position.y < 0.5 ) ? instanceColorStart : instanceColorEnd;

			#endif

			float aspect = resolution.x / resolution.y;

			// camera space
			vec4 start = modelViewMatrix * vec4( instanceStart, 1.0 );
			vec4 end = modelViewMatrix * vec4( instanceEnd, 1.0 );

			#ifdef USE_DASH

				float lineDistanceStart = dashScale * instanceDistanceStart;
				float lineDistanceEnd = dashScale * instanceDistanceEnd;

			#endif

			#ifdef WORLD_UNITS

				worldStart = start.xyz;
				worldEnd = end.xyz;

			#else

				vUv = uv;

			#endif

			// special case for perspective projection, and segments that terminate either in, or behind, the camera plane
			// clearly the gpu firmware has a way of addressing this issue when projecting into ndc space
			// but we need to perform ndc-space calculations in the shader, so we must address this issue directly
			// perhaps there is a more elegant solution -- WestLangley

			bool perspective = ( projectionMatrix[ 2 ][ 3 ] == - 1.0 ); // 4th entry in the 3rd column

			if ( perspective ) {

				if ( start.z < 0.0 && end.z >= 0.0 ) {

					float alpha = trimSegmentAlpha( start, end );
					end.xyz = mix( start.xyz, end.xyz, alpha );

					#ifdef USE_DASH

						lineDistanceEnd = mix( lineDistanceStart, lineDistanceEnd, alpha );

					#endif

				} else if ( end.z < 0.0 && start.z >= 0.0 ) {

					float alpha = trimSegmentAlpha( end, start );
					start.xyz = mix( end.xyz, start.xyz, alpha );

					#ifdef USE_DASH

						lineDistanceStart = mix( lineDistanceEnd, lineDistanceStart, alpha );

					#endif

				}

			}

			#ifdef USE_DASH

				vLineDistance = ( position.y < 0.5 ) ? lineDistanceStart : lineDistanceEnd;
				vUv = uv;

			#endif

			// clip space
			vec4 clipStart = projectionMatrix * start;
			vec4 clipEnd = projectionMatrix * end;

			// ndc space
			vec3 ndcStart = clipStart.xyz / clipStart.w;
			vec3 ndcEnd = clipEnd.xyz / clipEnd.w;

			// direction
			vec2 dir = ndcEnd.xy - ndcStart.xy;

			// account for clip-space aspect ratio
			dir.x *= aspect;
			dir = normalize( dir );

			#ifdef WORLD_UNITS

				vec3 worldDir = normalize( end.xyz - start.xyz );
				vec3 tmpFwd = normalize( mix( start.xyz, end.xyz, 0.5 ) );
				vec3 worldUp = normalize( cross( worldDir, tmpFwd ) );
				vec3 worldFwd = cross( worldDir, worldUp );
				worldPos = position.y < 0.5 ? start: end;

				// height offset
				float hw = linewidth * 0.5;
				worldPos.xyz += position.x < 0.0 ? hw * worldUp : - hw * worldUp;

				// don't extend the line if we're rendering dashes because we
				// won't be rendering the endcaps
				#ifndef USE_DASH

					// cap extension
					worldPos.xyz += position.y < 0.5 ? - hw * worldDir : hw * worldDir;

					// add width to the box
					worldPos.xyz += worldFwd * hw;

					// endcaps
					if ( position.y > 1.0 || position.y < 0.0 ) {

						worldPos.xyz -= worldFwd * 2.0 * hw;

					}

				#endif

				// project the worldpos
				vec4 clip = projectionMatrix * worldPos;

				// shift the depth of the projected points so the line
				// segments overlap neatly
				vec3 clipPose = ( position.y < 0.5 ) ? ndcStart : ndcEnd;
				clip.z = clipPose.z * clip.w;

			#else

				vec2 offset = vec2( dir.y, - dir.x );
				// undo aspect ratio adjustment
				dir.x /= aspect;
				offset.x /= aspect;

				// sign flip
				if ( position.x < 0.0 ) offset *= - 1.0;

				// endcaps
				if ( position.y < 0.0 ) {

					offset += - dir;

				} else if ( position.y > 1.0 ) {

					offset += dir;

				}

				// adjust for linewidth
				offset *= linewidth;

				// adjust for clip-space to screen-space conversion // maybe resolution should be based on viewport ...
				offset /= resolution.y;

				// select end
				vec4 clip = ( position.y < 0.5 ) ? clipStart : clipEnd;

				// back to clip space
				offset *= clip.w;

				clip.xy += offset;

			#endif

			gl_Position = clip;

			vec4 mvPosition = ( position.y < 0.5 ) ? start : end; // this is an approximation

			#include <logdepthbuf_vertex>
			#include <clipping_planes_vertex>
			#include <fog_vertex>

		}
		`,fragmentShader:`
		uniform vec3 diffuse;
		uniform float opacity;
		uniform float linewidth;

		#ifdef USE_DASH

			uniform float dashOffset;
			uniform float dashSize;
			uniform float gapSize;

		#endif

		varying float vLineDistance;

		#ifdef WORLD_UNITS

			varying vec4 worldPos;
			varying vec3 worldStart;
			varying vec3 worldEnd;

			#ifdef USE_DASH

				varying vec2 vUv;

			#endif

		#else

			varying vec2 vUv;

		#endif

		#include <common>
		#include <color_pars_fragment>
		#include <fog_pars_fragment>
		#include <logdepthbuf_pars_fragment>
		#include <clipping_planes_pars_fragment>

		vec2 closestLineToLine(vec3 p1, vec3 p2, vec3 p3, vec3 p4) {

			float mua;
			float mub;

			vec3 p13 = p1 - p3;
			vec3 p43 = p4 - p3;

			vec3 p21 = p2 - p1;

			float d1343 = dot( p13, p43 );
			float d4321 = dot( p43, p21 );
			float d1321 = dot( p13, p21 );
			float d4343 = dot( p43, p43 );
			float d2121 = dot( p21, p21 );

			float denom = d2121 * d4343 - d4321 * d4321;

			float numer = d1343 * d4321 - d1321 * d4343;

			mua = numer / denom;
			mua = clamp( mua, 0.0, 1.0 );
			mub = ( d1343 + d4321 * ( mua ) ) / d4343;
			mub = clamp( mub, 0.0, 1.0 );

			return vec2( mua, mub );

		}

		void main() {

			float alpha = opacity;
			vec4 diffuseColor = vec4( diffuse, alpha );

			#include <clipping_planes_fragment>

			#ifdef USE_DASH

				if ( vUv.y < - 1.0 || vUv.y > 1.0 ) discard; // discard endcaps

				if ( mod( vLineDistance + dashOffset, dashSize + gapSize ) > dashSize ) discard; // todo - FIX

			#endif

			#ifdef WORLD_UNITS

				// Find the closest points on the view ray and the line segment
				vec3 rayEnd = normalize( worldPos.xyz ) * 1e5;
				vec3 lineDir = worldEnd - worldStart;
				vec2 params = closestLineToLine( worldStart, worldEnd, vec3( 0.0, 0.0, 0.0 ), rayEnd );

				vec3 p1 = worldStart + lineDir * params.x;
				vec3 p2 = rayEnd * params.y;
				vec3 delta = p1 - p2;
				float len = length( delta );
				float norm = len / linewidth;

				#ifndef USE_DASH

					#ifdef USE_ALPHA_TO_COVERAGE

						float dnorm = fwidth( norm );
						alpha = 1.0 - smoothstep( 0.5 - dnorm, 0.5 + dnorm, norm );

					#else

						if ( norm > 0.5 ) {

							discard;

						}

					#endif

				#endif

			#else

				#ifdef USE_ALPHA_TO_COVERAGE

					// artifacts appear on some hardware if a derivative is taken within a conditional
					float a = vUv.x;
					float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
					float len2 = a * a + b * b;
					float dlen = fwidth( len2 );

					if ( abs( vUv.y ) > 1.0 ) {

						alpha = 1.0 - smoothstep( 1.0 - dlen, 1.0 + dlen, len2 );

					}

				#else

					if ( abs( vUv.y ) > 1.0 ) {

						float a = vUv.x;
						float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
						float len2 = a * a + b * b;

						if ( len2 > 1.0 ) discard;

					}

				#endif

			#endif

			#include <logdepthbuf_fragment>
			#include <color_fragment>

			gl_FragColor = vec4( diffuseColor.rgb, alpha );

			#include <tonemapping_fragment>
			#include <colorspace_fragment>
			#include <fog_fragment>
			#include <premultiplied_alpha_fragment>

		}
		`};class xd extends zn{constructor(t){super({type:"LineMaterial",uniforms:ls.clone(mn.line.uniforms),vertexShader:mn.line.vertexShader,fragmentShader:mn.line.fragmentShader,clipping:!0}),this.isLineMaterial=!0,this.setValues(t)}get color(){return this.uniforms.diffuse.value}set color(t){this.uniforms.diffuse.value=t}get worldUnits(){return"WORLD_UNITS"in this.defines}set worldUnits(t){t===!0!==this.worldUnits&&(this.needsUpdate=!0),t===!0?this.defines.WORLD_UNITS="":delete this.defines.WORLD_UNITS}get linewidth(){return this.uniforms.linewidth.value}set linewidth(t){this.uniforms.linewidth&&(this.uniforms.linewidth.value=t)}get dashed(){return"USE_DASH"in this.defines}set dashed(t){t===!0!==this.dashed&&(this.needsUpdate=!0),t===!0?this.defines.USE_DASH="":delete this.defines.USE_DASH}get dashScale(){return this.uniforms.dashScale.value}set dashScale(t){this.uniforms.dashScale.value=t}get dashSize(){return this.uniforms.dashSize.value}set dashSize(t){this.uniforms.dashSize.value=t}get dashOffset(){return this.uniforms.dashOffset.value}set dashOffset(t){this.uniforms.dashOffset.value=t}get gapSize(){return this.uniforms.gapSize.value}set gapSize(t){this.uniforms.gapSize.value=t}get opacity(){return this.uniforms.opacity.value}set opacity(t){this.uniforms&&(this.uniforms.opacity.value=t)}get resolution(){return this.uniforms.resolution.value}set resolution(t){this.uniforms.resolution.value.copy(t)}get alphaToCoverage(){return"USE_ALPHA_TO_COVERAGE"in this.defines}set alphaToCoverage(t){this.defines&&(t===!0!==this.alphaToCoverage&&(this.needsUpdate=!0),t===!0?this.defines.USE_ALPHA_TO_COVERAGE="":delete this.defines.USE_ALPHA_TO_COVERAGE)}}const nc=new Mn,xo=new $;class vd extends jp{constructor(){super(),this.isLineSegmentsGeometry=!0,this.type="LineSegmentsGeometry";const t=[-1,2,0,1,2,0,-1,1,0,1,1,0,-1,0,0,1,0,0,-1,-1,0,1,-1,0],n=[-1,2,1,2,-1,1,1,1,-1,-1,1,-1,-1,-2,1,-2],i=[0,2,1,2,3,1,2,4,3,4,5,3,4,6,5,6,7,5];this.setIndex(i),this.setAttribute("position",new kr(t,3)),this.setAttribute("uv",new kr(n,2))}applyMatrix4(t){const n=this.attributes.instanceStart,i=this.attributes.instanceEnd;return n!==void 0&&(n.applyMatrix4(t),i.applyMatrix4(t),n.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}setPositions(t){let n;t instanceof Float32Array?n=t:Array.isArray(t)&&(n=new Float32Array(t));const i=new Ga(n,6,1);return this.setAttribute("instanceStart",new ji(i,3,0)),this.setAttribute("instanceEnd",new ji(i,3,3)),this.instanceCount=this.attributes.instanceStart.count,this.computeBoundingBox(),this.computeBoundingSphere(),this}setColors(t){let n;t instanceof Float32Array?n=t:Array.isArray(t)&&(n=new Float32Array(t));const i=new Ga(n,6,1);return this.setAttribute("instanceColorStart",new ji(i,3,0)),this.setAttribute("instanceColorEnd",new ji(i,3,3)),this}fromWireframeGeometry(t){return this.setPositions(t.attributes.position.array),this}fromEdgesGeometry(t){return this.setPositions(t.attributes.position.array),this}fromMesh(t){return this.fromWireframeGeometry(new Zp(t.geometry)),this}fromLineSegments(t){const n=t.geometry;return this.setPositions(n.attributes.position.array),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Mn);const t=this.attributes.instanceStart,n=this.attributes.instanceEnd;t!==void 0&&n!==void 0&&(this.boundingBox.setFromBufferAttribute(t),nc.setFromBufferAttribute(n),this.boundingBox.union(nc))}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new us),this.boundingBox===null&&this.computeBoundingBox();const t=this.attributes.instanceStart,n=this.attributes.instanceEnd;if(t!==void 0&&n!==void 0){const i=this.boundingSphere.center;this.boundingBox.getCenter(i);let r=0;for(let o=0,a=t.count;o<a;o++)xo.fromBufferAttribute(t,o),r=Math.max(r,i.distanceToSquared(xo)),xo.fromBufferAttribute(n,o),r=Math.max(r,i.distanceToSquared(xo));this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error("THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.",this)}}toJSON(){}}const xa=new Wt,ic=new $,rc=new $,Zt=new Wt,Jt=new Wt,Hn=new Wt,va=new $,Sa=new yn,Qt=new Jp,oc=new $,vo=new Mn,So=new us,Wn=new Wt;let $n,Ui;function ac(e,t,n){return Wn.set(0,0,-t,1).applyMatrix4(e.projectionMatrix),Wn.multiplyScalar(1/Wn.w),Wn.x=Ui/n.width,Wn.y=Ui/n.height,Wn.applyMatrix4(e.projectionMatrixInverse),Wn.multiplyScalar(1/Wn.w),Math.abs(Math.max(Wn.x,Wn.y))}function fS(e,t){const n=e.matrixWorld,i=e.geometry,r=i.attributes.instanceStart,o=i.attributes.instanceEnd,a=Math.min(i.instanceCount,r.count);for(let s=0,l=a;s<l;s++){Qt.start.fromBufferAttribute(r,s),Qt.end.fromBufferAttribute(o,s),Qt.applyMatrix4(n);const c=new $,h=new $;$n.distanceSqToSegment(Qt.start,Qt.end,h,c),h.distanceTo(c)<Ui*.5&&t.push({point:h,pointOnLine:c,distance:$n.origin.distanceTo(h),object:e,face:null,faceIndex:s,uv:null,uv1:null})}}function pS(e,t,n){const i=t.projectionMatrix,o=e.material.resolution,a=e.matrixWorld,s=e.geometry,l=s.attributes.instanceStart,c=s.attributes.instanceEnd,h=Math.min(s.instanceCount,l.count),d=-t.near;$n.at(1,Hn),Hn.w=1,Hn.applyMatrix4(t.matrixWorldInverse),Hn.applyMatrix4(i),Hn.multiplyScalar(1/Hn.w),Hn.x*=o.x/2,Hn.y*=o.y/2,Hn.z=0,va.copy(Hn),Sa.multiplyMatrices(t.matrixWorldInverse,a);for(let u=0,m=h;u<m;u++){if(Zt.fromBufferAttribute(l,u),Jt.fromBufferAttribute(c,u),Zt.w=1,Jt.w=1,Zt.applyMatrix4(Sa),Jt.applyMatrix4(Sa),Zt.z>d&&Jt.z>d)continue;if(Zt.z>d){const A=Zt.z-Jt.z,v=(Zt.z-d)/A;Zt.lerp(Jt,v)}else if(Jt.z>d){const A=Jt.z-Zt.z,v=(Jt.z-d)/A;Jt.lerp(Zt,v)}Zt.applyMatrix4(i),Jt.applyMatrix4(i),Zt.multiplyScalar(1/Zt.w),Jt.multiplyScalar(1/Jt.w),Zt.x*=o.x/2,Zt.y*=o.y/2,Jt.x*=o.x/2,Jt.y*=o.y/2,Qt.start.copy(Zt),Qt.start.z=0,Qt.end.copy(Jt),Qt.end.z=0;const x=Qt.closestPointToPointParameter(va,!0);Qt.at(x,oc);const f=xi.lerp(Zt.z,Jt.z,x),p=f>=-1&&f<=1,M=va.distanceTo(oc)<Ui*.5;if(p&&M){Qt.start.fromBufferAttribute(l,u),Qt.end.fromBufferAttribute(c,u),Qt.start.applyMatrix4(a),Qt.end.applyMatrix4(a);const A=new $,v=new $;$n.distanceSqToSegment(Qt.start,Qt.end,v,A),n.push({point:v,pointOnLine:A,distance:$n.origin.distanceTo(v),object:e,face:null,faceIndex:u,uv:null,uv1:null})}}}class hS extends jt{constructor(t=new vd,n=new xd({color:Math.random()*16777215})){super(t,n),this.isLineSegments2=!0,this.type="LineSegments2"}computeLineDistances(){const t=this.geometry,n=t.attributes.instanceStart,i=t.attributes.instanceEnd,r=new Float32Array(2*n.count);for(let a=0,s=0,l=n.count;a<l;a++,s+=2)ic.fromBufferAttribute(n,a),rc.fromBufferAttribute(i,a),r[s]=s===0?0:r[s-1],r[s+1]=r[s]+ic.distanceTo(rc);const o=new Ga(r,2,1);return t.setAttribute("instanceDistanceStart",new ji(o,1,0)),t.setAttribute("instanceDistanceEnd",new ji(o,1,1)),this}raycast(t,n){const i=this.material.worldUnits,r=t.camera;if(r===null&&!i&&console.error('LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.'),i===!1&&(this.material.resolution.x===0||this.material.resolution.y===0))return;const o=t.params.Line2!==void 0&&t.params.Line2.threshold||0;$n=t.ray;const a=this.matrixWorld,s=this.geometry,l=this.material;Ui=l.linewidth+o,s.boundingSphere===null&&s.computeBoundingSphere(),So.copy(s.boundingSphere).applyMatrix4(a);let c;if(i)c=Ui*.5;else{const d=Math.max(r.near,So.distanceToPoint($n.origin));c=ac(r,d,l.resolution)}if(So.radius+=c,$n.intersectsSphere(So)===!1)return;s.boundingBox===null&&s.computeBoundingBox(),vo.copy(s.boundingBox).applyMatrix4(a);let h;if(i)h=Ui*.5;else{const d=Math.max(r.near,vo.distanceToPoint($n.origin));h=ac(r,d,l.resolution)}vo.expandByScalar(h),$n.intersectsBox(vo)!==!1&&(i?fS(this,n):pS(this,r,n))}onBeforeRender(t){const n=this.material.uniforms;n&&n.resolution&&(t.getViewport(xa),this.material.uniforms.resolution.value.set(xa.z,xa.w))}}const Ze={preset:"SK",groundColor:12045488,groundOpacity:.28,groundRenderOrder:-20,background:12576251,drawingColor:1452079,drawingLineWidth:1.6,drawingPlaneLift:.08,drawingRenderOrder:20,gridMinorColor:9083791,gridMajorColor:7307894,axisLineWidth:2.8,axisNegativeLineWidth:1.4,axisNegativeDashSize:12,axisNegativeGapSize:7,axisX:13893632,axisY:40960,axisZ:19416};function sc(e){const t=new Mt(e);return new $(t.r,t.g,t.b)}function di(e,t=0){const n=Number(e);return Number.isFinite(n)?n:t}function mS(e,t){const n=Math.max(0,di(t,0));n<=0||(e.userData.webcadDepthBias=n,e.onBeforeCompile=i=>{const r="gl_Position = clip;";i.vertexShader.includes(r)&&(i.vertexShader=i.vertexShader.replace(r,`${r}
			gl_Position.z -= ${n.toExponential(8)} * gl_Position.w;`))},e.customProgramCacheKey=()=>`webcad-line-depth-bias:${n}`,e.needsUpdate=!0)}function at(e){e&&e.traverse?.(t=>{t.geometry?.dispose?.(),Array.isArray(t.material)?t.material.forEach(n=>n.dispose?.()):t.material?.dispose?.()})}function Kt(e,t={}){const n=[],i=new Mn;for(const l of Array.isArray(e)?e:[]){const c=l?.start,h=l?.end;if(!c||!h)continue;const d=new $(di(c.x),di(c.y),di(c.z)),u=new $(di(h.x),di(h.y),di(h.z));n.push(d.x,d.y,d.z,u.x,u.y,u.z),i.expandByPoint(d),i.expandByPoint(u)}const r=new vd;r.setPositions(n);const o={color:t.color??Ze.drawingColor,depthTest:t.depthTest!==!1,depthWrite:t.depthWrite!==!1,linewidth:t.linewidth??Ze.drawingLineWidth,dashed:t.dashed===!0,opacity:t.opacity??1,transparent:t.transparent===!0,worldUnits:!1};t.depthFunc!==void 0&&(o.depthFunc=t.depthFunc),t.dashed===!0&&(o.dashSize=t.dashSize??Ze.axisNegativeDashSize,o.gapSize=t.gapSize??Ze.axisNegativeGapSize);const a=new xd(o);t.polygonOffset!==void 0&&(a.polygonOffset=t.polygonOffset===!0,a.polygonOffsetFactor=di(t.polygonOffsetFactor,0),a.polygonOffsetUnits=di(t.polygonOffsetUnits,0)),mS(a,t.depthBias);const s=new hS(r,a);return Number.isFinite(t.renderOrder)&&(s.renderOrder=t.renderOrder),s.computeLineDistances(),s.userData.segmentCount=n.length/6,s.userData.bounds=i.isEmpty()?null:i,s}function Xi(e,t,n){if(!e)return;const i=Math.max(1,Math.round(t||1)),r=Math.max(1,Math.round(n||1));e.traverse?.(o=>{o.material?.isLineMaterial&&o.material.resolution.set(i,r)})}function gS(e){const t=Math.max(1e-4,e),n=10**Math.floor(Math.log10(t)),i=t/n;return i<=1?n:i<=2?2*n:i<=5?5*n:10*n}function _S(e,t){return new zn({depthWrite:!1,extensions:{derivatives:!0},side:tn,transparent:!0,uniforms:{majorAlpha:{value:.42},majorColor:{value:sc(Ze.gridMajorColor)},majorStep:{value:t},majorWidth:{value:1.15},minorAlpha:{value:.24},minorColor:{value:sc(Ze.gridMinorColor)},minorStep:{value:e},minorWidth:{value:.9}},vertexShader:`
      varying vec2 vGridXY;

      void main() {
        vGridXY = position.xy;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,fragmentShader:`
      varying vec2 vGridXY;
      uniform float majorAlpha;
      uniform vec3 majorColor;
      uniform float majorStep;
      uniform float majorWidth;
      uniform float minorAlpha;
      uniform vec3 minorColor;
      uniform float minorStep;
      uniform float minorWidth;

      float gridLine(float step, float width) {
        vec2 coord = vGridXY / step;
        vec2 grid = abs(fract(coord - 0.5) - 0.5) / fwidth(coord);
        float line = min(grid.x, grid.y);
        return 1.0 - min(line / width, 1.0);
      }

      void main() {
        float minorLine = gridLine(minorStep, minorWidth);
        float majorLine = gridLine(majorStep, majorWidth);
        float alpha = max(minorLine * minorAlpha, majorLine * majorAlpha);
        vec3 color = mix(minorColor, majorColor, majorLine);
        if (alpha < 0.01) discard;
        gl_FragColor = vec4(color, alpha);
      }
    `})}function Sd(e){const t=Math.max(2e3,e*80),n=gS(Math.max(e,50)/7);return{lineLimit:Math.max(10,Math.ceil(t/n)*n),minorStep:n}}function Ed(e=new $,t=20){const{lineLimit:n}=Sd(t),i=new Mt(Ze.background).lerp(new Mt(Ze.groundColor),Ze.groundOpacity),r=new jt(new Qr(n*2,n*2),new dr({color:i,depthTest:!1,depthWrite:!1,side:tn,transparent:!1}));return r.name="webcad-3d-sk-ground",r.position.set(e.x,e.y,-.001),r.renderOrder=Ze.groundRenderOrder,r.userData.isSketchGround=!0,r}function xS(e=new $,t=20,n={}){const i=new qt;i.name="webcad-3d-grid";const{lineLimit:r,minorStep:o}=Sd(t),a=o*5;n.includeGround!==!1&&i.add(Ed(e,t));const s=new jt(new Qr(r*2,r*2),_S(o,a));return s.name="webcad-3d-grid-minor",s.position.set(e.x,e.y,.001),s.renderOrder=Ze.groundRenderOrder+1,s.userData.isSketchGridLine=!0,i.add(s),i.userData.preset=Ze.preset,i.userData.step=o,i.userData.extent=r,yd(i,n.visible!==!1),i}function yd(e,t){if(!e)return;const n=t!==!1;e.visible=!0,e.traverse?.(i=>{i.userData?.isSketchGridLine&&(i.visible=n),i.userData?.isSketchGround&&(i.visible=!0)}),e.userData.gridLinesVisible=n}function Ea(e,t,n,i){const r=new qt;r.name=`webcad-3d-axis-${i}`;const o=e.clone().normalize(),a=Kt([{start:{x:0,y:0,z:0},end:{x:o.x*n,y:o.y*n,z:o.z*n}}],{color:t,linewidth:Ze.axisLineWidth});a.name=`webcad-3d-axis-${i}-positive`;const s=Kt([{start:{x:0,y:0,z:0},end:{x:-o.x*n,y:-o.y*n,z:-o.z*n}}],{color:t,dashSize:Ze.axisNegativeDashSize,dashed:!0,gapSize:Ze.axisNegativeGapSize,linewidth:Ze.axisNegativeLineWidth});return s.name=`webcad-3d-axis-${i}-negative`,s.userData.negativeAxis=!0,r.add(a,s),r}function vS(e=20){const t=Math.max(2e3,e*80),n=new qt;return n.name="webcad-3d-axes",n.add(Ea(new $(1,0,0),Ze.axisX,t,"x"),Ea(new $(0,1,0),Ze.axisY,t,"y"),Ea(new $(0,0,1),Ze.axisZ,t*.72,"z")),n.userData.preset=Ze.preset,n.userData.extent=t,n}function SS(e,t){return e?.id??e?.handle??`${e?.type??"ENTITY"}-${t}`}function ES(e,t={}){const n=lS(e,t);if(!n.length)return null;const i=Kt(n,{color:t.color??Ze.drawingColor,depthTest:!0,depthWrite:!1,linewidth:t.linewidth??Ze.drawingLineWidth,renderOrder:Ze.drawingRenderOrder,transparent:!0});return i.position.z=t.visualLift??Ze.drawingPlaneLift,i.renderOrder=Ze.drawingRenderOrder,i.name=`webcad-entity-${e?.type??"unknown"}`,i.userData.entity=e,i.userData.entityType=e?.type??null,i.userData.sourceSegments=n,i.userData.selectable=!0,i}function yS(e,t={}){const n=new qt;n.name="webcad-3d-entities";const i=new Mn;let r=0,o=0;return _d(e).forEach((a,s)=>{const l=ES(a,t);l&&(l.userData.entityKey=SS(a,s),n.add(l),o+=1,r+=l.userData.segmentCount||0,l.userData.bounds&&i.union(l.userData.bounds))}),n.userData.bounds=i.isEmpty()?null:i,n.userData.entityCount=o,n.userData.segmentCount=r,n}const Fn=Math.PI*2,MS=32,bS={type:"plane",origin:{x:0,y:0,z:0},normal:{x:0,y:0,z:1},xAxis:{x:1,y:0,z:0}};function wt(e){const t=Number(e);return Number.isFinite(t)?t:null}function Ft(e,t=0){const n=wt(e?.x),i=wt(e?.y),r=e?.z===void 0?t:wt(e.z);return n===null||i===null||r===null?null:{x:n,y:i,z:r}}function Rn(e){return e===void 0?void 0:JSON.parse(JSON.stringify(e))}function en(e){const t=Number(e)%Fn;return t<0?t+Fn:t}function lc(e,t){return en(Math.atan2(t.y-e.y,t.x-e.x))}function sr(e,t,n=!0){return en(n?t-e:e-t)}function cc(e,t,n=!0){return(n?1:-1)*sr(e,t,n)}function jn(e,t,n){return{x:e.x+Math.cos(n)*t,y:e.y+Math.sin(n)*t,z:e.z||0}}function On(e,t,n,i,r){const o=Math.cos(i),a=Math.sin(i),s=Math.cos(r)*t,l=Math.sin(r)*n;return{x:e.x+s*o-l*a,y:e.y+s*a+l*o,z:e.z||0}}function qr(e,t,n=1e-9){return Math.hypot((e?.x??0)-(t?.x??0),(e?.y??0)-(t?.y??0),(e?.z??0)-(t?.z??0))<=n}function AS(e){const t=e?.id??e?.handle??null;return{entityId:t===void 0?null:t,entityType:e?.type??null}}function vi(e,t="outer"){const n={type:"exact-profile-loop",role:t,closed:!0,segments:e};return n.bounds=bd(n),n.orientation=DS(n),n}function hr(e,t,n={}){const i=(n.innerLoops||[]).map((o,a)=>vi(Rn(o.segments||o),`inner-${a}`)),r={type:"exact-profile",version:1,id:n.id??e?.id??e?.handle??null,closed:!0,plane:Rn(n.plane??bS),source:AS(e),outerLoop:vi(t,"outer"),innerLoops:i};return r.segments=r.outerLoop.segments,r.bounds=RS(r),r.orientation={outer:r.outerLoop.orientation,inner:r.innerLoops.map(o=>o.orientation)},r}function zr(e,t){return t?e?(e.minX=Math.min(e.minX,t.x),e.minY=Math.min(e.minY,t.y),e.maxX=Math.max(e.maxX,t.x),e.maxY=Math.max(e.maxY,t.y),e):{minX:t.x,minY:t.y,maxX:t.x,maxY:t.y}:e}function TS(e,t,n,i=!0,r=1e-12){const o=sr(t,n,i);return en(i?e-t:t-e)<=o+r}function PS(e){let t=null;return t=zr(t,e.start),t=zr(t,e.end),[0,Math.PI*.5,Math.PI,Math.PI*1.5].forEach(n=>{TS(n,e.startAngle,e.endAngle,e.clockwise)&&(t=zr(t,jn(e.center,e.radius,n)))}),t}function uc(e){const t=Math.cos(e.rotation||0),n=Math.sin(e.rotation||0),i=Math.hypot(e.radiusX*t,e.radiusY*n),r=Math.hypot(e.radiusX*n,e.radiusY*t);return{minX:e.center.x-i,minY:e.center.y-r,maxX:e.center.x+i,maxY:e.center.y+r}}function Md(e,t){return e?t?{minX:Math.min(e.minX,t.minX),minY:Math.min(e.minY,t.minY),maxX:Math.max(e.maxX,t.maxX),maxY:Math.max(e.maxY,t.maxY)}:{...e}:t?{...t}:null}function wS(e){return e.type==="line"?zr(zr(null,e.start),e.end):e.type==="arc-circle"?PS(e):e.type==="circle"?{minX:e.center.x-e.radius,minY:e.center.y-e.radius,maxX:e.center.x+e.radius,maxY:e.center.y+e.radius}:e.type==="ellipse"||e.type==="arc-ellipse"?uc(e):null}function bd(e){return e.segments.reduce((t,n)=>Md(t,wS(n)),null)}function RS(e){return[e.outerLoop,...e.innerLoops||[]].reduce((t,n)=>Md(t,n.bounds||bd(n)),null)}function CS(e){if(e.type==="line")return .5*(e.start.x*e.end.y-e.end.x*e.start.y);if(e.type==="arc-circle"){const t=cc(e.startAngle,e.endAngle,e.clockwise);return .5*(e.center.x*(e.end.y-e.start.y)-e.center.y*(e.end.x-e.start.x)+e.radius*e.radius*t)}if(e.type==="circle")return(e.clockwise===!1?-1:1)*Math.PI*e.radius*e.radius;if(e.type==="ellipse")return(e.clockwise===!1?-1:1)*Math.PI*e.radiusX*e.radiusY;if(e.type==="arc-ellipse"){const t=cc(e.startAngle,e.endAngle,e.clockwise);return .5*(e.center.x*(e.end.y-e.start.y)-e.center.y*(e.end.x-e.start.x)+e.radiusX*e.radiusY*t)}return 0}function IS(e){return e.segments.reduce((t,n)=>t+CS(n),0)}function DS(e){const t=IS(e);return Math.abs(t)<=1e-9?null:t>0?"ccw":"cw"}function bs(e,t){return{type:"line",start:e,end:t}}function zo(e,t,n){const i=Ft(n?.center);if(!i)return null;const r=Math.hypot(e.x-i.x,e.y-i.y),o=Math.hypot(t.x-i.x,t.y-i.y),a=(r+o)*.5;return!Number.isFinite(a)||a<=1e-9||Math.abs(r-o)>1e-6?null:{type:"arc-circle",center:i,radius:a,startAngle:lc(i,e),endAngle:lc(i,t),clockwise:n.clockwise!==!1,start:e,end:t}}function Ad(e){return e.type==="circle"||e.type==="ellipse"?null:e.start||null}function Td(e){return e.type==="circle"||e.type==="ellipse"?null:e.end||null}function As(e){if(e.length===1&&["circle","ellipse"].includes(e[0].type))return!0;for(let t=0;t<e.length;t+=1){const n=Td(e[t]),i=Ad(e[(t+1)%e.length]);if(!n||!i||!qr(n,i))return!1}return!0}function LS(e,t){const n=Math.max(Number(t)||0,0);if(!(n>0))return e;for(let i=0;i<e.length;i+=1){const r=e[i],o=e[(i+1)%e.length],a=Td(r),s=Ad(o);if(!(!a||!s||qr(a,s))){if(!qr(a,s,n))return null;if(r.type==="line"){r.end=Rn(s);continue}if(o.type==="line"){o.start=Rn(a);continue}return null}}return e}function NS(e){return e.type==="line"?{...e,start:Rn(e.end),end:Rn(e.start)}:e.type==="arc-circle"||e.type==="arc-ellipse"?{...e,start:Rn(e.end),end:Rn(e.start),startAngle:e.endAngle,endAngle:e.startAngle,clockwise:e.clockwise===!1}:e.type==="circle"||e.type==="ellipse"?{...e,clockwise:e.clockwise===!1}:Rn(e)}function US(e){const t=e.segments.slice().reverse().map(NS);return vi(t,e.role)}function FS(e,t){return!t||!e.orientation||e.orientation!==t?e:US(e)}function OS(e,t={}){const n=Ft(e.center),i=wt(e.radius);return!n||i===null||i<=0?null:vi([{type:"circle",center:n,radius:i,normal:{x:0,y:0,z:1},clockwise:t.clockwise!==!1}],t.role||"outer")}function zS(e,t={}){if(e?.type!=="POLYLINE"||!Array.isArray(e.vertices)||e.vertices.length<3)return null;const n=e.vertices.map(s=>Ft(s));if(n.some(s=>!s))return null;const i=qr(n[0],n[n.length-1]);if(t.requireClosed!==!1&&!e.closed&&!i)return null;const r=i?n.slice(0,-1):n,o=e.closed?r.length:Math.max(0,r.length-1);if(o<3)return null;const a=[];for(let s=0;s<o;s+=1){const l=r[s],c=r[(s+1)%r.length],h=e.segments?.[s]??{type:"LINE"},d=h.type==="ARC"?zo(l,c,h):bs(l,c);if(!d)return null;a.push(d)}return vi(a,t.role||"outer")}function BS(e,t={}){const n=Ft(e.center),i=wt(e.radiusX??e.majorRadius),r=wt(e.radiusY??e.minorRadius),o=wt(e.rotation)??0;if(!n||i===null||r===null||i<=0||r<=0)return null;if(e.type==="ELLIPSE_ARC"||e.startAngle!==void 0||e.endAngle!==void 0||e.startParameter!==void 0||e.endParameter!==void 0){const s=en(e.startParameter??e.startAngle??0),l=en(e.endParameter??e.endAngle??Fn);return vi([{type:"arc-ellipse",center:n,radiusX:i,radiusY:r,rotation:o,startAngle:s,endAngle:l,clockwise:e.clockwise!==!1,start:On(n,i,r,o,s),end:On(n,i,r,o,l)}],t.role||"outer")}return vi([{type:"ellipse",center:n,radiusX:i,radiusY:r,rotation:o,normal:{x:0,y:0,z:1},clockwise:t.clockwise!==!1}],t.role||"outer")}function GS(e,t={}){if(e?.type!=="CIRCLE")return null;const n=OS(e,{...t,role:"outer"});return n?hr(e,n.segments,t):null}function VS(e,t={}){const n=zS(e,{...t,role:"outer"});return n?hr(e,n.segments,t):null}function kS(e,t={}){if(e?.type!=="ELLIPSE")return null;const n=BS(e,{...t,role:"outer"});return n?hr(e,n.segments,t):null}function HS(e,t={}){if(!Array.isArray(e)||e.length<2)return null;const n=[];for(const i of e){const r=i?.entity||i,o=!!i?.reversed;if(r?.type==="LINE"){const a=Ft(r.start),s=Ft(r.end);if(!a||!s)return null;n.push(bs(o?s:a,o?a:s));continue}if(r?.type==="ARC"){const a=Ft(r.center),s=wt(r.radius);if(!a||s===null||s<=0)return null;const l=jn(a,s,r.startAngle),c=jn(a,s,r.endAngle),u=zo(o?c:l,o?l:c,{center:a,clockwise:o?r.clockwise===!1:r.clockwise!==!1});if(!u)return null;n.push(u);continue}if(r?.type==="ELLIPSE_ARC"){const a=Ft(r.center),s=wt(r.radiusX),l=wt(r.radiusY),c=wt(r.rotation)??0,h=en(r.startParameter),d=en(r.endParameter);if(!a||s===null||l===null||s<=0||l<=0)return null;const u=o?d:h,m=o?h:d;n.push({type:"arc-ellipse",center:a,radiusX:s,radiusY:l,rotation:c,startAngle:u,endAngle:m,clockwise:o?r.clockwise===!1:r.clockwise!==!1,start:On(a,s,l,c,u),end:On(a,s,l,c,m)});continue}return null}return As(n)?hr({id:t.id??null,type:"COMPOSITE_PROFILE"},n,t):null}function WS(e){const t=e?.entity||e,n=t?.type==="CIRCLE"||t?.type==="ELLIPSE",i=Number(e?.startParameter??0),r=Number(e?.endParameter??1),o=n?i:Math.max(0,Math.min(1,i)),a=n?r:Math.max(0,Math.min(1,r));if(t?.type==="LINE"){const s=Ft(t.start),l=Ft(t.end);return!s||!l?null:bs({x:s.x+(l.x-s.x)*o,y:s.y+(l.y-s.y)*o,z:s.z+(l.z-s.z)*o},{x:s.x+(l.x-s.x)*a,y:s.y+(l.y-s.y)*a,z:s.z+(l.z-s.z)*a})}if(t?.type==="ARC"){const s=Ft(t.center),l=wt(t.radius);if(!s||l===null||l<=0)return null;const c=t.clockwise===!1?-1:1,h=sr(t.startAngle,t.endAngle,t.clockwise!==!1),d=en(t.startAngle+c*h*o),u=en(t.startAngle+c*h*a);return zo(jn(s,l,d),jn(s,l,u),{center:s,clockwise:a<o?t.clockwise===!1:t.clockwise!==!1})}if(t?.type==="CIRCLE"){const s=Ft(t.center),l=wt(t.radius);if(!s||l===null||l<=0)return null;const c=en(Fn*o),h=en(Fn*a);return zo(jn(s,l,c),jn(s,l,h),{center:s,clockwise:a>=o})}if(t?.type==="ELLIPSE_ARC"){const s=Ft(t.center),l=wt(t.radiusX),c=wt(t.radiusY),h=wt(t.rotation)??0;if(!s||l===null||c===null||l<=0||c<=0)return null;const d=t.clockwise!==!1,u=a<o?!d:d,m=d?1:-1,S=sr(t.startParameter,t.endParameter,d),x=en(t.startParameter+m*S*o),f=en(t.startParameter+m*S*a);return{type:"arc-ellipse",center:s,radiusX:l,radiusY:c,rotation:h,startAngle:x,endAngle:f,clockwise:u,start:On(s,l,c,h,x),end:On(s,l,c,h,f)}}if(t?.type==="ELLIPSE"){const s=Ft(t.center),l=wt(t.radiusX),c=wt(t.radiusY),h=wt(t.rotation)??0;if(!s||l===null||c===null||l<=0||c<=0)return null;const d=en(Fn*o),u=en(Fn*a);return{type:"arc-ellipse",center:s,radiusX:l,radiusY:c,rotation:h,startAngle:d,endAngle:u,clockwise:a>=o,start:On(s,l,c,h,d),end:On(s,l,c,h,u)}}return null}function dc(e,t){if(!e||!t||e.entity!==t.entity||e.endHasSemanticJunction||t.startHasSemanticJunction)return null;const n=Math.sign(e.endParameter-e.startParameter),i=Math.sign(t.endParameter-t.startParameter);if(!n||n!==i)return null;const r=e.entity?.type==="CIRCLE"||e.entity?.type==="ELLIPSE";let o=t.startParameter,a=t.endParameter;if(r){const s=Math.round(e.endParameter-o);o+=s,a+=s}return Math.abs(e.endParameter-o)>1e-10||r&&Math.abs(a-e.startParameter)>=1-1e-10?null:{...e,endParameter:a,endHasSemanticJunction:t.endHasSemanticJunction}}function XS(e){const t=[];if(e.forEach(n=>{const i={...n,startParameter:Number(n?.startParameter??0),endParameter:Number(n?.endParameter??1)},r=t[t.length-1],o=dc(r,i);if(o){t[t.length-1]=o;return}t.push(i)}),t.length>1){const n=dc(t.at(-1),t[0]);if(n)return[n,...t.slice(1,-1)]}return t}function YS(e,t={}){if(!Array.isArray(e)||e.length<2)return null;const n=LS(XS(e).map(WS),t.tolerance);return!n||n.some(i=>!i)||!As(n)?null:hr({id:t.id??null,type:"COMPOSITE_PROFILE"},n,t)}function Pd(e,t={}){return e?.type==="CIRCLE"?GS(e,t):e?.type==="POLYLINE"?VS(e,t):e?.type==="ELLIPSE"?kS(e,t):null}function $S(e,t=[],n={}){if(!Bo(e))return null;const i=vi(Rn(e.outerLoop?.segments||e.segments),"outer"),r=t.map((o,a)=>Bo(o)?FS(vi(Rn(o.outerLoop?.segments||o.segments),`inner-${a}`),i.orientation):null);return r.some(o=>!o)?null:hr({id:n.id??e.id??null,type:"COMPOSITE_PROFILE"},i.segments,{...n,innerLoops:r,plane:n.plane??e.plane})}function fc(e){return!e?.closed||!Array.isArray(e.segments)||!e.segments.length||!As(e.segments)?!1:e.segments.every(t=>t.type==="line"?!!(Ft(t.start)&&Ft(t.end)):t.type==="arc-circle"?!!(Ft(t.center)&&Ft(t.start)&&Ft(t.end)&&wt(t.radius)>0&&wt(t.startAngle)!==null&&wt(t.endAngle)!==null):t.type==="circle"?!!(Ft(t.center)&&wt(t.radius)>0):t.type==="ellipse"||t.type==="arc-ellipse"?!!(Ft(t.center)&&wt(t.radiusX)>0&&wt(t.radiusY)>0):!1)}function Bo(e,t={}){if(e?.type!=="exact-profile"||e.version!==1||t.requireClosed!==!1&&e.closed!==!0)return!1;const n=e.outerLoop||{closed:e.closed,segments:e.segments};return fc(n)?(Array.isArray(e.innerLoops)?e.innerLoops:[]).every(r=>fc(r)&&(!n.orientation||!r.orientation||r.orientation!==n.orientation)):!1}function qS(e){return Rn(e)}function pc(e,t={}){const n=Math.max(4,Math.trunc(Number(t.segments)||MS)),i=[],r=o=>{const a=Ft(o);a&&(!i.length||!qr(i[i.length-1],a))&&i.push(a)};return e.segments.forEach(o=>{if(o.type==="line"){r(o.start),r(o.end);return}if(o.type==="arc-circle"){const a=sr(o.startAngle,o.endAngle,o.clockwise),s=Math.max(2,Math.ceil(n*a/Fn)),l=o.clockwise===!1?-1:1;for(let c=0;c<=s;c+=1)r(jn(o.center,o.radius,o.startAngle+l*a*(c/s)));return}if(o.type==="circle"){for(let a=0;a<n;a+=1)r(jn(o.center,o.radius,Fn*a/n));r(jn(o.center,o.radius,0));return}if(o.type==="ellipse"){for(let a=0;a<n;a+=1)r(On(o.center,o.radiusX,o.radiusY,o.rotation||0,Fn*a/n));r(On(o.center,o.radiusX,o.radiusY,o.rotation||0,0));return}if(o.type==="arc-ellipse"){const a=sr(o.startAngle,o.endAngle,o.clockwise),s=Math.max(2,Math.ceil(n*a/Fn)),l=o.clockwise===!1?-1:1;for(let c=0;c<=s;c+=1)r(On(o.center,o.radiusX,o.radiusY,o.rotation||0,o.startAngle+l*a*c/s))}}),i}function wd(e,t={}){if(!Bo(e))return t.structured?{outerLoop:[],innerLoops:[]}:[];const n={outerLoop:pc(e.outerLoop||{segments:e.segments},t),innerLoops:(e.innerLoops||[]).map(i=>pc(i,t))};return t.structured||n.innerLoops.length?n:n.outerLoop}const KS={x:0,y:0,z:1},Rd=1e-9;function Ht(e){return e===void 0?void 0:JSON.parse(JSON.stringify(e))}function Co(e){const t=Number(e);return Number.isFinite(t)?t:null}function Cd(e,t=KS){const n=Co(e?.x),i=Co(e?.y),r=Co(e?.z);return n===null||i===null||r===null?t?{...t}:null:{x:n,y:i,z:r}}function jS(e){return Math.hypot(e.x,e.y,e.z)}function ZS(e){if(!e)return null;const t=jS(e);return t<=Rd?null:{x:e.x/t,y:e.y/t,z:e.z/t}}function Xa(e,t){return{x:e.x*t,y:e.y*t,z:e.z*t}}function JS(e,t){return{x:e.x+t.x,y:e.y+t.y,z:(e.z||0)+t.z}}function QS(e){return e.start||e.center||null}function e0(e,t,n,i,r){const o={loopRole:t,segmentIndex:n,sourceSegment:Ht(e),direction:Ht(i),distance:r};return e.type==="line"?{...o,type:"plane",kind:"line-extrusion-side",start:Ht(e.start),end:Ht(e.end)}:e.type==="circle"?{...o,type:"cylinder",kind:t==="outer"?"outer-side":"inner-side",center:Ht(e.center),radius:e.radius,axis:Ht(i),trimRole:t==="outer"?"outer":"inner"}:e.type==="arc-circle"?{...o,type:"linearExtrusionSurface",curveType:"arc-circle",center:Ht(e.center),radius:e.radius,startAngle:e.startAngle,endAngle:e.endAngle,clockwise:e.clockwise!==!1,start:Ht(e.start),end:Ht(e.end)}:e.type==="ellipse"?{...o,type:"ellipticCylinder",kind:t==="outer"?"outer-side":"inner-side",center:Ht(e.center),radiusX:e.radiusX,radiusY:e.radiusY,rotation:e.rotation||0,axis:Ht(i),trimRole:t==="outer"?"outer":"inner"}:e.type==="arc-ellipse"?{...o,type:"linearExtrusionSurface",curveType:"arc-ellipse",center:Ht(e.center),radiusX:e.radiusX,radiusY:e.radiusY,rotation:e.rotation||0,startAngle:e.startAngle,endAngle:e.endAngle,clockwise:e.clockwise!==!1,start:Ht(e.start),end:Ht(e.end)}:{...o,type:"linearExtrusionSurface",curveType:e.type}}function hc(e,t,n,i){return e.segments.map((r,o)=>e0(r,t,o,n,i))}function mc(e,t,n){return{type:"plane",role:t,plane:Ht(e.plane),offset:Ht(n),outerLoop:Ht(e.outerLoop),innerLoops:Ht(e.innerLoops||[]),trimRole:t}}function t0(e,t,n={}){const i=Co(t);if(!Bo(e)||i===null||Math.abs(i)<=Rd)return null;const r=ZS(Cd(n.direction));if(!r)return null;const o=Xa(r,i),a=qS(e),s=i<0?Xa(r,-1):r,l={type:"exact-extrusion",version:1,id:n.id??null,profile:a,direction:r,distance:i,offset:o,caps:{start:mc(a,"start",{x:0,y:0,z:0}),end:mc(a,"end",o)},sideSurfaces:{outer:hc(a.outerLoop,"outer",s,i),inner:a.innerLoops.map((c,h)=>({loopIndex:h,surfaces:hc(c,`inner-${h}`,s,i)}))},metadata:Ht(n.metadata??null)};return l.bounds=i0(l),l}function gc(e,t){return t?e?(e.minX=Math.min(e.minX,t.x),e.minY=Math.min(e.minY,t.y),e.minZ=Math.min(e.minZ,t.z||0),e.maxX=Math.max(e.maxX,t.x),e.maxY=Math.max(e.maxY,t.y),e.maxZ=Math.max(e.maxZ,t.z||0),e):{minX:t.x,minY:t.y,minZ:t.z||0,maxX:t.x,maxY:t.y,maxZ:t.z||0}:e}function n0(e){if(e.type==="line"||e.type==="arc-circle"||e.type==="arc-ellipse")return[e.start,e.end].filter(Boolean);if(e.type==="circle")return[{x:e.center.x-e.radius,y:e.center.y,z:e.center.z||0},{x:e.center.x+e.radius,y:e.center.y,z:e.center.z||0},{x:e.center.x,y:e.center.y-e.radius,z:e.center.z||0},{x:e.center.x,y:e.center.y+e.radius,z:e.center.z||0}];if(e.type==="ellipse"){const t=e.radiusX,n=e.radiusY;return[{x:e.center.x-t,y:e.center.y-n,z:e.center.z||0},{x:e.center.x+t,y:e.center.y+n,z:e.center.z||0}]}return[QS(e)].filter(Boolean)}function i0(e){if(!e?.profile)return null;const t=e.offset||Xa(Cd(e.direction),e.distance);let n=null;return[e.profile.outerLoop,...e.profile.innerLoops||[]].forEach(r=>{r.segments.forEach(o=>{n0(o).forEach(a=>{n=gc(n,a),n=gc(n,JS(a,t))})})}),n}const Io=1e-9;function _c(e,t){return Math.abs(e.x-t.x)<=Io&&Math.abs(e.y-t.y)<=Io&&Math.abs(e.z-t.z)<=Io}function r0(e){if(!Array.isArray(e))throw new TypeError("El perfil de extrusion debe ser un array de puntos");const t=[];for(const n of e){const i={x:Number(n?.x),y:Number(n?.y),z:n?.z===void 0?0:Number(n.z)};if(![i.x,i.y,i.z].every(Number.isFinite))throw new TypeError("El perfil de extrusion contiene coordenadas no validas");(!t.length||!_c(t[t.length-1],i))&&t.push(i)}if(t.length>1&&_c(t[0],t[t.length-1])&&t.pop(),t.length<3)throw new RangeError("La extrusion necesita al menos tres puntos utiles");return t}function xc(e,t,n={}){const i=Number(t);if(!Number.isFinite(i)||Math.abs(i)<=Io)throw new RangeError("La altura de extrusion debe ser distinta de cero");const r=r0(e),o=r.length,a=[...r,...r.map(d=>({...d,z:d.z+i}))],s=Array.from({length:o},(d,u)=>o-u-1),l=Array.from({length:o},(d,u)=>o+u),c=i>0?[s,l]:[s.reverse(),l.reverse()],h=[];for(let d=0;d<o;d+=1){const u=(d+1)%o,m=d,S=u,x=o+d,f=o+u;c.push(i>0?[m,S,f,x]:[m,x,f,S]),h.push([m,S],[x,f],[m,x])}return eo({vertices:a,faces:c,edges:h,metadata:{type:"extrusion",height:i,source:n.source??null}})}function Ts(e){return e===void 0?void 0:JSON.parse(JSON.stringify(e))}function vc(e){return new yn().fromArray(Wu(ri(e)))}function o0(e,t){return vc(e).invert().multiply(vc(t))}function Ya(e,t){const n=new $(Number(e?.x),Number(e?.y),Number(e?.z)||0).applyMatrix4(t);return{x:n.x,y:n.y,z:n.z}}function Do(e,t){const n=new $(Number(e?.x),Number(e?.y),Number(e?.z)).transformDirection(t);return{x:n.x,y:n.y,z:n.z}}function Br(e,t){if(!e?.plane)return null;const n=Ts(e);return n.plane={...n.plane,origin:Ya(e.plane.origin,t),xAxis:Do(e.plane.xAxis,t),normal:Do(e.plane.normal,t),...e.plane.yAxis?{yAxis:Do(e.plane.yAxis,t)}:{}},n}function a0(e,t){return!Array.isArray(e?.points)||e.points.length<3?null:{...Ts(e),points:e.points.map(n=>Ya(n,t)),holes:(e.holes??[]).map(n=>n.map(i=>Ya(i,t))),normal:Do(e.normal,t)}}function s0(e,t){if(e?.type!=="union"||!Number.isFinite(Number(e.distance)))return null;const n=e.exactProfile?Br(e.exactProfile,t):null,i=n?null:a0(e.inputFace,t);return!n&&!i?null:{...Ts(e),type:"union",distance:Number(e.distance),requestedDistance:Number.isFinite(Number(e.requestedDistance))?Number(e.requestedDistance):Number(e.distance),...n?{exactProfile:n}:{inputFace:i}}}function Id(e){const t=e?.metadata?.exactGeometry,n=t?.base??(t?.extrusion?t:null),i=n?.extrusion,r=i?.profile??n?.profile,o=Number(i?.distance??n?.distance);return r?.plane&&Number.isFinite(o)?{distance:o,profile:r}:null}function l0(e,t=new yn){const n=Id(e);if(!n)return null;const i=Br(n.profile,t);if(!i)return null;const r=[{profile:i,distance:n.distance,operationType:"union"}];for(const o of e?.metadata?.profileFeatures??[]){if(o?.exactProfile?.plane&&Number.isFinite(Number(o.distance))){const a=Br(o.exactProfile,t);if(!a)return null;r.push({profile:a,distance:Number(o.distance),operationType:o.type})}for(const a of o?.analyticProfiles??[]){if(!a?.profile?.plane||!Number.isFinite(Number(a.distance)))return null;const s=Br(a.profile,t);if(!s)return null;r.push({profile:s,distance:Number(a.distance),operationType:a.operationType??"union"})}}return r}function c0(e,t=new yn){const n=Id(e);if(!n)return null;const i=Br(n.profile,t);if(!i)return null;const r={type:"union",distance:n.distance,requestedDistance:n.distance,through:!1,tangentContact:!1,sketchId:e?.metadata?.sketchId??null,exactProfile:i},o=(e?.metadata?.profileFeatures??[]).map(a=>s0(a,t));return o.some(a=>!a)?null:[r,...o]}function Sc(e,t){return(e??[]).filter(n=>n?.solid&&n.visible!==!1&&n.locked!==!0&&!t.has(n.id))}function $a(e,t,n={}){if(!e||!t)return null;const i=ds(e,t,n);return i?.length===1?i[0]:null}function u0({records:e=[],solid:t,placement:n=Hu,sourceSolidDocumentId:i=null}={}){if(!t)return null;const r=i?e.find(d=>d?.id===i)??null:null;if(i&&!r)return null;let o=r,a=t,s=ri(r?.placement??n);const l=new Set(r?[r.id]:[]);let c=Sc(e,l),h=!0;for(;h;){h=!1;for(const d of c){let u=a,m=d.solid,S=s,x=d.placement;o||(u=d.solid,m=a,S=d.placement,x=s);const f=o0(S,x),p=c0(m,f);if(!p)continue;const M=$a(u,m,{operation:p.at(-1),operations:p,toolTransform:f.elements});if(M){a=M,s=ri(S),o||(o=d),l.add(d.id),c=Sc(e,l),h=!0;break}}}return{consumedSolidIds:[...l],merged:l.size>(r?1:0),placement:s,primaryRecord:o,solid:a}}function d0({doc:e,operation:t=null,placement:n=Hu,solid:i,sourceSolidDocumentId:r=null}={}){if(!e||!i)return null;const o=u0({records:e.model3d?.solids??[],solid:i,placement:n,sourceSolidDocumentId:r});if(!o)return null;const a=o.primaryRecord?.id??null;if(!a){const l=e.add3dSolid?.(o.solid,{operation:t,placement:o.placement})??null;return l?{...o,record:l}:null}e.recordHistory?.();const s=e.replace3dSolid?.(a,o.solid,{operation:t,placement:o.placement,recordHistory:!1})??null;return s?(o.consumedSolidIds.forEach(l=>{l!==a&&e.remove3dSolid?.(l,{recordHistory:!1})}),{...o,record:s}):null}const Cn=1e-6;let Ec=0;const Qe={edgeColor:0,edgeDepthBias:5e-5,edgeLineWidth:3.2,edgePolygonOffsetFactor:-2,edgePolygonOffsetUnits:-2,edgeRenderOrder:28,faceColor:16777215,hiddenEdgeColor:10726832,hiddenEdgeLineWidth:1.15,hiddenEdgeOpacity:.72,tangentEdgeColor:5201249,tangentEdgeLineWidth:1.25};function Dd(e){const t=e?.id??e?.handle??null;return t!=null?`${e?.type??e?.kind??"ENTITY"}:${t}`:null}function qa(e){return e?`solid-region:${e}`:null}function Ai(e){const t=qa(e?.analyticRegionId);if(t)return t;const n=e?.sourceEntity,i=Dd(n);return i?e?.sketchId?`${e.sketchId}:${i}`:i:e?.sourceSolidFaceIndex!==void 0&&e?.id?`solid-face:${e.id}`:e?.id?`face:${e.id}`:null}function lr(e){const t=Number(e);return!Number.isFinite(t)||Math.abs(t)<=1e-9?null:t}function Xt(e){const t=new $(Number(e?.x),Number(e?.y),Number(e?.z));return t.lengthSq()>1e-12?t.normalize():null}function Ld(e,t,n,i){const r=Number(i),o=Xt(n);if(!Dn(e)||!o||!Number.isFinite(r))return r;const a=Rt(t);if(![a.x,a.y,a.z].every(Number.isFinite))return r;const s=Ku(e);let l=r,c=s;return e.vertices.forEach(h=>{const d=Rt(h).sub(a).dot(o),u=Math.abs(d-r);u<=c&&(l=d,c=u)}),l}function Nd(){const e=globalThis.crypto?.randomUUID?.();return e?`analytic-region-${e}`:(Ec+=1,`analytic-region-runtime-${Ec}`)}function st(e){return e===void 0?void 0:JSON.parse(JSON.stringify(e))}function Eo(e,t,n){return{x:Number(e?.x)+t.x*n,y:Number(e?.y)+t.y*n,z:(Number(e?.z)||0)+t.z*n}}function Ud(e,t,n){const i={...e,points:(e?.points??[]).map(r=>Eo(r,t,-n)),holes:(e?.holes??[]).map(r=>r.map(o=>Eo(o,t,-n)))};return e?.workplane&&(i.workplane={...st(e.workplane),origin:Eo(e.workplane.origin,t,-n)}),e?.exactProfile?.plane&&(i.exactProfile=st(e.exactProfile),i.exactProfile.plane.origin=Eo(e.exactProfile.plane.origin,t,-n)),i}function Fd(e,t,n){const i=lr(n),r=Xt(t?.analyticAxis??t?.normal??t?.exactProfile?.plane?.normal);if(i===null||!r)return null;const o=r.multiplyScalar(Math.sign(i)),a=ju(e);return to(Ud(t,o,a),i+Math.sign(i)*a)}function Od(e,t,n,i={}){const r=Fd(e,t,n),o=$a(e,r,i);if(o)return o;const a=Xt(t?.analyticAxis??t?.normal??t?.exactProfile?.plane?.normal);if(!a)return null;const s=rn(e),l=to(Ud(t,a.multiplyScalar(Math.sign(n)),s),Number(n)+Math.sign(n)*s,{allowSubMinimumThickness:!0});return $a(e,l,i)}function ya(e,t={}){return{status:"unavailable",reason:e,...st(t)}}function zd(e,t={}){return{status:"pending",reason:e,...st(t)}}function f0(e,t){const n=e?.sourceEntity,i=e?.exactProfile?st(e.exactProfile):null;if(!n&&!i)return e?.sourceSolidFaceIndex!==void 0?zd("face-push-exact-brep-not-implemented",{operation:{type:"pushMoveFace",sourceSolidFaceIndex:e.sourceSolidFaceIndex,distance:t}}):ya("missing-source-entity");const r=i||Pd(n),o=e?.workplane?ih(r,e.workplane):r;if(!o)return ya("unsupported-source-entity",{source:{entityId:n?.id??n?.handle??null,entityType:n?.type??e?.sourceEntityType??null}});const a=t0(o,t,{direction:e?.normal??{x:0,y:0,z:1},metadata:{sourceKey:Ai(e),sketchPlane:e?.sketchPlane??"XY",visualPushDistance:t}});return a?{status:"available",representation:"exact-extrusion-v1",profile:o,extrusion:a}:ya("exact-extrusion-failed",{source:o.source})}function Rt(e){return new $(Number(e?.x),Number(e?.y),Number(e?.z))}function p0(e,t,n){return Rt(t).sub(Rt(e)).cross(Rt(n).sub(Rt(e))).length()*.5}function h0(e,t){if(!Array.isArray(e)||e.length<3)return 0;const n=t[e[0]];let i=0;for(let r=1;r<e.length-1;r+=1)i+=p0(n,t[e[r]],t[e[r+1]]);return i}function m0(e){return e.faces.every(t=>h0(t,e.vertices)>Cn)}function yc(e,t,n,i,{allowOrientationCrossing:r=!1}={}){const o=Math.max(Cn,rn(e));return e.edges.every(a=>{const s=t.has(a[0]),l=t.has(a[1]);if(s===l)return!0;const c=s?a[0]:a[1],h=s?a[1]:a[0],d=Rt(e.vertices[c]).sub(Rt(e.vertices[h])).dot(n);if(Math.abs(d)<=o)return!0;const u=d+i;return(d>0?u>Cn:u<-Cn)?Math.abs(d)+Cn<ar?!0:ms(u):r})}function g0(e,t,n){const i=Array.isArray(e?.points)?e.points:[];if(!i.length||i.length!==n.size)return!1;const r=rn(t);return[...n].every(o=>{const a=t.vertices[o];return i.some(s=>Math.hypot(Number(s.x)-a.x,Number(s.y)-a.y,Number(s.z??0)-a.z)<=r)})}function Bd(e,t){const n=e.map(r=>t[r]).filter(Boolean);if(n.length<3)return null;const i=Rt(n[0]);for(let r=1;r<n.length-1;r+=1){const o=Rt(n[r]).sub(i).cross(Rt(n[r+1]).sub(i));if(!(o.lengthSq()<=1e-12)&&(o.normalize(),n.every(a=>Math.abs(Rt(a).sub(i).dot(o))<=Cn)))return o}return null}function Mc(e,t){const n={x:Math.abs(t.x),y:Math.abs(t.y),z:Math.abs(t.z)};return e.map(r=>n.x>=n.y&&n.x>=n.z?{x:r.y,y:r.z}:n.y>=n.z?{x:r.x,y:r.z}:{x:r.x,y:r.y}).reduce((r,o)=>({minX:Math.min(r.minX,o.x),minY:Math.min(r.minY,o.y),maxX:Math.max(r.maxX,o.x),maxY:Math.max(r.maxY,o.y)}),{minX:1/0,minY:1/0,maxX:-1/0,maxY:-1/0})}function _0(e,t){return Math.min(e.maxX,t.maxX)-Math.max(e.minX,t.minX)>Cn&&Math.min(e.maxY,t.maxY)-Math.max(e.minY,t.minY)>Cn}function x0(e,t,n,i,r){const o=[...t].map(h=>e.vertices[h]).filter(Boolean);if(o.length<3)return r;const a=Mc(o,i),s=o.reduce((h,d)=>h+Rt(d).dot(i),0)/o.length;let l=1/0,c=-1/0;return e.faces.forEach((h,d)=>{if(n.has(d))return;const u=h.map(x=>e.vertices[x]).filter(Boolean),m=Bd(h,e.vertices);if(!m||Math.abs(m.dot(i))<1-1e-7||!_0(a,Mc(u,i)))return;const S=Rt(u[0]).dot(i)-s;S>Cn?l=Math.min(l,S):S<-Cn&&(c=Math.max(c,S))}),r>l?l:r<c?c:r}function v0(e){return Dn(e)&&m0(e)}function S0(e,t,n,i={}){const r=Xt(t);if(!r)throw new TypeError("La cara seleccionada no tiene una normal valida");if(e.length<3||e.some(u=>![u.x,u.y,u.z].every(Number.isFinite)))throw new TypeError("El perfil de extrusion contiene coordenadas no validas");const o=r.clone().multiplyScalar(n),a=e.length,s=[...e,...e.map(u=>({x:u.x+o.x,y:u.y+o.y,z:u.z+o.z}))],l=Array.from({length:a},(u,m)=>m),c=Array.from({length:a},(u,m)=>a+m),h=n>0?[l.slice().reverse(),c]:[l,c.slice().reverse()],d=[];for(let u=0;u<a;u+=1){const m=(u+1)%a,S=u,x=m,f=a+u,p=a+m;h.push(n>0?[S,x,p,f]:[S,f,p,x]),d.push([S,x],[f,p],[S,f])}return eo({vertices:s,faces:h,edges:d,metadata:{type:"extrusion",distance:n,normal:{x:r.x,y:r.y,z:r.z},source:i.source??null}})}function bc(e){const t=(Array.isArray(e)?e:[]).map(n=>({x:Number(n?.x),y:Number(n?.y),z:Number(n?.z)||0}));return t.length<3||t.some(n=>![n.x,n.y,n.z].every(Number.isFinite))?null:t}function E0(e,t,n,i={}){const r=[bc(e),...(t||[]).map(bc)];if(r.some(f=>!f))throw new TypeError("El perfil con huecos no es valido");const o=r.flat(),a=o.length,s=r[0].map(f=>new et(f.x,f.y)),l=r.slice(1).map(f=>f.map(p=>new et(p.x,p.y))),c=gs.triangulateShape(s,l).filter(([f,p,M])=>{const A=o[f],v=o[p],y=o[M];return Math.abs((v.x-A.x)*(y.y-A.y)-(v.y-A.y)*(y.x-A.x))>Cn});if(!c.length)throw new RangeError("No se pudo triangular el perfil con huecos");const h=[...o,...o.map(f=>({...f,z:f.z+n}))],d=[],u=[],m=[];c.forEach(f=>{const[p,M,A]=f.map(T=>o[T]),y=(M.x-p.x)*(A.y-p.y)-(M.y-p.y)*(A.x-p.x)>0?[...f]:[f[0],f[2],f[1]],E=[...y].reverse();u.push(d.length),d.push(n>0?E:y),m.push(d.length),d.push((n>0?y:E).map(T=>T+a))});const S=[];let x=0;return r.forEach((f,p)=>{f.forEach((M,A)=>{const v=(A+1)%f.length,y=x+A,E=x+v,T=y+a,g=E+a,P=p===0;d.push(n>0?P?[y,E,g,T]:[T,g,E,y]:P?[y,T,g,E]:[T,y,E,g]),S.push([y,E],[T,g],[y,T])}),x+=f.length}),eo({vertices:h,faces:d,edges:S,metadata:{type:"extrusion",height:n,source:i.source??null,profileSize:a,profileLoopSizes:r.map(f=>f.length),capFaceGroups:{lower:u,upper:m}}})}function to(e,t,n={}){const i=lr(t);if(i===null)throw new RangeError("La altura de Push debe ser distinta de cero");if(!ms(i)&&n.allowSubMinimumThickness!==!0)return null;const r=!!(e?.workplane&&Array.isArray(e?.localPoints)),o=!r&&Array.isArray(e?.holes)&&e.holes.length>0&&e?.normal,a=r?e.workplane:o?$o(e):null,s=r?e.localPoints:a?e.points.map(f=>cn(f,a)):e?.points,l=r?e.localHoles:a?e.holes.map(f=>f.map(p=>cn(p,a))):e?.holes,c=(Array.isArray(s)?s:[]).map(f=>({x:Number(f.x),y:Number(f.y),z:Number(f.z)||0})),h=n.source??e?.id??null,d=Array.isArray(l)?l:[];let u=d.length?E0(c,d,i,{source:h}):r?xc(c,i,{source:h}):e?.normal?S0(c,e.normal,i,{source:h}):xc(c,i,{source:h});a&&(u=nh(u,a,e.sketchId));const m=new Set(e?.cadProfileVertexIndices||[]),S=new Set(e?.smoothProfileVertexIndices||[]);let x=c.length;return d.forEach((f,p)=>{const M=e?.holeCadProfileVertexIndices?.[p]||[],A=e?.holeSmoothProfileVertexIndices?.[p]||[];M.forEach(v=>m.add(x+v)),A.forEach(v=>S.add(x+v)),x+=Array.isArray(f)?f.length:0}),u.metadata={...u.metadata,type:"push",faceId:e?.id??null,height:i,distance:i,sketchPlane:e?.sketchPlane??u.metadata?.sketchPlane??"XY",sketchId:e?.sketchId??u.metadata?.sketchId??null,workplane:e?.workplane??u.metadata?.workplane??null,normal:e?.normal?{...e.normal}:u.metadata?.normal??null,sourceEntity:e?.sourceEntity??null,sourceEntityId:e?.sourceEntity?.id??e?.sourceEntity?.handle??null,sourceFaceType:e?.sourceEntityType??null,sourceSolidFaceIndex:e?.sourceSolidFaceIndex??null,sourceKey:Ai(e),exactGeometry:f0(e,i),cadProfileVertexIndices:[...m],smoothProfileVertexIndices:Array.isArray(e?.smoothProfileVertexIndices)?[...e.smoothProfileVertexIndices]:[],smoothVerticalEdgeIndices:[...S]},u}function y0(e){const t=wd(e,{segments:64,structured:!0});if(!t?.outerLoop?.length)return null;const n=e?.plane,i=Rt(n?.xAxis),r=Rt(n?.normal);if(i.lengthSq()<=1e-12||r.lengthSq()<=1e-12)return null;const o=a=>{const s=a.map(l=>_s(l,n));return s.length>3&&s[0]&&s.at(-1)&&Rt(s[0]).distanceTo(Rt(s.at(-1)))<=1e-9&&s.pop(),s};return{outer:o(t.outerLoop),holes:t.innerLoops.map(o)}}function Gd(e){const t=y0(e),n=Xt(e?.plane?.normal);if(!t||!n||t.outer.length<3)return null;const i=e.outerLoop?.segments?.length===1&&["circle","ellipse"].includes(e.outerLoop.segments[0]?.type),r=(e.innerLoops??[]).map(o=>o?.segments?.length===1&&["circle","ellipse"].includes(o.segments[0]?.type));return{points:t.outer,holes:t.holes,normal:{x:n.x,y:n.y,z:n.z},exactProfile:st(e),cadProfileVertexIndices:i?[]:t.outer.map((o,a)=>a),smoothProfileVertexIndices:i?t.outer.map((o,a)=>a):[],holeCadProfileVertexIndices:t.holes.map((o,a)=>r[a]?[]:o.map((s,l)=>l)),holeSmoothProfileVertexIndices:t.holes.map((o,a)=>r[a]?o.map((s,l)=>l):[])}}function M0(e){let t=2166136261;for(let n=0;n<e.length;n+=1)t^=e.charCodeAt(n),t=Math.imul(t,16777619);return(t>>>0).toString(16).padStart(8,"0")}function Ac(e,t){const n=(e??[]).map(r=>[Math.round(Number(r?.x)/t),Math.round(Number(r?.y)/t),Math.round((Number(r?.z)||0)/t)].join(":"));return n.length?[n,[...n].reverse()].flatMap(r=>r.map((o,a)=>[...r.slice(a),...r.slice(0,a)].join("|"))).sort()[0]:""}function Vd(e,t){const n=Xt(e?.normal);if(!n||!Array.isArray(e?.points)||e.points.length<3)return null;const i=Ku(t),r=Ac(e.points,i),o=(e.holes??[]).map(c=>Ac(c,i)).sort(),a=[r,...o].join("::"),s=Lo(e.points,n),l=[n.x,n.y,n.z].map(c=>Math.round(c*1e8)).concat(Math.round(s/i)).join(":");return{type:"push-region-v1",id:`push-region-${M0(`${l}:${a}`)}`,boundaryKey:a,plane:{normal:{x:n.x,y:n.y,z:n.z},offset:s},outerPointCount:e.points.length,innerPointCounts:(e.holes??[]).map(c=>c.length)}}function b0(e,t){const n=t?.metadata?.profileFeatures?.at?.(-1);return{analyticRegionId:e?.analyticRegionId??null,analyticParentRegionId:e?.analyticParentRegionId??null,sourceSolidDocumentId:e?.sourceSolidDocumentId??t?.metadata?.sourceSolidDocumentId??null,sourceFeature:n?{type:n.type??null,analyticRegionId:n.analyticRegionId??null,side:n.side??null,component:n.component??null}:null,planeCut:st(t?.metadata?.planeCut??null)}}function kd(e,t){const n=Xt(e?.normal),i=(e?.points??[]).map(o=>({x:Number(o?.x),y:Number(o?.y),z:Number(o?.z)||0})),r=(e?.holes??[]).map(o=>o.map(a=>({x:Number(a?.x),y:Number(a?.y),z:Number(a?.z)||0})));return!n||i.length<3||[i,...r].some(o=>o.some(a=>![a.x,a.y,a.z].every(Number.isFinite)))?null:{type:"push-input-face-v2",points:i,holes:r,normal:{x:n.x,y:n.y,z:n.z},region:Vd({...e,points:i,holes:r},t),provenance:b0(e,t),cadProfileVertexIndices:[...e?.cadProfileVertexIndices??[]],smoothProfileVertexIndices:[...e?.smoothProfileVertexIndices??[]],holeCadProfileVertexIndices:st(e?.holeCadProfileVertexIndices??[]),holeSmoothProfileVertexIndices:st(e?.holeSmoothProfileVertexIndices??[])}}function Hd(e){if(!["push-input-face-v1","push-input-face-v2"].includes(e?.type))return null;const t=Xt(e.normal),n=st(e.points??[]),i=st(e.holes??[]);return!t||n.length<3?null:{points:n,holes:i,normal:{x:t.x,y:t.y,z:t.z},analyticAxis:{x:t.x,y:t.y,z:t.z},cadProfileVertexIndices:[...e.cadProfileVertexIndices??[]],smoothProfileVertexIndices:[...e.smoothProfileVertexIndices??[]],holeCadProfileVertexIndices:st(e.holeCadProfileVertexIndices??[]),holeSmoothProfileVertexIndices:st(e.holeSmoothProfileVertexIndices??[]),region:st(e.region??null),provenance:st(e.provenance??null)}}function A0(e,t){const n=[e?.outerLoop,...e?.innerLoops??[]],i=[t?.outerLoop,...t?.innerLoops??[]];n.forEach((r,o)=>{const a=i[o]?.segments??[];(r?.segments??[]).forEach((s,l)=>{const c=a[l]?.source;c?.role&&(s.source=st(c))})}),e?.outerLoop&&(e.segments=e.outerLoop.segments)}function Wd(e){const t=e?.metadata?.exactGeometry?.base??(e?.metadata?.exactGeometry?.extrusion?e.metadata.exactGeometry:null),n=t?.extrusion,i=n?.profile??t?.profile,r=Number(n?.distance),o=Gd(i);if(!o||!Number.isFinite(r)||Math.abs(r)<=1e-9)return null;const a=Xt(n?.direction);if(!a)return null;const s=to({...o,normal:{x:a.x,y:a.y,z:a.z},id:i.id??null,sketchId:n.metadata?.sketchId??null,sketchPlane:n.metadata?.sketchPlane??null},r);return Dn(s)?(s.metadata={...s.metadata,exactGeometry:st(t),profileFeatures:[],sourceSolidDocumentId:e.metadata?.sourceSolidDocumentId??null},s):null}function T0(e,t=e?.distance){const n=Number(t);return Number.isFinite(n)?n>0?"union":n<0?"subtract":null:null}function Xd(e){return e?.exactProfile?.plane?Gd(e.exactProfile):Hd(e?.inputFace)}function Ka(e,t,n={}){if(t?.type==="subtractSolid"){const s=ja(t?.tool?.authority,n);if(!s)return null;const l=Yu(e,s,{operation:st(t),toolTransform:t.tool.transform});return l.ok?l.solids[Number(t.component)-1]??null:null}if(t?.type==="unionSolid"){const s=ja(t?.tool?.authority,n);if(!s)return null;const l=ds(e,s,{operation:st(t),toolTransform:t.tool.transform});return l?.length===1?l[0]:null}if(t?.type==="cutSolidByPlane"){const s=$u(e,t.points,{operation:st(t)});return s.ok?s.parts.find(l=>l.side===t.side&&l.componentIndex+1===Number(t.component))?.solid??null:null}const i=Number(n.distance??t?.distance),r=n.operationType??T0(t,i);if(!["union","subtract"].includes(r)||!Number.isFinite(i))return null;const o=n.face??Xd(t);if(!o)return null;const a={...st(t),type:r,distance:i,requestedDistance:i};if(delete a.kernelDistance,Math.abs(i)<=rn(e))return e;if(r==="subtract"){const s=Xt(o.normal),l=Rt(o.points[0]);a.through=s?i<=Math.min(...e.vertices.map(h=>Rt(h).sub(l).dot(s)))+rn(e):!1;const c=s?ps(e,i,l,s):i;return hs(e,o,i,{kernelDistance:c,operation:a,onDiagnostic:n.onDiagnostic})}return a.through=!1,Od(e,o,i,{operation:a,onDiagnostic:n.onDiagnostic})}function Yd(e,t,n={}){const i=e?.metadata?.profileFeatures;if(!Array.isArray(i))return null;let r=Wd(e);if(!r)return null;for(let o=0;o<t;o+=1)if(r=Ka(r,i[o],n),!Dn(r))return null;return r}function ja(e,t={}){if(e?.type!=="parametric-solid-v1"||e?.base?.type!=="extrusion")return null;const n=Array.isArray(e.operations)?st(e.operations):[],i=st(e.base.profile),r={metadata:{exactGeometry:{status:"available",representation:"exact-extrusion-v1",base:{status:"available",representation:"exact-extrusion-v1",profile:i,extrusion:{type:"exact-extrusion",version:1,profile:st(i),direction:st(e.base.direction),distance:Number(e.base.distance),metadata:st(e.base.metadata??{})}}},profileFeatures:n,sourceSolidDocumentId:e.sourceSolidDocumentId??null}},o=Yd(r,n.length,t);return Dn(o)?o:null}function Lo(e,t){return!Array.isArray(e)||!e.length?null:e.reduce((n,i)=>n+Rt(i).dot(t),0)/e.length}function P0(e,t,n){const i=Xt(t?.normal??t?.analyticAxis),r=Xt(n?.normal),o=Number(t?.distance);if(!i||!r||!Number.isFinite(o)||i.dot(r)<1-1e-5)return null;const a=Lo(n.points,i);if(!Number.isFinite(a))return null;const s=Hd(t.inputFace),l=s?Lo(s.points,i):null,c=Math.max(rn(e),rn(n.sourceSolid)),h=e.metadata?.planarFaceGroups??[],u=(h.length?h:e.faces.map((x,f)=>{const p=Bd(x,e.vertices);return p?{indices:[f],outerLoop:x.map(M=>e.vertices[M]),innerLoops:[],normal:{x:p.x,y:p.y,z:p.z}}:null}).filter(Boolean)).filter(x=>{const f=Xt(x?.normal),p=Lo(x?.outerLoop,i),M=Vd({points:x.outerLoop,holes:x.innerLoops??[],normal:x.normal},e);return f&&f.dot(i)>=1-1e-5&&Number.isFinite(p)&&Math.abs(p+o-a)<=c&&(!Number.isFinite(l)||Math.abs(p-l)<=c)&&(!s?.region?.id||M?.id===s.region.id)});if(u.length!==1)return null;const m=u[0];return{...s??{points:st(m.outerLoop),holes:st(m.innerLoops??[]),normal:{x:i.x,y:i.y,z:i.z},analyticAxis:{x:i.x,y:i.y,z:i.z}},sourceSolid:e,sourceSolidDocumentId:n.sourceSolidDocumentId??null,sourceSolidFaceIndex:m.indices[0],sourceSolidFaceIndices:[...m.indices]}}function w0(e,t,n,i={}){const r=e?.metadata?.profileFeatures,o=r?.length-1,a=r?.[o];if(o<0||a?.exactProfile||!["union","subtract"].includes(a?.type)||!Xr())return null;const s=Yd(e,o,i);if(!s)return null;const l=Array.isArray(s.metadata?.planarFaceGroups)?s:Xu(s)??s,c=P0(l,a,t);if(!c)return null;c.sourceSolid=s;const h=Xt(t.normal),d=Xt(a.normal??a.analyticAxis),u=Number(a.distance)+h.multiplyScalar(n).dot(d);return Number.isFinite(u)?Math.abs(u)<=rn(s)?(i.onDiagnostic?.({operation:{type:"pushMoveFace",requestedDistance:n,previousDistance:Number(a.distance),resultingDistance:0},target:{id:t?.sourceSolidDocumentId??e?.metadata?.sourceSolidDocumentId??null,vertexCount:e.vertices.length,faceCount:e.faces.length},cutter:{region:st(a.inputFace?.region??null),provenance:st(a.inputFace?.provenance??null)},coordinateSystem:t?.workplane??"solid-local",precheck:{materialPredicted:!0,matchedInputRegion:!0},effectiveTolerance:rn(s),phase:"parametric-replay",reason:"success"}),{...s,metadata:{...s.metadata,lastPushDistance:n,lastPushFaceIndex:null,lastPushFaceIndices:[],lastPushRegion:st(a.inputFace?.region??null),lastPushRequestedDistance:n,lastPushNormal:st(t.normal)}}):$d(c,u,{...i,skipFeatureReplay:!0}):null}function R0(e,t,n,i={}){const r=e?.metadata?.profileFeatures,o=Number(t?.analyticFeatureIndex),a=t?.analyticRegionId?r?.findIndex(f=>f?.analyticRegionId===t.analyticRegionId):o;if(!Array.isArray(r)||!Number.isInteger(a)||a<0||t?.analyticCapIndex!==1||!["union","subtract"].includes(t?.analyticOperationType)||!Xr())return null;const s=r?.[a];if(!["union","subtract"].includes(s?.type)||!s?.exactProfile?.plane)return null;const l=Xt(t?.normal),c=Xt(s.exactProfile.plane.normal);if(!l||!c)return null;const h=l.multiplyScalar(n).dot(c),d=Number(s.distance),u=d+h;if(!Number.isFinite(d)||!Number.isFinite(u))return null;const m=rn(e),S=u>m?"union":u<-m?"subtract":null;let x=Wd(e);if(!x)return null;for(let f=0;f<r.length;f+=1){const p=r[f];if(p?.type==="cutSolidByPlane"){if(x=Ka(x,p,i),!Dn(x))return null;continue}if(!["union","subtract"].includes(p?.type))return null;const M=f===a,A=M?u:Number(p.distance);if(!Number.isFinite(A))return null;if(Math.abs(A)<=m)continue;const v=Xd(p);if(!v)return null;const y=M?S:p.type;if(!y)continue;const E=st(p);M&&t?.exactProfile&&A0(E.exactProfile,t.exactProfile);const T=Ka(x,E,{...i,distance:A,face:v,operationType:y});if(!Dn(T))return null;x=T}return{...x,metadata:{...x.metadata,lastPushDistance:n,lastPushFaceIndex:null,lastPushFaceIndices:[],lastPushRegion:t.analyticRegionId?{type:"analytic-region-v1",id:t.analyticRegionId}:st(t.region??null),lastPushRequestedDistance:n,lastPushNormal:{x:t.normal.x,y:t.normal.y,z:t.normal.z},sourceSolidDocumentId:e.metadata?.sourceSolidDocumentId??x.metadata?.sourceSolidDocumentId??null}}}function $d(e,t,n={}){const i=lr(t),r=e?.sourceSolid,o=e?.sourceSolidFaceIndex,a=Xt(e?.exactProfile?e?.analyticAxis??e?.normal:e?.normal),s=E=>n.onDiagnostic?.({operation:{type:Number(t)<0?"subtract":"union",distance:t,sourceSolidFaceIndex:o??null,sourceSolidFaceIndices:e?.sourceSolidFaceIndices??null},target:{id:e?.sourceSolidDocumentId??r?.metadata?.sourceSolidDocumentId??null,vertexCount:r?.vertices?.length??0,faceCount:r?.faces?.length??0},cutter:{outerPointCount:e?.points?.length??0,holeCount:e?.holes?.length??0},coordinateSystem:e?.workplane??"solid-local",...E});if(i===null)throw Number(t)<0&&s({phase:"distance-validation",reason:"below-useful-tolerance",requestedDistance:t,effectiveTolerance:Ur(r)}),new RangeError("La distancia de Push debe ser distinta de cero");if(!r||!Number.isInteger(o)||!a)return i<0&&s({phase:"input-validation",reason:Dn(r)?"invalid-cutter-profile":"invalid-target-solid"}),null;const l=Rt(e?.points?.[0]??r.vertices?.[r.faces?.[o]?.[0]]),c=Ld(r,l,a,i);if(Math.abs(c)<=Ur(r))return i<0&&s({phase:"distance-validation",reason:"below-useful-tolerance",requestedDistance:i,effectiveDistance:c,effectiveTolerance:Ur(r)}),null;const h={...e,normal:{x:a.x,y:a.y,z:a.z},analyticAxis:{x:a.x,y:a.y,z:a.z}},d=n.skipFeatureReplay?null:R0(r,h,c,n)??w0(r,h,c,n);if(d)return d;const u=Array.isArray(e?.sourceSolidFaceIndices)&&e.sourceSolidFaceIndices.length?e.sourceSolidFaceIndices:[o],m=u.map(E=>r.faces?.[E]);if(m.some(E=>!Array.isArray(E)||E.length<3))return c<0&&s({phase:"input-validation",reason:"invalid-cutter-profile"}),null;const S=new Set(m.flat());if(g0(e,r,S)&&!yc(r,S,a,c,{allowOrientationCrossing:Xr()}))return c<0&&s({phase:"precheck-material-thickness",reason:"minimum-thickness",precheck:{materialPredicted:!1,ignoredMicroThickness:rn(r)},effectiveTolerance:ar}),null;if(Xr()){const E=c<0?"subtract":"union",T=E==="subtract"?ps(r,c,l,a):c,g=Math.min(...r.vertices.map(k=>Rt(k).sub(l).dot(a))),P=c<0&&c<=g+Cn,C=h.exactProfile?h.analyticRegionId??Nd():null,I=h.exactProfile?null:kd(h,r),U={type:E,distance:c,requestedDistance:i,...T!==c?{kernelDistance:T}:{},through:P,normal:{x:a.x,y:a.y,z:a.z},analyticAxis:{x:a.x,y:a.y,z:a.z},sketchId:h.sketchId??null,exactProfile:h.exactProfile?qu(r,h.exactProfile,C):null,...I?{inputFace:I,sourceRegion:st(I.region),sourceProvenance:st(I.provenance)}:{},...C?{analyticRegionId:C}:{}},V={lastPushFaceIndex:null,lastPushFaceIndices:[],lastPushRegion:st(I?.region??(C?{type:"analytic-region-v1",id:C}:null)),lastPushDistance:c,lastPushRequestedDistance:i,lastPushNormal:U.normal};if(E==="subtract")return hs(r,h,c,{kernelDistance:T,operation:U,onDiagnostic:n.onDiagnostic,metadata:V});try{return Od(r,h,T,{operation:U,onDiagnostic:n.onDiagnostic,metadata:V})}catch{return null}}const x=x0(r,S,new Set(u),a,c),f=a.clone().multiplyScalar(x);if(!yc(r,S,a,x))return null;const p=r.vertices.map((E,T)=>S.has(T)?{x:E.x+f.x,y:E.y+f.y,z:E.z+f.z}:{...E}),M=new Map(r.vertices.map((E,T)=>[`${Number(E.x).toFixed(7)}:${Number(E.y).toFixed(7)}:${Number(E.z).toFixed(7)}`,T])),A=E=>{const T=`${Number(E?.x).toFixed(7)}:${Number(E?.y).toFixed(7)}:${Number(E?.z??0).toFixed(7)}`,g=M.get(T);return g!==void 0&&S.has(g)?{...p[g]}:{x:Number(E?.x),y:Number(E?.y),z:Number(E?.z??0)}},v=(r.metadata?.planarFaceGroups??[]).map(E=>({...E,outerLoop:Array.isArray(E?.outerLoop)?E.outerLoop.map(A):E?.outerLoop,innerLoops:Array.isArray(E?.innerLoops)?E.innerLoops.map(T=>T.map(A)):E?.innerLoops})),y=eo({vertices:p,faces:r.faces,edges:r.edges,metadata:{...r.metadata&&typeof r.metadata=="object"?r.metadata:{},type:r.metadata?.type==="profileFeature"?"profileFeature":"push",planarFaceGroups:v,exactGeometry:zd("face-push-exact-brep-not-implemented",{operation:{type:"pushMoveFace",sourceSolidFaceIndex:o,sourceSolidFaceIndices:u,distance:x,requestedDistance:i,normal:e.normal}}),lastPushFaceIndex:o,lastPushFaceIndices:u,lastPushDistance:x,lastPushRequestedDistance:i,lastPushNormal:{x:e.normal.x,y:e.normal.y,z:e.normal.z}}});return v0(y)?y:null}function C0(e,t={}){const n=Xu(e),i=n,r=Qp(i),o=new eh({color:t.faceColor??t.color??Qe.faceColor,depthTest:!0,depthWrite:!0,emissive:526344,emissiveIntensity:.08,metalness:0,opacity:1,polygonOffset:!0,polygonOffsetFactor:2,polygonOffsetUnits:2,roughness:.82,side:tn,transparent:!1,wireframe:!1}),a=new jt(r,o);return a.name=t.name??`webcad-push-solid-${e.metadata?.faceId??"solid"}`,a.renderOrder=t.renderOrder??18,a.userData={type:"webcad-push-solid",faceId:i.metadata?.faceId??null,height:i.metadata.height,normal:i.metadata.normal,sourceEntity:i.metadata.sourceEntity,sourceEntityId:i.metadata.sourceEntityId,sourceFaceType:i.metadata.sourceFaceType,sourceSolidFaceIndex:i.metadata.sourceSolidFaceIndex,sourceKey:i.metadata.sourceKey,exactGeometry:i.metadata.exactGeometry,cadProfileVertexIndices:i.metadata.cadProfileVertexIndices,smoothProfileVertexIndices:i.metadata.smoothProfileVertexIndices,analyticSolid:n,solid:i},a}function I0(e,t={}){const n=e.userData?.analyticSolid??e.userData?.solid,i=th(n),r=new Set(Array.isArray(n?.metadata?.smoothProfileVertexIndices)?n.metadata.smoothProfileVertexIndices:[]),o=new Set(Array.isArray(n?.metadata?.smoothVerticalEdgeIndices)?n.metadata.smoothVerticalEdgeIndices:r),a=new Set(Array.isArray(n?.metadata?.cadProfileVertexIndices)?n.metadata.cadProfileVertexIndices:[]);fs(n,[...a]).forEach(p=>{a.delete(p),o.add(p)});const l=e.userData?.sourceFaceType==="CIRCLE",c=n?.metadata?.type==="profileFeature"||Array.isArray(n?.metadata?.profileFeatures),h=!c&&(l||o.size>0)&&t.showVerticalSurfaceEdges!==!0,d=[],u=[],m=[],S=Xt(n?.metadata?.normal??{x:0,y:0,z:1}),x=new Map;c&&n.faces.forEach(p=>p.forEach((M,A)=>{const v=p[(A+1)%p.length],y=M<v?`${M}:${v}`:`${v}:${M}`;x.set(y,(x.get(y)??0)+1)}));for(const p of i.entries){const M=Array.isArray(p.sourceEdgeIndices?.[0])?p.sourceEdgeIndices[0]:p.sourceEdgeIndices,A=M?.[0],v=M?.[1],y=p.segment?.start,E=p.segment?.end;if(!y||!E)continue;const T=A<v?`${A}:${v}`:`${v}:${A}`;(x.get(T)??0)>2||h&&(l||o.has(Math.min(A,v))&&!a.has(Math.min(A,v)))&&S&&Rt(E).sub(Rt(y)).normalize().cross(S).lengthSq()<=1e-12||(d.push({start:{x:y.x,y:y.y,z:y.z},end:{x:E.x,y:E.y,z:E.z}}),u.push(p.sourceEdgeIndices??null),m.push(p.curveGroupId??null))}const f=Kt(d,{color:t.edgeColor??t.color??Qe.edgeColor,depthBias:Qe.edgeDepthBias,depthFunc:rr,depthTest:!0,depthWrite:!1,linewidth:t.edgeLineWidth??Qe.edgeLineWidth,polygonOffset:!0,polygonOffsetFactor:Qe.edgePolygonOffsetFactor,polygonOffsetUnits:Qe.edgePolygonOffsetUnits,renderOrder:t.renderOrder??Qe.edgeRenderOrder});return f.name=`${e.name}-edges`,f.userData={type:"webcad-push-solid-edges",faceId:e.userData.faceId,hiddenVerticalSurfaceEdges:h,segmentCount:d.length,sourceSegments:d,sourceEdgeIndices:u,curveGroupIds:m,analyticEdgeGeometry:i.geometry,sourceEntityId:e.userData.sourceEntityId,sourceKey:e.userData.sourceKey,showHiddenEdges:t.showHiddenEdges===!0},f}function D0(e,t={}){const n=e.userData?.analyticSolid??e.userData?.solid,i=(n?.metadata?.tangentEdges??[]).flatMap(o=>{const a=n.vertices?.[o.startIndex],s=n.vertices?.[o.endIndex];return a&&s?[{start:{...a},end:{...s}}]:[]}),r=Kt(i,{color:t.color??Qe.tangentEdgeColor,depthBias:Qe.edgeDepthBias,depthFunc:rr,depthTest:!0,depthWrite:!1,linewidth:t.linewidth??Qe.tangentEdgeLineWidth,polygonOffset:!0,polygonOffsetFactor:Qe.edgePolygonOffsetFactor,polygonOffsetUnits:Qe.edgePolygonOffsetUnits,renderOrder:t.renderOrder??Qe.edgeRenderOrder-1});return r.name=`${e.name}-tangent-edges`,r.userData={type:"webcad-push-solid-tangent-edges",segmentCount:i.length,sourceSegments:i},r}function L0(e,t){if(e?.userData?.type!=="webcad-push-solid-group")return!1;e.userData.showHiddenEdges=t===!0;const n=e.children.find(i=>i.userData?.type==="webcad-push-solid-hidden-edges");return n&&(n.visible=e.userData.showHiddenEdges),!0}function Tc(e,t,n={}){const i=to(e,t,n);return i?No(i,{...n,name:n.name??`webcad-push-group-${e?.id??"face"}`}):null}function No(e,t={}){if(!Dn(e))return null;const n=new qt;n.name=t.name??`webcad-push-group-${e.metadata?.faceId??"solid"}`;const i=C0(e,t),r=I0(i,{edgeColor:t.edgeColor,edgeLineWidth:t.edgeLineWidth,renderOrder:t.edgeRenderOrder}),o=D0(i,{renderOrder:t.edgeRenderOrder});return n.add(i,r),o.userData.segmentCount>0?n.add(o):at(o),n.userData={type:"webcad-push-solid-group",faceId:i.userData.faceId,height:i.userData.height,normal:i.userData.normal,sourceEntity:i.userData.sourceEntity,sourceEntityId:i.userData.sourceEntityId,sourceFaceType:i.userData.sourceFaceType,sourceSolidFaceIndex:i.userData.sourceSolidFaceIndex,sourceKey:i.userData.sourceKey,exactGeometry:i.userData.exactGeometry,analyticSolid:i.userData.analyticSolid,solid:e,showCurveGeneratrices:!0,showHiddenEdges:t.showHiddenEdges===!0},n}const Qi=1e-7;function xn(e){return{x:Number(e?.x),y:Number(e?.y),z:Number(e?.z)||0}}function Zn(e){return`${Math.round(e.x/Qi)}:${Math.round(e.y/Qi)}:${Math.round(e.z/Qi)}`}function Ar(e,t){const n=Zn(e),i=Zn(t);return n<i?`${n}|${i}`:`${i}|${n}`}function Pc(e){return e.map(Zn).sort().join("|")}function zt(e){return new $(e.x,e.y,e.z)}function wc(e,t={x:0,y:0,z:1}){const n=zt(xn(e));return n.lengthSq()<=1e-12?xn(t):(n.normalize(),{x:n.x,y:n.y,z:n.z})}function wi(e,t,n){return{x:e.x+t.x*n,y:e.y+t.y*n,z:e.z+t.z*n}}function qd(e,t){if(!Array.isArray(e)||!Array.isArray(t)||e.length!==t.length)return!1;const n=new Set(t.map(Zn));return e.every(i=>n.has(Zn(i)))}function N0(e,t,n){const i=zt(n);return(e?.metadata?.planarFaceGroups??[]).filter(r=>{if(r?.kind!=="support-remainder"&&r?.kind!=="opposite-remainder"||!Array.isArray(r.indices)||!qd(r.outerLoop,t))return!1;const o=zt(xn(r.normal));return o.lengthSq()>1e-12&&o.normalize().dot(i)>.99})}function U0(e){const t=new Set;return e.filter(n=>{if(!Array.isArray(n)||n.length<3)return!1;const i=n.map(Zn).sort().join("|");return t.has(i)?!1:(t.add(i),!0)})}function F0(e,t){const n=e.map(i=>t[i]).filter(Boolean);for(let i=1;i<n.length-1;i+=1){const r=zt(n[i]).sub(zt(n[0])).cross(zt(n[i+1]).sub(zt(n[0])));if(r.lengthSq()>1e-12)return r.normalize(),{x:r.x,y:r.y,z:r.z}}return{x:0,y:0,z:1}}function Rc(e,t,n){return Math.min(...e.vertices.map(i=>zt(i).sub(zt(t)).dot(zt(n))))}function O0(e,t,n,i){const r=zt(n);return e.faces.reduce((o,a,s)=>{const l=a.map(c=>e.vertices[c]).filter(Boolean);return l.length<3||l.some(c=>Math.abs(zt(c).sub(zt(t)).dot(r)-i)>Qi)||o.push(s),o},[])}function Ir(e,t){const n=cn(e,t);return new et(n.x,n.y)}function z0(e,t){const n=e.map(i=>Ir(i,t));return n.reduce((i,r,o)=>{const a=n[(o+1)%n.length];return i+r.x*a.y-a.x*r.y},0)*.5}function B0(e,t,n={}){const i=e?.supportSolid,r=(e?.points??[]).map(xn),o=(e?.holes??[]).map(W=>W.map(xn)),a=(e?.supportLoops?.outer??[]).map(xn),s=(e?.supportLoops?.holes??[]).map(W=>W.map(xn)),l=wc(e?.normal),c=Fr(e?.workplane??{type:"fixed",origin:r[0],normal:l,xAxis:{x:1,y:0,z:0}}),h=W=>n.onDiagnostic?.({operation:{type:Number(t)<0?"subtract":"union",distance:t},target:{id:e?.sourceSolidDocumentId??null,vertexCount:i?.vertices?.length??0,faceCount:i?.faces?.length??0},cutter:{outerPointCount:r.length,holeCount:o.length},coordinateSystem:c,...W});if(!Dn(i)||r.length<3||a.length<3||!Number.isFinite(t))return Number(t)<0&&h({phase:"input-validation",reason:Dn(i)?"invalid-cutter-profile":"invalid-target-solid"}),null;const d=Number(t),u=Ld(i,a[0],l,d);if(Math.abs(u)<=Ur(i))return d<0&&h({phase:"distance-validation",reason:"below-useful-tolerance",requestedDistance:d,effectiveDistance:u,effectiveTolerance:Ur(i)}),null;if(!ms(u))return d<0&&h({phase:"distance-validation",reason:"minimum-thickness",requestedDistance:d,effectiveDistance:u}),null;const m=e?.supportContactOnly===!0,S=m||u>0?"union":"subtract";if(Xr()){const W=Rc(i,a[0],l),me=S==="subtract"&&u<=W+Qi,de=S==="subtract"?ps(i,u,a[0],l):u,G=e.exactProfile?e.analyticRegionId??Nd():null,oe=e.exactProfile?null:kd(e,i);if(!e.exactProfile&&!oe)return null;const ge={type:S,distance:u,requestedDistance:d,...de!==u?{kernelDistance:de}:{},through:me,tangentContact:m,sketchId:e.sketchId??null,exactProfile:e.exactProfile?qu(i,e.exactProfile,G):null,...oe?{inputFace:oe}:{},...G?{analyticRegionId:G}:{}};if(S==="subtract")return hs(i,e,u,{kernelDistance:de,operation:ge,onDiagnostic:n.onDiagnostic,metadata:{sourceSolidDocumentId:e.sourceSolidDocumentId??null}});let Ce=null;try{Ce=Fd(i,e,de)}catch{return null}return rh(i,Ce,{operationType:ge.type,operation:ge,onDiagnostic:n.onDiagnostic,metadata:{sourceSolidDocumentId:e.sourceSolidDocumentId??null}})}if(m)return null;const x=N0(i,a,l),f=U0([...s,...x.flatMap(W=>W.innerLoops??[])]).map(W=>W.map(xn)),p=x.length?[...new Set(x.flatMap(W=>W.indices))]:e.sourceSolidFaceIndices??[],M=Rc(i,a[0],l),A=u<0&&u<=M+Qi,v=A?M:u,y=A?O0(i,a[0],l,M):[];if(A&&!y.length)return null;const E=i.vertices.map(xn),T=new Map(E.map((W,me)=>[Zn(W),me])),g=W=>{const me=xn(W),de=Zn(me);return T.has(de)||(T.set(de,E.length),E.push(me)),T.get(de)},P=new Set([...p,...y]),C=new Set,I=new Set;if(u>0){const W=new Map;i.faces.forEach((me,de)=>{const G=Pc(me.map(oe=>i.vertices[oe]).filter(Boolean));G&&W.set(G,de)}),[r,...o].forEach((me,de)=>{const G=me.map(ge=>wi(ge,l,v)),oe=new Set(de===0?e.cadProfileVertexIndices??[]:e.holeCadProfileVertexIndices?.[de-1]??[]);me.forEach((ge,Ce)=>{const Xe=(Ce+1)%me.length,Je=Pc([ge,me[Xe],G[Xe],G[Ce]]),Ve=W.get(Je);Ve!==void 0&&(P.add(Ve),C.add(`${de}:${Ce}`),I.add(Ar(ge,me[Xe])),I.add(Ar(G[Ce],G[Xe])),oe.has(Ce)||I.add(Ar(ge,G[Ce])),oe.has(Xe)||I.add(Ar(me[Xe],G[Xe])))})})}const U=[],V=[],k=[],B=new Map,Y=i.metadata?.faceVertexNormals;i.faces.forEach((W,me)=>{if(P.has(me))return;B.set(me,U.length),U.push([...W]);const de=Y?.[me],G=F0(W,i.vertices);V.push(Array.isArray(de)&&de.length===W.length?de.map(xn):W.map(()=>({...G})))}),(i.metadata?.planarFaceGroups??[]).forEach(W=>{!Array.isArray(W?.indices)||W.indices.some(me=>!B.has(me))||k.push({...JSON.parse(JSON.stringify(W)),indices:W.indices.map(me=>B.get(me))})});const D=(i.metadata?.curvedSideFaceIndices??[]).filter(W=>B.has(W)).map(W=>B.get(W)),j=(i.metadata?.curvedFeatureGeneratrices??[]).filter(W=>B.has(W?.beforeFaceIndex)&&B.has(W?.afterFaceIndex)).map(W=>({...W,beforeFaceIndex:B.get(W.beforeFaceIndex),afterFaceIndex:B.get(W.afterFaceIndex)})),ae=(W,me)=>{const[de,G,oe]=W.map(Ce=>zt(E[Ce]));return G.sub(de).cross(oe.sub(de)).dot(zt(me))<0?[W[0],W[2],W[1]]:W},q=(W,me,de,G)=>{if(W.length<3)return[];const oe=W.map(Ve=>Ir(Ve,c)),ge=me.map(Ve=>Ve.map(tt=>Ir(tt,c))),Ce=[W,...me].flat().map(g),Xe=gs.triangulateShape(oe,ge),Je=[];return Xe.forEach(Ve=>{const tt=ae(Ve.map(dt=>Ce[dt]),de);Je.push(U.length),U.push(tt),V.push(tt.map(()=>({...de})))}),Je.length&&k.push({indices:Je,kind:G,normal:{...de},outerLoop:W.map(xn),innerLoops:me.map(Ve=>Ve.map(xn))}),Je},ne=qd(r,a);ne?o.forEach(W=>q(W,[],l,"support-island")):(q(a,[...f,r],l,"support-remainder"),o.forEach(W=>q(W,[],l,"support-island")));const ue=r.map(W=>wi(W,l,v)),we=o.map(W=>W.map(me=>wi(me,l,v)));if(A){const W={x:-l.x,y:-l.y,z:-l.z},me=a.map(G=>wi(G,l,v)),de=f.map(G=>G.map(oe=>wi(oe,l,v)));ne?we.forEach(G=>q(G,[],W,"opposite-island")):(q(me,[...de,ue],W,"opposite-remainder"),we.forEach(G=>q(G,[],W,"opposite-island")))}else q(ue,we,l,"feature-end");const Le=(W,me)=>{const de=W.map(Je=>wi(Je,l,v)),G=new Set(me===0?e.smoothProfileVertexIndices??[]:e.holeSmoothProfileVertexIndices?.[me-1]??[]),oe=new Set(me===0?e.cadProfileVertexIndices??[]:e.holeCadProfileVertexIndices?.[me-1]??[]),ge=[],Ce=[],Xe=z0(W,c);W.forEach((Je,Ve)=>{const tt=(Ve+1)%W.length,dt=W[tt],z=[g(Je),g(dt)],Pt=[g(de[Ve]),g(de[tt])];if(C.has(`${me}:${Ve}`)){ge.push(null),Ce.push(!1);return}let te=[z[0],z[1],Pt[1],Pt[0]];const w=Ir(Je,c),_=Ir(dt,c);let F=Xe>=0?{x:_.y-w.y,y:w.x-_.x}:{x:w.y-_.y,y:_.x-w.x};me>0&&(F={x:-F.x,y:-F.y}),v<0&&(F={x:-F.x,y:-F.y});const X=wc({x:c.xAxis.x*F.x+c.yAxis.x*F.y,y:c.xAxis.y*F.x+c.yAxis.y*F.y,z:c.xAxis.z*F.x+c.yAxis.z*F.y});ae([te[0],te[1],te[2]],X)[1]!==te[1]&&(te=[te[0],te[3],te[2],te[1]]);const _e=U.length;U.push(te),ge.push(_e);const Me=G.has(Ve)&&G.has(tt)||!(oe.has(Ve)&&oe.has(tt));if(Ce.push(Me),Me){D.push(_e);const ie=ve=>{const Fe=W[(ve-1+W.length)%W.length],be=W[ve],Ee=W[(ve+1)%W.length],Be=zt(be).sub(zt(Fe)).normalize(),$e=zt(Ee).sub(zt(be)).normalize();let je=Be.cross(zt(l)).add($e.cross(zt(l)));return me>0&&je.multiplyScalar(-1),v<0&&je.multiplyScalar(-1),je.normalize(),{x:je.x,y:je.y,z:je.z}},le=new Map([[z[0],ie(Ve)],[Pt[0],ie(Ve)],[z[1],ie(tt)],[Pt[1],ie(tt)]]);V.push(te.map(ve=>le.get(ve)??X))}else V.push(te.map(()=>({...X})))}),W.forEach((Je,Ve)=>{const tt=(Ve-1+W.length)%W.length;!Ce[tt]||!Ce[Ve]||j.push({startIndex:g(Je),endIndex:g(de[Ve]),beforeFaceIndex:ge[tt],afterFaceIndex:ge[Ve]})})};[r,...o].forEach(Le);const ze=[],J=new Set,ce=(W,me)=>{const de=g(W),G=g(me);if(de===G)return;const oe=de<G?`${de}:${G}`:`${G}:${de}`;J.has(oe)||(J.add(oe),ze.push(de<G?[de,G]:[G,de]))},O=new Set(a.flatMap((W,me)=>{const de=a[(me+1)%a.length],G=Zn(W),oe=Zn(de);return[G<oe?`${G}|${oe}`:`${oe}|${G}`]}));i.edges.forEach(([W,me])=>{const de=i.vertices[W],G=i.vertices[me],oe=Ar(de,G);I.has(oe)||ne&&O.has(oe)||ce(de,G)}),[r,...o].forEach((W,me)=>{const de=W.map(oe=>wi(oe,l,v));W.forEach((oe,ge)=>{const Ce=W[(ge+1)%W.length],Xe=C.has(`${me}:${ge}`);!Xe&&(!ne||me>0)&&ce(oe,Ce),Xe||ce(de[ge],de[(ge+1)%W.length])}),(me===0?e.cadProfileVertexIndices??[]:e.holeCadProfileVertexIndices?.[me-1]??[]).forEach(oe=>ce(W[oe],de[oe]))});const xe={type:u>0?"union":"subtract",distance:v,requestedDistance:d,through:A,sketchId:e.sketchId??null,exactProfile:e.exactProfile??null},ee=eo({vertices:E,faces:U,edges:ze,metadata:{...i.metadata??{},type:"profileFeature",booleanOperation:u>0?"union":"subtract",capFaceGroups:null,faceVertexNormals:V,planarFaceGroups:k,curvedSideFaceIndices:D,curvedFeatureGeneratrices:j,profileFeatures:[...i.metadata?.profileFeatures??[],xe],sourceSolidDocumentId:e.sourceSolidDocumentId??null,exactGeometry:{status:"pending",reason:"profile-feature-exact-brep-not-implemented",operations:[...i.metadata?.exactGeometry?.operations??[],xe]}}});return Dn(ee)?ee:null}const no=1e-12,Ma=12,G0=14707232,V0=2582960,Fi=Object.freeze({capColor:16757575,capOpacity:.54,depthTest:!0,curtainColor:14707232,volumeColor:15769914,volumeOpacity:.2}),k0=Object.freeze({capColor:14170934,capOpacity:.34,depthTest:!1,curtainColor:13184810,volumeColor:14170934,volumeOpacity:.16});function In(e){return{x:e.x,y:e.y,z:e.z}}function H0(e){const t=e?.geometry;t?.getAttribute?.("normal")||t?.computeVertexNormals?.();const n=t?.getAttribute?.("normal");if(!n?.count)return null;const r=new $(n.getX(0),n.getY(0),n.getZ(0)).applyNormalMatrix(new ct().getNormalMatrix(e.matrixWorld));return r.lengthSq()>no?r.normalize():null}function W0(e){const t=new Mn().setFromObject(e);return t.isEmpty()?null:t.getCenter(new $)}function X0(e){const t=new $(Number(e?.x),Number(e?.y),Number(e?.z));return t.lengthSq()>no?t.normalize():null}function Y0(e,{worldNormal:t=null}={}){if(!e?.geometry)return null;e.updateWorldMatrix?.(!0,!1);const n=W0(e),i=X0(t)??H0(e);return!n||!i?null:{center:In(n),normal:In(i)}}function Cc(e,t,n){const i=t.clone().normalize(),o=(Math.abs(i.z)<.9?new $(0,0,1):new $(0,1,0)).cross(i).normalize().multiplyScalar(n*.42),a=e.clone().addScaledVector(i,-n);return[{start:In(e),end:In(a.clone().add(o))},{start:In(e),end:In(a.clone().sub(o))}]}function $0(e,t,n){const i=new $(e.center.x,e.center.y,e.center.z),r=t?.position?.distanceTo?.(i)??10,o=new Mn().setFromObject(n),a=o.isEmpty()?1:o.getSize(new $).length();return Math.max(2,a*1.25,r*.28)}function q0(e,t,n){const i=new $(e.center.x,e.center.y,e.center.z),r=new $(e.normal.x,e.normal.y,e.normal.z),o=$0(e,t,n),a=i.clone().addScaledVector(r,o),s=r.clone().negate(),l=i.clone().addScaledVector(r,-o),c=Math.max(o*.09,.18),h=new qt;h.name="webcad-push-normal-guide",h.userData={type:"webcad-push-normal-guide",axis:e};const d=Kt([{start:In(i),end:In(a)},...Cc(a,r,c)],{color:G0,depthTest:!1,depthWrite:!1,linewidth:Math.max(2.4,Ze.axisLineWidth),opacity:.98,renderOrder:90,transparent:!0});d.name="webcad-push-normal-positive",d.userData.direction="positive";const u=Kt([{start:In(i),end:In(l)},...Cc(l,s,c)],{color:V0,dashed:!0,depthTest:!1,depthWrite:!1,linewidth:Math.max(1.8,Ze.axisNegativeLineWidth),opacity:.92,renderOrder:90,transparent:!0});return u.name="webcad-push-normal-negative",u.userData.direction="negative",h.add(d,u),h}function K0(e){const t=e?.geometry?.getAttribute?.("position");if(!t?.count)return[];const n=new Set,i=[];for(let r=0;r<t.count;r+=1){const a=new $(t.getX(r),t.getY(r),t.getZ(r)).applyMatrix4(e.matrixWorld),s=`${a.x.toFixed(7)}:${a.y.toFixed(7)}:${a.z.toFixed(7)}`;n.has(s)||(n.add(s),i.push(a))}return i.length<=Ma?i:Array.from({length:Ma},(r,o)=>i[Math.floor(o*i.length/Ma)])}function j0(e){const t=e?.geometry,n=t?.getAttribute?.("position");if(!n?.count)return[];const i=new Map,r=[],o=[];for(let d=0;d<n.count;d+=1){const u=new $(n.getX(d),n.getY(d),n.getZ(d)),m=`${u.x.toFixed(7)}:${u.y.toFixed(7)}:${u.z.toFixed(7)}`;let S=i.get(m);S===void 0&&(S=o.length,i.set(m,S),o.push(u.applyMatrix4(e.matrixWorld))),r[d]=S}const a=t.getIndex?.(),s=a?.count??n.count,l=new Map,c=d=>r[a?a.getX(d):d],h=(d,u)=>{if(d===u)return;const m=d<u?`${d}:${u}`:`${u}:${d}`,S=l.get(m);if(S){S.count+=1;return}l.set(m,{count:1,endIndex:u,startIndex:d})};for(let d=0;d+2<s;d+=3){const u=c(d),m=c(d+1),S=c(d+2);h(u,m),h(m,S),h(S,u)}return[...l.values()].filter(d=>d.count===1).map(d=>({end:o[d.endIndex],start:o[d.startIndex]}))}function Z0(e,t,n,i){const r=new Float32Array(t.length*6);t.forEach((o,a)=>{const s=o.clone().addScaledVector(n,i),l=a*6;r[l]=o.x,r[l+1]=o.y,r[l+2]=o.z,r[l+3]=s.x,r[l+4]=s.y,r[l+5]=s.z}),e.geometry.setPositions(r),e.computeLineDistances()}function J0(e,t){const n=new ii,i=new Float32Array(e.length*18),r=new Float32Array(e.length*18);e.forEach(({start:s,end:l},c)=>{const h=l.clone().sub(s).cross(t).normalize(),d=c*18;for(let u=0;u<6;u+=1){const m=d+u*3;r[m]=h.x,r[m+1]=h.y,r[m+2]=h.z}}),n.setAttribute("position",new Li(i,3).setUsage(oh)),n.setAttribute("normal",new Li(r,3));const o=new ah({color:Fi.volumeColor,depthTest:Fi.depthTest,depthWrite:!1,opacity:Fi.volumeOpacity,shininess:12,side:tn,transparent:!0}),a=new jt(n,o);return a.name="webcad-push-drag-volume",a.frustumCulled=!1,a.renderOrder=80,a.userData.type="webcad-push-drag-volume",a}function Q0(e,t,n,i){const r=e.geometry.getAttribute("position");t.forEach(({start:o,end:a},s)=>{const l=o.x+n.x*i,c=o.y+n.y*i,h=o.z+n.z*i,d=a.x+n.x*i,u=a.y+n.y*i,m=a.z+n.z*i,S=s*6;r.setXYZ(S,o.x,o.y,o.z),r.setXYZ(S+1,a.x,a.y,a.z),r.setXYZ(S+2,d,u,m),r.setXYZ(S+3,o.x,o.y,o.z),r.setXYZ(S+4,d,u,m),r.setXYZ(S+5,l,c,h)}),r.needsUpdate=!0,e.visible=Math.abs(i)>no}function eE(e,t,n,i){const r=i==="subtract",o=r?k0:Fi;return e.material.color.setHex(o.capColor),e.material.opacity=o.capOpacity,t.material.color.setHex(o.volumeColor),t.material.opacity=o.volumeOpacity,n.material.color.setHex(o.curtainColor),[e.material,t.material,n.material].forEach(a=>{a.depthTest!==o.depthTest&&(a.depthTest=o.depthTest,a.needsUpdate=!0)}),r?"subtract":"add"}function tE(e,{camera:t=null,initialDistance:n=0,operationAtDistance:i=null,worldNormal:r=null}={}){const o=Y0(e,{worldNormal:r});if(!o)return null;e.updateWorldMatrix?.(!0,!1);const a=new $(o.normal.x,o.normal.y,o.normal.z),s=new $,l=new Kn,c=new $;e.matrixWorld.decompose(s,l,c);const h=new dr({color:Fi.capColor,depthTest:Fi.depthTest,depthWrite:!1,opacity:Fi.capOpacity,side:tn,transparent:!0}),d=new jt(e.geometry.clone(),h);d.name="webcad-push-drag-cap",d.renderOrder=82,d.position.copy(s),d.quaternion.copy(l),d.scale.copy(c),d.userData.type="webcad-push-drag-cap";const u=K0(e),m=Kt(u.map(M=>({start:In(M),end:In(M)})),{color:14707232,depthTest:!1,depthWrite:!1,linewidth:1.7,opacity:.72,renderOrder:84,transparent:!0});m.name="webcad-push-drag-curtain",m.userData.type="webcad-push-drag-curtain";const S=j0(e),x=J0(S,a),f=new qt;f.name="webcad-push-drag-preview",f.userData={type:"webcad-push-drag-preview",axis:o},f.add(x,d,m,q0(o,t,e));const p=M=>{const A=Number(M);if(!Number.isFinite(A))return!1;d.position.copy(s).addScaledVector(a,A),Z0(m,u,a,A),Q0(x,S,a,A),f.userData.distance=A;const v=i?.(A),y=v==="subtract"||v==="add"?v:A<-no?"subtract":"add";return f.userData.operation!==y&&(f.userData.operation=eE(d,x,m,y)),!0};return p(n),{axis:o,cap:d,curtain:m,group:f,volume:x,update:p,dispose(){at(f)}}}function Ic({axis:e,camera:t,controls:n,startPointer:i,viewport:r}={}){if(!e||!t||!i||!r)return null;const o=new $(e.center.x,e.center.y,e.center.z),a=new $(e.normal.x,e.normal.y,e.normal.z);if(a.lengthSq()<=no)return null;a.normalize();const s=n?.target||o,l=t.position.distanceTo(s),c=o.clone().addScaledVector(a,Math.max(l*.12,1)),h=o.clone().project(t),d=c.project(t),u=r(),m=Math.max(1,Number(u?.width)||1),S=Math.max(1,Number(u?.height)||1),x=new et((d.x-h.x)*m*.5,-(d.y-h.y)*S*.5);x.lengthSq()<64?x.set(0,-1):x.normalize();const f=t.isOrthographicCamera?Math.abs(t.top-t.bottom)/(Math.max(1e-4,t.zoom||1)*S):2*Math.max(1,l)*Math.tan(xi.degToRad(t.fov||36)/2)/S;return{screenAxis:{x:x.x,y:x.y},distanceAt(p){return p?new et(Number(p.clientX)-Number(i.x),Number(p.clientY)-Number(i.y)).dot(x)*f:null}}}const nE=/^[0-9eE+\-*/().,\s]$/;function io(e){return e?.localFace?io(e.localFace):e?.supportSolid?"profileFeature":e?.sourceSolid?"moveFace":"profile"}function iE(e,t){const n=Number(t);return Number.isFinite(n)?io(e)==="profile"||e?.supportContactOnly===!0?"add":n<0?"subtract":"add":null}function Dc(e,t,n={}){const i=e?.localFace??e,r=io(i);if(r==="profileFeature")return B0(i,t,n);if(r==="moveFace")return $d(i,t,n);const o=to(i,t);return!o&&Number(t)<0&&n.onDiagnostic?.({operation:{type:"subtract",distance:t},target:null,cutter:{outerPointCount:i?.points?.length??0,holeCount:i?.holes?.length??0},coordinateSystem:i?.workplane??i?.sketchPlane??"face-local",phase:"profile-extrusion",reason:Math.abs(Number(t))<ar?"minimum-thickness":"invalid-cutter-profile",effectiveTolerance:ar}),o}function Lc(e){return{"no-intersection":"Push no válido · el perfil cortador no intersecta el sólido","tangent-contact":"Push no válido · el cortador solo tiene contacto tangente","below-useful-tolerance":"Push no válido · la intersección queda por debajo de la tolerancia útil","invalid-target-solid":"Push no válido · el sólido objetivo tiene geometría inválida","invalid-cutter-profile":"Push no válido · el perfil cortador no es cerrado o válido","minimum-thickness":`Push no válido · el resultado incumple el espesor mínimo ${ar}`,"invalid-result-topology":"Push no válido · la booleana produjo una topología no utilizable","result-empty":"Push no válido · la sustracción eliminaría completamente el sólido","kernel-error":"Push no válido · el núcleo booleano no pudo resolver la operación","kernel-unavailable":"Push no válido · el núcleo booleano 3D no está disponible","invalid-overlap-test":"Push no válido · no se pudo verificar el solape del cortador"}[e?.reason]??"Push no válido · no se pudo completar la operación"}function rE(e){const t=Array.isArray(e?.points)?e.points:[];return t.length?t.reduce((n,i)=>n.add(new $(Number(i.x),Number(i.y),Number(i.z)||0)),new $).multiplyScalar(1/t.length):null}function oE(e,t){const n=rE(e),i=e?.normal??{x:0,y:0,z:1},r=new $(Number(i.x),Number(i.y),Number(i.z));if(!n||r.lengthSq()<=1e-12||!Number.isFinite(Number(t?.x))||!Number.isFinite(Number(t?.y))||!Number.isFinite(Number(t?.z)))return null;r.normalize();const o=new $(Number(t.x),Number(t.y),Number(t.z)).sub(n).dot(r);return Math.abs(o)>1e-9?o:null}function aE(e){return lr(zi(String(e).replace(",",".")))}function yo(e,t){const n=String(e??"").trim(),i=aE(n);return i===null?null:/^[+-]/.test(n)?i:Math.abs(i)*(Number(t)<0?-1:1)}function sE(e){const t=e?.userData?.pushStartPointer,n=Number(t?.x),i=Number(t?.y);return Number.isFinite(n)&&Number.isFinite(i)?{x:n,y:i}:null}function lE({camera:e,canvas:t,controls:n,cursorInput:i=null,getUnitsLabel:r=()=>"mm",getSelectedFace:o,prepareObjectSnaps:a=null,onObjectSnap:s=null,onStatus:l=null,onConsumeFace:c=null,render:h=null,scene:d,viewport:u}){const m=new qt;m.name="webcad-3d-push-solids",d.add(m);let S=!1,x=null,f="",p=null,M=null,A=null,v=null,y=null,E=1,T=null,g=!1,P=null,C=!0;function I(G){l?.(G)}function U(G){P=G||null,s?.(P)}function V(G){return G?{origin:"Origen",endpoint:"Punto",midpoint:"Punto medio",center:"Centro",faceCenter:"Centro de cara",surface:"Cara"}[G.type]??"Punto":""}function k(G,oe){return oE(G,oe?.point)}function B(G){const oe=A?.nearest?.(G)??null,ge=k(x?.userData?.face,oe);return U(ge===null?null:oe),ge}function Y(){Zu(i,{clientPoint:y,text:`${f||nn(E)} ${r()}`,visible:S})}function D(){n&&(n.enabled=C)}function j(G){m.children.forEach(oe=>L0(oe,G)),h?.()}function ae(){p&&(d.remove(p.group),p.dispose(),p=null,M=null)}function q(G,oe){if(!G||!oe?.placement)return G;const ge=ri(oe.placement);return G.position.set(ge.position.x,ge.position.y,ge.position.z),G.quaternion.set(ge.quaternion.x,ge.quaternion.y,ge.quaternion.z,ge.quaternion.w),G.userData.placement=ge,G}function ne(G){x&&(x.visible=G)}function ue(){const G=x?.userData?.face;return G?.sourceSolidGroup??G?.supportSolidGroup??null}function we(G){const oe=ue();oe&&(oe.visible=G)}function Le(G){const oe=lr(G);!S||!x?.userData?.face||oe===null||(E=oe,p?.update(E),I(f?`Push: ${f} (${nn(E)})${P?` · OSNAP ${V(P)}`:""}`:`Push: ${nn(E)} ${r()}${P?` · OSNAP ${V(P)}`:""} · escriba distancia o clic para confirmar`),Y(),h?.())}function ze(G,oe,ge={}){const Ce=Tc(G,oe,{edgeColor:Qe.edgeColor,edgeLineWidth:Qe.edgeLineWidth,faceColor:ge.faceColor??Qe.faceColor,name:ge.name??`webcad-push-solid-${G?.id??"face"}`,renderOrder:20});return Ce?(m.add(Ce),h?.(),Ce):null}function J(G,oe){const ge=typeof oe=="string"?oe:oe?.id;return!G||!ge||(G.userData={...G.userData??{},documentSolidId:ge},G.traverse?.(Ce=>{Ce.userData={...Ce.userData??{},documentSolidId:ge}})),G}function ce(){return S?(S=!1,f="",we(!0),ne(!0),x=null,v=null,y=null,T=null,g=!1,A=null,U(null),ae(),Or(i),D(),I("Push cancelado"),h?.(),!0):!1}function O(){if(!S||!x?.userData?.face||lr(E)===null)return!1;if(f&&yo(f,E)===null)return I(`Push: distancia no valida (${f})`),!1;const G=x.userData.face;let oe=null,ge=null;const Ce={onDiagnostic:Ve=>{ge=Ve}};let Xe=!1;const Je=io(G);if(Je==="profileFeature"){const Ve=Dc(G,E,Ce);if(!Ve)return we(!0),I(Lc(ge)),h?.(),!1;Xe=Ve.metadata?.profileFeatures?.at?.(-1)?.through===!0,oe=No(Ve,{edgeColor:Qe.edgeColor,edgeLineWidth:Qe.edgeLineWidth,faceColor:Qe.faceColor,name:`webcad-push-solid-${x.userData.faceId}`,renderOrder:20}),q(oe,G)}else if(Je==="moveFace"){const Ve=Dc(G,E,Ce);if(!Ve)return we(!0),I(Lc(ge)),h?.(),!1;E=Number(Ve.metadata?.lastPushDistance)||E,oe=No(Ve,{edgeColor:Qe.edgeColor,edgeLineWidth:Qe.edgeLineWidth,faceColor:Qe.faceColor,name:`webcad-push-solid-${x.userData.faceId}`,renderOrder:20}),q(oe,G)}else if(oe=Tc(G,E,{edgeColor:Qe.edgeColor,edgeLineWidth:Qe.edgeLineWidth,faceColor:Qe.faceColor,name:`webcad-push-solid-${x.userData.faceId}`,renderOrder:20}),!oe)return we(!0),I(`Push no valido · espesor minimo 3D: ${ar}`),h?.(),!1;if(ae(),Je==="profileFeature"||Je==="moveFace"){const Ve=ue();Ve&&(m.remove(Ve),at(Ve))}return m.add(oe),ne(!1),c?.(x,oe,{height:E,sourceKey:Ai(G)}),S=!1,f="",x=null,v=null,y=null,T=null,g=!1,A=null,U(null),Or(i),D(),I(Xe?`Push creado · hueco pasante (${nn(E)})`:`Push creado · altura ${nn(E)}`),h?.(),!0}function xe(){const G=o?.();return G?.userData?.face?(ce(),S=!0,x=G,ne(!1),f="",E=1,v=sE(x),y=v,t?.focus?.({preventScroll:!0}),C=n?.enabled!==!1,n&&(n.enabled=!1),we(!0),p=tE(x,{camera:e,initialDistance:E,operationAtDistance:oe=>iE(x.userData.face,oe),worldNormal:x.userData.face.normal}),p?(d.add(p.group),M=Ic({axis:p.axis,camera:e,controls:n,startPointer:v,viewport:u}),A=a?.(x.userData.face)??null,Le(E),I("Push activo · mueva el cursor, escriba altura y confirme con clic o Enter"),!0):(S=!1,ne(!0),D(),I("Push no disponible · no se pudo determinar la normal de la cara"),!1)):(I("Seleccione un recinto cerrado antes de usar Push"),!1)}function ee(G){if(!S)return;v||(v={x:G.clientX,y:G.clientY}),y={x:G.clientX,y:G.clientY},M||(M=Ic({axis:p?.axis,camera:e,controls:n,startPointer:v,viewport:u})),T&&Math.hypot(G.clientX-T.x,G.clientY-T.y)>4&&(g=!0);const oe=B(G),ge=oe??M?.distanceAt(G)??E;if(f){const Ce=yo(f,ge);Ce!==null?Le(Ce):Y();return}oe===null&&U(null),Math.abs(ge)>1e-9&&Le(ge)}function W(G){S&&(v||(v={x:G.clientX,y:G.clientY}),y={x:G.clientX,y:G.clientY},T={x:G.clientX,y:G.clientY},g=!1)}function me(G){if(S){if(G.preventDefault(),G.stopImmediatePropagation(),g){T=null,g=!1;return}if(T=null,y={x:G.clientX,y:G.clientY},!f){const oe=B(G);oe!==null&&Le(oe)}O()}}function de(G){if(S){if(G.key==="Escape"){G.preventDefault(),ce();return}if(G.key==="Enter"){G.preventDefault(),O();return}if(G.key==="Backspace"){G.preventDefault(),f=f.slice(0,-1);const oe=f?yo(f,E):null;oe!==null?Le(oe):(I(f?`Push: ${f}`:"Push: mueva el cursor o escriba altura"),Y());return}if(G.key.length===1&&nE.test(G.key)){G.preventDefault(),f+=G.key;const oe=yo(f,E);oe!==null?Le(oe):(I(`Push: ${f}`),Y())}}}return t?.addEventListener?.("pointermove",ee),t?.addEventListener?.("pointerdown",W,!0),t?.addEventListener?.("click",me,!0),t?.addEventListener?.("keydown",de),{cancel:ce,addDocumentSolid(G){if(!G?.solid||G.visible===!1)return null;const oe=No(G.solid,{edgeColor:Qe.edgeColor,edgeLineWidth:Qe.edgeLineWidth,faceColor:Qe.faceColor,name:`webcad-push-document-${G.id}`,renderOrder:20});return q(oe,{placement:G.placement}),J(oe,G),m.add(oe),h?.(),oe},addSessionSolid(G,oe){return ze(G,oe,{name:`webcad-push-session-${G?.id??"face"}`})},clearSolids(){ae(),m.children.slice().forEach(G=>{m.remove(G),at(G)}),h?.()},setHiddenEdges:j,confirm:O,dispose(){t?.removeEventListener?.("pointermove",ee),t?.removeEventListener?.("pointerdown",W,!0),t?.removeEventListener?.("click",me,!0),t?.removeEventListener?.("keydown",de),ce(),d.remove(m),at(m)},getHeight:()=>E,getSolidObjects:()=>m.children,isActive:()=>S,start:xe,tagDocumentSolidGroup:J}}function cE(e){const t=e.authority,n=t.base;return[{type:"pushFromProfile",distance:n.distance,sourceKey:n.metadata?.sourceKey??null},...(t.operations??[]).map(i=>["cutSolidByPlane","subtractSolid","unionSolid"].includes(i.type)?{...i}:{...i,type:i.exactProfile?i.type==="union"?"pushUnionProfile":"pushSubtractProfile":"pushMoveFace"})]}function Nc(e,t={}){if(Number(e?.version)!==sh)return e;const n=(e.solids??[]).filter(r=>!r?.solid);return n.length&&n.map(r=>{const o=ja({...r.authority,sourceSolidDocumentId:r.id},t),a=o?lh(o):null;if(!o||!a?.valid)throw new Error(`No se pudo reconstruir ${r.name||r.id}: ${a?.errors?.join(", ")||"replay parametrico incompleto"}`);return{record:r,solid:o}}).forEach(({record:r,solid:o})=>{const a=cE(r);o.metadata={...o.metadata,sourceSolidDocumentId:r.id},r.solid=o,r.metadata=o.metadata,r.exactGeometry=o.metadata.exactGeometry??null,r.operations=a,r.operation=r.provenance??a.at(-1)??null}),e}const Kr=1e-9,Kd=10,uE=10;function Si(e){return new $(Number(e?.x)||0,Number(e?.y)||0,Number(e?.z)||0)}function Uc(e){const t=r=>[r.x,r.y,r.z].map(o=>Number(o).toFixed(7)).join(":"),n=t(e.start),i=t(e.end);return n<i?`${n}|${i}`:`${i}|${n}`}function dE(e,t,n){const i=new et().subVectors(n,t),r=i.lengthSq();if(r<=Kr)return{distance:e.distanceTo(t),parameter:0};const o=xi.clamp(new et().subVectors(e,t).dot(i)/r,0,1),a=t.clone().addScaledVector(i,o);return{distance:e.distanceTo(a),parameter:o}}function fE(e,t){if(e?.isOrthographicCamera){const o=new $;e.getWorldDirection(o).normalize();const a=new $;e.getWorldPosition(a);const s=Math.max(Kr,t.clone().sub(a).dot(o));return{direction:o,origin:t.clone().addScaledVector(o,-s),targetDistance:s}}const n=new $;e.getWorldPosition(n);const i=t.clone().sub(n),r=i.length();return r>Kr&&i.multiplyScalar(1/r),{direction:i,origin:n,targetDistance:r}}function Zo(e,t,n,i){const r=fE(n,i);if(r.targetDistance<=Kr)return!0;const o=Math.max(1e-6,r.targetDistance*1e-5);e.set(r.origin,r.direction),e.near=0,e.far=r.targetDistance+o;const a=e.intersectObjects(t,!1)[0];return!a||a.distance>=r.targetDistance-o}function pE(e){const t=Math.round(Number(e));return Number.isFinite(t)?xi.clamp(t,1,32):Kd}function hE(e,t,n,i,r,o){if(!e?.isMesh||!t)return{hidden:[],visible:[n]};const a=Si(n.start),s=Si(n.end),l=a.clone().applyMatrix4(e.matrixWorld),c=s.clone().applyMatrix4(e.matrixWorld),h=p=>Zo(r,i,t,l.clone().lerp(c,p)),d=(p,M,A)=>{let v=p,y=M;for(let E=0;E<uE;E+=1){const T=(v+y)*.5;h(T)===A?v=T:y=T}return(v+y)*.5},u=Array.from({length:o},(p,M)=>{const A=(M+.5)/o;return h(A)}),m={hidden:[],visible:[]};let S=0,x=u[0];const f=p=>{if(p-S<=Kr)return;const M=a.clone().lerp(s,S),A=a.clone().lerp(s,p);m[x?"visible":"hidden"].push({start:{x:M.x,y:M.y,z:M.z},end:{x:A.x,y:A.y,z:A.z}})};for(let p=1;p<u.length;p+=1){if(u[p]===x)continue;const M=d((p-.5)/o,(p+.5)/o,x);f(M),S=M,x=u[p]}return f(1),m}function Fc({camera:e,mesh:t,occluders:n=null,segments:i=[],sourceEdgeIndices:r=[],curveGroupIds:o=[],visibilitySamples:a=Kd}={}){if(!t?.isMesh||!e)return{hidden:[],visible:[]};t.updateWorldMatrix(!0,!1),e.updateWorldMatrix(!0,!1);const s=new fr,l=(Array.isArray(n)&&n.length?n:[t]).filter(d=>d?.isMesh&&d.visible!==!1),c=pE(a);l.forEach(d=>d.updateWorldMatrix(!0,!1));const h={hidden:[],visible:[]};return i.forEach((d,u)=>{if(!d?.start||!d?.end)return;const m=hE(t,e,d,l,s,c);["visible","hidden"].forEach(S=>{m[S].forEach(x=>h[S].push({measurementSegment:d,segment:x,sourceEdgeIndices:r[u]??null,curveGroupId:o[u]??null}))})}),h}function mE(e,t){const n=e.children?.find(a=>a.userData?.type==="webcad-push-visible-edge-overlay"),i=e.children?.find(a=>a.userData?.type==="webcad-push-solid-edges"),r=e.children?.find(a=>a.userData?.type==="webcad-push-solid-tangent-edges"),o=e.children?.find(a=>a.userData?.type==="webcad-push-generatrix-silhouette");return[t?i:n,r,o?.visible===!1?null:o].filter(Boolean)}function gE(e,t,n,i,r={}){const o=Math.max(1,Number(i?.width)||1),a=Math.max(1,Number(i?.height)||1),s=Math.max(1,Number(r.maxDistancePixels)||5),l=r.includeHidden===!0,c=new et((n.x+1)*o*.5,(1-n.y)*a*.5),h=new $;t.getWorldPosition(h);const d=[];l||(Array.isArray(e)?e:[]).forEach(x=>{x?.traverse?.(f=>{f?.isMesh&&f.visible!==!1&&f.userData?.type==="webcad-push-solid"&&(f.updateWorldMatrix(!0,!1),d.push(f))})});const u=d.length?new fr:null,m=new Set;let S=null;return(Array.isArray(e)?e:[]).forEach(x=>{mE(x,l).forEach(f=>{f.updateWorldMatrix(!0,!1);const p=f.userData?.sourceSegments??[],M=f.userData?.measurementSegments??p,A=f.userData?.sourceEdgeIndices??[],v=f.userData?.curveGroupIds??[];p.forEach((y,E)=>{if(!y?.start||!y?.end)return;const T=`${x.userData?.documentSolidId??x.uuid}:${Uc(y)}`;if(m.has(T))return;m.add(T);const g=Si(y.start).applyMatrix4(f.matrixWorld),P=Si(y.end).applyMatrix4(f.matrixWorld),C=g.clone().project(t),I=P.clone().project(t);if(C.z<-1&&I.z<-1||C.z>1&&I.z>1)return;const U=new et((C.x+1)*o*.5,(1-C.y)*a*.5),V=new et((I.x+1)*o*.5,(1-I.y)*a*.5),k=dE(c,U,V);if(k.distance>s)return;const B=g.clone().lerp(P,k.parameter);if(u&&!Zo(u,d,t,B))return;const Y=h.distanceTo(B);if(S&&(k.distance>S.screenDistance+.25||Math.abs(k.distance-S.screenDistance)<=.25&&Y>=S.cameraDistance))return;const D=v[E]??null,j=D===null?[M[E]??y]:M.filter((ne,ue)=>v[ue]===D&&ne?.start&&ne?.end),ae=[],q=new Set;j.forEach(ne=>{const ue=Si(ne.start).applyMatrix4(f.matrixWorld),we=Si(ne.end).applyMatrix4(f.matrixWorld),Le={start:{x:ue.x,y:ue.y,z:ue.z},end:{x:we.x,y:we.y,z:we.z}},ze=Uc(Le);q.has(ze)||(q.add(ze),ae.push(Le))}),S={cameraDistance:Y,curveGroupId:D,documentSolidId:x.userData?.documentSolidId??null,end:{x:P.x,y:P.y,z:P.z},key:D===null?T:`${x.userData?.documentSolidId??x.uuid}:curve:${D}`,length:ae.reduce((ne,ue)=>ne+Si(ue.start).distanceTo(Si(ue.end)),0),screenDistance:k.distance,segments:ae,sourceEdgeIndices:A[E]??null,start:{x:g.x,y:g.y,z:g.z}}})})}),S}const Oc=Math.PI*2,ba=new WeakMap;function Za(e){const t=Number(e?.x),n=Number(e?.y),i=Number(e?.z??0);return Number.isFinite(t)&&Number.isFinite(n)&&Number.isFinite(i)?{x:t,y:n,z:i}:null}function _E(e,t){return{x:(e.x+t.x)*.5,y:(e.y+t.y)*.5,z:(e.z+t.z)*.5}}function fi(e,t,n,i,r,o={}){const a=Za(i);if(!a)return;const s=o.analyticCurveId??o.analyticLineId??"",l=`${n}:${s}:${a.x.toFixed(8)}:${a.y.toFixed(8)}:${a.z.toFixed(8)}`;t.has(l)||(t.add(l),e.push({type:n,point:a,documentSolidId:r??null,...o}))}function zc(e){const t=Number(e)%Oc;return t<0?t+Oc:t}function xE(e,t,n=!0){return zc(n?t-e:e-t)}function vE(e,t){return e.closed===!0||xE(e.startAngle,t,e.clockwise)<=Number(e.sweep)+1e-8}function SE(e){return{analyticCurve:e,analyticCurveId:e.id,analyticCurveType:e.type}}function EE(e,t,n,i){n.lines.forEach(r=>{const o={analyticLine:r,analyticLineId:r.id};fi(e,t,"endpoint",r.start,i,o),fi(e,t,"endpoint",r.end,i,o),fi(e,t,"midpoint",_E(r.start,r.end),i,o)}),n.curves.forEach(r=>{const o=SE(r);if(!r.closed){fi(e,t,"endpoint",Rr(r,r.startAngle),i,o),fi(e,t,"endpoint",Rr(r,r.endAngle),i,o);const a=r.clockwise?1:-1;fi(e,t,"midpoint",Rr(r,r.startAngle+a*r.sweep*.5),i,o)}fi(e,t,"center",r.center,i,o),[0,Math.PI/2,Math.PI,Math.PI*1.5].filter(a=>vE(r,a)).forEach(a=>fi(e,t,"quadrant",Rr(r,a),i,o))})}function Bc(e,t,n,i,r={}){if(n.length<3)return;const o=n.reduce((a,s)=>({x:a.x+s.x,y:a.y+s.y,z:a.z+s.z}),{x:0,y:0,z:0});fi(e,t,"faceCenter",{x:o.x/n.length,y:o.y/n.length,z:o.z/n.length},i,r)}function yE(e,t,n,i,r){const o=Array.isArray(n?.vertices)?n.vertices.map(Za):[],a=(n?.metadata?.planarFaceGroups??[]).filter(s=>Array.isArray(s?.outerLoop)&&s.outerLoop.length>=3);if(a.length){a.forEach((s,l)=>Bc(e,t,s.outerLoop.map(Za).filter(Boolean),r,{semanticFaceId:s.id??`planar-face-${l}`,semanticFaceKind:s.kind??"planar-face"}));return}(n?.faces||[]).forEach((s,l)=>{if(i.faceSurfaceIds[l])return;const c=(s||[]).map(h=>o[h]).filter(Boolean);Bc(e,t,c,r,{semanticFaceId:`solid-face-${l}`,semanticFaceKind:"planar-face"})})}function ME(e){return ba.has(e)||ba.set(e,{edges:Ju(e),topology:xs(e)}),ba.get(e)}function bE(e,t){const n=[],i=new Set,r=ME(e);return EE(n,i,r.edges,t),yE(n,i,e,r.topology,t),n}function AE(e,t){if(!e)return null;const n=t.localToWorld(new $(e.center.x,e.center.y,e.center.z)),i=new ct().setFromMatrix4(t.matrixWorld),r=s=>new $(s.x,s.y,s.z).applyMatrix3(i),o=r(e.uAxis),a=r(e.vAxis);return{...e,center:{x:n.x,y:n.y,z:n.z},uAxis:{x:o.x,y:o.y,z:o.z},vAxis:{x:a.x,y:a.y,z:a.z}}}function TE(e,t){const n=new $(e.point.x,e.point.y,e.point.z);t.updateWorldMatrix?.(!0,!1);const i=t.localToWorld?.(n)??n;return{...e,analyticCurve:AE(e.analyticCurve,t),localPoint:{...e.point},point:{x:i.x,y:i.y,z:i.z}}}function jd(e,{excludeDocumentSolidIds:t=[],includeWorldOrigin:n=!0,visibleOnly:i=!1}={}){const r=n?[{type:"origin",point:{x:0,y:0,z:0},localPoint:{x:0,y:0,z:0},documentSolidId:null,alwaysVisible:!0}]:[],o=new Set,a=new Set(t);return(e||[]).forEach(s=>{i&&s?.visible===!1||a.has(s?.userData?.documentSolidId)||s?.traverse?.(l=>{if(i&&l?.visible===!1||a.has(l?.userData?.documentSolidId))return;const c=l?.userData?.analyticSolid??l?.userData?.solid;!c||o.has(c)||(o.add(c),r.push(...bE(c,l.userData?.documentSolidId).map(h=>TE(h,l))))})}),r}function PE(e){const t=[];return(e||[]).forEach(n=>{n?.visible!==!1&&n?.traverse?.(i=>{i?.isMesh&&i.visible!==!1&&i.userData?.type==="webcad-push-solid"&&(i.updateWorldMatrix?.(!0,!1),t.push(i))})}),t}function wE(e,t,n){const i=new $(e.point.x,e.point.y,e.point.z),r=i.clone().project(t);return r.z<-1||r.z>1?null:{candidate:e,cameraDistance:t.position.distanceTo(i),point:i,x:(r.x+1)*n.width*.5,y:(1-r.y)*n.height*.5}}function RE(e,t,n){return`${Math.floor(e/n)}:${Math.floor(t/n)}`}function CE({camera:e,canvas:t,solidObjects:n,maxDistancePixels:i=14,acceptCandidate:r=null,excludeDocumentSolidIds:o=[],extraCandidates:a=[],includeHidden:s=!1,visibleOnly:l=!1}={}){if(!e||!t)return null;const c=t.getBoundingClientRect(),h=Math.max(1,Number(i)||14),d=s?[]:PE(n),u=d.length?new fr:null,m=[...jd(n,{excludeDocumentSolidIds:o,visibleOnly:l}),...Array.isArray(a)?a:[]].filter(f=>!r||r(f)).map(f=>wE(f,e,c)).filter(Boolean),S=new Map;m.forEach(f=>{const p=RE(f.x,f.y,h);S.has(p)||S.set(p,[]),S.get(p).push(f)});let x=0;return{candidateCount:m.length,occluderCount:d.length,getLastCandidateChecks:()=>x,nearest(f){if(!f)return null;const p=t.getBoundingClientRect(),M=f.clientX-p.left,A=f.clientY-p.top,v=Math.floor(M/h),y=Math.floor(A/h),E=[];for(let g=-1;g<=1;g+=1)for(let P=-1;P<=1;P+=1)E.push(...S.get(`${v+g}:${y+P}`)??[]);x=E.length;let T=null;return E.forEach(g=>{const P=Math.hypot(M-g.x,A-g.y);if(P>i||!g.candidate.alwaysVisible&&u&&!Zo(u,d,e,g.point))return;const C=T&&Math.abs(P-T.distancePixels)<=.25;T&&P>T.distancePixels+.25||C&&g.cameraDistance>=T.cameraDistance||(T={...g.candidate,distancePixels:P,cameraDistance:g.cameraDistance})}),T}}}function Mo({camera:e,canvas:t,event:n,solidObjects:i,maxDistancePixels:r=14,acceptCandidate:o=null,excludeDocumentSolidIds:a=[],extraCandidates:s=[],includeHidden:l=!1}={}){if(!e||!t||!n)return null;const c=t.getBoundingClientRect(),h=Math.max(1,c.width),d=Math.max(1,c.height),u=[];l||(i||[]).forEach(x=>{x?.traverse?.(f=>{f?.isMesh&&f.visible!==!1&&f.userData?.type==="webcad-push-solid"&&(f.updateWorldMatrix?.(!0,!1),u.push(f))})});const m=u.length?new fr:null;let S=null;return[...jd(i,{excludeDocumentSolidIds:a}),...Array.isArray(s)?s:[]].forEach(x=>{if(o&&!o(x))return;const f=new $(x.point.x,x.point.y,x.point.z).project(e);if(f.z<-1||f.z>1)return;const p=c.left+(f.x+1)*h*.5,M=c.top+(1-f.y)*d*.5,A=Math.hypot(n.clientX-p,n.clientY-M);if(A>r||!x.alwaysVisible&&m&&!Zo(m,u,e,new $(x.point.x,x.point.y,x.point.z)))return;const v=e.position.distanceTo(new $(x.point.x,x.point.y,x.point.z)),y=S&&Math.abs(A-S.distancePixels)<=.25;S&&A>S.distancePixels+.25||y&&v>=S.cameraDistance||(S={...x,distancePixels:A,cameraDistance:v})}),S}const Zd=64,IE=8,Gc=16250866,DE=14149887;function Ps(e,t=!0){const n=Number(e?.x),i=Number(e?.y);return!Number.isFinite(n)||!Number.isFinite(i)?null:{x:n,y:t?-i:i,z:0}}function Go(e,t,n){return Math.hypot(e.x-t.x,e.y-t.y)<=n}function Jd(e){let t=0;for(let n=0;n<e.length;n+=1){const i=e[n],r=e[(n+1)%e.length];t+=i.x*r.y-r.x*i.y}return Math.abs(t)*.5}function Qd(e){return e.reduce((t,n)=>({minX:Math.min(t.minX,n.x),minY:Math.min(t.minY,n.y),maxX:Math.max(t.maxX,n.x),maxY:Math.max(t.maxY,n.y)}),{minX:1/0,minY:1/0,maxX:-1/0,maxY:-1/0})}function LE(e,t){let n=!1;for(let i=0,r=t.length-1;i<t.length;r=i++){const o=t[i],a=t[r];o.y>e.y!=a.y>e.y&&e.x<(a.x-o.x)*(e.y-o.y)/(a.y-o.y)+o.x&&(n=!n)}return n}function NE(e,t,n){const i=n.x-t.x,r=n.y-t.y,o=i*i+r*r;if(o<=Number.EPSILON)return Math.hypot(e.x-t.x,e.y-t.y);const a=Math.max(0,Math.min(1,((e.x-t.x)*i+(e.y-t.y)*r)/o));return Math.hypot(e.x-(t.x+i*a),e.y-(t.y+r*a))}function UE(e,t,n){return e.points.some(i=>t.points.some((r,o)=>NE(i,r,t.points[(o+1)%t.points.length])<=n))}function FE(e,t,n){if(e===t||e.area<=t.area)return!1;const i=new Set(e.sourceEntities||[e.sourceEntity].filter(Boolean));return(t.sourceEntities||[t.sourceEntity].filter(Boolean)).some(o=>i.has(o))||UE(e,t,n)?!1:t.points.every(o=>LE(o,e.points))}function OE(e,t){const n=new Map;return e.forEach(i=>{const r=e.filter(o=>FE(o,i,t));n.set(i,r.sort((o,a)=>o.area-a.area)[0]||null)}),e.map(i=>{const r=e.filter(s=>n.get(s)===i),o=r.map(s=>s.exactProfile).filter(Boolean),a=i.exactProfile&&o.length?$S(i.exactProfile,o,{id:i.id}):i.exactProfile;return{...i,exactProfile:a,holes:r.map(s=>s.points),holeCadProfileVertexIndices:r.map(s=>s.cadProfileVertexIndices||[]),holeSmoothProfileVertexIndices:r.map(s=>s.smoothProfileVertexIndices||[]),area:Math.max(0,i.area-r.reduce((s,l)=>s+l.area,0)),sourceEntities:[...new Set([...i.sourceEntities||[i.sourceEntity],...r.flatMap(s=>s.sourceEntities||[s.sourceEntity])].filter(Boolean))]}}).filter(i=>i.area>0&&i.exactProfile)}function zE(e,t){return`face-${e?.id??e?.handle??`${e?.type??"ENTITY"}-${t}`}`}function BE(e,t){const n=Ps(e?.center,t.invertY),i=Number(e?.radius);if(!n||!Number.isFinite(i)||i<=t.tolerance)return null;const r=Math.max(16,Number(t.circleSegments)||Zd),o=Array.from({length:r},(a,s)=>{const l=ei*s/r;return{x:n.x+Math.cos(l)*i,y:n.y+(t.invertY?-Math.sin(l):Math.sin(l))*i,z:0}});return{points:o,cadProfileVertexIndices:[],smoothProfileVertexIndices:o.map((a,s)=>s)}}function GE(e,t){const n=gd(e,{...t,curveSegments:Math.max(16,Number(t.ellipseSegments)||Zd)});if(n.length<4)return null;const i=n.slice(0,-1).map(r=>Ps(r,t.invertY));return i.some(r=>!r)?null:{points:i,cadProfileVertexIndices:[],smoothProfileVertexIndices:i.map((r,o)=>o)}}function VE(e,t){if(!Array.isArray(e?.vertices)||e.vertices.length<2)return[];const n=Go(e.vertices[0],e.vertices[e.vertices.length-1],t),i=n?e.vertices.slice(0,-1):e.vertices,r=e.closed||n?i.length:Math.min(e.segments?.length??i.length-1,i.length-1);return Array.from({length:r},(o,a)=>{const s=i[a],l=i[(a+1)%i.length],c=e.segments?.[a]||{type:"LINE"};return!s||!l?null:c.type!=="ARC"||!c.center?{type:"LINE",start:s,end:l,sourceEntity:e}:{type:"ARC",center:c.center,radius:Math.hypot(s.x-c.center.x,s.y-c.center.y),startAngle:Tl(c.center,s),endAngle:Tl(c.center,l),clockwise:c.clockwise!==!1,sourceEntity:e}}).filter(o=>o&&Number.isFinite(o.radius??1))}function kE(e,t){const n=e.flatMap(i=>i?.type==="POLYLINE"?VE(i,t):i?.type==="LINE"||i?.type==="ARC"||i?.type==="CIRCLE"||i?.type==="ELLIPSE"||i?.type==="ELLIPSE_ARC"?[{...i,sourceEntity:i}]:[]);return n.filter(i=>i.type!=="CIRCLE"&&i.type!=="ELLIPSE"?!0:n.some(r=>r!==i&&Qu(i,r,()=>[]).length>0))}function Vc(e,t){return e.type==="LINE"?_h(e,t):ed(e)?xh(e,t):vh(e,t)}function jr(e,t){return e.type==="LINE"?Sh(e,t):ed(e)?Eh(e,yh(e,t)):Mh(e,t)}function kc(e,t,n){const i=t.end.x-t.start.x,r=t.end.y-t.start.y,o=i*i+r*r;if(o<=n*n)return!1;const a=Math.sqrt(o);if(Math.abs((e.x-t.start.x)*r-(e.y-t.start.y)*i)/a>n)return!1;const l=((e.x-t.start.x)*i+(e.y-t.start.y)*r)/o,c=n/a;return l>=-c&&l<=1+c}function HE(e,t,n){if(e?.type!=="LINE"||t?.type!=="LINE")return[];const i=[e.start,e.end,t.start,t.end];return i.filter((r,o)=>kc(r,e,n)&&kc(r,t,n)&&i.findIndex(a=>Go(a,r,n))===o)}function WE(e,t){const i=e.outgoing.filter(a=>a.active).reduce((a,s)=>Math.min(a,Math.hypot(s.to.point.x-e.point.x,s.to.point.y-e.point.y)),1/0),r=Number.isFinite(i)?Math.max(t,i*.25):t,o=a=>{const s=Math.hypot(a.to.point.x-e.point.x,a.to.point.y-e.point.y);if(s<=t)return Math.atan2(a.to.point.y-e.point.y,a.to.point.x-e.point.x);const l=Math.min(.25,r/s),c=a.startParameter+(a.endParameter-a.startParameter)*l,h=jr(a.entity,c)||a.to.point;return Math.atan2(h.y-e.point.y,h.x-e.point.x)};e.outgoing.sort((a,s)=>o(a)-o(s))}function Hc(e,t){const i=(e.endParameter-e.startParameter)*1e-4,r=t?e.endParameter:e.startParameter,o=t?r-i:r+i,a=jr(e.entity,r),s=jr(e.entity,o);if(!a||!s)return null;const l=t?a.x-s.x:s.x-a.x,c=t?a.y-s.y:s.y-a.y,h=Math.hypot(l,c);return h>1e-12?{x:l/h,y:c/h}:null}function XE(e,t){const n=Hc(e,!0),i=Hc(t,!1);if(!n||!i)return!1;const r=n.x*i.x+n.y*i.y,o=n.x*i.y-n.y*i.x;return Math.abs(r)>=1-1e-6&&Math.abs(o)<=.001}function YE(e,t){const n=kE(e,t.tolerance);if(!n.length)return[];const i=new Map(n.map(d=>[d,d.type==="CIRCLE"||d.type==="ELLIPSE"?[0,.25,.5,.75,1]:[0,1]]));for(let d=0;d<n.length;d+=1)for(let u=d+1;u<n.length;u+=1){const m=n[d],S=n[u],x=[...Qu(m,S,()=>[]),...HE(m,S,t.tolerance)];for(const f of x)i.get(m).push(Vc(m,f)),i.get(S).push(Vc(S,f))}const r=[],o=d=>{const u=r.find(S=>Go(S.point,d,t.tolerance));if(u)return u;const m={point:{...d},outgoing:[],id:r.length+1};return r.push(m),m},a=[],s=new Set,l=(d,u,m)=>{const S=jr(d,u),x=jr(d,m);if(!S||!x||Go(S,x,t.tolerance))return;const f=o(S),p=o(x);if(d.type==="LINE"){const v=f.id<p.id?`${f.id}:${p.id}`:`${p.id}:${f.id}`;if(s.has(v))return;s.add(v)}const M={from:f,to:p,entity:d,startParameter:u,endParameter:m,twin:null,active:!0,visited:!1},A={from:p,to:f,entity:d,startParameter:m,endParameter:u,twin:M,active:!0,visited:!1};M.twin=A,f.outgoing.push(M),p.outgoing.push(A),a.push(M,A)};n.forEach(d=>{const u=ph(i.get(d));for(let m=0;m<u.length-1;m+=1){const S=u[m],x=u[m+1],f=d.type==="CIRCLE"||d.type==="ELLIPSE"?ei:d.type==="ARC"?hh(d):d.type==="ELLIPSE_ARC"?mh(d):0,p=Math.max(1,Math.ceil(f*(x-S)/(Math.PI/48)));for(let M=0;M<p;M+=1)l(d,S+(x-S)*M/p,S+(x-S)*(M+1)/p)}});let c=!0;for(;c;)c=!1,r.forEach(d=>{const u=d.outgoing.filter(m=>m.active);u.length===1&&(u[0].active=!1,u[0].twin.active=!1,c=!0)});r.forEach(d=>WE(d,t.tolerance));const h=[];return a.forEach(d=>{if(!d.active||d.visited)return;const u=[];let m=d;for(let y=0;y<=a.length;y+=1){if(!m.active||m.visited&&m!==d)return;m.visited=!0,u.push(m);const E=m.to.outgoing.filter(g=>g.active),T=E.indexOf(m.twin);if(T<0)return;if(m=E[(T-1+E.length)%E.length],m===d)break}if(m!==d)return;const S=u.map(y=>y.from.point);if(S.length<3||Math.abs(gh(S))<=t.tolerance)return;const x=S.map(y=>Ps(y,t.invertY));if(x.some(y=>!y))return;const f=`face-composite-${h.length}`,p=YS(u.map(y=>({entity:y.entity,startParameter:y.startParameter,endParameter:y.endParameter,startHasSemanticJunction:y.from.outgoing.filter(E=>E.active).length>2,endHasSemanticJunction:y.to.outgoing.filter(E=>E.active).length>2})),{id:f,tolerance:t.tolerance});if(!p||p.orientation.outer!=="ccw")return;const M=u.map((y,E)=>XE(u[(E-1+u.length)%u.length],y)?E:-1).filter(y=>y>=0),A=new Set(M),v=u.map((y,E)=>A.has(E)?-1:E).filter(y=>y>=0);h.push({id:f,sourceEntity:null,sourceEntities:[...new Set(u.map(y=>y.entity.sourceEntity||y.entity))],sourceEntityType:"COMPOSITE",exactProfile:p,points:x,bounds:Qd(x),area:Jd(x),cadProfileVertexIndices:v,smoothProfileVertexIndices:M})}),h}function $E(e,t={}){const n={arcChordTolerance:t.arcChordTolerance,circleSegments:t.circleSegments,ellipseSegments:t.ellipseSegments,invertY:t.invertY!==!1,maxArcSegmentAngle:t.maxArcSegmentAngle,maxArcSegments:t.maxArcSegments,tolerance:Number(t.tolerance)||ch},i=Array.isArray(e)?e:[],r=YE(i,n),o=new Set(r.flatMap(s=>s.sourceEntities||[])),a=i.map((s,l)=>{if(o.has(s))return null;const c=s?.type==="CIRCLE"?BE(s,n):s?.type==="ELLIPSE"?GE(s,n):null;if(!c?.points)return null;const{points:h}=c,d=Jd(h);return d<=n.tolerance?null:{id:zE(s,l),sourceEntity:s,sourceEntityType:s.type,exactProfile:Pd(s),points:h,bounds:Qd(h),area:d,cadProfileVertexIndices:c.cadProfileVertexIndices??[],smoothProfileVertexIndices:c.smoothProfileVertexIndices??[]}}).filter(Boolean);return OE([...a,...r],n.tolerance)}function qE(e){const t=new uh(e.points.map(o=>new et(o.x,o.y)));t.holes=(e.holes||[]).map(o=>new dh(o.map(a=>new et(a.x,a.y))));const n=new fh(t),i=new dr({color:Gc,depthTest:!1,depthWrite:!1,opacity:1,side:tn,transparent:!1}),r=new jt(n,i);return r.name=`webcad-simple-face-${e.id}`,r.renderOrder=IE,r.userData={type:"webcad-simple-face",faceId:e.id,face:e,defaultColor:Gc,selectedColor:DE},r}const Zr=Math.PI*2,cr=1e-7,KE=2e-7,Bn=1e-12,Wc=16765286,jE=.006,ZE=96,ws=Math.PI/6+1e-5,Vo=Symbol("analytic-start-snapped"),ko=Symbol("analytic-end-snapped"),Uo=new WeakMap,Aa=new WeakMap,JE=[new $(.742,.421,.522).normalize(),new $(-.311,.817,.486).normalize(),new $(.537,-.239,.809).normalize()],QE=24,ey=25,ty=26;function ny(e,t){if(!e)return null;const n=ri(t),i=a=>bh(a,n),{exactProfile:r,...o}=e;return{...o,localFace:e,placement:n,points:(e.points??[]).map(i),holes:(e.holes??[]).map(a=>a.map(i)),normal:vs(e.normal,n.quaternion),...e.supportLoops?{supportLoops:{outer:(e.supportLoops.outer??[]).map(i),holes:(e.supportLoops.holes??[]).map(a=>a.map(i))}}:{}}}function ef(e){return{x:-e.quaternion.x,y:-e.quaternion.y,z:-e.quaternion.z,w:e.quaternion.w}}function Xc(e,t){if(!e||typeof e!="object")return e??null;const n=ef(t),i=o=>vs(o,n),r=JSON.parse(JSON.stringify(e));return e.origin&&(r.origin=Ss(e.origin,t)),e.normal&&(r.normal=i(e.normal)),e.xAxis&&(r.xAxis=i(e.xAxis)),e.yAxis&&(r.yAxis=i(e.yAxis)),r}function iy(e,t){if(!e)return null;const n=ri(t),i=c=>Ss(c,n),r=c=>vs(c,ef(n)),{localFace:o,placement:a,...s}=e,l=e.exactProfile?JSON.parse(JSON.stringify(e.exactProfile)):null;return l?.plane&&(l.plane=Xc(l.plane,n)),{...s,points:(e.points??[]).map(i),holes:(e.holes??[]).map(c=>c.map(i)),normal:r(e.normal),workplane:Xc(e.workplane,n),...e.supportLoops?{supportLoops:{outer:(e.supportLoops.outer??[]).map(i),holes:(e.supportLoops.holes??[]).map(c=>c.map(i))}}:{},...l?{exactProfile:l}:{}}}function Te(e){return new $(Number(e?.x),Number(e?.y),Number(e?.z)||0)}function Yc(e){if(!Array.isArray(e)||e.length<3)return null;const t=Te(e[0]);for(let n=1;n<e.length-1;n+=1){const i=Te(e[n]).sub(t).cross(Te(e[n+1]).sub(t));if(i.lengthSq()>Bn)return i.normalize()}return null}function ry(e,t,n=cr){if(!t||!Array.isArray(e)||e.length<3)return!1;const i=Te(e[0]);return e.every(r=>Math.abs(Te(r).sub(i).dot(t))<=n)}function oy(e){const t=new Mn;e.flat().forEach(i=>t.expandByPoint(Te(i)));const n=t.isEmpty()?1:Math.max(1,t.getSize(new $).length());return Math.max(cr,n*KE)}function ti(e){const t=Number(e)%Zr;return t<0?t+Zr:t}function bi(e,t,n=!0){return ti(n?t-e:e-t)}function $c(e,t){return e<t?`${e}:${t}`:`${t}:${e}`}function Ho(e){return Aa.has(e)||Aa.set(e,Ju(e)),Aa.get(e)}function Wo(e,t,n){const i=Te(e).sub(Te(t.center)),r=i.dot(Te(t.uAxis))/t.radiusX,o=i.dot(Te(t.vAxis))/t.radiusY,a=ti(Math.atan2(o,r));return Te(t.center).addScaledVector(Te(t.uAxis),Math.cos(a)*t.radiusX).addScaledVector(Te(t.vAxis),Math.sin(a)*t.radiusY).distanceTo(Te(e))>n?!1:t.closed||bi(t.startAngle,a,t.clockwise)<=t.sweep+n}function Dr(e,t){const n=Te(e).sub(Te(t.center));return ti(Math.atan2(n.dot(Te(t.vAxis))/t.radiusY,n.dot(Te(t.uAxis))/t.radiusX))}function tf(e,t){return Te(e.center).addScaledVector(Te(e.uAxis),Math.cos(t)*e.radiusX).addScaledVector(Te(e.vAxis),Math.sin(t)*e.radiusY)}function nf(e,t){return Math.abs(Math.atan2(Math.sin(e-t),Math.cos(e-t)))}function ay(e,t,n){const i=td(e),r=new Map(i.map((o,a)=>[o.id,{index:a,surface:o}]));return t.map(o=>{const a=r.get(o.sideSurfaceId);if(!a||a.index<=0)return o;const s=Te(a.surface.center);return i.slice(0,a.index).flatMap(c=>{if(Te(c.center).add(Te(c.offset)).distanceTo(s)>n||c.type!==o.type||c.sweep<=o.sweep+1e-5||Math.abs(c.radiusX-o.radiusX)>n||Math.abs(c.radiusY-o.radiusY)>n||Math.abs(Te(c.uAxis).normalize().dot(Te(o.uAxis).normalize()))<1-1e-4||Math.abs(Te(c.vAxis).normalize().dot(Te(o.vAxis).normalize()))<1-1e-4)return[];const d={...o,uAxis:c.uAxis,vAxis:c.vAxis,radiusX:c.radiusX,radiusY:c.radiusY,startAngle:c.startAngle,endAngle:c.endAngle,clockwise:c.clockwise,closed:c.closed,sweep:c.sweep},u=o.clockwise?1:-1;return[0,.5,1].every(S=>Wo(tf(o,o.startAngle+u*o.sweep*S),d,n))?[d]:[]}).sort((c,h)=>c.sweep-h.sweep)[0]??o})}function qc(e,t,n){if(!n||t.closed)return{point:e,snapped:!1};const i=Dr(e,t),r=[t.startAngle,t.endAngle].map(a=>({boundary:a,distance:nf(i,a)})).sort((a,s)=>a.distance-s.distance);if(r[0].distance>ws)return{point:e,snapped:!1};const o=tf(t,r[0].boundary);return{point:{x:o.x,y:o.y,z:o.z},snapped:r[0].distance>1e-8}}function bo(e,t){const n=new $;return e.forEach((i,r)=>{n.add(Te(i).cross(Te(e[(r+1)%e.length])))}),n.dot(t)*.5}function sy(e,t=64){const n=e.clockwise?1:-1;return Array.from({length:t},(i,r)=>{const o=e.startAngle+n*Zr*r/t;return Te(e.center).addScaledVector(Te(e.uAxis),Math.cos(o)*e.radiusX).addScaledVector(Te(e.vAxis),Math.sin(o)*e.radiusY)}).map(i=>({x:i.x,y:i.y,z:i.z}))}function ly(e,t,n,i){if(!n.length||t.length<3)return n;const r=rn(e),o=Te(t[0]),a=new Set(n.map((l,c)=>c)),s=[];return Ho(e).curves.filter(l=>l.closed).forEach(l=>{const c=Te(l.uAxis).normalize(),h=Te(l.vAxis).normalize(),d=c.clone().cross(h).normalize(),u=Te(l.center);if(Math.abs(d.dot(i))<1-1e-4||Math.abs(u.clone().sub(o).dot(i))>r)return;const m=r/Math.max(Math.min(l.radiusX,l.radiusY),r),S=[...a].filter(M=>{const A=n[M].map(v=>{const y=Te(v).sub(u);return{planeError:Math.abs(y.dot(d)),radius:Math.hypot(y.dot(c)/l.radiusX,y.dot(h)/l.radiusY)}});return A.every(v=>v.planeError<=r*2&&v.radius<=1+m*2)&&A.filter(v=>Math.abs(v.radius-1)<=m*2).length>=2});if(!S.length)return;S.forEach(M=>a.delete(M));const x=S.map(M=>n[M]).sort((M,A)=>Math.abs(bo(A,i))-Math.abs(bo(M,i)))[0],f=Math.sign(bo(x,i)),p=sy(l);f&&Math.sign(bo(p,i))!==f&&p.reverse(),s.push(p)}),a.forEach(l=>s.push(n[l])),s}function Xo(e,t,n){const i=Te(t.start),o=Te(t.end).clone().sub(i),a=o.lengthSq();if(a<=Bn)return!1;const s=Te(e).sub(i).dot(o)/a;return s<-n||s>1+n?!1:i.addScaledVector(o,Math.max(0,Math.min(1,s))).distanceTo(Te(e))<=n}function cy(e,t){const n=Ho(e),i=rn(e);return[t.group.outerLoop,...t.group.innerLoops??[]].flat().every(r=>n.curves.some(o=>Wo(r,o,i))||n.lines.some(o=>Xo(r,o,i)))}function rf(e,t){if(t?.coordinateSystem==="sketch-plane-v1"){const a=cn(e,t);return{x:a.x,y:a.y,planeDistance:Math.abs(a.z)}}const n=Te(e).sub(Te(t?.origin)),i=Te(t?.xAxis).normalize(),r=Te(t?.yAxis).normalize(),o=Te(t?.normal).normalize();return{x:n.dot(i),y:-n.dot(r),planeDistance:Math.abs(n.dot(o))}}function Ta(e,t,n,i){const r=rf(e,n);if(r.planeDistance>i)return!1;if(t?.type==="line")return Xo(r,{start:t.start,end:t.end},i);const o=t?.type==="circle"||t?.type==="arc-circle",a=t?.type==="ellipse"||t?.type==="arc-ellipse";if(!o&&!a)return!1;const s=Number(o?t.radius:t.radiusX),l=Number(o?t.radius:t.radiusY);if(!(s>0)||!(l>0))return!1;const c=Number(t.rotation)||0,h=r.x-Number(t.center?.x),d=r.y-Number(t.center?.y),u=h*Math.cos(c)+d*Math.sin(c),m=-h*Math.sin(c)+d*Math.cos(c),S=Math.hypot(u/s,m/l);if(Math.abs(S-1)*Math.max(s,l)>i)return!1;if(t.type==="circle"||t.type==="ellipse")return!0;const x=ti(Math.atan2(m/l,u/s)),f=ti(t.startAngle),p=ti(t.endAngle);return bi(f,x,t.clockwise!==!1)<=bi(f,p,t.clockwise!==!1)+i/Math.max(s,l)}function uy(e,t,n,i,r){if(n?.type==="line"){const a={x:(e.x+t.x)*.5,y:(e.y+t.y)*.5,z:(e.z+t.z)*.5};return[e,a,t].every(s=>Ta(s,n,i,r))}if(!Ta(e,n,i,r)||!Ta(t,n,i,r))return!1;const o=a=>{const s=rf(a,i),l=Number(n.rotation)||0,c=s.x-Number(n.center?.x),h=s.y-Number(n.center?.y);return Math.atan2(-c*Math.sin(l)+h*Math.cos(l),c*Math.cos(l)+h*Math.sin(l))};return nf(o(e),o(t))<=Math.PI/3}function dy(e,t,n){const i=t?.group?.exactProfile,r=[n?.group?.outerLoop,...n?.group?.innerLoops??[]].filter(c=>Array.isArray(c)&&c.length>=3),o=[i?.outerLoop,...i?.innerLoops??[]].filter(c=>Array.isArray(c?.segments)&&c.segments.length);if(!i?.plane||r.length!==o.length)return!1;const a=rn(e)*2,s=(c,h)=>c.every((d,u)=>h.segments.some(m=>uy(d,c[(u+1)%c.length],m,i.plane,a))),l=new Set(o.map((c,h)=>h));return r.every(c=>{const h=[...l].find(d=>s(c,o[d]));return h===void 0?!1:(l.delete(h),!0)})}function fy(e,t,n){let i=-1,r=n;return t.vertices.forEach((o,a)=>{const s=Te(o).distanceTo(Te(e));s>r||(i=a,r=s)}),i}function Un(e,t){const n=wh(e,t);return{x:n.x,y:n.y,z:0}}function qn(e,t){return Te(_s(e,t))}function py(e,t){const n=Te(e);return{x:n.dot(Te(t.xAxis).normalize()),y:-n.dot(Te(t.yAxis).normalize())}}function hy(e,t,n,i,r){const o=cn(e,i),a=cn(t,i),s=cn(n,i);if(!(r>0))return null;const l=2*(o.x*(a.y-s.y)+a.x*(s.y-o.y)+s.x*(o.y-a.y));if(Math.abs(l)<=r*r*1e-10)return null;const c=o.x*o.x+o.y*o.y,h=a.x*a.x+a.y*a.y,d=s.x*s.x+s.y*s.y,u={x:(c*(a.y-s.y)+h*(s.y-o.y)+d*(o.y-a.y))/l,y:(c*(s.x-a.x)+h*(o.x-s.x)+d*(a.x-o.x))/l,z:0};return Math.abs(Math.hypot(o.x-u.x,o.y-u.y)-r)>Math.max(1e-5,r*5e-4)?null:Yr(u,i)}function my(e,t,n,i,r){const o=Un(e.center,r),a=e.type==="arc-circle"?hy(t,n,i,r,e.radiusX):null,s=a?Un(a,r):null,l=s&&Math.hypot(s.x-o.x,s.y-o.y)>Math.max(1e-4,e.radiusX*.001)?s:o,c=py(e.uAxis,r),h=Math.atan2(c.y,c.x),d=Math.cos(h),u=Math.sin(h),m=k=>{const B=k.x-l.x,Y=k.y-l.y;return ti(Math.atan2((-B*u+Y*d)/e.radiusY,(B*d+Y*u)/e.radiusX))},S=m(Un(t,r)),x=m(Un(n,r)),f=m(Un(i,r)),p=e.closed?Zr:e.sweep,M=bi(S,x,!0),A=bi(S,x,!1),v=bi(S,f,!0)<=M+1e-6,y=bi(S,f,!1)<=A+1e-6,E=v!==y?v:Math.abs(M-p)<=Math.abs(A-p),T=E?M:A,g=p-T,P=!e.closed&&T>=p*.75&&g>=-1e-5&&g<=ws,C=qc(t,e,P),I=qc(n,e,P),U=m(Un(C.point,r)),V=m(Un(I.point,r));if(e.type==="arc-circle"){const k={type:"ARC",center:l,radius:e.radiusX,startAngle:U,endAngle:V,clockwise:E,analyticSource:e.analyticSource??null,analyticOwnerRegionId:e.ownerRegionId??null};return k[Vo]=C.snapped,k[ko]=I.snapped,k}if(e.type==="arc-ellipse"){const k={type:"ELLIPSE_ARC",center:l,radiusX:e.radiusX,radiusY:e.radiusY,rotation:h,startParameter:U,endParameter:V,clockwise:E,analyticSource:e.analyticSource??null,analyticOwnerRegionId:e.ownerRegionId??null};return k[Vo]=C.snapped,k[ko]=I.snapped,k}return null}function Kc(e,t=!1){if(e.type==="LINE")return{...t?e.end:e.start};const n=t?e.type==="ARC"?e.endAngle:e.endParameter:e.type==="ARC"?e.startAngle:e.startParameter,i=e.type==="ARC"?e.radius:e.radiusX,r=e.type==="ARC"?e.radius:e.radiusY,o=e.type==="ARC"?0:e.rotation,a=Math.cos(n)*i,s=Math.sin(n)*r;return{x:e.center.x+a*Math.cos(o)-s*Math.sin(o),y:e.center.y+a*Math.sin(o)+s*Math.cos(o),z:0}}function gy(e,t){e.forEach((n,i)=>{const r=e[(i+1)%e.length];if(n.type==="LINE"&&r.type!=="LINE"){const o=Kc(r);(r[Vo]||Te(n.end).distanceTo(Te(o))<=t)&&(n.end=o)}if(n.type!=="LINE"&&r.type==="LINE"){const o=Kc(n,!0);(n[ko]||Te(r.start).distanceTo(Te(o))<=t)&&(r.start=o)}}),e.forEach(n=>{delete n[Vo],delete n[ko]})}function _y(e,t,n,i,r){const o=[];let a=t,s=null;for(let l=0;l<n;l+=1){const c=(t+l)%e.length,h=(c+1)%e.length,d=Te(e[h]).sub(Te(e[c]));if(d.lengthSq()<=r*r)continue;d.normalize(),!(s&&s.dot(d)>=1-1e-6)&&s&&(o.push({type:"LINE",start:Un(e[a],i),end:Un(e[c],i)}),a=c),s=d}return s&&o.push({type:"LINE",start:Un(e[a],i),end:Un(e[(t+n)%e.length],i)}),o}function xy(e,t){const n=new Set([t?.parentRegionId,...t?.subdivisionRegionIds??[]].filter(Boolean));if(!n.size)return{curves:[],lines:[]};const i=[],r=[];return(e?.metadata?.profileFeatures??[]).forEach(o=>{if(!n.has(o?.analyticRegionId)||!o?.exactProfile?.plane)return;const a=o.exactProfile,l=o.analyticRegionId===t.parentRegionId&&t.capIndex===1?{...a.plane,origin:{x:a.plane.origin.x+a.plane.normal.x*o.distance,y:a.plane.origin.y+a.plane.normal.y*o.distance,z:a.plane.origin.z+a.plane.normal.z*o.distance}}:a.plane;[a.outerLoop,...a.innerLoops??[]].forEach(c=>(c?.segments??[]).forEach(h=>{const d=h?.source;if(!d?.role||!n.has(d.regionId)||d.role==="profile-boundary"&&d.regionId!==t.parentRegionId||d.role==="divider"&&!t.subdivisionRegionIds?.includes(d.regionId))return;if(h.type==="line"){r.push({start:qn(h.start,l),end:qn(h.end,l),analyticSource:JSON.parse(JSON.stringify(d)),ownerRegionId:d.regionId??o.analyticRegionId??null});return}const u=["circle","arc-circle"].includes(h.type),m=["ellipse","arc-ellipse","ellipse-arc"].includes(h.type);if(!u&&!m)return;const S=qn(h.center,l),x=Number(h.rotation)||0,f=qn({x:h.center.x+Math.cos(x),y:h.center.y+Math.sin(x),z:0},l),p=qn({x:h.center.x-Math.sin(x),y:h.center.y+Math.cos(x),z:0},l),M=h.type==="circle"||h.type==="ellipse",A=M?0:Number(h.startAngle),v=M?0:Number(h.endAngle),y=h.clockwise!==!1;i.push({type:u?"arc-circle":"arc-ellipse",center:{x:S.x,y:S.y,z:S.z},uAxis:f.sub(S).normalize(),vAxis:p.sub(S).normalize(),radiusX:Number(u?h.radius:h.radiusX),radiusY:Number(u?h.radius:h.radiusY),startAngle:A,endAngle:v,clockwise:y,closed:M,sweep:M?Zr:bi(A,v,y),analyticSource:JSON.parse(JSON.stringify(d)),ownerRegionId:d.regionId??o.analyticRegionId??null,sourceEdgeIndices:[]})}))}),{curves:i,lines:r}}function jc(e,t,n,i,r,o={curves:[],lines:[]}){if(t.length<3)return null;const a=t.map(p=>fy(p,e,i));if(a.some(p=>p<0))return null;const s=ay(e,[...o.curves,...Ho(e).curves],i),l=s.map(p=>new Set(p.sourceEdgeIndices.map(M=>$c(M[0],M[1])))),c=t.map((p,M)=>{const A=$c(a[M],a[(M+1)%t.length]),v=l.findIndex(g=>g.has(A));if(v>=0)return v;const y=t[M],E=t[(M+1)%t.length],T=s.findIndex(g=>Wo(y,g,i)&&Wo(E,g,i)&&Math.abs(Math.atan2(Math.sin(Dr(E,g)-Dr(y,g)),Math.cos(Dr(E,g)-Dr(y,g))))<=Math.PI/4);return T>=0?T:null}),h=c.findIndex((p,M)=>p!==c[(M-1+c.length)%c.length]);if(h<0)return null;const d=[];for(let p=0;p<c.length;){const M=(h+p)%c.length,A=c[M];let v=1;for(;v<c.length-p&&c[(M+v)%c.length]===A;)v+=1;const y=(M+v)%t.length,E=A===null?null:my(s[A],t[M],t[y],t[(M+Math.floor(v/2))%t.length],n);E?d.push(E):d.push(..._y(t,M,v,n,i)),p+=v}const u=[...o.lines,...Ho(e).lines];d.forEach(p=>{if(p.type!=="LINE")return;const M=qn(p.start,n),A=qn(p.end,n),v=u.find(y=>Xo(M,y,i)&&Xo(A,y,i));p.analyticSource=v?.analyticSource??{role:"divider"},p.analyticOwnerRegionId=v?.ownerRegionId??null}),gy(d,i);const m=HS(d,{id:r,plane:n});if(!m)return null;m.outerLoop.segments.forEach((p,M)=>{p.source=JSON.parse(JSON.stringify(d[M]?.analyticSource??{role:"unavailable"}))});const S=new Set(d.map(p=>p.analyticOwnerRegionId).filter(Boolean));S.size===1&&(m.analyticRegionId=[...S][0]);const x=t.flatMap((p,M)=>{const A=c[M],v=c[(M-1+c.length)%c.length];return Number.isInteger(A)&&A===v?[M]:[]}),f=new Set(x);return{exactProfile:{...m,plane:n},cadProfileVertexIndices:t.flatMap((p,M)=>f.has(M)?[]:[M]),smoothProfileVertexIndices:x}}function vy(e,t,n,i,r,o=null){if(t.length<3||n.some(d=>d.length<3))return null;const a=$o({points:t,normal:i});if(!a)return null;const s=rn(e),l=xy(e,o),c=jc(e,t,a,s,r,l);if(!c)return null;const h=n.map((d,u)=>jc(e,d,a,s,`${r}-hole-${u}`,l));return h.some(d=>!d)?null:{...c,exactProfile:{...c.exactProfile,innerLoops:h.map(d=>d.exactProfile.outerLoop)},holeCadProfileVertexIndices:h.map(d=>d.cadProfileVertexIndices),holeSmoothProfileVertexIndices:h.map(d=>d.smoothProfileVertexIndices)}}function Sy(e,t,n){const i=t?.exactProfile,r=t?.cadProfileVertexIndices??[];if(!i?.plane||!r.length)return e;const o=i.outerLoop?.segments??[],a=[];if(o.forEach(d=>{[d?.start,d?.end].filter(Boolean).forEach(u=>{const m=qn(u,i.plane);a.some(S=>S.distanceTo(m)<=n)||a.push(m)})}),!a.length)return e;const s=o.reduce((d,u)=>Math.max(d,Number(u?.radius)||0,Number(u?.radiusX)||0,Number(u?.radiusY)||0),0),l=Math.max(n,s*2*Math.sin(ws/2)+n),c=e.map(d=>({...d})),h=new Set(r);return a.forEach(d=>{let u=-1,m=l;h.forEach(S=>{const x=Te(c[S]).distanceTo(d);x>m||(u=S,m=x)}),!(u<0)&&(c[u]={x:d.x,y:d.y,z:d.z},h.delete(u))}),c}function Ja(e){return e.reduce((t,n)=>t.add(Te(n)),new $).multiplyScalar(1/Math.max(1,e.length))}function Zc(e,t,n){const i=Ja(n.vertices),r=Ja(t);return e.dot(r.sub(i))<0?e.clone().multiplyScalar(-1):e}function Ey(e,t,n){if(!Array.isArray(t)||t.length<3)return null;for(const i of td(e)){const r=Te(i.offset);if(r.lengthSq()<=Bn)continue;const o=Th(e,i),a=r.length(),s=t.map(d=>Ph(d,i)),l=s.every(d=>Math.abs(d.axial)<=o),c=s.every(d=>Math.abs(d.axial-a)<=o);if(!l&&!c||s.some(d=>d.planeError>o||d.radialError>o))continue;const h=Te(i.vAxis).cross(Te(i.uAxis));if(!(h.lengthSq()<=Bn))return h.normalize(),h.dot(n)<0&&h.multiplyScalar(-1),h}return null}function yy(e){const t=new Mn;return(e?.vertices??[]).forEach(n=>t.expandByPoint(Te(n))),t.isEmpty()?1:Math.max(1,t.getSize(new $).length())}function My(e,t,n,i){const r=new ku(e,t),o=new $,a=[];return(n?.faces??[]).forEach(s=>{if(!Array.isArray(s)||s.length<3)return;const l=Te(n.vertices[s[0]]);for(let c=1;c<s.length-1;c+=1){const h=Te(n.vertices[s[c]]),d=Te(n.vertices[s[c+1]]);if(!r.intersectTriangle(l,h,d,!1,o))continue;const u=o.clone().sub(e).dot(t);u>i&&a.push(u)}}),a.sort((s,l)=>s-l),a.filter((s,l)=>l===0||Math.abs(s-a[l-1])>i*4).length}function Jc(e,t,n){return JE.reduce((r,o)=>r+My(e,o,t,n)%2,0)>=2}function by(e,t,n){const i=t.map(l=>n.vertices[l]).filter(Boolean);if(i.length<3)return null;const r=Ja(i),o=yy(n)*1e-7,a=Jc(r.clone().addScaledVector(e,o*8),n,o),s=Jc(r.clone().addScaledVector(e,-o*8),n,o);return a===s?null:a?-1:1}function Ay(e,t,n,i){const r=e?.normal?Te(e.normal):null,o=r&&r.lengthSq()>Bn?r.normalize():Yc(n);if(o){const s=e?.analyticAxis?Te(e.analyticAxis):null,c=(s&&s.lengthSq()>Bn?s.normalize():Ey(i,n,o))??o;c.dot(o)<0&&c.multiplyScalar(-1);const h=by(c,t,i);return h?c.multiplyScalar(h):Zc(c,n,i)}const a=Yc(n);return a?Zc(a,n,i):null}function Ty(e){const t=Number(e?.metadata?.profileSize);if(Number.isInteger(t)&&t>=3&&e.vertices?.length===t*2)return t;const n=e?.faces?.[0]?.length,i=e?.faces?.[1]?.length;return!Number.isInteger(n)||n<3||n!==i||e.vertices.length!==n*2?null:n}function Py(e,t){return e>=t?e-t:e}function wy(e,t){const n=e?.faces?.[t],i=Ty(e);if(!i||!Array.isArray(n)||n.length!==4||t<2)return!1;const r=new Set(Array.isArray(e?.metadata?.smoothVerticalEdgeIndices)?e.metadata.smoothVerticalEdgeIndices:Array.isArray(e?.metadata?.smoothProfileVertexIndices)?e.metadata.smoothProfileVertexIndices:[]);return r.size?n.some(o=>r.has(Py(o,i))):!1}function Qc(e,t){const n={x:Math.abs(t.x),y:Math.abs(t.y),z:Math.abs(t.z)};return n.z>=n.x&&n.z>=n.y?new et(e.x,e.y):n.x>=n.y?new et(e.y,e.z):new et(e.x,e.z)}function Ry(e,t,n=[]){const i=e.map(a=>Qc(a,t)),r=n.map(a=>a.map(s=>Qc(s,t))),o=gs.triangulateShape(i,r);return o.length?o.flat():e.slice(1,-1).flatMap((a,s)=>[0,s+1,s+2])}function Cy(e,t){const n=e?.metadata?.capFaceGroups;return n?n.lower?.includes(t)?{indices:n.lower,upper:!1}:n.upper?.includes(t)?{indices:n.upper,upper:!0}:null:null}function Iy(e,t){const n=Number(e?.metadata?.profileSize),i=e?.metadata?.profileLoopSizes;if(!Number.isInteger(n)||!Array.isArray(i)||i.reduce((a,s)=>a+s,0)!==n)return null;const r=[];let o=t?n:0;return i.forEach(a=>{r.push(e.vertices.slice(o,o+a)),o+=a}),r}function Dy(e,t){const n=(e?.metadata?.planarFaceGroups??[]).findIndex(i=>Array.isArray(i?.indices)&&i.indices.includes(t));return n>=0?{group:e.metadata.planarFaceGroups[n],index:n}:null}function of(e,t){return Uo.has(e)||Uo.set(e,xs(e)),Uo.get(e).semanticPlanarFaces.filter(i=>i.indices.includes(t)).map(i=>({group:i,index:i.id,semantic:!0}))}function af(e,t){const n=of(e,t);if(n.length===1)return n[0];const i=n.filter(l=>l.group.kind==="analytic-residual-cap");if(i.length===1)return i[0];const r=n.filter(l=>l.group.exactProfile),o=Math.max(...r.map(l=>Number(l.group.profileIndex))),a=r.filter(l=>Number(l.group.profileIndex)===o);if(a.length===1)return a[0];const s=n.filter(l=>l.group.kind==="analytic-residual-parent");return s.length===1?s[0]:null}function Ly(e,t,n){if(!n||n.semantic)return n;const i=af(e,t);if(!i?.group?.normal||!n.group?.normal)return n;const r=Te(i?.group?.normal),o=Te(n.group?.normal);if(r.lengthSq()<=Bn||o.lengthSq()<=Bn)return n;r.normalize(),o.normalize();const a=r.dot(o);return Math.abs(a)<1-1e-4?n:(a<0&&r.multiplyScalar(-1),{...n,group:{...n.group,normal:{x:r.x,y:r.y,z:r.z}}})}function Ny(e,t){const n=af(e,t),i=Dy(e,t);if(!n||!i)return n??i;if(i.group.indices&&Array.isArray(i.group.indices)&&i.group.indices.includes(t)){const r=e.metadata?.surfaceFaceIds?.[t];if(r!=null){const o=i.group.indices.every(s=>e.metadata?.surfaceFaceIds?.[s]===r),a=n.group.indices.every(s=>e.metadata?.surfaceFaceIds?.[s]===r);if(o&&a&&i.group.indices.length>n.group.indices.length&&n.group.indices.every(s=>i.group.indices.includes(s)))return i}}return n.group.kind==="analytic-residual-parent"||n.group.kind==="analytic-residual-cap"?n:(i.group.smoothProfileVertexIndices?.length??0)>0&&!(n.group.smoothProfileVertexIndices?.length??0)?i:dy(e,n,i)||i.group.indices?.length===1&&n.group.indices?.length>1&&cy(e,n)?n:i}function eu(e){const t=e.map(i=>{const r=i?.source??{},o=r.sourceBoundaryId??r.dividerId??"",a=r.orientation===-1?-1:1,s=["arc-circle","arc-ellipse"].includes(i?.type)?`:${ti(i.startAngle)}:${ti(i.endAngle)}:${i.clockwise!==!1}`:"";return`${i?.type??"unknown"}:${r.role??"unavailable"}:${o}:${a}${s}`});if(!t.length)return"";const n=[];return t.forEach((i,r)=>{n.push([...t.slice(r),...t.slice(0,r)].join("|"))}),n.sort()[0]}function Qa(e){const t=eu(e?.outerLoop?.segments??[]),n=(e?.innerLoops??[]).map(i=>eu(i?.segments??[])).sort();return JSON.stringify({outer:t,inner:n})}function Uy(e){let t=0xcbf29ce484222325n;for(let n=0;n<e.length;n+=1)t^=BigInt(e.charCodeAt(n)),t=BigInt.asUintN(64,t*0x100000001b3n);return t.toString(16).padStart(16,"0")}function Fy(e,t,n){if(!t?.group||!n?.exactProfile||t.semantic&&t.group.kind!=="analytic-residual-parent")return null;const i=Ah(n.exactProfile),o=[i.outerLoop,...i.innerLoops??[]].flatMap(v=>v?.segments??[]),a=new Set(o.flatMap(v=>{const y=v?.source;return y?.role==="profile-boundary"&&y.regionId&&y.sourceBoundaryId?[y.regionId]:[]})),s=t.group.parentRegionId??(a.size===1?[...a][0]:null);if(!s||a.size&&(a.size!==1||!a.has(s)))return null;const l=(e?.metadata?.profileFeatures??[]).flatMap((v,y)=>v?.analyticRegionId===s?[{feature:v,featureIndex:y}]:[]);if(l.length!==1)return null;const c=[...new Set(o.flatMap(v=>v?.source?.role==="divider"&&v.source.regionId?[v.source.regionId]:[]))],h=t.group.subdivisionRegionIds?.length?t.group.subdivisionRegionIds:c,d=(e?.metadata?.profileFeatures??[]).filter(v=>h.includes(v?.analyticRegionId)).flatMap(v=>[v.exactProfile?.outerLoop,...v.exactProfile?.innerLoops??[]].flatMap(y=>y?.segments??[])).filter(v=>v?.source?.role==="divider"&&v.source.dividerId),u=new Map(d.map(v=>[v.source.dividerId,v]));if(u.size===1){const v=[...u.values()][0];o.forEach(y=>{if(y?.source?.role!=="divider"||y.source.dividerId||y.type!=="line"||v.type!=="line")return;const E=Te(Yr(y.end,i.plane)).sub(Te(Yr(y.start,i.plane))).normalize(),g=(e.metadata.profileFeatures??[]).find(C=>h.includes(C?.analyticRegionId)&&[C.exactProfile?.outerLoop,...C.exactProfile?.innerLoops??[]].some(I=>I?.segments?.includes(v)))?.exactProfile?.plane,P=g?qn(v.end,g).sub(qn(v.start,g)).normalize():null;!P||Math.abs(E.dot(P))<1-1e-4||(y.source={...JSON.parse(JSON.stringify(v.source)),orientation:(v.source.orientation??1)*(E.dot(P)>=0?1:-1)})})}const m=new Set(o.flatMap(v=>{const y=v?.source;return y?.role==="profile-boundary"&&y.regionId===s&&y.sourceBoundaryId?[y.sourceBoundaryId]:[]})),S=new Set(o.flatMap(v=>{const y=v?.source;return y?.role==="divider"&&y.dividerId?[y.dividerId]:[]})),x=o.some(v=>v?.source?.role==="divider"&&!v.source.dividerId);if(!m.size||!S.size||x)return null;const f=Qa(i);if(!f)return null;const p=`analytic-region-residual-${Uy(`${s}:${f}`)}`;i.analyticRegionId=p;const M={...t.group,id:`analytic-residual-${p}`,kind:"analytic-residual-cap",exactProfile:i,regionId:p,normal:{...i.plane.normal},analyticAxis:{...i.plane.normal},parentRegionId:s,creatorFeatureIndex:l[0].featureIndex,creatorOperationType:l[0].feature.type??null,subdivisionRegionIds:h,cadProfileVertexIndices:n.cadProfileVertexIndices??[],smoothProfileVertexIndices:n.smoothProfileVertexIndices??[],holeCadProfileVertexIndices:n.holeCadProfileVertexIndices??[],holeSmoothProfileVertexIndices:n.holeSmoothProfileVertexIndices??[]},A=Uo.get(e);if(A){const v=A.semanticPlanarFaces.findIndex(y=>y.id===t.group.id);v>=0?A.semanticPlanarFaces[v]=M:A.semanticPlanarFaces.some(y=>y.regionId===p)||A.semanticPlanarFaces.push(M)}return{group:M,index:M.id,semantic:!0}}function Oy(e,t,n){const i=n?.exactProfile;if(!i)return null;const r=of(e,t).filter(a=>a.group.exactProfile),o=i.analyticRegionId?r.filter(a=>a.group.regionId===i.analyticRegionId):r.filter(a=>Qa(a.group.exactProfile)===Qa(i));return o.length===1?o[0]:null}function zy(e,t){if(Array.isArray(e?.metadata?.curvedSideFaceIndices)&&e.metadata.curvedSideFaceIndices.includes(t))return!0;const n=e?.metadata?.faceVertexNormals?.[t];if(e?.metadata?.type!=="profileFeature"&&!Array.isArray(e?.metadata?.profileFeatures)||!Array.isArray(n)||n.length<2)return!1;const i=Te(n[0]);return n.slice(1).some(r=>i.distanceTo(Te(r))>cr)}function By(e,t){return!e||!t||e.vertices?.length!==t.vertices?.length||e.faces?.length!==t.faces?.length?!1:e.faces.every((n,i)=>{const r=t.faces[i];return Array.isArray(r)&&n.length===r.length&&n.every((o,a)=>o===r[a])})}function Rs(e,t,n=null){if(e?.userData?.type!=="webcad-push-solid")return null;const i=e.userData.solid,r=i?.faces?.[t];if(!Array.isArray(r)||r.length<3||!Array.isArray(i?.vertices))return null;const o=n??Ny(i,t),a=Ly(i,t,o);if(!a&&(wy(i,t)||zy(i,t)))return null;const s=a?.group??null,l=Cy(i,t),c=s?[s.outerLoop,...s.innerLoops??[]]:l?Iy(i,l.upper):null,h=c?.[0]||r.map(k=>i.vertices[k]).filter(Boolean),d=c?.slice(1)||[],u=Ay(s,r,h,i),m=u&&s?ly(i,h,d,u):d,S=m.map(k=>{const B=d.indexOf(k);return B>=0?s?.holeCadProfileVertexIndices?.[B]??k.map((Y,D)=>D):[]}),x=m.map(k=>{const B=d.indexOf(k);return B>=0?s?.holeSmoothProfileVertexIndices?.[B]??[]:k.map((Y,D)=>D)}),f=s?Math.max(oy([h,...m]),a?.semantic&&s.kind!=="analytic-residual-cap"&&s.kind!=="analytic-residual-parent"?cr:rn(i)):cr;if(!u||![h,...m].every(k=>ry(k,u,f)))return null;const p=`solid-face-${e.uuid}-${a?`planar-${a.index}`:l?l.upper?"upper-cap":"lower-cap":t}`,M=a?.group?.kind==="analytic-residual-parent",A=M?{parentRegionId:a.group.parentRegionId??null,subdivisionRegionIds:[...a.group.subdivisionRegionIds??[]],capIndex:a.group.capIndex}:null,v=s?.exactProfile?{exactProfile:JSON.parse(JSON.stringify(s.exactProfile)),cadProfileVertexIndices:s.cadProfileVertexIndices??[],smoothProfileVertexIndices:s.smoothProfileVertexIndices??[]}:a&&(!a.semantic||M)?vy(i,h,m,u,p,A):null,y=a?.semantic?null:Oy(i,t,v),E=y?null:Fy(i,a,v),T=y??E??a,g=T?.group??s,P=y||E?{exactProfile:JSON.parse(JSON.stringify(g.exactProfile)),cadProfileVertexIndices:g.cadProfileVertexIndices??[],smoothProfileVertexIndices:g.smoothProfileVertexIndices??[]}:v,C=y||E?`solid-face-${e.uuid}-planar-${T.index}`:p,I=P?Sy(h,P,rn(i)):h,U=g?.kind==="analytic-residual-cap"&&!!g.exactProfile&&!!g.regionId&&!!g.parentRegionId&&!Number.isInteger(g.featureIndex),V=By(e.userData.analyticSolid,i)?e.userData.analyticSolid:i;return{id:C,sourceSolid:V,...U?{supportSolid:V,supportLoops:{outer:I.map(k=>({x:k.x,y:k.y,z:k.z})),holes:m.map(k=>k.map(B=>({x:B.x,y:B.y,z:B.z})))}}:{},sourceSolidDocumentId:e.userData.documentSolidId??e.parent?.userData?.documentSolidId??null,sourceSolidFaceIndex:t,sourceSolidFaceIndices:g?.indices?[...g.indices]:l?.indices?[...l.indices]:[t],sourceSolidObject:e,sourceSolidGroup:e.parent??null,points:I.map(k=>({x:k.x,y:k.y,z:k.z})),holes:m.map(k=>k.map(B=>({x:B.x,y:B.y,z:B.z}))),normal:{x:u.x,y:u.y,z:u.z},...P?{analyticAxis:{x:u.x,y:u.y,z:u.z}}:{},...Number.isInteger(g?.featureIndex)?{analyticCapIndex:g.capIndex,analyticFeatureIndex:g.featureIndex,analyticOperationType:g.operationType??null}:{},...g?.regionId?{analyticRegionId:g.regionId}:{},...g?.parentRegionId?{analyticParentRegionId:g.parentRegionId}:{},cadProfileVertexIndices:P?.cadProfileVertexIndices??g?.cadProfileVertexIndices??h.map((k,B)=>B),smoothProfileVertexIndices:P?.smoothProfileVertexIndices??g?.smoothProfileVertexIndices??[],holeCadProfileVertexIndices:S,holeSmoothProfileVertexIndices:x,...P?.exactProfile?{exactProfile:P.exactProfile}:{}}}function tu(e){const t=e?.object,n=t?.geometry?.userData?.webcadFaceTriangleMap?.[e?.faceIndex];return Number.isInteger(n)?Rs(t,n):null}function sf(e,t){const i=e?.userData?.solid?.metadata?.planarFaceGroups?.[t],r=i?.indices?.[0];return Number.isInteger(r)?Rs(e,r,{group:i,index:t}):null}function Gy(e){const t=e?.userData?.solid;if(!Array.isArray(t?.faces))return[];const n=[],i=t.metadata?.planarFaceGroups??[];i.forEach((a,s)=>{const l=sf(e,s);l&&n.push(l)});const r=new Set(i.flatMap(a=>a?.indices??[]));t.faces.forEach((a,s)=>{if(r.has(s))return;const l=Rs(e,s);l&&n.push(l)});const o=new Map;return n.forEach(a=>{const s=a.id??`${a.sourceSolidDocumentId}:${a.sourceSolidFaceIndex}`;o.has(s)||o.set(s,a)}),[...o.values()]}function Vy(e){const t=wd(e?.exactProfile,{segments:ZE,structured:!0});if(!t?.outerLoop?.length)return null;const n=e.exactProfile?.plane,i=Te(n?.origin),r=Te(n?.xAxis),o=Te(n?.yAxis);if(![i,r,o].every(c=>Number.isFinite(c.x)&&Number.isFinite(c.y)&&Number.isFinite(c.z))||r.lengthSq()<=Bn||o.lengthSq()<=Bn)return null;const a=c=>{const h=c.map(d=>_s(d,n)).map(d=>({x:d.x,y:d.y,z:d.z}));return h.length>1&&Te(h[0]).distanceTo(Te(h.at(-1)))<=cr&&h.pop(),h},s=a(t.outerLoop),l=t.innerLoops.map(a);return s.length<3||l.some(c=>c.length<3)?null:[s,...l]}function Pa(e){const t=Te(e?.normal);if(t.lengthSq()<=Bn)return null;t.normalize();const n=Vy(e),i=n?.[0]??(Array.isArray(e?.points)?e.points:[]),r=n?.slice(1)??(Array.isArray(e?.holes)?e.holes:[]);if(i.length<3)return null;const o=[i,...r].flat(),a=new Float32Array(o.length*3);o.forEach((h,d)=>{const u=Te(h).addScaledVector(t,jE),m=d*3;a[m]=u.x,a[m+1]=u.y,a[m+2]=u.z});const s=new ii;s.setAttribute("position",new Li(a,3)),s.setIndex(Ry(i,t,r)),s.computeVertexNormals(),s.computeBoundingBox(),s.computeBoundingSphere();const l=new dr({color:Wc,depthTest:!0,depthWrite:!1,opacity:.72,side:tn,transparent:!0}),c=new jt(s,l);return c.name=`webcad-selected-${e.id}`,c.renderOrder=ty,c.userData={type:"webcad-push-solid-face-selection",faceId:e.id,face:e,selectedColor:Wc,transientSelection:!0},c}const ky=360,es=.05;function nu(e){return e==="mouse"?"mouse":"trackpad"}function Hy(e){const t=typeof WheelEvent>"u"?1:WheelEvent.DOM_DELTA_LINE,n=typeof WheelEvent>"u"?2:WheelEvent.DOM_DELTA_PAGE;return e.deltaMode===t?{x:e.deltaX*16,y:e.deltaY*16}:e.deltaMode===n?{x:e.deltaX*800,y:e.deltaY*800}:{x:e.deltaX,y:e.deltaY}}function lf(e,t){return e?.isOrthographicCamera?Math.abs(Number(e.top)-Number(e.bottom))/Math.max(1e-4,Number(e.zoom)||1):2*Math.max(es,e.position.distanceTo(t))*Math.tan(xi.degToRad(e.fov*.5))/Math.max(1e-4,Number(e.zoom)||1)}function Wy(e,t,n,i){const r=Math.max(1,i.width||1),o=Math.max(1,i.height||1),s=lf(e,t.target)/o,l=new $().setFromMatrixColumn(e.matrix,0).normalize(),c=new $().setFromMatrixColumn(e.matrix,1).normalize(),h=new $().addScaledVector(l,n.x*s).addScaledVector(c,-n.y*s);return e.position.add(h),t.target.add(h),t.update(),r}function Xy(e,t,n){const i=Math.exp(n/ky);if(e?.isOrthographicCamera){const l=Math.max(1e-4,(Number(e.zoom)||1)/i);return Math.abs(l-e.zoom)<=1e-12?!1:(e.zoom=l,e.updateProjectionMatrix(),t.update(),!0)}const r=t.target,o=new $().subVectors(e.position,r),a=o.length();if(a<=es)return!1;const s=Math.max(es,a*i);return o.setLength(s),e.position.copy(r).add(o),t.update(),!0}function Yy({camera:e,canvas:t,controls:n,getNavigationDevice:i,render:r,viewport:o}){let a=nu(i?.());n.mouseButtons.LEFT=_i.ROTATE,n.mouseButtons.MIDDLE=_i.PAN,n.mouseButtons.RIGHT=_i.PAN,n.enablePan=!0,n.enableRotate=!0,n.enableZoom=!0,n.screenSpacePanning=!0;function s(c){a=nu(c),n.enableZoom=a==="mouse"}function l(c){if(a!=="trackpad")return;c.preventDefault(),c.stopImmediatePropagation();const h=Hy(c);if(c.shiftKey){const u=Math.abs(h.y)>=Math.abs(h.x)?h.y:h.x;u!==0&&Xy(e,n,u)}else Wy(e,n,h,o());r?.()}return s(a),t.addEventListener("wheel",l,{capture:!0,passive:!1}),{dispose(){t.removeEventListener("wheel",l,{capture:!0})},setNavigationDevice:s}}function $y(e){return[...new Set(Array.isArray(e)?e.filter(Boolean):[])]}function Cs(e,t){const n=new Set($y(t));return(e?.model3d?.solids??[]).filter(i=>n.has(i?.id)&&i?.locked!==!0)}function qy({doc:e,solidIds:t,from:n,to:i}={}){const r=Cs(e,t);if(!r.length||!n||!i)return!1;const o={x:Number(i.x)-Number(n.x),y:Number(i.y)-Number(n.y),z:Number(i.z??0)-Number(n.z??0)};if(!Object.values(o).every(Number.isFinite))return!1;const a=new Map(r.map(s=>[s.id,Es(s.placement,o)]));return e.update3dSolidPlacements?.(a)===!0}function Ky({doc:e,solidIds:t,from:n,to:i}={}){const r=Cs(e,t);if(!r.length||!n||!i||typeof e?.add3dSolid!="function"||typeof e?.recordHistory!="function")return[];const o={x:Number(i.x)-Number(n.x),y:Number(i.y)-Number(n.y),z:Number(i.z??0)-Number(n.z??0)};return Object.values(o).every(Number.isFinite)?(e.recordHistory(),r.map(a=>e.add3dSolid(a.solid,{name:`Copia de ${a.name}`,operation:{type:"copySolid",sourceSolidId:a.id,displacement:o},placement:Es(a.placement,o),recordHistory:!1,visible:a.visible})).filter(Boolean)):[]}function jy({doc:e,solidIds:t,axisStart:n,axisEnd:i,angleDegrees:r}={}){const o=Cs(e,t),a=Number(r);if(!o.length||!n||!i||!Number.isFinite(a))return!1;const s=new Map;for(const l of o){const c=nd(l.placement,{axisStart:n,axisEnd:i,angleDegrees:a});if(!c)return!1;s.set(l.id,c)}return e.update3dSolidPlacements?.(s)===!0}const pi=1e-9,Zy=6*Math.PI/180,cf=/^[0-9eE+\-*/().,\s]$/,Ci={x:new $(1,0,0),y:new $(0,1,0),z:new $(0,0,1)};function ur(e){return e?.key==="Enter"||e?.key===" "||e?.button===2}function Jy({anchor:e,axes:t,pointer:n,angleTolerance:i=Zy}={}){if(!e||!t||!n)return null;const r={x:Number(n.x)-Number(e.x),y:Number(n.y)-Number(e.y)},o=Math.hypot(r.x,r.y);if(!Number.isFinite(o)||o<8)return null;let a=null;return Object.entries(t).forEach(([s,l])=>{const c={x:Number(l?.x)-Number(e.x),y:Number(l?.y)-Number(e.y)},h=Math.hypot(c.x,c.y);if(!Number.isFinite(h)||h<4)return;const d=Math.min(1,Math.abs(r.x*c.y-r.y*c.x)/(o*h)),u=Math.asin(d);u>i||a&&u>=a.angle||(a={axis:s,angle:u})}),a?.axis??null}function hi(e){return{x:e.x,y:e.y,z:e.z}}function Et(e){return new $(Number(e?.x)||0,Number(e?.y)||0,Number(e?.z)||0)}function Qy(e){const t=String(e).split(",");if(t.length!==3)return null;const n=t.map(i=>zi(i.trim()));return n.every(Number.isFinite)?new $(n[0],n[1],n[2]):null}function wa(e,t){const n=ri(t);e.position.set(n.position.x,n.position.y,n.position.z),e.quaternion.set(n.quaternion.x,n.quaternion.y,n.quaternion.z,n.quaternion.w),e.updateMatrixWorld?.(!0)}function iu(e,{anchor:t=null,axis:n=null,direction:i=null}={}){const r=Qy(e);if(r)return hi(t?r.add(Et(t)):r);const o=zi(String(e).trim()),a=Et(i??Ci[n]);return!Number.isFinite(o)||!t||a.lengthSq()<=pi?null:hi(Et(t).addScaledVector(a.normalize(),o))}function eM(e,t,n){const i=Ci[n];if(!e||!t||!i)return null;const r=Et(e),o=Et(t).sub(r);return hi(r.addScaledVector(i,o.dot(i)))}function tM(e){const t=Et(e);return`Precise punto de destino · Distancia ${nn(t.length())} · ΔX ${nn(t.x)} · ΔY ${nn(t.y)} · ΔZ ${nn(t.z)}`}function Jo({camera:e,canvas:t,cursorInput:n=null,getSnap:i=()=>null,getUnitsLabel:r=()=>"mm",getWorkplane:o=()=>({origin:{x:0,y:0,z:0},normal:{x:0,y:0,z:1}}),onHelper:a=()=>{},onPreview:s=()=>{},onStatus:l=()=>{}}={}){const c=new fr,h=new et;let d=null,u="",m=null,S=null,x=null,f=null,p=!1,M=null,A=null,v=null,y="point";function E(){return S??f??x}function T(){return!!(S||p&&f)}function g(){if(!d)return;const q=E(),ne=q?T()?` · eje ${q.toUpperCase()} bloqueado${S?"":" con Shift"}`:` · en eje ${q.toUpperCase()} · Shift para bloquear`:"",ue=u?` · ${u}`:"";l(`${y==="reference"?"Precise punto de referencia":y==="displacement"?"Precise desplazamiento desde la referencia":d.prompt}${ne}${ue}`)}function P(q){const ne=t.getBoundingClientRect();h.x=(q.clientX-ne.left)/Math.max(1,ne.width)*2-1,h.y=-((q.clientY-ne.top)/Math.max(1,ne.height)*2-1),c.setFromCamera(h,e)}function C(){return y==="displacement"?M:d?.anchor}function I(q=null){const ne=C(),ue=ne&&q?Et(q).distanceTo(Et(ne)):null,we=u||(Number.isFinite(ue)?nn(ue):"");Zu(n,{clientPoint:A?{x:A.clientX,y:A.clientY}:null,text:we?`${we} ${r()}`:"",visible:!!(d&&ne)})}function U(q,ne=E()){const ue=Ci[ne];if(!q||!ue)return null;const we=Et(q),Le=1e7,ze=we.clone().addScaledVector(ue,-Le),J=we.clone().addScaledVector(ue,Le),ce=new $,O=new $;return c.ray.distanceSqToSegment(ze,J,ce,O),hi(O)}function V(q=null){if(q&&d?.useWorkplaneWithAnchor!==!0){const ze=new $;e.getWorldDirection(ze);const J=new Fo().setFromNormalAndCoplanarPoint(ze.normalize(),Et(q)),ce=new $;return c.ray.intersectPlane(J,ce)?hi(ce):null}const ne=o()??{},ue=Et(ne.normal);ue.lengthSq()<=pi&&ue.set(0,0,1);const we=new Fo().setFromNormalAndCoplanarPoint(ue.normalize(),Et(ne.origin)),Le=new $;return c.ray.intersectPlane(we,Le)?hi(Le):null}function k(q,ne){if(!q||!ne)return null;const ue=t.getBoundingClientRect(),Le=Math.max(1,e.position.distanceTo(Et(q)))*.35,ze=ce=>{const O=Et(ce).project(e);return{x:(O.x+1)*ue.width*.5,y:(1-O.y)*ue.height*.5}},J=Et(q);return Jy({anchor:ze(J),axes:Object.fromEntries(Object.entries(Ci).map(([ce,O])=>[ce,ze(J.clone().addScaledVector(O,Le))])),pointer:{x:ne.clientX-ue.left,y:ne.clientY-ue.top}})}function B(q){if(!d)return null;A={clientX:q.clientX,clientY:q.clientY,shiftKey:q.shiftKey===!0},P(q);const ne=C();p=q.shiftKey===!0,p||(f=null);const ue=i(q,{anchor:ne,stage:y}),we=d?.disableAxisInference===!0?null:k(ne,q);x=S||f?x:ue&&!p?null:we,p&&!f&&x&&(f=x);const Le=E(),ze=!!(Le&&(S||f||!ue)),J=!!(ze&&T()&&ne&&ue?.point),ce=J?eM(ne,ue.point,Le):ze?U(ne,Le):null;if(m=ce??ue?.point??V(ne),g(),m){const O=Et(m).sub(Et(ne));ne&&O.lengthSq()>pi&&(v=hi(O.normalize()));const ee=(u?iu(u,{anchor:ne,axis:E(),direction:v}):null)??m;I(ee),s(ee,{axis:ze?Le:null,inferred:!!(Le&&!T()),locked:T(),snap:J||!ce?ue:null,snapSetsAxisDistance:J,stage:y})}else I();return m}function Y(q){if(!d||!q)return!1;if(y==="reference")return M=q,y="displacement",S=null,x=null,f=null,v=null,u="",m=null,a(M),g(),!0;const ne=q,ue=d.onPoint,we=y==="displacement";return d=null,u="",m=null,S=null,x=null,f=null,M=null,y="point",Or(n),ue(ne,{usedFrom:we}),!0}function D(){if(!d)return!1;const q=u?iu(u,{anchor:C(),axis:E(),direction:v}):null;return Y(q??m)}function j(q){d=q,u="",m=null,S=null,x=null,f=null,p=!1,M=null,A=null,v=null,y="point",Or(n),q.anchor&&a(q.anchor),g()}function ae(q){if(!d)return!1;const ne=q.key.toLowerCase();if(q.key==="Shift")return p=!0,!f&&x&&(f=x),A&&B({...A,shiftKey:!0}),!0;if(ne==="escape")return d.onCancel?.(),!0;if(ur(q))return D(),!0;if(ne==="backspace")return u=u.slice(0,-1),A?B({...A,shiftKey:p}):(g(),I(m)),!0;if(!u&&d.allowFrom&&y==="point"&&ne==="d")return y="reference",m=null,S=null,g(),!0;if(!u&&Ci[ne]&&C()){if(S=S===ne?null:ne,x=S,f=null,S){const ue=Et(C()),Le=(m?Et(m).sub(ue):new $).dot(Ci[S])<0?-1:1;v=hi(Ci[S].clone().multiplyScalar(Le))}return g(),!0}return q.key.length===1&&cf.test(q.key)?(u+=q.key,A?B({...A,shiftKey:p}):(g(),I()),!0):!1}return{cancel(){d=null,u="",m=null,S=null,x=null,f=null,p=!1,M=null,A=null,v=null,y="point",Or(n)},confirm:D,hasInput:()=>!!u,isActive:()=>!!d,keydown:ae,keyup(q){return q.key!=="Shift"?!1:(p=!1,f=null,A&&B({...A,shiftKey:!1}),!0)},pointer:B,start:j}}function nM({camera:e,canvas:t,cursorInput:n=null,doc:i,getUnitsLabel:r=()=>"mm",getSelectedSolidIds:o=()=>[],getSolidIdAtPointer:a=()=>null,getSolidObjects:s=()=>[],getSnap:l=()=>null,getWorkplane:c,onChanged:h=()=>{},onSelection:d=()=>{},onSnap:u=()=>{},onStatus:m=()=>{},render:S=()=>{},scene:x}={}){let f=null,p=null,M=[],A=null,v=null,y=null,E="",T=0,g=null,P=!1,C=!1;const I=new Map,U=new Map,V=new qt;V.name="webcad-solid-transform-helper";const k=new qo(18);V.add(k),V.visible=!1,x.add(V);let B=null;function Y(te){return i?.model3d?.solids?.find(w=>w?.id===te)??null}function D(te){return[...new Set(te)].filter(w=>{const _=Y(w);return _&&_.visible!==!1&&_.locked!==!0})}function j(te){return s().find(w=>w.userData?.documentSolidId===te)??null}function ae(){I.clear(),M.forEach(te=>{const w=Y(te);w&&I.set(te,ri(w.placement))})}function q(){U.forEach(te=>{x.remove(te),at(te)}),U.clear()}function ne(){q(),M.forEach(te=>{const w=j(te);if(!w)return;const _=w.clone(!0);_.traverse?.(F=>{F.geometry&&(F.geometry=F.geometry.clone()),Array.isArray(F.material)?F.material=F.material.map(X=>X.clone()):F.material&&(F.material=F.material.clone())}),_.name=`webcad-solid-copy-preview-${te}`,_.userData={..._.userData,documentSolidId:null,transformPreview:!0},U.set(te,_),x.add(_)})}function ue(){I.forEach((te,w)=>{const _=j(w);_&&wa(_,te)}),S()}function we(te){if(!te){V.visible=!1;return}V.position.copy(Et(te)),V.visible=!0,S()}function Le(){B&&(V.remove(B),at(B),B=null)}function ze(te,w,_=null){Le();const F=Et(te),X=Et(w),re=X.clone().sub(F);if(re.lengthSq()<=pi)return;const _e=new id({color:16764749,depthTest:!1,transparent:!0,opacity:.95}),Me=[F.clone().sub(V.position),X.clone().sub(V.position)];if(B=new qt,B.add(new Va(new ii().setFromPoints(Me),_e)),Number.isFinite(_)&&Math.abs(_)>pi){const ie=re.normalize(),ve=(Math.abs(ie.z)<.9?new $(0,0,1):new $(0,1,0)).cross(ie).normalize().multiplyScalar(9),Fe=new Kn().setFromAxisAngle(ie,_*Math.PI/180),be=[],Ee=Math.max(8,Math.ceil(Math.abs(_)/10));for(let Be=0;Be<=Ee;Be+=1)be.push(ve.clone().applyQuaternion(new Kn().slerpQuaternions(new Kn,Fe,Be/Ee)));B.add(new Va(new ii().setFromPoints(be),_e.clone()))}V.add(B)}function J(te,w={}){if(!A)return;const _=Et(te).sub(Et(A));if(Le(),_.lengthSq()>pi){const F={x:Ze.axisX,y:Ze.axisY,z:Ze.axisZ};B=Kt([{start:{x:0,y:0,z:0},end:hi(_)}],{color:F[w.axis]??16764749,depthTest:!1,depthWrite:!1,linewidth:Math.max(2.2,Ze.axisLineWidth-.3),renderOrder:80,transparent:!0,opacity:w.locked?1:.9}),B.name=w.axis?`webcad-solid-move-guide-${w.axis}`:"webcad-solid-move-guide-free",V.add(B)}I.forEach((F,X)=>{const re=f==="copy"?U.get(X):j(X);re&&wa(re,Es(F,_))}),m(tM(_)),S()}function ce(te){return!v||!y?!1:(T=Number(te)||0,I.forEach((w,_)=>{const F=nd(w,{axisStart:v,axisEnd:y,angleDegrees:T}),X=j(_);X&&F&&wa(X,F)}),ze(v,y,T),m(`Precise ángulo de giro · ${nn(T)}°`),S(),!0)}function O(te,w=null){Xe.cancel(),Le(),q(),V.visible=!1,f=null,p=null,I.clear(),E="",g=null,h(),w&&d(w),m(te)}function xe(){if(!f)return!1;const te=f==="copy"?"Copiar":f==="move"?"Mover":"Girar";return Xe.cancel(),ue(),Le(),q(),V.visible=!1,f=null,p=null,M=[],I.clear(),E="",g=null,u(null),m(`${te} cancelado`),S(),!0}function ee(te){if(ue(),!qy({doc:i,solidIds:M,from:A,to:te})){xe();return}O(`${M.length} sólido${M.length===1?"":"s"} desplazado${M.length===1?"":"s"}`)}function W(te){ue();const w=Ky({doc:i,solidIds:M,from:A,to:te});if(!w.length){xe();return}const _=w.map(F=>F.id);O(`${_.length} sólido${_.length===1?"":"s"} copiado${_.length===1?"":"s"}`,_)}function me(){return Math.hypot(y.x-v.x,y.y-v.y,y.z-v.z)<=pi?(m("Precise segundo punto del eje · el eje debe tener longitud"),!1):(ue(),jy({doc:i,solidIds:M,axisStart:v,axisEnd:y,angleDegrees:T})?(O(`${M.length} sólido${M.length===1?"":"s"} girado${M.length===1?"":"s"} ${nn(T)}°`),!0):(xe(),!1))}function de(){p="base",Xe.start({allowFrom:!0,prompt:"Precise punto base o [Desde]",onCancel:xe,onPoint(te){A=te,p="destination",we(A),Xe.start({anchor:A,prompt:"Precise punto de destino",onCancel:xe,onPoint:f==="copy"?W:ee})}})}function G(){p="axisStart",Xe.start({allowFrom:!0,prompt:"Precise primer punto del eje o [Desde]",onCancel:xe,onPoint(te){v=te,p="axisEnd",we(v),Xe.start({anchor:v,prompt:"Precise segundo punto del eje",onCancel:xe,onPoint(w){if(Et(w).distanceTo(Et(v))<=pi){m("Precise segundo punto del eje · el eje debe tener longitud"),oe();return}y=w,p="angle",T=0,E="",ze(v,y,0),m("Precise ángulo de giro")}})}})}function oe(){p="axisEnd",Xe.start({anchor:v,prompt:"Precise segundo punto del eje",onCancel:xe,onPoint(te){if(Et(te).distanceTo(Et(v))<=pi){m("Precise segundo punto del eje · el eje debe tener longitud"),oe();return}y=te,p="angle",T=0,E="",ze(v,y,0),m("Precise ángulo de giro")}})}function ge(){ae(),f==="copy"&&ne(),f==="move"||f==="copy"?de():G()}function Ce(te,w=null){return f&&xe(),f=te,M=D(w??o()),d(M),t.focus?.({preventScroll:!0}),M.length?(ge(),!0):(p="selection",m("Seleccione sólido(s) · Enter para continuar"),!0)}const Xe=Jo({camera:e,canvas:t,cursorInput:n,getSnap:(te,w)=>l(te,{...w,mode:f,phase:p,solidIds:[...M]}),getWorkplane:c,getUnitsLabel:r,onHelper:we,onPreview(te,w){u(w.snap??null),(f==="move"||f==="copy")&&p==="destination"?J(te,w):f==="rotate"&&p==="axisEnd"&&ze(v,te)},onStatus:m});function Je(te){if(!(!f||te.buttons)){if(Xe.isActive()){Xe.pointer(te),S();return}p==="angle"&&(g??={x:te.clientX,angle:T},ce(g.angle+(te.clientX-g.x)*.5))}}function Ve(te){if(!f||te.button!==0&&te.button!==2)return;const w=te.button===2;if(P=!0,C=w,te.preventDefault(),te.stopImmediatePropagation(),p==="selection"){if(w){M.length?ge():m("Seleccione sólido(s)");return}const _=a(te),F=Y(_);if(!F){m("Seleccione sólido(s)");return}if(F.locked===!0){m(`${F.name} está bloqueado`);return}M.includes(_)||M.push(_),d(M),m(`Seleccione sólido(s) · ${M.length} seleccionado${M.length===1?"":"s"} · Enter para continuar`),S();return}if(Xe.isActive()){Xe.pointer(te),Xe.confirm();return}p==="angle"&&me()}function tt(te){P&&(P=!1,te.preventDefault(),te.stopImmediatePropagation())}function dt(te){!C&&!f||(C=!1,te.preventDefault(),te.stopImmediatePropagation())}function z(te){if(!f)return;if(te.key==="Escape"){te.preventDefault(),te.stopImmediatePropagation(),xe();return}if(p==="selection"){ur(te)&&(te.preventDefault(),te.stopImmediatePropagation(),M.length?ge():m("Seleccione sólido(s)"));return}if(Xe.isActive()){Xe.keydown(te)&&(te.preventDefault(),te.stopImmediatePropagation());return}if(p!=="angle")return;if(ur(te)){if(te.preventDefault(),te.stopImmediatePropagation(),E){const _=zi(E);Number.isFinite(_)&&ce(_)}me();return}if(te.key==="Backspace")te.preventDefault(),E=E.slice(0,-1);else if(te.key.length===1&&cf.test(te.key))te.preventDefault(),E+=te.key;else return;te.stopImmediatePropagation();const w=zi(E);Number.isFinite(w)?ce(w):m(`Precise ángulo de giro · ${E}`)}function Pt(te){!f||!Xe.isActive()||!Xe.keyup(te)||(te.preventDefault(),te.stopImmediatePropagation(),S())}return t.addEventListener("pointermove",Je,!0),t.addEventListener("pointerdown",Ve,!0),t.addEventListener("click",tt,!0),t.addEventListener("contextmenu",dt,!0),t.addEventListener("keydown",z,!0),t.addEventListener("keyup",Pt,!0),{cancel:xe,dispose(){xe(),t.removeEventListener("pointermove",Je,!0),t.removeEventListener("pointerdown",Ve,!0),t.removeEventListener("click",tt,!0),t.removeEventListener("contextmenu",dt,!0),t.removeEventListener("keydown",z,!0),t.removeEventListener("keyup",Pt,!0),x.remove(V),at(V)},isActive:()=>!!f,startCopy:(te=null)=>Ce("copy",te),startMove:(te=null)=>Ce("move",te),startRotate:(te=null)=>Ce("rotate",te)}}const Pi=1e-7,iM=4,rM=4e-6;function pt(e){return{x:Number(e?.x)||0,y:Number(e?.y)||0,z:Number(e?.z)||0}}function oi(e,t){return Math.hypot(e.x-t.x,e.y-t.y,e.z-t.z)}function ru(e,{hasInput:t=!1}={}){return e?.button===2?!0:!t&&(e?.key==="Enter"||e?.key===" ")}function er(e,t){return{x:t.x-e.x,y:t.y-e.y,z:t.z-e.z}}function ts(e,t,n){const i=er(t,n);return`${e} · Distancia ${nn(oi(t,n))} · ΔX ${nn(i.x)} · ΔY ${nn(i.y)} · ΔZ ${nn(i.z)}`}function oM(e){return{x:Ze.axisX,y:Ze.axisY,z:Ze.axisZ}[e]??16764749}function uf(e,t,n={},i="webcad-line3d-distance-guide"){if(!e||!t||oi(e,t)<=Pi)return null;const r=Kt([{start:e,end:t}],{color:oM(n.axis),depthTest:!1,depthWrite:!1,linewidth:Math.max(2.2,Ze.axisLineWidth-.3),renderOrder:82,transparent:!0,opacity:n.locked?1:.92});return r.name=n.axis?`${i}-${n.axis}`:`${i}-free`,r}function df(e,t,{idPrefix:n="line3d"}={}){const i=Array.isArray(e)?e.map(pt):[];return i.slice(0,-1).map((r,o)=>{const a=i[o+1],s=cn(r,t),l=cn(a,t);return{id:`${n}-${o+1}`,type:"LINE",start:{x:s.x,y:-s.y,z:s.z},end:{x:l.x,y:-l.y,z:l.z}}})}function aM(e,t=Pi){return Array.isArray(e)&&e.length>=4&&oi(pt(e[0]),pt(e.at(-1)))<=t}function Ra(e){const t=[],n=new Set,i=(r,o,a)=>{const s=pt(o),l=`${r}:${s.x.toFixed(8)}:${s.y.toFixed(8)}:${s.z.toFixed(8)}`;n.has(l)||(n.add(l),t.push({type:r,point:s,documentLineId:a.id,lineGroupId:a.groupId,documentSolidId:null}))};return(e??[]).forEach(r=>{r?.visible===!1||r?.type!=="LINE3D"||(i("endpoint",r.start,r),i("endpoint",r.end,r),i("midpoint",{x:(r.start.x+r.end.x)*.5,y:(r.start.y+r.end.y)*.5,z:(r.start.z+r.end.z)*.5},r))}),t}function sM(e,t=1e-6){const n=(e??[]).flatMap(s=>[pt(s.start),pt(s.end)]);if(n.length<3)return null;const i=new $(n[0].x,n[0].y,n[0].z);let r=null;for(let s=1;s<n.length-1&&!r;s+=1){const l=new $(n[s].x,n[s].y,n[s].z).sub(i);for(let c=s+1;c<n.length;c+=1){const h=new $(n[c].x,n[c].y,n[c].z).sub(i),d=l.clone().cross(h);d.lengthSq()>t*t&&(r=d.normalize())}}if(!r||n.some(s=>Math.abs(new $(s.x,s.y,s.z).sub(i).dot(r))>t))return null;const o=new $(n[1].x,n[1].y,n[1].z).sub(i).normalize(),a=r.clone().cross(o).normalize();return Fr({type:"fixed",label:"Líneas 3D coplanarias",origin:{x:i.x,y:i.y,z:i.z},xAxis:{x:o.x,y:o.y,z:o.z},yAxis:{x:a.x,y:a.y,z:a.z},normal:{x:r.x,y:r.y,z:r.z}})}function ff(e,t,n){const i=n.x-t.x,r=n.y-t.y,o=i*i+r*r;if(o<=Number.EPSILON)return Math.hypot(e.x-t.x,e.y-t.y);const a=Math.max(0,Math.min(1,((e.x-t.x)*i+(e.y-t.y)*r)/o));return Math.hypot(e.x-(t.x+i*a),e.y-(t.y+r*a))}function ou(e,t,n){return t.some((i,r)=>ff(e,i,t[(r+1)%t.length])<=n)}function au(e,t){let n=!1;for(let i=0,r=t.length-1;i<t.length;r=i++){const o=t[i],a=t[r];o.y>e.y!=a.y>e.y&&e.x<(a.x-o.x)*(e.y-o.y)/(a.y-o.y)+o.x&&(n=!n)}return n}function lM(e){return Math.abs(e.reduce((t,n,i)=>{const r=e[(i+1)%e.length];return t+n.x*r.y-r.x*n.y},0))*.5}function su(e,t,n,i){return n.some((r,o)=>{const a=n[(o+1)%n.length],s=rd({start:e,end:t},{start:r,end:a});return s&&ff(s,e,t)<=i})}function Ao(e,t,n=1e-6,{allowCrossing:i=!1}={}){const r=Array.isArray(e)?e.map(pt):[];return r.length<2?null:(t??[]).map(a=>{if(!Array.isArray(a?.points)||a.points.length<3)return null;const s=$o(a),l=a.points.map(M=>cn(M,s)),c=(a.holes??[]).map(M=>M.map(A=>cn(A,s))),h=Math.max(1,...l.map(M=>Math.hypot(M.x,M.y))),d=Array.isArray(a?.sourceSolid?.vertices)?ju(a.sourceSolid)*iM:0,u=Math.max(n,h*1e-7,d),m=r.slice(0,-1).flatMap((M,A)=>{const v=r[A+1];return[0,.25,.5,.75,1].map(y=>({x:M.x+(v.x-M.x)*y,y:M.y+(v.y-M.y)*y,z:M.z+(v.z-M.z)*y}))}).map(M=>cn(M,s)),S=M=>{if(Math.abs(M.z)>u)return!1;const A={x:M.x,y:M.y};return ou(A,l,u)||au(A,l)?c.every(y=>ou(A,y,u)||!au(A,y)):!1},x=m.every(S),f=m.every(M=>Math.abs(M.z)<=u),p=i&&f&&(m.some(S)||r.slice(0,-1).some((M,A)=>{const v=cn(r[A],s),y=cn(r[A+1],s),E={x:v.x,y:v.y},T={x:y.x,y:y.y};return su(E,T,l,u)||c.some(g=>su(E,T,g,u))}));return!x&&!p?null:{face:a,plane:s,area:lM(l)}}).filter(Boolean).sort((a,s)=>a.area-s.area)[0]??null}function cM(e,t){const n=[...(e??[]).flatMap(i=>[i?.start,i?.end]),...t??[]].map(pt);return n.length?["x","y","z"].reduce((i,r)=>{const o=n.map(a=>a[r]);return Math.max(i,Math.max(...o)-Math.min(...o))},1):1}function lu(e){return{segment:{start:pt(e.start),end:pt(e.end)},points:[{parameter:0,point:pt(e.start)},{parameter:1,point:pt(e.end)}]}}function Lr(e,t,n){const i=e.segment.start,r=e.segment.end,o=er(i,r),a=o.x**2+o.y**2+o.z**2;if(a<=n**2)return!1;const s=((t.x-i.x)*o.x+(t.y-i.y)*o.y+(t.z-i.z)*o.z)/a,l=n/Math.sqrt(a);if(s<-l||s>1+l)return!1;const c=Math.max(0,Math.min(1,s)),h={x:i.x+o.x*c,y:i.y+o.y*c,z:i.z+o.z*c};if(oi(h,pt(t))>n)return!1;if(c<=l||c>=1-l)return!0;const d=e.points.find(u=>Math.abs(u.parameter-c)<=l);return d?(d.point=pt(t),!0):(e.points.push({parameter:c,point:pt(t)}),!0)}function uM(e,t,n){const i=e.segment.start,r=t.segment.start,o=er(i,e.segment.end),a=er(r,t.segment.end),s=er(r,i),l=o.x**2+o.y**2+o.z**2,c=o.x*a.x+o.y*a.y+o.z*a.z,h=a.x**2+a.y**2+a.z**2,d=o.x*s.x+o.y*s.y+o.z*s.z,u=a.x*s.x+a.y*s.y+a.z*s.z,m=l*h-c*c;if(l<=n**2||h<=n**2||Math.abs(m)<=l*h*1e-12)return null;const S=(c*u-h*d)/m,x=(l*u-c*d)/m,f=n/Math.sqrt(l),p=n/Math.sqrt(h);if(S<-f||S>1+f||x<-p||x>1+p)return null;const M={x:i.x+o.x*S,y:i.y+o.y*S,z:i.z+o.z*S},A={x:r.x+a.x*x,y:r.y+a.y*x,z:r.z+a.z*x};return oi(M,A)>n?null:{x:(M.x+A.x)*.5,y:(M.y+A.y)*.5,z:(M.z+A.z)*.5}}function cu(e,t,n){const i=uM(e,t,n);if(i)return Lr(e,i,n),Lr(t,i,n),!0;let r=!1;return[e.segment.start,e.segment.end].forEach(o=>{Lr(t,o,n)&&(r=!0)}),[t.segment.start,t.segment.end].forEach(o=>{Lr(e,o,n)&&(r=!0)}),r}function uu(e,t){const n=[...e.points].sort((i,r)=>i.parameter-r.parameter);return n.slice(0,-1).map((i,r)=>({start:pt(i.point),end:pt(n[r+1].point)})).filter(i=>oi(i.start,i.end)>t)}function dM({existingLines:e=[],newSegments:t=[],splitPoints:n=[],tolerance:i=null}={}){const r=(e??[]).filter(d=>d?.type==="LINE3D"&&d.visible!==!1&&d.locked!==!0&&d.start&&d.end),o=(t??[]).filter(d=>d?.start&&d?.end),a=Number.isFinite(i)&&i>0?i:Math.max(Pi,cM([...r,...o],n)*rM),s=r.map(d=>({...lu(d),line:d})),l=o.map(lu);l.forEach(d=>{(n??[]).forEach(u=>Lr(d,pt(u),a))});const c=new Set;return l.forEach((d,u)=>{s.forEach(m=>{cu(d,m,a)&&c.add(m.line.id)}),l.slice(u+1).forEach(m=>cu(d,m,a))}),{existingReplacements:s.map(d=>{const u=uu(d,a);return u.length>1?{id:d.line.id,segments:u}:null}).filter(Boolean),newSegments:l.flatMap(d=>uu(d,a)),touchedExistingLineIds:[...c],tolerance:a}}function fM(e,t){if(t?.type==="LINE"){const n=rd(e,t);return n?[n]:[]}return t?.type==="CIRCLE"||t?.type==="ARC"?Rh(e,t).filter(n=>Ch(n,t)):t?.type==="ELLIPSE"||t?.type==="ELLIPSE_ARC"?Ih(e,t):[]}function pM(e,t,n){const o=df(e,t).flatMap(a=>(n??[]).flatMap(s=>fM(a,s))).map(a=>Yr({x:a.x,y:-a.y,z:0},t));return o.filter((a,s)=>o.findIndex(l=>oi(a,l)<=Pi)===s)}function pf(e,t){if(!Array.isArray(e)||!t)return[];const n=i=>{const r=new $(i.x,i.y,i.z);if(t.type==="translate"){const o=pt(t.displacement);r.add(new $(o.x,o.y,o.z))}else if(t.type==="rotate"){const o=pt(t.axisStart),a=pt(t.axisEnd),s=new $(o.x,o.y,o.z),l=new $(a.x-o.x,a.y-o.y,a.z-o.z);if(l.lengthSq()<=Pi**2)return null;r.sub(s).applyAxisAngle(l.normalize(),xi.degToRad(Number(t.angleDegrees)||0)).add(s)}else return null;return{x:r.x,y:r.y,z:r.z}};return e.map(i=>({...i,start:n(i.start),end:n(i.end)})).filter(i=>i.start&&i.end)}function hM({camera:e,canvas:t,cursorInput:n=null,getContext:i,getSnap:r=()=>null,getUnitsLabel:o=()=>"mm",onCommit:a=()=>null,onSnap:s=()=>{},onStatus:l=()=>{},render:c=()=>{},scene:h}={}){const d=new qt;d.name="webcad-line3d-preview";const u=new qo(18);u.name="webcad-line3d-axis-helper",u.visible=!1,d.add(u),h.add(d);let m=!1,S=null,x=[],f=null,p=null,M=!1;function A(){[f,p].forEach(D=>{D&&(d.remove(D),at(D))}),f=null,p=null}function v(){return x.slice(0,-1).map((D,j)=>({start:D,end:x[j+1]}))}function y(D=null,j=null,ae={}){A();const q=v();q.length&&(f=Kt(q,{color:Ze.drawingColor,depthTest:!1,depthWrite:!1,linewidth:Ze.drawingLineWidth,renderOrder:81,transparent:!0,opacity:.95}),d.add(f)),D&&x.length&&(p=uf(x.at(-1),pt(D),ae,"webcad-line3d-draw-distance-guide"),p&&d.add(p)),s(j),D&&x.length&&l(ts(`Línea 3D · tramo ${q.length+1}`,x.at(-1),pt(D))),c()}function E(D=!1){if(!m)return!1;P.cancel();const j=!D&&x.length>=2?a({context:S,closed:aM(x),points:x.map(pt)}):null;return m=!1,S=null,x=[],A(),u.visible=!1,s(null),l(D?"Línea 3D cancelada":j?"Línea 3D creada":"Línea 3D finalizada"),c(),!0}function T(){P.start({prompt:x.length?"Precise el siguiente punto · Enter, Espacio o clic derecho para terminar":"Precise el primer punto",...x.length?{anchor:x.at(-1)}:{},onCancel(){E(x.length<2)},onPoint(D){const j=pt(D);if(x.length&&oi(x.at(-1),j)<=Pi){T();return}if(x.length>=3&&oi(x[0],j)<=Pi){x.push({...x[0]}),y(),E();return}x.push(j),y(),T()}})}function g(D){if(x.length<3||!D)return null;const j=t.getBoundingClientRect(),ae=new $(x[0].x,x[0].y,x[0].z).project(e);if(ae.z<-1||ae.z>1)return null;const q=j.left+(ae.x+1)*j.width*.5,ne=j.top+(1-ae.y)*j.height*.5,ue=Math.hypot(D.clientX-q,D.clientY-ne);return ue<=16?{type:"endpoint",point:{...x[0]},documentSolidId:null,distancePixels:ue}:null}const P=Jo({camera:e,canvas:t,cursorInput:n,getSnap:D=>{const j=r(D,{context:S,firstPoint:x[0]??null,points:x}),ae=g(D);return ae&&(!j||ae.distancePixels<=Number(j.distancePixels??1/0))?ae:j},getWorkplane:()=>S?.plane,getUnitsLabel:o,onHelper(D){u.position.set(D.x,D.y,D.z),u.visible=!0,c()},onPreview(D,j){y(D,j.snap??null,j)},onStatus:l});function C(){const D=i?.();return D?.plane?(m&&E(!0),m=!0,S=D,x=[],t.focus?.({preventScroll:!0}),T(),!0):(l("Línea 3D · no hay una referencia espacial válida"),!1)}function I(D){!m||D.buttons||P.pointer(D)}function U(D){if(!(!m||D.button!==0&&D.button!==2)){if(M=!0,D.preventDefault(),D.stopImmediatePropagation(),ru(D)){E(x.length<2);return}P.pointer(D),P.confirm()}}function V(D){M&&(M=!1,D.preventDefault(),D.stopImmediatePropagation())}function k(D){if(m){if(D.key==="Escape"){D.preventDefault(),D.stopImmediatePropagation(),E(x.length<2);return}if(ru(D,{hasInput:P.hasInput()})){D.preventDefault(),D.stopImmediatePropagation(),E(x.length<2);return}P.keydown(D)&&(D.preventDefault(),D.stopImmediatePropagation())}}function B(D){!m||!P.keyup(D)||(D.preventDefault(),D.stopImmediatePropagation())}function Y(D){m&&(D.preventDefault(),D.stopImmediatePropagation())}return t.addEventListener("pointermove",I,!0),t.addEventListener("pointerdown",U,!0),t.addEventListener("click",V,!0),t.addEventListener("contextmenu",Y,!0),t.addEventListener("keydown",k,!0),t.addEventListener("keyup",B,!0),{cancel:()=>E(!0),dispose(){E(!0),t.removeEventListener("pointermove",I,!0),t.removeEventListener("pointerdown",U,!0),t.removeEventListener("click",V,!0),t.removeEventListener("contextmenu",Y,!0),t.removeEventListener("keydown",k,!0),t.removeEventListener("keyup",B,!0),h.remove(d),at(d)},isActive:()=>m,start:C}}function mM({camera:e,canvas:t,cursorInput:n=null,getSnap:i=()=>null,getUnitsLabel:r=()=>"mm",getWorkplane:o,onSnap:a=()=>{},onStatus:s=()=>{},onTransform:l=()=>!1,render:c=()=>{},scene:h}={}){const d=new qt;d.name="webcad-line3d-transform-helper";const u=new qo(18);u.name="webcad-line3d-transform-axis-helper",u.visible=!1,d.add(u),h.add(d);let m=!1,S=null,x=null,f=null,p=null,M=null,A=null,v="",y=!1,E=null,T=null;function g(){E&&(d.remove(E),at(E),E=null)}function P(O,xe,ee={},W="webcad-line3d-transform-guide"){g(),E=uf(O,pt(xe),ee,W),E&&d.add(E)}function C(){T&&(d.remove(T),at(T),T=null)}function I(O){C();const xe=pf(x?.lines,O);xe.length&&(T=Kt(xe.map(ee=>({start:ee.start,end:ee.end})),{color:16764749,depthTest:!1,depthWrite:!1,linewidth:Ze.drawingLineWidth+.8,renderOrder:81,transparent:!0,opacity:.82}),T.name=`webcad-line3d-${S}-preview`,d.add(T))}function U(O=null){q.cancel(),g(),C(),a(null),u.visible=!1,m=!1,S=null,x=null,f=null,p=null,M=null,A=null,v="",O&&s(O),c()}function V(O){const xe={x:O.x-p.x,y:O.y-p.y,z:O.z-p.z},ee=l({mode:S,record:x,transform:{type:"translate",displacement:xe}});U(ee?`Líneas 3D ${S==="copy"?"copiadas":"desplazadas"}`:"Transformación de líneas 3D cancelada")}function k(){f="destination",q.start({anchor:p,prompt:"Precise punto de destino",onCancel:()=>U("Transformación de líneas 3D cancelada"),onPoint:V})}function B(){f="base",q.start({prompt:"Precise punto base",onCancel:()=>U("Transformación de líneas 3D cancelada"),onPoint(O){p=pt(O),g(),k()}})}function Y(){f="axisEnd",q.start({anchor:M,prompt:"Precise segundo punto del eje",onCancel:()=>U("Giro de líneas 3D cancelado"),onPoint(O){if(A=pt(O),oi(M,A)<=Pi){s("El eje de giro debe tener longitud"),Y();return}q.cancel(),P(M,A,{locked:!0},"webcad-line3d-rotation-axis"),f="angle",v="",s("Precise ángulo de giro")}})}function D(){f="axisStart",q.start({prompt:"Precise primer punto del eje",onCancel:()=>U("Giro de líneas 3D cancelado"),onPoint(O){M=pt(O),Y()}})}function j(O){return!Number.isFinite(O)||!M||!A?!1:(I({type:"rotate",axisStart:M,axisEnd:A,angleDegrees:O}),s(`Precise ángulo de giro · ${nn(O)}°`),c(),!0)}function ae(){const O=zi(v);if(!Number.isFinite(O))return!1;const xe=l({mode:S,record:x,transform:{type:"rotate",axisStart:M,axisEnd:A,angleDegrees:O}});return U(xe?`Líneas 3D giradas ${O}°`:"Giro de líneas 3D cancelado"),!0}const q=Jo({camera:e,canvas:t,cursorInput:n,getSnap:i,getWorkplane:o,getUnitsLabel:r,onHelper(O){u.position.set(O.x,O.y,O.z),u.visible=!0,c()},onStatus:s,onPreview(O,xe){a(xe.snap??null),f==="destination"&&p?(P(p,O,xe),I({type:"translate",displacement:er(p,pt(O))}),s(ts("Precise punto de destino",p,pt(O))),c()):f==="axisEnd"&&M&&(P(M,O,xe,"webcad-line3d-rotation-axis"),s(ts("Precise segundo punto del eje",M,pt(O))),c())}});function ne(O,xe){return!Array.isArray(xe?.lines)||!xe.lines.length?!1:(m&&U(),m=!0,S=O,x=xe,t.focus?.({preventScroll:!0}),S==="rotate"?D():B(),!0)}function ue(O){!m||!q.isActive()||O.buttons||q.pointer(O)}function we(O){if(!(!m||O.button!==0&&O.button!==2)){if(f==="angle"&&O.button===2){y=!0,O.preventDefault(),O.stopImmediatePropagation(),ae();return}q.isActive()&&(y=!0,O.preventDefault(),O.stopImmediatePropagation(),q.pointer(O),q.confirm())}}function Le(O){y&&(y=!1,O.preventDefault(),O.stopImmediatePropagation())}function ze(O){if(m){if(O.key==="Escape"){O.preventDefault(),O.stopImmediatePropagation(),U("Transformación de líneas 3D cancelada");return}if(f==="angle"){if(O.key==="Enter"||O.key===" "){if(!ae())return}else if(O.key==="Backspace")v=v.slice(0,-1);else if(/^[0-9eE+\-*/().,\s]$/.test(O.key))v+=O.key;else return;if(O.preventDefault(),O.stopImmediatePropagation(),f==="angle"){const xe=zi(v);j(xe)||(C(),s(`Precise ángulo de giro · ${v}`),c())}return}q.keydown(O)&&(O.preventDefault(),O.stopImmediatePropagation())}}function J(O){!m||!q.isActive()||!q.keyup(O)||(O.preventDefault(),O.stopImmediatePropagation())}return t.addEventListener("pointermove",ue,!0),t.addEventListener("pointerdown",we,!0),t.addEventListener("click",Le,!0),t.addEventListener("contextmenu",ce,!0),t.addEventListener("keydown",ze,!0),t.addEventListener("keyup",J,!0),{cancel:()=>U("Transformación de líneas 3D cancelada"),dispose(){U(),t.removeEventListener("pointermove",ue,!0),t.removeEventListener("pointerdown",we,!0),t.removeEventListener("click",Le,!0),t.removeEventListener("contextmenu",ce,!0),t.removeEventListener("keydown",ze,!0),t.removeEventListener("keyup",J,!0),h.remove(d),at(d)},isActive:()=>m,startCopy:O=>ne("copy",O),startMove:O=>ne("move",O),startRotate:O=>ne("rotate",O)};function ce(O){m&&(O.preventDefault(),O.stopImmediatePropagation())}}const du=5622015;function Ii(e){return new $(Number(e?.x)||0,Number(e?.y)||0,Number(e?.z)||0)}function Ca(e){return{x:Number(e?.x)||0,y:Number(e?.y)||0,z:Number(e?.z)||0}}function gM(e,t,n=0){const i=String(e||"Sólido"),r=Number(n)>0?` — Parte ${Number(n)+1}`:"";return`${i} — Corte ${t}${r}`}function _M(e,t){const n=od(e),i=Math.max(Number(t)||0,1);if(!n)return null;const r=new qt;r.name="webcad-solid-plane-cut-preview";const o=new jt(new Qr(i,i),new dr({color:du,depthTest:!1,depthWrite:!1,opacity:.2,side:tn,transparent:!0}));o.name="webcad-solid-plane-cut-preview-fill",o.renderOrder=84;const a=i*.5,s=[new $(-a,-a,0),new $(a,-a,0),new $(a,a,0),new $(-a,a,0),new $(-a,-a,0)],l=new Va(new ii().setFromPoints(s),new id({color:du,depthTest:!1,transparent:!0,opacity:.95}));return l.name="webcad-solid-plane-cut-preview-outline",l.renderOrder=85,r.add(o,l),r.position.copy(Ii(n.origin)),r.quaternion.setFromUnitVectors(new $(0,0,1),Ii(n.normal).normalize()),r.userData={plane:n,previewSize:i},r}function xM(e){return{"collinear-points":"Corte no realizado: los tres puntos del plano están alineados","degenerate-result":"Corte no realizado: el resultado contiene residuos o partes degeneradas","invalid-result":"Corte no realizado: el resultado no es un sólido cerrado y válido","invalid-source-solid":"Corte no realizado: el sólido seleccionado no es válido","kernel-unavailable":"Corte no realizado: el núcleo 3D no está disponible","plane-does-not-cross-interior":"Corte no realizado: el plano no atraviesa el interior del sólido"}[e]??"Corte no realizado: no se pudo resolver la operación"}function vM({camera:e,canvas:t,cursorInput:n=null,doc:i,getSelectedSolidIds:r=()=>[],getSolidIdAtPointer:o=()=>null,getSolidObjects:a=()=>[],getSnap:s=()=>null,getUnitsLabel:l=()=>"mm",getWorkplane:c,onChanged:h=()=>{},onSelection:d=()=>{},onSnap:u=()=>{},onStatus:m=()=>{},render:S=()=>{},scene:x}={}){let f=!1,p=null,M=null,A=[],v=null,y=!1,E=!1,T=[];const g=new qo(18);g.name="webcad-solid-plane-cut-axis-helper",g.visible=!1,x.add(g);function P(ee){return i?.model3d?.solids?.find(W=>W?.id===ee)??null}function C(ee){const W=[...new Set(ee)].filter(me=>{const de=P(me);return de&&de.visible!==!1&&de.locked!==!0});return W.length===1?W[0]:null}function I(){return a().find(ee=>ee?.userData?.documentSolidId===M)??null}function U(ee=A){const W=I(),me=W?new Mn().setFromObject(W):new Mn().makeEmpty(),de=me.isEmpty()?0:me.getSize(new $).length(),G=ee.length?Math.max(...ee.map(oe=>Ii(oe).distanceTo(Ii(ee[0])))):0;return Math.max(de*1.6,G*2.4,10)}function V(ee){g.visible=!!ee,ee&&g.position.copy(Ii(ee)),S()}function k(){v&&(x.remove(v),at(v),v=null)}function B(ee){return k(),v=_M(ee,U(ee)),v&&x.add(v),S(),!!v}function Y(){we.cancel(),k(),g.visible=!1,u(null),f=!1,p=null,M=null,A=[],E=!1,S()}function D(){if(!f)return!1;const ee=[...T];return Y(),d(ee),m("Cortar sólido por plano cancelado"),!0}function j(ee){const W=M?[M]:[...T],me=xM(ee);return Y(),d(W),m(me),!1}function ae(ee){const W=["Precise primer punto del plano o [Desde]","Precise segundo punto del plano o [Desde]","Precise tercer punto del plano o [Desde]"];p=`point${ee+1}`,we.start({allowFrom:!0,anchor:ee?A[ee-1]:null,prompt:W[ee],onCancel:D,onPoint(me){const de=[...A,Ca(me)];if(ee===1&&Ii(de[0]).distanceTo(Ii(de[1]))<=1e-9){m("Precise segundo punto del plano · debe ser distinto del primero"),ae(1);return}if(ee===2&&!od(de)){k(),m("Precise tercer punto del plano · los tres puntos no pueden estar alineados"),ae(2);return}if(A=de,V(me),ee<2){ae(ee+1);return}B(A),p="confirm",u(null),m("Cortar sólido por plano · Enter, Espacio o clic derecho para confirmar")}})}function q(){const ee=P(M);return ee?ee.locked===!0?(m(`${ee.name} está bloqueado`),!1):(A=[],d([M]),ae(0),!0):j("invalid-source-solid")}function ne(){if(!f||p!=="confirm"||A.length!==3)return!1;const ee=P(M);if(!ee)return j("invalid-source-solid");const W=A.map(Ce=>Ss(Ce,ee.placement)),me={type:"cutSolidByPlane",points:W.map(Ca)},de=$u(ee.solid,W,{operation:me});if(!de.ok)return j(de.reason);const G=de.parts.map(Ce=>{const Xe={...me,plane:de.plane,side:Ce.side,component:Ce.componentIndex+1};return{name:gM(ee.name,Ce.side,Ce.componentIndex),operation:Xe,placement:ee.placement,solid:Ce.solid}}),oe=i?.replace3dSolidWithParts?.(M,G)??[];if(oe.length!==G.length)return j("invalid-result");const ge=oe.map(Ce=>Ce.id);return Y(),h(),d(ge),m(`Corte completado · ${ge.length} sólidos resultantes conservados`),!0}function ue(){return f&&D(),T=[...r()],f=!0,M=C(T),t.focus?.({preventScroll:!0}),M?q():(p="selection",d([]),m("Cortar sólido por plano · seleccione un sólido"),!0)}const we=Jo({camera:e,canvas:t,cursorInput:n,getSnap:(ee,W)=>s(ee,{...W,phase:p,solidId:M}),getUnitsLabel:l,getWorkplane:c,onHelper:V,onPreview(ee,W){u(W.snap??null),p==="point3"&&A.length===2&&B([...A,Ca(ee)])},onStatus:m});function Le(ee){!f||ee.buttons||!we.isActive()||(we.pointer(ee),S())}function ze(ee){if(!(!f||ee.button!==0&&ee.button!==2)){if(y=!0,E=ee.button===2,ee.preventDefault(),ee.stopImmediatePropagation(),p==="selection"){if(ee.button===2){m("Cortar sólido por plano · seleccione un sólido");return}const W=o(ee),me=P(W);if(!me||me.visible===!1){m("Cortar sólido por plano · seleccione un sólido");return}if(me.locked===!0){m(`${me.name} está bloqueado`);return}M=W,q();return}if(we.isActive()){we.pointer(ee),we.confirm();return}p==="confirm"&&ee.button===2&&ne()}}function J(ee){y&&(y=!1,ee.preventDefault(),ee.stopImmediatePropagation())}function ce(ee){!E&&!f||(E=!1,ee.preventDefault(),ee.stopImmediatePropagation())}function O(ee){if(f){if(ee.key==="Escape"){ee.preventDefault(),ee.stopImmediatePropagation(),D();return}if(we.isActive()){we.keydown(ee)&&(ee.preventDefault(),ee.stopImmediatePropagation());return}p==="confirm"&&ur(ee)&&(ee.preventDefault(),ee.stopImmediatePropagation(),ne())}}function xe(ee){!f||!we.isActive()||!we.keyup(ee)||(ee.preventDefault(),ee.stopImmediatePropagation(),S())}return t.addEventListener("pointermove",Le,!0),t.addEventListener("pointerdown",ze,!0),t.addEventListener("click",J,!0),t.addEventListener("contextmenu",ce,!0),t.addEventListener("keydown",O,!0),t.addEventListener("keyup",xe,!0),{cancel:D,confirm:ne,dispose(){f&&D(),t.removeEventListener("pointermove",Le,!0),t.removeEventListener("pointerdown",ze,!0),t.removeEventListener("click",J,!0),t.removeEventListener("contextmenu",ce,!0),t.removeEventListener("keydown",O,!0),t.removeEventListener("keyup",xe,!0),x.remove(g),at(g)},isActive:()=>f,start:ue}}function fu(e){return new yn().fromArray(Wu(ri(e)))}function hf(e,t){return fu(e).invert().multiply(fu(t))}function mf(e,t,n="unionSolid"){let i=null;try{i=Dh({name:e.name,solid:e.solid})}catch{return null}const r=l0(e.solid,t);return r?{type:n,tool:{authority:i,transform:[...t.elements]},analyticProfiles:n==="subtractSolid"?r.map(o=>({...o,operationType:"subtract"})):r}:null}function SM(e){return{ids:[e.id],name:e.name,placement:ri(e.placement),primaryRecord:e,solid:e.solid}}function EM(e=[]){const t=e.map(SM);let n=0,i=!0;for(;i;){i=!1;e:for(let r=0;r<t.length;r+=1)for(let o=r+1;o<t.length;o+=1){const a=t[r],s=t[o],l=hf(a.placement,s.placement),c=mf(s,l);if(!c)return{ok:!1,reason:"non-replayable-solid",groups:[]};const h=ds(a.solid,s.solid,{operation:c,toolTransform:l.elements});if(!h)return{ok:!1,reason:"invalid-result",groups:[]};if(h.length===1){t[r]={...a,ids:[...a.ids,...s.ids],name:`${a.name} + ${s.name}`,solid:h[0]},t.splice(o,1),n+=1,i=!0;break e}}}return{ok:!0,groups:t,mergedPairCount:n,mergedSolidCount:t.reduce((r,o)=>r+Math.max(0,o.ids.length-1),0)}}function yM({doc:e,solidIds:t=[]}={}){const n=[...new Set(t)];if(n.length<2)return{ok:!1,reason:"too-few-solids"};const i=n.map(s=>e?.model3d?.solids?.find(l=>l?.id===s)??null);if(i.some(s=>!s||s.visible===!1))return{ok:!1,reason:"invalid-selection"};if(i.some(s=>s.locked===!0))return{ok:!1,reason:"locked-solid"};const r=EM(i);if(!r.ok)return r;if(!r.groups.filter(s=>s.ids.length>1).length)return{...r,ok:!1,reason:"no-material-connection"};e.recordHistory?.();const a=[];for(const s of r.groups){if(s.ids.length===1){a.push(s.ids[0]);continue}const l=s.solid?.metadata?.profileFeatures?.at(-1)??{type:"unionSolid"},c=e.replace3dSolid?.(s.ids[0],s.solid,{name:s.name,operation:l,placement:s.placement,recordHistory:!1});if(!c)return{ok:!1,reason:"publication-failed"};s.ids.slice(1).forEach(h=>{e.remove3dSolid?.(h,{recordHistory:!1})}),a.push(c.id)}return{...r,ok:!0,resultIds:a}}const MM=new Set(["no-intersection","tangent-contact"]);function bM(e,t=[]){if(!e?.solid)return{ok:!1,reason:"invalid-target-solid"};if(!t.length)return{ok:!1,reason:"too-few-cutters"};let n=[{solid:e.solid}],i=!1;const r=[];for(const o of t){const a=hf(e.placement,o.placement),s=mf(o,a,"subtractSolid");if(!s)return{ok:!1,reason:"non-replayable-solid"};const l=[];for(const c of n){const h=Yu(c.solid,o.solid,{operation:s,toolTransform:a.elements});if(MM.has(h.reason)){r.push({cutterId:o.id,reason:h.reason}),l.push(c);continue}if(h.reason==="result-empty"){i=!0;continue}if(!h.ok)return h;i=!0,l.push(...h.solids.map(d=>({solid:d})))}if(n=l,!n.length)break}return i?{ok:!0,components:n,empty:n.length===0,ignoredContacts:r}:{ok:!1,reason:r.length>0&&r.every(a=>a.reason==="tangent-contact")?"tangent-contact":"no-intersection",ignoredContacts:r}}function AM({cutterIds:e=[],doc:t,targetId:n=null}={}){const i=[...new Set(e)].filter(c=>c!==n);if(!n)return{ok:!1,reason:"invalid-target-solid"};if(!i.length)return{ok:!1,reason:"too-few-cutters"};const r=t?.model3d?.solids?.find(c=>c?.id===n)??null,o=i.map(c=>t?.model3d?.solids?.find(h=>h?.id===c)??null);if(!r||r.visible===!1)return{ok:!1,reason:"invalid-target-solid"};if(o.some(c=>!c||c.visible===!1))return{ok:!1,reason:"invalid-cutter-geometry"};if(r.locked===!0||o.some(c=>c.locked===!0))return{ok:!1,reason:"locked-solid"};const a=bM(r,o);if(!a.ok)return a;if(t.recordHistory?.(),a.empty)return t.remove3dSolid?.(r.id,{recordHistory:!1}),o.forEach(c=>{t.remove3dSolid?.(c.id,{recordHistory:!1})}),{...a,resultIds:[]};const s=a.components.map(({solid:c},h)=>({name:a.components.length===1?r.name:`${r.name} — Parte ${h+1}`,operation:c.metadata?.profileFeatures?.at(-1)??{type:"subtractSolid"},placement:r.placement,solid:c})),l=t.replace3dSolidWithParts?.(r.id,s,{recordHistory:!1})??[];return l.length!==s.length?{ok:!1,reason:"publication-failed"}:(o.forEach(c=>{t.remove3dSolid?.(c.id,{recordHistory:!1})}),{...a,resultIds:l.map(c=>c.id)})}function TM(e){return{"below-useful-tolerance":"Resta no realizada: la intersección es degenerada o demasiado pequeña","invalid-cutter-geometry":"Resta no realizada: uno de los cortadores no es válido","invalid-overlap-test":"Resta no realizada: el contacto entre sólidos es ambiguo","invalid-result":"Resta no realizada: el resultado no es cerrado y válido","invalid-target-solid":"Resta no realizada: el sólido objetivo no es válido","kernel-error":"Resta no realizada: el núcleo 3D no pudo resolver la geometría","kernel-unavailable":"Resta no realizada: el núcleo 3D no está disponible","locked-solid":"Resta no realizada: uno de los sólidos está bloqueado","minimum-thickness":"Resta no realizada: el resultado incumple el espesor mínimo","no-intersection":"Resta no realizada: ningún cortador atraviesa el volumen del objetivo","non-replayable-solid":"Resta no realizada: uno de los sólidos no tiene geometría paramétrica reproducible","publication-failed":"Resta no realizada: no se pudo actualizar el documento","tangent-contact":"Resta no realizada: solo existe contacto tangente por cara, arista o vértice","too-few-cutters":"Seleccione al menos un sólido cortador"}[e]??"Resta no realizada: no se pudo resolver la operación"}function PM({canvas:e,doc:t,getSelectedSolidIds:n=()=>[],getSolidIdAtPointer:i=()=>null,onChanged:r=()=>{},onSelection:o=()=>{},onStatus:a=()=>{}}={}){let s=!1,l=[],c=[],h="target",d=!1,u=!1,m=null;function S(C){return t?.model3d?.solids?.find(I=>I?.id===C)??null}function x(C){const I=S(C);return I&&I.visible!==!1&&I.locked!==!0?I:null}function f(){if(!m){a("Restar sólidos · seleccione primero el sólido objetivo");return}const C=l.length;a(`Restar sólidos · objetivo seleccionado · ${C} cortador${C===1?"":"es"}`+(C?" · Enter, Espacio o clic derecho para confirmar":""))}function p(){o([m,...l].filter(Boolean))}function M(){s=!1,h="target",m=null,l=[],u=!1}function A(){return s?(M(),o([...c]),a("Restar sólidos cancelado"),!0):!1}function v(){if(!s||!m||!l.length)return f(),!1;const C=[m,...l],I=AM({cutterIds:l,doc:t,targetId:m});if(!I.ok)return o(C),a(TM(I.reason)),!1;const U=I.resultIds.length;return M(),r(),o(I.resultIds),a(I.empty?"Resta completada · el volumen objetivo se ha eliminado por completo":`Resta completada · ${U} componente${U===1?"":"s"} resultante${U===1?"":"s"}`),!0}function y(){s&&A(),c=[...n()];const C=c.filter(I=>x(I));return m=C[0]??null,l=C.slice(1),h=m?"cutters":"target",s=!0,e.focus?.({preventScroll:!0}),p(),f(),!0}function E(C){if(!s||C.button!==0&&C.button!==2)return;if(d=!0,u=C.button===2,C.preventDefault(),C.stopImmediatePropagation(),C.button===2){v();return}const I=i(C),U=S(I);if(!U||U.visible===!1){f();return}if(U.locked===!0){a(`${U.name} está bloqueado`);return}if(h==="target"){m=I,h="cutters",p(),f();return}if(I===m){a("El sólido objetivo ya está seleccionado · seleccione los cortadores");return}l=l.includes(I)?l.filter(V=>V!==I):[...l,I],p(),f()}function T(C){d&&(d=!1,C.preventDefault(),C.stopImmediatePropagation())}function g(C){!u&&!s||(u=!1,C.preventDefault(),C.stopImmediatePropagation())}function P(C){if(s){if(C.key==="Escape"){C.preventDefault(),C.stopImmediatePropagation(),A();return}ur(C)&&(C.preventDefault(),C.stopImmediatePropagation(),v())}}return e.addEventListener("pointerdown",E,!0),e.addEventListener("click",T,!0),e.addEventListener("contextmenu",g,!0),e.addEventListener("keydown",P,!0),{cancel:A,confirm:v,dispose(){s&&A(),e.removeEventListener("pointerdown",E,!0),e.removeEventListener("click",T,!0),e.removeEventListener("contextmenu",g,!0),e.removeEventListener("keydown",P,!0)},isActive:()=>s,start:y}}function wM(e){return{"invalid-result":"Unión no realizada: la geometría resultante no es cerrada y válida","invalid-selection":"Unión no realizada: la selección contiene un sólido no disponible","locked-solid":"Unión no realizada: uno de los sólidos está bloqueado","no-material-connection":"Unión no realizada: los sólidos están separados o solo se tocan por una arista o un punto","non-replayable-solid":"Unión no realizada: uno de los sólidos no tiene geometría paramétrica reproducible","publication-failed":"Unión no realizada: no se pudo actualizar el documento","too-few-solids":"Seleccione al menos dos sólidos para unir"}[e]??"Unión no realizada: no se pudo resolver la operación"}function RM({canvas:e,doc:t,getSelectedSolidIds:n=()=>[],getSolidIdAtPointer:i=()=>null,onChanged:r=()=>{},onSelection:o=()=>{},onStatus:a=()=>{}}={}){let s=!1,l=[],c=[],h=!1,d=!1;function u(T){return t?.model3d?.solids?.find(g=>g?.id===T)??null}function m(T){return[...new Set(T)].filter(g=>{const P=u(g);return P&&P.visible!==!1&&P.locked!==!0})}function S(){const T=c.length;a(`Unir sólidos · ${T} seleccionado${T===1?"":"s"}`+(T>=2?" · Enter, Espacio o clic derecho para confirmar":""))}function x(){s=!1,d=!1}function f(){return s?(x(),o([...l]),a("Unir sólidos cancelado"),!0):!1}function p(){if(!s)return!1;if(c.length<2)return S(),!1;const T=yM({doc:t,solidIds:c});if(!T.ok)return o([...c]),a(wM(T.reason)),!1;x(),r(),o(T.resultIds);const g=T.groups.length,P=T.groups.filter(C=>C.ids.length===1).length;return a(`Unión completada · ${g} componente${g===1?"":"s"} material${g===1?"":"es"}`+(P?` · ${P} sólido${P===1?"":"s"} separado${P===1?"":"s"} conservado${P===1?"":"s"}`:"")),!0}function M(){return s&&f(),l=[...n()],c=m(l),s=!0,e.focus?.({preventScroll:!0}),o([...c]),S(),!0}function A(T){if(!s||T.button!==0&&T.button!==2)return;if(h=!0,d=T.button===2,T.preventDefault(),T.stopImmediatePropagation(),T.button===2){p();return}const g=i(T),P=u(g);if(!P||P.visible===!1){S();return}if(P.locked===!0){a(`${P.name} está bloqueado`);return}c=c.includes(g)?c.filter(C=>C!==g):[...c,g],o([...c]),S()}function v(T){h&&(h=!1,T.preventDefault(),T.stopImmediatePropagation())}function y(T){!d&&!s||(d=!1,T.preventDefault(),T.stopImmediatePropagation())}function E(T){if(s){if(T.key==="Escape"){T.preventDefault(),T.stopImmediatePropagation(),f();return}ur(T)&&(T.preventDefault(),T.stopImmediatePropagation(),p())}}return e.addEventListener("pointerdown",A,!0),e.addEventListener("click",v,!0),e.addEventListener("contextmenu",y,!0),e.addEventListener("keydown",E,!0),{cancel:f,confirm:p,dispose(){s&&f(),e.removeEventListener("pointerdown",A,!0),e.removeEventListener("click",v,!0),e.removeEventListener("contextmenu",y,!0),e.removeEventListener("keydown",E,!0)},isActive:()=>s,start:M}}const Ia="webcad-push-silhouette",pu="webcad-push-generatrix-silhouette",hu="webcad-push-hidden-edges",mu="webcad-push-visible-edges",ni=1e-9,CM=10;function gf(e){return e?.metadata?.type==="profileFeature"||Array.isArray(e?.metadata?.profileFeatures)}function vn(e){return new $(Number(e.x)||0,Number(e.y)||0,Number(e.z)||0)}function IM(e){return e.matrixWorld.elements.map(t=>t.toFixed(4)).join(",")}function DM(e,t){return e<t?`${e}:${t}`:`${t}:${e}`}function _f(e,t){const n=e.map(o=>vn(t[o])).filter(Boolean);if(n.length<3)return null;const i=n.reduce((o,a)=>o.add(a),new $).multiplyScalar(1/n.length);let r=null;for(let o=1;o<n.length-1;o+=1){const a=new $().subVectors(n[o],n[0]).cross(new $().subVectors(n[o+1],n[0]));if(a.lengthSq()>ni){r=a.normalize();break}}return r?{center:i,normal:r}:null}function Nr(e,t){const n=new $().subVectors(t.position,e.center);return e.normal.dot(n)>=0}function LM(e,t){const n=new Set(e?.metadata?.smoothVerticalEdgeIndices||e?.metadata?.smoothProfileVertexIndices||[]);fs(e,e?.metadata?.cadProfileVertexIndices).forEach(o=>n.add(o));const i=e?.vertices?.[t[0]],r=e?.vertices?.[t[1]];return n.has(Math.min(t[0],t[1]))&&i&&r&&Math.abs(i.x-r.x)<=ni&&Math.abs(i.y-r.y)<=ni&&Math.abs(i.z-r.z)>ni}function xf(e){const t=Array.isArray(e?.vertices)?e.vertices:[],n=Array.isArray(e?.faces)?e.faces:[],i=n.map(o=>_f(o,t)),r=new Map;return n.forEach((o,a)=>{for(let s=0;s<o.length;s+=1){const l=o[s],c=o[(s+1)%o.length],h=DM(l,c);r.has(h)||r.set(h,{edge:[l,c],faces:[]}),r.get(h).faces.push(a)}}),{vertices:t,faceInfos:i,edgeFaces:r}}function NM(e,t,n){return e.map(i=>t[i]).filter(Boolean).map(i=>Nr(i,n))}function ns(e,t){const n=e[t[0]],i=e[t[1]];return!n||!i?null:{start:{x:n.x,y:n.y,z:n.z},end:{x:i.x,y:i.y,z:i.z}}}function vf(e,t,n,i=new Set){const{vertices:r,faceInfos:o,edgeFaces:a}=xf(e);if(!r.length||!o.length||!t)return[];const s=[];return a.forEach(({edge:l,faces:c})=>{const h=NM(c,o,t),d=h.length<2,u=h.length>=2&&h.some(Boolean)&&!h.every(Boolean);if(!d&&!u||LM(e,l)!==n||n&&i.has(Math.min(l[0],l[1])))return;const m=ns(r,l);m&&s.push(m)}),s}function UM(e,t){return gf(e)?[]:vf(e,t,!1)}function FM(e){const t=Number(e?.metadata?.profileSize),n=Number(e?.vertices?.length)/2,i=Number.isInteger(t)&&t>=3?t:Number.isInteger(n)&&n>=3?n:0;if(!i)return null;const r=Array.isArray(e?.metadata?.profileLoopSizes)?e.metadata.profileLoopSizes.map(Number):[i];return{loopSizes:r.every(a=>Number.isInteger(a)&&a>=3)&&r.reduce((a,s)=>a+s,0)===i?r:[i],profileSize:i}}function OM(e,t,n,i){if(!e.indices.every(u=>i.has(u)))return null;const r=e.indices.map(u=>t.vertices[u]),o=r.reduce((u,m)=>({x:u.x+m.x/r.length,y:u.y+m.y/r.length}),{x:0,y:0}),a=r.map(u=>Math.hypot(u.x-o.x,u.y-o.y)),s=a.reduce((u,m)=>u+m,0)/a.length,l=Math.max(1e-7,s*1e-6);if(s<=l||a.some(u=>Math.abs(u-s)>l))return null;const c=r.reduce((u,m)=>u+m.z,0)/r.length,h=e.indices.map(u=>t.vertices[u+n]);if(h.some(u=>!u))return null;const d=h.reduce((u,m)=>u+m.z,0)/h.length;return{center:o,radius:s,lowerZ:c,upperZ:d}}function zM(e,t){if(t?.isOrthographicCamera){const c=new $;t.getWorldDirection(c);const h=Math.hypot(c.x,c.y);if(h<=ni)return[];const d={x:-c.y/h,y:c.x/h};return[-1,1].map(u=>({x:e.center.x+d.x*e.radius*u,y:e.center.y+d.y*e.radius*u}))}const n=new $;t.getWorldPosition(n);const i=n.x-e.center.x,r=n.y-e.center.y,o=i*i+r*r,a=e.radius*e.radius;if(o<=a+ni)return[];const s=a/o,l=e.radius*Math.sqrt(o-a)/o;return[-1,1].map(c=>({x:e.center.x+i*s-r*l*c,y:e.center.y+r*s+i*l*c}))}function BM(e,t){const n=FM(e);if(!n)return{coveredIndices:new Set,segments:[]};const i=new Set(e?.metadata?.smoothVerticalEdgeIndices||e?.metadata?.smoothProfileVertexIndices||[]);fs(e,e?.metadata?.cadProfileVertexIndices).forEach(s=>i.add(s));const r=new Set,o=[];let a=0;return n.loopSizes.forEach(s=>{const l=Array.from({length:s},(h,d)=>a+d),c=OM({indices:l},e,n.profileSize,i);c&&(l.forEach(h=>r.add(h)),zM(c,t).forEach(h=>o.push({start:{x:h.x,y:h.y,z:c.lowerZ},end:{x:h.x,y:h.y,z:c.upperZ}}))),a+=s}),{coveredIndices:r,segments:o}}function is(e,t){if(e.closed)return!0;const n=o=>{const a=o%(Math.PI*2);return a<0?a+Math.PI*2:a},i=e.clockwise?n(e.endAngle-e.startAngle):n(e.startAngle-e.endAngle);return(e.clockwise?n(t-e.startAngle):n(e.startAngle-t))<=i+1e-6}function GM(e,t){let n=0,i=0;if(t?.isOrthographicCamera){const c=new $;if(t.getWorldDirection(c),n=c.dot(vn(e.uAxis))/e.radiusX,i=c.dot(vn(e.vAxis))/e.radiusY,Math.hypot(n,i)<=ni)return[];const h=Math.atan2(i,n);return[h+Math.PI/2,h-Math.PI/2].filter(d=>is(e,d))}const r=new $;t.getWorldPosition(r);const o=r.sub(vn(e.center));n=o.dot(vn(e.uAxis))/e.radiusX,i=o.dot(vn(e.vAxis))/e.radiusY;const a=Math.hypot(n,i);if(a<=1+ni)return[];const s=Math.atan2(i,n),l=Math.acos(1/a);return[s+l,s-l].filter(c=>is(e,c))}function VM(e,t){const n=vn(t.offset),i=n.length();if(i<=ni)return null;const r=n.multiplyScalar(1/i),o=vn(e).sub(vn(t.center)),a=o.dot(r);if(a<-1e-4||a>i+1e-4)return null;o.addScaledVector(r,-a);const s=o.dot(vn(t.uAxis))/t.radiusX,l=o.dot(vn(t.vAxis))/t.radiusY,c=Math.atan2(l,s);return Math.abs(Math.hypot(s,l)-1)>.002||!is(t,c)?null:{angle:c,parameter:a/i}}function gu(e,t){return Math.abs(Math.atan2(Math.sin(e-t),Math.cos(e-t)))}function kM(e,t,n,i){const o=[...new Set(i.flatMap((s,l)=>s===t.id?[l]:[]))].flatMap(s=>{const l=(e.faces?.[s]??[]).map(d=>VM(e.vertices?.[d],t));if(!l.length||l.some(d=>!d))return[];const c=Math.atan2(l.reduce((d,u)=>d+Math.sin(u.angle),0),l.reduce((d,u)=>d+Math.cos(u.angle),0)),h=Math.max(...l.map(d=>gu(d.angle,c)));return gu(n,c)>h+.001?[]:[{start:Math.max(0,Math.min(...l.map(d=>d.parameter))),end:Math.min(1,Math.max(...l.map(d=>d.parameter)))}]}).sort((s,l)=>s.start-l.start),a=[];return o.forEach(s=>{const l=a[a.length-1];if(l&&s.start<=l.end+1e-4){l.end=Math.max(l.end,s.end);return}a.push({...s})}),a.filter(s=>s.end-s.start>1e-6)}function HM(e,t,n,i){const r=new Set;return n.flatMap(o=>GM(o,t).flatMap(a=>{const s=Rr(o,a);return kM(e,o,a,i).flatMap(l=>{const c={x:s.x+o.offset.x*l.start,y:s.y+o.offset.y*l.start,z:s.z+o.offset.z*l.start},h={x:s.x+o.offset.x*l.end,y:s.y+o.offset.y*l.end,z:s.z+o.offset.z*l.end},d=[c,h].map(u=>`${u.x.toFixed(5)}:${u.y.toFixed(5)}:${u.z.toFixed(5)}`).join("|");return r.has(d)?[]:(r.add(d),[{start:c,end:h}])})}))}function WM(e,t){if(gf(e)){const i=xs(e),r=i.sideSurfaces,o=HM(e,t,r,i.faceSurfaceIds);if(r.length)return o;const a=e.metadata?.curvedFeatureGeneratrices??[],s=e.faces.map(u=>_f(u,e.vertices));if(a.length)return a.flatMap(u=>{const m=s[u?.beforeFaceIndex],S=s[u?.afterFaceIndex];if(!m||!S||Nr(m,t)===Nr(S,t))return[];const x=ns(e.vertices,[u.startIndex,u.endIndex]);return x?[x]:[]});const l=e.metadata?.faceVertexNormals??[],c=new Set(l.flatMap((u,m)=>{if(!Array.isArray(u)||u.length<2)return[];const S=vn(u[0]);return u.slice(1).some(x=>S.distanceTo(vn(x))>ni)?[m]:[]})),{vertices:h,edgeFaces:d}=xf(e);return[...d.values()].flatMap(({edge:u,faces:m})=>{if(m.length!==2||!m.every(p=>c.has(p)))return[];const[S,x]=m.map(p=>s[p]);if(!S||!x||Nr(S,t)===Nr(x,t))return[];const f=ns(h,u);return f?[f]:[]})}const n=BM(e,t);return[...n.segments,...vf(e,t,!0,n.coveredIndices)]}function XM(e,t,n={}){if(!e||e.userData?.type!=="webcad-push-solid-group")return null;const i=e.children.find(g=>g.userData?.type==="webcad-push-solid"),r=e.children.find(g=>g.userData?.type==="webcad-push-solid-edges"),o=e.children.find(g=>g.userData?.type==="webcad-push-solid-tangent-edges"),a=i?.userData?.analyticSolid??i?.userData?.solid;if(!a)return null;const s=IM(t),l=Math.max(1,Math.round(Number(n.visibilitySamples)||CM)),c=e.getObjectByName(Ia)??null;if(e.userData.silhouetteCameraKey===s&&Number(e.userData.silhouetteVisibilitySamples)>=l||n.deferCameraRefresh===!0&&e.userData.silhouetteCameraKey&&c)return c;r&&(r.visible=!0);const h=e.getObjectByName(mu);h&&(e.remove(h),at(h));const d=Fc({camera:t,mesh:i,occluders:n.occluders,segments:r?.userData?.sourceSegments,sourceEdgeIndices:r?.userData?.sourceEdgeIndices,curveGroupIds:r?.userData?.curveGroupIds,visibilitySamples:l}),u=d.visible,m=Kt(u.map(g=>g.segment),{color:n.color??Qe.edgeColor,depthTest:!1,depthWrite:!1,linewidth:n.linewidth??Qe.edgeLineWidth,renderOrder:n.renderOrder??Qe.edgeRenderOrder+2});m.name=mu,m.userData={type:"webcad-push-visible-edge-overlay",measurementSegments:u.map(g=>g.measurementSegment),segmentCount:m.userData.segmentCount,sourceEdgeIndices:u.map(g=>g.sourceEdgeIndices),curveGroupIds:u.map(g=>g.curveGroupId),sourceSegments:u.map(g=>g.segment)},e.add(m);const S=e.getObjectByName(Ia);S&&(e.remove(S),at(S));const x=Kt(UM(a,t),{color:n.color??Qe.edgeColor,depthBias:Qe.edgeDepthBias,depthFunc:rr,depthTest:!0,depthWrite:!1,linewidth:n.linewidth??Qe.edgeLineWidth,polygonOffset:!0,polygonOffsetFactor:Qe.edgePolygonOffsetFactor,polygonOffsetUnits:Qe.edgePolygonOffsetUnits,renderOrder:n.renderOrder??Qe.edgeRenderOrder+1});x.name=Ia,x.userData={type:"webcad-push-silhouette",segmentCount:x.userData.segmentCount},e.add(x);const f=e.getObjectByName(pu);f&&(e.remove(f),at(f));const p=WM(a,t),M=Kt(p,{color:n.color??Qe.edgeColor,depthBias:Qe.edgeDepthBias,depthFunc:rr,depthTest:!0,depthWrite:!1,linewidth:n.linewidth??Qe.edgeLineWidth,polygonOffset:!0,polygonOffsetFactor:Qe.edgePolygonOffsetFactor,polygonOffsetUnits:Qe.edgePolygonOffsetUnits,renderOrder:n.renderOrder??Qe.edgeRenderOrder+1});M.name=pu,M.visible=e.userData.showCurveGeneratrices!==!1,M.userData={type:"webcad-push-generatrix-silhouette",segmentCount:M.userData.segmentCount,sourceSegments:p},e.add(M);const A=e.getObjectByName(hu);A&&(e.remove(A),at(A));const v=[...o?.userData?.sourceSegments||[],...p],y=Fc({camera:t,mesh:i,occluders:n.occluders,segments:v,visibilitySamples:l}).hidden,E=[...d.hidden.map(g=>g.segment),...y.map(g=>g.segment)],T=Kt(E,{color:n.hiddenColor??Qe.hiddenEdgeColor,dashSize:4.8,dashed:!0,depthTest:!1,depthWrite:!1,gapSize:3,linewidth:n.hiddenLinewidth??Qe.hiddenEdgeLineWidth,opacity:n.hiddenOpacity??Qe.hiddenEdgeOpacity,renderOrder:(n.renderOrder??Qe.edgeRenderOrder)-1,transparent:!0});return T.name=hu,T.visible=e.userData.showHiddenEdges===!0,T.userData={type:"webcad-push-solid-hidden-edges",segmentCount:T.userData.segmentCount,sourceSegments:E},e.add(T),e.userData.silhouetteCameraKey=s,e.userData.silhouetteVisibilitySamples=l,x}function YM(e,t,n={}){const i=[];e?.traverse?.(a=>{a.userData?.type==="webcad-push-solid-group"&&i.push(a)});const r=i.flatMap(a=>a.children?.filter(s=>s.userData?.type==="webcad-push-solid")??[]),o=[];return i.forEach(a=>{const s=XM(a,t,{...n,occluders:r});s&&o.push(s)}),o}function ui(e,t=0){const n=Number(e);return Number.isFinite(n)?n:t}function $M(e,t,{extrusionMargin:n=24,minimumNear:i=1e-4}={}){const r=e?.min??{},o=e?.max??{},a=ui(r.x),s=ui(r.y),l=ui(r.z),c=ui(o.x,a),h=ui(o.y,s),d=ui(o.z,l),u={x:(a+c)*.5,y:(s+h)*.5,z:(l+d)*.5},m=Math.max(Math.hypot(c-a,h-s,d-l)*.5,.001),S=Math.hypot(ui(t?.x)-u.x,ui(t?.y)-u.y,ui(t?.z)-u.z),x=S-m,f=x>0?Math.max(i,x*.5):Math.max(i,m/1e3);return{far:Math.max(f*2,S+m*Math.max(2,n)),near:f}}const Sf=1e-12,Da=1/Math.sqrt(3);function ro(e={}){const t=Number(e.x)||0,n=Number(e.y)||0,i=Number(e.z)||0,r=Math.hypot(t,n,i);return r<=Sf?{x:Da,y:-Da,z:Da}:{x:t/r,y:n/r,z:i/r}}function Ei(e,t,n,i){return Object.freeze({id:e,label:t,type:n,direction:Object.freeze(ro(i))})}const qM=[Ei("planta","Planta","face",{x:0,y:0,z:1}),Ei("inferior","Vista inferior","face",{x:0,y:0,z:-1}),Ei("alzado","Alzado","face",{x:0,y:-1,z:0}),Ei("posterior","Vista posterior","face",{x:0,y:1,z:0}),Ei("perfil-derecho","Perfil derecho","face",{x:1,y:0,z:0}),Ei("perfil-izquierdo","Perfil izquierdo","face",{x:-1,y:0,z:0})],KM=new Map([["1,-1,1",["iso-se","Isométrica sureste"]],["1,1,1",["iso-ne","Isométrica noreste"]],["-1,1,1",["iso-no","Isométrica noroeste"]],["-1,-1,1",["iso-so","Isométrica suroeste"]],["1,-1,-1",["iso-se-inferior","Isométrica sureste inferior"]],["1,1,-1",["iso-ne-inferior","Isométrica noreste inferior"]],["-1,1,-1",["iso-no-inferior","Isométrica noroeste inferior"]],["-1,-1,-1",["iso-so-inferior","Isométrica suroeste inferior"]]]),jM=[...KM.entries()].map(([e,[t,n]])=>{const[i,r,o]=e.split(",").map(Number);return Ei(t,n,"corner",{x:i,y:r,z:o})}),Ef=[];for(let e=0;e<3;e+=1)for(const t of[-1,1])for(const n of[-1,1]){const i=[t,n],r={x:0,y:0,z:0},o=["x","y","z"].filter((s,l)=>l!==e);r[o[0]]=i[0],r[o[1]]=i[1];const a=`arista-${r.x}-${r.y}-${r.z}`;Ef.push(Ei(a,"Vista diagonal","edge",r))}const Jr="iso-se",ZM=3,yf=Object.freeze([...qM,...Ef,...jM]),_u=new Map(yf.map(e=>[e.id,e]));function Xn(e=Jr){if(typeof e=="string")return _u.get(e)??_u.get(Jr);const t=ro(e?.direction??e);return{id:e?.id??null,label:e?.label??"Vista personalizada",type:e?.type??"custom",direction:t}}function xu({direction:e,distance:t,position:n,target:i}={}){const r={x:Number(i?.x)||0,y:Number(i?.y)||0,z:Number(i?.z)||0},o={x:Number(n?.x)||0,y:Number(n?.y)||0,z:Number(n?.z)||0},a=Math.hypot(o.x-r.x,o.y-r.y,o.z-r.z),s=Math.max(Sf,Number.isFinite(Number(t))?Number(t):a||1),l=ro(e);return{x:r.x+l.x*s,y:r.y+l.y*s,z:r.z+l.z*s}}function Mf(e,t){return ro({x:(Number(e?.x)||0)-(Number(t?.x)||0),y:(Number(e?.y)||0)-(Number(t?.y)||0),z:(Number(e?.z)||0)-(Number(t?.z)||0)})}function JM(e){const t=Xn(e);return Math.abs(t.direction.z)>1-1e-10?{x:0,y:1,z:0}:{x:0,y:0,z:1}}function rs(e,t=.998){const n=ro(e);let i=null,r=-1/0;return yf.forEach(o=>{const a=n.x*o.direction.x+n.y*o.direction.y+n.z*o.direction.z;a<=r||(i=o,r=a)}),r>=t?i:null}const Is="perspective",Bi="orthographic";function tr(e){return e===Bi?Bi:Is}function vu(e,t){return e?.type==="face"?Bi:tr(t)}function QM({aspect:e=1,far:t=1e6,fov:n=36,near:i=.01}={}){const r=new Ji(n,e,i,t);return r.left=-1,r.right=1,r.top=1,r.bottom=-1,r.userData.webcadProjection=Is,r.isOrthographicCamera=!1,r.updateProjectionMatrix=function(){if(this.userData.webcadProjection===Bi){os.prototype.updateProjectionMatrix.call(this);return}Ji.prototype.updateProjectionMatrix.call(this)},r.updateProjectionMatrix(),r}function Su(e){return tr(e?.userData?.webcadProjection)}function La(e,t){const n=tr(t);return e.userData.webcadProjection=n,e.isPerspectiveCamera=n===Is,e.isOrthographicCamera=n===Bi,e.updateProjectionMatrix(),n}function eb(e,{height:t=1,viewHeight:n=2,width:i=1}={}){const r=Math.max(1,Number(i)||1)/Math.max(1,Number(t)||1);e.aspect=r;const o=Math.max(1e-4,Number(n)*.5||1);e.left=-o*r,e.right=o*r,e.top=o,e.bottom=-o,e.updateProjectionMatrix()}function Na(e){return`#${Number(e).toString(16).padStart(6,"0")}`}const tb=Object.freeze({x:Na(Ze.axisX),y:Na(Ze.axisY),z:Na(Ze.axisZ)}),nb=[{id:"perfil-derecho",label:"PERFIL",normal:{x:1,y:0,z:0},vertices:[[1,-1,-1],[1,1,-1],[1,1,1],[1,-1,1]]},{id:"perfil-izquierdo",label:"PERFIL IZQ.",normal:{x:-1,y:0,z:0},vertices:[[-1,1,-1],[-1,-1,-1],[-1,-1,1],[-1,1,1]]},{id:"posterior",label:"POST.",normal:{x:0,y:1,z:0},vertices:[[1,1,-1],[-1,1,-1],[-1,1,1],[1,1,1]]},{id:"alzado",label:"ALZADO",normal:{x:0,y:-1,z:0},vertices:[[-1,-1,-1],[1,-1,-1],[1,-1,1],[-1,-1,1]]},{id:"planta",label:"PLANTA",normal:{x:0,y:0,z:1},vertices:[[-1,-1,1],[1,-1,1],[1,1,1],[-1,1,1]]},{id:"inferior",label:"INFERIOR",normal:{x:0,y:0,z:-1},vertices:[[-1,1,-1],[1,1,-1],[1,-1,-1],[-1,-1,-1]]}],Zi=[];for(const e of[-1,1])for(const t of[-1,1])for(const n of[-1,1])Zi.push({x:e,y:t,z:n});const bf=[];for(let e=0;e<Zi.length;e+=1)for(let t=e+1;t<Zi.length;t+=1){const n=Zi[e],i=Zi[t],r=["x","y","z"].filter(s=>n[s]!==i[s]);if(r.length!==1)continue;const o=r[0],a={x:n.x===i.x?n.x:0,y:n.y===i.y?n.y:0,z:n.z===i.z?n.z:0};bf.push({a:n,axis:o,b:i,direction:a})}function Tr(e,t){const n=-Number(t?.x||0),i=-Number(t?.y||0),r=-Number(t?.z||0),o=Number(t?.w??1),a=o*e.x+i*e.z-r*e.y,s=o*e.y+r*e.x-n*e.z,l=o*e.z+n*e.y-i*e.x,c=-n*e.x-i*e.y-r*e.z;return{x:a*o+c*-n+s*-r-l*-i,y:s*o+c*-i+l*-n-a*-r,z:l*o+c*-r+a*-i-s*-n}}function ib(e,t){let n=!1;for(let i=0,r=t.length-1;i<t.length;r=i,i+=1){const o=t[i],a=t[r];o.y>e.y!=a.y>e.y&&e.x<(a.x-o.x)*(e.y-o.y)/(a.y-o.y)+o.x&&(n=!n)}return n}function rb(e,t,n){const i=n.x-t.x,r=n.y-t.y,o=i*i+r*r;if(o<=1e-12)return Math.hypot(e.x-t.x,e.y-t.y);const a=Math.max(0,Math.min(1,((e.x-t.x)*i+(e.y-t.y)*r)/o));return Math.hypot(e.x-(t.x+i*a),e.y-(t.y+r*a))}function To(e,t){return Math.abs(e.x-t.x)<1e-9&&Math.abs(e.y-t.y)<1e-9&&Math.abs(e.z-t.z)<1e-9}function ob(e){return e.reduce((t,n)=>({x:t.x+n.x/e.length,y:t.y+n.y/e.length}),{x:0,y:0})}function ab(e){return Math.abs(e.reduce((t,n,i)=>{const r=e[(i+1)%e.length];return t+n.x*r.y-r.x*n.y},0)*.5)}function sb({camera:e,canvas:t,container:n,homeButton:i,label:r,onSelect:o,target:a}={}){if(!e||!t||!n)return null;const s=t.getContext("2d");if(!s)return null;let l=null,c=null,h=!1;function d(E){if(!E)return null;if(E.id)return Xn(E.id);const T=E.direction;return rs(T,.999999)??Xn({direction:T,label:E.type==="edge"?"Vista diagonal":"Vista isométrica",type:E.type})}function u(){const E=t.getBoundingClientRect(),T=Math.max(1,Math.round(E.width||116)),g=Math.max(1,Math.round(E.height||116)),P=Math.min(globalThis.devicePixelRatio||1,2),C=Math.round(T*P),I=Math.round(g*P);return(t.width!==C||t.height!==I)&&(t.width=C,t.height=I),s.setTransform(P,0,0,P,0,0),{height:g,width:T}}function m(E,T,g){const P=Tr(E,e.quaternion);return{x:T.x+P.x*g,y:T.y-P.y*g,z:P.z}}function S(E,T){const g={x:E/2,y:T/2},P=Math.min(E,T)*.27,C=nb.map(V=>{const k=Tr(V.normal,e.quaternion),B=V.vertices.map(([Y,D,j])=>m({x:Y,y:D,z:j},g,P));return{...V,depth:B.reduce((Y,D)=>Y+D.z,0)/B.length,direction:V.normal,normal:k,points:B,type:"face"}}).filter(V=>V.normal.z>.001).sort((V,k)=>V.depth-k.depth),I=Zi.map(V=>({depth:Tr(V,e.quaternion).z,direction:V,point:m(V,g,P),type:"corner",visible:C.some(k=>k.vertices.some(([B,Y,D])=>B===V.x&&Y===V.y&&D===V.z))})).filter(V=>V.visible),U=bf.map(V=>({...V,depth:(Tr(V.a,e.quaternion).z+Tr(V.b,e.quaternion).z)/2,end:m(V.b,g,P),start:m(V.a,g,P),type:"edge",visible:C.some(k=>k.vertices.some(([B,Y,D])=>B===V.a.x&&Y===V.a.y&&D===V.a.z)&&k.vertices.some(([B,Y,D])=>B===V.b.x&&Y===V.b.y&&D===V.b.z))})).filter(V=>V.visible);return{corners:I,edges:U,faces:C,height:T,width:E}}function x(){return rs(Mf(e.position,a()),.998)}function f(){if(h||n.hidden)return;const{width:E,height:T}=u();l=S(E,T),s.clearRect(0,0,E,T);const g=x();l.faces.forEach(C=>{const I=c?.type==="face"&&c.id===C.id,U=g?.type==="face"&&g.id===C.id;if(s.beginPath(),C.points.forEach((k,B)=>{B===0?s.moveTo(k.x,k.y):s.lineTo(k.x,k.y)}),s.closePath(),s.fillStyle=I?"#ffd7b8":U?"#f3a56f":`rgba(238, 245, 244, ${.72+C.normal.z*.18})`,s.strokeStyle=I||U?"#ad4b1f":"#6e8791",s.lineWidth=I||U?2.3:1.25,s.fill(),s.stroke(),ab(C.points)<260)return;const V=ob(C.points);s.fillStyle="#243d47",s.font='700 9px "Arial Narrow", Arial, sans-serif',s.textAlign="center",s.textBaseline="middle",s.fillText(C.label,V.x,V.y)}),[...l.edges].sort((C,I)=>C.depth-I.depth).forEach(C=>{s.beginPath(),s.moveTo(C.start.x,C.start.y),s.lineTo(C.end.x,C.end.y),s.strokeStyle=tb[C.axis],s.globalAlpha=.82,s.lineCap="round",s.lineWidth=1.8,s.stroke(),s.globalAlpha=1}),l.edges.forEach(C=>{const I=Xn({direction:C.direction}).direction,U=c?.type==="edge"&&To(Xn({direction:c.direction}).direction,I),V=g?.type==="edge"&&To(g.direction,I);!U&&!V||(s.beginPath(),s.moveTo(C.start.x,C.start.y),s.lineTo(C.end.x,C.end.y),s.strokeStyle=U?"#d05a1f":"#b84a19",s.lineCap="round",s.lineWidth=U?7:5,s.stroke())}),l.corners.forEach(C=>{const I=Xn({direction:C.direction}).direction,U=c?.type==="corner"&&To(Xn({direction:c.direction}).direction,I),V=g?.type==="corner"&&To(g.direction,I);!U&&!V||(s.beginPath(),s.arc(C.point.x,C.point.y,U?7:5.5,0,Math.PI*2),s.fillStyle=U?"#d05a1f":"#b84a19",s.fill(),s.strokeStyle="#fff8f0",s.lineWidth=1.5,s.stroke())});const P=g?.label??"Vista libre";r&&(r.textContent=P),i?.setAttribute("aria-pressed",String(g?.id===Jr))}function p(E){if(!l)return null;const T=t.getBoundingClientRect(),g={x:E.clientX-T.left,y:E.clientY-T.top},P=[...l.corners].sort((I,U)=>U.depth-I.depth).find(I=>Math.hypot(g.x-I.point.x,g.y-I.point.y)<=9);if(P)return P;const C=[...l.edges].sort((I,U)=>U.depth-I.depth).find(I=>rb(g,I.start,I.end)<=6);return C||([...l.faces].sort((I,U)=>U.depth-I.depth).find(I=>ib(g,I.points))??null)}function M(E){c=p(E),t.classList.toggle("is-interactive",!!c);const T=d(c);t.setAttribute("aria-label",T?`Cubo de vistas. Activar ${T.label}`:"Cubo navegador de vistas 3D"),f()}function A(){c=null,t.classList.remove("is-interactive"),t.setAttribute("aria-label","Cubo navegador de vistas 3D"),f()}function v(E){const T=p(E),g=d(T);g&&(E.preventDefault(),E.stopPropagation(),o?.(g))}function y(E){E.preventDefault(),E.stopPropagation(),o?.(Xn(Jr))}return t.addEventListener("pointermove",M),t.addEventListener("pointerleave",A),t.addEventListener("click",v),i?.addEventListener("click",y),{dispose(){h||(h=!0,t.removeEventListener("pointermove",M),t.removeEventListener("pointerleave",A),t.removeEventListener("click",v),i?.removeEventListener("click",y))},draw:f}}const Ua=70,lb=280,cb=new Set(["origin","endpoint","midpoint","center","quadrant","faceCenter"]),ub=new Set(["webcad-push-solid-edges","webcad-push-solid-tangent-edges","webcad-push-visible-edge-overlay","webcad-push-silhouette","webcad-push-generatrix-silhouette","webcad-push-solid-hidden-edges"]);function Pr(){return globalThis.performance?.now?.()??Date.now()}function db(e,t,n="XY",i=null){const r=e?.localFace??e,o=e?.line3dGroupId??r?.line3dGroupId??null,a=io(r);if(a==="profileFeature"){const s=t?.height??null,l=e.supportContactOnly===!0||s>=0,c=i?.metadata?.exactGeometry?.operations?.at(-1)??i?.metadata?.profileFeatures?.at(-1)??null,h=c?.type===(l?"union":"subtract")&&Math.abs(Number(c.requestedDistance??c.distance)-Number(s))<=1e-9?c:null,d=h?.analyticRegionId??e.analyticRegionId??null;return{type:l?"pushUnionProfile":"pushSubtractProfile",distance:s,tangentContact:e.supportContactOnly===!0,sourceSolidDocumentId:r.sourceSolidDocumentId??null,sourceSolidFaceIndices:r.sourceSolidFaceIndices??null,sketchPlane:r.sketchPlane??n,sketchId:r.sketchId??null,...o?{line3dGroupId:o}:{},workplane:r.workplane??null,exactProfile:h?.exactProfile??r.exactProfile??null,analyticRegionId:d,sourceKey:qa(d)??t?.sourceKey??Ai(r)}}if(a==="moveFace"){const s=i?.metadata?.profileFeatures?.at?.(-1),l=s?.sourceRegion??s?.inputFace?.region??null;return{type:"pushMoveFace",distance:t?.height??null,sourceSolidDocumentId:r.sourceSolidDocumentId??null,sourceRegion:l,sourceProvenance:s?.sourceProvenance??s?.inputFace?.provenance??null,sketchPlane:r.sketchPlane??n,sketchId:r.sketchId??null,...o?{line3dGroupId:o}:{},workplane:r.workplane??null,sourceKey:qa(l?.id)??t?.sourceKey??Ai(r)}}return{type:"pushFromProfile",distance:t?.height??null,sourceEntityId:r?.sourceEntity?.id??r?.sourceEntity?.handle??null,sourceEntityType:r?.sourceEntity?.type??null,sketchPlane:r?.sketchPlane??n,sketchId:r?.sketchId??null,...o?{line3dGroupId:o}:{},workplane:r?.workplane??null,sourceKey:t?.sourceKey??Ai(r)}}async function pb(e,{cursorInput:t=null,doc:n=null,entities:i=[],getUnitsLabel:r=()=>"mm",getNavigationDevice:o=()=>"trackpad",gridVisible:a=!0,axesVisible:s=!0,navigationDevice:l=o(),sketchPlane:c=n?.model3d?.sketchPlane??"XY",onEdgeInfo:h=null,onStatus:d=null,projection:u="perspective",viewCube:m=null}={}){if(!e)throw new TypeError("La vista Three.js necesita un canvas propio");await Pl(),Nc(n?.model3d);const S=new Lh;S.background=new Mt(Ze.background);const x=QM({aspect:1,far:1e6,fov:36,near:.01});x.up.set(0,0,1);const f=new Uv({canvas:e,antialias:!0});f.setPixelRatio(Math.min(globalThis.devicePixelRatio||1,2)),f.outputColorSpace=Eu;const p=new Ov(x,f.domElement);p.enableDamping=!1,p.screenSpacePanning=!0;let M=null,A=null,v=null,y=null,E=null,T=null,g=null,P=null,C=null,I=null,U=null,V=null,k=null,B=null,Y=null,D=null,j=null;const ae=new Set,q=new Set;let ne=!1,ue=null,we=null,Le=null,ze=!1,J=!1,ce=1,O=1,xe=2,ee=tr(u),W=a!==!1,me=s!==!1,de=ca(c),G=!1,oe=-1/0,ge=!1,Ce=null,Xe=!1,Je=null,Ve=null;const tt=new Map,dt=new Set,z=new Mn().makeEmpty(),Pt=new Map,te=new Map,w=new Set,_=new Set;function F(){if(Ce=null,J||dt.size)return;const R=Ua-(Pr()-oe);if(R>1){Ce=globalThis.setTimeout(F,R);return}le(!1),ge=!0,ut()}function X(){Ce===null&&(Ce=globalThis.setTimeout(F,Ua))}function re(){oe=Pr(),le(!0),X()}function _e(){return Je?(p.enabled=Je.controlsWereEnabled,Je=null,!0):!1}function Me(R){_e(),Pn(ee,{redraw:!1}),x.up.set(0,0,1),dt.add(R.pointerId)}function ie(R){J||(dt.delete(R.pointerId),!dt.size&&(le(!1),ge=!0,ut()))}function le(R){if(Xe=R===!0,Xe){S.traverse(L=>{ub.has(L.userData?.type)&&(tt.has(L)||tt.set(L,L.visible),L.visible=!1)});return}tt.forEach((L,se)=>{se.visible=L}),tt.clear()}p.addEventListener("change",re);const ve=new qt;ve.name="webcad-3d-sketchup-lights",ve.add(new Nh(16777215,.58),new Uh(16777215,1.35)),ve.children[1].position.set(180,-220,360),S.add(ve);const Fe=Yy({camera:x,canvas:f.domElement,controls:p,getNavigationDevice:o,render:ut,viewport:()=>({width:ce,height:O})});Fe.setNavigationDevice(l);const be=new fr,Ee=new et;function Be(R=ho(de)){const L=Fr(R);return new yn().makeBasis(new $(L.xAxis.x,L.xAxis.y,L.xAxis.z),new $(L.yAxis.x,L.yAxis.y,L.yAxis.z),new $(L.normal.x,L.normal.y,L.normal.z)).setPosition(L.origin.x,L.origin.y,L.origin.z)}function $e(R,L){return R?.applyMatrix4?.(Be(L)),R}function je(R,L){if(!cb.has(L?.type))return!1;const se=R?.points?.[0],he=L?.point,Ge=R?.normal??{x:0,y:0,z:1};if(!se||!he)return!1;const qe=Number(se.x),Se=Number(se.y),Ke=Number(se.z??0),gt=Number(he.x),Dt=Number(he.y),St=Number(he.z??0),Ot=Number(Ge.x??0),rt=Number(Ge.y??0),Gt=Number(Ge.z??0),Lt=(gt-qe)*Ot+(Dt-Se)*rt+(St-Ke)*Gt;return Number.isFinite(Lt)&&Math.abs(Lt)>1e-9}const N=lE({camera:x,canvas:f.domElement,controls:p,cursorInput:t,getUnitsLabel:r,getSelectedFace:()=>y,prepareObjectSnaps:R=>CE({camera:x,canvas:f.domElement,solidObjects:N.getSolidObjects?.()??[],maxDistancePixels:20,includeHidden:!1,visibleOnly:!0,acceptCandidate:L=>je(R,L)}),onObjectSnap:ai,onConsumeFace:(R,L,se)=>{const he=R?.userData?.face,Ge=se?.sourceKey||Ai(R?.userData?.face),qe=L?.userData?.solid??null,Se=he?.sourceSolidDocumentId??null;let Ke=null,gt=!1;if(n&&qe){const St=db(he,se,de,qe);if(St?.type==="pushFromProfile"||St?.type==="pushUnionProfile"){const rt=d0({doc:n,operation:St,placement:he?.placement,solid:qe,sourceSolidDocumentId:Se});Ke=rt?.record??null,gt=rt?.merged===!0}else Ke=Se?n.replace3dSolid?.(Se,qe,{operation:St}):n.add3dSolid?.(qe,{operation:St});Ke&&(N.tagDocumentSolidGroup?.(L,Ke),gr(Ke.id),he?.line3dGroupId?(n.set3dLineGroupVisibility?.(he.line3dGroupId,!1,{recordHistory:!1}),A?.children?.forEach(rt=>{rt.userData?.lineGroupId===he.line3dGroupId&&(rt.visible=!1)}),v?.traverse?.(rt=>{(rt.userData?.line3dGroupId===he.line3dGroupId||rt.userData?.face?.line3dGroupId===he.line3dGroupId)&&(rt.visible=!1)}),(n?.model3d?.lines??[]).filter(rt=>rt.groupId===he.line3dGroupId).forEach(rt=>ae.delete(rt.id))):he?.sketchId&&(n.set3dSketchVisibility?.(he.sketchId,!1,{recordHistory:!1}),M?.traverse?.(rt=>{rt.userData?.sketchId===he.sketchId&&(rt.visible=!1)}),v?.traverse?.(rt=>{rt.userData?.sketchId===he.sketchId&&(rt.visible=!1)})))}Ge&&(Ke||Pt.set(Ge,{height:se.height,sourceKey:Ge}),_.add(Ge));const Dt=R?.userData?.face?.sourceEntity;Dt&&(Ke||te.set(Dt,{height:se.height,sourceKey:Ge}),w.add(Dt)),lt(),R===y&&(R?.userData?.transientSelection&&(S.remove(R),at(R)),y=null),gt&&Ls(),ut()},onStatus:d,render:ut,scene:S,viewport:()=>({width:ce,height:O})});function Pe(){return Array.isArray(n?.model3d?.solids)?n.model3d.solids.filter(R=>R?.visible!==!1&&R?.solid):[]}function fe(R){return R?.metadata?.sourceKey??R?.solid?.metadata?.sourceKey??R?.operation?.sourceKey??null}function Ae(){if(y){if(y.userData?.transientSelection){S.remove(y),at(y);return}y.material&&(y.material.color.set(y.userData.defaultColor??16118507),y.material.opacity=y.userData.defaultOpacity??1,y.material.transparent=y.userData.defaultTransparent===!0)}}function De(R){!R?.material||R===y||(R.material.color.set(R.userData.defaultColor??16118507),R.material.opacity=R.userData.defaultOpacity??1,R.material.transparent=R.userData.defaultTransparent===!0)}function pe(){De(E),E=null,T&&(S.remove(T),at(T),T=null)}function He(){C&&(S.remove(C),at(C),C=null,I=null)}function Oe(){const R=g??P,L=R===P&&!g,se=R?`${R.key}:${L?"selected":"hovered"}`:null;if(se===I){h?.(R);return}if(He(),h?.(R),!R?.start||!R?.end)return;const he=Array.isArray(R.segments)&&R.segments.length?R.segments:[R];C=Kt(he,{color:L?16756782:52198,depthTest:!1,depthWrite:!1,linewidth:L?5:4,renderOrder:64}),C.name="webcad-selected-solid-edge",C.userData={...C.userData,documentSolidId:R.documentSolidId,edge:R,type:L?"webcad-solid-edge-selection":"webcad-solid-edge-hover"},I=se,S.add(C)}function Ct(R=null){g?.key!==R?.key&&(g=R,Oe())}function ft(){g&&(g=null,Oe())}function on(R=null){g=null,P=R,Oe()}function bn(R){R===E&&!T||(pe(),!(!R||R===y||!R.material)&&(E=R,R.material.color.set(16768901),R.material.opacity=.72,R.material.transparent=!0))}function oo(R){if(!R){pe();return}if(T?.userData?.faceId===R.id||(pe(),y?.userData?.faceId===R.id))return;const L=Pa(R);L&&(L.name=`webcad-hovered-${R.id}`,L.renderOrder=ey,L.material.color.set(16768901),L.material.opacity=.38,L.userData.type="webcad-solid-face-hover",T=L,S.add(L))}function ai(R){if(!R?.point){U&&(U.visible=!1);return}if(!U){const se=new ii;se.setAttribute("position",new kr([0,0,0],3));const he=new Bh({color:55807,depthTest:!1,depthWrite:!1,size:13,sizeAttenuation:!1});U=new Gh(se,he),U.name="webcad-3d-object-snap",U.renderOrder=60,S.add(U)}const L={origin:16777215,endpoint:55807,midpoint:4773979,center:16732120,quadrant:16747586,faceCenter:16764749};U.position.set(Number(R.point.x),Number(R.point.y),Number(R.point.z)),U.material.color.setHex(L[R.type]??L.endpoint),U.visible=!0}function mr(R,L){const se=R?.material;se?.emissive&&(R.userData.defaultEmissive===void 0&&(R.userData.defaultColor=se.color.getHex(),R.userData.defaultEmissive=se.emissive.getHex(),R.userData.defaultEmissiveIntensity=se.emissiveIntensity),se.color.setHex(L?16754719:R.userData.defaultColor),se.emissive.setHex(L?5908480:R.userData.defaultEmissive),se.emissiveIntensity=L?.5:R.userData.defaultEmissiveIntensity)}function gn(R=[]){q.clear(),R.forEach(L=>{L&&q.add(L)}),(N.getSolidObjects?.()??[]).forEach(L=>{const se=q.has(L.userData?.documentSolidId);L.traverse?.(he=>mr(he,se))})}function gr(R){gn(R?[R]:[])}function _r(){A?.children?.forEach(R=>{const L=ae.has(R.userData?.lineId);R.material?.color?.setHex(L?16765286:Ze.drawingColor),R.material&&(R.material.linewidth=L?Ze.drawingLineWidth+1:Ze.drawingLineWidth,R.material.needsUpdate=!0)})}function xr(){return ae.size?(ae.clear(),_r(),!0):!1}function si(R,{toggle:L=!1}={}){return R?(L&&ae.has(R)?ae.delete(R):ae.add(R),_r(),!0):!1}function vr(R){return R?(q.add(R),(N.getSolidObjects?.()??[]).forEach(L=>{const se=q.has(L.userData?.documentSolidId);L.traverse?.(he=>mr(he,se))}),!0):!1}function an(R){R!==y&&N.isActive()&&N.cancel(),pe(),on(null),Ae(),y=R||null,gn(),y?.material&&(y.material.color.set(y.userData.selectedColor??16765286),y.material.opacity=1,y.material.transparent=y.userData?.transientSelection===!0,d?.(y.userData?.type==="webcad-push-solid-face-selection"?"Cara de solido seleccionada":"Recinto seleccionado")),ut()}function Gi(R,L){!R?.userData||!L||(R.userData.pushStartPointer={x:L.clientX,y:L.clientY})}function An(R){const L=f.domElement.getBoundingClientRect();Ee.x=(R.clientX-L.left)/Math.max(1,L.width)*2-1,Ee.y=-((R.clientY-L.top)/Math.max(1,L.height)*2-1),be.setFromCamera(Ee,x)}function Sr(R=4){return gE(N.getSolidObjects?.()??[],x,Ee,{width:ce,height:O},{includeHidden:G,maxDistancePixels:R})}function Ln(R){return new $(Number(R?.x)||0,Number(R?.y)||0,Number(R?.z)||0)}function Vi(R,L,se=1e-7){return!L||!R?.point?!0:Ln(R.point).distanceTo(Ln(L))>se}function Nn(){const R=N.getSolidObjects?.()??[];return R.length?be.intersectObjects(R,!0).find(L=>L?.object?.userData?.type==="webcad-push-solid"):null}function ki(R){if(!R?.sourceSolidDocumentId)return R;const L=n?.model3d?.solids?.find(se=>se?.id===R.sourceSolidDocumentId);return ny(R,L?.placement)}function Qo(R){for(let L=R;L;L=L.parent)if(L.visible===!1)return!1;return!0}function Er(){return v?.children.length?be.intersectObjects(v.children,!0).filter(R=>R?.object?.userData?.type==="webcad-simple-face"&&Qo(R.object)).sort((R,L)=>{const se=(Number(R.object.userData?.face?.area)||1/0)-(Number(L.object.userData?.face?.area)||1/0);return Math.abs(se)>1e-9?se:R.distance-L.distance})[0]??null:null}function ea(){if(!A?.children?.length)return null;const R=be.intersectObjects(A.children,!0).find(L=>L?.object?.userData?.lineId);return R?{hit:R,lineId:R.object.userData.lineId,groupId:R.object.userData.lineGroupId}:null}function b(R,L,se){const he=se.x-L.x,Ge=se.y-L.y,qe=he*he+Ge*Ge;if(qe<=1e-12)return R.distanceTo(L);const Se=xi.clamp(((R.x-L.x)*he+(R.y-L.y)*Ge)/qe,0,1);return R.distanceTo(new et(L.x+he*Se,L.y+Ge*Se))}function H(R=7){const L=new et((Ee.x+1)*ce*.5,(1-Ee.y)*O*.5);let se=null;return(N.getSolidObjects?.()??[]).forEach(he=>{const Ge=he.children?.find(Se=>Se.userData?.type==="webcad-push-solid"),qe=Ge?.userData?.analyticSolid??Ge?.userData?.solid;Ge?.updateWorldMatrix?.(!0,!1),(qe?.metadata?.tangentEdges??[]).forEach(Se=>{const Ke=qe.vertices?.[Se.startIndex],gt=qe.vertices?.[Se.endIndex];if(!Ke||!gt)return;const Dt=Ln(Ke).applyMatrix4(Ge.matrixWorld),St=Ln(gt).applyMatrix4(Ge.matrixWorld),Ot=Dt.clone().project(x),rt=St.clone().project(x);if(Ot.z<-1&&rt.z<-1||Ot.z>1&&rt.z>1)return;const Gt=new et((Ot.x+1)*ce*.5,(1-Ot.y)*O*.5),Lt=new et((rt.x+1)*ce*.5,(1-rt.y)*O*.5),fn=b(L,Gt,Lt),wn=Dt.clone().add(St).multiplyScalar(.5),ci=x.position.distanceTo(wn);if(fn>R||se&&(fn>se.screenDistance+.25||Math.abs(fn-se.screenDistance)<=.25&&ci>=se.cameraDistance))return;const Vt=ki(sf(Ge,Se.planarGroupIndex));Vt&&(se={cameraDistance:ci,face:Vt,screenDistance:fn})})}),se?.face??null}function Q(R){if(N.isActive()||k?.isActive()||B?.isActive()||Y?.isActive()||D?.isActive()||j?.isActive()||ne||R.buttons){pe(),ft();return}An(R);const L=Sr();if(L){pe(),Ct(L),ut();return}ft();const se=Er();if(se){bn(se.object),ut();return}const he=H();if(he){oo(he),ut();return}const Ge=ki(tu(Nn()));if(Ge){oo(Ge),ut();return}pe(),ut()}function K(){pe(),ft(),ut()}function Z(R,L=Nn()){const se=ki(tu(L));if(!se)return!1;const he=Pa(se);return he?(Gi(he,R),S.add(he),an(he),!0):!1}function Ie(R){if(N.isActive())return;An(R);const L=ea();if(L){an(null),on(null),gn(),si(L.lineId,{toggle:R.shiftKey||R.ctrlKey||R.metaKey});const Se=ae.size;d?.(`${Se} línea${Se===1?"":"s"} 3D seleccionada${Se===1?"":"s"}`),ut();return}xr();const se=Nn();if(ne){const Se=Er();if(Se?.object?.userData?.type==="webcad-simple-face"){an(Se.object),d?.("Borrar recinto · confirme con Enter, Espacio o clic derecho");return}const Ke=se?.object?.userData?.documentSolidId??null;if(Ke){vr(Ke);const gt=q.size;d?.(`Borrar ${gt} solido${gt===1?"":"s"} · confirme con Enter, Espacio o clic derecho`),ut()}else d?.("Borrar · seleccione un recinto o una cara de un solido 3D");return}const he=Sr();if(he){pe(),an(null),on(he);const Se=Number(he.length),Ke=Number.isFinite(Se)?Se.toLocaleString("es-ES",{maximumFractionDigits:3}):"-";d?.(`Arista seleccionada · ${Ke} mm`),ut();return}on(null);const Ge=Er();if(Ge?.object?.userData?.type==="webcad-simple-face"){Gi(Ge.object,R),an(Ge.object);return}const qe=H();if(qe){const Se=Pa(qe);if(Se){Gi(Se,R),S.add(Se),an(Se);return}}Z(R,se)||(an(null),d?.(""))}function Ue(R){if(N.isActive()||ne)return;An(R);const L=Nn()?.object?.userData?.documentSolidId??null;L&&(R.preventDefault(),an(null),gr(L),d?.("Solido 3D seleccionado"),ut())}function ye(){return typeof n?.topLevelEntities=="function"?n.topLevelEntities():[]}function ke(R){if(N.isActive())return!1;const L=[...new Set(R)].filter(Ge=>n?.model3d?.solids?.some(qe=>qe?.id===Ge));if(!L.length)return d?.("Seleccione solidos 3D para borrar"),!1;ne=!1,an(null);const[se,...he]=L;return n.remove3dSolid?.(se),he.forEach(Ge=>n.remove3dSolid?.(Ge,{recordHistory:!1})),dn(ye(),{preserveView:!0}),d?.(`${L.length} solido${L.length===1?"":"s"} 3D eliminado${L.length===1?"":"s"}`),!0}function We(){return ke([...q])}function nt(){if(D?.isActive()||j?.isActive())return!1;const R=[...ae].filter(se=>n?.model3d?.lines?.some(he=>he?.id===se&&he.locked!==!0));if(!R.length)return!1;const L=n.remove3dLines?.(R)??0;return L?(ae.clear(),dn(ye(),{preserveView:!0}),d?.(`${L} línea${L===1?"":"s"} 3D borrada${L===1?"":"s"}`),!0):!1}function it(){const R=y?.userData?.type==="webcad-simple-face"?y.userData.face:null,L=Jv(n,R);return L?(an(null),dn(ye(),{preserveView:!0}),d?.(`Recinto 3D eliminado · ${L.count} elemento${L.count===1?"":"s"} de contorno`),!0):!1}function Ye(){return it()||nt()||We()}function ht(){if(N.isActive()||k?.isActive()||B?.isActive()||Y?.isActive()||D?.isActive()||j?.isActive())return!1;if(ae.size)return nt();if(y?.userData?.type==="webcad-simple-face")return ne=!0,d?.("Borrar recinto · confirme con Enter, Espacio o clic derecho"),!0;ne=!0,Ae(),y=null;const R=q.size;return d?.(R?`Borrar ${R} solido${R===1?"":"s"} · seleccione mas o confirme con Enter, Espacio o clic derecho`:"Borrar: seleccione solidos y confirme con Enter, Espacio o clic derecho"),!0}function It(){return ne?it()||We():!1}function bt(){return ne?(ne=!1,an(null),gn(),d?.(""),!0):!1}function mt(R){ne&&(R.preventDefault(),It())}function Bt(R){if(R.key.toLowerCase()==="k"){R.preventDefault(),sn();return}if(R.key==="Escape"){if(bt())return;if(P){on(null),d?.(""),ut();return}if(y){an(null),d?.("");return}ae.size&&(xr(),d?.(""),ut())}}function Ne(R){G=R===!0,N.setHiddenEdges(G),d?.(G?"Aristas ocultas visibles":"Aristas ocultas ocultas")}function sn(){return Ne(!G),G}function lt(){M?.traverse?.(R=>{const L=R.userData?.entity;if(!L)return;const se=Dd(L)||R.userData?.entityKey;R.visible=!(w.has(L)||_.has(se))}),ut()}function un(R,L){we&&(S.remove(we),at(we)),ue&&(S.remove(ue),at(ue)),Le&&(S.remove(Le),at(Le));const se=cn(R,ho(de));we=Ed(R,L),ue=xS(new $(se.x,se.y,se.z),L,{includeGround:!1,visible:W}),$e(ue),Le=vS(L),Le.visible=me,S.add(we,ue,Le),Xi(we,ce,O),Xi(ue,ce,O),Xi(Le,ce,O)}function _n(){z.makeEmpty();const R=M?.userData?.bounds;return R&&!R.isEmpty()&&z.union(R),Pe().forEach(L=>{(L.solid.vertices??[]).forEach(se=>z.expandByPoint(new $(Number(se?.x)||0,Number(se?.y)||0,Number(se?.z)||0)))}),(n?.model3d?.lines??[]).forEach(L=>{z.expandByPoint(Ln(L.start)),z.expandByPoint(Ln(L.end))}),z.isEmpty()&&z.set(new $(-10,-10,-.5),new $(10,10,.5)),z}function ln(){const{near:R,far:L}=$M(z,x.position);Math.abs(x.near-R)<=R*1e-6&&Math.abs(x.far-L)<=L*1e-6||(x.near=R,x.far=L,x.updateProjectionMatrix())}function Tn(R=ce,L=O){eb(x,{height:L,viewHeight:xe,width:R})}function xt(){return x.position.clone().sub(p.target).normalize()}function Nt(){const R=rs(Mf(x.position,p.target),.9999999999);return R?.type==="face"?R:null}function Pn(R,{preserveFraming:L=!0,redraw:se=!0}={}){const he=tr(R),Ge=Su(x);if(he===Ge)return Tn(),se&&ut(),he;const qe=p.target.clone(),Se=xt(),Ke=lf(x,qe);if(L&&he===Bi&&(xe=Math.max(1e-4,Ke),x.zoom=1),La(x,he),L&&he!==Bi){x.zoom=1;const gt=xi.degToRad(x.fov*.5),Dt=Math.max(1e-4,Ke/(2*Math.tan(gt)));x.position.copy(qe).addScaledVector(Se,Dt)}return Tn(),x.updateMatrixWorld(),ln(),se&&ut(),he}function vt(R){ee=tr(R);const L=vu(Nt(),ee);return Pn(L),ee}function Gn(R,L,se){const he=new yn().lookAt(R,L,se);return new Kn().setFromRotationMatrix(he)}function li(R,{animate:L=!0}={}){const se=Xn(R);Pn(vu(se,ee),{redraw:!1});const he=p.target.clone(),Ge=Math.max(1e-4,x.position.distanceTo(he)),qe=xu({direction:se.direction,distance:Ge,position:x.position,target:he}),Se=new $(se.direction.x,se.direction.y,se.direction.z),Ke=new $(qe.x,qe.y,qe.z),gt=JM(se),Dt=new $(gt.x,gt.y,gt.z),St=Gn(Ke,he,Dt);if(_e(),!L)return x.position.copy(Ke),x.up.copy(Dt),x.quaternion.copy(St),x.updateMatrixWorld(),p.update(),ln(),ge=!0,ut(),se;const Ot=x.position.clone().sub(he).normalize(),rt=new Kn().setFromUnitVectors(Ot,Se);return Je={controlsWereEnabled:p.enabled,directionRotation:rt,distance:Ge,endDirection:Se,endQuaternion:St,endUp:Dt,orientation:se,startQuaternion:x.quaternion.clone(),startDirection:Ot,startedAt:Pr(),target:he},p.enabled=!1,oe=Pr(),le(!0),ut(),se}function ao(R){const L=Je;if(!L)return!1;const se=Math.min(1,Math.max(0,(R-L.startedAt)/lb)),he=se<.5?4*se*se*se:1-(-2*se+2)**3/2,Ge=new Kn().slerpQuaternions(new Kn,L.directionRotation,he),qe=L.startDirection.clone().applyQuaternion(Ge).normalize();return se>=1&&qe.copy(L.endDirection),x.position.copy(L.target).addScaledVector(qe,L.distance),x.quaternion.slerpQuaternions(L.startQuaternion,L.endQuaternion,he),se<1?!0:(Je=null,p.enabled=L.controlsWereEnabled,p.target.copy(L.target),x.up.copy(L.endUp),x.quaternion.copy(L.endQuaternion),p.update(),le(!1),ge=!0,!1)}function Ds(){const R=_n(),L=new $,se=new $;R.getCenter(L),R.getSize(se);const he=Math.max(se.x,se.y,se.z,1),Ge=he*ZM,qe=R.getBoundingSphere(new us);xe=Math.max(qe.radius*2.2,1),x.zoom=1,La(x,ee),Tn();const Se=Xn(Jr).direction,Ke=xu({direction:Se,distance:Ge,target:L});x.position.set(Ke.x,Ke.y,Ke.z),x.up.set(0,0,1),x.lookAt(L),x.updateMatrixWorld(),p.target.copy(L),p.update(),ln(),un(L,he)}function Af(){return{position:x.position.toArray(),target:p.target.toArray(),up:x.up.toArray(),near:x.near,far:x.far,projection:Su(x),zoom:x.zoom,viewHeight:xe}}function Tf(R){return!Array.isArray(R?.position)||R.position.length<3||!Array.isArray(R?.target)||R.target.length<3?!1:(_e(),x.position.fromArray(R.position),p.target.fromArray(R.target),Array.isArray(R.up)&&R.up.length>=3&&x.up.fromArray(R.up),Number.isFinite(Number(R.near))&&(x.near=Math.max(1e-4,Number(R.near))),Number.isFinite(Number(R.far))&&(x.far=Math.max(x.near+1,Number(R.far))),Number.isFinite(Number(R.viewHeight))&&(xe=Math.max(1e-4,Number(R.viewHeight))),La(x,R.projection??ee),Number.isFinite(Number(R.zoom))&&(x.zoom=Math.max(1e-4,Number(R.zoom))),Tn(),x.lookAt(p.target),x.updateMatrixWorld(),p.update(),ln(),ut(),!0)}function Pf(R){const L=Array.isArray(n?.model3d?.sketches)?n.model3d.sketches.filter(qe=>qe?.visible!==!1):[],se=new Map;(n?.model3d?.lines??[]).forEach(qe=>{qe?.visible!==!1&&(se.has(qe.groupId)||se.set(qe.groupId,[]),se.get(qe.groupId).push(qe))});let he=null;const Ge=[...se.entries()].map(([qe,Se])=>{const Ke=Se[0]?.metadata?.supportFace??null,gt=Se[0]?.metadata?.supportPlane??null;let Dt=null;Ke||(he??=Us(),Dt=Ao([Se[0].start,...Se.map(rt=>rt.end)],he));const St=gt?Fr(gt):Dt?.plane??sM(Se);if(!St)return null;const Ot=Ke??(Dt?Rl(Dt.face,Dt.plane,n?.model3d):null);return{id:`line3d-face-${qe}`,name:`Cara ${qe}`,plane:St,entities:Se.flatMap(rt=>df([rt.start,rt.end],St,{idPrefix:rt.id})),visible:!0,metadata:{facesOnly:!0,lineGroupId:qe,supportFace:Ot}}}).filter(Boolean);return L.length?[...L,...Ge]:[{id:null,name:"Dibujo 2D pendiente",plane:ho(de),entities:R,visible:!0},...Ge]}function dn(R,{preserveView:L=!1}={}){M&&(S.remove(M),at(M)),A&&(S.remove(A),at(A)),v&&(S.remove(v),at(v)),an(null),gr(null),ai(null),ne=!1,w.clear(),_.clear(),v=new qt,v.name="webcad-3d-simple-faces",N.clearSolids();const se=new Map;Pe().forEach(Se=>{N.addDocumentSolid?.(Se);const Ke=fe(Se);Ke&&!Se?.operation?.sketchId&&(se.set(Ke,Se),_.add(Ke))});const he=Pf(R);M=new qt,M.name="webcad-3d-sketches",M.userData.bounds=new Mn().makeEmpty(),M.userData.entityCount=0,M.userData.segmentCount=0,A=new qt,A.name="webcad-3d-spatial-lines";const Ge=new Set((n?.model3d?.lines??[]).filter(Se=>Se?.visible!==!1).map(Se=>Se.id));[...ae].forEach(Se=>{Ge.has(Se)||ae.delete(Se)}),(n?.model3d?.lines??[]).forEach(Se=>{if(Se?.visible===!1)return;const Ke=ae.has(Se.id),gt=Kt([{start:Se.start,end:Se.end}],{color:Ke?16765286:Ze.drawingColor,depthTest:!0,depthWrite:!1,linewidth:Ke?Ze.drawingLineWidth+1:Ze.drawingLineWidth,renderOrder:Ze.drawingRenderOrder,transparent:!0});gt.userData.lineId=Se.id,gt.userData.lineGroupId=Se.groupId,gt.userData.line=Se,A.add(gt)});const qe=Se=>(N.getSolidObjects?.()??[]).find(Ke=>Ke.userData?.documentSolidId===Se)??null;return he.forEach(Se=>{const Ke=Fr(Se.plane??de),gt=_d(Se.entities||[]),Dt=[...gt,...gt.length?wl(Se,n?.model3d):[]],St=new qt;St.userData.sketchId=Se.id??null,St.userData.line3dGroupId=Se.metadata?.lineGroupId??null,$E(Dt).forEach(Gt=>{const Lt=Fh(Gt,Ke,Se.id??null);Se.metadata?.lineGroupId&&(Lt.line3dGroupId=Se.metadata.lineGroupId,Lt.sketchId=null);const fn=Se.metadata?.supportFace,wn=fn?.sourceSolidId?n?.model3d?.solids?.find(uo=>uo.id===fn.sourceSolidId):null,ci=!!(wn?.solid&&Oh(Gt,fn)),Vt=!!(wn?.solid&&!ci&&zh(Gt,fn)),lo=ci||Vt;if(lo){Lt.supportSolid=wn.solid,Lt.supportContactOnly=Vt,Lt.supportSolidGroup=qe(wn.id),Lt.sourceSolidDocumentId=wn.id,Lt.sourceSolidFaceIndices=fn.sourceFaceIndices??null,Lt.sourceSolidFaceIndex=fn.sourceFaceIndices?.[0]??null;const uo=fo=>Yr({x:Number(fo?.x)||0,y:-(Number(fo?.y)||0),z:0},Ke);Lt.supportLoops={outer:(fn.outerLoop??[]).map(uo),holes:(fn.innerLoops??[]).map(fo=>fo.map(uo))},Lt.placement=wn.placement,Lt.localFace=iy(Lt,wn.placement)}const Vn=qE(Gt);Vn.userData.face=Lt,lo&&(Vn.renderOrder=QE,Vn.material.opacity=.14,Vn.material.transparent=!0,Vn.userData.defaultOpacity=.14,Vn.userData.defaultTransparent=!0,Vn.userData.supportSolidDocumentId=wn.id);const Hi=Ai(Lt),Bs=se.get(Hi),co=!n&&!Bs?te.get(Gt.sourceEntity)||Pt.get(Hi):null;Bs&&!Se.id&&(Vn.visible=!1,Gt.sourceEntity&&w.add(Gt.sourceEntity),Hi&&_.add(Hi)),co&&(Vn.visible=!1,Gt.sourceEntity&&w.add(Gt.sourceEntity),Hi&&_.add(Hi),co.sourceKey&&_.add(co.sourceKey),N.addSessionSolid(Lt,co.height)),St.add(Vn)}),$e(St,Ke),v.add(St);const Ot=yS(Se.metadata?.facesOnly?[]:gt,{onWarning:Gt=>console.warn(Gt)});Ot.userData.sketchId=Se.id??null;const rt=Ot.userData.bounds;$e(Ot,Ke),rt&&!rt.isEmpty()&&M.userData.bounds.union(rt.clone().applyMatrix4(Be(Ke))),M.userData.entityCount+=Ot.userData.entityCount||0,M.userData.segmentCount+=Ot.userData.segmentCount||0,M.add(Ot)}),N.setHiddenEdges(G),S.add(v),S.add(M),S.add(A),lt(),Xi(M,ce,O),L?(_n(),ln()):Ds(),ut(),M.userData.segmentCount||0}function wf(R){W=R!==!1,yd(ue,W),ut()}function Rf(R){return me=R!==!1,Le&&(Le.visible=me),ut(),me}function Cf(R){const L=ca(R);return L===de?!1:(de=L,dn(ye(),{preserveView:!1}),!0)}async function Ls(){try{await Pl(),Nc(n?.model3d)}catch(L){return console.error("No se pudo reconstruir el modelo 3D compacto",L),d?.(L?.message||"No se pudo reconstruir el modelo 3D compacto"),!1}const R=ca(n?.model3d?.sketchPlane);return R!==de?(de=R,dn(ye(),{preserveView:!1}),!0):(dn(ye(),{preserveView:!0}),!0)}function Ns(){const R=y?.userData?.face;return R?.sourceSolid?R:null}function Us(){const R=[],L=new Set;return(N.getSolidObjects?.()??[]).forEach(se=>{se?.traverse?.(he=>{he?.userData?.type!=="webcad-push-solid"||L.has(he)||(L.add(he),Gy(he).forEach(Ge=>{const qe=ki(Ge);qe&&R.push(qe)}))})}),R}function ut(R){if(J)return;const L=Number.isFinite(R)?R:Pr();ao(L)||p.update(),x.updateMatrixWorld(),ln();const se=ge;ge=!1;const he=L-oe<Ua,Ge=se||!he;!Xe&&!N?.isActive?.()&&YM(S,x,{deferCameraRefresh:!Ge}),Xi(S,ce,O),f.render(S,x),Ve?.draw()}function Fs(R=e.clientWidth||e.width||640,L=e.clientHeight||e.height||420){if(J)return;const se=Math.max(1,Math.round(R)),he=Math.max(1,Math.round(L));ce=se,O=he,f.setSize(se,he,!1),Tn(se,he),Xi(S,se,he),ut()}function Os(){J||ze||(ze=!0,f.setAnimationLoop(ut))}function zs(){J||!ze||(ze=!1,f.setAnimationLoop(null))}function If(){const R=N.isActive()||V?.isActive()===!0||k?.isActive()===!0||B?.isActive()===!0||Y?.isActive()===!0||D?.isActive()===!0||j?.isActive()===!0||ne;return N.isActive()&&N.cancel(),V?.isActive()&&V.cancel(),k?.isActive()&&k.cancel(),B?.isActive()&&B.cancel(),Y?.isActive()&&Y.cancel(),D?.isActive()&&D.cancel(),j?.isActive()&&j.cancel(),ne&&bt(),ai(null),R}function Df(){J||(zs(),pe(),g=null,P=null,He(),h?.(null),Ae(),y=null,gn(),ne=!1,_e(),J=!0,f.domElement.removeEventListener("click",Ie),f.domElement.removeEventListener("dblclick",Ue),f.domElement.removeEventListener("pointermove",Q),f.domElement.removeEventListener("pointerleave",K),f.domElement.removeEventListener("pointerdown",Me,{capture:!0}),f.domElement.removeEventListener("pointerup",ie),f.domElement.removeEventListener("pointercancel",ie),f.domElement.removeEventListener("contextmenu",mt),f.domElement.removeEventListener("keydown",Bt),Ce!==null&&(globalThis.clearTimeout(Ce),Ce=null),tt.clear(),dt.clear(),p.removeEventListener("change",re),p.dispose(),Fe.dispose(),at(M),at(A),at(v),S.remove(U),at(U),at(we),at(ue),at(Le),at(ve),N.dispose(),V?.dispose(),k?.dispose(),B?.dispose(),Y?.dispose(),D?.dispose(),j?.dispose(),Ve?.dispose(),f.dispose())}k=nM({camera:x,canvas:f.domElement,cursorInput:t,doc:n,getUnitsLabel:r,getSelectedSolidIds:()=>{const R=[...q],L=y?.userData?.face?.sourceSolidDocumentId;return R.length||!L?R:[L]},getSolidIdAtPointer:R=>(An(R),Nn()?.object?.userData?.documentSolidId??null),getSolidObjects:()=>N.getSolidObjects?.()??[],getSnap:(R,L={})=>Mo({camera:x,canvas:f.domElement,event:R,solidObjects:N.getSolidObjects?.()??[],maxDistancePixels:20,includeHidden:G,excludeDocumentSolidIds:(L.mode==="move"||L.mode==="copy")&&L.phase==="destination"?L.solidIds:[]}),getWorkplane:()=>({origin:{x:0,y:0,z:0},normal:ua(de).normal}),onChanged:()=>dn(ye(),{preserveView:!0}),onSelection:R=>{pe(),ft(),y&&(Ae(),y=null),gn(R)},onSnap:ai,onStatus:d,render:ut,scene:S}),V=vM({camera:x,canvas:f.domElement,cursorInput:t,doc:n,getUnitsLabel:r,getSelectedSolidIds:()=>{const R=[...q],L=y?.userData?.face?.sourceSolidDocumentId;return R.length||!L?R:[L]},getSolidIdAtPointer:R=>(An(R),Nn()?.object?.userData?.documentSolidId??null),getSolidObjects:()=>N.getSolidObjects?.()??[],getSnap:(R,{anchor:L}={})=>Mo({camera:x,canvas:f.domElement,event:R,solidObjects:N.getSolidObjects?.()??[],extraCandidates:Ra(n?.model3d?.lines),maxDistancePixels:20,includeHidden:G,acceptCandidate:se=>Vi(se,L)}),getWorkplane:()=>({origin:{x:0,y:0,z:0},normal:ua(de).normal}),onChanged:()=>dn(ye(),{preserveView:!0}),onSelection:R=>{pe(),ft(),y&&(Ae(),y=null),gn(R)},onSnap:ai,onStatus:d,render:ut,scene:S}),B=RM({canvas:f.domElement,doc:n,getSelectedSolidIds:()=>[...q],getSolidIdAtPointer:R=>(An(R),Nn()?.object?.userData?.documentSolidId??null),onChanged:()=>dn(ye(),{preserveView:!0}),onSelection:R=>{pe(),ft(),y&&(Ae(),y=null),gn(R)},onStatus:d}),Y=PM({canvas:f.domElement,doc:n,getSelectedSolidIds:()=>[...q],getSolidIdAtPointer:R=>(An(R),Nn()?.object?.userData?.documentSolidId??null),onChanged:()=>dn(ye(),{preserveView:!0}),onSelection:R=>{pe(),ft(),y&&(Ae(),y=null),gn(R)},onStatus:d}),D=hM({camera:x,canvas:f.domElement,cursorInput:t,getUnitsLabel:r,scene:S,getContext(){const R=Ns(),L=R?$o(R):ho(de);return{face:R,plane:L}},getSnap(R,{points:L}={}){const se=L?.at(-1)??null;return Mo({camera:x,canvas:f.domElement,event:R,solidObjects:N.getSolidObjects?.()??[],extraCandidates:Ra(n?.model3d?.lines),maxDistancePixels:20,includeHidden:G,acceptCandidate:he=>Vi(he,se)})},onCommit({context:R,points:L}){if(!n||L.length<2)return null;const se=[R.face,...Us()].filter(Boolean),he=Ao(L,se)??Ao(L,se,1e-6,{allowCrossing:!0}),Ge=he?Rl(he.face,he.plane,n.model3d):null,qe=Ge?{supportFace:Ge,supportPlane:he.plane}:{},Se=Ge?wl({id:"line3d-auto-split",plane:he.plane,metadata:{supportFace:Ge}},n.model3d):[],Ke=Ge?pM(L,he.plane,Se):[],gt=he?[...he.face.points??[],...(he.face.holes??[]).flat(),...Ke]:se.flatMap(Vt=>[...Vt.points??[],...(Vt.holes??[]).flat()]),Dt=L.slice(0,-1).map((Vt,lo)=>({start:Vt,end:L[lo+1]})),St=dM({existingLines:n.model3d?.lines,newSegments:Dt,splitPoints:gt}),Ot=new Set(St.touchedExistingLineIds),rt=(n.model3d?.lines??[]).filter(Vt=>Vt?.visible===!1||!Ot.has(Vt.id)?!1:he?!!Ao([Vt.start,Vt.end],[he.face],1e-6,{allowCrossing:!0}):!0),Gt=rt[0]?.groupId??null,Lt=[...new Set(rt.map(Vt=>Vt.groupId))],wn=St.existingReplacements.length>0||Lt.length>1||!!(Ge&&Lt.length)?n.update3dLineTopology?.({replacements:St.existingReplacements,mergeGroupIds:Lt,targetGroupId:Gt,metadata:Ge?qe:null})===!0:!1,ci=n.add3dLines?.(St.newSegments,{...Gt?{groupId:Gt}:{},metadata:qe,recordHistory:!wn});return ci?.length?(ae.clear(),ci.forEach(Vt=>ae.add(Vt.id)),dn(ye(),{preserveView:!0}),ci):null},onSnap:ai,onStatus:d,render:ut});const so=()=>{const R=(n?.model3d?.lines??[]).filter(L=>ae.has(L.id));return R.length?{lineIds:R.map(L=>L.id),lines:R}:null};return j=mM({camera:x,canvas:f.domElement,cursorInput:t,getUnitsLabel:r,scene:S,getSnap:(R,{anchor:L}={})=>Mo({camera:x,canvas:f.domElement,event:R,solidObjects:N.getSolidObjects?.()??[],extraCandidates:Ra(n?.model3d?.lines),maxDistancePixels:20,includeHidden:G,acceptCandidate:se=>Vi(se,L)}),getWorkplane:()=>({origin:{x:0,y:0,z:0},normal:ua(de).normal}),onTransform({mode:R,record:L,transform:se}){const he=new Set(L?.lineIds??[]),Ge={lines:(n?.model3d?.lines??[]).filter(Se=>he.has(Se.id))};if(!Ge||!se)return!1;const qe=pf(Ge.lines,se);if(qe.length!==Ge.lines.length)return!1;if(R==="copy"){const Se=n.add3dLines?.(qe);if(!Se.length)return!1;ae.clear(),Se.forEach(Ke=>ae.add(Ke.id))}else n.recordHistory?.(),Ge.lines.forEach((Se,Ke)=>{Se.start=qe[Ke].start,Se.end=qe[Ke].end,Se.metadata={},Se.revision=(Number(Se.revision)||0)+1}),n.markDirty?.();return dn(ye(),{preserveView:!0}),!0},onSnap:ai,onStatus:d,render:ut}),f.domElement.addEventListener("click",Ie),f.domElement.addEventListener("dblclick",Ue),f.domElement.addEventListener("pointermove",Q),f.domElement.addEventListener("pointerleave",K),Ve=sb({camera:x,canvas:m?.canvas,container:m?.container,homeButton:m?.homeButton,label:m?.label,onSelect:R=>li(R),target:()=>p.target}),f.domElement.addEventListener("pointerdown",Me,{capture:!0}),f.domElement.addEventListener("pointerup",ie),f.domElement.addEventListener("pointercancel",ie),f.domElement.addEventListener("contextmenu",mt),f.domElement.addEventListener("keydown",Bt),Fs(),dn(i),Os(),{camera:x,cancelActiveCommand:If,controls:p,dispose:Df,getSegmentCount:()=>M?.userData.segmentCount||0,getFaceCount:()=>{let R=0;return v?.traverse?.(L=>{L.userData?.type==="webcad-simple-face"&&(R+=1)}),R},getEntityCount:()=>M?.userData.entityCount||0,getProjectionPreference:()=>ee,getHiddenEdgesVisible:()=>G,getViewState:Af,getSelectedSolidId:()=>[...q][0]??null,getSelectedSolidIds:()=>[...q],getSelectedSolidEdge:()=>P,getSelectedLine3dGroupId:()=>so()?.lines?.[0]?.groupId??null,getSelectedLine3dIds:()=>[...ae],getSelectedPlanarFace:Ns,getSketchPlane:()=>de,isDeleteSolidActive:()=>ne,isSolidPlaneCutActive:()=>V?.isActive()===!0,isSolidUnionActive:()=>B?.isActive()===!0,isSolidSubtractionActive:()=>Y?.isActive()===!0,startDeleteSolid:ht,confirmDeleteSolidSelection:It,cancelDeleteSolid:bt,deleteSelectedSolid:We,deleteSelectedRegion:it,deleteSelectedLine3d:nt,deleteSelected3d:Ye,isPushActive:()=>N.isActive(),isSolidTransformActive:()=>k?.isActive()===!0,isLine3dActive:()=>D?.isActive()===!0||j?.isActive()===!0,render:ut,fitView:()=>(Ds(),ut(),!0),refreshDocument:Ls,renderer:f,resize:Fs,scene:S,setEntities:dn,setCameraView:li,setProjectionPreference:vt,setViewState:Tf,setGridVisible:wf,setAxesVisible:Rf,setSketchPlane:Cf,setHiddenEdges:Ne,toggleHiddenEdges:sn,setNavigationDevice:Fe.setNavigationDevice,startLine3d:D.start,startCopyLine3d:()=>j.startCopy(so()),startMoveLine3d:()=>j.startMove(so()),startRotateLine3d:()=>j.startRotate(so()),startSolidPlaneCut:V.start,startSolidUnion:B.start,startSolidSubtraction:Y.start,startPush:N.start,startCopySolids:k.startCopy,startMoveSolids:k.startMove,startRotateSolids:k.startRotate,start:Os,stop:zs}}export{pb as createThreeDemoViewer,db as operationFromPushFace};

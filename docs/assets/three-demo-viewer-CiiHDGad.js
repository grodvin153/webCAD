import{U as Rn,c as qu,N as Nn,S as pc,C as St,R as ju,e as Mt,w as _t,V as zt,l as ko,M as ui,F as hc,W as Wo,a as Un,b as Rt,L as Ii,H as di,D as cn,B as hn,d as xr,f as Q,p as Zu,g as vr,h as fi,i as Sr,j as Ju,k as nn,O as mc,m as Et,E as Qu,P as pr,A as ed,n as ba,o as Ke,q as jn,r as Di,s as Oi,t as Er,u as Mi,v as td,x as nd,y as Bi,z as pn,G as eo,I as id,J as Ri,K as zi,Q as rd,T as ad,X as tr,Y as od,Z as sd,_ as ld,$ as cd,a0 as ud,a1 as dd,a2 as fd,a3 as pd,a4 as hd,a5 as md,a6 as gd,a7 as _d,a8 as xd,a9 as vd,aa as Sd,ab as Ed,ac as Md,ad as Aa,ae as Gr,af as yd,ag as vi,ah as bd,ai as Ad,aj as xo,ak as Td,al as vo,am as Pd,an as wd,ao as Rd,ap as dt,aq as aa,ar as Cd,as as Id,at as yn,au as hr,av as Qr,aw as Dd,ax as Zn,ay as ar,az as oi,aA as Ld,aB as gc,aC as _c,aD as xc,aE as oa,aF as vc,aG as Sc,aH as Ec,aI as ma,aJ as Nd,aK as Ud,aL as Fd,aM as Od,aN as Mc,aO as Bd,aP as zd,aQ as Gd,aR as Ta,aS as Pa,aT as wa,aU as Ra,aV as Xo,aW as Yo,aX as $o,aY as Ko,aZ as qo,a_ as jo,a$ as Zo,b0 as Jo,b1 as Qo,b2 as to,b3 as es,b4 as ts,b5 as ns,b6 as is,b7 as rs,b8 as as,b9 as os,ba as ss,bb as ls,bc as cs,bd as us,be as ds,bf as fs,bg as ps,bh as hs,bi as ms,bj as gs,bk as _s,bl as xs,bm as vs,bn as no,bo as Ss,bp as Vd,bq as Hd,br as kd,bs as Wd,bt as Xd,bu as Yd,bv as $d,bw as Kd,bx as Es,by as qd,bz as ea,bA as jd,bB as Ms,bC as ys,bD as bs,bE as yc,bF as So,bG as ga,bH as As,bI as Zd,bJ as bc,bK as Eo,bL as io,bM as Ac,bN as Jd,bO as Tc,bP as Pc,bQ as wc,bR as Rc,bS as Cc,bT as Ic,bU as Dc,bV as sn,bW as Ts,bX as Lc,bY as Ca,bZ as Ia,b_ as Qd,b$ as ef,c0 as Ps,c1 as tf,c2 as Nc,c3 as Mr,c4 as Gi,c5 as _a,c6 as nf,c7 as rf,c8 as af,c9 as of,ca as sf,cb as lf,cc as cf,cd as uf,ce as df,cf as ff,cg as Jn,ch as Li,ci as mr,cj as ws,ck as Uc,cl as ii,cm as pf,cn as ro,co as Ni,cp as hf,cq as Qn,cr as Fc,cs as mf,ct as Qt,cu as Cr,cv as yi,cw as gf,cx as _f,cy as xf,cz as vf,cA as Mo,cB as Oc,cC as yo,cD as Bc,cE as zc,cF as bo,cG as ei,cH as Ao,cI as xa,cJ as va,cK as en,cL as Sf,cM as Ef,cN as Gc,cO as or,cP as To,cQ as Mf,cR as Po,cS as gr,cT as qt,cU as Ir,cV as Wi,cW as bi,cX as wo,cY as Vc,cZ as sr,c_ as yf,c$ as bf,d0 as Af,d1 as Tf,d2 as Hc,d3 as Pf,d4 as wf,d5 as Rf,d6 as Cf,d7 as If,d8 as kc,d9 as Df,da as Lf,db as Rs,dc as Nf,dd as Uf,de as Ff,df as Of,dg as Ro,dh as Wc,di as Bf,dj as zf,dk as yr,dl as Xc,dm as Gf,dn as Vf,dp as Hf,dq as Co,dr as Yc,ds as Io,dt as kf,du as Cs,dv as $c,dw as Wf,dx as Xf,dy as Yf,dz as $f,dA as Kf,dB as Da,dC as qf,dD as jf,dE as Is,dF as Zf,dG as Jf,dH as Qf,dI as Ds,dJ as Vr,dK as La,dL as ep,dM as tp}from"./main-BzC3gYdW.js";function Kc(){let e=null,t=!1,n=null,i=null;function r(a,o){n(a,o),i=e.requestAnimationFrame(r)}return{start:function(){t!==!0&&n!==null&&e!==null&&(i=e.requestAnimationFrame(r),t=!0)},stop:function(){e!==null&&e.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(a){n=a},setContext:function(a){e=a}}}function np(e){const t=new WeakMap;function n(s,u){const l=s.array,h=s.usage,d=l.byteLength,c=e.createBuffer();e.bindBuffer(u,c),e.bufferData(u,l,h),s.onUploadCallback();let m;if(l instanceof Float32Array)m=e.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)m=e.HALF_FLOAT;else if(l instanceof Uint16Array)s.isFloat16BufferAttribute?m=e.HALF_FLOAT:m=e.UNSIGNED_SHORT;else if(l instanceof Int16Array)m=e.SHORT;else if(l instanceof Uint32Array)m=e.UNSIGNED_INT;else if(l instanceof Int32Array)m=e.INT;else if(l instanceof Int8Array)m=e.BYTE;else if(l instanceof Uint8Array)m=e.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)m=e.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:c,type:m,bytesPerElement:l.BYTES_PER_ELEMENT,version:s.version,size:d}}function i(s,u,l){const h=u.array,d=u.updateRanges;if(e.bindBuffer(l,s),d.length===0)e.bufferSubData(l,0,h);else{d.sort((m,v)=>m.start-v.start);let c=0;for(let m=1;m<d.length;m++){const v=d[c],y=d[m];y.start<=v.start+v.count+1?v.count=Math.max(v.count,y.start+y.count-v.start):(++c,d[c]=y)}d.length=c+1;for(let m=0,v=d.length;m<v;m++){const y=d[m];e.bufferSubData(l,y.start*h.BYTES_PER_ELEMENT,h,y.start,y.count)}u.clearUpdateRanges()}u.onUploadCallback()}function r(s){return s.isInterleavedBufferAttribute&&(s=s.data),t.get(s)}function a(s){s.isInterleavedBufferAttribute&&(s=s.data);const u=t.get(s);u&&(e.deleteBuffer(u.buffer),t.delete(s))}function o(s,u){if(s.isInterleavedBufferAttribute&&(s=s.data),s.isGLBufferAttribute){const h=t.get(s);(!h||h.version<s.version)&&t.set(s,{buffer:s.buffer,type:s.type,bytesPerElement:s.elementSize,version:s.version});return}const l=t.get(s);if(l===void 0)t.set(s,n(s,u));else if(l.version<s.version){if(l.size!==s.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(l.buffer,s,u),l.version=s.version}}return{get:r,remove:a,update:o}}var ip=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,rp=`#ifdef USE_ALPHAHASH
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
#endif`,ap=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,op=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,sp=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,lp=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,cp=`#ifdef USE_AOMAP
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
#endif`,up=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,dp=`#ifdef USE_BATCHING
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
#endif`,fp=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,pp=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,hp=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,mp=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,gp=`#ifdef USE_IRIDESCENCE
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
#endif`,_p=`#ifdef USE_BUMPMAP
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
#endif`,xp=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,vp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Sp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Ep=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Mp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,yp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,bp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,Ap=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,Tp=`#define PI 3.141592653589793
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
} // validated`,Pp=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,wp=`vec3 transformedNormal = objectNormal;
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
#endif`,Rp=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Cp=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Ip=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Dp=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Lp="gl_FragColor = linearToOutputTexel( gl_FragColor );",Np=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Up=`#ifdef USE_ENVMAP
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
#endif`,Fp=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,Op=`#ifdef USE_ENVMAP
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
#endif`,Bp=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,zp=`#ifdef USE_ENVMAP
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
#endif`,Gp=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Vp=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Hp=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,kp=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Wp=`#ifdef USE_GRADIENTMAP
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
}`,Xp=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Yp=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,$p=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Kp=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,qp=`#ifdef USE_ENVMAP
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
#endif`,jp=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Zp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Jp=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Qp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,eh=`PhysicalMaterial material;
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
#endif`,th=`uniform sampler2D dfgLUT;
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
}`,nh=`
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
#endif`,ih=`#if defined( RE_IndirectDiffuse )
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
#endif`,rh=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,ah=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,oh=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,sh=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,lh=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,ch=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,uh=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,dh=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,fh=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,ph=`#if defined( USE_POINTS_UV )
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
#endif`,hh=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,mh=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,gh=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,_h=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,xh=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,vh=`#ifdef USE_MORPHTARGETS
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
#endif`,Sh=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Eh=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Mh=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,yh=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,bh=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Ah=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,Th=`#ifdef USE_NORMALMAP
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
#endif`,Ph=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,wh=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Rh=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Ch=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Ih=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Dh=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Lh=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Nh=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Uh=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Fh=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Oh=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Bh=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,zh=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Gh=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Vh=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Hh=`float getShadowMask() {
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
}`,kh=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Wh=`#ifdef USE_SKINNING
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
#endif`,Xh=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Yh=`#ifdef USE_SKINNING
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
#endif`,$h=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Kh=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,qh=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,jh=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Zh=`#ifdef USE_TRANSMISSION
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
#endif`,Jh=`#ifdef USE_TRANSMISSION
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
#endif`,Qh=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,em=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,tm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,nm=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const im=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,rm=`uniform sampler2D t2D;
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
}`,am=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,om=`#ifdef ENVMAP_TYPE_CUBE
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
}`,sm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,lm=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,cm=`#include <common>
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
}`,um=`#if DEPTH_PACKING == 3200
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
}`,dm=`#define DISTANCE
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
}`,fm=`#define DISTANCE
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
}`,pm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,hm=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,mm=`uniform float scale;
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
}`,gm=`uniform vec3 diffuse;
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
}`,_m=`#include <common>
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
}`,xm=`uniform vec3 diffuse;
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
}`,vm=`#define LAMBERT
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
}`,Sm=`#define LAMBERT
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
}`,Em=`#define MATCAP
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
}`,Mm=`#define MATCAP
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
}`,ym=`#define NORMAL
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
}`,bm=`#define NORMAL
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
}`,Am=`#define PHONG
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
}`,Tm=`#define PHONG
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
}`,Pm=`#define STANDARD
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
}`,wm=`#define STANDARD
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
}`,Rm=`#define TOON
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
}`,Cm=`#define TOON
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
}`,Im=`uniform float size;
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
}`,Dm=`uniform vec3 diffuse;
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
}`,Lm=`#include <common>
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
}`,Nm=`uniform vec3 color;
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
}`,Um=`uniform float rotation;
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
}`,Fm=`uniform vec3 diffuse;
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
}`,rt={alphahash_fragment:ip,alphahash_pars_fragment:rp,alphamap_fragment:ap,alphamap_pars_fragment:op,alphatest_fragment:sp,alphatest_pars_fragment:lp,aomap_fragment:cp,aomap_pars_fragment:up,batching_pars_vertex:dp,batching_vertex:fp,begin_vertex:pp,beginnormal_vertex:hp,bsdfs:mp,iridescence_fragment:gp,bumpmap_pars_fragment:_p,clipping_planes_fragment:xp,clipping_planes_pars_fragment:vp,clipping_planes_pars_vertex:Sp,clipping_planes_vertex:Ep,color_fragment:Mp,color_pars_fragment:yp,color_pars_vertex:bp,color_vertex:Ap,common:Tp,cube_uv_reflection_fragment:Pp,defaultnormal_vertex:wp,displacementmap_pars_vertex:Rp,displacementmap_vertex:Cp,emissivemap_fragment:Ip,emissivemap_pars_fragment:Dp,colorspace_fragment:Lp,colorspace_pars_fragment:Np,envmap_fragment:Up,envmap_common_pars_fragment:Fp,envmap_pars_fragment:Op,envmap_pars_vertex:Bp,envmap_physical_pars_fragment:qp,envmap_vertex:zp,fog_vertex:Gp,fog_pars_vertex:Vp,fog_fragment:Hp,fog_pars_fragment:kp,gradientmap_pars_fragment:Wp,lightmap_pars_fragment:Xp,lights_lambert_fragment:Yp,lights_lambert_pars_fragment:$p,lights_pars_begin:Kp,lights_toon_fragment:jp,lights_toon_pars_fragment:Zp,lights_phong_fragment:Jp,lights_phong_pars_fragment:Qp,lights_physical_fragment:eh,lights_physical_pars_fragment:th,lights_fragment_begin:nh,lights_fragment_maps:ih,lights_fragment_end:rh,lightprobes_pars_fragment:ah,logdepthbuf_fragment:oh,logdepthbuf_pars_fragment:sh,logdepthbuf_pars_vertex:lh,logdepthbuf_vertex:ch,map_fragment:uh,map_pars_fragment:dh,map_particle_fragment:fh,map_particle_pars_fragment:ph,metalnessmap_fragment:hh,metalnessmap_pars_fragment:mh,morphinstance_vertex:gh,morphcolor_vertex:_h,morphnormal_vertex:xh,morphtarget_pars_vertex:vh,morphtarget_vertex:Sh,normal_fragment_begin:Eh,normal_fragment_maps:Mh,normal_pars_fragment:yh,normal_pars_vertex:bh,normal_vertex:Ah,normalmap_pars_fragment:Th,clearcoat_normal_fragment_begin:Ph,clearcoat_normal_fragment_maps:wh,clearcoat_pars_fragment:Rh,iridescence_pars_fragment:Ch,opaque_fragment:Ih,packing:Dh,premultiplied_alpha_fragment:Lh,project_vertex:Nh,dithering_fragment:Uh,dithering_pars_fragment:Fh,roughnessmap_fragment:Oh,roughnessmap_pars_fragment:Bh,shadowmap_pars_fragment:zh,shadowmap_pars_vertex:Gh,shadowmap_vertex:Vh,shadowmask_pars_fragment:Hh,skinbase_vertex:kh,skinning_pars_vertex:Wh,skinning_vertex:Xh,skinnormal_vertex:Yh,specularmap_fragment:$h,specularmap_pars_fragment:Kh,tonemapping_fragment:qh,tonemapping_pars_fragment:jh,transmission_fragment:Zh,transmission_pars_fragment:Jh,uv_pars_fragment:Qh,uv_pars_vertex:em,uv_vertex:tm,worldpos_vertex:nm,background_vert:im,background_frag:rm,backgroundCube_vert:am,backgroundCube_frag:om,cube_vert:sm,cube_frag:lm,depth_vert:cm,depth_frag:um,distance_vert:dm,distance_frag:fm,equirect_vert:pm,equirect_frag:hm,linedashed_vert:mm,linedashed_frag:gm,meshbasic_vert:_m,meshbasic_frag:xm,meshlambert_vert:vm,meshlambert_frag:Sm,meshmatcap_vert:Em,meshmatcap_frag:Mm,meshnormal_vert:ym,meshnormal_frag:bm,meshphong_vert:Am,meshphong_frag:Tm,meshphysical_vert:Pm,meshphysical_frag:wm,meshtoon_vert:Rm,meshtoon_frag:Cm,points_vert:Im,points_frag:Dm,shadow_vert:Lm,shadow_frag:Nm,sprite_vert:Um,sprite_frag:Fm},Te={common:{diffuse:{value:new St(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new dt},alphaMap:{value:null},alphaMapTransform:{value:new dt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new dt}},envmap:{envMap:{value:null},envMapRotation:{value:new dt},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new dt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new dt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new dt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new dt},normalScale:{value:new Ke(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new dt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new dt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new dt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new dt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new St(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new Q},probesMax:{value:new Q},probesResolution:{value:new Q}},points:{diffuse:{value:new St(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new dt},alphaTest:{value:0},uvTransform:{value:new dt}},sprite:{diffuse:{value:new St(16777215)},opacity:{value:1},center:{value:new Ke(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new dt},alphaMap:{value:null},alphaMapTransform:{value:new dt},alphaTest:{value:0}}},ln={basic:{uniforms:sn([Te.common,Te.specularmap,Te.envmap,Te.aomap,Te.lightmap,Te.fog]),vertexShader:rt.meshbasic_vert,fragmentShader:rt.meshbasic_frag},lambert:{uniforms:sn([Te.common,Te.specularmap,Te.envmap,Te.aomap,Te.lightmap,Te.emissivemap,Te.bumpmap,Te.normalmap,Te.displacementmap,Te.fog,Te.lights,{emissive:{value:new St(0)},envMapIntensity:{value:1}}]),vertexShader:rt.meshlambert_vert,fragmentShader:rt.meshlambert_frag},phong:{uniforms:sn([Te.common,Te.specularmap,Te.envmap,Te.aomap,Te.lightmap,Te.emissivemap,Te.bumpmap,Te.normalmap,Te.displacementmap,Te.fog,Te.lights,{emissive:{value:new St(0)},specular:{value:new St(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:rt.meshphong_vert,fragmentShader:rt.meshphong_frag},standard:{uniforms:sn([Te.common,Te.envmap,Te.aomap,Te.lightmap,Te.emissivemap,Te.bumpmap,Te.normalmap,Te.displacementmap,Te.roughnessmap,Te.metalnessmap,Te.fog,Te.lights,{emissive:{value:new St(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:rt.meshphysical_vert,fragmentShader:rt.meshphysical_frag},toon:{uniforms:sn([Te.common,Te.aomap,Te.lightmap,Te.emissivemap,Te.bumpmap,Te.normalmap,Te.displacementmap,Te.gradientmap,Te.fog,Te.lights,{emissive:{value:new St(0)}}]),vertexShader:rt.meshtoon_vert,fragmentShader:rt.meshtoon_frag},matcap:{uniforms:sn([Te.common,Te.bumpmap,Te.normalmap,Te.displacementmap,Te.fog,{matcap:{value:null}}]),vertexShader:rt.meshmatcap_vert,fragmentShader:rt.meshmatcap_frag},points:{uniforms:sn([Te.points,Te.fog]),vertexShader:rt.points_vert,fragmentShader:rt.points_frag},dashed:{uniforms:sn([Te.common,Te.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:rt.linedashed_vert,fragmentShader:rt.linedashed_frag},depth:{uniforms:sn([Te.common,Te.displacementmap]),vertexShader:rt.depth_vert,fragmentShader:rt.depth_frag},normal:{uniforms:sn([Te.common,Te.bumpmap,Te.normalmap,Te.displacementmap,{opacity:{value:1}}]),vertexShader:rt.meshnormal_vert,fragmentShader:rt.meshnormal_frag},sprite:{uniforms:sn([Te.sprite,Te.fog]),vertexShader:rt.sprite_vert,fragmentShader:rt.sprite_frag},background:{uniforms:{uvTransform:{value:new dt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:rt.background_vert,fragmentShader:rt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new dt}},vertexShader:rt.backgroundCube_vert,fragmentShader:rt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:rt.cube_vert,fragmentShader:rt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:rt.equirect_vert,fragmentShader:rt.equirect_frag},distance:{uniforms:sn([Te.common,Te.displacementmap,{referencePosition:{value:new Q},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:rt.distance_vert,fragmentShader:rt.distance_frag},shadow:{uniforms:sn([Te.lights,Te.fog,{color:{value:new St(0)},opacity:{value:1}}]),vertexShader:rt.shadow_vert,fragmentShader:rt.shadow_frag}};ln.physical={uniforms:sn([ln.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new dt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new dt},clearcoatNormalScale:{value:new Ke(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new dt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new dt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new dt},sheen:{value:0},sheenColor:{value:new St(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new dt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new dt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new dt},transmissionSamplerSize:{value:new Ke},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new dt},attenuationDistance:{value:0},attenuationColor:{value:new St(0)},specularColor:{value:new St(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new dt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new dt},anisotropyVector:{value:new Ke},anisotropyMap:{value:null},anisotropyMapTransform:{value:new dt}}]),vertexShader:rt.meshphysical_vert,fragmentShader:rt.meshphysical_frag};const Hr={r:0,b:0,g:0},Om=new ui,qc=new dt;qc.set(-1,0,0,0,1,0,0,0,1);function Bm(e,t,n,i,r,a){const o=new St(0);let s=r===!0?0:1,u,l,h=null,d=0,c=null;function m(E){let A=E.isScene===!0?E.background:null;if(A&&A.isTexture){const _=E.backgroundBlurriness>0;A=t.get(A,_)}return A}function v(E){let A=!1;const _=m(E);_===null?p(o,s):_&&_.isColor&&(p(_,1),A=!0);const S=e.xr.getEnvironmentBlendMode();S==="additive"?n.buffers.color.setClear(0,0,0,1,a):S==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(e.autoClear||A)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil))}function y(E,A){const _=m(A);_&&(_.isCubeTexture||_.mapping===ga)?(l===void 0&&(l=new nn(new Eo(1,1,1),new yn({name:"BackgroundCubeMaterial",uniforms:io(ln.backgroundCube.uniforms),vertexShader:ln.backgroundCube.vertexShader,fragmentShader:ln.backgroundCube.fragmentShader,side:hn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(S,b,C){this.matrixWorld.copyPosition(C.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(l)),l.material.uniforms.envMap.value=_,l.material.uniforms.backgroundBlurriness.value=A.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=A.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(Om.makeRotationFromEuler(A.backgroundRotation)).transpose(),_.isCubeTexture&&_.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(qc),l.material.toneMapped=Rt.getTransfer(_.colorSpace)!==Et,(h!==_||d!==_.version||c!==e.toneMapping)&&(l.material.needsUpdate=!0,h=_,d=_.version,c=e.toneMapping),l.layers.enableAll(),E.unshift(l,l.geometry,l.material,0,0,null)):_&&_.isTexture&&(u===void 0&&(u=new nn(new ma(2,2),new yn({name:"BackgroundMaterial",uniforms:io(ln.background.uniforms),vertexShader:ln.background.vertexShader,fragmentShader:ln.background.fragmentShader,side:xr,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),u.geometry.deleteAttribute("normal"),Object.defineProperty(u.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(u)),u.material.uniforms.t2D.value=_,u.material.uniforms.backgroundIntensity.value=A.backgroundIntensity,u.material.toneMapped=Rt.getTransfer(_.colorSpace)!==Et,_.matrixAutoUpdate===!0&&_.updateMatrix(),u.material.uniforms.uvTransform.value.copy(_.matrix),(h!==_||d!==_.version||c!==e.toneMapping)&&(u.material.needsUpdate=!0,h=_,d=_.version,c=e.toneMapping),u.layers.enableAll(),E.unshift(u,u.geometry,u.material,0,0,null))}function p(E,A){E.getRGB(Hr,bc(e)),n.buffers.color.setClear(Hr.r,Hr.g,Hr.b,A,a)}function f(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),u!==void 0&&(u.geometry.dispose(),u.material.dispose(),u=void 0)}return{getClearColor:function(){return o},setClearColor:function(E,A=1){o.set(E),s=A,p(o,s)},getClearAlpha:function(){return s},setClearAlpha:function(E){s=E,p(o,s)},render:v,addToRenderList:y,dispose:f}}function zm(e,t){const n=e.getParameter(e.MAX_VERTEX_ATTRIBS),i={},r=c(null);let a=r,o=!1;function s(D,B,Z,k,I){let W=!1;const L=d(D,k,Z,B);a!==L&&(a=L,l(a.object)),W=m(D,k,Z,I),W&&v(D,k,Z,I),I!==null&&t.update(I,e.ELEMENT_ARRAY_BUFFER),(W||o)&&(o=!1,_(D,B,Z,k),I!==null&&e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,t.get(I).buffer))}function u(){return e.createVertexArray()}function l(D){return e.bindVertexArray(D)}function h(D){return e.deleteVertexArray(D)}function d(D,B,Z,k){const I=k.wireframe===!0;let W=i[B.id];W===void 0&&(W={},i[B.id]=W);const L=D.isInstancedMesh===!0?D.id:0;let H=W[L];H===void 0&&(H={},W[L]=H);let ee=H[Z.id];ee===void 0&&(ee={},H[Z.id]=ee);let fe=ee[I];return fe===void 0&&(fe=c(u()),ee[I]=fe),fe}function c(D){const B=[],Z=[],k=[];for(let I=0;I<n;I++)B[I]=0,Z[I]=0,k[I]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:B,enabledAttributes:Z,attributeDivisors:k,object:D,attributes:{},index:null}}function m(D,B,Z,k){const I=a.attributes,W=B.attributes;let L=0;const H=Z.getAttributes();for(const ee in H)if(H[ee].location>=0){const ce=I[ee];let pe=W[ee];if(pe===void 0&&(ee==="instanceMatrix"&&D.instanceMatrix&&(pe=D.instanceMatrix),ee==="instanceColor"&&D.instanceColor&&(pe=D.instanceColor)),ce===void 0||ce.attribute!==pe||pe&&ce.data!==pe.data)return!0;L++}return a.attributesNum!==L||a.index!==k}function v(D,B,Z,k){const I={},W=B.attributes;let L=0;const H=Z.getAttributes();for(const ee in H)if(H[ee].location>=0){let ce=W[ee];ce===void 0&&(ee==="instanceMatrix"&&D.instanceMatrix&&(ce=D.instanceMatrix),ee==="instanceColor"&&D.instanceColor&&(ce=D.instanceColor));const pe={};pe.attribute=ce,ce&&ce.data&&(pe.data=ce.data),I[ee]=pe,L++}a.attributes=I,a.attributesNum=L,a.index=k}function y(){const D=a.newAttributes;for(let B=0,Z=D.length;B<Z;B++)D[B]=0}function p(D){f(D,0)}function f(D,B){const Z=a.newAttributes,k=a.enabledAttributes,I=a.attributeDivisors;Z[D]=1,k[D]===0&&(e.enableVertexAttribArray(D),k[D]=1),I[D]!==B&&(e.vertexAttribDivisor(D,B),I[D]=B)}function E(){const D=a.newAttributes,B=a.enabledAttributes;for(let Z=0,k=B.length;Z<k;Z++)B[Z]!==D[Z]&&(e.disableVertexAttribArray(Z),B[Z]=0)}function A(D,B,Z,k,I,W,L){L===!0?e.vertexAttribIPointer(D,B,Z,I,W):e.vertexAttribPointer(D,B,Z,k,I,W)}function _(D,B,Z,k){y();const I=k.attributes,W=Z.getAttributes(),L=B.defaultAttributeValues;for(const H in W){const ee=W[H];if(ee.location>=0){let fe=I[H];if(fe===void 0&&(H==="instanceMatrix"&&D.instanceMatrix&&(fe=D.instanceMatrix),H==="instanceColor"&&D.instanceColor&&(fe=D.instanceColor)),fe!==void 0){const ce=fe.normalized,pe=fe.itemSize,He=t.get(fe);if(He===void 0)continue;const Ge=He.buffer,Ie=He.type,N=He.bytesPerElement,ne=Ie===e.INT||Ie===e.UNSIGNED_INT||fe.gpuType===Mc;if(fe.isInterleavedBufferAttribute){const ae=fe.data,q=ae.stride,ue=fe.offset;if(ae.isInstancedInterleavedBuffer){for(let se=0;se<ee.locationSize;se++)f(ee.location+se,ae.meshPerAttribute);D.isInstancedMesh!==!0&&k._maxInstanceCount===void 0&&(k._maxInstanceCount=ae.meshPerAttribute*ae.count)}else for(let se=0;se<ee.locationSize;se++)p(ee.location+se);e.bindBuffer(e.ARRAY_BUFFER,Ge);for(let se=0;se<ee.locationSize;se++)A(ee.location+se,pe/ee.locationSize,Ie,ce,q*N,(ue+pe/ee.locationSize*se)*N,ne)}else{if(fe.isInstancedBufferAttribute){for(let ae=0;ae<ee.locationSize;ae++)f(ee.location+ae,fe.meshPerAttribute);D.isInstancedMesh!==!0&&k._maxInstanceCount===void 0&&(k._maxInstanceCount=fe.meshPerAttribute*fe.count)}else for(let ae=0;ae<ee.locationSize;ae++)p(ee.location+ae);e.bindBuffer(e.ARRAY_BUFFER,Ge);for(let ae=0;ae<ee.locationSize;ae++)A(ee.location+ae,pe/ee.locationSize,Ie,ce,pe*N,pe/ee.locationSize*ae*N,ne)}}else if(L!==void 0){const ce=L[H];if(ce!==void 0)switch(ce.length){case 2:e.vertexAttrib2fv(ee.location,ce);break;case 3:e.vertexAttrib3fv(ee.location,ce);break;case 4:e.vertexAttrib4fv(ee.location,ce);break;default:e.vertexAttrib1fv(ee.location,ce)}}}}E()}function S(){R();for(const D in i){const B=i[D];for(const Z in B){const k=B[Z];for(const I in k){const W=k[I];for(const L in W)h(W[L].object),delete W[L];delete k[I]}}delete i[D]}}function b(D){if(i[D.id]===void 0)return;const B=i[D.id];for(const Z in B){const k=B[Z];for(const I in k){const W=k[I];for(const L in W)h(W[L].object),delete W[L];delete k[I]}}delete i[D.id]}function C(D){for(const B in i){const Z=i[B];for(const k in Z){const I=Z[k];if(I[D.id]===void 0)continue;const W=I[D.id];for(const L in W)h(W[L].object),delete W[L];delete I[D.id]}}}function x(D){for(const B in i){const Z=i[B],k=D.isInstancedMesh===!0?D.id:0,I=Z[k];if(I!==void 0){for(const W in I){const L=I[W];for(const H in L)h(L[H].object),delete L[H];delete I[W]}delete Z[k],Object.keys(Z).length===0&&delete i[B]}}}function R(){U(),o=!0,a!==r&&(a=r,l(a.object))}function U(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:s,reset:R,resetDefaultState:U,dispose:S,releaseStatesOfGeometry:b,releaseStatesOfObject:x,releaseStatesOfProgram:C,initAttributes:y,enableAttribute:p,disableUnusedAttributes:E}}function Gm(e,t,n){let i;function r(u){i=u}function a(u,l){e.drawArrays(i,u,l),n.update(l,i,1)}function o(u,l,h){h!==0&&(e.drawArraysInstanced(i,u,l,h),n.update(l,i,h))}function s(u,l,h){if(h===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,u,0,l,0,h);let c=0;for(let m=0;m<h;m++)c+=l[m];n.update(c,i,1)}this.setMode=r,this.render=a,this.renderInstances=o,this.renderMultiDraw=s}function Vm(e,t,n,i){let r;function a(){if(r!==void 0)return r;if(t.has("EXT_texture_filter_anisotropic")===!0){const C=t.get("EXT_texture_filter_anisotropic");r=e.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function o(C){return!(C!==jn&&i.convert(C)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT))}function s(C){const x=C===di&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(C!==Rn&&i.convert(C)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE)&&C!==oi&&!x)}function u(C){if(C==="highp"){if(e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=n.precision!==void 0?n.precision:"highp";const h=u(l);h!==l&&(_t("WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);const d=n.logarithmicDepthBuffer===!0,c=n.reversedDepthBuffer===!0&&t.has("EXT_clip_control");n.reversedDepthBuffer===!0&&c===!1&&_t("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const m=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),v=e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),y=e.getParameter(e.MAX_TEXTURE_SIZE),p=e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),f=e.getParameter(e.MAX_VERTEX_ATTRIBS),E=e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),A=e.getParameter(e.MAX_VARYING_VECTORS),_=e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),S=e.getParameter(e.MAX_SAMPLES),b=e.getParameter(e.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:a,getMaxPrecision:u,textureFormatReadable:o,textureTypeReadable:s,precision:l,logarithmicDepthBuffer:d,reversedDepthBuffer:c,maxTextures:m,maxVertexTextures:v,maxTextureSize:y,maxCubemapSize:p,maxAttributes:f,maxVertexUniforms:E,maxVaryings:A,maxFragmentUniforms:_,maxSamples:S,samples:b}}function Hm(e){const t=this;let n=null,i=0,r=!1,a=!1;const o=new aa,s=new dt,u={value:null,needsUpdate:!1};this.uniform=u,this.numPlanes=0,this.numIntersection=0,this.init=function(d,c){const m=d.length!==0||c||i!==0||r;return r=c,i=d.length,m},this.beginShadows=function(){a=!0,h(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(d,c){n=h(d,c,0)},this.setState=function(d,c,m){const v=d.clippingPlanes,y=d.clipIntersection,p=d.clipShadows,f=e.get(d);if(!r||v===null||v.length===0||a&&!p)a?h(null):l();else{const E=a?0:i,A=E*4;let _=f.clippingState||null;u.value=_,_=h(v,c,A,m);for(let S=0;S!==A;++S)_[S]=n[S];f.clippingState=_,this.numIntersection=y?this.numPlanes:0,this.numPlanes+=E}};function l(){u.value!==n&&(u.value=n,u.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function h(d,c,m,v){const y=d!==null?d.length:0;let p=null;if(y!==0){if(p=u.value,v!==!0||p===null){const f=m+y*4,E=c.matrixWorldInverse;s.getNormalMatrix(E),(p===null||p.length<f)&&(p=new Float32Array(f));for(let A=0,_=m;A!==y;++A,_+=4)o.copy(d[A]).applyMatrix4(E,s),o.normal.toArray(p,_),p[_+3]=o.constant}u.value=p,u.needsUpdate=!0}return t.numPlanes=y,t.numIntersection=0,p}}const si=4,Ls=[.125,.215,.35,.446,.526,.582],_i=20,km=256,nr=new mc,Ns=new St;let Na=null,Ua=0,Fa=0,Oa=!1;const Wm=new Q;class Us{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(t,n=0,i=.1,r=100,a={}){const{size:o=256,position:s=Wm}=a;Na=this._renderer.getRenderTarget(),Ua=this._renderer.getActiveCubeFace(),Fa=this._renderer.getActiveMipmapLevel(),Oa=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);const u=this._allocateTargets();return u.depthBuffer=!0,this._sceneToCubeUV(t,i,r,u,s),n>0&&this._blur(u,0,0,n),this._applyPMREM(u),this._cleanup(u),u}fromEquirectangular(t,n=null){return this._fromTexture(t,n)}fromCubemap(t,n=null){return this._fromTexture(t,n)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Bs(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Os(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodMeshes.length;t++)this._lodMeshes[t].geometry.dispose()}_cleanup(t){this._renderer.setRenderTarget(Na,Ua,Fa),this._renderer.xr.enabled=Oa,t.scissorTest=!1,Pi(t,0,0,t.width,t.height)}_fromTexture(t,n){t.mapping===Mr||t.mapping===Gi?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Na=this._renderer.getRenderTarget(),Ua=this._renderer.getActiveCubeFace(),Fa=this._renderer.getActiveMipmapLevel(),Oa=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=n||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),n=4*this._cubeSize,i={magFilter:pn,minFilter:pn,generateMipmaps:!1,type:di,format:jn,colorSpace:Nc,depthBuffer:!1},r=Fs(t,n,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==n){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Fs(t,n,i);const{_lodMax:a}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=Xm(a)),this._blurMaterial=$m(a,t,n),this._ggxMaterial=Ym(a,t,n)}return r}_compileMaterial(t){const n=new nn(new fi,t);this._renderer.compile(n,nr)}_sceneToCubeUV(t,n,i,r,a){const u=new pr(90,1,n,i),l=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],d=this._renderer,c=d.autoClear,m=d.toneMapping;d.getClearColor(Ns),d.toneMapping=Nn,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(r),d.clearDepth(),d.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new nn(new Eo,new _a({name:"PMREM.Background",side:hn,depthWrite:!1,depthTest:!1})));const y=this._backgroundBox,p=y.material;let f=!1;const E=t.background;E?E.isColor&&(p.color.copy(E),t.background=null,f=!0):(p.color.copy(Ns),f=!0);for(let A=0;A<6;A++){const _=A%3;_===0?(u.up.set(0,l[A],0),u.position.set(a.x,a.y,a.z),u.lookAt(a.x+h[A],a.y,a.z)):_===1?(u.up.set(0,0,l[A]),u.position.set(a.x,a.y,a.z),u.lookAt(a.x,a.y+h[A],a.z)):(u.up.set(0,l[A],0),u.position.set(a.x,a.y,a.z),u.lookAt(a.x,a.y,a.z+h[A]));const S=this._cubeSize;Pi(r,_*S,A>2?S:0,S,S),d.setRenderTarget(r),f&&d.render(y,u),d.render(t,u)}d.toneMapping=m,d.autoClear=c,t.background=E}_textureToCubeUV(t,n){const i=this._renderer,r=t.mapping===Mr||t.mapping===Gi;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Bs()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Os());const a=r?this._cubemapMaterial:this._equirectMaterial,o=this._lodMeshes[0];o.material=a;const s=a.uniforms;s.envMap.value=t;const u=this._cubeSize;Pi(n,0,0,3*u,2*u),i.setRenderTarget(n),i.render(o,nr)}_applyPMREM(t){const n=this._renderer,i=n.autoClear;n.autoClear=!1;const r=this._lodMeshes.length;for(let a=1;a<r;a++)this._applyGGXFilter(t,a-1,a);n.autoClear=i}_applyGGXFilter(t,n,i){const r=this._renderer,a=this._pingPongRenderTarget,o=this._ggxMaterial,s=this._lodMeshes[i];s.material=o;const u=o.uniforms,l=i/(this._lodMeshes.length-1),h=n/(this._lodMeshes.length-1),d=Math.sqrt(l*l-h*h),c=0+l*1.25,m=d*c,{_lodMax:v}=this,y=this._sizeLods[i],p=3*y*(i>v-si?i-v+si:0),f=4*(this._cubeSize-y);u.envMap.value=t.texture,u.roughness.value=m,u.mipInt.value=v-n,Pi(a,p,f,3*y,2*y),r.setRenderTarget(a),r.render(s,nr),u.envMap.value=a.texture,u.roughness.value=0,u.mipInt.value=v-i,Pi(t,p,f,3*y,2*y),r.setRenderTarget(t),r.render(s,nr)}_blur(t,n,i,r,a){const o=this._pingPongRenderTarget;this._halfBlur(t,o,n,i,r,"latitudinal",a),this._halfBlur(o,t,i,i,r,"longitudinal",a)}_halfBlur(t,n,i,r,a,o,s){const u=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&Mt("blur direction must be either latitudinal or longitudinal!");const h=3,d=this._lodMeshes[r];d.material=l;const c=l.uniforms,m=this._sizeLods[i]-1,v=isFinite(a)?Math.PI/(2*m):2*Math.PI/(2*_i-1),y=a/v,p=isFinite(a)?1+Math.floor(h*y):_i;p>_i&&_t(`sigmaRadians, ${a}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${_i}`);const f=[];let E=0;for(let C=0;C<_i;++C){const x=C/y,R=Math.exp(-x*x/2);f.push(R),C===0?E+=R:C<p&&(E+=2*R)}for(let C=0;C<f.length;C++)f[C]=f[C]/E;c.envMap.value=t.texture,c.samples.value=p,c.weights.value=f,c.latitudinal.value=o==="latitudinal",s&&(c.poleAxis.value=s);const{_lodMax:A}=this;c.dTheta.value=v,c.mipInt.value=A-i;const _=this._sizeLods[r],S=3*_*(r>A-si?r-A+si:0),b=4*(this._cubeSize-_);Pi(n,S,b,3*_,2*_),u.setRenderTarget(n),u.render(d,nr)}}function Xm(e){const t=[],n=[],i=[];let r=e;const a=e-si+1+Ls.length;for(let o=0;o<a;o++){const s=Math.pow(2,r);t.push(s);let u=1/s;o>e-si?u=Ls[o-e+si-1]:o===0&&(u=0),n.push(u);const l=1/(s-2),h=-l,d=1+l,c=[h,h,d,h,d,d,h,h,d,d,h,d],m=6,v=6,y=3,p=2,f=1,E=new Float32Array(y*v*m),A=new Float32Array(p*v*m),_=new Float32Array(f*v*m);for(let b=0;b<m;b++){const C=b%3*2/3-1,x=b>2?0:-1,R=[C,x,0,C+2/3,x,0,C+2/3,x+1,0,C,x,0,C+2/3,x+1,0,C,x+1,0];E.set(R,y*v*b),A.set(c,p*v*b);const U=[b,b,b,b,b,b];_.set(U,f*v*b)}const S=new fi;S.setAttribute("position",new hr(E,y)),S.setAttribute("uv",new hr(A,p)),S.setAttribute("faceIndex",new hr(_,f)),i.push(new nn(S,null)),r>si&&r--}return{lodMeshes:i,sizeLods:t,sigmas:n}}function Fs(e,t,n){const i=new Un(e,t,n);return i.texture.mapping=ga,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Pi(e,t,n,i,r){e.viewport.set(t,n,i,r),e.scissor.set(t,n,i,r)}function Ym(e,t,n){return new yn({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:km,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Sa(),fragmentShader:`

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
		`,blending:Zn,depthTest:!1,depthWrite:!1})}function $m(e,t,n){const i=new Float32Array(_i),r=new Q(0,1,0);return new yn({name:"SphericalGaussianBlur",defines:{n:_i,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:Sa(),fragmentShader:`

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
		`,blending:Zn,depthTest:!1,depthWrite:!1})}function Os(){return new yn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Sa(),fragmentShader:`

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
		`,blending:Zn,depthTest:!1,depthWrite:!1})}function Bs(){return new yn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Sa(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Zn,depthTest:!1,depthWrite:!1})}function Sa(){return`

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
	`}class jc extends Un{constructor(t=1,n={}){super(t,t,n),this.isWebGLCubeRenderTarget=!0;const i={width:t,height:t,depth:1},r=[i,i,i,i,i,i];this.texture=new Ac(r),this._setTextureOptions(n),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,n){this.texture.type=n.type,this.texture.colorSpace=n.colorSpace,this.texture.generateMipmaps=n.generateMipmaps,this.texture.minFilter=n.minFilter,this.texture.magFilter=n.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new Eo(5,5,5),a=new yn({name:"CubemapFromEquirect",uniforms:io(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:hn,blending:Zn});a.uniforms.tEquirect.value=n;const o=new nn(r,a),s=n.minFilter;return n.minFilter===Ii&&(n.minFilter=pn),new Jd(1,10,this).update(t,o),n.minFilter=s,o.geometry.dispose(),o.material.dispose(),this}clear(t,n=!0,i=!0,r=!0){const a=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(n,i,r);t.setRenderTarget(a)}}function Km(e){let t=new WeakMap,n=new WeakMap,i=null;function r(c,m=!1){return c==null?null:m?o(c):a(c)}function a(c){if(c&&c.isTexture){const m=c.mapping;if(m===Ca||m===Ia)if(t.has(c)){const v=t.get(c).texture;return s(v,c.mapping)}else{const v=c.image;if(v&&v.height>0){const y=new jc(v.height);return y.fromEquirectangularTexture(e,c),t.set(c,y),c.addEventListener("dispose",l),s(y.texture,c.mapping)}else return null}}return c}function o(c){if(c&&c.isTexture){const m=c.mapping,v=m===Ca||m===Ia,y=m===Mr||m===Gi;if(v||y){let p=n.get(c);const f=p!==void 0?p.texture.pmremVersion:0;if(c.isRenderTargetTexture&&c.pmremVersion!==f)return i===null&&(i=new Us(e)),p=v?i.fromEquirectangular(c,p):i.fromCubemap(c,p),p.texture.pmremVersion=c.pmremVersion,n.set(c,p),p.texture;if(p!==void 0)return p.texture;{const E=c.image;return v&&E&&E.height>0||y&&E&&u(E)?(i===null&&(i=new Us(e)),p=v?i.fromEquirectangular(c):i.fromCubemap(c),p.texture.pmremVersion=c.pmremVersion,n.set(c,p),c.addEventListener("dispose",h),p.texture):null}}}return c}function s(c,m){return m===Ca?c.mapping=Mr:m===Ia&&(c.mapping=Gi),c}function u(c){let m=0;const v=6;for(let y=0;y<v;y++)c[y]!==void 0&&m++;return m===v}function l(c){const m=c.target;m.removeEventListener("dispose",l);const v=t.get(m);v!==void 0&&(t.delete(m),v.dispose())}function h(c){const m=c.target;m.removeEventListener("dispose",h);const v=n.get(m);v!==void 0&&(n.delete(m),v.dispose())}function d(){t=new WeakMap,n=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:r,dispose:d}}function qm(e){const t={};function n(i){if(t[i]!==void 0)return t[i];const r=e.getExtension(i);return t[i]=r,r}return{has:function(i){return n(i)!==null},init:function(){n("EXT_color_buffer_float"),n("WEBGL_clip_cull_distance"),n("OES_texture_float_linear"),n("EXT_color_buffer_half_float"),n("WEBGL_multisampled_render_to_texture"),n("WEBGL_render_shared_exponent")},get:function(i){const r=n(i);return r===null&&id("WebGLRenderer: "+i+" extension not supported."),r}}}function jm(e,t,n,i){const r={},a=new WeakMap;function o(d){const c=d.target;c.index!==null&&t.remove(c.index);for(const v in c.attributes)t.remove(c.attributes[v]);c.removeEventListener("dispose",o),delete r[c.id];const m=a.get(c);m&&(t.remove(m),a.delete(c)),i.releaseStatesOfGeometry(c),c.isInstancedBufferGeometry===!0&&delete c._maxInstanceCount,n.memory.geometries--}function s(d,c){return r[c.id]===!0||(c.addEventListener("dispose",o),r[c.id]=!0,n.memory.geometries++),c}function u(d){const c=d.attributes;for(const m in c)t.update(c[m],e.ARRAY_BUFFER)}function l(d){const c=[],m=d.index,v=d.attributes.position;let y=0;if(v===void 0)return;if(m!==null){const E=m.array;y=m.version;for(let A=0,_=E.length;A<_;A+=3){const S=E[A+0],b=E[A+1],C=E[A+2];c.push(S,b,b,C,C,S)}}else{const E=v.array;y=v.version;for(let A=0,_=E.length/3-1;A<_;A+=3){const S=A+0,b=A+1,C=A+2;c.push(S,b,b,C,C,S)}}const p=new(v.count>=65535?Qd:ef)(c,1);p.version=y;const f=a.get(d);f&&t.remove(f),a.set(d,p)}function h(d){const c=a.get(d);if(c){const m=d.index;m!==null&&c.version<m.version&&l(d)}else l(d);return a.get(d)}return{get:s,update:u,getWireframeAttribute:h}}function Zm(e,t,n){let i;function r(d){i=d}let a,o;function s(d){a=d.type,o=d.bytesPerElement}function u(d,c){e.drawElements(i,c,a,d*o),n.update(c,i,1)}function l(d,c,m){m!==0&&(e.drawElementsInstanced(i,c,a,d*o,m),n.update(c,i,m))}function h(d,c,m){if(m===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,c,0,a,d,0,m);let y=0;for(let p=0;p<m;p++)y+=c[p];n.update(y,i,1)}this.setMode=r,this.setIndex=s,this.render=u,this.renderInstances=l,this.renderMultiDraw=h}function Jm(e){const t={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function i(a,o,s){switch(n.calls++,o){case e.TRIANGLES:n.triangles+=s*(a/3);break;case e.LINES:n.lines+=s*(a/2);break;case e.LINE_STRIP:n.lines+=s*(a-1);break;case e.LINE_LOOP:n.lines+=s*a;break;case e.POINTS:n.points+=s*a;break;default:Mt("WebGLInfo: Unknown draw mode:",o);break}}function r(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:t,render:n,programs:null,autoReset:!0,reset:r,update:i}}function Qm(e,t,n){const i=new WeakMap,r=new zt;function a(o,s,u){const l=o.morphTargetInfluences,h=s.morphAttributes.position||s.morphAttributes.normal||s.morphAttributes.color,d=h!==void 0?h.length:0;let c=i.get(s);if(c===void 0||c.count!==d){let R=function(){C.dispose(),i.delete(s),s.removeEventListener("dispose",R)};c!==void 0&&c.texture.dispose();const m=s.morphAttributes.position!==void 0,v=s.morphAttributes.normal!==void 0,y=s.morphAttributes.color!==void 0,p=s.morphAttributes.position||[],f=s.morphAttributes.normal||[],E=s.morphAttributes.color||[];let A=0;m===!0&&(A=1),v===!0&&(A=2),y===!0&&(A=3);let _=s.attributes.position.count*A,S=1;_>t.maxTextureSize&&(S=Math.ceil(_/t.maxTextureSize),_=t.maxTextureSize);const b=new Float32Array(_*S*4*d),C=new yc(b,_,S,d);C.type=oi,C.needsUpdate=!0;const x=A*4;for(let U=0;U<d;U++){const D=p[U],B=f[U],Z=E[U],k=_*S*4*U;for(let I=0;I<D.count;I++){const W=I*x;m===!0&&(r.fromBufferAttribute(D,I),b[k+W+0]=r.x,b[k+W+1]=r.y,b[k+W+2]=r.z,b[k+W+3]=0),v===!0&&(r.fromBufferAttribute(B,I),b[k+W+4]=r.x,b[k+W+5]=r.y,b[k+W+6]=r.z,b[k+W+7]=0),y===!0&&(r.fromBufferAttribute(Z,I),b[k+W+8]=r.x,b[k+W+9]=r.y,b[k+W+10]=r.z,b[k+W+11]=Z.itemSize===4?r.w:1)}}c={count:d,texture:C,size:new Ke(_,S)},i.set(s,c),s.addEventListener("dispose",R)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)u.getUniforms().setValue(e,"morphTexture",o.morphTexture,n);else{let m=0;for(let y=0;y<l.length;y++)m+=l[y];const v=s.morphTargetsRelative?1:1-m;u.getUniforms().setValue(e,"morphTargetBaseInfluence",v),u.getUniforms().setValue(e,"morphTargetInfluences",l)}u.getUniforms().setValue(e,"morphTargetsTexture",c.texture,n),u.getUniforms().setValue(e,"morphTargetsTextureSize",c.size)}return{update:a}}function eg(e,t,n,i,r){let a=new WeakMap;function o(l){const h=r.render.frame,d=l.geometry,c=t.get(l,d);if(a.get(c)!==h&&(t.update(c),a.set(c,h)),l.isInstancedMesh&&(l.hasEventListener("dispose",u)===!1&&l.addEventListener("dispose",u),a.get(l)!==h&&(n.update(l.instanceMatrix,e.ARRAY_BUFFER),l.instanceColor!==null&&n.update(l.instanceColor,e.ARRAY_BUFFER),a.set(l,h))),l.isSkinnedMesh){const m=l.skeleton;a.get(m)!==h&&(m.update(),a.set(m,h))}return c}function s(){a=new WeakMap}function u(l){const h=l.target;h.removeEventListener("dispose",u),i.releaseStatesOfObject(h),n.remove(h.instanceMatrix),h.instanceColor!==null&&n.remove(h.instanceColor)}return{update:o,dispose:s}}const tg={[Dc]:"LINEAR_TONE_MAPPING",[Ic]:"REINHARD_TONE_MAPPING",[Cc]:"CINEON_TONE_MAPPING",[Rc]:"ACES_FILMIC_TONE_MAPPING",[wc]:"AGX_TONE_MAPPING",[Pc]:"NEUTRAL_TONE_MAPPING",[Tc]:"CUSTOM_TONE_MAPPING"};function ng(e,t,n,i,r,a){const o=new Un(t,n,{type:e,depthBuffer:r,stencilBuffer:a,samples:i?4:0,depthTexture:r?new vr(t,n):void 0}),s=new Un(t,n,{type:di,depthBuffer:!1,stencilBuffer:!1}),u=new fi;u.setAttribute("position",new Sr([-1,3,0,-1,-1,0,3,-1,0],3)),u.setAttribute("uv",new Sr([0,2,0,0,2,0],2));const l=new Ju({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),h=new nn(u,l),d=new mc(-1,1,1,-1,0,1);let c=null,m=null,v=!1,y,p=null,f=[],E=!1;this.setSize=function(A,_){o.setSize(A,_),s.setSize(A,_);for(let S=0;S<f.length;S++){const b=f[S];b.setSize&&b.setSize(A,_)}},this.setEffects=function(A){f=A,E=f.length>0&&f[0].isRenderPass===!0;const _=o.width,S=o.height;for(let b=0;b<f.length;b++){const C=f[b];C.setSize&&C.setSize(_,S)}},this.begin=function(A,_){if(v||A.toneMapping===Nn&&f.length===0)return!1;if(p=_,_!==null){const S=_.width,b=_.height;(o.width!==S||o.height!==b)&&this.setSize(S,b)}return E===!1&&A.setRenderTarget(o),y=A.toneMapping,A.toneMapping=Nn,!0},this.hasRenderPass=function(){return E},this.end=function(A,_){A.toneMapping=y,v=!0;let S=o,b=s;for(let C=0;C<f.length;C++){const x=f[C];if(x.enabled!==!1&&(x.render(A,b,S,_),x.needsSwap!==!1)){const R=S;S=b,b=R}}if(c!==A.outputColorSpace||m!==A.toneMapping){c=A.outputColorSpace,m=A.toneMapping,l.defines={},Rt.getTransfer(c)===Et&&(l.defines.SRGB_TRANSFER="");const C=tg[m];C&&(l.defines[C]=""),l.needsUpdate=!0}l.uniforms.tDiffuse.value=S.texture,A.setRenderTarget(p),A.render(h,d),p=null,v=!1},this.isCompositing=function(){return v},this.dispose=function(){o.depthTexture&&o.depthTexture.dispose(),o.dispose(),s.dispose(),u.dispose(),l.dispose()}}const Zc=new lf,ao=new vr(1,1),Jc=new yc,Qc=new nf,eu=new Ac,zs=[],Gs=[],Vs=new Float32Array(16),Hs=new Float32Array(9),ks=new Float32Array(4);function Xi(e,t,n){const i=e[0];if(i<=0||i>0)return e;const r=t*n;let a=zs[r];if(a===void 0&&(a=new Float32Array(r),zs[r]=a),t!==0){i.toArray(a,0);for(let o=1,s=0;o!==t;++o)s+=n,e[o].toArray(a,s)}return a}function Gt(e,t){if(e.length!==t.length)return!1;for(let n=0,i=e.length;n<i;n++)if(e[n]!==t[n])return!1;return!0}function Vt(e,t){for(let n=0,i=t.length;n<i;n++)e[n]=t[n]}function Ea(e,t){let n=Gs[t];n===void 0&&(n=new Int32Array(t),Gs[t]=n);for(let i=0;i!==t;++i)n[i]=e.allocateTextureUnit();return n}function ig(e,t){const n=this.cache;n[0]!==t&&(e.uniform1f(this.addr,t),n[0]=t)}function rg(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2f(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Gt(n,t))return;e.uniform2fv(this.addr,t),Vt(n,t)}}function ag(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3f(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else if(t.r!==void 0)(n[0]!==t.r||n[1]!==t.g||n[2]!==t.b)&&(e.uniform3f(this.addr,t.r,t.g,t.b),n[0]=t.r,n[1]=t.g,n[2]=t.b);else{if(Gt(n,t))return;e.uniform3fv(this.addr,t),Vt(n,t)}}function og(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4f(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Gt(n,t))return;e.uniform4fv(this.addr,t),Vt(n,t)}}function sg(e,t){const n=this.cache,i=t.elements;if(i===void 0){if(Gt(n,t))return;e.uniformMatrix2fv(this.addr,!1,t),Vt(n,t)}else{if(Gt(n,i))return;ks.set(i),e.uniformMatrix2fv(this.addr,!1,ks),Vt(n,i)}}function lg(e,t){const n=this.cache,i=t.elements;if(i===void 0){if(Gt(n,t))return;e.uniformMatrix3fv(this.addr,!1,t),Vt(n,t)}else{if(Gt(n,i))return;Hs.set(i),e.uniformMatrix3fv(this.addr,!1,Hs),Vt(n,i)}}function cg(e,t){const n=this.cache,i=t.elements;if(i===void 0){if(Gt(n,t))return;e.uniformMatrix4fv(this.addr,!1,t),Vt(n,t)}else{if(Gt(n,i))return;Vs.set(i),e.uniformMatrix4fv(this.addr,!1,Vs),Vt(n,i)}}function ug(e,t){const n=this.cache;n[0]!==t&&(e.uniform1i(this.addr,t),n[0]=t)}function dg(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2i(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Gt(n,t))return;e.uniform2iv(this.addr,t),Vt(n,t)}}function fg(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3i(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(Gt(n,t))return;e.uniform3iv(this.addr,t),Vt(n,t)}}function pg(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4i(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Gt(n,t))return;e.uniform4iv(this.addr,t),Vt(n,t)}}function hg(e,t){const n=this.cache;n[0]!==t&&(e.uniform1ui(this.addr,t),n[0]=t)}function mg(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2ui(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Gt(n,t))return;e.uniform2uiv(this.addr,t),Vt(n,t)}}function gg(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3ui(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(Gt(n,t))return;e.uniform3uiv(this.addr,t),Vt(n,t)}}function _g(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4ui(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Gt(n,t))return;e.uniform4uiv(this.addr,t),Vt(n,t)}}function xg(e,t,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(e.uniform1i(this.addr,r),i[0]=r);let a;this.type===e.SAMPLER_2D_SHADOW?(ao.compareFunction=n.isReversedDepthBuffer()?xo:vo,a=ao):a=Zc,n.setTexture2D(t||a,r)}function vg(e,t,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(e.uniform1i(this.addr,r),i[0]=r),n.setTexture3D(t||Qc,r)}function Sg(e,t,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(e.uniform1i(this.addr,r),i[0]=r),n.setTextureCube(t||eu,r)}function Eg(e,t,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(e.uniform1i(this.addr,r),i[0]=r),n.setTexture2DArray(t||Jc,r)}function Mg(e){switch(e){case 5126:return ig;case 35664:return rg;case 35665:return ag;case 35666:return og;case 35674:return sg;case 35675:return lg;case 35676:return cg;case 5124:case 35670:return ug;case 35667:case 35671:return dg;case 35668:case 35672:return fg;case 35669:case 35673:return pg;case 5125:return hg;case 36294:return mg;case 36295:return gg;case 36296:return _g;case 35678:case 36198:case 36298:case 36306:case 35682:return xg;case 35679:case 36299:case 36307:return vg;case 35680:case 36300:case 36308:case 36293:return Sg;case 36289:case 36303:case 36311:case 36292:return Eg}}function yg(e,t){e.uniform1fv(this.addr,t)}function bg(e,t){const n=Xi(t,this.size,2);e.uniform2fv(this.addr,n)}function Ag(e,t){const n=Xi(t,this.size,3);e.uniform3fv(this.addr,n)}function Tg(e,t){const n=Xi(t,this.size,4);e.uniform4fv(this.addr,n)}function Pg(e,t){const n=Xi(t,this.size,4);e.uniformMatrix2fv(this.addr,!1,n)}function wg(e,t){const n=Xi(t,this.size,9);e.uniformMatrix3fv(this.addr,!1,n)}function Rg(e,t){const n=Xi(t,this.size,16);e.uniformMatrix4fv(this.addr,!1,n)}function Cg(e,t){e.uniform1iv(this.addr,t)}function Ig(e,t){e.uniform2iv(this.addr,t)}function Dg(e,t){e.uniform3iv(this.addr,t)}function Lg(e,t){e.uniform4iv(this.addr,t)}function Ng(e,t){e.uniform1uiv(this.addr,t)}function Ug(e,t){e.uniform2uiv(this.addr,t)}function Fg(e,t){e.uniform3uiv(this.addr,t)}function Og(e,t){e.uniform4uiv(this.addr,t)}function Bg(e,t,n){const i=this.cache,r=t.length,a=Ea(n,r);Gt(i,a)||(e.uniform1iv(this.addr,a),Vt(i,a));let o;this.type===e.SAMPLER_2D_SHADOW?o=ao:o=Zc;for(let s=0;s!==r;++s)n.setTexture2D(t[s]||o,a[s])}function zg(e,t,n){const i=this.cache,r=t.length,a=Ea(n,r);Gt(i,a)||(e.uniform1iv(this.addr,a),Vt(i,a));for(let o=0;o!==r;++o)n.setTexture3D(t[o]||Qc,a[o])}function Gg(e,t,n){const i=this.cache,r=t.length,a=Ea(n,r);Gt(i,a)||(e.uniform1iv(this.addr,a),Vt(i,a));for(let o=0;o!==r;++o)n.setTextureCube(t[o]||eu,a[o])}function Vg(e,t,n){const i=this.cache,r=t.length,a=Ea(n,r);Gt(i,a)||(e.uniform1iv(this.addr,a),Vt(i,a));for(let o=0;o!==r;++o)n.setTexture2DArray(t[o]||Jc,a[o])}function Hg(e){switch(e){case 5126:return yg;case 35664:return bg;case 35665:return Ag;case 35666:return Tg;case 35674:return Pg;case 35675:return wg;case 35676:return Rg;case 5124:case 35670:return Cg;case 35667:case 35671:return Ig;case 35668:case 35672:return Dg;case 35669:case 35673:return Lg;case 5125:return Ng;case 36294:return Ug;case 36295:return Fg;case 36296:return Og;case 35678:case 36198:case 36298:case 36306:case 35682:return Bg;case 35679:case 36299:case 36307:return zg;case 35680:case 36300:case 36308:case 36293:return Gg;case 36289:case 36303:case 36311:case 36292:return Vg}}class kg{constructor(t,n,i){this.id=t,this.addr=i,this.cache=[],this.type=n.type,this.setValue=Mg(n.type)}}class Wg{constructor(t,n,i){this.id=t,this.addr=i,this.cache=[],this.type=n.type,this.size=n.size,this.setValue=Hg(n.type)}}class Xg{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,n,i){const r=this.seq;for(let a=0,o=r.length;a!==o;++a){const s=r[a];s.setValue(t,n[s.id],i)}}}const Ba=/(\w+)(\])?(\[|\.)?/g;function Ws(e,t){e.seq.push(t),e.map[t.id]=t}function Yg(e,t,n){const i=e.name,r=i.length;for(Ba.lastIndex=0;;){const a=Ba.exec(i),o=Ba.lastIndex;let s=a[1];const u=a[2]==="]",l=a[3];if(u&&(s=s|0),l===void 0||l==="["&&o+2===r){Ws(n,l===void 0?new kg(s,e,t):new Wg(s,e,t));break}else{let d=n.map[s];d===void 0&&(d=new Xg(s),Ws(n,d)),n=d}}}class ta{constructor(t,n){this.seq=[],this.map={};const i=t.getProgramParameter(n,t.ACTIVE_UNIFORMS);for(let o=0;o<i;++o){const s=t.getActiveUniform(n,o),u=t.getUniformLocation(n,s.name);Yg(s,u,this)}const r=[],a=[];for(const o of this.seq)o.type===t.SAMPLER_2D_SHADOW||o.type===t.SAMPLER_CUBE_SHADOW||o.type===t.SAMPLER_2D_ARRAY_SHADOW?r.push(o):a.push(o);r.length>0&&(this.seq=r.concat(a))}setValue(t,n,i,r){const a=this.map[n];a!==void 0&&a.setValue(t,i,r)}setOptional(t,n,i){const r=n[i];r!==void 0&&this.setValue(t,i,r)}static upload(t,n,i,r){for(let a=0,o=n.length;a!==o;++a){const s=n[a],u=i[s.id];u.needsUpdate!==!1&&s.setValue(t,u.value,r)}}static seqWithValue(t,n){const i=[];for(let r=0,a=t.length;r!==a;++r){const o=t[r];o.id in n&&i.push(o)}return i}}function Xs(e,t,n){const i=e.createShader(t);return e.shaderSource(i,n),e.compileShader(i),i}const $g=37297;let Kg=0;function qg(e,t){const n=e.split(`
`),i=[],r=Math.max(t-6,0),a=Math.min(t+6,n.length);for(let o=r;o<a;o++){const s=o+1;i.push(`${s===t?">":" "} ${s}: ${n[o]}`)}return i.join(`
`)}const Ys=new dt;function jg(e){Rt._getMatrix(Ys,Rt.workingColorSpace,e);const t=`mat3( ${Ys.elements.map(n=>n.toFixed(4))} )`;switch(Rt.getTransfer(e)){case Lc:return[t,"LinearTransferOETF"];case Et:return[t,"sRGBTransferOETF"];default:return _t("WebGLProgram: Unsupported color space: ",e),[t,"LinearTransferOETF"]}}function $s(e,t,n){const i=e.getShaderParameter(t,e.COMPILE_STATUS),a=(e.getShaderInfoLog(t)||"").trim();if(i&&a==="")return"";const o=/ERROR: 0:(\d+)/.exec(a);if(o){const s=parseInt(o[1]);return n.toUpperCase()+`

`+a+`

`+qg(e.getShaderSource(t),s)}else return a}function Zg(e,t){const n=jg(t);return[`vec4 ${e}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,"}"].join(`
`)}const Jg={[Dc]:"Linear",[Ic]:"Reinhard",[Cc]:"Cineon",[Rc]:"ACESFilmic",[wc]:"AgX",[Pc]:"Neutral",[Tc]:"Custom"};function Qg(e,t){const n=Jg[t];return n===void 0?(_t("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+e+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+e+"( vec3 color ) { return "+n+"ToneMapping( color ); }"}const kr=new Q;function e_(){Rt.getLuminanceCoefficients(kr);const e=kr.x.toFixed(4),t=kr.y.toFixed(4),n=kr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${e}, ${t}, ${n} );`,"	return dot( weights, rgb );","}"].join(`
`)}function t_(e){return[e.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",e.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(lr).join(`
`)}function n_(e){const t=[];for(const n in e){const i=e[n];i!==!1&&t.push("#define "+n+" "+i)}return t.join(`
`)}function i_(e,t){const n={},i=e.getProgramParameter(t,e.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const a=e.getActiveAttrib(t,r),o=a.name;let s=1;a.type===e.FLOAT_MAT2&&(s=2),a.type===e.FLOAT_MAT3&&(s=3),a.type===e.FLOAT_MAT4&&(s=4),n[o]={type:a.type,location:e.getAttribLocation(t,o),locationSize:s}}return n}function lr(e){return e!==""}function Ks(e,t){const n=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return e.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function qs(e,t){return e.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const r_=/^[ \t]*#include +<([\w\d./]+)>/gm;function oo(e){return e.replace(r_,o_)}const a_=new Map;function o_(e,t){let n=rt[t];if(n===void 0){const i=a_.get(t);if(i!==void 0)n=rt[i],_t('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+t+">")}return oo(n)}const s_=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function js(e){return e.replace(s_,l_)}function l_(e,t,n,i){let r="";for(let a=parseInt(t);a<parseInt(n);a++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+a+" ]").replace(/UNROLLED_LOOP_INDEX/g,a);return r}function Zs(e){let t=`precision ${e.precision} float;
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
#define LOW_PRECISION`),t}const c_={[Qr]:"SHADOWMAP_TYPE_PCF",[ar]:"SHADOWMAP_TYPE_VSM"};function u_(e){return c_[e.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const d_={[Mr]:"ENVMAP_TYPE_CUBE",[Gi]:"ENVMAP_TYPE_CUBE",[ga]:"ENVMAP_TYPE_CUBE_UV"};function f_(e){return e.envMap===!1?"ENVMAP_TYPE_CUBE":d_[e.envMapMode]||"ENVMAP_TYPE_CUBE"}const p_={[Gi]:"ENVMAP_MODE_REFRACTION"};function h_(e){return e.envMap===!1?"ENVMAP_MODE_REFLECTION":p_[e.envMapMode]||"ENVMAP_MODE_REFLECTION"}const m_={[sf]:"ENVMAP_BLENDING_MULTIPLY",[of]:"ENVMAP_BLENDING_MIX",[af]:"ENVMAP_BLENDING_ADD"};function g_(e){return e.envMap===!1?"ENVMAP_BLENDING_NONE":m_[e.combine]||"ENVMAP_BLENDING_NONE"}function __(e){const t=e.envMapCubeUVHeight;if(t===null)return null;const n=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,n),112)),texelHeight:i,maxMip:n}}function x_(e,t,n,i){const r=e.getContext(),a=n.defines;let o=n.vertexShader,s=n.fragmentShader;const u=u_(n),l=f_(n),h=h_(n),d=g_(n),c=__(n),m=t_(n),v=n_(a),y=r.createProgram();let p,f,E=n.glslVersion?"#version "+n.glslVersion+`
`:"";n.isRawShaderMaterial?(p=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,v].filter(lr).join(`
`),p.length>0&&(p+=`
`),f=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,v].filter(lr).join(`
`),f.length>0&&(f+=`
`)):(p=[Zs(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,v,n.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",n.batching?"#define USE_BATCHING":"",n.batchingColor?"#define USE_BATCHING_COLOR":"",n.instancing?"#define USE_INSTANCING":"",n.instancingColor?"#define USE_INSTANCING_COLOR":"",n.instancingMorph?"#define USE_INSTANCING_MORPH":"",n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.map?"#define USE_MAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+h:"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.displacementMap?"#define USE_DISPLACEMENTMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.mapUv?"#define MAP_UV "+n.mapUv:"",n.alphaMapUv?"#define ALPHAMAP_UV "+n.alphaMapUv:"",n.lightMapUv?"#define LIGHTMAP_UV "+n.lightMapUv:"",n.aoMapUv?"#define AOMAP_UV "+n.aoMapUv:"",n.emissiveMapUv?"#define EMISSIVEMAP_UV "+n.emissiveMapUv:"",n.bumpMapUv?"#define BUMPMAP_UV "+n.bumpMapUv:"",n.normalMapUv?"#define NORMALMAP_UV "+n.normalMapUv:"",n.displacementMapUv?"#define DISPLACEMENTMAP_UV "+n.displacementMapUv:"",n.metalnessMapUv?"#define METALNESSMAP_UV "+n.metalnessMapUv:"",n.roughnessMapUv?"#define ROUGHNESSMAP_UV "+n.roughnessMapUv:"",n.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+n.anisotropyMapUv:"",n.clearcoatMapUv?"#define CLEARCOATMAP_UV "+n.clearcoatMapUv:"",n.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+n.clearcoatNormalMapUv:"",n.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+n.clearcoatRoughnessMapUv:"",n.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+n.iridescenceMapUv:"",n.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+n.iridescenceThicknessMapUv:"",n.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+n.sheenColorMapUv:"",n.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+n.sheenRoughnessMapUv:"",n.specularMapUv?"#define SPECULARMAP_UV "+n.specularMapUv:"",n.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+n.specularColorMapUv:"",n.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+n.specularIntensityMapUv:"",n.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+n.transmissionMapUv:"",n.thicknessMapUv?"#define THICKNESSMAP_UV "+n.thicknessMapUv:"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexNormals?"#define HAS_NORMAL":"",n.vertexColors?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.flatShading?"#define FLAT_SHADED":"",n.skinning?"#define USE_SKINNING":"",n.morphTargets?"#define USE_MORPHTARGETS":"",n.morphNormals&&n.flatShading===!1?"#define USE_MORPHNORMALS":"",n.morphColors?"#define USE_MORPHCOLORS":"",n.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+n.morphTextureStride:"",n.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+n.morphTargetsCount:"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+u:"",n.sizeAttenuation?"#define USE_SIZEATTENUATION":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",n.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(lr).join(`
`),f=[Zs(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,v,n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",n.map?"#define USE_MAP":"",n.matcap?"#define USE_MATCAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+l:"",n.envMap?"#define "+h:"",n.envMap?"#define "+d:"",c?"#define CUBEUV_TEXEL_WIDTH "+c.texelWidth:"",c?"#define CUBEUV_TEXEL_HEIGHT "+c.texelHeight:"",c?"#define CUBEUV_MAX_MIP "+c.maxMip+".0":"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoat?"#define USE_CLEARCOAT":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.dispersion?"#define USE_DISPERSION":"",n.iridescence?"#define USE_IRIDESCENCE":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaTest?"#define USE_ALPHATEST":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.sheen?"#define USE_SHEEN":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors||n.instancingColor?"#define USE_COLOR":"",n.vertexAlphas||n.batchingColor?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.gradientMap?"#define USE_GRADIENTMAP":"",n.flatShading?"#define FLAT_SHADED":"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+u:"",n.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",n.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",n.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",n.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",n.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",n.toneMapping!==Nn?"#define TONE_MAPPING":"",n.toneMapping!==Nn?rt.tonemapping_pars_fragment:"",n.toneMapping!==Nn?Qg("toneMapping",n.toneMapping):"",n.dithering?"#define DITHERING":"",n.opaque?"#define OPAQUE":"",rt.colorspace_pars_fragment,Zg("linearToOutputTexel",n.outputColorSpace),e_(),n.useDepthPacking?"#define DEPTH_PACKING "+n.depthPacking:"",`
`].filter(lr).join(`
`)),o=oo(o),o=Ks(o,n),o=qs(o,n),s=oo(s),s=Ks(s,n),s=qs(s,n),o=js(o),s=js(s),n.isRawShaderMaterial!==!0&&(E=`#version 300 es
`,p=[m,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,f=["#define varying in",n.glslVersion===Ps?"":"layout(location = 0) out highp vec4 pc_fragColor;",n.glslVersion===Ps?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);const A=E+p+o,_=E+f+s,S=Xs(r,r.VERTEX_SHADER,A),b=Xs(r,r.FRAGMENT_SHADER,_);r.attachShader(y,S),r.attachShader(y,b),n.index0AttributeName!==void 0?r.bindAttribLocation(y,0,n.index0AttributeName):n.hasPositionAttribute===!0&&r.bindAttribLocation(y,0,"position"),r.linkProgram(y);function C(D){if(e.debug.checkShaderErrors){const B=r.getProgramInfoLog(y)||"",Z=r.getShaderInfoLog(S)||"",k=r.getShaderInfoLog(b)||"",I=B.trim(),W=Z.trim(),L=k.trim();let H=!0,ee=!0;if(r.getProgramParameter(y,r.LINK_STATUS)===!1)if(H=!1,typeof e.debug.onShaderError=="function")e.debug.onShaderError(r,y,S,b);else{const fe=$s(r,S,"vertex"),ce=$s(r,b,"fragment");Mt("WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(y,r.VALIDATE_STATUS)+`

Material Name: `+D.name+`
Material Type: `+D.type+`

Program Info Log: `+I+`
`+fe+`
`+ce)}else I!==""?_t("WebGLProgram: Program Info Log:",I):(W===""||L==="")&&(ee=!1);ee&&(D.diagnostics={runnable:H,programLog:I,vertexShader:{log:W,prefix:p},fragmentShader:{log:L,prefix:f}})}r.deleteShader(S),r.deleteShader(b),x=new ta(r,y),R=i_(r,y)}let x;this.getUniforms=function(){return x===void 0&&C(this),x};let R;this.getAttributes=function(){return R===void 0&&C(this),R};let U=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return U===!1&&(U=r.getProgramParameter(y,$g)),U},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(y),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=Kg++,this.cacheKey=t,this.usedTimes=1,this.program=y,this.vertexShader=S,this.fragmentShader=b,this}let v_=0;class S_{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t,n,i){const r=this._getShaderCacheForMaterial(t);return r.has(n)===!1&&(r.add(n),n.usedTimes++),r.has(i)===!1&&(r.add(i),i.usedTimes++),this}remove(t){const n=this.materialCache.get(t);for(const i of n)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderStage(t){return this._getShaderStage(t.vertexShader)}getFragmentShaderStage(t){return this._getShaderStage(t.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const n=this.materialCache;let i=n.get(t);return i===void 0&&(i=new Set,n.set(t,i)),i}_getShaderStage(t){const n=this.shaderCache;let i=n.get(t);return i===void 0&&(i=new E_(t),n.set(t,i)),i}}class E_{constructor(t){this.id=v_++,this.code=t,this.usedTimes=0}}function M_(e){return e===Bi||e===to||e===no}function y_(e,t,n,i,r,a){const o=new tf,s=new S_,u=new Set,l=[],h=new Map,d=i.logarithmicDepthBuffer;let c=i.precision;const m={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(x){return u.add(x),x===0?"uv":`uv${x}`}function y(x,R,U,D,B,Z){const k=D.fog,I=B.geometry,W=x.isMeshStandardMaterial||x.isMeshLambertMaterial||x.isMeshPhongMaterial?D.environment:null,L=x.isMeshStandardMaterial||x.isMeshLambertMaterial&&!x.envMap||x.isMeshPhongMaterial&&!x.envMap,H=t.get(x.envMap||W,L),ee=H&&H.mapping===ga?H.image.height:null,fe=m[x.type];x.precision!==null&&(c=i.getMaxPrecision(x.precision),c!==x.precision&&_t("WebGLProgram.getParameters:",x.precision,"not supported, using",c,"instead."));const ce=I.morphAttributes.position||I.morphAttributes.normal||I.morphAttributes.color,pe=ce!==void 0?ce.length:0;let He=0;I.morphAttributes.position!==void 0&&(He=1),I.morphAttributes.normal!==void 0&&(He=2),I.morphAttributes.color!==void 0&&(He=3);let Ge,Ie,N,ne;if(fe){const Be=ln[fe];Ge=Be.vertexShader,Ie=Be.fragmentShader}else{Ge=x.vertexShader,Ie=x.fragmentShader;const Be=s.getVertexShaderStage(x),At=s.getFragmentShaderStage(x);s.update(x,Be,At),N=Be.id,ne=At.id}const ae=e.getRenderTarget(),q=e.state.buffers.depth.getReversed(),ue=B.isInstancedMesh===!0,se=B.isBatchedMesh===!0,Ee=!!x.map,z=!!x.matcap,re=!!H,de=!!x.aoMap,me=!!x.lightMap,Ye=!!x.bumpMap&&x.wireframe===!1,Fe=!!x.normalMap,et=!!x.displacementMap,at=!!x.emissiveMap,ut=!!x.metalnessMap,pt=!!x.roughnessMap,P=x.anisotropy>0,De=x.clearcoat>0,Pe=x.dispersion>0,T=x.iridescence>0,g=x.sheen>0,V=x.transmission>0,Y=P&&!!x.anisotropyMap,X=De&&!!x.clearcoatMap,he=De&&!!x.clearcoatNormalMap,Me=De&&!!x.clearcoatRoughnessMap,J=T&&!!x.iridescenceMap,te=T&&!!x.iridescenceThicknessMap,ge=g&&!!x.sheenColorMap,Oe=g&&!!x.sheenRoughnessMap,xe=!!x.specularMap,Ae=!!x.specularColorMap,Ue=!!x.specularIntensityMap,$e=V&&!!x.transmissionMap,Je=V&&!!x.thicknessMap,O=!!x.gradientMap,ve=!!x.alphaMap,ie=x.alphaTest>0,Se=!!x.alphaHash,Re=!!x.extensions;let le=Nn;x.toneMapped&&(ae===null||ae.isXRRenderTarget===!0)&&(le=e.toneMapping);const Ve={shaderID:fe,shaderType:x.type,shaderName:x.name,vertexShader:Ge,fragmentShader:Ie,defines:x.defines,customVertexShaderID:N,customFragmentShaderID:ne,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:c,batching:se,batchingColor:se&&B._colorsTexture!==null,instancing:ue,instancingColor:ue&&B.instanceColor!==null,instancingMorph:ue&&B.morphTexture!==null,outputColorSpace:ae===null?e.outputColorSpace:ae.isXRRenderTarget===!0?ae.texture.colorSpace:Rt.workingColorSpace,alphaToCoverage:!!x.alphaToCoverage,map:Ee,matcap:z,envMap:re,envMapMode:re&&H.mapping,envMapCubeUVHeight:ee,aoMap:de,lightMap:me,bumpMap:Ye,normalMap:Fe,displacementMap:et,emissiveMap:at,normalMapObjectSpace:Fe&&x.normalMapType===Zd,normalMapTangentSpace:Fe&&x.normalMapType===As,packedNormalMap:Fe&&x.normalMapType===As&&M_(x.normalMap.format),metalnessMap:ut,roughnessMap:pt,anisotropy:P,anisotropyMap:Y,clearcoat:De,clearcoatMap:X,clearcoatNormalMap:he,clearcoatRoughnessMap:Me,dispersion:Pe,iridescence:T,iridescenceMap:J,iridescenceThicknessMap:te,sheen:g,sheenColorMap:ge,sheenRoughnessMap:Oe,specularMap:xe,specularColorMap:Ae,specularIntensityMap:Ue,transmission:V,transmissionMap:$e,thicknessMap:Je,gradientMap:O,opaque:x.transparent===!1&&x.blending===ea&&x.alphaToCoverage===!1,alphaMap:ve,alphaTest:ie,alphaHash:Se,combine:x.combine,mapUv:Ee&&v(x.map.channel),aoMapUv:de&&v(x.aoMap.channel),lightMapUv:me&&v(x.lightMap.channel),bumpMapUv:Ye&&v(x.bumpMap.channel),normalMapUv:Fe&&v(x.normalMap.channel),displacementMapUv:et&&v(x.displacementMap.channel),emissiveMapUv:at&&v(x.emissiveMap.channel),metalnessMapUv:ut&&v(x.metalnessMap.channel),roughnessMapUv:pt&&v(x.roughnessMap.channel),anisotropyMapUv:Y&&v(x.anisotropyMap.channel),clearcoatMapUv:X&&v(x.clearcoatMap.channel),clearcoatNormalMapUv:he&&v(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Me&&v(x.clearcoatRoughnessMap.channel),iridescenceMapUv:J&&v(x.iridescenceMap.channel),iridescenceThicknessMapUv:te&&v(x.iridescenceThicknessMap.channel),sheenColorMapUv:ge&&v(x.sheenColorMap.channel),sheenRoughnessMapUv:Oe&&v(x.sheenRoughnessMap.channel),specularMapUv:xe&&v(x.specularMap.channel),specularColorMapUv:Ae&&v(x.specularColorMap.channel),specularIntensityMapUv:Ue&&v(x.specularIntensityMap.channel),transmissionMapUv:$e&&v(x.transmissionMap.channel),thicknessMapUv:Je&&v(x.thicknessMap.channel),alphaMapUv:ve&&v(x.alphaMap.channel),vertexTangents:!!I.attributes.tangent&&(Fe||P),vertexNormals:!!I.attributes.normal,vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!I.attributes.color&&I.attributes.color.itemSize===4,pointsUvs:B.isPoints===!0&&!!I.attributes.uv&&(Ee||ve),fog:!!k,useFog:x.fog===!0,fogExp2:!!k&&k.isFogExp2,flatShading:x.wireframe===!1&&(x.flatShading===!0||I.attributes.normal===void 0&&Fe===!1&&(x.isMeshLambertMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isMeshPhysicalMaterial)),sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:q,skinning:B.isSkinnedMesh===!0,hasPositionAttribute:I.attributes.position!==void 0,morphTargets:I.morphAttributes.position!==void 0,morphNormals:I.morphAttributes.normal!==void 0,morphColors:I.morphAttributes.color!==void 0,morphTargetsCount:pe,morphTextureStride:He,numDirLights:R.directional.length,numPointLights:R.point.length,numSpotLights:R.spot.length,numSpotLightMaps:R.spotLightMap.length,numRectAreaLights:R.rectArea.length,numHemiLights:R.hemi.length,numDirLightShadows:R.directionalShadowMap.length,numPointLightShadows:R.pointShadowMap.length,numSpotLightShadows:R.spotShadowMap.length,numSpotLightShadowsWithMaps:R.numSpotLightShadowsWithMaps,numLightProbes:R.numLightProbes,numLightProbeGrids:Z.length,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:x.dithering,shadowMapEnabled:e.shadowMap.enabled&&U.length>0,shadowMapType:e.shadowMap.type,toneMapping:le,decodeVideoTexture:Ee&&x.map.isVideoTexture===!0&&Rt.getTransfer(x.map.colorSpace)===Et,decodeVideoTextureEmissive:at&&x.emissiveMap.isVideoTexture===!0&&Rt.getTransfer(x.emissiveMap.colorSpace)===Et,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===cn,flipSided:x.side===hn,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionClipCullDistance:Re&&x.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Re&&x.extensions.multiDraw===!0||se)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:x.customProgramCacheKey()};return Ve.vertexUv1s=u.has(1),Ve.vertexUv2s=u.has(2),Ve.vertexUv3s=u.has(3),u.clear(),Ve}function p(x){const R=[];if(x.shaderID?R.push(x.shaderID):(R.push(x.customVertexShaderID),R.push(x.customFragmentShaderID)),x.defines!==void 0)for(const U in x.defines)R.push(U),R.push(x.defines[U]);return x.isRawShaderMaterial===!1&&(f(R,x),E(R,x),R.push(e.outputColorSpace)),R.push(x.customProgramCacheKey),R.join()}function f(x,R){x.push(R.precision),x.push(R.outputColorSpace),x.push(R.envMapMode),x.push(R.envMapCubeUVHeight),x.push(R.mapUv),x.push(R.alphaMapUv),x.push(R.lightMapUv),x.push(R.aoMapUv),x.push(R.bumpMapUv),x.push(R.normalMapUv),x.push(R.displacementMapUv),x.push(R.emissiveMapUv),x.push(R.metalnessMapUv),x.push(R.roughnessMapUv),x.push(R.anisotropyMapUv),x.push(R.clearcoatMapUv),x.push(R.clearcoatNormalMapUv),x.push(R.clearcoatRoughnessMapUv),x.push(R.iridescenceMapUv),x.push(R.iridescenceThicknessMapUv),x.push(R.sheenColorMapUv),x.push(R.sheenRoughnessMapUv),x.push(R.specularMapUv),x.push(R.specularColorMapUv),x.push(R.specularIntensityMapUv),x.push(R.transmissionMapUv),x.push(R.thicknessMapUv),x.push(R.combine),x.push(R.fogExp2),x.push(R.sizeAttenuation),x.push(R.morphTargetsCount),x.push(R.morphAttributeCount),x.push(R.numDirLights),x.push(R.numPointLights),x.push(R.numSpotLights),x.push(R.numSpotLightMaps),x.push(R.numHemiLights),x.push(R.numRectAreaLights),x.push(R.numDirLightShadows),x.push(R.numPointLightShadows),x.push(R.numSpotLightShadows),x.push(R.numSpotLightShadowsWithMaps),x.push(R.numLightProbes),x.push(R.shadowMapType),x.push(R.toneMapping),x.push(R.numClippingPlanes),x.push(R.numClipIntersection),x.push(R.depthPacking)}function E(x,R){o.disableAll(),R.instancing&&o.enable(0),R.instancingColor&&o.enable(1),R.instancingMorph&&o.enable(2),R.matcap&&o.enable(3),R.envMap&&o.enable(4),R.normalMapObjectSpace&&o.enable(5),R.normalMapTangentSpace&&o.enable(6),R.clearcoat&&o.enable(7),R.iridescence&&o.enable(8),R.alphaTest&&o.enable(9),R.vertexColors&&o.enable(10),R.vertexAlphas&&o.enable(11),R.vertexUv1s&&o.enable(12),R.vertexUv2s&&o.enable(13),R.vertexUv3s&&o.enable(14),R.vertexTangents&&o.enable(15),R.anisotropy&&o.enable(16),R.alphaHash&&o.enable(17),R.batching&&o.enable(18),R.dispersion&&o.enable(19),R.batchingColor&&o.enable(20),R.gradientMap&&o.enable(21),R.packedNormalMap&&o.enable(22),R.vertexNormals&&o.enable(23),x.push(o.mask),o.disableAll(),R.fog&&o.enable(0),R.useFog&&o.enable(1),R.flatShading&&o.enable(2),R.logarithmicDepthBuffer&&o.enable(3),R.reversedDepthBuffer&&o.enable(4),R.skinning&&o.enable(5),R.morphTargets&&o.enable(6),R.morphNormals&&o.enable(7),R.morphColors&&o.enable(8),R.premultipliedAlpha&&o.enable(9),R.shadowMapEnabled&&o.enable(10),R.doubleSided&&o.enable(11),R.flipSided&&o.enable(12),R.useDepthPacking&&o.enable(13),R.dithering&&o.enable(14),R.transmission&&o.enable(15),R.sheen&&o.enable(16),R.opaque&&o.enable(17),R.pointsUvs&&o.enable(18),R.decodeVideoTexture&&o.enable(19),R.decodeVideoTextureEmissive&&o.enable(20),R.alphaToCoverage&&o.enable(21),R.numLightProbeGrids>0&&o.enable(22),R.hasPositionAttribute&&o.enable(23),x.push(o.mask)}function A(x){const R=m[x.type];let U;if(R){const D=ln[R];U=So.clone(D.uniforms)}else U=x.uniforms;return U}function _(x,R){let U=h.get(R);return U!==void 0?++U.usedTimes:(U=new x_(e,R,x,r),l.push(U),h.set(R,U)),U}function S(x){if(--x.usedTimes===0){const R=l.indexOf(x);l[R]=l[l.length-1],l.pop(),h.delete(x.cacheKey),x.destroy()}}function b(x){s.remove(x)}function C(){s.dispose()}return{getParameters:y,getProgramCacheKey:p,getUniforms:A,acquireProgram:_,releaseProgram:S,releaseShaderCache:b,programs:l,dispose:C}}function b_(){let e=new WeakMap;function t(o){return e.has(o)}function n(o){let s=e.get(o);return s===void 0&&(s={},e.set(o,s)),s}function i(o){e.delete(o)}function r(o,s,u){e.get(o)[s]=u}function a(){e=new WeakMap}return{has:t,get:n,remove:i,update:r,dispose:a}}function A_(e,t){return e.groupOrder!==t.groupOrder?e.groupOrder-t.groupOrder:e.renderOrder!==t.renderOrder?e.renderOrder-t.renderOrder:e.material.id!==t.material.id?e.material.id-t.material.id:e.materialVariant!==t.materialVariant?e.materialVariant-t.materialVariant:e.z!==t.z?e.z-t.z:e.id-t.id}function Js(e,t){return e.groupOrder!==t.groupOrder?e.groupOrder-t.groupOrder:e.renderOrder!==t.renderOrder?e.renderOrder-t.renderOrder:e.z!==t.z?t.z-e.z:e.id-t.id}function Qs(){const e=[];let t=0;const n=[],i=[],r=[];function a(){t=0,n.length=0,i.length=0,r.length=0}function o(c){let m=0;return c.isInstancedMesh&&(m+=2),c.isSkinnedMesh&&(m+=1),m}function s(c,m,v,y,p,f){let E=e[t];return E===void 0?(E={id:c.id,object:c,geometry:m,material:v,materialVariant:o(c),groupOrder:y,renderOrder:c.renderOrder,z:p,group:f},e[t]=E):(E.id=c.id,E.object=c,E.geometry=m,E.material=v,E.materialVariant=o(c),E.groupOrder=y,E.renderOrder=c.renderOrder,E.z=p,E.group=f),t++,E}function u(c,m,v,y,p,f){const E=s(c,m,v,y,p,f);v.transmission>0?i.push(E):v.transparent===!0?r.push(E):n.push(E)}function l(c,m,v,y,p,f){const E=s(c,m,v,y,p,f);v.transmission>0?i.unshift(E):v.transparent===!0?r.unshift(E):n.unshift(E)}function h(c,m,v){n.length>1&&n.sort(c||A_),i.length>1&&i.sort(m||Js),r.length>1&&r.sort(m||Js),v&&(n.reverse(),i.reverse(),r.reverse())}function d(){for(let c=t,m=e.length;c<m;c++){const v=e[c];if(v.id===null)break;v.id=null,v.object=null,v.geometry=null,v.material=null,v.group=null}}return{opaque:n,transmissive:i,transparent:r,init:a,push:u,unshift:l,finish:d,sort:h}}function T_(){let e=new WeakMap;function t(i,r){const a=e.get(i);let o;return a===void 0?(o=new Qs,e.set(i,[o])):r>=a.length?(o=new Qs,a.push(o)):o=a[r],o}function n(){e=new WeakMap}return{get:t,dispose:n}}function P_(){const e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case"DirectionalLight":n={direction:new Q,color:new St};break;case"SpotLight":n={position:new Q,direction:new Q,color:new St,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":n={position:new Q,color:new St,distance:0,decay:0};break;case"HemisphereLight":n={direction:new Q,skyColor:new St,groundColor:new St};break;case"RectAreaLight":n={color:new St,position:new Q,halfWidth:new Q,halfHeight:new Q};break}return e[t.id]=n,n}}}function w_(){const e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case"DirectionalLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ke};break;case"SpotLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ke};break;case"PointLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ke,shadowCameraNear:1,shadowCameraFar:1e3};break}return e[t.id]=n,n}}}let R_=0;function C_(e,t){return(t.castShadow?2:0)-(e.castShadow?2:0)+(t.map?1:0)-(e.map?1:0)}function I_(e){const t=new P_,n=w_(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)i.probe.push(new Q);const r=new Q,a=new ui,o=new ui;function s(l){let h=0,d=0,c=0;for(let R=0;R<9;R++)i.probe[R].set(0,0,0);let m=0,v=0,y=0,p=0,f=0,E=0,A=0,_=0,S=0,b=0,C=0;l.sort(C_);for(let R=0,U=l.length;R<U;R++){const D=l[R],B=D.color,Z=D.intensity,k=D.distance;let I=null;if(D.shadow&&D.shadow.map&&(D.shadow.map.texture.format===Bi?I=D.shadow.map.texture:I=D.shadow.map.depthTexture||D.shadow.map.texture),D.isAmbientLight)h+=B.r*Z,d+=B.g*Z,c+=B.b*Z;else if(D.isLightProbe){for(let W=0;W<9;W++)i.probe[W].addScaledVector(D.sh.coefficients[W],Z);C++}else if(D.isDirectionalLight){const W=t.get(D);if(W.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){const L=D.shadow,H=n.get(D);H.shadowIntensity=L.intensity,H.shadowBias=L.bias,H.shadowNormalBias=L.normalBias,H.shadowRadius=L.radius,H.shadowMapSize=L.mapSize,i.directionalShadow[m]=H,i.directionalShadowMap[m]=I,i.directionalShadowMatrix[m]=D.shadow.matrix,E++}i.directional[m]=W,m++}else if(D.isSpotLight){const W=t.get(D);W.position.setFromMatrixPosition(D.matrixWorld),W.color.copy(B).multiplyScalar(Z),W.distance=k,W.coneCos=Math.cos(D.angle),W.penumbraCos=Math.cos(D.angle*(1-D.penumbra)),W.decay=D.decay,i.spot[y]=W;const L=D.shadow;if(D.map&&(i.spotLightMap[S]=D.map,S++,L.updateMatrices(D),D.castShadow&&b++),i.spotLightMatrix[y]=L.matrix,D.castShadow){const H=n.get(D);H.shadowIntensity=L.intensity,H.shadowBias=L.bias,H.shadowNormalBias=L.normalBias,H.shadowRadius=L.radius,H.shadowMapSize=L.mapSize,i.spotShadow[y]=H,i.spotShadowMap[y]=I,_++}y++}else if(D.isRectAreaLight){const W=t.get(D);W.color.copy(B).multiplyScalar(Z),W.halfWidth.set(D.width*.5,0,0),W.halfHeight.set(0,D.height*.5,0),i.rectArea[p]=W,p++}else if(D.isPointLight){const W=t.get(D);if(W.color.copy(D.color).multiplyScalar(D.intensity),W.distance=D.distance,W.decay=D.decay,D.castShadow){const L=D.shadow,H=n.get(D);H.shadowIntensity=L.intensity,H.shadowBias=L.bias,H.shadowNormalBias=L.normalBias,H.shadowRadius=L.radius,H.shadowMapSize=L.mapSize,H.shadowCameraNear=L.camera.near,H.shadowCameraFar=L.camera.far,i.pointShadow[v]=H,i.pointShadowMap[v]=I,i.pointShadowMatrix[v]=D.shadow.matrix,A++}i.point[v]=W,v++}else if(D.isHemisphereLight){const W=t.get(D);W.skyColor.copy(D.color).multiplyScalar(Z),W.groundColor.copy(D.groundColor).multiplyScalar(Z),i.hemi[f]=W,f++}}p>0&&(e.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=Te.LTC_FLOAT_1,i.rectAreaLTC2=Te.LTC_FLOAT_2):(i.rectAreaLTC1=Te.LTC_HALF_1,i.rectAreaLTC2=Te.LTC_HALF_2)),i.ambient[0]=h,i.ambient[1]=d,i.ambient[2]=c;const x=i.hash;(x.directionalLength!==m||x.pointLength!==v||x.spotLength!==y||x.rectAreaLength!==p||x.hemiLength!==f||x.numDirectionalShadows!==E||x.numPointShadows!==A||x.numSpotShadows!==_||x.numSpotMaps!==S||x.numLightProbes!==C)&&(i.directional.length=m,i.spot.length=y,i.rectArea.length=p,i.point.length=v,i.hemi.length=f,i.directionalShadow.length=E,i.directionalShadowMap.length=E,i.pointShadow.length=A,i.pointShadowMap.length=A,i.spotShadow.length=_,i.spotShadowMap.length=_,i.directionalShadowMatrix.length=E,i.pointShadowMatrix.length=A,i.spotLightMatrix.length=_+S-b,i.spotLightMap.length=S,i.numSpotLightShadowsWithMaps=b,i.numLightProbes=C,x.directionalLength=m,x.pointLength=v,x.spotLength=y,x.rectAreaLength=p,x.hemiLength=f,x.numDirectionalShadows=E,x.numPointShadows=A,x.numSpotShadows=_,x.numSpotMaps=S,x.numLightProbes=C,i.version=R_++)}function u(l,h){let d=0,c=0,m=0,v=0,y=0;const p=h.matrixWorldInverse;for(let f=0,E=l.length;f<E;f++){const A=l[f];if(A.isDirectionalLight){const _=i.directional[d];_.direction.setFromMatrixPosition(A.matrixWorld),r.setFromMatrixPosition(A.target.matrixWorld),_.direction.sub(r),_.direction.transformDirection(p),d++}else if(A.isSpotLight){const _=i.spot[m];_.position.setFromMatrixPosition(A.matrixWorld),_.position.applyMatrix4(p),_.direction.setFromMatrixPosition(A.matrixWorld),r.setFromMatrixPosition(A.target.matrixWorld),_.direction.sub(r),_.direction.transformDirection(p),m++}else if(A.isRectAreaLight){const _=i.rectArea[v];_.position.setFromMatrixPosition(A.matrixWorld),_.position.applyMatrix4(p),o.identity(),a.copy(A.matrixWorld),a.premultiply(p),o.extractRotation(a),_.halfWidth.set(A.width*.5,0,0),_.halfHeight.set(0,A.height*.5,0),_.halfWidth.applyMatrix4(o),_.halfHeight.applyMatrix4(o),v++}else if(A.isPointLight){const _=i.point[c];_.position.setFromMatrixPosition(A.matrixWorld),_.position.applyMatrix4(p),c++}else if(A.isHemisphereLight){const _=i.hemi[y];_.direction.setFromMatrixPosition(A.matrixWorld),_.direction.transformDirection(p),y++}}}return{setup:s,setupView:u,state:i}}function el(e){const t=new I_(e),n=[],i=[],r=[];function a(c){d.camera=c,n.length=0,i.length=0,r.length=0}function o(c){n.push(c)}function s(c){i.push(c)}function u(c){r.push(c)}function l(){t.setup(n)}function h(c){t.setupView(n,c)}const d={lightsArray:n,shadowsArray:i,lightProbeGridArray:r,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:a,state:d,setupLights:l,setupLightsView:h,pushLight:o,pushShadow:s,pushLightProbeGrid:u}}function D_(e){let t=new WeakMap;function n(r,a=0){const o=t.get(r);let s;return o===void 0?(s=new el(e),t.set(r,[s])):a>=o.length?(s=new el(e),o.push(s)):s=o[a],s}function i(){t=new WeakMap}return{get:n,dispose:i}}const L_=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,N_=`uniform sampler2D shadow_pass;
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
}`,U_=[new Q(1,0,0),new Q(-1,0,0),new Q(0,1,0),new Q(0,-1,0),new Q(0,0,1),new Q(0,0,-1)],F_=[new Q(0,-1,0),new Q(0,-1,0),new Q(0,0,1),new Q(0,0,-1),new Q(0,-1,0),new Q(0,-1,0)],tl=new ui,ir=new Q,za=new Q;function O_(e,t,n){let i=new hc;const r=new Ke,a=new Ke,o=new zt,s=new Cd,u=new Id,l={},h=n.maxTextureSize,d={[xr]:hn,[hn]:xr,[cn]:cn},c=new yn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ke},radius:{value:4}},vertexShader:L_,fragmentShader:N_}),m=c.clone();m.defines.HORIZONTAL_PASS=1;const v=new fi;v.setAttribute("position",new hr(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const y=new nn(v,c),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Qr;let f=this.type;this.render=function(b,C,x){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||b.length===0)return;this.type===Dd&&(_t("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=Qr);const R=e.getRenderTarget(),U=e.getActiveCubeFace(),D=e.getActiveMipmapLevel(),B=e.state;B.setBlending(Zn),B.buffers.depth.getReversed()===!0?B.buffers.color.setClear(0,0,0,0):B.buffers.color.setClear(1,1,1,1),B.buffers.depth.setTest(!0),B.setScissorTest(!1);const Z=f!==this.type;Z&&C.traverse(function(k){k.material&&(Array.isArray(k.material)?k.material.forEach(I=>I.needsUpdate=!0):k.material.needsUpdate=!0)});for(let k=0,I=b.length;k<I;k++){const W=b[k],L=W.shadow;if(L===void 0){_t("WebGLShadowMap:",W,"has no shadow.");continue}if(L.autoUpdate===!1&&L.needsUpdate===!1)continue;r.copy(L.mapSize);const H=L.getFrameExtents();r.multiply(H),a.copy(L.mapSize),(r.x>h||r.y>h)&&(r.x>h&&(a.x=Math.floor(h/H.x),r.x=a.x*H.x,L.mapSize.x=a.x),r.y>h&&(a.y=Math.floor(h/H.y),r.y=a.y*H.y,L.mapSize.y=a.y));const ee=e.state.buffers.depth.getReversed();if(L.camera._reversedDepth=ee,L.map===null||Z===!0){if(L.map!==null&&(L.map.depthTexture!==null&&(L.map.depthTexture.dispose(),L.map.depthTexture=null),L.map.dispose()),this.type===ar){if(W.isPointLight){_t("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}L.map=new Un(r.x,r.y,{format:Bi,type:di,minFilter:pn,magFilter:pn,generateMipmaps:!1}),L.map.texture.name=W.name+".shadowMap",L.map.depthTexture=new vr(r.x,r.y,oi),L.map.depthTexture.name=W.name+".shadowMapDepth",L.map.depthTexture.format=Oi,L.map.depthTexture.compareFunction=null,L.map.depthTexture.minFilter=vi,L.map.depthTexture.magFilter=vi}else W.isPointLight?(L.map=new jc(r.x),L.map.depthTexture=new Ld(r.x,Mi)):(L.map=new Un(r.x,r.y),L.map.depthTexture=new vr(r.x,r.y,Mi)),L.map.depthTexture.name=W.name+".shadowMap",L.map.depthTexture.format=Oi,this.type===Qr?(L.map.depthTexture.compareFunction=ee?xo:vo,L.map.depthTexture.minFilter=pn,L.map.depthTexture.magFilter=pn):(L.map.depthTexture.compareFunction=null,L.map.depthTexture.minFilter=vi,L.map.depthTexture.magFilter=vi);L.camera.updateProjectionMatrix()}const fe=L.map.isWebGLCubeRenderTarget?6:1;for(let ce=0;ce<fe;ce++){if(L.map.isWebGLCubeRenderTarget)e.setRenderTarget(L.map,ce),e.clear();else{ce===0&&(e.setRenderTarget(L.map),e.clear());const pe=L.getViewport(ce);o.set(a.x*pe.x,a.y*pe.y,a.x*pe.z,a.y*pe.w),B.viewport(o)}if(W.isPointLight){const pe=L.camera,He=L.matrix,Ge=W.distance||pe.far;Ge!==pe.far&&(pe.far=Ge,pe.updateProjectionMatrix()),ir.setFromMatrixPosition(W.matrixWorld),pe.position.copy(ir),za.copy(pe.position),za.add(U_[ce]),pe.up.copy(F_[ce]),pe.lookAt(za),pe.updateMatrixWorld(),He.makeTranslation(-ir.x,-ir.y,-ir.z),tl.multiplyMatrices(pe.projectionMatrix,pe.matrixWorldInverse),L._frustum.setFromProjectionMatrix(tl,pe.coordinateSystem,pe.reversedDepth)}else L.updateMatrices(W);i=L.getFrustum(),_(C,x,L.camera,W,this.type)}L.isPointLightShadow!==!0&&this.type===ar&&E(L,x),L.needsUpdate=!1}f=this.type,p.needsUpdate=!1,e.setRenderTarget(R,U,D)};function E(b,C){const x=t.update(y);c.defines.VSM_SAMPLES!==b.blurSamples&&(c.defines.VSM_SAMPLES=b.blurSamples,m.defines.VSM_SAMPLES=b.blurSamples,c.needsUpdate=!0,m.needsUpdate=!0),b.mapPass===null&&(b.mapPass=new Un(r.x,r.y,{format:Bi,type:di})),c.uniforms.shadow_pass.value=b.map.depthTexture,c.uniforms.resolution.value=b.mapSize,c.uniforms.radius.value=b.radius,e.setRenderTarget(b.mapPass),e.clear(),e.renderBufferDirect(C,null,x,c,y,null),m.uniforms.shadow_pass.value=b.mapPass.texture,m.uniforms.resolution.value=b.mapSize,m.uniforms.radius.value=b.radius,e.setRenderTarget(b.map),e.clear(),e.renderBufferDirect(C,null,x,m,y,null)}function A(b,C,x,R){let U=null;const D=x.isPointLight===!0?b.customDistanceMaterial:b.customDepthMaterial;if(D!==void 0)U=D;else if(U=x.isPointLight===!0?u:s,e.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0||C.alphaToCoverage===!0){const B=U.uuid,Z=C.uuid;let k=l[B];k===void 0&&(k={},l[B]=k);let I=k[Z];I===void 0&&(I=U.clone(),k[Z]=I,C.addEventListener("dispose",S)),U=I}if(U.visible=C.visible,U.wireframe=C.wireframe,R===ar?U.side=C.shadowSide!==null?C.shadowSide:C.side:U.side=C.shadowSide!==null?C.shadowSide:d[C.side],U.alphaMap=C.alphaMap,U.alphaTest=C.alphaToCoverage===!0?.5:C.alphaTest,U.map=C.map,U.clipShadows=C.clipShadows,U.clippingPlanes=C.clippingPlanes,U.clipIntersection=C.clipIntersection,U.displacementMap=C.displacementMap,U.displacementScale=C.displacementScale,U.displacementBias=C.displacementBias,U.wireframeLinewidth=C.wireframeLinewidth,U.linewidth=C.linewidth,x.isPointLight===!0&&U.isMeshDistanceMaterial===!0){const B=e.properties.get(U);B.light=x}return U}function _(b,C,x,R,U){if(b.visible===!1)return;if(b.layers.test(C.layers)&&(b.isMesh||b.isLine||b.isPoints)&&(b.castShadow||b.receiveShadow&&U===ar)&&(!b.frustumCulled||i.intersectsObject(b))){b.modelViewMatrix.multiplyMatrices(x.matrixWorldInverse,b.matrixWorld);const Z=t.update(b),k=b.material;if(Array.isArray(k)){const I=Z.groups;for(let W=0,L=I.length;W<L;W++){const H=I[W],ee=k[H.materialIndex];if(ee&&ee.visible){const fe=A(b,ee,R,U);b.onBeforeShadow(e,b,C,x,Z,fe,H),e.renderBufferDirect(x,null,Z,fe,b,H),b.onAfterShadow(e,b,C,x,Z,fe,H)}}}else if(k.visible){const I=A(b,k,R,U);b.onBeforeShadow(e,b,C,x,Z,I,null),e.renderBufferDirect(x,null,Z,I,b,null),b.onAfterShadow(e,b,C,x,Z,I,null)}}const B=b.children;for(let Z=0,k=B.length;Z<k;Z++)_(B[Z],C,x,R,U)}function S(b){b.target.removeEventListener("dispose",S);for(const x in l){const R=l[x],U=b.target.uuid;U in R&&(R[U].dispose(),delete R[U])}}}function B_(e,t){function n(){let O=!1;const ve=new zt;let ie=null;const Se=new zt(0,0,0,0);return{setMask:function(Re){ie!==Re&&!O&&(e.colorMask(Re,Re,Re,Re),ie=Re)},setLocked:function(Re){O=Re},setClear:function(Re,le,Ve,Be,At){At===!0&&(Re*=Be,le*=Be,Ve*=Be),ve.set(Re,le,Ve,Be),Se.equals(ve)===!1&&(e.clearColor(Re,le,Ve,Be),Se.copy(ve))},reset:function(){O=!1,ie=null,Se.set(-1,0,0,0)}}}function i(){let O=!1,ve=!1,ie=null,Se=null,Re=null;return{setReversed:function(le){if(ve!==le){const Ve=t.get("EXT_clip_control");le?Ve.clipControlEXT(Ve.LOWER_LEFT_EXT,Ve.ZERO_TO_ONE_EXT):Ve.clipControlEXT(Ve.LOWER_LEFT_EXT,Ve.NEGATIVE_ONE_TO_ONE_EXT),ve=le;const Be=Re;Re=null,this.setClear(Be)}},getReversed:function(){return ve},setTest:function(le){le?ae(e.DEPTH_TEST):q(e.DEPTH_TEST)},setMask:function(le){ie!==le&&!O&&(e.depthMask(le),ie=le)},setFunc:function(le){if(ve&&(le=cf[le]),Se!==le){switch(le){case $d:e.depthFunc(e.NEVER);break;case Yd:e.depthFunc(e.ALWAYS);break;case Xd:e.depthFunc(e.LESS);break;case zi:e.depthFunc(e.LEQUAL);break;case Wd:e.depthFunc(e.EQUAL);break;case kd:e.depthFunc(e.GEQUAL);break;case Hd:e.depthFunc(e.GREATER);break;case Vd:e.depthFunc(e.NOTEQUAL);break;default:e.depthFunc(e.LEQUAL)}Se=le}},setLocked:function(le){O=le},setClear:function(le){Re!==le&&(Re=le,ve&&(le=1-le),e.clearDepth(le))},reset:function(){O=!1,ie=null,Se=null,Re=null,ve=!1}}}function r(){let O=!1,ve=null,ie=null,Se=null,Re=null,le=null,Ve=null,Be=null,At=null;return{setTest:function(ot){O||(ot?ae(e.STENCIL_TEST):q(e.STENCIL_TEST))},setMask:function(ot){ve!==ot&&!O&&(e.stencilMask(ot),ve=ot)},setFunc:function(ot,rn,jt){(ie!==ot||Se!==rn||Re!==jt)&&(e.stencilFunc(ot,rn,jt),ie=ot,Se=rn,Re=jt)},setOp:function(ot,rn,jt){(le!==ot||Ve!==rn||Be!==jt)&&(e.stencilOp(ot,rn,jt),le=ot,Ve=rn,Be=jt)},setLocked:function(ot){O=ot},setClear:function(ot){At!==ot&&(e.clearStencil(ot),At=ot)},reset:function(){O=!1,ve=null,ie=null,Se=null,Re=null,le=null,Ve=null,Be=null,At=null}}}const a=new n,o=new i,s=new r,u=new WeakMap,l=new WeakMap;let h={},d={},c={},m=new WeakMap,v=[],y=null,p=!1,f=null,E=null,A=null,_=null,S=null,b=null,C=null,x=new St(0,0,0),R=0,U=!1,D=null,B=null,Z=null,k=null,I=null;const W=e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let L=!1,H=0;const ee=e.getParameter(e.VERSION);ee.indexOf("WebGL")!==-1?(H=parseFloat(/^WebGL (\d)/.exec(ee)[1]),L=H>=1):ee.indexOf("OpenGL ES")!==-1&&(H=parseFloat(/^OpenGL ES (\d)/.exec(ee)[1]),L=H>=2);let fe=null,ce={};const pe=e.getParameter(e.SCISSOR_BOX),He=e.getParameter(e.VIEWPORT),Ge=new zt().fromArray(pe),Ie=new zt().fromArray(He);function N(O,ve,ie,Se){const Re=new Uint8Array(4),le=e.createTexture();e.bindTexture(O,le),e.texParameteri(O,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(O,e.TEXTURE_MAG_FILTER,e.NEAREST);for(let Ve=0;Ve<ie;Ve++)O===e.TEXTURE_3D||O===e.TEXTURE_2D_ARRAY?e.texImage3D(ve,0,e.RGBA,1,1,Se,0,e.RGBA,e.UNSIGNED_BYTE,Re):e.texImage2D(ve+Ve,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,Re);return le}const ne={};ne[e.TEXTURE_2D]=N(e.TEXTURE_2D,e.TEXTURE_2D,1),ne[e.TEXTURE_CUBE_MAP]=N(e.TEXTURE_CUBE_MAP,e.TEXTURE_CUBE_MAP_POSITIVE_X,6),ne[e.TEXTURE_2D_ARRAY]=N(e.TEXTURE_2D_ARRAY,e.TEXTURE_2D_ARRAY,1,1),ne[e.TEXTURE_3D]=N(e.TEXTURE_3D,e.TEXTURE_3D,1,1),a.setClear(0,0,0,1),o.setClear(1),s.setClear(0),ae(e.DEPTH_TEST),o.setFunc(zi),Ye(!1),Fe(Es),ae(e.CULL_FACE),de(Zn);function ae(O){h[O]!==!0&&(e.enable(O),h[O]=!0)}function q(O){h[O]!==!1&&(e.disable(O),h[O]=!1)}function ue(O,ve){return c[O]!==ve?(e.bindFramebuffer(O,ve),c[O]=ve,O===e.DRAW_FRAMEBUFFER&&(c[e.FRAMEBUFFER]=ve),O===e.FRAMEBUFFER&&(c[e.DRAW_FRAMEBUFFER]=ve),!0):!1}function se(O,ve){let ie=v,Se=!1;if(O){ie=m.get(ve),ie===void 0&&(ie=[],m.set(ve,ie));const Re=O.textures;if(ie.length!==Re.length||ie[0]!==e.COLOR_ATTACHMENT0){for(let le=0,Ve=Re.length;le<Ve;le++)ie[le]=e.COLOR_ATTACHMENT0+le;ie.length=Re.length,Se=!0}}else ie[0]!==e.BACK&&(ie[0]=e.BACK,Se=!0);Se&&e.drawBuffers(ie)}function Ee(O){return y!==O?(e.useProgram(O),y=O,!0):!1}const z={[tr]:e.FUNC_ADD,[ad]:e.FUNC_SUBTRACT,[rd]:e.FUNC_REVERSE_SUBTRACT};z[uf]=e.MIN,z[df]=e.MAX;const re={[Sd]:e.ZERO,[vd]:e.ONE,[xd]:e.SRC_COLOR,[_d]:e.SRC_ALPHA,[gd]:e.SRC_ALPHA_SATURATE,[md]:e.DST_COLOR,[hd]:e.DST_ALPHA,[pd]:e.ONE_MINUS_SRC_COLOR,[fd]:e.ONE_MINUS_SRC_ALPHA,[dd]:e.ONE_MINUS_DST_COLOR,[ud]:e.ONE_MINUS_DST_ALPHA,[cd]:e.CONSTANT_COLOR,[ld]:e.ONE_MINUS_CONSTANT_COLOR,[sd]:e.CONSTANT_ALPHA,[od]:e.ONE_MINUS_CONSTANT_ALPHA};function de(O,ve,ie,Se,Re,le,Ve,Be,At,ot){if(O===Zn){p===!0&&(q(e.BLEND),p=!1);return}if(p===!1&&(ae(e.BLEND),p=!0),O!==jd){if(O!==f||ot!==U){if((E!==tr||S!==tr)&&(e.blendEquation(e.FUNC_ADD),E=tr,S=tr),ot)switch(O){case ea:e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case bs:e.blendFunc(e.ONE,e.ONE);break;case ys:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case Ms:e.blendFuncSeparate(e.DST_COLOR,e.ONE_MINUS_SRC_ALPHA,e.ZERO,e.ONE);break;default:Mt("WebGLState: Invalid blending: ",O);break}else switch(O){case ea:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case bs:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE,e.ONE,e.ONE);break;case ys:Mt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Ms:Mt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Mt("WebGLState: Invalid blending: ",O);break}A=null,_=null,b=null,C=null,x.set(0,0,0),R=0,f=O,U=ot}return}Re=Re||ve,le=le||ie,Ve=Ve||Se,(ve!==E||Re!==S)&&(e.blendEquationSeparate(z[ve],z[Re]),E=ve,S=Re),(ie!==A||Se!==_||le!==b||Ve!==C)&&(e.blendFuncSeparate(re[ie],re[Se],re[le],re[Ve]),A=ie,_=Se,b=le,C=Ve),(Be.equals(x)===!1||At!==R)&&(e.blendColor(Be.r,Be.g,Be.b,At),x.copy(Be),R=At),f=O,U=!1}function me(O,ve){O.side===cn?q(e.CULL_FACE):ae(e.CULL_FACE);let ie=O.side===hn;ve&&(ie=!ie),Ye(ie),O.blending===ea&&O.transparent===!1?de(Zn):de(O.blending,O.blendEquation,O.blendSrc,O.blendDst,O.blendEquationAlpha,O.blendSrcAlpha,O.blendDstAlpha,O.blendColor,O.blendAlpha,O.premultipliedAlpha),o.setFunc(O.depthFunc),o.setTest(O.depthTest),o.setMask(O.depthWrite),a.setMask(O.colorWrite);const Se=O.stencilWrite;s.setTest(Se),Se&&(s.setMask(O.stencilWriteMask),s.setFunc(O.stencilFunc,O.stencilRef,O.stencilFuncMask),s.setOp(O.stencilFail,O.stencilZFail,O.stencilZPass)),at(O.polygonOffset,O.polygonOffsetFactor,O.polygonOffsetUnits),O.alphaToCoverage===!0?ae(e.SAMPLE_ALPHA_TO_COVERAGE):q(e.SAMPLE_ALPHA_TO_COVERAGE)}function Ye(O){D!==O&&(O?e.frontFace(e.CW):e.frontFace(e.CCW),D=O)}function Fe(O){O!==Kd?(ae(e.CULL_FACE),O!==B&&(O===Es?e.cullFace(e.BACK):O===qd?e.cullFace(e.FRONT):e.cullFace(e.FRONT_AND_BACK))):q(e.CULL_FACE),B=O}function et(O){O!==Z&&(L&&e.lineWidth(O),Z=O)}function at(O,ve,ie){O?(ae(e.POLYGON_OFFSET_FILL),(k!==ve||I!==ie)&&(k=ve,I=ie,o.getReversed()&&(ve=-ve),e.polygonOffset(ve,ie))):q(e.POLYGON_OFFSET_FILL)}function ut(O){O?ae(e.SCISSOR_TEST):q(e.SCISSOR_TEST)}function pt(O){O===void 0&&(O=e.TEXTURE0+W-1),fe!==O&&(e.activeTexture(O),fe=O)}function P(O,ve,ie){ie===void 0&&(fe===null?ie=e.TEXTURE0+W-1:ie=fe);let Se=ce[ie];Se===void 0&&(Se={type:void 0,texture:void 0},ce[ie]=Se),(Se.type!==O||Se.texture!==ve)&&(fe!==ie&&(e.activeTexture(ie),fe=ie),e.bindTexture(O,ve||ne[O]),Se.type=O,Se.texture=ve)}function De(){const O=ce[fe];O!==void 0&&O.type!==void 0&&(e.bindTexture(O.type,null),O.type=void 0,O.texture=void 0)}function Pe(){try{e.compressedTexImage2D(...arguments)}catch(O){Mt("WebGLState:",O)}}function T(){try{e.compressedTexImage3D(...arguments)}catch(O){Mt("WebGLState:",O)}}function g(){try{e.texSubImage2D(...arguments)}catch(O){Mt("WebGLState:",O)}}function V(){try{e.texSubImage3D(...arguments)}catch(O){Mt("WebGLState:",O)}}function Y(){try{e.compressedTexSubImage2D(...arguments)}catch(O){Mt("WebGLState:",O)}}function X(){try{e.compressedTexSubImage3D(...arguments)}catch(O){Mt("WebGLState:",O)}}function he(){try{e.texStorage2D(...arguments)}catch(O){Mt("WebGLState:",O)}}function Me(){try{e.texStorage3D(...arguments)}catch(O){Mt("WebGLState:",O)}}function J(){try{e.texImage2D(...arguments)}catch(O){Mt("WebGLState:",O)}}function te(){try{e.texImage3D(...arguments)}catch(O){Mt("WebGLState:",O)}}function ge(O){return d[O]!==void 0?d[O]:e.getParameter(O)}function Oe(O,ve){d[O]!==ve&&(e.pixelStorei(O,ve),d[O]=ve)}function xe(O){Ge.equals(O)===!1&&(e.scissor(O.x,O.y,O.z,O.w),Ge.copy(O))}function Ae(O){Ie.equals(O)===!1&&(e.viewport(O.x,O.y,O.z,O.w),Ie.copy(O))}function Ue(O,ve){let ie=l.get(ve);ie===void 0&&(ie=new WeakMap,l.set(ve,ie));let Se=ie.get(O);Se===void 0&&(Se=e.getUniformBlockIndex(ve,O.name),ie.set(O,Se))}function $e(O,ve){const Se=l.get(ve).get(O);u.get(ve)!==Se&&(e.uniformBlockBinding(ve,Se,O.__bindingPointIndex),u.set(ve,Se))}function Je(){e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.POLYGON_OFFSET_FILL),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ZERO),e.blendFuncSeparate(e.ONE,e.ZERO,e.ONE,e.ZERO),e.blendColor(0,0,0,0),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0),e.depthMask(!0),e.depthFunc(e.LESS),o.setReversed(!1),e.clearDepth(1),e.stencilMask(4294967295),e.stencilFunc(e.ALWAYS,0,4294967295),e.stencilOp(e.KEEP,e.KEEP,e.KEEP),e.clearStencil(0),e.cullFace(e.BACK),e.frontFace(e.CCW),e.polygonOffset(0,0),e.activeTexture(e.TEXTURE0),e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),e.bindFramebuffer(e.READ_FRAMEBUFFER,null),e.useProgram(null),e.lineWidth(1),e.scissor(0,0,e.canvas.width,e.canvas.height),e.viewport(0,0,e.canvas.width,e.canvas.height),e.pixelStorei(e.PACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!1),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,e.BROWSER_DEFAULT_WEBGL),e.pixelStorei(e.PACK_ROW_LENGTH,0),e.pixelStorei(e.PACK_SKIP_PIXELS,0),e.pixelStorei(e.PACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_ROW_LENGTH,0),e.pixelStorei(e.UNPACK_IMAGE_HEIGHT,0),e.pixelStorei(e.UNPACK_SKIP_PIXELS,0),e.pixelStorei(e.UNPACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_SKIP_IMAGES,0),h={},d={},fe=null,ce={},c={},m=new WeakMap,v=[],y=null,p=!1,f=null,E=null,A=null,_=null,S=null,b=null,C=null,x=new St(0,0,0),R=0,U=!1,D=null,B=null,Z=null,k=null,I=null,Ge.set(0,0,e.canvas.width,e.canvas.height),Ie.set(0,0,e.canvas.width,e.canvas.height),a.reset(),o.reset(),s.reset()}return{buffers:{color:a,depth:o,stencil:s},enable:ae,disable:q,bindFramebuffer:ue,drawBuffers:se,useProgram:Ee,setBlending:de,setMaterial:me,setFlipSided:Ye,setCullFace:Fe,setLineWidth:et,setPolygonOffset:at,setScissorTest:ut,activeTexture:pt,bindTexture:P,unbindTexture:De,compressedTexImage2D:Pe,compressedTexImage3D:T,texImage2D:J,texImage3D:te,pixelStorei:Oe,getParameter:ge,updateUBOMapping:Ue,uniformBlockBinding:$e,texStorage2D:he,texStorage3D:Me,texSubImage2D:g,texSubImage3D:V,compressedTexSubImage2D:Y,compressedTexSubImage3D:X,scissor:xe,viewport:Ae,reset:Je}}function z_(e,t,n,i,r,a,o){const s=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,u=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new Ke,h=new WeakMap,d=new Set;let c;const m=new WeakMap;let v=!1;try{v=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function y(T,g){return v?new OffscreenCanvas(T,g):rf("canvas")}function p(T,g,V){let Y=1;const X=Pe(T);if((X.width>V||X.height>V)&&(Y=V/Math.max(X.width,X.height)),Y<1)if(typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&T instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&T instanceof ImageBitmap||typeof VideoFrame<"u"&&T instanceof VideoFrame){const he=Math.floor(Y*X.width),Me=Math.floor(Y*X.height);c===void 0&&(c=y(he,Me));const J=g?y(he,Me):c;return J.width=he,J.height=Me,J.getContext("2d").drawImage(T,0,0,he,Me),_t("WebGLRenderer: Texture has been resized from ("+X.width+"x"+X.height+") to ("+he+"x"+Me+")."),J}else return"data"in T&&_t("WebGLRenderer: Image in DataTexture is too big ("+X.width+"x"+X.height+")."),T;return T}function f(T){return T.generateMipmaps}function E(T){e.generateMipmap(T)}function A(T){return T.isWebGLCubeRenderTarget?e.TEXTURE_CUBE_MAP:T.isWebGL3DRenderTarget?e.TEXTURE_3D:T.isWebGLArrayRenderTarget||T.isCompressedArrayTexture?e.TEXTURE_2D_ARRAY:e.TEXTURE_2D}function _(T,g,V,Y,X,he=!1){if(T!==null){if(e[T]!==void 0)return e[T];_t("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+T+"'")}let Me;Y&&(Me=t.get("EXT_texture_norm16"),Me||_t("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let J=g;if(g===e.RED&&(V===e.FLOAT&&(J=e.R32F),V===e.HALF_FLOAT&&(J=e.R16F),V===e.UNSIGNED_BYTE&&(J=e.R8),V===e.UNSIGNED_SHORT&&Me&&(J=Me.R16_EXT),V===e.SHORT&&Me&&(J=Me.R16_SNORM_EXT)),g===e.RED_INTEGER&&(V===e.UNSIGNED_BYTE&&(J=e.R8UI),V===e.UNSIGNED_SHORT&&(J=e.R16UI),V===e.UNSIGNED_INT&&(J=e.R32UI),V===e.BYTE&&(J=e.R8I),V===e.SHORT&&(J=e.R16I),V===e.INT&&(J=e.R32I)),g===e.RG&&(V===e.FLOAT&&(J=e.RG32F),V===e.HALF_FLOAT&&(J=e.RG16F),V===e.UNSIGNED_BYTE&&(J=e.RG8),V===e.UNSIGNED_SHORT&&Me&&(J=Me.RG16_EXT),V===e.SHORT&&Me&&(J=Me.RG16_SNORM_EXT)),g===e.RG_INTEGER&&(V===e.UNSIGNED_BYTE&&(J=e.RG8UI),V===e.UNSIGNED_SHORT&&(J=e.RG16UI),V===e.UNSIGNED_INT&&(J=e.RG32UI),V===e.BYTE&&(J=e.RG8I),V===e.SHORT&&(J=e.RG16I),V===e.INT&&(J=e.RG32I)),g===e.RGB_INTEGER&&(V===e.UNSIGNED_BYTE&&(J=e.RGB8UI),V===e.UNSIGNED_SHORT&&(J=e.RGB16UI),V===e.UNSIGNED_INT&&(J=e.RGB32UI),V===e.BYTE&&(J=e.RGB8I),V===e.SHORT&&(J=e.RGB16I),V===e.INT&&(J=e.RGB32I)),g===e.RGBA_INTEGER&&(V===e.UNSIGNED_BYTE&&(J=e.RGBA8UI),V===e.UNSIGNED_SHORT&&(J=e.RGBA16UI),V===e.UNSIGNED_INT&&(J=e.RGBA32UI),V===e.BYTE&&(J=e.RGBA8I),V===e.SHORT&&(J=e.RGBA16I),V===e.INT&&(J=e.RGBA32I)),g===e.RGB&&(V===e.UNSIGNED_SHORT&&Me&&(J=Me.RGB16_EXT),V===e.SHORT&&Me&&(J=Me.RGB16_SNORM_EXT),V===e.UNSIGNED_INT_5_9_9_9_REV&&(J=e.RGB9_E5),V===e.UNSIGNED_INT_10F_11F_11F_REV&&(J=e.R11F_G11F_B10F)),g===e.RGBA){const te=he?Lc:Rt.getTransfer(X);V===e.FLOAT&&(J=e.RGBA32F),V===e.HALF_FLOAT&&(J=e.RGBA16F),V===e.UNSIGNED_BYTE&&(J=te===Et?e.SRGB8_ALPHA8:e.RGBA8),V===e.UNSIGNED_SHORT&&Me&&(J=Me.RGBA16_EXT),V===e.SHORT&&Me&&(J=Me.RGBA16_SNORM_EXT),V===e.UNSIGNED_SHORT_4_4_4_4&&(J=e.RGBA4),V===e.UNSIGNED_SHORT_5_5_5_1&&(J=e.RGB5_A1)}return(J===e.R16F||J===e.R32F||J===e.RG16F||J===e.RG32F||J===e.RGBA16F||J===e.RGBA32F)&&t.get("EXT_color_buffer_float"),J}function S(T,g){let V;return T?g===null||g===Mi||g===Er?V=e.DEPTH24_STENCIL8:g===oi?V=e.DEPTH32F_STENCIL8:g===oa&&(V=e.DEPTH24_STENCIL8,_t("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):g===null||g===Mi||g===Er?V=e.DEPTH_COMPONENT24:g===oi?V=e.DEPTH_COMPONENT32F:g===oa&&(V=e.DEPTH_COMPONENT16),V}function b(T,g){return f(T)===!0||T.isFramebufferTexture&&T.minFilter!==vi&&T.minFilter!==pn?Math.log2(Math.max(g.width,g.height))+1:T.mipmaps!==void 0&&T.mipmaps.length>0?T.mipmaps.length:T.isCompressedTexture&&Array.isArray(T.image)?g.mipmaps.length:1}function C(T){const g=T.target;g.removeEventListener("dispose",C),R(g),g.isVideoTexture&&h.delete(g),g.isHTMLTexture&&d.delete(g)}function x(T){const g=T.target;g.removeEventListener("dispose",x),D(g)}function R(T){const g=i.get(T);if(g.__webglInit===void 0)return;const V=T.source,Y=m.get(V);if(Y){const X=Y[g.__cacheKey];X.usedTimes--,X.usedTimes===0&&U(T),Object.keys(Y).length===0&&m.delete(V)}i.remove(T)}function U(T){const g=i.get(T);e.deleteTexture(g.__webglTexture);const V=T.source,Y=m.get(V);delete Y[g.__cacheKey],o.memory.textures--}function D(T){const g=i.get(T);if(T.depthTexture&&(T.depthTexture.dispose(),i.remove(T.depthTexture)),T.isWebGLCubeRenderTarget)for(let Y=0;Y<6;Y++){if(Array.isArray(g.__webglFramebuffer[Y]))for(let X=0;X<g.__webglFramebuffer[Y].length;X++)e.deleteFramebuffer(g.__webglFramebuffer[Y][X]);else e.deleteFramebuffer(g.__webglFramebuffer[Y]);g.__webglDepthbuffer&&e.deleteRenderbuffer(g.__webglDepthbuffer[Y])}else{if(Array.isArray(g.__webglFramebuffer))for(let Y=0;Y<g.__webglFramebuffer.length;Y++)e.deleteFramebuffer(g.__webglFramebuffer[Y]);else e.deleteFramebuffer(g.__webglFramebuffer);if(g.__webglDepthbuffer&&e.deleteRenderbuffer(g.__webglDepthbuffer),g.__webglMultisampledFramebuffer&&e.deleteFramebuffer(g.__webglMultisampledFramebuffer),g.__webglColorRenderbuffer)for(let Y=0;Y<g.__webglColorRenderbuffer.length;Y++)g.__webglColorRenderbuffer[Y]&&e.deleteRenderbuffer(g.__webglColorRenderbuffer[Y]);g.__webglDepthRenderbuffer&&e.deleteRenderbuffer(g.__webglDepthRenderbuffer)}const V=T.textures;for(let Y=0,X=V.length;Y<X;Y++){const he=i.get(V[Y]);he.__webglTexture&&(e.deleteTexture(he.__webglTexture),o.memory.textures--),i.remove(V[Y])}i.remove(T)}let B=0;function Z(){B=0}function k(){return B}function I(T){B=T}function W(){const T=B;return T>=r.maxTextures&&_t("WebGLTextures: Trying to use "+T+" texture units while this GPU supports only "+r.maxTextures),B+=1,T}function L(T){const g=[];return g.push(T.wrapS),g.push(T.wrapT),g.push(T.wrapR||0),g.push(T.magFilter),g.push(T.minFilter),g.push(T.anisotropy),g.push(T.internalFormat),g.push(T.format),g.push(T.type),g.push(T.generateMipmaps),g.push(T.premultiplyAlpha),g.push(T.flipY),g.push(T.unpackAlignment),g.push(T.colorSpace),g.join()}function H(T,g){const V=i.get(T);if(T.isVideoTexture&&P(T),T.isRenderTargetTexture===!1&&T.isExternalTexture!==!0&&T.version>0&&V.__version!==T.version){const Y=T.image;if(Y===null)_t("WebGLRenderer: Texture marked for update but no image data found.");else if(Y.complete===!1)_t("WebGLRenderer: Texture marked for update but image is incomplete");else{q(V,T,g);return}}else T.isExternalTexture&&(V.__webglTexture=T.sourceTexture?T.sourceTexture:null);n.bindTexture(e.TEXTURE_2D,V.__webglTexture,e.TEXTURE0+g)}function ee(T,g){const V=i.get(T);if(T.isRenderTargetTexture===!1&&T.version>0&&V.__version!==T.version){q(V,T,g);return}else T.isExternalTexture&&(V.__webglTexture=T.sourceTexture?T.sourceTexture:null);n.bindTexture(e.TEXTURE_2D_ARRAY,V.__webglTexture,e.TEXTURE0+g)}function fe(T,g){const V=i.get(T);if(T.isRenderTargetTexture===!1&&T.version>0&&V.__version!==T.version){q(V,T,g);return}n.bindTexture(e.TEXTURE_3D,V.__webglTexture,e.TEXTURE0+g)}function ce(T,g){const V=i.get(T);if(T.isCubeDepthTexture!==!0&&T.version>0&&V.__version!==T.version){ue(V,T,g);return}n.bindTexture(e.TEXTURE_CUBE_MAP,V.__webglTexture,e.TEXTURE0+g)}const pe={[Md]:e.REPEAT,[eo]:e.CLAMP_TO_EDGE,[Ed]:e.MIRRORED_REPEAT},He={[vi]:e.NEAREST,[yd]:e.NEAREST_MIPMAP_NEAREST,[Gr]:e.NEAREST_MIPMAP_LINEAR,[pn]:e.LINEAR,[Aa]:e.LINEAR_MIPMAP_NEAREST,[Ii]:e.LINEAR_MIPMAP_LINEAR},Ge={[Rd]:e.NEVER,[wd]:e.ALWAYS,[Pd]:e.LESS,[vo]:e.LEQUAL,[Td]:e.EQUAL,[xo]:e.GEQUAL,[Ad]:e.GREATER,[bd]:e.NOTEQUAL};function Ie(T,g){if(g.type===oi&&t.has("OES_texture_float_linear")===!1&&(g.magFilter===pn||g.magFilter===Aa||g.magFilter===Gr||g.magFilter===Ii||g.minFilter===pn||g.minFilter===Aa||g.minFilter===Gr||g.minFilter===Ii)&&_t("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),e.texParameteri(T,e.TEXTURE_WRAP_S,pe[g.wrapS]),e.texParameteri(T,e.TEXTURE_WRAP_T,pe[g.wrapT]),(T===e.TEXTURE_3D||T===e.TEXTURE_2D_ARRAY)&&e.texParameteri(T,e.TEXTURE_WRAP_R,pe[g.wrapR]),e.texParameteri(T,e.TEXTURE_MAG_FILTER,He[g.magFilter]),e.texParameteri(T,e.TEXTURE_MIN_FILTER,He[g.minFilter]),g.compareFunction&&(e.texParameteri(T,e.TEXTURE_COMPARE_MODE,e.COMPARE_REF_TO_TEXTURE),e.texParameteri(T,e.TEXTURE_COMPARE_FUNC,Ge[g.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(g.magFilter===vi||g.minFilter!==Gr&&g.minFilter!==Ii||g.type===oi&&t.has("OES_texture_float_linear")===!1)return;if(g.anisotropy>1||i.get(g).__currentAnisotropy){const V=t.get("EXT_texture_filter_anisotropic");e.texParameterf(T,V.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(g.anisotropy,r.getMaxAnisotropy())),i.get(g).__currentAnisotropy=g.anisotropy}}}function N(T,g){let V=!1;T.__webglInit===void 0&&(T.__webglInit=!0,g.addEventListener("dispose",C));const Y=g.source;let X=m.get(Y);X===void 0&&(X={},m.set(Y,X));const he=L(g);if(he!==T.__cacheKey){X[he]===void 0&&(X[he]={texture:e.createTexture(),usedTimes:0},o.memory.textures++,V=!0),X[he].usedTimes++;const Me=X[T.__cacheKey];Me!==void 0&&(X[T.__cacheKey].usedTimes--,Me.usedTimes===0&&U(g)),T.__cacheKey=he,T.__webglTexture=X[he].texture}return V}function ne(T,g,V){return Math.floor(Math.floor(T/V)/g)}function ae(T,g,V,Y){const he=T.updateRanges;if(he.length===0)n.texSubImage2D(e.TEXTURE_2D,0,0,0,g.width,g.height,V,Y,g.data);else{he.sort((Oe,xe)=>Oe.start-xe.start);let Me=0;for(let Oe=1;Oe<he.length;Oe++){const xe=he[Me],Ae=he[Oe],Ue=xe.start+xe.count,$e=ne(Ae.start,g.width,4),Je=ne(xe.start,g.width,4);Ae.start<=Ue+1&&$e===Je&&ne(Ae.start+Ae.count-1,g.width,4)===$e?xe.count=Math.max(xe.count,Ae.start+Ae.count-xe.start):(++Me,he[Me]=Ae)}he.length=Me+1;const J=n.getParameter(e.UNPACK_ROW_LENGTH),te=n.getParameter(e.UNPACK_SKIP_PIXELS),ge=n.getParameter(e.UNPACK_SKIP_ROWS);n.pixelStorei(e.UNPACK_ROW_LENGTH,g.width);for(let Oe=0,xe=he.length;Oe<xe;Oe++){const Ae=he[Oe],Ue=Math.floor(Ae.start/4),$e=Math.ceil(Ae.count/4),Je=Ue%g.width,O=Math.floor(Ue/g.width),ve=$e,ie=1;n.pixelStorei(e.UNPACK_SKIP_PIXELS,Je),n.pixelStorei(e.UNPACK_SKIP_ROWS,O),n.texSubImage2D(e.TEXTURE_2D,0,Je,O,ve,ie,V,Y,g.data)}T.clearUpdateRanges(),n.pixelStorei(e.UNPACK_ROW_LENGTH,J),n.pixelStorei(e.UNPACK_SKIP_PIXELS,te),n.pixelStorei(e.UNPACK_SKIP_ROWS,ge)}}function q(T,g,V){let Y=e.TEXTURE_2D;(g.isDataArrayTexture||g.isCompressedArrayTexture)&&(Y=e.TEXTURE_2D_ARRAY),g.isData3DTexture&&(Y=e.TEXTURE_3D);const X=N(T,g),he=g.source;n.bindTexture(Y,T.__webglTexture,e.TEXTURE0+V);const Me=i.get(he);if(he.version!==Me.__version||X===!0){if(n.activeTexture(e.TEXTURE0+V),(typeof ImageBitmap<"u"&&g.image instanceof ImageBitmap)===!1){const ie=Rt.getPrimaries(Rt.workingColorSpace),Se=g.colorSpace===Ri?null:Rt.getPrimaries(g.colorSpace),Re=g.colorSpace===Ri||ie===Se?e.NONE:e.BROWSER_DEFAULT_WEBGL;n.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,g.flipY),n.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,g.premultiplyAlpha),n.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,Re)}n.pixelStorei(e.UNPACK_ALIGNMENT,g.unpackAlignment);let te=p(g.image,!1,r.maxTextureSize);te=De(g,te);const ge=a.convert(g.format,g.colorSpace),Oe=a.convert(g.type);let xe=_(g.internalFormat,ge,Oe,g.normalized,g.colorSpace,g.isVideoTexture);Ie(Y,g);let Ae;const Ue=g.mipmaps,$e=g.isVideoTexture!==!0,Je=Me.__version===void 0||X===!0,O=he.dataReady,ve=b(g,te);if(g.isDepthTexture)xe=S(g.format===Di,g.type),Je&&($e?n.texStorage2D(e.TEXTURE_2D,1,xe,te.width,te.height):n.texImage2D(e.TEXTURE_2D,0,xe,te.width,te.height,0,ge,Oe,null));else if(g.isDataTexture)if(Ue.length>0){$e&&Je&&n.texStorage2D(e.TEXTURE_2D,ve,xe,Ue[0].width,Ue[0].height);for(let ie=0,Se=Ue.length;ie<Se;ie++)Ae=Ue[ie],$e?O&&n.texSubImage2D(e.TEXTURE_2D,ie,0,0,Ae.width,Ae.height,ge,Oe,Ae.data):n.texImage2D(e.TEXTURE_2D,ie,xe,Ae.width,Ae.height,0,ge,Oe,Ae.data);g.generateMipmaps=!1}else $e?(Je&&n.texStorage2D(e.TEXTURE_2D,ve,xe,te.width,te.height),O&&ae(g,te,ge,Oe)):n.texImage2D(e.TEXTURE_2D,0,xe,te.width,te.height,0,ge,Oe,te.data);else if(g.isCompressedTexture)if(g.isCompressedArrayTexture){$e&&Je&&n.texStorage3D(e.TEXTURE_2D_ARRAY,ve,xe,Ue[0].width,Ue[0].height,te.depth);for(let ie=0,Se=Ue.length;ie<Se;ie++)if(Ae=Ue[ie],g.format!==jn)if(ge!==null)if($e){if(O)if(g.layerUpdates.size>0){const Re=Ts(Ae.width,Ae.height,g.format,g.type);for(const le of g.layerUpdates){const Ve=Ae.data.subarray(le*Re/Ae.data.BYTES_PER_ELEMENT,(le+1)*Re/Ae.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,ie,0,0,le,Ae.width,Ae.height,1,ge,Ve)}g.clearLayerUpdates()}else n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,ie,0,0,0,Ae.width,Ae.height,te.depth,ge,Ae.data)}else n.compressedTexImage3D(e.TEXTURE_2D_ARRAY,ie,xe,Ae.width,Ae.height,te.depth,0,Ae.data,0,0);else _t("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else $e?O&&n.texSubImage3D(e.TEXTURE_2D_ARRAY,ie,0,0,0,Ae.width,Ae.height,te.depth,ge,Oe,Ae.data):n.texImage3D(e.TEXTURE_2D_ARRAY,ie,xe,Ae.width,Ae.height,te.depth,0,ge,Oe,Ae.data)}else{$e&&Je&&n.texStorage2D(e.TEXTURE_2D,ve,xe,Ue[0].width,Ue[0].height);for(let ie=0,Se=Ue.length;ie<Se;ie++)Ae=Ue[ie],g.format!==jn?ge!==null?$e?O&&n.compressedTexSubImage2D(e.TEXTURE_2D,ie,0,0,Ae.width,Ae.height,ge,Ae.data):n.compressedTexImage2D(e.TEXTURE_2D,ie,xe,Ae.width,Ae.height,0,Ae.data):_t("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):$e?O&&n.texSubImage2D(e.TEXTURE_2D,ie,0,0,Ae.width,Ae.height,ge,Oe,Ae.data):n.texImage2D(e.TEXTURE_2D,ie,xe,Ae.width,Ae.height,0,ge,Oe,Ae.data)}else if(g.isDataArrayTexture)if($e){if(Je&&n.texStorage3D(e.TEXTURE_2D_ARRAY,ve,xe,te.width,te.height,te.depth),O)if(g.layerUpdates.size>0){const ie=Ts(te.width,te.height,g.format,g.type);for(const Se of g.layerUpdates){const Re=te.data.subarray(Se*ie/te.data.BYTES_PER_ELEMENT,(Se+1)*ie/te.data.BYTES_PER_ELEMENT);n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,Se,te.width,te.height,1,ge,Oe,Re)}g.clearLayerUpdates()}else n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,0,te.width,te.height,te.depth,ge,Oe,te.data)}else n.texImage3D(e.TEXTURE_2D_ARRAY,0,xe,te.width,te.height,te.depth,0,ge,Oe,te.data);else if(g.isData3DTexture)$e?(Je&&n.texStorage3D(e.TEXTURE_3D,ve,xe,te.width,te.height,te.depth),O&&n.texSubImage3D(e.TEXTURE_3D,0,0,0,0,te.width,te.height,te.depth,ge,Oe,te.data)):n.texImage3D(e.TEXTURE_3D,0,xe,te.width,te.height,te.depth,0,ge,Oe,te.data);else if(g.isFramebufferTexture){if(Je)if($e)n.texStorage2D(e.TEXTURE_2D,ve,xe,te.width,te.height);else{let ie=te.width,Se=te.height;for(let Re=0;Re<ve;Re++)n.texImage2D(e.TEXTURE_2D,Re,xe,ie,Se,0,ge,Oe,null),ie>>=1,Se>>=1}}else if(g.isHTMLTexture){if("texElementImage2D"in e){const ie=e.canvas;if(ie.hasAttribute("layoutsubtree")||ie.setAttribute("layoutsubtree","true"),te.parentNode!==ie){ie.appendChild(te),d.add(g),ie.onpaint=Se=>{const Re=Se.changedElements;for(const le of d)Re.includes(le.image)&&(le.needsUpdate=!0)},ie.requestPaint();return}if(e.texElementImage2D.length===3)e.texElementImage2D(e.TEXTURE_2D,e.RGBA8,te);else{const Re=e.RGBA,le=e.RGBA,Ve=e.UNSIGNED_BYTE;e.texElementImage2D(e.TEXTURE_2D,0,Re,le,Ve,te)}e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE)}}else if(Ue.length>0){if($e&&Je){const ie=Pe(Ue[0]);n.texStorage2D(e.TEXTURE_2D,ve,xe,ie.width,ie.height)}for(let ie=0,Se=Ue.length;ie<Se;ie++)Ae=Ue[ie],$e?O&&n.texSubImage2D(e.TEXTURE_2D,ie,0,0,ge,Oe,Ae):n.texImage2D(e.TEXTURE_2D,ie,xe,ge,Oe,Ae);g.generateMipmaps=!1}else if($e){if(Je){const ie=Pe(te);n.texStorage2D(e.TEXTURE_2D,ve,xe,ie.width,ie.height)}O&&n.texSubImage2D(e.TEXTURE_2D,0,0,0,ge,Oe,te)}else n.texImage2D(e.TEXTURE_2D,0,xe,ge,Oe,te);f(g)&&E(Y),Me.__version=he.version,g.onUpdate&&g.onUpdate(g)}T.__version=g.version}function ue(T,g,V){if(g.image.length!==6)return;const Y=N(T,g),X=g.source;n.bindTexture(e.TEXTURE_CUBE_MAP,T.__webglTexture,e.TEXTURE0+V);const he=i.get(X);if(X.version!==he.__version||Y===!0){n.activeTexture(e.TEXTURE0+V);const Me=Rt.getPrimaries(Rt.workingColorSpace),J=g.colorSpace===Ri?null:Rt.getPrimaries(g.colorSpace),te=g.colorSpace===Ri||Me===J?e.NONE:e.BROWSER_DEFAULT_WEBGL;n.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,g.flipY),n.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,g.premultiplyAlpha),n.pixelStorei(e.UNPACK_ALIGNMENT,g.unpackAlignment),n.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,te);const ge=g.isCompressedTexture||g.image[0].isCompressedTexture,Oe=g.image[0]&&g.image[0].isDataTexture,xe=[];for(let le=0;le<6;le++)!ge&&!Oe?xe[le]=p(g.image[le],!0,r.maxCubemapSize):xe[le]=Oe?g.image[le].image:g.image[le],xe[le]=De(g,xe[le]);const Ae=xe[0],Ue=a.convert(g.format,g.colorSpace),$e=a.convert(g.type),Je=_(g.internalFormat,Ue,$e,g.normalized,g.colorSpace),O=g.isVideoTexture!==!0,ve=he.__version===void 0||Y===!0,ie=X.dataReady;let Se=b(g,Ae);Ie(e.TEXTURE_CUBE_MAP,g);let Re;if(ge){O&&ve&&n.texStorage2D(e.TEXTURE_CUBE_MAP,Se,Je,Ae.width,Ae.height);for(let le=0;le<6;le++){Re=xe[le].mipmaps;for(let Ve=0;Ve<Re.length;Ve++){const Be=Re[Ve];g.format!==jn?Ue!==null?O?ie&&n.compressedTexSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+le,Ve,0,0,Be.width,Be.height,Ue,Be.data):n.compressedTexImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+le,Ve,Je,Be.width,Be.height,0,Be.data):_t("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):O?ie&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+le,Ve,0,0,Be.width,Be.height,Ue,$e,Be.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+le,Ve,Je,Be.width,Be.height,0,Ue,$e,Be.data)}}}else{if(Re=g.mipmaps,O&&ve){Re.length>0&&Se++;const le=Pe(xe[0]);n.texStorage2D(e.TEXTURE_CUBE_MAP,Se,Je,le.width,le.height)}for(let le=0;le<6;le++)if(Oe){O?ie&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+le,0,0,0,xe[le].width,xe[le].height,Ue,$e,xe[le].data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+le,0,Je,xe[le].width,xe[le].height,0,Ue,$e,xe[le].data);for(let Ve=0;Ve<Re.length;Ve++){const At=Re[Ve].image[le].image;O?ie&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+le,Ve+1,0,0,At.width,At.height,Ue,$e,At.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+le,Ve+1,Je,At.width,At.height,0,Ue,$e,At.data)}}else{O?ie&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+le,0,0,0,Ue,$e,xe[le]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+le,0,Je,Ue,$e,xe[le]);for(let Ve=0;Ve<Re.length;Ve++){const Be=Re[Ve];O?ie&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+le,Ve+1,0,0,Ue,$e,Be.image[le]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+le,Ve+1,Je,Ue,$e,Be.image[le])}}}f(g)&&E(e.TEXTURE_CUBE_MAP),he.__version=X.version,g.onUpdate&&g.onUpdate(g)}T.__version=g.version}function se(T,g,V,Y,X,he){const Me=a.convert(V.format,V.colorSpace),J=a.convert(V.type),te=_(V.internalFormat,Me,J,V.normalized,V.colorSpace),ge=i.get(g),Oe=i.get(V);if(Oe.__renderTarget=g,!ge.__hasExternalTextures){const xe=Math.max(1,g.width>>he),Ae=Math.max(1,g.height>>he);X===e.TEXTURE_3D||X===e.TEXTURE_2D_ARRAY?n.texImage3D(X,he,te,xe,Ae,g.depth,0,Me,J,null):n.texImage2D(X,he,te,xe,Ae,0,Me,J,null)}n.bindFramebuffer(e.FRAMEBUFFER,T),pt(g)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,Y,X,Oe.__webglTexture,0,ut(g)):(X===e.TEXTURE_2D||X>=e.TEXTURE_CUBE_MAP_POSITIVE_X&&X<=e.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&e.framebufferTexture2D(e.FRAMEBUFFER,Y,X,Oe.__webglTexture,he),n.bindFramebuffer(e.FRAMEBUFFER,null)}function Ee(T,g,V){if(e.bindRenderbuffer(e.RENDERBUFFER,T),g.depthBuffer){const Y=g.depthTexture,X=Y&&Y.isDepthTexture?Y.type:null,he=S(g.stencilBuffer,X),Me=g.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;pt(g)?s.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,ut(g),he,g.width,g.height):V?e.renderbufferStorageMultisample(e.RENDERBUFFER,ut(g),he,g.width,g.height):e.renderbufferStorage(e.RENDERBUFFER,he,g.width,g.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,Me,e.RENDERBUFFER,T)}else{const Y=g.textures;for(let X=0;X<Y.length;X++){const he=Y[X],Me=a.convert(he.format,he.colorSpace),J=a.convert(he.type),te=_(he.internalFormat,Me,J,he.normalized,he.colorSpace);pt(g)?s.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,ut(g),te,g.width,g.height):V?e.renderbufferStorageMultisample(e.RENDERBUFFER,ut(g),te,g.width,g.height):e.renderbufferStorage(e.RENDERBUFFER,te,g.width,g.height)}}e.bindRenderbuffer(e.RENDERBUFFER,null)}function z(T,g,V){const Y=g.isWebGLCubeRenderTarget===!0;if(n.bindFramebuffer(e.FRAMEBUFFER,T),!(g.depthTexture&&g.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const X=i.get(g.depthTexture);if(X.__renderTarget=g,(!X.__webglTexture||g.depthTexture.image.width!==g.width||g.depthTexture.image.height!==g.height)&&(g.depthTexture.image.width=g.width,g.depthTexture.image.height=g.height,g.depthTexture.needsUpdate=!0),Y){if(X.__webglInit===void 0&&(X.__webglInit=!0,g.depthTexture.addEventListener("dispose",C)),X.__webglTexture===void 0){X.__webglTexture=e.createTexture(),n.bindTexture(e.TEXTURE_CUBE_MAP,X.__webglTexture),Ie(e.TEXTURE_CUBE_MAP,g.depthTexture);const ge=a.convert(g.depthTexture.format),Oe=a.convert(g.depthTexture.type);let xe;g.depthTexture.format===Oi?xe=e.DEPTH_COMPONENT24:g.depthTexture.format===Di&&(xe=e.DEPTH24_STENCIL8);for(let Ae=0;Ae<6;Ae++)e.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+Ae,0,xe,g.width,g.height,0,ge,Oe,null)}}else H(g.depthTexture,0);const he=X.__webglTexture,Me=ut(g),J=Y?e.TEXTURE_CUBE_MAP_POSITIVE_X+V:e.TEXTURE_2D,te=g.depthTexture.format===Di?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;if(g.depthTexture.format===Oi)pt(g)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,te,J,he,0,Me):e.framebufferTexture2D(e.FRAMEBUFFER,te,J,he,0);else if(g.depthTexture.format===Di)pt(g)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,te,J,he,0,Me):e.framebufferTexture2D(e.FRAMEBUFFER,te,J,he,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function re(T){const g=i.get(T),V=T.isWebGLCubeRenderTarget===!0;if(g.__boundDepthTexture!==T.depthTexture){const Y=T.depthTexture;if(g.__depthDisposeCallback&&g.__depthDisposeCallback(),Y){const X=()=>{delete g.__boundDepthTexture,delete g.__depthDisposeCallback,Y.removeEventListener("dispose",X)};Y.addEventListener("dispose",X),g.__depthDisposeCallback=X}g.__boundDepthTexture=Y}if(T.depthTexture&&!g.__autoAllocateDepthBuffer)if(V)for(let Y=0;Y<6;Y++)z(g.__webglFramebuffer[Y],T,Y);else{const Y=T.texture.mipmaps;Y&&Y.length>0?z(g.__webglFramebuffer[0],T,0):z(g.__webglFramebuffer,T,0)}else if(V){g.__webglDepthbuffer=[];for(let Y=0;Y<6;Y++)if(n.bindFramebuffer(e.FRAMEBUFFER,g.__webglFramebuffer[Y]),g.__webglDepthbuffer[Y]===void 0)g.__webglDepthbuffer[Y]=e.createRenderbuffer(),Ee(g.__webglDepthbuffer[Y],T,!1);else{const X=T.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,he=g.__webglDepthbuffer[Y];e.bindRenderbuffer(e.RENDERBUFFER,he),e.framebufferRenderbuffer(e.FRAMEBUFFER,X,e.RENDERBUFFER,he)}}else{const Y=T.texture.mipmaps;if(Y&&Y.length>0?n.bindFramebuffer(e.FRAMEBUFFER,g.__webglFramebuffer[0]):n.bindFramebuffer(e.FRAMEBUFFER,g.__webglFramebuffer),g.__webglDepthbuffer===void 0)g.__webglDepthbuffer=e.createRenderbuffer(),Ee(g.__webglDepthbuffer,T,!1);else{const X=T.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,he=g.__webglDepthbuffer;e.bindRenderbuffer(e.RENDERBUFFER,he),e.framebufferRenderbuffer(e.FRAMEBUFFER,X,e.RENDERBUFFER,he)}}n.bindFramebuffer(e.FRAMEBUFFER,null)}function de(T,g,V){const Y=i.get(T);g!==void 0&&se(Y.__webglFramebuffer,T,T.texture,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,0),V!==void 0&&re(T)}function me(T){const g=T.texture,V=i.get(T),Y=i.get(g);T.addEventListener("dispose",x);const X=T.textures,he=T.isWebGLCubeRenderTarget===!0,Me=X.length>1;if(Me||(Y.__webglTexture===void 0&&(Y.__webglTexture=e.createTexture()),Y.__version=g.version,o.memory.textures++),he){V.__webglFramebuffer=[];for(let J=0;J<6;J++)if(g.mipmaps&&g.mipmaps.length>0){V.__webglFramebuffer[J]=[];for(let te=0;te<g.mipmaps.length;te++)V.__webglFramebuffer[J][te]=e.createFramebuffer()}else V.__webglFramebuffer[J]=e.createFramebuffer()}else{if(g.mipmaps&&g.mipmaps.length>0){V.__webglFramebuffer=[];for(let J=0;J<g.mipmaps.length;J++)V.__webglFramebuffer[J]=e.createFramebuffer()}else V.__webglFramebuffer=e.createFramebuffer();if(Me)for(let J=0,te=X.length;J<te;J++){const ge=i.get(X[J]);ge.__webglTexture===void 0&&(ge.__webglTexture=e.createTexture(),o.memory.textures++)}if(T.samples>0&&pt(T)===!1){V.__webglMultisampledFramebuffer=e.createFramebuffer(),V.__webglColorRenderbuffer=[],n.bindFramebuffer(e.FRAMEBUFFER,V.__webglMultisampledFramebuffer);for(let J=0;J<X.length;J++){const te=X[J];V.__webglColorRenderbuffer[J]=e.createRenderbuffer(),e.bindRenderbuffer(e.RENDERBUFFER,V.__webglColorRenderbuffer[J]);const ge=a.convert(te.format,te.colorSpace),Oe=a.convert(te.type),xe=_(te.internalFormat,ge,Oe,te.normalized,te.colorSpace,T.isXRRenderTarget===!0),Ae=ut(T);e.renderbufferStorageMultisample(e.RENDERBUFFER,Ae,xe,T.width,T.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+J,e.RENDERBUFFER,V.__webglColorRenderbuffer[J])}e.bindRenderbuffer(e.RENDERBUFFER,null),T.depthBuffer&&(V.__webglDepthRenderbuffer=e.createRenderbuffer(),Ee(V.__webglDepthRenderbuffer,T,!0)),n.bindFramebuffer(e.FRAMEBUFFER,null)}}if(he){n.bindTexture(e.TEXTURE_CUBE_MAP,Y.__webglTexture),Ie(e.TEXTURE_CUBE_MAP,g);for(let J=0;J<6;J++)if(g.mipmaps&&g.mipmaps.length>0)for(let te=0;te<g.mipmaps.length;te++)se(V.__webglFramebuffer[J][te],T,g,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+J,te);else se(V.__webglFramebuffer[J],T,g,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+J,0);f(g)&&E(e.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(Me){for(let J=0,te=X.length;J<te;J++){const ge=X[J],Oe=i.get(ge);let xe=e.TEXTURE_2D;(T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(xe=T.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(xe,Oe.__webglTexture),Ie(xe,ge),se(V.__webglFramebuffer,T,ge,e.COLOR_ATTACHMENT0+J,xe,0),f(ge)&&E(xe)}n.unbindTexture()}else{let J=e.TEXTURE_2D;if((T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(J=T.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(J,Y.__webglTexture),Ie(J,g),g.mipmaps&&g.mipmaps.length>0)for(let te=0;te<g.mipmaps.length;te++)se(V.__webglFramebuffer[te],T,g,e.COLOR_ATTACHMENT0,J,te);else se(V.__webglFramebuffer,T,g,e.COLOR_ATTACHMENT0,J,0);f(g)&&E(J),n.unbindTexture()}T.depthBuffer&&re(T)}function Ye(T){const g=T.textures;for(let V=0,Y=g.length;V<Y;V++){const X=g[V];if(f(X)){const he=A(T),Me=i.get(X).__webglTexture;n.bindTexture(he,Me),E(he),n.unbindTexture()}}}const Fe=[],et=[];function at(T){if(T.samples>0){if(pt(T)===!1){const g=T.textures,V=T.width,Y=T.height;let X=e.COLOR_BUFFER_BIT;const he=T.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,Me=i.get(T),J=g.length>1;if(J)for(let ge=0;ge<g.length;ge++)n.bindFramebuffer(e.FRAMEBUFFER,Me.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+ge,e.RENDERBUFFER,null),n.bindFramebuffer(e.FRAMEBUFFER,Me.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+ge,e.TEXTURE_2D,null,0);n.bindFramebuffer(e.READ_FRAMEBUFFER,Me.__webglMultisampledFramebuffer);const te=T.texture.mipmaps;te&&te.length>0?n.bindFramebuffer(e.DRAW_FRAMEBUFFER,Me.__webglFramebuffer[0]):n.bindFramebuffer(e.DRAW_FRAMEBUFFER,Me.__webglFramebuffer);for(let ge=0;ge<g.length;ge++){if(T.resolveDepthBuffer&&(T.depthBuffer&&(X|=e.DEPTH_BUFFER_BIT),T.stencilBuffer&&T.resolveStencilBuffer&&(X|=e.STENCIL_BUFFER_BIT)),J){e.framebufferRenderbuffer(e.READ_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.RENDERBUFFER,Me.__webglColorRenderbuffer[ge]);const Oe=i.get(g[ge]).__webglTexture;e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,Oe,0)}e.blitFramebuffer(0,0,V,Y,0,0,V,Y,X,e.NEAREST),u===!0&&(Fe.length=0,et.length=0,Fe.push(e.COLOR_ATTACHMENT0+ge),T.depthBuffer&&T.resolveDepthBuffer===!1&&(Fe.push(he),et.push(he),e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,et)),e.invalidateFramebuffer(e.READ_FRAMEBUFFER,Fe))}if(n.bindFramebuffer(e.READ_FRAMEBUFFER,null),n.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),J)for(let ge=0;ge<g.length;ge++){n.bindFramebuffer(e.FRAMEBUFFER,Me.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+ge,e.RENDERBUFFER,Me.__webglColorRenderbuffer[ge]);const Oe=i.get(g[ge]).__webglTexture;n.bindFramebuffer(e.FRAMEBUFFER,Me.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+ge,e.TEXTURE_2D,Oe,0)}n.bindFramebuffer(e.DRAW_FRAMEBUFFER,Me.__webglMultisampledFramebuffer)}else if(T.depthBuffer&&T.resolveDepthBuffer===!1&&u){const g=T.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,[g])}}}function ut(T){return Math.min(r.maxSamples,T.samples)}function pt(T){const g=i.get(T);return T.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&g.__useRenderToTexture!==!1}function P(T){const g=o.render.frame;h.get(T)!==g&&(h.set(T,g),T.update())}function De(T,g){const V=T.colorSpace,Y=T.format,X=T.type;return T.isCompressedTexture===!0||T.isVideoTexture===!0||V!==Nc&&V!==Ri&&(Rt.getTransfer(V)===Et?(Y!==jn||X!==Rn)&&_t("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Mt("WebGLTextures: Unsupported texture color space:",V)),g}function Pe(T){return typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement?(l.width=T.naturalWidth||T.width,l.height=T.naturalHeight||T.height):typeof VideoFrame<"u"&&T instanceof VideoFrame?(l.width=T.displayWidth,l.height=T.displayHeight):(l.width=T.width,l.height=T.height),l}this.allocateTextureUnit=W,this.resetTextureUnits=Z,this.getTextureUnits=k,this.setTextureUnits=I,this.setTexture2D=H,this.setTexture2DArray=ee,this.setTexture3D=fe,this.setTextureCube=ce,this.rebindTextures=de,this.setupRenderTarget=me,this.updateRenderTargetMipmap=Ye,this.updateMultisampleRenderTarget=at,this.setupDepthRenderbuffer=re,this.setupFrameBufferTexture=se,this.useMultisampledRTT=pt,this.isReversedDepthBuffer=function(){return n.buffers.depth.getReversed()}}function G_(e,t){function n(i,r=Ri){let a;const o=Rt.getTransfer(r);if(i===Rn)return e.UNSIGNED_BYTE;if(i===vc)return e.UNSIGNED_SHORT_4_4_4_4;if(i===Sc)return e.UNSIGNED_SHORT_5_5_5_1;if(i===Nd)return e.UNSIGNED_INT_5_9_9_9_REV;if(i===Ud)return e.UNSIGNED_INT_10F_11F_11F_REV;if(i===Fd)return e.BYTE;if(i===Od)return e.SHORT;if(i===oa)return e.UNSIGNED_SHORT;if(i===Mc)return e.INT;if(i===Mi)return e.UNSIGNED_INT;if(i===oi)return e.FLOAT;if(i===di)return e.HALF_FLOAT;if(i===Bd)return e.ALPHA;if(i===zd)return e.RGB;if(i===jn)return e.RGBA;if(i===Oi)return e.DEPTH_COMPONENT;if(i===Di)return e.DEPTH_STENCIL;if(i===Gd)return e.RED;if(i===xc)return e.RED_INTEGER;if(i===Bi)return e.RG;if(i===_c)return e.RG_INTEGER;if(i===gc)return e.RGBA_INTEGER;if(i===Ta||i===Pa||i===wa||i===Ra)if(o===Et)if(a=t.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(i===Ta)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Pa)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===wa)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Ra)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=t.get("WEBGL_compressed_texture_s3tc"),a!==null){if(i===Ta)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Pa)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===wa)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Ra)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Xo||i===Yo||i===$o||i===Ko)if(a=t.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(i===Xo)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Yo)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===$o)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Ko)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===qo||i===jo||i===Zo||i===Jo||i===Qo||i===to||i===es)if(a=t.get("WEBGL_compressed_texture_etc"),a!==null){if(i===qo||i===jo)return o===Et?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(i===Zo)return o===Et?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC;if(i===Jo)return a.COMPRESSED_R11_EAC;if(i===Qo)return a.COMPRESSED_SIGNED_R11_EAC;if(i===to)return a.COMPRESSED_RG11_EAC;if(i===es)return a.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===ts||i===ns||i===is||i===rs||i===as||i===os||i===ss||i===ls||i===cs||i===us||i===ds||i===fs||i===ps||i===hs)if(a=t.get("WEBGL_compressed_texture_astc"),a!==null){if(i===ts)return o===Et?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===ns)return o===Et?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===is)return o===Et?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===rs)return o===Et?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===as)return o===Et?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===os)return o===Et?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===ss)return o===Et?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===ls)return o===Et?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===cs)return o===Et?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===us)return o===Et?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===ds)return o===Et?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===fs)return o===Et?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===ps)return o===Et?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===hs)return o===Et?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===ms||i===gs||i===_s)if(a=t.get("EXT_texture_compression_bptc"),a!==null){if(i===ms)return o===Et?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===gs)return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===_s)return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===xs||i===vs||i===no||i===Ss)if(a=t.get("EXT_texture_compression_rgtc"),a!==null){if(i===xs)return a.COMPRESSED_RED_RGTC1_EXT;if(i===vs)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===no)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Ss)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Er?e.UNSIGNED_INT_24_8:e[i]!==void 0?e[i]:null}return{convert:n}}const V_=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,H_=`
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

}`;class k_{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,n){if(this.texture===null){const i=new Ec(t.texture);(t.depthNear!==n.depthNear||t.depthFar!==n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=i}}getMesh(t){if(this.texture!==null&&this.mesh===null){const n=t.cameras[0].viewport,i=new yn({vertexShader:V_,fragmentShader:H_,uniforms:{depthColor:{value:this.texture},depthWidth:{value:n.z},depthHeight:{value:n.w}}});this.mesh=new nn(new ma(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class W_ extends Qu{constructor(t,n){super();const i=this;let r=null,a=1,o=null,s="local-floor",u=1,l=null,h=null,d=null,c=null,m=null,v=null;const y=typeof XRWebGLBinding<"u",p=new k_,f={},E=n.getContextAttributes();let A=null,_=null;const S=[],b=[],C=new Ke;let x=null;const R=new pr;R.viewport=new zt;const U=new pr;U.viewport=new zt;const D=[R,U],B=new ed;let Z=null,k=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(N){let ne=S[N];return ne===void 0&&(ne=new ba,S[N]=ne),ne.getTargetRaySpace()},this.getControllerGrip=function(N){let ne=S[N];return ne===void 0&&(ne=new ba,S[N]=ne),ne.getGripSpace()},this.getHand=function(N){let ne=S[N];return ne===void 0&&(ne=new ba,S[N]=ne),ne.getHandSpace()};function I(N){const ne=b.indexOf(N.inputSource);if(ne===-1)return;const ae=S[ne];ae!==void 0&&(ae.update(N.inputSource,N.frame,l||o),ae.dispatchEvent({type:N.type,data:N.inputSource}))}function W(){r.removeEventListener("select",I),r.removeEventListener("selectstart",I),r.removeEventListener("selectend",I),r.removeEventListener("squeeze",I),r.removeEventListener("squeezestart",I),r.removeEventListener("squeezeend",I),r.removeEventListener("end",W),r.removeEventListener("inputsourceschange",L);for(let N=0;N<S.length;N++){const ne=b[N];ne!==null&&(b[N]=null,S[N].disconnect(ne))}Z=null,k=null,p.reset();for(const N in f)delete f[N];t.setRenderTarget(A),m=null,c=null,d=null,r=null,_=null,Ie.stop(),i.isPresenting=!1,t.setPixelRatio(x),t.setSize(C.width,C.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(N){a=N,i.isPresenting===!0&&_t("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(N){s=N,i.isPresenting===!0&&_t("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(N){l=N},this.getBaseLayer=function(){return c!==null?c:m},this.getBinding=function(){return d===null&&y&&(d=new XRWebGLBinding(r,n)),d},this.getFrame=function(){return v},this.getSession=function(){return r},this.setSession=async function(N){if(r=N,r!==null){if(A=t.getRenderTarget(),r.addEventListener("select",I),r.addEventListener("selectstart",I),r.addEventListener("selectend",I),r.addEventListener("squeeze",I),r.addEventListener("squeezestart",I),r.addEventListener("squeezeend",I),r.addEventListener("end",W),r.addEventListener("inputsourceschange",L),E.xrCompatible!==!0&&await n.makeXRCompatible(),x=t.getPixelRatio(),t.getSize(C),y&&"createProjectionLayer"in XRWebGLBinding.prototype){let ae=null,q=null,ue=null;E.depth&&(ue=E.stencil?n.DEPTH24_STENCIL8:n.DEPTH_COMPONENT24,ae=E.stencil?Di:Oi,q=E.stencil?Er:Mi);const se={colorFormat:n.RGBA8,depthFormat:ue,scaleFactor:a};d=this.getBinding(),c=d.createProjectionLayer(se),r.updateRenderState({layers:[c]}),t.setPixelRatio(1),t.setSize(c.textureWidth,c.textureHeight,!1),_=new Un(c.textureWidth,c.textureHeight,{format:jn,type:Rn,depthTexture:new vr(c.textureWidth,c.textureHeight,q,void 0,void 0,void 0,void 0,void 0,void 0,ae),stencilBuffer:E.stencil,colorSpace:t.outputColorSpace,samples:E.antialias?4:0,resolveDepthBuffer:c.ignoreDepthValues===!1,resolveStencilBuffer:c.ignoreDepthValues===!1})}else{const ae={antialias:E.antialias,alpha:!0,depth:E.depth,stencil:E.stencil,framebufferScaleFactor:a};m=new XRWebGLLayer(r,n,ae),r.updateRenderState({baseLayer:m}),t.setPixelRatio(1),t.setSize(m.framebufferWidth,m.framebufferHeight,!1),_=new Un(m.framebufferWidth,m.framebufferHeight,{format:jn,type:Rn,colorSpace:t.outputColorSpace,stencilBuffer:E.stencil,resolveDepthBuffer:m.ignoreDepthValues===!1,resolveStencilBuffer:m.ignoreDepthValues===!1})}_.isXRRenderTarget=!0,this.setFoveation(u),l=null,o=await r.requestReferenceSpace(s),Ie.setContext(r),Ie.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return p.getDepthTexture()};function L(N){for(let ne=0;ne<N.removed.length;ne++){const ae=N.removed[ne],q=b.indexOf(ae);q>=0&&(b[q]=null,S[q].disconnect(ae))}for(let ne=0;ne<N.added.length;ne++){const ae=N.added[ne];let q=b.indexOf(ae);if(q===-1){for(let se=0;se<S.length;se++)if(se>=b.length){b.push(ae),q=se;break}else if(b[se]===null){b[se]=ae,q=se;break}if(q===-1)break}const ue=S[q];ue&&ue.connect(ae)}}const H=new Q,ee=new Q;function fe(N,ne,ae){H.setFromMatrixPosition(ne.matrixWorld),ee.setFromMatrixPosition(ae.matrixWorld);const q=H.distanceTo(ee),ue=ne.projectionMatrix.elements,se=ae.projectionMatrix.elements,Ee=ue[14]/(ue[10]-1),z=ue[14]/(ue[10]+1),re=(ue[9]+1)/ue[5],de=(ue[9]-1)/ue[5],me=(ue[8]-1)/ue[0],Ye=(se[8]+1)/se[0],Fe=Ee*me,et=Ee*Ye,at=q/(-me+Ye),ut=at*-me;if(ne.matrixWorld.decompose(N.position,N.quaternion,N.scale),N.translateX(ut),N.translateZ(at),N.matrixWorld.compose(N.position,N.quaternion,N.scale),N.matrixWorldInverse.copy(N.matrixWorld).invert(),ue[10]===-1)N.projectionMatrix.copy(ne.projectionMatrix),N.projectionMatrixInverse.copy(ne.projectionMatrixInverse);else{const pt=Ee+at,P=z+at,De=Fe-ut,Pe=et+(q-ut),T=re*z/P*pt,g=de*z/P*pt;N.projectionMatrix.makePerspective(De,Pe,T,g,pt,P),N.projectionMatrixInverse.copy(N.projectionMatrix).invert()}}function ce(N,ne){ne===null?N.matrixWorld.copy(N.matrix):N.matrixWorld.multiplyMatrices(ne.matrixWorld,N.matrix),N.matrixWorldInverse.copy(N.matrixWorld).invert()}this.updateCamera=function(N){if(r===null)return;let ne=N.near,ae=N.far;p.texture!==null&&(p.depthNear>0&&(ne=p.depthNear),p.depthFar>0&&(ae=p.depthFar)),B.near=U.near=R.near=ne,B.far=U.far=R.far=ae,(Z!==B.near||k!==B.far)&&(r.updateRenderState({depthNear:B.near,depthFar:B.far}),Z=B.near,k=B.far),B.layers.mask=N.layers.mask|6,R.layers.mask=B.layers.mask&-5,U.layers.mask=B.layers.mask&-3;const q=N.parent,ue=B.cameras;ce(B,q);for(let se=0;se<ue.length;se++)ce(ue[se],q);ue.length===2?fe(B,R,U):B.projectionMatrix.copy(R.projectionMatrix),pe(N,B,q)};function pe(N,ne,ae){ae===null?N.matrix.copy(ne.matrixWorld):(N.matrix.copy(ae.matrixWorld),N.matrix.invert(),N.matrix.multiply(ne.matrixWorld)),N.matrix.decompose(N.position,N.quaternion,N.scale),N.updateMatrixWorld(!0),N.projectionMatrix.copy(ne.projectionMatrix),N.projectionMatrixInverse.copy(ne.projectionMatrixInverse),N.isPerspectiveCamera&&(N.fov=td*2*Math.atan(1/N.projectionMatrix.elements[5]),N.zoom=1)}this.getCamera=function(){return B},this.getFoveation=function(){if(!(c===null&&m===null))return u},this.setFoveation=function(N){u=N,c!==null&&(c.fixedFoveation=N),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=N)},this.hasDepthSensing=function(){return p.texture!==null},this.getDepthSensingMesh=function(){return p.getMesh(B)},this.getCameraTexture=function(N){return f[N]};let He=null;function Ge(N,ne){if(h=ne.getViewerPose(l||o),v=ne,h!==null){const ae=h.views;m!==null&&(t.setRenderTargetFramebuffer(_,m.framebuffer),t.setRenderTarget(_));let q=!1;ae.length!==B.cameras.length&&(B.cameras.length=0,q=!0);for(let z=0;z<ae.length;z++){const re=ae[z];let de=null;if(m!==null)de=m.getViewport(re);else{const Ye=d.getViewSubImage(c,re);de=Ye.viewport,z===0&&(t.setRenderTargetTextures(_,Ye.colorTexture,Ye.depthStencilTexture),t.setRenderTarget(_))}let me=D[z];me===void 0&&(me=new pr,me.layers.enable(z),me.viewport=new zt,D[z]=me),me.matrix.fromArray(re.transform.matrix),me.matrix.decompose(me.position,me.quaternion,me.scale),me.projectionMatrix.fromArray(re.projectionMatrix),me.projectionMatrixInverse.copy(me.projectionMatrix).invert(),me.viewport.set(de.x,de.y,de.width,de.height),z===0&&(B.matrix.copy(me.matrix),B.matrix.decompose(B.position,B.quaternion,B.scale)),q===!0&&B.cameras.push(me)}const ue=r.enabledFeatures;if(ue&&ue.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&y){d=i.getBinding();const z=d.getDepthInformation(ae[0]);z&&z.isValid&&z.texture&&p.init(z,r.renderState)}if(ue&&ue.includes("camera-access")&&y){t.state.unbindTexture(),d=i.getBinding();for(let z=0;z<ae.length;z++){const re=ae[z].camera;if(re){let de=f[re];de||(de=new Ec,f[re]=de);const me=d.getCameraImage(re);de.sourceTexture=me}}}}for(let ae=0;ae<S.length;ae++){const q=b[ae],ue=S[ae];q!==null&&ue!==void 0&&ue.update(q,ne,l||o)}He&&He(N,ne),ne.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:ne}),v=null}const Ie=new Kc;Ie.setAnimationLoop(Ge),this.setAnimationLoop=function(N){He=N},this.dispose=function(){}}}const X_=new ui,tu=new dt;tu.set(-1,0,0,0,1,0,0,0,1);function Y_(e,t){function n(p,f){p.matrixAutoUpdate===!0&&p.updateMatrix(),f.value.copy(p.matrix)}function i(p,f){f.color.getRGB(p.fogColor.value,bc(e)),f.isFog?(p.fogNear.value=f.near,p.fogFar.value=f.far):f.isFogExp2&&(p.fogDensity.value=f.density)}function r(p,f,E,A,_){f.isNodeMaterial?f.uniformsNeedUpdate=!1:f.isMeshBasicMaterial?a(p,f):f.isMeshLambertMaterial?(a(p,f),f.envMap&&(p.envMapIntensity.value=f.envMapIntensity)):f.isMeshToonMaterial?(a(p,f),d(p,f)):f.isMeshPhongMaterial?(a(p,f),h(p,f),f.envMap&&(p.envMapIntensity.value=f.envMapIntensity)):f.isMeshStandardMaterial?(a(p,f),c(p,f),f.isMeshPhysicalMaterial&&m(p,f,_)):f.isMeshMatcapMaterial?(a(p,f),v(p,f)):f.isMeshDepthMaterial?a(p,f):f.isMeshDistanceMaterial?(a(p,f),y(p,f)):f.isMeshNormalMaterial?a(p,f):f.isLineBasicMaterial?(o(p,f),f.isLineDashedMaterial&&s(p,f)):f.isPointsMaterial?u(p,f,E,A):f.isSpriteMaterial?l(p,f):f.isShadowMaterial?(p.color.value.copy(f.color),p.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function a(p,f){p.opacity.value=f.opacity,f.color&&p.diffuse.value.copy(f.color),f.emissive&&p.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(p.map.value=f.map,n(f.map,p.mapTransform)),f.alphaMap&&(p.alphaMap.value=f.alphaMap,n(f.alphaMap,p.alphaMapTransform)),f.bumpMap&&(p.bumpMap.value=f.bumpMap,n(f.bumpMap,p.bumpMapTransform),p.bumpScale.value=f.bumpScale,f.side===hn&&(p.bumpScale.value*=-1)),f.normalMap&&(p.normalMap.value=f.normalMap,n(f.normalMap,p.normalMapTransform),p.normalScale.value.copy(f.normalScale),f.side===hn&&p.normalScale.value.negate()),f.displacementMap&&(p.displacementMap.value=f.displacementMap,n(f.displacementMap,p.displacementMapTransform),p.displacementScale.value=f.displacementScale,p.displacementBias.value=f.displacementBias),f.emissiveMap&&(p.emissiveMap.value=f.emissiveMap,n(f.emissiveMap,p.emissiveMapTransform)),f.specularMap&&(p.specularMap.value=f.specularMap,n(f.specularMap,p.specularMapTransform)),f.alphaTest>0&&(p.alphaTest.value=f.alphaTest);const E=t.get(f),A=E.envMap,_=E.envMapRotation;A&&(p.envMap.value=A,p.envMapRotation.value.setFromMatrix4(X_.makeRotationFromEuler(_)).transpose(),A.isCubeTexture&&A.isRenderTargetTexture===!1&&p.envMapRotation.value.premultiply(tu),p.reflectivity.value=f.reflectivity,p.ior.value=f.ior,p.refractionRatio.value=f.refractionRatio),f.lightMap&&(p.lightMap.value=f.lightMap,p.lightMapIntensity.value=f.lightMapIntensity,n(f.lightMap,p.lightMapTransform)),f.aoMap&&(p.aoMap.value=f.aoMap,p.aoMapIntensity.value=f.aoMapIntensity,n(f.aoMap,p.aoMapTransform))}function o(p,f){p.diffuse.value.copy(f.color),p.opacity.value=f.opacity,f.map&&(p.map.value=f.map,n(f.map,p.mapTransform))}function s(p,f){p.dashSize.value=f.dashSize,p.totalSize.value=f.dashSize+f.gapSize,p.scale.value=f.scale}function u(p,f,E,A){p.diffuse.value.copy(f.color),p.opacity.value=f.opacity,p.size.value=f.size*E,p.scale.value=A*.5,f.map&&(p.map.value=f.map,n(f.map,p.uvTransform)),f.alphaMap&&(p.alphaMap.value=f.alphaMap,n(f.alphaMap,p.alphaMapTransform)),f.alphaTest>0&&(p.alphaTest.value=f.alphaTest)}function l(p,f){p.diffuse.value.copy(f.color),p.opacity.value=f.opacity,p.rotation.value=f.rotation,f.map&&(p.map.value=f.map,n(f.map,p.mapTransform)),f.alphaMap&&(p.alphaMap.value=f.alphaMap,n(f.alphaMap,p.alphaMapTransform)),f.alphaTest>0&&(p.alphaTest.value=f.alphaTest)}function h(p,f){p.specular.value.copy(f.specular),p.shininess.value=Math.max(f.shininess,1e-4)}function d(p,f){f.gradientMap&&(p.gradientMap.value=f.gradientMap)}function c(p,f){p.metalness.value=f.metalness,f.metalnessMap&&(p.metalnessMap.value=f.metalnessMap,n(f.metalnessMap,p.metalnessMapTransform)),p.roughness.value=f.roughness,f.roughnessMap&&(p.roughnessMap.value=f.roughnessMap,n(f.roughnessMap,p.roughnessMapTransform)),f.envMap&&(p.envMapIntensity.value=f.envMapIntensity)}function m(p,f,E){p.ior.value=f.ior,f.sheen>0&&(p.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),p.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(p.sheenColorMap.value=f.sheenColorMap,n(f.sheenColorMap,p.sheenColorMapTransform)),f.sheenRoughnessMap&&(p.sheenRoughnessMap.value=f.sheenRoughnessMap,n(f.sheenRoughnessMap,p.sheenRoughnessMapTransform))),f.clearcoat>0&&(p.clearcoat.value=f.clearcoat,p.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(p.clearcoatMap.value=f.clearcoatMap,n(f.clearcoatMap,p.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,n(f.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(p.clearcoatNormalMap.value=f.clearcoatNormalMap,n(f.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===hn&&p.clearcoatNormalScale.value.negate())),f.dispersion>0&&(p.dispersion.value=f.dispersion),f.iridescence>0&&(p.iridescence.value=f.iridescence,p.iridescenceIOR.value=f.iridescenceIOR,p.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(p.iridescenceMap.value=f.iridescenceMap,n(f.iridescenceMap,p.iridescenceMapTransform)),f.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=f.iridescenceThicknessMap,n(f.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),f.transmission>0&&(p.transmission.value=f.transmission,p.transmissionSamplerMap.value=E.texture,p.transmissionSamplerSize.value.set(E.width,E.height),f.transmissionMap&&(p.transmissionMap.value=f.transmissionMap,n(f.transmissionMap,p.transmissionMapTransform)),p.thickness.value=f.thickness,f.thicknessMap&&(p.thicknessMap.value=f.thicknessMap,n(f.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=f.attenuationDistance,p.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(p.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(p.anisotropyMap.value=f.anisotropyMap,n(f.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=f.specularIntensity,p.specularColor.value.copy(f.specularColor),f.specularColorMap&&(p.specularColorMap.value=f.specularColorMap,n(f.specularColorMap,p.specularColorMapTransform)),f.specularIntensityMap&&(p.specularIntensityMap.value=f.specularIntensityMap,n(f.specularIntensityMap,p.specularIntensityMapTransform))}function v(p,f){f.matcap&&(p.matcap.value=f.matcap)}function y(p,f){const E=t.get(f).light;p.referencePosition.value.setFromMatrixPosition(E.matrixWorld),p.nearDistance.value=E.shadow.camera.near,p.farDistance.value=E.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function $_(e,t,n,i){let r={},a={},o=[];const s=e.getParameter(e.MAX_UNIFORM_BUFFER_BINDINGS);function u(_,S){const b=S.program;i.uniformBlockBinding(_,b)}function l(_,S){let b=r[_.id];b===void 0&&(p(_),b=h(_),r[_.id]=b,_.addEventListener("dispose",E));const C=S.program;i.updateUBOMapping(_,C);const x=t.render.frame;a[_.id]!==x&&(c(_),a[_.id]=x)}function h(_){const S=d();_.__bindingPointIndex=S;const b=e.createBuffer(),C=_.__size,x=_.usage;return e.bindBuffer(e.UNIFORM_BUFFER,b),e.bufferData(e.UNIFORM_BUFFER,C,x),e.bindBuffer(e.UNIFORM_BUFFER,null),e.bindBufferBase(e.UNIFORM_BUFFER,S,b),b}function d(){for(let _=0;_<s;_++)if(o.indexOf(_)===-1)return o.push(_),_;return Mt("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function c(_){const S=r[_.id],b=_.uniforms,C=_.__cache;e.bindBuffer(e.UNIFORM_BUFFER,S);for(let x=0,R=b.length;x<R;x++){const U=b[x];if(Array.isArray(U))for(let D=0,B=U.length;D<B;D++)m(U[D],x,D,C);else m(U,x,0,C)}e.bindBuffer(e.UNIFORM_BUFFER,null)}function m(_,S,b,C){if(y(_,S,b,C)===!0){const x=_.__offset,R=_.value;if(Array.isArray(R)){let U=0;for(let D=0;D<R.length;D++){const B=R[D],Z=f(B);v(B,_.__data,U),typeof B!="number"&&typeof B!="boolean"&&!B.isMatrix3&&!ArrayBuffer.isView(B)&&(U+=Z.storage/Float32Array.BYTES_PER_ELEMENT)}}else v(R,_.__data,0);e.bufferSubData(e.UNIFORM_BUFFER,x,_.__data)}}function v(_,S,b){typeof _=="number"||typeof _=="boolean"?S[0]=_:_.isMatrix3?(S[0]=_.elements[0],S[1]=_.elements[1],S[2]=_.elements[2],S[3]=0,S[4]=_.elements[3],S[5]=_.elements[4],S[6]=_.elements[5],S[7]=0,S[8]=_.elements[6],S[9]=_.elements[7],S[10]=_.elements[8],S[11]=0):ArrayBuffer.isView(_)?S.set(new _.constructor(_.buffer,_.byteOffset,S.length)):_.toArray(S,b)}function y(_,S,b,C){const x=_.value,R=S+"_"+b;if(C[R]===void 0)return typeof x=="number"||typeof x=="boolean"?C[R]=x:ArrayBuffer.isView(x)?C[R]=x.slice():C[R]=x.clone(),!0;{const U=C[R];if(typeof x=="number"||typeof x=="boolean"){if(U!==x)return C[R]=x,!0}else{if(ArrayBuffer.isView(x))return!0;if(U.equals(x)===!1)return U.copy(x),!0}}return!1}function p(_){const S=_.uniforms;let b=0;const C=16;for(let R=0,U=S.length;R<U;R++){const D=Array.isArray(S[R])?S[R]:[S[R]];for(let B=0,Z=D.length;B<Z;B++){const k=D[B],I=Array.isArray(k.value)?k.value:[k.value];for(let W=0,L=I.length;W<L;W++){const H=I[W],ee=f(H),fe=b%C,ce=fe%ee.boundary,pe=fe+ce;b+=ce,pe!==0&&C-pe<ee.storage&&(b+=C-pe),k.__data=new Float32Array(ee.storage/Float32Array.BYTES_PER_ELEMENT),k.__offset=b,b+=ee.storage}}}const x=b%C;return x>0&&(b+=C-x),_.__size=b,_.__cache={},this}function f(_){const S={boundary:0,storage:0};return typeof _=="number"||typeof _=="boolean"?(S.boundary=4,S.storage=4):_.isVector2?(S.boundary=8,S.storage=8):_.isVector3||_.isColor?(S.boundary=16,S.storage=12):_.isVector4?(S.boundary=16,S.storage=16):_.isMatrix3?(S.boundary=48,S.storage=48):_.isMatrix4?(S.boundary=64,S.storage=64):_.isTexture?_t("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(_)?(S.boundary=16,S.storage=_.byteLength):_t("WebGLRenderer: Unsupported uniform value type.",_),S}function E(_){const S=_.target;S.removeEventListener("dispose",E);const b=o.indexOf(S.__bindingPointIndex);o.splice(b,1),e.deleteBuffer(r[S.id]),delete r[S.id],delete a[S.id]}function A(){for(const _ in r)e.deleteBuffer(r[_]);o=[],r={},a={}}return{bind:u,update:l,dispose:A}}const K_=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let Tn=null;function q_(){return Tn===null&&(Tn=new nd(K_,16,16,Bi,di),Tn.name="DFG_LUT",Tn.minFilter=pn,Tn.magFilter=pn,Tn.wrapS=eo,Tn.wrapT=eo,Tn.generateMipmaps=!1,Tn.needsUpdate=!0),Tn}class j_{constructor(t={}){const{canvas:n=qu(),context:i=null,depth:r=!0,stencil:a=!1,alpha:o=!1,antialias:s=!1,premultipliedAlpha:u=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:c=!1,outputBufferType:m=Rn}=t;this.isWebGLRenderer=!0;let v;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");v=i.getContextAttributes().alpha}else v=o;const y=m,p=new Set([gc,_c,xc]),f=new Set([Rn,Mi,oa,Er,vc,Sc]),E=new Uint32Array(4),A=new Int32Array(4),_=new Q;let S=null,b=null;const C=[],x=[];let R=null;this.domElement=n,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Nn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const U=this;let D=!1,B=null,Z=null,k=null,I=null;this._outputColorSpace=pc;let W=0,L=0,H=null,ee=-1,fe=null;const ce=new zt,pe=new zt;let He=null;const Ge=new St(0);let Ie=0,N=n.width,ne=n.height,ae=1,q=null,ue=null;const se=new zt(0,0,N,ne),Ee=new zt(0,0,N,ne);let z=!1;const re=new hc;let de=!1,me=!1;const Ye=new ui,Fe=new Q,et=new zt,at={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let ut=!1;function pt(){return H===null?ae:1}let P=i;function De(M,G){return n.getContext(M,G)}try{const M={alpha:!0,depth:r,stencil:a,antialias:s,premultipliedAlpha:u,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in n&&n.setAttribute("data-engine",`three.js r${ju}`),n.addEventListener("webglcontextlost",At,!1),n.addEventListener("webglcontextrestored",ot,!1),n.addEventListener("webglcontextcreationerror",rn,!1),P===null){const G="webgl2";if(P=De(G,M),P===null)throw De(G)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}}catch(M){throw Mt("WebGLRenderer: "+M.message),M}let Pe,T,g,V,Y,X,he,Me,J,te,ge,Oe,xe,Ae,Ue,$e,Je,O,ve,ie,Se,Re,le;function Ve(){Pe=new qm(P),Pe.init(),Se=new G_(P,Pe),T=new Vm(P,Pe,t,Se),g=new B_(P,Pe),T.reversedDepthBuffer&&c&&g.buffers.depth.setReversed(!0),Z=P.createFramebuffer(),k=P.createFramebuffer(),I=P.createFramebuffer(),V=new Jm(P),Y=new b_,X=new z_(P,Pe,g,Y,T,Se,V),he=new Km(U),Me=new np(P),Re=new zm(P,Me),J=new jm(P,Me,V,Re),te=new eg(P,J,Me,Re,V),O=new Qm(P,T,X),Ue=new Hm(Y),ge=new y_(U,he,Pe,T,Re,Ue),Oe=new Y_(U,Y),xe=new T_,Ae=new D_(Pe),Je=new Bm(U,he,g,te,v,u),$e=new O_(U,te,T),le=new $_(P,V,T,g),ve=new Gm(P,Pe,V),ie=new Zm(P,Pe,V),V.programs=ge.programs,U.capabilities=T,U.extensions=Pe,U.properties=Y,U.renderLists=xe,U.shadowMap=$e,U.state=g,U.info=V}Ve(),y!==Rn&&(R=new ng(y,n.width,n.height,s,r,a));const Be=new W_(U,P);this.xr=Be,this.getContext=function(){return P},this.getContextAttributes=function(){return P.getContextAttributes()},this.forceContextLoss=function(){const M=Pe.get("WEBGL_lose_context");M&&M.loseContext()},this.forceContextRestore=function(){const M=Pe.get("WEBGL_lose_context");M&&M.restoreContext()},this.getPixelRatio=function(){return ae},this.setPixelRatio=function(M){M!==void 0&&(ae=M,this.setSize(N,ne,!1))},this.getSize=function(M){return M.set(N,ne)},this.setSize=function(M,G,j=!0){if(Be.isPresenting){_t("WebGLRenderer: Can't change size while VR device is presenting.");return}N=M,ne=G,n.width=Math.floor(M*ae),n.height=Math.floor(G*ae),j===!0&&(n.style.width=M+"px",n.style.height=G+"px"),R!==null&&R.setSize(n.width,n.height),this.setViewport(0,0,M,G)},this.getDrawingBufferSize=function(M){return M.set(N*ae,ne*ae).floor()},this.setDrawingBufferSize=function(M,G,j){N=M,ne=G,ae=j,n.width=Math.floor(M*j),n.height=Math.floor(G*j),this.setViewport(0,0,M,G)},this.setEffects=function(M){if(y===Rn){Mt("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(M){for(let G=0;G<M.length;G++)if(M[G].isOutputPass===!0){_t("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}R.setEffects(M||[])},this.getCurrentViewport=function(M){return M.copy(ce)},this.getViewport=function(M){return M.copy(se)},this.setViewport=function(M,G,j,$){M.isVector4?se.set(M.x,M.y,M.z,M.w):se.set(M,G,j,$),g.viewport(ce.copy(se).multiplyScalar(ae).round())},this.getScissor=function(M){return M.copy(Ee)},this.setScissor=function(M,G,j,$){M.isVector4?Ee.set(M.x,M.y,M.z,M.w):Ee.set(M,G,j,$),g.scissor(pe.copy(Ee).multiplyScalar(ae).round())},this.getScissorTest=function(){return z},this.setScissorTest=function(M){g.setScissorTest(z=M)},this.setOpaqueSort=function(M){q=M},this.setTransparentSort=function(M){ue=M},this.getClearColor=function(M){return M.copy(Je.getClearColor())},this.setClearColor=function(){Je.setClearColor(...arguments)},this.getClearAlpha=function(){return Je.getClearAlpha()},this.setClearAlpha=function(){Je.setClearAlpha(...arguments)},this.clear=function(M=!0,G=!0,j=!0){let $=0;if(M){let K=!1;if(H!==null){const Ce=H.texture.format;K=p.has(Ce)}if(K){const Ce=H.texture.type,Le=f.has(Ce),we=Je.getClearColor(),ze=Je.getClearAlpha(),ke=we.r,qe=we.g,tt=we.b;Le?(E[0]=ke,E[1]=qe,E[2]=tt,E[3]=ze,P.clearBufferuiv(P.COLOR,0,E)):(A[0]=ke,A[1]=qe,A[2]=tt,A[3]=ze,P.clearBufferiv(P.COLOR,0,A))}else $|=P.COLOR_BUFFER_BIT}G&&($|=P.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),j&&($|=P.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),$!==0&&P.clear($)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(M){M.setRenderer(this),B=M},this.dispose=function(){n.removeEventListener("webglcontextlost",At,!1),n.removeEventListener("webglcontextrestored",ot,!1),n.removeEventListener("webglcontextcreationerror",rn,!1),Je.dispose(),xe.dispose(),Ae.dispose(),Y.dispose(),he.dispose(),te.dispose(),Re.dispose(),le.dispose(),ge.dispose(),Be.dispose(),Be.removeEventListener("sessionstart",Nr),Be.removeEventListener("sessionend",Ki),Hn.stop()};function At(M){M.preventDefault(),ko("WebGLRenderer: Context Lost."),D=!0}function ot(){ko("WebGLRenderer: Context Restored."),D=!1;const M=V.autoReset,G=$e.enabled,j=$e.autoUpdate,$=$e.needsUpdate,K=$e.type;Ve(),V.autoReset=M,$e.enabled=G,$e.autoUpdate=j,$e.needsUpdate=$,$e.type=K}function rn(M){Mt("WebGLRenderer: A WebGL context could not be created. Reason: ",M.statusMessage)}function jt(M){const G=M.target;G.removeEventListener("dispose",jt),Lr(G)}function Lr(M){ri(M),Y.remove(M)}function ri(M){const G=Y.get(M).programs;G!==void 0&&(G.forEach(function(j){ge.releaseProgram(j)}),M.isShaderMaterial&&ge.releaseShaderCache(M))}this.renderBufferDirect=function(M,G,j,$,K,Ce){G===null&&(G=at);const Le=K.isMesh&&K.matrixWorld.determinantAffine()<0,we=Qi(M,G,j,$,K);g.setMaterial($,Le);let ze=j.index,ke=1;if($.wireframe===!0){if(ze=J.getWireframeAttribute(j),ze===void 0)return;ke=2}const qe=j.drawRange,tt=j.attributes.position;let We=qe.start*ke,mt=(qe.start+qe.count)*ke;Ce!==null&&(We=Math.max(We,Ce.start*ke),mt=Math.min(mt,(Ce.start+Ce.count)*ke)),ze!==null?(We=Math.max(We,0),mt=Math.min(mt,ze.count)):tt!=null&&(We=Math.max(We,0),mt=Math.min(mt,tt.count));const Pt=mt-We;if(Pt<0||Pt===1/0)return;Re.setup(K,$,we,j,ze);let ft,xt=ve;if(ze!==null&&(ft=Me.get(ze),xt=ie,xt.setIndex(ft)),K.isMesh)$.wireframe===!0?(g.setLineWidth($.wireframeLinewidth*pt()),xt.setMode(P.LINES)):xt.setMode(P.TRIANGLES);else if(K.isLine){let Ht=$.linewidth;Ht===void 0&&(Ht=1),g.setLineWidth(Ht*pt()),K.isLineSegments?xt.setMode(P.LINES):K.isLineLoop?xt.setMode(P.LINE_LOOP):xt.setMode(P.LINE_STRIP)}else K.isPoints?xt.setMode(P.POINTS):K.isSprite&&xt.setMode(P.TRIANGLES);if(K.isBatchedMesh)if(Pe.get("WEBGL_multi_draw"))xt.renderMultiDraw(K._multiDrawStarts,K._multiDrawCounts,K._multiDrawCount);else{const Ht=K._multiDrawStarts,Ne=K._multiDrawCounts,Zt=K._multiDrawCount,st=ze?Me.get(ze).bytesPerElement:1,Jt=Y.get($).currentProgram.getUniforms();for(let it=0;it<Zt;it++)Jt.setValue(P,"_gl_DrawID",it),xt.render(Ht[it]/st,Ne[it])}else if(K.isInstancedMesh)xt.renderInstances(We,Pt,K.count);else if(j.isInstancedBufferGeometry){const Ht=j._maxInstanceCount!==void 0?j._maxInstanceCount:1/0,Ne=Math.min(j.instanceCount,Ht);xt.renderInstances(We,Pt,Ne)}else xt.render(We,Pt)};function $i(M,G,j){M.transparent===!0&&M.side===cn&&M.forceSinglePass===!1?(M.side=hn,M.needsUpdate=!0,mi(M,G,j),M.side=xr,M.needsUpdate=!0,mi(M,G,j),M.side=cn):mi(M,G,j)}this.compile=function(M,G,j=null){j===null&&(j=M),b=Ae.get(j),b.init(G),x.push(b),j.traverseVisible(function(K){K.isLight&&K.layers.test(G.layers)&&(b.pushLight(K),K.castShadow&&b.pushShadow(K))}),M!==j&&M.traverseVisible(function(K){K.isLight&&K.layers.test(G.layers)&&(b.pushLight(K),K.castShadow&&b.pushShadow(K))}),b.setupLights();const $=new Set;return M.traverse(function(K){if(!(K.isMesh||K.isPoints||K.isLine||K.isSprite))return;const Ce=K.material;if(Ce)if(Array.isArray(Ce))for(let Le=0;Le<Ce.length;Le++){const we=Ce[Le];$i(we,j,K),$.add(we)}else $i(Ce,j,K),$.add(Ce)}),b=x.pop(),$},this.compileAsync=function(M,G,j=null){const $=this.compile(M,G,j);return new Promise(K=>{function Ce(){if($.forEach(function(Le){Y.get(Le).currentProgram.isReady()&&$.delete(Le)}),$.size===0){K(M);return}setTimeout(Ce,10)}Pe.get("KHR_parallel_shader_compile")!==null?Ce():setTimeout(Ce,10)})};let Vn=null;function Ai(M){Vn&&Vn(M)}function Nr(){Hn.stop()}function Ki(){Hn.start()}const Hn=new Kc;Hn.setAnimationLoop(Ai),typeof self<"u"&&Hn.setContext(self),this.setAnimationLoop=function(M){Vn=M,Be.setAnimationLoop(M),M===null?Hn.stop():Hn.start()},Be.addEventListener("sessionstart",Nr),Be.addEventListener("sessionend",Ki),this.render=function(M,G){if(G!==void 0&&G.isCamera!==!0){Mt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(D===!0)return;B!==null&&B.renderStart(M,G);const j=Be.enabled===!0&&Be.isPresenting===!0,$=R!==null&&(H===null||j)&&R.begin(U,H);if(M.matrixWorldAutoUpdate===!0&&M.updateMatrixWorld(),G.parent===null&&G.matrixWorldAutoUpdate===!0&&G.updateMatrixWorld(),Be.enabled===!0&&Be.isPresenting===!0&&(R===null||R.isCompositing()===!1)&&(Be.cameraAutoUpdate===!0&&Be.updateCamera(G),G=Be.getCamera()),M.isScene===!0&&M.onBeforeRender(U,M,G,H),b=Ae.get(M,x.length),b.init(G),b.state.textureUnits=X.getTextureUnits(),x.push(b),Ye.multiplyMatrices(G.projectionMatrix,G.matrixWorldInverse),re.setFromProjectionMatrix(Ye,Wo,G.reversedDepth),me=this.localClippingEnabled,de=Ue.init(this.clippingPlanes,me),S=xe.get(M,C.length),S.init(),C.push(S),Be.enabled===!0&&Be.isPresenting===!0){const Le=U.xr.getDepthSensingMesh();Le!==null&&qi(Le,G,-1/0,U.sortObjects)}qi(M,G,0,U.sortObjects),S.finish(),U.sortObjects===!0&&S.sort(q,ue,G.reversedDepth),ut=Be.enabled===!1||Be.isPresenting===!1||Be.hasDepthSensing()===!1,ut&&Je.addToRenderList(S,M),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),de===!0&&Ue.beginShadows();const K=b.state.shadowsArray;if($e.render(K,M,G),de===!0&&Ue.endShadows(),($&&R.hasRenderPass())===!1){const Le=S.opaque,we=S.transmissive;if(b.setupLights(),G.isArrayCamera){const ze=G.cameras;if(we.length>0)for(let ke=0,qe=ze.length;ke<qe;ke++){const tt=ze[ke];Zi(Le,we,M,tt)}ut&&Je.render(M);for(let ke=0,qe=ze.length;ke<qe;ke++){const tt=ze[ke];ji(S,M,tt,tt.viewport)}}else we.length>0&&Zi(Le,we,M,G),ut&&Je.render(M),ji(S,M,G)}H!==null&&L===0&&(X.updateMultisampleRenderTarget(H),X.updateRenderTargetMipmap(H)),$&&R.end(U),M.isScene===!0&&M.onAfterRender(U,M,G),Re.resetDefaultState(),ee=-1,fe=null,x.pop(),x.length>0?(b=x[x.length-1],X.setTextureUnits(b.state.textureUnits),de===!0&&Ue.setGlobalState(U.clippingPlanes,b.state.camera)):b=null,C.pop(),C.length>0?S=C[C.length-1]:S=null,B!==null&&B.renderEnd()};function qi(M,G,j,$){if(M.visible===!1)return;if(M.layers.test(G.layers)){if(M.isGroup)j=M.renderOrder;else if(M.isLOD)M.autoUpdate===!0&&M.update(G);else if(M.isLightProbeGrid)b.pushLightProbeGrid(M);else if(M.isLight)b.pushLight(M),M.castShadow&&b.pushShadow(M);else if(M.isSprite){if(!M.frustumCulled||re.intersectsSprite(M)){$&&et.setFromMatrixPosition(M.matrixWorld).applyMatrix4(Ye);const Le=te.update(M),we=M.material;we.visible&&S.push(M,Le,we,j,et.z,null)}}else if((M.isMesh||M.isLine||M.isPoints)&&(!M.frustumCulled||re.intersectsObject(M))){const Le=te.update(M),we=M.material;if($&&(M.boundingSphere!==void 0?(M.boundingSphere===null&&M.computeBoundingSphere(),et.copy(M.boundingSphere.center)):(Le.boundingSphere===null&&Le.computeBoundingSphere(),et.copy(Le.boundingSphere.center)),et.applyMatrix4(M.matrixWorld).applyMatrix4(Ye)),Array.isArray(we)){const ze=Le.groups;for(let ke=0,qe=ze.length;ke<qe;ke++){const tt=ze[ke],We=we[tt.materialIndex];We&&We.visible&&S.push(M,Le,We,j,et.z,tt)}}else we.visible&&S.push(M,Le,we,j,et.z,null)}}const Ce=M.children;for(let Le=0,we=Ce.length;Le<we;Le++)qi(Ce[Le],G,j,$)}function ji(M,G,j,$){const{opaque:K,transmissive:Ce,transparent:Le}=M;b.setupLightsView(j),de===!0&&Ue.setGlobalState(U.clippingPlanes,j),$&&g.viewport(ce.copy($)),K.length>0&&hi(K,G,j),Ce.length>0&&hi(Ce,G,j),Le.length>0&&hi(Le,G,j),g.buffers.depth.setTest(!0),g.buffers.depth.setMask(!0),g.buffers.color.setMask(!0),g.setPolygonOffset(!1)}function Zi(M,G,j,$){if((j.isScene===!0?j.overrideMaterial:null)!==null)return;if(b.state.transmissionRenderTarget[$.id]===void 0){const We=Pe.has("EXT_color_buffer_half_float")||Pe.has("EXT_color_buffer_float");b.state.transmissionRenderTarget[$.id]=new Un(1,1,{generateMipmaps:!0,type:We?di:Rn,minFilter:Ii,samples:Math.max(4,T.samples),stencilBuffer:a,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Rt.workingColorSpace})}const Ce=b.state.transmissionRenderTarget[$.id],Le=$.viewport||ce;Ce.setSize(Le.z*U.transmissionResolutionScale,Le.w*U.transmissionResolutionScale);const we=U.getRenderTarget(),ze=U.getActiveCubeFace(),ke=U.getActiveMipmapLevel();U.setRenderTarget(Ce),U.getClearColor(Ge),Ie=U.getClearAlpha(),Ie<1&&U.setClearColor(16777215,.5),U.clear(),ut&&Je.render(j);const qe=U.toneMapping;U.toneMapping=Nn;const tt=$.viewport;if($.viewport!==void 0&&($.viewport=void 0),b.setupLightsView($),de===!0&&Ue.setGlobalState(U.clippingPlanes,$),hi(M,j,$),X.updateMultisampleRenderTarget(Ce),X.updateRenderTargetMipmap(Ce),Pe.has("WEBGL_multisampled_render_to_texture")===!1){let We=!1;for(let mt=0,Pt=G.length;mt<Pt;mt++){const ft=G[mt],{object:xt,geometry:Ht,material:Ne,group:Zt}=ft;if(Ne.side===cn&&xt.layers.test($.layers)){const st=Ne.side;Ne.side=hn,Ne.needsUpdate=!0,Ur(xt,j,$,Ht,Ne,Zt),Ne.side=st,Ne.needsUpdate=!0,We=!0}}We===!0&&(X.updateMultisampleRenderTarget(Ce),X.updateRenderTargetMipmap(Ce))}U.setRenderTarget(we,ze,ke),U.setClearColor(Ge,Ie),tt!==void 0&&($.viewport=tt),U.toneMapping=qe}function hi(M,G,j){const $=G.isScene===!0?G.overrideMaterial:null;for(let K=0,Ce=M.length;K<Ce;K++){const Le=M[K],{object:we,geometry:ze,group:ke}=Le;let qe=Le.material;qe.allowOverride===!0&&$!==null&&(qe=$),we.layers.test(j.layers)&&Ur(we,G,j,ze,qe,ke)}}function Ur(M,G,j,$,K,Ce){M.onBeforeRender(U,G,j,$,K,Ce),M.modelViewMatrix.multiplyMatrices(j.matrixWorldInverse,M.matrixWorld),M.normalMatrix.getNormalMatrix(M.modelViewMatrix),K.onBeforeRender(U,G,j,$,M,Ce),K.transparent===!0&&K.side===cn&&K.forceSinglePass===!1?(K.side=hn,K.needsUpdate=!0,U.renderBufferDirect(j,G,$,K,M,Ce),K.side=xr,K.needsUpdate=!0,U.renderBufferDirect(j,G,$,K,M,Ce),K.side=cn):U.renderBufferDirect(j,G,$,K,M,Ce),M.onAfterRender(U,G,j,$,K,Ce)}function mi(M,G,j){G.isScene!==!0&&(G=at);const $=Y.get(M),K=b.state.lights,Ce=b.state.shadowsArray,Le=K.state.version,we=ge.getParameters(M,K.state,Ce,G,j,b.state.lightProbeGridArray),ze=ge.getProgramCacheKey(we);let ke=$.programs;$.environment=M.isMeshStandardMaterial||M.isMeshLambertMaterial||M.isMeshPhongMaterial?G.environment:null,$.fog=G.fog;const qe=M.isMeshStandardMaterial||M.isMeshLambertMaterial&&!M.envMap||M.isMeshPhongMaterial&&!M.envMap;$.envMap=he.get(M.envMap||$.environment,qe),$.envMapRotation=$.environment!==null&&M.envMap===null?G.environmentRotation:M.envMapRotation,ke===void 0&&(M.addEventListener("dispose",jt),ke=new Map,$.programs=ke);let tt=ke.get(ze);if(tt!==void 0){if($.currentProgram===tt&&$.lightsStateVersion===Le)return xn(M,we),tt}else we.uniforms=ge.getUniforms(M),B!==null&&M.isNodeMaterial&&B.build(M,j,we),M.onBeforeCompile(we,U),tt=ge.acquireProgram(we,ze),ke.set(ze,tt),$.uniforms=we.uniforms;const We=$.uniforms;return(!M.isShaderMaterial&&!M.isRawShaderMaterial||M.clipping===!0)&&(We.clippingPlanes=Ue.uniform),xn(M,we),$.needsLights=ya(M),$.lightsStateVersion=Le,$.needsLights&&(We.ambientLightColor.value=K.state.ambient,We.lightProbe.value=K.state.probe,We.directionalLights.value=K.state.directional,We.directionalLightShadows.value=K.state.directionalShadow,We.spotLights.value=K.state.spot,We.spotLightShadows.value=K.state.spotShadow,We.rectAreaLights.value=K.state.rectArea,We.ltc_1.value=K.state.rectAreaLTC1,We.ltc_2.value=K.state.rectAreaLTC2,We.pointLights.value=K.state.point,We.pointLightShadows.value=K.state.pointShadow,We.hemisphereLights.value=K.state.hemi,We.directionalShadowMatrix.value=K.state.directionalShadowMatrix,We.spotLightMatrix.value=K.state.spotLightMatrix,We.spotLightMap.value=K.state.spotLightMap,We.pointShadowMatrix.value=K.state.pointShadowMatrix),$.lightProbeGrid=b.state.lightProbeGridArray.length>0,$.currentProgram=tt,$.uniformsList=null,tt}function Ji(M){if(M.uniformsList===null){const G=M.currentProgram.getUniforms();M.uniformsList=ta.seqWithValue(G.seq,M.uniforms)}return M.uniformsList}function xn(M,G){const j=Y.get(M);j.outputColorSpace=G.outputColorSpace,j.batching=G.batching,j.batchingColor=G.batchingColor,j.instancing=G.instancing,j.instancingColor=G.instancingColor,j.instancingMorph=G.instancingMorph,j.skinning=G.skinning,j.morphTargets=G.morphTargets,j.morphNormals=G.morphNormals,j.morphColors=G.morphColors,j.morphTargetsCount=G.morphTargetsCount,j.numClippingPlanes=G.numClippingPlanes,j.numIntersection=G.numClipIntersection,j.vertexAlphas=G.vertexAlphas,j.vertexTangents=G.vertexTangents,j.toneMapping=G.toneMapping}function Ma(M,G){if(M.length===0)return null;if(M.length===1)return M[0].texture!==null?M[0]:null;_.setFromMatrixPosition(G.matrixWorld);for(let j=0,$=M.length;j<$;j++){const K=M[j];if(K.texture!==null&&K.boundingBox.containsPoint(_))return K}return null}function Qi(M,G,j,$,K){G.isScene!==!0&&(G=at),X.resetTextureUnits();const Ce=G.fog,Le=$.isMeshStandardMaterial||$.isMeshLambertMaterial||$.isMeshPhongMaterial?G.environment:null,we=H===null?U.outputColorSpace:H.isXRRenderTarget===!0?H.texture.colorSpace:Rt.workingColorSpace,ze=$.isMeshStandardMaterial||$.isMeshLambertMaterial&&!$.envMap||$.isMeshPhongMaterial&&!$.envMap,ke=he.get($.envMap||Le,ze),qe=$.vertexColors===!0&&!!j.attributes.color&&j.attributes.color.itemSize===4,tt=!!j.attributes.tangent&&(!!$.normalMap||$.anisotropy>0),We=!!j.morphAttributes.position,mt=!!j.morphAttributes.normal,Pt=!!j.morphAttributes.color;let ft=Nn;$.toneMapped&&(H===null||H.isXRRenderTarget===!0)&&(ft=U.toneMapping);const xt=j.morphAttributes.position||j.morphAttributes.normal||j.morphAttributes.color,Ht=xt!==void 0?xt.length:0,Ne=Y.get($),Zt=b.state.lights;if(de===!0&&(me===!0||M!==fe)){const w=M===fe&&$.id===ee;Ue.setState($,M,w)}let st=!1;$.version===Ne.__version?(Ne.needsLights&&Ne.lightsStateVersion!==Zt.state.version||Ne.outputColorSpace!==we||K.isBatchedMesh&&Ne.batching===!1||!K.isBatchedMesh&&Ne.batching===!0||K.isBatchedMesh&&Ne.batchingColor===!0&&K.colorTexture===null||K.isBatchedMesh&&Ne.batchingColor===!1&&K.colorTexture!==null||K.isInstancedMesh&&Ne.instancing===!1||!K.isInstancedMesh&&Ne.instancing===!0||K.isSkinnedMesh&&Ne.skinning===!1||!K.isSkinnedMesh&&Ne.skinning===!0||K.isInstancedMesh&&Ne.instancingColor===!0&&K.instanceColor===null||K.isInstancedMesh&&Ne.instancingColor===!1&&K.instanceColor!==null||K.isInstancedMesh&&Ne.instancingMorph===!0&&K.morphTexture===null||K.isInstancedMesh&&Ne.instancingMorph===!1&&K.morphTexture!==null||Ne.envMap!==ke||$.fog===!0&&Ne.fog!==Ce||Ne.numClippingPlanes!==void 0&&(Ne.numClippingPlanes!==Ue.numPlanes||Ne.numIntersection!==Ue.numIntersection)||Ne.vertexAlphas!==qe||Ne.vertexTangents!==tt||Ne.morphTargets!==We||Ne.morphNormals!==mt||Ne.morphColors!==Pt||Ne.toneMapping!==ft||Ne.morphTargetsCount!==Ht||!!Ne.lightProbeGrid!=b.state.lightProbeGridArray.length>0)&&(st=!0):(st=!0,Ne.__version=$.version);let Jt=Ne.currentProgram;st===!0&&(Jt=mi($,G,K),B&&$.isNodeMaterial&&B.onUpdateProgram($,Jt,Ne));let it=!1,vn=!1,kn=!1;const gt=Jt.getUniforms(),wt=Ne.uniforms;if(g.useProgram(Jt.program)&&(it=!0,vn=!0,kn=!0),$.id!==ee&&(ee=$.id,vn=!0),Ne.needsLights){const w=Ma(b.state.lightProbeGridArray,K);Ne.lightProbeGrid!==w&&(Ne.lightProbeGrid=w,vn=!0)}if(it||fe!==M){g.buffers.depth.getReversed()&&M.reversedDepth!==!0&&(M._reversedDepth=!0,M.updateProjectionMatrix()),gt.setValue(P,"projectionMatrix",M.projectionMatrix),gt.setValue(P,"viewMatrix",M.matrixWorldInverse);const F=gt.map.cameraPosition;F!==void 0&&F.setValue(P,Fe.setFromMatrixPosition(M.matrixWorld)),T.logarithmicDepthBuffer&&gt.setValue(P,"logDepthBufFC",2/(Math.log(M.far+1)/Math.LN2)),($.isMeshPhongMaterial||$.isMeshToonMaterial||$.isMeshLambertMaterial||$.isMeshBasicMaterial||$.isMeshStandardMaterial||$.isShaderMaterial)&&gt.setValue(P,"isOrthographic",M.isOrthographicCamera===!0),fe!==M&&(fe=M,vn=!0,kn=!0)}if(Ne.needsLights&&(Zt.state.directionalShadowMap.length>0&&gt.setValue(P,"directionalShadowMap",Zt.state.directionalShadowMap,X),Zt.state.spotShadowMap.length>0&&gt.setValue(P,"spotShadowMap",Zt.state.spotShadowMap,X),Zt.state.pointShadowMap.length>0&&gt.setValue(P,"pointShadowMap",Zt.state.pointShadowMap,X)),K.isSkinnedMesh){gt.setOptional(P,K,"bindMatrix"),gt.setOptional(P,K,"bindMatrixInverse");const w=K.skeleton;w&&(w.boneTexture===null&&w.computeBoneTexture(),gt.setValue(P,"boneTexture",w.boneTexture,X))}K.isBatchedMesh&&(gt.setOptional(P,K,"batchingTexture"),gt.setValue(P,"batchingTexture",K._matricesTexture,X),gt.setOptional(P,K,"batchingIdTexture"),gt.setValue(P,"batchingIdTexture",K._indirectTexture,X),gt.setOptional(P,K,"batchingColorTexture"),K._colorsTexture!==null&&gt.setValue(P,"batchingColorTexture",K._colorsTexture,X));const un=j.morphAttributes;if((un.position!==void 0||un.normal!==void 0||un.color!==void 0)&&O.update(K,j,Jt),(vn||Ne.receiveShadow!==K.receiveShadow)&&(Ne.receiveShadow=K.receiveShadow,gt.setValue(P,"receiveShadow",K.receiveShadow)),($.isMeshStandardMaterial||$.isMeshLambertMaterial||$.isMeshPhongMaterial)&&$.envMap===null&&G.environment!==null&&(wt.envMapIntensity.value=G.environmentIntensity),wt.dfgLUT!==void 0&&(wt.dfgLUT.value=q_()),vn){if(gt.setValue(P,"toneMappingExposure",U.toneMappingExposure),Ne.needsLights&&er(wt,kn),Ce&&$.fog===!0&&Oe.refreshFogUniforms(wt,Ce),Oe.refreshMaterialUniforms(wt,$,ae,ne,b.state.transmissionRenderTarget[M.id]),Ne.needsLights&&Ne.lightProbeGrid){const w=Ne.lightProbeGrid;wt.probesSH.value=w.texture,wt.probesMin.value.copy(w.boundingBox.min),wt.probesMax.value.copy(w.boundingBox.max),wt.probesResolution.value.copy(w.resolution)}ta.upload(P,Ji(Ne),wt,X)}if($.isShaderMaterial&&$.uniformsNeedUpdate===!0&&(ta.upload(P,Ji(Ne),wt,X),$.uniformsNeedUpdate=!1),$.isSpriteMaterial&&gt.setValue(P,"center",K.center),gt.setValue(P,"modelViewMatrix",K.modelViewMatrix),gt.setValue(P,"normalMatrix",K.normalMatrix),gt.setValue(P,"modelMatrix",K.matrixWorld),$.uniformsGroups!==void 0){const w=$.uniformsGroups;for(let F=0,oe=w.length;F<oe;F++){const _e=w[F];le.update(_e,Jt),le.bind(_e,Jt)}}return Jt}function er(M,G){M.ambientLightColor.needsUpdate=G,M.lightProbe.needsUpdate=G,M.directionalLights.needsUpdate=G,M.directionalLightShadows.needsUpdate=G,M.pointLights.needsUpdate=G,M.pointLightShadows.needsUpdate=G,M.spotLights.needsUpdate=G,M.spotLightShadows.needsUpdate=G,M.rectAreaLights.needsUpdate=G,M.hemisphereLights.needsUpdate=G}function ya(M){return M.isMeshLambertMaterial||M.isMeshToonMaterial||M.isMeshPhongMaterial||M.isMeshStandardMaterial||M.isShadowMaterial||M.isShaderMaterial&&M.lights===!0}this.getActiveCubeFace=function(){return W},this.getActiveMipmapLevel=function(){return L},this.getRenderTarget=function(){return H},this.setRenderTargetTextures=function(M,G,j){const $=Y.get(M);$.__autoAllocateDepthBuffer=M.resolveDepthBuffer===!1,$.__autoAllocateDepthBuffer===!1&&($.__useRenderToTexture=!1),Y.get(M.texture).__webglTexture=G,Y.get(M.depthTexture).__webglTexture=$.__autoAllocateDepthBuffer?void 0:j,$.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(M,G){const j=Y.get(M);j.__webglFramebuffer=G,j.__useDefaultFramebuffer=G===void 0},this.setRenderTarget=function(M,G=0,j=0){H=M,W=G,L=j;let $=null,K=!1,Ce=!1;if(M){const we=Y.get(M);if(we.__useDefaultFramebuffer!==void 0){g.bindFramebuffer(P.FRAMEBUFFER,we.__webglFramebuffer),ce.copy(M.viewport),pe.copy(M.scissor),He=M.scissorTest,g.viewport(ce),g.scissor(pe),g.setScissorTest(He),ee=-1;return}else if(we.__webglFramebuffer===void 0)X.setupRenderTarget(M);else if(we.__hasExternalTextures)X.rebindTextures(M,Y.get(M.texture).__webglTexture,Y.get(M.depthTexture).__webglTexture);else if(M.depthBuffer){const qe=M.depthTexture;if(we.__boundDepthTexture!==qe){if(qe!==null&&Y.has(qe)&&(M.width!==qe.image.width||M.height!==qe.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");X.setupDepthRenderbuffer(M)}}const ze=M.texture;(ze.isData3DTexture||ze.isDataArrayTexture||ze.isCompressedArrayTexture)&&(Ce=!0);const ke=Y.get(M).__webglFramebuffer;M.isWebGLCubeRenderTarget?(Array.isArray(ke[G])?$=ke[G][j]:$=ke[G],K=!0):M.samples>0&&X.useMultisampledRTT(M)===!1?$=Y.get(M).__webglMultisampledFramebuffer:Array.isArray(ke)?$=ke[j]:$=ke,ce.copy(M.viewport),pe.copy(M.scissor),He=M.scissorTest}else ce.copy(se).multiplyScalar(ae).floor(),pe.copy(Ee).multiplyScalar(ae).floor(),He=z;if(j!==0&&($=Z),g.bindFramebuffer(P.FRAMEBUFFER,$)&&g.drawBuffers(M,$),g.viewport(ce),g.scissor(pe),g.setScissorTest(He),K){const we=Y.get(M.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_CUBE_MAP_POSITIVE_X+G,we.__webglTexture,j)}else if(Ce){const we=G;for(let ze=0;ze<M.textures.length;ze++){const ke=Y.get(M.textures[ze]);P.framebufferTextureLayer(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0+ze,ke.__webglTexture,j,we)}}else if(M!==null&&j!==0){const we=Y.get(M.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,we.__webglTexture,j)}ee=-1},this.readRenderTargetPixels=function(M,G,j,$,K,Ce,Le,we=0){if(!(M&&M.isWebGLRenderTarget)){Mt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let ze=Y.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&Le!==void 0&&(ze=ze[Le]),ze){g.bindFramebuffer(P.FRAMEBUFFER,ze);try{const ke=M.textures[we],qe=ke.format,tt=ke.type;if(M.textures.length>1&&P.readBuffer(P.COLOR_ATTACHMENT0+we),!T.textureFormatReadable(qe)){Mt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!T.textureTypeReadable(tt)){Mt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}G>=0&&G<=M.width-$&&j>=0&&j<=M.height-K&&P.readPixels(G,j,$,K,Se.convert(qe),Se.convert(tt),Ce)}finally{const ke=H!==null?Y.get(H).__webglFramebuffer:null;g.bindFramebuffer(P.FRAMEBUFFER,ke)}}},this.readRenderTargetPixelsAsync=async function(M,G,j,$,K,Ce,Le,we=0){if(!(M&&M.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let ze=Y.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&Le!==void 0&&(ze=ze[Le]),ze)if(G>=0&&G<=M.width-$&&j>=0&&j<=M.height-K){g.bindFramebuffer(P.FRAMEBUFFER,ze);const ke=M.textures[we],qe=ke.format,tt=ke.type;if(M.textures.length>1&&P.readBuffer(P.COLOR_ATTACHMENT0+we),!T.textureFormatReadable(qe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!T.textureTypeReadable(tt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const We=P.createBuffer();P.bindBuffer(P.PIXEL_PACK_BUFFER,We),P.bufferData(P.PIXEL_PACK_BUFFER,Ce.byteLength,P.STREAM_READ),P.readPixels(G,j,$,K,Se.convert(qe),Se.convert(tt),0);const mt=H!==null?Y.get(H).__webglFramebuffer:null;g.bindFramebuffer(P.FRAMEBUFFER,mt);const Pt=P.fenceSync(P.SYNC_GPU_COMMANDS_COMPLETE,0);return P.flush(),await Zu(P,Pt,4),P.bindBuffer(P.PIXEL_PACK_BUFFER,We),P.getBufferSubData(P.PIXEL_PACK_BUFFER,0,Ce),P.deleteBuffer(We),P.deleteSync(Pt),Ce}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(M,G=null,j=0){const $=Math.pow(2,-j),K=Math.floor(M.image.width*$),Ce=Math.floor(M.image.height*$),Le=G!==null?G.x:0,we=G!==null?G.y:0;X.setTexture2D(M,0),P.copyTexSubImage2D(P.TEXTURE_2D,j,0,0,Le,we,K,Ce),g.unbindTexture()},this.copyTextureToTexture=function(M,G,j=null,$=null,K=0,Ce=0){let Le,we,ze,ke,qe,tt,We,mt,Pt;const ft=M.isCompressedTexture?M.mipmaps[Ce]:M.image;if(j!==null)Le=j.max.x-j.min.x,we=j.max.y-j.min.y,ze=j.isBox3?j.max.z-j.min.z:1,ke=j.min.x,qe=j.min.y,tt=j.isBox3?j.min.z:0;else{const wt=Math.pow(2,-K);Le=Math.floor(ft.width*wt),we=Math.floor(ft.height*wt),M.isDataArrayTexture?ze=ft.depth:M.isData3DTexture?ze=Math.floor(ft.depth*wt):ze=1,ke=0,qe=0,tt=0}$!==null?(We=$.x,mt=$.y,Pt=$.z):(We=0,mt=0,Pt=0);const xt=Se.convert(G.format),Ht=Se.convert(G.type);let Ne;G.isData3DTexture?(X.setTexture3D(G,0),Ne=P.TEXTURE_3D):G.isDataArrayTexture||G.isCompressedArrayTexture?(X.setTexture2DArray(G,0),Ne=P.TEXTURE_2D_ARRAY):(X.setTexture2D(G,0),Ne=P.TEXTURE_2D),g.activeTexture(P.TEXTURE0),g.pixelStorei(P.UNPACK_FLIP_Y_WEBGL,G.flipY),g.pixelStorei(P.UNPACK_PREMULTIPLY_ALPHA_WEBGL,G.premultiplyAlpha),g.pixelStorei(P.UNPACK_ALIGNMENT,G.unpackAlignment);const Zt=g.getParameter(P.UNPACK_ROW_LENGTH),st=g.getParameter(P.UNPACK_IMAGE_HEIGHT),Jt=g.getParameter(P.UNPACK_SKIP_PIXELS),it=g.getParameter(P.UNPACK_SKIP_ROWS),vn=g.getParameter(P.UNPACK_SKIP_IMAGES);g.pixelStorei(P.UNPACK_ROW_LENGTH,ft.width),g.pixelStorei(P.UNPACK_IMAGE_HEIGHT,ft.height),g.pixelStorei(P.UNPACK_SKIP_PIXELS,ke),g.pixelStorei(P.UNPACK_SKIP_ROWS,qe),g.pixelStorei(P.UNPACK_SKIP_IMAGES,tt);const kn=M.isDataArrayTexture||M.isData3DTexture,gt=G.isDataArrayTexture||G.isData3DTexture;if(M.isDepthTexture){const wt=Y.get(M),un=Y.get(G),w=Y.get(wt.__renderTarget),F=Y.get(un.__renderTarget);g.bindFramebuffer(P.READ_FRAMEBUFFER,w.__webglFramebuffer),g.bindFramebuffer(P.DRAW_FRAMEBUFFER,F.__webglFramebuffer);for(let oe=0;oe<ze;oe++)kn&&(P.framebufferTextureLayer(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,Y.get(M).__webglTexture,K,tt+oe),P.framebufferTextureLayer(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,Y.get(G).__webglTexture,Ce,Pt+oe)),P.blitFramebuffer(ke,qe,Le,we,We,mt,Le,we,P.DEPTH_BUFFER_BIT,P.NEAREST);g.bindFramebuffer(P.READ_FRAMEBUFFER,null),g.bindFramebuffer(P.DRAW_FRAMEBUFFER,null)}else if(K!==0||M.isRenderTargetTexture||Y.has(M)){const wt=Y.get(M),un=Y.get(G);g.bindFramebuffer(P.READ_FRAMEBUFFER,k),g.bindFramebuffer(P.DRAW_FRAMEBUFFER,I);for(let w=0;w<ze;w++)kn?P.framebufferTextureLayer(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,wt.__webglTexture,K,tt+w):P.framebufferTexture2D(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,wt.__webglTexture,K),gt?P.framebufferTextureLayer(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,un.__webglTexture,Ce,Pt+w):P.framebufferTexture2D(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,un.__webglTexture,Ce),K!==0?P.blitFramebuffer(ke,qe,Le,we,We,mt,Le,we,P.COLOR_BUFFER_BIT,P.NEAREST):gt?P.copyTexSubImage3D(Ne,Ce,We,mt,Pt+w,ke,qe,Le,we):P.copyTexSubImage2D(Ne,Ce,We,mt,ke,qe,Le,we);g.bindFramebuffer(P.READ_FRAMEBUFFER,null),g.bindFramebuffer(P.DRAW_FRAMEBUFFER,null)}else gt?M.isDataTexture||M.isData3DTexture?P.texSubImage3D(Ne,Ce,We,mt,Pt,Le,we,ze,xt,Ht,ft.data):G.isCompressedArrayTexture?P.compressedTexSubImage3D(Ne,Ce,We,mt,Pt,Le,we,ze,xt,ft.data):P.texSubImage3D(Ne,Ce,We,mt,Pt,Le,we,ze,xt,Ht,ft):M.isDataTexture?P.texSubImage2D(P.TEXTURE_2D,Ce,We,mt,Le,we,xt,Ht,ft.data):M.isCompressedTexture?P.compressedTexSubImage2D(P.TEXTURE_2D,Ce,We,mt,ft.width,ft.height,xt,ft.data):P.texSubImage2D(P.TEXTURE_2D,Ce,We,mt,Le,we,xt,Ht,ft);g.pixelStorei(P.UNPACK_ROW_LENGTH,Zt),g.pixelStorei(P.UNPACK_IMAGE_HEIGHT,st),g.pixelStorei(P.UNPACK_SKIP_PIXELS,Jt),g.pixelStorei(P.UNPACK_SKIP_ROWS,it),g.pixelStorei(P.UNPACK_SKIP_IMAGES,vn),Ce===0&&G.generateMipmaps&&P.generateMipmap(Ne),g.unbindTexture()},this.initRenderTarget=function(M){Y.get(M).__webglFramebuffer===void 0&&X.setupRenderTarget(M)},this.initTexture=function(M){M.isCubeTexture?X.setTextureCube(M,0):M.isData3DTexture?X.setTexture3D(M,0):M.isDataArrayTexture||M.isCompressedArrayTexture?X.setTexture2DArray(M,0):X.setTexture2D(M,0),g.unbindTexture()},this.resetState=function(){W=0,L=0,H=null,g.reset(),Re.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Wo}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const n=this.getContext();n.drawingBufferColorSpace=Rt._getDrawingBufferColorSpace(t),n.unpackColorSpace=Rt._getUnpackColorSpace()}}const nl={type:"change"},Do={type:"start"},nu={type:"end"},Wr=new Uc,il=new aa,Z_=Math.cos(70*ii.DEG2RAD),Ot=new Q,on=2*Math.PI,vt={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Ga=1e-6;class J_ extends ff{constructor(t,n=null){super(t,n),this.state=vt.NONE,this.target=new Q,this.cursor=new Q,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Jn.ROTATE,MIDDLE:Jn.DOLLY,RIGHT:Jn.PAN},this.touches={ONE:Li.ROTATE,TWO:Li.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new Q,this._lastQuaternion=new mr,this._lastTargetPosition=new Q,this._quat=new mr().setFromUnitVectors(t.up,new Q(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new ws,this._sphericalDelta=new ws,this._scale=1,this._panOffset=new Q,this._rotateStart=new Ke,this._rotateEnd=new Ke,this._rotateDelta=new Ke,this._panStart=new Ke,this._panEnd=new Ke,this._panDelta=new Ke,this._dollyStart=new Ke,this._dollyEnd=new Ke,this._dollyDelta=new Ke,this._dollyDirection=new Q,this._mouse=new Ke,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=ex.bind(this),this._onPointerDown=Q_.bind(this),this._onPointerUp=tx.bind(this),this._onContextMenu=lx.bind(this),this._onMouseWheel=rx.bind(this),this._onKeyDown=ax.bind(this),this._onTouchStart=ox.bind(this),this._onTouchMove=sx.bind(this),this._onMouseDown=nx.bind(this),this._onMouseMove=ix.bind(this),this._interceptControlDown=cx.bind(this),this._interceptControlUp=ux.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(t){this._cursorStyle=t,t==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(t){super.connect(t),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction=""}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(nl),this.update(),this.state=vt.NONE}pan(t,n){this._pan(t,n),this.update()}dollyIn(t){this._dollyIn(t),this.update()}dollyOut(t){this._dollyOut(t),this.update()}rotateLeft(t){this._rotateLeft(t),this.update()}rotateUp(t){this._rotateUp(t),this.update()}update(t=null){const n=this.object.position;Ot.copy(n).sub(this.target),Ot.applyQuaternion(this._quat),this._spherical.setFromVector3(Ot),this.autoRotate&&this.state===vt.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let i=this.minAzimuthAngle,r=this.maxAzimuthAngle;isFinite(i)&&isFinite(r)&&(i<-Math.PI?i+=on:i>Math.PI&&(i-=on),r<-Math.PI?r+=on:r>Math.PI&&(r-=on),i<=r?this._spherical.theta=Math.max(i,Math.min(r,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(i+r)/2?Math.max(i,this._spherical.theta):Math.min(r,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let a=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const o=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),a=o!=this._spherical.radius}if(Ot.setFromSpherical(this._spherical),Ot.applyQuaternion(this._quatInverse),n.copy(this.target).add(Ot),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let o=null;if(this.object.isPerspectiveCamera){const s=Ot.length();o=this._clampDistance(s*this._scale);const u=s-o;this.object.position.addScaledVector(this._dollyDirection,u),this.object.updateMatrixWorld(),a=!!u}else if(this.object.isOrthographicCamera){const s=new Q(this._mouse.x,this._mouse.y,0);s.unproject(this.object);const u=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),a=u!==this.object.zoom;const l=new Q(this._mouse.x,this._mouse.y,0);l.unproject(this.object),this.object.position.sub(l).add(s),this.object.updateMatrixWorld(),o=Ot.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;o!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(o).add(this.object.position):(Wr.origin.copy(this.object.position),Wr.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Wr.direction))<Z_?this.object.lookAt(this.target):(il.setFromNormalAndCoplanarPoint(this.object.up,this.target),Wr.intersectPlane(il,this.target))))}else if(this.object.isOrthographicCamera){const o=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),o!==this.object.zoom&&(this.object.updateProjectionMatrix(),a=!0)}return this._scale=1,this._performCursorZoom=!1,a||this._lastPosition.distanceToSquared(this.object.position)>Ga||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Ga||this._lastTargetPosition.distanceToSquared(this.target)>Ga?(this.dispatchEvent(nl),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?on/60*this.autoRotateSpeed*t:on/60/60*this.autoRotateSpeed}_getZoomScale(t){const n=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*n)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,n){Ot.setFromMatrixColumn(n,0),Ot.multiplyScalar(-t),this._panOffset.add(Ot)}_panUp(t,n){this.screenSpacePanning===!0?Ot.setFromMatrixColumn(n,1):(Ot.setFromMatrixColumn(n,0),Ot.crossVectors(this.object.up,Ot)),Ot.multiplyScalar(t),this._panOffset.add(Ot)}_pan(t,n){const i=this.domElement;if(this.object.isPerspectiveCamera){const r=this.object.position;Ot.copy(r).sub(this.target);let a=Ot.length();a*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*a/i.clientHeight,this.object.matrix),this._panUp(2*n*a/i.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/i.clientWidth,this.object.matrix),this._panUp(n*(this.object.top-this.object.bottom)/this.object.zoom/i.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,n){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const i=this.domElement.getBoundingClientRect(),r=t-i.left,a=n-i.top,o=i.width,s=i.height;this._mouse.x=r/o*2-1,this._mouse.y=-(a/s)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const n=this.domElement;this._rotateLeft(on*this._rotateDelta.x/n.clientHeight),this._rotateUp(on*this._rotateDelta.y/n.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let n=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(on*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),n=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(-on*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),n=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(on*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),n=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(-on*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),n=!0;break}n&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{const n=this._getSecondPointerPosition(t),i=.5*(t.pageX+n.x),r=.5*(t.pageY+n.y);this._rotateStart.set(i,r)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{const n=this._getSecondPointerPosition(t),i=.5*(t.pageX+n.x),r=.5*(t.pageY+n.y);this._panStart.set(i,r)}}_handleTouchStartDolly(t){const n=this._getSecondPointerPosition(t),i=t.pageX-n.x,r=t.pageY-n.y,a=Math.sqrt(i*i+r*r);this._dollyStart.set(0,a)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{const i=this._getSecondPointerPosition(t),r=.5*(t.pageX+i.x),a=.5*(t.pageY+i.y);this._rotateEnd.set(r,a)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const n=this.domElement;this._rotateLeft(on*this._rotateDelta.x/n.clientHeight),this._rotateUp(on*this._rotateDelta.y/n.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{const n=this._getSecondPointerPosition(t),i=.5*(t.pageX+n.x),r=.5*(t.pageY+n.y);this._panEnd.set(i,r)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){const n=this._getSecondPointerPosition(t),i=t.pageX-n.x,r=t.pageY-n.y,a=Math.sqrt(i*i+r*r);this._dollyEnd.set(0,a),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const o=(t.pageX+n.x)*.5,s=(t.pageY+n.y)*.5;this._updateZoomParameters(o,s)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let n=0;n<this._pointers.length;n++)if(this._pointers[n]==t.pointerId){this._pointers.splice(n,1);return}}_isTrackingPointer(t){for(let n=0;n<this._pointers.length;n++)if(this._pointers[n]==t.pointerId)return!0;return!1}_trackPointer(t){let n=this._pointerPositions[t.pointerId];n===void 0&&(n=new Ke,this._pointerPositions[t.pointerId]=n),n.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){const n=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[n]}_customWheelEvent(t){const n=t.deltaMode,i={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(n){case 1:i.deltaY*=16;break;case 2:i.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(i.deltaY*=10),i}}function Q_(e){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(e.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(e)&&(this._addPointer(e),e.pointerType==="touch"?this._onTouchStart(e):this._onMouseDown(e),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function ex(e){this.enabled!==!1&&(e.pointerType==="touch"?this._onTouchMove(e):this._onMouseMove(e))}function tx(e){switch(this._removePointer(e),this._pointers.length){case 0:this.domElement.releasePointerCapture(e.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(nu),this.state=vt.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:const t=this._pointers[0],n=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:n.x,pageY:n.y});break}}function nx(e){let t;switch(e.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case Jn.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(e),this.state=vt.DOLLY;break;case Jn.ROTATE:if(e.ctrlKey||e.metaKey||e.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(e),this.state=vt.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(e),this.state=vt.ROTATE}break;case Jn.PAN:if(e.ctrlKey||e.metaKey||e.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(e),this.state=vt.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(e),this.state=vt.PAN}break;default:this.state=vt.NONE}this.state!==vt.NONE&&this.dispatchEvent(Do)}function ix(e){switch(this.state){case vt.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(e);break;case vt.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(e);break;case vt.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(e);break}}function rx(e){this.enabled===!1||this.enableZoom===!1||this.state!==vt.NONE||(e.preventDefault(),this.dispatchEvent(Do),this._handleMouseWheel(this._customWheelEvent(e)),this.dispatchEvent(nu))}function ax(e){this.enabled!==!1&&this._handleKeyDown(e)}function ox(e){switch(this._trackPointer(e),this._pointers.length){case 1:switch(this.touches.ONE){case Li.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(e),this.state=vt.TOUCH_ROTATE;break;case Li.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(e),this.state=vt.TOUCH_PAN;break;default:this.state=vt.NONE}break;case 2:switch(this.touches.TWO){case Li.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(e),this.state=vt.TOUCH_DOLLY_PAN;break;case Li.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(e),this.state=vt.TOUCH_DOLLY_ROTATE;break;default:this.state=vt.NONE}break;default:this.state=vt.NONE}this.state!==vt.NONE&&this.dispatchEvent(Do)}function sx(e){switch(this._trackPointer(e),this.state){case vt.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(e),this.update();break;case vt.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(e),this.update();break;case vt.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(e),this.update();break;case vt.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(e),this.update();break;default:this.state=vt.NONE}}function lx(e){this.enabled!==!1&&e.preventDefault()}function cx(e){e.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function ux(e){e.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}const Fn=Math.PI*2,dx=Math.PI/18,fx=.25,px=128;function so(e){const t=e%Fn;return t<0?t+Fn:t}function rl(e,t){return so(Math.atan2(t.y-e.y,t.x-e.x))}function Lo(e,t,n=!0){return so(n?t-e:e-t)}function iu(e,t,n={}){const i=Math.abs(Number(e)),r=Math.abs(Number(t));if(!Number.isFinite(i)||!Number.isFinite(r)||i<=0||r<=0)return 0;const a=Math.max(Math.PI/180,Number(n.maxArcSegmentAngle)||dx),o=Math.max(2,Number(n.maxArcSegments)||px),s=Math.max(0,Number(n.arcChordTolerance)||fx),u=Math.ceil(r/a);let l=1;if(s>0&&s<i){const h=2*Math.acos(Math.max(-1,Math.min(1,1-s/i)));Number.isFinite(h)&&h>0&&(l=Math.ceil(r/h))}return Math.min(o,Math.max(2,u,l))}function hx({start:e,end:t,center:n,clockwise:i=!0},r={}){const a=Math.hypot(e.x-n.x,e.y-n.y),o=rl(n,e),s=rl(n,t),u=Lo(o,s,i),l=iu(a,u,r);if(!l)return[];const h=i?1:-1;return Array.from({length:l+1},(d,c)=>{if(c===0)return{...e};if(c===l)return{...t};const m=c/l,v=o+h*u*m;return{x:n.x+Math.cos(v)*a,y:n.y+Math.sin(v)*a,z:(Number(e.z)||0)+((Number(t.z)||0)-(Number(e.z)||0))*m}})}function ru(e,t={}){const n=Number(e?.center?.x),i=Number(e?.center?.y),r=Number(e?.center?.z)||0,a=Math.abs(Number(e?.radiusX)),o=Math.abs(Number(e?.radiusY)),s=Number(e?.rotation)||0;if(![n,i,a,o,s].every(Number.isFinite)||a<=0||o<=0)return[];const u=e.type==="ELLIPSE",l=u?0:Number(e.startParameter),h=u?Fn:Number(e.endParameter);if(![l,h].every(Number.isFinite))return[];const d=u||e.clockwise!==!1,c=u?Fn:Lo(l,h,d),m=Math.max(0,Number(t.curveSegments)||0),v=m?Math.max(2,Math.ceil(m*c/Fn)):iu(Math.max(a,o),c,t);if(!v)return[];const y=d?1:-1,p=Math.cos(s),f=Math.sin(s);return Array.from({length:v+1},(E,A)=>{const _=l+y*c*A/v,S=Math.cos(_),b=Math.sin(_);return{x:n+a*S*p-o*b*f,y:i+a*S*f+o*b*p,z:r}})}const mx=64;function Si(e,t){const n=Number(e?.x),i=Number(e?.y),r=e?.z===void 0?0:Number(e.z);return[n,i,r].every(Number.isFinite)?{x:n,y:t?-i:i,z:r}:null}function br(e,t,n,i=null){return{start:e,end:t,entity:n,segmentIndex:i}}function gx(e,t){const n=Si(e?.center,t.invertY),i=Number(e?.radius);if(!n||!Number.isFinite(i)||i<=0)return[];const r=e.type==="CIRCLE",a=r?0:Number(e.startAngle),o=r?Fn:Number(e.endAngle);if(![a,o].every(Number.isFinite))return[];const s=e.clockwise!==!1,u=r?Fn:Lo(a,o,s),l=Math.max(2,Math.ceil(t.curveSegments*u/Fn)),h=s?1:-1,d=Array.from({length:l+1},(c,m)=>{const v=a+h*u*m/l;return{x:n.x+Math.cos(v)*i,y:n.y+(t.invertY?-Math.sin(v):Math.sin(v))*i,z:n.z}});return Array.from({length:l},(c,m)=>br(d[m],d[m+1],e,m))}function _x(e,t){const n=ru(e,t).map(i=>Si(i,t.invertY)).filter(Boolean);return Array.from({length:Math.max(0,n.length-1)},(i,r)=>br(n[r],n[r+1],e,r))}function xx(e,t){if(!Array.isArray(e?.vertices)||e.vertices.length<2)return[];const n=e.closed?e.vertices.length:e.vertices.length-1,i=[];for(let r=0;r<n;r+=1){const a=e.segments?.[r],o=Si(e.vertices[r],t.invertY),s=Si(e.vertices[(r+1)%e.vertices.length],t.invertY);if(!(!o||!s)){if(a?.type==="ARC"){const u=Si(a.center,t.invertY);if(!u){t.onWarning?.("Arco interno de POLYLINE omitido por centro no valido",e);continue}const l=hx({start:o,end:s,center:u,clockwise:vx(a.clockwise!==!1,t.invertY)},t);for(let h=0;h<l.length-1;h+=1)i.push(br(l[h],l[h+1],e,r));continue}i.push(br(o,s,e,r))}}return i}function vx(e,t){return t?!e:e}function Sx(e,t={}){const n={curveSegments:Math.max(8,Number(t.curveSegments)||mx),invertY:t.invertY!==!1,arcChordTolerance:t.arcChordTolerance,maxArcSegmentAngle:t.maxArcSegmentAngle,maxArcSegments:t.maxArcSegments,onWarning:t.onWarning};if(e?.type==="LINE"){const i=Si(e.start,n.invertY),r=Si(e.end,n.invertY);return i&&r?[br(i,r,e)]:[]}return e?.type==="POLYLINE"?xx(e,n):e?.type==="CIRCLE"||e?.type==="ARC"?gx(e,n):e?.type==="ELLIPSE"||e?.type==="ELLIPSE_ARC"?_x(e,n):(n.onWarning?.(`Entidad ${e?.type??"desconocida"} omitida en la vista 3D`,e),[])}const Ex=new Set(["auxiliar","ejes"]);function Mx(e){return String(e||"").trim().toLowerCase()}function yx(e){return!(!e||Ex.has(Mx(e.layer)))}function au(e){return(Array.isArray(e)?e:[]).filter(yx)}Te.line={worldUnits:{value:1},linewidth:{value:1},resolution:{value:new Ke},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}};ln.line={uniforms:So.merge([Te.common,Te.fog,Te.line]),vertexShader:`
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
		`};class ou extends yn{constructor(t){super({type:"LineMaterial",uniforms:So.clone(ln.line.uniforms),vertexShader:ln.line.vertexShader,fragmentShader:ln.line.fragmentShader,clipping:!0}),this.isLineMaterial=!0,this.setValues(t)}get color(){return this.uniforms.diffuse.value}set color(t){this.uniforms.diffuse.value=t}get worldUnits(){return"WORLD_UNITS"in this.defines}set worldUnits(t){t===!0!==this.worldUnits&&(this.needsUpdate=!0),t===!0?this.defines.WORLD_UNITS="":delete this.defines.WORLD_UNITS}get linewidth(){return this.uniforms.linewidth.value}set linewidth(t){this.uniforms.linewidth&&(this.uniforms.linewidth.value=t)}get dashed(){return"USE_DASH"in this.defines}set dashed(t){t===!0!==this.dashed&&(this.needsUpdate=!0),t===!0?this.defines.USE_DASH="":delete this.defines.USE_DASH}get dashScale(){return this.uniforms.dashScale.value}set dashScale(t){this.uniforms.dashScale.value=t}get dashSize(){return this.uniforms.dashSize.value}set dashSize(t){this.uniforms.dashSize.value=t}get dashOffset(){return this.uniforms.dashOffset.value}set dashOffset(t){this.uniforms.dashOffset.value=t}get gapSize(){return this.uniforms.gapSize.value}set gapSize(t){this.uniforms.gapSize.value=t}get opacity(){return this.uniforms.opacity.value}set opacity(t){this.uniforms&&(this.uniforms.opacity.value=t)}get resolution(){return this.uniforms.resolution.value}set resolution(t){this.uniforms.resolution.value.copy(t)}get alphaToCoverage(){return"USE_ALPHA_TO_COVERAGE"in this.defines}set alphaToCoverage(t){this.defines&&(t===!0!==this.alphaToCoverage&&(this.needsUpdate=!0),t===!0?this.defines.USE_ALPHA_TO_COVERAGE="":delete this.defines.USE_ALPHA_TO_COVERAGE)}}const al=new Qn,Xr=new Q;class su extends pf{constructor(){super(),this.isLineSegmentsGeometry=!0,this.type="LineSegmentsGeometry";const t=[-1,2,0,1,2,0,-1,1,0,1,1,0,-1,0,0,1,0,0,-1,-1,0,1,-1,0],n=[-1,2,1,2,-1,1,1,1,-1,-1,1,-1,-1,-2,1,-2],i=[0,2,1,2,3,1,2,4,3,4,5,3,4,6,5,6,7,5];this.setIndex(i),this.setAttribute("position",new Sr(t,3)),this.setAttribute("uv",new Sr(n,2))}applyMatrix4(t){const n=this.attributes.instanceStart,i=this.attributes.instanceEnd;return n!==void 0&&(n.applyMatrix4(t),i.applyMatrix4(t),n.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}setPositions(t){let n;t instanceof Float32Array?n=t:Array.isArray(t)&&(n=new Float32Array(t));const i=new ro(n,6,1);return this.setAttribute("instanceStart",new Ni(i,3,0)),this.setAttribute("instanceEnd",new Ni(i,3,3)),this.instanceCount=this.attributes.instanceStart.count,this.computeBoundingBox(),this.computeBoundingSphere(),this}setColors(t){let n;t instanceof Float32Array?n=t:Array.isArray(t)&&(n=new Float32Array(t));const i=new ro(n,6,1);return this.setAttribute("instanceColorStart",new Ni(i,3,0)),this.setAttribute("instanceColorEnd",new Ni(i,3,3)),this}fromWireframeGeometry(t){return this.setPositions(t.attributes.position.array),this}fromEdgesGeometry(t){return this.setPositions(t.attributes.position.array),this}fromMesh(t){return this.fromWireframeGeometry(new hf(t.geometry)),this}fromLineSegments(t){const n=t.geometry;return this.setPositions(n.attributes.position.array),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Qn);const t=this.attributes.instanceStart,n=this.attributes.instanceEnd;t!==void 0&&n!==void 0&&(this.boundingBox.setFromBufferAttribute(t),al.setFromBufferAttribute(n),this.boundingBox.union(al))}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Fc),this.boundingBox===null&&this.computeBoundingBox();const t=this.attributes.instanceStart,n=this.attributes.instanceEnd;if(t!==void 0&&n!==void 0){const i=this.boundingSphere.center;this.boundingBox.getCenter(i);let r=0;for(let a=0,o=t.count;a<o;a++)Xr.fromBufferAttribute(t,a),r=Math.max(r,i.distanceToSquared(Xr)),Xr.fromBufferAttribute(n,a),r=Math.max(r,i.distanceToSquared(Xr));this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error("THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.",this)}}toJSON(){}}const Va=new zt,ol=new Q,sl=new Q,Xt=new zt,Yt=new zt,Pn=new zt,Ha=new Q,ka=new ui,$t=new mf,ll=new Q,Yr=new Qn,$r=new Fc,wn=new zt;let Cn,Ei;function cl(e,t,n){return wn.set(0,0,-t,1).applyMatrix4(e.projectionMatrix),wn.multiplyScalar(1/wn.w),wn.x=Ei/n.width,wn.y=Ei/n.height,wn.applyMatrix4(e.projectionMatrixInverse),wn.multiplyScalar(1/wn.w),Math.abs(Math.max(wn.x,wn.y))}function bx(e,t){const n=e.matrixWorld,i=e.geometry,r=i.attributes.instanceStart,a=i.attributes.instanceEnd,o=Math.min(i.instanceCount,r.count);for(let s=0,u=o;s<u;s++){$t.start.fromBufferAttribute(r,s),$t.end.fromBufferAttribute(a,s),$t.applyMatrix4(n);const l=new Q,h=new Q;Cn.distanceSqToSegment($t.start,$t.end,h,l),h.distanceTo(l)<Ei*.5&&t.push({point:h,pointOnLine:l,distance:Cn.origin.distanceTo(h),object:e,face:null,faceIndex:s,uv:null,uv1:null})}}function Ax(e,t,n){const i=t.projectionMatrix,a=e.material.resolution,o=e.matrixWorld,s=e.geometry,u=s.attributes.instanceStart,l=s.attributes.instanceEnd,h=Math.min(s.instanceCount,u.count),d=-t.near;Cn.at(1,Pn),Pn.w=1,Pn.applyMatrix4(t.matrixWorldInverse),Pn.applyMatrix4(i),Pn.multiplyScalar(1/Pn.w),Pn.x*=a.x/2,Pn.y*=a.y/2,Pn.z=0,Ha.copy(Pn),ka.multiplyMatrices(t.matrixWorldInverse,o);for(let c=0,m=h;c<m;c++){if(Xt.fromBufferAttribute(u,c),Yt.fromBufferAttribute(l,c),Xt.w=1,Yt.w=1,Xt.applyMatrix4(ka),Yt.applyMatrix4(ka),Xt.z>d&&Yt.z>d)continue;if(Xt.z>d){const A=Xt.z-Yt.z,_=(Xt.z-d)/A;Xt.lerp(Yt,_)}else if(Yt.z>d){const A=Yt.z-Xt.z,_=(Yt.z-d)/A;Yt.lerp(Xt,_)}Xt.applyMatrix4(i),Yt.applyMatrix4(i),Xt.multiplyScalar(1/Xt.w),Yt.multiplyScalar(1/Yt.w),Xt.x*=a.x/2,Xt.y*=a.y/2,Yt.x*=a.x/2,Yt.y*=a.y/2,$t.start.copy(Xt),$t.start.z=0,$t.end.copy(Yt),$t.end.z=0;const y=$t.closestPointToPointParameter(Ha,!0);$t.at(y,ll);const p=ii.lerp(Xt.z,Yt.z,y),f=p>=-1&&p<=1,E=Ha.distanceTo(ll)<Ei*.5;if(f&&E){$t.start.fromBufferAttribute(u,c),$t.end.fromBufferAttribute(l,c),$t.start.applyMatrix4(o),$t.end.applyMatrix4(o);const A=new Q,_=new Q;Cn.distanceSqToSegment($t.start,$t.end,_,A),n.push({point:_,pointOnLine:A,distance:Cn.origin.distanceTo(_),object:e,face:null,faceIndex:c,uv:null,uv1:null})}}}class Tx extends nn{constructor(t=new su,n=new ou({color:Math.random()*16777215})){super(t,n),this.isLineSegments2=!0,this.type="LineSegments2"}computeLineDistances(){const t=this.geometry,n=t.attributes.instanceStart,i=t.attributes.instanceEnd,r=new Float32Array(2*n.count);for(let o=0,s=0,u=n.count;o<u;o++,s+=2)ol.fromBufferAttribute(n,o),sl.fromBufferAttribute(i,o),r[s]=s===0?0:r[s-1],r[s+1]=r[s]+ol.distanceTo(sl);const a=new ro(r,2,1);return t.setAttribute("instanceDistanceStart",new Ni(a,1,0)),t.setAttribute("instanceDistanceEnd",new Ni(a,1,1)),this}raycast(t,n){const i=this.material.worldUnits,r=t.camera;if(r===null&&!i&&console.error('LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.'),i===!1&&(this.material.resolution.x===0||this.material.resolution.y===0))return;const a=t.params.Line2!==void 0&&t.params.Line2.threshold||0;Cn=t.ray;const o=this.matrixWorld,s=this.geometry,u=this.material;Ei=u.linewidth+a,s.boundingSphere===null&&s.computeBoundingSphere(),$r.copy(s.boundingSphere).applyMatrix4(o);let l;if(i)l=Ei*.5;else{const d=Math.max(r.near,$r.distanceToPoint(Cn.origin));l=cl(r,d,u.resolution)}if($r.radius+=l,Cn.intersectsSphere($r)===!1)return;s.boundingBox===null&&s.computeBoundingBox(),Yr.copy(s.boundingBox).applyMatrix4(o);let h;if(i)h=Ei*.5;else{const d=Math.max(r.near,Yr.distanceToPoint(Cn.origin));h=cl(r,d,u.resolution)}Yr.expandByScalar(h),Cn.intersectsBox(Yr)!==!1&&(i?bx(this,n):Ax(this,r,n))}onBeforeRender(t){const n=this.material.uniforms;n&&n.resolution&&(t.getViewport(Va),this.material.uniforms.resolution.value.set(Va.z,Va.w))}}const Qe={preset:"SK",groundColor:12045488,groundOpacity:.28,groundRenderOrder:-20,background:12576251,drawingColor:1452079,drawingLineWidth:1.6,drawingPlaneLift:.08,drawingRenderOrder:20,gridMinorColor:9083791,gridMajorColor:7307894,axisLineWidth:2.8,axisNegativeLineWidth:1.4,axisNegativeDashSize:12,axisNegativeGapSize:7,axisX:13893632,axisY:40960,axisZ:19416};function ul(e){const t=new St(e);return new Q(t.r,t.g,t.b)}function Yn(e,t=0){const n=Number(e);return Number.isFinite(n)?n:t}function Px(e,t){const n=Math.max(0,Yn(t,0));n<=0||(e.userData.webcadDepthBias=n,e.onBeforeCompile=i=>{const r="gl_Position = clip;";i.vertexShader.includes(r)&&(i.vertexShader=i.vertexShader.replace(r,`${r}
			gl_Position.z -= ${n.toExponential(8)} * gl_Position.w;`))},e.customProgramCacheKey=()=>`webcad-line-depth-bias:${n}`,e.needsUpdate=!0)}function ct(e){e&&e.traverse?.(t=>{t.geometry?.dispose?.(),Array.isArray(t.material)?t.material.forEach(n=>n.dispose?.()):t.material?.dispose?.()})}function tn(e,t={}){const n=[],i=new Qn;for(const u of Array.isArray(e)?e:[]){const l=u?.start,h=u?.end;if(!l||!h)continue;const d=new Q(Yn(l.x),Yn(l.y),Yn(l.z)),c=new Q(Yn(h.x),Yn(h.y),Yn(h.z));n.push(d.x,d.y,d.z,c.x,c.y,c.z),i.expandByPoint(d),i.expandByPoint(c)}const r=new su;r.setPositions(n);const a={color:t.color??Qe.drawingColor,depthTest:t.depthTest!==!1,depthWrite:t.depthWrite!==!1,linewidth:t.linewidth??Qe.drawingLineWidth,dashed:t.dashed===!0,opacity:t.opacity??1,transparent:t.transparent===!0,worldUnits:!1};t.depthFunc!==void 0&&(a.depthFunc=t.depthFunc),t.dashed===!0&&(a.dashSize=t.dashSize??Qe.axisNegativeDashSize,a.gapSize=t.gapSize??Qe.axisNegativeGapSize);const o=new ou(a);t.polygonOffset!==void 0&&(o.polygonOffset=t.polygonOffset===!0,o.polygonOffsetFactor=Yn(t.polygonOffsetFactor,0),o.polygonOffsetUnits=Yn(t.polygonOffsetUnits,0)),Px(o,t.depthBias);const s=new Tx(r,o);return Number.isFinite(t.renderOrder)&&(s.renderOrder=t.renderOrder),s.computeLineDistances(),s.userData.segmentCount=n.length/6,s.userData.bounds=i.isEmpty()?null:i,s}function wi(e,t,n){if(!e)return;const i=Math.max(1,Math.round(t||1)),r=Math.max(1,Math.round(n||1));e.traverse?.(a=>{a.material?.isLineMaterial&&a.material.resolution.set(i,r)})}function wx(e){const t=Math.max(1e-4,e),n=10**Math.floor(Math.log10(t)),i=t/n;return i<=1?n:i<=2?2*n:i<=5?5*n:10*n}function Rx(e,t){return new yn({depthWrite:!1,extensions:{derivatives:!0},side:cn,transparent:!0,uniforms:{majorAlpha:{value:.42},majorColor:{value:ul(Qe.gridMajorColor)},majorStep:{value:t},majorWidth:{value:1.15},minorAlpha:{value:.24},minorColor:{value:ul(Qe.gridMinorColor)},minorStep:{value:e},minorWidth:{value:.9}},vertexShader:`
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
    `})}function lu(e){const t=Math.max(2e3,e*80),n=wx(Math.max(e,50)/7);return{lineLimit:Math.max(10,Math.ceil(t/n)*n),minorStep:n}}function cu(e=new Q,t=20){const{lineLimit:n}=lu(t),i=new St(Qe.background).lerp(new St(Qe.groundColor),Qe.groundOpacity),r=new nn(new ma(n*2,n*2),new _a({color:i,depthTest:!1,depthWrite:!1,side:cn,transparent:!1}));return r.name="webcad-3d-sk-ground",r.position.set(e.x,e.y,-.001),r.renderOrder=Qe.groundRenderOrder,r.userData.isSketchGround=!0,r}function Cx(e=new Q,t=20,n={}){const i=new Qt;i.name="webcad-3d-grid";const{lineLimit:r,minorStep:a}=lu(t),o=a*5;n.includeGround!==!1&&i.add(cu(e,t));const s=new nn(new ma(r*2,r*2),Rx(a,o));return s.name="webcad-3d-grid-minor",s.position.set(e.x,e.y,.001),s.renderOrder=Qe.groundRenderOrder+1,s.userData.isSketchGridLine=!0,i.add(s),i.userData.preset=Qe.preset,i.userData.step=a,i.userData.extent=r,uu(i,n.visible!==!1),i}function uu(e,t){if(!e)return;const n=t!==!1;e.visible=!0,e.traverse?.(i=>{i.userData?.isSketchGridLine&&(i.visible=n),i.userData?.isSketchGround&&(i.visible=!0)}),e.userData.gridLinesVisible=n}function Wa(e,t,n,i){const r=new Qt;r.name=`webcad-3d-axis-${i}`;const a=e.clone().normalize(),o=tn([{start:{x:0,y:0,z:0},end:{x:a.x*n,y:a.y*n,z:a.z*n}}],{color:t,linewidth:Qe.axisLineWidth});o.name=`webcad-3d-axis-${i}-positive`;const s=tn([{start:{x:0,y:0,z:0},end:{x:-a.x*n,y:-a.y*n,z:-a.z*n}}],{color:t,dashSize:Qe.axisNegativeDashSize,dashed:!0,gapSize:Qe.axisNegativeGapSize,linewidth:Qe.axisNegativeLineWidth});return s.name=`webcad-3d-axis-${i}-negative`,s.userData.negativeAxis=!0,r.add(o,s),r}function Ix(e=20){const t=Math.max(2e3,e*80),n=new Qt;return n.name="webcad-3d-axes",n.add(Wa(new Q(1,0,0),Qe.axisX,t,"x"),Wa(new Q(0,1,0),Qe.axisY,t,"y"),Wa(new Q(0,0,1),Qe.axisZ,t*.72,"z")),n.userData.preset=Qe.preset,n.userData.extent=t,n}function Dx(e,t){return e?.id??e?.handle??`${e?.type??"ENTITY"}-${t}`}function Lx(e,t={}){const n=Sx(e,t);if(!n.length)return null;const i=tn(n,{color:t.color??Qe.drawingColor,depthTest:!0,depthWrite:!1,linewidth:t.linewidth??Qe.drawingLineWidth,renderOrder:Qe.drawingRenderOrder,transparent:!0});return i.position.z=t.visualLift??Qe.drawingPlaneLift,i.renderOrder=Qe.drawingRenderOrder,i.name=`webcad-entity-${e?.type??"unknown"}`,i.userData.entity=e,i.userData.entityType=e?.type??null,i.userData.sourceSegments=n,i.userData.selectable=!0,i}function Nx(e,t={}){const n=new Qt;n.name="webcad-3d-entities";const i=new Qn;let r=0,a=0;return au(e).forEach((o,s)=>{const u=Lx(o,t);u&&(u.userData.entityKey=Dx(o,s),n.add(u),a+=1,r+=u.userData.segmentCount||0,u.userData.bounds&&i.union(u.userData.bounds))}),n.userData.bounds=i.isEmpty()?null:i,n.userData.entityCount=a,n.userData.segmentCount=r,n}const En=Math.PI*2,Ux=32,Fx={type:"plane",origin:{x:0,y:0,z:0},normal:{x:0,y:0,z:1},xAxis:{x:1,y:0,z:0}};function bt(e){const t=Number(e);return Number.isFinite(t)?t:null}function It(e,t=0){const n=bt(e?.x),i=bt(e?.y),r=e?.z===void 0?t:bt(e.z);return n===null||i===null||r===null?null:{x:n,y:i,z:r}}function gn(e){return e===void 0?void 0:JSON.parse(JSON.stringify(e))}function Kt(e){const t=Number(e)%En;return t<0?t+En:t}function dl(e,t){return Kt(Math.atan2(t.y-e.y,t.x-e.x))}function Vi(e,t,n=!0){return Kt(n?t-e:e-t)}function fl(e,t,n=!0){return(n?1:-1)*Vi(e,t,n)}function Dn(e,t,n){return{x:e.x+Math.cos(n)*t,y:e.y+Math.sin(n)*t,z:e.z||0}}function Mn(e,t,n,i,r){const a=Math.cos(i),o=Math.sin(i),s=Math.cos(r)*t,u=Math.sin(r)*n;return{x:e.x+s*a-u*o,y:e.y+s*o+u*a,z:e.z||0}}function Ar(e,t,n=1e-9){return Math.hypot((e?.x??0)-(t?.x??0),(e?.y??0)-(t?.y??0),(e?.z??0)-(t?.z??0))<=n}function Ox(e){const t=e?.id??e?.handle??null;return{entityId:t===void 0?null:t,entityType:e?.type??null}}function ti(e,t="outer"){const n={type:"exact-profile-loop",role:t,closed:!0,segments:e};return n.bounds=fu(n),n.orientation=Wx(n),n}function Yi(e,t,n={}){const i=(n.innerLoops||[]).map((a,o)=>ti(gn(a.segments||a),`inner-${o}`)),r={type:"exact-profile",version:1,id:n.id??e?.id??e?.handle??null,closed:!0,plane:gn(n.plane??Fx),source:Ox(e),outerLoop:ti(t,"outer"),innerLoops:i};return r.segments=r.outerLoop.segments,r.bounds=Vx(r),r.orientation={outer:r.outerLoop.orientation,inner:r.innerLoops.map(a=>a.orientation)},r}function _r(e,t){return t?e?(e.minX=Math.min(e.minX,t.x),e.minY=Math.min(e.minY,t.y),e.maxX=Math.max(e.maxX,t.x),e.maxY=Math.max(e.maxY,t.y),e):{minX:t.x,minY:t.y,maxX:t.x,maxY:t.y}:e}function Bx(e,t,n,i=!0,r=1e-12){const a=Vi(t,n,i);return Kt(i?e-t:t-e)<=a+r}function zx(e){let t=null;return t=_r(t,e.start),t=_r(t,e.end),[0,Math.PI*.5,Math.PI,Math.PI*1.5].forEach(n=>{Bx(n,e.startAngle,e.endAngle,e.clockwise)&&(t=_r(t,Dn(e.center,e.radius,n)))}),t}function pl(e){const t=Math.cos(e.rotation||0),n=Math.sin(e.rotation||0),i=Math.hypot(e.radiusX*t,e.radiusY*n),r=Math.hypot(e.radiusX*n,e.radiusY*t);return{minX:e.center.x-i,minY:e.center.y-r,maxX:e.center.x+i,maxY:e.center.y+r}}function du(e,t){return e?t?{minX:Math.min(e.minX,t.minX),minY:Math.min(e.minY,t.minY),maxX:Math.max(e.maxX,t.maxX),maxY:Math.max(e.maxY,t.maxY)}:{...e}:t?{...t}:null}function Gx(e){return e.type==="line"?_r(_r(null,e.start),e.end):e.type==="arc-circle"?zx(e):e.type==="circle"?{minX:e.center.x-e.radius,minY:e.center.y-e.radius,maxX:e.center.x+e.radius,maxY:e.center.y+e.radius}:e.type==="ellipse"||e.type==="arc-ellipse"?pl(e):null}function fu(e){return e.segments.reduce((t,n)=>du(t,Gx(n)),null)}function Vx(e){return[e.outerLoop,...e.innerLoops||[]].reduce((t,n)=>du(t,n.bounds||fu(n)),null)}function Hx(e){if(e.type==="line")return .5*(e.start.x*e.end.y-e.end.x*e.start.y);if(e.type==="arc-circle"){const t=fl(e.startAngle,e.endAngle,e.clockwise);return .5*(e.center.x*(e.end.y-e.start.y)-e.center.y*(e.end.x-e.start.x)+e.radius*e.radius*t)}if(e.type==="circle")return(e.clockwise===!1?-1:1)*Math.PI*e.radius*e.radius;if(e.type==="ellipse")return(e.clockwise===!1?-1:1)*Math.PI*e.radiusX*e.radiusY;if(e.type==="arc-ellipse"){const t=fl(e.startAngle,e.endAngle,e.clockwise);return .5*(e.center.x*(e.end.y-e.start.y)-e.center.y*(e.end.x-e.start.x)+e.radiusX*e.radiusY*t)}return 0}function kx(e){return e.segments.reduce((t,n)=>t+Hx(n),0)}function Wx(e){const t=kx(e);return Math.abs(t)<=1e-9?null:t>0?"ccw":"cw"}function No(e,t){return{type:"line",start:e,end:t}}function sa(e,t,n){const i=It(n?.center);if(!i)return null;const r=Math.hypot(e.x-i.x,e.y-i.y),a=Math.hypot(t.x-i.x,t.y-i.y),o=(r+a)*.5;return!Number.isFinite(o)||o<=1e-9||Math.abs(r-a)>1e-6?null:{type:"arc-circle",center:i,radius:o,startAngle:dl(i,e),endAngle:dl(i,t),clockwise:n.clockwise!==!1,start:e,end:t}}function pu(e){return e.type==="circle"||e.type==="ellipse"?null:e.start||null}function hu(e){return e.type==="circle"||e.type==="ellipse"?null:e.end||null}function Uo(e){if(e.length===1&&["circle","ellipse"].includes(e[0].type))return!0;for(let t=0;t<e.length;t+=1){const n=hu(e[t]),i=pu(e[(t+1)%e.length]);if(!n||!i||!Ar(n,i))return!1}return!0}function Xx(e,t){const n=Math.max(Number(t)||0,0);if(!(n>0))return e;for(let i=0;i<e.length;i+=1){const r=e[i],a=e[(i+1)%e.length],o=hu(r),s=pu(a);if(!(!o||!s||Ar(o,s))){if(!Ar(o,s,n))return null;if(r.type==="line"){r.end=gn(s);continue}if(a.type==="line"){a.start=gn(o);continue}return null}}return e}function Yx(e){return e.type==="line"?{...e,start:gn(e.end),end:gn(e.start)}:e.type==="arc-circle"||e.type==="arc-ellipse"?{...e,start:gn(e.end),end:gn(e.start),startAngle:e.endAngle,endAngle:e.startAngle,clockwise:e.clockwise===!1}:e.type==="circle"||e.type==="ellipse"?{...e,clockwise:e.clockwise===!1}:gn(e)}function $x(e){const t=e.segments.slice().reverse().map(Yx);return ti(t,e.role)}function Kx(e,t){return!t||!e.orientation||e.orientation!==t?e:$x(e)}function qx(e,t={}){const n=It(e.center),i=bt(e.radius);return!n||i===null||i<=0?null:ti([{type:"circle",center:n,radius:i,normal:{x:0,y:0,z:1},clockwise:t.clockwise!==!1}],t.role||"outer")}function jx(e,t={}){if(e?.type!=="POLYLINE"||!Array.isArray(e.vertices)||e.vertices.length<3)return null;const n=e.vertices.map(s=>It(s));if(n.some(s=>!s))return null;const i=Ar(n[0],n[n.length-1]);if(t.requireClosed!==!1&&!e.closed&&!i)return null;const r=i?n.slice(0,-1):n,a=e.closed?r.length:Math.max(0,r.length-1);if(a<3)return null;const o=[];for(let s=0;s<a;s+=1){const u=r[s],l=r[(s+1)%r.length],h=e.segments?.[s]??{type:"LINE"},d=h.type==="ARC"?sa(u,l,h):No(u,l);if(!d)return null;o.push(d)}return ti(o,t.role||"outer")}function Zx(e,t={}){const n=It(e.center),i=bt(e.radiusX??e.majorRadius),r=bt(e.radiusY??e.minorRadius),a=bt(e.rotation)??0;if(!n||i===null||r===null||i<=0||r<=0)return null;if(e.type==="ELLIPSE_ARC"||e.startAngle!==void 0||e.endAngle!==void 0||e.startParameter!==void 0||e.endParameter!==void 0){const s=Kt(e.startParameter??e.startAngle??0),u=Kt(e.endParameter??e.endAngle??En);return ti([{type:"arc-ellipse",center:n,radiusX:i,radiusY:r,rotation:a,startAngle:s,endAngle:u,clockwise:e.clockwise!==!1,start:Mn(n,i,r,a,s),end:Mn(n,i,r,a,u)}],t.role||"outer")}return ti([{type:"ellipse",center:n,radiusX:i,radiusY:r,rotation:a,normal:{x:0,y:0,z:1},clockwise:t.clockwise!==!1}],t.role||"outer")}function Jx(e,t={}){if(e?.type!=="CIRCLE")return null;const n=qx(e,{...t,role:"outer"});return n?Yi(e,n.segments,t):null}function Qx(e,t={}){const n=jx(e,{...t,role:"outer"});return n?Yi(e,n.segments,t):null}function ev(e,t={}){if(e?.type!=="ELLIPSE")return null;const n=Zx(e,{...t,role:"outer"});return n?Yi(e,n.segments,t):null}function tv(e,t={}){if(!Array.isArray(e)||e.length<2)return null;const n=[];for(const i of e){const r=i?.entity||i,a=!!i?.reversed;if(r?.type==="LINE"){const o=It(r.start),s=It(r.end);if(!o||!s)return null;n.push(No(a?s:o,a?o:s));continue}if(r?.type==="ARC"){const o=It(r.center),s=bt(r.radius);if(!o||s===null||s<=0)return null;const u=Dn(o,s,r.startAngle),l=Dn(o,s,r.endAngle),c=sa(a?l:u,a?u:l,{center:o,clockwise:a?r.clockwise===!1:r.clockwise!==!1});if(!c)return null;n.push(c);continue}if(r?.type==="ELLIPSE_ARC"){const o=It(r.center),s=bt(r.radiusX),u=bt(r.radiusY),l=bt(r.rotation)??0,h=Kt(r.startParameter),d=Kt(r.endParameter);if(!o||s===null||u===null||s<=0||u<=0)return null;const c=a?d:h,m=a?h:d;n.push({type:"arc-ellipse",center:o,radiusX:s,radiusY:u,rotation:l,startAngle:c,endAngle:m,clockwise:a?r.clockwise===!1:r.clockwise!==!1,start:Mn(o,s,u,l,c),end:Mn(o,s,u,l,m)});continue}return null}return Uo(n)?Yi({id:t.id??null,type:"COMPOSITE_PROFILE"},n,t):null}function nv(e){const t=e?.entity||e,n=t?.type==="CIRCLE"||t?.type==="ELLIPSE",i=Number(e?.startParameter??0),r=Number(e?.endParameter??1),a=n?i:Math.max(0,Math.min(1,i)),o=n?r:Math.max(0,Math.min(1,r));if(t?.type==="LINE"){const s=It(t.start),u=It(t.end);return!s||!u?null:No({x:s.x+(u.x-s.x)*a,y:s.y+(u.y-s.y)*a,z:s.z+(u.z-s.z)*a},{x:s.x+(u.x-s.x)*o,y:s.y+(u.y-s.y)*o,z:s.z+(u.z-s.z)*o})}if(t?.type==="ARC"){const s=It(t.center),u=bt(t.radius);if(!s||u===null||u<=0)return null;const l=t.clockwise===!1?-1:1,h=Vi(t.startAngle,t.endAngle,t.clockwise!==!1),d=Kt(t.startAngle+l*h*a),c=Kt(t.startAngle+l*h*o);return sa(Dn(s,u,d),Dn(s,u,c),{center:s,clockwise:o<a?t.clockwise===!1:t.clockwise!==!1})}if(t?.type==="CIRCLE"){const s=It(t.center),u=bt(t.radius);if(!s||u===null||u<=0)return null;const l=Kt(En*a),h=Kt(En*o);return sa(Dn(s,u,l),Dn(s,u,h),{center:s,clockwise:o>=a})}if(t?.type==="ELLIPSE_ARC"){const s=It(t.center),u=bt(t.radiusX),l=bt(t.radiusY),h=bt(t.rotation)??0;if(!s||u===null||l===null||u<=0||l<=0)return null;const d=t.clockwise!==!1,c=o<a?!d:d,m=d?1:-1,v=Vi(t.startParameter,t.endParameter,d),y=Kt(t.startParameter+m*v*a),p=Kt(t.startParameter+m*v*o);return{type:"arc-ellipse",center:s,radiusX:u,radiusY:l,rotation:h,startAngle:y,endAngle:p,clockwise:c,start:Mn(s,u,l,h,y),end:Mn(s,u,l,h,p)}}if(t?.type==="ELLIPSE"){const s=It(t.center),u=bt(t.radiusX),l=bt(t.radiusY),h=bt(t.rotation)??0;if(!s||u===null||l===null||u<=0||l<=0)return null;const d=Kt(En*a),c=Kt(En*o);return{type:"arc-ellipse",center:s,radiusX:u,radiusY:l,rotation:h,startAngle:d,endAngle:c,clockwise:o>=a,start:Mn(s,u,l,h,d),end:Mn(s,u,l,h,c)}}return null}function hl(e,t){if(!e||!t||e.entity!==t.entity||e.endHasSemanticJunction||t.startHasSemanticJunction)return null;const n=Math.sign(e.endParameter-e.startParameter),i=Math.sign(t.endParameter-t.startParameter);if(!n||n!==i)return null;const r=e.entity?.type==="CIRCLE"||e.entity?.type==="ELLIPSE";let a=t.startParameter,o=t.endParameter;if(r){const s=Math.round(e.endParameter-a);a+=s,o+=s}return Math.abs(e.endParameter-a)>1e-10||r&&Math.abs(o-e.startParameter)>=1-1e-10?null:{...e,endParameter:o,endHasSemanticJunction:t.endHasSemanticJunction}}function iv(e){const t=[];if(e.forEach(n=>{const i={...n,startParameter:Number(n?.startParameter??0),endParameter:Number(n?.endParameter??1)},r=t[t.length-1],a=hl(r,i);if(a){t[t.length-1]=a;return}t.push(i)}),t.length>1){const n=hl(t.at(-1),t[0]);if(n)return[n,...t.slice(1,-1)]}return t}function rv(e,t={}){if(!Array.isArray(e)||e.length<2)return null;const n=Xx(iv(e).map(nv),t.tolerance);return!n||n.some(i=>!i)||!Uo(n)?null:Yi({id:t.id??null,type:"COMPOSITE_PROFILE"},n,t)}function mu(e,t={}){return e?.type==="CIRCLE"?Jx(e,t):e?.type==="POLYLINE"?Qx(e,t):e?.type==="ELLIPSE"?ev(e,t):null}function av(e,t=[],n={}){if(!la(e))return null;const i=ti(gn(e.outerLoop?.segments||e.segments),"outer"),r=t.map((a,o)=>la(a)?Kx(ti(gn(a.outerLoop?.segments||a.segments),`inner-${o}`),i.orientation):null);return r.some(a=>!a)?null:Yi({id:n.id??e.id??null,type:"COMPOSITE_PROFILE"},i.segments,{...n,innerLoops:r,plane:n.plane??e.plane})}function ml(e){return!e?.closed||!Array.isArray(e.segments)||!e.segments.length||!Uo(e.segments)?!1:e.segments.every(t=>t.type==="line"?!!(It(t.start)&&It(t.end)):t.type==="arc-circle"?!!(It(t.center)&&It(t.start)&&It(t.end)&&bt(t.radius)>0&&bt(t.startAngle)!==null&&bt(t.endAngle)!==null):t.type==="circle"?!!(It(t.center)&&bt(t.radius)>0):t.type==="ellipse"||t.type==="arc-ellipse"?!!(It(t.center)&&bt(t.radiusX)>0&&bt(t.radiusY)>0):!1)}function la(e,t={}){if(e?.type!=="exact-profile"||e.version!==1||t.requireClosed!==!1&&e.closed!==!0)return!1;const n=e.outerLoop||{closed:e.closed,segments:e.segments};return ml(n)?(Array.isArray(e.innerLoops)?e.innerLoops:[]).every(r=>ml(r)&&(!n.orientation||!r.orientation||r.orientation!==n.orientation)):!1}function ov(e){return gn(e)}function gl(e,t={}){const n=Math.max(4,Math.trunc(Number(t.segments)||Ux)),i=[],r=a=>{const o=It(a);o&&(!i.length||!Ar(i[i.length-1],o))&&i.push(o)};return e.segments.forEach(a=>{if(a.type==="line"){r(a.start),r(a.end);return}if(a.type==="arc-circle"){const o=Vi(a.startAngle,a.endAngle,a.clockwise),s=Math.max(2,Math.ceil(n*o/En)),u=a.clockwise===!1?-1:1;for(let l=0;l<=s;l+=1)r(Dn(a.center,a.radius,a.startAngle+u*o*(l/s)));return}if(a.type==="circle"){for(let o=0;o<n;o+=1)r(Dn(a.center,a.radius,En*o/n));r(Dn(a.center,a.radius,0));return}if(a.type==="ellipse"){for(let o=0;o<n;o+=1)r(Mn(a.center,a.radiusX,a.radiusY,a.rotation||0,En*o/n));r(Mn(a.center,a.radiusX,a.radiusY,a.rotation||0,0));return}if(a.type==="arc-ellipse"){const o=Vi(a.startAngle,a.endAngle,a.clockwise),s=Math.max(2,Math.ceil(n*o/En)),u=a.clockwise===!1?-1:1;for(let l=0;l<=s;l+=1)r(Mn(a.center,a.radiusX,a.radiusY,a.rotation||0,a.startAngle+u*o*l/s))}}),i}function gu(e,t={}){if(!la(e))return t.structured?{outerLoop:[],innerLoops:[]}:[];const n={outerLoop:gl(e.outerLoop||{segments:e.segments},t),innerLoops:(e.innerLoops||[]).map(i=>gl(i,t))};return t.structured||n.innerLoops.length?n:n.outerLoop}const sv={x:0,y:0,z:1},_u=1e-9;function Bt(e){return e===void 0?void 0:JSON.parse(JSON.stringify(e))}function na(e){const t=Number(e);return Number.isFinite(t)?t:null}function xu(e,t=sv){const n=na(e?.x),i=na(e?.y),r=na(e?.z);return n===null||i===null||r===null?t?{...t}:null:{x:n,y:i,z:r}}function lv(e){return Math.hypot(e.x,e.y,e.z)}function cv(e){if(!e)return null;const t=lv(e);return t<=_u?null:{x:e.x/t,y:e.y/t,z:e.z/t}}function lo(e,t){return{x:e.x*t,y:e.y*t,z:e.z*t}}function uv(e,t){return{x:e.x+t.x,y:e.y+t.y,z:(e.z||0)+t.z}}function dv(e){return e.start||e.center||null}function fv(e,t,n,i,r){const a={loopRole:t,segmentIndex:n,sourceSegment:Bt(e),direction:Bt(i),distance:r};return e.type==="line"?{...a,type:"plane",kind:"line-extrusion-side",start:Bt(e.start),end:Bt(e.end)}:e.type==="circle"?{...a,type:"cylinder",kind:t==="outer"?"outer-side":"inner-side",center:Bt(e.center),radius:e.radius,axis:Bt(i),trimRole:t==="outer"?"outer":"inner"}:e.type==="arc-circle"?{...a,type:"linearExtrusionSurface",curveType:"arc-circle",center:Bt(e.center),radius:e.radius,startAngle:e.startAngle,endAngle:e.endAngle,clockwise:e.clockwise!==!1,start:Bt(e.start),end:Bt(e.end)}:e.type==="ellipse"?{...a,type:"ellipticCylinder",kind:t==="outer"?"outer-side":"inner-side",center:Bt(e.center),radiusX:e.radiusX,radiusY:e.radiusY,rotation:e.rotation||0,axis:Bt(i),trimRole:t==="outer"?"outer":"inner"}:e.type==="arc-ellipse"?{...a,type:"linearExtrusionSurface",curveType:"arc-ellipse",center:Bt(e.center),radiusX:e.radiusX,radiusY:e.radiusY,rotation:e.rotation||0,startAngle:e.startAngle,endAngle:e.endAngle,clockwise:e.clockwise!==!1,start:Bt(e.start),end:Bt(e.end)}:{...a,type:"linearExtrusionSurface",curveType:e.type}}function _l(e,t,n,i){return e.segments.map((r,a)=>fv(r,t,a,n,i))}function xl(e,t,n){return{type:"plane",role:t,plane:Bt(e.plane),offset:Bt(n),outerLoop:Bt(e.outerLoop),innerLoops:Bt(e.innerLoops||[]),trimRole:t}}function pv(e,t,n={}){const i=na(t);if(!la(e)||i===null||Math.abs(i)<=_u)return null;const r=cv(xu(n.direction));if(!r)return null;const a=lo(r,i),o=ov(e),s=i<0?lo(r,-1):r,u={type:"exact-extrusion",version:1,id:n.id??null,profile:o,direction:r,distance:i,offset:a,caps:{start:xl(o,"start",{x:0,y:0,z:0}),end:xl(o,"end",a)},sideSurfaces:{outer:_l(o.outerLoop,"outer",s,i),inner:o.innerLoops.map((l,h)=>({loopIndex:h,surfaces:_l(l,`inner-${h}`,s,i)}))},metadata:Bt(n.metadata??null)};return u.bounds=mv(u),u}function vl(e,t){return t?e?(e.minX=Math.min(e.minX,t.x),e.minY=Math.min(e.minY,t.y),e.minZ=Math.min(e.minZ,t.z||0),e.maxX=Math.max(e.maxX,t.x),e.maxY=Math.max(e.maxY,t.y),e.maxZ=Math.max(e.maxZ,t.z||0),e):{minX:t.x,minY:t.y,minZ:t.z||0,maxX:t.x,maxY:t.y,maxZ:t.z||0}:e}function hv(e){if(e.type==="line"||e.type==="arc-circle"||e.type==="arc-ellipse")return[e.start,e.end].filter(Boolean);if(e.type==="circle")return[{x:e.center.x-e.radius,y:e.center.y,z:e.center.z||0},{x:e.center.x+e.radius,y:e.center.y,z:e.center.z||0},{x:e.center.x,y:e.center.y-e.radius,z:e.center.z||0},{x:e.center.x,y:e.center.y+e.radius,z:e.center.z||0}];if(e.type==="ellipse"){const t=e.radiusX,n=e.radiusY;return[{x:e.center.x-t,y:e.center.y-n,z:e.center.z||0},{x:e.center.x+t,y:e.center.y+n,z:e.center.z||0}]}return[dv(e)].filter(Boolean)}function mv(e){if(!e?.profile)return null;const t=e.offset||lo(xu(e.direction),e.distance);let n=null;return[e.profile.outerLoop,...e.profile.innerLoops||[]].forEach(r=>{r.segments.forEach(a=>{hv(a).forEach(o=>{n=vl(n,o),n=vl(n,uv(o,t))})})}),n}const ia=1e-9;function Sl(e,t){return Math.abs(e.x-t.x)<=ia&&Math.abs(e.y-t.y)<=ia&&Math.abs(e.z-t.z)<=ia}function gv(e){if(!Array.isArray(e))throw new TypeError("El perfil de extrusion debe ser un array de puntos");const t=[];for(const n of e){const i={x:Number(n?.x),y:Number(n?.y),z:n?.z===void 0?0:Number(n.z)};if(![i.x,i.y,i.z].every(Number.isFinite))throw new TypeError("El perfil de extrusion contiene coordenadas no validas");(!t.length||!Sl(t[t.length-1],i))&&t.push(i)}if(t.length>1&&Sl(t[0],t[t.length-1])&&t.pop(),t.length<3)throw new RangeError("La extrusion necesita al menos tres puntos utiles");return t}function El(e,t,n={}){const i=Number(t);if(!Number.isFinite(i)||Math.abs(i)<=ia)throw new RangeError("La altura de extrusion debe ser distinta de cero");const r=gv(e),a=r.length,o=[...r,...r.map(d=>({...d,z:d.z+i}))],s=Array.from({length:a},(d,c)=>a-c-1),u=Array.from({length:a},(d,c)=>a+c),l=i>0?[s,u]:[s.reverse(),u.reverse()],h=[];for(let d=0;d<a;d+=1){const c=(d+1)%a,m=d,v=c,y=a+d,p=a+c;l.push(i>0?[m,v,p,y]:[m,y,p,v]),h.push([m,v],[y,p],[m,y])}return Cr({vertices:o,faces:l,edges:h,metadata:{type:"extrusion",height:i,source:n.source??null}})}const _n=1e-6;let Ml=0;const Ze={edgeColor:0,edgeDepthBias:5e-5,edgeLineWidth:3.2,edgePolygonOffsetFactor:-2,edgePolygonOffsetUnits:-2,edgeRenderOrder:28,faceColor:16777215,previewFaceColor:16185595,hiddenEdgeColor:10726832,hiddenEdgeLineWidth:1.15,hiddenEdgeOpacity:.72,tangentEdgeColor:5201249,tangentEdgeLineWidth:1.25};function vu(e){const t=e?.id??e?.handle??null;return t!=null?`${e?.type??e?.kind??"ENTITY"}:${t}`:null}function Su(e){return e?`solid-region:${e}`:null}function ci(e){const t=Su(e?.analyticRegionId);if(t)return t;const n=e?.sourceEntity,i=vu(n);return i?e?.sketchId?`${e.sketchId}:${i}`:i:e?.sourceSolidFaceIndex!==void 0&&e?.id?`solid-face:${e.id}`:e?.id?`face:${e.id}`:null}function Hi(e){const t=Number(e);return!Number.isFinite(t)||Math.abs(t)<=1e-9?null:t}function On(e){const t=new Q(Number(e?.x),Number(e?.y),Number(e?.z));return t.lengthSq()>1e-12?t.normalize():null}function Eu(e,t,n,i){const r=Number(i),a=On(n);if(!yi(e)||!a||!Number.isFinite(r))return r;const o=Dt(t);if(![o.x,o.y,o.z].every(Number.isFinite))return r;const s=Ef(e);let u=r,l=s;return e.vertices.forEach(h=>{const d=Dt(h).sub(o).dot(a),c=Math.abs(d-r);c<=l&&(u=d,l=c)}),u}function Mu(){const e=globalThis.crypto?.randomUUID?.();return e?`analytic-region-${e}`:(Ml+=1,`analytic-region-runtime-${Ml}`)}function ni(e){return e===void 0?void 0:JSON.parse(JSON.stringify(e))}function Kr(e,t,n){return{x:Number(e?.x)+t.x*n,y:Number(e?.y)+t.y*n,z:(Number(e?.z)||0)+t.z*n}}function yu(e,t,n){const i={...e,points:(e?.points??[]).map(r=>Kr(r,t,-n)),holes:(e?.holes??[]).map(r=>r.map(a=>Kr(a,t,-n)))};return e?.workplane&&(i.workplane={...ni(e.workplane),origin:Kr(e.workplane.origin,t,-n)}),e?.exactProfile?.plane&&(i.exactProfile=ni(e.exactProfile),i.exactProfile.plane.origin=Kr(e.exactProfile.plane.origin,t,-n)),i}function bu(e,t,n){const i=Hi(n),r=On(t?.analyticAxis??t?.normal??t?.exactProfile?.plane?.normal);if(i===null||!r)return null;const a=r.multiplyScalar(Math.sign(i)),o=Gc(e);return Dr(yu(t,a,o),i+Math.sign(i)*o)}function Xa(e,t={}){return{status:"unavailable",reason:e,...ni(t)}}function Au(e,t={}){return{status:"pending",reason:e,...ni(t)}}function _v(e,t){const n=e?.sourceEntity,i=e?.exactProfile?ni(e.exactProfile):null;if(!n&&!i)return e?.sourceSolidFaceIndex!==void 0?Au("face-push-exact-brep-not-implemented",{operation:{type:"pushMoveFace",sourceSolidFaceIndex:e.sourceSolidFaceIndex,distance:t}}):Xa("missing-source-entity");const r=i||mu(n),a=e?.workplane?Mf(r,e.workplane):r;if(!a)return Xa("unsupported-source-entity",{source:{entityId:n?.id??n?.handle??null,entityType:n?.type??e?.sourceEntityType??null}});const o=pv(a,t,{direction:e?.normal??{x:0,y:0,z:1},metadata:{sourceKey:ci(e),sketchPlane:e?.sketchPlane??"XY",visualPushDistance:t}});return o?{status:"available",representation:"exact-extrusion-v1",profile:a,extrusion:o}:Xa("exact-extrusion-failed",{source:a.source})}function Dt(e){return new Q(Number(e?.x),Number(e?.y),Number(e?.z))}function xv(e,t,n){return Dt(t).sub(Dt(e)).cross(Dt(n).sub(Dt(e))).length()*.5}function vv(e,t){if(!Array.isArray(e)||e.length<3)return 0;const n=t[e[0]];let i=0;for(let r=1;r<e.length-1;r+=1)i+=xv(n,t[e[r]],t[e[r+1]]);return i}function Sv(e){return e.faces.every(t=>vv(t,e.vertices)>_n)}function yl(e,t,n,i){return e.edges.every(r=>{const a=t.has(r[0]),o=t.has(r[1]);if(a===o)return!0;const s=a?r[0]:r[1],u=a?r[1]:r[0],l=Dt(e.vertices[s]).sub(Dt(e.vertices[u])).dot(n);if(Math.abs(l)<=_n)return!0;const h=l+i;return(l>0?h>_n:h<-_n)?Math.abs(l)+_n<or?!0:xa(h):!1})}function Ev(e,t,n){const i=Array.isArray(e?.points)?e.points:[];if(!i.length||i.length!==n.size)return!1;const r=ei(t);return[...n].every(a=>{const o=t.vertices[a];return i.some(s=>Math.hypot(Number(s.x)-o.x,Number(s.y)-o.y,Number(s.z??0)-o.z)<=r)})}function Mv(e,t){const n=e.map(r=>t[r]).filter(Boolean);if(n.length<3)return null;const i=Dt(n[0]);for(let r=1;r<n.length-1;r+=1){const a=Dt(n[r]).sub(i).cross(Dt(n[r+1]).sub(i));if(!(a.lengthSq()<=1e-12)&&(a.normalize(),n.every(o=>Math.abs(Dt(o).sub(i).dot(a))<=_n)))return a}return null}function bl(e,t){const n={x:Math.abs(t.x),y:Math.abs(t.y),z:Math.abs(t.z)};return e.map(r=>n.x>=n.y&&n.x>=n.z?{x:r.y,y:r.z}:n.y>=n.z?{x:r.x,y:r.z}:{x:r.x,y:r.y}).reduce((r,a)=>({minX:Math.min(r.minX,a.x),minY:Math.min(r.minY,a.y),maxX:Math.max(r.maxX,a.x),maxY:Math.max(r.maxY,a.y)}),{minX:1/0,minY:1/0,maxX:-1/0,maxY:-1/0})}function yv(e,t){return Math.min(e.maxX,t.maxX)-Math.max(e.minX,t.minX)>_n&&Math.min(e.maxY,t.maxY)-Math.max(e.minY,t.minY)>_n}function bv(e,t,n,i,r){const a=[...t].map(h=>e.vertices[h]).filter(Boolean);if(a.length<3)return r;const o=bl(a,i),s=a.reduce((h,d)=>h+Dt(d).dot(i),0)/a.length;let u=1/0,l=-1/0;return e.faces.forEach((h,d)=>{if(n.has(d))return;const c=h.map(y=>e.vertices[y]).filter(Boolean),m=Mv(h,e.vertices);if(!m||Math.abs(m.dot(i))<1-1e-7||!yv(o,bl(c,i)))return;const v=Dt(c[0]).dot(i)-s;v>_n?u=Math.min(u,v):v<-_n&&(l=Math.max(l,v))}),r>u?u:r<l?l:r}function Av(e){return yi(e)&&Sv(e)}function Tv(e,t,n,i={}){const r=On(t);if(!r)throw new TypeError("La cara seleccionada no tiene una normal valida");if(e.length<3||e.some(c=>![c.x,c.y,c.z].every(Number.isFinite)))throw new TypeError("El perfil de extrusion contiene coordenadas no validas");const a=r.clone().multiplyScalar(n),o=e.length,s=[...e,...e.map(c=>({x:c.x+a.x,y:c.y+a.y,z:c.z+a.z}))],u=Array.from({length:o},(c,m)=>m),l=Array.from({length:o},(c,m)=>o+m),h=n>0?[u.slice().reverse(),l]:[u,l.slice().reverse()],d=[];for(let c=0;c<o;c+=1){const m=(c+1)%o,v=c,y=m,p=o+c,f=o+m;h.push(n>0?[v,y,f,p]:[v,p,f,y]),d.push([v,y],[p,f],[v,p])}return Cr({vertices:s,faces:h,edges:d,metadata:{type:"extrusion",distance:n,normal:{x:r.x,y:r.y,z:r.z},source:i.source??null}})}function Al(e){const t=(Array.isArray(e)?e:[]).map(n=>({x:Number(n?.x),y:Number(n?.y),z:Number(n?.z)||0}));return t.length<3||t.some(n=>![n.x,n.y,n.z].every(Number.isFinite))?null:t}function Pv(e,t,n,i={}){const r=[Al(e),...(t||[]).map(Al)];if(r.some(p=>!p))throw new TypeError("El perfil con huecos no es valido");const a=r.flat(),o=a.length,s=r[0].map(p=>new Ke(p.x,p.y)),u=r.slice(1).map(p=>p.map(f=>new Ke(f.x,f.y))),l=To.triangulateShape(s,u).filter(([p,f,E])=>{const A=a[p],_=a[f],S=a[E];return Math.abs((_.x-A.x)*(S.y-A.y)-(_.y-A.y)*(S.x-A.x))>_n});if(!l.length)throw new RangeError("No se pudo triangular el perfil con huecos");const h=[...a,...a.map(p=>({...p,z:p.z+n}))],d=[],c=[],m=[];l.forEach(p=>{const[f,E,A]=p.map(C=>a[C]),S=(E.x-f.x)*(A.y-f.y)-(E.y-f.y)*(A.x-f.x)>0?[...p]:[p[0],p[2],p[1]],b=[...S].reverse();c.push(d.length),d.push(n>0?b:S),m.push(d.length),d.push((n>0?S:b).map(C=>C+o))});const v=[];let y=0;return r.forEach((p,f)=>{p.forEach((E,A)=>{const _=(A+1)%p.length,S=y+A,b=y+_,C=S+o,x=b+o,R=f===0;d.push(n>0?R?[S,b,x,C]:[C,x,b,S]:R?[S,C,x,b]:[C,S,b,x]),v.push([S,b],[C,x],[S,C])}),y+=p.length}),Cr({vertices:h,faces:d,edges:v,metadata:{type:"extrusion",height:n,source:i.source??null,profileSize:o,profileLoopSizes:r.map(p=>p.length),capFaceGroups:{lower:c,upper:m}}})}function Dr(e,t,n={}){const i=Hi(t);if(i===null)throw new RangeError("La altura de Push debe ser distinta de cero");if(!xa(i)&&n.allowSubMinimumThickness!==!0)return null;const r=!!(e?.workplane&&Array.isArray(e?.localPoints)),a=!r&&Array.isArray(e?.holes)&&e.holes.length>0&&e?.normal,o=r?e.workplane:a?va(e):null,s=r?e.localPoints:o?e.points.map(p=>en(p,o)):e?.points,u=r?e.localHoles:o?e.holes.map(p=>p.map(f=>en(f,o))):e?.holes,l=(Array.isArray(s)?s:[]).map(p=>({x:Number(p.x),y:Number(p.y),z:Number(p.z)||0})),h=n.source??e?.id??null,d=Array.isArray(u)?u:[];let c=d.length?Pv(l,d,i,{source:h}):r?El(l,i,{source:h}):e?.normal?Tv(l,e.normal,i,{source:h}):El(l,i,{source:h});o&&(c=Sf(c,o,e.sketchId));const m=new Set(e?.cadProfileVertexIndices||[]),v=new Set(e?.smoothProfileVertexIndices||[]);let y=l.length;return d.forEach((p,f)=>{const E=e?.holeCadProfileVertexIndices?.[f]||[],A=e?.holeSmoothProfileVertexIndices?.[f]||[];E.forEach(_=>m.add(y+_)),A.forEach(_=>v.add(y+_)),y+=Array.isArray(p)?p.length:0}),c.metadata={...c.metadata,type:"push",faceId:e?.id??null,height:i,distance:i,sketchPlane:e?.sketchPlane??c.metadata?.sketchPlane??"XY",sketchId:e?.sketchId??c.metadata?.sketchId??null,workplane:e?.workplane??c.metadata?.workplane??null,normal:e?.normal?{...e.normal}:c.metadata?.normal??null,sourceEntity:e?.sourceEntity??null,sourceEntityId:e?.sourceEntity?.id??e?.sourceEntity?.handle??null,sourceFaceType:e?.sourceEntityType??null,sourceSolidFaceIndex:e?.sourceSolidFaceIndex??null,sourceKey:ci(e),exactGeometry:_v(e,i),cadProfileVertexIndices:[...m],smoothProfileVertexIndices:Array.isArray(e?.smoothProfileVertexIndices)?[...e.smoothProfileVertexIndices]:[],smoothVerticalEdgeIndices:[...v]},c}function wv(e){const t=gu(e,{segments:64,structured:!0});if(!t?.outerLoop?.length)return null;const n=e?.plane,i=Dt(n?.xAxis),r=Dt(n?.normal);if(i.lengthSq()<=1e-12||r.lengthSq()<=1e-12)return null;const a=o=>o.map(s=>Po(s,n));return{outer:a(t.outerLoop),holes:t.innerLoops.map(a)}}function Tu(e){const t=wv(e),n=On(e?.plane?.normal);if(!t||!n||t.outer.length<3)return null;const i=e.outerLoop?.segments?.length===1&&["circle","ellipse"].includes(e.outerLoop.segments[0]?.type),r=(e.innerLoops??[]).map(a=>a?.segments?.length===1&&["circle","ellipse"].includes(a.segments[0]?.type));return{points:t.outer,holes:t.holes,normal:{x:n.x,y:n.y,z:n.z},exactProfile:ni(e),cadProfileVertexIndices:i?[]:t.outer.map((a,o)=>o),smoothProfileVertexIndices:i?t.outer.map((a,o)=>o):[],holeCadProfileVertexIndices:t.holes.map((a,o)=>r[o]?[]:a.map((s,u)=>u)),holeSmoothProfileVertexIndices:t.holes.map((a,o)=>r[o]?a.map((s,u)=>u):[])}}function Rv(e,t){const n=[e?.outerLoop,...e?.innerLoops??[]],i=[t?.outerLoop,...t?.innerLoops??[]];n.forEach((r,a)=>{const o=i[a]?.segments??[];(r?.segments??[]).forEach((s,u)=>{const l=o[u]?.source;l?.role&&(s.source=ni(l))})}),e?.outerLoop&&(e.segments=e.outerLoop.segments)}function Cv(e){const t=e?.metadata?.exactGeometry?.base??(e?.metadata?.exactGeometry?.extrusion?e.metadata.exactGeometry:null),n=t?.extrusion,i=n?.profile??t?.profile,r=Number(n?.distance),a=Tu(i);if(!a||!Number.isFinite(r)||Math.abs(r)<=1e-9)return null;const o=On(n?.direction);if(!o)return null;const s=Dr({...a,normal:{x:o.x,y:o.y,z:o.z},id:i.id??null,sketchId:n.metadata?.sketchId??null,sketchPlane:n.metadata?.sketchPlane??null},r);return yi(s)?(s.metadata={...s.metadata,exactGeometry:ni(t),profileFeatures:[]},s):null}function Iv(e,t,n){const i=e?.metadata?.profileFeatures,r=Number(t?.analyticFeatureIndex),a=t?.analyticRegionId?i?.findIndex(y=>y?.analyticRegionId===t.analyticRegionId):r;if(!Array.isArray(i)||!Number.isInteger(a)||a<0||t?.analyticCapIndex!==1||!["union","subtract"].includes(t?.analyticOperationType)||!yo())return null;const o=i?.[a];if(!["union","subtract"].includes(o?.type)||!o?.exactProfile?.plane)return null;const s=On(t?.normal),u=On(o.exactProfile.plane.normal);if(!s||!u)return null;const l=s.multiplyScalar(n).dot(u),h=Number(o.distance),d=h+l;if(!Number.isFinite(h)||!Number.isFinite(d))return null;const c=ei(e),m=d>c?"union":d<-c?"subtract":null;let v=Cv(e);if(!v)return null;for(let y=0;y<i.length;y+=1){const p=i[y];if(!["union","subtract"].includes(p?.type)||!p?.exactProfile)return null;const f=y===a,E=f?d:Number(p.distance);if(!Number.isFinite(E))return null;if(Math.abs(E)<=c)continue;const A=Tu(p.exactProfile);if(!A)return null;const _=f?m:p.type;if(!_)continue;const S=ni(p);f&&t?.exactProfile&&Rv(S.exactProfile,t.exactProfile),S.type=_,S.distance=E,S.requestedDistance=E,delete S.kernelDistance;let b=null;if(_==="subtract"){const C=On(A.normal),x=Dt(A.points[0]);S.through=C?E<=Math.min(...v.vertices.map(R=>Dt(R).sub(x).dot(C)))+c:!1,b=bo(v,A,E,{operation:S})}else{S.through=!1;const C=bu(v,A,E);b=Ao(v,C,{operationType:"union",operation:S})}if(!yi(b))return null;v=b}return{...v,metadata:{...v.metadata,lastPushDistance:n,lastPushFaceIndex:t.sourceSolidFaceIndex??null,lastPushFaceIndices:Array.isArray(t.sourceSolidFaceIndices)?[...t.sourceSolidFaceIndices]:[],lastPushRequestedDistance:n,lastPushNormal:{x:t.normal.x,y:t.normal.y,z:t.normal.z},sourceSolidDocumentId:e.metadata?.sourceSolidDocumentId??v.metadata?.sourceSolidDocumentId??null}}}function Dv(e,t){const n=Hi(t),i=e?.sourceSolid,r=e?.sourceSolidFaceIndex,a=On(e?.exactProfile?e?.analyticAxis??e?.normal:e?.normal);if(n===null)throw new RangeError("La distancia de Push debe ser distinta de cero");if(!i||!Number.isInteger(r)||!a)return null;const o=Dt(e?.points?.[0]??i.vertices?.[i.faces?.[r]?.[0]]),s=Eu(i,o,a,n);if(Math.abs(s)<=Oc(i))return null;const u={...e,normal:{x:a.x,y:a.y,z:a.z},analyticAxis:{x:a.x,y:a.y,z:a.z}},l=Iv(i,u,s);if(l)return l;const h=Array.isArray(e?.sourceSolidFaceIndices)&&e.sourceSolidFaceIndices.length?e.sourceSolidFaceIndices:[r],d=h.map(_=>i.faces?.[_]);if(d.some(_=>!Array.isArray(_)||_.length<3))return null;const c=new Set(d.flat());if(Ev(e,i,c)&&!yl(i,c,a,s))return null;if(yo()){const _=s<0?"subtract":"union",S=_==="subtract"?Bc(i,s,o,a):s,b=Math.min(...i.vertices.map(Z=>Dt(Z).sub(o).dot(a))),C=s<0&&s<=b+_n,x=u.exactProfile?u.analyticRegionId??Mu():null,R={type:_,distance:s,requestedDistance:n,...S!==s?{kernelDistance:S}:{},through:C,sourceSolidFaceIndex:r,sourceSolidFaceIndices:h,normal:{x:a.x,y:a.y,z:a.z},analyticAxis:{x:a.x,y:a.y,z:a.z},sketchId:u.sketchId??null,exactProfile:u.exactProfile?zc(i,u.exactProfile,x):null,...x?{analyticRegionId:x}:{}},U={lastPushFaceIndex:r,lastPushFaceIndices:h,lastPushDistance:s,lastPushRequestedDistance:n,lastPushNormal:R.normal};if(_==="subtract")return bo(i,u,s,{kernelDistance:S,operation:R,metadata:U});const D=ei(i);let B=null;try{B=Dr(yu(u,a,D),S+D,{allowSubMinimumThickness:!0})}catch{return null}return Ao(i,B,{operationType:R.type,operation:R,metadata:U})}const m=bv(i,c,new Set(h),a,s),v=a.clone().multiplyScalar(m);if(!yl(i,c,a,m))return null;const y=i.vertices.map((_,S)=>c.has(S)?{x:_.x+v.x,y:_.y+v.y,z:_.z+v.z}:{..._}),p=new Map(i.vertices.map((_,S)=>[`${Number(_.x).toFixed(7)}:${Number(_.y).toFixed(7)}:${Number(_.z).toFixed(7)}`,S])),f=_=>{const S=`${Number(_?.x).toFixed(7)}:${Number(_?.y).toFixed(7)}:${Number(_?.z??0).toFixed(7)}`,b=p.get(S);return b!==void 0&&c.has(b)?{...y[b]}:{x:Number(_?.x),y:Number(_?.y),z:Number(_?.z??0)}},E=(i.metadata?.planarFaceGroups??[]).map(_=>({..._,outerLoop:Array.isArray(_?.outerLoop)?_.outerLoop.map(f):_?.outerLoop,innerLoops:Array.isArray(_?.innerLoops)?_.innerLoops.map(S=>S.map(f)):_?.innerLoops})),A=Cr({vertices:y,faces:i.faces,edges:i.edges,metadata:{...i.metadata&&typeof i.metadata=="object"?i.metadata:{},type:i.metadata?.type==="profileFeature"?"profileFeature":"push",planarFaceGroups:E,exactGeometry:Au("face-push-exact-brep-not-implemented",{operation:{type:"pushMoveFace",sourceSolidFaceIndex:r,sourceSolidFaceIndices:h,distance:m,requestedDistance:n,normal:e.normal}}),lastPushFaceIndex:r,lastPushFaceIndices:h,lastPushDistance:m,lastPushRequestedDistance:n,lastPushNormal:{x:e.normal.x,y:e.normal.y,z:e.normal.z}}});return Av(A)?A:null}function Lv(e,t={}){const n=gf(e),i=n,r=_f(i),a=new xf({color:t.faceColor??t.color??Ze.faceColor,depthTest:!0,depthWrite:!0,emissive:526344,emissiveIntensity:.08,metalness:0,opacity:1,polygonOffset:!0,polygonOffsetFactor:2,polygonOffsetUnits:2,roughness:.82,side:cn,transparent:!1,wireframe:!1}),o=new nn(r,a);return o.name=t.name??`webcad-push-solid-${e.metadata?.faceId??"solid"}`,o.renderOrder=t.renderOrder??18,o.userData={type:"webcad-push-solid",faceId:i.metadata?.faceId??null,height:i.metadata.height,normal:i.metadata.normal,sourceEntity:i.metadata.sourceEntity,sourceEntityId:i.metadata.sourceEntityId,sourceFaceType:i.metadata.sourceFaceType,sourceSolidFaceIndex:i.metadata.sourceSolidFaceIndex,sourceKey:i.metadata.sourceKey,exactGeometry:i.metadata.exactGeometry,cadProfileVertexIndices:i.metadata.cadProfileVertexIndices,smoothProfileVertexIndices:i.metadata.smoothProfileVertexIndices,analyticSolid:n,solid:i},o}function Nv(e,t={}){const n=e.userData?.analyticSolid??e.userData?.solid,i=vf(n),r=new Set(Array.isArray(n?.metadata?.smoothProfileVertexIndices)?n.metadata.smoothProfileVertexIndices:[]),a=new Set(Array.isArray(n?.metadata?.smoothVerticalEdgeIndices)?n.metadata.smoothVerticalEdgeIndices:r),o=new Set(Array.isArray(n?.metadata?.cadProfileVertexIndices)?n.metadata.cadProfileVertexIndices:[]);Mo(n,[...o]).forEach(f=>{o.delete(f),a.add(f)});const u=e.userData?.sourceFaceType==="CIRCLE",l=n?.metadata?.type==="profileFeature"||Array.isArray(n?.metadata?.profileFeatures),h=!l&&(u||a.size>0)&&t.showVerticalSurfaceEdges!==!0,d=[],c=[],m=[],v=On(n?.metadata?.normal??{x:0,y:0,z:1}),y=new Map;l&&n.faces.forEach(f=>f.forEach((E,A)=>{const _=f[(A+1)%f.length],S=E<_?`${E}:${_}`:`${_}:${E}`;y.set(S,(y.get(S)??0)+1)}));for(const f of i.entries){const E=Array.isArray(f.sourceEdgeIndices?.[0])?f.sourceEdgeIndices[0]:f.sourceEdgeIndices,A=E?.[0],_=E?.[1],S=f.segment?.start,b=f.segment?.end;if(!S||!b)continue;const C=A<_?`${A}:${_}`:`${_}:${A}`;(y.get(C)??0)>2||h&&(u||a.has(Math.min(A,_))&&!o.has(Math.min(A,_)))&&v&&Dt(b).sub(Dt(S)).normalize().cross(v).lengthSq()<=1e-12||(d.push({start:{x:S.x,y:S.y,z:S.z},end:{x:b.x,y:b.y,z:b.z}}),c.push(f.sourceEdgeIndices??null),m.push(f.curveGroupId??null))}const p=tn(d,{color:t.edgeColor??t.color??Ze.edgeColor,depthBias:Ze.edgeDepthBias,depthFunc:zi,depthTest:!0,depthWrite:!1,linewidth:t.edgeLineWidth??Ze.edgeLineWidth,polygonOffset:!0,polygonOffsetFactor:Ze.edgePolygonOffsetFactor,polygonOffsetUnits:Ze.edgePolygonOffsetUnits,renderOrder:t.renderOrder??Ze.edgeRenderOrder});return p.name=`${e.name}-edges`,p.userData={type:"webcad-push-solid-edges",faceId:e.userData.faceId,hiddenVerticalSurfaceEdges:h,segmentCount:d.length,sourceSegments:d,sourceEdgeIndices:c,curveGroupIds:m,analyticEdgeGeometry:i.geometry,sourceEntityId:e.userData.sourceEntityId,sourceKey:e.userData.sourceKey,showHiddenEdges:t.showHiddenEdges===!0},p}function Uv(e,t={}){const n=e.userData?.analyticSolid??e.userData?.solid,i=(n?.metadata?.tangentEdges??[]).flatMap(a=>{const o=n.vertices?.[a.startIndex],s=n.vertices?.[a.endIndex];return o&&s?[{start:{...o},end:{...s}}]:[]}),r=tn(i,{color:t.color??Ze.tangentEdgeColor,depthBias:Ze.edgeDepthBias,depthFunc:zi,depthTest:!0,depthWrite:!1,linewidth:t.linewidth??Ze.tangentEdgeLineWidth,polygonOffset:!0,polygonOffsetFactor:Ze.edgePolygonOffsetFactor,polygonOffsetUnits:Ze.edgePolygonOffsetUnits,renderOrder:t.renderOrder??Ze.edgeRenderOrder-1});return r.name=`${e.name}-tangent-edges`,r.userData={type:"webcad-push-solid-tangent-edges",segmentCount:i.length,sourceSegments:i},r}function Fv(e,t){if(e?.userData?.type!=="webcad-push-solid-group")return!1;e.userData.showHiddenEdges=t===!0;const n=e.children.find(i=>i.userData?.type==="webcad-push-solid-hidden-edges");return n&&(n.visible=e.userData.showHiddenEdges),!0}function Tl(e,t,n={}){const i=Dr(e,t,n);return i?Ci(i,{...n,name:n.name??`webcad-push-group-${e?.id??"face"}`}):null}function Ci(e,t={}){if(!yi(e))return null;const n=new Qt;n.name=t.name??`webcad-push-group-${e.metadata?.faceId??"solid"}`;const i=Lv(e,t),r=Nv(i,{edgeColor:t.edgeColor,edgeLineWidth:t.edgeLineWidth,renderOrder:t.edgeRenderOrder}),a=Uv(i,{renderOrder:t.edgeRenderOrder});return n.add(i,r),a.userData.segmentCount>0?n.add(a):ct(a),n.userData={type:"webcad-push-solid-group",faceId:i.userData.faceId,height:i.userData.height,normal:i.userData.normal,sourceEntity:i.userData.sourceEntity,sourceEntityId:i.userData.sourceEntityId,sourceFaceType:i.userData.sourceFaceType,sourceSolidFaceIndex:i.userData.sourceSolidFaceIndex,sourceKey:i.userData.sourceKey,exactGeometry:i.userData.exactGeometry,analyticSolid:i.userData.analyticSolid,solid:e,showCurveGeneratrices:!0,showHiddenEdges:t.showHiddenEdges===!0},n}const Ui=1e-7;function dn(e){return{x:Number(e?.x),y:Number(e?.y),z:Number(e?.z)||0}}function Ln(e){return`${Math.round(e.x/Ui)}:${Math.round(e.y/Ui)}:${Math.round(e.z/Ui)}`}function rr(e,t){const n=Ln(e),i=Ln(t);return n<i?`${n}|${i}`:`${i}|${n}`}function Pl(e){return e.map(Ln).sort().join("|")}function Lt(e){return new Q(e.x,e.y,e.z)}function wl(e,t={x:0,y:0,z:1}){const n=Lt(dn(e));return n.lengthSq()<=1e-12?dn(t):(n.normalize(),{x:n.x,y:n.y,z:n.z})}function gi(e,t,n){return{x:e.x+t.x*n,y:e.y+t.y*n,z:e.z+t.z*n}}function Pu(e,t){if(!Array.isArray(e)||!Array.isArray(t)||e.length!==t.length)return!1;const n=new Set(t.map(Ln));return e.every(i=>n.has(Ln(i)))}function Ov(e,t,n){const i=Lt(n);return(e?.metadata?.planarFaceGroups??[]).filter(r=>{if(r?.kind!=="support-remainder"&&r?.kind!=="opposite-remainder"||!Array.isArray(r.indices)||!Pu(r.outerLoop,t))return!1;const a=Lt(dn(r.normal));return a.lengthSq()>1e-12&&a.normalize().dot(i)>.99})}function Bv(e){const t=new Set;return e.filter(n=>{if(!Array.isArray(n)||n.length<3)return!1;const i=n.map(Ln).sort().join("|");return t.has(i)?!1:(t.add(i),!0)})}function zv(e,t){const n=e.map(i=>t[i]).filter(Boolean);for(let i=1;i<n.length-1;i+=1){const r=Lt(n[i]).sub(Lt(n[0])).cross(Lt(n[i+1]).sub(Lt(n[0])));if(r.lengthSq()>1e-12)return r.normalize(),{x:r.x,y:r.y,z:r.z}}return{x:0,y:0,z:1}}function Rl(e,t,n){return Math.min(...e.vertices.map(i=>Lt(i).sub(Lt(t)).dot(Lt(n))))}function Gv(e,t,n,i){const r=Lt(n);return e.faces.reduce((a,o,s)=>{const u=o.map(l=>e.vertices[l]).filter(Boolean);return u.length<3||u.some(l=>Math.abs(Lt(l).sub(Lt(t)).dot(r)-i)>Ui)||a.push(s),a},[])}function cr(e,t){const n=en(e,t);return new Ke(n.x,n.y)}function Vv(e,t){const n=e.map(i=>cr(i,t));return n.reduce((i,r,a)=>{const o=n[(a+1)%n.length];return i+r.x*o.y-o.x*r.y},0)*.5}function Hv(e,t){const n=e?.supportSolid,i=(e?.points??[]).map(dn),r=(e?.holes??[]).map(q=>q.map(dn)),a=(e?.supportLoops?.outer??[]).map(dn),o=(e?.supportLoops?.holes??[]).map(q=>q.map(dn)),s=wl(e?.normal),u=gr(e?.workplane??{type:"fixed",origin:i[0],normal:s,xAxis:{x:1,y:0,z:0}});if(!yi(n)||i.length<3||a.length<3||!Number.isFinite(t))return null;const l=Number(t),h=Eu(n,a[0],s,l);if(Math.abs(h)<=Oc(n)||!xa(h))return null;const d=e?.supportContactOnly===!0,c=d||h>0?"union":"subtract";if(yo()){const q=Rl(n,a[0],s),ue=c==="subtract"&&h<=q+Ui,se=c==="subtract"?Bc(n,h,a[0],s):h,Ee=e.exactProfile?e.analyticRegionId??Mu():null,z={type:c,distance:h,requestedDistance:l,...se!==h?{kernelDistance:se}:{},through:ue,tangentContact:d,sketchId:e.sketchId??null,exactProfile:e.exactProfile?zc(n,e.exactProfile,Ee):null,...Ee?{analyticRegionId:Ee}:{}};if(c==="subtract")return bo(n,e,h,{kernelDistance:se,operation:z,metadata:{sourceSolidDocumentId:e.sourceSolidDocumentId??null}});let re=null;try{re=bu(n,e,se)}catch{return null}return Ao(n,re,{operationType:z.type,operation:z,metadata:{sourceSolidDocumentId:e.sourceSolidDocumentId??null}})}if(d)return null;const m=Ov(n,a,s),v=Bv([...o,...m.flatMap(q=>q.innerLoops??[])]).map(q=>q.map(dn)),y=m.length?[...new Set(m.flatMap(q=>q.indices))]:e.sourceSolidFaceIndices??[],p=Rl(n,a[0],s),f=h<0&&h<=p+Ui,E=f?p:h,A=f?Gv(n,a[0],s,p):[];if(f&&!A.length)return null;const _=n.vertices.map(dn),S=new Map(_.map((q,ue)=>[Ln(q),ue])),b=q=>{const ue=dn(q),se=Ln(ue);return S.has(se)||(S.set(se,_.length),_.push(ue)),S.get(se)},C=new Set([...y,...A]),x=new Set,R=new Set;if(h>0){const q=new Map;n.faces.forEach((ue,se)=>{const Ee=Pl(ue.map(z=>n.vertices[z]).filter(Boolean));Ee&&q.set(Ee,se)}),[i,...r].forEach((ue,se)=>{const Ee=ue.map(re=>gi(re,s,E)),z=new Set(se===0?e.cadProfileVertexIndices??[]:e.holeCadProfileVertexIndices?.[se-1]??[]);ue.forEach((re,de)=>{const me=(de+1)%ue.length,Ye=Pl([re,ue[me],Ee[me],Ee[de]]),Fe=q.get(Ye);Fe!==void 0&&(C.add(Fe),x.add(`${se}:${de}`),R.add(rr(re,ue[me])),R.add(rr(Ee[de],Ee[me])),z.has(de)||R.add(rr(re,Ee[de])),z.has(me)||R.add(rr(ue[me],Ee[me])))})})}const U=[],D=[],B=[],Z=new Map,k=n.metadata?.faceVertexNormals;n.faces.forEach((q,ue)=>{if(C.has(ue))return;Z.set(ue,U.length),U.push([...q]);const se=k?.[ue],Ee=zv(q,n.vertices);D.push(Array.isArray(se)&&se.length===q.length?se.map(dn):q.map(()=>({...Ee})))}),(n.metadata?.planarFaceGroups??[]).forEach(q=>{!Array.isArray(q?.indices)||q.indices.some(ue=>!Z.has(ue))||B.push({...JSON.parse(JSON.stringify(q)),indices:q.indices.map(ue=>Z.get(ue))})});const I=(n.metadata?.curvedSideFaceIndices??[]).filter(q=>Z.has(q)).map(q=>Z.get(q)),W=(n.metadata?.curvedFeatureGeneratrices??[]).filter(q=>Z.has(q?.beforeFaceIndex)&&Z.has(q?.afterFaceIndex)).map(q=>({...q,beforeFaceIndex:Z.get(q.beforeFaceIndex),afterFaceIndex:Z.get(q.afterFaceIndex)})),L=(q,ue)=>{const[se,Ee,z]=q.map(de=>Lt(_[de]));return Ee.sub(se).cross(z.sub(se)).dot(Lt(ue))<0?[q[0],q[2],q[1]]:q},H=(q,ue,se,Ee)=>{if(q.length<3)return[];const z=q.map(Fe=>cr(Fe,u)),re=ue.map(Fe=>Fe.map(et=>cr(et,u))),de=[q,...ue].flat().map(b),me=To.triangulateShape(z,re),Ye=[];return me.forEach(Fe=>{const et=L(Fe.map(at=>de[at]),se);Ye.push(U.length),U.push(et),D.push(et.map(()=>({...se})))}),Ye.length&&B.push({indices:Ye,kind:Ee,normal:{...se},outerLoop:q.map(dn),innerLoops:ue.map(Fe=>Fe.map(dn))}),Ye},ee=Pu(i,a);ee?r.forEach(q=>H(q,[],s,"support-island")):(H(a,[...v,i],s,"support-remainder"),r.forEach(q=>H(q,[],s,"support-island")));const fe=i.map(q=>gi(q,s,E)),ce=r.map(q=>q.map(ue=>gi(ue,s,E)));if(f){const q={x:-s.x,y:-s.y,z:-s.z},ue=a.map(Ee=>gi(Ee,s,E)),se=v.map(Ee=>Ee.map(z=>gi(z,s,E)));ee?ce.forEach(Ee=>H(Ee,[],q,"opposite-island")):(H(ue,[...se,fe],q,"opposite-remainder"),ce.forEach(Ee=>H(Ee,[],q,"opposite-island")))}else H(fe,ce,s,"feature-end");const pe=(q,ue)=>{const se=q.map(Ye=>gi(Ye,s,E)),Ee=new Set(ue===0?e.smoothProfileVertexIndices??[]:e.holeSmoothProfileVertexIndices?.[ue-1]??[]),z=new Set(ue===0?e.cadProfileVertexIndices??[]:e.holeCadProfileVertexIndices?.[ue-1]??[]),re=[],de=[],me=Vv(q,u);q.forEach((Ye,Fe)=>{const et=(Fe+1)%q.length,at=q[et],ut=[b(Ye),b(at)],pt=[b(se[Fe]),b(se[et])];if(x.has(`${ue}:${Fe}`)){re.push(null),de.push(!1);return}let P=[ut[0],ut[1],pt[1],pt[0]];const De=cr(Ye,u),Pe=cr(at,u);let T=me>=0?{x:Pe.y-De.y,y:De.x-Pe.x}:{x:De.y-Pe.y,y:Pe.x-De.x};ue>0&&(T={x:-T.x,y:-T.y}),E<0&&(T={x:-T.x,y:-T.y});const g=wl({x:u.xAxis.x*T.x+u.yAxis.x*T.y,y:u.xAxis.y*T.x+u.yAxis.y*T.y,z:u.xAxis.z*T.x+u.yAxis.z*T.y});L([P[0],P[1],P[2]],g)[1]!==P[1]&&(P=[P[0],P[3],P[2],P[1]]);const Y=U.length;U.push(P),re.push(Y);const X=Ee.has(Fe)&&Ee.has(et)||!(z.has(Fe)&&z.has(et));if(de.push(X),X){I.push(Y);const he=J=>{const te=q[(J-1+q.length)%q.length],ge=q[J],Oe=q[(J+1)%q.length],xe=Lt(ge).sub(Lt(te)).normalize(),Ae=Lt(Oe).sub(Lt(ge)).normalize();let Ue=xe.cross(Lt(s)).add(Ae.cross(Lt(s)));return ue>0&&Ue.multiplyScalar(-1),E<0&&Ue.multiplyScalar(-1),Ue.normalize(),{x:Ue.x,y:Ue.y,z:Ue.z}},Me=new Map([[ut[0],he(Fe)],[pt[0],he(Fe)],[ut[1],he(et)],[pt[1],he(et)]]);D.push(P.map(J=>Me.get(J)??g))}else D.push(P.map(()=>({...g})))}),q.forEach((Ye,Fe)=>{const et=(Fe-1+q.length)%q.length;!de[et]||!de[Fe]||W.push({startIndex:b(Ye),endIndex:b(se[Fe]),beforeFaceIndex:re[et],afterFaceIndex:re[Fe]})})};[i,...r].forEach(pe);const He=[],Ge=new Set,Ie=(q,ue)=>{const se=b(q),Ee=b(ue);if(se===Ee)return;const z=se<Ee?`${se}:${Ee}`:`${Ee}:${se}`;Ge.has(z)||(Ge.add(z),He.push(se<Ee?[se,Ee]:[Ee,se]))},N=new Set(a.flatMap((q,ue)=>{const se=a[(ue+1)%a.length],Ee=Ln(q),z=Ln(se);return[Ee<z?`${Ee}|${z}`:`${z}|${Ee}`]}));n.edges.forEach(([q,ue])=>{const se=n.vertices[q],Ee=n.vertices[ue],z=rr(se,Ee);R.has(z)||ee&&N.has(z)||Ie(se,Ee)}),[i,...r].forEach((q,ue)=>{const se=q.map(z=>gi(z,s,E));q.forEach((z,re)=>{const de=q[(re+1)%q.length],me=x.has(`${ue}:${re}`);!me&&(!ee||ue>0)&&Ie(z,de),me||Ie(se[re],se[(re+1)%q.length])}),(ue===0?e.cadProfileVertexIndices??[]:e.holeCadProfileVertexIndices?.[ue-1]??[]).forEach(z=>Ie(q[z],se[z]))});const ne={type:h>0?"union":"subtract",distance:E,requestedDistance:l,through:f,sketchId:e.sketchId??null,exactProfile:e.exactProfile??null},ae=Cr({vertices:_,faces:U,edges:He,metadata:{...n.metadata??{},type:"profileFeature",booleanOperation:h>0?"union":"subtract",capFaceGroups:null,faceVertexNormals:D,planarFaceGroups:B,curvedSideFaceIndices:I,curvedFeatureGeneratrices:W,profileFeatures:[...n.metadata?.profileFeatures??[],ne],sourceSolidDocumentId:e.sourceSolidDocumentId??null,exactGeometry:{status:"pending",reason:"profile-feature-exact-brep-not-implemented",operations:[...n.metadata?.exactGeometry?.operations??[],ne]}}});return yi(ae)?ae:null}const kv=/^[0-9eE+\-*/().,\s]$/;function Tr(e){return e?.localFace?Tr(e.localFace):e?.supportSolid?"profileFeature":e?.sourceSolid?"moveFace":"profile"}function qr(e,t){const n=e?.localFace??e,i=Tr(n);return i==="profileFeature"?Hv(n,t):i==="moveFace"?Dv(n,t):Dr(n,t)}function Wv(e,t,n,i,r){const a=n?.target||new Q,o=t.position.distanceTo(a),s=2*Math.max(1,o)*Math.tan(ii.degToRad(t.fov||36)/2),u=Math.max(1,i().height||1),l=(r-e.clientY)*(s/u);return Math.abs(l)>1e-9?l:l<0?-.1:.1}function wu(e){const t=Array.isArray(e?.points)?e.points:[];return t.length?t.reduce((n,i)=>n.add(new Q(Number(i.x),Number(i.y),Number(i.z)||0)),new Q).multiplyScalar(1/t.length):null}function Cl(e,t){const n=wu(e),i=e?.normal??{x:0,y:0,z:1},r=new Q(Number(i.x),Number(i.y),Number(i.z));if(!n||r.lengthSq()<=1e-12||!Number.isFinite(Number(t?.x))||!Number.isFinite(Number(t?.y))||!Number.isFinite(Number(t?.z)))return null;r.normalize();const a=new Q(Number(t.x),Number(t.y),Number(t.z)).sub(n).dot(r);return Math.abs(a)>1e-9?a:null}function Xv(e,t,n,i,r,a){if(!a||!r?.normal)return null;const o=wu(r),s=new Q(Number(r.normal.x),Number(r.normal.y),Number(r.normal.z));if(!o||s.lengthSq()<=1e-12)return null;s.normalize();const u=t.position.distanceTo(n?.target||o),l=o.clone().addScaledVector(s,Math.max(u*.12,1)),h=o.clone().project(t),d=l.project(t),c=Math.max(1,i().width||1),m=Math.max(1,i().height||1),v=new Ke((d.x-h.x)*c*.5,-(d.y-h.y)*m*.5);v.lengthSq()<64?v.set(0,-1):v.normalize();const p=new Ke(e.clientX-a.x,e.clientY-a.y).dot(v),E=2*Math.max(1,u)*Math.tan(ii.degToRad(t.fov||36)/2)/m,A=p*E;return Math.abs(A)>1e-9?A:A<0?-.1:.1}function Il(e){return Hi(bi(String(e).replace(",",".")))}function Yv(e){const t=e?.userData?.pushStartPointer,n=Number(t?.x),i=Number(t?.y);return Number.isFinite(n)&&Number.isFinite(i)?{x:n,y:i}:null}function $v({camera:e,canvas:t,controls:n,getSelectedFace:i,getObjectSnap:r=null,onObjectSnap:a=null,onStatus:o=null,onConsumeFace:s=null,render:u=null,scene:l,viewport:h}){const d=new Qt;d.name="webcad-3d-push-solids",l.add(d);let c=!1,m=null,v="",y=null,p=0,f=null,E=1,A=null,_=!1,S=null;const b=new Ke,C=new Wi;function x(z){o?.(z)}function R(z){S=z||null,a?.(S)}function U(z){return z?{origin:"Origen",endpoint:"Punto",midpoint:"Punto medio",center:"Centro",faceCenter:"Centro de cara",surface:"Cara"}[z.type]??"Punto":""}function D(z,re){return Cl(z,re?.point)}function B(z){return z===null?null:z<0?z:Math.abs(z)*(E<0?-1:1)}function Z(z){const re=r?.(z,m?.userData?.face)??null,de=D(m?.userData?.face,re);return R(de===null?null:re),de}function k(z){d.children.forEach(re=>Fv(re,z)),u?.()}function I(){y&&(l.remove(y),ct(y),y=null)}function W(z,re){if(!z||!re?.placement)return z;const de=Ir(re.placement);return z.position.set(de.position.x,de.position.y,de.position.z),z.quaternion.set(de.quaternion.x,de.quaternion.y,de.quaternion.z,de.quaternion.w),z.userData.placement=de,z}function L(z){m&&(m.visible=z)}function H(){const z=m?.userData?.face;return z?.sourceSolidGroup??z?.supportSolidGroup??null}function ee(z){const re=H();re&&(re.visible=z)}function fe(z,re,de){const me=qr(z,re);return me?Ci(me,de):null}function ce(z,re,de){const me=qr(z,re);return me?Ci(me,de):null}function pe(z){const re=Hi(z);if(!c||!m?.userData?.face||re===null)return;E=re,I();const de=m.userData.face,me={edgeColor:Ze.edgeColor,edgeLineWidth:Ze.edgeLineWidth,faceColor:Ze.previewFaceColor,name:"webcad-push-preview",renderOrder:24},Ye=Tr(de);if(y=Ye==="moveFace"?fe(de,E,me):Ye==="profileFeature"?ce(de,E,me):Tl(de,E,me),W(y,de),!y){ee(!0),x(!xa(E)&&Ye!=="moveFace"?`Push no valido · espesor minimo 3D: ${or}`:Ye==="moveFace"?`Push no valido · sin material suficiente o espesor inferior a ${or}`:`Push no valido · sin material suficiente (${qt(E)})`),u?.();return}const Fe=Number(y.userData?.solid?.metadata?.lastPushDistance);de.sourceSolid&&Number.isFinite(Fe)&&(E=Fe),ee(!1),y.userData.preview=!0;const et=y.userData?.solid?.metadata?.profileFeatures?.at?.(-1);y.userData.pushThrough=et?.through===!0,l.add(y);const at=y.userData.pushThrough?" · Hueco pasante":"";x(v?`Push: ${v} (${qt(E)})${S?` · OSNAP ${U(S)}`:""}${at}`:`Push: ${qt(E)}${S?` · OSNAP ${U(S)}`:""}${at} · escriba distancia o clic para confirmar`),u?.()}function He(z,re){if(!d.children.length)return null;const de=t.getBoundingClientRect();b.x=(z.clientX-de.left)/Math.max(1,de.width)*2-1,b.y=-((z.clientY-de.top)/Math.max(1,de.height)*2-1),C.setFromCamera(b,e);const Ye=C.intersectObjects(d.children,!0).filter(at=>at?.point&&at?.object?.userData?.type==="webcad-push-solid").map(at=>({hit:at,height:Cl(re,at.point)})).find(at=>at.height!==null);if(!Ye)return null;const{hit:Fe,height:et}=Ye;return{height:et,snap:{type:"surface",point:{x:Fe.point.x,y:Fe.point.y,z:Fe.point.z},documentSolidId:Fe.object?.userData?.documentSolidId??Fe.object?.parent?.userData?.documentSolidId??null}}}function Ge(z,re,de={}){const me=Tl(z,re,{edgeColor:Ze.edgeColor,edgeLineWidth:Ze.edgeLineWidth,faceColor:de.faceColor??Ze.faceColor,name:de.name??`webcad-push-solid-${z?.id??"face"}`,renderOrder:20});return me?(d.add(me),u?.(),me):null}function Ie(z,re){const de=typeof re=="string"?re:re?.id;return!z||!de||(z.userData={...z.userData??{},documentSolidId:de},z.traverse?.(me=>{me.userData={...me.userData??{},documentSolidId:de}})),z}function N(){return c?(c=!1,v="",ee(!0),L(!0),m=null,f=null,A=null,_=!1,R(null),I(),x("Push cancelado"),u?.(),!0):!1}function ne(){if(!c||!m?.userData?.face||Hi(E)===null)return!1;I();const z=m.userData.face;let re=null,de=!1;const me=Tr(z);if(me==="profileFeature"){const Ye=qr(z,E);if(!Ye)return ee(!0),x("Push no valido · no se pudo actualizar el solido soporte"),u?.(),!1;de=Ye.metadata?.profileFeatures?.at?.(-1)?.through===!0;const Fe=H();Fe&&(d.remove(Fe),ct(Fe)),re=Ci(Ye,{edgeColor:Ze.edgeColor,edgeLineWidth:Ze.edgeLineWidth,faceColor:Ze.faceColor,name:`webcad-push-solid-${m.userData.faceId}`,renderOrder:20}),W(re,z),d.add(re)}else if(me==="moveFace"){const Ye=qr(z,E);if(!Ye)return ee(!0),x(`Push no valido · sin material suficiente o espesor inferior a ${or}`),u?.(),!1;E=Number(Ye.metadata?.lastPushDistance)||E;const Fe=H();Fe&&(d.remove(Fe),ct(Fe)),re=Ci(Ye,{edgeColor:Ze.edgeColor,edgeLineWidth:Ze.edgeLineWidth,faceColor:Ze.faceColor,name:`webcad-push-solid-${m.userData.faceId}`,renderOrder:20}),W(re,z),d.add(re)}else if(re=Ge(z,E,{name:`webcad-push-solid-${m.userData.faceId}`}),!re)return ee(!0),x(`Push no valido · espesor minimo 3D: ${or}`),u?.(),!1;return L(!1),s?.(m,re,{height:E,sourceKey:ci(z)}),c=!1,v="",m=null,f=null,A=null,_=!1,R(null),x(de?`Push creado · hueco pasante (${qt(E)})`:`Push creado · altura ${qt(E)}`),u?.(),!0}function ae(){const z=i?.();return z?.userData?.face?(N(),c=!0,m=z,L(!1),v="",E=1,f=Yv(m),p=f?.y??0,t?.focus?.({preventScroll:!0}),ee(!1),pe(E),x("Push activo · mueva el cursor, escriba altura y confirme con clic o Enter"),!0):(x("Seleccione un recinto cerrado antes de usar Push"),!1)}function q(z){if(!c||(p||(p=z.clientY),f||(f={x:z.clientX,y:z.clientY}),A&&Math.hypot(z.clientX-A.x,z.clientY-A.y)>4&&(_=!0),v))return;const re=Z(z);if(re!==null){pe(re);return}const de=He(z,m?.userData?.face);if(de){R(de.snap),pe(de.height);return}pe(Xv(z,e,n,h,m?.userData?.face,f)??Wv(z,e,n,h,p))}function ue(z){c&&(p||(p=z.clientY),f||(f={x:z.clientX,y:z.clientY}),A={x:z.clientX,y:z.clientY},_=!1)}function se(z){if(c){if(z.preventDefault(),z.stopImmediatePropagation(),_){A=null,_=!1;return}if(A=null,!v){const re=Z(z);if(re!==null)pe(re);else{const de=He(z,m?.userData?.face);de&&(R(de.snap),pe(de.height))}}ne()}}function Ee(z){if(c){if(z.key==="Escape"){z.preventDefault(),N();return}if(z.key==="Enter"){z.preventDefault(),ne();return}if(z.key==="Backspace"){z.preventDefault(),v=v.slice(0,-1);const re=v?B(Il(v)):null;re!==null?pe(re):x(v?`Push: ${v}`:"Push: mueva el cursor o escriba altura");return}if(z.key.length===1&&kv.test(z.key)){z.preventDefault(),v+=z.key;const re=B(Il(v));re!==null?pe(re):x(`Push: ${v}`)}}}return t?.addEventListener?.("pointermove",q),t?.addEventListener?.("pointerdown",ue,!0),t?.addEventListener?.("click",se,!0),t?.addEventListener?.("keydown",Ee),{cancel:N,addDocumentSolid(z){if(!z?.solid||z.visible===!1)return null;const re=Ci(z.solid,{edgeColor:Ze.edgeColor,edgeLineWidth:Ze.edgeLineWidth,faceColor:Ze.faceColor,name:`webcad-push-document-${z.id}`,renderOrder:20});return W(re,{placement:z.placement}),Ie(re,z),d.add(re),u?.(),re},addSessionSolid(z,re){return Ge(z,re,{name:`webcad-push-session-${z?.id??"face"}`})},clearSolids(){I(),d.children.slice().forEach(z=>{d.remove(z),ct(z)}),u?.()},setHiddenEdges:k,confirm:ne,dispose(){t?.removeEventListener?.("pointermove",q),t?.removeEventListener?.("pointerdown",ue,!0),t?.removeEventListener?.("click",se,!0),t?.removeEventListener?.("keydown",Ee),N(),l.remove(d),ct(d)},getHeight:()=>E,getSolidObjects:()=>d.children,isActive:()=>c,start:ae,tagDocumentSolidGroup:Ie}}const Pr=1e-9,Ru=10,Kv=10;function ai(e){return new Q(Number(e?.x)||0,Number(e?.y)||0,Number(e?.z)||0)}function Dl(e){const t=r=>[r.x,r.y,r.z].map(a=>Number(a).toFixed(7)).join(":"),n=t(e.start),i=t(e.end);return n<i?`${n}|${i}`:`${i}|${n}`}function qv(e,t,n){const i=new Ke().subVectors(n,t),r=i.lengthSq();if(r<=Pr)return{distance:e.distanceTo(t),parameter:0};const a=ii.clamp(new Ke().subVectors(e,t).dot(i)/r,0,1),o=t.clone().addScaledVector(i,a);return{distance:e.distanceTo(o),parameter:a}}function jv(e,t){if(e?.isOrthographicCamera){const a=new Q;e.getWorldDirection(a).normalize();const o=new Q;e.getWorldPosition(o);const s=Math.max(Pr,t.clone().sub(o).dot(a));return{direction:a,origin:t.clone().addScaledVector(a,-s),targetDistance:s}}const n=new Q;e.getWorldPosition(n);const i=t.clone().sub(n),r=i.length();return r>Pr&&i.multiplyScalar(1/r),{direction:i,origin:n,targetDistance:r}}function Fo(e,t,n,i){const r=jv(n,i);if(r.targetDistance<=Pr)return!0;const a=Math.max(1e-6,r.targetDistance*1e-5);e.set(r.origin,r.direction),e.near=0,e.far=r.targetDistance+a;const o=e.intersectObjects(t,!1)[0];return!o||o.distance>=r.targetDistance-a}function Zv(e){const t=Math.round(Number(e));return Number.isFinite(t)?ii.clamp(t,1,32):Ru}function Jv(e,t,n,i,r,a){if(!e?.isMesh||!t)return{hidden:[],visible:[n]};const o=ai(n.start),s=ai(n.end),u=o.clone().applyMatrix4(e.matrixWorld),l=s.clone().applyMatrix4(e.matrixWorld),h=f=>Fo(r,i,t,u.clone().lerp(l,f)),d=(f,E,A)=>{let _=f,S=E;for(let b=0;b<Kv;b+=1){const C=(_+S)*.5;h(C)===A?_=C:S=C}return(_+S)*.5},c=Array.from({length:a},(f,E)=>{const A=(E+.5)/a;return h(A)}),m={hidden:[],visible:[]};let v=0,y=c[0];const p=f=>{if(f-v<=Pr)return;const E=o.clone().lerp(s,v),A=o.clone().lerp(s,f);m[y?"visible":"hidden"].push({start:{x:E.x,y:E.y,z:E.z},end:{x:A.x,y:A.y,z:A.z}})};for(let f=1;f<c.length;f+=1){if(c[f]===y)continue;const E=d((f-.5)/a,(f+.5)/a,y);p(E),v=E,y=c[f]}return p(1),m}function Ll({camera:e,mesh:t,occluders:n=null,segments:i=[],sourceEdgeIndices:r=[],curveGroupIds:a=[],visibilitySamples:o=Ru}={}){if(!t?.isMesh||!e)return{hidden:[],visible:[]};t.updateWorldMatrix(!0,!1),e.updateWorldMatrix(!0,!1);const s=new Wi,u=(Array.isArray(n)&&n.length?n:[t]).filter(d=>d?.isMesh&&d.visible!==!1),l=Zv(o);u.forEach(d=>d.updateWorldMatrix(!0,!1));const h={hidden:[],visible:[]};return i.forEach((d,c)=>{if(!d?.start||!d?.end)return;const m=Jv(t,e,d,u,s,l);["visible","hidden"].forEach(v=>{m[v].forEach(y=>h[v].push({measurementSegment:d,segment:y,sourceEdgeIndices:r[c]??null,curveGroupId:a[c]??null}))})}),h}function Qv(e,t){const n=e.children?.find(o=>o.userData?.type==="webcad-push-visible-edge-overlay"),i=e.children?.find(o=>o.userData?.type==="webcad-push-solid-edges"),r=e.children?.find(o=>o.userData?.type==="webcad-push-solid-tangent-edges"),a=e.children?.find(o=>o.userData?.type==="webcad-push-generatrix-silhouette");return[t?i:n,r,a?.visible===!1?null:a].filter(Boolean)}function eS(e,t,n,i,r={}){const a=Math.max(1,Number(i?.width)||1),o=Math.max(1,Number(i?.height)||1),s=Math.max(1,Number(r.maxDistancePixels)||5),u=r.includeHidden===!0,l=new Ke((n.x+1)*a*.5,(1-n.y)*o*.5),h=new Q;t.getWorldPosition(h);const d=[];u||(Array.isArray(e)?e:[]).forEach(y=>{y?.traverse?.(p=>{p?.isMesh&&p.visible!==!1&&p.userData?.type==="webcad-push-solid"&&(p.updateWorldMatrix(!0,!1),d.push(p))})});const c=d.length?new Wi:null,m=new Set;let v=null;return(Array.isArray(e)?e:[]).forEach(y=>{Qv(y,u).forEach(p=>{p.updateWorldMatrix(!0,!1);const f=p.userData?.sourceSegments??[],E=p.userData?.measurementSegments??f,A=p.userData?.sourceEdgeIndices??[],_=p.userData?.curveGroupIds??[];f.forEach((S,b)=>{if(!S?.start||!S?.end)return;const C=`${y.userData?.documentSolidId??y.uuid}:${Dl(S)}`;if(m.has(C))return;m.add(C);const x=ai(S.start).applyMatrix4(p.matrixWorld),R=ai(S.end).applyMatrix4(p.matrixWorld),U=x.clone().project(t),D=R.clone().project(t);if(U.z<-1&&D.z<-1||U.z>1&&D.z>1)return;const B=new Ke((U.x+1)*a*.5,(1-U.y)*o*.5),Z=new Ke((D.x+1)*a*.5,(1-D.y)*o*.5),k=qv(l,B,Z);if(k.distance>s)return;const I=x.clone().lerp(R,k.parameter);if(c&&!Fo(c,d,t,I))return;const W=h.distanceTo(I);if(v&&(k.distance>v.screenDistance+.25||Math.abs(k.distance-v.screenDistance)<=.25&&W>=v.cameraDistance))return;const L=_[b]??null,H=L===null?[E[b]??S]:E.filter((ce,pe)=>_[pe]===L&&ce?.start&&ce?.end),ee=[],fe=new Set;H.forEach(ce=>{const pe=ai(ce.start).applyMatrix4(p.matrixWorld),He=ai(ce.end).applyMatrix4(p.matrixWorld),Ge={start:{x:pe.x,y:pe.y,z:pe.z},end:{x:He.x,y:He.y,z:He.z}},Ie=Dl(Ge);fe.has(Ie)||(fe.add(Ie),ee.push(Ge))}),v={cameraDistance:W,curveGroupId:L,documentSolidId:y.userData?.documentSolidId??null,end:{x:R.x,y:R.y,z:R.z},key:L===null?C:`${y.userData?.documentSolidId??y.uuid}:curve:${L}`,length:ee.reduce((ce,pe)=>ce+ai(pe.start).distanceTo(ai(pe.end)),0),screenDistance:k.distance,segments:ee,sourceEdgeIndices:A[b]??null,start:{x:x.x,y:x.y,z:x.z}}})})}),v}const Nl=Math.PI*2,Ya=new WeakMap;function co(e){const t=Number(e?.x),n=Number(e?.y),i=Number(e?.z??0);return Number.isFinite(t)&&Number.isFinite(n)&&Number.isFinite(i)?{x:t,y:n,z:i}:null}function tS(e,t){return{x:(e.x+t.x)*.5,y:(e.y+t.y)*.5,z:(e.z+t.z)*.5}}function $n(e,t,n,i,r,a={}){const o=co(i);if(!o)return;const s=a.analyticCurveId??a.analyticLineId??"",u=`${n}:${s}:${o.x.toFixed(8)}:${o.y.toFixed(8)}:${o.z.toFixed(8)}`;t.has(u)||(t.add(u),e.push({type:n,point:o,documentSolidId:r??null,...a}))}function Ul(e){const t=Number(e)%Nl;return t<0?t+Nl:t}function nS(e,t,n=!0){return Ul(n?t-e:e-t)}function iS(e,t){return e.closed===!0||nS(e.startAngle,t,e.clockwise)<=Number(e.sweep)+1e-8}function rS(e){return{analyticCurve:e,analyticCurveId:e.id,analyticCurveType:e.type}}function aS(e,t,n,i){n.lines.forEach(r=>{const a={analyticLine:r,analyticLineId:r.id};$n(e,t,"endpoint",r.start,i,a),$n(e,t,"endpoint",r.end,i,a),$n(e,t,"midpoint",tS(r.start,r.end),i,a)}),n.curves.forEach(r=>{const a=rS(r);if(!r.closed){$n(e,t,"endpoint",sr(r,r.startAngle),i,a),$n(e,t,"endpoint",sr(r,r.endAngle),i,a);const o=r.clockwise?1:-1;$n(e,t,"midpoint",sr(r,r.startAngle+o*r.sweep*.5),i,a)}$n(e,t,"center",r.center,i,a),[0,Math.PI/2,Math.PI,Math.PI*1.5].filter(o=>iS(r,o)).forEach(o=>$n(e,t,"quadrant",sr(r,o),i,a))})}function Fl(e,t,n,i,r={}){if(n.length<3)return;const a=n.reduce((o,s)=>({x:o.x+s.x,y:o.y+s.y,z:o.z+s.z}),{x:0,y:0,z:0});$n(e,t,"faceCenter",{x:a.x/n.length,y:a.y/n.length,z:a.z/n.length},i,r)}function oS(e,t,n,i,r){const a=Array.isArray(n?.vertices)?n.vertices.map(co):[],o=(n?.metadata?.planarFaceGroups??[]).filter(s=>Array.isArray(s?.outerLoop)&&s.outerLoop.length>=3);if(o.length){o.forEach((s,u)=>Fl(e,t,s.outerLoop.map(co).filter(Boolean),r,{semanticFaceId:s.id??`planar-face-${u}`,semanticFaceKind:s.kind??"planar-face"}));return}(n?.faces||[]).forEach((s,u)=>{if(i.faceSurfaceIds[u])return;const l=(s||[]).map(h=>a[h]).filter(Boolean);Fl(e,t,l,r,{semanticFaceId:`solid-face-${u}`,semanticFaceKind:"planar-face"})})}function sS(e){return Ya.has(e)||Ya.set(e,{edges:Vc(e),topology:wo(e)}),Ya.get(e)}function lS(e,t){const n=[],i=new Set,r=sS(e);return aS(n,i,r.edges,t),oS(n,i,e,r.topology,t),n}function cS(e,t){if(!e)return null;const n=t.localToWorld(new Q(e.center.x,e.center.y,e.center.z)),i=new dt().setFromMatrix4(t.matrixWorld),r=s=>new Q(s.x,s.y,s.z).applyMatrix3(i),a=r(e.uAxis),o=r(e.vAxis);return{...e,center:{x:n.x,y:n.y,z:n.z},uAxis:{x:a.x,y:a.y,z:a.z},vAxis:{x:o.x,y:o.y,z:o.z}}}function uS(e,t){const n=new Q(e.point.x,e.point.y,e.point.z);t.updateWorldMatrix?.(!0,!1);const i=t.localToWorld?.(n)??n;return{...e,analyticCurve:cS(e.analyticCurve,t),localPoint:{...e.point},point:{x:i.x,y:i.y,z:i.z}}}function dS(e,{excludeDocumentSolidIds:t=[],includeWorldOrigin:n=!0}={}){const i=n?[{type:"origin",point:{x:0,y:0,z:0},localPoint:{x:0,y:0,z:0},documentSolidId:null,alwaysVisible:!0}]:[],r=new Set,a=new Set(t);return(e||[]).forEach(o=>{a.has(o?.userData?.documentSolidId)||o?.traverse?.(s=>{if(a.has(s?.userData?.documentSolidId))return;const u=s?.userData?.analyticSolid??s?.userData?.solid;!u||r.has(u)||(r.add(u),i.push(...lS(u,s.userData?.documentSolidId).map(l=>uS(l,s))))})}),i}function jr({camera:e,canvas:t,event:n,solidObjects:i,maxDistancePixels:r=14,acceptCandidate:a=null,excludeDocumentSolidIds:o=[],extraCandidates:s=[],includeHidden:u=!1}={}){if(!e||!t||!n)return null;const l=t.getBoundingClientRect(),h=Math.max(1,l.width),d=Math.max(1,l.height),c=[];u||(i||[]).forEach(y=>{y?.traverse?.(p=>{p?.isMesh&&p.visible!==!1&&p.userData?.type==="webcad-push-solid"&&(p.updateWorldMatrix?.(!0,!1),c.push(p))})});const m=c.length?new Wi:null;let v=null;return[...dS(i,{excludeDocumentSolidIds:o}),...Array.isArray(s)?s:[]].forEach(y=>{if(a&&!a(y))return;const p=new Q(y.point.x,y.point.y,y.point.z).project(e);if(p.z<-1||p.z>1)return;const f=l.left+(p.x+1)*h*.5,E=l.top+(1-p.y)*d*.5,A=Math.hypot(n.clientX-f,n.clientY-E);if(A>r||!y.alwaysVisible&&m&&!Fo(m,c,e,new Q(y.point.x,y.point.y,y.point.z)))return;const _=e.position.distanceTo(new Q(y.point.x,y.point.y,y.point.z)),S=v&&Math.abs(A-v.distancePixels)<=.25;v&&A>v.distancePixels+.25||S&&_>=v.cameraDistance||(v={...y,distancePixels:A,cameraDistance:_})}),v}const Cu=64,fS=8,Ol=16250866,pS=14149887;function Oo(e,t=!0){const n=Number(e?.x),i=Number(e?.y);return!Number.isFinite(n)||!Number.isFinite(i)?null:{x:n,y:t?-i:i,z:0}}function ca(e,t,n){return Math.hypot(e.x-t.x,e.y-t.y)<=n}function Iu(e){let t=0;for(let n=0;n<e.length;n+=1){const i=e[n],r=e[(n+1)%e.length];t+=i.x*r.y-r.x*i.y}return Math.abs(t)*.5}function Du(e){return e.reduce((t,n)=>({minX:Math.min(t.minX,n.x),minY:Math.min(t.minY,n.y),maxX:Math.max(t.maxX,n.x),maxY:Math.max(t.maxY,n.y)}),{minX:1/0,minY:1/0,maxX:-1/0,maxY:-1/0})}function hS(e,t){let n=!1;for(let i=0,r=t.length-1;i<t.length;r=i++){const a=t[i],o=t[r];a.y>e.y!=o.y>e.y&&e.x<(o.x-a.x)*(e.y-a.y)/(o.y-a.y)+a.x&&(n=!n)}return n}function mS(e,t,n){const i=n.x-t.x,r=n.y-t.y,a=i*i+r*r;if(a<=Number.EPSILON)return Math.hypot(e.x-t.x,e.y-t.y);const o=Math.max(0,Math.min(1,((e.x-t.x)*i+(e.y-t.y)*r)/a));return Math.hypot(e.x-(t.x+i*o),e.y-(t.y+r*o))}function gS(e,t,n){return e.points.some(i=>t.points.some((r,a)=>mS(i,r,t.points[(a+1)%t.points.length])<=n))}function _S(e,t,n){if(e===t||e.area<=t.area)return!1;const i=new Set(e.sourceEntities||[e.sourceEntity].filter(Boolean));return(t.sourceEntities||[t.sourceEntity].filter(Boolean)).some(a=>i.has(a))||gS(e,t,n)?!1:t.points.every(a=>hS(a,e.points))}function xS(e,t){const n=new Map;return e.forEach(i=>{const r=e.filter(a=>_S(a,i,t));n.set(i,r.sort((a,o)=>a.area-o.area)[0]||null)}),e.map(i=>{const r=e.filter(s=>n.get(s)===i),a=r.map(s=>s.exactProfile).filter(Boolean),o=i.exactProfile&&a.length?av(i.exactProfile,a,{id:i.id}):i.exactProfile;return{...i,exactProfile:o,holes:r.map(s=>s.points),holeCadProfileVertexIndices:r.map(s=>s.cadProfileVertexIndices||[]),holeSmoothProfileVertexIndices:r.map(s=>s.smoothProfileVertexIndices||[]),area:Math.max(0,i.area-r.reduce((s,u)=>s+u.area,0)),sourceEntities:[...new Set([...i.sourceEntities||[i.sourceEntity],...r.flatMap(s=>s.sourceEntities||[s.sourceEntity])].filter(Boolean))]}}).filter(i=>i.area>0&&i.exactProfile)}function vS(e,t){return`face-${e?.id??e?.handle??`${e?.type??"ENTITY"}-${t}`}`}function SS(e,t){const n=Oo(e?.center,t.invertY),i=Number(e?.radius);if(!n||!Number.isFinite(i)||i<=t.tolerance)return null;const r=Math.max(16,Number(t.circleSegments)||Cu),a=Array.from({length:r},(o,s)=>{const u=Fn*s/r;return{x:n.x+Math.cos(u)*i,y:n.y+(t.invertY?-Math.sin(u):Math.sin(u))*i,z:0}});return{points:a,cadProfileVertexIndices:[],smoothProfileVertexIndices:a.map((o,s)=>s)}}function ES(e,t){const n=ru(e,{...t,curveSegments:Math.max(16,Number(t.ellipseSegments)||Cu)});if(n.length<4)return null;const i=n.slice(0,-1).map(r=>Oo(r,t.invertY));return i.some(r=>!r)?null:{points:i,cadProfileVertexIndices:[],smoothProfileVertexIndices:i.map((r,a)=>a)}}function MS(e,t){if(!Array.isArray(e?.vertices)||e.vertices.length<2)return[];const n=ca(e.vertices[0],e.vertices[e.vertices.length-1],t),i=n?e.vertices.slice(0,-1):e.vertices,r=e.closed||n?i.length:Math.min(e.segments?.length??i.length-1,i.length-1);return Array.from({length:r},(a,o)=>{const s=i[o],u=i[(o+1)%i.length],l=e.segments?.[o]||{type:"LINE"};return!s||!u?null:l.type!=="ARC"||!l.center?{type:"LINE",start:s,end:u,sourceEntity:e}:{type:"ARC",center:l.center,radius:Math.hypot(s.x-l.center.x,s.y-l.center.y),startAngle:Rs(l.center,s),endAngle:Rs(l.center,u),clockwise:l.clockwise!==!1,sourceEntity:e}}).filter(a=>a&&Number.isFinite(a.radius??1))}function yS(e,t){const n=e.flatMap(i=>i?.type==="POLYLINE"?MS(i,t):i?.type==="LINE"||i?.type==="ARC"||i?.type==="CIRCLE"||i?.type==="ELLIPSE"||i?.type==="ELLIPSE_ARC"?[{...i,sourceEntity:i}]:[]);return n.filter(i=>i.type!=="CIRCLE"&&i.type!=="ELLIPSE"?!0:n.some(r=>r!==i&&Hc(i,r,()=>[]).length>0))}function Bl(e,t){return e.type==="LINE"?If(e,t):kc(e)?Df(e,t):Lf(e,t)}function wr(e,t){return e.type==="LINE"?Nf(e,t):kc(e)?Uf(e,Ff(e,t)):Of(e,t)}function zl(e,t,n){const i=t.end.x-t.start.x,r=t.end.y-t.start.y,a=i*i+r*r;if(a<=n*n)return!1;const o=Math.sqrt(a);if(Math.abs((e.x-t.start.x)*r-(e.y-t.start.y)*i)/o>n)return!1;const u=((e.x-t.start.x)*i+(e.y-t.start.y)*r)/a,l=n/o;return u>=-l&&u<=1+l}function bS(e,t,n){if(e?.type!=="LINE"||t?.type!=="LINE")return[];const i=[e.start,e.end,t.start,t.end];return i.filter((r,a)=>zl(r,e,n)&&zl(r,t,n)&&i.findIndex(o=>ca(o,r,n))===a)}function AS(e,t){const i=e.outgoing.filter(o=>o.active).reduce((o,s)=>Math.min(o,Math.hypot(s.to.point.x-e.point.x,s.to.point.y-e.point.y)),1/0),r=Number.isFinite(i)?Math.max(t,i*.25):t,a=o=>{const s=Math.hypot(o.to.point.x-e.point.x,o.to.point.y-e.point.y);if(s<=t)return Math.atan2(o.to.point.y-e.point.y,o.to.point.x-e.point.x);const u=Math.min(.25,r/s),l=o.startParameter+(o.endParameter-o.startParameter)*u,h=wr(o.entity,l)||o.to.point;return Math.atan2(h.y-e.point.y,h.x-e.point.x)};e.outgoing.sort((o,s)=>a(o)-a(s))}function Gl(e,t){const i=(e.endParameter-e.startParameter)*1e-4,r=t?e.endParameter:e.startParameter,a=t?r-i:r+i,o=wr(e.entity,r),s=wr(e.entity,a);if(!o||!s)return null;const u=t?o.x-s.x:s.x-o.x,l=t?o.y-s.y:s.y-o.y,h=Math.hypot(u,l);return h>1e-12?{x:u/h,y:l/h}:null}function TS(e,t){const n=Gl(e,!0),i=Gl(t,!1);if(!n||!i)return!1;const r=n.x*i.x+n.y*i.y,a=n.x*i.y-n.y*i.x;return Math.abs(r)>=1-1e-6&&Math.abs(a)<=.001}function PS(e,t){const n=yS(e,t.tolerance);if(!n.length)return[];const i=new Map(n.map(d=>[d,d.type==="CIRCLE"||d.type==="ELLIPSE"?[0,.25,.5,.75,1]:[0,1]]));for(let d=0;d<n.length;d+=1)for(let c=d+1;c<n.length;c+=1){const m=n[d],v=n[c],y=[...Hc(m,v,()=>[]),...bS(m,v,t.tolerance)];for(const p of y)i.get(m).push(Bl(m,p)),i.get(v).push(Bl(v,p))}const r=[],a=d=>{const c=r.find(v=>ca(v.point,d,t.tolerance));if(c)return c;const m={point:{...d},outgoing:[],id:r.length+1};return r.push(m),m},o=[],s=new Set,u=(d,c,m)=>{const v=wr(d,c),y=wr(d,m);if(!v||!y||ca(v,y,t.tolerance))return;const p=a(v),f=a(y);if(d.type==="LINE"){const _=p.id<f.id?`${p.id}:${f.id}`:`${f.id}:${p.id}`;if(s.has(_))return;s.add(_)}const E={from:p,to:f,entity:d,startParameter:c,endParameter:m,twin:null,active:!0,visited:!1},A={from:f,to:p,entity:d,startParameter:m,endParameter:c,twin:E,active:!0,visited:!1};E.twin=A,p.outgoing.push(E),f.outgoing.push(A),o.push(E,A)};n.forEach(d=>{const c=Pf(i.get(d));for(let m=0;m<c.length-1;m+=1){const v=c[m],y=c[m+1],p=d.type==="CIRCLE"||d.type==="ELLIPSE"?Fn:d.type==="ARC"?wf(d):d.type==="ELLIPSE_ARC"?Rf(d):0,f=Math.max(1,Math.ceil(p*(y-v)/(Math.PI/48)));for(let E=0;E<f;E+=1)u(d,v+(y-v)*E/f,v+(y-v)*(E+1)/f)}});let l=!0;for(;l;)l=!1,r.forEach(d=>{const c=d.outgoing.filter(m=>m.active);c.length===1&&(c[0].active=!1,c[0].twin.active=!1,l=!0)});r.forEach(d=>AS(d,t.tolerance));const h=[];return o.forEach(d=>{if(!d.active||d.visited)return;const c=[];let m=d;for(let S=0;S<=o.length;S+=1){if(!m.active||m.visited&&m!==d)return;m.visited=!0,c.push(m);const b=m.to.outgoing.filter(x=>x.active),C=b.indexOf(m.twin);if(C<0)return;if(m=b[(C-1+b.length)%b.length],m===d)break}if(m!==d)return;const v=c.map(S=>S.from.point);if(v.length<3||Math.abs(Cf(v))<=t.tolerance)return;const y=v.map(S=>Oo(S,t.invertY));if(y.some(S=>!S))return;const p=`face-composite-${h.length}`,f=rv(c.map(S=>({entity:S.entity,startParameter:S.startParameter,endParameter:S.endParameter,startHasSemanticJunction:S.from.outgoing.filter(b=>b.active).length>2,endHasSemanticJunction:S.to.outgoing.filter(b=>b.active).length>2})),{id:p,tolerance:t.tolerance});if(!f||f.orientation.outer!=="ccw")return;const E=c.map((S,b)=>TS(c[(b-1+c.length)%c.length],S)?b:-1).filter(S=>S>=0),A=new Set(E),_=c.map((S,b)=>A.has(b)?-1:b).filter(S=>S>=0);h.push({id:p,sourceEntity:null,sourceEntities:[...new Set(c.map(S=>S.entity.sourceEntity||S.entity))],sourceEntityType:"COMPOSITE",exactProfile:f,points:y,bounds:Du(y),area:Iu(y),cadProfileVertexIndices:_,smoothProfileVertexIndices:E})}),h}function wS(e,t={}){const n={arcChordTolerance:t.arcChordTolerance,circleSegments:t.circleSegments,ellipseSegments:t.ellipseSegments,invertY:t.invertY!==!1,maxArcSegmentAngle:t.maxArcSegmentAngle,maxArcSegments:t.maxArcSegments,tolerance:Number(t.tolerance)||yf},i=Array.isArray(e)?e:[],r=PS(i,n),a=new Set(r.flatMap(s=>s.sourceEntities||[])),o=i.map((s,u)=>{if(a.has(s))return null;const l=s?.type==="CIRCLE"?SS(s,n):s?.type==="ELLIPSE"?ES(s,n):null;if(!l?.points)return null;const{points:h}=l,d=Iu(h);return d<=n.tolerance?null:{id:vS(s,u),sourceEntity:s,sourceEntityType:s.type,exactProfile:mu(s),points:h,bounds:Du(h),area:d,cadProfileVertexIndices:l.cadProfileVertexIndices??[],smoothProfileVertexIndices:l.smoothProfileVertexIndices??[]}}).filter(Boolean);return xS([...o,...r],n.tolerance)}function RS(e){const t=new bf(e.points.map(a=>new Ke(a.x,a.y)));t.holes=(e.holes||[]).map(a=>new Af(a.map(o=>new Ke(o.x,o.y))));const n=new Tf(t),i=new _a({color:Ol,depthTest:!1,depthWrite:!1,opacity:1,side:cn,transparent:!1}),r=new nn(n,i);return r.name=`webcad-simple-face-${e.id}`,r.renderOrder=fS,r.userData={type:"webcad-simple-face",faceId:e.id,face:e,defaultColor:Ol,selectedColor:pS},r}const Rr=Math.PI*2,ki=1e-7,CS=2e-7,bn=1e-12,Vl=16765286,IS=.006,DS=96,Bo=Math.PI/6+1e-5,ua=Symbol("analytic-start-snapped"),da=Symbol("analytic-end-snapped"),ra=new WeakMap,$a=new WeakMap,LS=[new Q(.742,.421,.522).normalize(),new Q(-.311,.817,.486).normalize(),new Q(.537,-.239,.809).normalize()],NS=24,US=25,FS=26;function OS(e,t){if(!e)return null;const n=Ir(t),i=o=>Bf(o,n),{exactProfile:r,...a}=e;return{...a,localFace:e,placement:n,points:(e.points??[]).map(i),holes:(e.holes??[]).map(o=>o.map(i)),normal:Ro(e.normal,n.quaternion),...e.supportLoops?{supportLoops:{outer:(e.supportLoops.outer??[]).map(i),holes:(e.supportLoops.holes??[]).map(o=>o.map(i))}}:{}}}function Lu(e){return{x:-e.quaternion.x,y:-e.quaternion.y,z:-e.quaternion.z,w:e.quaternion.w}}function Hl(e,t){if(!e||typeof e!="object")return e??null;const n=Lu(t),i=a=>Ro(a,n),r=JSON.parse(JSON.stringify(e));return e.origin&&(r.origin=Wc(e.origin,t)),e.normal&&(r.normal=i(e.normal)),e.xAxis&&(r.xAxis=i(e.xAxis)),e.yAxis&&(r.yAxis=i(e.yAxis)),r}function BS(e,t){if(!e)return null;const n=Ir(t),i=l=>Wc(l,n),r=l=>Ro(l,Lu(n)),{localFace:a,placement:o,...s}=e,u=e.exactProfile?JSON.parse(JSON.stringify(e.exactProfile)):null;return u?.plane&&(u.plane=Hl(u.plane,n)),{...s,points:(e.points??[]).map(i),holes:(e.holes??[]).map(l=>l.map(i)),normal:r(e.normal),workplane:Hl(e.workplane,n),...e.supportLoops?{supportLoops:{outer:(e.supportLoops.outer??[]).map(i),holes:(e.supportLoops.holes??[]).map(l=>l.map(i))}}:{},...u?{exactProfile:u}:{}}}function be(e){return new Q(Number(e?.x),Number(e?.y),Number(e?.z)||0)}function kl(e){if(!Array.isArray(e)||e.length<3)return null;const t=be(e[0]);for(let n=1;n<e.length-1;n+=1){const i=be(e[n]).sub(t).cross(be(e[n+1]).sub(t));if(i.lengthSq()>bn)return i.normalize()}return null}function zS(e,t,n=ki){if(!t||!Array.isArray(e)||e.length<3)return!1;const i=be(e[0]);return e.every(r=>Math.abs(be(r).sub(i).dot(t))<=n)}function GS(e){const t=new Qn;e.flat().forEach(i=>t.expandByPoint(be(i)));const n=t.isEmpty()?1:Math.max(1,t.getSize(new Q).length());return Math.max(ki,n*CS)}function Bn(e){const t=Number(e)%Rr;return t<0?t+Rr:t}function li(e,t,n=!0){return Bn(n?t-e:e-t)}function Wl(e,t){return e<t?`${e}:${t}`:`${t}:${e}`}function fa(e){return $a.has(e)||$a.set(e,Vc(e)),$a.get(e)}function pa(e,t,n){const i=be(e).sub(be(t.center)),r=i.dot(be(t.uAxis))/t.radiusX,a=i.dot(be(t.vAxis))/t.radiusY,o=Bn(Math.atan2(a,r));return be(t.center).addScaledVector(be(t.uAxis),Math.cos(o)*t.radiusX).addScaledVector(be(t.vAxis),Math.sin(o)*t.radiusY).distanceTo(be(e))>n?!1:t.closed||li(t.startAngle,o,t.clockwise)<=t.sweep+n}function ur(e,t){const n=be(e).sub(be(t.center));return Bn(Math.atan2(n.dot(be(t.vAxis))/t.radiusY,n.dot(be(t.uAxis))/t.radiusX))}function Nu(e,t){return be(e.center).addScaledVector(be(e.uAxis),Math.cos(t)*e.radiusX).addScaledVector(be(e.vAxis),Math.sin(t)*e.radiusY)}function Uu(e,t){return Math.abs(Math.atan2(Math.sin(e-t),Math.cos(e-t)))}function VS(e,t,n){const i=Xc(e),r=new Map(i.map((a,o)=>[a.id,{index:o,surface:a}]));return t.map(a=>{const o=r.get(a.sideSurfaceId);if(!o||o.index<=0)return a;const s=be(o.surface.center);return i.slice(0,o.index).flatMap(l=>{if(be(l.center).add(be(l.offset)).distanceTo(s)>n||l.type!==a.type||l.sweep<=a.sweep+1e-5||Math.abs(l.radiusX-a.radiusX)>n||Math.abs(l.radiusY-a.radiusY)>n||Math.abs(be(l.uAxis).normalize().dot(be(a.uAxis).normalize()))<1-1e-4||Math.abs(be(l.vAxis).normalize().dot(be(a.vAxis).normalize()))<1-1e-4)return[];const d={...a,uAxis:l.uAxis,vAxis:l.vAxis,radiusX:l.radiusX,radiusY:l.radiusY,startAngle:l.startAngle,endAngle:l.endAngle,clockwise:l.clockwise,closed:l.closed,sweep:l.sweep},c=a.clockwise?1:-1;return[0,.5,1].every(v=>pa(Nu(a,a.startAngle+c*a.sweep*v),d,n))?[d]:[]}).sort((l,h)=>l.sweep-h.sweep)[0]??a})}function Xl(e,t,n){if(!n||t.closed)return{point:e,snapped:!1};const i=ur(e,t),r=[t.startAngle,t.endAngle].map(o=>({boundary:o,distance:Uu(i,o)})).sort((o,s)=>o.distance-s.distance);if(r[0].distance>Bo)return{point:e,snapped:!1};const a=Nu(t,r[0].boundary);return{point:{x:a.x,y:a.y,z:a.z},snapped:r[0].distance>1e-8}}function Zr(e,t){const n=new Q;return e.forEach((i,r)=>{n.add(be(i).cross(be(e[(r+1)%e.length])))}),n.dot(t)*.5}function HS(e,t=64){const n=e.clockwise?1:-1;return Array.from({length:t},(i,r)=>{const a=e.startAngle+n*Rr*r/t;return be(e.center).addScaledVector(be(e.uAxis),Math.cos(a)*e.radiusX).addScaledVector(be(e.vAxis),Math.sin(a)*e.radiusY)}).map(i=>({x:i.x,y:i.y,z:i.z}))}function kS(e,t,n,i){if(!n.length||t.length<3)return n;const r=ei(e),a=be(t[0]),o=new Set(n.map((u,l)=>l)),s=[];return fa(e).curves.filter(u=>u.closed).forEach(u=>{const l=be(u.uAxis).normalize(),h=be(u.vAxis).normalize(),d=l.clone().cross(h).normalize(),c=be(u.center);if(Math.abs(d.dot(i))<1-1e-4||Math.abs(c.clone().sub(a).dot(i))>r)return;const m=r/Math.max(Math.min(u.radiusX,u.radiusY),r),v=[...o].filter(E=>{const A=n[E].map(_=>{const S=be(_).sub(c);return{planeError:Math.abs(S.dot(d)),radius:Math.hypot(S.dot(l)/u.radiusX,S.dot(h)/u.radiusY)}});return A.every(_=>_.planeError<=r*2&&_.radius<=1+m*2)&&A.filter(_=>Math.abs(_.radius-1)<=m*2).length>=2});if(!v.length)return;v.forEach(E=>o.delete(E));const y=v.map(E=>n[E]).sort((E,A)=>Math.abs(Zr(A,i))-Math.abs(Zr(E,i)))[0],p=Math.sign(Zr(y,i)),f=HS(u);p&&Math.sign(Zr(f,i))!==p&&f.reverse(),s.push(f)}),o.forEach(u=>s.push(n[u])),s}function ha(e,t,n){const i=be(t.start),a=be(t.end).clone().sub(i),o=a.lengthSq();if(o<=bn)return!1;const s=be(e).sub(i).dot(a)/o;return s<-n||s>1+n?!1:i.addScaledVector(a,Math.max(0,Math.min(1,s))).distanceTo(be(e))<=n}function WS(e,t){const n=fa(e),i=ei(e);return[t.group.outerLoop,...t.group.innerLoops??[]].flat().every(r=>n.curves.some(a=>pa(r,a,i))||n.lines.some(a=>ha(r,a,i)))}function Fu(e,t){if(t?.coordinateSystem==="sketch-plane-v1"){const o=en(e,t);return{x:o.x,y:o.y,planeDistance:Math.abs(o.z)}}const n=be(e).sub(be(t?.origin)),i=be(t?.xAxis).normalize(),r=be(t?.yAxis).normalize(),a=be(t?.normal).normalize();return{x:n.dot(i),y:-n.dot(r),planeDistance:Math.abs(n.dot(a))}}function Ka(e,t,n,i){const r=Fu(e,n);if(r.planeDistance>i)return!1;if(t?.type==="line")return ha(r,{start:t.start,end:t.end},i);const a=t?.type==="circle"||t?.type==="arc-circle",o=t?.type==="ellipse"||t?.type==="arc-ellipse";if(!a&&!o)return!1;const s=Number(a?t.radius:t.radiusX),u=Number(a?t.radius:t.radiusY);if(!(s>0)||!(u>0))return!1;const l=Number(t.rotation)||0,h=r.x-Number(t.center?.x),d=r.y-Number(t.center?.y),c=h*Math.cos(l)+d*Math.sin(l),m=-h*Math.sin(l)+d*Math.cos(l),v=Math.hypot(c/s,m/u);if(Math.abs(v-1)*Math.max(s,u)>i)return!1;if(t.type==="circle"||t.type==="ellipse")return!0;const y=Bn(Math.atan2(m/u,c/s)),p=Bn(t.startAngle),f=Bn(t.endAngle);return li(p,y,t.clockwise!==!1)<=li(p,f,t.clockwise!==!1)+i/Math.max(s,u)}function XS(e,t,n,i,r){if(n?.type==="line"){const o={x:(e.x+t.x)*.5,y:(e.y+t.y)*.5,z:(e.z+t.z)*.5};return[e,o,t].every(s=>Ka(s,n,i,r))}if(!Ka(e,n,i,r)||!Ka(t,n,i,r))return!1;const a=o=>{const s=Fu(o,i),u=Number(n.rotation)||0,l=s.x-Number(n.center?.x),h=s.y-Number(n.center?.y);return Math.atan2(-l*Math.sin(u)+h*Math.cos(u),l*Math.cos(u)+h*Math.sin(u))};return Uu(a(e),a(t))<=Math.PI/3}function YS(e,t,n){const i=t?.group?.exactProfile,r=[n?.group?.outerLoop,...n?.group?.innerLoops??[]].filter(l=>Array.isArray(l)&&l.length>=3),a=[i?.outerLoop,...i?.innerLoops??[]].filter(l=>Array.isArray(l?.segments)&&l.segments.length);if(!i?.plane||r.length!==a.length)return!1;const o=ei(e)*2,s=(l,h)=>l.every((d,c)=>h.segments.some(m=>XS(d,l[(c+1)%l.length],m,i.plane,o))),u=new Set(a.map((l,h)=>h));return r.every(l=>{const h=[...u].find(d=>s(l,a[d]));return h===void 0?!1:(u.delete(h),!0)})}function $S(e,t,n){let i=-1,r=n;return t.vertices.forEach((a,o)=>{const s=be(a).distanceTo(be(e));s>r||(i=o,r=s)}),i}function Sn(e,t){const n=Hf(e,t);return{x:n.x,y:n.y,z:0}}function In(e,t){return be(Po(e,t))}function KS(e,t){const n=be(e);return{x:n.dot(be(t.xAxis).normalize()),y:-n.dot(be(t.yAxis).normalize())}}function qS(e,t,n,i,r){const a=en(e,i),o=en(t,i),s=en(n,i);if(!(r>0))return null;const u=2*(a.x*(o.y-s.y)+o.x*(s.y-a.y)+s.x*(a.y-o.y));if(Math.abs(u)<=r*r*1e-10)return null;const l=a.x*a.x+a.y*a.y,h=o.x*o.x+o.y*o.y,d=s.x*s.x+s.y*s.y,c={x:(l*(o.y-s.y)+h*(s.y-a.y)+d*(a.y-o.y))/u,y:(l*(s.x-o.x)+h*(a.x-s.x)+d*(o.x-a.x))/u,z:0};return Math.abs(Math.hypot(a.x-c.x,a.y-c.y)-r)>Math.max(1e-5,r*5e-4)?null:yr(c,i)}function jS(e,t,n,i,r){const a=Sn(e.center,r),o=e.type==="arc-circle"?qS(t,n,i,r,e.radiusX):null,s=o?Sn(o,r):null,u=s&&Math.hypot(s.x-a.x,s.y-a.y)>Math.max(1e-4,e.radiusX*.001)?s:a,l=KS(e.uAxis,r),h=Math.atan2(l.y,l.x),d=Math.cos(h),c=Math.sin(h),m=k=>{const I=k.x-u.x,W=k.y-u.y;return Bn(Math.atan2((-I*c+W*d)/e.radiusY,(I*d+W*c)/e.radiusX))},v=m(Sn(t,r)),y=m(Sn(n,r)),p=m(Sn(i,r)),f=e.closed?Rr:e.sweep,E=li(v,y,!0),A=li(v,y,!1),_=li(v,p,!0)<=E+1e-6,S=li(v,p,!1)<=A+1e-6,b=_!==S?_:Math.abs(E-f)<=Math.abs(A-f),C=b?E:A,x=f-C,R=!e.closed&&C>=f*.75&&x>=-1e-5&&x<=Bo,U=Xl(t,e,R),D=Xl(n,e,R),B=m(Sn(U.point,r)),Z=m(Sn(D.point,r));if(e.type==="arc-circle"){const k={type:"ARC",center:u,radius:e.radiusX,startAngle:B,endAngle:Z,clockwise:b,analyticSource:e.analyticSource??null,analyticOwnerRegionId:e.ownerRegionId??null};return k[ua]=U.snapped,k[da]=D.snapped,k}if(e.type==="arc-ellipse"){const k={type:"ELLIPSE_ARC",center:u,radiusX:e.radiusX,radiusY:e.radiusY,rotation:h,startParameter:B,endParameter:Z,clockwise:b,analyticSource:e.analyticSource??null,analyticOwnerRegionId:e.ownerRegionId??null};return k[ua]=U.snapped,k[da]=D.snapped,k}return null}function Yl(e,t=!1){if(e.type==="LINE")return{...t?e.end:e.start};const n=t?e.type==="ARC"?e.endAngle:e.endParameter:e.type==="ARC"?e.startAngle:e.startParameter,i=e.type==="ARC"?e.radius:e.radiusX,r=e.type==="ARC"?e.radius:e.radiusY,a=e.type==="ARC"?0:e.rotation,o=Math.cos(n)*i,s=Math.sin(n)*r;return{x:e.center.x+o*Math.cos(a)-s*Math.sin(a),y:e.center.y+o*Math.sin(a)+s*Math.cos(a),z:0}}function ZS(e,t){e.forEach((n,i)=>{const r=e[(i+1)%e.length];if(n.type==="LINE"&&r.type!=="LINE"){const a=Yl(r);(r[ua]||be(n.end).distanceTo(be(a))<=t)&&(n.end=a)}if(n.type!=="LINE"&&r.type==="LINE"){const a=Yl(n,!0);(n[da]||be(r.start).distanceTo(be(a))<=t)&&(r.start=a)}}),e.forEach(n=>{delete n[ua],delete n[da]})}function JS(e,t,n,i,r){const a=[];let o=t,s=null;for(let u=0;u<n;u+=1){const l=(t+u)%e.length,h=(l+1)%e.length,d=be(e[h]).sub(be(e[l]));if(d.lengthSq()<=r*r)continue;d.normalize(),!(s&&s.dot(d)>=1-1e-6)&&s&&(a.push({type:"LINE",start:Sn(e[o],i),end:Sn(e[l],i)}),o=l),s=d}return s&&a.push({type:"LINE",start:Sn(e[o],i),end:Sn(e[(t+n)%e.length],i)}),a}function QS(e,t){const n=new Set([t?.parentRegionId,...t?.subdivisionRegionIds??[]].filter(Boolean));if(!n.size)return{curves:[],lines:[]};const i=[],r=[];return(e?.metadata?.profileFeatures??[]).forEach(a=>{if(!n.has(a?.analyticRegionId)||!a?.exactProfile?.plane)return;const o=a.exactProfile,u=a.analyticRegionId===t.parentRegionId&&t.capIndex===1?{...o.plane,origin:{x:o.plane.origin.x+o.plane.normal.x*a.distance,y:o.plane.origin.y+o.plane.normal.y*a.distance,z:o.plane.origin.z+o.plane.normal.z*a.distance}}:o.plane;[o.outerLoop,...o.innerLoops??[]].forEach(l=>(l?.segments??[]).forEach(h=>{const d=h?.source;if(!d?.role||!n.has(d.regionId)||d.role==="profile-boundary"&&d.regionId!==t.parentRegionId||d.role==="divider"&&!t.subdivisionRegionIds?.includes(d.regionId))return;if(h.type==="line"){r.push({start:In(h.start,u),end:In(h.end,u),analyticSource:JSON.parse(JSON.stringify(d)),ownerRegionId:d.regionId??a.analyticRegionId??null});return}const c=["circle","arc-circle"].includes(h.type),m=["ellipse","arc-ellipse","ellipse-arc"].includes(h.type);if(!c&&!m)return;const v=In(h.center,u),y=Number(h.rotation)||0,p=In({x:h.center.x+Math.cos(y),y:h.center.y+Math.sin(y),z:0},u),f=In({x:h.center.x-Math.sin(y),y:h.center.y+Math.cos(y),z:0},u),E=h.type==="circle"||h.type==="ellipse",A=E?0:Number(h.startAngle),_=E?0:Number(h.endAngle),S=h.clockwise!==!1;i.push({type:c?"arc-circle":"arc-ellipse",center:{x:v.x,y:v.y,z:v.z},uAxis:p.sub(v).normalize(),vAxis:f.sub(v).normalize(),radiusX:Number(c?h.radius:h.radiusX),radiusY:Number(c?h.radius:h.radiusY),startAngle:A,endAngle:_,clockwise:S,closed:E,sweep:E?Rr:li(A,_,S),analyticSource:JSON.parse(JSON.stringify(d)),ownerRegionId:d.regionId??a.analyticRegionId??null,sourceEdgeIndices:[]})}))}),{curves:i,lines:r}}function $l(e,t,n,i,r,a={curves:[],lines:[]}){if(t.length<3)return null;const o=t.map(f=>$S(f,e,i));if(o.some(f=>f<0))return null;const s=VS(e,[...a.curves,...fa(e).curves],i),u=s.map(f=>new Set(f.sourceEdgeIndices.map(E=>Wl(E[0],E[1])))),l=t.map((f,E)=>{const A=Wl(o[E],o[(E+1)%t.length]),_=u.findIndex(x=>x.has(A));if(_>=0)return _;const S=t[E],b=t[(E+1)%t.length],C=s.findIndex(x=>pa(S,x,i)&&pa(b,x,i)&&Math.abs(Math.atan2(Math.sin(ur(b,x)-ur(S,x)),Math.cos(ur(b,x)-ur(S,x))))<=Math.PI/4);return C>=0?C:null}),h=l.findIndex((f,E)=>f!==l[(E-1+l.length)%l.length]);if(h<0)return null;const d=[];for(let f=0;f<l.length;){const E=(h+f)%l.length,A=l[E];let _=1;for(;_<l.length-f&&l[(E+_)%l.length]===A;)_+=1;const S=(E+_)%t.length,b=A===null?null:jS(s[A],t[E],t[S],t[(E+Math.floor(_/2))%t.length],n);b?d.push(b):d.push(...JS(t,E,_,n,i)),f+=_}const c=[...a.lines,...fa(e).lines];d.forEach(f=>{if(f.type!=="LINE")return;const E=In(f.start,n),A=In(f.end,n),_=c.find(S=>ha(E,S,i)&&ha(A,S,i));f.analyticSource=_?.analyticSource??{role:"divider"},f.analyticOwnerRegionId=_?.ownerRegionId??null}),ZS(d,i);const m=tv(d,{id:r,plane:n});if(!m)return null;m.outerLoop.segments.forEach((f,E)=>{f.source=JSON.parse(JSON.stringify(d[E]?.analyticSource??{role:"unavailable"}))});const v=new Set(d.map(f=>f.analyticOwnerRegionId).filter(Boolean));v.size===1&&(m.analyticRegionId=[...v][0]);const y=t.flatMap((f,E)=>{const A=l[E],_=l[(E-1+l.length)%l.length];return Number.isInteger(A)&&A===_?[E]:[]}),p=new Set(y);return{exactProfile:{...m,plane:n},cadProfileVertexIndices:t.flatMap((f,E)=>p.has(E)?[]:[E]),smoothProfileVertexIndices:y}}function eE(e,t,n,i,r,a=null){if(t.length<3||n.some(d=>d.length<3))return null;const o=va({points:t,normal:i});if(!o)return null;const s=ei(e),u=QS(e,a),l=$l(e,t,o,s,r,u);if(!l)return null;const h=n.map((d,c)=>$l(e,d,o,s,`${r}-hole-${c}`,u));return h.some(d=>!d)?null:{...l,exactProfile:{...l.exactProfile,innerLoops:h.map(d=>d.exactProfile.outerLoop)},holeCadProfileVertexIndices:h.map(d=>d.cadProfileVertexIndices),holeSmoothProfileVertexIndices:h.map(d=>d.smoothProfileVertexIndices)}}function tE(e,t,n){const i=t?.exactProfile,r=t?.cadProfileVertexIndices??[];if(!i?.plane||!r.length)return e;const a=i.outerLoop?.segments??[],o=[];if(a.forEach(d=>{[d?.start,d?.end].filter(Boolean).forEach(c=>{const m=In(c,i.plane);o.some(v=>v.distanceTo(m)<=n)||o.push(m)})}),!o.length)return e;const s=a.reduce((d,c)=>Math.max(d,Number(c?.radius)||0,Number(c?.radiusX)||0,Number(c?.radiusY)||0),0),u=Math.max(n,s*2*Math.sin(Bo/2)+n),l=e.map(d=>({...d})),h=new Set(r);return o.forEach(d=>{let c=-1,m=u;h.forEach(v=>{const y=be(l[v]).distanceTo(d);y>m||(c=v,m=y)}),!(c<0)&&(l[c]={x:d.x,y:d.y,z:d.z},h.delete(c))}),l}function uo(e){return e.reduce((t,n)=>t.add(be(n)),new Q).multiplyScalar(1/Math.max(1,e.length))}function Kl(e,t,n){const i=uo(n.vertices),r=uo(t);return e.dot(r.sub(i))<0?e.clone().multiplyScalar(-1):e}function nE(e,t,n){if(!Array.isArray(t)||t.length<3)return null;for(const i of Xc(e)){const r=be(i.offset);if(r.lengthSq()<=bn)continue;const a=Gf(e,i),o=r.length(),s=t.map(d=>Vf(d,i)),u=s.every(d=>Math.abs(d.axial)<=a),l=s.every(d=>Math.abs(d.axial-o)<=a);if(!u&&!l||s.some(d=>d.planeError>a||d.radialError>a))continue;const h=be(i.vAxis).cross(be(i.uAxis));if(!(h.lengthSq()<=bn))return h.normalize(),h.dot(n)<0&&h.multiplyScalar(-1),h}return null}function iE(e){const t=new Qn;return(e?.vertices??[]).forEach(n=>t.expandByPoint(be(n))),t.isEmpty()?1:Math.max(1,t.getSize(new Q).length())}function rE(e,t,n,i){const r=new Uc(e,t),a=new Q,o=[];return(n?.faces??[]).forEach(s=>{if(!Array.isArray(s)||s.length<3)return;const u=be(n.vertices[s[0]]);for(let l=1;l<s.length-1;l+=1){const h=be(n.vertices[s[l]]),d=be(n.vertices[s[l+1]]);if(!r.intersectTriangle(u,h,d,!1,a))continue;const c=a.clone().sub(e).dot(t);c>i&&o.push(c)}}),o.sort((s,u)=>s-u),o.filter((s,u)=>u===0||Math.abs(s-o[u-1])>i*4).length}function ql(e,t,n){return LS.reduce((r,a)=>r+rE(e,a,t,n)%2,0)>=2}function aE(e,t,n){const i=t.map(u=>n.vertices[u]).filter(Boolean);if(i.length<3)return null;const r=uo(i),a=iE(n)*1e-7,o=ql(r.clone().addScaledVector(e,a*8),n,a),s=ql(r.clone().addScaledVector(e,-a*8),n,a);return o===s?null:o?-1:1}function oE(e,t,n,i){const r=e?.normal?be(e.normal):null,a=r&&r.lengthSq()>bn?r.normalize():kl(n);if(a){const s=e?.analyticAxis?be(e.analyticAxis):null,l=(s&&s.lengthSq()>bn?s.normalize():nE(i,n,a))??a;l.dot(a)<0&&l.multiplyScalar(-1);const h=aE(l,t,i);return h?l.multiplyScalar(h):Kl(l,n,i)}const o=kl(n);return o?Kl(o,n,i):null}function sE(e){const t=Number(e?.metadata?.profileSize);if(Number.isInteger(t)&&t>=3&&e.vertices?.length===t*2)return t;const n=e?.faces?.[0]?.length,i=e?.faces?.[1]?.length;return!Number.isInteger(n)||n<3||n!==i||e.vertices.length!==n*2?null:n}function lE(e,t){return e>=t?e-t:e}function cE(e,t){const n=e?.faces?.[t],i=sE(e);if(!i||!Array.isArray(n)||n.length!==4||t<2)return!1;const r=new Set(Array.isArray(e?.metadata?.smoothVerticalEdgeIndices)?e.metadata.smoothVerticalEdgeIndices:Array.isArray(e?.metadata?.smoothProfileVertexIndices)?e.metadata.smoothProfileVertexIndices:[]);return r.size?n.some(a=>r.has(lE(a,i))):!1}function jl(e,t){const n={x:Math.abs(t.x),y:Math.abs(t.y),z:Math.abs(t.z)};return n.z>=n.x&&n.z>=n.y?new Ke(e.x,e.y):n.x>=n.y?new Ke(e.y,e.z):new Ke(e.x,e.z)}function uE(e,t,n=[]){const i=e.map(o=>jl(o,t)),r=n.map(o=>o.map(s=>jl(s,t))),a=To.triangulateShape(i,r);return a.length?a.flat():e.slice(1,-1).flatMap((o,s)=>[0,s+1,s+2])}function dE(e,t){const n=e?.metadata?.capFaceGroups;return n?n.lower?.includes(t)?{indices:n.lower,upper:!1}:n.upper?.includes(t)?{indices:n.upper,upper:!0}:null:null}function fE(e,t){const n=Number(e?.metadata?.profileSize),i=e?.metadata?.profileLoopSizes;if(!Number.isInteger(n)||!Array.isArray(i)||i.reduce((o,s)=>o+s,0)!==n)return null;const r=[];let a=t?n:0;return i.forEach(o=>{r.push(e.vertices.slice(a,a+o)),a+=o}),r}function pE(e,t){const n=(e?.metadata?.planarFaceGroups??[]).findIndex(i=>Array.isArray(i?.indices)&&i.indices.includes(t));return n>=0?{group:e.metadata.planarFaceGroups[n],index:n}:null}function Ou(e,t){return ra.has(e)||ra.set(e,wo(e)),ra.get(e).semanticPlanarFaces.filter(i=>i.indices.includes(t)).map(i=>({group:i,index:i.id,semantic:!0}))}function Bu(e,t){const n=Ou(e,t);if(n.length===1)return n[0];const i=n.filter(u=>u.group.kind==="analytic-residual-cap");if(i.length===1)return i[0];const r=n.filter(u=>u.group.exactProfile),a=Math.max(...r.map(u=>Number(u.group.profileIndex))),o=r.filter(u=>Number(u.group.profileIndex)===a);if(o.length===1)return o[0];const s=n.filter(u=>u.group.kind==="analytic-residual-parent");return s.length===1?s[0]:null}function hE(e,t,n){if(!n||n.semantic)return n;const i=Bu(e,t);if(!i?.group?.normal||!n.group?.normal)return n;const r=be(i?.group?.normal),a=be(n.group?.normal);if(r.lengthSq()<=bn||a.lengthSq()<=bn)return n;r.normalize(),a.normalize();const o=r.dot(a);return Math.abs(o)<1-1e-4?n:(o<0&&r.multiplyScalar(-1),{...n,group:{...n.group,normal:{x:r.x,y:r.y,z:r.z}}})}function mE(e,t){const n=Bu(e,t),i=pE(e,t);if(!n||!i)return n??i;if(i.group.indices&&Array.isArray(i.group.indices)&&i.group.indices.includes(t)){const r=e.metadata?.surfaceFaceIds?.[t];if(r!=null){const a=i.group.indices.every(s=>e.metadata?.surfaceFaceIds?.[s]===r),o=n.group.indices.every(s=>e.metadata?.surfaceFaceIds?.[s]===r);if(a&&o&&i.group.indices.length>n.group.indices.length&&n.group.indices.every(s=>i.group.indices.includes(s)))return i}}return n.group.kind==="analytic-residual-parent"||n.group.kind==="analytic-residual-cap"?n:(i.group.smoothProfileVertexIndices?.length??0)>0&&!(n.group.smoothProfileVertexIndices?.length??0)?i:YS(e,n,i)||i.group.indices?.length===1&&n.group.indices?.length>1&&WS(e,n)?n:i}function Zl(e){const t=e.map(i=>{const r=i?.source??{},a=r.sourceBoundaryId??r.dividerId??"",o=r.orientation===-1?-1:1,s=["arc-circle","arc-ellipse"].includes(i?.type)?`:${Bn(i.startAngle)}:${Bn(i.endAngle)}:${i.clockwise!==!1}`:"";return`${i?.type??"unknown"}:${r.role??"unavailable"}:${a}:${o}${s}`});if(!t.length)return"";const n=[];return t.forEach((i,r)=>{n.push([...t.slice(r),...t.slice(0,r)].join("|"))}),n.sort()[0]}function fo(e){const t=Zl(e?.outerLoop?.segments??[]),n=(e?.innerLoops??[]).map(i=>Zl(i?.segments??[])).sort();return JSON.stringify({outer:t,inner:n})}function gE(e){let t=0xcbf29ce484222325n;for(let n=0;n<e.length;n+=1)t^=BigInt(e.charCodeAt(n)),t=BigInt.asUintN(64,t*0x100000001b3n);return t.toString(16).padStart(16,"0")}function _E(e,t,n){if(!t?.group||!n?.exactProfile||t.semantic&&t.group.kind!=="analytic-residual-parent")return null;const i=zf(n.exactProfile),a=[i.outerLoop,...i.innerLoops??[]].flatMap(_=>_?.segments??[]),o=new Set(a.flatMap(_=>{const S=_?.source;return S?.role==="profile-boundary"&&S.regionId&&S.sourceBoundaryId?[S.regionId]:[]})),s=t.group.parentRegionId??(o.size===1?[...o][0]:null);if(!s||o.size&&(o.size!==1||!o.has(s)))return null;const u=(e?.metadata?.profileFeatures??[]).flatMap((_,S)=>_?.analyticRegionId===s?[{feature:_,featureIndex:S}]:[]);if(u.length!==1)return null;const l=[...new Set(a.flatMap(_=>_?.source?.role==="divider"&&_.source.regionId?[_.source.regionId]:[]))],h=t.group.subdivisionRegionIds?.length?t.group.subdivisionRegionIds:l,d=(e?.metadata?.profileFeatures??[]).filter(_=>h.includes(_?.analyticRegionId)).flatMap(_=>[_.exactProfile?.outerLoop,..._.exactProfile?.innerLoops??[]].flatMap(S=>S?.segments??[])).filter(_=>_?.source?.role==="divider"&&_.source.dividerId),c=new Map(d.map(_=>[_.source.dividerId,_]));if(c.size===1){const _=[...c.values()][0];a.forEach(S=>{if(S?.source?.role!=="divider"||S.source.dividerId||S.type!=="line"||_.type!=="line")return;const b=be(yr(S.end,i.plane)).sub(be(yr(S.start,i.plane))).normalize(),x=(e.metadata.profileFeatures??[]).find(U=>h.includes(U?.analyticRegionId)&&[U.exactProfile?.outerLoop,...U.exactProfile?.innerLoops??[]].some(D=>D?.segments?.includes(_)))?.exactProfile?.plane,R=x?In(_.end,x).sub(In(_.start,x)).normalize():null;!R||Math.abs(b.dot(R))<1-1e-4||(S.source={...JSON.parse(JSON.stringify(_.source)),orientation:(_.source.orientation??1)*(b.dot(R)>=0?1:-1)})})}const m=new Set(a.flatMap(_=>{const S=_?.source;return S?.role==="profile-boundary"&&S.regionId===s&&S.sourceBoundaryId?[S.sourceBoundaryId]:[]})),v=new Set(a.flatMap(_=>{const S=_?.source;return S?.role==="divider"&&S.dividerId?[S.dividerId]:[]})),y=a.some(_=>_?.source?.role==="divider"&&!_.source.dividerId);if(!m.size||!v.size||y)return null;const p=fo(i);if(!p)return null;const f=`analytic-region-residual-${gE(`${s}:${p}`)}`;i.analyticRegionId=f;const E={...t.group,id:`analytic-residual-${f}`,kind:"analytic-residual-cap",exactProfile:i,regionId:f,normal:{...i.plane.normal},analyticAxis:{...i.plane.normal},parentRegionId:s,creatorFeatureIndex:u[0].featureIndex,creatorOperationType:u[0].feature.type??null,subdivisionRegionIds:h,cadProfileVertexIndices:n.cadProfileVertexIndices??[],smoothProfileVertexIndices:n.smoothProfileVertexIndices??[],holeCadProfileVertexIndices:n.holeCadProfileVertexIndices??[],holeSmoothProfileVertexIndices:n.holeSmoothProfileVertexIndices??[]},A=ra.get(e);if(A){const _=A.semanticPlanarFaces.findIndex(S=>S.id===t.group.id);_>=0?A.semanticPlanarFaces[_]=E:A.semanticPlanarFaces.some(S=>S.regionId===f)||A.semanticPlanarFaces.push(E)}return{group:E,index:E.id,semantic:!0}}function xE(e,t,n){const i=n?.exactProfile;if(!i)return null;const r=Ou(e,t).filter(o=>o.group.exactProfile),a=i.analyticRegionId?r.filter(o=>o.group.regionId===i.analyticRegionId):r.filter(o=>fo(o.group.exactProfile)===fo(i));return a.length===1?a[0]:null}function vE(e,t){if(Array.isArray(e?.metadata?.curvedSideFaceIndices)&&e.metadata.curvedSideFaceIndices.includes(t))return!0;const n=e?.metadata?.faceVertexNormals?.[t];if(e?.metadata?.type!=="profileFeature"&&!Array.isArray(e?.metadata?.profileFeatures)||!Array.isArray(n)||n.length<2)return!1;const i=be(n[0]);return n.slice(1).some(r=>i.distanceTo(be(r))>ki)}function SE(e,t){return!e||!t||e.vertices?.length!==t.vertices?.length||e.faces?.length!==t.faces?.length?!1:e.faces.every((n,i)=>{const r=t.faces[i];return Array.isArray(r)&&n.length===r.length&&n.every((a,o)=>a===r[o])})}function zo(e,t,n=null){if(e?.userData?.type!=="webcad-push-solid")return null;const i=e.userData.solid,r=i?.faces?.[t];if(!Array.isArray(r)||r.length<3||!Array.isArray(i?.vertices))return null;const a=n??mE(i,t),o=hE(i,t,a);if(!o&&(cE(i,t)||vE(i,t)))return null;const s=o?.group??null,u=dE(i,t),l=s?[s.outerLoop,...s.innerLoops??[]]:u?fE(i,u.upper):null,h=l?.[0]||r.map(k=>i.vertices[k]).filter(Boolean),d=l?.slice(1)||[],c=oE(s,r,h,i),m=c&&s?kS(i,h,d,c):d,v=m.map(k=>{const I=d.indexOf(k);return I>=0?s?.holeCadProfileVertexIndices?.[I]??k.map((W,L)=>L):[]}),y=m.map(k=>{const I=d.indexOf(k);return I>=0?s?.holeSmoothProfileVertexIndices?.[I]??[]:k.map((W,L)=>L)}),p=s?Math.max(GS([h,...m]),o?.semantic&&s.kind!=="analytic-residual-cap"&&s.kind!=="analytic-residual-parent"?ki:ei(i)):ki;if(!c||![h,...m].every(k=>zS(k,c,p)))return null;const f=`solid-face-${e.uuid}-${o?`planar-${o.index}`:u?u.upper?"upper-cap":"lower-cap":t}`,E=o?.group?.kind==="analytic-residual-parent",A=E?{parentRegionId:o.group.parentRegionId??null,subdivisionRegionIds:[...o.group.subdivisionRegionIds??[]],capIndex:o.group.capIndex}:null,_=s?.exactProfile?{exactProfile:JSON.parse(JSON.stringify(s.exactProfile)),cadProfileVertexIndices:s.cadProfileVertexIndices??[],smoothProfileVertexIndices:s.smoothProfileVertexIndices??[]}:o&&(!o.semantic||E)?eE(i,h,m,c,f,A):null,S=o?.semantic?null:xE(i,t,_),b=S?null:_E(i,o,_),C=S??b??o,x=C?.group??s,R=S||b?{exactProfile:JSON.parse(JSON.stringify(x.exactProfile)),cadProfileVertexIndices:x.cadProfileVertexIndices??[],smoothProfileVertexIndices:x.smoothProfileVertexIndices??[]}:_,U=S||b?`solid-face-${e.uuid}-planar-${C.index}`:f,D=R?tE(h,R,ei(i)):h,B=x?.kind==="analytic-residual-cap"&&!!x.exactProfile&&!!x.regionId&&!!x.parentRegionId&&!Number.isInteger(x.featureIndex),Z=SE(e.userData.analyticSolid,i)?e.userData.analyticSolid:i;return{id:U,sourceSolid:Z,...B?{supportSolid:Z,supportLoops:{outer:D.map(k=>({x:k.x,y:k.y,z:k.z})),holes:m.map(k=>k.map(I=>({x:I.x,y:I.y,z:I.z})))}}:{},sourceSolidDocumentId:e.userData.documentSolidId??e.parent?.userData?.documentSolidId??null,sourceSolidFaceIndex:t,sourceSolidFaceIndices:x?.indices?[...x.indices]:u?.indices?[...u.indices]:[t],sourceSolidObject:e,sourceSolidGroup:e.parent??null,points:D.map(k=>({x:k.x,y:k.y,z:k.z})),holes:m.map(k=>k.map(I=>({x:I.x,y:I.y,z:I.z}))),normal:{x:c.x,y:c.y,z:c.z},...R?{analyticAxis:{x:c.x,y:c.y,z:c.z}}:{},...Number.isInteger(x?.featureIndex)?{analyticCapIndex:x.capIndex,analyticFeatureIndex:x.featureIndex,analyticOperationType:x.operationType??null}:{},...x?.regionId?{analyticRegionId:x.regionId}:{},...x?.parentRegionId?{analyticParentRegionId:x.parentRegionId}:{},cadProfileVertexIndices:R?.cadProfileVertexIndices??x?.cadProfileVertexIndices??h.map((k,I)=>I),smoothProfileVertexIndices:R?.smoothProfileVertexIndices??x?.smoothProfileVertexIndices??[],holeCadProfileVertexIndices:v,holeSmoothProfileVertexIndices:y,...R?.exactProfile?{exactProfile:R.exactProfile}:{}}}function Jl(e){const t=e?.object,n=t?.geometry?.userData?.webcadFaceTriangleMap?.[e?.faceIndex];return Number.isInteger(n)?zo(t,n):null}function zu(e,t){const i=e?.userData?.solid?.metadata?.planarFaceGroups?.[t],r=i?.indices?.[0];return Number.isInteger(r)?zo(e,r,{group:i,index:t}):null}function EE(e){const t=e?.userData?.solid;if(!Array.isArray(t?.faces))return[];const n=[],i=t.metadata?.planarFaceGroups??[];i.forEach((o,s)=>{const u=zu(e,s);u&&n.push(u)});const r=new Set(i.flatMap(o=>o?.indices??[]));t.faces.forEach((o,s)=>{if(r.has(s))return;const u=zo(e,s);u&&n.push(u)});const a=new Map;return n.forEach(o=>{const s=o.id??`${o.sourceSolidDocumentId}:${o.sourceSolidFaceIndex}`;a.has(s)||a.set(s,o)}),[...a.values()]}function ME(e){const t=gu(e?.exactProfile,{segments:DS,structured:!0});if(!t?.outerLoop?.length)return null;const n=e.exactProfile?.plane,i=be(n?.origin),r=be(n?.xAxis),a=be(n?.yAxis);if(![i,r,a].every(l=>Number.isFinite(l.x)&&Number.isFinite(l.y)&&Number.isFinite(l.z))||r.lengthSq()<=bn||a.lengthSq()<=bn)return null;const o=l=>{const h=l.map(d=>Po(d,n)).map(d=>({x:d.x,y:d.y,z:d.z}));return h.length>1&&be(h[0]).distanceTo(be(h.at(-1)))<=ki&&h.pop(),h},s=o(t.outerLoop),u=t.innerLoops.map(o);return s.length<3||u.some(l=>l.length<3)?null:[s,...u]}function qa(e){const t=be(e?.normal);if(t.lengthSq()<=bn)return null;t.normalize();const n=ME(e),i=n?.[0]??(Array.isArray(e?.points)?e.points:[]),r=n?.slice(1)??(Array.isArray(e?.holes)?e.holes:[]);if(i.length<3)return null;const a=[i,...r].flat(),o=new Float32Array(a.length*3);a.forEach((h,d)=>{const c=be(h).addScaledVector(t,IS),m=d*3;o[m]=c.x,o[m+1]=c.y,o[m+2]=c.z});const s=new fi;s.setAttribute("position",new hr(o,3)),s.setIndex(uE(i,t,r)),s.computeVertexNormals(),s.computeBoundingBox(),s.computeBoundingSphere();const u=new _a({color:Vl,depthTest:!0,depthWrite:!1,opacity:.72,side:cn,transparent:!0}),l=new nn(s,u);return l.name=`webcad-selected-${e.id}`,l.renderOrder=FS,l.userData={type:"webcad-push-solid-face-selection",faceId:e.id,face:e,selectedColor:Vl,transientSelection:!0},l}const yE=360,po=.05;function Ql(e){return e==="mouse"?"mouse":"trackpad"}function bE(e){const t=typeof WheelEvent>"u"?1:WheelEvent.DOM_DELTA_LINE,n=typeof WheelEvent>"u"?2:WheelEvent.DOM_DELTA_PAGE;return e.deltaMode===t?{x:e.deltaX*16,y:e.deltaY*16}:e.deltaMode===n?{x:e.deltaX*800,y:e.deltaY*800}:{x:e.deltaX,y:e.deltaY}}function AE(e,t,n,i){const r=Math.max(1,i.width||1),a=Math.max(1,i.height||1),u=2*Math.max(po,e.position.distanceTo(t.target))*Math.tan(ii.degToRad(e.fov*.5))/a,l=new Q().setFromMatrixColumn(e.matrix,0).normalize(),h=new Q().setFromMatrixColumn(e.matrix,1).normalize(),d=new Q().addScaledVector(l,n.x*u).addScaledVector(h,-n.y*u);return e.position.add(d),t.target.add(d),t.update(),r}function TE(e,t,n){const i=t.target,r=new Q().subVectors(e.position,i),a=r.length();if(a<=po)return!1;const o=Math.exp(n/yE),s=Math.max(po,a*o);return r.setLength(s),e.position.copy(i).add(r),t.update(),!0}function PE({camera:e,canvas:t,controls:n,getNavigationDevice:i,render:r,viewport:a}){let o=Ql(i?.());n.mouseButtons.LEFT=Jn.ROTATE,n.mouseButtons.MIDDLE=Jn.PAN,n.mouseButtons.RIGHT=Jn.PAN,n.enablePan=!0,n.enableRotate=!0,n.enableZoom=!0,n.screenSpacePanning=!0;function s(l){o=Ql(l),n.enableZoom=o==="mouse"}function u(l){if(o!=="trackpad")return;l.preventDefault(),l.stopImmediatePropagation();const h=bE(l);if(l.shiftKey){const c=Math.abs(h.y)>=Math.abs(h.x)?h.y:h.x;c!==0&&TE(e,n,c)}else AE(e,n,h,a());r?.()}return s(o),t.addEventListener("wheel",u,{capture:!0,passive:!1}),{dispose(){t.removeEventListener("wheel",u,{capture:!0})},setNavigationDevice:s}}function wE(e){return[...new Set(Array.isArray(e)?e.filter(Boolean):[])]}function Go(e,t){const n=new Set(wE(t));return(e?.model3d?.solids??[]).filter(i=>n.has(i?.id)&&i?.locked!==!0)}function RE({doc:e,solidIds:t,from:n,to:i}={}){const r=Go(e,t);if(!r.length||!n||!i)return!1;const a={x:Number(i.x)-Number(n.x),y:Number(i.y)-Number(n.y),z:Number(i.z??0)-Number(n.z??0)};if(!Object.values(a).every(Number.isFinite))return!1;const o=new Map(r.map(s=>[s.id,Co(s.placement,a)]));return e.update3dSolidPlacements?.(o)===!0}function CE({doc:e,solidIds:t,from:n,to:i}={}){const r=Go(e,t);if(!r.length||!n||!i||typeof e?.add3dSolid!="function"||typeof e?.recordHistory!="function")return[];const a={x:Number(i.x)-Number(n.x),y:Number(i.y)-Number(n.y),z:Number(i.z??0)-Number(n.z??0)};return Object.values(a).every(Number.isFinite)?(e.recordHistory(),r.map(o=>e.add3dSolid(o.solid,{name:`Copia de ${o.name}`,operation:{type:"copySolid",sourceSolidId:o.id,displacement:a},placement:Co(o.placement,a),recordHistory:!1,visible:o.visible})).filter(Boolean)):[]}function IE({doc:e,solidIds:t,axisStart:n,axisEnd:i,angleDegrees:r}={}){const a=Go(e,t),o=Number(r);if(!a.length||!n||!i||!Number.isFinite(o))return!1;const s=new Map;for(const u of a){const l=Yc(u.placement,{axisStart:n,axisEnd:i,angleDegrees:o});if(!l)return!1;s.set(u.id,l)}return e.update3dSolidPlacements?.(s)===!0}const Kn=1e-9,DE=6*Math.PI/180,Gu=/^[0-9eE+\-*/().,\s]$/,xi={x:new Q(1,0,0),y:new Q(0,1,0),z:new Q(0,0,1)};function ho(e){return e?.key==="Enter"||e?.key===" "||e?.button===2}function LE({anchor:e,axes:t,pointer:n,angleTolerance:i=DE}={}){if(!e||!t||!n)return null;const r={x:Number(n.x)-Number(e.x),y:Number(n.y)-Number(e.y)},a=Math.hypot(r.x,r.y);if(!Number.isFinite(a)||a<8)return null;let o=null;return Object.entries(t).forEach(([s,u])=>{const l={x:Number(u?.x)-Number(e.x),y:Number(u?.y)-Number(e.y)},h=Math.hypot(l.x,l.y);if(!Number.isFinite(h)||h<4)return;const d=Math.min(1,Math.abs(r.x*l.y-r.y*l.x)/(a*h)),c=Math.asin(d);c>i||o&&c>=o.angle||(o={axis:s,angle:c})}),o?.axis??null}function qn(e){return{x:e.x,y:e.y,z:e.z}}function yt(e){return new Q(Number(e?.x)||0,Number(e?.y)||0,Number(e?.z)||0)}function NE(e){const t=String(e).split(",");if(t.length!==3)return null;const n=t.map(i=>bi(i.trim()));return n.every(Number.isFinite)?new Q(n[0],n[1],n[2]):null}function ja(e,t){const n=Ir(t);e.position.set(n.position.x,n.position.y,n.position.z),e.quaternion.set(n.quaternion.x,n.quaternion.y,n.quaternion.z,n.quaternion.w),e.updateMatrixWorld?.(!0)}function ec(e,{anchor:t=null,axis:n=null,direction:i=null}={}){const r=NE(e);if(r)return qn(t?r.add(yt(t)):r);const a=bi(String(e).trim()),o=yt(i??xi[n]);return!Number.isFinite(a)||!t||o.lengthSq()<=Kn?null:qn(yt(t).addScaledVector(o.normalize(),a))}function UE(e,t,n){const i=xi[n];if(!e||!t||!i)return null;const r=yt(e),a=yt(t).sub(r);return qn(r.addScaledVector(i,a.dot(i)))}function FE(e){const t=yt(e);return`Precise punto de destino · Distancia ${qt(t.length())} · ΔX ${qt(t.x)} · ΔY ${qt(t.y)} · ΔZ ${qt(t.z)}`}function Vo({camera:e,canvas:t,getSnap:n=()=>null,getWorkplane:i=()=>({origin:{x:0,y:0,z:0},normal:{x:0,y:0,z:1}}),onHelper:r=()=>{},onPreview:a=()=>{},onStatus:o=()=>{}}={}){const s=new Wi,u=new Ke;let l=null,h="",d=null,c=null,m=null,v=null,y=!1,p=null,f=null,E=null,A="point";function _(){return c??v??m}function S(){return!!(c||y&&v)}function b(){if(!l)return;const L=_(),H=L?S()?` · eje ${L.toUpperCase()} bloqueado${c?"":" con Shift"}`:` · en eje ${L.toUpperCase()} · Shift para bloquear`:"",ee=h?` · ${h}`:"";o(`${A==="reference"?"Precise punto de referencia":A==="displacement"?"Precise desplazamiento desde la referencia":l.prompt}${H}${ee}`)}function C(L){const H=t.getBoundingClientRect();u.x=(L.clientX-H.left)/Math.max(1,H.width)*2-1,u.y=-((L.clientY-H.top)/Math.max(1,H.height)*2-1),s.setFromCamera(u,e)}function x(){return A==="displacement"?p:l?.anchor}function R(L,H=_()){const ee=xi[H];if(!L||!ee)return null;const fe=yt(L),ce=1e7,pe=fe.clone().addScaledVector(ee,-ce),He=fe.clone().addScaledVector(ee,ce),Ge=new Q,Ie=new Q;return s.ray.distanceSqToSegment(pe,He,Ge,Ie),qn(Ie)}function U(L=null){if(L&&l?.useWorkplaneWithAnchor!==!0){const pe=new Q;e.getWorldDirection(pe);const He=new aa().setFromNormalAndCoplanarPoint(pe.normalize(),yt(L)),Ge=new Q;return s.ray.intersectPlane(He,Ge)?qn(Ge):null}const H=i()??{},ee=yt(H.normal);ee.lengthSq()<=Kn&&ee.set(0,0,1);const fe=new aa().setFromNormalAndCoplanarPoint(ee.normalize(),yt(H.origin)),ce=new Q;return s.ray.intersectPlane(fe,ce)?qn(ce):null}function D(L,H){if(!L||!H)return null;const ee=t.getBoundingClientRect(),ce=Math.max(1,e.position.distanceTo(yt(L)))*.35,pe=Ge=>{const Ie=yt(Ge).project(e);return{x:(Ie.x+1)*ee.width*.5,y:(1-Ie.y)*ee.height*.5}},He=yt(L);return LE({anchor:pe(He),axes:Object.fromEntries(Object.entries(xi).map(([Ge,Ie])=>[Ge,pe(He.clone().addScaledVector(Ie,ce))])),pointer:{x:H.clientX-ee.left,y:H.clientY-ee.top}})}function B(L){if(!l)return null;f={clientX:L.clientX,clientY:L.clientY,shiftKey:L.shiftKey===!0},C(L);const H=x();y=L.shiftKey===!0,y||(v=null);const ee=n(L,{anchor:H,stage:A}),fe=l?.disableAxisInference===!0?null:D(H,L);m=c||v?m:ee&&!y?null:fe,y&&!v&&m&&(v=m);const ce=_(),pe=!!(ce&&(c||v||!ee)),He=!!(pe&&S()&&H&&ee?.point),Ge=He?UE(H,ee.point,ce):pe?R(H,ce):null;if(d=Ge??ee?.point??U(H),b(),d){const Ie=yt(d).sub(yt(H));H&&Ie.lengthSq()>Kn&&(E=qn(Ie.normalize())),a(d,{axis:pe?ce:null,inferred:!!(ce&&!S()),locked:S(),snap:He||!Ge?ee:null,snapSetsAxisDistance:He,stage:A})}return d}function Z(L){if(!l||!L)return!1;if(A==="reference")return p=L,A="displacement",c=null,m=null,v=null,E=null,h="",d=null,r(p),b(),!0;const H=L,ee=l.onPoint,fe=A==="displacement";return l=null,h="",d=null,c=null,m=null,v=null,p=null,A="point",ee(H,{usedFrom:fe}),!0}function k(){if(!l)return!1;const L=h?ec(h,{anchor:x(),axis:_(),direction:E}):null;return Z(L??d)}function I(L){l=L,h="",d=null,c=null,m=null,v=null,y=!1,p=null,f=null,E=null,A="point",L.anchor&&r(L.anchor),b()}function W(L){if(!l)return!1;const H=L.key.toLowerCase();if(L.key==="Shift")return y=!0,!v&&m&&(v=m),f&&B({...f,shiftKey:!0}),!0;if(H==="escape")return l.onCancel?.(),!0;if(ho(L))return k(),!0;if(H==="backspace")return h=h.slice(0,-1),b(),!0;if(!h&&l.allowFrom&&A==="point"&&H==="d")return A="reference",d=null,c=null,b(),!0;if(!h&&xi[H]&&x()){if(c=c===H?null:H,m=c,v=null,c){const ee=yt(x()),ce=(d?yt(d).sub(ee):new Q).dot(xi[c])<0?-1:1;E=qn(xi[c].clone().multiplyScalar(ce))}return b(),!0}if(L.key.length===1&&Gu.test(L.key)){h+=L.key;const ee=ec(h,{anchor:x(),axis:_(),direction:E});return b(),ee&&a(ee,{axis:_(),inferred:!!(m&&!S()),locked:S(),stage:A}),!0}return!1}return{cancel(){l=null,h="",d=null,c=null,m=null,v=null,y=!1,p=null,f=null,E=null,A="point"},confirm:k,hasInput:()=>!!h,isActive:()=>!!l,keydown:W,keyup(L){return L.key!=="Shift"?!1:(y=!1,v=null,f&&B({...f,shiftKey:!1}),!0)},pointer:B,start:I}}function OE({camera:e,canvas:t,doc:n,getSelectedSolidIds:i=()=>[],getSolidIdAtPointer:r=()=>null,getSolidObjects:a=()=>[],getSnap:o=()=>null,getWorkplane:s,onChanged:u=()=>{},onSelection:l=()=>{},onSnap:h=()=>{},onStatus:d=()=>{},render:c=()=>{},scene:m}={}){let v=null,y=null,p=[],f=null,E=null,A=null,_="",S=0,b=null,C=!1,x=!1;const R=new Map,U=new Map,D=new Qt;D.name="webcad-solid-transform-helper";const B=new Io(18);D.add(B),D.visible=!1,m.add(D);let Z=null;function k(P){return n?.model3d?.solids?.find(De=>De?.id===P)??null}function I(P){return[...new Set(P)].filter(De=>{const Pe=k(De);return Pe&&Pe.visible!==!1&&Pe.locked!==!0})}function W(P){return a().find(De=>De.userData?.documentSolidId===P)??null}function L(){R.clear(),p.forEach(P=>{const De=k(P);De&&R.set(P,Ir(De.placement))})}function H(){U.forEach(P=>{m.remove(P),ct(P)}),U.clear()}function ee(){H(),p.forEach(P=>{const De=W(P);if(!De)return;const Pe=De.clone(!0);Pe.traverse?.(T=>{T.geometry&&(T.geometry=T.geometry.clone()),Array.isArray(T.material)?T.material=T.material.map(g=>g.clone()):T.material&&(T.material=T.material.clone())}),Pe.name=`webcad-solid-copy-preview-${P}`,Pe.userData={...Pe.userData,documentSolidId:null,transformPreview:!0},U.set(P,Pe),m.add(Pe)})}function fe(){R.forEach((P,De)=>{const Pe=W(De);Pe&&ja(Pe,P)}),c()}function ce(P){if(!P){D.visible=!1;return}D.position.copy(yt(P)),D.visible=!0,c()}function pe(){Z&&(D.remove(Z),ct(Z),Z=null)}function He(P,De,Pe=null){pe();const T=yt(P),g=yt(De),V=g.clone().sub(T);if(V.lengthSq()<=Kn)return;const Y=new kf({color:16764749,depthTest:!1,transparent:!0,opacity:.95}),X=[T.clone().sub(D.position),g.clone().sub(D.position)];if(Z=new Qt,Z.add(new Cs(new fi().setFromPoints(X),Y)),Number.isFinite(Pe)&&Math.abs(Pe)>Kn){const he=V.normalize(),J=(Math.abs(he.z)<.9?new Q(0,0,1):new Q(0,1,0)).cross(he).normalize().multiplyScalar(9),te=new mr().setFromAxisAngle(he,Pe*Math.PI/180),ge=[],Oe=Math.max(8,Math.ceil(Math.abs(Pe)/10));for(let xe=0;xe<=Oe;xe+=1)ge.push(J.clone().applyQuaternion(new mr().slerpQuaternions(new mr,te,xe/Oe)));Z.add(new Cs(new fi().setFromPoints(ge),Y.clone()))}D.add(Z)}function Ge(P,De={}){if(!f)return;const Pe=yt(P).sub(yt(f));if(pe(),Pe.lengthSq()>Kn){const T={x:Qe.axisX,y:Qe.axisY,z:Qe.axisZ};Z=tn([{start:{x:0,y:0,z:0},end:qn(Pe)}],{color:T[De.axis]??16764749,depthTest:!1,depthWrite:!1,linewidth:Math.max(2.2,Qe.axisLineWidth-.3),renderOrder:80,transparent:!0,opacity:De.locked?1:.9}),Z.name=De.axis?`webcad-solid-move-guide-${De.axis}`:"webcad-solid-move-guide-free",D.add(Z)}R.forEach((T,g)=>{const V=v==="copy"?U.get(g):W(g);V&&ja(V,Co(T,Pe))}),d(FE(Pe)),c()}function Ie(P){return!E||!A?!1:(S=Number(P)||0,R.forEach((De,Pe)=>{const T=Yc(De,{axisStart:E,axisEnd:A,angleDegrees:S}),g=W(Pe);g&&T&&ja(g,T)}),He(E,A,S),d(`Precise ángulo de giro · ${qt(S)}°`),c(),!0)}function N(P,De=null){me.cancel(),pe(),H(),D.visible=!1,v=null,y=null,R.clear(),_="",b=null,u(),De&&l(De),d(P)}function ne(){if(!v)return!1;const P=v==="copy"?"Copiar":v==="move"?"Mover":"Girar";return me.cancel(),fe(),pe(),H(),D.visible=!1,v=null,y=null,p=[],R.clear(),_="",b=null,h(null),d(`${P} cancelado`),c(),!0}function ae(P){if(fe(),!RE({doc:n,solidIds:p,from:f,to:P})){ne();return}N(`${p.length} sólido${p.length===1?"":"s"} desplazado${p.length===1?"":"s"}`)}function q(P){fe();const De=CE({doc:n,solidIds:p,from:f,to:P});if(!De.length){ne();return}const Pe=De.map(T=>T.id);N(`${Pe.length} sólido${Pe.length===1?"":"s"} copiado${Pe.length===1?"":"s"}`,Pe)}function ue(){return Math.hypot(A.x-E.x,A.y-E.y,A.z-E.z)<=Kn?(d("Precise segundo punto del eje · el eje debe tener longitud"),!1):(fe(),IE({doc:n,solidIds:p,axisStart:E,axisEnd:A,angleDegrees:S})?(N(`${p.length} sólido${p.length===1?"":"s"} girado${p.length===1?"":"s"} ${qt(S)}°`),!0):(ne(),!1))}function se(){y="base",me.start({allowFrom:!0,prompt:"Precise punto base o [Desde]",onCancel:ne,onPoint(P){f=P,y="destination",ce(f),me.start({anchor:f,prompt:"Precise punto de destino",onCancel:ne,onPoint:v==="copy"?q:ae})}})}function Ee(){y="axisStart",me.start({allowFrom:!0,prompt:"Precise primer punto del eje o [Desde]",onCancel:ne,onPoint(P){E=P,y="axisEnd",ce(E),me.start({anchor:E,prompt:"Precise segundo punto del eje",onCancel:ne,onPoint(De){if(yt(De).distanceTo(yt(E))<=Kn){d("Precise segundo punto del eje · el eje debe tener longitud"),z();return}A=De,y="angle",S=0,_="",He(E,A,0),d("Precise ángulo de giro")}})}})}function z(){y="axisEnd",me.start({anchor:E,prompt:"Precise segundo punto del eje",onCancel:ne,onPoint(P){if(yt(P).distanceTo(yt(E))<=Kn){d("Precise segundo punto del eje · el eje debe tener longitud"),z();return}A=P,y="angle",S=0,_="",He(E,A,0),d("Precise ángulo de giro")}})}function re(){L(),v==="copy"&&ee(),v==="move"||v==="copy"?se():Ee()}function de(P,De=null){return v&&ne(),v=P,p=I(De??i()),l(p),t.focus?.({preventScroll:!0}),p.length?(re(),!0):(y="selection",d("Seleccione sólido(s) · Enter para continuar"),!0)}const me=Vo({camera:e,canvas:t,getSnap:(P,De)=>o(P,{...De,mode:v,phase:y,solidIds:[...p]}),getWorkplane:s,onHelper:ce,onPreview(P,De){h(De.snap??null),(v==="move"||v==="copy")&&y==="destination"?Ge(P,De):v==="rotate"&&y==="axisEnd"&&He(E,P)},onStatus:d});function Ye(P){if(!(!v||P.buttons)){if(me.isActive()){me.pointer(P),c();return}y==="angle"&&(b??={x:P.clientX,angle:S},Ie(b.angle+(P.clientX-b.x)*.5))}}function Fe(P){if(!v||P.button!==0&&P.button!==2)return;const De=P.button===2;if(C=!0,x=De,P.preventDefault(),P.stopImmediatePropagation(),y==="selection"){if(De){p.length?re():d("Seleccione sólido(s)");return}const Pe=r(P),T=k(Pe);if(!T){d("Seleccione sólido(s)");return}if(T.locked===!0){d(`${T.name} está bloqueado`);return}p.includes(Pe)||p.push(Pe),l(p),d(`Seleccione sólido(s) · ${p.length} seleccionado${p.length===1?"":"s"} · Enter para continuar`),c();return}if(me.isActive()){me.pointer(P),me.confirm();return}y==="angle"&&ue()}function et(P){C&&(C=!1,P.preventDefault(),P.stopImmediatePropagation())}function at(P){!x&&!v||(x=!1,P.preventDefault(),P.stopImmediatePropagation())}function ut(P){if(!v)return;if(P.key==="Escape"){P.preventDefault(),P.stopImmediatePropagation(),ne();return}if(y==="selection"){ho(P)&&(P.preventDefault(),P.stopImmediatePropagation(),p.length?re():d("Seleccione sólido(s)"));return}if(me.isActive()){me.keydown(P)&&(P.preventDefault(),P.stopImmediatePropagation());return}if(y!=="angle")return;if(ho(P)){if(P.preventDefault(),P.stopImmediatePropagation(),_){const Pe=bi(_);Number.isFinite(Pe)&&Ie(Pe)}ue();return}if(P.key==="Backspace")P.preventDefault(),_=_.slice(0,-1);else if(P.key.length===1&&Gu.test(P.key))P.preventDefault(),_+=P.key;else return;P.stopImmediatePropagation();const De=bi(_);Number.isFinite(De)?Ie(De):d(`Precise ángulo de giro · ${_}`)}function pt(P){!v||!me.isActive()||!me.keyup(P)||(P.preventDefault(),P.stopImmediatePropagation(),c())}return t.addEventListener("pointermove",Ye,!0),t.addEventListener("pointerdown",Fe,!0),t.addEventListener("click",et,!0),t.addEventListener("contextmenu",at,!0),t.addEventListener("keydown",ut,!0),t.addEventListener("keyup",pt,!0),{cancel:ne,dispose(){ne(),t.removeEventListener("pointermove",Ye,!0),t.removeEventListener("pointerdown",Fe,!0),t.removeEventListener("click",et,!0),t.removeEventListener("contextmenu",at,!0),t.removeEventListener("keydown",ut,!0),t.removeEventListener("keyup",pt,!0),m.remove(D),ct(D)},isActive:()=>!!v,startCopy:(P=null)=>de("copy",P),startMove:(P=null)=>de("move",P),startRotate:(P=null)=>de("rotate",P)}}const pi=1e-7,BE=4,zE=4e-6;function ht(e){return{x:Number(e?.x)||0,y:Number(e?.y)||0,z:Number(e?.z)||0}}function Gn(e,t){return Math.hypot(e.x-t.x,e.y-t.y,e.z-t.z)}function tc(e,{hasInput:t=!1}={}){return e?.button===2?!0:!t&&(e?.key==="Enter"||e?.key===" ")}function Fi(e,t){return{x:t.x-e.x,y:t.y-e.y,z:t.z-e.z}}function mo(e,t,n){const i=Fi(t,n);return`${e} · Distancia ${qt(Gn(t,n))} · ΔX ${qt(i.x)} · ΔY ${qt(i.y)} · ΔZ ${qt(i.z)}`}function GE(e){return{x:Qe.axisX,y:Qe.axisY,z:Qe.axisZ}[e]??16764749}function Vu(e,t,n={},i="webcad-line3d-distance-guide"){if(!e||!t||Gn(e,t)<=pi)return null;const r=tn([{start:e,end:t}],{color:GE(n.axis),depthTest:!1,depthWrite:!1,linewidth:Math.max(2.2,Qe.axisLineWidth-.3),renderOrder:82,transparent:!0,opacity:n.locked?1:.92});return r.name=n.axis?`${i}-${n.axis}`:`${i}-free`,r}function Hu(e,t,{idPrefix:n="line3d"}={}){const i=Array.isArray(e)?e.map(ht):[];return i.slice(0,-1).map((r,a)=>{const o=i[a+1],s=en(r,t),u=en(o,t);return{id:`${n}-${a+1}`,type:"LINE",start:{x:s.x,y:-s.y,z:s.z},end:{x:u.x,y:-u.y,z:u.z}}})}function VE(e,t=pi){return Array.isArray(e)&&e.length>=4&&Gn(ht(e[0]),ht(e.at(-1)))<=t}function nc(e){const t=[],n=new Set,i=(r,a,o)=>{const s=ht(a),u=`${r}:${s.x.toFixed(8)}:${s.y.toFixed(8)}:${s.z.toFixed(8)}`;n.has(u)||(n.add(u),t.push({type:r,point:s,documentLineId:o.id,lineGroupId:o.groupId,documentSolidId:null}))};return(e??[]).forEach(r=>{r?.visible===!1||r?.type!=="LINE3D"||(i("endpoint",r.start,r),i("endpoint",r.end,r),i("midpoint",{x:(r.start.x+r.end.x)*.5,y:(r.start.y+r.end.y)*.5,z:(r.start.z+r.end.z)*.5},r))}),t}function HE(e,t=1e-6){const n=(e??[]).flatMap(s=>[ht(s.start),ht(s.end)]);if(n.length<3)return null;const i=new Q(n[0].x,n[0].y,n[0].z);let r=null;for(let s=1;s<n.length-1&&!r;s+=1){const u=new Q(n[s].x,n[s].y,n[s].z).sub(i);for(let l=s+1;l<n.length;l+=1){const h=new Q(n[l].x,n[l].y,n[l].z).sub(i),d=u.clone().cross(h);d.lengthSq()>t*t&&(r=d.normalize())}}if(!r||n.some(s=>Math.abs(new Q(s.x,s.y,s.z).sub(i).dot(r))>t))return null;const a=new Q(n[1].x,n[1].y,n[1].z).sub(i).normalize(),o=r.clone().cross(a).normalize();return gr({type:"fixed",label:"Líneas 3D coplanarias",origin:{x:i.x,y:i.y,z:i.z},xAxis:{x:a.x,y:a.y,z:a.z},yAxis:{x:o.x,y:o.y,z:o.z},normal:{x:r.x,y:r.y,z:r.z}})}function ku(e,t,n){const i=n.x-t.x,r=n.y-t.y,a=i*i+r*r;if(a<=Number.EPSILON)return Math.hypot(e.x-t.x,e.y-t.y);const o=Math.max(0,Math.min(1,((e.x-t.x)*i+(e.y-t.y)*r)/a));return Math.hypot(e.x-(t.x+i*o),e.y-(t.y+r*o))}function ic(e,t,n){return t.some((i,r)=>ku(e,i,t[(r+1)%t.length])<=n)}function rc(e,t){let n=!1;for(let i=0,r=t.length-1;i<t.length;r=i++){const a=t[i],o=t[r];a.y>e.y!=o.y>e.y&&e.x<(o.x-a.x)*(e.y-a.y)/(o.y-a.y)+a.x&&(n=!n)}return n}function kE(e){return Math.abs(e.reduce((t,n,i)=>{const r=e[(i+1)%e.length];return t+n.x*r.y-r.x*n.y},0))*.5}function ac(e,t,n,i){return n.some((r,a)=>{const o=n[(a+1)%n.length],s=$c({start:e,end:t},{start:r,end:o});return s&&ku(s,e,t)<=i})}function Jr(e,t,n=1e-6,{allowCrossing:i=!1}={}){const r=Array.isArray(e)?e.map(ht):[];return r.length<2?null:(t??[]).map(o=>{if(!Array.isArray(o?.points)||o.points.length<3)return null;const s=va(o),u=o.points.map(E=>en(E,s)),l=(o.holes??[]).map(E=>E.map(A=>en(A,s))),h=Math.max(1,...u.map(E=>Math.hypot(E.x,E.y))),d=Array.isArray(o?.sourceSolid?.vertices)?Gc(o.sourceSolid)*BE:0,c=Math.max(n,h*1e-7,d),m=r.slice(0,-1).flatMap((E,A)=>{const _=r[A+1];return[0,.25,.5,.75,1].map(S=>({x:E.x+(_.x-E.x)*S,y:E.y+(_.y-E.y)*S,z:E.z+(_.z-E.z)*S}))}).map(E=>en(E,s)),v=E=>{if(Math.abs(E.z)>c)return!1;const A={x:E.x,y:E.y};return ic(A,u,c)||rc(A,u)?l.every(S=>ic(A,S,c)||!rc(A,S)):!1},y=m.every(v),p=m.every(E=>Math.abs(E.z)<=c),f=i&&p&&(m.some(v)||r.slice(0,-1).some((E,A)=>{const _=en(r[A],s),S=en(r[A+1],s),b={x:_.x,y:_.y},C={x:S.x,y:S.y};return ac(b,C,u,c)||l.some(x=>ac(b,C,x,c))}));return!y&&!f?null:{face:o,plane:s,area:kE(u)}}).filter(Boolean).sort((o,s)=>o.area-s.area)[0]??null}function WE(e,t){const n=[...(e??[]).flatMap(i=>[i?.start,i?.end]),...t??[]].map(ht);return n.length?["x","y","z"].reduce((i,r)=>{const a=n.map(o=>o[r]);return Math.max(i,Math.max(...a)-Math.min(...a))},1):1}function oc(e){return{segment:{start:ht(e.start),end:ht(e.end)},points:[{parameter:0,point:ht(e.start)},{parameter:1,point:ht(e.end)}]}}function dr(e,t,n){const i=e.segment.start,r=e.segment.end,a=Fi(i,r),o=a.x**2+a.y**2+a.z**2;if(o<=n**2)return!1;const s=((t.x-i.x)*a.x+(t.y-i.y)*a.y+(t.z-i.z)*a.z)/o,u=n/Math.sqrt(o);if(s<-u||s>1+u)return!1;const l=Math.max(0,Math.min(1,s)),h={x:i.x+a.x*l,y:i.y+a.y*l,z:i.z+a.z*l};if(Gn(h,ht(t))>n)return!1;if(l<=u||l>=1-u)return!0;const d=e.points.find(c=>Math.abs(c.parameter-l)<=u);return d?(d.point=ht(t),!0):(e.points.push({parameter:l,point:ht(t)}),!0)}function XE(e,t,n){const i=e.segment.start,r=t.segment.start,a=Fi(i,e.segment.end),o=Fi(r,t.segment.end),s=Fi(r,i),u=a.x**2+a.y**2+a.z**2,l=a.x*o.x+a.y*o.y+a.z*o.z,h=o.x**2+o.y**2+o.z**2,d=a.x*s.x+a.y*s.y+a.z*s.z,c=o.x*s.x+o.y*s.y+o.z*s.z,m=u*h-l*l;if(u<=n**2||h<=n**2||Math.abs(m)<=u*h*1e-12)return null;const v=(l*c-h*d)/m,y=(u*c-l*d)/m,p=n/Math.sqrt(u),f=n/Math.sqrt(h);if(v<-p||v>1+p||y<-f||y>1+f)return null;const E={x:i.x+a.x*v,y:i.y+a.y*v,z:i.z+a.z*v},A={x:r.x+o.x*y,y:r.y+o.y*y,z:r.z+o.z*y};return Gn(E,A)>n?null:{x:(E.x+A.x)*.5,y:(E.y+A.y)*.5,z:(E.z+A.z)*.5}}function sc(e,t,n){const i=XE(e,t,n);if(i)return dr(e,i,n),dr(t,i,n),!0;let r=!1;return[e.segment.start,e.segment.end].forEach(a=>{dr(t,a,n)&&(r=!0)}),[t.segment.start,t.segment.end].forEach(a=>{dr(e,a,n)&&(r=!0)}),r}function lc(e,t){const n=[...e.points].sort((i,r)=>i.parameter-r.parameter);return n.slice(0,-1).map((i,r)=>({start:ht(i.point),end:ht(n[r+1].point)})).filter(i=>Gn(i.start,i.end)>t)}function YE({existingLines:e=[],newSegments:t=[],splitPoints:n=[],tolerance:i=null}={}){const r=(e??[]).filter(d=>d?.type==="LINE3D"&&d.visible!==!1&&d.locked!==!0&&d.start&&d.end),a=(t??[]).filter(d=>d?.start&&d?.end),o=Number.isFinite(i)&&i>0?i:Math.max(pi,WE([...r,...a],n)*zE),s=r.map(d=>({...oc(d),line:d})),u=a.map(oc);u.forEach(d=>{(n??[]).forEach(c=>dr(d,ht(c),o))});const l=new Set;return u.forEach((d,c)=>{s.forEach(m=>{sc(d,m,o)&&l.add(m.line.id)}),u.slice(c+1).forEach(m=>sc(d,m,o))}),{existingReplacements:s.map(d=>{const c=lc(d,o);return c.length>1?{id:d.line.id,segments:c}:null}).filter(Boolean),newSegments:u.flatMap(d=>lc(d,o)),touchedExistingLineIds:[...l],tolerance:o}}function $E(e,t){if(t?.type==="LINE"){const n=$c(e,t);return n?[n]:[]}return t?.type==="CIRCLE"||t?.type==="ARC"?Wf(e,t).filter(n=>Xf(n,t)):t?.type==="ELLIPSE"||t?.type==="ELLIPSE_ARC"?Yf(e,t):[]}function KE(e,t,n){const a=Hu(e,t).flatMap(o=>(n??[]).flatMap(s=>$E(o,s))).map(o=>yr({x:o.x,y:-o.y,z:0},t));return a.filter((o,s)=>a.findIndex(u=>Gn(o,u)<=pi)===s)}function Wu(e,t){if(!Array.isArray(e)||!t)return[];const n=i=>{const r=new Q(i.x,i.y,i.z);if(t.type==="translate"){const a=ht(t.displacement);r.add(new Q(a.x,a.y,a.z))}else if(t.type==="rotate"){const a=ht(t.axisStart),o=ht(t.axisEnd),s=new Q(a.x,a.y,a.z),u=new Q(o.x-a.x,o.y-a.y,o.z-a.z);if(u.lengthSq()<=pi**2)return null;r.sub(s).applyAxisAngle(u.normalize(),ii.degToRad(Number(t.angleDegrees)||0)).add(s)}else return null;return{x:r.x,y:r.y,z:r.z}};return e.map(i=>({...i,start:n(i.start),end:n(i.end)})).filter(i=>i.start&&i.end)}function qE({camera:e,canvas:t,getContext:n,getSnap:i=()=>null,onCommit:r=()=>null,onSnap:a=()=>{},onStatus:o=()=>{},render:s=()=>{},scene:u}={}){const l=new Qt;l.name="webcad-line3d-preview";const h=new Io(18);h.name="webcad-line3d-axis-helper",h.visible=!1,l.add(h),u.add(l);let d=!1,c=null,m=[],v=null,y=null,p=!1;function f(){[v,y].forEach(I=>{I&&(l.remove(I),ct(I))}),v=null,y=null}function E(){return m.slice(0,-1).map((I,W)=>({start:I,end:m[W+1]}))}function A(I=null,W=null,L={}){f();const H=E();H.length&&(v=tn(H,{color:Qe.drawingColor,depthTest:!1,depthWrite:!1,linewidth:Qe.drawingLineWidth,renderOrder:81,transparent:!0,opacity:.95}),l.add(v)),I&&m.length&&(y=Vu(m.at(-1),ht(I),L,"webcad-line3d-draw-distance-guide"),y&&l.add(y)),a(W),I&&m.length&&o(mo(`Línea 3D · tramo ${H.length+1}`,m.at(-1),ht(I))),s()}function _(I=!1){if(!d)return!1;C.cancel();const W=!I&&m.length>=2?r({context:c,closed:VE(m),points:m.map(ht)}):null;return d=!1,c=null,m=[],f(),h.visible=!1,a(null),o(I?"Línea 3D cancelada":W?"Línea 3D creada":"Línea 3D finalizada"),s(),!0}function S(){C.start({prompt:m.length?"Precise el siguiente punto · Enter, Espacio o clic derecho para terminar":"Precise el primer punto",...m.length?{anchor:m.at(-1)}:{},onCancel(){_(m.length<2)},onPoint(I){const W=ht(I);if(m.length&&Gn(m.at(-1),W)<=pi){S();return}if(m.length>=3&&Gn(m[0],W)<=pi){m.push({...m[0]}),A(),_();return}m.push(W),A(),S()}})}function b(I){if(m.length<3||!I)return null;const W=t.getBoundingClientRect(),L=new Q(m[0].x,m[0].y,m[0].z).project(e);if(L.z<-1||L.z>1)return null;const H=W.left+(L.x+1)*W.width*.5,ee=W.top+(1-L.y)*W.height*.5,fe=Math.hypot(I.clientX-H,I.clientY-ee);return fe<=16?{type:"endpoint",point:{...m[0]},documentSolidId:null,distancePixels:fe}:null}const C=Vo({camera:e,canvas:t,getSnap:I=>{const W=i(I,{context:c,firstPoint:m[0]??null,points:m}),L=b(I);return L&&(!W||L.distancePixels<=Number(W.distancePixels??1/0))?L:W},getWorkplane:()=>c?.plane,onHelper(I){h.position.set(I.x,I.y,I.z),h.visible=!0,s()},onPreview(I,W){A(I,W.snap??null,W)},onStatus:o});function x(){const I=n?.();return I?.plane?(d&&_(!0),d=!0,c=I,m=[],t.focus?.({preventScroll:!0}),S(),!0):(o("Línea 3D · no hay una referencia espacial válida"),!1)}function R(I){!d||I.buttons||C.pointer(I)}function U(I){if(!(!d||I.button!==0&&I.button!==2)){if(p=!0,I.preventDefault(),I.stopImmediatePropagation(),tc(I)){_(m.length<2);return}C.pointer(I),C.confirm()}}function D(I){p&&(p=!1,I.preventDefault(),I.stopImmediatePropagation())}function B(I){if(d){if(I.key==="Escape"){I.preventDefault(),I.stopImmediatePropagation(),_(m.length<2);return}if(tc(I,{hasInput:C.hasInput()})){I.preventDefault(),I.stopImmediatePropagation(),_(m.length<2);return}C.keydown(I)&&(I.preventDefault(),I.stopImmediatePropagation())}}function Z(I){!d||!C.keyup(I)||(I.preventDefault(),I.stopImmediatePropagation())}function k(I){d&&(I.preventDefault(),I.stopImmediatePropagation())}return t.addEventListener("pointermove",R,!0),t.addEventListener("pointerdown",U,!0),t.addEventListener("click",D,!0),t.addEventListener("contextmenu",k,!0),t.addEventListener("keydown",B,!0),t.addEventListener("keyup",Z,!0),{cancel:()=>_(!0),dispose(){_(!0),t.removeEventListener("pointermove",R,!0),t.removeEventListener("pointerdown",U,!0),t.removeEventListener("click",D,!0),t.removeEventListener("contextmenu",k,!0),t.removeEventListener("keydown",B,!0),t.removeEventListener("keyup",Z,!0),u.remove(l),ct(l)},isActive:()=>d,start:x}}function jE({camera:e,canvas:t,getSnap:n=()=>null,getWorkplane:i,onSnap:r=()=>{},onStatus:a=()=>{},onTransform:o=()=>!1,render:s=()=>{},scene:u}={}){const l=new Qt;l.name="webcad-line3d-transform-helper";const h=new Io(18);h.name="webcad-line3d-transform-axis-helper",h.visible=!1,l.add(h),u.add(l);let d=!1,c=null,m=null,v=null,y=null,p=null,f=null,E="",A=!1,_=null,S=null;function b(){_&&(l.remove(_),ct(_),_=null)}function C(N,ne,ae={},q="webcad-line3d-transform-guide"){b(),_=Vu(N,ht(ne),ae,q),_&&l.add(_)}function x(){S&&(l.remove(S),ct(S),S=null)}function R(N){x();const ne=Wu(m?.lines,N);ne.length&&(S=tn(ne.map(ae=>({start:ae.start,end:ae.end})),{color:16764749,depthTest:!1,depthWrite:!1,linewidth:Qe.drawingLineWidth+.8,renderOrder:81,transparent:!0,opacity:.82}),S.name=`webcad-line3d-${c}-preview`,l.add(S))}function U(N=null){H.cancel(),b(),x(),r(null),h.visible=!1,d=!1,c=null,m=null,v=null,y=null,p=null,f=null,E="",N&&a(N),s()}function D(N){const ne={x:N.x-y.x,y:N.y-y.y,z:N.z-y.z},ae=o({mode:c,record:m,transform:{type:"translate",displacement:ne}});U(ae?`Líneas 3D ${c==="copy"?"copiadas":"desplazadas"}`:"Transformación de líneas 3D cancelada")}function B(){v="destination",H.start({anchor:y,prompt:"Precise punto de destino",onCancel:()=>U("Transformación de líneas 3D cancelada"),onPoint:D})}function Z(){v="base",H.start({prompt:"Precise punto base",onCancel:()=>U("Transformación de líneas 3D cancelada"),onPoint(N){y=ht(N),b(),B()}})}function k(){v="axisEnd",H.start({anchor:p,prompt:"Precise segundo punto del eje",onCancel:()=>U("Giro de líneas 3D cancelado"),onPoint(N){if(f=ht(N),Gn(p,f)<=pi){a("El eje de giro debe tener longitud"),k();return}H.cancel(),C(p,f,{locked:!0},"webcad-line3d-rotation-axis"),v="angle",E="",a("Precise ángulo de giro")}})}function I(){v="axisStart",H.start({prompt:"Precise primer punto del eje",onCancel:()=>U("Giro de líneas 3D cancelado"),onPoint(N){p=ht(N),k()}})}function W(N){return!Number.isFinite(N)||!p||!f?!1:(R({type:"rotate",axisStart:p,axisEnd:f,angleDegrees:N}),a(`Precise ángulo de giro · ${qt(N)}°`),s(),!0)}function L(){const N=bi(E);if(!Number.isFinite(N))return!1;const ne=o({mode:c,record:m,transform:{type:"rotate",axisStart:p,axisEnd:f,angleDegrees:N}});return U(ne?`Líneas 3D giradas ${N}°`:"Giro de líneas 3D cancelado"),!0}const H=Vo({camera:e,canvas:t,getSnap:n,getWorkplane:i,onHelper(N){h.position.set(N.x,N.y,N.z),h.visible=!0,s()},onStatus:a,onPreview(N,ne){r(ne.snap??null),v==="destination"&&y?(C(y,N,ne),R({type:"translate",displacement:Fi(y,ht(N))}),a(mo("Precise punto de destino",y,ht(N))),s()):v==="axisEnd"&&p&&(C(p,N,ne,"webcad-line3d-rotation-axis"),a(mo("Precise segundo punto del eje",p,ht(N))),s())}});function ee(N,ne){return!Array.isArray(ne?.lines)||!ne.lines.length?!1:(d&&U(),d=!0,c=N,m=ne,t.focus?.({preventScroll:!0}),c==="rotate"?I():Z(),!0)}function fe(N){!d||!H.isActive()||N.buttons||H.pointer(N)}function ce(N){if(!(!d||N.button!==0&&N.button!==2)){if(v==="angle"&&N.button===2){A=!0,N.preventDefault(),N.stopImmediatePropagation(),L();return}H.isActive()&&(A=!0,N.preventDefault(),N.stopImmediatePropagation(),H.pointer(N),H.confirm())}}function pe(N){A&&(A=!1,N.preventDefault(),N.stopImmediatePropagation())}function He(N){if(d){if(N.key==="Escape"){N.preventDefault(),N.stopImmediatePropagation(),U("Transformación de líneas 3D cancelada");return}if(v==="angle"){if(N.key==="Enter"||N.key===" "){if(!L())return}else if(N.key==="Backspace")E=E.slice(0,-1);else if(/^[0-9eE+\-*/().,\s]$/.test(N.key))E+=N.key;else return;if(N.preventDefault(),N.stopImmediatePropagation(),v==="angle"){const ne=bi(E);W(ne)||(x(),a(`Precise ángulo de giro · ${E}`),s())}return}H.keydown(N)&&(N.preventDefault(),N.stopImmediatePropagation())}}function Ge(N){!d||!H.isActive()||!H.keyup(N)||(N.preventDefault(),N.stopImmediatePropagation())}return t.addEventListener("pointermove",fe,!0),t.addEventListener("pointerdown",ce,!0),t.addEventListener("click",pe,!0),t.addEventListener("contextmenu",Ie,!0),t.addEventListener("keydown",He,!0),t.addEventListener("keyup",Ge,!0),{cancel:()=>U("Transformación de líneas 3D cancelada"),dispose(){U(),t.removeEventListener("pointermove",fe,!0),t.removeEventListener("pointerdown",ce,!0),t.removeEventListener("click",pe,!0),t.removeEventListener("contextmenu",Ie,!0),t.removeEventListener("keydown",He,!0),t.removeEventListener("keyup",Ge,!0),u.remove(l),ct(l)},isActive:()=>d,startCopy:N=>ee("copy",N),startMove:N=>ee("move",N),startRotate:N=>ee("rotate",N)};function Ie(N){d&&(N.preventDefault(),N.stopImmediatePropagation())}}const Za="webcad-push-silhouette",cc="webcad-push-generatrix-silhouette",uc="webcad-push-hidden-edges",dc="webcad-push-visible-edges",zn=1e-9,ZE=10;function Xu(e){return e?.metadata?.type==="profileFeature"||Array.isArray(e?.metadata?.profileFeatures)}function fn(e){return new Q(Number(e.x)||0,Number(e.y)||0,Number(e.z)||0)}function JE(e){return e.matrixWorld.elements.map(t=>t.toFixed(4)).join(",")}function QE(e,t){return e<t?`${e}:${t}`:`${t}:${e}`}function Yu(e,t){const n=e.map(a=>fn(t[a])).filter(Boolean);if(n.length<3)return null;const i=n.reduce((a,o)=>a.add(o),new Q).multiplyScalar(1/n.length);let r=null;for(let a=1;a<n.length-1;a+=1){const o=new Q().subVectors(n[a],n[0]).cross(new Q().subVectors(n[a+1],n[0]));if(o.lengthSq()>zn){r=o.normalize();break}}return r?{center:i,normal:r}:null}function fr(e,t){const n=new Q().subVectors(t.position,e.center);return e.normal.dot(n)>=0}function e0(e,t){const n=new Set(e?.metadata?.smoothVerticalEdgeIndices||e?.metadata?.smoothProfileVertexIndices||[]);Mo(e,e?.metadata?.cadProfileVertexIndices).forEach(a=>n.add(a));const i=e?.vertices?.[t[0]],r=e?.vertices?.[t[1]];return n.has(Math.min(t[0],t[1]))&&i&&r&&Math.abs(i.x-r.x)<=zn&&Math.abs(i.y-r.y)<=zn&&Math.abs(i.z-r.z)>zn}function $u(e){const t=Array.isArray(e?.vertices)?e.vertices:[],n=Array.isArray(e?.faces)?e.faces:[],i=n.map(a=>Yu(a,t)),r=new Map;return n.forEach((a,o)=>{for(let s=0;s<a.length;s+=1){const u=a[s],l=a[(s+1)%a.length],h=QE(u,l);r.has(h)||r.set(h,{edge:[u,l],faces:[]}),r.get(h).faces.push(o)}}),{vertices:t,faceInfos:i,edgeFaces:r}}function t0(e,t,n){return e.map(i=>t[i]).filter(Boolean).map(i=>fr(i,n))}function go(e,t){const n=e[t[0]],i=e[t[1]];return!n||!i?null:{start:{x:n.x,y:n.y,z:n.z},end:{x:i.x,y:i.y,z:i.z}}}function Ku(e,t,n,i=new Set){const{vertices:r,faceInfos:a,edgeFaces:o}=$u(e);if(!r.length||!a.length||!t)return[];const s=[];return o.forEach(({edge:u,faces:l})=>{const h=t0(l,a,t),d=h.length<2,c=h.length>=2&&h.some(Boolean)&&!h.every(Boolean);if(!d&&!c||e0(e,u)!==n||n&&i.has(Math.min(u[0],u[1])))return;const m=go(r,u);m&&s.push(m)}),s}function n0(e,t){return Xu(e)?[]:Ku(e,t,!1)}function i0(e){const t=Number(e?.metadata?.profileSize),n=Number(e?.vertices?.length)/2,i=Number.isInteger(t)&&t>=3?t:Number.isInteger(n)&&n>=3?n:0;if(!i)return null;const r=Array.isArray(e?.metadata?.profileLoopSizes)?e.metadata.profileLoopSizes.map(Number):[i];return{loopSizes:r.every(o=>Number.isInteger(o)&&o>=3)&&r.reduce((o,s)=>o+s,0)===i?r:[i],profileSize:i}}function r0(e,t,n,i){if(!e.indices.every(c=>i.has(c)))return null;const r=e.indices.map(c=>t.vertices[c]),a=r.reduce((c,m)=>({x:c.x+m.x/r.length,y:c.y+m.y/r.length}),{x:0,y:0}),o=r.map(c=>Math.hypot(c.x-a.x,c.y-a.y)),s=o.reduce((c,m)=>c+m,0)/o.length,u=Math.max(1e-7,s*1e-6);if(s<=u||o.some(c=>Math.abs(c-s)>u))return null;const l=r.reduce((c,m)=>c+m.z,0)/r.length,h=e.indices.map(c=>t.vertices[c+n]);if(h.some(c=>!c))return null;const d=h.reduce((c,m)=>c+m.z,0)/h.length;return{center:a,radius:s,lowerZ:l,upperZ:d}}function a0(e,t){if(t?.isOrthographicCamera){const l=new Q;t.getWorldDirection(l);const h=Math.hypot(l.x,l.y);if(h<=zn)return[];const d={x:-l.y/h,y:l.x/h};return[-1,1].map(c=>({x:e.center.x+d.x*e.radius*c,y:e.center.y+d.y*e.radius*c}))}const n=new Q;t.getWorldPosition(n);const i=n.x-e.center.x,r=n.y-e.center.y,a=i*i+r*r,o=e.radius*e.radius;if(a<=o+zn)return[];const s=o/a,u=e.radius*Math.sqrt(a-o)/a;return[-1,1].map(l=>({x:e.center.x+i*s-r*u*l,y:e.center.y+r*s+i*u*l}))}function o0(e,t){const n=i0(e);if(!n)return{coveredIndices:new Set,segments:[]};const i=new Set(e?.metadata?.smoothVerticalEdgeIndices||e?.metadata?.smoothProfileVertexIndices||[]);Mo(e,e?.metadata?.cadProfileVertexIndices).forEach(s=>i.add(s));const r=new Set,a=[];let o=0;return n.loopSizes.forEach(s=>{const u=Array.from({length:s},(h,d)=>o+d),l=r0({indices:u},e,n.profileSize,i);l&&(u.forEach(h=>r.add(h)),a0(l,t).forEach(h=>a.push({start:{x:h.x,y:h.y,z:l.lowerZ},end:{x:h.x,y:h.y,z:l.upperZ}}))),o+=s}),{coveredIndices:r,segments:a}}function _o(e,t){if(e.closed)return!0;const n=a=>{const o=a%(Math.PI*2);return o<0?o+Math.PI*2:o},i=e.clockwise?n(e.endAngle-e.startAngle):n(e.startAngle-e.endAngle);return(e.clockwise?n(t-e.startAngle):n(e.startAngle-t))<=i+1e-6}function s0(e,t){let n=0,i=0;if(t?.isOrthographicCamera){const l=new Q;if(t.getWorldDirection(l),n=l.dot(fn(e.uAxis))/e.radiusX,i=l.dot(fn(e.vAxis))/e.radiusY,Math.hypot(n,i)<=zn)return[];const h=Math.atan2(i,n);return[h+Math.PI/2,h-Math.PI/2].filter(d=>_o(e,d))}const r=new Q;t.getWorldPosition(r);const a=r.sub(fn(e.center));n=a.dot(fn(e.uAxis))/e.radiusX,i=a.dot(fn(e.vAxis))/e.radiusY;const o=Math.hypot(n,i);if(o<=1+zn)return[];const s=Math.atan2(i,n),u=Math.acos(1/o);return[s+u,s-u].filter(l=>_o(e,l))}function l0(e,t){const n=fn(t.offset),i=n.length();if(i<=zn)return null;const r=n.multiplyScalar(1/i),a=fn(e).sub(fn(t.center)),o=a.dot(r);if(o<-1e-4||o>i+1e-4)return null;a.addScaledVector(r,-o);const s=a.dot(fn(t.uAxis))/t.radiusX,u=a.dot(fn(t.vAxis))/t.radiusY,l=Math.atan2(u,s);return Math.abs(Math.hypot(s,u)-1)>.002||!_o(t,l)?null:{angle:l,parameter:o/i}}function fc(e,t){return Math.abs(Math.atan2(Math.sin(e-t),Math.cos(e-t)))}function c0(e,t,n,i){const a=[...new Set(i.flatMap((s,u)=>s===t.id?[u]:[]))].flatMap(s=>{const u=(e.faces?.[s]??[]).map(d=>l0(e.vertices?.[d],t));if(!u.length||u.some(d=>!d))return[];const l=Math.atan2(u.reduce((d,c)=>d+Math.sin(c.angle),0),u.reduce((d,c)=>d+Math.cos(c.angle),0)),h=Math.max(...u.map(d=>fc(d.angle,l)));return fc(n,l)>h+.001?[]:[{start:Math.max(0,Math.min(...u.map(d=>d.parameter))),end:Math.min(1,Math.max(...u.map(d=>d.parameter)))}]}).sort((s,u)=>s.start-u.start),o=[];return a.forEach(s=>{const u=o[o.length-1];if(u&&s.start<=u.end+1e-4){u.end=Math.max(u.end,s.end);return}o.push({...s})}),o.filter(s=>s.end-s.start>1e-6)}function u0(e,t,n,i){const r=new Set;return n.flatMap(a=>s0(a,t).flatMap(o=>{const s=sr(a,o);return c0(e,a,o,i).flatMap(u=>{const l={x:s.x+a.offset.x*u.start,y:s.y+a.offset.y*u.start,z:s.z+a.offset.z*u.start},h={x:s.x+a.offset.x*u.end,y:s.y+a.offset.y*u.end,z:s.z+a.offset.z*u.end},d=[l,h].map(c=>`${c.x.toFixed(5)}:${c.y.toFixed(5)}:${c.z.toFixed(5)}`).join("|");return r.has(d)?[]:(r.add(d),[{start:l,end:h}])})}))}function d0(e,t){if(Xu(e)){const i=wo(e),r=i.sideSurfaces,a=u0(e,t,r,i.faceSurfaceIds);if(r.length)return a;const o=e.metadata?.curvedFeatureGeneratrices??[],s=e.faces.map(c=>Yu(c,e.vertices));if(o.length)return o.flatMap(c=>{const m=s[c?.beforeFaceIndex],v=s[c?.afterFaceIndex];if(!m||!v||fr(m,t)===fr(v,t))return[];const y=go(e.vertices,[c.startIndex,c.endIndex]);return y?[y]:[]});const u=e.metadata?.faceVertexNormals??[],l=new Set(u.flatMap((c,m)=>{if(!Array.isArray(c)||c.length<2)return[];const v=fn(c[0]);return c.slice(1).some(y=>v.distanceTo(fn(y))>zn)?[m]:[]})),{vertices:h,edgeFaces:d}=$u(e);return[...d.values()].flatMap(({edge:c,faces:m})=>{if(m.length!==2||!m.every(f=>l.has(f)))return[];const[v,y]=m.map(f=>s[f]);if(!v||!y||fr(v,t)===fr(y,t))return[];const p=go(h,c);return p?[p]:[]})}const n=o0(e,t);return[...n.segments,...Ku(e,t,!0,n.coveredIndices)]}function f0(e,t,n={}){if(!e||e.userData?.type!=="webcad-push-solid-group")return null;const i=e.children.find(x=>x.userData?.type==="webcad-push-solid"),r=e.children.find(x=>x.userData?.type==="webcad-push-solid-edges"),a=e.children.find(x=>x.userData?.type==="webcad-push-solid-tangent-edges"),o=i?.userData?.analyticSolid??i?.userData?.solid;if(!o)return null;const s=JE(t),u=Math.max(1,Math.round(Number(n.visibilitySamples)||ZE)),l=e.getObjectByName(Za)??null;if(e.userData.silhouetteCameraKey===s&&Number(e.userData.silhouetteVisibilitySamples)>=u||n.deferCameraRefresh===!0&&e.userData.silhouetteCameraKey&&l)return l;r&&(r.visible=!0);const h=e.getObjectByName(dc);h&&(e.remove(h),ct(h));const d=Ll({camera:t,mesh:i,occluders:n.occluders,segments:r?.userData?.sourceSegments,sourceEdgeIndices:r?.userData?.sourceEdgeIndices,curveGroupIds:r?.userData?.curveGroupIds,visibilitySamples:u}),c=d.visible,m=tn(c.map(x=>x.segment),{color:n.color??Ze.edgeColor,depthTest:!1,depthWrite:!1,linewidth:n.linewidth??Ze.edgeLineWidth,renderOrder:n.renderOrder??Ze.edgeRenderOrder+2});m.name=dc,m.userData={type:"webcad-push-visible-edge-overlay",measurementSegments:c.map(x=>x.measurementSegment),segmentCount:m.userData.segmentCount,sourceEdgeIndices:c.map(x=>x.sourceEdgeIndices),curveGroupIds:c.map(x=>x.curveGroupId),sourceSegments:c.map(x=>x.segment)},e.add(m);const v=e.getObjectByName(Za);v&&(e.remove(v),ct(v));const y=tn(n0(o,t),{color:n.color??Ze.edgeColor,depthBias:Ze.edgeDepthBias,depthFunc:zi,depthTest:!0,depthWrite:!1,linewidth:n.linewidth??Ze.edgeLineWidth,polygonOffset:!0,polygonOffsetFactor:Ze.edgePolygonOffsetFactor,polygonOffsetUnits:Ze.edgePolygonOffsetUnits,renderOrder:n.renderOrder??Ze.edgeRenderOrder+1});y.name=Za,y.userData={type:"webcad-push-silhouette",segmentCount:y.userData.segmentCount},e.add(y);const p=e.getObjectByName(cc);p&&(e.remove(p),ct(p));const f=d0(o,t),E=tn(f,{color:n.color??Ze.edgeColor,depthBias:Ze.edgeDepthBias,depthFunc:zi,depthTest:!0,depthWrite:!1,linewidth:n.linewidth??Ze.edgeLineWidth,polygonOffset:!0,polygonOffsetFactor:Ze.edgePolygonOffsetFactor,polygonOffsetUnits:Ze.edgePolygonOffsetUnits,renderOrder:n.renderOrder??Ze.edgeRenderOrder+1});E.name=cc,E.visible=e.userData.showCurveGeneratrices!==!1,E.userData={type:"webcad-push-generatrix-silhouette",segmentCount:E.userData.segmentCount,sourceSegments:f},e.add(E);const A=e.getObjectByName(uc);A&&(e.remove(A),ct(A));const _=[...a?.userData?.sourceSegments||[],...f],S=Ll({camera:t,mesh:i,occluders:n.occluders,segments:_,visibilitySamples:u}).hidden,b=[...d.hidden.map(x=>x.segment),...S.map(x=>x.segment)],C=tn(b,{color:n.hiddenColor??Ze.hiddenEdgeColor,dashSize:4.8,dashed:!0,depthTest:!1,depthWrite:!1,gapSize:3,linewidth:n.hiddenLinewidth??Ze.hiddenEdgeLineWidth,opacity:n.hiddenOpacity??Ze.hiddenEdgeOpacity,renderOrder:(n.renderOrder??Ze.edgeRenderOrder)-1,transparent:!0});return C.name=uc,C.visible=e.userData.showHiddenEdges===!0,C.userData={type:"webcad-push-solid-hidden-edges",segmentCount:C.userData.segmentCount,sourceSegments:b},e.add(C),e.userData.silhouetteCameraKey=s,e.userData.silhouetteVisibilitySamples=u,y}function p0(e,t,n={}){const i=[];e?.traverse?.(o=>{o.userData?.type==="webcad-push-solid-group"&&i.push(o)});const r=i.flatMap(o=>o.children?.filter(s=>s.userData?.type==="webcad-push-solid")??[]),a=[];return i.forEach(o=>{const s=f0(o,t,{...n,occluders:r});s&&a.push(s)}),a}function Xn(e,t=0){const n=Number(e);return Number.isFinite(n)?n:t}function h0(e,t,{extrusionMargin:n=24,minimumNear:i=1e-4}={}){const r=e?.min??{},a=e?.max??{},o=Xn(r.x),s=Xn(r.y),u=Xn(r.z),l=Xn(a.x,o),h=Xn(a.y,s),d=Xn(a.z,u),c={x:(o+l)*.5,y:(s+h)*.5,z:(u+d)*.5},m=Math.max(Math.hypot(l-o,h-s,d-u)*.5,.001),v=Math.hypot(Xn(t?.x)-c.x,Xn(t?.y)-c.y,Xn(t?.z)-c.z),y=v-m,p=y>0?Math.max(i,y*.5):Math.max(i,m/1e3);return{far:Math.max(p*2,v+m*Math.max(2,n)),near:p}}const Ja=70,m0=new Set(["webcad-push-solid-edges","webcad-push-solid-tangent-edges","webcad-push-visible-edge-overlay","webcad-push-silhouette","webcad-push-generatrix-silhouette","webcad-push-solid-hidden-edges"]);function Qa(){return globalThis.performance?.now?.()??Date.now()}function g0(e,t,n="XY",i=null){const r=e?.localFace??e,a=e?.line3dGroupId??r?.line3dGroupId??null,o=Tr(r);if(o==="profileFeature"){const s=t?.height??null,u=e.supportContactOnly===!0||s>=0,l=i?.metadata?.exactGeometry?.operations?.at(-1)??i?.metadata?.profileFeatures?.at(-1)??null,h=l?.type===(u?"union":"subtract")&&Math.abs(Number(l.requestedDistance??l.distance)-Number(s))<=1e-9?l:null,d=h?.analyticRegionId??e.analyticRegionId??null;return{type:u?"pushUnionProfile":"pushSubtractProfile",distance:s,tangentContact:e.supportContactOnly===!0,sourceSolidDocumentId:r.sourceSolidDocumentId??null,sourceSolidFaceIndices:r.sourceSolidFaceIndices??null,sketchPlane:r.sketchPlane??n,sketchId:r.sketchId??null,...a?{line3dGroupId:a}:{},workplane:r.workplane??null,exactProfile:h?.exactProfile??r.exactProfile??null,analyticRegionId:d,sourceKey:Su(d)??t?.sourceKey??ci(r)}}return o==="moveFace"?{type:"pushMoveFace",distance:t?.height??null,sourceSolidDocumentId:r.sourceSolidDocumentId??null,sourceSolidFaceIndex:r.sourceSolidFaceIndex??null,sourceSolidFaceIndices:r.sourceSolidFaceIndices??null,sketchPlane:r.sketchPlane??n,sketchId:r.sketchId??null,...a?{line3dGroupId:a}:{},workplane:r.workplane??null,sourceKey:t?.sourceKey??ci(r)}:{type:"pushFromProfile",distance:t?.height??null,sourceEntityId:r?.sourceEntity?.id??r?.sourceEntity?.handle??null,sourceEntityType:r?.sourceEntity?.type??null,sketchPlane:r?.sketchPlane??n,sketchId:r?.sketchId??null,...a?{line3dGroupId:a}:{},workplane:r?.workplane??null,sourceKey:t?.sourceKey??ci(r)}}async function x0(e,{doc:t=null,entities:n=[],getNavigationDevice:i=()=>"trackpad",gridVisible:r=!0,axesVisible:a=!0,navigationDevice:o=i(),sketchPlane:s=t?.model3d?.sketchPlane??"XY",onEdgeInfo:u=null,onStatus:l=null}={}){if(!e)throw new TypeError("La vista Three.js necesita un canvas propio");await $f();const h=new Kf;h.background=new St(Qe.background);const d=new pr(36,1,.01,1e6);d.up.set(0,0,1);const c=new j_({canvas:e,antialias:!0});c.setPixelRatio(Math.min(globalThis.devicePixelRatio||1,2)),c.outputColorSpace=pc;const m=new J_(d,c.domElement);m.enableDamping=!1,m.screenSpacePanning=!0;let v=null,y=null,p=null,f=null,E=null,A=null,_=null,S=null,b=null,C=null,x=null,R=null,U=null,D=null;const B=new Set,Z=new Set;let k=!1,I=null,W=null,L=null,H=!1,ee=!1,fe=1,ce=1,pe=r!==!1,He=a!==!1,Ge=Da(s),Ie=!1,N=-1/0,ne=!1,ae=null,q=!1;const ue=new Map,se=new Set,Ee=new Qn().makeEmpty(),z=new Map,re=new Map,de=new Set,me=new Set;function Ye(){if(ae=null,ee||se.size)return;const w=Ja-(Qa()-N);if(w>1){ae=globalThis.setTimeout(Ye,w);return}pt(!1),ne=!0,it()}function Fe(){ae===null&&(ae=globalThis.setTimeout(Ye,Ja))}function et(){N=Qa(),pt(!0),Fe()}function at(w){se.add(w.pointerId)}function ut(w){ee||(se.delete(w.pointerId),!se.size&&(pt(!1),ne=!0,it()))}function pt(w){if(q=w===!0,q){h.traverse(F=>{m0.has(F.userData?.type)&&(ue.has(F)||ue.set(F,F.visible),F.visible=!1)});return}ue.forEach((F,oe)=>{oe.visible=F}),ue.clear()}m.addEventListener("change",et);const P=new Qt;P.name="webcad-3d-sketchup-lights",P.add(new qf(16777215,.58),new jf(16777215,1.35)),P.children[1].position.set(180,-220,360),h.add(P);const De=PE({camera:d,canvas:c.domElement,controls:m,getNavigationDevice:i,render:it,viewport:()=>({width:fe,height:ce})});De.setNavigationDevice(o);const Pe=new Wi,T=new Ke;function g(w=Vr(Ge)){const F=gr(w);return new ui().makeBasis(new Q(F.xAxis.x,F.xAxis.y,F.xAxis.z),new Q(F.yAxis.x,F.yAxis.y,F.yAxis.z),new Q(F.normal.x,F.normal.y,F.normal.z)).setPosition(F.origin.x,F.origin.y,F.origin.z)}function V(w,F){return w?.applyMatrix4?.(g(F)),w}function Y(w,F){const oe=w?.points?.[0],_e=F?.point,Xe=w?.normal??{x:0,y:0,z:1};if(!oe||!_e)return!1;const je=Number(oe.x),ye=Number(oe.y),nt=Number(oe.z??0),Ct=Number(_e.x),kt=Number(_e.y),lt=Number(_e.z??0),Wt=Number(Xe.x??0),Nt=Number(Xe.y??0),Ut=Number(Xe.z??0),Tt=(Ct-je)*Wt+(kt-ye)*Nt+(lt-nt)*Ut;return Number.isFinite(Tt)&&Math.abs(Tt)>1e-9}const X=$v({camera:d,canvas:c.domElement,controls:m,getSelectedFace:()=>f,getObjectSnap:(w,F)=>jr({camera:d,canvas:c.domElement,event:w,solidObjects:X.getSolidObjects?.()??[],maxDistancePixels:20,includeHidden:Ie,acceptCandidate:oe=>Y(F,oe)}),onObjectSnap:ve,onConsumeFace:(w,F,oe)=>{const _e=w?.userData?.face,Xe=oe?.sourceKey||ci(w?.userData?.face),je=F?.userData?.solid??null,ye=_e?.sourceSolidDocumentId??null;let nt=null;if(t&&je){const kt=g0(_e,oe,Ge,je);nt=ye?t.replace3dSolid?.(ye,je,{operation:kt}):t.add3dSolid?.(je,{operation:kt}),nt&&(X.tagDocumentSolidGroup?.(F,nt),Re(nt.id),_e?.line3dGroupId?(t.set3dLineGroupVisibility?.(_e.line3dGroupId,!1,{recordHistory:!1}),y?.children?.forEach(lt=>{lt.userData?.lineGroupId===_e.line3dGroupId&&(lt.visible=!1)}),p?.traverse?.(lt=>{(lt.userData?.line3dGroupId===_e.line3dGroupId||lt.userData?.face?.line3dGroupId===_e.line3dGroupId)&&(lt.visible=!1)}),(t?.model3d?.lines??[]).filter(lt=>lt.groupId===_e.line3dGroupId).forEach(lt=>B.delete(lt.id))):_e?.sketchId&&(t.set3dSketchVisibility?.(_e.sketchId,!1,{recordHistory:!1}),v?.traverse?.(lt=>{lt.userData?.sketchId===_e.sketchId&&(lt.visible=!1)}),p?.traverse?.(lt=>{lt.userData?.sketchId===_e.sketchId&&(lt.visible=!1)})))}Xe&&(nt||z.set(Xe,{height:oe.height,sourceKey:Xe}),me.add(Xe));const Ct=w?.userData?.face?.sourceEntity;Ct&&(nt||re.set(Ct,{height:oe.height,sourceKey:Xe}),de.add(Ct)),we(),w===f&&(w?.userData?.transientSelection&&(h.remove(w),ct(w)),f=null),it()},onStatus:l,render:it,scene:h,viewport:()=>({width:fe,height:ce})});function he(){return Array.isArray(t?.model3d?.solids)?t.model3d.solids.filter(w=>w?.visible!==!1&&w?.solid):[]}function Me(w){return w?.metadata?.sourceKey??w?.solid?.metadata?.sourceKey??w?.operation?.sourceKey??null}function J(){if(f){if(f.userData?.transientSelection){h.remove(f),ct(f);return}f.material&&(f.material.color.set(f.userData.defaultColor??16118507),f.material.opacity=f.userData.defaultOpacity??1,f.material.transparent=f.userData.defaultTransparent===!0)}}function te(w){!w?.material||w===f||(w.material.color.set(w.userData.defaultColor??16118507),w.material.opacity=w.userData.defaultOpacity??1,w.material.transparent=w.userData.defaultTransparent===!0)}function ge(){te(E),E=null,A&&(h.remove(A),ct(A),A=null)}function Oe(){b&&(h.remove(b),ct(b),b=null,C=null)}function xe(){const w=_??S,F=w===S&&!_,oe=w?`${w.key}:${F?"selected":"hovered"}`:null;if(oe===C){u?.(w);return}if(Oe(),u?.(w),!w?.start||!w?.end)return;const _e=Array.isArray(w.segments)&&w.segments.length?w.segments:[w];b=tn(_e,{color:F?16756782:52198,depthTest:!1,depthWrite:!1,linewidth:F?5:4,renderOrder:64}),b.name="webcad-selected-solid-edge",b.userData={...b.userData,documentSolidId:w.documentSolidId,edge:w,type:F?"webcad-solid-edge-selection":"webcad-solid-edge-hover"},C=oe,h.add(b)}function Ae(w=null){_?.key!==w?.key&&(_=w,xe())}function Ue(){_&&(_=null,xe())}function $e(w=null){_=null,S=w,xe()}function Je(w){w===E&&!A||(ge(),!(!w||w===f||!w.material)&&(E=w,w.material.color.set(16768901),w.material.opacity=.72,w.material.transparent=!0))}function O(w){if(!w){ge();return}if(A?.userData?.faceId===w.id||(ge(),f?.userData?.faceId===w.id))return;const F=qa(w);F&&(F.name=`webcad-hovered-${w.id}`,F.renderOrder=US,F.material.color.set(16768901),F.material.opacity=.38,F.userData.type="webcad-solid-face-hover",A=F,h.add(F))}function ve(w){if(!w?.point){x&&(x.visible=!1);return}if(!x){const oe=new fi;oe.setAttribute("position",new Sr([0,0,0],3));const _e=new ep({color:55807,depthTest:!1,depthWrite:!1,size:13,sizeAttenuation:!1});x=new tp(oe,_e),x.name="webcad-3d-object-snap",x.renderOrder=60,h.add(x)}const F={origin:16777215,endpoint:55807,midpoint:4773979,center:16732120,quadrant:16747586,faceCenter:16764749};x.position.set(Number(w.point.x),Number(w.point.y),Number(w.point.z)),x.material.color.setHex(F[w.type]??F.endpoint),x.visible=!0}function ie(w,F){const oe=w?.material;oe?.emissive&&(w.userData.defaultEmissive===void 0&&(w.userData.defaultColor=oe.color.getHex(),w.userData.defaultEmissive=oe.emissive.getHex(),w.userData.defaultEmissiveIntensity=oe.emissiveIntensity),oe.color.setHex(F?16754719:w.userData.defaultColor),oe.emissive.setHex(F?5908480:w.userData.defaultEmissive),oe.emissiveIntensity=F?.5:w.userData.defaultEmissiveIntensity)}function Se(w=[]){Z.clear(),w.forEach(F=>{F&&Z.add(F)}),(X.getSolidObjects?.()??[]).forEach(F=>{const oe=Z.has(F.userData?.documentSolidId);F.traverse?.(_e=>ie(_e,oe))})}function Re(w){Se(w?[w]:[])}function le(){y?.children?.forEach(w=>{const F=B.has(w.userData?.lineId);w.material?.color?.setHex(F?16765286:Qe.drawingColor),w.material&&(w.material.linewidth=F?Qe.drawingLineWidth+1:Qe.drawingLineWidth,w.material.needsUpdate=!0)})}function Ve(){return B.size?(B.clear(),le(),!0):!1}function Be(w,{toggle:F=!1}={}){return w?(F&&B.has(w)?B.delete(w):B.add(w),le(),!0):!1}function At(w){return w?(Z.add(w),(X.getSolidObjects?.()??[]).forEach(F=>{const oe=Z.has(F.userData?.documentSolidId);F.traverse?.(_e=>ie(_e,oe))}),!0):!1}function ot(w){w!==f&&X.isActive()&&X.cancel(),ge(),$e(null),J(),f=w||null,Se(),f?.material&&(f.material.color.set(f.userData.selectedColor??16765286),f.material.opacity=1,f.material.transparent=f.userData?.transientSelection===!0,l?.(f.userData?.type==="webcad-push-solid-face-selection"?"Cara de solido seleccionada":"Recinto seleccionado")),it()}function rn(w,F){!w?.userData||!F||(w.userData.pushStartPointer={x:F.clientX,y:F.clientY})}function jt(w){const F=c.domElement.getBoundingClientRect();T.x=(w.clientX-F.left)/Math.max(1,F.width)*2-1,T.y=-((w.clientY-F.top)/Math.max(1,F.height)*2-1),Pe.setFromCamera(T,d)}function Lr(w=4){return eS(X.getSolidObjects?.()??[],d,T,{width:fe,height:ce},{includeHidden:Ie,maxDistancePixels:w})}function ri(w){return new Q(Number(w?.x)||0,Number(w?.y)||0,Number(w?.z)||0)}function $i(w,F,oe=1e-7){return!F||!w?.point?!0:ri(w.point).distanceTo(ri(F))>oe}function Vn(){const w=X.getSolidObjects?.()??[];return w.length?Pe.intersectObjects(w,!0).find(F=>F?.object?.userData?.type==="webcad-push-solid"):null}function Ai(w){if(!w?.sourceSolidDocumentId)return w;const F=t?.model3d?.solids?.find(oe=>oe?.id===w.sourceSolidDocumentId);return OS(w,F?.placement)}function Nr(w){for(let F=w;F;F=F.parent)if(F.visible===!1)return!1;return!0}function Ki(){return p?.children.length?Pe.intersectObjects(p.children,!0).filter(w=>w?.object?.userData?.type==="webcad-simple-face"&&Nr(w.object)).sort((w,F)=>{const oe=(Number(w.object.userData?.face?.area)||1/0)-(Number(F.object.userData?.face?.area)||1/0);return Math.abs(oe)>1e-9?oe:w.distance-F.distance})[0]??null:null}function Hn(){if(!y?.children?.length)return null;const w=Pe.intersectObjects(y.children,!0).find(F=>F?.object?.userData?.lineId);return w?{hit:w,lineId:w.object.userData.lineId,groupId:w.object.userData.lineGroupId}:null}function qi(w,F,oe){const _e=oe.x-F.x,Xe=oe.y-F.y,je=_e*_e+Xe*Xe;if(je<=1e-12)return w.distanceTo(F);const ye=ii.clamp(((w.x-F.x)*_e+(w.y-F.y)*Xe)/je,0,1);return w.distanceTo(new Ke(F.x+_e*ye,F.y+Xe*ye))}function ji(w=7){const F=new Ke((T.x+1)*fe*.5,(1-T.y)*ce*.5);let oe=null;return(X.getSolidObjects?.()??[]).forEach(_e=>{const Xe=_e.children?.find(ye=>ye.userData?.type==="webcad-push-solid"),je=Xe?.userData?.analyticSolid??Xe?.userData?.solid;Xe?.updateWorldMatrix?.(!0,!1),(je?.metadata?.tangentEdges??[]).forEach(ye=>{const nt=je.vertices?.[ye.startIndex],Ct=je.vertices?.[ye.endIndex];if(!nt||!Ct)return;const kt=ri(nt).applyMatrix4(Xe.matrixWorld),lt=ri(Ct).applyMatrix4(Xe.matrixWorld),Wt=kt.clone().project(d),Nt=lt.clone().project(d);if(Wt.z<-1&&Nt.z<-1||Wt.z>1&&Nt.z>1)return;const Ut=new Ke((Wt.x+1)*fe*.5,(1-Wt.y)*ce*.5),Tt=new Ke((Nt.x+1)*fe*.5,(1-Nt.y)*ce*.5),an=qi(F,Ut,Tt),mn=kt.clone().add(lt).multiplyScalar(.5),Wn=d.position.distanceTo(mn);if(an>w||oe&&(an>oe.screenDistance+.25||Math.abs(an-oe.screenDistance)<=.25&&Wn>=oe.cameraDistance))return;const Ft=Ai(zu(Xe,ye.planarGroupIndex));Ft&&(oe={cameraDistance:Wn,face:Ft,screenDistance:an})})}),oe?.face??null}function Zi(w){if(X.isActive()||R?.isActive()||U?.isActive()||D?.isActive()||k||w.buttons){ge(),Ue();return}jt(w);const F=Lr();if(F){ge(),Ae(F),it();return}Ue();const oe=Ki();if(oe){Je(oe.object),it();return}const _e=ji();if(_e){O(_e),it();return}const Xe=Ai(Jl(Vn()));if(Xe){O(Xe),it();return}ge(),it()}function hi(){ge(),Ue(),it()}function Ur(w,F=Vn()){const oe=Ai(Jl(F));if(!oe)return!1;const _e=qa(oe);return _e?(rn(_e,w),h.add(_e),ot(_e),!0):!1}function mi(w){if(X.isActive())return;jt(w);const F=Hn();if(F){ot(null),$e(null),Se(),Be(F.lineId,{toggle:w.shiftKey||w.ctrlKey||w.metaKey});const ye=B.size;l?.(`${ye} línea${ye===1?"":"s"} 3D seleccionada${ye===1?"":"s"}`),it();return}Ve();const oe=Vn();if(k){const ye=oe?.object?.userData?.documentSolidId??null;if(ye){At(ye);const nt=Z.size;l?.(`Borrar ${nt} solido${nt===1?"":"s"} · confirme con Enter, Espacio o clic derecho`),it()}else l?.("Borrar solido · seleccione una cara de un solido 3D");return}const _e=Lr();if(_e){ge(),ot(null),$e(_e);const ye=Number(_e.length),nt=Number.isFinite(ye)?ye.toLocaleString("es-ES",{maximumFractionDigits:3}):"-";l?.(`Arista seleccionada · ${nt} mm`),it();return}$e(null);const Xe=Ki();if(Xe?.object?.userData?.type==="webcad-simple-face"){rn(Xe.object,w),ot(Xe.object);return}const je=ji();if(je){const ye=qa(je);if(ye){rn(ye,w),h.add(ye),ot(ye);return}}Ur(w,oe)||(ot(null),l?.(""))}function Ji(w){if(X.isActive()||k)return;jt(w);const F=Vn()?.object?.userData?.documentSolidId??null;F&&(w.preventDefault(),ot(null),Re(F),l?.("Solido 3D seleccionado"),it())}function xn(){return typeof t?.topLevelEntities=="function"?t.topLevelEntities():[]}function Ma(w){if(X.isActive())return!1;const F=[...new Set(w)].filter(Xe=>t?.model3d?.solids?.some(je=>je?.id===Xe));if(!F.length)return l?.("Seleccione solidos 3D para borrar"),!1;k=!1,ot(null);const[oe,..._e]=F;return t.remove3dSolid?.(oe),_e.forEach(Xe=>t.remove3dSolid?.(Xe,{recordHistory:!1})),ft(xn(),{preserveView:!0}),l?.(`${F.length} solido${F.length===1?"":"s"} 3D eliminado${F.length===1?"":"s"}`),!0}function Qi(){return Ma([...Z])}function er(){if(U?.isActive()||D?.isActive())return!1;const w=[...B].filter(oe=>t?.model3d?.lines?.some(_e=>_e?.id===oe&&_e.locked!==!0));if(!w.length)return!1;const F=t.remove3dLines?.(w)??0;return F?(B.clear(),ft(xn(),{preserveView:!0}),l?.(`${F} línea${F===1?"":"s"} 3D borrada${F===1?"":"s"}`),!0):!1}function ya(){return er()||Qi()}function M(){if(B.size)return er();k=!0,J(),f=null;const w=Z.size;return l?.(w?`Borrar ${w} solido${w===1?"":"s"} · seleccione mas o confirme con Enter, Espacio o clic derecho`:"Borrar: seleccione solidos y confirme con Enter, Espacio o clic derecho"),!0}function G(){return k?Qi():!1}function j(){return k?(k=!1,Se(),l?.(""),!0):!1}function $(w){k&&(w.preventDefault(),G())}function K(w){if(w.key.toLowerCase()==="k"){w.preventDefault(),Le();return}if(w.key==="Escape"){if(j())return;if(S){$e(null),l?.(""),it();return}if(f){ot(null),l?.("");return}B.size&&(Ve(),l?.(""),it())}}function Ce(w){Ie=w===!0,X.setHiddenEdges(Ie),l?.(Ie?"Aristas ocultas visibles":"Aristas ocultas ocultas")}function Le(){return Ce(!Ie),Ie}function we(){v?.traverse?.(w=>{const F=w.userData?.entity;if(!F)return;const oe=vu(F)||w.userData?.entityKey;w.visible=!(de.has(F)||me.has(oe))}),it()}function ze(w,F){W&&(h.remove(W),ct(W)),I&&(h.remove(I),ct(I)),L&&(h.remove(L),ct(L));const oe=en(w,Vr(Ge));W=cu(w,F),I=Cx(new Q(oe.x,oe.y,oe.z),F,{includeGround:!1,visible:pe}),V(I),L=Ix(F),L.visible=He,h.add(W,I,L),wi(W,fe,ce),wi(I,fe,ce),wi(L,fe,ce)}function ke(){Ee.makeEmpty();const w=v?.userData?.bounds;return w&&!w.isEmpty()&&Ee.union(w),he().forEach(F=>{(F.solid.vertices??[]).forEach(oe=>Ee.expandByPoint(new Q(Number(oe?.x)||0,Number(oe?.y)||0,Number(oe?.z)||0)))}),(t?.model3d?.lines??[]).forEach(F=>{Ee.expandByPoint(ri(F.start)),Ee.expandByPoint(ri(F.end))}),Ee.isEmpty()&&Ee.set(new Q(-10,-10,-.5),new Q(10,10,.5)),Ee}function qe(){const{near:w,far:F}=h0(Ee,d.position);Math.abs(d.near-w)<=w*1e-6&&Math.abs(d.far-F)<=F*1e-6||(d.near=w,d.far=F,d.updateProjectionMatrix())}function tt(){const w=ke(),F=new Q,oe=new Q;w.getCenter(F),w.getSize(oe);const _e=Math.max(oe.x,oe.y,oe.z,1),Xe=_e*1.9,je=La(Ge).cameraDirection;d.position.set(F.x+je.x*Xe,F.y+je.y*Xe,F.z+je.z*Xe),d.lookAt(F),d.updateMatrixWorld(),m.target.copy(F),m.update(),qe(),ze(F,_e)}function We(){return{position:d.position.toArray(),target:m.target.toArray(),up:d.up.toArray(),near:d.near,far:d.far,zoom:d.zoom}}function mt(w){return!Array.isArray(w?.position)||w.position.length<3||!Array.isArray(w?.target)||w.target.length<3?!1:(d.position.fromArray(w.position),m.target.fromArray(w.target),Array.isArray(w.up)&&w.up.length>=3&&d.up.fromArray(w.up),Number.isFinite(Number(w.near))&&(d.near=Math.max(1e-4,Number(w.near))),Number.isFinite(Number(w.far))&&(d.far=Math.max(d.near+1,Number(w.far))),Number.isFinite(Number(w.zoom))&&(d.zoom=Math.max(1e-4,Number(w.zoom))),d.lookAt(m.target),d.updateMatrixWorld(),m.update(),qe(),it(),!0)}function Pt(w){const F=Array.isArray(t?.model3d?.sketches)?t.model3d.sketches.filter(je=>je?.visible!==!1):[],oe=new Map;(t?.model3d?.lines??[]).forEach(je=>{je?.visible!==!1&&(oe.has(je.groupId)||oe.set(je.groupId,[]),oe.get(je.groupId).push(je))});let _e=null;const Xe=[...oe.entries()].map(([je,ye])=>{const nt=ye[0]?.metadata?.supportFace??null,Ct=ye[0]?.metadata?.supportPlane??null;let kt=null;nt||(_e??=Jt(),kt=Jr([ye[0].start,...ye.map(Nt=>Nt.end)],_e));const lt=Ct?gr(Ct):kt?.plane??HE(ye);if(!lt)return null;const Wt=nt??(kt?Ds(kt.face,kt.plane,t?.model3d):null);return{id:`line3d-face-${je}`,name:`Cara ${je}`,plane:lt,entities:ye.flatMap(Nt=>Hu([Nt.start,Nt.end],lt,{idPrefix:Nt.id})),visible:!0,metadata:{facesOnly:!0,lineGroupId:je,supportFace:Wt}}}).filter(Boolean);return F.length?[...F,...Xe]:[{id:null,name:"Dibujo 2D pendiente",plane:Vr(Ge),entities:w,visible:!0},...Xe]}function ft(w,{preserveView:F=!1}={}){v&&(h.remove(v),ct(v)),y&&(h.remove(y),ct(y)),p&&(h.remove(p),ct(p)),ot(null),Re(null),ve(null),k=!1,de.clear(),me.clear(),p=new Qt,p.name="webcad-3d-simple-faces",X.clearSolids();const oe=new Map;he().forEach(ye=>{X.addDocumentSolid?.(ye);const nt=Me(ye);nt&&!ye?.operation?.sketchId&&(oe.set(nt,ye),me.add(nt))});const _e=Pt(w);v=new Qt,v.name="webcad-3d-sketches",v.userData.bounds=new Qn().makeEmpty(),v.userData.entityCount=0,v.userData.segmentCount=0,y=new Qt,y.name="webcad-3d-spatial-lines";const Xe=new Set((t?.model3d?.lines??[]).filter(ye=>ye?.visible!==!1).map(ye=>ye.id));[...B].forEach(ye=>{Xe.has(ye)||B.delete(ye)}),(t?.model3d?.lines??[]).forEach(ye=>{if(ye?.visible===!1)return;const nt=B.has(ye.id),Ct=tn([{start:ye.start,end:ye.end}],{color:nt?16765286:Qe.drawingColor,depthTest:!0,depthWrite:!1,linewidth:nt?Qe.drawingLineWidth+1:Qe.drawingLineWidth,renderOrder:Qe.drawingRenderOrder,transparent:!0});Ct.userData.lineId=ye.id,Ct.userData.lineGroupId=ye.groupId,Ct.userData.line=ye,y.add(Ct)});const je=ye=>(X.getSolidObjects?.()??[]).find(nt=>nt.userData?.documentSolidId===ye)??null;return _e.forEach(ye=>{const nt=gr(ye.plane??Ge),Ct=au(ye.entities||[]),kt=[...Ct,...Ct.length?Is(ye,t?.model3d):[]],lt=new Qt;lt.userData.sketchId=ye.id??null,lt.userData.line3dGroupId=ye.metadata?.lineGroupId??null,wS(kt).forEach(Ut=>{const Tt=Zf(Ut,nt,ye.id??null);ye.metadata?.lineGroupId&&(Tt.line3dGroupId=ye.metadata.lineGroupId,Tt.sketchId=null);const an=ye.metadata?.supportFace,mn=an?.sourceSolidId?t?.model3d?.solids?.find(Br=>Br.id===an.sourceSolidId):null,Wn=!!(mn?.solid&&Jf(Ut,an)),Ft=!!(mn?.solid&&!Wn&&Qf(Ut,an)),Fr=Wn||Ft;if(Fr){Tt.supportSolid=mn.solid,Tt.supportContactOnly=Ft,Tt.supportSolidGroup=je(mn.id),Tt.sourceSolidDocumentId=mn.id,Tt.sourceSolidFaceIndices=an.sourceFaceIndices??null,Tt.sourceSolidFaceIndex=an.sourceFaceIndices?.[0]??null;const Br=zr=>yr({x:Number(zr?.x)||0,y:-(Number(zr?.y)||0),z:0},nt);Tt.supportLoops={outer:(an.outerLoop??[]).map(Br),holes:(an.innerLoops??[]).map(zr=>zr.map(Br))},Tt.placement=mn.placement,Tt.localFace=BS(Tt,mn.placement)}const An=RS(Ut);An.userData.face=Tt,Fr&&(An.renderOrder=NS,An.material.opacity=.14,An.material.transparent=!0,An.userData.defaultOpacity=.14,An.userData.defaultTransparent=!0,An.userData.supportSolidDocumentId=mn.id);const Ti=ci(Tt),Ho=oe.get(Ti),Or=!t&&!Ho?re.get(Ut.sourceEntity)||z.get(Ti):null;Ho&&!ye.id&&(An.visible=!1,Ut.sourceEntity&&de.add(Ut.sourceEntity),Ti&&me.add(Ti)),Or&&(An.visible=!1,Ut.sourceEntity&&de.add(Ut.sourceEntity),Ti&&me.add(Ti),Or.sourceKey&&me.add(Or.sourceKey),X.addSessionSolid(Tt,Or.height)),lt.add(An)}),V(lt,nt),p.add(lt);const Wt=Nx(ye.metadata?.facesOnly?[]:Ct,{onWarning:Ut=>console.warn(Ut)});Wt.userData.sketchId=ye.id??null;const Nt=Wt.userData.bounds;V(Wt,nt),Nt&&!Nt.isEmpty()&&v.userData.bounds.union(Nt.clone().applyMatrix4(g(nt))),v.userData.entityCount+=Wt.userData.entityCount||0,v.userData.segmentCount+=Wt.userData.segmentCount||0,v.add(Wt)}),X.setHiddenEdges(Ie),h.add(p),h.add(v),h.add(y),we(),wi(v,fe,ce),F?(ke(),qe()):tt(),it(),v.userData.segmentCount||0}function xt(w){pe=w!==!1,uu(I,pe),it()}function Ht(w){return He=w!==!1,L&&(L.visible=He),it(),He}function Ne(w){const F=Da(w);return F===Ge?!1:(Ge=F,ft(xn(),{preserveView:!1}),!0)}function Zt(){const w=Da(t?.model3d?.sketchPlane);if(w!==Ge){Ge=w,ft(xn(),{preserveView:!1});return}ft(xn(),{preserveView:!0})}function st(){const w=f?.userData?.face;return w?.sourceSolid?w:null}function Jt(){const w=[],F=new Set;return(X.getSolidObjects?.()??[]).forEach(oe=>{oe?.traverse?.(_e=>{_e?.userData?.type!=="webcad-push-solid"||F.has(_e)||(F.add(_e),EE(_e).forEach(Xe=>{const je=Ai(Xe);je&&w.push(je)}))})}),w}function it(w){if(ee)return;m.update(),d.updateMatrixWorld(),qe();const F=Number.isFinite(w)?w:Qa(),oe=ne;ne=!1;const _e=F-N<Ja;q||p0(h,d,{deferCameraRefresh:!(oe||!_e)}),wi(h,fe,ce),c.render(h,d)}function vn(w=e.clientWidth||e.width||640,F=e.clientHeight||e.height||420){if(ee)return;const oe=Math.max(1,Math.round(w)),_e=Math.max(1,Math.round(F));fe=oe,ce=_e,c.setSize(oe,_e,!1),d.aspect=oe/_e,d.updateProjectionMatrix(),wi(h,oe,_e),it()}function kn(){ee||H||(H=!0,c.setAnimationLoop(it))}function gt(){ee||!H||(H=!1,c.setAnimationLoop(null))}function wt(){ee||(gt(),ge(),_=null,S=null,Oe(),u?.(null),J(),f=null,Se(),k=!1,ee=!0,c.domElement.removeEventListener("click",mi),c.domElement.removeEventListener("dblclick",Ji),c.domElement.removeEventListener("pointermove",Zi),c.domElement.removeEventListener("pointerleave",hi),c.domElement.removeEventListener("pointerdown",at),c.domElement.removeEventListener("pointerup",ut),c.domElement.removeEventListener("pointercancel",ut),c.domElement.removeEventListener("contextmenu",$),c.domElement.removeEventListener("keydown",K),ae!==null&&(globalThis.clearTimeout(ae),ae=null),ue.clear(),se.clear(),m.removeEventListener("change",et),m.dispose(),De.dispose(),ct(v),ct(y),ct(p),h.remove(x),ct(x),ct(W),ct(I),ct(L),ct(P),X.dispose(),R?.dispose(),U?.dispose(),D?.dispose(),c.dispose())}R=OE({camera:d,canvas:c.domElement,doc:t,getSelectedSolidIds:()=>{const w=[...Z],F=f?.userData?.face?.sourceSolidDocumentId;return w.length||!F?w:[F]},getSolidIdAtPointer:w=>(jt(w),Vn()?.object?.userData?.documentSolidId??null),getSolidObjects:()=>X.getSolidObjects?.()??[],getSnap:(w,F={})=>jr({camera:d,canvas:c.domElement,event:w,solidObjects:X.getSolidObjects?.()??[],maxDistancePixels:20,includeHidden:Ie,excludeDocumentSolidIds:(F.mode==="move"||F.mode==="copy")&&F.phase==="destination"?F.solidIds:[]}),getWorkplane:()=>({origin:{x:0,y:0,z:0},normal:La(Ge).normal}),onChanged:()=>ft(xn(),{preserveView:!0}),onSelection:w=>{ge(),Ue(),f&&(J(),f=null),Se(w)},onSnap:ve,onStatus:l,render:it,scene:h}),U=qE({camera:d,canvas:c.domElement,scene:h,getContext(){const w=st(),F=w?va(w):Vr(Ge);return{face:w,plane:F}},getSnap(w,{points:F}={}){const oe=F?.at(-1)??null;return jr({camera:d,canvas:c.domElement,event:w,solidObjects:X.getSolidObjects?.()??[],extraCandidates:nc(t?.model3d?.lines),maxDistancePixels:20,includeHidden:Ie,acceptCandidate:_e=>$i(_e,oe)})},onCommit({context:w,points:F}){if(!t||F.length<2)return null;const oe=[w.face,...Jt()].filter(Boolean),_e=Jr(F,oe)??Jr(F,oe,1e-6,{allowCrossing:!0}),Xe=_e?Ds(_e.face,_e.plane,t.model3d):null,je=Xe?{supportFace:Xe,supportPlane:_e.plane}:{},ye=Xe?Is({id:"line3d-auto-split",plane:_e.plane,metadata:{supportFace:Xe}},t.model3d):[],nt=Xe?KE(F,_e.plane,ye):[],Ct=_e?[..._e.face.points??[],...(_e.face.holes??[]).flat(),...nt]:oe.flatMap(Ft=>[...Ft.points??[],...(Ft.holes??[]).flat()]),kt=F.slice(0,-1).map((Ft,Fr)=>({start:Ft,end:F[Fr+1]})),lt=YE({existingLines:t.model3d?.lines,newSegments:kt,splitPoints:Ct}),Wt=new Set(lt.touchedExistingLineIds),Nt=(t.model3d?.lines??[]).filter(Ft=>Ft?.visible===!1||!Wt.has(Ft.id)?!1:_e?!!Jr([Ft.start,Ft.end],[_e.face],1e-6,{allowCrossing:!0}):!0),Ut=Nt[0]?.groupId??null,Tt=[...new Set(Nt.map(Ft=>Ft.groupId))],mn=lt.existingReplacements.length>0||Tt.length>1||!!(Xe&&Tt.length)?t.update3dLineTopology?.({replacements:lt.existingReplacements,mergeGroupIds:Tt,targetGroupId:Ut,metadata:Xe?je:null})===!0:!1,Wn=t.add3dLines?.(lt.newSegments,{...Ut?{groupId:Ut}:{},metadata:je,recordHistory:!mn});return Wn?.length?(B.clear(),Wn.forEach(Ft=>B.add(Ft.id)),ft(xn(),{preserveView:!0}),Wn):null},onSnap:ve,onStatus:l,render:it});const un=()=>{const w=(t?.model3d?.lines??[]).filter(F=>B.has(F.id));return w.length?{lineIds:w.map(F=>F.id),lines:w}:null};return D=jE({camera:d,canvas:c.domElement,scene:h,getSnap:(w,{anchor:F}={})=>jr({camera:d,canvas:c.domElement,event:w,solidObjects:X.getSolidObjects?.()??[],extraCandidates:nc(t?.model3d?.lines),maxDistancePixels:20,includeHidden:Ie,acceptCandidate:oe=>$i(oe,F)}),getWorkplane:()=>({origin:{x:0,y:0,z:0},normal:La(Ge).normal}),onTransform({mode:w,record:F,transform:oe}){const _e=new Set(F?.lineIds??[]),Xe={lines:(t?.model3d?.lines??[]).filter(ye=>_e.has(ye.id))};if(!Xe||!oe)return!1;const je=Wu(Xe.lines,oe);if(je.length!==Xe.lines.length)return!1;if(w==="copy"){const ye=t.add3dLines?.(je);if(!ye.length)return!1;B.clear(),ye.forEach(nt=>B.add(nt.id))}else t.recordHistory?.(),Xe.lines.forEach((ye,nt)=>{ye.start=je[nt].start,ye.end=je[nt].end,ye.metadata={},ye.revision=(Number(ye.revision)||0)+1}),t.markDirty?.();return ft(xn(),{preserveView:!0}),!0},onSnap:ve,onStatus:l,render:it}),c.domElement.addEventListener("click",mi),c.domElement.addEventListener("dblclick",Ji),c.domElement.addEventListener("pointermove",Zi),c.domElement.addEventListener("pointerleave",hi),c.domElement.addEventListener("pointerdown",at),c.domElement.addEventListener("pointerup",ut),c.domElement.addEventListener("pointercancel",ut),c.domElement.addEventListener("contextmenu",$),c.domElement.addEventListener("keydown",K),vn(),ft(n),kn(),{camera:d,controls:m,dispose:wt,getSegmentCount:()=>v?.userData.segmentCount||0,getFaceCount:()=>{let w=0;return p?.traverse?.(F=>{F.userData?.type==="webcad-simple-face"&&(w+=1)}),w},getEntityCount:()=>v?.userData.entityCount||0,getViewState:We,getSelectedSolidId:()=>[...Z][0]??null,getSelectedSolidIds:()=>[...Z],getSelectedSolidEdge:()=>S,getSelectedLine3dGroupId:()=>un()?.lines?.[0]?.groupId??null,getSelectedLine3dIds:()=>[...B],getSelectedPlanarFace:st,getSketchPlane:()=>Ge,isDeleteSolidActive:()=>k,startDeleteSolid:M,confirmDeleteSolidSelection:G,cancelDeleteSolid:j,deleteSelectedSolid:Qi,deleteSelectedLine3d:er,deleteSelected3d:ya,isPushActive:()=>X.isActive(),isSolidTransformActive:()=>R?.isActive()===!0,isLine3dActive:()=>U?.isActive()===!0||D?.isActive()===!0,render:it,refreshDocument:Zt,renderer:c,resize:vn,scene:h,setEntities:ft,setViewState:mt,setGridVisible:xt,setAxesVisible:Ht,setSketchPlane:Ne,setHiddenEdges:Ce,toggleHiddenEdges:Le,setNavigationDevice:De.setNavigationDevice,startLine3d:U.start,startCopyLine3d:()=>D.startCopy(un()),startMoveLine3d:()=>D.startMove(un()),startRotateLine3d:()=>D.startRotate(un()),startPush:X.start,startCopySolids:R.startCopy,startMoveSolids:R.startMove,startRotateSolids:R.startRotate,start:kn,stop:gt}}export{x0 as createThreeDemoViewer,g0 as operationFromPushFace};

import{U as an,c as zc,N as un,S as Ts,C as dt,R as kc,e as gt,w as at,V as Pt,l as Ma,M as An,F as As,W as ba,a as dn,b as Et,L as Xn,H as yn,D as zt,B as Kt,d as bi,f as ne,p as Wc,g as Ti,h as ti,i as Ai,j as Xc,k as Bt,O as ys,m as mt,E as Yc,P as Si,A as Kc,n as gr,o as We,q as _n,r as Yn,s as Zn,t as yi,u as On,v as qc,x as $c,y as Qn,z as Yt,G as Wr,I as jc,J as kn,K as Jn,Q as Zc,T as Qc,X as ui,Y as Jc,Z as el,_ as tl,$ as nl,a0 as il,a1 as rl,a2 as al,a3 as ol,a4 as sl,a5 as cl,a6 as ll,a7 as ul,a8 as dl,a9 as fl,aa as pl,ab as hl,ac as ml,ad as vr,ae as Xi,af as _l,ag as In,ah as gl,ai as vl,aj as sa,ak as xl,al as ca,am as Sl,an as El,ao as Ml,ap as nt,aq as Ps,ar as bl,as as Tl,at as Qt,au as Ei,av as Qi,aw as Al,ax as gn,ay as mi,az as bn,aA as yl,aB as Rs,aC as ws,aD as Cs,aE as ir,aF as Ds,aG as Ls,aH as Is,aI as cr,aJ as Pl,aK as Rl,aL as wl,aM as Cl,aN as Ns,aO as Dl,aP as Ll,aQ as Il,aR as xr,aS as Sr,aT as Er,aU as Mr,aV as Ta,aW as Aa,aX as ya,aY as Pa,aZ as Ra,a_ as wa,a$ as Ca,b0 as Da,b1 as La,b2 as Xr,b3 as Ia,b4 as Na,b5 as Ua,b6 as Fa,b7 as Oa,b8 as Ba,b9 as Ga,ba as Ha,bb as Va,bc as za,bd as ka,be as Wa,bf as Xa,bg as Ya,bh as Ka,bi as qa,bj as $a,bk as ja,bl as Za,bm as Qa,bn as Yr,bo as Ja,bp as Nl,bq as Ul,br as Fl,bs as Ol,bt as Bl,bu as Gl,bv as Hl,bw as Vl,bx as eo,by as zl,bz as Ji,bA as kl,bB as to,bC as no,bD as io,bE as Us,bF as la,bG as lr,bH as ro,bI as Wl,bJ as Fs,bK as ua,bL as Kr,bM as Os,bN as Xl,bO as Bs,bP as Gs,bQ as Hs,bR as Vs,bS as zs,bT as ks,bU as Ws,bV as ao,bW as Xs,bX as br,bY as Tr,bZ as Yl,b_ as Kl,b$ as oo,c0 as Ht,c1 as ql,c2 as Ys,c3 as Pi,c4 as ei,c5 as ur,c6 as $l,c7 as jl,c8 as Zl,c9 as Ql,ca as Jl,cb as eu,cc as tu,cd as nu,ce as iu,cf as ru,cg as vn,ch as Kn,ci as so,cj as co,ck as Ks,cl as Pn,cm as au,cn as qr,co as qn,cp as ou,cq as xn,cr as qs,cs as su,ct as sn,cu as Ii,cv as $s,cw as js,cx as Zs,cy as Qs,cz as cu,cA as lu,cB as uu,cC as du,cD as da,cE as fu,cF as rr,cG as pu,cH as $r,cI as fa,cJ as hu,cK as jr,cL as di,cM as dr,cN as mu,cO as _u,cP as Js,cQ as gu,cR as vu,cS as xu,cT as Su,cU as ec,cV as Eu,cW as Mu,cX as bu,cY as Tu,cZ as Au,c_ as tc,c$ as yu,d0 as Pu,d1 as lo,d2 as Ru,d3 as wu,d4 as Cu,d5 as Du,d6 as Lu,d7 as Iu,d8 as Nu,d9 as Uu,da as Fu,db as Ar,dc as Ou,dd as Bu,de as Gu,df as Hu,dg as Vu,dh as zu,di as yr,dj as ku,dk as Wu,dl as Xu}from"./main-DrRNV3_o.js";function nc(){let e=null,t=!1,n=null,i=null;function r(a,o){n(a,o),i=e.requestAnimationFrame(r)}return{start:function(){t!==!0&&n!==null&&e!==null&&(i=e.requestAnimationFrame(r),t=!0)},stop:function(){e!==null&&e.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(a){n=a},setContext:function(a){e=a}}}function Yu(e){const t=new WeakMap;function n(s,h){const f=s.array,g=s.usage,p=f.byteLength,l=e.createBuffer();e.bindBuffer(h,l),e.bufferData(h,f,g),s.onUploadCallback();let _;if(f instanceof Float32Array)_=e.FLOAT;else if(typeof Float16Array<"u"&&f instanceof Float16Array)_=e.HALF_FLOAT;else if(f instanceof Uint16Array)s.isFloat16BufferAttribute?_=e.HALF_FLOAT:_=e.UNSIGNED_SHORT;else if(f instanceof Int16Array)_=e.SHORT;else if(f instanceof Uint32Array)_=e.UNSIGNED_INT;else if(f instanceof Int32Array)_=e.INT;else if(f instanceof Int8Array)_=e.BYTE;else if(f instanceof Uint8Array)_=e.UNSIGNED_BYTE;else if(f instanceof Uint8ClampedArray)_=e.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+f);return{buffer:l,type:_,bytesPerElement:f.BYTES_PER_ELEMENT,version:s.version,size:p}}function i(s,h,f){const g=h.array,p=h.updateRanges;if(e.bindBuffer(f,s),p.length===0)e.bufferSubData(f,0,g);else{p.sort((_,x)=>_.start-x.start);let l=0;for(let _=1;_<p.length;_++){const x=p[l],P=p[_];P.start<=x.start+x.count+1?x.count=Math.max(x.count,P.start+P.count-x.start):(++l,p[l]=P)}p.length=l+1;for(let _=0,x=p.length;_<x;_++){const P=p[_];e.bufferSubData(f,P.start*g.BYTES_PER_ELEMENT,g,P.start,P.count)}h.clearUpdateRanges()}h.onUploadCallback()}function r(s){return s.isInterleavedBufferAttribute&&(s=s.data),t.get(s)}function a(s){s.isInterleavedBufferAttribute&&(s=s.data);const h=t.get(s);h&&(e.deleteBuffer(h.buffer),t.delete(s))}function o(s,h){if(s.isInterleavedBufferAttribute&&(s=s.data),s.isGLBufferAttribute){const g=t.get(s);(!g||g.version<s.version)&&t.set(s,{buffer:s.buffer,type:s.type,bytesPerElement:s.elementSize,version:s.version});return}const f=t.get(s);if(f===void 0)t.set(s,n(s,h));else if(f.version<s.version){if(f.size!==s.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(f.buffer,s,h),f.version=s.version}}return{get:r,remove:a,update:o}}var Ku=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,qu=`#ifdef USE_ALPHAHASH
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
#endif`,$u=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,ju=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Zu=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Qu=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Ju=`#ifdef USE_AOMAP
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
#endif`,ed=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,td=`#ifdef USE_BATCHING
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
#endif`,nd=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,id=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,rd=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,ad=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,od=`#ifdef USE_IRIDESCENCE
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
#endif`,sd=`#ifdef USE_BUMPMAP
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
#endif`,cd=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,ld=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,ud=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,dd=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,fd=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,pd=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,hd=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,md=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,_d=`#define PI 3.141592653589793
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
} // validated`,gd=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,vd=`vec3 transformedNormal = objectNormal;
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
#endif`,xd=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Sd=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Ed=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Md=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,bd="gl_FragColor = linearToOutputTexel( gl_FragColor );",Td=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Ad=`#ifdef USE_ENVMAP
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
#endif`,yd=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,Pd=`#ifdef USE_ENVMAP
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
#endif`,Rd=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,wd=`#ifdef USE_ENVMAP
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
#endif`,Cd=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Dd=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Ld=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Id=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Nd=`#ifdef USE_GRADIENTMAP
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
}`,Ud=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Fd=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Od=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Bd=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,Gd=`#ifdef USE_ENVMAP
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
#endif`,Hd=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Vd=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,zd=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,kd=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Wd=`PhysicalMaterial material;
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
#endif`,Xd=`uniform sampler2D dfgLUT;
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
}`,Yd=`
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
#endif`,Kd=`#if defined( RE_IndirectDiffuse )
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
#endif`,qd=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,$d=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,jd=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Zd=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Qd=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Jd=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,ef=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,tf=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,nf=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,rf=`#if defined( USE_POINTS_UV )
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
#endif`,af=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,of=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,sf=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,cf=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,lf=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,uf=`#ifdef USE_MORPHTARGETS
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
#endif`,df=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,ff=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,pf=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,hf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,mf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,_f=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,gf=`#ifdef USE_NORMALMAP
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
#endif`,vf=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,xf=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Sf=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Ef=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Mf=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,bf=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Tf=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Af=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,yf=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Pf=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Rf=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,wf=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Cf=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Df=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Lf=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,If=`float getShadowMask() {
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
}`,Nf=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Uf=`#ifdef USE_SKINNING
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
#endif`,Ff=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Of=`#ifdef USE_SKINNING
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
#endif`,Bf=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Gf=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Hf=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Vf=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,zf=`#ifdef USE_TRANSMISSION
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
#endif`,kf=`#ifdef USE_TRANSMISSION
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
#endif`,Wf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Xf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Yf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Kf=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const qf=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,$f=`uniform sampler2D t2D;
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
}`,jf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Zf=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Qf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Jf=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ep=`#include <common>
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
}`,tp=`#if DEPTH_PACKING == 3200
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
}`,np=`#define DISTANCE
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
}`,ip=`#define DISTANCE
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
}`,rp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,ap=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,op=`uniform float scale;
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
}`,sp=`uniform vec3 diffuse;
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
}`,cp=`#include <common>
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
}`,lp=`uniform vec3 diffuse;
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
}`,up=`#define LAMBERT
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
}`,dp=`#define LAMBERT
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
}`,fp=`#define MATCAP
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
}`,pp=`#define MATCAP
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
}`,hp=`#define NORMAL
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
}`,mp=`#define NORMAL
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
}`,_p=`#define PHONG
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
}`,gp=`#define PHONG
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
}`,vp=`#define STANDARD
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
}`,xp=`#define STANDARD
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
}`,Sp=`#define TOON
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
}`,Ep=`#define TOON
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
}`,Mp=`uniform float size;
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
}`,bp=`uniform vec3 diffuse;
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
}`,Tp=`#include <common>
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
}`,Ap=`uniform vec3 color;
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
}`,yp=`uniform float rotation;
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
}`,Pp=`uniform vec3 diffuse;
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
}`,Ze={alphahash_fragment:Ku,alphahash_pars_fragment:qu,alphamap_fragment:$u,alphamap_pars_fragment:ju,alphatest_fragment:Zu,alphatest_pars_fragment:Qu,aomap_fragment:Ju,aomap_pars_fragment:ed,batching_pars_vertex:td,batching_vertex:nd,begin_vertex:id,beginnormal_vertex:rd,bsdfs:ad,iridescence_fragment:od,bumpmap_pars_fragment:sd,clipping_planes_fragment:cd,clipping_planes_pars_fragment:ld,clipping_planes_pars_vertex:ud,clipping_planes_vertex:dd,color_fragment:fd,color_pars_fragment:pd,color_pars_vertex:hd,color_vertex:md,common:_d,cube_uv_reflection_fragment:gd,defaultnormal_vertex:vd,displacementmap_pars_vertex:xd,displacementmap_vertex:Sd,emissivemap_fragment:Ed,emissivemap_pars_fragment:Md,colorspace_fragment:bd,colorspace_pars_fragment:Td,envmap_fragment:Ad,envmap_common_pars_fragment:yd,envmap_pars_fragment:Pd,envmap_pars_vertex:Rd,envmap_physical_pars_fragment:Gd,envmap_vertex:wd,fog_vertex:Cd,fog_pars_vertex:Dd,fog_fragment:Ld,fog_pars_fragment:Id,gradientmap_pars_fragment:Nd,lightmap_pars_fragment:Ud,lights_lambert_fragment:Fd,lights_lambert_pars_fragment:Od,lights_pars_begin:Bd,lights_toon_fragment:Hd,lights_toon_pars_fragment:Vd,lights_phong_fragment:zd,lights_phong_pars_fragment:kd,lights_physical_fragment:Wd,lights_physical_pars_fragment:Xd,lights_fragment_begin:Yd,lights_fragment_maps:Kd,lights_fragment_end:qd,lightprobes_pars_fragment:$d,logdepthbuf_fragment:jd,logdepthbuf_pars_fragment:Zd,logdepthbuf_pars_vertex:Qd,logdepthbuf_vertex:Jd,map_fragment:ef,map_pars_fragment:tf,map_particle_fragment:nf,map_particle_pars_fragment:rf,metalnessmap_fragment:af,metalnessmap_pars_fragment:of,morphinstance_vertex:sf,morphcolor_vertex:cf,morphnormal_vertex:lf,morphtarget_pars_vertex:uf,morphtarget_vertex:df,normal_fragment_begin:ff,normal_fragment_maps:pf,normal_pars_fragment:hf,normal_pars_vertex:mf,normal_vertex:_f,normalmap_pars_fragment:gf,clearcoat_normal_fragment_begin:vf,clearcoat_normal_fragment_maps:xf,clearcoat_pars_fragment:Sf,iridescence_pars_fragment:Ef,opaque_fragment:Mf,packing:bf,premultiplied_alpha_fragment:Tf,project_vertex:Af,dithering_fragment:yf,dithering_pars_fragment:Pf,roughnessmap_fragment:Rf,roughnessmap_pars_fragment:wf,shadowmap_pars_fragment:Cf,shadowmap_pars_vertex:Df,shadowmap_vertex:Lf,shadowmask_pars_fragment:If,skinbase_vertex:Nf,skinning_pars_vertex:Uf,skinning_vertex:Ff,skinnormal_vertex:Of,specularmap_fragment:Bf,specularmap_pars_fragment:Gf,tonemapping_fragment:Hf,tonemapping_pars_fragment:Vf,transmission_fragment:zf,transmission_pars_fragment:kf,uv_pars_fragment:Wf,uv_pars_vertex:Xf,uv_vertex:Yf,worldpos_vertex:Kf,background_vert:qf,background_frag:$f,backgroundCube_vert:jf,backgroundCube_frag:Zf,cube_vert:Qf,cube_frag:Jf,depth_vert:ep,depth_frag:tp,distance_vert:np,distance_frag:ip,equirect_vert:rp,equirect_frag:ap,linedashed_vert:op,linedashed_frag:sp,meshbasic_vert:cp,meshbasic_frag:lp,meshlambert_vert:up,meshlambert_frag:dp,meshmatcap_vert:fp,meshmatcap_frag:pp,meshnormal_vert:hp,meshnormal_frag:mp,meshphong_vert:_p,meshphong_frag:gp,meshphysical_vert:vp,meshphysical_frag:xp,meshtoon_vert:Sp,meshtoon_frag:Ep,points_vert:Mp,points_frag:bp,shadow_vert:Tp,shadow_frag:Ap,sprite_vert:yp,sprite_frag:Pp},Ee={common:{diffuse:{value:new dt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new nt},alphaMap:{value:null},alphaMapTransform:{value:new nt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new nt}},envmap:{envMap:{value:null},envMapRotation:{value:new nt},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new nt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new nt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new nt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new nt},normalScale:{value:new We(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new nt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new nt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new nt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new nt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new dt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new ne},probesMax:{value:new ne},probesResolution:{value:new ne}},points:{diffuse:{value:new dt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new nt},alphaTest:{value:0},uvTransform:{value:new nt}},sprite:{diffuse:{value:new dt(16777215)},opacity:{value:1},center:{value:new We(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new nt},alphaMap:{value:null},alphaMapTransform:{value:new nt},alphaTest:{value:0}}},Vt={basic:{uniforms:Ht([Ee.common,Ee.specularmap,Ee.envmap,Ee.aomap,Ee.lightmap,Ee.fog]),vertexShader:Ze.meshbasic_vert,fragmentShader:Ze.meshbasic_frag},lambert:{uniforms:Ht([Ee.common,Ee.specularmap,Ee.envmap,Ee.aomap,Ee.lightmap,Ee.emissivemap,Ee.bumpmap,Ee.normalmap,Ee.displacementmap,Ee.fog,Ee.lights,{emissive:{value:new dt(0)},envMapIntensity:{value:1}}]),vertexShader:Ze.meshlambert_vert,fragmentShader:Ze.meshlambert_frag},phong:{uniforms:Ht([Ee.common,Ee.specularmap,Ee.envmap,Ee.aomap,Ee.lightmap,Ee.emissivemap,Ee.bumpmap,Ee.normalmap,Ee.displacementmap,Ee.fog,Ee.lights,{emissive:{value:new dt(0)},specular:{value:new dt(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Ze.meshphong_vert,fragmentShader:Ze.meshphong_frag},standard:{uniforms:Ht([Ee.common,Ee.envmap,Ee.aomap,Ee.lightmap,Ee.emissivemap,Ee.bumpmap,Ee.normalmap,Ee.displacementmap,Ee.roughnessmap,Ee.metalnessmap,Ee.fog,Ee.lights,{emissive:{value:new dt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ze.meshphysical_vert,fragmentShader:Ze.meshphysical_frag},toon:{uniforms:Ht([Ee.common,Ee.aomap,Ee.lightmap,Ee.emissivemap,Ee.bumpmap,Ee.normalmap,Ee.displacementmap,Ee.gradientmap,Ee.fog,Ee.lights,{emissive:{value:new dt(0)}}]),vertexShader:Ze.meshtoon_vert,fragmentShader:Ze.meshtoon_frag},matcap:{uniforms:Ht([Ee.common,Ee.bumpmap,Ee.normalmap,Ee.displacementmap,Ee.fog,{matcap:{value:null}}]),vertexShader:Ze.meshmatcap_vert,fragmentShader:Ze.meshmatcap_frag},points:{uniforms:Ht([Ee.points,Ee.fog]),vertexShader:Ze.points_vert,fragmentShader:Ze.points_frag},dashed:{uniforms:Ht([Ee.common,Ee.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ze.linedashed_vert,fragmentShader:Ze.linedashed_frag},depth:{uniforms:Ht([Ee.common,Ee.displacementmap]),vertexShader:Ze.depth_vert,fragmentShader:Ze.depth_frag},normal:{uniforms:Ht([Ee.common,Ee.bumpmap,Ee.normalmap,Ee.displacementmap,{opacity:{value:1}}]),vertexShader:Ze.meshnormal_vert,fragmentShader:Ze.meshnormal_frag},sprite:{uniforms:Ht([Ee.sprite,Ee.fog]),vertexShader:Ze.sprite_vert,fragmentShader:Ze.sprite_frag},background:{uniforms:{uvTransform:{value:new nt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ze.background_vert,fragmentShader:Ze.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new nt}},vertexShader:Ze.backgroundCube_vert,fragmentShader:Ze.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ze.cube_vert,fragmentShader:Ze.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ze.equirect_vert,fragmentShader:Ze.equirect_frag},distance:{uniforms:Ht([Ee.common,Ee.displacementmap,{referencePosition:{value:new ne},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ze.distance_vert,fragmentShader:Ze.distance_frag},shadow:{uniforms:Ht([Ee.lights,Ee.fog,{color:{value:new dt(0)},opacity:{value:1}}]),vertexShader:Ze.shadow_vert,fragmentShader:Ze.shadow_frag}};Vt.physical={uniforms:Ht([Vt.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new nt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new nt},clearcoatNormalScale:{value:new We(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new nt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new nt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new nt},sheen:{value:0},sheenColor:{value:new dt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new nt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new nt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new nt},transmissionSamplerSize:{value:new We},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new nt},attenuationDistance:{value:0},attenuationColor:{value:new dt(0)},specularColor:{value:new dt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new nt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new nt},anisotropyVector:{value:new We},anisotropyMap:{value:null},anisotropyMapTransform:{value:new nt}}]),vertexShader:Ze.meshphysical_vert,fragmentShader:Ze.meshphysical_frag};const Yi={r:0,b:0,g:0},Rp=new An,ic=new nt;ic.set(-1,0,0,0,1,0,0,0,1);function wp(e,t,n,i,r,a){const o=new dt(0);let s=r===!0?0:1,h,f,g=null,p=0,l=null;function _(y){let R=y.isScene===!0?y.background:null;if(R&&R.isTexture){const S=y.backgroundBlurriness>0;R=t.get(R,S)}return R}function x(y){let R=!1;const S=_(y);S===null?c(o,s):S&&S.isColor&&(c(S,1),R=!0);const T=e.xr.getEnvironmentBlendMode();T==="additive"?n.buffers.color.setClear(0,0,0,1,a):T==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(e.autoClear||R)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil))}function P(y,R){const S=_(R);S&&(S.isCubeTexture||S.mapping===lr)?(f===void 0&&(f=new Bt(new ua(1,1,1),new Qt({name:"BackgroundCubeMaterial",uniforms:Kr(Vt.backgroundCube.uniforms),vertexShader:Vt.backgroundCube.vertexShader,fragmentShader:Vt.backgroundCube.fragmentShader,side:Kt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),f.geometry.deleteAttribute("normal"),f.geometry.deleteAttribute("uv"),f.onBeforeRender=function(T,b,w){this.matrixWorld.copyPosition(w.matrixWorld)},Object.defineProperty(f.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(f)),f.material.uniforms.envMap.value=S,f.material.uniforms.backgroundBlurriness.value=R.backgroundBlurriness,f.material.uniforms.backgroundIntensity.value=R.backgroundIntensity,f.material.uniforms.backgroundRotation.value.setFromMatrix4(Rp.makeRotationFromEuler(R.backgroundRotation)).transpose(),S.isCubeTexture&&S.isRenderTargetTexture===!1&&f.material.uniforms.backgroundRotation.value.premultiply(ic),f.material.toneMapped=Et.getTransfer(S.colorSpace)!==mt,(g!==S||p!==S.version||l!==e.toneMapping)&&(f.material.needsUpdate=!0,g=S,p=S.version,l=e.toneMapping),f.layers.enableAll(),y.unshift(f,f.geometry,f.material,0,0,null)):S&&S.isTexture&&(h===void 0&&(h=new Bt(new cr(2,2),new Qt({name:"BackgroundMaterial",uniforms:Kr(Vt.background.uniforms),vertexShader:Vt.background.vertexShader,fragmentShader:Vt.background.fragmentShader,side:bi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),h.geometry.deleteAttribute("normal"),Object.defineProperty(h.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(h)),h.material.uniforms.t2D.value=S,h.material.uniforms.backgroundIntensity.value=R.backgroundIntensity,h.material.toneMapped=Et.getTransfer(S.colorSpace)!==mt,S.matrixAutoUpdate===!0&&S.updateMatrix(),h.material.uniforms.uvTransform.value.copy(S.matrix),(g!==S||p!==S.version||l!==e.toneMapping)&&(h.material.needsUpdate=!0,g=S,p=S.version,l=e.toneMapping),h.layers.enableAll(),y.unshift(h,h.geometry,h.material,0,0,null))}function c(y,R){y.getRGB(Yi,Fs(e)),n.buffers.color.setClear(Yi.r,Yi.g,Yi.b,R,a)}function u(){f!==void 0&&(f.geometry.dispose(),f.material.dispose(),f=void 0),h!==void 0&&(h.geometry.dispose(),h.material.dispose(),h=void 0)}return{getClearColor:function(){return o},setClearColor:function(y,R=1){o.set(y),s=R,c(o,s)},getClearAlpha:function(){return s},setClearAlpha:function(y){s=y,c(o,s)},render:x,addToRenderList:P,dispose:u}}function Cp(e,t){const n=e.getParameter(e.MAX_VERTEX_ATTRIBS),i={},r=l(null);let a=r,o=!1;function s(L,V,ae,Q,X){let Y=!1;const W=p(L,Q,ae,V);a!==W&&(a=W,f(a.object)),Y=_(L,Q,ae,X),Y&&x(L,Q,ae,X),X!==null&&t.update(X,e.ELEMENT_ARRAY_BUFFER),(Y||o)&&(o=!1,S(L,V,ae,Q),X!==null&&e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,t.get(X).buffer))}function h(){return e.createVertexArray()}function f(L){return e.bindVertexArray(L)}function g(L){return e.deleteVertexArray(L)}function p(L,V,ae,Q){const X=Q.wireframe===!0;let Y=i[V.id];Y===void 0&&(Y={},i[V.id]=Y);const W=L.isInstancedMesh===!0?L.id:0;let ee=Y[W];ee===void 0&&(ee={},Y[W]=ee);let ue=ee[ae.id];ue===void 0&&(ue={},ee[ae.id]=ue);let Re=ue[X];return Re===void 0&&(Re=l(h()),ue[X]=Re),Re}function l(L){const V=[],ae=[],Q=[];for(let X=0;X<n;X++)V[X]=0,ae[X]=0,Q[X]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:V,enabledAttributes:ae,attributeDivisors:Q,object:L,attributes:{},index:null}}function _(L,V,ae,Q){const X=a.attributes,Y=V.attributes;let W=0;const ee=ae.getAttributes();for(const ue in ee)if(ee[ue].location>=0){const ge=X[ue];let Me=Y[ue];if(Me===void 0&&(ue==="instanceMatrix"&&L.instanceMatrix&&(Me=L.instanceMatrix),ue==="instanceColor"&&L.instanceColor&&(Me=L.instanceColor)),ge===void 0||ge.attribute!==Me||Me&&ge.data!==Me.data)return!0;W++}return a.attributesNum!==W||a.index!==Q}function x(L,V,ae,Q){const X={},Y=V.attributes;let W=0;const ee=ae.getAttributes();for(const ue in ee)if(ee[ue].location>=0){let ge=Y[ue];ge===void 0&&(ue==="instanceMatrix"&&L.instanceMatrix&&(ge=L.instanceMatrix),ue==="instanceColor"&&L.instanceColor&&(ge=L.instanceColor));const Me={};Me.attribute=ge,ge&&ge.data&&(Me.data=ge.data),X[ue]=Me,W++}a.attributes=X,a.attributesNum=W,a.index=Q}function P(){const L=a.newAttributes;for(let V=0,ae=L.length;V<ae;V++)L[V]=0}function c(L){u(L,0)}function u(L,V){const ae=a.newAttributes,Q=a.enabledAttributes,X=a.attributeDivisors;ae[L]=1,Q[L]===0&&(e.enableVertexAttribArray(L),Q[L]=1),X[L]!==V&&(e.vertexAttribDivisor(L,V),X[L]=V)}function y(){const L=a.newAttributes,V=a.enabledAttributes;for(let ae=0,Q=V.length;ae<Q;ae++)V[ae]!==L[ae]&&(e.disableVertexAttribArray(ae),V[ae]=0)}function R(L,V,ae,Q,X,Y,W){W===!0?e.vertexAttribIPointer(L,V,ae,X,Y):e.vertexAttribPointer(L,V,ae,Q,X,Y)}function S(L,V,ae,Q){P();const X=Q.attributes,Y=ae.getAttributes(),W=V.defaultAttributeValues;for(const ee in Y){const ue=Y[ee];if(ue.location>=0){let Re=X[ee];if(Re===void 0&&(ee==="instanceMatrix"&&L.instanceMatrix&&(Re=L.instanceMatrix),ee==="instanceColor"&&L.instanceColor&&(Re=L.instanceColor)),Re!==void 0){const ge=Re.normalized,Me=Re.itemSize,Xe=t.get(Re);if(Xe===void 0)continue;const it=Xe.buffer,Ye=Xe.type,j=Xe.bytesPerElement,N=Ye===e.INT||Ye===e.UNSIGNED_INT||Re.gpuType===Ns;if(Re.isInterleavedBufferAttribute){const z=Re.data,ce=z.stride,le=Re.offset;if(z.isInstancedInterleavedBuffer){for(let de=0;de<ue.locationSize;de++)u(ue.location+de,z.meshPerAttribute);L.isInstancedMesh!==!0&&Q._maxInstanceCount===void 0&&(Q._maxInstanceCount=z.meshPerAttribute*z.count)}else for(let de=0;de<ue.locationSize;de++)c(ue.location+de);e.bindBuffer(e.ARRAY_BUFFER,it);for(let de=0;de<ue.locationSize;de++)R(ue.location+de,Me/ue.locationSize,Ye,ge,ce*j,(le+Me/ue.locationSize*de)*j,N)}else{if(Re.isInstancedBufferAttribute){for(let z=0;z<ue.locationSize;z++)u(ue.location+z,Re.meshPerAttribute);L.isInstancedMesh!==!0&&Q._maxInstanceCount===void 0&&(Q._maxInstanceCount=Re.meshPerAttribute*Re.count)}else for(let z=0;z<ue.locationSize;z++)c(ue.location+z);e.bindBuffer(e.ARRAY_BUFFER,it);for(let z=0;z<ue.locationSize;z++)R(ue.location+z,Me/ue.locationSize,Ye,ge,Me*j,Me/ue.locationSize*z*j,N)}}else if(W!==void 0){const ge=W[ee];if(ge!==void 0)switch(ge.length){case 2:e.vertexAttrib2fv(ue.location,ge);break;case 3:e.vertexAttrib3fv(ue.location,ge);break;case 4:e.vertexAttrib4fv(ue.location,ge);break;default:e.vertexAttrib1fv(ue.location,ge)}}}}y()}function T(){A();for(const L in i){const V=i[L];for(const ae in V){const Q=V[ae];for(const X in Q){const Y=Q[X];for(const W in Y)g(Y[W].object),delete Y[W];delete Q[X]}}delete i[L]}}function b(L){if(i[L.id]===void 0)return;const V=i[L.id];for(const ae in V){const Q=V[ae];for(const X in Q){const Y=Q[X];for(const W in Y)g(Y[W].object),delete Y[W];delete Q[X]}}delete i[L.id]}function w(L){for(const V in i){const ae=i[V];for(const Q in ae){const X=ae[Q];if(X[L.id]===void 0)continue;const Y=X[L.id];for(const W in Y)g(Y[W].object),delete Y[W];delete X[L.id]}}}function m(L){for(const V in i){const ae=i[V],Q=L.isInstancedMesh===!0?L.id:0,X=ae[Q];if(X!==void 0){for(const Y in X){const W=X[Y];for(const ee in W)g(W[ee].object),delete W[ee];delete X[Y]}delete ae[Q],Object.keys(ae).length===0&&delete i[V]}}}function A(){O(),o=!0,a!==r&&(a=r,f(a.object))}function O(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:s,reset:A,resetDefaultState:O,dispose:T,releaseStatesOfGeometry:b,releaseStatesOfObject:m,releaseStatesOfProgram:w,initAttributes:P,enableAttribute:c,disableUnusedAttributes:y}}function Dp(e,t,n){let i;function r(h){i=h}function a(h,f){e.drawArrays(i,h,f),n.update(f,i,1)}function o(h,f,g){g!==0&&(e.drawArraysInstanced(i,h,f,g),n.update(f,i,g))}function s(h,f,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,h,0,f,0,g);let l=0;for(let _=0;_<g;_++)l+=f[_];n.update(l,i,1)}this.setMode=r,this.render=a,this.renderInstances=o,this.renderMultiDraw=s}function Lp(e,t,n,i){let r;function a(){if(r!==void 0)return r;if(t.has("EXT_texture_filter_anisotropic")===!0){const w=t.get("EXT_texture_filter_anisotropic");r=e.getParameter(w.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function o(w){return!(w!==_n&&i.convert(w)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT))}function s(w){const m=w===yn&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(w!==an&&i.convert(w)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE)&&w!==bn&&!m)}function h(w){if(w==="highp"){if(e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).precision>0)return"highp";w="mediump"}return w==="mediump"&&e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let f=n.precision!==void 0?n.precision:"highp";const g=h(f);g!==f&&(at("WebGLRenderer:",f,"not supported, using",g,"instead."),f=g);const p=n.logarithmicDepthBuffer===!0,l=n.reversedDepthBuffer===!0&&t.has("EXT_clip_control");n.reversedDepthBuffer===!0&&l===!1&&at("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const _=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),x=e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),P=e.getParameter(e.MAX_TEXTURE_SIZE),c=e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),u=e.getParameter(e.MAX_VERTEX_ATTRIBS),y=e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),R=e.getParameter(e.MAX_VARYING_VECTORS),S=e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),T=e.getParameter(e.MAX_SAMPLES),b=e.getParameter(e.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:a,getMaxPrecision:h,textureFormatReadable:o,textureTypeReadable:s,precision:f,logarithmicDepthBuffer:p,reversedDepthBuffer:l,maxTextures:_,maxVertexTextures:x,maxTextureSize:P,maxCubemapSize:c,maxAttributes:u,maxVertexUniforms:y,maxVaryings:R,maxFragmentUniforms:S,maxSamples:T,samples:b}}function Ip(e){const t=this;let n=null,i=0,r=!1,a=!1;const o=new Ps,s=new nt,h={value:null,needsUpdate:!1};this.uniform=h,this.numPlanes=0,this.numIntersection=0,this.init=function(p,l){const _=p.length!==0||l||i!==0||r;return r=l,i=p.length,_},this.beginShadows=function(){a=!0,g(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(p,l){n=g(p,l,0)},this.setState=function(p,l,_){const x=p.clippingPlanes,P=p.clipIntersection,c=p.clipShadows,u=e.get(p);if(!r||x===null||x.length===0||a&&!c)a?g(null):f();else{const y=a?0:i,R=y*4;let S=u.clippingState||null;h.value=S,S=g(x,l,R,_);for(let T=0;T!==R;++T)S[T]=n[T];u.clippingState=S,this.numIntersection=P?this.numPlanes:0,this.numPlanes+=y}};function f(){h.value!==n&&(h.value=n,h.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function g(p,l,_,x){const P=p!==null?p.length:0;let c=null;if(P!==0){if(c=h.value,x!==!0||c===null){const u=_+P*4,y=l.matrixWorldInverse;s.getNormalMatrix(y),(c===null||c.length<u)&&(c=new Float32Array(u));for(let R=0,S=_;R!==P;++R,S+=4)o.copy(p[R]).applyMatrix4(y,s),o.normal.toArray(c,S),c[S+3]=o.constant}h.value=c,h.needsUpdate=!0}return t.numPlanes=P,t.numIntersection=0,c}}const Tn=4,uo=[.125,.215,.35,.446,.526,.582],Ln=20,Np=256,fi=new ys,fo=new dt;let Pr=null,Rr=0,wr=0,Cr=!1;const Up=new ne;class po{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(t,n=0,i=.1,r=100,a={}){const{size:o=256,position:s=Up}=a;Pr=this._renderer.getRenderTarget(),Rr=this._renderer.getActiveCubeFace(),wr=this._renderer.getActiveMipmapLevel(),Cr=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);const h=this._allocateTargets();return h.depthBuffer=!0,this._sceneToCubeUV(t,i,r,h,s),n>0&&this._blur(h,0,0,n),this._applyPMREM(h),this._cleanup(h),h}fromEquirectangular(t,n=null){return this._fromTexture(t,n)}fromCubemap(t,n=null){return this._fromTexture(t,n)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=_o(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=mo(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodMeshes.length;t++)this._lodMeshes[t].geometry.dispose()}_cleanup(t){this._renderer.setRenderTarget(Pr,Rr,wr),this._renderer.xr.enabled=Cr,t.scissorTest=!1,Vn(t,0,0,t.width,t.height)}_fromTexture(t,n){t.mapping===Pi||t.mapping===ei?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Pr=this._renderer.getRenderTarget(),Rr=this._renderer.getActiveCubeFace(),wr=this._renderer.getActiveMipmapLevel(),Cr=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=n||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),n=4*this._cubeSize,i={magFilter:Yt,minFilter:Yt,generateMipmaps:!1,type:yn,format:_n,colorSpace:Ys,depthBuffer:!1},r=ho(t,n,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==n){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=ho(t,n,i);const{_lodMax:a}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=Fp(a)),this._blurMaterial=Bp(a,t,n),this._ggxMaterial=Op(a,t,n)}return r}_compileMaterial(t){const n=new Bt(new ti,t);this._renderer.compile(n,fi)}_sceneToCubeUV(t,n,i,r,a){const h=new Si(90,1,n,i),f=[1,-1,1,1,1,1],g=[1,1,1,-1,-1,-1],p=this._renderer,l=p.autoClear,_=p.toneMapping;p.getClearColor(fo),p.toneMapping=un,p.autoClear=!1,p.state.buffers.depth.getReversed()&&(p.setRenderTarget(r),p.clearDepth(),p.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Bt(new ua,new ur({name:"PMREM.Background",side:Kt,depthWrite:!1,depthTest:!1})));const P=this._backgroundBox,c=P.material;let u=!1;const y=t.background;y?y.isColor&&(c.color.copy(y),t.background=null,u=!0):(c.color.copy(fo),u=!0);for(let R=0;R<6;R++){const S=R%3;S===0?(h.up.set(0,f[R],0),h.position.set(a.x,a.y,a.z),h.lookAt(a.x+g[R],a.y,a.z)):S===1?(h.up.set(0,0,f[R]),h.position.set(a.x,a.y,a.z),h.lookAt(a.x,a.y+g[R],a.z)):(h.up.set(0,f[R],0),h.position.set(a.x,a.y,a.z),h.lookAt(a.x,a.y,a.z+g[R]));const T=this._cubeSize;Vn(r,S*T,R>2?T:0,T,T),p.setRenderTarget(r),u&&p.render(P,h),p.render(t,h)}p.toneMapping=_,p.autoClear=l,t.background=y}_textureToCubeUV(t,n){const i=this._renderer,r=t.mapping===Pi||t.mapping===ei;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=_o()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=mo());const a=r?this._cubemapMaterial:this._equirectMaterial,o=this._lodMeshes[0];o.material=a;const s=a.uniforms;s.envMap.value=t;const h=this._cubeSize;Vn(n,0,0,3*h,2*h),i.setRenderTarget(n),i.render(o,fi)}_applyPMREM(t){const n=this._renderer,i=n.autoClear;n.autoClear=!1;const r=this._lodMeshes.length;for(let a=1;a<r;a++)this._applyGGXFilter(t,a-1,a);n.autoClear=i}_applyGGXFilter(t,n,i){const r=this._renderer,a=this._pingPongRenderTarget,o=this._ggxMaterial,s=this._lodMeshes[i];s.material=o;const h=o.uniforms,f=i/(this._lodMeshes.length-1),g=n/(this._lodMeshes.length-1),p=Math.sqrt(f*f-g*g),l=0+f*1.25,_=p*l,{_lodMax:x}=this,P=this._sizeLods[i],c=3*P*(i>x-Tn?i-x+Tn:0),u=4*(this._cubeSize-P);h.envMap.value=t.texture,h.roughness.value=_,h.mipInt.value=x-n,Vn(a,c,u,3*P,2*P),r.setRenderTarget(a),r.render(s,fi),h.envMap.value=a.texture,h.roughness.value=0,h.mipInt.value=x-i,Vn(t,c,u,3*P,2*P),r.setRenderTarget(t),r.render(s,fi)}_blur(t,n,i,r,a){const o=this._pingPongRenderTarget;this._halfBlur(t,o,n,i,r,"latitudinal",a),this._halfBlur(o,t,i,i,r,"longitudinal",a)}_halfBlur(t,n,i,r,a,o,s){const h=this._renderer,f=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&gt("blur direction must be either latitudinal or longitudinal!");const g=3,p=this._lodMeshes[r];p.material=f;const l=f.uniforms,_=this._sizeLods[i]-1,x=isFinite(a)?Math.PI/(2*_):2*Math.PI/(2*Ln-1),P=a/x,c=isFinite(a)?1+Math.floor(g*P):Ln;c>Ln&&at(`sigmaRadians, ${a}, is too large and will clip, as it requested ${c} samples when the maximum is set to ${Ln}`);const u=[];let y=0;for(let w=0;w<Ln;++w){const m=w/P,A=Math.exp(-m*m/2);u.push(A),w===0?y+=A:w<c&&(y+=2*A)}for(let w=0;w<u.length;w++)u[w]=u[w]/y;l.envMap.value=t.texture,l.samples.value=c,l.weights.value=u,l.latitudinal.value=o==="latitudinal",s&&(l.poleAxis.value=s);const{_lodMax:R}=this;l.dTheta.value=x,l.mipInt.value=R-i;const S=this._sizeLods[r],T=3*S*(r>R-Tn?r-R+Tn:0),b=4*(this._cubeSize-S);Vn(n,T,b,3*S,2*S),h.setRenderTarget(n),h.render(p,fi)}}function Fp(e){const t=[],n=[],i=[];let r=e;const a=e-Tn+1+uo.length;for(let o=0;o<a;o++){const s=Math.pow(2,r);t.push(s);let h=1/s;o>e-Tn?h=uo[o-e+Tn-1]:o===0&&(h=0),n.push(h);const f=1/(s-2),g=-f,p=1+f,l=[g,g,p,g,p,p,g,g,p,p,g,p],_=6,x=6,P=3,c=2,u=1,y=new Float32Array(P*x*_),R=new Float32Array(c*x*_),S=new Float32Array(u*x*_);for(let b=0;b<_;b++){const w=b%3*2/3-1,m=b>2?0:-1,A=[w,m,0,w+2/3,m,0,w+2/3,m+1,0,w,m,0,w+2/3,m+1,0,w,m+1,0];y.set(A,P*x*b),R.set(l,c*x*b);const O=[b,b,b,b,b,b];S.set(O,u*x*b)}const T=new ti;T.setAttribute("position",new Ei(y,P)),T.setAttribute("uv",new Ei(R,c)),T.setAttribute("faceIndex",new Ei(S,u)),i.push(new Bt(T,null)),r>Tn&&r--}return{lodMeshes:i,sizeLods:t,sigmas:n}}function ho(e,t,n){const i=new dn(e,t,n);return i.texture.mapping=lr,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Vn(e,t,n,i,r){e.viewport.set(t,n,i,r),e.scissor.set(t,n,i,r)}function Op(e,t,n){return new Qt({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:Np,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:fr(),fragmentShader:`

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
		`,blending:gn,depthTest:!1,depthWrite:!1})}function Bp(e,t,n){const i=new Float32Array(Ln),r=new ne(0,1,0);return new Qt({name:"SphericalGaussianBlur",defines:{n:Ln,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:fr(),fragmentShader:`

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
		`,blending:gn,depthTest:!1,depthWrite:!1})}function mo(){return new Qt({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:fr(),fragmentShader:`

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
		`,blending:gn,depthTest:!1,depthWrite:!1})}function _o(){return new Qt({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:fr(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:gn,depthTest:!1,depthWrite:!1})}function fr(){return`

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
	`}class rc extends dn{constructor(t=1,n={}){super(t,t,n),this.isWebGLCubeRenderTarget=!0;const i={width:t,height:t,depth:1},r=[i,i,i,i,i,i];this.texture=new Os(r),this._setTextureOptions(n),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,n){this.texture.type=n.type,this.texture.colorSpace=n.colorSpace,this.texture.generateMipmaps=n.generateMipmaps,this.texture.minFilter=n.minFilter,this.texture.magFilter=n.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new ua(5,5,5),a=new Qt({name:"CubemapFromEquirect",uniforms:Kr(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Kt,blending:gn});a.uniforms.tEquirect.value=n;const o=new Bt(r,a),s=n.minFilter;return n.minFilter===Xn&&(n.minFilter=Yt),new Xl(1,10,this).update(t,o),n.minFilter=s,o.geometry.dispose(),o.material.dispose(),this}clear(t,n=!0,i=!0,r=!0){const a=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(n,i,r);t.setRenderTarget(a)}}function Gp(e){let t=new WeakMap,n=new WeakMap,i=null;function r(l,_=!1){return l==null?null:_?o(l):a(l)}function a(l){if(l&&l.isTexture){const _=l.mapping;if(_===br||_===Tr)if(t.has(l)){const x=t.get(l).texture;return s(x,l.mapping)}else{const x=l.image;if(x&&x.height>0){const P=new rc(x.height);return P.fromEquirectangularTexture(e,l),t.set(l,P),l.addEventListener("dispose",f),s(P.texture,l.mapping)}else return null}}return l}function o(l){if(l&&l.isTexture){const _=l.mapping,x=_===br||_===Tr,P=_===Pi||_===ei;if(x||P){let c=n.get(l);const u=c!==void 0?c.texture.pmremVersion:0;if(l.isRenderTargetTexture&&l.pmremVersion!==u)return i===null&&(i=new po(e)),c=x?i.fromEquirectangular(l,c):i.fromCubemap(l,c),c.texture.pmremVersion=l.pmremVersion,n.set(l,c),c.texture;if(c!==void 0)return c.texture;{const y=l.image;return x&&y&&y.height>0||P&&y&&h(y)?(i===null&&(i=new po(e)),c=x?i.fromEquirectangular(l):i.fromCubemap(l),c.texture.pmremVersion=l.pmremVersion,n.set(l,c),l.addEventListener("dispose",g),c.texture):null}}}return l}function s(l,_){return _===br?l.mapping=Pi:_===Tr&&(l.mapping=ei),l}function h(l){let _=0;const x=6;for(let P=0;P<x;P++)l[P]!==void 0&&_++;return _===x}function f(l){const _=l.target;_.removeEventListener("dispose",f);const x=t.get(_);x!==void 0&&(t.delete(_),x.dispose())}function g(l){const _=l.target;_.removeEventListener("dispose",g);const x=n.get(_);x!==void 0&&(n.delete(_),x.dispose())}function p(){t=new WeakMap,n=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:r,dispose:p}}function Hp(e){const t={};function n(i){if(t[i]!==void 0)return t[i];const r=e.getExtension(i);return t[i]=r,r}return{has:function(i){return n(i)!==null},init:function(){n("EXT_color_buffer_float"),n("WEBGL_clip_cull_distance"),n("OES_texture_float_linear"),n("EXT_color_buffer_half_float"),n("WEBGL_multisampled_render_to_texture"),n("WEBGL_render_shared_exponent")},get:function(i){const r=n(i);return r===null&&jc("WebGLRenderer: "+i+" extension not supported."),r}}}function Vp(e,t,n,i){const r={},a=new WeakMap;function o(p){const l=p.target;l.index!==null&&t.remove(l.index);for(const x in l.attributes)t.remove(l.attributes[x]);l.removeEventListener("dispose",o),delete r[l.id];const _=a.get(l);_&&(t.remove(_),a.delete(l)),i.releaseStatesOfGeometry(l),l.isInstancedBufferGeometry===!0&&delete l._maxInstanceCount,n.memory.geometries--}function s(p,l){return r[l.id]===!0||(l.addEventListener("dispose",o),r[l.id]=!0,n.memory.geometries++),l}function h(p){const l=p.attributes;for(const _ in l)t.update(l[_],e.ARRAY_BUFFER)}function f(p){const l=[],_=p.index,x=p.attributes.position;let P=0;if(x===void 0)return;if(_!==null){const y=_.array;P=_.version;for(let R=0,S=y.length;R<S;R+=3){const T=y[R+0],b=y[R+1],w=y[R+2];l.push(T,b,b,w,w,T)}}else{const y=x.array;P=x.version;for(let R=0,S=y.length/3-1;R<S;R+=3){const T=R+0,b=R+1,w=R+2;l.push(T,b,b,w,w,T)}}const c=new(x.count>=65535?Yl:Kl)(l,1);c.version=P;const u=a.get(p);u&&t.remove(u),a.set(p,c)}function g(p){const l=a.get(p);if(l){const _=p.index;_!==null&&l.version<_.version&&f(p)}else f(p);return a.get(p)}return{get:s,update:h,getWireframeAttribute:g}}function zp(e,t,n){let i;function r(p){i=p}let a,o;function s(p){a=p.type,o=p.bytesPerElement}function h(p,l){e.drawElements(i,l,a,p*o),n.update(l,i,1)}function f(p,l,_){_!==0&&(e.drawElementsInstanced(i,l,a,p*o,_),n.update(l,i,_))}function g(p,l,_){if(_===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,l,0,a,p,0,_);let P=0;for(let c=0;c<_;c++)P+=l[c];n.update(P,i,1)}this.setMode=r,this.setIndex=s,this.render=h,this.renderInstances=f,this.renderMultiDraw=g}function kp(e){const t={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function i(a,o,s){switch(n.calls++,o){case e.TRIANGLES:n.triangles+=s*(a/3);break;case e.LINES:n.lines+=s*(a/2);break;case e.LINE_STRIP:n.lines+=s*(a-1);break;case e.LINE_LOOP:n.lines+=s*a;break;case e.POINTS:n.points+=s*a;break;default:gt("WebGLInfo: Unknown draw mode:",o);break}}function r(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:t,render:n,programs:null,autoReset:!0,reset:r,update:i}}function Wp(e,t,n){const i=new WeakMap,r=new Pt;function a(o,s,h){const f=o.morphTargetInfluences,g=s.morphAttributes.position||s.morphAttributes.normal||s.morphAttributes.color,p=g!==void 0?g.length:0;let l=i.get(s);if(l===void 0||l.count!==p){let A=function(){w.dispose(),i.delete(s),s.removeEventListener("dispose",A)};l!==void 0&&l.texture.dispose();const _=s.morphAttributes.position!==void 0,x=s.morphAttributes.normal!==void 0,P=s.morphAttributes.color!==void 0,c=s.morphAttributes.position||[],u=s.morphAttributes.normal||[],y=s.morphAttributes.color||[];let R=0;_===!0&&(R=1),x===!0&&(R=2),P===!0&&(R=3);let S=s.attributes.position.count*R,T=1;S>t.maxTextureSize&&(T=Math.ceil(S/t.maxTextureSize),S=t.maxTextureSize);const b=new Float32Array(S*T*4*p),w=new Us(b,S,T,p);w.type=bn,w.needsUpdate=!0;const m=R*4;for(let O=0;O<p;O++){const L=c[O],V=u[O],ae=y[O],Q=S*T*4*O;for(let X=0;X<L.count;X++){const Y=X*m;_===!0&&(r.fromBufferAttribute(L,X),b[Q+Y+0]=r.x,b[Q+Y+1]=r.y,b[Q+Y+2]=r.z,b[Q+Y+3]=0),x===!0&&(r.fromBufferAttribute(V,X),b[Q+Y+4]=r.x,b[Q+Y+5]=r.y,b[Q+Y+6]=r.z,b[Q+Y+7]=0),P===!0&&(r.fromBufferAttribute(ae,X),b[Q+Y+8]=r.x,b[Q+Y+9]=r.y,b[Q+Y+10]=r.z,b[Q+Y+11]=ae.itemSize===4?r.w:1)}}l={count:p,texture:w,size:new We(S,T)},i.set(s,l),s.addEventListener("dispose",A)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)h.getUniforms().setValue(e,"morphTexture",o.morphTexture,n);else{let _=0;for(let P=0;P<f.length;P++)_+=f[P];const x=s.morphTargetsRelative?1:1-_;h.getUniforms().setValue(e,"morphTargetBaseInfluence",x),h.getUniforms().setValue(e,"morphTargetInfluences",f)}h.getUniforms().setValue(e,"morphTargetsTexture",l.texture,n),h.getUniforms().setValue(e,"morphTargetsTextureSize",l.size)}return{update:a}}function Xp(e,t,n,i,r){let a=new WeakMap;function o(f){const g=r.render.frame,p=f.geometry,l=t.get(f,p);if(a.get(l)!==g&&(t.update(l),a.set(l,g)),f.isInstancedMesh&&(f.hasEventListener("dispose",h)===!1&&f.addEventListener("dispose",h),a.get(f)!==g&&(n.update(f.instanceMatrix,e.ARRAY_BUFFER),f.instanceColor!==null&&n.update(f.instanceColor,e.ARRAY_BUFFER),a.set(f,g))),f.isSkinnedMesh){const _=f.skeleton;a.get(_)!==g&&(_.update(),a.set(_,g))}return l}function s(){a=new WeakMap}function h(f){const g=f.target;g.removeEventListener("dispose",h),i.releaseStatesOfObject(g),n.remove(g.instanceMatrix),g.instanceColor!==null&&n.remove(g.instanceColor)}return{update:o,dispose:s}}const Yp={[Ws]:"LINEAR_TONE_MAPPING",[ks]:"REINHARD_TONE_MAPPING",[zs]:"CINEON_TONE_MAPPING",[Vs]:"ACES_FILMIC_TONE_MAPPING",[Hs]:"AGX_TONE_MAPPING",[Gs]:"NEUTRAL_TONE_MAPPING",[Bs]:"CUSTOM_TONE_MAPPING"};function Kp(e,t,n,i,r,a){const o=new dn(t,n,{type:e,depthBuffer:r,stencilBuffer:a,samples:i?4:0,depthTexture:r?new Ti(t,n):void 0}),s=new dn(t,n,{type:yn,depthBuffer:!1,stencilBuffer:!1}),h=new ti;h.setAttribute("position",new Ai([-1,3,0,-1,-1,0,3,-1,0],3)),h.setAttribute("uv",new Ai([0,2,0,0,2,0],2));const f=new Xc({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),g=new Bt(h,f),p=new ys(-1,1,1,-1,0,1);let l=null,_=null,x=!1,P,c=null,u=[],y=!1;this.setSize=function(R,S){o.setSize(R,S),s.setSize(R,S);for(let T=0;T<u.length;T++){const b=u[T];b.setSize&&b.setSize(R,S)}},this.setEffects=function(R){u=R,y=u.length>0&&u[0].isRenderPass===!0;const S=o.width,T=o.height;for(let b=0;b<u.length;b++){const w=u[b];w.setSize&&w.setSize(S,T)}},this.begin=function(R,S){if(x||R.toneMapping===un&&u.length===0)return!1;if(c=S,S!==null){const T=S.width,b=S.height;(o.width!==T||o.height!==b)&&this.setSize(T,b)}return y===!1&&R.setRenderTarget(o),P=R.toneMapping,R.toneMapping=un,!0},this.hasRenderPass=function(){return y},this.end=function(R,S){R.toneMapping=P,x=!0;let T=o,b=s;for(let w=0;w<u.length;w++){const m=u[w];if(m.enabled!==!1&&(m.render(R,b,T,S),m.needsSwap!==!1)){const A=T;T=b,b=A}}if(l!==R.outputColorSpace||_!==R.toneMapping){l=R.outputColorSpace,_=R.toneMapping,f.defines={},Et.getTransfer(l)===mt&&(f.defines.SRGB_TRANSFER="");const w=Yp[_];w&&(f.defines[w]=""),f.needsUpdate=!0}f.uniforms.tDiffuse.value=T.texture,R.setRenderTarget(c),R.render(g,p),c=null,x=!1},this.isCompositing=function(){return x},this.dispose=function(){o.depthTexture&&o.depthTexture.dispose(),o.dispose(),s.dispose(),h.dispose(),f.dispose()}}const ac=new eu,Zr=new Ti(1,1),oc=new Us,sc=new $l,cc=new Os,go=[],vo=[],xo=new Float32Array(16),So=new Float32Array(9),Eo=new Float32Array(4);function ni(e,t,n){const i=e[0];if(i<=0||i>0)return e;const r=t*n;let a=go[r];if(a===void 0&&(a=new Float32Array(r),go[r]=a),t!==0){i.toArray(a,0);for(let o=1,s=0;o!==t;++o)s+=n,e[o].toArray(a,s)}return a}function Rt(e,t){if(e.length!==t.length)return!1;for(let n=0,i=e.length;n<i;n++)if(e[n]!==t[n])return!1;return!0}function wt(e,t){for(let n=0,i=t.length;n<i;n++)e[n]=t[n]}function pr(e,t){let n=vo[t];n===void 0&&(n=new Int32Array(t),vo[t]=n);for(let i=0;i!==t;++i)n[i]=e.allocateTextureUnit();return n}function qp(e,t){const n=this.cache;n[0]!==t&&(e.uniform1f(this.addr,t),n[0]=t)}function $p(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2f(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Rt(n,t))return;e.uniform2fv(this.addr,t),wt(n,t)}}function jp(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3f(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else if(t.r!==void 0)(n[0]!==t.r||n[1]!==t.g||n[2]!==t.b)&&(e.uniform3f(this.addr,t.r,t.g,t.b),n[0]=t.r,n[1]=t.g,n[2]=t.b);else{if(Rt(n,t))return;e.uniform3fv(this.addr,t),wt(n,t)}}function Zp(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4f(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Rt(n,t))return;e.uniform4fv(this.addr,t),wt(n,t)}}function Qp(e,t){const n=this.cache,i=t.elements;if(i===void 0){if(Rt(n,t))return;e.uniformMatrix2fv(this.addr,!1,t),wt(n,t)}else{if(Rt(n,i))return;Eo.set(i),e.uniformMatrix2fv(this.addr,!1,Eo),wt(n,i)}}function Jp(e,t){const n=this.cache,i=t.elements;if(i===void 0){if(Rt(n,t))return;e.uniformMatrix3fv(this.addr,!1,t),wt(n,t)}else{if(Rt(n,i))return;So.set(i),e.uniformMatrix3fv(this.addr,!1,So),wt(n,i)}}function eh(e,t){const n=this.cache,i=t.elements;if(i===void 0){if(Rt(n,t))return;e.uniformMatrix4fv(this.addr,!1,t),wt(n,t)}else{if(Rt(n,i))return;xo.set(i),e.uniformMatrix4fv(this.addr,!1,xo),wt(n,i)}}function th(e,t){const n=this.cache;n[0]!==t&&(e.uniform1i(this.addr,t),n[0]=t)}function nh(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2i(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Rt(n,t))return;e.uniform2iv(this.addr,t),wt(n,t)}}function ih(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3i(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(Rt(n,t))return;e.uniform3iv(this.addr,t),wt(n,t)}}function rh(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4i(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Rt(n,t))return;e.uniform4iv(this.addr,t),wt(n,t)}}function ah(e,t){const n=this.cache;n[0]!==t&&(e.uniform1ui(this.addr,t),n[0]=t)}function oh(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2ui(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Rt(n,t))return;e.uniform2uiv(this.addr,t),wt(n,t)}}function sh(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3ui(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(Rt(n,t))return;e.uniform3uiv(this.addr,t),wt(n,t)}}function ch(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4ui(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Rt(n,t))return;e.uniform4uiv(this.addr,t),wt(n,t)}}function lh(e,t,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(e.uniform1i(this.addr,r),i[0]=r);let a;this.type===e.SAMPLER_2D_SHADOW?(Zr.compareFunction=n.isReversedDepthBuffer()?sa:ca,a=Zr):a=ac,n.setTexture2D(t||a,r)}function uh(e,t,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(e.uniform1i(this.addr,r),i[0]=r),n.setTexture3D(t||sc,r)}function dh(e,t,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(e.uniform1i(this.addr,r),i[0]=r),n.setTextureCube(t||cc,r)}function fh(e,t,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(e.uniform1i(this.addr,r),i[0]=r),n.setTexture2DArray(t||oc,r)}function ph(e){switch(e){case 5126:return qp;case 35664:return $p;case 35665:return jp;case 35666:return Zp;case 35674:return Qp;case 35675:return Jp;case 35676:return eh;case 5124:case 35670:return th;case 35667:case 35671:return nh;case 35668:case 35672:return ih;case 35669:case 35673:return rh;case 5125:return ah;case 36294:return oh;case 36295:return sh;case 36296:return ch;case 35678:case 36198:case 36298:case 36306:case 35682:return lh;case 35679:case 36299:case 36307:return uh;case 35680:case 36300:case 36308:case 36293:return dh;case 36289:case 36303:case 36311:case 36292:return fh}}function hh(e,t){e.uniform1fv(this.addr,t)}function mh(e,t){const n=ni(t,this.size,2);e.uniform2fv(this.addr,n)}function _h(e,t){const n=ni(t,this.size,3);e.uniform3fv(this.addr,n)}function gh(e,t){const n=ni(t,this.size,4);e.uniform4fv(this.addr,n)}function vh(e,t){const n=ni(t,this.size,4);e.uniformMatrix2fv(this.addr,!1,n)}function xh(e,t){const n=ni(t,this.size,9);e.uniformMatrix3fv(this.addr,!1,n)}function Sh(e,t){const n=ni(t,this.size,16);e.uniformMatrix4fv(this.addr,!1,n)}function Eh(e,t){e.uniform1iv(this.addr,t)}function Mh(e,t){e.uniform2iv(this.addr,t)}function bh(e,t){e.uniform3iv(this.addr,t)}function Th(e,t){e.uniform4iv(this.addr,t)}function Ah(e,t){e.uniform1uiv(this.addr,t)}function yh(e,t){e.uniform2uiv(this.addr,t)}function Ph(e,t){e.uniform3uiv(this.addr,t)}function Rh(e,t){e.uniform4uiv(this.addr,t)}function wh(e,t,n){const i=this.cache,r=t.length,a=pr(n,r);Rt(i,a)||(e.uniform1iv(this.addr,a),wt(i,a));let o;this.type===e.SAMPLER_2D_SHADOW?o=Zr:o=ac;for(let s=0;s!==r;++s)n.setTexture2D(t[s]||o,a[s])}function Ch(e,t,n){const i=this.cache,r=t.length,a=pr(n,r);Rt(i,a)||(e.uniform1iv(this.addr,a),wt(i,a));for(let o=0;o!==r;++o)n.setTexture3D(t[o]||sc,a[o])}function Dh(e,t,n){const i=this.cache,r=t.length,a=pr(n,r);Rt(i,a)||(e.uniform1iv(this.addr,a),wt(i,a));for(let o=0;o!==r;++o)n.setTextureCube(t[o]||cc,a[o])}function Lh(e,t,n){const i=this.cache,r=t.length,a=pr(n,r);Rt(i,a)||(e.uniform1iv(this.addr,a),wt(i,a));for(let o=0;o!==r;++o)n.setTexture2DArray(t[o]||oc,a[o])}function Ih(e){switch(e){case 5126:return hh;case 35664:return mh;case 35665:return _h;case 35666:return gh;case 35674:return vh;case 35675:return xh;case 35676:return Sh;case 5124:case 35670:return Eh;case 35667:case 35671:return Mh;case 35668:case 35672:return bh;case 35669:case 35673:return Th;case 5125:return Ah;case 36294:return yh;case 36295:return Ph;case 36296:return Rh;case 35678:case 36198:case 36298:case 36306:case 35682:return wh;case 35679:case 36299:case 36307:return Ch;case 35680:case 36300:case 36308:case 36293:return Dh;case 36289:case 36303:case 36311:case 36292:return Lh}}class Nh{constructor(t,n,i){this.id=t,this.addr=i,this.cache=[],this.type=n.type,this.setValue=ph(n.type)}}class Uh{constructor(t,n,i){this.id=t,this.addr=i,this.cache=[],this.type=n.type,this.size=n.size,this.setValue=Ih(n.type)}}class Fh{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,n,i){const r=this.seq;for(let a=0,o=r.length;a!==o;++a){const s=r[a];s.setValue(t,n[s.id],i)}}}const Dr=/(\w+)(\])?(\[|\.)?/g;function Mo(e,t){e.seq.push(t),e.map[t.id]=t}function Oh(e,t,n){const i=e.name,r=i.length;for(Dr.lastIndex=0;;){const a=Dr.exec(i),o=Dr.lastIndex;let s=a[1];const h=a[2]==="]",f=a[3];if(h&&(s=s|0),f===void 0||f==="["&&o+2===r){Mo(n,f===void 0?new Nh(s,e,t):new Uh(s,e,t));break}else{let p=n.map[s];p===void 0&&(p=new Fh(s),Mo(n,p)),n=p}}}class er{constructor(t,n){this.seq=[],this.map={};const i=t.getProgramParameter(n,t.ACTIVE_UNIFORMS);for(let o=0;o<i;++o){const s=t.getActiveUniform(n,o),h=t.getUniformLocation(n,s.name);Oh(s,h,this)}const r=[],a=[];for(const o of this.seq)o.type===t.SAMPLER_2D_SHADOW||o.type===t.SAMPLER_CUBE_SHADOW||o.type===t.SAMPLER_2D_ARRAY_SHADOW?r.push(o):a.push(o);r.length>0&&(this.seq=r.concat(a))}setValue(t,n,i,r){const a=this.map[n];a!==void 0&&a.setValue(t,i,r)}setOptional(t,n,i){const r=n[i];r!==void 0&&this.setValue(t,i,r)}static upload(t,n,i,r){for(let a=0,o=n.length;a!==o;++a){const s=n[a],h=i[s.id];h.needsUpdate!==!1&&s.setValue(t,h.value,r)}}static seqWithValue(t,n){const i=[];for(let r=0,a=t.length;r!==a;++r){const o=t[r];o.id in n&&i.push(o)}return i}}function bo(e,t,n){const i=e.createShader(t);return e.shaderSource(i,n),e.compileShader(i),i}const Bh=37297;let Gh=0;function Hh(e,t){const n=e.split(`
`),i=[],r=Math.max(t-6,0),a=Math.min(t+6,n.length);for(let o=r;o<a;o++){const s=o+1;i.push(`${s===t?">":" "} ${s}: ${n[o]}`)}return i.join(`
`)}const To=new nt;function Vh(e){Et._getMatrix(To,Et.workingColorSpace,e);const t=`mat3( ${To.elements.map(n=>n.toFixed(4))} )`;switch(Et.getTransfer(e)){case Xs:return[t,"LinearTransferOETF"];case mt:return[t,"sRGBTransferOETF"];default:return at("WebGLProgram: Unsupported color space: ",e),[t,"LinearTransferOETF"]}}function Ao(e,t,n){const i=e.getShaderParameter(t,e.COMPILE_STATUS),a=(e.getShaderInfoLog(t)||"").trim();if(i&&a==="")return"";const o=/ERROR: 0:(\d+)/.exec(a);if(o){const s=parseInt(o[1]);return n.toUpperCase()+`

`+a+`

`+Hh(e.getShaderSource(t),s)}else return a}function zh(e,t){const n=Vh(t);return[`vec4 ${e}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,"}"].join(`
`)}const kh={[Ws]:"Linear",[ks]:"Reinhard",[zs]:"Cineon",[Vs]:"ACESFilmic",[Hs]:"AgX",[Gs]:"Neutral",[Bs]:"Custom"};function Wh(e,t){const n=kh[t];return n===void 0?(at("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+e+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+e+"( vec3 color ) { return "+n+"ToneMapping( color ); }"}const Ki=new ne;function Xh(){Et.getLuminanceCoefficients(Ki);const e=Ki.x.toFixed(4),t=Ki.y.toFixed(4),n=Ki.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${e}, ${t}, ${n} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Yh(e){return[e.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",e.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(_i).join(`
`)}function Kh(e){const t=[];for(const n in e){const i=e[n];i!==!1&&t.push("#define "+n+" "+i)}return t.join(`
`)}function qh(e,t){const n={},i=e.getProgramParameter(t,e.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const a=e.getActiveAttrib(t,r),o=a.name;let s=1;a.type===e.FLOAT_MAT2&&(s=2),a.type===e.FLOAT_MAT3&&(s=3),a.type===e.FLOAT_MAT4&&(s=4),n[o]={type:a.type,location:e.getAttribLocation(t,o),locationSize:s}}return n}function _i(e){return e!==""}function yo(e,t){const n=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return e.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Po(e,t){return e.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const $h=/^[ \t]*#include +<([\w\d./]+)>/gm;function Qr(e){return e.replace($h,Zh)}const jh=new Map;function Zh(e,t){let n=Ze[t];if(n===void 0){const i=jh.get(t);if(i!==void 0)n=Ze[i],at('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+t+">")}return Qr(n)}const Qh=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Ro(e){return e.replace(Qh,Jh)}function Jh(e,t,n,i){let r="";for(let a=parseInt(t);a<parseInt(n);a++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+a+" ]").replace(/UNROLLED_LOOP_INDEX/g,a);return r}function wo(e){let t=`precision ${e.precision} float;
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
#define LOW_PRECISION`),t}const em={[Qi]:"SHADOWMAP_TYPE_PCF",[mi]:"SHADOWMAP_TYPE_VSM"};function tm(e){return em[e.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const nm={[Pi]:"ENVMAP_TYPE_CUBE",[ei]:"ENVMAP_TYPE_CUBE",[lr]:"ENVMAP_TYPE_CUBE_UV"};function im(e){return e.envMap===!1?"ENVMAP_TYPE_CUBE":nm[e.envMapMode]||"ENVMAP_TYPE_CUBE"}const rm={[ei]:"ENVMAP_MODE_REFRACTION"};function am(e){return e.envMap===!1?"ENVMAP_MODE_REFLECTION":rm[e.envMapMode]||"ENVMAP_MODE_REFLECTION"}const om={[Jl]:"ENVMAP_BLENDING_MULTIPLY",[Ql]:"ENVMAP_BLENDING_MIX",[Zl]:"ENVMAP_BLENDING_ADD"};function sm(e){return e.envMap===!1?"ENVMAP_BLENDING_NONE":om[e.combine]||"ENVMAP_BLENDING_NONE"}function cm(e){const t=e.envMapCubeUVHeight;if(t===null)return null;const n=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,n),112)),texelHeight:i,maxMip:n}}function lm(e,t,n,i){const r=e.getContext(),a=n.defines;let o=n.vertexShader,s=n.fragmentShader;const h=tm(n),f=im(n),g=am(n),p=sm(n),l=cm(n),_=Yh(n),x=Kh(a),P=r.createProgram();let c,u,y=n.glslVersion?"#version "+n.glslVersion+`
`:"";n.isRawShaderMaterial?(c=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,x].filter(_i).join(`
`),c.length>0&&(c+=`
`),u=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,x].filter(_i).join(`
`),u.length>0&&(u+=`
`)):(c=[wo(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,x,n.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",n.batching?"#define USE_BATCHING":"",n.batchingColor?"#define USE_BATCHING_COLOR":"",n.instancing?"#define USE_INSTANCING":"",n.instancingColor?"#define USE_INSTANCING_COLOR":"",n.instancingMorph?"#define USE_INSTANCING_MORPH":"",n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.map?"#define USE_MAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+g:"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.displacementMap?"#define USE_DISPLACEMENTMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.mapUv?"#define MAP_UV "+n.mapUv:"",n.alphaMapUv?"#define ALPHAMAP_UV "+n.alphaMapUv:"",n.lightMapUv?"#define LIGHTMAP_UV "+n.lightMapUv:"",n.aoMapUv?"#define AOMAP_UV "+n.aoMapUv:"",n.emissiveMapUv?"#define EMISSIVEMAP_UV "+n.emissiveMapUv:"",n.bumpMapUv?"#define BUMPMAP_UV "+n.bumpMapUv:"",n.normalMapUv?"#define NORMALMAP_UV "+n.normalMapUv:"",n.displacementMapUv?"#define DISPLACEMENTMAP_UV "+n.displacementMapUv:"",n.metalnessMapUv?"#define METALNESSMAP_UV "+n.metalnessMapUv:"",n.roughnessMapUv?"#define ROUGHNESSMAP_UV "+n.roughnessMapUv:"",n.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+n.anisotropyMapUv:"",n.clearcoatMapUv?"#define CLEARCOATMAP_UV "+n.clearcoatMapUv:"",n.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+n.clearcoatNormalMapUv:"",n.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+n.clearcoatRoughnessMapUv:"",n.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+n.iridescenceMapUv:"",n.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+n.iridescenceThicknessMapUv:"",n.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+n.sheenColorMapUv:"",n.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+n.sheenRoughnessMapUv:"",n.specularMapUv?"#define SPECULARMAP_UV "+n.specularMapUv:"",n.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+n.specularColorMapUv:"",n.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+n.specularIntensityMapUv:"",n.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+n.transmissionMapUv:"",n.thicknessMapUv?"#define THICKNESSMAP_UV "+n.thicknessMapUv:"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexNormals?"#define HAS_NORMAL":"",n.vertexColors?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.flatShading?"#define FLAT_SHADED":"",n.skinning?"#define USE_SKINNING":"",n.morphTargets?"#define USE_MORPHTARGETS":"",n.morphNormals&&n.flatShading===!1?"#define USE_MORPHNORMALS":"",n.morphColors?"#define USE_MORPHCOLORS":"",n.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+n.morphTextureStride:"",n.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+n.morphTargetsCount:"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+h:"",n.sizeAttenuation?"#define USE_SIZEATTENUATION":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",n.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(_i).join(`
`),u=[wo(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,x,n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",n.map?"#define USE_MAP":"",n.matcap?"#define USE_MATCAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+f:"",n.envMap?"#define "+g:"",n.envMap?"#define "+p:"",l?"#define CUBEUV_TEXEL_WIDTH "+l.texelWidth:"",l?"#define CUBEUV_TEXEL_HEIGHT "+l.texelHeight:"",l?"#define CUBEUV_MAX_MIP "+l.maxMip+".0":"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoat?"#define USE_CLEARCOAT":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.dispersion?"#define USE_DISPERSION":"",n.iridescence?"#define USE_IRIDESCENCE":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaTest?"#define USE_ALPHATEST":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.sheen?"#define USE_SHEEN":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors||n.instancingColor?"#define USE_COLOR":"",n.vertexAlphas||n.batchingColor?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.gradientMap?"#define USE_GRADIENTMAP":"",n.flatShading?"#define FLAT_SHADED":"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+h:"",n.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",n.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",n.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",n.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",n.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",n.toneMapping!==un?"#define TONE_MAPPING":"",n.toneMapping!==un?Ze.tonemapping_pars_fragment:"",n.toneMapping!==un?Wh("toneMapping",n.toneMapping):"",n.dithering?"#define DITHERING":"",n.opaque?"#define OPAQUE":"",Ze.colorspace_pars_fragment,zh("linearToOutputTexel",n.outputColorSpace),Xh(),n.useDepthPacking?"#define DEPTH_PACKING "+n.depthPacking:"",`
`].filter(_i).join(`
`)),o=Qr(o),o=yo(o,n),o=Po(o,n),s=Qr(s),s=yo(s,n),s=Po(s,n),o=Ro(o),s=Ro(s),n.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,c=[_,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+c,u=["#define varying in",n.glslVersion===oo?"":"layout(location = 0) out highp vec4 pc_fragColor;",n.glslVersion===oo?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+u);const R=y+c+o,S=y+u+s,T=bo(r,r.VERTEX_SHADER,R),b=bo(r,r.FRAGMENT_SHADER,S);r.attachShader(P,T),r.attachShader(P,b),n.index0AttributeName!==void 0?r.bindAttribLocation(P,0,n.index0AttributeName):n.hasPositionAttribute===!0&&r.bindAttribLocation(P,0,"position"),r.linkProgram(P);function w(L){if(e.debug.checkShaderErrors){const V=r.getProgramInfoLog(P)||"",ae=r.getShaderInfoLog(T)||"",Q=r.getShaderInfoLog(b)||"",X=V.trim(),Y=ae.trim(),W=Q.trim();let ee=!0,ue=!0;if(r.getProgramParameter(P,r.LINK_STATUS)===!1)if(ee=!1,typeof e.debug.onShaderError=="function")e.debug.onShaderError(r,P,T,b);else{const Re=Ao(r,T,"vertex"),ge=Ao(r,b,"fragment");gt("WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(P,r.VALIDATE_STATUS)+`

Material Name: `+L.name+`
Material Type: `+L.type+`

Program Info Log: `+X+`
`+Re+`
`+ge)}else X!==""?at("WebGLProgram: Program Info Log:",X):(Y===""||W==="")&&(ue=!1);ue&&(L.diagnostics={runnable:ee,programLog:X,vertexShader:{log:Y,prefix:c},fragmentShader:{log:W,prefix:u}})}r.deleteShader(T),r.deleteShader(b),m=new er(r,P),A=qh(r,P)}let m;this.getUniforms=function(){return m===void 0&&w(this),m};let A;this.getAttributes=function(){return A===void 0&&w(this),A};let O=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return O===!1&&(O=r.getProgramParameter(P,Bh)),O},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(P),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=Gh++,this.cacheKey=t,this.usedTimes=1,this.program=P,this.vertexShader=T,this.fragmentShader=b,this}let um=0;class dm{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t,n,i){const r=this._getShaderCacheForMaterial(t);return r.has(n)===!1&&(r.add(n),n.usedTimes++),r.has(i)===!1&&(r.add(i),i.usedTimes++),this}remove(t){const n=this.materialCache.get(t);for(const i of n)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderStage(t){return this._getShaderStage(t.vertexShader)}getFragmentShaderStage(t){return this._getShaderStage(t.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const n=this.materialCache;let i=n.get(t);return i===void 0&&(i=new Set,n.set(t,i)),i}_getShaderStage(t){const n=this.shaderCache;let i=n.get(t);return i===void 0&&(i=new fm(t),n.set(t,i)),i}}class fm{constructor(t){this.id=um++,this.code=t,this.usedTimes=0}}function pm(e){return e===Qn||e===Xr||e===Yr}function hm(e,t,n,i,r,a){const o=new ql,s=new dm,h=new Set,f=[],g=new Map,p=i.logarithmicDepthBuffer;let l=i.precision;const _={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(m){return h.add(m),m===0?"uv":`uv${m}`}function P(m,A,O,L,V,ae){const Q=L.fog,X=V.geometry,Y=m.isMeshStandardMaterial||m.isMeshLambertMaterial||m.isMeshPhongMaterial?L.environment:null,W=m.isMeshStandardMaterial||m.isMeshLambertMaterial&&!m.envMap||m.isMeshPhongMaterial&&!m.envMap,ee=t.get(m.envMap||Y,W),ue=ee&&ee.mapping===lr?ee.image.height:null,Re=_[m.type];m.precision!==null&&(l=i.getMaxPrecision(m.precision),l!==m.precision&&at("WebGLProgram.getParameters:",m.precision,"not supported, using",l,"instead."));const ge=X.morphAttributes.position||X.morphAttributes.normal||X.morphAttributes.color,Me=ge!==void 0?ge.length:0;let Xe=0;X.morphAttributes.position!==void 0&&(Xe=1),X.morphAttributes.normal!==void 0&&(Xe=2),X.morphAttributes.color!==void 0&&(Xe=3);let it,Ye,j,N;if(Re){const De=Vt[Re];it=De.vertexShader,Ye=De.fragmentShader}else{it=m.vertexShader,Ye=m.fragmentShader;const De=s.getVertexShaderStage(m),xt=s.getFragmentShaderStage(m);s.update(m,De,xt),j=De.id,N=xt.id}const z=e.getRenderTarget(),ce=e.state.buffers.depth.getReversed(),le=V.isInstancedMesh===!0,de=V.isBatchedMesh===!0,K=!!m.map,re=!!m.matcap,me=!!ee,Pe=!!m.aoMap,be=!!m.lightMap,Ve=!!m.bumpMap&&m.wireframe===!1,Je=!!m.normalMap,et=!!m.displacementMap,ft=!!m.emissiveMap,qe=!!m.metalnessMap,lt=!!m.roughnessMap,D=m.anisotropy>0,ot=m.clearcoat>0,Ge=m.dispersion>0,E=m.iridescence>0,d=m.sheen>0,U=m.transmission>0,G=D&&!!m.anisotropyMap,$=ot&&!!m.clearcoatMap,oe=ot&&!!m.clearcoatNormalMap,pe=ot&&!!m.clearcoatRoughnessMap,q=E&&!!m.iridescenceMap,J=E&&!!m.iridescenceThicknessMap,he=d&&!!m.sheenColorMap,Le=d&&!!m.sheenRoughnessMap,fe=!!m.specularMap,Se=!!m.specularColorMap,Be=!!m.specularIntensityMap,He=U&&!!m.transmissionMap,ze=U&&!!m.thicknessMap,C=!!m.gradientMap,ve=!!m.alphaMap,Z=m.alphaTest>0,xe=!!m.alphaHash,Te=!!m.extensions;let ie=un;m.toneMapped&&(z===null||z.isXRRenderTarget===!0)&&(ie=e.toneMapping);const Ne={shaderID:Re,shaderType:m.type,shaderName:m.name,vertexShader:it,fragmentShader:Ye,defines:m.defines,customVertexShaderID:j,customFragmentShaderID:N,isRawShaderMaterial:m.isRawShaderMaterial===!0,glslVersion:m.glslVersion,precision:l,batching:de,batchingColor:de&&V._colorsTexture!==null,instancing:le,instancingColor:le&&V.instanceColor!==null,instancingMorph:le&&V.morphTexture!==null,outputColorSpace:z===null?e.outputColorSpace:z.isXRRenderTarget===!0?z.texture.colorSpace:Et.workingColorSpace,alphaToCoverage:!!m.alphaToCoverage,map:K,matcap:re,envMap:me,envMapMode:me&&ee.mapping,envMapCubeUVHeight:ue,aoMap:Pe,lightMap:be,bumpMap:Ve,normalMap:Je,displacementMap:et,emissiveMap:ft,normalMapObjectSpace:Je&&m.normalMapType===Wl,normalMapTangentSpace:Je&&m.normalMapType===ro,packedNormalMap:Je&&m.normalMapType===ro&&pm(m.normalMap.format),metalnessMap:qe,roughnessMap:lt,anisotropy:D,anisotropyMap:G,clearcoat:ot,clearcoatMap:$,clearcoatNormalMap:oe,clearcoatRoughnessMap:pe,dispersion:Ge,iridescence:E,iridescenceMap:q,iridescenceThicknessMap:J,sheen:d,sheenColorMap:he,sheenRoughnessMap:Le,specularMap:fe,specularColorMap:Se,specularIntensityMap:Be,transmission:U,transmissionMap:He,thicknessMap:ze,gradientMap:C,opaque:m.transparent===!1&&m.blending===Ji&&m.alphaToCoverage===!1,alphaMap:ve,alphaTest:Z,alphaHash:xe,combine:m.combine,mapUv:K&&x(m.map.channel),aoMapUv:Pe&&x(m.aoMap.channel),lightMapUv:be&&x(m.lightMap.channel),bumpMapUv:Ve&&x(m.bumpMap.channel),normalMapUv:Je&&x(m.normalMap.channel),displacementMapUv:et&&x(m.displacementMap.channel),emissiveMapUv:ft&&x(m.emissiveMap.channel),metalnessMapUv:qe&&x(m.metalnessMap.channel),roughnessMapUv:lt&&x(m.roughnessMap.channel),anisotropyMapUv:G&&x(m.anisotropyMap.channel),clearcoatMapUv:$&&x(m.clearcoatMap.channel),clearcoatNormalMapUv:oe&&x(m.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:pe&&x(m.clearcoatRoughnessMap.channel),iridescenceMapUv:q&&x(m.iridescenceMap.channel),iridescenceThicknessMapUv:J&&x(m.iridescenceThicknessMap.channel),sheenColorMapUv:he&&x(m.sheenColorMap.channel),sheenRoughnessMapUv:Le&&x(m.sheenRoughnessMap.channel),specularMapUv:fe&&x(m.specularMap.channel),specularColorMapUv:Se&&x(m.specularColorMap.channel),specularIntensityMapUv:Be&&x(m.specularIntensityMap.channel),transmissionMapUv:He&&x(m.transmissionMap.channel),thicknessMapUv:ze&&x(m.thicknessMap.channel),alphaMapUv:ve&&x(m.alphaMap.channel),vertexTangents:!!X.attributes.tangent&&(Je||D),vertexNormals:!!X.attributes.normal,vertexColors:m.vertexColors,vertexAlphas:m.vertexColors===!0&&!!X.attributes.color&&X.attributes.color.itemSize===4,pointsUvs:V.isPoints===!0&&!!X.attributes.uv&&(K||ve),fog:!!Q,useFog:m.fog===!0,fogExp2:!!Q&&Q.isFogExp2,flatShading:m.wireframe===!1&&(m.flatShading===!0||X.attributes.normal===void 0&&Je===!1&&(m.isMeshLambertMaterial||m.isMeshPhongMaterial||m.isMeshStandardMaterial||m.isMeshPhysicalMaterial)),sizeAttenuation:m.sizeAttenuation===!0,logarithmicDepthBuffer:p,reversedDepthBuffer:ce,skinning:V.isSkinnedMesh===!0,hasPositionAttribute:X.attributes.position!==void 0,morphTargets:X.morphAttributes.position!==void 0,morphNormals:X.morphAttributes.normal!==void 0,morphColors:X.morphAttributes.color!==void 0,morphTargetsCount:Me,morphTextureStride:Xe,numDirLights:A.directional.length,numPointLights:A.point.length,numSpotLights:A.spot.length,numSpotLightMaps:A.spotLightMap.length,numRectAreaLights:A.rectArea.length,numHemiLights:A.hemi.length,numDirLightShadows:A.directionalShadowMap.length,numPointLightShadows:A.pointShadowMap.length,numSpotLightShadows:A.spotShadowMap.length,numSpotLightShadowsWithMaps:A.numSpotLightShadowsWithMaps,numLightProbes:A.numLightProbes,numLightProbeGrids:ae.length,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:m.dithering,shadowMapEnabled:e.shadowMap.enabled&&O.length>0,shadowMapType:e.shadowMap.type,toneMapping:ie,decodeVideoTexture:K&&m.map.isVideoTexture===!0&&Et.getTransfer(m.map.colorSpace)===mt,decodeVideoTextureEmissive:ft&&m.emissiveMap.isVideoTexture===!0&&Et.getTransfer(m.emissiveMap.colorSpace)===mt,premultipliedAlpha:m.premultipliedAlpha,doubleSided:m.side===zt,flipSided:m.side===Kt,useDepthPacking:m.depthPacking>=0,depthPacking:m.depthPacking||0,index0AttributeName:m.index0AttributeName,extensionClipCullDistance:Te&&m.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Te&&m.extensions.multiDraw===!0||de)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:m.customProgramCacheKey()};return Ne.vertexUv1s=h.has(1),Ne.vertexUv2s=h.has(2),Ne.vertexUv3s=h.has(3),h.clear(),Ne}function c(m){const A=[];if(m.shaderID?A.push(m.shaderID):(A.push(m.customVertexShaderID),A.push(m.customFragmentShaderID)),m.defines!==void 0)for(const O in m.defines)A.push(O),A.push(m.defines[O]);return m.isRawShaderMaterial===!1&&(u(A,m),y(A,m),A.push(e.outputColorSpace)),A.push(m.customProgramCacheKey),A.join()}function u(m,A){m.push(A.precision),m.push(A.outputColorSpace),m.push(A.envMapMode),m.push(A.envMapCubeUVHeight),m.push(A.mapUv),m.push(A.alphaMapUv),m.push(A.lightMapUv),m.push(A.aoMapUv),m.push(A.bumpMapUv),m.push(A.normalMapUv),m.push(A.displacementMapUv),m.push(A.emissiveMapUv),m.push(A.metalnessMapUv),m.push(A.roughnessMapUv),m.push(A.anisotropyMapUv),m.push(A.clearcoatMapUv),m.push(A.clearcoatNormalMapUv),m.push(A.clearcoatRoughnessMapUv),m.push(A.iridescenceMapUv),m.push(A.iridescenceThicknessMapUv),m.push(A.sheenColorMapUv),m.push(A.sheenRoughnessMapUv),m.push(A.specularMapUv),m.push(A.specularColorMapUv),m.push(A.specularIntensityMapUv),m.push(A.transmissionMapUv),m.push(A.thicknessMapUv),m.push(A.combine),m.push(A.fogExp2),m.push(A.sizeAttenuation),m.push(A.morphTargetsCount),m.push(A.morphAttributeCount),m.push(A.numDirLights),m.push(A.numPointLights),m.push(A.numSpotLights),m.push(A.numSpotLightMaps),m.push(A.numHemiLights),m.push(A.numRectAreaLights),m.push(A.numDirLightShadows),m.push(A.numPointLightShadows),m.push(A.numSpotLightShadows),m.push(A.numSpotLightShadowsWithMaps),m.push(A.numLightProbes),m.push(A.shadowMapType),m.push(A.toneMapping),m.push(A.numClippingPlanes),m.push(A.numClipIntersection),m.push(A.depthPacking)}function y(m,A){o.disableAll(),A.instancing&&o.enable(0),A.instancingColor&&o.enable(1),A.instancingMorph&&o.enable(2),A.matcap&&o.enable(3),A.envMap&&o.enable(4),A.normalMapObjectSpace&&o.enable(5),A.normalMapTangentSpace&&o.enable(6),A.clearcoat&&o.enable(7),A.iridescence&&o.enable(8),A.alphaTest&&o.enable(9),A.vertexColors&&o.enable(10),A.vertexAlphas&&o.enable(11),A.vertexUv1s&&o.enable(12),A.vertexUv2s&&o.enable(13),A.vertexUv3s&&o.enable(14),A.vertexTangents&&o.enable(15),A.anisotropy&&o.enable(16),A.alphaHash&&o.enable(17),A.batching&&o.enable(18),A.dispersion&&o.enable(19),A.batchingColor&&o.enable(20),A.gradientMap&&o.enable(21),A.packedNormalMap&&o.enable(22),A.vertexNormals&&o.enable(23),m.push(o.mask),o.disableAll(),A.fog&&o.enable(0),A.useFog&&o.enable(1),A.flatShading&&o.enable(2),A.logarithmicDepthBuffer&&o.enable(3),A.reversedDepthBuffer&&o.enable(4),A.skinning&&o.enable(5),A.morphTargets&&o.enable(6),A.morphNormals&&o.enable(7),A.morphColors&&o.enable(8),A.premultipliedAlpha&&o.enable(9),A.shadowMapEnabled&&o.enable(10),A.doubleSided&&o.enable(11),A.flipSided&&o.enable(12),A.useDepthPacking&&o.enable(13),A.dithering&&o.enable(14),A.transmission&&o.enable(15),A.sheen&&o.enable(16),A.opaque&&o.enable(17),A.pointsUvs&&o.enable(18),A.decodeVideoTexture&&o.enable(19),A.decodeVideoTextureEmissive&&o.enable(20),A.alphaToCoverage&&o.enable(21),A.numLightProbeGrids>0&&o.enable(22),A.hasPositionAttribute&&o.enable(23),m.push(o.mask)}function R(m){const A=_[m.type];let O;if(A){const L=Vt[A];O=la.clone(L.uniforms)}else O=m.uniforms;return O}function S(m,A){let O=g.get(A);return O!==void 0?++O.usedTimes:(O=new lm(e,A,m,r),f.push(O),g.set(A,O)),O}function T(m){if(--m.usedTimes===0){const A=f.indexOf(m);f[A]=f[f.length-1],f.pop(),g.delete(m.cacheKey),m.destroy()}}function b(m){s.remove(m)}function w(){s.dispose()}return{getParameters:P,getProgramCacheKey:c,getUniforms:R,acquireProgram:S,releaseProgram:T,releaseShaderCache:b,programs:f,dispose:w}}function mm(){let e=new WeakMap;function t(o){return e.has(o)}function n(o){let s=e.get(o);return s===void 0&&(s={},e.set(o,s)),s}function i(o){e.delete(o)}function r(o,s,h){e.get(o)[s]=h}function a(){e=new WeakMap}return{has:t,get:n,remove:i,update:r,dispose:a}}function _m(e,t){return e.groupOrder!==t.groupOrder?e.groupOrder-t.groupOrder:e.renderOrder!==t.renderOrder?e.renderOrder-t.renderOrder:e.material.id!==t.material.id?e.material.id-t.material.id:e.materialVariant!==t.materialVariant?e.materialVariant-t.materialVariant:e.z!==t.z?e.z-t.z:e.id-t.id}function Co(e,t){return e.groupOrder!==t.groupOrder?e.groupOrder-t.groupOrder:e.renderOrder!==t.renderOrder?e.renderOrder-t.renderOrder:e.z!==t.z?t.z-e.z:e.id-t.id}function Do(){const e=[];let t=0;const n=[],i=[],r=[];function a(){t=0,n.length=0,i.length=0,r.length=0}function o(l){let _=0;return l.isInstancedMesh&&(_+=2),l.isSkinnedMesh&&(_+=1),_}function s(l,_,x,P,c,u){let y=e[t];return y===void 0?(y={id:l.id,object:l,geometry:_,material:x,materialVariant:o(l),groupOrder:P,renderOrder:l.renderOrder,z:c,group:u},e[t]=y):(y.id=l.id,y.object=l,y.geometry=_,y.material=x,y.materialVariant=o(l),y.groupOrder=P,y.renderOrder=l.renderOrder,y.z=c,y.group=u),t++,y}function h(l,_,x,P,c,u){const y=s(l,_,x,P,c,u);x.transmission>0?i.push(y):x.transparent===!0?r.push(y):n.push(y)}function f(l,_,x,P,c,u){const y=s(l,_,x,P,c,u);x.transmission>0?i.unshift(y):x.transparent===!0?r.unshift(y):n.unshift(y)}function g(l,_,x){n.length>1&&n.sort(l||_m),i.length>1&&i.sort(_||Co),r.length>1&&r.sort(_||Co),x&&(n.reverse(),i.reverse(),r.reverse())}function p(){for(let l=t,_=e.length;l<_;l++){const x=e[l];if(x.id===null)break;x.id=null,x.object=null,x.geometry=null,x.material=null,x.group=null}}return{opaque:n,transmissive:i,transparent:r,init:a,push:h,unshift:f,finish:p,sort:g}}function gm(){let e=new WeakMap;function t(i,r){const a=e.get(i);let o;return a===void 0?(o=new Do,e.set(i,[o])):r>=a.length?(o=new Do,a.push(o)):o=a[r],o}function n(){e=new WeakMap}return{get:t,dispose:n}}function vm(){const e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case"DirectionalLight":n={direction:new ne,color:new dt};break;case"SpotLight":n={position:new ne,direction:new ne,color:new dt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":n={position:new ne,color:new dt,distance:0,decay:0};break;case"HemisphereLight":n={direction:new ne,skyColor:new dt,groundColor:new dt};break;case"RectAreaLight":n={color:new dt,position:new ne,halfWidth:new ne,halfHeight:new ne};break}return e[t.id]=n,n}}}function xm(){const e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case"DirectionalLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new We};break;case"SpotLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new We};break;case"PointLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new We,shadowCameraNear:1,shadowCameraFar:1e3};break}return e[t.id]=n,n}}}let Sm=0;function Em(e,t){return(t.castShadow?2:0)-(e.castShadow?2:0)+(t.map?1:0)-(e.map?1:0)}function Mm(e){const t=new vm,n=xm(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let f=0;f<9;f++)i.probe.push(new ne);const r=new ne,a=new An,o=new An;function s(f){let g=0,p=0,l=0;for(let A=0;A<9;A++)i.probe[A].set(0,0,0);let _=0,x=0,P=0,c=0,u=0,y=0,R=0,S=0,T=0,b=0,w=0;f.sort(Em);for(let A=0,O=f.length;A<O;A++){const L=f[A],V=L.color,ae=L.intensity,Q=L.distance;let X=null;if(L.shadow&&L.shadow.map&&(L.shadow.map.texture.format===Qn?X=L.shadow.map.texture:X=L.shadow.map.depthTexture||L.shadow.map.texture),L.isAmbientLight)g+=V.r*ae,p+=V.g*ae,l+=V.b*ae;else if(L.isLightProbe){for(let Y=0;Y<9;Y++)i.probe[Y].addScaledVector(L.sh.coefficients[Y],ae);w++}else if(L.isDirectionalLight){const Y=t.get(L);if(Y.color.copy(L.color).multiplyScalar(L.intensity),L.castShadow){const W=L.shadow,ee=n.get(L);ee.shadowIntensity=W.intensity,ee.shadowBias=W.bias,ee.shadowNormalBias=W.normalBias,ee.shadowRadius=W.radius,ee.shadowMapSize=W.mapSize,i.directionalShadow[_]=ee,i.directionalShadowMap[_]=X,i.directionalShadowMatrix[_]=L.shadow.matrix,y++}i.directional[_]=Y,_++}else if(L.isSpotLight){const Y=t.get(L);Y.position.setFromMatrixPosition(L.matrixWorld),Y.color.copy(V).multiplyScalar(ae),Y.distance=Q,Y.coneCos=Math.cos(L.angle),Y.penumbraCos=Math.cos(L.angle*(1-L.penumbra)),Y.decay=L.decay,i.spot[P]=Y;const W=L.shadow;if(L.map&&(i.spotLightMap[T]=L.map,T++,W.updateMatrices(L),L.castShadow&&b++),i.spotLightMatrix[P]=W.matrix,L.castShadow){const ee=n.get(L);ee.shadowIntensity=W.intensity,ee.shadowBias=W.bias,ee.shadowNormalBias=W.normalBias,ee.shadowRadius=W.radius,ee.shadowMapSize=W.mapSize,i.spotShadow[P]=ee,i.spotShadowMap[P]=X,S++}P++}else if(L.isRectAreaLight){const Y=t.get(L);Y.color.copy(V).multiplyScalar(ae),Y.halfWidth.set(L.width*.5,0,0),Y.halfHeight.set(0,L.height*.5,0),i.rectArea[c]=Y,c++}else if(L.isPointLight){const Y=t.get(L);if(Y.color.copy(L.color).multiplyScalar(L.intensity),Y.distance=L.distance,Y.decay=L.decay,L.castShadow){const W=L.shadow,ee=n.get(L);ee.shadowIntensity=W.intensity,ee.shadowBias=W.bias,ee.shadowNormalBias=W.normalBias,ee.shadowRadius=W.radius,ee.shadowMapSize=W.mapSize,ee.shadowCameraNear=W.camera.near,ee.shadowCameraFar=W.camera.far,i.pointShadow[x]=ee,i.pointShadowMap[x]=X,i.pointShadowMatrix[x]=L.shadow.matrix,R++}i.point[x]=Y,x++}else if(L.isHemisphereLight){const Y=t.get(L);Y.skyColor.copy(L.color).multiplyScalar(ae),Y.groundColor.copy(L.groundColor).multiplyScalar(ae),i.hemi[u]=Y,u++}}c>0&&(e.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=Ee.LTC_FLOAT_1,i.rectAreaLTC2=Ee.LTC_FLOAT_2):(i.rectAreaLTC1=Ee.LTC_HALF_1,i.rectAreaLTC2=Ee.LTC_HALF_2)),i.ambient[0]=g,i.ambient[1]=p,i.ambient[2]=l;const m=i.hash;(m.directionalLength!==_||m.pointLength!==x||m.spotLength!==P||m.rectAreaLength!==c||m.hemiLength!==u||m.numDirectionalShadows!==y||m.numPointShadows!==R||m.numSpotShadows!==S||m.numSpotMaps!==T||m.numLightProbes!==w)&&(i.directional.length=_,i.spot.length=P,i.rectArea.length=c,i.point.length=x,i.hemi.length=u,i.directionalShadow.length=y,i.directionalShadowMap.length=y,i.pointShadow.length=R,i.pointShadowMap.length=R,i.spotShadow.length=S,i.spotShadowMap.length=S,i.directionalShadowMatrix.length=y,i.pointShadowMatrix.length=R,i.spotLightMatrix.length=S+T-b,i.spotLightMap.length=T,i.numSpotLightShadowsWithMaps=b,i.numLightProbes=w,m.directionalLength=_,m.pointLength=x,m.spotLength=P,m.rectAreaLength=c,m.hemiLength=u,m.numDirectionalShadows=y,m.numPointShadows=R,m.numSpotShadows=S,m.numSpotMaps=T,m.numLightProbes=w,i.version=Sm++)}function h(f,g){let p=0,l=0,_=0,x=0,P=0;const c=g.matrixWorldInverse;for(let u=0,y=f.length;u<y;u++){const R=f[u];if(R.isDirectionalLight){const S=i.directional[p];S.direction.setFromMatrixPosition(R.matrixWorld),r.setFromMatrixPosition(R.target.matrixWorld),S.direction.sub(r),S.direction.transformDirection(c),p++}else if(R.isSpotLight){const S=i.spot[_];S.position.setFromMatrixPosition(R.matrixWorld),S.position.applyMatrix4(c),S.direction.setFromMatrixPosition(R.matrixWorld),r.setFromMatrixPosition(R.target.matrixWorld),S.direction.sub(r),S.direction.transformDirection(c),_++}else if(R.isRectAreaLight){const S=i.rectArea[x];S.position.setFromMatrixPosition(R.matrixWorld),S.position.applyMatrix4(c),o.identity(),a.copy(R.matrixWorld),a.premultiply(c),o.extractRotation(a),S.halfWidth.set(R.width*.5,0,0),S.halfHeight.set(0,R.height*.5,0),S.halfWidth.applyMatrix4(o),S.halfHeight.applyMatrix4(o),x++}else if(R.isPointLight){const S=i.point[l];S.position.setFromMatrixPosition(R.matrixWorld),S.position.applyMatrix4(c),l++}else if(R.isHemisphereLight){const S=i.hemi[P];S.direction.setFromMatrixPosition(R.matrixWorld),S.direction.transformDirection(c),P++}}}return{setup:s,setupView:h,state:i}}function Lo(e){const t=new Mm(e),n=[],i=[],r=[];function a(l){p.camera=l,n.length=0,i.length=0,r.length=0}function o(l){n.push(l)}function s(l){i.push(l)}function h(l){r.push(l)}function f(){t.setup(n)}function g(l){t.setupView(n,l)}const p={lightsArray:n,shadowsArray:i,lightProbeGridArray:r,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:a,state:p,setupLights:f,setupLightsView:g,pushLight:o,pushShadow:s,pushLightProbeGrid:h}}function bm(e){let t=new WeakMap;function n(r,a=0){const o=t.get(r);let s;return o===void 0?(s=new Lo(e),t.set(r,[s])):a>=o.length?(s=new Lo(e),o.push(s)):s=o[a],s}function i(){t=new WeakMap}return{get:n,dispose:i}}const Tm=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Am=`uniform sampler2D shadow_pass;
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
}`,ym=[new ne(1,0,0),new ne(-1,0,0),new ne(0,1,0),new ne(0,-1,0),new ne(0,0,1),new ne(0,0,-1)],Pm=[new ne(0,-1,0),new ne(0,-1,0),new ne(0,0,1),new ne(0,0,-1),new ne(0,-1,0),new ne(0,-1,0)],Io=new An,pi=new ne,Lr=new ne;function Rm(e,t,n){let i=new As;const r=new We,a=new We,o=new Pt,s=new bl,h=new Tl,f={},g=n.maxTextureSize,p={[bi]:Kt,[Kt]:bi,[zt]:zt},l=new Qt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new We},radius:{value:4}},vertexShader:Tm,fragmentShader:Am}),_=l.clone();_.defines.HORIZONTAL_PASS=1;const x=new ti;x.setAttribute("position",new Ei(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const P=new Bt(x,l),c=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Qi;let u=this.type;this.render=function(b,w,m){if(c.enabled===!1||c.autoUpdate===!1&&c.needsUpdate===!1||b.length===0)return;this.type===Al&&(at("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=Qi);const A=e.getRenderTarget(),O=e.getActiveCubeFace(),L=e.getActiveMipmapLevel(),V=e.state;V.setBlending(gn),V.buffers.depth.getReversed()===!0?V.buffers.color.setClear(0,0,0,0):V.buffers.color.setClear(1,1,1,1),V.buffers.depth.setTest(!0),V.setScissorTest(!1);const ae=u!==this.type;ae&&w.traverse(function(Q){Q.material&&(Array.isArray(Q.material)?Q.material.forEach(X=>X.needsUpdate=!0):Q.material.needsUpdate=!0)});for(let Q=0,X=b.length;Q<X;Q++){const Y=b[Q],W=Y.shadow;if(W===void 0){at("WebGLShadowMap:",Y,"has no shadow.");continue}if(W.autoUpdate===!1&&W.needsUpdate===!1)continue;r.copy(W.mapSize);const ee=W.getFrameExtents();r.multiply(ee),a.copy(W.mapSize),(r.x>g||r.y>g)&&(r.x>g&&(a.x=Math.floor(g/ee.x),r.x=a.x*ee.x,W.mapSize.x=a.x),r.y>g&&(a.y=Math.floor(g/ee.y),r.y=a.y*ee.y,W.mapSize.y=a.y));const ue=e.state.buffers.depth.getReversed();if(W.camera._reversedDepth=ue,W.map===null||ae===!0){if(W.map!==null&&(W.map.depthTexture!==null&&(W.map.depthTexture.dispose(),W.map.depthTexture=null),W.map.dispose()),this.type===mi){if(Y.isPointLight){at("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}W.map=new dn(r.x,r.y,{format:Qn,type:yn,minFilter:Yt,magFilter:Yt,generateMipmaps:!1}),W.map.texture.name=Y.name+".shadowMap",W.map.depthTexture=new Ti(r.x,r.y,bn),W.map.depthTexture.name=Y.name+".shadowMapDepth",W.map.depthTexture.format=Zn,W.map.depthTexture.compareFunction=null,W.map.depthTexture.minFilter=In,W.map.depthTexture.magFilter=In}else Y.isPointLight?(W.map=new rc(r.x),W.map.depthTexture=new yl(r.x,On)):(W.map=new dn(r.x,r.y),W.map.depthTexture=new Ti(r.x,r.y,On)),W.map.depthTexture.name=Y.name+".shadowMap",W.map.depthTexture.format=Zn,this.type===Qi?(W.map.depthTexture.compareFunction=ue?sa:ca,W.map.depthTexture.minFilter=Yt,W.map.depthTexture.magFilter=Yt):(W.map.depthTexture.compareFunction=null,W.map.depthTexture.minFilter=In,W.map.depthTexture.magFilter=In);W.camera.updateProjectionMatrix()}const Re=W.map.isWebGLCubeRenderTarget?6:1;for(let ge=0;ge<Re;ge++){if(W.map.isWebGLCubeRenderTarget)e.setRenderTarget(W.map,ge),e.clear();else{ge===0&&(e.setRenderTarget(W.map),e.clear());const Me=W.getViewport(ge);o.set(a.x*Me.x,a.y*Me.y,a.x*Me.z,a.y*Me.w),V.viewport(o)}if(Y.isPointLight){const Me=W.camera,Xe=W.matrix,it=Y.distance||Me.far;it!==Me.far&&(Me.far=it,Me.updateProjectionMatrix()),pi.setFromMatrixPosition(Y.matrixWorld),Me.position.copy(pi),Lr.copy(Me.position),Lr.add(ym[ge]),Me.up.copy(Pm[ge]),Me.lookAt(Lr),Me.updateMatrixWorld(),Xe.makeTranslation(-pi.x,-pi.y,-pi.z),Io.multiplyMatrices(Me.projectionMatrix,Me.matrixWorldInverse),W._frustum.setFromProjectionMatrix(Io,Me.coordinateSystem,Me.reversedDepth)}else W.updateMatrices(Y);i=W.getFrustum(),S(w,m,W.camera,Y,this.type)}W.isPointLightShadow!==!0&&this.type===mi&&y(W,m),W.needsUpdate=!1}u=this.type,c.needsUpdate=!1,e.setRenderTarget(A,O,L)};function y(b,w){const m=t.update(P);l.defines.VSM_SAMPLES!==b.blurSamples&&(l.defines.VSM_SAMPLES=b.blurSamples,_.defines.VSM_SAMPLES=b.blurSamples,l.needsUpdate=!0,_.needsUpdate=!0),b.mapPass===null&&(b.mapPass=new dn(r.x,r.y,{format:Qn,type:yn})),l.uniforms.shadow_pass.value=b.map.depthTexture,l.uniforms.resolution.value=b.mapSize,l.uniforms.radius.value=b.radius,e.setRenderTarget(b.mapPass),e.clear(),e.renderBufferDirect(w,null,m,l,P,null),_.uniforms.shadow_pass.value=b.mapPass.texture,_.uniforms.resolution.value=b.mapSize,_.uniforms.radius.value=b.radius,e.setRenderTarget(b.map),e.clear(),e.renderBufferDirect(w,null,m,_,P,null)}function R(b,w,m,A){let O=null;const L=m.isPointLight===!0?b.customDistanceMaterial:b.customDepthMaterial;if(L!==void 0)O=L;else if(O=m.isPointLight===!0?h:s,e.localClippingEnabled&&w.clipShadows===!0&&Array.isArray(w.clippingPlanes)&&w.clippingPlanes.length!==0||w.displacementMap&&w.displacementScale!==0||w.alphaMap&&w.alphaTest>0||w.map&&w.alphaTest>0||w.alphaToCoverage===!0){const V=O.uuid,ae=w.uuid;let Q=f[V];Q===void 0&&(Q={},f[V]=Q);let X=Q[ae];X===void 0&&(X=O.clone(),Q[ae]=X,w.addEventListener("dispose",T)),O=X}if(O.visible=w.visible,O.wireframe=w.wireframe,A===mi?O.side=w.shadowSide!==null?w.shadowSide:w.side:O.side=w.shadowSide!==null?w.shadowSide:p[w.side],O.alphaMap=w.alphaMap,O.alphaTest=w.alphaToCoverage===!0?.5:w.alphaTest,O.map=w.map,O.clipShadows=w.clipShadows,O.clippingPlanes=w.clippingPlanes,O.clipIntersection=w.clipIntersection,O.displacementMap=w.displacementMap,O.displacementScale=w.displacementScale,O.displacementBias=w.displacementBias,O.wireframeLinewidth=w.wireframeLinewidth,O.linewidth=w.linewidth,m.isPointLight===!0&&O.isMeshDistanceMaterial===!0){const V=e.properties.get(O);V.light=m}return O}function S(b,w,m,A,O){if(b.visible===!1)return;if(b.layers.test(w.layers)&&(b.isMesh||b.isLine||b.isPoints)&&(b.castShadow||b.receiveShadow&&O===mi)&&(!b.frustumCulled||i.intersectsObject(b))){b.modelViewMatrix.multiplyMatrices(m.matrixWorldInverse,b.matrixWorld);const ae=t.update(b),Q=b.material;if(Array.isArray(Q)){const X=ae.groups;for(let Y=0,W=X.length;Y<W;Y++){const ee=X[Y],ue=Q[ee.materialIndex];if(ue&&ue.visible){const Re=R(b,ue,A,O);b.onBeforeShadow(e,b,w,m,ae,Re,ee),e.renderBufferDirect(m,null,ae,Re,b,ee),b.onAfterShadow(e,b,w,m,ae,Re,ee)}}}else if(Q.visible){const X=R(b,Q,A,O);b.onBeforeShadow(e,b,w,m,ae,X,null),e.renderBufferDirect(m,null,ae,X,b,null),b.onAfterShadow(e,b,w,m,ae,X,null)}}const V=b.children;for(let ae=0,Q=V.length;ae<Q;ae++)S(V[ae],w,m,A,O)}function T(b){b.target.removeEventListener("dispose",T);for(const m in f){const A=f[m],O=b.target.uuid;O in A&&(A[O].dispose(),delete A[O])}}}function wm(e,t){function n(){let C=!1;const ve=new Pt;let Z=null;const xe=new Pt(0,0,0,0);return{setMask:function(Te){Z!==Te&&!C&&(e.colorMask(Te,Te,Te,Te),Z=Te)},setLocked:function(Te){C=Te},setClear:function(Te,ie,Ne,De,xt){xt===!0&&(Te*=De,ie*=De,Ne*=De),ve.set(Te,ie,Ne,De),xe.equals(ve)===!1&&(e.clearColor(Te,ie,Ne,De),xe.copy(ve))},reset:function(){C=!1,Z=null,xe.set(-1,0,0,0)}}}function i(){let C=!1,ve=!1,Z=null,xe=null,Te=null;return{setReversed:function(ie){if(ve!==ie){const Ne=t.get("EXT_clip_control");ie?Ne.clipControlEXT(Ne.LOWER_LEFT_EXT,Ne.ZERO_TO_ONE_EXT):Ne.clipControlEXT(Ne.LOWER_LEFT_EXT,Ne.NEGATIVE_ONE_TO_ONE_EXT),ve=ie;const De=Te;Te=null,this.setClear(De)}},getReversed:function(){return ve},setTest:function(ie){ie?z(e.DEPTH_TEST):ce(e.DEPTH_TEST)},setMask:function(ie){Z!==ie&&!C&&(e.depthMask(ie),Z=ie)},setFunc:function(ie){if(ve&&(ie=tu[ie]),xe!==ie){switch(ie){case Hl:e.depthFunc(e.NEVER);break;case Gl:e.depthFunc(e.ALWAYS);break;case Bl:e.depthFunc(e.LESS);break;case Jn:e.depthFunc(e.LEQUAL);break;case Ol:e.depthFunc(e.EQUAL);break;case Fl:e.depthFunc(e.GEQUAL);break;case Ul:e.depthFunc(e.GREATER);break;case Nl:e.depthFunc(e.NOTEQUAL);break;default:e.depthFunc(e.LEQUAL)}xe=ie}},setLocked:function(ie){C=ie},setClear:function(ie){Te!==ie&&(Te=ie,ve&&(ie=1-ie),e.clearDepth(ie))},reset:function(){C=!1,Z=null,xe=null,Te=null,ve=!1}}}function r(){let C=!1,ve=null,Z=null,xe=null,Te=null,ie=null,Ne=null,De=null,xt=null;return{setTest:function(st){C||(st?z(e.STENCIL_TEST):ce(e.STENCIL_TEST))},setMask:function(st){ve!==st&&!C&&(e.stencilMask(st),ve=st)},setFunc:function(st,qt,kt){(Z!==st||xe!==qt||Te!==kt)&&(e.stencilFunc(st,qt,kt),Z=st,xe=qt,Te=kt)},setOp:function(st,qt,kt){(ie!==st||Ne!==qt||De!==kt)&&(e.stencilOp(st,qt,kt),ie=st,Ne=qt,De=kt)},setLocked:function(st){C=st},setClear:function(st){xt!==st&&(e.clearStencil(st),xt=st)},reset:function(){C=!1,ve=null,Z=null,xe=null,Te=null,ie=null,Ne=null,De=null,xt=null}}}const a=new n,o=new i,s=new r,h=new WeakMap,f=new WeakMap;let g={},p={},l={},_=new WeakMap,x=[],P=null,c=!1,u=null,y=null,R=null,S=null,T=null,b=null,w=null,m=new dt(0,0,0),A=0,O=!1,L=null,V=null,ae=null,Q=null,X=null;const Y=e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let W=!1,ee=0;const ue=e.getParameter(e.VERSION);ue.indexOf("WebGL")!==-1?(ee=parseFloat(/^WebGL (\d)/.exec(ue)[1]),W=ee>=1):ue.indexOf("OpenGL ES")!==-1&&(ee=parseFloat(/^OpenGL ES (\d)/.exec(ue)[1]),W=ee>=2);let Re=null,ge={};const Me=e.getParameter(e.SCISSOR_BOX),Xe=e.getParameter(e.VIEWPORT),it=new Pt().fromArray(Me),Ye=new Pt().fromArray(Xe);function j(C,ve,Z,xe){const Te=new Uint8Array(4),ie=e.createTexture();e.bindTexture(C,ie),e.texParameteri(C,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(C,e.TEXTURE_MAG_FILTER,e.NEAREST);for(let Ne=0;Ne<Z;Ne++)C===e.TEXTURE_3D||C===e.TEXTURE_2D_ARRAY?e.texImage3D(ve,0,e.RGBA,1,1,xe,0,e.RGBA,e.UNSIGNED_BYTE,Te):e.texImage2D(ve+Ne,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,Te);return ie}const N={};N[e.TEXTURE_2D]=j(e.TEXTURE_2D,e.TEXTURE_2D,1),N[e.TEXTURE_CUBE_MAP]=j(e.TEXTURE_CUBE_MAP,e.TEXTURE_CUBE_MAP_POSITIVE_X,6),N[e.TEXTURE_2D_ARRAY]=j(e.TEXTURE_2D_ARRAY,e.TEXTURE_2D_ARRAY,1,1),N[e.TEXTURE_3D]=j(e.TEXTURE_3D,e.TEXTURE_3D,1,1),a.setClear(0,0,0,1),o.setClear(1),s.setClear(0),z(e.DEPTH_TEST),o.setFunc(Jn),Ve(!1),Je(eo),z(e.CULL_FACE),Pe(gn);function z(C){g[C]!==!0&&(e.enable(C),g[C]=!0)}function ce(C){g[C]!==!1&&(e.disable(C),g[C]=!1)}function le(C,ve){return l[C]!==ve?(e.bindFramebuffer(C,ve),l[C]=ve,C===e.DRAW_FRAMEBUFFER&&(l[e.FRAMEBUFFER]=ve),C===e.FRAMEBUFFER&&(l[e.DRAW_FRAMEBUFFER]=ve),!0):!1}function de(C,ve){let Z=x,xe=!1;if(C){Z=_.get(ve),Z===void 0&&(Z=[],_.set(ve,Z));const Te=C.textures;if(Z.length!==Te.length||Z[0]!==e.COLOR_ATTACHMENT0){for(let ie=0,Ne=Te.length;ie<Ne;ie++)Z[ie]=e.COLOR_ATTACHMENT0+ie;Z.length=Te.length,xe=!0}}else Z[0]!==e.BACK&&(Z[0]=e.BACK,xe=!0);xe&&e.drawBuffers(Z)}function K(C){return P!==C?(e.useProgram(C),P=C,!0):!1}const re={[ui]:e.FUNC_ADD,[Qc]:e.FUNC_SUBTRACT,[Zc]:e.FUNC_REVERSE_SUBTRACT};re[nu]=e.MIN,re[iu]=e.MAX;const me={[pl]:e.ZERO,[fl]:e.ONE,[dl]:e.SRC_COLOR,[ul]:e.SRC_ALPHA,[ll]:e.SRC_ALPHA_SATURATE,[cl]:e.DST_COLOR,[sl]:e.DST_ALPHA,[ol]:e.ONE_MINUS_SRC_COLOR,[al]:e.ONE_MINUS_SRC_ALPHA,[rl]:e.ONE_MINUS_DST_COLOR,[il]:e.ONE_MINUS_DST_ALPHA,[nl]:e.CONSTANT_COLOR,[tl]:e.ONE_MINUS_CONSTANT_COLOR,[el]:e.CONSTANT_ALPHA,[Jc]:e.ONE_MINUS_CONSTANT_ALPHA};function Pe(C,ve,Z,xe,Te,ie,Ne,De,xt,st){if(C===gn){c===!0&&(ce(e.BLEND),c=!1);return}if(c===!1&&(z(e.BLEND),c=!0),C!==kl){if(C!==u||st!==O){if((y!==ui||T!==ui)&&(e.blendEquation(e.FUNC_ADD),y=ui,T=ui),st)switch(C){case Ji:e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case io:e.blendFunc(e.ONE,e.ONE);break;case no:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case to:e.blendFuncSeparate(e.DST_COLOR,e.ONE_MINUS_SRC_ALPHA,e.ZERO,e.ONE);break;default:gt("WebGLState: Invalid blending: ",C);break}else switch(C){case Ji:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case io:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE,e.ONE,e.ONE);break;case no:gt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case to:gt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:gt("WebGLState: Invalid blending: ",C);break}R=null,S=null,b=null,w=null,m.set(0,0,0),A=0,u=C,O=st}return}Te=Te||ve,ie=ie||Z,Ne=Ne||xe,(ve!==y||Te!==T)&&(e.blendEquationSeparate(re[ve],re[Te]),y=ve,T=Te),(Z!==R||xe!==S||ie!==b||Ne!==w)&&(e.blendFuncSeparate(me[Z],me[xe],me[ie],me[Ne]),R=Z,S=xe,b=ie,w=Ne),(De.equals(m)===!1||xt!==A)&&(e.blendColor(De.r,De.g,De.b,xt),m.copy(De),A=xt),u=C,O=!1}function be(C,ve){C.side===zt?ce(e.CULL_FACE):z(e.CULL_FACE);let Z=C.side===Kt;ve&&(Z=!Z),Ve(Z),C.blending===Ji&&C.transparent===!1?Pe(gn):Pe(C.blending,C.blendEquation,C.blendSrc,C.blendDst,C.blendEquationAlpha,C.blendSrcAlpha,C.blendDstAlpha,C.blendColor,C.blendAlpha,C.premultipliedAlpha),o.setFunc(C.depthFunc),o.setTest(C.depthTest),o.setMask(C.depthWrite),a.setMask(C.colorWrite);const xe=C.stencilWrite;s.setTest(xe),xe&&(s.setMask(C.stencilWriteMask),s.setFunc(C.stencilFunc,C.stencilRef,C.stencilFuncMask),s.setOp(C.stencilFail,C.stencilZFail,C.stencilZPass)),ft(C.polygonOffset,C.polygonOffsetFactor,C.polygonOffsetUnits),C.alphaToCoverage===!0?z(e.SAMPLE_ALPHA_TO_COVERAGE):ce(e.SAMPLE_ALPHA_TO_COVERAGE)}function Ve(C){L!==C&&(C?e.frontFace(e.CW):e.frontFace(e.CCW),L=C)}function Je(C){C!==Vl?(z(e.CULL_FACE),C!==V&&(C===eo?e.cullFace(e.BACK):C===zl?e.cullFace(e.FRONT):e.cullFace(e.FRONT_AND_BACK))):ce(e.CULL_FACE),V=C}function et(C){C!==ae&&(W&&e.lineWidth(C),ae=C)}function ft(C,ve,Z){C?(z(e.POLYGON_OFFSET_FILL),(Q!==ve||X!==Z)&&(Q=ve,X=Z,o.getReversed()&&(ve=-ve),e.polygonOffset(ve,Z))):ce(e.POLYGON_OFFSET_FILL)}function qe(C){C?z(e.SCISSOR_TEST):ce(e.SCISSOR_TEST)}function lt(C){C===void 0&&(C=e.TEXTURE0+Y-1),Re!==C&&(e.activeTexture(C),Re=C)}function D(C,ve,Z){Z===void 0&&(Re===null?Z=e.TEXTURE0+Y-1:Z=Re);let xe=ge[Z];xe===void 0&&(xe={type:void 0,texture:void 0},ge[Z]=xe),(xe.type!==C||xe.texture!==ve)&&(Re!==Z&&(e.activeTexture(Z),Re=Z),e.bindTexture(C,ve||N[C]),xe.type=C,xe.texture=ve)}function ot(){const C=ge[Re];C!==void 0&&C.type!==void 0&&(e.bindTexture(C.type,null),C.type=void 0,C.texture=void 0)}function Ge(){try{e.compressedTexImage2D(...arguments)}catch(C){gt("WebGLState:",C)}}function E(){try{e.compressedTexImage3D(...arguments)}catch(C){gt("WebGLState:",C)}}function d(){try{e.texSubImage2D(...arguments)}catch(C){gt("WebGLState:",C)}}function U(){try{e.texSubImage3D(...arguments)}catch(C){gt("WebGLState:",C)}}function G(){try{e.compressedTexSubImage2D(...arguments)}catch(C){gt("WebGLState:",C)}}function $(){try{e.compressedTexSubImage3D(...arguments)}catch(C){gt("WebGLState:",C)}}function oe(){try{e.texStorage2D(...arguments)}catch(C){gt("WebGLState:",C)}}function pe(){try{e.texStorage3D(...arguments)}catch(C){gt("WebGLState:",C)}}function q(){try{e.texImage2D(...arguments)}catch(C){gt("WebGLState:",C)}}function J(){try{e.texImage3D(...arguments)}catch(C){gt("WebGLState:",C)}}function he(C){return p[C]!==void 0?p[C]:e.getParameter(C)}function Le(C,ve){p[C]!==ve&&(e.pixelStorei(C,ve),p[C]=ve)}function fe(C){it.equals(C)===!1&&(e.scissor(C.x,C.y,C.z,C.w),it.copy(C))}function Se(C){Ye.equals(C)===!1&&(e.viewport(C.x,C.y,C.z,C.w),Ye.copy(C))}function Be(C,ve){let Z=f.get(ve);Z===void 0&&(Z=new WeakMap,f.set(ve,Z));let xe=Z.get(C);xe===void 0&&(xe=e.getUniformBlockIndex(ve,C.name),Z.set(C,xe))}function He(C,ve){const xe=f.get(ve).get(C);h.get(ve)!==xe&&(e.uniformBlockBinding(ve,xe,C.__bindingPointIndex),h.set(ve,xe))}function ze(){e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.POLYGON_OFFSET_FILL),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ZERO),e.blendFuncSeparate(e.ONE,e.ZERO,e.ONE,e.ZERO),e.blendColor(0,0,0,0),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0),e.depthMask(!0),e.depthFunc(e.LESS),o.setReversed(!1),e.clearDepth(1),e.stencilMask(4294967295),e.stencilFunc(e.ALWAYS,0,4294967295),e.stencilOp(e.KEEP,e.KEEP,e.KEEP),e.clearStencil(0),e.cullFace(e.BACK),e.frontFace(e.CCW),e.polygonOffset(0,0),e.activeTexture(e.TEXTURE0),e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),e.bindFramebuffer(e.READ_FRAMEBUFFER,null),e.useProgram(null),e.lineWidth(1),e.scissor(0,0,e.canvas.width,e.canvas.height),e.viewport(0,0,e.canvas.width,e.canvas.height),e.pixelStorei(e.PACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!1),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,e.BROWSER_DEFAULT_WEBGL),e.pixelStorei(e.PACK_ROW_LENGTH,0),e.pixelStorei(e.PACK_SKIP_PIXELS,0),e.pixelStorei(e.PACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_ROW_LENGTH,0),e.pixelStorei(e.UNPACK_IMAGE_HEIGHT,0),e.pixelStorei(e.UNPACK_SKIP_PIXELS,0),e.pixelStorei(e.UNPACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_SKIP_IMAGES,0),g={},p={},Re=null,ge={},l={},_=new WeakMap,x=[],P=null,c=!1,u=null,y=null,R=null,S=null,T=null,b=null,w=null,m=new dt(0,0,0),A=0,O=!1,L=null,V=null,ae=null,Q=null,X=null,it.set(0,0,e.canvas.width,e.canvas.height),Ye.set(0,0,e.canvas.width,e.canvas.height),a.reset(),o.reset(),s.reset()}return{buffers:{color:a,depth:o,stencil:s},enable:z,disable:ce,bindFramebuffer:le,drawBuffers:de,useProgram:K,setBlending:Pe,setMaterial:be,setFlipSided:Ve,setCullFace:Je,setLineWidth:et,setPolygonOffset:ft,setScissorTest:qe,activeTexture:lt,bindTexture:D,unbindTexture:ot,compressedTexImage2D:Ge,compressedTexImage3D:E,texImage2D:q,texImage3D:J,pixelStorei:Le,getParameter:he,updateUBOMapping:Be,uniformBlockBinding:He,texStorage2D:oe,texStorage3D:pe,texSubImage2D:d,texSubImage3D:U,compressedTexSubImage2D:G,compressedTexSubImage3D:$,scissor:fe,viewport:Se,reset:ze}}function Cm(e,t,n,i,r,a,o){const s=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,h=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),f=new We,g=new WeakMap,p=new Set;let l;const _=new WeakMap;let x=!1;try{x=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function P(E,d){return x?new OffscreenCanvas(E,d):jl("canvas")}function c(E,d,U){let G=1;const $=Ge(E);if(($.width>U||$.height>U)&&(G=U/Math.max($.width,$.height)),G<1)if(typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&E instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&E instanceof ImageBitmap||typeof VideoFrame<"u"&&E instanceof VideoFrame){const oe=Math.floor(G*$.width),pe=Math.floor(G*$.height);l===void 0&&(l=P(oe,pe));const q=d?P(oe,pe):l;return q.width=oe,q.height=pe,q.getContext("2d").drawImage(E,0,0,oe,pe),at("WebGLRenderer: Texture has been resized from ("+$.width+"x"+$.height+") to ("+oe+"x"+pe+")."),q}else return"data"in E&&at("WebGLRenderer: Image in DataTexture is too big ("+$.width+"x"+$.height+")."),E;return E}function u(E){return E.generateMipmaps}function y(E){e.generateMipmap(E)}function R(E){return E.isWebGLCubeRenderTarget?e.TEXTURE_CUBE_MAP:E.isWebGL3DRenderTarget?e.TEXTURE_3D:E.isWebGLArrayRenderTarget||E.isCompressedArrayTexture?e.TEXTURE_2D_ARRAY:e.TEXTURE_2D}function S(E,d,U,G,$,oe=!1){if(E!==null){if(e[E]!==void 0)return e[E];at("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+E+"'")}let pe;G&&(pe=t.get("EXT_texture_norm16"),pe||at("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let q=d;if(d===e.RED&&(U===e.FLOAT&&(q=e.R32F),U===e.HALF_FLOAT&&(q=e.R16F),U===e.UNSIGNED_BYTE&&(q=e.R8),U===e.UNSIGNED_SHORT&&pe&&(q=pe.R16_EXT),U===e.SHORT&&pe&&(q=pe.R16_SNORM_EXT)),d===e.RED_INTEGER&&(U===e.UNSIGNED_BYTE&&(q=e.R8UI),U===e.UNSIGNED_SHORT&&(q=e.R16UI),U===e.UNSIGNED_INT&&(q=e.R32UI),U===e.BYTE&&(q=e.R8I),U===e.SHORT&&(q=e.R16I),U===e.INT&&(q=e.R32I)),d===e.RG&&(U===e.FLOAT&&(q=e.RG32F),U===e.HALF_FLOAT&&(q=e.RG16F),U===e.UNSIGNED_BYTE&&(q=e.RG8),U===e.UNSIGNED_SHORT&&pe&&(q=pe.RG16_EXT),U===e.SHORT&&pe&&(q=pe.RG16_SNORM_EXT)),d===e.RG_INTEGER&&(U===e.UNSIGNED_BYTE&&(q=e.RG8UI),U===e.UNSIGNED_SHORT&&(q=e.RG16UI),U===e.UNSIGNED_INT&&(q=e.RG32UI),U===e.BYTE&&(q=e.RG8I),U===e.SHORT&&(q=e.RG16I),U===e.INT&&(q=e.RG32I)),d===e.RGB_INTEGER&&(U===e.UNSIGNED_BYTE&&(q=e.RGB8UI),U===e.UNSIGNED_SHORT&&(q=e.RGB16UI),U===e.UNSIGNED_INT&&(q=e.RGB32UI),U===e.BYTE&&(q=e.RGB8I),U===e.SHORT&&(q=e.RGB16I),U===e.INT&&(q=e.RGB32I)),d===e.RGBA_INTEGER&&(U===e.UNSIGNED_BYTE&&(q=e.RGBA8UI),U===e.UNSIGNED_SHORT&&(q=e.RGBA16UI),U===e.UNSIGNED_INT&&(q=e.RGBA32UI),U===e.BYTE&&(q=e.RGBA8I),U===e.SHORT&&(q=e.RGBA16I),U===e.INT&&(q=e.RGBA32I)),d===e.RGB&&(U===e.UNSIGNED_SHORT&&pe&&(q=pe.RGB16_EXT),U===e.SHORT&&pe&&(q=pe.RGB16_SNORM_EXT),U===e.UNSIGNED_INT_5_9_9_9_REV&&(q=e.RGB9_E5),U===e.UNSIGNED_INT_10F_11F_11F_REV&&(q=e.R11F_G11F_B10F)),d===e.RGBA){const J=oe?Xs:Et.getTransfer($);U===e.FLOAT&&(q=e.RGBA32F),U===e.HALF_FLOAT&&(q=e.RGBA16F),U===e.UNSIGNED_BYTE&&(q=J===mt?e.SRGB8_ALPHA8:e.RGBA8),U===e.UNSIGNED_SHORT&&pe&&(q=pe.RGBA16_EXT),U===e.SHORT&&pe&&(q=pe.RGBA16_SNORM_EXT),U===e.UNSIGNED_SHORT_4_4_4_4&&(q=e.RGBA4),U===e.UNSIGNED_SHORT_5_5_5_1&&(q=e.RGB5_A1)}return(q===e.R16F||q===e.R32F||q===e.RG16F||q===e.RG32F||q===e.RGBA16F||q===e.RGBA32F)&&t.get("EXT_color_buffer_float"),q}function T(E,d){let U;return E?d===null||d===On||d===yi?U=e.DEPTH24_STENCIL8:d===bn?U=e.DEPTH32F_STENCIL8:d===ir&&(U=e.DEPTH24_STENCIL8,at("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):d===null||d===On||d===yi?U=e.DEPTH_COMPONENT24:d===bn?U=e.DEPTH_COMPONENT32F:d===ir&&(U=e.DEPTH_COMPONENT16),U}function b(E,d){return u(E)===!0||E.isFramebufferTexture&&E.minFilter!==In&&E.minFilter!==Yt?Math.log2(Math.max(d.width,d.height))+1:E.mipmaps!==void 0&&E.mipmaps.length>0?E.mipmaps.length:E.isCompressedTexture&&Array.isArray(E.image)?d.mipmaps.length:1}function w(E){const d=E.target;d.removeEventListener("dispose",w),A(d),d.isVideoTexture&&g.delete(d),d.isHTMLTexture&&p.delete(d)}function m(E){const d=E.target;d.removeEventListener("dispose",m),L(d)}function A(E){const d=i.get(E);if(d.__webglInit===void 0)return;const U=E.source,G=_.get(U);if(G){const $=G[d.__cacheKey];$.usedTimes--,$.usedTimes===0&&O(E),Object.keys(G).length===0&&_.delete(U)}i.remove(E)}function O(E){const d=i.get(E);e.deleteTexture(d.__webglTexture);const U=E.source,G=_.get(U);delete G[d.__cacheKey],o.memory.textures--}function L(E){const d=i.get(E);if(E.depthTexture&&(E.depthTexture.dispose(),i.remove(E.depthTexture)),E.isWebGLCubeRenderTarget)for(let G=0;G<6;G++){if(Array.isArray(d.__webglFramebuffer[G]))for(let $=0;$<d.__webglFramebuffer[G].length;$++)e.deleteFramebuffer(d.__webglFramebuffer[G][$]);else e.deleteFramebuffer(d.__webglFramebuffer[G]);d.__webglDepthbuffer&&e.deleteRenderbuffer(d.__webglDepthbuffer[G])}else{if(Array.isArray(d.__webglFramebuffer))for(let G=0;G<d.__webglFramebuffer.length;G++)e.deleteFramebuffer(d.__webglFramebuffer[G]);else e.deleteFramebuffer(d.__webglFramebuffer);if(d.__webglDepthbuffer&&e.deleteRenderbuffer(d.__webglDepthbuffer),d.__webglMultisampledFramebuffer&&e.deleteFramebuffer(d.__webglMultisampledFramebuffer),d.__webglColorRenderbuffer)for(let G=0;G<d.__webglColorRenderbuffer.length;G++)d.__webglColorRenderbuffer[G]&&e.deleteRenderbuffer(d.__webglColorRenderbuffer[G]);d.__webglDepthRenderbuffer&&e.deleteRenderbuffer(d.__webglDepthRenderbuffer)}const U=E.textures;for(let G=0,$=U.length;G<$;G++){const oe=i.get(U[G]);oe.__webglTexture&&(e.deleteTexture(oe.__webglTexture),o.memory.textures--),i.remove(U[G])}i.remove(E)}let V=0;function ae(){V=0}function Q(){return V}function X(E){V=E}function Y(){const E=V;return E>=r.maxTextures&&at("WebGLTextures: Trying to use "+E+" texture units while this GPU supports only "+r.maxTextures),V+=1,E}function W(E){const d=[];return d.push(E.wrapS),d.push(E.wrapT),d.push(E.wrapR||0),d.push(E.magFilter),d.push(E.minFilter),d.push(E.anisotropy),d.push(E.internalFormat),d.push(E.format),d.push(E.type),d.push(E.generateMipmaps),d.push(E.premultiplyAlpha),d.push(E.flipY),d.push(E.unpackAlignment),d.push(E.colorSpace),d.join()}function ee(E,d){const U=i.get(E);if(E.isVideoTexture&&D(E),E.isRenderTargetTexture===!1&&E.isExternalTexture!==!0&&E.version>0&&U.__version!==E.version){const G=E.image;if(G===null)at("WebGLRenderer: Texture marked for update but no image data found.");else if(G.complete===!1)at("WebGLRenderer: Texture marked for update but image is incomplete");else{ce(U,E,d);return}}else E.isExternalTexture&&(U.__webglTexture=E.sourceTexture?E.sourceTexture:null);n.bindTexture(e.TEXTURE_2D,U.__webglTexture,e.TEXTURE0+d)}function ue(E,d){const U=i.get(E);if(E.isRenderTargetTexture===!1&&E.version>0&&U.__version!==E.version){ce(U,E,d);return}else E.isExternalTexture&&(U.__webglTexture=E.sourceTexture?E.sourceTexture:null);n.bindTexture(e.TEXTURE_2D_ARRAY,U.__webglTexture,e.TEXTURE0+d)}function Re(E,d){const U=i.get(E);if(E.isRenderTargetTexture===!1&&E.version>0&&U.__version!==E.version){ce(U,E,d);return}n.bindTexture(e.TEXTURE_3D,U.__webglTexture,e.TEXTURE0+d)}function ge(E,d){const U=i.get(E);if(E.isCubeDepthTexture!==!0&&E.version>0&&U.__version!==E.version){le(U,E,d);return}n.bindTexture(e.TEXTURE_CUBE_MAP,U.__webglTexture,e.TEXTURE0+d)}const Me={[ml]:e.REPEAT,[Wr]:e.CLAMP_TO_EDGE,[hl]:e.MIRRORED_REPEAT},Xe={[In]:e.NEAREST,[_l]:e.NEAREST_MIPMAP_NEAREST,[Xi]:e.NEAREST_MIPMAP_LINEAR,[Yt]:e.LINEAR,[vr]:e.LINEAR_MIPMAP_NEAREST,[Xn]:e.LINEAR_MIPMAP_LINEAR},it={[Ml]:e.NEVER,[El]:e.ALWAYS,[Sl]:e.LESS,[ca]:e.LEQUAL,[xl]:e.EQUAL,[sa]:e.GEQUAL,[vl]:e.GREATER,[gl]:e.NOTEQUAL};function Ye(E,d){if(d.type===bn&&t.has("OES_texture_float_linear")===!1&&(d.magFilter===Yt||d.magFilter===vr||d.magFilter===Xi||d.magFilter===Xn||d.minFilter===Yt||d.minFilter===vr||d.minFilter===Xi||d.minFilter===Xn)&&at("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),e.texParameteri(E,e.TEXTURE_WRAP_S,Me[d.wrapS]),e.texParameteri(E,e.TEXTURE_WRAP_T,Me[d.wrapT]),(E===e.TEXTURE_3D||E===e.TEXTURE_2D_ARRAY)&&e.texParameteri(E,e.TEXTURE_WRAP_R,Me[d.wrapR]),e.texParameteri(E,e.TEXTURE_MAG_FILTER,Xe[d.magFilter]),e.texParameteri(E,e.TEXTURE_MIN_FILTER,Xe[d.minFilter]),d.compareFunction&&(e.texParameteri(E,e.TEXTURE_COMPARE_MODE,e.COMPARE_REF_TO_TEXTURE),e.texParameteri(E,e.TEXTURE_COMPARE_FUNC,it[d.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(d.magFilter===In||d.minFilter!==Xi&&d.minFilter!==Xn||d.type===bn&&t.has("OES_texture_float_linear")===!1)return;if(d.anisotropy>1||i.get(d).__currentAnisotropy){const U=t.get("EXT_texture_filter_anisotropic");e.texParameterf(E,U.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(d.anisotropy,r.getMaxAnisotropy())),i.get(d).__currentAnisotropy=d.anisotropy}}}function j(E,d){let U=!1;E.__webglInit===void 0&&(E.__webglInit=!0,d.addEventListener("dispose",w));const G=d.source;let $=_.get(G);$===void 0&&($={},_.set(G,$));const oe=W(d);if(oe!==E.__cacheKey){$[oe]===void 0&&($[oe]={texture:e.createTexture(),usedTimes:0},o.memory.textures++,U=!0),$[oe].usedTimes++;const pe=$[E.__cacheKey];pe!==void 0&&($[E.__cacheKey].usedTimes--,pe.usedTimes===0&&O(d)),E.__cacheKey=oe,E.__webglTexture=$[oe].texture}return U}function N(E,d,U){return Math.floor(Math.floor(E/U)/d)}function z(E,d,U,G){const oe=E.updateRanges;if(oe.length===0)n.texSubImage2D(e.TEXTURE_2D,0,0,0,d.width,d.height,U,G,d.data);else{oe.sort((Le,fe)=>Le.start-fe.start);let pe=0;for(let Le=1;Le<oe.length;Le++){const fe=oe[pe],Se=oe[Le],Be=fe.start+fe.count,He=N(Se.start,d.width,4),ze=N(fe.start,d.width,4);Se.start<=Be+1&&He===ze&&N(Se.start+Se.count-1,d.width,4)===He?fe.count=Math.max(fe.count,Se.start+Se.count-fe.start):(++pe,oe[pe]=Se)}oe.length=pe+1;const q=n.getParameter(e.UNPACK_ROW_LENGTH),J=n.getParameter(e.UNPACK_SKIP_PIXELS),he=n.getParameter(e.UNPACK_SKIP_ROWS);n.pixelStorei(e.UNPACK_ROW_LENGTH,d.width);for(let Le=0,fe=oe.length;Le<fe;Le++){const Se=oe[Le],Be=Math.floor(Se.start/4),He=Math.ceil(Se.count/4),ze=Be%d.width,C=Math.floor(Be/d.width),ve=He,Z=1;n.pixelStorei(e.UNPACK_SKIP_PIXELS,ze),n.pixelStorei(e.UNPACK_SKIP_ROWS,C),n.texSubImage2D(e.TEXTURE_2D,0,ze,C,ve,Z,U,G,d.data)}E.clearUpdateRanges(),n.pixelStorei(e.UNPACK_ROW_LENGTH,q),n.pixelStorei(e.UNPACK_SKIP_PIXELS,J),n.pixelStorei(e.UNPACK_SKIP_ROWS,he)}}function ce(E,d,U){let G=e.TEXTURE_2D;(d.isDataArrayTexture||d.isCompressedArrayTexture)&&(G=e.TEXTURE_2D_ARRAY),d.isData3DTexture&&(G=e.TEXTURE_3D);const $=j(E,d),oe=d.source;n.bindTexture(G,E.__webglTexture,e.TEXTURE0+U);const pe=i.get(oe);if(oe.version!==pe.__version||$===!0){if(n.activeTexture(e.TEXTURE0+U),(typeof ImageBitmap<"u"&&d.image instanceof ImageBitmap)===!1){const Z=Et.getPrimaries(Et.workingColorSpace),xe=d.colorSpace===kn?null:Et.getPrimaries(d.colorSpace),Te=d.colorSpace===kn||Z===xe?e.NONE:e.BROWSER_DEFAULT_WEBGL;n.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,d.flipY),n.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,d.premultiplyAlpha),n.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,Te)}n.pixelStorei(e.UNPACK_ALIGNMENT,d.unpackAlignment);let J=c(d.image,!1,r.maxTextureSize);J=ot(d,J);const he=a.convert(d.format,d.colorSpace),Le=a.convert(d.type);let fe=S(d.internalFormat,he,Le,d.normalized,d.colorSpace,d.isVideoTexture);Ye(G,d);let Se;const Be=d.mipmaps,He=d.isVideoTexture!==!0,ze=pe.__version===void 0||$===!0,C=oe.dataReady,ve=b(d,J);if(d.isDepthTexture)fe=T(d.format===Yn,d.type),ze&&(He?n.texStorage2D(e.TEXTURE_2D,1,fe,J.width,J.height):n.texImage2D(e.TEXTURE_2D,0,fe,J.width,J.height,0,he,Le,null));else if(d.isDataTexture)if(Be.length>0){He&&ze&&n.texStorage2D(e.TEXTURE_2D,ve,fe,Be[0].width,Be[0].height);for(let Z=0,xe=Be.length;Z<xe;Z++)Se=Be[Z],He?C&&n.texSubImage2D(e.TEXTURE_2D,Z,0,0,Se.width,Se.height,he,Le,Se.data):n.texImage2D(e.TEXTURE_2D,Z,fe,Se.width,Se.height,0,he,Le,Se.data);d.generateMipmaps=!1}else He?(ze&&n.texStorage2D(e.TEXTURE_2D,ve,fe,J.width,J.height),C&&z(d,J,he,Le)):n.texImage2D(e.TEXTURE_2D,0,fe,J.width,J.height,0,he,Le,J.data);else if(d.isCompressedTexture)if(d.isCompressedArrayTexture){He&&ze&&n.texStorage3D(e.TEXTURE_2D_ARRAY,ve,fe,Be[0].width,Be[0].height,J.depth);for(let Z=0,xe=Be.length;Z<xe;Z++)if(Se=Be[Z],d.format!==_n)if(he!==null)if(He){if(C)if(d.layerUpdates.size>0){const Te=ao(Se.width,Se.height,d.format,d.type);for(const ie of d.layerUpdates){const Ne=Se.data.subarray(ie*Te/Se.data.BYTES_PER_ELEMENT,(ie+1)*Te/Se.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,Z,0,0,ie,Se.width,Se.height,1,he,Ne)}d.clearLayerUpdates()}else n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,Z,0,0,0,Se.width,Se.height,J.depth,he,Se.data)}else n.compressedTexImage3D(e.TEXTURE_2D_ARRAY,Z,fe,Se.width,Se.height,J.depth,0,Se.data,0,0);else at("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else He?C&&n.texSubImage3D(e.TEXTURE_2D_ARRAY,Z,0,0,0,Se.width,Se.height,J.depth,he,Le,Se.data):n.texImage3D(e.TEXTURE_2D_ARRAY,Z,fe,Se.width,Se.height,J.depth,0,he,Le,Se.data)}else{He&&ze&&n.texStorage2D(e.TEXTURE_2D,ve,fe,Be[0].width,Be[0].height);for(let Z=0,xe=Be.length;Z<xe;Z++)Se=Be[Z],d.format!==_n?he!==null?He?C&&n.compressedTexSubImage2D(e.TEXTURE_2D,Z,0,0,Se.width,Se.height,he,Se.data):n.compressedTexImage2D(e.TEXTURE_2D,Z,fe,Se.width,Se.height,0,Se.data):at("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):He?C&&n.texSubImage2D(e.TEXTURE_2D,Z,0,0,Se.width,Se.height,he,Le,Se.data):n.texImage2D(e.TEXTURE_2D,Z,fe,Se.width,Se.height,0,he,Le,Se.data)}else if(d.isDataArrayTexture)if(He){if(ze&&n.texStorage3D(e.TEXTURE_2D_ARRAY,ve,fe,J.width,J.height,J.depth),C)if(d.layerUpdates.size>0){const Z=ao(J.width,J.height,d.format,d.type);for(const xe of d.layerUpdates){const Te=J.data.subarray(xe*Z/J.data.BYTES_PER_ELEMENT,(xe+1)*Z/J.data.BYTES_PER_ELEMENT);n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,xe,J.width,J.height,1,he,Le,Te)}d.clearLayerUpdates()}else n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,0,J.width,J.height,J.depth,he,Le,J.data)}else n.texImage3D(e.TEXTURE_2D_ARRAY,0,fe,J.width,J.height,J.depth,0,he,Le,J.data);else if(d.isData3DTexture)He?(ze&&n.texStorage3D(e.TEXTURE_3D,ve,fe,J.width,J.height,J.depth),C&&n.texSubImage3D(e.TEXTURE_3D,0,0,0,0,J.width,J.height,J.depth,he,Le,J.data)):n.texImage3D(e.TEXTURE_3D,0,fe,J.width,J.height,J.depth,0,he,Le,J.data);else if(d.isFramebufferTexture){if(ze)if(He)n.texStorage2D(e.TEXTURE_2D,ve,fe,J.width,J.height);else{let Z=J.width,xe=J.height;for(let Te=0;Te<ve;Te++)n.texImage2D(e.TEXTURE_2D,Te,fe,Z,xe,0,he,Le,null),Z>>=1,xe>>=1}}else if(d.isHTMLTexture){if("texElementImage2D"in e){const Z=e.canvas;if(Z.hasAttribute("layoutsubtree")||Z.setAttribute("layoutsubtree","true"),J.parentNode!==Z){Z.appendChild(J),p.add(d),Z.onpaint=xe=>{const Te=xe.changedElements;for(const ie of p)Te.includes(ie.image)&&(ie.needsUpdate=!0)},Z.requestPaint();return}if(e.texElementImage2D.length===3)e.texElementImage2D(e.TEXTURE_2D,e.RGBA8,J);else{const Te=e.RGBA,ie=e.RGBA,Ne=e.UNSIGNED_BYTE;e.texElementImage2D(e.TEXTURE_2D,0,Te,ie,Ne,J)}e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE)}}else if(Be.length>0){if(He&&ze){const Z=Ge(Be[0]);n.texStorage2D(e.TEXTURE_2D,ve,fe,Z.width,Z.height)}for(let Z=0,xe=Be.length;Z<xe;Z++)Se=Be[Z],He?C&&n.texSubImage2D(e.TEXTURE_2D,Z,0,0,he,Le,Se):n.texImage2D(e.TEXTURE_2D,Z,fe,he,Le,Se);d.generateMipmaps=!1}else if(He){if(ze){const Z=Ge(J);n.texStorage2D(e.TEXTURE_2D,ve,fe,Z.width,Z.height)}C&&n.texSubImage2D(e.TEXTURE_2D,0,0,0,he,Le,J)}else n.texImage2D(e.TEXTURE_2D,0,fe,he,Le,J);u(d)&&y(G),pe.__version=oe.version,d.onUpdate&&d.onUpdate(d)}E.__version=d.version}function le(E,d,U){if(d.image.length!==6)return;const G=j(E,d),$=d.source;n.bindTexture(e.TEXTURE_CUBE_MAP,E.__webglTexture,e.TEXTURE0+U);const oe=i.get($);if($.version!==oe.__version||G===!0){n.activeTexture(e.TEXTURE0+U);const pe=Et.getPrimaries(Et.workingColorSpace),q=d.colorSpace===kn?null:Et.getPrimaries(d.colorSpace),J=d.colorSpace===kn||pe===q?e.NONE:e.BROWSER_DEFAULT_WEBGL;n.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,d.flipY),n.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,d.premultiplyAlpha),n.pixelStorei(e.UNPACK_ALIGNMENT,d.unpackAlignment),n.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,J);const he=d.isCompressedTexture||d.image[0].isCompressedTexture,Le=d.image[0]&&d.image[0].isDataTexture,fe=[];for(let ie=0;ie<6;ie++)!he&&!Le?fe[ie]=c(d.image[ie],!0,r.maxCubemapSize):fe[ie]=Le?d.image[ie].image:d.image[ie],fe[ie]=ot(d,fe[ie]);const Se=fe[0],Be=a.convert(d.format,d.colorSpace),He=a.convert(d.type),ze=S(d.internalFormat,Be,He,d.normalized,d.colorSpace),C=d.isVideoTexture!==!0,ve=oe.__version===void 0||G===!0,Z=$.dataReady;let xe=b(d,Se);Ye(e.TEXTURE_CUBE_MAP,d);let Te;if(he){C&&ve&&n.texStorage2D(e.TEXTURE_CUBE_MAP,xe,ze,Se.width,Se.height);for(let ie=0;ie<6;ie++){Te=fe[ie].mipmaps;for(let Ne=0;Ne<Te.length;Ne++){const De=Te[Ne];d.format!==_n?Be!==null?C?Z&&n.compressedTexSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+ie,Ne,0,0,De.width,De.height,Be,De.data):n.compressedTexImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+ie,Ne,ze,De.width,De.height,0,De.data):at("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):C?Z&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+ie,Ne,0,0,De.width,De.height,Be,He,De.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+ie,Ne,ze,De.width,De.height,0,Be,He,De.data)}}}else{if(Te=d.mipmaps,C&&ve){Te.length>0&&xe++;const ie=Ge(fe[0]);n.texStorage2D(e.TEXTURE_CUBE_MAP,xe,ze,ie.width,ie.height)}for(let ie=0;ie<6;ie++)if(Le){C?Z&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0,0,0,fe[ie].width,fe[ie].height,Be,He,fe[ie].data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0,ze,fe[ie].width,fe[ie].height,0,Be,He,fe[ie].data);for(let Ne=0;Ne<Te.length;Ne++){const xt=Te[Ne].image[ie].image;C?Z&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+ie,Ne+1,0,0,xt.width,xt.height,Be,He,xt.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+ie,Ne+1,ze,xt.width,xt.height,0,Be,He,xt.data)}}else{C?Z&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0,0,0,Be,He,fe[ie]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0,ze,Be,He,fe[ie]);for(let Ne=0;Ne<Te.length;Ne++){const De=Te[Ne];C?Z&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+ie,Ne+1,0,0,Be,He,De.image[ie]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+ie,Ne+1,ze,Be,He,De.image[ie])}}}u(d)&&y(e.TEXTURE_CUBE_MAP),oe.__version=$.version,d.onUpdate&&d.onUpdate(d)}E.__version=d.version}function de(E,d,U,G,$,oe){const pe=a.convert(U.format,U.colorSpace),q=a.convert(U.type),J=S(U.internalFormat,pe,q,U.normalized,U.colorSpace),he=i.get(d),Le=i.get(U);if(Le.__renderTarget=d,!he.__hasExternalTextures){const fe=Math.max(1,d.width>>oe),Se=Math.max(1,d.height>>oe);$===e.TEXTURE_3D||$===e.TEXTURE_2D_ARRAY?n.texImage3D($,oe,J,fe,Se,d.depth,0,pe,q,null):n.texImage2D($,oe,J,fe,Se,0,pe,q,null)}n.bindFramebuffer(e.FRAMEBUFFER,E),lt(d)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,G,$,Le.__webglTexture,0,qe(d)):($===e.TEXTURE_2D||$>=e.TEXTURE_CUBE_MAP_POSITIVE_X&&$<=e.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&e.framebufferTexture2D(e.FRAMEBUFFER,G,$,Le.__webglTexture,oe),n.bindFramebuffer(e.FRAMEBUFFER,null)}function K(E,d,U){if(e.bindRenderbuffer(e.RENDERBUFFER,E),d.depthBuffer){const G=d.depthTexture,$=G&&G.isDepthTexture?G.type:null,oe=T(d.stencilBuffer,$),pe=d.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;lt(d)?s.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,qe(d),oe,d.width,d.height):U?e.renderbufferStorageMultisample(e.RENDERBUFFER,qe(d),oe,d.width,d.height):e.renderbufferStorage(e.RENDERBUFFER,oe,d.width,d.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,pe,e.RENDERBUFFER,E)}else{const G=d.textures;for(let $=0;$<G.length;$++){const oe=G[$],pe=a.convert(oe.format,oe.colorSpace),q=a.convert(oe.type),J=S(oe.internalFormat,pe,q,oe.normalized,oe.colorSpace);lt(d)?s.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,qe(d),J,d.width,d.height):U?e.renderbufferStorageMultisample(e.RENDERBUFFER,qe(d),J,d.width,d.height):e.renderbufferStorage(e.RENDERBUFFER,J,d.width,d.height)}}e.bindRenderbuffer(e.RENDERBUFFER,null)}function re(E,d,U){const G=d.isWebGLCubeRenderTarget===!0;if(n.bindFramebuffer(e.FRAMEBUFFER,E),!(d.depthTexture&&d.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const $=i.get(d.depthTexture);if($.__renderTarget=d,(!$.__webglTexture||d.depthTexture.image.width!==d.width||d.depthTexture.image.height!==d.height)&&(d.depthTexture.image.width=d.width,d.depthTexture.image.height=d.height,d.depthTexture.needsUpdate=!0),G){if($.__webglInit===void 0&&($.__webglInit=!0,d.depthTexture.addEventListener("dispose",w)),$.__webglTexture===void 0){$.__webglTexture=e.createTexture(),n.bindTexture(e.TEXTURE_CUBE_MAP,$.__webglTexture),Ye(e.TEXTURE_CUBE_MAP,d.depthTexture);const he=a.convert(d.depthTexture.format),Le=a.convert(d.depthTexture.type);let fe;d.depthTexture.format===Zn?fe=e.DEPTH_COMPONENT24:d.depthTexture.format===Yn&&(fe=e.DEPTH24_STENCIL8);for(let Se=0;Se<6;Se++)e.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+Se,0,fe,d.width,d.height,0,he,Le,null)}}else ee(d.depthTexture,0);const oe=$.__webglTexture,pe=qe(d),q=G?e.TEXTURE_CUBE_MAP_POSITIVE_X+U:e.TEXTURE_2D,J=d.depthTexture.format===Yn?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;if(d.depthTexture.format===Zn)lt(d)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,J,q,oe,0,pe):e.framebufferTexture2D(e.FRAMEBUFFER,J,q,oe,0);else if(d.depthTexture.format===Yn)lt(d)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,J,q,oe,0,pe):e.framebufferTexture2D(e.FRAMEBUFFER,J,q,oe,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function me(E){const d=i.get(E),U=E.isWebGLCubeRenderTarget===!0;if(d.__boundDepthTexture!==E.depthTexture){const G=E.depthTexture;if(d.__depthDisposeCallback&&d.__depthDisposeCallback(),G){const $=()=>{delete d.__boundDepthTexture,delete d.__depthDisposeCallback,G.removeEventListener("dispose",$)};G.addEventListener("dispose",$),d.__depthDisposeCallback=$}d.__boundDepthTexture=G}if(E.depthTexture&&!d.__autoAllocateDepthBuffer)if(U)for(let G=0;G<6;G++)re(d.__webglFramebuffer[G],E,G);else{const G=E.texture.mipmaps;G&&G.length>0?re(d.__webglFramebuffer[0],E,0):re(d.__webglFramebuffer,E,0)}else if(U){d.__webglDepthbuffer=[];for(let G=0;G<6;G++)if(n.bindFramebuffer(e.FRAMEBUFFER,d.__webglFramebuffer[G]),d.__webglDepthbuffer[G]===void 0)d.__webglDepthbuffer[G]=e.createRenderbuffer(),K(d.__webglDepthbuffer[G],E,!1);else{const $=E.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,oe=d.__webglDepthbuffer[G];e.bindRenderbuffer(e.RENDERBUFFER,oe),e.framebufferRenderbuffer(e.FRAMEBUFFER,$,e.RENDERBUFFER,oe)}}else{const G=E.texture.mipmaps;if(G&&G.length>0?n.bindFramebuffer(e.FRAMEBUFFER,d.__webglFramebuffer[0]):n.bindFramebuffer(e.FRAMEBUFFER,d.__webglFramebuffer),d.__webglDepthbuffer===void 0)d.__webglDepthbuffer=e.createRenderbuffer(),K(d.__webglDepthbuffer,E,!1);else{const $=E.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,oe=d.__webglDepthbuffer;e.bindRenderbuffer(e.RENDERBUFFER,oe),e.framebufferRenderbuffer(e.FRAMEBUFFER,$,e.RENDERBUFFER,oe)}}n.bindFramebuffer(e.FRAMEBUFFER,null)}function Pe(E,d,U){const G=i.get(E);d!==void 0&&de(G.__webglFramebuffer,E,E.texture,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,0),U!==void 0&&me(E)}function be(E){const d=E.texture,U=i.get(E),G=i.get(d);E.addEventListener("dispose",m);const $=E.textures,oe=E.isWebGLCubeRenderTarget===!0,pe=$.length>1;if(pe||(G.__webglTexture===void 0&&(G.__webglTexture=e.createTexture()),G.__version=d.version,o.memory.textures++),oe){U.__webglFramebuffer=[];for(let q=0;q<6;q++)if(d.mipmaps&&d.mipmaps.length>0){U.__webglFramebuffer[q]=[];for(let J=0;J<d.mipmaps.length;J++)U.__webglFramebuffer[q][J]=e.createFramebuffer()}else U.__webglFramebuffer[q]=e.createFramebuffer()}else{if(d.mipmaps&&d.mipmaps.length>0){U.__webglFramebuffer=[];for(let q=0;q<d.mipmaps.length;q++)U.__webglFramebuffer[q]=e.createFramebuffer()}else U.__webglFramebuffer=e.createFramebuffer();if(pe)for(let q=0,J=$.length;q<J;q++){const he=i.get($[q]);he.__webglTexture===void 0&&(he.__webglTexture=e.createTexture(),o.memory.textures++)}if(E.samples>0&&lt(E)===!1){U.__webglMultisampledFramebuffer=e.createFramebuffer(),U.__webglColorRenderbuffer=[],n.bindFramebuffer(e.FRAMEBUFFER,U.__webglMultisampledFramebuffer);for(let q=0;q<$.length;q++){const J=$[q];U.__webglColorRenderbuffer[q]=e.createRenderbuffer(),e.bindRenderbuffer(e.RENDERBUFFER,U.__webglColorRenderbuffer[q]);const he=a.convert(J.format,J.colorSpace),Le=a.convert(J.type),fe=S(J.internalFormat,he,Le,J.normalized,J.colorSpace,E.isXRRenderTarget===!0),Se=qe(E);e.renderbufferStorageMultisample(e.RENDERBUFFER,Se,fe,E.width,E.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+q,e.RENDERBUFFER,U.__webglColorRenderbuffer[q])}e.bindRenderbuffer(e.RENDERBUFFER,null),E.depthBuffer&&(U.__webglDepthRenderbuffer=e.createRenderbuffer(),K(U.__webglDepthRenderbuffer,E,!0)),n.bindFramebuffer(e.FRAMEBUFFER,null)}}if(oe){n.bindTexture(e.TEXTURE_CUBE_MAP,G.__webglTexture),Ye(e.TEXTURE_CUBE_MAP,d);for(let q=0;q<6;q++)if(d.mipmaps&&d.mipmaps.length>0)for(let J=0;J<d.mipmaps.length;J++)de(U.__webglFramebuffer[q][J],E,d,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+q,J);else de(U.__webglFramebuffer[q],E,d,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+q,0);u(d)&&y(e.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(pe){for(let q=0,J=$.length;q<J;q++){const he=$[q],Le=i.get(he);let fe=e.TEXTURE_2D;(E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&(fe=E.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(fe,Le.__webglTexture),Ye(fe,he),de(U.__webglFramebuffer,E,he,e.COLOR_ATTACHMENT0+q,fe,0),u(he)&&y(fe)}n.unbindTexture()}else{let q=e.TEXTURE_2D;if((E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&(q=E.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(q,G.__webglTexture),Ye(q,d),d.mipmaps&&d.mipmaps.length>0)for(let J=0;J<d.mipmaps.length;J++)de(U.__webglFramebuffer[J],E,d,e.COLOR_ATTACHMENT0,q,J);else de(U.__webglFramebuffer,E,d,e.COLOR_ATTACHMENT0,q,0);u(d)&&y(q),n.unbindTexture()}E.depthBuffer&&me(E)}function Ve(E){const d=E.textures;for(let U=0,G=d.length;U<G;U++){const $=d[U];if(u($)){const oe=R(E),pe=i.get($).__webglTexture;n.bindTexture(oe,pe),y(oe),n.unbindTexture()}}}const Je=[],et=[];function ft(E){if(E.samples>0){if(lt(E)===!1){const d=E.textures,U=E.width,G=E.height;let $=e.COLOR_BUFFER_BIT;const oe=E.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,pe=i.get(E),q=d.length>1;if(q)for(let he=0;he<d.length;he++)n.bindFramebuffer(e.FRAMEBUFFER,pe.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+he,e.RENDERBUFFER,null),n.bindFramebuffer(e.FRAMEBUFFER,pe.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+he,e.TEXTURE_2D,null,0);n.bindFramebuffer(e.READ_FRAMEBUFFER,pe.__webglMultisampledFramebuffer);const J=E.texture.mipmaps;J&&J.length>0?n.bindFramebuffer(e.DRAW_FRAMEBUFFER,pe.__webglFramebuffer[0]):n.bindFramebuffer(e.DRAW_FRAMEBUFFER,pe.__webglFramebuffer);for(let he=0;he<d.length;he++){if(E.resolveDepthBuffer&&(E.depthBuffer&&($|=e.DEPTH_BUFFER_BIT),E.stencilBuffer&&E.resolveStencilBuffer&&($|=e.STENCIL_BUFFER_BIT)),q){e.framebufferRenderbuffer(e.READ_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.RENDERBUFFER,pe.__webglColorRenderbuffer[he]);const Le=i.get(d[he]).__webglTexture;e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,Le,0)}e.blitFramebuffer(0,0,U,G,0,0,U,G,$,e.NEAREST),h===!0&&(Je.length=0,et.length=0,Je.push(e.COLOR_ATTACHMENT0+he),E.depthBuffer&&E.resolveDepthBuffer===!1&&(Je.push(oe),et.push(oe),e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,et)),e.invalidateFramebuffer(e.READ_FRAMEBUFFER,Je))}if(n.bindFramebuffer(e.READ_FRAMEBUFFER,null),n.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),q)for(let he=0;he<d.length;he++){n.bindFramebuffer(e.FRAMEBUFFER,pe.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+he,e.RENDERBUFFER,pe.__webglColorRenderbuffer[he]);const Le=i.get(d[he]).__webglTexture;n.bindFramebuffer(e.FRAMEBUFFER,pe.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+he,e.TEXTURE_2D,Le,0)}n.bindFramebuffer(e.DRAW_FRAMEBUFFER,pe.__webglMultisampledFramebuffer)}else if(E.depthBuffer&&E.resolveDepthBuffer===!1&&h){const d=E.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,[d])}}}function qe(E){return Math.min(r.maxSamples,E.samples)}function lt(E){const d=i.get(E);return E.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&d.__useRenderToTexture!==!1}function D(E){const d=o.render.frame;g.get(E)!==d&&(g.set(E,d),E.update())}function ot(E,d){const U=E.colorSpace,G=E.format,$=E.type;return E.isCompressedTexture===!0||E.isVideoTexture===!0||U!==Ys&&U!==kn&&(Et.getTransfer(U)===mt?(G!==_n||$!==an)&&at("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):gt("WebGLTextures: Unsupported texture color space:",U)),d}function Ge(E){return typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement?(f.width=E.naturalWidth||E.width,f.height=E.naturalHeight||E.height):typeof VideoFrame<"u"&&E instanceof VideoFrame?(f.width=E.displayWidth,f.height=E.displayHeight):(f.width=E.width,f.height=E.height),f}this.allocateTextureUnit=Y,this.resetTextureUnits=ae,this.getTextureUnits=Q,this.setTextureUnits=X,this.setTexture2D=ee,this.setTexture2DArray=ue,this.setTexture3D=Re,this.setTextureCube=ge,this.rebindTextures=Pe,this.setupRenderTarget=be,this.updateRenderTargetMipmap=Ve,this.updateMultisampleRenderTarget=ft,this.setupDepthRenderbuffer=me,this.setupFrameBufferTexture=de,this.useMultisampledRTT=lt,this.isReversedDepthBuffer=function(){return n.buffers.depth.getReversed()}}function Dm(e,t){function n(i,r=kn){let a;const o=Et.getTransfer(r);if(i===an)return e.UNSIGNED_BYTE;if(i===Ds)return e.UNSIGNED_SHORT_4_4_4_4;if(i===Ls)return e.UNSIGNED_SHORT_5_5_5_1;if(i===Pl)return e.UNSIGNED_INT_5_9_9_9_REV;if(i===Rl)return e.UNSIGNED_INT_10F_11F_11F_REV;if(i===wl)return e.BYTE;if(i===Cl)return e.SHORT;if(i===ir)return e.UNSIGNED_SHORT;if(i===Ns)return e.INT;if(i===On)return e.UNSIGNED_INT;if(i===bn)return e.FLOAT;if(i===yn)return e.HALF_FLOAT;if(i===Dl)return e.ALPHA;if(i===Ll)return e.RGB;if(i===_n)return e.RGBA;if(i===Zn)return e.DEPTH_COMPONENT;if(i===Yn)return e.DEPTH_STENCIL;if(i===Il)return e.RED;if(i===Cs)return e.RED_INTEGER;if(i===Qn)return e.RG;if(i===ws)return e.RG_INTEGER;if(i===Rs)return e.RGBA_INTEGER;if(i===xr||i===Sr||i===Er||i===Mr)if(o===mt)if(a=t.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(i===xr)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Sr)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Er)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Mr)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=t.get("WEBGL_compressed_texture_s3tc"),a!==null){if(i===xr)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Sr)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Er)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Mr)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Ta||i===Aa||i===ya||i===Pa)if(a=t.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(i===Ta)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Aa)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===ya)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Pa)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Ra||i===wa||i===Ca||i===Da||i===La||i===Xr||i===Ia)if(a=t.get("WEBGL_compressed_texture_etc"),a!==null){if(i===Ra||i===wa)return o===mt?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(i===Ca)return o===mt?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC;if(i===Da)return a.COMPRESSED_R11_EAC;if(i===La)return a.COMPRESSED_SIGNED_R11_EAC;if(i===Xr)return a.COMPRESSED_RG11_EAC;if(i===Ia)return a.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===Na||i===Ua||i===Fa||i===Oa||i===Ba||i===Ga||i===Ha||i===Va||i===za||i===ka||i===Wa||i===Xa||i===Ya||i===Ka)if(a=t.get("WEBGL_compressed_texture_astc"),a!==null){if(i===Na)return o===mt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Ua)return o===mt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Fa)return o===mt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Oa)return o===mt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Ba)return o===mt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Ga)return o===mt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Ha)return o===mt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Va)return o===mt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===za)return o===mt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===ka)return o===mt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Wa)return o===mt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Xa)return o===mt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Ya)return o===mt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Ka)return o===mt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===qa||i===$a||i===ja)if(a=t.get("EXT_texture_compression_bptc"),a!==null){if(i===qa)return o===mt?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===$a)return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===ja)return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Za||i===Qa||i===Yr||i===Ja)if(a=t.get("EXT_texture_compression_rgtc"),a!==null){if(i===Za)return a.COMPRESSED_RED_RGTC1_EXT;if(i===Qa)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Yr)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Ja)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===yi?e.UNSIGNED_INT_24_8:e[i]!==void 0?e[i]:null}return{convert:n}}const Lm=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Im=`
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

}`;class Nm{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,n){if(this.texture===null){const i=new Is(t.texture);(t.depthNear!==n.depthNear||t.depthFar!==n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=i}}getMesh(t){if(this.texture!==null&&this.mesh===null){const n=t.cameras[0].viewport,i=new Qt({vertexShader:Lm,fragmentShader:Im,uniforms:{depthColor:{value:this.texture},depthWidth:{value:n.z},depthHeight:{value:n.w}}});this.mesh=new Bt(new cr(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Um extends Yc{constructor(t,n){super();const i=this;let r=null,a=1,o=null,s="local-floor",h=1,f=null,g=null,p=null,l=null,_=null,x=null;const P=typeof XRWebGLBinding<"u",c=new Nm,u={},y=n.getContextAttributes();let R=null,S=null;const T=[],b=[],w=new We;let m=null;const A=new Si;A.viewport=new Pt;const O=new Si;O.viewport=new Pt;const L=[A,O],V=new Kc;let ae=null,Q=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(j){let N=T[j];return N===void 0&&(N=new gr,T[j]=N),N.getTargetRaySpace()},this.getControllerGrip=function(j){let N=T[j];return N===void 0&&(N=new gr,T[j]=N),N.getGripSpace()},this.getHand=function(j){let N=T[j];return N===void 0&&(N=new gr,T[j]=N),N.getHandSpace()};function X(j){const N=b.indexOf(j.inputSource);if(N===-1)return;const z=T[N];z!==void 0&&(z.update(j.inputSource,j.frame,f||o),z.dispatchEvent({type:j.type,data:j.inputSource}))}function Y(){r.removeEventListener("select",X),r.removeEventListener("selectstart",X),r.removeEventListener("selectend",X),r.removeEventListener("squeeze",X),r.removeEventListener("squeezestart",X),r.removeEventListener("squeezeend",X),r.removeEventListener("end",Y),r.removeEventListener("inputsourceschange",W);for(let j=0;j<T.length;j++){const N=b[j];N!==null&&(b[j]=null,T[j].disconnect(N))}ae=null,Q=null,c.reset();for(const j in u)delete u[j];t.setRenderTarget(R),_=null,l=null,p=null,r=null,S=null,Ye.stop(),i.isPresenting=!1,t.setPixelRatio(m),t.setSize(w.width,w.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(j){a=j,i.isPresenting===!0&&at("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(j){s=j,i.isPresenting===!0&&at("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return f||o},this.setReferenceSpace=function(j){f=j},this.getBaseLayer=function(){return l!==null?l:_},this.getBinding=function(){return p===null&&P&&(p=new XRWebGLBinding(r,n)),p},this.getFrame=function(){return x},this.getSession=function(){return r},this.setSession=async function(j){if(r=j,r!==null){if(R=t.getRenderTarget(),r.addEventListener("select",X),r.addEventListener("selectstart",X),r.addEventListener("selectend",X),r.addEventListener("squeeze",X),r.addEventListener("squeezestart",X),r.addEventListener("squeezeend",X),r.addEventListener("end",Y),r.addEventListener("inputsourceschange",W),y.xrCompatible!==!0&&await n.makeXRCompatible(),m=t.getPixelRatio(),t.getSize(w),P&&"createProjectionLayer"in XRWebGLBinding.prototype){let z=null,ce=null,le=null;y.depth&&(le=y.stencil?n.DEPTH24_STENCIL8:n.DEPTH_COMPONENT24,z=y.stencil?Yn:Zn,ce=y.stencil?yi:On);const de={colorFormat:n.RGBA8,depthFormat:le,scaleFactor:a};p=this.getBinding(),l=p.createProjectionLayer(de),r.updateRenderState({layers:[l]}),t.setPixelRatio(1),t.setSize(l.textureWidth,l.textureHeight,!1),S=new dn(l.textureWidth,l.textureHeight,{format:_n,type:an,depthTexture:new Ti(l.textureWidth,l.textureHeight,ce,void 0,void 0,void 0,void 0,void 0,void 0,z),stencilBuffer:y.stencil,colorSpace:t.outputColorSpace,samples:y.antialias?4:0,resolveDepthBuffer:l.ignoreDepthValues===!1,resolveStencilBuffer:l.ignoreDepthValues===!1})}else{const z={antialias:y.antialias,alpha:!0,depth:y.depth,stencil:y.stencil,framebufferScaleFactor:a};_=new XRWebGLLayer(r,n,z),r.updateRenderState({baseLayer:_}),t.setPixelRatio(1),t.setSize(_.framebufferWidth,_.framebufferHeight,!1),S=new dn(_.framebufferWidth,_.framebufferHeight,{format:_n,type:an,colorSpace:t.outputColorSpace,stencilBuffer:y.stencil,resolveDepthBuffer:_.ignoreDepthValues===!1,resolveStencilBuffer:_.ignoreDepthValues===!1})}S.isXRRenderTarget=!0,this.setFoveation(h),f=null,o=await r.requestReferenceSpace(s),Ye.setContext(r),Ye.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return c.getDepthTexture()};function W(j){for(let N=0;N<j.removed.length;N++){const z=j.removed[N],ce=b.indexOf(z);ce>=0&&(b[ce]=null,T[ce].disconnect(z))}for(let N=0;N<j.added.length;N++){const z=j.added[N];let ce=b.indexOf(z);if(ce===-1){for(let de=0;de<T.length;de++)if(de>=b.length){b.push(z),ce=de;break}else if(b[de]===null){b[de]=z,ce=de;break}if(ce===-1)break}const le=T[ce];le&&le.connect(z)}}const ee=new ne,ue=new ne;function Re(j,N,z){ee.setFromMatrixPosition(N.matrixWorld),ue.setFromMatrixPosition(z.matrixWorld);const ce=ee.distanceTo(ue),le=N.projectionMatrix.elements,de=z.projectionMatrix.elements,K=le[14]/(le[10]-1),re=le[14]/(le[10]+1),me=(le[9]+1)/le[5],Pe=(le[9]-1)/le[5],be=(le[8]-1)/le[0],Ve=(de[8]+1)/de[0],Je=K*be,et=K*Ve,ft=ce/(-be+Ve),qe=ft*-be;if(N.matrixWorld.decompose(j.position,j.quaternion,j.scale),j.translateX(qe),j.translateZ(ft),j.matrixWorld.compose(j.position,j.quaternion,j.scale),j.matrixWorldInverse.copy(j.matrixWorld).invert(),le[10]===-1)j.projectionMatrix.copy(N.projectionMatrix),j.projectionMatrixInverse.copy(N.projectionMatrixInverse);else{const lt=K+ft,D=re+ft,ot=Je-qe,Ge=et+(ce-qe),E=me*re/D*lt,d=Pe*re/D*lt;j.projectionMatrix.makePerspective(ot,Ge,E,d,lt,D),j.projectionMatrixInverse.copy(j.projectionMatrix).invert()}}function ge(j,N){N===null?j.matrixWorld.copy(j.matrix):j.matrixWorld.multiplyMatrices(N.matrixWorld,j.matrix),j.matrixWorldInverse.copy(j.matrixWorld).invert()}this.updateCamera=function(j){if(r===null)return;let N=j.near,z=j.far;c.texture!==null&&(c.depthNear>0&&(N=c.depthNear),c.depthFar>0&&(z=c.depthFar)),V.near=O.near=A.near=N,V.far=O.far=A.far=z,(ae!==V.near||Q!==V.far)&&(r.updateRenderState({depthNear:V.near,depthFar:V.far}),ae=V.near,Q=V.far),V.layers.mask=j.layers.mask|6,A.layers.mask=V.layers.mask&-5,O.layers.mask=V.layers.mask&-3;const ce=j.parent,le=V.cameras;ge(V,ce);for(let de=0;de<le.length;de++)ge(le[de],ce);le.length===2?Re(V,A,O):V.projectionMatrix.copy(A.projectionMatrix),Me(j,V,ce)};function Me(j,N,z){z===null?j.matrix.copy(N.matrixWorld):(j.matrix.copy(z.matrixWorld),j.matrix.invert(),j.matrix.multiply(N.matrixWorld)),j.matrix.decompose(j.position,j.quaternion,j.scale),j.updateMatrixWorld(!0),j.projectionMatrix.copy(N.projectionMatrix),j.projectionMatrixInverse.copy(N.projectionMatrixInverse),j.isPerspectiveCamera&&(j.fov=qc*2*Math.atan(1/j.projectionMatrix.elements[5]),j.zoom=1)}this.getCamera=function(){return V},this.getFoveation=function(){if(!(l===null&&_===null))return h},this.setFoveation=function(j){h=j,l!==null&&(l.fixedFoveation=j),_!==null&&_.fixedFoveation!==void 0&&(_.fixedFoveation=j)},this.hasDepthSensing=function(){return c.texture!==null},this.getDepthSensingMesh=function(){return c.getMesh(V)},this.getCameraTexture=function(j){return u[j]};let Xe=null;function it(j,N){if(g=N.getViewerPose(f||o),x=N,g!==null){const z=g.views;_!==null&&(t.setRenderTargetFramebuffer(S,_.framebuffer),t.setRenderTarget(S));let ce=!1;z.length!==V.cameras.length&&(V.cameras.length=0,ce=!0);for(let re=0;re<z.length;re++){const me=z[re];let Pe=null;if(_!==null)Pe=_.getViewport(me);else{const Ve=p.getViewSubImage(l,me);Pe=Ve.viewport,re===0&&(t.setRenderTargetTextures(S,Ve.colorTexture,Ve.depthStencilTexture),t.setRenderTarget(S))}let be=L[re];be===void 0&&(be=new Si,be.layers.enable(re),be.viewport=new Pt,L[re]=be),be.matrix.fromArray(me.transform.matrix),be.matrix.decompose(be.position,be.quaternion,be.scale),be.projectionMatrix.fromArray(me.projectionMatrix),be.projectionMatrixInverse.copy(be.projectionMatrix).invert(),be.viewport.set(Pe.x,Pe.y,Pe.width,Pe.height),re===0&&(V.matrix.copy(be.matrix),V.matrix.decompose(V.position,V.quaternion,V.scale)),ce===!0&&V.cameras.push(be)}const le=r.enabledFeatures;if(le&&le.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&P){p=i.getBinding();const re=p.getDepthInformation(z[0]);re&&re.isValid&&re.texture&&c.init(re,r.renderState)}if(le&&le.includes("camera-access")&&P){t.state.unbindTexture(),p=i.getBinding();for(let re=0;re<z.length;re++){const me=z[re].camera;if(me){let Pe=u[me];Pe||(Pe=new Is,u[me]=Pe);const be=p.getCameraImage(me);Pe.sourceTexture=be}}}}for(let z=0;z<T.length;z++){const ce=b[z],le=T[z];ce!==null&&le!==void 0&&le.update(ce,N,f||o)}Xe&&Xe(j,N),N.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:N}),x=null}const Ye=new nc;Ye.setAnimationLoop(it),this.setAnimationLoop=function(j){Xe=j},this.dispose=function(){}}}const Fm=new An,lc=new nt;lc.set(-1,0,0,0,1,0,0,0,1);function Om(e,t){function n(c,u){c.matrixAutoUpdate===!0&&c.updateMatrix(),u.value.copy(c.matrix)}function i(c,u){u.color.getRGB(c.fogColor.value,Fs(e)),u.isFog?(c.fogNear.value=u.near,c.fogFar.value=u.far):u.isFogExp2&&(c.fogDensity.value=u.density)}function r(c,u,y,R,S){u.isNodeMaterial?u.uniformsNeedUpdate=!1:u.isMeshBasicMaterial?a(c,u):u.isMeshLambertMaterial?(a(c,u),u.envMap&&(c.envMapIntensity.value=u.envMapIntensity)):u.isMeshToonMaterial?(a(c,u),p(c,u)):u.isMeshPhongMaterial?(a(c,u),g(c,u),u.envMap&&(c.envMapIntensity.value=u.envMapIntensity)):u.isMeshStandardMaterial?(a(c,u),l(c,u),u.isMeshPhysicalMaterial&&_(c,u,S)):u.isMeshMatcapMaterial?(a(c,u),x(c,u)):u.isMeshDepthMaterial?a(c,u):u.isMeshDistanceMaterial?(a(c,u),P(c,u)):u.isMeshNormalMaterial?a(c,u):u.isLineBasicMaterial?(o(c,u),u.isLineDashedMaterial&&s(c,u)):u.isPointsMaterial?h(c,u,y,R):u.isSpriteMaterial?f(c,u):u.isShadowMaterial?(c.color.value.copy(u.color),c.opacity.value=u.opacity):u.isShaderMaterial&&(u.uniformsNeedUpdate=!1)}function a(c,u){c.opacity.value=u.opacity,u.color&&c.diffuse.value.copy(u.color),u.emissive&&c.emissive.value.copy(u.emissive).multiplyScalar(u.emissiveIntensity),u.map&&(c.map.value=u.map,n(u.map,c.mapTransform)),u.alphaMap&&(c.alphaMap.value=u.alphaMap,n(u.alphaMap,c.alphaMapTransform)),u.bumpMap&&(c.bumpMap.value=u.bumpMap,n(u.bumpMap,c.bumpMapTransform),c.bumpScale.value=u.bumpScale,u.side===Kt&&(c.bumpScale.value*=-1)),u.normalMap&&(c.normalMap.value=u.normalMap,n(u.normalMap,c.normalMapTransform),c.normalScale.value.copy(u.normalScale),u.side===Kt&&c.normalScale.value.negate()),u.displacementMap&&(c.displacementMap.value=u.displacementMap,n(u.displacementMap,c.displacementMapTransform),c.displacementScale.value=u.displacementScale,c.displacementBias.value=u.displacementBias),u.emissiveMap&&(c.emissiveMap.value=u.emissiveMap,n(u.emissiveMap,c.emissiveMapTransform)),u.specularMap&&(c.specularMap.value=u.specularMap,n(u.specularMap,c.specularMapTransform)),u.alphaTest>0&&(c.alphaTest.value=u.alphaTest);const y=t.get(u),R=y.envMap,S=y.envMapRotation;R&&(c.envMap.value=R,c.envMapRotation.value.setFromMatrix4(Fm.makeRotationFromEuler(S)).transpose(),R.isCubeTexture&&R.isRenderTargetTexture===!1&&c.envMapRotation.value.premultiply(lc),c.reflectivity.value=u.reflectivity,c.ior.value=u.ior,c.refractionRatio.value=u.refractionRatio),u.lightMap&&(c.lightMap.value=u.lightMap,c.lightMapIntensity.value=u.lightMapIntensity,n(u.lightMap,c.lightMapTransform)),u.aoMap&&(c.aoMap.value=u.aoMap,c.aoMapIntensity.value=u.aoMapIntensity,n(u.aoMap,c.aoMapTransform))}function o(c,u){c.diffuse.value.copy(u.color),c.opacity.value=u.opacity,u.map&&(c.map.value=u.map,n(u.map,c.mapTransform))}function s(c,u){c.dashSize.value=u.dashSize,c.totalSize.value=u.dashSize+u.gapSize,c.scale.value=u.scale}function h(c,u,y,R){c.diffuse.value.copy(u.color),c.opacity.value=u.opacity,c.size.value=u.size*y,c.scale.value=R*.5,u.map&&(c.map.value=u.map,n(u.map,c.uvTransform)),u.alphaMap&&(c.alphaMap.value=u.alphaMap,n(u.alphaMap,c.alphaMapTransform)),u.alphaTest>0&&(c.alphaTest.value=u.alphaTest)}function f(c,u){c.diffuse.value.copy(u.color),c.opacity.value=u.opacity,c.rotation.value=u.rotation,u.map&&(c.map.value=u.map,n(u.map,c.mapTransform)),u.alphaMap&&(c.alphaMap.value=u.alphaMap,n(u.alphaMap,c.alphaMapTransform)),u.alphaTest>0&&(c.alphaTest.value=u.alphaTest)}function g(c,u){c.specular.value.copy(u.specular),c.shininess.value=Math.max(u.shininess,1e-4)}function p(c,u){u.gradientMap&&(c.gradientMap.value=u.gradientMap)}function l(c,u){c.metalness.value=u.metalness,u.metalnessMap&&(c.metalnessMap.value=u.metalnessMap,n(u.metalnessMap,c.metalnessMapTransform)),c.roughness.value=u.roughness,u.roughnessMap&&(c.roughnessMap.value=u.roughnessMap,n(u.roughnessMap,c.roughnessMapTransform)),u.envMap&&(c.envMapIntensity.value=u.envMapIntensity)}function _(c,u,y){c.ior.value=u.ior,u.sheen>0&&(c.sheenColor.value.copy(u.sheenColor).multiplyScalar(u.sheen),c.sheenRoughness.value=u.sheenRoughness,u.sheenColorMap&&(c.sheenColorMap.value=u.sheenColorMap,n(u.sheenColorMap,c.sheenColorMapTransform)),u.sheenRoughnessMap&&(c.sheenRoughnessMap.value=u.sheenRoughnessMap,n(u.sheenRoughnessMap,c.sheenRoughnessMapTransform))),u.clearcoat>0&&(c.clearcoat.value=u.clearcoat,c.clearcoatRoughness.value=u.clearcoatRoughness,u.clearcoatMap&&(c.clearcoatMap.value=u.clearcoatMap,n(u.clearcoatMap,c.clearcoatMapTransform)),u.clearcoatRoughnessMap&&(c.clearcoatRoughnessMap.value=u.clearcoatRoughnessMap,n(u.clearcoatRoughnessMap,c.clearcoatRoughnessMapTransform)),u.clearcoatNormalMap&&(c.clearcoatNormalMap.value=u.clearcoatNormalMap,n(u.clearcoatNormalMap,c.clearcoatNormalMapTransform),c.clearcoatNormalScale.value.copy(u.clearcoatNormalScale),u.side===Kt&&c.clearcoatNormalScale.value.negate())),u.dispersion>0&&(c.dispersion.value=u.dispersion),u.iridescence>0&&(c.iridescence.value=u.iridescence,c.iridescenceIOR.value=u.iridescenceIOR,c.iridescenceThicknessMinimum.value=u.iridescenceThicknessRange[0],c.iridescenceThicknessMaximum.value=u.iridescenceThicknessRange[1],u.iridescenceMap&&(c.iridescenceMap.value=u.iridescenceMap,n(u.iridescenceMap,c.iridescenceMapTransform)),u.iridescenceThicknessMap&&(c.iridescenceThicknessMap.value=u.iridescenceThicknessMap,n(u.iridescenceThicknessMap,c.iridescenceThicknessMapTransform))),u.transmission>0&&(c.transmission.value=u.transmission,c.transmissionSamplerMap.value=y.texture,c.transmissionSamplerSize.value.set(y.width,y.height),u.transmissionMap&&(c.transmissionMap.value=u.transmissionMap,n(u.transmissionMap,c.transmissionMapTransform)),c.thickness.value=u.thickness,u.thicknessMap&&(c.thicknessMap.value=u.thicknessMap,n(u.thicknessMap,c.thicknessMapTransform)),c.attenuationDistance.value=u.attenuationDistance,c.attenuationColor.value.copy(u.attenuationColor)),u.anisotropy>0&&(c.anisotropyVector.value.set(u.anisotropy*Math.cos(u.anisotropyRotation),u.anisotropy*Math.sin(u.anisotropyRotation)),u.anisotropyMap&&(c.anisotropyMap.value=u.anisotropyMap,n(u.anisotropyMap,c.anisotropyMapTransform))),c.specularIntensity.value=u.specularIntensity,c.specularColor.value.copy(u.specularColor),u.specularColorMap&&(c.specularColorMap.value=u.specularColorMap,n(u.specularColorMap,c.specularColorMapTransform)),u.specularIntensityMap&&(c.specularIntensityMap.value=u.specularIntensityMap,n(u.specularIntensityMap,c.specularIntensityMapTransform))}function x(c,u){u.matcap&&(c.matcap.value=u.matcap)}function P(c,u){const y=t.get(u).light;c.referencePosition.value.setFromMatrixPosition(y.matrixWorld),c.nearDistance.value=y.shadow.camera.near,c.farDistance.value=y.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function Bm(e,t,n,i){let r={},a={},o=[];const s=e.getParameter(e.MAX_UNIFORM_BUFFER_BINDINGS);function h(S,T){const b=T.program;i.uniformBlockBinding(S,b)}function f(S,T){let b=r[S.id];b===void 0&&(c(S),b=g(S),r[S.id]=b,S.addEventListener("dispose",y));const w=T.program;i.updateUBOMapping(S,w);const m=t.render.frame;a[S.id]!==m&&(l(S),a[S.id]=m)}function g(S){const T=p();S.__bindingPointIndex=T;const b=e.createBuffer(),w=S.__size,m=S.usage;return e.bindBuffer(e.UNIFORM_BUFFER,b),e.bufferData(e.UNIFORM_BUFFER,w,m),e.bindBuffer(e.UNIFORM_BUFFER,null),e.bindBufferBase(e.UNIFORM_BUFFER,T,b),b}function p(){for(let S=0;S<s;S++)if(o.indexOf(S)===-1)return o.push(S),S;return gt("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function l(S){const T=r[S.id],b=S.uniforms,w=S.__cache;e.bindBuffer(e.UNIFORM_BUFFER,T);for(let m=0,A=b.length;m<A;m++){const O=b[m];if(Array.isArray(O))for(let L=0,V=O.length;L<V;L++)_(O[L],m,L,w);else _(O,m,0,w)}e.bindBuffer(e.UNIFORM_BUFFER,null)}function _(S,T,b,w){if(P(S,T,b,w)===!0){const m=S.__offset,A=S.value;if(Array.isArray(A)){let O=0;for(let L=0;L<A.length;L++){const V=A[L],ae=u(V);x(V,S.__data,O),typeof V!="number"&&typeof V!="boolean"&&!V.isMatrix3&&!ArrayBuffer.isView(V)&&(O+=ae.storage/Float32Array.BYTES_PER_ELEMENT)}}else x(A,S.__data,0);e.bufferSubData(e.UNIFORM_BUFFER,m,S.__data)}}function x(S,T,b){typeof S=="number"||typeof S=="boolean"?T[0]=S:S.isMatrix3?(T[0]=S.elements[0],T[1]=S.elements[1],T[2]=S.elements[2],T[3]=0,T[4]=S.elements[3],T[5]=S.elements[4],T[6]=S.elements[5],T[7]=0,T[8]=S.elements[6],T[9]=S.elements[7],T[10]=S.elements[8],T[11]=0):ArrayBuffer.isView(S)?T.set(new S.constructor(S.buffer,S.byteOffset,T.length)):S.toArray(T,b)}function P(S,T,b,w){const m=S.value,A=T+"_"+b;if(w[A]===void 0)return typeof m=="number"||typeof m=="boolean"?w[A]=m:ArrayBuffer.isView(m)?w[A]=m.slice():w[A]=m.clone(),!0;{const O=w[A];if(typeof m=="number"||typeof m=="boolean"){if(O!==m)return w[A]=m,!0}else{if(ArrayBuffer.isView(m))return!0;if(O.equals(m)===!1)return O.copy(m),!0}}return!1}function c(S){const T=S.uniforms;let b=0;const w=16;for(let A=0,O=T.length;A<O;A++){const L=Array.isArray(T[A])?T[A]:[T[A]];for(let V=0,ae=L.length;V<ae;V++){const Q=L[V],X=Array.isArray(Q.value)?Q.value:[Q.value];for(let Y=0,W=X.length;Y<W;Y++){const ee=X[Y],ue=u(ee),Re=b%w,ge=Re%ue.boundary,Me=Re+ge;b+=ge,Me!==0&&w-Me<ue.storage&&(b+=w-Me),Q.__data=new Float32Array(ue.storage/Float32Array.BYTES_PER_ELEMENT),Q.__offset=b,b+=ue.storage}}}const m=b%w;return m>0&&(b+=w-m),S.__size=b,S.__cache={},this}function u(S){const T={boundary:0,storage:0};return typeof S=="number"||typeof S=="boolean"?(T.boundary=4,T.storage=4):S.isVector2?(T.boundary=8,T.storage=8):S.isVector3||S.isColor?(T.boundary=16,T.storage=12):S.isVector4?(T.boundary=16,T.storage=16):S.isMatrix3?(T.boundary=48,T.storage=48):S.isMatrix4?(T.boundary=64,T.storage=64):S.isTexture?at("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(S)?(T.boundary=16,T.storage=S.byteLength):at("WebGLRenderer: Unsupported uniform value type.",S),T}function y(S){const T=S.target;T.removeEventListener("dispose",y);const b=o.indexOf(T.__bindingPointIndex);o.splice(b,1),e.deleteBuffer(r[T.id]),delete r[T.id],delete a[T.id]}function R(){for(const S in r)e.deleteBuffer(r[S]);o=[],r={},a={}}return{bind:h,update:f,dispose:R}}const Gm=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let tn=null;function Hm(){return tn===null&&(tn=new $c(Gm,16,16,Qn,yn),tn.name="DFG_LUT",tn.minFilter=Yt,tn.magFilter=Yt,tn.wrapS=Wr,tn.wrapT=Wr,tn.generateMipmaps=!1,tn.needsUpdate=!0),tn}class Vm{constructor(t={}){const{canvas:n=zc(),context:i=null,depth:r=!0,stencil:a=!1,alpha:o=!1,antialias:s=!1,premultipliedAlpha:h=!0,preserveDrawingBuffer:f=!1,powerPreference:g="default",failIfMajorPerformanceCaveat:p=!1,reversedDepthBuffer:l=!1,outputBufferType:_=an}=t;this.isWebGLRenderer=!0;let x;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");x=i.getContextAttributes().alpha}else x=o;const P=_,c=new Set([Rs,ws,Cs]),u=new Set([an,On,ir,yi,Ds,Ls]),y=new Uint32Array(4),R=new Int32Array(4),S=new ne;let T=null,b=null;const w=[],m=[];let A=null;this.domElement=n,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=un,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const O=this;let L=!1,V=null,ae=null,Q=null,X=null;this._outputColorSpace=Ts;let Y=0,W=0,ee=null,ue=-1,Re=null;const ge=new Pt,Me=new Pt;let Xe=null;const it=new dt(0);let Ye=0,j=n.width,N=n.height,z=1,ce=null,le=null;const de=new Pt(0,0,j,N),K=new Pt(0,0,j,N);let re=!1;const me=new As;let Pe=!1,be=!1;const Ve=new An,Je=new ne,et=new Pt,ft={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let qe=!1;function lt(){return ee===null?z:1}let D=i;function ot(v,I){return n.getContext(v,I)}try{const v={alpha:!0,depth:r,stencil:a,antialias:s,premultipliedAlpha:h,preserveDrawingBuffer:f,powerPreference:g,failIfMajorPerformanceCaveat:p};if("setAttribute"in n&&n.setAttribute("data-engine",`three.js r${kc}`),n.addEventListener("webglcontextlost",xt,!1),n.addEventListener("webglcontextrestored",st,!1),n.addEventListener("webglcontextcreationerror",qt,!1),D===null){const I="webgl2";if(D=ot(I,v),D===null)throw ot(I)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}}catch(v){throw gt("WebGLRenderer: "+v.message),v}let Ge,E,d,U,G,$,oe,pe,q,J,he,Le,fe,Se,Be,He,ze,C,ve,Z,xe,Te,ie;function Ne(){Ge=new Hp(D),Ge.init(),xe=new Dm(D,Ge),E=new Lp(D,Ge,t,xe),d=new wm(D,Ge),E.reversedDepthBuffer&&l&&d.buffers.depth.setReversed(!0),ae=D.createFramebuffer(),Q=D.createFramebuffer(),X=D.createFramebuffer(),U=new kp(D),G=new mm,$=new Cm(D,Ge,d,G,E,xe,U),oe=new Gp(O),pe=new Yu(D),Te=new Cp(D,pe),q=new Vp(D,pe,U,Te),J=new Xp(D,q,pe,Te,U),C=new Wp(D,E,$),Be=new Ip(G),he=new hm(O,oe,Ge,E,Te,Be),Le=new Om(O,G),fe=new gm,Se=new bm(Ge),ze=new wp(O,oe,d,J,x,h),He=new Rm(O,J,E),ie=new Bm(D,U,E,d),ve=new Dp(D,Ge,U),Z=new zp(D,Ge,U),U.programs=he.programs,O.capabilities=E,O.extensions=Ge,O.properties=G,O.renderLists=fe,O.shadowMap=He,O.state=d,O.info=U}Ne(),P!==an&&(A=new Kp(P,n.width,n.height,s,r,a));const De=new Um(O,D);this.xr=De,this.getContext=function(){return D},this.getContextAttributes=function(){return D.getContextAttributes()},this.forceContextLoss=function(){const v=Ge.get("WEBGL_lose_context");v&&v.loseContext()},this.forceContextRestore=function(){const v=Ge.get("WEBGL_lose_context");v&&v.restoreContext()},this.getPixelRatio=function(){return z},this.setPixelRatio=function(v){v!==void 0&&(z=v,this.setSize(j,N,!1))},this.getSize=function(v){return v.set(j,N)},this.setSize=function(v,I,k=!0){if(De.isPresenting){at("WebGLRenderer: Can't change size while VR device is presenting.");return}j=v,N=I,n.width=Math.floor(v*z),n.height=Math.floor(I*z),k===!0&&(n.style.width=v+"px",n.style.height=I+"px"),A!==null&&A.setSize(n.width,n.height),this.setViewport(0,0,v,I)},this.getDrawingBufferSize=function(v){return v.set(j*z,N*z).floor()},this.setDrawingBufferSize=function(v,I,k){j=v,N=I,z=k,n.width=Math.floor(v*k),n.height=Math.floor(I*k),this.setViewport(0,0,v,I)},this.setEffects=function(v){if(P===an){gt("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(v){for(let I=0;I<v.length;I++)if(v[I].isOutputPass===!0){at("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}A.setEffects(v||[])},this.getCurrentViewport=function(v){return v.copy(ge)},this.getViewport=function(v){return v.copy(de)},this.setViewport=function(v,I,k,B){v.isVector4?de.set(v.x,v.y,v.z,v.w):de.set(v,I,k,B),d.viewport(ge.copy(de).multiplyScalar(z).round())},this.getScissor=function(v){return v.copy(K)},this.setScissor=function(v,I,k,B){v.isVector4?K.set(v.x,v.y,v.z,v.w):K.set(v,I,k,B),d.scissor(Me.copy(K).multiplyScalar(z).round())},this.getScissorTest=function(){return re},this.setScissorTest=function(v){d.setScissorTest(re=v)},this.setOpaqueSort=function(v){ce=v},this.setTransparentSort=function(v){le=v},this.getClearColor=function(v){return v.copy(ze.getClearColor())},this.setClearColor=function(){ze.setClearColor(...arguments)},this.getClearAlpha=function(){return ze.getClearAlpha()},this.setClearAlpha=function(){ze.setClearAlpha(...arguments)},this.clear=function(v=!0,I=!0,k=!0){let B=0;if(v){let H=!1;if(ee!==null){const ye=ee.texture.format;H=c.has(ye)}if(H){const ye=ee.texture.type,Ce=u.has(ye),Ae=ze.getClearColor(),Ue=ze.getClearAlpha(),_e=Ae.r,Ke=Ae.g,$e=Ae.b;Ce?(y[0]=_e,y[1]=Ke,y[2]=$e,y[3]=Ue,D.clearBufferuiv(D.COLOR,0,y)):(R[0]=_e,R[1]=Ke,R[2]=$e,R[3]=Ue,D.clearBufferiv(D.COLOR,0,R))}else B|=D.COLOR_BUFFER_BIT}I&&(B|=D.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),k&&(B|=D.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),B!==0&&D.clear(B)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(v){v.setRenderer(this),V=v},this.dispose=function(){n.removeEventListener("webglcontextlost",xt,!1),n.removeEventListener("webglcontextrestored",st,!1),n.removeEventListener("webglcontextcreationerror",qt,!1),ze.dispose(),fe.dispose(),Se.dispose(),G.dispose(),oe.dispose(),J.dispose(),Te.dispose(),ie.dispose(),he.dispose(),De.dispose(),De.removeEventListener("sessionstart",Rn),De.removeEventListener("sessionend",Hi),Jt.stop()};function xt(v){v.preventDefault(),Ma("WebGLRenderer: Context Lost."),L=!0}function st(){Ma("WebGLRenderer: Context Restored."),L=!1;const v=U.autoReset,I=He.enabled,k=He.autoUpdate,B=He.needsUpdate,H=He.type;Ne(),U.autoReset=v,He.enabled=I,He.autoUpdate=k,He.needsUpdate=B,He.type=H}function qt(v){gt("WebGLRenderer: A WebGL context could not be created. Reason: ",v.statusMessage)}function kt(v){const I=v.target;I.removeEventListener("dispose",kt),Fi(I)}function Fi(v){Oi(v),G.remove(v)}function Oi(v){const I=G.get(v).programs;I!==void 0&&(I.forEach(function(k){he.releaseProgram(k)}),v.isShaderMaterial&&he.releaseShaderCache(v))}this.renderBufferDirect=function(v,I,k,B,H,ye){I===null&&(I=ft);const Ce=H.isMesh&&H.matrixWorld.determinantAffine()<0,Ae=Vi(v,I,k,B,H);d.setMaterial(B,Ce);let Ue=k.index,_e=1;if(B.wireframe===!0){if(Ue=q.getWireframeAttribute(k),Ue===void 0)return;_e=2}const Ke=k.drawRange,$e=k.attributes.position;let Fe=Ke.start*_e,rt=(Ke.start+Ke.count)*_e;ye!==null&&(Fe=Math.max(Fe,ye.start*_e),rt=Math.min(rt,(ye.start+ye.count)*_e)),Ue!==null?(Fe=Math.max(Fe,0),rt=Math.min(rt,Ue.count)):$e!=null&&(Fe=Math.max(Fe,0),rt=Math.min(rt,$e.count));const M=rt-Fe;if(M<0||M===1/0)return;Te.setup(H,B,Ae,k,Ue);let F,te=ve;if(Ue!==null&&(F=pe.get(Ue),te=Z,te.setIndex(F)),H.isMesh)B.wireframe===!0?(d.setLineWidth(B.wireframeLinewidth*lt()),te.setMode(D.LINES)):te.setMode(D.TRIANGLES);else if(H.isLine){let we=B.linewidth;we===void 0&&(we=1),d.setLineWidth(we*lt()),H.isLineSegments?te.setMode(D.LINES):H.isLineLoop?te.setMode(D.LINE_LOOP):te.setMode(D.LINE_STRIP)}else H.isPoints?te.setMode(D.POINTS):H.isSprite&&te.setMode(D.TRIANGLES);if(H.isBatchedMesh)if(Ge.get("WEBGL_multi_draw"))te.renderMultiDraw(H._multiDrawStarts,H._multiDrawCounts,H._multiDrawCount);else{const we=H._multiDrawStarts,se=H._multiDrawCounts,Oe=H._multiDrawCount,Ie=Ue?pe.get(Ue).bytesPerElement:1,ct=G.get(B).currentProgram.getUniforms();for(let Mt=0;Mt<Oe;Mt++)ct.setValue(D,"_gl_DrawID",Mt),te.render(we[Mt]/Ie,se[Mt])}else if(H.isInstancedMesh)te.renderInstances(Fe,M,H.count);else if(k.isInstancedBufferGeometry){const we=k._maxInstanceCount!==void 0?k._maxInstanceCount:1/0,se=Math.min(k.instanceCount,we);te.renderInstances(Fe,M,se)}else te.render(Fe,M)};function Bi(v,I,k){v.transparent===!0&&v.side===zt&&v.forceSinglePass===!1?(v.side=Kt,v.needsUpdate=!0,Cn(v,I,k),v.side=bi,v.needsUpdate=!0,Cn(v,I,k),v.side=zt):Cn(v,I,k)}this.compile=function(v,I,k=null){k===null&&(k=v),b=Se.get(k),b.init(I),m.push(b),k.traverseVisible(function(H){H.isLight&&H.layers.test(I.layers)&&(b.pushLight(H),H.castShadow&&b.pushShadow(H))}),v!==k&&v.traverseVisible(function(H){H.isLight&&H.layers.test(I.layers)&&(b.pushLight(H),H.castShadow&&b.pushShadow(H))}),b.setupLights();const B=new Set;return v.traverse(function(H){if(!(H.isMesh||H.isPoints||H.isLine||H.isSprite))return;const ye=H.material;if(ye)if(Array.isArray(ye))for(let Ce=0;Ce<ye.length;Ce++){const Ae=ye[Ce];Bi(Ae,k,H),B.add(Ae)}else Bi(ye,k,H),B.add(ye)}),b=m.pop(),B},this.compileAsync=function(v,I,k=null){const B=this.compile(v,I,k);return new Promise(H=>{function ye(){if(B.forEach(function(Ce){G.get(Ce).currentProgram.isReady()&&B.delete(Ce)}),B.size===0){H(v);return}setTimeout(ye,10)}Ge.get("KHR_parallel_shader_compile")!==null?ye():setTimeout(ye,10)})};let Bn=null;function Gi(v){Bn&&Bn(v)}function Rn(){Jt.stop()}function Hi(){Jt.start()}const Jt=new nc;Jt.setAnimationLoop(Gi),typeof self<"u"&&Jt.setContext(self),this.setAnimationLoop=function(v){Bn=v,De.setAnimationLoop(v),v===null?Jt.stop():Jt.start()},De.addEventListener("sessionstart",Rn),De.addEventListener("sessionend",Hi),this.render=function(v,I){if(I!==void 0&&I.isCamera!==!0){gt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(L===!0)return;V!==null&&V.renderStart(v,I);const k=De.enabled===!0&&De.isPresenting===!0,B=A!==null&&(ee===null||k)&&A.begin(O,ee);if(v.matrixWorldAutoUpdate===!0&&v.updateMatrixWorld(),I.parent===null&&I.matrixWorldAutoUpdate===!0&&I.updateMatrixWorld(),De.enabled===!0&&De.isPresenting===!0&&(A===null||A.isCompositing()===!1)&&(De.cameraAutoUpdate===!0&&De.updateCamera(I),I=De.getCamera()),v.isScene===!0&&v.onBeforeRender(O,v,I,ee),b=Se.get(v,m.length),b.init(I),b.state.textureUnits=$.getTextureUnits(),m.push(b),Ve.multiplyMatrices(I.projectionMatrix,I.matrixWorldInverse),me.setFromProjectionMatrix(Ve,ba,I.reversedDepth),be=this.localClippingEnabled,Pe=Be.init(this.clippingPlanes,be),T=fe.get(v,w.length),T.init(),w.push(T),De.enabled===!0&&De.isPresenting===!0){const Ce=O.xr.getDepthSensingMesh();Ce!==null&&ii(Ce,I,-1/0,O.sortObjects)}ii(v,I,0,O.sortObjects),T.finish(),O.sortObjects===!0&&T.sort(ce,le,I.reversedDepth),qe=De.enabled===!1||De.isPresenting===!1||De.hasDepthSensing()===!1,qe&&ze.addToRenderList(T,v),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),Pe===!0&&Be.beginShadows();const H=b.state.shadowsArray;if(He.render(H,v,I),Pe===!0&&Be.endShadows(),(B&&A.hasRenderPass())===!1){const Ce=T.opaque,Ae=T.transmissive;if(b.setupLights(),I.isArrayCamera){const Ue=I.cameras;if(Ae.length>0)for(let _e=0,Ke=Ue.length;_e<Ke;_e++){const $e=Ue[_e];ai(Ce,Ae,v,$e)}qe&&ze.render(v);for(let _e=0,Ke=Ue.length;_e<Ke;_e++){const $e=Ue[_e];ri(T,v,$e,$e.viewport)}}else Ae.length>0&&ai(Ce,Ae,v,I),qe&&ze.render(v),ri(T,v,I)}ee!==null&&W===0&&($.updateMultisampleRenderTarget(ee),$.updateRenderTargetMipmap(ee)),B&&A.end(O),v.isScene===!0&&v.onAfterRender(O,v,I),Te.resetDefaultState(),ue=-1,Re=null,m.pop(),m.length>0?(b=m[m.length-1],$.setTextureUnits(b.state.textureUnits),Pe===!0&&Be.setGlobalState(O.clippingPlanes,b.state.camera)):b=null,w.pop(),w.length>0?T=w[w.length-1]:T=null,V!==null&&V.renderEnd()};function ii(v,I,k,B){if(v.visible===!1)return;if(v.layers.test(I.layers)){if(v.isGroup)k=v.renderOrder;else if(v.isLOD)v.autoUpdate===!0&&v.update(I);else if(v.isLightProbeGrid)b.pushLightProbeGrid(v);else if(v.isLight)b.pushLight(v),v.castShadow&&b.pushShadow(v);else if(v.isSprite){if(!v.frustumCulled||me.intersectsSprite(v)){B&&et.setFromMatrixPosition(v.matrixWorld).applyMatrix4(Ve);const Ce=J.update(v),Ae=v.material;Ae.visible&&T.push(v,Ce,Ae,k,et.z,null)}}else if((v.isMesh||v.isLine||v.isPoints)&&(!v.frustumCulled||me.intersectsObject(v))){const Ce=J.update(v),Ae=v.material;if(B&&(v.boundingSphere!==void 0?(v.boundingSphere===null&&v.computeBoundingSphere(),et.copy(v.boundingSphere.center)):(Ce.boundingSphere===null&&Ce.computeBoundingSphere(),et.copy(Ce.boundingSphere.center)),et.applyMatrix4(v.matrixWorld).applyMatrix4(Ve)),Array.isArray(Ae)){const Ue=Ce.groups;for(let _e=0,Ke=Ue.length;_e<Ke;_e++){const $e=Ue[_e],Fe=Ae[$e.materialIndex];Fe&&Fe.visible&&T.push(v,Ce,Fe,k,et.z,$e)}}else Ae.visible&&T.push(v,Ce,Ae,k,et.z,null)}}const ye=v.children;for(let Ce=0,Ae=ye.length;Ce<Ae;Ce++)ii(ye[Ce],I,k,B)}function ri(v,I,k,B){const{opaque:H,transmissive:ye,transparent:Ce}=v;b.setupLightsView(k),Pe===!0&&Be.setGlobalState(O.clippingPlanes,k),B&&d.viewport(ge.copy(B)),H.length>0&&wn(H,I,k),ye.length>0&&wn(ye,I,k),Ce.length>0&&wn(Ce,I,k),d.buffers.depth.setTest(!0),d.buffers.depth.setMask(!0),d.buffers.color.setMask(!0),d.setPolygonOffset(!1)}function ai(v,I,k,B){if((k.isScene===!0?k.overrideMaterial:null)!==null)return;if(b.state.transmissionRenderTarget[B.id]===void 0){const Fe=Ge.has("EXT_color_buffer_half_float")||Ge.has("EXT_color_buffer_float");b.state.transmissionRenderTarget[B.id]=new dn(1,1,{generateMipmaps:!0,type:Fe?yn:an,minFilter:Xn,samples:Math.max(4,E.samples),stencilBuffer:a,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Et.workingColorSpace})}const ye=b.state.transmissionRenderTarget[B.id],Ce=B.viewport||ge;ye.setSize(Ce.z*O.transmissionResolutionScale,Ce.w*O.transmissionResolutionScale);const Ae=O.getRenderTarget(),Ue=O.getActiveCubeFace(),_e=O.getActiveMipmapLevel();O.setRenderTarget(ye),O.getClearColor(it),Ye=O.getClearAlpha(),Ye<1&&O.setClearColor(16777215,.5),O.clear(),qe&&ze.render(k);const Ke=O.toneMapping;O.toneMapping=un;const $e=B.viewport;if(B.viewport!==void 0&&(B.viewport=void 0),b.setupLightsView(B),Pe===!0&&Be.setGlobalState(O.clippingPlanes,B),wn(v,k,B),$.updateMultisampleRenderTarget(ye),$.updateRenderTargetMipmap(ye),Ge.has("WEBGL_multisampled_render_to_texture")===!1){let Fe=!1;for(let rt=0,M=I.length;rt<M;rt++){const F=I[rt],{object:te,geometry:we,material:se,group:Oe}=F;if(se.side===zt&&te.layers.test(B.layers)){const Ie=se.side;se.side=Kt,se.needsUpdate=!0,oi(te,k,B,we,se,Oe),se.side=Ie,se.needsUpdate=!0,Fe=!0}}Fe===!0&&($.updateMultisampleRenderTarget(ye),$.updateRenderTargetMipmap(ye))}O.setRenderTarget(Ae,Ue,_e),O.setClearColor(it,Ye),$e!==void 0&&(B.viewport=$e),O.toneMapping=Ke}function wn(v,I,k){const B=I.isScene===!0?I.overrideMaterial:null;for(let H=0,ye=v.length;H<ye;H++){const Ce=v[H],{object:Ae,geometry:Ue,group:_e}=Ce;let Ke=Ce.material;Ke.allowOverride===!0&&B!==null&&(Ke=B),Ae.layers.test(k.layers)&&oi(Ae,I,k,Ue,Ke,_e)}}function oi(v,I,k,B,H,ye){v.onBeforeRender(O,I,k,B,H,ye),v.modelViewMatrix.multiplyMatrices(k.matrixWorldInverse,v.matrixWorld),v.normalMatrix.getNormalMatrix(v.modelViewMatrix),H.onBeforeRender(O,I,k,B,v,ye),H.transparent===!0&&H.side===zt&&H.forceSinglePass===!1?(H.side=Kt,H.needsUpdate=!0,O.renderBufferDirect(k,I,B,H,v,ye),H.side=bi,H.needsUpdate=!0,O.renderBufferDirect(k,I,B,H,v,ye),H.side=zt):O.renderBufferDirect(k,I,B,H,v,ye),v.onAfterRender(O,I,k,B,H,ye)}function Cn(v,I,k){I.isScene!==!0&&(I=ft);const B=G.get(v),H=b.state.lights,ye=b.state.shadowsArray,Ce=H.state.version,Ae=he.getParameters(v,H.state,ye,I,k,b.state.lightProbeGridArray),Ue=he.getProgramCacheKey(Ae);let _e=B.programs;B.environment=v.isMeshStandardMaterial||v.isMeshLambertMaterial||v.isMeshPhongMaterial?I.environment:null,B.fog=I.fog;const Ke=v.isMeshStandardMaterial||v.isMeshLambertMaterial&&!v.envMap||v.isMeshPhongMaterial&&!v.envMap;B.envMap=oe.get(v.envMap||B.environment,Ke),B.envMapRotation=B.environment!==null&&v.envMap===null?I.environmentRotation:v.envMapRotation,_e===void 0&&(v.addEventListener("dispose",kt),_e=new Map,B.programs=_e);let $e=_e.get(Ue);if($e!==void 0){if(B.currentProgram===$e&&B.lightsStateVersion===Ce)return ci(v,Ae),$e}else Ae.uniforms=he.getUniforms(v),V!==null&&v.isNodeMaterial&&V.build(v,k,Ae),v.onBeforeCompile(Ae,O),$e=he.acquireProgram(Ae,Ue),_e.set(Ue,$e),B.uniforms=Ae.uniforms;const Fe=B.uniforms;return(!v.isShaderMaterial&&!v.isRawShaderMaterial||v.clipping===!0)&&(Fe.clippingPlanes=Be.uniform),ci(v,Ae),B.needsLights=_r(v),B.lightsStateVersion=Ce,B.needsLights&&(Fe.ambientLightColor.value=H.state.ambient,Fe.lightProbe.value=H.state.probe,Fe.directionalLights.value=H.state.directional,Fe.directionalLightShadows.value=H.state.directionalShadow,Fe.spotLights.value=H.state.spot,Fe.spotLightShadows.value=H.state.spotShadow,Fe.rectAreaLights.value=H.state.rectArea,Fe.ltc_1.value=H.state.rectAreaLTC1,Fe.ltc_2.value=H.state.rectAreaLTC2,Fe.pointLights.value=H.state.point,Fe.pointLightShadows.value=H.state.pointShadow,Fe.hemisphereLights.value=H.state.hemi,Fe.directionalShadowMatrix.value=H.state.directionalShadowMatrix,Fe.spotLightMatrix.value=H.state.spotLightMatrix,Fe.spotLightMap.value=H.state.spotLightMap,Fe.pointShadowMatrix.value=H.state.pointShadowMatrix),B.lightProbeGrid=b.state.lightProbeGridArray.length>0,B.currentProgram=$e,B.uniformsList=null,$e}function si(v){if(v.uniformsList===null){const I=v.currentProgram.getUniforms();v.uniformsList=er.seqWithValue(I.seq,v.uniforms)}return v.uniformsList}function ci(v,I){const k=G.get(v);k.outputColorSpace=I.outputColorSpace,k.batching=I.batching,k.batchingColor=I.batchingColor,k.instancing=I.instancing,k.instancingColor=I.instancingColor,k.instancingMorph=I.instancingMorph,k.skinning=I.skinning,k.morphTargets=I.morphTargets,k.morphNormals=I.morphNormals,k.morphColors=I.morphColors,k.morphTargetsCount=I.morphTargetsCount,k.numClippingPlanes=I.numClippingPlanes,k.numIntersection=I.numClipIntersection,k.vertexAlphas=I.vertexAlphas,k.vertexTangents=I.vertexTangents,k.toneMapping=I.toneMapping}function mr(v,I){if(v.length===0)return null;if(v.length===1)return v[0].texture!==null?v[0]:null;S.setFromMatrixPosition(I.matrixWorld);for(let k=0,B=v.length;k<B;k++){const H=v[k];if(H.texture!==null&&H.boundingBox.containsPoint(S))return H}return null}function Vi(v,I,k,B,H){I.isScene!==!0&&(I=ft),$.resetTextureUnits();const ye=I.fog,Ce=B.isMeshStandardMaterial||B.isMeshLambertMaterial||B.isMeshPhongMaterial?I.environment:null,Ae=ee===null?O.outputColorSpace:ee.isXRRenderTarget===!0?ee.texture.colorSpace:Et.workingColorSpace,Ue=B.isMeshStandardMaterial||B.isMeshLambertMaterial&&!B.envMap||B.isMeshPhongMaterial&&!B.envMap,_e=oe.get(B.envMap||Ce,Ue),Ke=B.vertexColors===!0&&!!k.attributes.color&&k.attributes.color.itemSize===4,$e=!!k.attributes.tangent&&(!!B.normalMap||B.anisotropy>0),Fe=!!k.morphAttributes.position,rt=!!k.morphAttributes.normal,M=!!k.morphAttributes.color;let F=un;B.toneMapped&&(ee===null||ee.isXRRenderTarget===!0)&&(F=O.toneMapping);const te=k.morphAttributes.position||k.morphAttributes.normal||k.morphAttributes.color,we=te!==void 0?te.length:0,se=G.get(B),Oe=b.state.lights;if(Pe===!0&&(be===!0||v!==Re)){const je=v===Re&&B.id===ue;Be.setState(B,v,je)}let Ie=!1;B.version===se.__version?(se.needsLights&&se.lightsStateVersion!==Oe.state.version||se.outputColorSpace!==Ae||H.isBatchedMesh&&se.batching===!1||!H.isBatchedMesh&&se.batching===!0||H.isBatchedMesh&&se.batchingColor===!0&&H.colorTexture===null||H.isBatchedMesh&&se.batchingColor===!1&&H.colorTexture!==null||H.isInstancedMesh&&se.instancing===!1||!H.isInstancedMesh&&se.instancing===!0||H.isSkinnedMesh&&se.skinning===!1||!H.isSkinnedMesh&&se.skinning===!0||H.isInstancedMesh&&se.instancingColor===!0&&H.instanceColor===null||H.isInstancedMesh&&se.instancingColor===!1&&H.instanceColor!==null||H.isInstancedMesh&&se.instancingMorph===!0&&H.morphTexture===null||H.isInstancedMesh&&se.instancingMorph===!1&&H.morphTexture!==null||se.envMap!==_e||B.fog===!0&&se.fog!==ye||se.numClippingPlanes!==void 0&&(se.numClippingPlanes!==Be.numPlanes||se.numIntersection!==Be.numIntersection)||se.vertexAlphas!==Ke||se.vertexTangents!==$e||se.morphTargets!==Fe||se.morphNormals!==rt||se.morphColors!==M||se.toneMapping!==F||se.morphTargetsCount!==we||!!se.lightProbeGrid!=b.state.lightProbeGridArray.length>0)&&(Ie=!0):(Ie=!0,se.__version=B.version);let ct=se.currentProgram;Ie===!0&&(ct=Cn(B,I,H),V&&B.isNodeMaterial&&V.onUpdateProgram(B,ct,se));let Mt=!1,St=!1,pt=!1;const tt=ct.getUniforms(),Qe=se.uniforms;if(d.useProgram(ct.program)&&(Mt=!0,St=!0,pt=!0),B.id!==ue&&(ue=B.id,St=!0),se.needsLights){const je=mr(b.state.lightProbeGridArray,H);se.lightProbeGrid!==je&&(se.lightProbeGrid=je,St=!0)}if(Mt||Re!==v){d.buffers.depth.getReversed()&&v.reversedDepth!==!0&&(v._reversedDepth=!0,v.updateProjectionMatrix()),tt.setValue(D,"projectionMatrix",v.projectionMatrix),tt.setValue(D,"viewMatrix",v.matrixWorldInverse);const Ct=tt.map.cameraPosition;Ct!==void 0&&Ct.setValue(D,Je.setFromMatrixPosition(v.matrixWorld)),E.logarithmicDepthBuffer&&tt.setValue(D,"logDepthBufFC",2/(Math.log(v.far+1)/Math.LN2)),(B.isMeshPhongMaterial||B.isMeshToonMaterial||B.isMeshLambertMaterial||B.isMeshBasicMaterial||B.isMeshStandardMaterial||B.isShaderMaterial)&&tt.setValue(D,"isOrthographic",v.isOrthographicCamera===!0),Re!==v&&(Re=v,St=!0,pt=!0)}if(se.needsLights&&(Oe.state.directionalShadowMap.length>0&&tt.setValue(D,"directionalShadowMap",Oe.state.directionalShadowMap,$),Oe.state.spotShadowMap.length>0&&tt.setValue(D,"spotShadowMap",Oe.state.spotShadowMap,$),Oe.state.pointShadowMap.length>0&&tt.setValue(D,"pointShadowMap",Oe.state.pointShadowMap,$)),H.isSkinnedMesh){tt.setOptional(D,H,"bindMatrix"),tt.setOptional(D,H,"bindMatrixInverse");const je=H.skeleton;je&&(je.boneTexture===null&&je.computeBoneTexture(),tt.setValue(D,"boneTexture",je.boneTexture,$))}H.isBatchedMesh&&(tt.setOptional(D,H,"batchingTexture"),tt.setValue(D,"batchingTexture",H._matricesTexture,$),tt.setOptional(D,H,"batchingIdTexture"),tt.setValue(D,"batchingIdTexture",H._indirectTexture,$),tt.setOptional(D,H,"batchingColorTexture"),H._colorsTexture!==null&&tt.setValue(D,"batchingColorTexture",H._colorsTexture,$));const ht=k.morphAttributes;if((ht.position!==void 0||ht.normal!==void 0||ht.color!==void 0)&&C.update(H,k,ct),(St||se.receiveShadow!==H.receiveShadow)&&(se.receiveShadow=H.receiveShadow,tt.setValue(D,"receiveShadow",H.receiveShadow)),(B.isMeshStandardMaterial||B.isMeshLambertMaterial||B.isMeshPhongMaterial)&&B.envMap===null&&I.environment!==null&&(Qe.envMapIntensity.value=I.environmentIntensity),Qe.dfgLUT!==void 0&&(Qe.dfgLUT.value=Hm()),St){if(tt.setValue(D,"toneMappingExposure",O.toneMappingExposure),se.needsLights&&Gn(Qe,pt),ye&&B.fog===!0&&Le.refreshFogUniforms(Qe,ye),Le.refreshMaterialUniforms(Qe,B,z,N,b.state.transmissionRenderTarget[v.id]),se.needsLights&&se.lightProbeGrid){const je=se.lightProbeGrid;Qe.probesSH.value=je.texture,Qe.probesMin.value.copy(je.boundingBox.min),Qe.probesMax.value.copy(je.boundingBox.max),Qe.probesResolution.value.copy(je.resolution)}er.upload(D,si(se),Qe,$)}if(B.isShaderMaterial&&B.uniformsNeedUpdate===!0&&(er.upload(D,si(se),Qe,$),B.uniformsNeedUpdate=!1),B.isSpriteMaterial&&tt.setValue(D,"center",H.center),tt.setValue(D,"modelViewMatrix",H.modelViewMatrix),tt.setValue(D,"normalMatrix",H.normalMatrix),tt.setValue(D,"modelMatrix",H.matrixWorld),B.uniformsGroups!==void 0){const je=B.uniformsGroups;for(let Ct=0,$t=je.length;Ct<$t;Ct++){const li=je[Ct];ie.update(li,ct),ie.bind(li,ct)}}return ct}function Gn(v,I){v.ambientLightColor.needsUpdate=I,v.lightProbe.needsUpdate=I,v.directionalLights.needsUpdate=I,v.directionalLightShadows.needsUpdate=I,v.pointLights.needsUpdate=I,v.pointLightShadows.needsUpdate=I,v.spotLights.needsUpdate=I,v.spotLightShadows.needsUpdate=I,v.rectAreaLights.needsUpdate=I,v.hemisphereLights.needsUpdate=I}function _r(v){return v.isMeshLambertMaterial||v.isMeshToonMaterial||v.isMeshPhongMaterial||v.isMeshStandardMaterial||v.isShadowMaterial||v.isShaderMaterial&&v.lights===!0}this.getActiveCubeFace=function(){return Y},this.getActiveMipmapLevel=function(){return W},this.getRenderTarget=function(){return ee},this.setRenderTargetTextures=function(v,I,k){const B=G.get(v);B.__autoAllocateDepthBuffer=v.resolveDepthBuffer===!1,B.__autoAllocateDepthBuffer===!1&&(B.__useRenderToTexture=!1),G.get(v.texture).__webglTexture=I,G.get(v.depthTexture).__webglTexture=B.__autoAllocateDepthBuffer?void 0:k,B.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(v,I){const k=G.get(v);k.__webglFramebuffer=I,k.__useDefaultFramebuffer=I===void 0},this.setRenderTarget=function(v,I=0,k=0){ee=v,Y=I,W=k;let B=null,H=!1,ye=!1;if(v){const Ae=G.get(v);if(Ae.__useDefaultFramebuffer!==void 0){d.bindFramebuffer(D.FRAMEBUFFER,Ae.__webglFramebuffer),ge.copy(v.viewport),Me.copy(v.scissor),Xe=v.scissorTest,d.viewport(ge),d.scissor(Me),d.setScissorTest(Xe),ue=-1;return}else if(Ae.__webglFramebuffer===void 0)$.setupRenderTarget(v);else if(Ae.__hasExternalTextures)$.rebindTextures(v,G.get(v.texture).__webglTexture,G.get(v.depthTexture).__webglTexture);else if(v.depthBuffer){const Ke=v.depthTexture;if(Ae.__boundDepthTexture!==Ke){if(Ke!==null&&G.has(Ke)&&(v.width!==Ke.image.width||v.height!==Ke.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");$.setupDepthRenderbuffer(v)}}const Ue=v.texture;(Ue.isData3DTexture||Ue.isDataArrayTexture||Ue.isCompressedArrayTexture)&&(ye=!0);const _e=G.get(v).__webglFramebuffer;v.isWebGLCubeRenderTarget?(Array.isArray(_e[I])?B=_e[I][k]:B=_e[I],H=!0):v.samples>0&&$.useMultisampledRTT(v)===!1?B=G.get(v).__webglMultisampledFramebuffer:Array.isArray(_e)?B=_e[k]:B=_e,ge.copy(v.viewport),Me.copy(v.scissor),Xe=v.scissorTest}else ge.copy(de).multiplyScalar(z).floor(),Me.copy(K).multiplyScalar(z).floor(),Xe=re;if(k!==0&&(B=ae),d.bindFramebuffer(D.FRAMEBUFFER,B)&&d.drawBuffers(v,B),d.viewport(ge),d.scissor(Me),d.setScissorTest(Xe),H){const Ae=G.get(v.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_CUBE_MAP_POSITIVE_X+I,Ae.__webglTexture,k)}else if(ye){const Ae=I;for(let Ue=0;Ue<v.textures.length;Ue++){const _e=G.get(v.textures[Ue]);D.framebufferTextureLayer(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0+Ue,_e.__webglTexture,k,Ae)}}else if(v!==null&&k!==0){const Ae=G.get(v.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,Ae.__webglTexture,k)}ue=-1},this.readRenderTargetPixels=function(v,I,k,B,H,ye,Ce,Ae=0){if(!(v&&v.isWebGLRenderTarget)){gt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ue=G.get(v).__webglFramebuffer;if(v.isWebGLCubeRenderTarget&&Ce!==void 0&&(Ue=Ue[Ce]),Ue){d.bindFramebuffer(D.FRAMEBUFFER,Ue);try{const _e=v.textures[Ae],Ke=_e.format,$e=_e.type;if(v.textures.length>1&&D.readBuffer(D.COLOR_ATTACHMENT0+Ae),!E.textureFormatReadable(Ke)){gt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!E.textureTypeReadable($e)){gt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}I>=0&&I<=v.width-B&&k>=0&&k<=v.height-H&&D.readPixels(I,k,B,H,xe.convert(Ke),xe.convert($e),ye)}finally{const _e=ee!==null?G.get(ee).__webglFramebuffer:null;d.bindFramebuffer(D.FRAMEBUFFER,_e)}}},this.readRenderTargetPixelsAsync=async function(v,I,k,B,H,ye,Ce,Ae=0){if(!(v&&v.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ue=G.get(v).__webglFramebuffer;if(v.isWebGLCubeRenderTarget&&Ce!==void 0&&(Ue=Ue[Ce]),Ue)if(I>=0&&I<=v.width-B&&k>=0&&k<=v.height-H){d.bindFramebuffer(D.FRAMEBUFFER,Ue);const _e=v.textures[Ae],Ke=_e.format,$e=_e.type;if(v.textures.length>1&&D.readBuffer(D.COLOR_ATTACHMENT0+Ae),!E.textureFormatReadable(Ke))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!E.textureTypeReadable($e))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Fe=D.createBuffer();D.bindBuffer(D.PIXEL_PACK_BUFFER,Fe),D.bufferData(D.PIXEL_PACK_BUFFER,ye.byteLength,D.STREAM_READ),D.readPixels(I,k,B,H,xe.convert(Ke),xe.convert($e),0);const rt=ee!==null?G.get(ee).__webglFramebuffer:null;d.bindFramebuffer(D.FRAMEBUFFER,rt);const M=D.fenceSync(D.SYNC_GPU_COMMANDS_COMPLETE,0);return D.flush(),await Wc(D,M,4),D.bindBuffer(D.PIXEL_PACK_BUFFER,Fe),D.getBufferSubData(D.PIXEL_PACK_BUFFER,0,ye),D.deleteBuffer(Fe),D.deleteSync(M),ye}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(v,I=null,k=0){const B=Math.pow(2,-k),H=Math.floor(v.image.width*B),ye=Math.floor(v.image.height*B),Ce=I!==null?I.x:0,Ae=I!==null?I.y:0;$.setTexture2D(v,0),D.copyTexSubImage2D(D.TEXTURE_2D,k,0,0,Ce,Ae,H,ye),d.unbindTexture()},this.copyTextureToTexture=function(v,I,k=null,B=null,H=0,ye=0){let Ce,Ae,Ue,_e,Ke,$e,Fe,rt,M;const F=v.isCompressedTexture?v.mipmaps[ye]:v.image;if(k!==null)Ce=k.max.x-k.min.x,Ae=k.max.y-k.min.y,Ue=k.isBox3?k.max.z-k.min.z:1,_e=k.min.x,Ke=k.min.y,$e=k.isBox3?k.min.z:0;else{const Qe=Math.pow(2,-H);Ce=Math.floor(F.width*Qe),Ae=Math.floor(F.height*Qe),v.isDataArrayTexture?Ue=F.depth:v.isData3DTexture?Ue=Math.floor(F.depth*Qe):Ue=1,_e=0,Ke=0,$e=0}B!==null?(Fe=B.x,rt=B.y,M=B.z):(Fe=0,rt=0,M=0);const te=xe.convert(I.format),we=xe.convert(I.type);let se;I.isData3DTexture?($.setTexture3D(I,0),se=D.TEXTURE_3D):I.isDataArrayTexture||I.isCompressedArrayTexture?($.setTexture2DArray(I,0),se=D.TEXTURE_2D_ARRAY):($.setTexture2D(I,0),se=D.TEXTURE_2D),d.activeTexture(D.TEXTURE0),d.pixelStorei(D.UNPACK_FLIP_Y_WEBGL,I.flipY),d.pixelStorei(D.UNPACK_PREMULTIPLY_ALPHA_WEBGL,I.premultiplyAlpha),d.pixelStorei(D.UNPACK_ALIGNMENT,I.unpackAlignment);const Oe=d.getParameter(D.UNPACK_ROW_LENGTH),Ie=d.getParameter(D.UNPACK_IMAGE_HEIGHT),ct=d.getParameter(D.UNPACK_SKIP_PIXELS),Mt=d.getParameter(D.UNPACK_SKIP_ROWS),St=d.getParameter(D.UNPACK_SKIP_IMAGES);d.pixelStorei(D.UNPACK_ROW_LENGTH,F.width),d.pixelStorei(D.UNPACK_IMAGE_HEIGHT,F.height),d.pixelStorei(D.UNPACK_SKIP_PIXELS,_e),d.pixelStorei(D.UNPACK_SKIP_ROWS,Ke),d.pixelStorei(D.UNPACK_SKIP_IMAGES,$e);const pt=v.isDataArrayTexture||v.isData3DTexture,tt=I.isDataArrayTexture||I.isData3DTexture;if(v.isDepthTexture){const Qe=G.get(v),ht=G.get(I),je=G.get(Qe.__renderTarget),Ct=G.get(ht.__renderTarget);d.bindFramebuffer(D.READ_FRAMEBUFFER,je.__webglFramebuffer),d.bindFramebuffer(D.DRAW_FRAMEBUFFER,Ct.__webglFramebuffer);for(let $t=0;$t<Ue;$t++)pt&&(D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,G.get(v).__webglTexture,H,$e+$t),D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,G.get(I).__webglTexture,ye,M+$t)),D.blitFramebuffer(_e,Ke,Ce,Ae,Fe,rt,Ce,Ae,D.DEPTH_BUFFER_BIT,D.NEAREST);d.bindFramebuffer(D.READ_FRAMEBUFFER,null),d.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else if(H!==0||v.isRenderTargetTexture||G.has(v)){const Qe=G.get(v),ht=G.get(I);d.bindFramebuffer(D.READ_FRAMEBUFFER,Q),d.bindFramebuffer(D.DRAW_FRAMEBUFFER,X);for(let je=0;je<Ue;je++)pt?D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,Qe.__webglTexture,H,$e+je):D.framebufferTexture2D(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,Qe.__webglTexture,H),tt?D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,ht.__webglTexture,ye,M+je):D.framebufferTexture2D(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,ht.__webglTexture,ye),H!==0?D.blitFramebuffer(_e,Ke,Ce,Ae,Fe,rt,Ce,Ae,D.COLOR_BUFFER_BIT,D.NEAREST):tt?D.copyTexSubImage3D(se,ye,Fe,rt,M+je,_e,Ke,Ce,Ae):D.copyTexSubImage2D(se,ye,Fe,rt,_e,Ke,Ce,Ae);d.bindFramebuffer(D.READ_FRAMEBUFFER,null),d.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else tt?v.isDataTexture||v.isData3DTexture?D.texSubImage3D(se,ye,Fe,rt,M,Ce,Ae,Ue,te,we,F.data):I.isCompressedArrayTexture?D.compressedTexSubImage3D(se,ye,Fe,rt,M,Ce,Ae,Ue,te,F.data):D.texSubImage3D(se,ye,Fe,rt,M,Ce,Ae,Ue,te,we,F):v.isDataTexture?D.texSubImage2D(D.TEXTURE_2D,ye,Fe,rt,Ce,Ae,te,we,F.data):v.isCompressedTexture?D.compressedTexSubImage2D(D.TEXTURE_2D,ye,Fe,rt,F.width,F.height,te,F.data):D.texSubImage2D(D.TEXTURE_2D,ye,Fe,rt,Ce,Ae,te,we,F);d.pixelStorei(D.UNPACK_ROW_LENGTH,Oe),d.pixelStorei(D.UNPACK_IMAGE_HEIGHT,Ie),d.pixelStorei(D.UNPACK_SKIP_PIXELS,ct),d.pixelStorei(D.UNPACK_SKIP_ROWS,Mt),d.pixelStorei(D.UNPACK_SKIP_IMAGES,St),ye===0&&I.generateMipmaps&&D.generateMipmap(se),d.unbindTexture()},this.initRenderTarget=function(v){G.get(v).__webglFramebuffer===void 0&&$.setupRenderTarget(v)},this.initTexture=function(v){v.isCubeTexture?$.setTextureCube(v,0):v.isData3DTexture?$.setTexture3D(v,0):v.isDataArrayTexture||v.isCompressedArrayTexture?$.setTexture2DArray(v,0):$.setTexture2D(v,0),d.unbindTexture()},this.resetState=function(){Y=0,W=0,ee=null,d.reset(),Te.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return ba}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const n=this.getContext();n.drawingBufferColorSpace=Et._getDrawingBufferColorSpace(t),n.unpackColorSpace=Et._getUnpackColorSpace()}}const No={type:"change"},pa={type:"start"},uc={type:"end"},qi=new Ks,Uo=new Ps,zm=Math.cos(70*Pn.DEG2RAD),At=new ne,Gt=2*Math.PI,ut={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Ir=1e-6;class km extends ru{constructor(t,n=null){super(t,n),this.state=ut.NONE,this.target=new ne,this.cursor=new ne,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:vn.ROTATE,MIDDLE:vn.DOLLY,RIGHT:vn.PAN},this.touches={ONE:Kn.ROTATE,TWO:Kn.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new ne,this._lastQuaternion=new so,this._lastTargetPosition=new ne,this._quat=new so().setFromUnitVectors(t.up,new ne(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new co,this._sphericalDelta=new co,this._scale=1,this._panOffset=new ne,this._rotateStart=new We,this._rotateEnd=new We,this._rotateDelta=new We,this._panStart=new We,this._panEnd=new We,this._panDelta=new We,this._dollyStart=new We,this._dollyEnd=new We,this._dollyDelta=new We,this._dollyDirection=new ne,this._mouse=new We,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=Xm.bind(this),this._onPointerDown=Wm.bind(this),this._onPointerUp=Ym.bind(this),this._onContextMenu=Jm.bind(this),this._onMouseWheel=$m.bind(this),this._onKeyDown=jm.bind(this),this._onTouchStart=Zm.bind(this),this._onTouchMove=Qm.bind(this),this._onMouseDown=Km.bind(this),this._onMouseMove=qm.bind(this),this._interceptControlDown=e_.bind(this),this._interceptControlUp=t_.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(t){this._cursorStyle=t,t==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(t){super.connect(t),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction=""}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(No),this.update(),this.state=ut.NONE}pan(t,n){this._pan(t,n),this.update()}dollyIn(t){this._dollyIn(t),this.update()}dollyOut(t){this._dollyOut(t),this.update()}rotateLeft(t){this._rotateLeft(t),this.update()}rotateUp(t){this._rotateUp(t),this.update()}update(t=null){const n=this.object.position;At.copy(n).sub(this.target),At.applyQuaternion(this._quat),this._spherical.setFromVector3(At),this.autoRotate&&this.state===ut.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let i=this.minAzimuthAngle,r=this.maxAzimuthAngle;isFinite(i)&&isFinite(r)&&(i<-Math.PI?i+=Gt:i>Math.PI&&(i-=Gt),r<-Math.PI?r+=Gt:r>Math.PI&&(r-=Gt),i<=r?this._spherical.theta=Math.max(i,Math.min(r,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(i+r)/2?Math.max(i,this._spherical.theta):Math.min(r,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let a=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const o=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),a=o!=this._spherical.radius}if(At.setFromSpherical(this._spherical),At.applyQuaternion(this._quatInverse),n.copy(this.target).add(At),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let o=null;if(this.object.isPerspectiveCamera){const s=At.length();o=this._clampDistance(s*this._scale);const h=s-o;this.object.position.addScaledVector(this._dollyDirection,h),this.object.updateMatrixWorld(),a=!!h}else if(this.object.isOrthographicCamera){const s=new ne(this._mouse.x,this._mouse.y,0);s.unproject(this.object);const h=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),a=h!==this.object.zoom;const f=new ne(this._mouse.x,this._mouse.y,0);f.unproject(this.object),this.object.position.sub(f).add(s),this.object.updateMatrixWorld(),o=At.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;o!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(o).add(this.object.position):(qi.origin.copy(this.object.position),qi.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(qi.direction))<zm?this.object.lookAt(this.target):(Uo.setFromNormalAndCoplanarPoint(this.object.up,this.target),qi.intersectPlane(Uo,this.target))))}else if(this.object.isOrthographicCamera){const o=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),o!==this.object.zoom&&(this.object.updateProjectionMatrix(),a=!0)}return this._scale=1,this._performCursorZoom=!1,a||this._lastPosition.distanceToSquared(this.object.position)>Ir||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Ir||this._lastTargetPosition.distanceToSquared(this.target)>Ir?(this.dispatchEvent(No),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?Gt/60*this.autoRotateSpeed*t:Gt/60/60*this.autoRotateSpeed}_getZoomScale(t){const n=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*n)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,n){At.setFromMatrixColumn(n,0),At.multiplyScalar(-t),this._panOffset.add(At)}_panUp(t,n){this.screenSpacePanning===!0?At.setFromMatrixColumn(n,1):(At.setFromMatrixColumn(n,0),At.crossVectors(this.object.up,At)),At.multiplyScalar(t),this._panOffset.add(At)}_pan(t,n){const i=this.domElement;if(this.object.isPerspectiveCamera){const r=this.object.position;At.copy(r).sub(this.target);let a=At.length();a*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*a/i.clientHeight,this.object.matrix),this._panUp(2*n*a/i.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/i.clientWidth,this.object.matrix),this._panUp(n*(this.object.top-this.object.bottom)/this.object.zoom/i.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,n){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const i=this.domElement.getBoundingClientRect(),r=t-i.left,a=n-i.top,o=i.width,s=i.height;this._mouse.x=r/o*2-1,this._mouse.y=-(a/s)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const n=this.domElement;this._rotateLeft(Gt*this._rotateDelta.x/n.clientHeight),this._rotateUp(Gt*this._rotateDelta.y/n.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let n=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(Gt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),n=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(-Gt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),n=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(Gt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),n=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(-Gt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),n=!0;break}n&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{const n=this._getSecondPointerPosition(t),i=.5*(t.pageX+n.x),r=.5*(t.pageY+n.y);this._rotateStart.set(i,r)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{const n=this._getSecondPointerPosition(t),i=.5*(t.pageX+n.x),r=.5*(t.pageY+n.y);this._panStart.set(i,r)}}_handleTouchStartDolly(t){const n=this._getSecondPointerPosition(t),i=t.pageX-n.x,r=t.pageY-n.y,a=Math.sqrt(i*i+r*r);this._dollyStart.set(0,a)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{const i=this._getSecondPointerPosition(t),r=.5*(t.pageX+i.x),a=.5*(t.pageY+i.y);this._rotateEnd.set(r,a)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const n=this.domElement;this._rotateLeft(Gt*this._rotateDelta.x/n.clientHeight),this._rotateUp(Gt*this._rotateDelta.y/n.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{const n=this._getSecondPointerPosition(t),i=.5*(t.pageX+n.x),r=.5*(t.pageY+n.y);this._panEnd.set(i,r)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){const n=this._getSecondPointerPosition(t),i=t.pageX-n.x,r=t.pageY-n.y,a=Math.sqrt(i*i+r*r);this._dollyEnd.set(0,a),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const o=(t.pageX+n.x)*.5,s=(t.pageY+n.y)*.5;this._updateZoomParameters(o,s)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let n=0;n<this._pointers.length;n++)if(this._pointers[n]==t.pointerId){this._pointers.splice(n,1);return}}_isTrackingPointer(t){for(let n=0;n<this._pointers.length;n++)if(this._pointers[n]==t.pointerId)return!0;return!1}_trackPointer(t){let n=this._pointerPositions[t.pointerId];n===void 0&&(n=new We,this._pointerPositions[t.pointerId]=n),n.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){const n=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[n]}_customWheelEvent(t){const n=t.deltaMode,i={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(n){case 1:i.deltaY*=16;break;case 2:i.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(i.deltaY*=10),i}}function Wm(e){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(e.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(e)&&(this._addPointer(e),e.pointerType==="touch"?this._onTouchStart(e):this._onMouseDown(e),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function Xm(e){this.enabled!==!1&&(e.pointerType==="touch"?this._onTouchMove(e):this._onMouseMove(e))}function Ym(e){switch(this._removePointer(e),this._pointers.length){case 0:this.domElement.releasePointerCapture(e.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(uc),this.state=ut.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:const t=this._pointers[0],n=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:n.x,pageY:n.y});break}}function Km(e){let t;switch(e.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case vn.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(e),this.state=ut.DOLLY;break;case vn.ROTATE:if(e.ctrlKey||e.metaKey||e.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(e),this.state=ut.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(e),this.state=ut.ROTATE}break;case vn.PAN:if(e.ctrlKey||e.metaKey||e.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(e),this.state=ut.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(e),this.state=ut.PAN}break;default:this.state=ut.NONE}this.state!==ut.NONE&&this.dispatchEvent(pa)}function qm(e){switch(this.state){case ut.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(e);break;case ut.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(e);break;case ut.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(e);break}}function $m(e){this.enabled===!1||this.enableZoom===!1||this.state!==ut.NONE||(e.preventDefault(),this.dispatchEvent(pa),this._handleMouseWheel(this._customWheelEvent(e)),this.dispatchEvent(uc))}function jm(e){this.enabled!==!1&&this._handleKeyDown(e)}function Zm(e){switch(this._trackPointer(e),this._pointers.length){case 1:switch(this.touches.ONE){case Kn.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(e),this.state=ut.TOUCH_ROTATE;break;case Kn.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(e),this.state=ut.TOUCH_PAN;break;default:this.state=ut.NONE}break;case 2:switch(this.touches.TWO){case Kn.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(e),this.state=ut.TOUCH_DOLLY_PAN;break;case Kn.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(e),this.state=ut.TOUCH_DOLLY_ROTATE;break;default:this.state=ut.NONE}break;default:this.state=ut.NONE}this.state!==ut.NONE&&this.dispatchEvent(pa)}function Qm(e){switch(this._trackPointer(e),this.state){case ut.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(e),this.update();break;case ut.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(e),this.update();break;case ut.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(e),this.update();break;case ut.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(e),this.update();break;default:this.state=ut.NONE}}function Jm(e){this.enabled!==!1&&e.preventDefault()}function e_(e){e.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function t_(e){e.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}const fn=Math.PI*2,n_=Math.PI/18,i_=.25,r_=128;function Jr(e){const t=e%fn;return t<0?t+fn:t}function Fo(e,t){return Jr(Math.atan2(t.y-e.y,t.x-e.x))}function ha(e,t,n=!0){return Jr(n?t-e:e-t)}function dc(e,t,n={}){const i=Math.abs(Number(e)),r=Math.abs(Number(t));if(!Number.isFinite(i)||!Number.isFinite(r)||i<=0||r<=0)return 0;const a=Math.max(Math.PI/180,Number(n.maxArcSegmentAngle)||n_),o=Math.max(2,Number(n.maxArcSegments)||r_),s=Math.max(0,Number(n.arcChordTolerance)||i_),h=Math.ceil(r/a);let f=1;if(s>0&&s<i){const g=2*Math.acos(Math.max(-1,Math.min(1,1-s/i)));Number.isFinite(g)&&g>0&&(f=Math.ceil(r/g))}return Math.min(o,Math.max(2,h,f))}function a_({start:e,end:t,center:n,clockwise:i=!0},r={}){const a=Math.hypot(e.x-n.x,e.y-n.y),o=Fo(n,e),s=Fo(n,t),h=ha(o,s,i),f=dc(a,h,r);if(!f)return[];const g=i?1:-1;return Array.from({length:f+1},(p,l)=>{if(l===0)return{...e};if(l===f)return{...t};const _=l/f,x=o+g*h*_;return{x:n.x+Math.cos(x)*a,y:n.y+Math.sin(x)*a,z:(Number(e.z)||0)+((Number(t.z)||0)-(Number(e.z)||0))*_}})}function fc(e,t={}){const n=Number(e?.center?.x),i=Number(e?.center?.y),r=Number(e?.center?.z)||0,a=Math.abs(Number(e?.radiusX)),o=Math.abs(Number(e?.radiusY)),s=Number(e?.rotation)||0;if(![n,i,a,o,s].every(Number.isFinite)||a<=0||o<=0)return[];const h=e.type==="ELLIPSE",f=h?0:Number(e.startParameter),g=h?fn:Number(e.endParameter);if(![f,g].every(Number.isFinite))return[];const p=h||e.clockwise!==!1,l=h?fn:ha(f,g,p),_=Math.max(0,Number(t.curveSegments)||0),x=_?Math.max(2,Math.ceil(_*l/fn)):dc(Math.max(a,o),l,t);if(!x)return[];const P=p?1:-1,c=Math.cos(s),u=Math.sin(s);return Array.from({length:x+1},(y,R)=>{const S=f+P*l*R/x,T=Math.cos(S),b=Math.sin(S);return{x:n+a*T*c-o*b*u,y:i+a*T*u+o*b*c,z:r}})}const o_=64;function Un(e,t){const n=Number(e?.x),i=Number(e?.y),r=e?.z===void 0?0:Number(e.z);return[n,i,r].every(Number.isFinite)?{x:n,y:t?-i:i,z:r}:null}function Ri(e,t,n,i=null){return{start:e,end:t,entity:n,segmentIndex:i}}function s_(e,t){const n=Un(e?.center,t.invertY),i=Number(e?.radius);if(!n||!Number.isFinite(i)||i<=0)return[];const r=e.type==="CIRCLE",a=r?0:Number(e.startAngle),o=r?fn:Number(e.endAngle);if(![a,o].every(Number.isFinite))return[];const s=e.clockwise!==!1,h=r?fn:ha(a,o,s),f=Math.max(2,Math.ceil(t.curveSegments*h/fn)),g=s?1:-1,p=Array.from({length:f+1},(l,_)=>{const x=a+g*h*_/f;return{x:n.x+Math.cos(x)*i,y:n.y+(t.invertY?-Math.sin(x):Math.sin(x))*i,z:n.z}});return Array.from({length:f},(l,_)=>Ri(p[_],p[_+1],e,_))}function c_(e,t){const n=fc(e,t).map(i=>Un(i,t.invertY)).filter(Boolean);return Array.from({length:Math.max(0,n.length-1)},(i,r)=>Ri(n[r],n[r+1],e,r))}function l_(e,t){if(!Array.isArray(e?.vertices)||e.vertices.length<2)return[];const n=e.closed?e.vertices.length:e.vertices.length-1,i=[];for(let r=0;r<n;r+=1){const a=e.segments?.[r],o=Un(e.vertices[r],t.invertY),s=Un(e.vertices[(r+1)%e.vertices.length],t.invertY);if(!(!o||!s)){if(a?.type==="ARC"){const h=Un(a.center,t.invertY);if(!h){t.onWarning?.("Arco interno de POLYLINE omitido por centro no valido",e);continue}const f=a_({start:o,end:s,center:h,clockwise:u_(a.clockwise!==!1,t.invertY)},t);for(let g=0;g<f.length-1;g+=1)i.push(Ri(f[g],f[g+1],e,r));continue}i.push(Ri(o,s,e,r))}}return i}function u_(e,t){return t?!e:e}function d_(e,t={}){const n={curveSegments:Math.max(8,Number(t.curveSegments)||o_),invertY:t.invertY!==!1,arcChordTolerance:t.arcChordTolerance,maxArcSegmentAngle:t.maxArcSegmentAngle,maxArcSegments:t.maxArcSegments,onWarning:t.onWarning};if(e?.type==="LINE"){const i=Un(e.start,n.invertY),r=Un(e.end,n.invertY);return i&&r?[Ri(i,r,e)]:[]}return e?.type==="POLYLINE"?l_(e,n):e?.type==="CIRCLE"||e?.type==="ARC"?s_(e,n):e?.type==="ELLIPSE"||e?.type==="ELLIPSE_ARC"?c_(e,n):(n.onWarning?.(`Entidad ${e?.type??"desconocida"} omitida en la vista 3D`,e),[])}const f_=new Set(["auxiliar","ejes"]);function p_(e){return String(e||"").trim().toLowerCase()}function h_(e){return!(!e||f_.has(p_(e.layer)))}function pc(e){return(Array.isArray(e)?e:[]).filter(h_)}Ee.line={worldUnits:{value:1},linewidth:{value:1},resolution:{value:new We},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}};Vt.line={uniforms:la.merge([Ee.common,Ee.fog,Ee.line]),vertexShader:`
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
		`};class hc extends Qt{constructor(t){super({type:"LineMaterial",uniforms:la.clone(Vt.line.uniforms),vertexShader:Vt.line.vertexShader,fragmentShader:Vt.line.fragmentShader,clipping:!0}),this.isLineMaterial=!0,this.setValues(t)}get color(){return this.uniforms.diffuse.value}set color(t){this.uniforms.diffuse.value=t}get worldUnits(){return"WORLD_UNITS"in this.defines}set worldUnits(t){t===!0!==this.worldUnits&&(this.needsUpdate=!0),t===!0?this.defines.WORLD_UNITS="":delete this.defines.WORLD_UNITS}get linewidth(){return this.uniforms.linewidth.value}set linewidth(t){this.uniforms.linewidth&&(this.uniforms.linewidth.value=t)}get dashed(){return"USE_DASH"in this.defines}set dashed(t){t===!0!==this.dashed&&(this.needsUpdate=!0),t===!0?this.defines.USE_DASH="":delete this.defines.USE_DASH}get dashScale(){return this.uniforms.dashScale.value}set dashScale(t){this.uniforms.dashScale.value=t}get dashSize(){return this.uniforms.dashSize.value}set dashSize(t){this.uniforms.dashSize.value=t}get dashOffset(){return this.uniforms.dashOffset.value}set dashOffset(t){this.uniforms.dashOffset.value=t}get gapSize(){return this.uniforms.gapSize.value}set gapSize(t){this.uniforms.gapSize.value=t}get opacity(){return this.uniforms.opacity.value}set opacity(t){this.uniforms&&(this.uniforms.opacity.value=t)}get resolution(){return this.uniforms.resolution.value}set resolution(t){this.uniforms.resolution.value.copy(t)}get alphaToCoverage(){return"USE_ALPHA_TO_COVERAGE"in this.defines}set alphaToCoverage(t){this.defines&&(t===!0!==this.alphaToCoverage&&(this.needsUpdate=!0),t===!0?this.defines.USE_ALPHA_TO_COVERAGE="":delete this.defines.USE_ALPHA_TO_COVERAGE)}}const Oo=new xn,$i=new ne;class mc extends au{constructor(){super(),this.isLineSegmentsGeometry=!0,this.type="LineSegmentsGeometry";const t=[-1,2,0,1,2,0,-1,1,0,1,1,0,-1,0,0,1,0,0,-1,-1,0,1,-1,0],n=[-1,2,1,2,-1,1,1,1,-1,-1,1,-1,-1,-2,1,-2],i=[0,2,1,2,3,1,2,4,3,4,5,3,4,6,5,6,7,5];this.setIndex(i),this.setAttribute("position",new Ai(t,3)),this.setAttribute("uv",new Ai(n,2))}applyMatrix4(t){const n=this.attributes.instanceStart,i=this.attributes.instanceEnd;return n!==void 0&&(n.applyMatrix4(t),i.applyMatrix4(t),n.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}setPositions(t){let n;t instanceof Float32Array?n=t:Array.isArray(t)&&(n=new Float32Array(t));const i=new qr(n,6,1);return this.setAttribute("instanceStart",new qn(i,3,0)),this.setAttribute("instanceEnd",new qn(i,3,3)),this.instanceCount=this.attributes.instanceStart.count,this.computeBoundingBox(),this.computeBoundingSphere(),this}setColors(t){let n;t instanceof Float32Array?n=t:Array.isArray(t)&&(n=new Float32Array(t));const i=new qr(n,6,1);return this.setAttribute("instanceColorStart",new qn(i,3,0)),this.setAttribute("instanceColorEnd",new qn(i,3,3)),this}fromWireframeGeometry(t){return this.setPositions(t.attributes.position.array),this}fromEdgesGeometry(t){return this.setPositions(t.attributes.position.array),this}fromMesh(t){return this.fromWireframeGeometry(new ou(t.geometry)),this}fromLineSegments(t){const n=t.geometry;return this.setPositions(n.attributes.position.array),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new xn);const t=this.attributes.instanceStart,n=this.attributes.instanceEnd;t!==void 0&&n!==void 0&&(this.boundingBox.setFromBufferAttribute(t),Oo.setFromBufferAttribute(n),this.boundingBox.union(Oo))}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new qs),this.boundingBox===null&&this.computeBoundingBox();const t=this.attributes.instanceStart,n=this.attributes.instanceEnd;if(t!==void 0&&n!==void 0){const i=this.boundingSphere.center;this.boundingBox.getCenter(i);let r=0;for(let a=0,o=t.count;a<o;a++)$i.fromBufferAttribute(t,a),r=Math.max(r,i.distanceToSquared($i)),$i.fromBufferAttribute(n,a),r=Math.max(r,i.distanceToSquared($i));this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error("THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.",this)}}toJSON(){}}const Nr=new Pt,Bo=new ne,Go=new ne,Dt=new Pt,Lt=new Pt,nn=new Pt,Ur=new ne,Fr=new An,It=new su,Ho=new ne,ji=new xn,Zi=new qs,rn=new Pt;let on,Fn;function Vo(e,t,n){return rn.set(0,0,-t,1).applyMatrix4(e.projectionMatrix),rn.multiplyScalar(1/rn.w),rn.x=Fn/n.width,rn.y=Fn/n.height,rn.applyMatrix4(e.projectionMatrixInverse),rn.multiplyScalar(1/rn.w),Math.abs(Math.max(rn.x,rn.y))}function m_(e,t){const n=e.matrixWorld,i=e.geometry,r=i.attributes.instanceStart,a=i.attributes.instanceEnd,o=Math.min(i.instanceCount,r.count);for(let s=0,h=o;s<h;s++){It.start.fromBufferAttribute(r,s),It.end.fromBufferAttribute(a,s),It.applyMatrix4(n);const f=new ne,g=new ne;on.distanceSqToSegment(It.start,It.end,g,f),g.distanceTo(f)<Fn*.5&&t.push({point:g,pointOnLine:f,distance:on.origin.distanceTo(g),object:e,face:null,faceIndex:s,uv:null,uv1:null})}}function __(e,t,n){const i=t.projectionMatrix,a=e.material.resolution,o=e.matrixWorld,s=e.geometry,h=s.attributes.instanceStart,f=s.attributes.instanceEnd,g=Math.min(s.instanceCount,h.count),p=-t.near;on.at(1,nn),nn.w=1,nn.applyMatrix4(t.matrixWorldInverse),nn.applyMatrix4(i),nn.multiplyScalar(1/nn.w),nn.x*=a.x/2,nn.y*=a.y/2,nn.z=0,Ur.copy(nn),Fr.multiplyMatrices(t.matrixWorldInverse,o);for(let l=0,_=g;l<_;l++){if(Dt.fromBufferAttribute(h,l),Lt.fromBufferAttribute(f,l),Dt.w=1,Lt.w=1,Dt.applyMatrix4(Fr),Lt.applyMatrix4(Fr),Dt.z>p&&Lt.z>p)continue;if(Dt.z>p){const R=Dt.z-Lt.z,S=(Dt.z-p)/R;Dt.lerp(Lt,S)}else if(Lt.z>p){const R=Lt.z-Dt.z,S=(Lt.z-p)/R;Lt.lerp(Dt,S)}Dt.applyMatrix4(i),Lt.applyMatrix4(i),Dt.multiplyScalar(1/Dt.w),Lt.multiplyScalar(1/Lt.w),Dt.x*=a.x/2,Dt.y*=a.y/2,Lt.x*=a.x/2,Lt.y*=a.y/2,It.start.copy(Dt),It.start.z=0,It.end.copy(Lt),It.end.z=0;const P=It.closestPointToPointParameter(Ur,!0);It.at(P,Ho);const c=Pn.lerp(Dt.z,Lt.z,P),u=c>=-1&&c<=1,y=Ur.distanceTo(Ho)<Fn*.5;if(u&&y){It.start.fromBufferAttribute(h,l),It.end.fromBufferAttribute(f,l),It.start.applyMatrix4(o),It.end.applyMatrix4(o);const R=new ne,S=new ne;on.distanceSqToSegment(It.start,It.end,S,R),n.push({point:S,pointOnLine:R,distance:on.origin.distanceTo(S),object:e,face:null,faceIndex:l,uv:null,uv1:null})}}}class g_ extends Bt{constructor(t=new mc,n=new hc({color:Math.random()*16777215})){super(t,n),this.isLineSegments2=!0,this.type="LineSegments2"}computeLineDistances(){const t=this.geometry,n=t.attributes.instanceStart,i=t.attributes.instanceEnd,r=new Float32Array(2*n.count);for(let o=0,s=0,h=n.count;o<h;o++,s+=2)Bo.fromBufferAttribute(n,o),Go.fromBufferAttribute(i,o),r[s]=s===0?0:r[s-1],r[s+1]=r[s]+Bo.distanceTo(Go);const a=new qr(r,2,1);return t.setAttribute("instanceDistanceStart",new qn(a,1,0)),t.setAttribute("instanceDistanceEnd",new qn(a,1,1)),this}raycast(t,n){const i=this.material.worldUnits,r=t.camera;if(r===null&&!i&&console.error('LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.'),i===!1&&(this.material.resolution.x===0||this.material.resolution.y===0))return;const a=t.params.Line2!==void 0&&t.params.Line2.threshold||0;on=t.ray;const o=this.matrixWorld,s=this.geometry,h=this.material;Fn=h.linewidth+a,s.boundingSphere===null&&s.computeBoundingSphere(),Zi.copy(s.boundingSphere).applyMatrix4(o);let f;if(i)f=Fn*.5;else{const p=Math.max(r.near,Zi.distanceToPoint(on.origin));f=Vo(r,p,h.resolution)}if(Zi.radius+=f,on.intersectsSphere(Zi)===!1)return;s.boundingBox===null&&s.computeBoundingBox(),ji.copy(s.boundingBox).applyMatrix4(o);let g;if(i)g=Fn*.5;else{const p=Math.max(r.near,ji.distanceToPoint(on.origin));g=Vo(r,p,h.resolution)}ji.expandByScalar(g),on.intersectsBox(ji)!==!1&&(i?m_(this,n):__(this,r,n))}onBeforeRender(t){const n=this.material.uniforms;n&&n.resolution&&(t.getViewport(Nr),this.material.uniforms.resolution.value.set(Nr.z,Nr.w))}}const vt={preset:"SK",groundColor:12045488,groundOpacity:.28,groundRenderOrder:-20,background:12576251,drawingColor:1452079,drawingLineWidth:1.6,drawingPlaneLift:.08,drawingRenderOrder:20,gridMinorColor:9083791,gridMajorColor:7307894,axisLineWidth:2.8,axisNegativeLineWidth:1.4,axisNegativeDashSize:12,axisNegativeGapSize:7,axisX:13893632,axisY:40960,axisZ:19416};function zo(e){const t=new dt(e);return new ne(t.r,t.g,t.b)}function mn(e,t=0){const n=Number(e);return Number.isFinite(n)?n:t}function v_(e,t){const n=Math.max(0,mn(t,0));n<=0||(e.userData.webcadDepthBias=n,e.onBeforeCompile=i=>{const r="gl_Position = clip;";i.vertexShader.includes(r)&&(i.vertexShader=i.vertexShader.replace(r,`${r}
			gl_Position.z -= ${n.toExponential(8)} * gl_Position.w;`))},e.customProgramCacheKey=()=>`webcad-line-depth-bias:${n}`,e.needsUpdate=!0)}function _t(e){e&&e.traverse?.(t=>{t.geometry?.dispose?.(),Array.isArray(t.material)?t.material.forEach(n=>n.dispose?.()):t.material?.dispose?.()})}function cn(e,t={}){const n=[],i=new xn;for(const h of Array.isArray(e)?e:[]){const f=h?.start,g=h?.end;if(!f||!g)continue;const p=new ne(mn(f.x),mn(f.y),mn(f.z)),l=new ne(mn(g.x),mn(g.y),mn(g.z));n.push(p.x,p.y,p.z,l.x,l.y,l.z),i.expandByPoint(p),i.expandByPoint(l)}const r=new mc;r.setPositions(n);const a={color:t.color??vt.drawingColor,depthTest:t.depthTest!==!1,depthWrite:t.depthWrite!==!1,linewidth:t.linewidth??vt.drawingLineWidth,dashed:t.dashed===!0,opacity:t.opacity??1,transparent:t.transparent===!0,worldUnits:!1};t.depthFunc!==void 0&&(a.depthFunc=t.depthFunc),t.dashed===!0&&(a.dashSize=t.dashSize??vt.axisNegativeDashSize,a.gapSize=t.gapSize??vt.axisNegativeGapSize);const o=new hc(a);t.polygonOffset!==void 0&&(o.polygonOffset=t.polygonOffset===!0,o.polygonOffsetFactor=mn(t.polygonOffsetFactor,0),o.polygonOffsetUnits=mn(t.polygonOffsetUnits,0)),v_(o,t.depthBias);const s=new g_(r,o);return Number.isFinite(t.renderOrder)&&(s.renderOrder=t.renderOrder),s.computeLineDistances(),s.userData.segmentCount=n.length/6,s.userData.bounds=i.isEmpty()?null:i,s}function zn(e,t,n){if(!e)return;const i=Math.max(1,Math.round(t||1)),r=Math.max(1,Math.round(n||1));e.traverse?.(a=>{a.material?.isLineMaterial&&a.material.resolution.set(i,r)})}function x_(e){const t=Math.max(1e-4,e),n=10**Math.floor(Math.log10(t)),i=t/n;return i<=1?n:i<=2?2*n:i<=5?5*n:10*n}function S_(e,t){return new Qt({depthWrite:!1,extensions:{derivatives:!0},side:zt,transparent:!0,uniforms:{majorAlpha:{value:.42},majorColor:{value:zo(vt.gridMajorColor)},majorStep:{value:t},majorWidth:{value:1.15},minorAlpha:{value:.24},minorColor:{value:zo(vt.gridMinorColor)},minorStep:{value:e},minorWidth:{value:.9}},vertexShader:`
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
    `})}function _c(e){const t=Math.max(2e3,e*80),n=x_(Math.max(e,50)/7);return{lineLimit:Math.max(10,Math.ceil(t/n)*n),minorStep:n}}function gc(e=new ne,t=20){const{lineLimit:n}=_c(t),i=new dt(vt.background).lerp(new dt(vt.groundColor),vt.groundOpacity),r=new Bt(new cr(n*2,n*2),new ur({color:i,depthTest:!1,depthWrite:!1,side:zt,transparent:!1}));return r.name="webcad-3d-sk-ground",r.position.set(e.x,e.y,-.001),r.renderOrder=vt.groundRenderOrder,r.userData.isSketchGround=!0,r}function E_(e=new ne,t=20,n={}){const i=new sn;i.name="webcad-3d-grid";const{lineLimit:r,minorStep:a}=_c(t),o=a*5;n.includeGround!==!1&&i.add(gc(e,t));const s=new Bt(new cr(r*2,r*2),S_(a,o));return s.name="webcad-3d-grid-minor",s.position.set(e.x,e.y,.001),s.renderOrder=vt.groundRenderOrder+1,s.userData.isSketchGridLine=!0,i.add(s),i.userData.preset=vt.preset,i.userData.step=a,i.userData.extent=r,vc(i,n.visible!==!1),i}function vc(e,t){if(!e)return;const n=t!==!1;e.visible=!0,e.traverse?.(i=>{i.userData?.isSketchGridLine&&(i.visible=n),i.userData?.isSketchGround&&(i.visible=!0)}),e.userData.gridLinesVisible=n}function Or(e,t,n,i){const r=new sn;r.name=`webcad-3d-axis-${i}`;const a=e.clone().normalize(),o=cn([{start:{x:0,y:0,z:0},end:{x:a.x*n,y:a.y*n,z:a.z*n}}],{color:t,linewidth:vt.axisLineWidth});o.name=`webcad-3d-axis-${i}-positive`;const s=cn([{start:{x:0,y:0,z:0},end:{x:-a.x*n,y:-a.y*n,z:-a.z*n}}],{color:t,dashSize:vt.axisNegativeDashSize,dashed:!0,gapSize:vt.axisNegativeGapSize,linewidth:vt.axisNegativeLineWidth});return s.name=`webcad-3d-axis-${i}-negative`,s.userData.negativeAxis=!0,r.add(o,s),r}function M_(e=20){const t=Math.max(2e3,e*80),n=new sn;return n.name="webcad-3d-axes",n.add(Or(new ne(1,0,0),vt.axisX,t,"x"),Or(new ne(0,1,0),vt.axisY,t,"y"),Or(new ne(0,0,1),vt.axisZ,t*.72,"z")),n.userData.preset=vt.preset,n.userData.extent=t,n}function b_(e,t){return e?.id??e?.handle??`${e?.type??"ENTITY"}-${t}`}function T_(e,t={}){const n=d_(e,t);if(!n.length)return null;const i=cn(n,{color:t.color??vt.drawingColor,depthTest:!0,depthWrite:!1,linewidth:t.linewidth??vt.drawingLineWidth,renderOrder:vt.drawingRenderOrder,transparent:!0});return i.position.z=t.visualLift??vt.drawingPlaneLift,i.renderOrder=vt.drawingRenderOrder,i.name=`webcad-entity-${e?.type??"unknown"}`,i.userData.entity=e,i.userData.entityType=e?.type??null,i.userData.sourceSegments=n,i.userData.selectable=!0,i}function A_(e,t={}){const n=new sn;n.name="webcad-3d-entities";const i=new xn;let r=0,a=0;return pc(e).forEach((o,s)=>{const h=T_(o,t);h&&(h.userData.entityKey=b_(o,s),n.add(h),a+=1,r+=h.userData.segmentCount||0,h.userData.bounds&&i.union(h.userData.bounds))}),n.userData.bounds=i.isEmpty()?null:i,n.userData.entityCount=a,n.userData.segmentCount=r,n}const Nn=Math.PI*2,y_={type:"plane",origin:{x:0,y:0,z:0},normal:{x:0,y:0,z:1},xAxis:{x:1,y:0,z:0}};function bt(e){const t=Number(e);return Number.isFinite(t)?t:null}function Nt(e,t=0){const n=bt(e?.x),i=bt(e?.y),r=e?.z===void 0?t:bt(e.z);return n===null||i===null||r===null?null:{x:n,y:i,z:r}}function jt(e){return e===void 0?void 0:JSON.parse(JSON.stringify(e))}function Ot(e){const t=Number(e)%Nn;return t<0?t+Nn:t}function ko(e,t){return Ot(Math.atan2(t.y-e.y,t.x-e.x))}function ar(e,t,n=!0){return Ot(n?t-e:e-t)}function Wo(e,t,n=!0){return(n?1:-1)*ar(e,t,n)}function gi(e,t,n){return{x:e.x+Math.cos(n)*t,y:e.y+Math.sin(n)*t,z:e.z||0}}function $n(e,t,n,i,r){const a=Math.cos(i),o=Math.sin(i),s=Math.cos(r)*t,h=Math.sin(r)*n;return{x:e.x+s*a-h*o,y:e.y+s*o+h*a,z:e.z||0}}function or(e,t,n=1e-9){return Math.hypot((e?.x??0)-(t?.x??0),(e?.y??0)-(t?.y??0),(e?.z??0)-(t?.z??0))<=n}function P_(e){const t=e?.id??e?.handle??null;return{entityId:t===void 0?null:t,entityType:e?.type??null}}function Sn(e,t="outer"){const n={type:"exact-profile-loop",role:t,closed:!0,segments:e};return n.bounds=Sc(n),n.orientation=N_(n),n}function Ni(e,t,n={}){const i=(n.innerLoops||[]).map((a,o)=>Sn(jt(a.segments||a),`inner-${o}`)),r={type:"exact-profile",version:1,id:n.id??e?.id??e?.handle??null,closed:!0,plane:jt(n.plane??y_),source:P_(e),outerLoop:Sn(t,"outer"),innerLoops:i};return r.segments=r.outerLoop.segments,r.bounds=D_(r),r.orientation={outer:r.outerLoop.orientation,inner:r.innerLoops.map(a=>a.orientation)},r}function Mi(e,t){return t?e?(e.minX=Math.min(e.minX,t.x),e.minY=Math.min(e.minY,t.y),e.maxX=Math.max(e.maxX,t.x),e.maxY=Math.max(e.maxY,t.y),e):{minX:t.x,minY:t.y,maxX:t.x,maxY:t.y}:e}function R_(e,t,n,i=!0,r=1e-12){const a=ar(t,n,i);return Ot(i?e-t:t-e)<=a+r}function w_(e){let t=null;return t=Mi(t,e.start),t=Mi(t,e.end),[0,Math.PI*.5,Math.PI,Math.PI*1.5].forEach(n=>{R_(n,e.startAngle,e.endAngle,e.clockwise)&&(t=Mi(t,gi(e.center,e.radius,n)))}),t}function Xo(e){const t=Math.cos(e.rotation||0),n=Math.sin(e.rotation||0),i=Math.hypot(e.radiusX*t,e.radiusY*n),r=Math.hypot(e.radiusX*n,e.radiusY*t);return{minX:e.center.x-i,minY:e.center.y-r,maxX:e.center.x+i,maxY:e.center.y+r}}function xc(e,t){return e?t?{minX:Math.min(e.minX,t.minX),minY:Math.min(e.minY,t.minY),maxX:Math.max(e.maxX,t.maxX),maxY:Math.max(e.maxY,t.maxY)}:{...e}:t?{...t}:null}function C_(e){return e.type==="line"?Mi(Mi(null,e.start),e.end):e.type==="arc-circle"?w_(e):e.type==="circle"?{minX:e.center.x-e.radius,minY:e.center.y-e.radius,maxX:e.center.x+e.radius,maxY:e.center.y+e.radius}:e.type==="ellipse"||e.type==="arc-ellipse"?Xo(e):null}function Sc(e){return e.segments.reduce((t,n)=>xc(t,C_(n)),null)}function D_(e){return[e.outerLoop,...e.innerLoops||[]].reduce((t,n)=>xc(t,n.bounds||Sc(n)),null)}function L_(e){if(e.type==="line")return .5*(e.start.x*e.end.y-e.end.x*e.start.y);if(e.type==="arc-circle"){const t=Wo(e.startAngle,e.endAngle,e.clockwise);return .5*(e.center.x*(e.end.y-e.start.y)-e.center.y*(e.end.x-e.start.x)+e.radius*e.radius*t)}if(e.type==="circle")return(e.clockwise===!1?-1:1)*Math.PI*e.radius*e.radius;if(e.type==="ellipse")return(e.clockwise===!1?-1:1)*Math.PI*e.radiusX*e.radiusY;if(e.type==="arc-ellipse"){const t=Wo(e.startAngle,e.endAngle,e.clockwise);return .5*(e.center.x*(e.end.y-e.start.y)-e.center.y*(e.end.x-e.start.x)+e.radiusX*e.radiusY*t)}return 0}function I_(e){return e.segments.reduce((t,n)=>t+L_(n),0)}function N_(e){const t=I_(e);return Math.abs(t)<=1e-9?null:t>0?"ccw":"cw"}function Ec(e,t){return{type:"line",start:e,end:t}}function ea(e,t,n){const i=Nt(n?.center);if(!i)return null;const r=Math.hypot(e.x-i.x,e.y-i.y),a=Math.hypot(t.x-i.x,t.y-i.y),o=(r+a)*.5;return!Number.isFinite(o)||o<=1e-9||Math.abs(r-a)>1e-6?null:{type:"arc-circle",center:i,radius:o,startAngle:ko(i,e),endAngle:ko(i,t),clockwise:n.clockwise!==!1,start:e,end:t}}function Mc(e){return e.type==="circle"||e.type==="ellipse"?null:e.start||null}function bc(e){return e.type==="circle"||e.type==="ellipse"?null:e.end||null}function Tc(e){if(e.length===1&&["circle","ellipse"].includes(e[0].type))return!0;for(let t=0;t<e.length;t+=1){const n=bc(e[t]),i=Mc(e[(t+1)%e.length]);if(!n||!i||!or(n,i))return!1}return!0}function U_(e,t){const n=Math.max(Number(t)||0,0);if(!(n>0))return e;for(let i=0;i<e.length;i+=1){const r=e[i],a=e[(i+1)%e.length],o=bc(r),s=Mc(a);if(!(!o||!s||or(o,s))){if(!or(o,s,n))return null;if(r.type==="line"){r.end=jt(s);continue}if(a.type==="line"){a.start=jt(o);continue}return null}}return e}function F_(e){return e.type==="line"?{...e,start:jt(e.end),end:jt(e.start)}:e.type==="arc-circle"||e.type==="arc-ellipse"?{...e,start:jt(e.end),end:jt(e.start),startAngle:e.endAngle,endAngle:e.startAngle,clockwise:e.clockwise===!1}:e.type==="circle"||e.type==="ellipse"?{...e,clockwise:e.clockwise===!1}:jt(e)}function O_(e){const t=e.segments.slice().reverse().map(F_);return Sn(t,e.role)}function B_(e,t){return!t||!e.orientation||e.orientation!==t?e:O_(e)}function G_(e,t={}){const n=Nt(e.center),i=bt(e.radius);return!n||i===null||i<=0?null:Sn([{type:"circle",center:n,radius:i,normal:{x:0,y:0,z:1},clockwise:t.clockwise!==!1}],t.role||"outer")}function H_(e,t={}){if(e?.type!=="POLYLINE"||!Array.isArray(e.vertices)||e.vertices.length<3)return null;const n=e.vertices.map(s=>Nt(s));if(n.some(s=>!s))return null;const i=or(n[0],n[n.length-1]);if(t.requireClosed!==!1&&!e.closed&&!i)return null;const r=i?n.slice(0,-1):n,a=e.closed?r.length:Math.max(0,r.length-1);if(a<3)return null;const o=[];for(let s=0;s<a;s+=1){const h=r[s],f=r[(s+1)%r.length],g=e.segments?.[s]??{type:"LINE"},p=g.type==="ARC"?ea(h,f,g):Ec(h,f);if(!p)return null;o.push(p)}return Sn(o,t.role||"outer")}function V_(e,t={}){const n=Nt(e.center),i=bt(e.radiusX??e.majorRadius),r=bt(e.radiusY??e.minorRadius),a=bt(e.rotation)??0;if(!n||i===null||r===null||i<=0||r<=0)return null;if(e.type==="ELLIPSE_ARC"||e.startAngle!==void 0||e.endAngle!==void 0||e.startParameter!==void 0||e.endParameter!==void 0){const s=Ot(e.startParameter??e.startAngle??0),h=Ot(e.endParameter??e.endAngle??Nn);return Sn([{type:"arc-ellipse",center:n,radiusX:i,radiusY:r,rotation:a,startAngle:s,endAngle:h,clockwise:e.clockwise!==!1,start:$n(n,i,r,a,s),end:$n(n,i,r,a,h)}],t.role||"outer")}return Sn([{type:"ellipse",center:n,radiusX:i,radiusY:r,rotation:a,normal:{x:0,y:0,z:1},clockwise:t.clockwise!==!1}],t.role||"outer")}function z_(e,t={}){if(e?.type!=="CIRCLE")return null;const n=G_(e,{...t,role:"outer"});return n?Ni(e,n.segments,t):null}function k_(e,t={}){const n=H_(e,{...t,role:"outer"});return n?Ni(e,n.segments,t):null}function W_(e,t={}){if(e?.type!=="ELLIPSE")return null;const n=V_(e,{...t,role:"outer"});return n?Ni(e,n.segments,t):null}function X_(e){const t=e?.entity||e,n=Math.max(0,Math.min(1,Number(e?.startParameter??0))),i=Math.max(0,Math.min(1,Number(e?.endParameter??1)));if(t?.type==="LINE"){const r=Nt(t.start),a=Nt(t.end);return!r||!a?null:Ec({x:r.x+(a.x-r.x)*n,y:r.y+(a.y-r.y)*n,z:r.z+(a.z-r.z)*n},{x:r.x+(a.x-r.x)*i,y:r.y+(a.y-r.y)*i,z:r.z+(a.z-r.z)*i})}if(t?.type==="ARC"){const r=Nt(t.center),a=bt(t.radius);if(!r||a===null||a<=0)return null;const o=t.clockwise===!1?-1:1,s=ar(t.startAngle,t.endAngle,t.clockwise!==!1),h=Ot(t.startAngle+o*s*n),f=Ot(t.startAngle+o*s*i);return ea(gi(r,a,h),gi(r,a,f),{center:r,clockwise:i<n?t.clockwise===!1:t.clockwise!==!1})}if(t?.type==="CIRCLE"){const r=Nt(t.center),a=bt(t.radius);if(!r||a===null||a<=0)return null;const o=Ot(Nn*n),s=Ot(Nn*i);return ea(gi(r,a,o),gi(r,a,s),{center:r,clockwise:i>=n})}if(t?.type==="ELLIPSE_ARC"){const r=Nt(t.center),a=bt(t.radiusX),o=bt(t.radiusY),s=bt(t.rotation)??0;if(!r||a===null||o===null||a<=0||o<=0)return null;const h=t.clockwise!==!1,f=i<n?!h:h,g=h?1:-1,p=ar(t.startParameter,t.endParameter,h),l=Ot(t.startParameter+g*p*n),_=Ot(t.startParameter+g*p*i);return{type:"arc-ellipse",center:r,radiusX:a,radiusY:o,rotation:s,startAngle:l,endAngle:_,clockwise:f,start:$n(r,a,o,s,l),end:$n(r,a,o,s,_)}}if(t?.type==="ELLIPSE"){const r=Nt(t.center),a=bt(t.radiusX),o=bt(t.radiusY),s=bt(t.rotation)??0;if(!r||a===null||o===null||a<=0||o<=0)return null;const h=Ot(Nn*n),f=Ot(Nn*i);return{type:"arc-ellipse",center:r,radiusX:a,radiusY:o,rotation:s,startAngle:h,endAngle:f,clockwise:i>=n,start:$n(r,a,o,s,h),end:$n(r,a,o,s,f)}}return null}function Y_(e){const t=[];return e.forEach(n=>{const i={...n,startParameter:Number(n?.startParameter??0),endParameter:Number(n?.endParameter??1)},r=t[t.length-1],a=Math.sign(r?.endParameter-r?.startParameter),o=Math.sign(i.endParameter-i.startParameter),s=(i.entity?.type==="CIRCLE"||i.entity?.type==="ELLIPSE")&&Math.abs(i.endParameter-r?.startParameter)>=1-1e-10;if(r&&r.entity===i.entity&&!s&&a===o&&Math.abs(r.endParameter-i.startParameter)<=1e-10){r.endParameter=i.endParameter;return}t.push(i)}),t}function K_(e,t={}){if(!Array.isArray(e)||e.length<2)return null;const n=U_(Y_(e).map(X_),t.tolerance);return!n||n.some(i=>!i)||!Tc(n)?null:Ni({id:t.id??null,type:"COMPOSITE_PROFILE"},n,t)}function Ac(e,t={}){return e?.type==="CIRCLE"?z_(e,t):e?.type==="POLYLINE"?k_(e,t):e?.type==="ELLIPSE"?W_(e,t):null}function q_(e,t=[],n={}){if(!ta(e))return null;const i=Sn(jt(e.outerLoop?.segments||e.segments),"outer"),r=t.map((a,o)=>ta(a)?B_(Sn(jt(a.outerLoop?.segments||a.segments),`inner-${o}`),i.orientation):null);return r.some(a=>!a)?null:Ni({id:n.id??e.id??null,type:"COMPOSITE_PROFILE"},i.segments,{...n,innerLoops:r,plane:n.plane??e.plane})}function Yo(e){return!e?.closed||!Array.isArray(e.segments)||!e.segments.length||!Tc(e.segments)?!1:e.segments.every(t=>t.type==="line"?!!(Nt(t.start)&&Nt(t.end)):t.type==="arc-circle"?!!(Nt(t.center)&&Nt(t.start)&&Nt(t.end)&&bt(t.radius)>0&&bt(t.startAngle)!==null&&bt(t.endAngle)!==null):t.type==="circle"?!!(Nt(t.center)&&bt(t.radius)>0):t.type==="ellipse"||t.type==="arc-ellipse"?!!(Nt(t.center)&&bt(t.radiusX)>0&&bt(t.radiusY)>0):!1)}function ta(e,t={}){if(e?.type!=="exact-profile"||e.version!==1||t.requireClosed!==!1&&e.closed!==!0)return!1;const n=e.outerLoop||{closed:e.closed,segments:e.segments};return Yo(n)?(Array.isArray(e.innerLoops)?e.innerLoops:[]).every(r=>Yo(r)&&(!n.orientation||!r.orientation||r.orientation!==n.orientation)):!1}function $_(e){return jt(e)}const j_={x:0,y:0,z:1},yc=1e-9;function yt(e){return e===void 0?void 0:JSON.parse(JSON.stringify(e))}function tr(e){const t=Number(e);return Number.isFinite(t)?t:null}function Pc(e,t=j_){const n=tr(e?.x),i=tr(e?.y),r=tr(e?.z);return n===null||i===null||r===null?t?{...t}:null:{x:n,y:i,z:r}}function Z_(e){return Math.hypot(e.x,e.y,e.z)}function Q_(e){if(!e)return null;const t=Z_(e);return t<=yc?null:{x:e.x/t,y:e.y/t,z:e.z/t}}function na(e,t){return{x:e.x*t,y:e.y*t,z:e.z*t}}function J_(e,t){return{x:e.x+t.x,y:e.y+t.y,z:(e.z||0)+t.z}}function eg(e){return e.start||e.center||null}function tg(e,t,n,i,r){const a={loopRole:t,segmentIndex:n,sourceSegment:yt(e),direction:yt(i),distance:r};return e.type==="line"?{...a,type:"plane",kind:"line-extrusion-side",start:yt(e.start),end:yt(e.end)}:e.type==="circle"?{...a,type:"cylinder",kind:t==="outer"?"outer-side":"inner-side",center:yt(e.center),radius:e.radius,axis:yt(i),trimRole:t==="outer"?"outer":"inner"}:e.type==="arc-circle"?{...a,type:"linearExtrusionSurface",curveType:"arc-circle",center:yt(e.center),radius:e.radius,startAngle:e.startAngle,endAngle:e.endAngle,clockwise:e.clockwise!==!1,start:yt(e.start),end:yt(e.end)}:e.type==="ellipse"?{...a,type:"ellipticCylinder",kind:t==="outer"?"outer-side":"inner-side",center:yt(e.center),radiusX:e.radiusX,radiusY:e.radiusY,rotation:e.rotation||0,axis:yt(i),trimRole:t==="outer"?"outer":"inner"}:e.type==="arc-ellipse"?{...a,type:"linearExtrusionSurface",curveType:"arc-ellipse",center:yt(e.center),radiusX:e.radiusX,radiusY:e.radiusY,rotation:e.rotation||0,startAngle:e.startAngle,endAngle:e.endAngle,clockwise:e.clockwise!==!1,start:yt(e.start),end:yt(e.end)}:{...a,type:"linearExtrusionSurface",curveType:e.type}}function Ko(e,t,n,i){return e.segments.map((r,a)=>tg(r,t,a,n,i))}function qo(e,t,n){return{type:"plane",role:t,plane:yt(e.plane),offset:yt(n),outerLoop:yt(e.outerLoop),innerLoops:yt(e.innerLoops||[]),trimRole:t}}function ng(e,t,n={}){const i=tr(t);if(!ta(e)||i===null||Math.abs(i)<=yc)return null;const r=Q_(Pc(n.direction));if(!r)return null;const a=na(r,i),o=$_(e),s=i<0?na(r,-1):r,h={type:"exact-extrusion",version:1,id:n.id??null,profile:o,direction:r,distance:i,offset:a,caps:{start:qo(o,"start",{x:0,y:0,z:0}),end:qo(o,"end",a)},sideSurfaces:{outer:Ko(o.outerLoop,"outer",s,i),inner:o.innerLoops.map((f,g)=>({loopIndex:g,surfaces:Ko(f,`inner-${g}`,s,i)}))},metadata:yt(n.metadata??null)};return h.bounds=rg(h),h}function $o(e,t){return t?e?(e.minX=Math.min(e.minX,t.x),e.minY=Math.min(e.minY,t.y),e.minZ=Math.min(e.minZ,t.z||0),e.maxX=Math.max(e.maxX,t.x),e.maxY=Math.max(e.maxY,t.y),e.maxZ=Math.max(e.maxZ,t.z||0),e):{minX:t.x,minY:t.y,minZ:t.z||0,maxX:t.x,maxY:t.y,maxZ:t.z||0}:e}function ig(e){if(e.type==="line"||e.type==="arc-circle"||e.type==="arc-ellipse")return[e.start,e.end].filter(Boolean);if(e.type==="circle")return[{x:e.center.x-e.radius,y:e.center.y,z:e.center.z||0},{x:e.center.x+e.radius,y:e.center.y,z:e.center.z||0},{x:e.center.x,y:e.center.y-e.radius,z:e.center.z||0},{x:e.center.x,y:e.center.y+e.radius,z:e.center.z||0}];if(e.type==="ellipse"){const t=e.radiusX,n=e.radiusY;return[{x:e.center.x-t,y:e.center.y-n,z:e.center.z||0},{x:e.center.x+t,y:e.center.y+n,z:e.center.z||0}]}return[eg(e)].filter(Boolean)}function rg(e){if(!e?.profile)return null;const t=e.offset||na(Pc(e.direction),e.distance);let n=null;return[e.profile.outerLoop,...e.profile.innerLoops||[]].forEach(r=>{r.segments.forEach(a=>{ig(a).forEach(o=>{n=$o(n,o),n=$o(n,J_(o,t))})})}),n}const nr=1e-9;function jo(e,t){return Math.abs(e.x-t.x)<=nr&&Math.abs(e.y-t.y)<=nr&&Math.abs(e.z-t.z)<=nr}function ag(e){if(!Array.isArray(e))throw new TypeError("El perfil de extrusion debe ser un array de puntos");const t=[];for(const n of e){const i={x:Number(n?.x),y:Number(n?.y),z:n?.z===void 0?0:Number(n.z)};if(![i.x,i.y,i.z].every(Number.isFinite))throw new TypeError("El perfil de extrusion contiene coordenadas no validas");(!t.length||!jo(t[t.length-1],i))&&t.push(i)}if(t.length>1&&jo(t[0],t[t.length-1])&&t.pop(),t.length<3)throw new RangeError("La extrusion necesita al menos tres puntos utiles");return t}function Zo(e,t,n={}){const i=Number(t);if(!Number.isFinite(i)||Math.abs(i)<=nr)throw new RangeError("La altura de extrusion debe ser distinta de cero");const r=ag(e),a=r.length,o=[...r,...r.map(p=>({...p,z:p.z+i}))],s=Array.from({length:a},(p,l)=>a-l-1),h=Array.from({length:a},(p,l)=>a+l),f=i>0?[s,h]:[s.reverse(),h.reverse()],g=[];for(let p=0;p<a;p+=1){const l=(p+1)%a,_=p,x=l,P=a+p,c=a+l;f.push(i>0?[_,x,c,P]:[_,P,c,x]),g.push([_,x],[P,c],[_,P])}return Ii({vertices:o,faces:f,edges:g,metadata:{type:"extrusion",height:i,source:n.source??null}})}const Zt=1e-6,ke={edgeColor:0,edgeDepthBias:5e-5,edgeLineWidth:3.2,edgePolygonOffsetFactor:-2,edgePolygonOffsetUnits:-2,edgeRenderOrder:28,faceColor:16777215,previewFaceColor:16185595,hiddenEdgeColor:10726832,hiddenEdgeLineWidth:1.15,hiddenEdgeOpacity:.72,tangentEdgeColor:5201249,tangentEdgeLineWidth:1.25};function Rc(e){const t=e?.id??e?.handle??null;return t!=null?`${e?.type??e?.kind??"ENTITY"}:${t}`:null}function Mn(e){const t=e?.sourceEntity,n=Rc(t);return n?e?.sketchId?`${e.sketchId}:${n}`:n:e?.sourceSolidFaceIndex!==void 0&&e?.id?`solid-face:${e.id}`:e?.id?`face:${e.id}`:null}function wi(e){const t=Number(e);return!Number.isFinite(t)||Math.abs(t)<=1e-9?null:t}function ma(e){const t=new ne(Number(e?.x),Number(e?.y),Number(e?.z));return t.lengthSq()>1e-12?t.normalize():null}function _a(e){return e===void 0?void 0:JSON.parse(JSON.stringify(e))}function Br(e,t={}){return{status:"unavailable",reason:e,..._a(t)}}function wc(e,t={}){return{status:"pending",reason:e,..._a(t)}}function og(e,t){const n=e?.sourceEntity,i=e?.exactProfile?_a(e.exactProfile):null;if(!n&&!i)return e?.sourceSolidFaceIndex!==void 0?wc("face-push-exact-brep-not-implemented",{operation:{type:"pushMoveFace",sourceSolidFaceIndex:e.sourceSolidFaceIndex,distance:t}}):Br("missing-source-entity");const r=i||Ac(n),a=e?.workplane?hu(r,e.workplane):r;if(!a)return Br("unsupported-source-entity",{source:{entityId:n?.id??n?.handle??null,entityType:n?.type??e?.sourceEntityType??null}});const o=ng(a,t,{direction:e?.normal??{x:0,y:0,z:1},metadata:{sourceKey:Mn(e),sketchPlane:e?.sketchPlane??"XY",visualPushDistance:t}});return o?{status:"available",representation:"exact-extrusion-v1",profile:a,extrusion:o}:Br("exact-extrusion-failed",{source:a.source})}function Ut(e){return new ne(Number(e?.x),Number(e?.y),Number(e?.z))}function sg(e,t,n){return Ut(t).sub(Ut(e)).cross(Ut(n).sub(Ut(e))).length()*.5}function cg(e,t){if(!Array.isArray(e)||e.length<3)return 0;const n=t[e[0]];let i=0;for(let r=1;r<e.length-1;r+=1)i+=sg(n,t[e[r]],t[e[r+1]]);return i}function lg(e){return e.faces.every(t=>cg(t,e.vertices)>Zt)}function ug(e,t,n,i){return e.edges.every(r=>{const a=t.has(r[0]),o=t.has(r[1]);if(a===o)return!0;const s=a?r[0]:r[1],h=a?r[1]:r[0],f=Ut(e.vertices[s]).sub(Ut(e.vertices[h])).dot(n);if(Math.abs(f)<=Zt)return!0;const g=f+i;return f>0?g>Zt:g<-Zt})}function dg(e,t){const n=e.map(r=>t[r]).filter(Boolean);if(n.length<3)return null;const i=Ut(n[0]);for(let r=1;r<n.length-1;r+=1){const a=Ut(n[r]).sub(i).cross(Ut(n[r+1]).sub(i));if(!(a.lengthSq()<=1e-12)&&(a.normalize(),n.every(o=>Math.abs(Ut(o).sub(i).dot(a))<=Zt)))return a}return null}function Qo(e,t){const n={x:Math.abs(t.x),y:Math.abs(t.y),z:Math.abs(t.z)};return e.map(r=>n.x>=n.y&&n.x>=n.z?{x:r.y,y:r.z}:n.y>=n.z?{x:r.x,y:r.z}:{x:r.x,y:r.y}).reduce((r,a)=>({minX:Math.min(r.minX,a.x),minY:Math.min(r.minY,a.y),maxX:Math.max(r.maxX,a.x),maxY:Math.max(r.maxY,a.y)}),{minX:1/0,minY:1/0,maxX:-1/0,maxY:-1/0})}function fg(e,t){return Math.min(e.maxX,t.maxX)-Math.max(e.minX,t.minX)>Zt&&Math.min(e.maxY,t.maxY)-Math.max(e.minY,t.minY)>Zt}function pg(e,t,n,i,r){const a=[...t].map(g=>e.vertices[g]).filter(Boolean);if(a.length<3)return r;const o=Qo(a,i),s=a.reduce((g,p)=>g+Ut(p).dot(i),0)/a.length;let h=1/0,f=-1/0;return e.faces.forEach((g,p)=>{if(n.has(p))return;const l=g.map(P=>e.vertices[P]).filter(Boolean),_=dg(g,e.vertices);if(!_||Math.abs(_.dot(i))<1-1e-7||!fg(o,Qo(l,i)))return;const x=Ut(l[0]).dot(i)-s;x>Zt?h=Math.min(h,x):x<-Zt&&(f=Math.max(f,x))}),r>h?h:r<f?f:r}function hg(e){return $r(e)&&lg(e)}function mg(e,t,n,i={}){const r=ma(t);if(!r)throw new TypeError("La cara seleccionada no tiene una normal valida");if(e.length<3||e.some(l=>![l.x,l.y,l.z].every(Number.isFinite)))throw new TypeError("El perfil de extrusion contiene coordenadas no validas");const a=r.clone().multiplyScalar(n),o=e.length,s=[...e,...e.map(l=>({x:l.x+a.x,y:l.y+a.y,z:l.z+a.z}))],h=Array.from({length:o},(l,_)=>_),f=Array.from({length:o},(l,_)=>o+_),g=n>0?[h.slice().reverse(),f]:[h,f.slice().reverse()],p=[];for(let l=0;l<o;l+=1){const _=(l+1)%o,x=l,P=_,c=o+l,u=o+_;g.push(n>0?[x,P,u,c]:[x,c,u,P]),p.push([x,P],[c,u],[x,c])}return Ii({vertices:s,faces:g,edges:p,metadata:{type:"extrusion",distance:n,normal:{x:r.x,y:r.y,z:r.z},source:i.source??null}})}function Jo(e){const t=(Array.isArray(e)?e:[]).map(n=>({x:Number(n?.x),y:Number(n?.y),z:Number(n?.z)||0}));return t.length<3||t.some(n=>![n.x,n.y,n.z].every(Number.isFinite))?null:t}function _g(e,t,n,i={}){const r=[Jo(e),...(t||[]).map(Jo)];if(r.some(c=>!c))throw new TypeError("El perfil con huecos no es valido");const a=r.flat(),o=a.length,s=r[0].map(c=>new We(c.x,c.y)),h=r.slice(1).map(c=>c.map(u=>new We(u.x,u.y))),f=fa.triangulateShape(s,h).filter(([c,u,y])=>{const R=a[c],S=a[u],T=a[y];return Math.abs((S.x-R.x)*(T.y-R.y)-(S.y-R.y)*(T.x-R.x))>Zt});if(!f.length)throw new RangeError("No se pudo triangular el perfil con huecos");const g=[...a,...a.map(c=>({...c,z:c.z+n}))],p=[],l=[],_=[];f.forEach(c=>{const[u,y,R]=c.map(w=>a[w]),T=(y.x-u.x)*(R.y-u.y)-(y.y-u.y)*(R.x-u.x)>0?[...c]:[c[0],c[2],c[1]],b=[...T].reverse();l.push(p.length),p.push(n>0?b:T),_.push(p.length),p.push((n>0?T:b).map(w=>w+o))});const x=[];let P=0;return r.forEach((c,u)=>{c.forEach((y,R)=>{const S=(R+1)%c.length,T=P+R,b=P+S,w=T+o,m=b+o,A=u===0;p.push(n>0?A?[T,b,m,w]:[w,m,b,T]:A?[T,w,m,b]:[w,T,b,m]),x.push([T,b],[w,m],[T,w])}),P+=c.length}),Ii({vertices:g,faces:p,edges:x,metadata:{type:"extrusion",height:n,source:i.source??null,profileSize:o,profileLoopSizes:r.map(c=>c.length),capFaceGroups:{lower:l,upper:_}}})}function ga(e,t,n={}){const i=wi(t);if(i===null)throw new RangeError("La altura de Push debe ser distinta de cero");const r=!!(e?.workplane&&Array.isArray(e?.localPoints)),a=!r&&Array.isArray(e?.holes)&&e.holes.length>0&&e?.normal,o=r?e.workplane:a?fu(e):null,s=r?e.localPoints:o?e.points.map(c=>rr(c,o)):e?.points,h=r?e.localHoles:o?e.holes.map(c=>c.map(u=>rr(u,o))):e?.holes,f=(Array.isArray(s)?s:[]).map(c=>({x:Number(c.x),y:Number(c.y),z:Number(c.z)||0})),g=n.source??e?.id??null,p=Array.isArray(h)?h:[];let l=p.length?_g(f,p,i,{source:g}):r?Zo(f,i,{source:g}):e?.normal?mg(f,e.normal,i,{source:g}):Zo(f,i,{source:g});o&&(l=pu(l,o,e.sketchId));const _=new Set(e?.cadProfileVertexIndices||[]),x=new Set(e?.smoothProfileVertexIndices||[]);let P=f.length;return p.forEach((c,u)=>{const y=e?.holeCadProfileVertexIndices?.[u]||[],R=e?.holeSmoothProfileVertexIndices?.[u]||[];y.forEach(S=>_.add(P+S)),R.forEach(S=>x.add(P+S)),P+=Array.isArray(c)?c.length:0}),l.metadata={...l.metadata,type:"push",faceId:e?.id??null,height:i,distance:i,sketchPlane:e?.sketchPlane??l.metadata?.sketchPlane??"XY",sketchId:e?.sketchId??l.metadata?.sketchId??null,workplane:e?.workplane??l.metadata?.workplane??null,normal:e?.normal?{...e.normal}:l.metadata?.normal??null,sourceEntity:e?.sourceEntity??null,sourceEntityId:e?.sourceEntity?.id??e?.sourceEntity?.handle??null,sourceFaceType:e?.sourceEntityType??null,sourceSolidFaceIndex:e?.sourceSolidFaceIndex??null,sourceKey:Mn(e),exactGeometry:og(e,i),cadProfileVertexIndices:[..._],smoothProfileVertexIndices:Array.isArray(e?.smoothProfileVertexIndices)?[...e.smoothProfileVertexIndices]:[],smoothVerticalEdgeIndices:[...x]},l}function es(e,t){const n=wi(t),i=e?.sourceSolid,r=e?.sourceSolidFaceIndex,a=ma(e?.normal);if(n===null)throw new RangeError("La distancia de Push debe ser distinta de cero");if(!i||!Number.isInteger(r)||!a)return null;const o=Array.isArray(e?.sourceSolidFaceIndices)&&e.sourceSolidFaceIndices.length?e.sourceSolidFaceIndices:[r];if($s()){const c=Ut(e?.points?.[0]??i.vertices?.[i.faces?.[r]?.[0]]),u=n<0?"subtract":"union",y=u==="subtract"?js(i,n,c,a):n,R=Math.min(...i.vertices.map(m=>Ut(m).sub(c).dot(a))),S=n<0&&n<=R+Zt,T={type:u,distance:n,requestedDistance:n,...y!==n?{kernelDistance:y}:{},through:S,sourceSolidFaceIndex:r,sourceSolidFaceIndices:o,normal:{x:a.x,y:a.y,z:a.z}},b={lastPushFaceIndex:r,lastPushFaceIndices:o,lastPushDistance:n,lastPushRequestedDistance:n,lastPushNormal:T.normal};if(u==="subtract")return Zs(i,e,n,{kernelDistance:y,operation:T,metadata:b});let w=null;try{w=ga(e,y)}catch{return null}return Qs(i,w,{operationType:T.type,operation:T,metadata:b})}const s=o.map(c=>i.faces?.[c]);if(s.some(c=>!Array.isArray(c)||c.length<3))return null;const h=new Set(s.flat()),f=pg(i,h,new Set(o),a,n),g=a.clone().multiplyScalar(f);if(!ug(i,h,a,f))return null;const p=i.vertices.map((c,u)=>h.has(u)?{x:c.x+g.x,y:c.y+g.y,z:c.z+g.z}:{...c}),l=new Map(i.vertices.map((c,u)=>[`${Number(c.x).toFixed(7)}:${Number(c.y).toFixed(7)}:${Number(c.z).toFixed(7)}`,u])),_=c=>{const u=`${Number(c?.x).toFixed(7)}:${Number(c?.y).toFixed(7)}:${Number(c?.z??0).toFixed(7)}`,y=l.get(u);return y!==void 0&&h.has(y)?{...p[y]}:{x:Number(c?.x),y:Number(c?.y),z:Number(c?.z??0)}},x=(i.metadata?.planarFaceGroups??[]).map(c=>({...c,outerLoop:Array.isArray(c?.outerLoop)?c.outerLoop.map(_):c?.outerLoop,innerLoops:Array.isArray(c?.innerLoops)?c.innerLoops.map(u=>u.map(_)):c?.innerLoops})),P=Ii({vertices:p,faces:i.faces,edges:i.edges,metadata:{...i.metadata&&typeof i.metadata=="object"?i.metadata:{},type:i.metadata?.type==="profileFeature"?"profileFeature":"push",planarFaceGroups:x,exactGeometry:wc("face-push-exact-brep-not-implemented",{operation:{type:"pushMoveFace",sourceSolidFaceIndex:r,sourceSolidFaceIndices:o,distance:f,requestedDistance:n,normal:e.normal}}),lastPushFaceIndex:r,lastPushFaceIndices:o,lastPushDistance:f,lastPushRequestedDistance:n,lastPushNormal:{x:e.normal.x,y:e.normal.y,z:e.normal.z}}});return hg(P)?P:null}function gg(e,t={}){const n=cu(e),i=lu(n),r=new uu({color:t.faceColor??t.color??ke.faceColor,depthTest:!0,depthWrite:!0,emissive:526344,emissiveIntensity:.08,metalness:0,opacity:1,polygonOffset:!0,polygonOffsetFactor:2,polygonOffsetUnits:2,roughness:.82,side:zt,transparent:!1,wireframe:!1}),a=new Bt(i,r);return a.name=t.name??`webcad-push-solid-${e.metadata?.faceId??"solid"}`,a.renderOrder=t.renderOrder??18,a.userData={type:"webcad-push-solid",faceId:n.metadata?.faceId??null,height:n.metadata.height,normal:n.metadata.normal,sourceEntity:n.metadata.sourceEntity,sourceEntityId:n.metadata.sourceEntityId,sourceFaceType:n.metadata.sourceFaceType,sourceSolidFaceIndex:n.metadata.sourceSolidFaceIndex,sourceKey:n.metadata.sourceKey,exactGeometry:n.metadata.exactGeometry,cadProfileVertexIndices:n.metadata.cadProfileVertexIndices,smoothProfileVertexIndices:n.metadata.smoothProfileVertexIndices,solid:n},a}function vg(e,t={}){const n=e.userData?.solid,i=du(n),r=new Set(Array.isArray(n?.metadata?.smoothProfileVertexIndices)?n.metadata.smoothProfileVertexIndices:[]),a=new Set(Array.isArray(n?.metadata?.smoothVerticalEdgeIndices)?n.metadata.smoothVerticalEdgeIndices:r),o=new Set(Array.isArray(n?.metadata?.cadProfileVertexIndices)?n.metadata.cadProfileVertexIndices:[]);da(n,[...o]).forEach(u=>{o.delete(u),a.add(u)});const h=e.userData?.sourceFaceType==="CIRCLE",f=n?.metadata?.type==="profileFeature"||Array.isArray(n?.metadata?.profileFeatures),g=!f&&(h||a.size>0)&&t.showVerticalSurfaceEdges!==!0,p=[],l=[],_=[],x=ma(n?.metadata?.normal??{x:0,y:0,z:1}),P=new Map;f&&n.faces.forEach(u=>u.forEach((y,R)=>{const S=u[(R+1)%u.length],T=y<S?`${y}:${S}`:`${S}:${y}`;P.set(T,(P.get(T)??0)+1)}));for(const u of i.entries){const y=Array.isArray(u.sourceEdgeIndices?.[0])?u.sourceEdgeIndices[0]:u.sourceEdgeIndices,R=y?.[0],S=y?.[1],T=u.segment?.start,b=u.segment?.end;if(!T||!b)continue;const w=R<S?`${R}:${S}`:`${S}:${R}`;(P.get(w)??0)>2||g&&(h||a.has(Math.min(R,S))&&!o.has(Math.min(R,S)))&&x&&Ut(b).sub(Ut(T)).normalize().cross(x).lengthSq()<=1e-12||(p.push({start:{x:T.x,y:T.y,z:T.z},end:{x:b.x,y:b.y,z:b.z}}),l.push(u.sourceEdgeIndices??null),_.push(u.curveGroupId??null))}const c=cn(p,{color:t.edgeColor??t.color??ke.edgeColor,depthBias:ke.edgeDepthBias,depthFunc:Jn,depthTest:!0,depthWrite:!1,linewidth:t.edgeLineWidth??ke.edgeLineWidth,polygonOffset:!0,polygonOffsetFactor:ke.edgePolygonOffsetFactor,polygonOffsetUnits:ke.edgePolygonOffsetUnits,renderOrder:t.renderOrder??ke.edgeRenderOrder});return c.name=`${e.name}-edges`,c.userData={type:"webcad-push-solid-edges",faceId:e.userData.faceId,hiddenVerticalSurfaceEdges:g,segmentCount:p.length,sourceSegments:p,sourceEdgeIndices:l,curveGroupIds:_,analyticEdgeGeometry:i.geometry,sourceEntityId:e.userData.sourceEntityId,sourceKey:e.userData.sourceKey,showHiddenEdges:t.showHiddenEdges===!0},c}function xg(e,t={}){const n=e.userData?.solid,i=(n?.metadata?.tangentEdges??[]).flatMap(a=>{const o=n.vertices?.[a.startIndex],s=n.vertices?.[a.endIndex];return o&&s?[{start:{...o},end:{...s}}]:[]}),r=cn(i,{color:t.color??ke.tangentEdgeColor,depthBias:ke.edgeDepthBias,depthFunc:Jn,depthTest:!0,depthWrite:!1,linewidth:t.linewidth??ke.tangentEdgeLineWidth,polygonOffset:!0,polygonOffsetFactor:ke.edgePolygonOffsetFactor,polygonOffsetUnits:ke.edgePolygonOffsetUnits,renderOrder:t.renderOrder??ke.edgeRenderOrder-1});return r.name=`${e.name}-tangent-edges`,r.userData={type:"webcad-push-solid-tangent-edges",segmentCount:i.length,sourceSegments:i},r}function Sg(e,t){if(e?.userData?.type!=="webcad-push-solid-group")return!1;e.userData.showHiddenEdges=t===!0;const n=e.children.find(i=>i.userData?.type==="webcad-push-solid-hidden-edges");return n&&(n.visible=e.userData.showHiddenEdges),!0}function ts(e,t,n={}){return Wn(ga(e,t,n),{...n,name:n.name??`webcad-push-group-${e?.id??"face"}`})}function Wn(e,t={}){const n=new sn;n.name=t.name??`webcad-push-group-${e.metadata?.faceId??"solid"}`;const i=gg(e,t),r=vg(i,{edgeColor:t.edgeColor,edgeLineWidth:t.edgeLineWidth,renderOrder:t.edgeRenderOrder}),a=xg(i,{renderOrder:t.edgeRenderOrder});return n.add(i,r),a.userData.segmentCount>0?n.add(a):_t(a),n.userData={type:"webcad-push-solid-group",faceId:i.userData.faceId,height:i.userData.height,normal:i.userData.normal,sourceEntity:i.userData.sourceEntity,sourceEntityId:i.userData.sourceEntityId,sourceFaceType:i.userData.sourceFaceType,sourceSolidFaceIndex:i.userData.sourceSolidFaceIndex,sourceKey:i.userData.sourceKey,exactGeometry:i.userData.exactGeometry,solid:i.userData.solid,showCurveGeneratrices:!0,showHiddenEdges:t.showHiddenEdges===!0},n}const jn=1e-7;function Wt(e){return{x:Number(e?.x),y:Number(e?.y),z:Number(e?.z)||0}}function ln(e){return`${Math.round(e.x/jn)}:${Math.round(e.y/jn)}:${Math.round(e.z/jn)}`}function hi(e,t){const n=ln(e),i=ln(t);return n<i?`${n}|${i}`:`${i}|${n}`}function ns(e){return e.map(ln).sort().join("|")}function Tt(e){return new ne(e.x,e.y,e.z)}function is(e,t={x:0,y:0,z:1}){const n=Tt(Wt(e));return n.lengthSq()<=1e-12?Wt(t):(n.normalize(),{x:n.x,y:n.y,z:n.z})}function Dn(e,t,n){return{x:e.x+t.x*n,y:e.y+t.y*n,z:e.z+t.z*n}}function Cc(e,t){if(!Array.isArray(e)||!Array.isArray(t)||e.length!==t.length)return!1;const n=new Set(t.map(ln));return e.every(i=>n.has(ln(i)))}function Eg(e,t,n){const i=Tt(n);return(e?.metadata?.planarFaceGroups??[]).filter(r=>{if(r?.kind!=="support-remainder"&&r?.kind!=="opposite-remainder"||!Array.isArray(r.indices)||!Cc(r.outerLoop,t))return!1;const a=Tt(Wt(r.normal));return a.lengthSq()>1e-12&&a.normalize().dot(i)>.99})}function Mg(e){const t=new Set;return e.filter(n=>{if(!Array.isArray(n)||n.length<3)return!1;const i=n.map(ln).sort().join("|");return t.has(i)?!1:(t.add(i),!0)})}function bg(e,t){const n=e.map(i=>t[i]).filter(Boolean);for(let i=1;i<n.length-1;i+=1){const r=Tt(n[i]).sub(Tt(n[0])).cross(Tt(n[i+1]).sub(Tt(n[0])));if(r.lengthSq()>1e-12)return r.normalize(),{x:r.x,y:r.y,z:r.z}}return{x:0,y:0,z:1}}function rs(e,t,n){return Math.min(...e.vertices.map(i=>Tt(i).sub(Tt(t)).dot(Tt(n))))}function Tg(e,t,n,i){const r=Tt(n);return e.faces.reduce((a,o,s)=>{const h=o.map(f=>e.vertices[f]).filter(Boolean);return h.length<3||h.some(f=>Math.abs(Tt(f).sub(Tt(t)).dot(r)-i)>jn)||a.push(s),a},[])}function vi(e,t){const n=rr(e,t);return new We(n.x,n.y)}function Ag(e,t){const n=e.map(i=>vi(i,t));return n.reduce((i,r,a)=>{const o=n[(a+1)%n.length];return i+r.x*o.y-o.x*r.y},0)*.5}function as(e,t){const n=e?.supportSolid,i=(e?.points??[]).map(Wt),r=(e?.holes??[]).map(N=>N.map(Wt)),a=(e?.supportLoops?.outer??[]).map(Wt),o=(e?.supportLoops?.holes??[]).map(N=>N.map(Wt)),s=is(e?.normal),h=jr(e?.workplane??{type:"fixed",origin:i[0],normal:s,xAxis:{x:1,y:0,z:0}});if(!$r(n)||i.length<3||a.length<3||!Number.isFinite(t)||Math.abs(t)<=1e-9)return null;const f=e?.supportContactOnly===!0,g=f||t>0?"union":"subtract";if($s()){const N=rs(n,a[0],s),z=g==="subtract"&&t<=N+jn,ce=g==="subtract"?js(n,t,a[0],s):t,le={type:g,distance:t,requestedDistance:t,...ce!==t?{kernelDistance:ce}:{},through:z,tangentContact:f,sketchId:e.sketchId??null,exactProfile:e.exactProfile??null};if(g==="subtract")return Zs(n,e,t,{kernelDistance:ce,operation:le,metadata:{sourceSolidDocumentId:e.sourceSolidDocumentId??null}});let de=null;try{de=ga(e,ce)}catch{return null}return Qs(n,de,{operationType:le.type,operation:le,metadata:{sourceSolidDocumentId:e.sourceSolidDocumentId??null}})}if(f)return null;const p=Eg(n,a,s),l=Mg([...o,...p.flatMap(N=>N.innerLoops??[])]).map(N=>N.map(Wt)),_=p.length?[...new Set(p.flatMap(N=>N.indices))]:e.sourceSolidFaceIndices??[],x=rs(n,a[0],s),P=t<0&&t<=x+jn,c=P?x:t,u=P?Tg(n,a[0],s,x):[];if(P&&!u.length)return null;const y=n.vertices.map(Wt),R=new Map(y.map((N,z)=>[ln(N),z])),S=N=>{const z=Wt(N),ce=ln(z);return R.has(ce)||(R.set(ce,y.length),y.push(z)),R.get(ce)},T=new Set([..._,...u]),b=new Set,w=new Set;if(t>0){const N=new Map;n.faces.forEach((z,ce)=>{const le=ns(z.map(de=>n.vertices[de]).filter(Boolean));le&&N.set(le,ce)}),[i,...r].forEach((z,ce)=>{const le=z.map(K=>Dn(K,s,c)),de=new Set(ce===0?e.cadProfileVertexIndices??[]:e.holeCadProfileVertexIndices?.[ce-1]??[]);z.forEach((K,re)=>{const me=(re+1)%z.length,Pe=ns([K,z[me],le[me],le[re]]),be=N.get(Pe);be!==void 0&&(T.add(be),b.add(`${ce}:${re}`),w.add(hi(K,z[me])),w.add(hi(le[re],le[me])),de.has(re)||w.add(hi(K,le[re])),de.has(me)||w.add(hi(z[me],le[me])))})})}const m=[],A=[],O=[],L=new Map,V=n.metadata?.faceVertexNormals;n.faces.forEach((N,z)=>{if(T.has(z))return;L.set(z,m.length),m.push([...N]);const ce=V?.[z],le=bg(N,n.vertices);A.push(Array.isArray(ce)&&ce.length===N.length?ce.map(Wt):N.map(()=>({...le})))}),(n.metadata?.planarFaceGroups??[]).forEach(N=>{!Array.isArray(N?.indices)||N.indices.some(z=>!L.has(z))||O.push({...JSON.parse(JSON.stringify(N)),indices:N.indices.map(z=>L.get(z))})});const ae=(n.metadata?.curvedSideFaceIndices??[]).filter(N=>L.has(N)).map(N=>L.get(N)),Q=(n.metadata?.curvedFeatureGeneratrices??[]).filter(N=>L.has(N?.beforeFaceIndex)&&L.has(N?.afterFaceIndex)).map(N=>({...N,beforeFaceIndex:L.get(N.beforeFaceIndex),afterFaceIndex:L.get(N.afterFaceIndex)})),X=(N,z)=>{const[ce,le,de]=N.map(re=>Tt(y[re]));return le.sub(ce).cross(de.sub(ce)).dot(Tt(z))<0?[N[0],N[2],N[1]]:N},Y=(N,z,ce,le)=>{if(N.length<3)return[];const de=N.map(be=>vi(be,h)),K=z.map(be=>be.map(Ve=>vi(Ve,h))),re=[N,...z].flat().map(S),me=fa.triangulateShape(de,K),Pe=[];return me.forEach(be=>{const Ve=X(be.map(Je=>re[Je]),ce);Pe.push(m.length),m.push(Ve),A.push(Ve.map(()=>({...ce})))}),Pe.length&&O.push({indices:Pe,kind:le,normal:{...ce},outerLoop:N.map(Wt),innerLoops:z.map(be=>be.map(Wt))}),Pe},W=Cc(i,a);W?r.forEach(N=>Y(N,[],s,"support-island")):(Y(a,[...l,i],s,"support-remainder"),r.forEach(N=>Y(N,[],s,"support-island")));const ee=i.map(N=>Dn(N,s,c)),ue=r.map(N=>N.map(z=>Dn(z,s,c)));if(P){const N={x:-s.x,y:-s.y,z:-s.z},z=a.map(le=>Dn(le,s,c)),ce=l.map(le=>le.map(de=>Dn(de,s,c)));W?ue.forEach(le=>Y(le,[],N,"opposite-island")):(Y(z,[...ce,ee],N,"opposite-remainder"),ue.forEach(le=>Y(le,[],N,"opposite-island")))}else Y(ee,ue,s,"feature-end");const Re=(N,z)=>{const ce=N.map(Pe=>Dn(Pe,s,c)),le=new Set(z===0?e.smoothProfileVertexIndices??[]:e.holeSmoothProfileVertexIndices?.[z-1]??[]),de=new Set(z===0?e.cadProfileVertexIndices??[]:e.holeCadProfileVertexIndices?.[z-1]??[]),K=[],re=[],me=Ag(N,h);N.forEach((Pe,be)=>{const Ve=(be+1)%N.length,Je=N[Ve],et=[S(Pe),S(Je)],ft=[S(ce[be]),S(ce[Ve])];if(b.has(`${z}:${be}`)){K.push(null),re.push(!1);return}let qe=[et[0],et[1],ft[1],ft[0]];const lt=vi(Pe,h),D=vi(Je,h);let ot=me>=0?{x:D.y-lt.y,y:lt.x-D.x}:{x:lt.y-D.y,y:D.x-lt.x};z>0&&(ot={x:-ot.x,y:-ot.y}),c<0&&(ot={x:-ot.x,y:-ot.y});const Ge=is({x:h.xAxis.x*ot.x+h.yAxis.x*ot.y,y:h.xAxis.y*ot.x+h.yAxis.y*ot.y,z:h.xAxis.z*ot.x+h.yAxis.z*ot.y});X([qe[0],qe[1],qe[2]],Ge)[1]!==qe[1]&&(qe=[qe[0],qe[3],qe[2],qe[1]]);const d=m.length;m.push(qe),K.push(d);const U=le.has(be)&&le.has(Ve)||!(de.has(be)&&de.has(Ve));if(re.push(U),U){ae.push(d);const G=oe=>{const pe=N[(oe-1+N.length)%N.length],q=N[oe],J=N[(oe+1)%N.length],he=Tt(q).sub(Tt(pe)).normalize(),Le=Tt(J).sub(Tt(q)).normalize();let fe=he.cross(Tt(s)).add(Le.cross(Tt(s)));return z>0&&fe.multiplyScalar(-1),c<0&&fe.multiplyScalar(-1),fe.normalize(),{x:fe.x,y:fe.y,z:fe.z}},$=new Map([[et[0],G(be)],[ft[0],G(be)],[et[1],G(Ve)],[ft[1],G(Ve)]]);A.push(qe.map(oe=>$.get(oe)??Ge))}else A.push(qe.map(()=>({...Ge})))}),N.forEach((Pe,be)=>{const Ve=(be-1+N.length)%N.length;!re[Ve]||!re[be]||Q.push({startIndex:S(Pe),endIndex:S(ce[be]),beforeFaceIndex:K[Ve],afterFaceIndex:K[be]})})};[i,...r].forEach(Re);const ge=[],Me=new Set,Xe=(N,z)=>{const ce=S(N),le=S(z);if(ce===le)return;const de=ce<le?`${ce}:${le}`:`${le}:${ce}`;Me.has(de)||(Me.add(de),ge.push(ce<le?[ce,le]:[le,ce]))},it=new Set(a.flatMap((N,z)=>{const ce=a[(z+1)%a.length],le=ln(N),de=ln(ce);return[le<de?`${le}|${de}`:`${de}|${le}`]}));n.edges.forEach(([N,z])=>{const ce=n.vertices[N],le=n.vertices[z],de=hi(ce,le);w.has(de)||W&&it.has(de)||Xe(ce,le)}),[i,...r].forEach((N,z)=>{const ce=N.map(de=>Dn(de,s,c));N.forEach((de,K)=>{const re=N[(K+1)%N.length],me=b.has(`${z}:${K}`);!me&&(!W||z>0)&&Xe(de,re),me||Xe(ce[K],ce[(K+1)%N.length])}),(z===0?e.cadProfileVertexIndices??[]:e.holeCadProfileVertexIndices?.[z-1]??[]).forEach(de=>Xe(N[de],ce[de]))});const Ye={type:t>0?"union":"subtract",distance:c,requestedDistance:t,through:P,sketchId:e.sketchId??null,exactProfile:e.exactProfile??null},j=Ii({vertices:y,faces:m,edges:ge,metadata:{...n.metadata??{},type:"profileFeature",booleanOperation:t>0?"union":"subtract",capFaceGroups:null,faceVertexNormals:A,planarFaceGroups:O,curvedSideFaceIndices:ae,curvedFeatureGeneratrices:Q,profileFeatures:[...n.metadata?.profileFeatures??[],Ye],sourceSolidDocumentId:e.sourceSolidDocumentId??null,exactGeometry:{status:"pending",reason:"profile-feature-exact-brep-not-implemented",operations:[...n.metadata?.exactGeometry?.operations??[],Ye]}}});return $r(j)?j:null}const yg=/^[0-9eE+\-*/().,\s]$/;function Pg(e,t,n,i,r){const a=n?.target||new ne,o=t.position.distanceTo(a),s=2*Math.max(1,o)*Math.tan(Pn.degToRad(t.fov||36)/2),h=Math.max(1,i().height||1),f=(r-e.clientY)*(s/h);return Math.abs(f)>1e-9?f:f<0?-.1:.1}function Dc(e){const t=Array.isArray(e?.points)?e.points:[];return t.length?t.reduce((n,i)=>n.add(new ne(Number(i.x),Number(i.y),Number(i.z)||0)),new ne).multiplyScalar(1/t.length):null}function os(e,t){const n=Dc(e),i=e?.normal??{x:0,y:0,z:1},r=new ne(Number(i.x),Number(i.y),Number(i.z));if(!n||r.lengthSq()<=1e-12||!Number.isFinite(Number(t?.x))||!Number.isFinite(Number(t?.y))||!Number.isFinite(Number(t?.z)))return null;r.normalize();const a=new ne(Number(t.x),Number(t.y),Number(t.z)).sub(n).dot(r);return Math.abs(a)>1e-9?a:null}function Rg(e,t,n,i,r,a){if(!a||!r?.normal)return null;const o=Dc(r),s=new ne(Number(r.normal.x),Number(r.normal.y),Number(r.normal.z));if(!o||s.lengthSq()<=1e-12)return null;s.normalize();const h=t.position.distanceTo(n?.target||o),f=o.clone().addScaledVector(s,Math.max(h*.12,1)),g=o.clone().project(t),p=f.project(t),l=Math.max(1,i().width||1),_=Math.max(1,i().height||1),x=new We((p.x-g.x)*l*.5,-(p.y-g.y)*_*.5);x.lengthSq()<64?x.set(0,-1):x.normalize();const c=new We(e.clientX-a.x,e.clientY-a.y).dot(x),y=2*Math.max(1,h)*Math.tan(Pn.degToRad(t.fov||36)/2)/_,R=c*y;return Math.abs(R)>1e-9?R:R<0?-.1:.1}function ss(e){return wi(mu(String(e).replace(",",".")))}function wg(e){const t=e?.userData?.pushStartPointer,n=Number(t?.x),i=Number(t?.y);return Number.isFinite(n)&&Number.isFinite(i)?{x:n,y:i}:null}function Cg({camera:e,canvas:t,controls:n,getSelectedFace:i,getObjectSnap:r=null,onObjectSnap:a=null,onStatus:o=null,onConsumeFace:s=null,render:h=null,scene:f,viewport:g}){const p=new sn;p.name="webcad-3d-push-solids",f.add(p);let l=!1,_=null,x="",P=null,c=0,u=null,y=1,R=null,S=!1,T=null;const b=new We,w=new dr;function m(K){o?.(K)}function A(K){T=K||null,a?.(T)}function O(K){return K?{endpoint:"Punto",midpoint:"Punto medio",center:"Centro",faceCenter:"Centro de cara",surface:"Cara"}[K.type]??"Punto":""}function L(K,re){return os(K,re?.point)}function V(K){return K===null?null:K<0?K:Math.abs(K)*(y<0?-1:1)}function ae(K){const re=r?.(K,_?.userData?.face)??null,me=L(_?.userData?.face,re);return A(me===null?null:re),me}function Q(K){p.children.forEach(re=>Sg(re,K)),h?.()}function X(){P&&(f.remove(P),_t(P),P=null)}function Y(K){_&&(_.visible=K)}function W(){const K=_?.userData?.face;return K?.sourceSolidGroup??K?.supportSolidGroup??null}function ee(K){const re=W();re&&(re.visible=K)}function ue(K,re,me){const Pe=es(K,re);return Pe?Wn(Pe,me):null}function Re(K,re,me){const Pe=as(K,re);return Pe?Wn(Pe,me):null}function ge(K){const re=wi(K);if(!l||!_?.userData?.face||re===null)return;y=re,X();const me=_.userData.face,Pe={edgeColor:ke.edgeColor,edgeLineWidth:ke.edgeLineWidth,faceColor:ke.previewFaceColor,name:"webcad-push-preview",renderOrder:24};if(P=me.sourceSolid?ue(me,y,Pe):me.supportSolid?Re(me,y,Pe):ts(me,y,Pe),!P){ee(!0),m(`Push no valido · sin material suficiente (${di(y)})`),h?.();return}const be=Number(P.userData?.solid?.metadata?.lastPushDistance);me.sourceSolid&&Number.isFinite(be)&&(y=be),ee(!1),P.userData.preview=!0;const Ve=P.userData?.solid?.metadata?.profileFeatures?.at?.(-1);P.userData.pushThrough=Ve?.through===!0,f.add(P);const Je=P.userData.pushThrough?" · Hueco pasante":"";m(x?`Push: ${x} (${di(y)})${T?` · OSNAP ${O(T)}`:""}${Je}`:`Push: ${di(y)}${T?` · OSNAP ${O(T)}`:""}${Je} · escriba distancia o clic para confirmar`),h?.()}function Me(K,re){if(!p.children.length)return null;const me=t.getBoundingClientRect();b.x=(K.clientX-me.left)/Math.max(1,me.width)*2-1,b.y=-((K.clientY-me.top)/Math.max(1,me.height)*2-1),w.setFromCamera(b,e);const be=w.intersectObjects(p.children,!0).filter(et=>et?.point&&et?.object?.userData?.type==="webcad-push-solid").map(et=>({hit:et,height:os(re,et.point)})).find(et=>et.height!==null);if(!be)return null;const{hit:Ve,height:Je}=be;return{height:Je,snap:{type:"surface",point:{x:Ve.point.x,y:Ve.point.y,z:Ve.point.z},documentSolidId:Ve.object?.userData?.documentSolidId??Ve.object?.parent?.userData?.documentSolidId??null}}}function Xe(K,re,me={}){const Pe=ts(K,re,{edgeColor:ke.edgeColor,edgeLineWidth:ke.edgeLineWidth,faceColor:me.faceColor??ke.faceColor,name:me.name??`webcad-push-solid-${K?.id??"face"}`,renderOrder:20});return p.add(Pe),h?.(),Pe}function it(K,re){const me=typeof re=="string"?re:re?.id;return!K||!me||(K.userData={...K.userData??{},documentSolidId:me},K.traverse?.(Pe=>{Pe.userData={...Pe.userData??{},documentSolidId:me}})),K}function Ye(){return l?(l=!1,x="",ee(!0),Y(!0),_=null,u=null,R=null,S=!1,A(null),X(),m("Push cancelado"),h?.(),!0):!1}function j(){if(!l||!_?.userData?.face||wi(y)===null)return!1;X();const K=_.userData.face;let re=null,me=!1;if(K.supportSolid){const Pe=as(K,y);if(!Pe)return ee(!0),m("Push no valido · no se pudo actualizar el solido soporte"),h?.(),!1;me=Pe.metadata?.profileFeatures?.at?.(-1)?.through===!0;const be=W();be&&(p.remove(be),_t(be)),re=Wn(Pe,{edgeColor:ke.edgeColor,edgeLineWidth:ke.edgeLineWidth,faceColor:ke.faceColor,name:`webcad-push-solid-${_.userData.faceId}`,renderOrder:20}),p.add(re)}else if(K.sourceSolid){const Pe=es(K,y);if(!Pe)return ee(!0),m("Push no valido · sin material suficiente"),h?.(),!1;y=Number(Pe.metadata?.lastPushDistance)||y;const be=W();be&&(p.remove(be),_t(be)),re=Wn(Pe,{edgeColor:ke.edgeColor,edgeLineWidth:ke.edgeLineWidth,faceColor:ke.faceColor,name:`webcad-push-solid-${_.userData.faceId}`,renderOrder:20}),p.add(re)}else re=Xe(K,y,{name:`webcad-push-solid-${_.userData.faceId}`});return Y(!1),s?.(_,re,{height:y,sourceKey:Mn(K)}),l=!1,x="",_=null,u=null,R=null,S=!1,A(null),m(me?`Push creado · hueco pasante (${di(y)})`:`Push creado · altura ${di(y)}`),h?.(),!0}function N(){const K=i?.();return K?.userData?.face?(Ye(),l=!0,_=K,Y(!1),x="",y=1,u=wg(_),c=u?.y??0,t?.focus?.({preventScroll:!0}),ee(!1),ge(y),m("Push activo · mueva el cursor, escriba altura y confirme con clic o Enter"),!0):(m("Seleccione un recinto cerrado antes de usar Push"),!1)}function z(K){if(!l||(c||(c=K.clientY),u||(u={x:K.clientX,y:K.clientY}),R&&Math.hypot(K.clientX-R.x,K.clientY-R.y)>4&&(S=!0),x))return;const re=ae(K);if(re!==null){ge(re);return}const me=Me(K,_?.userData?.face);if(me){A(me.snap),ge(me.height);return}ge(Rg(K,e,n,g,_?.userData?.face,u)??Pg(K,e,n,g,c))}function ce(K){l&&(c||(c=K.clientY),u||(u={x:K.clientX,y:K.clientY}),R={x:K.clientX,y:K.clientY},S=!1)}function le(K){if(l){if(K.preventDefault(),K.stopImmediatePropagation(),S){R=null,S=!1;return}if(R=null,!x){const re=ae(K);if(re!==null)ge(re);else{const me=Me(K,_?.userData?.face);me&&(A(me.snap),ge(me.height))}}j()}}function de(K){if(l){if(K.key==="Escape"){K.preventDefault(),Ye();return}if(K.key==="Enter"){K.preventDefault(),j();return}if(K.key==="Backspace"){K.preventDefault(),x=x.slice(0,-1);const re=x?V(ss(x)):null;re!==null?ge(re):m(x?`Push: ${x}`:"Push: mueva el cursor o escriba altura");return}if(K.key.length===1&&yg.test(K.key)){K.preventDefault(),x+=K.key;const re=V(ss(x));re!==null?ge(re):m(`Push: ${x}`)}}}return t?.addEventListener?.("pointermove",z),t?.addEventListener?.("pointerdown",ce,!0),t?.addEventListener?.("click",le,!0),t?.addEventListener?.("keydown",de),{cancel:Ye,addDocumentSolid(K){if(!K?.solid||K.visible===!1)return null;const re=Wn(K.solid,{edgeColor:ke.edgeColor,edgeLineWidth:ke.edgeLineWidth,faceColor:ke.faceColor,name:`webcad-push-document-${K.id}`,renderOrder:20});return it(re,K),p.add(re),h?.(),re},addSessionSolid(K,re){return Xe(K,re,{name:`webcad-push-session-${K?.id??"face"}`})},clearSolids(){X(),p.children.slice().forEach(K=>{p.remove(K),_t(K)}),h?.()},setHiddenEdges:Q,confirm:j,dispose(){t?.removeEventListener?.("pointermove",z),t?.removeEventListener?.("pointerdown",ce,!0),t?.removeEventListener?.("click",le,!0),t?.removeEventListener?.("keydown",de),Ye(),f.remove(p),_t(p)},getHeight:()=>y,getSolidObjects:()=>p.children,isActive:()=>l,start:N,tagDocumentSolidGroup:it}}const Ci=1e-9,Lc=10,Dg=10;function En(e){return new ne(Number(e?.x)||0,Number(e?.y)||0,Number(e?.z)||0)}function cs(e){const t=r=>[r.x,r.y,r.z].map(a=>Number(a).toFixed(7)).join(":"),n=t(e.start),i=t(e.end);return n<i?`${n}|${i}`:`${i}|${n}`}function Lg(e,t,n){const i=new We().subVectors(n,t),r=i.lengthSq();if(r<=Ci)return{distance:e.distanceTo(t),parameter:0};const a=Pn.clamp(new We().subVectors(e,t).dot(i)/r,0,1),o=t.clone().addScaledVector(i,a);return{distance:e.distanceTo(o),parameter:a}}function Ig(e,t){if(e?.isOrthographicCamera){const a=new ne;e.getWorldDirection(a).normalize();const o=new ne;e.getWorldPosition(o);const s=Math.max(Ci,t.clone().sub(o).dot(a));return{direction:a,origin:t.clone().addScaledVector(a,-s),targetDistance:s}}const n=new ne;e.getWorldPosition(n);const i=t.clone().sub(n),r=i.length();return r>Ci&&i.multiplyScalar(1/r),{direction:i,origin:n,targetDistance:r}}function Ic(e,t,n,i){const r=Ig(n,i);if(r.targetDistance<=Ci)return!0;const a=Math.max(1e-6,r.targetDistance*1e-5);e.set(r.origin,r.direction),e.near=0,e.far=r.targetDistance+a;const o=e.intersectObjects(t,!1)[0];return!o||o.distance>=r.targetDistance-a}function Ng(e){const t=Math.round(Number(e));return Number.isFinite(t)?Pn.clamp(t,1,32):Lc}function Ug(e,t,n,i,r,a){if(!e?.isMesh||!t)return{hidden:[],visible:[n]};const o=En(n.start),s=En(n.end),h=o.clone().applyMatrix4(e.matrixWorld),f=s.clone().applyMatrix4(e.matrixWorld),g=u=>Ic(r,i,t,h.clone().lerp(f,u)),p=(u,y,R)=>{let S=u,T=y;for(let b=0;b<Dg;b+=1){const w=(S+T)*.5;g(w)===R?S=w:T=w}return(S+T)*.5},l=Array.from({length:a},(u,y)=>{const R=(y+.5)/a;return g(R)}),_={hidden:[],visible:[]};let x=0,P=l[0];const c=u=>{if(u-x<=Ci)return;const y=o.clone().lerp(s,x),R=o.clone().lerp(s,u);_[P?"visible":"hidden"].push({start:{x:y.x,y:y.y,z:y.z},end:{x:R.x,y:R.y,z:R.z}})};for(let u=1;u<l.length;u+=1){if(l[u]===P)continue;const y=p((u-.5)/a,(u+.5)/a,P);c(y),x=y,P=l[u]}return c(1),_}function ls({camera:e,mesh:t,occluders:n=null,segments:i=[],sourceEdgeIndices:r=[],curveGroupIds:a=[],visibilitySamples:o=Lc}={}){if(!t?.isMesh||!e)return{hidden:[],visible:[]};t.updateWorldMatrix(!0,!1),e.updateWorldMatrix(!0,!1);const s=new dr,h=(Array.isArray(n)&&n.length?n:[t]).filter(p=>p?.isMesh&&p.visible!==!1),f=Ng(o);h.forEach(p=>p.updateWorldMatrix(!0,!1));const g={hidden:[],visible:[]};return i.forEach((p,l)=>{if(!p?.start||!p?.end)return;const _=Ug(t,e,p,h,s,f);["visible","hidden"].forEach(x=>{_[x].forEach(P=>g[x].push({measurementSegment:p,segment:P,sourceEdgeIndices:r[l]??null,curveGroupId:a[l]??null}))})}),g}function Fg(e,t){const n=e.children?.find(o=>o.userData?.type==="webcad-push-visible-edge-overlay"),i=e.children?.find(o=>o.userData?.type==="webcad-push-solid-edges"),r=e.children?.find(o=>o.userData?.type==="webcad-push-solid-tangent-edges"),a=e.children?.find(o=>o.userData?.type==="webcad-push-generatrix-silhouette");return[t?i:n,r,a?.visible===!1?null:a].filter(Boolean)}function Og(e,t,n,i,r={}){const a=Math.max(1,Number(i?.width)||1),o=Math.max(1,Number(i?.height)||1),s=Math.max(1,Number(r.maxDistancePixels)||5),h=r.includeHidden===!0,f=new We((n.x+1)*a*.5,(1-n.y)*o*.5),g=new ne;t.getWorldPosition(g);const p=[];h||(Array.isArray(e)?e:[]).forEach(P=>{P?.traverse?.(c=>{c?.isMesh&&c.visible!==!1&&c.userData?.type==="webcad-push-solid"&&(c.updateWorldMatrix(!0,!1),p.push(c))})});const l=p.length?new dr:null,_=new Set;let x=null;return(Array.isArray(e)?e:[]).forEach(P=>{Fg(P,h).forEach(c=>{c.updateWorldMatrix(!0,!1);const u=c.userData?.sourceSegments??[],y=c.userData?.measurementSegments??u,R=c.userData?.sourceEdgeIndices??[],S=c.userData?.curveGroupIds??[];u.forEach((T,b)=>{if(!T?.start||!T?.end)return;const w=`${P.userData?.documentSolidId??P.uuid}:${cs(T)}`;if(_.has(w))return;_.add(w);const m=En(T.start).applyMatrix4(c.matrixWorld),A=En(T.end).applyMatrix4(c.matrixWorld),O=m.clone().project(t),L=A.clone().project(t);if(O.z<-1&&L.z<-1||O.z>1&&L.z>1)return;const V=new We((O.x+1)*a*.5,(1-O.y)*o*.5),ae=new We((L.x+1)*a*.5,(1-L.y)*o*.5),Q=Lg(f,V,ae);if(Q.distance>s)return;const X=m.clone().lerp(A,Q.parameter);if(l&&!Ic(l,p,t,X))return;const Y=g.distanceTo(X);if(x&&(Q.distance>x.screenDistance+.25||Math.abs(Q.distance-x.screenDistance)<=.25&&Y>=x.cameraDistance))return;const W=S[b]??null,ee=W===null?[y[b]??T]:y.filter((ge,Me)=>S[Me]===W&&ge?.start&&ge?.end),ue=[],Re=new Set;ee.forEach(ge=>{const Me=En(ge.start).applyMatrix4(c.matrixWorld),Xe=En(ge.end).applyMatrix4(c.matrixWorld),it={start:{x:Me.x,y:Me.y,z:Me.z},end:{x:Xe.x,y:Xe.y,z:Xe.z}},Ye=cs(it);Re.has(Ye)||(Re.add(Ye),ue.push(it))}),x={cameraDistance:Y,curveGroupId:W,documentSolidId:P.userData?.documentSolidId??null,end:{x:A.x,y:A.y,z:A.z},key:W===null?w:`${P.userData?.documentSolidId??P.uuid}:curve:${W}`,length:ue.reduce((ge,Me)=>ge+En(Me.start).distanceTo(En(Me.end)),0),screenDistance:Q.distance,segments:ue,sourceEdgeIndices:R[b]??null,start:{x:m.x,y:m.y,z:m.z}}})})}),x}const Bg=new Set(["circle","arc-circle","ellipse","arc-ellipse"]);function Ui(e){const t=Number(e?.x),n=Number(e?.y),i=Number(e?.z??0);return Number.isFinite(t)&&Number.isFinite(n)&&Number.isFinite(i)?{x:t,y:n,z:i}:null}function Gg(e,t){return{x:(e.x+t.x)*.5,y:(e.y+t.y)*.5,z:(e.z+t.z)*.5}}function Di(e,t,n,i,r){const a=Ui(i);if(!a)return;const o=`${n}:${a.x.toFixed(8)}:${a.y.toFixed(8)}:${a.z.toFixed(8)}`;t.has(o)||(t.add(o),e.push({type:n,point:a,documentSolidId:r??null}))}function Hg(e){const t=e?.metadata?.exactGeometry;return t?.profile??t?.extrusion?.profile??null}function Vg(e){const t=e?.metadata?.exactGeometry?.extrusion,n=Ui(t?.offset);if(n)return n;const i=Number(e?.metadata?.distance??e?.metadata?.height);if(!Number.isFinite(i))return null;const r=Js(e?.metadata?.sketchPlane).normal;return{x:r.x*i,y:r.y*i,z:r.z*i}}function zg(e,t,n,i){const r=Hg(n);if(!r)return;const a=Vg(n),o=n?.metadata?.sketchPlane??"XY";[r.outerLoop,...r.innerLoops||[]].forEach(h=>{(h?.segments||[]).forEach(f=>{if(!Bg.has(f?.type))return;const g=Ui(f.center);if(!g)return;const p=_u(g,o);Di(e,t,"center",p,i),a&&Di(e,t,"center",{x:p.x+a.x,y:p.y+a.y,z:p.z+a.z},i)})})}function kg(e,t,n,i){const r=Array.isArray(n?.vertices)?n.vertices.map(Ui):[];(n?.faces||[]).forEach(a=>{const o=(a||[]).map(h=>r[h]).filter(Boolean);if(o.length<3)return;const s=o.reduce((h,f)=>({x:h.x+f.x,y:h.y+f.y,z:h.z+f.z}),{x:0,y:0,z:0});Di(e,t,"faceCenter",{x:s.x/o.length,y:s.y/o.length,z:s.z/o.length},i)})}function Wg(e,t){const n=[],i=new Set,r=Array.isArray(e?.vertices)?e.vertices.map(Ui):[];return r.forEach(a=>Di(n,i,"endpoint",a,t)),(e?.edges||[]).forEach(([a,o])=>{const s=r[a],h=r[o];s&&h&&Di(n,i,"midpoint",Gg(s,h),t)}),zg(n,i,e,t),kg(n,i,e,t),n}function Xg(e){const t=[],n=new Set;return(e||[]).forEach(i=>{i?.traverse?.(r=>{const a=r?.userData?.solid;!a||n.has(a)||(n.add(a),t.push(...Wg(a,r.userData?.documentSolidId)))})}),t}function Yg({camera:e,canvas:t,event:n,solidObjects:i,maxDistancePixels:r=14,acceptCandidate:a=null}={}){if(!e||!t||!n)return null;const o=t.getBoundingClientRect(),s=Math.max(1,o.width),h=Math.max(1,o.height);let f=null;return Xg(i).forEach(g=>{if(a&&!a(g))return;const p=new ne(g.point.x,g.point.y,g.point.z).project(e);if(p.z<-1||p.z>1)return;const l=o.left+(p.x+1)*s*.5,_=o.top+(1-p.y)*h*.5,x=Math.hypot(n.clientX-l,n.clientY-_),P=e.position.distanceTo(new ne(g.point.x,g.point.y,g.point.z)),c=f&&Math.abs(x-f.distancePixels)<=.25;x>r||f&&x>f.distancePixels+.25||c&&P>=f.cameraDistance||(f={...g,distancePixels:x,cameraDistance:P})}),f}const Nc=64,Kg=8,us=16250866,qg=14149887;function va(e,t=!0){const n=Number(e?.x),i=Number(e?.y);return!Number.isFinite(n)||!Number.isFinite(i)?null:{x:n,y:t?-i:i,z:0}}function sr(e,t,n){return Math.hypot(e.x-t.x,e.y-t.y)<=n}function Uc(e){let t=0;for(let n=0;n<e.length;n+=1){const i=e[n],r=e[(n+1)%e.length];t+=i.x*r.y-r.x*i.y}return Math.abs(t)*.5}function Fc(e){return e.reduce((t,n)=>({minX:Math.min(t.minX,n.x),minY:Math.min(t.minY,n.y),maxX:Math.max(t.maxX,n.x),maxY:Math.max(t.maxY,n.y)}),{minX:1/0,minY:1/0,maxX:-1/0,maxY:-1/0})}function $g(e,t){let n=!1;for(let i=0,r=t.length-1;i<t.length;r=i++){const a=t[i],o=t[r];a.y>e.y!=o.y>e.y&&e.x<(o.x-a.x)*(e.y-a.y)/(o.y-a.y)+a.x&&(n=!n)}return n}function jg(e,t,n){const i=n.x-t.x,r=n.y-t.y,a=i*i+r*r;if(a<=Number.EPSILON)return Math.hypot(e.x-t.x,e.y-t.y);const o=Math.max(0,Math.min(1,((e.x-t.x)*i+(e.y-t.y)*r)/a));return Math.hypot(e.x-(t.x+i*o),e.y-(t.y+r*o))}function Zg(e,t,n){return e.points.some(i=>t.points.some((r,a)=>jg(i,r,t.points[(a+1)%t.points.length])<=n))}function Qg(e,t,n){if(e===t||e.area<=t.area)return!1;const i=new Set(e.sourceEntities||[e.sourceEntity].filter(Boolean));return(t.sourceEntities||[t.sourceEntity].filter(Boolean)).some(a=>i.has(a))||Zg(e,t,n)?!1:t.points.every(a=>$g(a,e.points))}function Jg(e,t){const n=new Map;return e.forEach(i=>{const r=e.filter(a=>Qg(a,i,t));n.set(i,r.sort((a,o)=>a.area-o.area)[0]||null)}),e.map(i=>{const r=e.filter(s=>n.get(s)===i),a=r.map(s=>s.exactProfile).filter(Boolean),o=i.exactProfile&&a.length?q_(i.exactProfile,a,{id:i.id}):i.exactProfile;return{...i,exactProfile:o,holes:r.map(s=>s.points),holeCadProfileVertexIndices:r.map(s=>s.cadProfileVertexIndices||[]),holeSmoothProfileVertexIndices:r.map(s=>s.smoothProfileVertexIndices||[]),area:Math.max(0,i.area-r.reduce((s,h)=>s+h.area,0)),sourceEntities:[...new Set([...i.sourceEntities||[i.sourceEntity],...r.flatMap(s=>s.sourceEntities||[s.sourceEntity])].filter(Boolean))]}}).filter(i=>i.area>0&&i.exactProfile)}function ev(e,t){return`face-${e?.id??e?.handle??`${e?.type??"ENTITY"}-${t}`}`}function tv(e,t){const n=va(e?.center,t.invertY),i=Number(e?.radius);if(!n||!Number.isFinite(i)||i<=t.tolerance)return null;const r=Math.max(16,Number(t.circleSegments)||Nc),a=Array.from({length:r},(o,s)=>{const h=fn*s/r;return{x:n.x+Math.cos(h)*i,y:n.y+(t.invertY?-Math.sin(h):Math.sin(h))*i,z:0}});return{points:a,cadProfileVertexIndices:[],smoothProfileVertexIndices:a.map((o,s)=>s)}}function nv(e,t){const n=fc(e,{...t,curveSegments:Math.max(16,Number(t.ellipseSegments)||Nc)});if(n.length<4)return null;const i=n.slice(0,-1).map(r=>va(r,t.invertY));return i.some(r=>!r)?null:{points:i,cadProfileVertexIndices:[],smoothProfileVertexIndices:i.map((r,a)=>a)}}function iv(e,t){if(!Array.isArray(e?.vertices)||e.vertices.length<2)return[];const n=sr(e.vertices[0],e.vertices[e.vertices.length-1],t),i=n?e.vertices.slice(0,-1):e.vertices,r=e.closed||n?i.length:Math.min(e.segments?.length??i.length-1,i.length-1);return Array.from({length:r},(a,o)=>{const s=i[o],h=i[(o+1)%i.length],f=e.segments?.[o]||{type:"LINE"};return!s||!h?null:f.type!=="ARC"||!f.center?{type:"LINE",start:s,end:h,sourceEntity:e}:{type:"ARC",center:f.center,radius:Math.hypot(s.x-f.center.x,s.y-f.center.y),startAngle:lo(f.center,s),endAngle:lo(f.center,h),clockwise:f.clockwise!==!1,sourceEntity:e}}).filter(a=>a&&Number.isFinite(a.radius??1))}function rv(e,t){const n=e.flatMap(i=>i?.type==="POLYLINE"?iv(i,t):i?.type==="LINE"||i?.type==="ARC"||i?.type==="CIRCLE"||i?.type==="ELLIPSE"||i?.type==="ELLIPSE_ARC"?[{...i,sourceEntity:i}]:[]);return n.filter(i=>i.type!=="CIRCLE"&&i.type!=="ELLIPSE"?!0:n.some(r=>r!==i&&ec(i,r,()=>[]).length>0))}function ds(e,t){return e.type==="LINE"?Au(e,t):tc(e)?yu(e,t):Pu(e,t)}function Li(e,t){return e.type==="LINE"?Ru(e,t):tc(e)?wu(e,Cu(e,t)):Du(e,t)}function fs(e,t,n){const i=t.end.x-t.start.x,r=t.end.y-t.start.y,a=i*i+r*r;if(a<=n*n)return!1;const o=Math.sqrt(a);if(Math.abs((e.x-t.start.x)*r-(e.y-t.start.y)*i)/o>n)return!1;const h=((e.x-t.start.x)*i+(e.y-t.start.y)*r)/a,f=n/o;return h>=-f&&h<=1+f}function av(e,t,n){if(e?.type!=="LINE"||t?.type!=="LINE")return[];const i=[e.start,e.end,t.start,t.end];return i.filter((r,a)=>fs(r,e,n)&&fs(r,t,n)&&i.findIndex(o=>sr(o,r,n))===a)}function ov(e,t){const i=e.outgoing.filter(o=>o.active).reduce((o,s)=>Math.min(o,Math.hypot(s.to.point.x-e.point.x,s.to.point.y-e.point.y)),1/0),r=Number.isFinite(i)?Math.max(t,i*.25):t,a=o=>{const s=Math.hypot(o.to.point.x-e.point.x,o.to.point.y-e.point.y);if(s<=t)return Math.atan2(o.to.point.y-e.point.y,o.to.point.x-e.point.x);const h=Math.min(.25,r/s),f=o.startParameter+(o.endParameter-o.startParameter)*h,g=Li(o.entity,f)||o.to.point;return Math.atan2(g.y-e.point.y,g.x-e.point.x)};e.outgoing.sort((o,s)=>a(o)-a(s))}function ps(e,t){const i=(e.endParameter-e.startParameter)*1e-4,r=t?e.endParameter:e.startParameter,a=t?r-i:r+i,o=Li(e.entity,r),s=Li(e.entity,a);if(!o||!s)return null;const h=t?o.x-s.x:s.x-o.x,f=t?o.y-s.y:s.y-o.y,g=Math.hypot(h,f);return g>1e-12?{x:h/g,y:f/g}:null}function sv(e,t){const n=ps(e,!0),i=ps(t,!1);if(!n||!i)return!1;const r=n.x*i.x+n.y*i.y,a=n.x*i.y-n.y*i.x;return Math.abs(r)>=1-1e-6&&Math.abs(a)<=.001}function cv(e,t){const n=rv(e,t.tolerance);if(!n.length)return[];const i=new Map(n.map(p=>[p,p.type==="CIRCLE"||p.type==="ELLIPSE"?[0,.25,.5,.75,1]:[0,1]]));for(let p=0;p<n.length;p+=1)for(let l=p+1;l<n.length;l+=1){const _=n[p],x=n[l],P=[...ec(_,x,()=>[]),...av(_,x,t.tolerance)];for(const c of P)i.get(_).push(ds(_,c)),i.get(x).push(ds(x,c))}const r=[],a=p=>{const l=r.find(x=>sr(x.point,p,t.tolerance));if(l)return l;const _={point:{...p},outgoing:[],id:r.length+1};return r.push(_),_},o=[],s=new Set,h=(p,l,_)=>{const x=Li(p,l),P=Li(p,_);if(!x||!P||sr(x,P,t.tolerance))return;const c=a(x),u=a(P);if(p.type==="LINE"){const S=c.id<u.id?`${c.id}:${u.id}`:`${u.id}:${c.id}`;if(s.has(S))return;s.add(S)}const y={from:c,to:u,entity:p,startParameter:l,endParameter:_,twin:null,active:!0,visited:!1},R={from:u,to:c,entity:p,startParameter:_,endParameter:l,twin:y,active:!0,visited:!1};y.twin=R,c.outgoing.push(y),u.outgoing.push(R),o.push(y,R)};n.forEach(p=>{const l=Eu(i.get(p));for(let _=0;_<l.length-1;_+=1){const x=l[_],P=l[_+1],c=p.type==="CIRCLE"||p.type==="ELLIPSE"?fn:p.type==="ARC"?Mu(p):p.type==="ELLIPSE_ARC"?bu(p):0,u=Math.max(1,Math.ceil(c*(P-x)/(Math.PI/48)));for(let y=0;y<u;y+=1)h(p,x+(P-x)*y/u,x+(P-x)*(y+1)/u)}});let f=!0;for(;f;)f=!1,r.forEach(p=>{const l=p.outgoing.filter(_=>_.active);l.length===1&&(l[0].active=!1,l[0].twin.active=!1,f=!0)});r.forEach(p=>ov(p,t.tolerance));const g=[];return o.forEach(p=>{if(!p.active||p.visited)return;const l=[];let _=p;for(let T=0;T<=o.length;T+=1){if(!_.active||_.visited&&_!==p)return;_.visited=!0,l.push(_);const b=_.to.outgoing.filter(m=>m.active),w=b.indexOf(_.twin);if(w<0)return;if(_=b[(w-1+b.length)%b.length],_===p)break}if(_!==p)return;const x=l.map(T=>T.from.point);if(x.length<3||Math.abs(Tu(x))<=t.tolerance)return;const P=x.map(T=>va(T,t.invertY));if(P.some(T=>!T))return;const c=`face-composite-${g.length}`,u=K_(l.map(T=>({entity:T.entity,startParameter:T.startParameter,endParameter:T.endParameter})),{id:c,tolerance:t.tolerance});if(!u||u.orientation.outer!=="ccw")return;const y=l.map((T,b)=>sv(l[(b-1+l.length)%l.length],T)?b:-1).filter(T=>T>=0),R=new Set(y),S=l.map((T,b)=>R.has(b)?-1:b).filter(T=>T>=0);g.push({id:c,sourceEntity:null,sourceEntities:[...new Set(l.map(T=>T.entity.sourceEntity||T.entity))],sourceEntityType:"COMPOSITE",exactProfile:u,points:P,bounds:Fc(P),area:Uc(P),cadProfileVertexIndices:S,smoothProfileVertexIndices:y})}),g}function lv(e,t={}){const n={arcChordTolerance:t.arcChordTolerance,circleSegments:t.circleSegments,ellipseSegments:t.ellipseSegments,invertY:t.invertY!==!1,maxArcSegmentAngle:t.maxArcSegmentAngle,maxArcSegments:t.maxArcSegments,tolerance:Number(t.tolerance)||gu},i=Array.isArray(e)?e:[],r=cv(i,n),a=new Set(r.flatMap(s=>s.sourceEntities||[])),o=i.map((s,h)=>{if(a.has(s))return null;const f=s?.type==="CIRCLE"?tv(s,n):s?.type==="ELLIPSE"?nv(s,n):null;if(!f?.points)return null;const{points:g}=f,p=Uc(g);return p<=n.tolerance?null:{id:ev(s,h),sourceEntity:s,sourceEntityType:s.type,exactProfile:Ac(s),points:g,bounds:Fc(g),area:p,cadProfileVertexIndices:f.cadProfileVertexIndices??[],smoothProfileVertexIndices:f.smoothProfileVertexIndices??[]}}).filter(Boolean);return Jg([...o,...r],n.tolerance)}function uv(e){const t=new vu(e.points.map(a=>new We(a.x,a.y)));t.holes=(e.holes||[]).map(a=>new xu(a.map(o=>new We(o.x,o.y))));const n=new Su(t),i=new ur({color:us,depthTest:!1,depthWrite:!1,opacity:1,side:zt,transparent:!1}),r=new Bt(n,i);return r.name=`webcad-simple-face-${e.id}`,r.renderOrder=Kg,r.userData={type:"webcad-simple-face",faceId:e.id,face:e,defaultColor:us,selectedColor:qg},r}const hr=1e-7,dv=2e-7,xa=1e-12,hs=16765286,fv=.006,Gr=new WeakMap,pv=[new ne(.742,.421,.522).normalize(),new ne(-.311,.817,.486).normalize(),new ne(.537,-.239,.809).normalize()],hv=24,mv=25,_v=26;function Ft(e){return new ne(Number(e?.x),Number(e?.y),Number(e?.z)||0)}function gv(e){if(!Array.isArray(e)||e.length<3)return null;const t=Ft(e[0]);for(let n=1;n<e.length-1;n+=1){const i=Ft(e[n]).sub(t).cross(Ft(e[n+1]).sub(t));if(i.lengthSq()>xa)return i.normalize()}return null}function vv(e,t,n=hr){if(!t||!Array.isArray(e)||e.length<3)return!1;const i=Ft(e[0]);return e.every(r=>Math.abs(Ft(r).sub(i).dot(t))<=n)}function xv(e){const t=new xn;e.flat().forEach(i=>t.expandByPoint(Ft(i)));const n=t.isEmpty()?1:Math.max(1,t.getSize(new ne).length());return Math.max(hr,n*dv)}function ia(e){return e.reduce((t,n)=>t.add(Ft(n)),new ne).multiplyScalar(1/Math.max(1,e.length))}function ms(e,t,n){const i=ia(n.vertices),r=ia(t);return e.dot(r.sub(i))<0?e.clone().multiplyScalar(-1):e}function Sv(e){const t=new xn;return(e?.vertices??[]).forEach(n=>t.expandByPoint(Ft(n))),t.isEmpty()?1:Math.max(1,t.getSize(new ne).length())}function Ev(e,t,n,i){const r=new Ks(e,t),a=new ne,o=[];return(n?.faces??[]).forEach(s=>{if(!Array.isArray(s)||s.length<3)return;const h=Ft(n.vertices[s[0]]);for(let f=1;f<s.length-1;f+=1){const g=Ft(n.vertices[s[f]]),p=Ft(n.vertices[s[f+1]]);if(!r.intersectTriangle(h,g,p,!1,a))continue;const l=a.clone().sub(e).dot(t);l>i&&o.push(l)}}),o.sort((s,h)=>s-h),o.filter((s,h)=>h===0||Math.abs(s-o[h-1])>i*4).length}function _s(e,t,n){return pv.reduce((r,a)=>r+Ev(e,a,t,n)%2,0)>=2}function Mv(e,t,n){const i=t.map(h=>n.vertices[h]).filter(Boolean);if(i.length<3)return null;const r=ia(i),a=Sv(n)*1e-7,o=_s(r.clone().addScaledVector(e,a*8),n,a),s=_s(r.clone().addScaledVector(e,-a*8),n,a);return o===s?null:o?-1:1}function bv(e,t,n,i){const r=e?.normal?Ft(e.normal):null;if(r&&r.lengthSq()>xa){r.normalize();const o=Mv(r,t,i);return o?r.multiplyScalar(o):ms(r,n,i)}const a=gv(n);return a?ms(a,n,i):null}function Tv(e){const t=Number(e?.metadata?.profileSize);if(Number.isInteger(t)&&t>=3&&e.vertices?.length===t*2)return t;const n=e?.faces?.[0]?.length,i=e?.faces?.[1]?.length;return!Number.isInteger(n)||n<3||n!==i||e.vertices.length!==n*2?null:n}function Av(e,t){return e>=t?e-t:e}function yv(e,t){const n=e?.faces?.[t],i=Tv(e);if(!i||!Array.isArray(n)||n.length!==4||t<2)return!1;const r=new Set(Array.isArray(e?.metadata?.smoothVerticalEdgeIndices)?e.metadata.smoothVerticalEdgeIndices:Array.isArray(e?.metadata?.smoothProfileVertexIndices)?e.metadata.smoothProfileVertexIndices:[]);return r.size?n.some(a=>r.has(Av(a,i))):!1}function gs(e,t){const n={x:Math.abs(t.x),y:Math.abs(t.y),z:Math.abs(t.z)};return n.z>=n.x&&n.z>=n.y?new We(e.x,e.y):n.x>=n.y?new We(e.y,e.z):new We(e.x,e.z)}function Pv(e,t,n=[]){const i=e.map(o=>gs(o,t)),r=n.map(o=>o.map(s=>gs(s,t))),a=fa.triangulateShape(i,r);return a.length?a.flat():e.slice(1,-1).flatMap((o,s)=>[0,s+1,s+2])}function Rv(e,t){const n=e?.metadata?.capFaceGroups;return n?n.lower?.includes(t)?{indices:n.lower,upper:!1}:n.upper?.includes(t)?{indices:n.upper,upper:!0}:null:null}function wv(e,t){const n=Number(e?.metadata?.profileSize),i=e?.metadata?.profileLoopSizes;if(!Number.isInteger(n)||!Array.isArray(i)||i.reduce((o,s)=>o+s,0)!==n)return null;const r=[];let a=t?n:0;return i.forEach(o=>{r.push(e.vertices.slice(a,a+o)),a+=o}),r}function Cv(e,t){const n=(e?.metadata?.planarFaceGroups??[]).findIndex(i=>Array.isArray(i?.indices)&&i.indices.includes(t));return n>=0?{group:e.metadata.planarFaceGroups[n],index:n}:null}function Dv(e,t){Gr.has(e)||Gr.set(e,Lu(e));const i=Gr.get(e).semanticPlanarFaces.find(r=>r.indices.includes(t));return i?{group:i,index:i.id,semantic:!0}:null}function Lv(e,t){if(Array.isArray(e?.metadata?.curvedSideFaceIndices)&&e.metadata.curvedSideFaceIndices.includes(t))return!0;const n=e?.metadata?.faceVertexNormals?.[t];if(e?.metadata?.type!=="profileFeature"&&!Array.isArray(e?.metadata?.profileFeatures)||!Array.isArray(n)||n.length<2)return!1;const i=Ft(n[0]);return n.slice(1).some(r=>i.distanceTo(Ft(r))>hr)}function Oc(e,t,n=null){if(e?.userData?.type!=="webcad-push-solid")return null;const i=e.userData.solid,r=i?.faces?.[t];if(!Array.isArray(r)||r.length<3||!Array.isArray(i?.vertices))return null;const a=n??Dv(i,t)??Cv(i,t);if(!a&&(yv(i,t)||Lv(i,t)))return null;const o=a?.group??null,s=Rv(i,t),h=o?[o.outerLoop,...o.innerLoops??[]]:s?wv(i,s.upper):null,f=h?.[0]||r.map(_=>i.vertices[_]).filter(Boolean),g=h?.slice(1)||[],p=bv(o,r,f,i),l=o?xv([f,...g]):hr;return!p||![f,...g].every(_=>vv(_,p,l))?null:{id:`solid-face-${e.uuid}-${a?`planar-${a.index}`:s?s.upper?"upper-cap":"lower-cap":t}`,sourceSolid:i,sourceSolidDocumentId:e.userData.documentSolidId??e.parent?.userData?.documentSolidId??null,sourceSolidFaceIndex:t,sourceSolidFaceIndices:o?.indices?[...o.indices]:s?.indices?[...s.indices]:[t],sourceSolidObject:e,sourceSolidGroup:e.parent??null,points:f.map(_=>({x:_.x,y:_.y,z:_.z})),holes:g.map(_=>_.map(x=>({x:x.x,y:x.y,z:x.z}))),normal:{x:p.x,y:p.y,z:p.z},cadProfileVertexIndices:o?.cadProfileVertexIndices??f.map((_,x)=>x),smoothProfileVertexIndices:o?.smoothProfileVertexIndices??[],holeCadProfileVertexIndices:o?.holeCadProfileVertexIndices??g.map(_=>_.map((x,P)=>P)),holeSmoothProfileVertexIndices:o?.holeSmoothProfileVertexIndices??g.map(()=>[])}}function vs(e){const t=e?.object,n=t?.geometry?.userData?.webcadFaceTriangleMap?.[e?.faceIndex];return Number.isInteger(n)?Oc(t,n):null}function Iv(e,t){const i=e?.userData?.solid?.metadata?.planarFaceGroups?.[t],r=i?.indices?.[0];return Number.isInteger(r)?Oc(e,r,{group:i,index:t}):null}function Hr(e){const t=Ft(e?.normal);if(t.lengthSq()<=xa)return null;t.normalize();const n=Array.isArray(e?.points)?e.points:[],i=Array.isArray(e?.holes)?e.holes:[];if(n.length<3)return null;const r=[n,...i].flat(),a=new Float32Array(r.length*3);r.forEach((f,g)=>{const p=Ft(f).addScaledVector(t,fv),l=g*3;a[l]=p.x,a[l+1]=p.y,a[l+2]=p.z});const o=new ti;o.setAttribute("position",new Ei(a,3)),o.setIndex(Pv(n,t,i)),o.computeVertexNormals(),o.computeBoundingBox(),o.computeBoundingSphere();const s=new ur({color:hs,depthTest:!1,depthWrite:!1,opacity:.72,side:zt,transparent:!0}),h=new Bt(o,s);return h.name=`webcad-selected-${e.id}`,h.renderOrder=_v,h.userData={type:"webcad-push-solid-face-selection",faceId:e.id,face:e,selectedColor:hs,transientSelection:!0},h}const Nv=360,ra=.05;function xs(e){return e==="mouse"?"mouse":"trackpad"}function Uv(e){const t=typeof WheelEvent>"u"?1:WheelEvent.DOM_DELTA_LINE,n=typeof WheelEvent>"u"?2:WheelEvent.DOM_DELTA_PAGE;return e.deltaMode===t?{x:e.deltaX*16,y:e.deltaY*16}:e.deltaMode===n?{x:e.deltaX*800,y:e.deltaY*800}:{x:e.deltaX,y:e.deltaY}}function Fv(e,t,n,i){const r=Math.max(1,i.width||1),a=Math.max(1,i.height||1),h=2*Math.max(ra,e.position.distanceTo(t.target))*Math.tan(Pn.degToRad(e.fov*.5))/a,f=new ne().setFromMatrixColumn(e.matrix,0).normalize(),g=new ne().setFromMatrixColumn(e.matrix,1).normalize(),p=new ne().addScaledVector(f,n.x*h).addScaledVector(g,-n.y*h);return e.position.add(p),t.target.add(p),t.update(),r}function Ov(e,t,n){const i=t.target,r=new ne().subVectors(e.position,i),a=r.length();if(a<=ra)return!1;const o=Math.exp(n/Nv),s=Math.max(ra,a*o);return r.setLength(s),e.position.copy(i).add(r),t.update(),!0}function Bv({camera:e,canvas:t,controls:n,getNavigationDevice:i,render:r,viewport:a}){let o=xs(i?.());n.mouseButtons.LEFT=vn.ROTATE,n.mouseButtons.MIDDLE=vn.PAN,n.mouseButtons.RIGHT=vn.PAN,n.enablePan=!0,n.enableRotate=!0,n.enableZoom=!0,n.screenSpacePanning=!0;function s(f){o=xs(f),n.enableZoom=o==="mouse"}function h(f){if(o!=="trackpad")return;f.preventDefault(),f.stopImmediatePropagation();const g=Uv(f);if(f.shiftKey){const l=Math.abs(g.y)>=Math.abs(g.x)?g.y:g.x;l!==0&&Ov(e,n,l)}else Fv(e,n,g,a());r?.()}return s(o),t.addEventListener("wheel",h,{capture:!0,passive:!1}),{dispose(){t.removeEventListener("wheel",h,{capture:!0})},setNavigationDevice:s}}const Vr="webcad-push-silhouette",Ss="webcad-push-generatrix-silhouette",Es="webcad-push-hidden-edges",Ms="webcad-push-visible-edges",pn=1e-9,Gv=10;function Bc(e){return e?.metadata?.type==="profileFeature"||Array.isArray(e?.metadata?.profileFeatures)}function Xt(e){return new ne(Number(e.x)||0,Number(e.y)||0,Number(e.z)||0)}function Hv(e){return e.matrixWorld.elements.map(t=>t.toFixed(4)).join(",")}function Vv(e,t){return e<t?`${e}:${t}`:`${t}:${e}`}function Gc(e,t){const n=e.map(a=>Xt(t[a])).filter(Boolean);if(n.length<3)return null;const i=n.reduce((a,o)=>a.add(o),new ne).multiplyScalar(1/n.length);let r=null;for(let a=1;a<n.length-1;a+=1){const o=new ne().subVectors(n[a],n[0]).cross(new ne().subVectors(n[a+1],n[0]));if(o.lengthSq()>pn){r=o.normalize();break}}return r?{center:i,normal:r}:null}function xi(e,t){const n=new ne().subVectors(t.position,e.center);return e.normal.dot(n)>=0}function zv(e,t){const n=new Set(e?.metadata?.smoothVerticalEdgeIndices||e?.metadata?.smoothProfileVertexIndices||[]);da(e,e?.metadata?.cadProfileVertexIndices).forEach(a=>n.add(a));const i=e?.vertices?.[t[0]],r=e?.vertices?.[t[1]];return n.has(Math.min(t[0],t[1]))&&i&&r&&Math.abs(i.x-r.x)<=pn&&Math.abs(i.y-r.y)<=pn&&Math.abs(i.z-r.z)>pn}function Hc(e){const t=Array.isArray(e?.vertices)?e.vertices:[],n=Array.isArray(e?.faces)?e.faces:[],i=n.map(a=>Gc(a,t)),r=new Map;return n.forEach((a,o)=>{for(let s=0;s<a.length;s+=1){const h=a[s],f=a[(s+1)%a.length],g=Vv(h,f);r.has(g)||r.set(g,{edge:[h,f],faces:[]}),r.get(g).faces.push(o)}}),{vertices:t,faceInfos:i,edgeFaces:r}}function kv(e,t,n){return e.map(i=>t[i]).filter(Boolean).map(i=>xi(i,n))}function aa(e,t){const n=e[t[0]],i=e[t[1]];return!n||!i?null:{start:{x:n.x,y:n.y,z:n.z},end:{x:i.x,y:i.y,z:i.z}}}function Vc(e,t,n,i=new Set){const{vertices:r,faceInfos:a,edgeFaces:o}=Hc(e);if(!r.length||!a.length||!t)return[];const s=[];return o.forEach(({edge:h,faces:f})=>{const g=kv(f,a,t),p=g.length<2,l=g.length>=2&&g.some(Boolean)&&!g.every(Boolean);if(!p&&!l||zv(e,h)!==n||n&&i.has(Math.min(h[0],h[1])))return;const _=aa(r,h);_&&s.push(_)}),s}function Wv(e,t){return Bc(e)?[]:Vc(e,t,!1)}function Xv(e){const t=Number(e?.metadata?.profileSize),n=Number(e?.vertices?.length)/2,i=Number.isInteger(t)&&t>=3?t:Number.isInteger(n)&&n>=3?n:0;if(!i)return null;const r=Array.isArray(e?.metadata?.profileLoopSizes)?e.metadata.profileLoopSizes.map(Number):[i];return{loopSizes:r.every(o=>Number.isInteger(o)&&o>=3)&&r.reduce((o,s)=>o+s,0)===i?r:[i],profileSize:i}}function Yv(e,t,n,i){if(!e.indices.every(l=>i.has(l)))return null;const r=e.indices.map(l=>t.vertices[l]),a=r.reduce((l,_)=>({x:l.x+_.x/r.length,y:l.y+_.y/r.length}),{x:0,y:0}),o=r.map(l=>Math.hypot(l.x-a.x,l.y-a.y)),s=o.reduce((l,_)=>l+_,0)/o.length,h=Math.max(1e-7,s*1e-6);if(s<=h||o.some(l=>Math.abs(l-s)>h))return null;const f=r.reduce((l,_)=>l+_.z,0)/r.length,g=e.indices.map(l=>t.vertices[l+n]);if(g.some(l=>!l))return null;const p=g.reduce((l,_)=>l+_.z,0)/g.length;return{center:a,radius:s,lowerZ:f,upperZ:p}}function Kv(e,t){if(t?.isOrthographicCamera){const f=new ne;t.getWorldDirection(f);const g=Math.hypot(f.x,f.y);if(g<=pn)return[];const p={x:-f.y/g,y:f.x/g};return[-1,1].map(l=>({x:e.center.x+p.x*e.radius*l,y:e.center.y+p.y*e.radius*l}))}const n=new ne;t.getWorldPosition(n);const i=n.x-e.center.x,r=n.y-e.center.y,a=i*i+r*r,o=e.radius*e.radius;if(a<=o+pn)return[];const s=o/a,h=e.radius*Math.sqrt(a-o)/a;return[-1,1].map(f=>({x:e.center.x+i*s-r*h*f,y:e.center.y+r*s+i*h*f}))}function qv(e,t){const n=Xv(e);if(!n)return{coveredIndices:new Set,segments:[]};const i=new Set(e?.metadata?.smoothVerticalEdgeIndices||e?.metadata?.smoothProfileVertexIndices||[]);da(e,e?.metadata?.cadProfileVertexIndices).forEach(s=>i.add(s));const r=new Set,a=[];let o=0;return n.loopSizes.forEach(s=>{const h=Array.from({length:s},(g,p)=>o+p),f=Yv({indices:h},e,n.profileSize,i);f&&(h.forEach(g=>r.add(g)),Kv(f,t).forEach(g=>a.push({start:{x:g.x,y:g.y,z:f.lowerZ},end:{x:g.x,y:g.y,z:f.upperZ}}))),o+=s}),{coveredIndices:r,segments:a}}function oa(e,t){if(e.closed)return!0;const n=a=>{const o=a%(Math.PI*2);return o<0?o+Math.PI*2:o},i=e.clockwise?n(e.endAngle-e.startAngle):n(e.startAngle-e.endAngle);return(e.clockwise?n(t-e.startAngle):n(e.startAngle-t))<=i+1e-6}function $v(e,t){let n=0,i=0;if(t?.isOrthographicCamera){const f=new ne;if(t.getWorldDirection(f),n=f.dot(Xt(e.uAxis))/e.radiusX,i=f.dot(Xt(e.vAxis))/e.radiusY,Math.hypot(n,i)<=pn)return[];const g=Math.atan2(i,n);return[g+Math.PI/2,g-Math.PI/2].filter(p=>oa(e,p))}const r=new ne;t.getWorldPosition(r);const a=r.sub(Xt(e.center));n=a.dot(Xt(e.uAxis))/e.radiusX,i=a.dot(Xt(e.vAxis))/e.radiusY;const o=Math.hypot(n,i);if(o<=1+pn)return[];const s=Math.atan2(i,n),h=Math.acos(1/o);return[s+h,s-h].filter(f=>oa(e,f))}function jv(e,t){const n=Xt(t.offset),i=n.length();if(i<=pn)return null;const r=n.multiplyScalar(1/i),a=Xt(e).sub(Xt(t.center)),o=a.dot(r);if(o<-1e-4||o>i+1e-4)return null;a.addScaledVector(r,-o);const s=a.dot(Xt(t.uAxis))/t.radiusX,h=a.dot(Xt(t.vAxis))/t.radiusY,f=Math.atan2(h,s);return Math.abs(Math.hypot(s,h)-1)>.002||!oa(t,f)?null:{angle:f,parameter:o/i}}function bs(e,t){return Math.abs(Math.atan2(Math.sin(e-t),Math.cos(e-t)))}function Zv(e,t,n){const r=[...new Set(e?.metadata?.curvedSideFaceIndices??[])].flatMap(o=>{const s=(e.faces?.[o]??[]).map(g=>jv(e.vertices?.[g],t));if(!s.length||s.some(g=>!g))return[];const h=Math.atan2(s.reduce((g,p)=>g+Math.sin(p.angle),0),s.reduce((g,p)=>g+Math.cos(p.angle),0)),f=Math.max(...s.map(g=>bs(g.angle,h)));return bs(n,h)>f+.001?[]:[{start:Math.max(0,Math.min(...s.map(g=>g.parameter))),end:Math.min(1,Math.max(...s.map(g=>g.parameter)))}]}).sort((o,s)=>o.start-s.start),a=[];return r.forEach(o=>{const s=a[a.length-1];if(s&&o.start<=s.end+1e-4){s.end=Math.max(s.end,o.end);return}a.push({...o})}),a.filter(o=>o.end-o.start>1e-6)}function Qv(e,t){const n=new Set;return Iu(e).flatMap(i=>$v(i,t).flatMap(r=>{const a=Nu(i,r);return Zv(e,i,r).flatMap(o=>{const s={x:a.x+i.offset.x*o.start,y:a.y+i.offset.y*o.start,z:a.z+i.offset.z*o.start},h={x:a.x+i.offset.x*o.end,y:a.y+i.offset.y*o.end,z:a.z+i.offset.z*o.end},f=[s,h].map(g=>`${g.x.toFixed(5)}:${g.y.toFixed(5)}:${g.z.toFixed(5)}`).join("|");return n.has(f)?[]:(n.add(f),[{start:s,end:h}])})}))}function Jv(e,t){if(Bc(e)){const i=Qv(e,t);if(i.length)return i;const r=e.metadata?.curvedFeatureGeneratrices??[],a=e.faces.map(g=>Gc(g,e.vertices));if(r.length)return r.flatMap(g=>{const p=a[g?.beforeFaceIndex],l=a[g?.afterFaceIndex];if(!p||!l||xi(p,t)===xi(l,t))return[];const _=aa(e.vertices,[g.startIndex,g.endIndex]);return _?[_]:[]});const o=e.metadata?.faceVertexNormals??[],s=new Set(o.flatMap((g,p)=>{if(!Array.isArray(g)||g.length<2)return[];const l=Xt(g[0]);return g.slice(1).some(_=>l.distanceTo(Xt(_))>pn)?[p]:[]})),{vertices:h,edgeFaces:f}=Hc(e);return[...f.values()].flatMap(({edge:g,faces:p})=>{if(p.length!==2||!p.every(P=>s.has(P)))return[];const[l,_]=p.map(P=>a[P]);if(!l||!_||xi(l,t)===xi(_,t))return[];const x=aa(h,g);return x?[x]:[]})}const n=qv(e,t);return[...n.segments,...Vc(e,t,!0,n.coveredIndices)]}function ex(e,t,n={}){if(!e||e.userData?.type!=="webcad-push-solid-group")return null;const i=e.children.find(m=>m.userData?.type==="webcad-push-solid"),r=e.children.find(m=>m.userData?.type==="webcad-push-solid-edges"),a=e.children.find(m=>m.userData?.type==="webcad-push-solid-tangent-edges"),o=i?.userData?.solid;if(!o)return null;const s=Hv(t),h=Math.max(1,Math.round(Number(n.visibilitySamples)||Gv)),f=e.getObjectByName(Vr)??null;if(e.userData.silhouetteCameraKey===s&&Number(e.userData.silhouetteVisibilitySamples)>=h||n.deferCameraRefresh===!0&&e.userData.silhouetteCameraKey&&f)return f;r&&(r.visible=!0);const g=e.getObjectByName(Ms);g&&(e.remove(g),_t(g));const p=ls({camera:t,mesh:i,occluders:n.occluders,segments:r?.userData?.sourceSegments,sourceEdgeIndices:r?.userData?.sourceEdgeIndices,curveGroupIds:r?.userData?.curveGroupIds,visibilitySamples:h}),l=p.visible,_=cn(l.map(m=>m.segment),{color:n.color??ke.edgeColor,depthTest:!1,depthWrite:!1,linewidth:n.linewidth??ke.edgeLineWidth,renderOrder:n.renderOrder??ke.edgeRenderOrder+2});_.name=Ms,_.userData={type:"webcad-push-visible-edge-overlay",measurementSegments:l.map(m=>m.measurementSegment),segmentCount:_.userData.segmentCount,sourceEdgeIndices:l.map(m=>m.sourceEdgeIndices),curveGroupIds:l.map(m=>m.curveGroupId),sourceSegments:l.map(m=>m.segment)},e.add(_);const x=e.getObjectByName(Vr);x&&(e.remove(x),_t(x));const P=cn(Wv(o,t),{color:n.color??ke.edgeColor,depthBias:ke.edgeDepthBias,depthFunc:Jn,depthTest:!0,depthWrite:!1,linewidth:n.linewidth??ke.edgeLineWidth,polygonOffset:!0,polygonOffsetFactor:ke.edgePolygonOffsetFactor,polygonOffsetUnits:ke.edgePolygonOffsetUnits,renderOrder:n.renderOrder??ke.edgeRenderOrder+1});P.name=Vr,P.userData={type:"webcad-push-silhouette",segmentCount:P.userData.segmentCount},e.add(P);const c=e.getObjectByName(Ss);c&&(e.remove(c),_t(c));const u=Jv(o,t),y=cn(u,{color:n.color??ke.edgeColor,depthBias:ke.edgeDepthBias,depthFunc:Jn,depthTest:!0,depthWrite:!1,linewidth:n.linewidth??ke.edgeLineWidth,polygonOffset:!0,polygonOffsetFactor:ke.edgePolygonOffsetFactor,polygonOffsetUnits:ke.edgePolygonOffsetUnits,renderOrder:n.renderOrder??ke.edgeRenderOrder+1});y.name=Ss,y.visible=e.userData.showCurveGeneratrices!==!1,y.userData={type:"webcad-push-generatrix-silhouette",segmentCount:y.userData.segmentCount,sourceSegments:u},e.add(y);const R=e.getObjectByName(Es);R&&(e.remove(R),_t(R));const S=[...a?.userData?.sourceSegments||[],...u],T=ls({camera:t,mesh:i,occluders:n.occluders,segments:S,visibilitySamples:h}).hidden,b=[...p.hidden.map(m=>m.segment),...T.map(m=>m.segment)],w=cn(b,{color:n.hiddenColor??ke.hiddenEdgeColor,dashSize:4.8,dashed:!0,depthTest:!1,depthWrite:!1,gapSize:3,linewidth:n.hiddenLinewidth??ke.hiddenEdgeLineWidth,opacity:n.hiddenOpacity??ke.hiddenEdgeOpacity,renderOrder:(n.renderOrder??ke.edgeRenderOrder)-1,transparent:!0});return w.name=Es,w.visible=e.userData.showHiddenEdges===!0,w.userData={type:"webcad-push-solid-hidden-edges",segmentCount:w.userData.segmentCount,sourceSegments:b},e.add(w),e.userData.silhouetteCameraKey=s,e.userData.silhouetteVisibilitySamples=h,P}function tx(e,t,n={}){const i=[];e?.traverse?.(o=>{o.userData?.type==="webcad-push-solid-group"&&i.push(o)});const r=i.flatMap(o=>o.children?.filter(s=>s.userData?.type==="webcad-push-solid")??[]),a=[];return i.forEach(o=>{const s=ex(o,t,{...n,occluders:r});s&&a.push(s)}),a}function hn(e,t=0){const n=Number(e);return Number.isFinite(n)?n:t}function nx(e,t,{extrusionMargin:n=24,minimumNear:i=1e-4}={}){const r=e?.min??{},a=e?.max??{},o=hn(r.x),s=hn(r.y),h=hn(r.z),f=hn(a.x,o),g=hn(a.y,s),p=hn(a.z,h),l={x:(o+f)*.5,y:(s+g)*.5,z:(h+p)*.5},_=Math.max(Math.hypot(f-o,g-s,p-h)*.5,.001),x=Math.hypot(hn(t?.x)-l.x,hn(t?.y)-l.y,hn(t?.z)-l.z),P=x-_,c=P>0?Math.max(i,P*.5):Math.max(i,_/1e3);return{far:Math.max(c*2,x+_*Math.max(2,n)),near:c}}const zr=70,ix=new Set(["webcad-push-solid-edges","webcad-push-solid-tangent-edges","webcad-push-visible-edge-overlay","webcad-push-silhouette","webcad-push-generatrix-silhouette","webcad-push-solid-hidden-edges"]);function kr(){return globalThis.performance?.now?.()??Date.now()}async function ax(e,{doc:t=null,entities:n=[],getNavigationDevice:i=()=>"trackpad",gridVisible:r=!0,axesVisible:a=!0,navigationDevice:o=i(),sketchPlane:s=t?.model3d?.sketchPlane??"XY",onEdgeInfo:h=null,onStatus:f=null}={}){if(!e)throw new TypeError("La vista Three.js necesita un canvas propio");await Uu();const g=new Fu;g.background=new dt(vt.background);const p=new Si(36,1,.01,1e6);p.up.set(0,0,1);const l=new Vm({canvas:e,antialias:!0});l.setPixelRatio(Math.min(globalThis.devicePixelRatio||1,2)),l.outputColorSpace=Ts;const _=new km(p,l.domElement);_.enableDamping=!1,_.screenSpacePanning=!0;let x=null,P=null,c=null,u=null,y=null,R=null,S=null,T=null,b=null,w=null;const m=new Set;let A=!1,O=null,L=null,V=null,ae=!1,Q=!1,X=1,Y=1,W=r!==!1,ee=a!==!1,ue=Ar(s),Re=!1,ge=-1/0,Me=!1,Xe=null,it=!1;const Ye=new Map,j=new Set,N=new xn().makeEmpty(),z=new Map,ce=new Map,le=new Set,de=new Set;function K(){if(Xe=null,Q||j.size)return;const M=zr-(kr()-ge);if(M>1){Xe=globalThis.setTimeout(K,M);return}Ve(!1),Me=!0,_e()}function re(){Xe===null&&(Xe=globalThis.setTimeout(K,zr))}function me(){ge=kr(),Ve(!0),re()}function Pe(M){j.add(M.pointerId)}function be(M){Q||(j.delete(M.pointerId),!j.size&&(Ve(!1),Me=!0,_e()))}function Ve(M){if(it=M===!0,it){g.traverse(F=>{ix.has(F.userData?.type)&&(Ye.has(F)||Ye.set(F,F.visible),F.visible=!1)});return}Ye.forEach((F,te)=>{te.visible=F}),Ye.clear()}_.addEventListener("change",me);const Je=new sn;Je.name="webcad-3d-sketchup-lights",Je.add(new Ou(16777215,.58),new Bu(16777215,1.35)),Je.children[1].position.set(180,-220,360),g.add(Je);const et=Bv({camera:p,canvas:l.domElement,controls:_,getNavigationDevice:i,render:_e,viewport:()=>({width:X,height:Y})});et.setNavigationDevice(o);const ft=new dr,qe=new We;function lt(M=yr(ue)){const F=jr(M);return new An().makeBasis(new ne(F.xAxis.x,F.xAxis.y,F.xAxis.z),new ne(F.yAxis.x,F.yAxis.y,F.yAxis.z),new ne(F.normal.x,F.normal.y,F.normal.z)).setPosition(F.origin.x,F.origin.y,F.origin.z)}function D(M,F){return M?.applyMatrix4?.(lt(F)),M}function ot(M,F){const te=M?.points?.[0],we=F?.point,se=M?.normal??{x:0,y:0,z:1};if(!te||!we)return!1;const Oe=Number(te.x),Ie=Number(te.y),ct=Number(te.z??0),Mt=Number(we.x),St=Number(we.y),pt=Number(we.z??0),tt=Number(se.x??0),Qe=Number(se.y??0),ht=Number(se.z??0),je=(Mt-Oe)*tt+(St-Ie)*Qe+(pt-ct)*ht;return Number.isFinite(je)&&Math.abs(je)>1e-9}const Ge=Cg({camera:p,canvas:l.domElement,controls:_,getSelectedFace:()=>c,getObjectSnap:(M,F)=>Yg({camera:p,canvas:l.domElement,event:M,solidObjects:Ge.getSolidObjects?.()??[],maxDistancePixels:20,acceptCandidate:te=>ot(F,te)}),onObjectSnap:Be,onConsumeFace:(M,F,te)=>{const we=M?.userData?.face,se=te?.sourceKey||Mn(M?.userData?.face),Oe=F?.userData?.solid??null,Ie=we?.sourceSolidDocumentId??null;let ct=null;if(t&&Oe){const St=U(we,te);ct=Ie?t.replace3dSolid?.(Ie,Oe,{operation:St}):t.add3dSolid?.(Oe,{operation:St}),ct&&(Ge.tagDocumentSolidGroup?.(F,ct),C(ct.id),we?.sketchId&&(t.set3dSketchVisibility?.(we.sketchId,!1,{recordHistory:!1}),x?.traverse?.(pt=>{pt.userData?.sketchId===we.sketchId&&(pt.visible=!1)}),P?.traverse?.(pt=>{pt.userData?.sketchId===we.sketchId&&(pt.visible=!1)})))}se&&(ct||z.set(se,{height:te.height,sourceKey:se}),de.add(se));const Mt=M?.userData?.face?.sourceEntity;Mt&&(ct||ce.set(Mt,{height:te.height,sourceKey:se}),le.add(Mt)),ci(),M===c&&(M?.userData?.transientSelection&&(g.remove(M),_t(M)),c=null),_e()},onStatus:f,render:_e,scene:g,viewport:()=>({width:X,height:Y})});function E(){return Array.isArray(t?.model3d?.solids)?t.model3d.solids.filter(M=>M?.visible!==!1&&M?.solid):[]}function d(M){return M?.metadata?.sourceKey??M?.solid?.metadata?.sourceKey??M?.operation?.sourceKey??null}function U(M,F){if(M?.supportSolid){const te=F?.height??null;return{type:M.supportContactOnly===!0||te>=0?"pushUnionProfile":"pushSubtractProfile",distance:te,tangentContact:M.supportContactOnly===!0,sourceSolidDocumentId:M.sourceSolidDocumentId??null,sourceSolidFaceIndices:M.sourceSolidFaceIndices??null,sketchPlane:M.sketchPlane??ue,sketchId:M.sketchId??null,workplane:M.workplane??null,exactProfile:M.exactProfile??null,sourceKey:F?.sourceKey??Mn(M)}}return M?.sourceSolid?{type:"pushMoveFace",distance:F?.height??null,sourceSolidDocumentId:M.sourceSolidDocumentId??null,sourceSolidFaceIndex:M.sourceSolidFaceIndex??null,sourceSolidFaceIndices:M.sourceSolidFaceIndices??null,sketchPlane:M.sketchPlane??ue,sketchId:M.sketchId??null,workplane:M.workplane??null,sourceKey:F?.sourceKey??Mn(M)}:{type:"pushFromProfile",distance:F?.height??null,sourceEntityId:M?.sourceEntity?.id??M?.sourceEntity?.handle??null,sourceEntityType:M?.sourceEntity?.type??null,sketchPlane:M?.sketchPlane??ue,sketchId:M?.sketchId??null,workplane:M?.workplane??null,sourceKey:F?.sourceKey??Mn(M)}}function G(){if(c){if(c.userData?.transientSelection){g.remove(c),_t(c);return}c.material&&(c.material.color.set(c.userData.defaultColor??16118507),c.material.opacity=c.userData.defaultOpacity??1,c.material.transparent=c.userData.defaultTransparent===!0)}}function $(M){!M?.material||M===c||(M.material.color.set(M.userData.defaultColor??16118507),M.material.opacity=M.userData.defaultOpacity??1,M.material.transparent=M.userData.defaultTransparent===!0)}function oe(){$(u),u=null,y&&(g.remove(y),_t(y),y=null)}function pe(){T&&(g.remove(T),_t(T),T=null,b=null)}function q(){const M=R??S,F=M===S&&!R,te=M?`${M.key}:${F?"selected":"hovered"}`:null;if(te===b){h?.(M);return}if(pe(),h?.(M),!M?.start||!M?.end)return;const we=Array.isArray(M.segments)&&M.segments.length?M.segments:[M];T=cn(we,{color:F?16756782:52198,depthTest:!1,depthWrite:!1,linewidth:F?5:4,renderOrder:64}),T.name="webcad-selected-solid-edge",T.userData={...T.userData,documentSolidId:M.documentSolidId,edge:M,type:F?"webcad-solid-edge-selection":"webcad-solid-edge-hover"},b=te,g.add(T)}function J(M=null){R?.key!==M?.key&&(R=M,q())}function he(){R&&(R=null,q())}function Le(M=null){R=null,S=M,q()}function fe(M){M===u&&!y||(oe(),!(!M||M===c||!M.material)&&(u=M,M.material.color.set(16768901),M.material.opacity=.72,M.material.transparent=!0))}function Se(M){if(!M){oe();return}if(y?.userData?.faceId===M.id||(oe(),c?.userData?.faceId===M.id))return;const F=Hr(M);F&&(F.name=`webcad-hovered-${M.id}`,F.renderOrder=mv,F.material.color.set(16768901),F.material.opacity=.38,F.userData.type="webcad-solid-face-hover",y=F,g.add(F))}function Be(M){if(!M?.point){w&&(w.visible=!1);return}if(!w){const te=new ti;te.setAttribute("position",new Ai([0,0,0],3));const we=new Wu({color:55807,depthTest:!1,depthWrite:!1,size:13,sizeAttenuation:!1});w=new Xu(te,we),w.name="webcad-3d-object-snap",w.renderOrder=60,g.add(w)}const F={endpoint:55807,midpoint:4773979,center:16732120,faceCenter:16764749};w.position.set(Number(M.point.x),Number(M.point.y),Number(M.point.z)),w.material.color.setHex(F[M.type]??F.endpoint),w.visible=!0}function He(M,F){const te=M?.material;te?.emissive&&(M.userData.defaultEmissive===void 0&&(M.userData.defaultColor=te.color.getHex(),M.userData.defaultEmissive=te.emissive.getHex(),M.userData.defaultEmissiveIntensity=te.emissiveIntensity),te.color.setHex(F?16754719:M.userData.defaultColor),te.emissive.setHex(F?5908480:M.userData.defaultEmissive),te.emissiveIntensity=F?.5:M.userData.defaultEmissiveIntensity)}function ze(M=[]){m.clear(),M.forEach(F=>{F&&m.add(F)}),(Ge.getSolidObjects?.()??[]).forEach(F=>{const te=m.has(F.userData?.documentSolidId);F.traverse?.(we=>He(we,te))})}function C(M){ze(M?[M]:[])}function ve(M){return M?(m.add(M),(Ge.getSolidObjects?.()??[]).forEach(F=>{const te=m.has(F.userData?.documentSolidId);F.traverse?.(we=>He(we,te))}),!0):!1}function Z(M){M!==c&&Ge.isActive()&&Ge.cancel(),oe(),Le(null),G(),c=M||null,ze(),c?.material&&(c.material.color.set(c.userData.selectedColor??16765286),c.material.opacity=1,c.material.transparent=c.userData?.transientSelection===!0,f?.(c.userData?.type==="webcad-push-solid-face-selection"?"Cara de solido seleccionada":"Recinto seleccionado")),_e()}function xe(M,F){!M?.userData||!F||(M.userData.pushStartPointer={x:F.clientX,y:F.clientY})}function Te(M){const F=l.domElement.getBoundingClientRect();qe.x=(M.clientX-F.left)/Math.max(1,F.width)*2-1,qe.y=-((M.clientY-F.top)/Math.max(1,F.height)*2-1),ft.setFromCamera(qe,p)}function ie(M=4){return Og(Ge.getSolidObjects?.()??[],p,qe,{width:X,height:Y},{includeHidden:Re,maxDistancePixels:M})}function Ne(M){return new ne(Number(M?.x)||0,Number(M?.y)||0,Number(M?.z)||0)}function De(){const M=Ge.getSolidObjects?.()??[];return M.length?ft.intersectObjects(M,!0).find(F=>F?.object?.userData?.type==="webcad-push-solid"):null}function xt(M){for(let F=M;F;F=F.parent)if(F.visible===!1)return!1;return!0}function st(){return P?.children.length?ft.intersectObjects(P.children,!0).filter(M=>M?.object?.userData?.type==="webcad-simple-face"&&xt(M.object)).sort((M,F)=>{const te=(Number(M.object.userData?.face?.area)||1/0)-(Number(F.object.userData?.face?.area)||1/0);return Math.abs(te)>1e-9?te:M.distance-F.distance})[0]??null:null}function qt(M,F,te){const we=te.x-F.x,se=te.y-F.y,Oe=we*we+se*se;if(Oe<=1e-12)return M.distanceTo(F);const Ie=Pn.clamp(((M.x-F.x)*we+(M.y-F.y)*se)/Oe,0,1);return M.distanceTo(new We(F.x+we*Ie,F.y+se*Ie))}function kt(M=7){const F=new We((qe.x+1)*X*.5,(1-qe.y)*Y*.5);let te=null;return(Ge.getSolidObjects?.()??[]).forEach(we=>{const se=we.children?.find(Ie=>Ie.userData?.type==="webcad-push-solid"),Oe=se?.userData?.solid;(Oe?.metadata?.tangentEdges??[]).forEach(Ie=>{const ct=Oe.vertices?.[Ie.startIndex],Mt=Oe.vertices?.[Ie.endIndex];if(!ct||!Mt)return;const St=Ne(ct).project(p),pt=Ne(Mt).project(p);if(St.z<-1&&pt.z<-1||St.z>1&&pt.z>1)return;const tt=new We((St.x+1)*X*.5,(1-St.y)*Y*.5),Qe=new We((pt.x+1)*X*.5,(1-pt.y)*Y*.5),ht=qt(F,tt,Qe),je=Ne(ct).add(Ne(Mt)).multiplyScalar(.5),Ct=p.position.distanceTo(je);if(ht>M||te&&(ht>te.screenDistance+.25||Math.abs(ht-te.screenDistance)<=.25&&Ct>=te.cameraDistance))return;const $t=Iv(se,Ie.planarGroupIndex);$t&&(te={cameraDistance:Ct,face:$t,screenDistance:ht})})}),te?.face??null}function Fi(M){if(Ge.isActive()||A||M.buttons){oe(),he();return}Te(M);const F=ie();if(F){oe(),J(F),_e();return}he();const te=st();if(te){fe(te.object),_e();return}const we=kt();if(we){Se(we),_e();return}const se=vs(De());if(se){Se(se),_e();return}oe(),_e()}function Oi(){oe(),he(),_e()}function Bi(M,F=De()){const te=vs(F);if(!te)return!1;const we=Hr(te);return we?(xe(we,M),g.add(we),Z(we),!0):!1}function Bn(M){if(Ge.isActive())return;Te(M);const F=De();if(A){const Oe=F?.object?.userData?.documentSolidId??null;if(Oe){ve(Oe);const Ie=m.size;f?.(`Borrar ${Ie} solido${Ie===1?"":"s"} · confirme con Enter, Espacio o clic derecho`),_e()}else f?.("Borrar solido · seleccione una cara de un solido 3D");return}const te=ie();if(te){oe(),Z(null),Le(te);const Oe=Number(te.length),Ie=Number.isFinite(Oe)?Oe.toLocaleString("es-ES",{maximumFractionDigits:3}):"-";f?.(`Arista seleccionada · ${Ie} mm`),_e();return}Le(null);const we=st();if(we?.object?.userData?.type==="webcad-simple-face"){xe(we.object,M),Z(we.object);return}const se=kt();if(se){const Oe=Hr(se);if(Oe){xe(Oe,M),g.add(Oe),Z(Oe);return}}Bi(M,F)||(Z(null),f?.(""))}function Gi(M){if(Ge.isActive()||A)return;Te(M);const F=De()?.object?.userData?.documentSolidId??null;F&&(M.preventDefault(),Z(null),C(F),f?.("Solido 3D seleccionado"),_e())}function Rn(){return typeof t?.topLevelEntities=="function"?t.topLevelEntities():[]}function Hi(M){if(Ge.isActive())return!1;const F=[...new Set(M)].filter(se=>t?.model3d?.solids?.some(Oe=>Oe?.id===se));if(!F.length)return f?.("Seleccione solidos 3D para borrar"),!1;A=!1,Z(null);const[te,...we]=F;return t.remove3dSolid?.(te),we.forEach(se=>t.remove3dSolid?.(se,{recordHistory:!1})),B(Rn(),{preserveView:!0}),f?.(`${F.length} solido${F.length===1?"":"s"} 3D eliminado${F.length===1?"":"s"}`),!0}function Jt(){return Hi([...m])}function ii(){A=!0,G(),c=null;const M=m.size;return f?.(M?`Borrar ${M} solido${M===1?"":"s"} · seleccione mas o confirme con Enter, Espacio o clic derecho`:"Borrar: seleccione solidos y confirme con Enter, Espacio o clic derecho"),!0}function ri(){return A?Jt():!1}function ai(){return A?(A=!1,ze(),f?.(""),!0):!1}function wn(M){A&&(M.preventDefault(),ri())}function oi(M){if(M.key.toLowerCase()==="k"){M.preventDefault(),si();return}if(M.key==="Escape"){if(ai())return;if(S){Le(null),f?.(""),_e();return}c&&(Z(null),f?.(""))}}function Cn(M){Re=M===!0,Ge.setHiddenEdges(Re),f?.(Re?"Aristas ocultas visibles":"Aristas ocultas ocultas")}function si(){return Cn(!Re),Re}function ci(){x?.traverse?.(M=>{const F=M.userData?.entity;if(!F)return;const te=Rc(F)||M.userData?.entityKey;M.visible=!(le.has(F)||de.has(te))}),_e()}function mr(M,F){L&&(g.remove(L),_t(L)),O&&(g.remove(O),_t(O)),V&&(g.remove(V),_t(V));const te=rr(M,yr(ue));L=gc(M,F),O=E_(new ne(te.x,te.y,te.z),F,{includeGround:!1,visible:W}),D(O),V=M_(F),V.visible=ee,g.add(L,O,V),zn(L,X,Y),zn(O,X,Y),zn(V,X,Y)}function Vi(){N.makeEmpty();const M=x?.userData?.bounds;return M&&!M.isEmpty()&&N.union(M),E().forEach(F=>{(F.solid.vertices??[]).forEach(te=>N.expandByPoint(new ne(Number(te?.x)||0,Number(te?.y)||0,Number(te?.z)||0)))}),N.isEmpty()&&N.set(new ne(-10,-10,-.5),new ne(10,10,.5)),N}function Gn(){const{near:M,far:F}=nx(N,p.position);Math.abs(p.near-M)<=M*1e-6&&Math.abs(p.far-F)<=F*1e-6||(p.near=M,p.far=F,p.updateProjectionMatrix())}function _r(){const M=Vi(),F=new ne,te=new ne;M.getCenter(F),M.getSize(te);const we=Math.max(te.x,te.y,te.z,1),se=we*1.9,Oe=Js(ue).cameraDirection;p.position.set(F.x+Oe.x*se,F.y+Oe.y*se,F.z+Oe.z*se),p.lookAt(F),p.updateMatrixWorld(),_.target.copy(F),_.update(),Gn(),mr(F,we)}function v(){return{position:p.position.toArray(),target:_.target.toArray(),up:p.up.toArray(),near:p.near,far:p.far,zoom:p.zoom}}function I(M){return!Array.isArray(M?.position)||M.position.length<3||!Array.isArray(M?.target)||M.target.length<3?!1:(p.position.fromArray(M.position),_.target.fromArray(M.target),Array.isArray(M.up)&&M.up.length>=3&&p.up.fromArray(M.up),Number.isFinite(Number(M.near))&&(p.near=Math.max(1e-4,Number(M.near))),Number.isFinite(Number(M.far))&&(p.far=Math.max(p.near+1,Number(M.far))),Number.isFinite(Number(M.zoom))&&(p.zoom=Math.max(1e-4,Number(M.zoom))),p.lookAt(_.target),p.updateMatrixWorld(),_.update(),Gn(),_e(),!0)}function k(M){const F=Array.isArray(t?.model3d?.sketches)?t.model3d.sketches.filter(te=>te?.visible!==!1):[];return F.length?F:[{id:null,name:"Dibujo 2D pendiente",plane:yr(ue),entities:M,visible:!0}]}function B(M,{preserveView:F=!1}={}){x&&(g.remove(x),_t(x)),P&&(g.remove(P),_t(P)),Z(null),C(null),Be(null),A=!1,le.clear(),de.clear();const te=k(M);P=new sn,P.name="webcad-3d-simple-faces",Ge.clearSolids();const we=new Map;E().forEach(Oe=>{Ge.addDocumentSolid?.(Oe);const Ie=d(Oe);Ie&&!Oe?.operation?.sketchId&&(we.set(Ie,Oe),de.add(Ie))}),x=new sn,x.name="webcad-3d-sketches",x.userData.bounds=new xn().makeEmpty(),x.userData.entityCount=0,x.userData.segmentCount=0;const se=Oe=>(Ge.getSolidObjects?.()??[]).find(Ie=>Ie.userData?.documentSolidId===Oe)??null;return te.forEach(Oe=>{const Ie=jr(Oe.plane??ue),ct=pc(Oe.entities||[]),Mt=[...ct,...ct.length?Gu(Oe,t?.model3d):[]],St=new sn;St.userData.sketchId=Oe.id??null,lv(Mt).forEach(Qe=>{const ht=Hu(Qe,Ie,Oe.id??null),je=Oe.metadata?.supportFace,Ct=je?.sourceSolidId?t?.model3d?.solids?.find(ki=>ki.id===je.sourceSolidId):null,$t=!!(Ct?.solid&&Vu(Qe,je)),li=!!(Ct?.solid&&!$t&&zu(Qe,je)),Sa=$t||li;if(Sa){ht.supportSolid=Ct.solid,ht.supportContactOnly=li,ht.supportSolidGroup=se(Ct.id),ht.sourceSolidDocumentId=Ct.id,ht.sourceSolidFaceIndices=je.sourceFaceIndices??null,ht.sourceSolidFaceIndex=je.sourceFaceIndices?.[0]??null;const ki=Wi=>ku({x:Number(Wi?.x)||0,y:-(Number(Wi?.y)||0),z:0},Ie);ht.supportLoops={outer:(je.outerLoop??[]).map(ki),holes:(je.innerLoops??[]).map(Wi=>Wi.map(ki))}}const en=uv(Qe);en.userData.face=ht,Sa&&(en.renderOrder=hv,en.material.opacity=.14,en.material.transparent=!0,en.userData.defaultOpacity=.14,en.userData.defaultTransparent=!0,en.userData.supportSolidDocumentId=Ct.id);const Hn=Mn(ht),Ea=we.get(Hn),zi=!t&&!Ea?ce.get(Qe.sourceEntity)||z.get(Hn):null;Ea&&!Oe.id&&(en.visible=!1,Qe.sourceEntity&&le.add(Qe.sourceEntity),Hn&&de.add(Hn)),zi&&(en.visible=!1,Qe.sourceEntity&&le.add(Qe.sourceEntity),Hn&&de.add(Hn),zi.sourceKey&&de.add(zi.sourceKey),Ge.addSessionSolid(ht,zi.height)),St.add(en)}),D(St,Ie),P.add(St);const pt=A_(ct,{onWarning:Qe=>console.warn(Qe)});pt.userData.sketchId=Oe.id??null;const tt=pt.userData.bounds;D(pt,Ie),tt&&!tt.isEmpty()&&x.userData.bounds.union(tt.clone().applyMatrix4(lt(Ie))),x.userData.entityCount+=pt.userData.entityCount||0,x.userData.segmentCount+=pt.userData.segmentCount||0,x.add(pt)}),Ge.setHiddenEdges(Re),g.add(P),g.add(x),ci(),zn(x,X,Y),F?(Vi(),Gn()):_r(),_e(),x.userData.segmentCount||0}function H(M){W=M!==!1,vc(O,W),_e()}function ye(M){return ee=M!==!1,V&&(V.visible=ee),_e(),ee}function Ce(M){const F=Ar(M);return F===ue?!1:(ue=F,B(Rn(),{preserveView:!1}),!0)}function Ae(){const M=Ar(t?.model3d?.sketchPlane);if(M!==ue){ue=M,B(Rn(),{preserveView:!1});return}B(Rn(),{preserveView:!0})}function Ue(){const M=c?.userData?.face;return M?.sourceSolid?M:null}function _e(M){if(Q)return;_.update(),p.updateMatrixWorld(),Gn();const F=Number.isFinite(M)?M:kr(),te=Me;Me=!1;const we=F-ge<zr;it||tx(g,p,{deferCameraRefresh:!(te||!we)}),zn(g,X,Y),l.render(g,p)}function Ke(M=e.clientWidth||e.width||640,F=e.clientHeight||e.height||420){if(Q)return;const te=Math.max(1,Math.round(M)),we=Math.max(1,Math.round(F));X=te,Y=we,l.setSize(te,we,!1),p.aspect=te/we,p.updateProjectionMatrix(),zn(g,te,we),_e()}function $e(){Q||ae||(ae=!0,l.setAnimationLoop(_e))}function Fe(){Q||!ae||(ae=!1,l.setAnimationLoop(null))}function rt(){Q||(Fe(),oe(),R=null,S=null,pe(),h?.(null),G(),c=null,ze(),A=!1,Q=!0,l.domElement.removeEventListener("click",Bn),l.domElement.removeEventListener("dblclick",Gi),l.domElement.removeEventListener("pointermove",Fi),l.domElement.removeEventListener("pointerleave",Oi),l.domElement.removeEventListener("pointerdown",Pe),l.domElement.removeEventListener("pointerup",be),l.domElement.removeEventListener("pointercancel",be),l.domElement.removeEventListener("contextmenu",wn),l.domElement.removeEventListener("keydown",oi),Xe!==null&&(globalThis.clearTimeout(Xe),Xe=null),Ye.clear(),j.clear(),_.removeEventListener("change",me),_.dispose(),et.dispose(),_t(x),_t(P),g.remove(w),_t(w),_t(L),_t(O),_t(V),_t(Je),Ge.dispose(),l.dispose())}return l.domElement.addEventListener("click",Bn),l.domElement.addEventListener("dblclick",Gi),l.domElement.addEventListener("pointermove",Fi),l.domElement.addEventListener("pointerleave",Oi),l.domElement.addEventListener("pointerdown",Pe),l.domElement.addEventListener("pointerup",be),l.domElement.addEventListener("pointercancel",be),l.domElement.addEventListener("contextmenu",wn),l.domElement.addEventListener("keydown",oi),Ke(),B(n),$e(),{camera:p,controls:_,dispose:rt,getSegmentCount:()=>x?.userData.segmentCount||0,getFaceCount:()=>{let M=0;return P?.traverse?.(F=>{F.userData?.type==="webcad-simple-face"&&(M+=1)}),M},getEntityCount:()=>x?.userData.entityCount||0,getViewState:v,getSelectedSolidId:()=>[...m][0]??null,getSelectedSolidIds:()=>[...m],getSelectedSolidEdge:()=>S,getSelectedPlanarFace:Ue,getSketchPlane:()=>ue,isDeleteSolidActive:()=>A,startDeleteSolid:ii,confirmDeleteSolidSelection:ri,cancelDeleteSolid:ai,deleteSelectedSolid:Jt,isPushActive:()=>Ge.isActive(),render:_e,refreshDocument:Ae,renderer:l,resize:Ke,scene:g,setEntities:B,setViewState:I,setGridVisible:H,setAxesVisible:ye,setSketchPlane:Ce,setHiddenEdges:Cn,toggleHiddenEdges:si,setNavigationDevice:et.setNavigationDevice,startPush:Ge.start,start:$e,stop:Fe}}export{ax as createThreeDemoViewer};

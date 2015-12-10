    

var myFragmentShader = 

        "uniform vec2 u_mouse;"+
        "varying vec2 vUv;"+
        "varying float noise;"+

        "void main() {"+

        "vec3 color = vec3( ((vUv) * (0.3 + u_mouse.x/100.0 - noise )) , 1.0);"+
        "gl_FragColor = vec4( color.r, color.r, color.r , 1.0  );"+

 "}";



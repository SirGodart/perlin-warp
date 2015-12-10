 
(function() {
        


        var container, mesh;
        var camera, scene, renderer, raycaster, mouse;
        var uniforms, counter = 0;
        
        var keys = {

            leftArrow: false,
            rightArrow: false,
            fps: 5,
            isHover: true,
            tempX: 0,
            tempY: 0


        }
       
        init();
        animate();

        function init() {

            container = document.getElementById( 'container' );
            raycaster = new THREE.Raycaster();
            mouse = new THREE.Vector2();
            camera = new THREE.PerspectiveCamera( 30, window.innerWidth / window.innerHeight, 1, 10000 );
            camera.position.z = 200;
            scene = new THREE.Scene();
            var geometry = new THREE.SphereGeometry( 25, 160, 160, 160);

            uniforms = {

                u_time: { type: 'f', value: 0.0},
                u_mouse: { type: 'v2', value: new THREE.Vector2()},
                v_mouse: { type: 'v2', value: new THREE.Vector2()},
                u_resolution: { type: 'v2', value: new THREE.Vector2()}

            }

            uniforms.u_resolution.x = window.innerWidth;
            uniforms.u_resolution.y = window.innerHeight;
            var material = new THREE.ShaderMaterial( {

                uniforms: uniforms,
                fragmentShader: myFragmentShader,
                vertexShader: myVertexShader,

            } );

            mesh = new THREE.Mesh( geometry, material );
            scene.add( mesh );
            renderer = new THREE.WebGLRenderer({ alpha: true });
            renderer.setClearColor( 0x000, 0.0);
            renderer.setPixelRatio( window.devicePixelRatio );
            renderer.setSize( window.innerWidth, window.innerHeight );
            container.appendChild( renderer.domElement );
            window.addEventListener( 'resize', onWindowResize, false );
            document.addEventListener('mousemove', onMouseDown, false);
            document.addEventListener('mousemove', onMouseMove, false);
        }

        function onWindowResize( event ) {
                camera.aspect = window.innerWidth / window.innerHeight;
                uniforms.u_resolution.x = window.innerWidth;
                uniforms.u_resolution.y = window.innerHeight;
                camera.updateProjectionMatrix();
                renderer.setSize( window.innerWidth, window.innerHeight );   
        }


        function onMouseMove(client) {

                mouse.x = ( event.clientX / renderer.domElement.width ) * 2 - 1;
                mouse.y = - ( event.clientY / renderer.domElement.height ) * 2 + 1;
                raycaster.setFromCamera(mouse, camera );
                var intersects = raycaster.intersectObjects( scene.children );
                
    
            if (intersects.length>0) {
        
                        if (keys.isHover) {
                            
                            keys.tempX = client.x;
                            keys.tempY = client.y;
                            keys.isHover = false;
                           
                        }      
                                uniforms.v_mouse.value.x = keys.tempX;
                                uniforms.v_mouse.value.y = keys.tempY;
            } else {

                uniforms.v_mouse.value.x = 0;
                uniforms.v_mouse.value.y = 0;


                }

        }

        
        document.onkeydown = function(key){

             switch (key.keyCode) {
                        case 37: 
                                  keys.leftArrow = true;
                                  break;           
                        case 39: 
                                  keys.rightArrow = true;  
                                  break;        
                     } 
            };


        document.onkeyup = function(key){

             switch (key.keyCode) {

                        case 37: 
                                  keys.leftArrow = false;
                                  break;       
                        case 39: 
                                  keys.rightArrow = false;  
                                  break;        
                     } 
            };    



    var keyPressed = function() {



        if (keys.leftArrow) {

                                    mesh.position.x--;
                                    scene.scale.x++;

                                        if (Math.abs(mesh.position.x) > window.innerWidth/25) {

                                            mesh.position.x = window.innerWidth/25;

                                        }

        } else if (keys.rightArrow) {


                                    mesh.position.x++;
                                    scene.scale.x++;

                                        if (Math.abs(mesh.position.x) > window.innerWidth/25) {

                                            mesh.position.x = -window.innerWidth/25;

                                        }

                                    
                                }


        setTimeout(keyPressed, keys.fps);


    }
    keyPressed();

     

        function onMouseDown( client ) {
              

                if (uniforms.u_mouse.value.x < client.x/100.0 ) {

                    uniforms.u_mouse.value.x++;

                } else if (uniforms.u_mouse.value.x > client.x/50.0 ) {

                       uniforms.u_mouse.value.x--;
                } else {

                     uniforms.u_mouse.value.x = client.x/100.0 || 0.0;
                }
 
        }

        function animate() {
            requestAnimationFrame( animate );
            render();
        }


            function render() {



                    if (!keys.leftArrow && mesh.position.x < 0) {
     
                                    mesh.position.x++;
                                    scene.scale.x--;

                            
                                    if (mesh.position.x > 0) {
                                        scene.scale.x = 1;
                                        mesh.position.x = 0;
                                    }

                         } else if (!keys.rightArrow && mesh.position.x > -1) {


                                            mesh.position.x--;
                                            scene.scale.x--;

                                            
                                            if (mesh.position.x < 0) {

                                            
                                                scene.scale.x = 1;
                                                mesh.position.x = 0;

                                            }
                                        }

                counter+=0.05;
                mesh.position.y = Math.sin(counter) *6.0;
                mesh.rotation.z += 0.005;
                mesh.rotation.x -= 0.005;
                uniforms.u_time.value += 0.001;
                renderer.render( scene, camera );
             }

})();
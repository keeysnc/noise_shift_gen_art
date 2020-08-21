const winWidth = window.innerWidth;
const winHeight = window.innerHeight;


let scene, camera, renderer, item, composer, glslPass, geometry, controls, noise, clock, delta, speed, numObjects, box, simplex;
let mesh;

init();
update();

function init(){

  // scene and camera positioning
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);
  camera = new THREE.PerspectiveCamera(75, winWidth/winHeight, 0.01, 1000);
  camera.position.set( 0,0,40 );
  
  // directional light
  const hemisphere = new THREE.HemisphereLight(0xffffff, 0xFF0000, 1);
  scene.add(hemisphere);

  const ambient = new THREE.AmbientLight( 0xFF581A, 1 )
  scene.add(ambient);

  const color = 0xA8BAD9;  // white
  const near = 5;
  const far = 100;
  scene.fog = new THREE.Fog(color, near, far);
  
  // render
  renderer = new THREE.WebGLRenderer();
  
  renderer.setSize(winWidth, winHeight);


  // numObjects = 100;
  // for (let i = 0; i < numObjects; ++i) {
  //   const material = new THREE.MeshStandardMaterial({ color: 'white' });
  //   const geometry = new THREE.SphereGeometry(5, 5, 5);
  //   box = new THREE.Mesh(geometry, material);
  //   scene.add(box);
  //   // box.position.set(rand(-60, 60), rand(-60, 60), -50);
  //   // box.rotation.set(rand(Math.PI), rand(Math.PI), 0);
  //   // box.scale.set(50, 50, 5);
  // }
  // scene.add(box);

  //geometry
  geometry = new THREE.PlaneGeometry(24,24,50,50)
  // initiate simplexNoise library
  // iterate through each vertex and expand the x and y vertices
  

  const material = new THREE.MeshStandardMaterial({
    color:0xBAF7C2,
    wireframe: true,
    side: THREE.DoubleSide,
    fog: true
  })
  item = new THREE.Mesh(geometry, material)
  item.position.set(0,0,0)

  item.rotation.x = Math.PI / 2;


  scene.add(item);

  // controls = new THREE.OrbitControls(camera,renderer.domElement);

  clock = new THREE.Clock(true);
  speed = 800; //units a second
  delta = 0;

  delta = clock.getDelta();
  
  setInterval(function(){
    simplex = new SimplexNoise( clock.elapsedTime );
    for (var i = 0, l = geometry.vertices.length; i < l; i++) {
      var v = geometry.vertices[i];
      v.z = simplex.noise2D(v.x / 25, v.y / 25) * 20;
    }
  }, speed)
  
  //delta - tracks current time * speed 
    
  


  document.getElementById('container').appendChild(renderer.domElement);

  window.addEventListener('resize', resize, false)

}



function update(){
  requestAnimationFrame(update);
  renderer.render(scene, camera);
  item.rotation.z += 0.008;
  item.rotation.y += 0.008;
  item.geometry.verticesNeedUpdate = true;
    

  
}

function resize(){
  camera.aspect = winWidth / winHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}

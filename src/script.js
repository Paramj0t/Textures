import "./style.css";
import * as THREE from "three";
import gsap from "gsap";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

// console.log(THREE.PerspectiveCamera);

//Textures
// const image = new Image();
// const texture = new THREE.Texture(image);

// image.onload = () => {
// 	texture.needsUpdate = true;
// };

// image.src = "/textures/door.jpg";

const loadingManager = new THREE.LoadingManager();
const textureLoader = new THREE.TextureLoader(loadingManager);
// const texture = textureLoader.load("../static/doorColor.jpg"); error arha h but nhi ana chaiye
const colorTexture = textureLoader.load(
	"/textures/door/color.jpg",
	() => {},
	() => {},
	() => {}
);
// const alphaTexture = textureLoader.load("/textures/door/color.jpg");
// const heightTexture = textureLoader.load("/textures/door/alpha.jpg");
// const normalTexture = textureLoader.load("/textures/door/normal.jpg");
// const ambientOcclusionTexture = textureLoader.load(
// 	"/textures/door/ambientOcclusion.jpg"
// );
// const metalnessTexture = textureLoader.load("/textures/door/metalness.jpg");
// const roughnessTexture = textureLoader.load("/textures/door/roughness.jpg");

// colorTexture.repeat.x = 2;
// colorTexture.repeat.y = 2;
// colorTexture.wrapS = THREE.RepeatWrapping;
// colorTexture.wrapT = THREE.RepeatWrapping;
// colorTexture.wrapT = THREE.MirroredRepeatWrapping;
// colorTexture.wrapT = THREE.MirroredRepeatWrapping;
// colorTexture.offset.x = 0.5;
// colorTexture.offset.y = 0.5;
// colorTexture.rotation = Math.PI * 2;
colorTexture.generateMipmaps = false;
// colorTexture.minFilter = THREE.NearestFilter;
colorTexture.magFilter = THREE.NearestFilter;

//Cursor
const cursor = {
	x: 0,
	y: 0,
};

//controls
window.addEventListener("mousemove", (event) => {
	cursor.x = event.clientX / sizes.width - 0.5;
	cursor.y = -(event.clientY / sizes.height - 0.5);
});

//Scene
const scene = new THREE.Scene();

//Red Cube
const mesh = new THREE.Mesh(
	new THREE.BoxBufferGeometry(1, 1, 1),
	// new THREE.SphereBufferGeometry(1, 32, 32),
	// new THREE.ConeBufferGeometry(1, 1, 32),
	new THREE.MeshBasicMaterial({ map: colorTexture })
);
scene.add(mesh);

//sizes
const sizes = {
	width: window.innerWidth,
	height: window.innerHeight,
};

window.addEventListener("resize", () => {
	//Update sizes
	sizes.width = window.innerWidth;
	sizes.height = window.innerHeight;

	//Update Camera
	camera.aspect = sizes.width / sizes.height;
	camera.updateProjectionMatrix();

	//Update renderer
	renderer.setSize(sizes.width, sizes.height);
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

window.addEventListener("dblclick", () => {
	if (!document.fullscreenElement) {
		canvas.requestFullscreen();
	} else {
		document.exitFullscreen();
	}
});

//Camera
const camera = new THREE.PerspectiveCamera(
	75,
	sizes.width / sizes.height,
	1,
	1000
);
// const aspectRatio = sizes.width / sizes.height;
// const camera = new THREE.OrthographicCamera(
// 	-1 * aspectRatio,
// 	1 * aspectRatio,
// 	1,
// 	-1,
// 	0.1,
// 	100
// );
// camera.position.x = 2;
// camera.position.y  = 2;
camera.position.z = 3;
camera.lookAt(mesh.position);
scene.add(camera);

//Renderer
const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({
	// canvas: canvas
	canvas,
});
// renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

//Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
// controls.target.y = 1;
// controls.update();

renderer.setSize(sizes.width, sizes.height);

// //Time
// let time = Date.now();

// //Clock
const clock = new THREE.Clock();

// gsap.to(mesh.position, { duration: 1, delay: 1, x: 2 });
// gsap.to(mesh.position, { duration: 1, delay: 2, x: 0 });

//Animation
const tick = () => {
	// //time ms
	// const currentTime = Date.now();
	// const deltaTime = currentTime - time;
	// time = currentTime;

	//clock sec
	const elapsedTime = clock.getElapsedTime();

	//Update objects
	// mesh.rotation.y += 0.002 * deltaTime;
	// mesh.rotation.y += 1 * elapsedTime; wrong ab add nhi karega bar bar
	// mesh.rotation.y = elapsedTime;

	// mesh.rotation.y = elapsedTime * Math.PI * 2; //360
	// mesh.position.y = Math.sin(elapsedTime); //sin ka graph
	// mesh.position.x = Math.cos(elapsedTime);
	// camera.position.y = Math.sin(elapsedTime); //sin ka graph
	// camera.position.x = Math.cos(elapsedTime);
	// camera.lookAt(mesh.position); // camera circle meh ghumke obj ko dekh rha h

	//Update Camera
	// camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 2;
	// camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 2;
	// camera.position.y = cursor.y * 5;
	// // camera.lookAt(new THREE.Vector3());
	// camera.lookAt(mesh.position);

	//Update controls
	controls.update();

	//Renderer
	renderer.render(scene, camera);

	window.requestAnimationFrame(tick);
};

tick();

import * as THREE from "three";
import { TeapotGeometry } from "three/addons/geometries/TeapotGeometry.js";
import WebGL from "three/addons/capabilities/WebGL.js";
import { GUI } from "dat.gui";
import dat from "dat.gui";


// // initialization of Three.js
// function init(){
//     if (WebGL.isWebGLAvailable() === false) {
//         document.body.appendChild(WebGL.getWebGLErrorMessage());
//     }

//     var container = document.createElement("div");
//     document.body.appendChild(container);

//     var info = document.createElement("div");
//     info.style.position = "absolute";
//     info.style.top = "5px";
//     info.style.left = "5px";
//     info.style.width = "100%";
//     info.style.textAlign = "left";
// }
//Canvas
const canvas = document.querySelector('canvas.webgl');

//we need 4 basic elements: scene, objects, camera and renderer

//Scene
//is a container where we put the objects, models, particles, light, etc.
const scene = new THREE.Scene();

//Object
//can include primitive goemetries, imported models, particles, lights

const materialBase = new THREE.MeshBasicMaterial({color: "pink"}); //create a material for the mesh
//making my whole bunny pink 

//Cylinder Torso
const cylinderTorso = new THREE.CylinderGeometry( 4, 6, 12, 64 ); //create a "cyclinder" with rtop, rbottom, height, radialSegments, *
//mesh is a combination of a geometry (the shape) and a material (how it looks)
const cylinderTorsoMesh = new THREE.Mesh(cylinderTorso, materialBase); //combine the geometry and the material to make a mesh
//positioning and rotations
cylinderTorsoMesh.position.set(0, 0, 0);
cylinderTorsoMesh.rotation.set(Math.PI/2,0,Math.PI/2);

scene.add(cylinderTorsoMesh) //adding the mesh to the scene

//Hemisphere Bum 
const hemiBum = new THREE.SphereGeometry( 6, 64, 32, Math.PI/2, Math.PI );
//mesh is a combination of a geometry (the shape) and a material (how it looks)
const hemiBumMesh = new THREE.Mesh(hemiBum, materialBase); //combine the geometry and the material to make a mesh
//positioning and rotations
hemiBumMesh.position.set(6, 0, 0);
hemiBumMesh.rotation.set(0,0,0);

scene.add(hemiBumMesh); //adding the mesh to the scene

//Sphere Tail
const cottonTail = new THREE.SphereGeometry( 3, 6, 4 );
//mesh is a combination of a geometry (the shape) and a material (how it looks)
const cottonTailMesh = new THREE.Mesh(cottonTail, materialBase); //combine the geometry and the material to make a mesh
//positioning and rotations
cottonTailMesh.position.set(13, 0, 0);
cottonTailMesh.rotation.set(0,0,0);

scene.add(cottonTailMesh) //adding the mesh to the scene

//Capsule Head
const capsuleHead = new THREE.CapsuleGeometry( 3, 2, 32, 64 ); //create a calpsule with r, l, capSegments, radialSegments
//mesh is a combination of a geometry (the shape) and a material (how it looks)
const capsuleHeadMesh = new THREE.Mesh(capsuleHead, materialBase); //combine the geometry and the material to make a mesh
//positioning and rotations
capsuleHeadMesh.position.set(-8, 3, 0);
capsuleHeadMesh.rotation.set(Math.PI/2,0.5,Math.PI/2);

scene.add(capsuleHeadMesh) //adding the mesh to the scene

//Capsule Ears - we need to make two of them 
const capsuleEarRight = new THREE.CapsuleGeometry( 1, 5, 10, 20 );
const capsuleEarRightMesh = new THREE.Mesh(capsuleEarRight, materialBase);
//positioning and rotations
capsuleEarRightMesh.position.set(-6, 8, 2);
capsuleEarRightMesh.rotation.set(Math.PI/8,0,0);

scene.add(capsuleEarRightMesh) //adding the mesh to the scene

const capsuleEarLeft = new THREE.CapsuleGeometry( 1, 5, 10, 20 );
const capsuleEarLeftMesh = new THREE.Mesh(capsuleEarLeft, materialBase);
//positioning and rotations
capsuleEarLeftMesh.position.set(-6, 8, -2);
capsuleEarLeftMesh.rotation.set(-Math.PI/8,0,0);

scene.add(capsuleEarLeftMesh); //adding the mesh to the scene

//Capsule Legs - we need to make four of them
const capsuleLegRightFront = new THREE.CapsuleGeometry( 1, 5, 10, 20 );
const capsuleLegRightFrontMesh = new THREE.Mesh(capsuleLegRightFront, materialBase);

capsuleLegRightFrontMesh.position.set(-5, -3, -2);
capsuleLegRightFrontMesh.rotation.set(Math.PI/8,0,0);

scene.add(capsuleLegRightFrontMesh);

capsuleLegRightFrontMesh.geometry.translate(0,-3,0);

const capsuleLegLeftFront = new THREE.CapsuleGeometry( 1, 5, 10, 20 );
const capsuleLegLeftFrontMesh = new THREE.Mesh(capsuleLegLeftFront, materialBase);

capsuleLegLeftFrontMesh.position.set(-5, -3, 2);
capsuleLegLeftFrontMesh.rotation.set(-Math.PI/8,0,0);

scene.add(capsuleLegLeftFrontMesh);

capsuleLegLeftFrontMesh.geometry.translate(0,-3,0);

const capsuleLegRightRear = new THREE.CapsuleGeometry( 1, 5, 10, 20 );
const capsuleLegRightRearMesh = new THREE.Mesh(capsuleLegRightRear, materialBase);

capsuleLegRightRearMesh.position.set(5, -4, -2);
capsuleLegRightRearMesh.rotation.set(Math.PI/8,0,0);

scene.add(capsuleLegRightRearMesh);

capsuleLegRightRearMesh.geometry.translate(0,-2,0);

const capsuleLegLeftRear = new THREE.CapsuleGeometry( 1, 5, 10, 20 );
const capsuleLegLeftRearMesh = new THREE.Mesh(capsuleLegLeftRear, materialBase);

capsuleLegLeftRearMesh.position.set(5, -4, 2);
capsuleLegLeftRearMesh.rotation.set(-Math.PI/8,0,0);

scene.add(capsuleLegLeftRearMesh);

capsuleLegLeftRearMesh.geometry.translate(0,-2,0);

//On/Off Sphere
const sphereMaterialBase = new THREE.MeshBasicMaterial({
    color: "green",
    transparent: true,
    opacity: 0.5 // Semi-transparent
});

const encapSphere = new THREE.SphereGeometry( 16, 64, 32 );
const encapSphereMesh = new THREE.Mesh(encapSphere, sphereMaterialBase);

scene.add(encapSphereMesh);


// //making a heart object for fun :3
// const heartShape = new THREE.Shape();

// heartShape.moveTo( 25, 25 );
// heartShape.bezierCurveTo( 25, 25, 20, 0, 0, 0 );
// heartShape.bezierCurveTo( - 30, 0, - 30, 35, - 30, 35 );
// heartShape.bezierCurveTo( - 30, 55, - 10, 77, 25, 95 );
// heartShape.bezierCurveTo( 60, 77, 80, 55, 80, 35 );
// heartShape.bezierCurveTo( 80, 35, 80, 0, 50, 0 );
// heartShape.bezierCurveTo( 35, 0, 25, 25, 25, 25 );
// const extrudeSettings = { 
// 	depth: 8, 
// 	bevelEnabled: true, 
// 	bevelSegments: 2, 
// 	steps: 2, 
// 	bevelSize: 1, 
// 	bevelThickness: 1 
// };

// const heartGeometry = new THREE.ExtrudeGeometry( heartShape, extrudeSettings );

// const heartMesh = new THREE.Mesh( heartGeometry, material);

// scene.add(heartMesh);

//Sizes
const sizes = {
    width: 801,
    height: 600
}

//Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// camera.position.x = 1
// camera.position.y = 0
// camera.position.z = 3
camera.position.set(0, 0, 75);
scene.add(camera);

//Renderer
//will render the scene seen from the camera's point of view (will take a picture of your scene and provide you that picture on the canvas)
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//Axes Helper
//to help me visualize coordinates
//https://threejs.org/docs/#api/en/helpers/AxesHelper
const axesHelper = new THREE.AxesHelper(20); // Creates axes of length 5 units
scene.add(axesHelper);


//Basic lighting
const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 3, 0); // Light coming from one side
scene.add(directionalLight);

let spherical = {
    radius: 40,
    theta: 4.7,//Math.PI,
    phi: 1.39//Math.PI/2
};

let controlSphere = {
    isVisible: true // Property to control the visibility of the geometry
};

encapSphereMesh.visible = controlSphere.isVisible;

camera.position.setFromSphericalCoords(spherical.radius, spherical.phi, spherical.theta);
camera.lookAt(0, 0, 0);

const gui = new dat.GUI();
gui.add(spherical, 'radius', 1, 100).onChange(updateCameraPosition);
gui.add(spherical, 'theta', 0, Math.PI * 2).onChange(updateCameraPosition);
gui.add(spherical, 'phi', 0, Math.PI).onChange(updateCameraPosition);

gui.add(controlSphere, 'isVisible').name('Show Sphere').onChange(value => {
    encapSphereMesh.visible = value; // Update the visibility of the geometry based on the checkbox
});

function updateCameraPosition() {
    camera.position.setFromSphericalCoords(spherical.radius, spherical.phi, spherical.theta);
    camera.lookAt(0, 0, 0);
}

let clock = new THREE.Clock();
let speed = 2; //speed of the swing
let amplitude = Math.PI / 4; //amplitude of the swing (in radians)

function animate() {
    requestAnimationFrame(animate);

    let time = clock.getElapsedTime();

    // Apply swinging motion around the X-axis
    capsuleLegRightFrontMesh.rotation.z = Math.sin(time * speed) * amplitude; //using 
    capsuleLegLeftFrontMesh.rotation.z = Math.sin(time * speed) * amplitude;
    capsuleLegRightRearMesh.rotation.z = Math.cos(time * speed) * amplitude;
    capsuleLegLeftRearMesh.rotation.z = Math.cos(time * speed) * amplitude;

    renderer.render(scene, camera);
}

animate();

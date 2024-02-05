import * as THREE from "three";
import { TeapotGeometry } from "three/addons/geometries/TeapotGeometry.js";
import WebGL from "three/addons/capabilities/WebGL.js";
import { GUI } from "dat.gui";
import dat from "dat.gui";

//Canvas
const canvas = document.querySelector('canvas.webgl');

//we need 4 basic elements: scene, objects, camera and renderer

//Scene
//is a container where we put the objects, models, particles, light, etc.
const scene = new THREE.Scene();

//Object
//can include primitive goemetries, imported models, particles, lights
//create a material for the mesh
const materialBase = new THREE.MeshBasicMaterial({color: "pink"}); 
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
//Right EAr
const capsuleEarRight = new THREE.CapsuleGeometry( 1, 5, 10, 20 );
const capsuleEarRightMesh = new THREE.Mesh(capsuleEarRight, materialBase);
//positioning and rotations
capsuleEarRightMesh.position.set(-6, 8, 2);
capsuleEarRightMesh.rotation.set(Math.PI/8,0,0);

scene.add(capsuleEarRightMesh) //adding the mesh to the scene

//Left Ear
const capsuleEarLeft = new THREE.CapsuleGeometry( 1, 5, 10, 20 );
const capsuleEarLeftMesh = new THREE.Mesh(capsuleEarLeft, materialBase);
//positioning and rotations
capsuleEarLeftMesh.position.set(-6, 8, -2);
capsuleEarLeftMesh.rotation.set(-Math.PI/8,0,0);

scene.add(capsuleEarLeftMesh); //adding the mesh to the scene

//Capsule Legs - we need to make four of them
//Right Front Leg
const capsuleLegRightFront = new THREE.CapsuleGeometry( 1, 5, 10, 20 );
const capsuleLegRightFrontMesh = new THREE.Mesh(capsuleLegRightFront, materialBase);
//positioning and rotations
capsuleLegRightFrontMesh.position.set(-5, -3, -2);
capsuleLegRightFrontMesh.rotation.set(Math.PI/8,0,0);

scene.add(capsuleLegRightFrontMesh);//adding the mesh to the scene
//using the translate property to help with control of the animation. this helps change the pivot point for the swing animation
capsuleLegRightFrontMesh.geometry.translate(0,-3,0);
//Left Front Leg
const capsuleLegLeftFront = new THREE.CapsuleGeometry( 1, 5, 10, 20 );
const capsuleLegLeftFrontMesh = new THREE.Mesh(capsuleLegLeftFront, materialBase);
//positioning and rotations
capsuleLegLeftFrontMesh.position.set(-5, -3, 2);
capsuleLegLeftFrontMesh.rotation.set(-Math.PI/8,0,0);

scene.add(capsuleLegLeftFrontMesh);//adding the mesh to the scene
//using the translate property to help with control of the animation. this helps change the pivot point for the swing animation
capsuleLegLeftFrontMesh.geometry.translate(0,-3,0);
//Right Rear Leg
const capsuleLegRightRear = new THREE.CapsuleGeometry( 1, 5, 10, 20 );
const capsuleLegRightRearMesh = new THREE.Mesh(capsuleLegRightRear, materialBase);
//positioning and rotations
capsuleLegRightRearMesh.position.set(5, -4, -2);
capsuleLegRightRearMesh.rotation.set(Math.PI/8,0,0);

scene.add(capsuleLegRightRearMesh);//adding the mesh to the scene
//using the translate property to help with control of the animation. this helps change the pivot point for the swing animation
capsuleLegRightRearMesh.geometry.translate(0,-2,0);
//Left Rear Leg
const capsuleLegLeftRear = new THREE.CapsuleGeometry( 1, 5, 10, 20 );
const capsuleLegLeftRearMesh = new THREE.Mesh(capsuleLegLeftRear, materialBase);
//positioning and rotations
capsuleLegLeftRearMesh.position.set(5, -4, 2);
capsuleLegLeftRearMesh.rotation.set(-Math.PI/8,0,0);

scene.add(capsuleLegLeftRearMesh);//adding the mesh to the scene
//using the translate property to help with control of the animation. this helps change the pivot point for the swing animation
capsuleLegLeftRearMesh.geometry.translate(0,-2,0);

//On/Off Sphere Material
const sphereMaterialBase = new THREE.MeshBasicMaterial({
    color: "green",
    transparent: true,
    opacity: 0.5 // Semi-transparent
});
//Sphere that covers the bunny
const encapSphere = new THREE.SphereGeometry( 16, 64, 32 );
const encapSphereMesh = new THREE.Mesh(encapSphere, sphereMaterialBase);

scene.add(encapSphereMesh);//adding the mesh to the scene

//Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
scene.add(camera);//adding the camera to the scene

//Renderer
//will render the scene seen from the camera's point of view (will take a picture of your scene and provide you that picture on the canvas)
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//Axes Helper
//to help me visualize coordinates
//https://threejs.org/docs/#api/en/helpers/AxesHelper
const axesHelper = new THREE.AxesHelper(20); //axes of length 5 units
scene.add(axesHelper);//adding the axes helper to the scene

//setting up a spherical variable for the camera's position
let spherical = {
    radius: 40,
    theta: 4.7,//Math.PI,
    phi: 1.39//Math.PI/2
};

//control sphere variable for the toggle on/off of the encapsulating sphere
let controlSphere = {
    isVisible: true //control the visibility of the sphere
};

//control variable for the toggle on/off of the animation
let controlAnimation = {
    swingAnimation: true, //swingAnimation set to true to enable a toggle for the "running" animation
}

//setting the encapsulating sphere to visible
encapSphereMesh.visible = controlSphere.isVisible;

//setting up the position of the camera using the spherical varible
camera.position.setFromSphericalCoords(spherical.radius, spherical.phi, spherical.theta);
camera.lookAt(0, 0, 0);//the camera revolves around the origin

//GUI
const gui = new dat.GUI();
//using the spherical properties to define multiple controls for the camera
gui.add(spherical, 'radius', 1, 100).onChange(updateCameraPosition);//distance from the origin
gui.add(spherical, 'theta', 0, Math.PI * 2).onChange(updateCameraPosition);//horizontal rotation
gui.add(spherical, 'phi', 0, Math.PI).onChange(updateCameraPosition);//verical rotation

gui.add(controlSphere, 'isVisible').name('Show Sphere').onChange(value => {
    encapSphereMesh.visible = value; //visibility of the sphere based on the checkbox
});

gui.add(controlAnimation, 'swingAnimation').name('Swing Animation').onChange(value => {
    //reset
    if (value) {
        clock.start(); //restart the clock if you want to reset the animation timing
    } else {
        clock.stop(); //stopp the clock to pause the animation state
    }
});

//function toe 
function updateCameraPosition() {
    camera.position.setFromSphericalCoords(spherical.radius, spherical.phi, spherical.theta);//changes the value of the radius, 
    camera.lookAt(0, 0, 0);//the camera revolves around the origin
}

let clock = new THREE.Clock();
let speed = 2;//speed of the swing
let amplitude = Math.PI / 4;//amplitude of the swing (in radians)

function animate() {
    requestAnimationFrame(animate);

    if (controlAnimation.swingAnimation) {
        let time = clock.getElapsedTime();

        //apply swinging motion around the X-axis
        capsuleLegRightFrontMesh.rotation.z = Math.sin(time * speed) * amplitude; //using sin and cos functions to differnetiate the movement of rear/front legs
        capsuleLegLeftFrontMesh.rotation.z = Math.sin(time * speed) * amplitude;
        capsuleLegRightRearMesh.rotation.z = Math.cos(time * speed) * amplitude;
        capsuleLegLeftRearMesh.rotation.z = Math.cos(time * speed) * amplitude;
    }

    renderer.render(scene, camera);
}

animate();

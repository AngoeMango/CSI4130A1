import * as THREE from "three";
import { TeapotGeometry } from "three/addons/geometries/TeapotGeometry.js";
import WebGL from "three/addons/capabilities/WebGL.js";
import { GUI } from "dat.gui";
//Canvas
const canvas = document.querySelector('canvas.webgl')

//we need 4 basic elements: scene, objects, camera and renderer

//Scene
//is a container where we put the objects, models, particles, light, etc.
const scene = new THREE.Scene()

//Object
//can include primitive goemetries, imported models, particles, lights

const materialBase = new THREE.MeshBasicMaterial({ color: 'pink'}) //create a material for the mesh
//making my whole bunny pink 

//Cylinder Torso
const cylinderTorso = new THREE.CylinderGeometry( 4, 6, 12, 64 ) //create a "cyclinder" with rtop, rbottom, height, radialSegments, *
//mesh is a combination of a geometry (the shape) and a material (how it looks)
const cylinderTorsoMesh = new THREE.Mesh(cylinderTorso, materialBase) //combine the geometry and the material to make a mesh
//positioning and rotations
cylinderTorsoMesh.position.set(0, 0, 0)
cylinderTorsoMesh.rotation.set(Math.PI/2,0,2)

scene.add(cylinderTorsoMesh) //adding the mesh to the scene

//Capsule Head
const capsuleHead = new THREE.CapsuleGeometry( 5, 5, 32, 64) //create a calpsule with r, l, capSegments, radialSegments
//mesh is a combination of a geometry (the shape) and a material (how it looks)
const capsuleHeadMesh = new THREE.Mesh(capsuleHead, materialBase) //combine the geometry and the material to make a mesh
//positioning and rotations
capsuleHeadMesh.position.set(-10, 4, 0)
capsuleHeadMesh.rotation.set(Math.PI/2,0.5,2)

scene.add(capsuleHeadMesh) //adding the mesh to the scene

//CapsuleEars - we need to make two of them 
const capsuleEarRight = new THREE.CapsuleGeometry(1, 5, 10, 20)
const capsuleEarRightMesh = new THREE.Mesh(capsuleEarRight, materialBase)
//positioning and rotations
capsuleEarRightMesh.position.set(-5, 15, 0)
capsuleEarRightMesh.rotation.set(Math.PI/2,2,2)

scene.add(capsuleEarRightMesh) //adding the mesh to the scene


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
    width: 800,
    height: 600
}

//Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width/sizes.height)
// camera.position.x = 1
// camera.position.y = 0
// camera.position.z = 3
camera.position.set(0, 0, 75)
scene.add(camera)

//Renderer
//will render the scene seen from the camera's point of view (will take a picture of your scene and provide you that picture on the canvas)
const renderer = new THREE.WebGLRenderer({ 
    canvas: canvas 
})
renderer.setSize(sizes.width, sizes.height) //setting the size fo the renderer

renderer.render(scene, camera)
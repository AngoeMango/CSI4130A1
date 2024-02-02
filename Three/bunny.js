import * as THREE from "three";
import { TeapotGeometry } from "three/addons/geometries/TeapotGeometry.js";
import WebGL from "three/addons/capabilities/WebGL.js";
import { GUI } from "dat.gui";

let camera = 0;
let renderer = 0;

// initialization of Three.js
function init() {
    // Check if WebGL is available see Three/examples
    // No need for webgl2 here - change as appropriate
    if (WebGL.isWebGLAvailable() === false) {
        // if not print error on console and exit
        document.body.appendChild(WebGL.getWebGLErrorMessage());
    }
    // add our rendering surface and initialize the renderer
    var container = document.createElement("div");
    document.body.appendChild(container);

    var info = document.createElement("div");
    info.style.position = "absolute";
    info.style.top = "5px";
    info.style.left = "5px";
    info.style.width = "100%";
    info.style.textAlign = "left";
    info.style.color = "lightblue";
    info.innerHTML = "row 0<br>row 1<br>row 2<br>row 3";
    container.appendChild(info);

    // WebGL2 examples suggest we need a canvas
    // canvas = document.createElement( 'canvas' );
    // var context = canvas.getContext( 'webgl2' );
    // var renderer = new THREE.WebGLRenderer( { canvas: canvas, context: context } );
    renderer = new THREE.WebGLRenderer();
    // set some state - here just clear color
    renderer.setClearColor(new THREE.Color(0x333333));
    renderer.setSize(window.innerWidth, window.innerHeight);
    // add the output of the renderer to the html element
    container.appendChild(renderer.domElement);

    // All drawing will be organized in a scene graph
    var scene = new THREE.Scene();
    // A camera with fovy = 90deg means the z distance is y/2
    var szScreen = 120;

    // show axes at the origin
    var axes = new THREE.AxesHelper(10);
    scene.add(axes);

    // Create the body
    const bodyGeometry = new THREE.CylinderGeometry(0.5, 0.5, 2, 32);
    const bodyMaterial = new THREE.MeshPhongMaterial({ color: 0xffe4c4 });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.rotation.x = Math.PI / 2; // Rotate the cylinder to lay horizontally

    // Create the head
    const headGeometry = new THREE.SphereGeometry(0.5, 32, 32);
    const headMaterial = new THREE.MeshPhongMaterial({ color: 0xffe4c4 });
    const head = new THREE.Mesh(headGeometry, headMaterial);
    head.position.set(0, 1, 0); // Adjust position relative to the body

    // Parent the head to the body so they move together
    body.add(head);
// need a camera to look at things
    // calcaulate aspectRatio
    var aspectRatio = window.innerWidth / window.innerHeight;
    // Camera needs to be global
    camera = new THREE.PerspectiveCamera(90, aspectRatio, 1, 1000);
    // position the camera back and point to the center of the scene
    camera.position.z = szScreen / 2;
    camera.lookAt(scene.position);

    // render the scene
    renderer.render(scene, camera);

    // setup the control gui
    var controls = new (function () {
        this.speed = -10;
        this.center = "Sun";
        this.perspective = "Perspective";
        this.switchCamera = function () {
            // if (camera instanceof THREE.PerspectiveCamera) {
            if (this.perspective === "Perspective") {
                var aspect = window.innerWidth / window.innerHeight;
                // camera = new THREE.OrthographicCamera(window.innerWidth / -2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / -2, -100, 100);
                camera = new THREE.OrthographicCamera(
                    (szScreen * aspect) / -2,
                    (szScreen * aspect) / 2,
                    szScreen / 2,
                    szScreen / -2,
                    -500,
                    500
                );
                camera.position.z = szScreen / 2;
                updateAt(this.center);
                this.perspective = "Orthographic";
                updateMatDisplay();
            } else {
                camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 1, 1000);
                camera.position.z = szScreen / 2;
                updateAt(this.center);
                this.perspective = "Perspective";
                updateMatDisplay();
            }
        };
        this.look = function () {
            if (this.center == "Sun") {
                this.center = "Earth";
            } else {
                this.center = "Sun";
            }
            updateAt(this.center);
        };
    })();

    this.updateMatDisplay = function () {
        // Change message in tag "output" in the HTML
        var projMat = camera.projectionMatrix.clone();
        projMat.transpose();
        var proj = projMat.elements;
        proj = proj.map(function (nEle) {
            return nEle.toFixed(3);
        });
        var projString = "<pre>".concat("[ ", proj.slice(0, 4), " ]\n");
        projString = projString.concat("[ ", proj.slice(4, 8), " ]\n");
        projString = projString.concat("[ ", proj.slice(8, 12), " ]\n");
        projString = projString.concat("[ ", proj.slice(12, 16), " ]</pre>");
        // Change info message
        info.innerHTML = projString;
    };

    this.updateAt = function (locStr) {
        if (locStr == "Sun") {
            camera.lookAt(sun.position);
        } else {
            var posEarth = earthGroup.matrixWorld.elements.slice(12, 16);
            camera.lookAt(posEarth[0], posEarth[1], posEarth[2]);
        }
    };

    var gui = new GUI();
    gui.add(controls, "speed", -15, -1).onChange(controls.redraw);
    gui.add(controls, "switchCamera");
    gui.add(controls, "perspective").listen();
    gui.add(controls, "look");
    gui.add(controls, "center").listen();
    updateMatDisplay();
    render();

    function render() {
        // render using requestAnimationFrame - register function
        requestAnimationFrame(render);
        var speed = 2 ** controls.speed;
        // earth group rotates arond sun
        earthRotGroup.rotation.z = (earthRotGroup.rotation.z + 3 * speed) % (2.0 * Math.PI);
        // Teapot has to compensate to stay on top of earth
        earthGroup.rotation.z = (earthGroup.rotation.z - 3 * speed) % (2.0 * Math.PI);
        // saturn group rotates arond sun
        saturnRotGroup.rotation.z = (saturnRotGroup.rotation.z + speed) % (2.0 * Math.PI);
        // saturn ring and moon rotate around saturn
        saturnGroup.rotation.x = (saturnGroup.rotation.x + 5 * speed) % (2.0 * Math.PI);
        saturnGroup.rotation.y = (saturnGroup.rotation.y + 5 * speed) % (2.0 * Math.PI);
        scene.updateMatrixWorld();
        updateAt(controls.center);
        renderer.render(scene, camera);
    }
}

function onResize() {
    console.log("Resizing");

    var aspect = window.innerWidth / window.innerHeight;
    if (camera instanceof THREE.PerspectiveCamera) {
        camera.aspect = aspect;
    } else {
        camera.top = szScreen / 2;
        camera.bottom = szScreen / -2;
        camera.left = (szScreen * aspect) / -2;
        camera.right = (szScreen * aspect) / 2;
    }
    camera.updateProjectionMatrix();
    // If we use a canvas then we also have to worry of resizing it
    renderer.setSize(window.innerWidth, window.innerHeight);
    updateMatDisplay();
}

window.onload = init;

// register our resize event function
window.addEventListener("resize", onResize, true);
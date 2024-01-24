//import * as BABYLON from '@babylonjs/core';
//import * as BABYLON from "./node_modules/@babylonjs/core";

const canvas = document.getElementById('renderCanvas');

const engine = new BABYLON.Engine(canvas);

const createScene = async function(){
  const scene = new BABYLON.Scene(engine);

//scene.createDefaultCameraOrLight(true, false, true);
// scene.createDefaultLight();
// const camera = new BABYLON.UniversalCamera('camera', new BABYLON.Vector3(0,1,-30), scene);
 const camera = new BABYLON.ArcRotateCamera('camera', Math.PI, 0, 0, new BABYLON.Vector3(0, 0,0), scene)
 camera.attachControl(true);
 //camera.setPosition(new BABYLON.Vector3(0,0,-5));

//  camera.lowerAlphaLimit = Math.PI/2;
//  camera.upperAlphaLimit = Math.PI /1;

 camera.lowerBetaLimit = Math.PI /3;
 camera.upperBetaLimit = (Math.PI /2)-0.1;

 camera.lowerRadiusLimit = 11;
 camera.upperRadiusLimit = 15;

 camera.panningSensibility = 0;

// camera.inputs.addMouseWheel();
// camera.setTarget(BABYLON.Vector3.Zero());


// const box = new BABYLON.MeshBuilder.CreateBox("myBox", {
//   size: 0.1,
//   width: 2,
//   height: 0.05,
//   depth: 0.5,
//   faceColors: [
//     new BABYLON.Color4(1, 0, 0, 1)
//   ]
// });

// const ground = new BABYLON.MeshBuilder.CreateGround('', {
//   width: 10,
//   height: 10,
//   subdivisions: 5,
//   subdivisionsX: 10
// })
// ground.material = new BABYLON.StandardMaterial();
// ground.material.wireframe = true;

// const groundFromHM = new BABYLON.MeshBuilder.CreateGroundFromHeightMap('','/heightmap.png', {
//   height: 10,
//   width: 10,
//   subdivisions: 50,
//   maxHeight: 4
// });
// groundFromHM.material = new BABYLON.StandardMaterial();
// groundFromHM.material.wireframe = true;

// const fontData = await (await fetch('/Montserrat_Regular.json')).json();
// const text = BABYLON.MeshBuilder.CreateText('', 'My Text', fontData, {
//   size: 2,
//   depth: 0.1,
//   resolution: 64
// });

// const sphere = new BABYLON.MeshBuilder.CreateSphere('mySphere', {
//   segments: 50,
//   diameter: 0.3,
//   diameterY: 0.4
// }, scene);

// const sphereMaterial = new BABYLON.StandardMaterial();
// sphere.material = sphereMaterial;
// sphereMaterial.diffuseColor =new BABYLON.Color3(0,1,0);
// sphereMaterial.specularColor =new BABYLON.Color3(1,0,0);
// sphereMaterial.ambientColor =new BABYLON.Color3(0,1,1);
// scene.ambientColor =new BABYLON.Color3(0,1,1);



//Import Card01
const card01 = BABYLON.SceneLoader.ImportMeshAsync("", "/CardFiles/", "Card001Scene.babylon");

//Import Full Deck Player
const fullDeckPlayer = BABYLON.SceneLoader.ImportMeshAsync("", "/CardFiles/", "FullDeck.babylon");
fullDeckPlayer.then((result) => {
  // Assuming `mesh` is the imported mesh object
  result.meshes[0].position = new BABYLON.Vector3(-3, 0, 3);
  
});

//Import Full Deck Player
const fullDeckOpponent = BABYLON.SceneLoader.ImportMeshAsync("", "/CardFiles/", "FullDeck.babylon");
fullDeckOpponent.then((result) => {
  // Assuming `mesh` is the imported mesh object
  result.meshes[0].position = new BABYLON.Vector3(3, 0, -3);
  result.meshes[0].rotation = new BABYLON.Vector3(0,0,0);
});
 
//ground plnae
  const groundPlane = new BABYLON.MeshBuilder.CreatePlane("ground",{ 
    width: 87/8,
    height: 107/8
  });
  groundPlane.rotation = new BABYLON.Vector3(Math.PI/2, Math.PI/2, 0);
  const groundPlaneMaterial = new BABYLON.StandardMaterial();
  groundPlane.material = groundPlaneMaterial;
  
//ground texture
  const groundTexture = new BABYLON.Texture("groundBG.jpg", scene);
  groundPlaneMaterial.diffuseTexture = groundTexture;



    // // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    // var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);

    // // Default intensity is 1. Let's dim the light a small amount
    // light.intensity = 0.7;

    

 

    var hdrTexture = new BABYLON.CubeTexture("/CardFiles/textures/environment.env", scene);
    scene.createDefaultSkybox(hdrTexture, true, 10000, .1);


    const light = new BABYLON.DirectionalLight("DirectionalLight", new BABYLON.Vector3((7*Math.PI)/6, -1, 0), scene);
  light.intensity= 2;


  return scene;
}

const scene = await createScene();

engine.runRenderLoop(function(){
  scene.render();
});

window.addEventListener('resize', function(){
  engine.resize();
})

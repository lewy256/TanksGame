function createPlayer() {
    // create player body and collision
    playerShape = new CANNON.Sphere(3);
    playerBody = new CANNON.Body({ mass: 1 });
    playerBody.addShape(playerShape);
    playerBody.position.set(25, 3, 5);
    playerBody.linearDamping = 0.9;
    world.addBody(playerBody);



    //controls
    controls = new PointerLockControls(camera, playerBody);
    scene.add(controls.getObject());

    //load model
    let objLoader = new THREE.OBJLoader();
    let mtlLoader = new THREE.MTLLoader();
    mtlLoader.load("../models/pistol.mtl", function (material) {
        material.preload();
        objLoader.setMaterials(material);
    });

    objLoader.load("../models/pistol.obj", function (mesh) {
        scene.add(mesh);
        mesh.position.set(2, -1, -2.8);
        mesh.rotation.y = -Math.PI / 12;
        //add model to camera
        camera.add(mesh);
    });
}
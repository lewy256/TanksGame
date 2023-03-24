function createTank(x,y,z) {
    let tankHp=10;
    //loading tank model
    let objLoader = new THREE.OBJLoader();
    let mtlLoader = new THREE.MTLLoader();
    mtlLoader.load("../models/tank.mtl", function (tankMaterial) {
        tankMaterial.preload();
        objLoader.setMaterials(tankMaterial);
    });

    objLoader.load("../models/tank.obj", function (tankMesh) {
        tankMesh.traverse(function (node) {
            if (node instanceof THREE.Mesh) {
                node.castShadow = true;
                node.receiveShadow = true;
            }
        });

        //collision size
        let extents = new CANNON.Vec3(4.7, 4, 2.5);
        let tankShape = new CANNON.Box(extents);
        let tankBody = new CANNON.Body({ mass: 500 });
        //collision position
        tankBody.position.set(x-2, y, z);
        //tank position
        tankMesh.position.set(x,y,z);
        tankBody.addShape(tankShape);
        world.addBody(tankBody);
        scene.add(tankMesh);
        //show fire
        let count = 0;
        tankBody.addEventListener("collide", function (e) {
            count += 1;
            if (count === tankHp) {
                clock = new THREE.Clock();
                //fire
                let texture = new THREE.TextureLoader().load("../textures/fire.png");

                let fire = new THREE.Fire(texture);
                fire.position.set(x-2, y+1, z);
                fire.scale.set(15, 10, 10);

                scene.add(fire);
                fires.push(fire);
                //remove shadows when fire appears
                tankMesh.traverse(function (node) {
                    if (node instanceof THREE.Mesh) {
                        node.castShadow = false;
                        node.receiveShadow = false;
                    }
                });
            }
        });
    });
}



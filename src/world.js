function createWorld() {
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x000000, 0, 500);

    //lights and shadows
    let light = new THREE.PointLight(0xffffff, 10, 100);
    light.position.set(0, 20, 0);
    light.castShadow = true;
    light.shadow.camera.near = 0.1;
    light.shadow.camera.far = 100;
    scene.add(light);

    //setup world
    world = new CANNON.World();
    world.gravity.set(0, -20, 0);

    //floor collision
    let groundShape = new CANNON.Plane();
    let groundBody = new CANNON.Body({ mass: 0 });
    groundBody.addShape(groundShape);
    groundBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2);
    world.addBody(groundBody);

    //floor geometry
    let floorGeometry = new THREE.PlaneGeometry(3000, 3000, 50, 50);
    floorGeometry.applyMatrix(new THREE.Matrix4().makeRotationX(- Math.PI / 2));
    let floorMaterial = new THREE.MeshLambertMaterial({ color: 0xB1B1B1 });
    let floorMesh = new THREE.Mesh(floorGeometry, floorMaterial);
    floorMesh.castShadow = true;
    floorMesh.receiveShadow = true;
    scene.add(floorMesh);

    //create a city
    let buildingGeometry = new THREE.CubeGeometry(1, 1, 1);
    buildingGeometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0.5, 0));
    let cityGeometry = new THREE.Geometry();
    for (let i = 0; i < 300; i++) {
        let building = new THREE.Mesh(buildingGeometry.clone());
        building.position.x = Math.floor(Math.random() * 80 - 100) * 4;
        building.position.z = Math.floor(Math.random() * 80 - 100) * 4;
        building.scale.x = Math.random() * 50 + 10;
        building.scale.y = Math.random() * building.scale.x * 4 + 4;
        building.scale.z = building.scale.x;
        THREE.GeometryUtils.merge(cityGeometry, building);
    }
    let textureCity = new THREE.ImageUtils.loadTexture('../textures/city.jpg')
    let materialCity = new THREE.MeshBasicMaterial({ map: textureCity });
    let city = new THREE.Mesh(cityGeometry, materialCity);
    scene.add(city);

    //barrier
    let sphereGeom = new THREE.SphereGeometry(250, 90, 45, 30, 15);
    let greenMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00, transparent: true, opacity: 0.8, side: THREE.DoubleSide });
    let sphere = new THREE.Mesh(sphereGeom.clone(), greenMaterial);
    sphere.position.set(-100, 50, -50);
    scene.add(sphere);

    //tanks
    for (let i = 0; i < 60; i+=12) {
        createTank(0, 4, i );
    }

    //renderer
    renderer = new THREE.WebGLRenderer();
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.BasicShadowMap;
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(scene.fog.color, 1);

    document.body.appendChild(renderer.domElement);
}
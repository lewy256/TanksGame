function moveBullet() {
    let bulletShape = new CANNON.Sphere(0.2);
    let bulletBody = new CANNON.Body({mass: 1});
    bulletBody.addShape(bulletShape);
    world.addBody(bulletBody);
    bullets.push(bulletBody);

    let bulletTexture = new THREE.ImageUtils.loadTexture('../textures/fire.png');
    let bulletMaterial = new THREE.MeshBasicMaterial({map: bulletTexture});
    let bulletGeometry = new THREE.SphereGeometry(bulletShape.radius, 32, 32);
    let bulletMesh = new THREE.Mesh(bulletGeometry, bulletMaterial);
    scene.add(bulletMesh);
    bulletMeshes.push(bulletMesh);

    let shootDirection = new THREE.Vector3();
    shootDirection.set(0, 0, 1);

    let bulletSource=camera;
    bulletSource.position.set(-1.8,0.5,0);

    let projector = new THREE.Projector();
    projector.unprojectVector(shootDirection, bulletSource);

    let ray = new THREE.Ray(camera.position, shootDirection.sub(playerBody.position).normalize());
    shootDirection.copy(ray.direction);

    bulletBody.velocity.set(shootDirection.x * 100, shootDirection.y * 100, shootDirection.z * 100);

    let x = playerBody.position.x+ shootDirection.x*playerShape.radius ;
    let y = playerBody.position.y+ shootDirection.y*playerShape.radius ;
    let z = playerBody.position.z+ shootDirection.z*playerShape.radius ;
    bulletBody.position.set(x, y, z);
    bulletMesh.position.set(x, y, z);
}


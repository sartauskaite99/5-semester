$(function () {
    var scene = new THREE.Scene();
    let cameraToggle = 1;
    var direction = '';
    var TILE_SIZE = 10;
    var stats = initStats();
    var lightA = new THREE.PointLight(0xFFFFFF,2,400);
        lightA.position.set(400,-100,100);
        scene.add(lightA);
    var lightB = new THREE.PointLight(0xFFFFFF,2,400);
        lightB.position.set(0,400,100);
        scene.add(lightB);
    var lightC = new THREE.PointLight(0xFFFFFF,2,400);
        lightC.position.set(0,-100,100);
        scene.add(lightC);
    var lightD = new THREE.PointLight(0xFFFFFF,2,400);
        lightD.position.set(400,400,100);
        scene.add(lightD);
    var lightE = new THREE.PointLight(0xFFFFFF,2,400);
        lightE.position.set(200,200,150);
        scene.add(lightE);
    var camera2, camera3;
    var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 2, 5000);
        var webGLRenderer = new THREE.WebGLRenderer();
        webGLRenderer.setClearColor(0xEEEEEE, 1.0);
        webGLRenderer.setSize(window.innerWidth, window.innerHeight);
        webGLRenderer.shadowMapEnabled = true;
        camera.position.z = 1000;

        let camera1 = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 2, 2000);
        camera1.position.y = 175;
        camera1.position.x = 175;
        camera1.position.z = 700;
        camera1.lookAt(scene.position);
	// v\ar renderer = createRenderer();
	// var camera = addCamera();
    var rook = addRook();
    // camera.lookAt(scene.position);
    scene.add(rook);
	scene.add(addAmbientLight());
    scene.add(addSpotLight());
    createBoard()
    camera2 = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 2, 1000);
    camera2.position.y = 175 + 45*5;
    camera2.position.x = 30;
    camera2.position.z = 300;
    camera2.lookAt(new THREE.Vector3(rook.position.x, 0, 24));
    const helper2 = new THREE.CameraHelper(camera2);
        // scene.add(helper2);

    camera3 = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 2, 1000);
    camera3.position.y = 300;
    camera3.position.x = 0;
    camera3.position.z = 35;
    camera3.lookAt(rook.position);
	$("#WebGL-output").append(webGLRenderer.domElement);
	var cameraControls = new THREE.TrackballControls(camera1, webGLRenderer.domElement);
    //menu();
    
    
	const buttons = document.querySelectorAll(".chess-button");
    buttons.forEach(button => {
        button.addEventListener("click", () => moveFigure(button.textContent));
    });

    function moveFigure(text) {
        if(!direction){
            direction = text;
        }
    }
    let diff
    let rotation
    function move (){
        if(!direction){
            return;
        }
        cameraControl(pressed)
    
        if(direction === 'kaire' ){
            if(rook.position.x > -35){
                // if (rook.position.x > camera3.position.x) {
                //     console.log(rook.position.x)
                //     diff = Math.sin((-Math.PI / (2 * 16)) * rook.position.x);
                //     rotation = diff * Math.PI / 2 - Math.PI / 2
                //     camera3.rotation.x = rotation;
                //     camera3.updateProjectionMatrix();
                // }
                rook.position.x -= 2;
                return;
            }
        }
        if(direction === 'desine' ){
            if(rook.position.x < 35){
                // if (rook.position.x > camera3.position.x) {
                //     console.log(rook.position.x)
                //     diff = Math.sin((-Math.PI / (59 )) * -1*rook.position.x);
                //     rotation = diff * Math.PI / 2 - Math.PI / 2
                //     camera3.rotation.z = rotation;
                //     camera3.updateProjectionMatrix();
                // }
                rook.position.x += 2;
                return;
            }
        }
        direction = "";
        //console.log(rook.position.x)
        // console.log(camera3.position.x)
        // if (rook.position.x > camera3.position.x) {
        //     console.log(camera3.position.x)
        //     diff = Math.sin((-Math.PI / (2 * 16)) * rook.position.x);
        //     rotation = diff * Math.PI / 2 - Math.PI / 2
        //     camera3.rotation.x = rotation;
        //     camera3.updateProjectionMatrix();
        // }
    }
    
    
    
    render();
    let camera2_pos = -20
    var distance = camera2.position.distanceTo(rook);
	let eyeTargetScale = Math.tan(camera2.fov * (Math.PI / 180)/2 ) * distance;
    function dollyZoom(zoom) {

        camera2.position.x = camera2_pos - camera2_pos * zoom / 50;
        camera2.position.z = camera2_pos - camera2_pos * zoom / 50;
        
        target = new THREE.Vector3();
        target.set(rook.position.x, rook.position.y + 10, rook.position.z)
        distance = camera2.position.distanceTo(target);
    
    
        camera2.near = distance / 100;
        camera2.far = distance + 100;
        camera2.fov = (180 / Math.PI) * 2 * Math.atan(eyeTargetScale / distance);
        camera2.lookAt(target);
        
        camera2.updateProjectionMatrix();
        //camera2.updateMatrixWorld();
        helper2.update();
    }
    var controls = new function () {
        

        this.camera1Fov = 45;
        this.camera2Fov = 45;
        this.C2 = false;
        this.C3 = false;

        this.camera1FovFunc = function () {  
            camera1.fov = controls.camera1Fov;
            //dollyZoom(controls.camera2Fov -73);
            camera1.updateProjectionMatrix();
        };

        this.camera2FovFunc = function () {  
            camera2.fov = controls.camera2Fov;
            camera2.position.y = 175 + controls.camera2Fov*5;
            camera2.position.x = 30;
            camera2.position.z = 300;
            camera2.lookAt(new THREE.Vector3(rook.position.x, 0, 24));
            camera2.updateProjectionMatrix();
        };

        this.showC2 = function (){
            if(!controls.C2){
                scene.remove(helper2);
            }else{
                helper2.update();
                scene.add(helper2);
            }
        }

    }
    var gui = new dat.GUI();
    gui.add(controls, 'camera1Fov', 0, 180).name("FOV").step(1).onChange(controls.camera1FovFunc);
    gui.add(controls, 'camera2Fov', 25, 50).name("Dolly-Zoom").step(1).onChange(controls.camera2FovFunc);
    var C2Controller = gui.add(controls, 'C2').name("C2").listen();
        C2Controller.onChange(controls.showC2);
    var pressed =""
    const buttonsCamera = document.querySelectorAll(".chess-camera");
    buttonsCamera.forEach(button => {
        button.addEventListener("click", () => cameraControl(button.textContent));
        pressed = button.textContent;
    });
	function render() {
        //renderer.render(scene, camera);
        //stats.update()
        cameraControls.update(); 
        
        move();
        requestAnimationFrame(render);
        //whatCamera()
		
		
    }
    function initStats() {

        var stats = new Stats();
        stats.setMode(0); // 0: fps, 1: ms

        // Align top-left
        stats.domElement.style.position = 'absolute';
        stats.domElement.style.left = '0px';
        stats.domElement.style.top = '0px';

        $("#Stats-output").append(stats.domElement);

        return stats;
    }

	function addSpotLight()
	{
		var spotLight = new THREE.SpotLight( 0xffffff );
		spotLight.position.set( -40, 60, -10 );
		spotLight.castShadow = true;
		return spotLight;
	}

	function addAmbientLight()
	{
		var ambiColor = "#0C0C0C";
		var ambientLight = new THREE.AmbientLight(ambiColor);
		return ambientLight;
	}
	function addCamera()
	{
		var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
		camera.position.x = -30;
		camera.position.y = 40;
		camera.position.z = 30;
		return camera;
    }
    function createBoard() {
        var height = 2;
        var board_size = 8;

        var cubeGeometry = new THREE.BoxGeometry(TILE_SIZE, height, TILE_SIZE);
        var cubeMaterialBlack = new THREE.MeshLambertMaterial({ color: 0xFFFFFF });
        var cubeMaterialWhite = new THREE.MeshLambertMaterial({ color: 0x0F0F0F });

        var x_start_position = -1 * (TILE_SIZE / 2 + TILE_SIZE * 3);
        var z_start_position = -1 * (TILE_SIZE / 2 + TILE_SIZE * 3);
        var x_current = x_start_position;
        var z_current = z_start_position;

        var white = 1;

        for (var i = 0; i < board_size; i++) {
            for (var j = 0; j < board_size; j++) {
                if (white == 1) {
                    var plane = new THREE.Mesh(cubeGeometry, cubeMaterialWhite);
                    white = 0;
                }
                else if (white == 0) {
                    var plane = new THREE.Mesh(cubeGeometry, cubeMaterialBlack);
                    white = 1;
                }
                plane.castShadow = true;
                plane.receiveShadow = true;
                plane.position.x = x_current;
                plane.position.y = -height / 2;
                plane.position.z = z_current;
                x_current += TILE_SIZE;
                scene.add(plane);

            }
            x_current = x_start_position
            z_current += TILE_SIZE;
            if (white == 1) {
                white = 0;
            }
            else {
                white = 1;
            }
        }

    }

    function cameraControl(cameraSelect){
        if(cameraSelect === "camera1"){
            cameraToggle = 1;
        }
        if(cameraSelect === "camera2"){
            cameraToggle = 2;
        }
        if(cameraSelect === "camera3"){
            cameraToggle = 3;
        }
        pressed = cameraSelect
        camera3.lookAt(rook.position);
        if (rook.position.x > camera3.position.x) {
            console.log(rook.position.x)
            diff = Math.sin((-Math.PI / (50 )) * rook.position.x);
            rotation = diff * Math.PI / 2 - Math.PI / 2
            camera3.rotation.z = rotation;
            camera3.updateProjectionMatrix();
        }
        // camera2.position.x = 30;
         camera2.updateProjectionMatrix();
        webGLRenderer.render(scene, camera3);
        webGLRenderer.render(scene, camera2);
        webGLRenderer.render(scene, camera1);
        if(cameraToggle === 1){
            webGLRenderer.render(scene, camera1);
        }
        if(cameraToggle === 2){
            webGLRenderer.render(scene, camera2);
        }
        if(cameraToggle === 3){
            webGLRenderer.render(scene, camera3);
        }
        
    }
    
    function addRook()
    {
        var points = [
            //crown
            new THREE.Vector2(0,9.5),
            new THREE.Vector2(0.5,9.5),
            new THREE.Vector2(1.85, 9.5),
            new THREE.Vector2(2, 11.05),
            new THREE.Vector2(1.85, 11.05),
            new THREE.Vector2(1.6, 10.85),
            new THREE.Vector2(1.6, 10.3),
            new THREE.Vector2(1.45, 10.1),
            new THREE.Vector2(1.45, 9.8),
            new THREE.Vector2(1.5, 5.5),
            new THREE.Vector2(1.75, 5.2),
            new THREE.Vector2(1.63, 4.9),
            // start of crown
            new THREE.Vector2(1.85, 4.4),
            new THREE.Vector2(1.8, 4),
            new THREE.Vector2(2.15, 3.5),
            new THREE.Vector2(2.5, 3),
            new THREE.Vector2(2.6, 2.8),
            new THREE.Vector2(2.5, 2.6),
            //transition
            new THREE.Vector2(2.2, 2.3),
            new THREE.Vector2(2.05, 2),

            //first ring
            new THREE.Vector2(2.2,1.7),
            new THREE.Vector2(2.5,1.5),
            new THREE.Vector2(2.7,1.3),
            //transition
            new THREE.Vector2(2.9,1),
            new THREE.Vector2(3,0.6),
            // second ring
            new THREE.Vector2(3,0.3),
            new THREE.Vector2(2.9,0),
            new THREE.Vector2(0,0)
            
        ];
        var rookpoint = [];
        for(var i = 0; i < points.length; i++)
        {
            rookpoint.push(points[i]);
        }
        var latheGeometry = new THREE.LatheGeometry(rookpoint, 12);
        var material = new THREE.MeshPhongMaterial({color: 0xA0522D,side: THREE.DoubleSide});
        var rook = new THREE.Mesh(latheGeometry, material);
        rook.position.x = -35;
		rook.position.y = 0.05;
		rook.position.z = 35;
        return rook;
    }
	
});
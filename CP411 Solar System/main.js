var milkyWay, pointLight, sun, mercury, mercuryOrbit, venus, venusOrbit, moon, earth, earthOrbit, mars, marsOrbit,
 callisto, io, europa, ganymede, jupiter, jupiterOrbit, saturn, saturnOrbit, uranus, uranusOrbit, triton, neptune, neptuneOrbit, saturnRing1, saturnRing2,
 saturnRing3, saturnRing4, controls, camera, renderer, scene;
var planetSegments = 48;
var sunRadius = 109;
var orbitWidth = 0.2;
var planetInfo = [""]
/*Distance between planets is set to 1/4 length*/
/*Merucry*/
var mercuryData = planetData(87.97, 0.0002558, sunRadius + 11.365 , "mercury", "img/mercury.jpg", 0.3830, planetSegments);

/*Venus*/
var venusData = planetData(224.7, 0.0001285, sunRadius + 21.2325, "earth", "img/venus.jpg", 0.9498, planetSegments);
/*Earth*/
var earthData = planetData(365.2564, 0.015, sunRadius + 29.35, "earth", "img/earth.jpg", 1, planetSegments);
var moonData = planetData(29.5, 0.01, 2.8, "moon", "img/moon.jpg", 0.2727, planetSegments);
/*Mars*/
var marsData = planetData(686.98, 0.014, sunRadius + 44.725, "earth", "img/mars.jpg", 0.5321, planetSegments);
/*Jupiter*/
var jupiterData = planetData(4331.940904, 0.03636, sunRadius + 152.775, "earth", "img/jupiter.jpg", 10.97, planetSegments);
var callistoData = planetData(16.6, 0.01, 12.1, "callisto", "img/callisto.jpg", 0.3223, planetSegments);
var ioData = planetData(1.75, 0.01, 13.7, "io", "img/io.jpg", 0.2435, planetSegments);
var europaData = planetData(3.551, 0.01, 15.3, "europa", "img/europa.jpg", 0.2098, planetSegments);
var ganymedeData = planetData(7.1667, 0.01, 19, "ganymede", "img/ganymede.jpg", 0.3521, planetSegments);
/*Saturn*/
var saturnData = planetData(10760.453544, 0.03378,sunRadius + 281.25, "earth", "img/saturn.jpg", 9.144, planetSegments);
/*Uranus*/
var uranusData = planetData(30685.190164, 0.02088, sunRadius + 564.5, "earth", "img/uranus.jpg", 3.981, planetSegments);
/*Neptune*/
var neptuneData = planetData(60190.602156, 0.0225, sunRadius + 883.75, "earth", "img/neptune.jpg", 3.866, planetSegments);
var tritonData = planetData(5.875, 0.01, 6.066, "triton", "img/triton.jpg", .1809, planetSegments);


var orbitData = {value: 200, runOrbit: true, runRotation: true};
var planetInfo = {mercury: "PLANET: MERCURY \nDISTANCE FROM SUN: 57.91 MILLION KM \nDIAMETER: 4 878 KM \nORBIT SPEED: 47.362 KM/S \nPERMANENT NATURAL SATTELITES: 0", venus: "PLANET: VENUS \nDISTANCE FROM SUN: 108.94 MILLION KM \nDIAMETER: 12 104 KM \nORBIT SPEED: 35.02 KM/S \nPERMANENT NATURAL SATTELITES: 0",
 earth:  "PLANET: EARTH \nDISTANCE FROM SUN: 149.6 MILLION KM \nDIAMETER: 12 756 KM \nORBIT SPEED: 27.78 KM/S \nPERMANENT NATURAL SATTELITES: 1", mars: "PLANET: MARS \nDISTANCE FROM SUN: 227.34 MILLION KM \nDIAMETER: 6 794 KM \nORBIT SPEED: 24.01 KM/S \nPERMANENT NATURAL SATTELITES: 2",
  jupiter: "PLANET: JUPITER \nDISTANCE FROM SUN: 778.57 MILLION KM \nDIAMETER: 142 984 KM \nORBIT SPEED: 13.07 KM/S \nPERMANENT NATURAL SATTELITES: 79", saturn:  "PLANET: SATURN \nDISTANCE FROM SUN: 1433.53 MILLION KM \nDIAMETER: 120 536 KM \nORBIT SPEED: 9.68 KM/S \nPERMANENT NATURAL SATTELITES: 82",
   uranus: "PLANET: URANUS \nDISTANCE FROM SUN: 19.21 AU \nDIAMETER: 51 118 KM \nORBIT SPEED: 6.8 KM/S \nPERMANENT NATURAL SATTELITES: 27 \n*ONE AU = 149.6 MILLION KM", neptune: "PLANET: NEPTUNE \nDISTANCE FROM SUN: 30.11 AU \nDIAMETER: 49 532 KM \nORBIT SPEED: 5.43 KM/S \nPERMANENT NATURAL SATTELITES: 14 \n*ONE AU = 149.6 MILLION KM"
};
var focusChoice = {Planet: ""};
var ambientLightToggle = {ambient: true};
var infoType = {name: false, distance: false, circumference: false, orbitalVelocity: false, }
var clock = new THREE.Clock();

/**
 * This eliminates the redundance of having to type property names for a planet object.
 * @param {type} myOrbitRate decimal
 * @param {type} myRotationRate decimal
 * @param {type} myDistanceFromAxis decimal
 * @param {type} myName string
 * @param {type} myTexture image file path
 * @param {type} mySize decimal
 * @param {type} mySegments integer
 * @returns {planetData.mainAnonym$0}
 */
function planetData(myOrbitRate, myRotationRate, myDistanceFromAxis, myName, myTexture, mySize, mySegments) {
    return {
        orbitRate: myOrbitRate
        , rotationRate: myRotationRate
        , distanceFromAxis: myDistanceFromAxis
        , name: myName
        , texture: myTexture
        , size: mySize
        , segments: mySegments
    };
}

/**
 * create a visible ring and add it to the scene.
 * @param {type} size decimal
 * @param {type} innerDiameter decimal
 * @param {type} facets integer
 * @param {type} myColor HTML color
 * @param {type} name string
 * @param {type} distanceFromAxis decimal
 * @returns {THREE.Mesh|myRing}
 */
function createRing(size, innerDiameter, facets, myColor, name, distanceFromAxis) {
    var ring1Geometry = new THREE.RingGeometry(size, innerDiameter, facets);
    var ring1Material = new THREE.MeshBasicMaterial({color: myColor, side: THREE.DoubleSide});
    var myRing = new THREE.Mesh(ring1Geometry, ring1Material);
    myRing.name = name;
    myRing.position.set(distanceFromAxis, 0, 0);
    myRing.rotation.x = Math.PI / 2;
    myRing.castShadow = true;
    scene.add(myRing);
    return myRing;
}

/**
 * Simplifies the creation of materials used for visible objects.
 * @param {type} type
 * @param {type} color
 * @param {type} myTexture
 * @returns {THREE.MeshLambertMaterialTHREE.MeshBasicMaterial}
 */
function createMaterial(type, color, myTexture) {
    var materialOptions = {
        color: color === undefined ? 'rgb(255, 255, 255)' : color,
        map: myTexture === undefined ? null : myTexture
    };

    switch (type) {
        case 'basic':
            return new THREE.MeshBasicMaterial(materialOptions);
        case 'lambert':
            return new THREE.MeshLambertMaterial(materialOptions);
        default:
            return new THREE.MeshBasicMaterial(materialOptions);
    }
}

/**
 *  Draws all of the Orbits to be shown in the scene.
 * @returns {undefined}
 */
function createVisiblesOrbits() {

    mercuryOrbit = createRing(mercuryData.distanceFromAxis + orbitWidth
        , mercuryData.distanceFromAxis - orbitWidth
        , 320
        , 0x696969
        , "mercuryOrbit"
        , 0);

  venusOrbit = createRing(venusData.distanceFromAxis + orbitWidth
        , venusData.distanceFromAxis - orbitWidth
        , 320
        , 0x696969
        , "venusOrbit"
        , 0);

   earthOrbit = createRing(earthData.distanceFromAxis + orbitWidth
       , earthData.distanceFromAxis - orbitWidth
       , 320
       , 0x696969
       , "earthOrbit"
       , 0);

  marsOrbit = createRing(marsData.distanceFromAxis + orbitWidth
       , marsData.distanceFromAxis - orbitWidth
       , 320
       , 0x696969
       , "marsOrbit"
       , 0);

   jupiterOrbit = createRing(jupiterData.distanceFromAxis + orbitWidth
       , jupiterData.distanceFromAxis - orbitWidth
       , 320
       , 0x696969
       , "jupiterOrbit"
       , 0);

   saturnOrbit = createRing(saturnData.distanceFromAxis + orbitWidth
       , saturnData.distanceFromAxis - orbitWidth
       , 320
       , 0x696969
       , "saturnOrbit"
       , 0);

   uranusOrbit = createRing(uranusData.distanceFromAxis + orbitWidth
       , uranusData.distanceFromAxis - orbitWidth
       , 320
       , 0x696969
       , "uranusOrbit"
       , 0);

   neptuneOrbit = createRing(neptuneData.distanceFromAxis + orbitWidth
       , neptuneData.distanceFromAxis - orbitWidth
       , 320
       , 0x696969
       , "neptuneOrbit"
       , 0);
}

/**
 * Simplifies the creation of a sphere.
 * @param {type} material THREE.SOME_TYPE_OF_CONSTRUCTED_MATERIAL
 * @param {type} size decimal
 * @param {type} segments integer
 * @returns {getSphere.obj|THREE.Mesh}
 */
function getSphere(material, size, segments) {
    var geometry = new THREE.SphereGeometry(size, segments, segments);
    var obj = new THREE.Mesh(geometry, material);
    obj.castShadow = true;

    return obj;
}


/**
 * Creates a planet and adds it to the scene.
 * @param {type} myData data for a planet object
 * @param {type} x integer
 * @param {type} y integer
 * @param {type} z integer
 * @param {type} myMaterialType string that is passed to createMaterial()
 * @returns {getSphere.obj|THREE.Mesh|createTexturedPlanet.myPlanet}
 */
function createTexturedPlanet(myData, x, y, z, myMaterialType) {
    var myMaterial;
    var passThisTexture;

    if (myData.texture && myData.texture !== "") {
        passThisTexture = new THREE.ImageUtils.loadTexture(myData.texture);
    }
    if (myMaterialType) {
        myMaterial = createMaterial(myMaterialType, "rgb(255, 255, 255 )", passThisTexture);
    } else {
        myMaterial = createMaterial("lambert", "rgb(255, 255, 255 )", passThisTexture);
    }

    myMaterial.receiveShadow = true;
    myMaterial.castShadow = true;
    var myPlanet = getSphere(myMaterial, myData.size, myData.segments);
    myPlanet.receiveShadow = true;
    myPlanet.name = myData.name;
    scene.add(myPlanet);
    myPlanet.position.set(x, y, z);

    return myPlanet;
}

/**
 * Simplifies creating a light that disperses in all directions.
 * @param {type} intensity decimal
 * @param {type} color HTML color
 * @returns {THREE.PointLight|createPointLight.light}
 */
function createPointLight(intensity, color) {
    var light = new THREE.PointLight(color, intensity,0);
    light.castShadow = true;
    return light;
}

/**
 * Move the planet around its orbit, and rotate it.
 * @param {type} myPlanet
 * @param {type} myData
 * @param {type} myTime
 * @param {type} stopRotation optional set to true for rings
 * @returns {undefined}
 */
function translatePlanet(myPlanet, myData, myTime, stopRotation) {
    if (orbitData.runRotation && !stopRotation) {
        myPlanet.rotation.y += myData.rotationRate;
    }
    if (orbitData.runOrbit) {
        myPlanet.position.x = Math.cos(myTime
                * (1.0 / (myData.orbitRate * orbitData.value)) + 10.0)
                * myData.distanceFromAxis;
        myPlanet.position.z = Math.sin(myTime
                * (1.0 / (myData.orbitRate * orbitData.value)) + 10.0)
                * myData.distanceFromAxis;

    }
}

/**
 * Move the moon around its orbit with the planet, and rotate it.
 * @param {type} myMoon
 * @param {type} myPlanet
 * @param {type} myData
 * @param {type} myTime
 * @returns {undefined}
 */
function translateMoon(myMoon, myPlanet, myData, myTime) {
    translatePlanet(myMoon, myData, myTime);
    if (orbitData.runOrbit) {
        myMoon.position.x = myMoon.position.x + myPlanet.position.x;
        myMoon.position.z = myMoon.position.z + myPlanet.position.z;
    }
}

function infoSwitch(value){

if (value == ""){
  createVisiblesOrbits();
  document.getElementById("info").innerText = "";
  document.getElementById("infoContainer").style.display = "none";
  camera.position.x = 30;
  camera.position.y = 30;
  camera.position.z = -1500;
  mercury.remove(camera);
  venus.remove(camera);
  earth.remove(camera);
  mars.remove(camera);
  jupiter.remove(camera);
  saturn.remove(camera);
  uranus.remove(camera);
  neptune.remove(camera);
}else{
  document.getElementById("infoContainer").style.display = "block";
  if(value == "mercury"){
    document.getElementById("info").innerText = planetInfo.mercury;
    mercuryOrbit = createRing(mercuryData.distanceFromAxis + orbitWidth
      , mercuryData.distanceFromAxis - orbitWidth
      , 320
      , 0xffffff
      , "mercuryOrbit"
      , 0);
      camera.position.x = 150;
      mercury.add(camera);
  }else{
    mercuryOrbit = createRing(mercuryData.distanceFromAxis + orbitWidth
        , mercuryData.distanceFromAxis - orbitWidth
        , 320
        , 0x696969
        , "mercuryOrbit"
        , 0);
  }

  if(value == "venus"){
  document.getElementById("info").innerText = planetInfo.venus;
  venusOrbit = createRing(venusData.distanceFromAxis + orbitWidth
      , venusData.distanceFromAxis - orbitWidth
      , 320
      , 0xffffff
      , "venusOrbit"
      , 0);
      camera.position.x = 150;
      venus.add(camera);
  }else{
    venusOrbit = createRing(venusData.distanceFromAxis + orbitWidth
        , venusData.distanceFromAxis - orbitWidth
        , 320
        , 0x696969
        , "venusOrbit"
        , 0);
  }
  if(value == "earth"){
  document.getElementById("info").innerText = planetInfo.earth;
  earthOrbit = createRing(earthData.distanceFromAxis + orbitWidth
      , earthData.distanceFromAxis - orbitWidth
      , 320
      , 0xffffff
      , "earthOrbit"
      , 0);
      camera.position.x = 150;
      earth.add(camera);

  }else{
    earthOrbit = createRing(earthData.distanceFromAxis + orbitWidth
        , earthData.distanceFromAxis - orbitWidth
        , 320
        , 0x696969
        , "earthOrbit"
        , 0);
  }
  if(value == "mars"){
    document.getElementById("info").innerText = planetInfo.mars;
    marsOrbit = createRing(marsData.distanceFromAxis + orbitWidth
         , marsData.distanceFromAxis - orbitWidth
         , 320
         , 0xffffff
         , "marsOrbit"
         , 0);
         camera.position.x = 150;
         mars.add(camera);
  }else{
    marsOrbit = createRing(marsData.distanceFromAxis + orbitWidth
         , marsData.distanceFromAxis - orbitWidth
         , 320
         , 0x696969
         , "marsOrbit"
         , 0);
  }
if(value == "jupiter"){
  document.getElementById("info").innerText = planetInfo.jupiter;
  jupiterOrbit = createRing(jupiterData.distanceFromAxis + orbitWidth
      , jupiterData.distanceFromAxis - orbitWidth
      , 320
      , 0xffffff
      , "jupiterOrbit"
      , 0);
      camera.position.x = 150;
      jupiter.add(camera);
}else{
  jupiterOrbit = createRing(jupiterData.distanceFromAxis + orbitWidth
      , jupiterData.distanceFromAxis - orbitWidth
      , 320
      , 0x696969
      , "jupiterOrbit"
      , 0);
}
if(value == "saturn"){
  document.getElementById("info").innerText = planetInfo.saturn;
  saturnOrbit = createRing(saturnData.distanceFromAxis + orbitWidth
      , saturnData.distanceFromAxis - orbitWidth
      , 320
      , 0xffffff
      , "saturnOrbit"
      , 0);
      camera.position.x = 150;
      saturn.add(camera);
}else{
  saturnOrbit = createRing(saturnData.distanceFromAxis + orbitWidth
      , saturnData.distanceFromAxis - orbitWidth
      , 320
      , 0x696969
      , "saturnOrbit"
      , 0);
}
if(value == "uranus"){
  document.getElementById("info").innerText = planetInfo.uranus;
  uranusOrbit = createRing(uranusData.distanceFromAxis + orbitWidth
      , uranusData.distanceFromAxis - orbitWidth
      , 320
      , 0xffffff
      , "uranusOrbit"
      , 0);
      camera.position.x = 150;
      uranus.add(camera);
}else{
  uranusOrbit = createRing(uranusData.distanceFromAxis + orbitWidth
      , uranusData.distanceFromAxis - orbitWidth
      , 320
      , 0x696969
      , "uranusOrbit"
      , 0);
}
if(value == "neptune"){
  document.getElementById("info").innerText = planetInfo.neptune;
  neptuneOrbit = createRing(neptuneData.distanceFromAxis + orbitWidth
      , neptuneData.distanceFromAxis - orbitWidth
      , 320
      , 0xffffff
      , "neptuneOrbit"
      , 0);
      camera.position.x = 150;
      neptune.add(camera);
}else{
  neptuneOrbit = createRing(neptuneData.distanceFromAxis + orbitWidth
      , neptuneData.distanceFromAxis - orbitWidth
      , 320
      , 0x696969
      , "neptuneOrbit"
      , 0);
}
}
}


/**
 * This function is called in a loop to create animation.
 * @param {type} renderer
 * @param {type} scene
 * @param {type} camera
 * @param {type} controls
 * @returns {undefined}
 */
function update(renderer, scene, camera, controls) {
    pointLight.position.copy(sun.position);
    controls.update();

    var time = Date.now();

    translatePlanet(mercury, mercuryData, time);
    translatePlanet(venus, venusData, time);
    translatePlanet(earth, earthData, time);
    translateMoon(moon, earth, moonData, time);
    translatePlanet(mars, marsData, time);
    translatePlanet(jupiter, jupiterData, time);
    translateMoon(callisto, jupiter, callistoData, time);
    translateMoon(io, jupiter, ioData, time);
    translateMoon(europa, jupiter, europaData, time);
    translateMoon(ganymede, jupiter, ganymedeData, time);
    translatePlanet(saturn, saturnData, time);
    translatePlanet(saturnRing1, saturnData, time, true);
    translatePlanet(saturnRing2, saturnData, time, true);
    translatePlanet(saturnRing3, saturnData, time, true);
    translatePlanet(saturnRing4, saturnData, time, true);
    translatePlanet(uranus, uranusData, time);
    translatePlanet(neptune, neptuneData, time);
    translateMoon(triton, neptune, tritonData, time);

    renderer.render(scene, camera);
    requestAnimationFrame(function () {
        update(renderer, scene, camera, controls);
    });
}

/**
 * This is the function that starts everything.
 * @returns {THREE.Scene|scene}
 */
function init() {
    // Create the camera that allows us to view into the scene.
    camera = new THREE.PerspectiveCamera(
            45, // field of view
            window.innerWidth / window.innerHeight, // aspect ratio
            1, // near clipping plane
            50000 // far clipping plane
            );
    camera.position.z = 30;
    camera.position.x = -1500;
    camera.position.y = 30;
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    // Create the scene that holds all of the visible objects.
    scene = new THREE.Scene();

    // Create the renderer that controls animation.
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Attach the renderer to the div element.
    document.getElementById('webgl').appendChild(renderer.domElement);

    // Create controls that allows a user to move the scene with a mouse.
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    // Create light from the sun.
    pointLight = createPointLight(1.5, 0xffffff);
    scene.add(pointLight);

//Create the Milky Way
    material = new THREE.MeshBasicMaterial({
            map: THREE.ImageUtils.loadTexture('cubemap/starryNight.jpg'),
            side: THREE.DoubleSide
        });
       milkyWay = new THREE.Mesh(new THREE.SphereGeometry(15000, 35, 35 ), material);
       scene.add(milkyWay);

    // Create light that is viewable from all directions.
    var ambientLight = new THREE.AmbientLight(0xaaaaaa);
    scene.add(ambientLight);

    // Create the sun.
    var sunMaterial = createMaterial("basic", "rgb(255, 240, 181)");
    sun = getSphere(sunMaterial, 109.3, 48);
    scene.add(sun);

    // Create the glow of the sun.
    var spriteMaterial = new THREE.SpriteMaterial(
            {
                map: new THREE.ImageUtils.loadTexture("../img/glow.png")
                , useScreenCoordinates: false
                , color: 0xffffee
                , transparent: false
                , blending: THREE.AdditiveBlending
            });
    var sprite = new THREE.Sprite(spriteMaterial);
    sprite.scale.set(450, 450, 1.0);
    sun.add(sprite); // This centers the glow at the sun.

    // Create the Earth, the Moon, and a ring around the earth.
    mercury = createTexturedPlanet(mercuryData, mercuryData.distanceFromAxis, 0, 0);
    venus = createTexturedPlanet(venusData, venusData.distanceFromAxis, 0, 0);
    earth = createTexturedPlanet(earthData, earthData.distanceFromAxis, 0, 0);
    moon = createTexturedPlanet(moonData, moonData.distanceFromAxis, 0, 0);
    mars = createTexturedPlanet(marsData, marsData.distanceFromAxis, 0, 0);
    jupiter = createTexturedPlanet(jupiterData, jupiterData.distanceFromAxis, 0, 0);
    callisto = createTexturedPlanet(callistoData, callistoData.distanceFromAxis, 0, 0);
    io = createTexturedPlanet(ioData, ioData.distanceFromAxis, 0, 0);
    europa = createTexturedPlanet(europaData, europaData.distanceFromAxis, 0, 0);
    ganymede = createTexturedPlanet(ganymedeData, ganymedeData.distanceFromAxis, 0, 0);
    saturn = createTexturedPlanet(saturnData, saturnData.distanceFromAxis, 0, 0);
    saturnRing1 = createRing(10.8, 10, 480, 0x564732, "saturnRing1", saturnData.distanceFromAxis);
    saturnRing2 = createRing(13.5, 10.8, 480, 0xFFEBC8, "saturnRing2", saturnData.distanceFromAxis);
    saturnRing3 = createRing(14, 13.5, 480, 0x564732, "saturnRing3", saturnData.distanceFromAxis);
    saturnRing4 = createRing(14, 16, 480, 0xFFEBC8, "saturnRing4", saturnData.distanceFromAxis);
    uranus = createTexturedPlanet(uranusData, uranusData.distanceFromAxis, 0, 0);
    neptune = createTexturedPlanet(neptuneData, neptuneData.distanceFromAxis, 0, 0);
    triton = createTexturedPlanet(tritonData, tritonData.distanceFromAxis, 0, 0);

    // Create the visible Orbit that the Earth uses.
    createVisiblesOrbits();

    // Create the GUI that displays controls.
    var gui = new dat.GUI();
    var folderLight = gui.addFolder('light');
    folderLight.add(pointLight, 'intensity', 0, 10);
    var ambientLightOption = folderLight.add(ambientLightToggle, 'ambient', 0,1);
    ambientLightOption.onChange(function(value){
      scene.remove(ambientLight);
      if(value){
      scene.add(ambientLight);
    }
    });
    var folderOrbit = gui.addFolder('speed');
    folderOrbit.add(orbitData, 'value', 0, 500);
    folderOrbit.add(orbitData, 'runOrbit', 0, 1);
    folderOrbit.add(orbitData, 'runRotation', 0, 1);
    var folderFocus = gui.addFolder("focus");
    var focusController = folderFocus.add(focusChoice, 'Planet',{Mercury: "mercury", Venus: "venus", Earth: "earth", Mars: "mars", Jupiter: "jupiter", Saturn: "saturn", Uranus: "uranus", Neptune: "neptune", None:""})
    focusController.onChange(function(value){
      infoSwitch(value);
    });



    // Start the animation.
    update(renderer, scene, camera, controls);
}


// Start everything.
init();

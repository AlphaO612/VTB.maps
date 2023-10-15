//---------------- VARs ----------------
var count_offices;
var coordinates = [];
var addresses = [];
var load = [];
var myMap;
var authState = false;
var multiRoute=null;
var offices = [];
var atms = [];
var transport = [];
var layer;
var data_offices = [];
var flag = true;
var selected_office;
var user_geo = [];
var center = [55.751574, 37.573856];
var k;
var pMid = [];

//---------------- API ----------------
function getData(){
    $.ajax({
        type: 'GET',
        crossDomain: true,
        dataType: "json",
        url: "http://127.0.0.1/api/getOffices",
        success: function(data) {
            data_offices = data['data'];
            updateMapPoints();
            fillList(myMap);
            getAddresses();
    }});
}
function getCoordinates(){
    for (var i=0; i<data_offices.length; i++){
        coordinates.push(data_offices[i]['pointin']);
    }
}
function getAddresses(){
    for (var i=0; i<data_offices.length; i++){
        addresses.push(data_offices[i]['address']);

    }
}
function getLoad(){
    $.ajax({
        type: 'GET',
        crossDomain: true,
        dataType: "json",
        url: "http://127.0.0.1/api/prediction/"+(new Date()).getDay(),
        success: function(data) {
            load = data['load'];
            updatePoints();
            fillList(myMap);
    }});
}

//---------------- MAP ----------------
function getUserGeo(){
    user_geo = center;
    navigator.geolocation.getCurrentPosition(function (position) {
        user_geo = [position.coords.latitude, position.coords.longitude];
    });
}
function updatePoints(){
    getCoordinates();
    count_offices = coordinates.length;

    offices = [];

    for (var i=0; i<count_offices; i++){
        var indx = load[getIntRandom()];
        var color = loadColor(indx);
        offices.push(new ymaps.Placemark(coordinates[i],
        {
            hintContent: '',
            balloonContent: ''},
        {
            iconLayout: 'default#imageWithContent',
            iconImageHref: 'static/image/'+color,
            iconImageSize: [40, 40],
            iconImageOffset: [-24, -24],
            iconContentOffset: [15, 15],
            iconContentLayout: MyIconContentLayout
    }))}
}
function updateMapPoints(){
    updatePoints();
    for (var i=0; i<count_offices; i++){
        offices[i].events.add('click', function(e){
            var target = e.get('target');
            var t_coordinates = target.geometry.getCoordinates();
            selected_office = coordinates.indexOf(t_coordinates);
            document.getElementsByClassName('adress_text1')[0].innerText = data_offices[selected_office]['address'];

        })
        myMap.geoObjects.add(offices[i]);
    }
}
ymaps.ready(function () {
    getData();
    getLoad();
    getUserGeo();
    myMap= new ymaps.Map('map', {center: center, zoom: 9}, {searchControlProvider: 'yandex#search'});
    MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
        '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
    ),
    myPlacemark = new ymaps.Placemark(myMap.getCenter(), {},
    {
        iconLayout: 'default#image',
        iconImageHref: 'images/myIcon.gif',
        iconImageSize: [30, 42],
        iconImageOffset: [-5, -38]
    });
});
function find_route(pC=null,pD=null){
    var pA = user_geo;
    var pB = coordinates[selected_office];

    if (multiRoute!=null){
        myMap.geoObjects.remove(multiRoute);
    }
    var points = [];
    if (pC==null && pD == null){
        points = [pA,pB];
    } else {
        points = [pA,pC,pD,pB];
    }

    multiRoute = new ymaps.multiRouter.MultiRoute({
            referencePoints: points,
            params: {
                routingMode: 'pedestrian'
            }
        }, {
            wayPointStartIconColor: "#FFFFFF00",
            wayPointStartIconFillColor: "#B3B3B300",
            wayPointFinishIconColor: "#FFFFFF00",
            wayPointFinishIconFillColor: "#B3B3B300",
            wayPointIconColor: "#00000000",
            wayPointIconFillColor: "#00000000",
            boundsAutoApply: true
        });

    myMap.geoObjects.add(multiRoute);
    updateMapPoints();
}
function mathSysanin(){
    var pA = user_geo;
    var pB = coordinates[selected_office];
    console.log(pB);
    pMid = [(pA[0]+pB[0])*0.5,
                (pA[1]+pB[1])*0.5];
    var pOAB = [pA[0]-pB[0],
                pA[1]-pB[1]];
    k = 1 / Math.sqrt(pOAB[0]*pOAB[0] + pOAB[1]*pOAB[1]);
    if (k<1){
        k++;
    } else if (k>50){
        k *= 0.7;
    }
    var x = getRandom(0.0001,0.0001*k);
    var y = (-1)*pOAB[0]/pOAB[1]*x;
    var pC = [  pMid[0]+x,
                pMid[1]+y];
    var pD = [  pMid[0]-x,
                pMid[1]-y];

    find_route(pC,pD);
}
function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}
function getIntRandom(){
  return Math.floor(Math.random() * 6);
}

//---------------- SITE ----------------
function fillList(map = 1){
    for (var j=0;j<2;j++){
        document.getElementsByClassName("list_of_locations")[j].innerHTML = "";
        for (var i=0; i<data_offices.length; i++){
            var indx = load[getIntRandom()];
            var color = loadColor(indx);
            var buttonTextEl = document.createElement("button");
            buttonTextEl.className = "";
            buttonTextEl.value = i;
            buttonTextEl.innerHTML = "<div class=\"item_adress_dist\">"+
                            "<img src=\"static/image/"+color+"\" class=\"mark_big\">"+
                            "<p class=\"adress_text\"> " + data_offices[i]['address'] + "</p>"+
                            "<p class=\"distance\"> " + 4 + " км. </p>"+
                        "</div>";
            if (map != -1){
                buttonTextEl.addEventListener('click', (event) => {
                    map.setZoom(17.5);
                    map.panTo(data_offices[parseInt(event.currentTarget.value)]['pointin'], {
                      flying: 1
                    });
                    if (authState){
                        showInfo();
                        document.getElementsByClassName('adress_text1')[0].innerText =
                            data_offices[parseInt(event.currentTarget.value)]['address'];
                    }
                });
            }
            document.getElementsByClassName("list_of_locations")[j].appendChild(buttonTextEl);
        }
    }
}
function loadColor(l){
    var color;
        if (l<5){
            color = 'green_mark_big.svg';
        } else if (l>5){
            color = 'yellow_mark_big.svg';
        } else{
            color = 'red_mark_big.svg';
        }
    return color;
}

function router(){
    if (document.getElementById('sysanin_cb').checked){
        mathSysanin();
    } else {
        find_route();
    }
}

if (!Array.prototype.indexOf)
{
    Array.prototype.indexOf = function(elt /*, from*/)
    {
        var len = this.length >>> 0;
        var from = Number(arguments[1]) || 0;
        from = (from < 0)
             ? Math.ceil(from)
             : Math.floor(from);
        if (from < 0)
            from += len;
        for (; from < len; from++)
        {
            if (from in this &&
                this[from] === elt)
            return from;
        }
        return -1;
    };
}


showReg = () => {
    document.getElementById('menu2').style.display = 'block';
    document.getElementById('menu1').style.display = 'none';
}
enterAcc = () => {
    document.getElementById('menu4').style.display = 'block';
    document.getElementById('menu2').style.display = 'none';
    authState = true;
}
showOptions = () => {
    document.getElementById('menu3').style.display = 'block';
    document.getElementById('menu4').style.display = 'none';
}
showInfo = () => {
    document.getElementById('menu5').style.display = 'block';
    document.getElementById('menu4').style.display = 'none';
}
backFromMenu = () => {
    document.getElementById('menu4').style.display = 'block';
    document.getElementById('menu3').style.display = 'none';
}
exitAcc = () => {
    document.getElementById('menu1').style.display = 'block';
    document.getElementById('menu4').style.display = 'none';
    authState = !true;
}
exitAcc2 = () => {
    document.getElementById('menu1').style.display = 'block';
    document.getElementById('menu5').style.display = 'none';
    authState = !true;
}
backToMenu = () => {
    document.getElementById('menu4').style.display = 'block';
    document.getElementById('menu5').style.display = 'none';
}
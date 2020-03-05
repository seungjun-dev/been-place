var HOME = new naver.maps.LatLng(37.3595953, 127.1053971);

var data = [new naver.maps.LatLng(37.3595953, 127.1053971),
new naver.maps.LatLng(37.2234324, 127.0000478)];
var marker;
var map;

map = new naver.maps.Map("map", {
    center: HOME,
    zoom: 10 // default 7
});

naver.maps.onJSContentLoaded = function () {
    var dotmap = new naver.maps.visualization.DotMap({
        map: map,
        data: data,
        radius: 10
    });
};

// callback function when the keyword search has done
function placesSearchCB(data, status, pagination) {
    if (status === kakao.maps.services.Status.OK) {
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        var bounds = new kakao.maps.LatLngBounds();

        for (var i = 0; i < data.length; i++) {
            displayMarker(data[i]);
            bounds.extend(new naver.maps.LatLng(data[i].y, data[i].x));
        }

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
        map.setBounds(bounds);
    }
}

// display marker on the map
function displayMarker(place) {
    var coord = new naver.maps.LatLng(place.y, place.x);

    // reset marker
    if (marker != null) {
        marker.setMap(null);
    }

    // set marker to be the center of the map
    map = new naver.maps.Map("map", {
        center: new naver.maps.LatLng(place.y, place.x),
        zoom: 15
    });

    // generate and display marker
    marker = new naver.maps.Marker({
        position: coord,
        map: map
    });
}

function search() {
    var input = document.getElementById("searchInput").value;

    // search object - KAKAO API
    var ps = new kakao.maps.services.Places();

    // search place with the keyword
    ps.keywordSearch(input, placesSearchCB);
}
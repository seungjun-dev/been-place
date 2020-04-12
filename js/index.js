var HOME = new naver.maps.LatLng(37.3595953, 127.1053971);

var markers = [],
    infoWindows = [];
placeList = [];

// search object - KAKAO API
var ps = new kakao.maps.services.Places();

var map = new naver.maps.Map("map", {
    center: HOME,
    zoom: 7 // default 7
});

// Hold for a while
/*naver.maps.onJSContentLoaded = function () {
    var dotmap = new naver.maps.visualization.DotMap({
        map: map,
        data: data,
        radius: 10
    });
};*/

//search more than two places
function searchPlaces() {
    var keyword = document.getElementById("searchInput").value;

    if (!keyword.replace(/^\s+|\s+$/g, '')) {
        alert('키워드를 입력해주세요!');
        return false;
    }

    // search place with the keyword
    ps.keywordSearch(keyword, placesSearchCB);
}

// callback function when the keyword search has done
function placesSearchCB(data, status, pagination) {
    if (status === kakao.maps.services.Status.OK) {
        document.getElementById("menu_wrap").setAttribute("style", "display: block");
        //console.log("data: " + data);
        displayPlaces(data);
        //console.log("pagination: " + pagination)
        displayPagination(pagination);
    } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
        alert('검색 결과가 존재하지 않습니다.');
        return;
    } else if (status === kakao.maps.services.Status.ERROR) {
        alert('검색 결과 중 오류가 발생하였습니다.');
        return;
    }
}

function displayPlaces(places) {
    var listEl = document.getElementById('placesList'),
        menuEl = document.getElementById('menu_wrap'),
        fragment = document.createDocumentFragment(),
        bounds = new naver.maps.LatLngBounds();

    // Initialiaze list elements, markers and infoWindows 
    removeAllChildNods(listEl);
    removeMarker();
    removeInfoWindows();

    for (var i = 0; i < places.length; i++) {

        var placePosition = new naver.maps.LatLng(places[i].y, places[i].x),
            itemEl = getListItem(i, places[i]); // 검색 결과 항목 Element를 생성합니다

        // 마커를 생성하고 지도에 표시합니다        
        addMarker(placePosition, i)

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        bounds.extend(placePosition);

        var infoWindow = new naver.maps.InfoWindow({
            content: '<div style="width:150px;text-align:center;padding:10px;">' + places[i].place_name + '</div>'
        });

        infoWindows.push(infoWindow);
        placeList.push(places[i].place_name);
        fragment.appendChild(itemEl);
    }

    setupHandler();
    // 검색결과 항목들을 검색결과 목록 Element에 추가합니다
    listEl.appendChild(fragment);
    menuEl.scrollTop = 0;

    // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
    //map.setBounds(bounds);
    map.morph(bounds.getCenter(), 10);
}

// 검색결과 항목을 Element로 반환하는 함수입니다
function getListItem(index, places) {

    var el = document.createElement('li'),
        itemStr = '<span class="markerbg marker_' + (index + 1) + '"></span>' +
            '<div class="info">' +
            '   <h5>' + places.place_name + '</h5>';

    if (places.road_address_name) {
        itemStr += '    <span>' + places.road_address_name + '</span>' +
            '   <span class="jibun gray">' + places.address_name + '</span>';
    } else {
        itemStr += '    <span>' + places.address_name + '</span>';
    }

    itemStr += '  <span class="tel">' + places.phone + '</span>' +
        '</div>';

    el.innerHTML = itemStr;
    el.className = 'item';

    el.addEventListener("click", function () {
        //alert(places.place_name);
        popup(places.place_name)
    });

    return el;
}

// 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
function addMarker(position, idx, title) {

    // generate and display marker
    marker = new naver.maps.Marker({
        map: map,
        position: position,
        zIndex: 100
    });

    marker.setMap(map); // 지도 위에 마커를 표출합니다
    markers.push(marker);  // 배열에 생성된 마커를 추가합니다

    return marker;
}

var markerContent = [
    '<div style="position:absolute;">',
    '<div class="infowindow" style="display:none;position:absolute;height:10px;top:-46px;left:-100px;background-color:white;z-index:1;border:1px solid black;margin:0;padding:0;">',
    '</div>',
    '</div>'
].join(''),
    htmlMarker = new naver.maps.Marker({
        position: new naver.maps.LatLng(37.3560258, 127.10203),
        visible: false,
        map: map,
        icon: {
            content: markerContent,
            size: new naver.maps.Size(22, 30),
            anchor: new naver.maps.Point(11, 30)
        }
    }),
    elHtmlMarker = htmlMarker.getElement();

// 해당 마커의 인덱스를 seq라는 클로저 변수로 저장하는 이벤트 핸들러를 반환합니다.
function getMouseOverHandler(seq) {
    return function (e) {
        htmlMarker.setIcon({
            content: '<div style="position:absolute;">'
                + '<div style="white-space:nowrap;font-size:12px;text-align:center;padding:5px;border-width:2px;border-style:solid;border-color:#338DFF;border-radius:4px;z-index:9999;background-color:white;position:absolute;top:-35px;left:15px;">' + placeList[seq] + '</div>'
                + '</div>'
        });
        htmlMarker.setVisible(true);
        htmlMarker.setPosition(markers[seq].getPosition());
        $(elHtmlMarker).find('.infowindow').show();
    }
}

function getMouseOutHandler(seq) {
    return function (e) {
        $(elHtmlMarker).find('.infowindow').hide();
    }
}

function getOnClickHandler(seq) {
    return function (e) {
        //alert(placeList[seq]);
        popup(placeList[seq]);
    }
}

function setupHandler() {
    for (var i = 0, ii = markers.length; i < ii; i++) {
        naver.maps.Event.addListener(markers[i], 'mouseover', getMouseOverHandler(i));
        naver.maps.Event.addListener(markers[i], 'mouseout', getMouseOutHandler(i));
        naver.maps.Event.addListener(markers[i], 'click', getOnClickHandler(i));
    }
}

// 지도 위 InfoWindows 모두 제거하기
function removeInfoWindows() {
    infoWindows = [];
}

// 지도 위에 표시되고 있는 마커를 모두 제거합니다
function removeMarker() {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
    }
    markers = [];
}

// 검색결과 목록 하단에 페이지번호를 표시는 함수입니다
function displayPagination(pagination) {
    var paginationEl = document.getElementById('pagination'),
        fragment = document.createDocumentFragment();

    // 기존에 추가된 페이지번호를 삭제합니다
    while (paginationEl.hasChildNodes()) {
        paginationEl.removeChild(paginationEl.lastChild);
    }

    for (var i = 1; i <= pagination.last; i++) {
        var el = document.createElement('a');
        el.href = "#";
        el.innerHTML = i;

        if (i === pagination.current) {
            el.className = 'on';
        } else {
            el.onclick = (function (i) {
                return function () {
                    pagination.gotoPage(i);
                }
            })(i);
        }

        fragment.appendChild(el);
    }
    paginationEl.appendChild(fragment);
}

// 검색결과 목록의 자식 Element를 제거하는 함수입니다
function removeAllChildNods(el) {
    while (el.hasChildNodes()) {
        el.removeChild(el.lastChild);
    }
}
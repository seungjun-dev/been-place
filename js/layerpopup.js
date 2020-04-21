
function popup(place) {
    var popup = document.getElementById('popup');

    var content = '<div class="wrapper">';
    content += '<h2 class="title">'+place.place_name+'</h2>';
    content += '<h5 class="roadName">'+place.road_address_name+'</h5>';
    if(place.phone!="") {
        content += '<h6 class="phone">'+place.phone+'</h6>';
    }
    content += '<hr>';
    content += '</div>';

    //innerHTML -> html 태그 인식 가능
    //innerText -> html 태그 인식 불가
    popup.innerHTML=content;
    popup.style.display='block';
    //Test 
}  

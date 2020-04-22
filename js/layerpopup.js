
function popup(place) {
    var popup = document.getElementById('popup');

    var content = '<div class="wrapper">';
    content += '<div class="header"><span class="title">'+place.place_name+'</span><a href="'+place.place_url+'"><img id="link" src="../image/link.png"/></a><br>';
    content += '<span class="roadName">'+place.road_address_name+'</span>';
    if(place.phone!="") {
        content += ' / <span class="phone">'+place.phone+'</span>';
    }
    content += '</div><hr>';
    content += '<div class="pics"></div>';
    content += '<div class="reviews"></div>';
    content += '</div>';

    //innerHTML -> html 태그 인식 가능
    //innerText -> html 태그 인식 불가
    popup.innerHTML=content;
    popup.style.display='block';
    //Test 
}  

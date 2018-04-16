$( document ).ready(function() {
    var current = "article";
    console.log("loaded");

    // add underline once mouse is hovered over text
    $("#Video").hover(function() {
        $(this).css("text-decoration", "underline");
    },function(){
        $(this).css("text-decoration", "none");
    });

    $("#Article").hover(function() {
        $(this).css("text-decoration", "underline");
    },function(){
        $(this).css("text-decoration", "none");
    });

    $("#Load").hover(function() {
        $(this).css("text-decoration", "underline");
    },function(){
        $(this).css("text-decoration", "none");
    });

    // video and article button change color
    // will also implement functions later
    $("#Video").click(function() {
        if (current == "article") {
            var article_font_color = $("#Article").css("color");
            var article_back_color = $("#Article").css("background-color");
            var current_font_color = $("#Video").css("color");
            var current_back_color = $("#Video").css("background-color");
            $(this).css("color", article_font_color);
            $(this).css("background-color", article_back_color);
            $("#Article").css("color",current_font_color);
            $("#Article").css("background-color",current_back_color);
            current = "video";
            $(".video-list").show();
            $(".article-list").hide();
        }

    });

    $("#Article").click(function() {
        if (current == "video") {
            var video_font_color = $("#Video").css("color");
            var video_back_color = $("#Video").css("background-color");
            var current_font_color = $("#Article").css("color");
            var current_back_color = $("#Article").css("background-color");
            $(this).css("color", video_font_color);
            $(this).css("background-color", video_back_color);
            $("#Video").css("color",current_font_color);
            $("#Video").css("background-color",current_back_color);
            current = "article";
            $(".article-list").show();
            $(".video-list").hide();
        }
    });

    
    read_content(); 
    load_content(localStorage.getItem("content_data"));

});

function load_content(content) {
    var temp = JSON.parse(content);
    var idList = [];
    var str = [];
    console.log(temp.count);
    var a_i = 0;
    var v_i = 0;
    for (var i = 0; i < temp.count; i++){ 
        if (temp.data[i].metadata.contentType == "article") {
            idList.push(temp.data[i].contentId);
            $("#a_section_0").append("<li class = \"a_item-body\" id = \"a_body" + a_i + "\"> </li>");
            // $("#a_section_0").append("<ul class = \"a_item\" id = \"a_item" + a_i + "\"> </ul>");

            // $("#a_item" + a_i).append("<li class = \"a_item-body\" id = \"a_body" + a_i + "\"> </li>");

            // $("#a_body" + a_i).append("<div class = \"a_item-thumbnail\" id = \"a_thumbnail" + a_i + "\"> </div>");

            $("#a_body" + a_i).append("<img class = \"a_item-image\" id = \"a_image" + a_i + "\" src = " + temp.data[i].thumbnails[0].url + "></img>");

            // $("#a_body" + a_i).append("<div class = \"a_item-details\" id = \"a_detail" + a_i + "\"> </div>");

            // $("#a_detail" + a_i).append("<div class = \"a_item-label\" id = \"a_label" + a_i + "\"> </div>");

            // $("#a_detail" + a_i).append("<div class = \"a_item-nav\" id = \"a_nav" + a_i + "\"> </div>");

            var time = timeDifference(temp.data[i].metadata.publishDate);
            $("#a_body" + a_i).append("<span class = \"a_item-timeago\" id = \"a_time" + a_i + "\">"+ time +"  -  </span>");

            $("#a_body" + a_i).append("<div class = \"fa\" id = \"acomment" + a_i + "\"></div>");
            // change icon
            acomment_icon(a_i);

            $("#a_body" + a_i).append("<span class = \"a_comment\" id = \"a_comment" + temp.data[i].contentId + "\"></span>");

            $("#a_body" + a_i).append("<h3 class = \"a_item-title\" id = \"a_title" + a_i + "\">" + temp.data[i].metadata.title + "</h3>");

            a_i = a_i + 1;
            str.push("article");
        } else if (temp.data[i].metadata.contentType == "video") {
            console.log("video time");
            idList.push(temp.data[i].contentId);
            $("#v_section_0").append("<li class = \"v_item-body\" id = \"v_body" + v_i + "\"> </li>");
            // $("#v_section_0").append("<ul class = \"v_item\" id = \"v_item" + v_i + "\"> </ul>");

            // $("#v_item" + v_i).append("<li class = \"v_item-body\" id = \"v_body" + v_i + "\"> </li>");

            // $("#v_body" + v_i).append("<div class = \"v_item-thumbnail\" id = \"v_thumbnail" + v_i + "\"> </div>");

            $("#v_body" + v_i).append("<img class = \"v_item-image\" id = \"v_image" + v_i + "\" src = " + temp.data[i].thumbnails[0].url + "></img>");

            // $("#v_body" + v_i).append("<div class = \"v_item-details\" id = \"v_detail" + v_i + "\"> </div>");

            // $("#v_detail" + v_i).append("<div class = \"v_item-label\" id = \"v_label" + v_i + "\"> </div>");

            // $("#v_detail" + v_i).append("<div class = \"v_item-nav\" id = \"v_nav" + v_i + "\"> </div>");

            var duration = temp.data[i].metadata.duration;
            var quotient = Math.floor(duration / 60);
            var remainder = duration % 60;
            if (Math.floor(remainder / 10) == 0) {
                remainder = '0' + remainder;
            }
            console.log(quotient + ":" + remainder);
            $("#v_body" + v_i).append("<span class = \"fa fa-play-circle\" id = \"vplay" + v_i + "\"></div>");

            $("#v_body" + v_i).append("<span class = \"v_duration\" id = \"v_dur" + v_i + "\">"+ quotient + ":" + remainder + "</span>");

            var time = timeDifference(temp.data[i].metadata.publishDate);
            $("#v_body" + v_i).append("<span class = \"v_item-timeago\" id = \"v_time" + v_i + "\">" + time + "  -  </span>");

            $("#v_body" + v_i).append("<div class = \"fa\" id = \"vcomment" + v_i + "\"></div>");
            // change icon
            vcomment_icon(v_i);

            $("#v_body" + v_i).append("<span class = \"v_comment\" id = \"v_comment" + temp.data[i].contentId + "\"></span>");

            $("#v_body" + v_i).append("<h3 class = \"v_item-title\" id = \"v_title" + v_i + "\">" + temp.data[i].metadata.title + "</h3>");

            v_i = v_i + 1;
            str.push("video");
        }
    }
    console.log(idList);
    read_comments(idList);
    var commentList = JSON.parse(localStorage.getItem("comment"));

    for (var i = 0; i < idList.length; i++) {
        if (str[i] == "article") {
            $("#a_comment" + commentList.content[i].id).text(commentList.content[i].count);
        } else if (str[i] == "video") {
            $("#v_comment" + commentList.content[i].id).text(commentList.content[i].count);
        }
    }

}

var comment;

function vcomment_icon(id){
    let chain = document.getElementById('vcomment' + id);
    chain.innerHTML = "&#xf075;";
}

function acomment_icon(id){
    let chain = document.getElementById('acomment' + id);
    chain.innerHTML = "&#xf075;";
}

function read_content() {
    console.log("read_content");
    var s = document.createElement("script");
    s.src = "https://ign-apis.herokuapp.com/content?startIndex=0\u0026count=20\u0026callback=call1";
    console.log("After read content");
    document.body.appendChild(s);

}

function call1(response) {
    localStorage.setItem("content_data", JSON.stringify(response));
    for (var i = 0; i < response.count; i++){
        if (response.data[i].metadata.contentType == "article") {
        }
    }
}

function read_comments(content) {
    console.log("read_comments");
    var s = document.createElement("script");
    console.log(content)
    s.src = "https://ign-apis.herokuapp.com/comments?ids=" + content + "\u0026callback=call2";
    console.log("After read comment");
    document.body.appendChild(s);
}

function call2(response) {
    localStorage.setItem("comment", JSON.stringify(response));
}

function timeDifference(time) {
    var res = [];
    // 2018-03-31T17:00:38+0000
    console.log("time is: "+ time);
    res.push(time.substring(0, 4)); // year
    res.push(time.substring(5, 7)); // month
    res.push(time.substring(8, 10)); // day
    res.push(time.substring(11, 13)); // hour
    res.push(time.substring(14, 16)); // min
    res.push(time.substring(17, 19)); // sec
    var date = new Date(time.substring(0, 4), time.substring(5, 7), time.substring(8, 10), time.substring(11, 13), time.substring(14, 16), time.substring(17, 19), 0);
    var diff = relative_time(time);
    console.log(diff);
    return diff;
}

function relative_time(date_str) {
    if (!date_str) {return;}
    date_str = $.trim(date_str);
    date_str = date_str.replace(/\.\d\d\d+/,""); // remove the milliseconds
    date_str = date_str.replace(/-/,"/").replace(/-/,"/"); //substitute - with /
    date_str = date_str.replace(/T/," ").replace(/Z/," UTC"); //remove T and substitute Z with UTC
    date_str = date_str.replace(/([\+\-]\d\d)\:?(\d\d)/," $1$2"); // +08:00 -> +0800
    var parsed_date = new Date(date_str);
    var relative_to = (arguments.length > 1) ? arguments[1] : new Date(); //defines relative to what ..default is now
    var delta = parseInt((relative_to.getTime()-parsed_date)/1000);
    delta=(delta<2)?2:delta;
    var r = '';
    if (delta < 60) {
    r = delta + 'sec';
    } else if(delta < 120) {
    r = '1min';
    } else if(delta < (45*60)) {
    r = (parseInt(delta / 60, 10)).toString() + 'min';
    } else if(delta < (2*60*60)) {
    r = '1h';
    } else if(delta < (24*60*60)) {
    r = '' + (parseInt(delta / 3600, 10)).toString() + 'h';
    } else if(delta < (48*60*60)) {
    r = '1d';
    } else {
    r = (parseInt(delta / 86400, 10)).toString() + 'd';
    }
    return r;
};

function changeImg(imgName, imgSrc) {
        document[imgName].src = imgSrc;
        return true;
}


function noSpam() {
    var a = document.getElementsByTagName("a");
    for (var i = 0; i < a.length; i++) {
        if ( (a[i].href.search(/emailform\b/) != -1) && (a[i].className.search(/force_form\b/) == -1) ) {
            var nodes = a[i].childNodes;
            var email = '';
            for (var j = 0; j < nodes.length; j++) {
                    if (nodes[j].innerHTML) {
                        if (nodes[j].className.search(/caption/) == -1) {
                            email += nodes[j].innerHTML; 
                        }
                    } else {
                        email += nodes[j].data; 
                    }
            }
            email = email.replace(/\s/g, '.');
            email = email.replace(/∂/g, '@');
            // a[i].innerHTML = email;
            if (email.search(/@/) != -1) a[i].href = "mailto:" + email;
        }
    }
}

function remove_liststyle() {
    if (document.getElementById("right-row")) {
        var lis = document.getElementById("right-row").getElementsByTagName("li");
        for(i=0;i<lis.length;i++) {
            if (lis[i].firstChild.nodeName.toUpperCase() == 'A' ) {
                lis[i].firstChild.style.backgroundImage = 'none';
                lis[i].firstChild.style.paddingLeft ='0';
            }
        }
    }
}
 
function collapseFAQ() {
    spans = new Array();
    spans = document.getElementsByTagName("p");
    for(i=0; i<spans.length; i++) {
        if (spans[i].id == '') {
            if ((spans[i].className == 'faq_question') || (spans[i].className == 'faq_answer')) {
                spans[i].id = 'FAQ'; // für IE
                spans[i].setAttribute('name', 'FAQ'); // für FF
            }
        }
    }
    spans = document.getElementsByTagName("span");
    for(i=0; i<spans.length; i++) {
        if (spans[i].id == '') {
            if ((spans[i].className == 'faq_question') || (spans[i].className == 'faq_answer')) {
                spans[i].id = 'FAQ'; // für IE
                spans[i].setAttribute('name', 'FAQ'); // für FF
            }
        }
    }
    spans = document.getElementsByTagName("div");
    for(i=0; i<spans.length; i++) {
        if (spans[i].id == '') {
            if ((spans[i].className == 'faq_question') || (spans[i].className == 'faq_answer')) {
                spans[i].id = 'FAQ'; // für IE
                spans[i].setAttribute('name', 'FAQ'); // für FF
            }
        }
    }
    spans = document.getElementsByName("FAQ");
    var counter_question = 0;
    var counter_answer = 0;
    for(i=0; i<spans.length; i++) {
        if (spans[i].className == 'faq_question') {
            spans[i].id = 'faq_question_' + counter_question;
            counter_question++;
            spans[i].onclick = new Function("document.getElementById(this.id + '_answer').style.display = (document.getElementById(this.id + '_answer').style.display == 'none') ? 'block' : 'none';");
            spans[i].style.cursor = 'pointer';
        }
        if (spans[i].className == 'faq_answer') {
            spans[i].id = 'faq_question_' + counter_answer + '_answer';
            counter_answer++;
            spans[i].style.display = 'none';
        }
    }
}
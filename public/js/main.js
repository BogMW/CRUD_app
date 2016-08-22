/**
 * Created by Admin on 18.08.2016.
 */
function del(id) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            document.getElementById("content").innerHTML = xhr.responseText;
        }
    };
    xhr.open("POST", '/del/'+id, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send();
}

function done(id, status) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            document.getElementById("content").innerHTML = xhr.responseText;
        }
    };
    var setStatus;
    if (status == 0) {
        setStatus = 'checked';
    } else {
        setStatus = 0;
    }
    xhr.open("POST", '/complete/'+id+'/'+setStatus, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send();
}

function edit(id){
   document.getElementsByName(id).removeAttribute('disabled');
}
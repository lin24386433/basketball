var db = firebase.firestore();
var introComment = db.collection('training-comment');
introComment.orderBy("time", "desc");

var commentBox = document.getElementById('commentbox');


window.onload = function() {
    commentBox.innerHTML = "";
    getData();
}

function processFormData() {
    const nameElement = document.getElementById("name");
    const name = nameElement.value;
    const commentElement = document.getElementById("comment");
    const comment = commentElement.value;
    var nowTime = Date();
    if(name != "" && comment != ""){
        introComment.add({
            name: name,
            comment: comment,
            time: nowTime,
        });
        nameElement.value = "";
        commentElement.value = "";
        commentBox.innerHTML = "";
        getData();
    }else{
        alert("請輸入完整資訊");
    }
    
}

function getData() {
    introComment.orderBy("time", "desc");
    introComment.get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
            dataName = doc.data()['name'];
            dataComment = doc.data()['comment'];
            commentBox.innerHTML += "<div style='display: flex;'><img src='images/basketball-ball.png' style='width: 50px; height:50px; margin-left: 10px;'><div class='comment-reuse' style='margin-left: 10px; margin-bottom: 30px;'><p style='font-weight: bold;'>" + dataName + "</p><br><p>" + dataComment + "</p></div></div> <div style='width:100%; height:1px; background-color: #000; margin-bottom: 15px;'></div>";
        });
    });;
}


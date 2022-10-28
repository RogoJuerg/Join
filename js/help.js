function openBigImg(subject) {
  if (subject == "img1") {
    document.getElementById("imgBig").classList.add("overlay-bg");
    document.getElementById("imgBig").classList.remove("d-none");
    document.getElementById("imgBig").innerHTML = /*html*/ `
          <div onclick="closeImgBig()" class="overlay-imgBig">      
          <img src="src/img/login.JPG" style="width:500px; cursor:pointer" alt="Log-in">
         </div>
        `;
  } else if (subject == "img2") {
    document.getElementById("imgBig").classList.add("overlay-bg");
    document.getElementById("imgBig").classList.remove("d-none");
    document.getElementById("imgBig").innerHTML = /*html*/ `
           <div onclick="closeImgBig()" class="overlay-imgBig">      
          <img src="src/img/signup.JPG" style="width:400px; cursor:pointer" alt="SignUp">
          </div>
         `;
  } else if (subject == "img3") {
    document.getElementById("imgBig").classList.add("overlay-bg");
    document.getElementById("imgBig").classList.remove("d-none");
    document.getElementById("imgBig").innerHTML = /*html*/ `
           <div onclick="closeImgBig()" class="overlay-imgBig">      
          <img src="src/img/addTask_resp.JPG" style="height:100%;margin-top:50px; cursor:pointer"alt="AddTask">
          </div>
         `;
  }
}

function closeImgBig() {
  document.getElementById("imgBig").classList.remove("overlay-imgBig");
  document.getElementById("imgBig").classList.add("d-none");
}

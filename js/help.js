function openBigImg(subject) {
    if (subject == 'img1') {
     
  document.getElementById('imgBig').classList.add('overlay-bg');
  document.getElementById('imgBig').classList.remove('d-none');
     document.getElementById('imgBig').innerHTML =
      /*html*/`
           <div onclick="closeImgBig()" class="overlay-imgBig">      
           <img class="img1-big"src="src/img/addTask_resp.JPG" alt="AddTask">
          </div>
         `;
  } else if (subject == 'img2') {
     
   document.getElementById('imgBig').classList.add('overlay-bg');
   document.getElementById('imgBig').classList.remove('d-none');
      document.getElementById('imgBig').innerHTML =
       /*html*/`
            <div onclick="closeImgBig()" class="overlay-imgBig">      
           <img class="img2-big"src="src/img/backlog_resp.JPG" alt="AddTask">
           </div>
          `;
   }
}




function closeImgBig() {
   document.getElementById('imgBig').classList.remove('overlay-imgBig');
   document.getElementById('imgBig').classList.add('d-none');
}




//sidebar navigation
const sidebarEl=document.getElementById("sidebar-show1")
const sidebaropenEl= document.getElementById("open-nav-sidebar1")
const sidebarcloseEl=document.getElementById("sidebar-close1")
sidebaropenEl.addEventListener("click",()=>{
   sidebarEl.classList.toggle("sidebar-show1")
})
sidebarcloseEl.addEventListener("click",()=>{
  sidebarEl.classList.toggle("sidebar-show1")
})


//toggle btn
const togglebtn = document.querySelector('.nav-toggle-btn1');
const hideContent = document.querySelector('.navbar-other1');

togglebtn.addEventListener('click',()=>{
  if(hideContent.classList.contains('hide-navbar1')){
    hideContent.classList.remove('hide-navbar1');
  }else{
    hideContent.classList.add('hide-navbar1');
  }
})

//show image
const frontImg = document.querySelector('.show-frontimg1');
const backImg = document.querySelectorAll('.show-backimg1')

for(let img of backImg){
  img.addEventListener('click',()=>{
    frontImg.src = img.src;
  })
}



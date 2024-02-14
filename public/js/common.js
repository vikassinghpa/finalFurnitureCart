const allLikedbtn = document.querySelectorAll('.like-btn');

async function likeButton(id,btn){
try{
let response = await axios({
  method:'post',
  url:`/products/${id}/like`,
  headers:{'X-Requested-With':'XMLHttpRequest'}
});
if(btn.children[0].classList.contains('fa-regular')){
  btn.children[0].classList.remove('fa-regular')
  btn.children[0].classList.add('fa-solid')
}else{
  btn.children[0].classList.remove('fa-solid');
  btn.children[0].classList.add('fa-regular');
}
}
catch(e){
  if(e.response.status === 401){
    window.location.replace('/login');
    console.log(e.message,'window wali problem hai.')
  }
}
}

for(let btn of allLikedbtn){
  btn.addEventListener('click',()=>{
    let id = btn.getAttribute('productId');
    likeButton(id,btn);
  })
}
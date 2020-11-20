
let bg = document.querySelector(".bg")
window.addEventListener('scroll',()=>{
  let value = window.scrollY;
  bg.style.backgroundSize = 4 + value *3 +"px";
})
var typed = new Typed('.type',{
  strings:["Developer","Youtuber","Designer"],
  typeSpeed:100,
  backSpeed:100,
  loop:true
});
var typed = new Typed('.typing',{
  strings:["Developer","Youtuber","Designer"],
  typeSpeed:100,
  backSpeed:100,
  loop:true
});


const responsive ={
  0:{
    items:1
  },
  320:{
    items:1
  },
  560:{
    items:2
  },
  960:{
    items:3
  }
}


$(document).ready(function(){
  $nav = $(".nav");
  $toggle = $('.toggle');
  $port = $('.folio');
  $links = $('.nav .nav-items .nav-link a')
  $btn_up = $('.scroll-up-btn')

  
  // scroling events
  $(window).scroll(function(){
    if(this.scrollY > 20){
      $nav.addClass("sticky")
      $port.addClass("collapse2")
      $links.removeClass("lin")
      $links.addClass("game")
    }else{
      $nav.removeClass("sticky")
      $port.removeClass("collapse2")
      $links.addClass("lin")
      $links.removeClass("game")
      
    }
    if(this.scrollY > 600){
      $btn_up.addClass("go")
      }else{
       $btn_up.removeClass("go")
      }
  })

 //nav-bar toggler
  $toggle.click(function(){
    $nav.toggleClass("collapse"); 
    $port.toggleClass("collapse3")
    
  });
  // carousel
  $(".owl-carousel").owlCarousel({
    loop:true,
    autoplay:true,
    autoplayTimeout:6000,
    dots:false,
    nav:true,
    navText:[$(".owl-navigation .owl-nav-prev"), $(".owl-navigation .owl-nav-next")],
    responsive:responsive
    
    
    
  });
  
  $btn_up.click(function(){
    $('html,body').animate({
      scrollTop:0
    },100) 
  });
  
  
  AOS.init();
  
});

document.getElementById('contact-btn').addEventListener('click', sendContact)

function cleanContactFields(){
  document.getElementById('id_name').value = "";
  document.getElementById('id_email').value = "";
  document.getElementById('id_message').value = "";
}

function sendContact(e){
  e.preventDefault();
  let name = document.getElementById('id_name').value;
  let email = document.getElementById('id_email').value;
  let message = document.getElementById('id_message').value;
  let csrfmiddlewaretoken = document.querySelector('input[name=csrfmiddlewaretoken]').value;
  cleanContactFields()
  e.target.disabled = true
  e.target.classList.value = "btn-disabled";
  fetch('/contact/', {
    method: 'post',
    body: JSON.stringify({name, email, message}),
    credentials: 'same-origin',
    headers: {
      "X-CSRFToken": csrfmiddlewaretoken,
      "Accept": "application/json",
      "content-type": "application/json"
    }
  })
  .then(res => res.json())
  .then((message) => {
    console.log(message)
    if(!message.error){
      let messageOut = document.getElementById('alert-success')
      messageOut.style.display = "grid"
      messageOut.innerHTML = `<p> ${message.success} </p>`
      e.target.disabled = false
      e.target.classList.value =""
      messageOut.onanimationend = () => {
        messageOut.style.display = "none"
      }
    }else{
      let errorOut = document.getElementById('alert-error');
      errorOut.style.display = "grid";
      errorOut.innerHTML = `<p> ${message.error} </p>`;
      e.target.disabled = false;
      e.target.classList.value = "";
      errorOut.onanimationend = () => {
        errorOut.style.display = "none"
      }
    }
  })
  .catch((err) => {
    e.target.classList.value = "";
    console.log(err)
  })
}
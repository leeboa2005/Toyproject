gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.defaults({
  toggleActions:"play none none reverse"
})

gsap.to('.img-container',{
  scale:52,
  ease:"ease",
  scrollTrigger:{
    trigger:'.video-section',
    ease: "power1.in",
    scrub:1,
    start:"top top",
    end:"bottom",
    opacity:0,
    pin:true
  }
})

gsap.to('.right' ,{
  autoAlpha:0,
  x:500,
  duration:1.5,
  scrollTrigger:{
    start:1
  }
})
gsap.to('.left' ,{
  autoAlpha:0,
  x:-500,
  duration:1.5,
  scrollTrigger:{
    start:1
  }
})

const tl = gsap.timeline();

tl.from('.left-side div',{
  y:150,
  opacity:0,
  stagger:{
    amount:.4
  },
  delay:.5
}).from('.right-side',{opacity:0,duration:2},.5)
.to('.flex-wrapper' ,{x:-window.innerWidth})

ScrollTrigger.create({
  animation:tl,
  trigger:'.flex-wrapper',
  start:"top top",
  end:"+=600",
  scrub:1,
  pin:true,
  ease:"ease"
})

gsap.utils.toArray('.col').forEach(image=>{
  gsap.fromTo(image,{
    opacity:.3,
    x:0
  },{
    opacity:1,
    x:-50,
    scrollTrigger:{
      trigger:image,
      start:"5%",
      stagger:{
        amount:.4
      }
    }
  })
})

const timeline = gsap.timeline();

timeline.from('.title span' ,{
  y:150,
  skewY:7,
  duration:3
}).from('.txt-bottom',{
  letterSpacing:-10,
  opacity:0,
  duration:3
})

gsap.fromTo( ".bg-gradation-section", {
	backgroundColor: gsap.getProperty(".bg-gradation-section", "--dark")
}, {
	scrollTrigger: {
		trigger: ".color-light",
		scrub: true,
		end: "bottom bottom",
	},
	backgroundColor: gsap.getProperty(".bg-gradation-section", "--light")
});

//horizontal-section

// $(window).scroll(function () {
//   let wScroll = $(this).scrollTop();
//   const offset1 = (wScroll - $(".move_left").offset().top) * 0.6;
//   const offset2 = (wScroll - $(".move_right").offset().top) * -0.4;

//   $(".move_left").css({ "transform": "translateX(" + offset1 + "px)" });
//   $(".move_right").css({ "transform": "translateX(" + offset2 + "px)" });

// });

let container =  document.querySelector("html");
const moveleft = document.querySelectorAll(".move_left");
const moveright = document.querySelector(".move_right");
let moverightPostion = moveright.offsetTop

let moveleftPostion = []
moveleft.forEach(ml => {
  moveleftPostion.push(ml.offsetTop)
})


window.addEventListener('scroll', () => { 
  //스크롤을 할 때마다 로그로 현재 스크롤의 위치가 찍혀나온다.
  let wScroll = container.scrollTop;
  let offset1 = (wScroll - moveleftPostion[0]) * 0.6;
  let offset2 = (wScroll - moveleftPostion[1]) * 0.6;
  let offset3 = (wScroll - moverightPostion) * -0.4;

  moveleft[0].style.transform = `translateX(${offset1}px)`;
  moveleft[1].style.transform = `translateX(${offset2}px)`;
  moveright.style.transform = `translateX(${offset3}px)`;
  
  console.log(moverightPostion);


});

//reservation-ticket

document.addEventListener('DOMContentLoaded', () =>{

  const seatContainer = document.querySelector('.seatContainer');
  
  const movie = document.getElementById('movie'); // 선택할 영화
  let moviePrice = Number(movie.value); // 영화과격 
  
  let count = document.querySelector('#count'); // 인원수
  let costs = document.querySelector('#costs'); // 가격
  
  // 선택한 좌석수 텍스트 변경해주기
  
  function countSeatPrice(){
      const selectedSeatCount = document.querySelectorAll('.selectedSeat').length;
  
      count.textContent = selectedSeatCount;
      costs.textContent = selectedSeatCount * moviePrice;
      
  }
  
  
  //좌석 클릭했을때
  
  seatContainer.addEventListener('click', (e) => {
  
      if(e.target.className === 'seat'){
          e.target.className = 'selectedSeat';
      } else if(e.target.className === 'selectedSeat'){
          e.target.className = 'seat';
      }
  
      countSeatPrice();
  })
  
  // 영화 변경할때
  
  movie.addEventListener('change', (e) => {
  
      moviePrice = Number(e.target.value);
  
      countSeatPrice()
      
  })
  
  
  
  
  })



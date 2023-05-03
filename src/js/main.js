"use strict";

// defines observer options
var observerOptions = {
	attributes: true,
	attributesFilter: ['class'],
	childList: true,
	CharacterData: true
};
// d.o.o end

// nav button
const $navbtn = document.getElementById('navbutton');
const $nav = document.querySelector('nav');

var $navbtn_callback = (el, option) => {
	if ($navbtn.classList.contains('active')) {
		// nav on
		$nav.style.right = '0%';
	} else {
		// nav off
		$nav.style.right = '100%';
	}
}
var $navbtn_observer = new MutationObserver($navbtn_callback);
$navbtn_observer.observe($navbtn, observerOptions);

$navbtn.addEventListener('click', () => {
	if (!$navbtn.classList.contains('active')) {
		// nav on
		$navbtn.classList.add('active');
	} else {
		// nav off
		$navbtn.classList.remove('active');
	}
});
// nav button end

// gsap
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger);

const hero_content = document.querySelector('.section-hero .hero-content')
const hero_headline = hero_content.querySelector('h1')

let hero_headline_move = gsap.timeline({
	scrollTrigger: {
		trigger: '.section-hero',
		start: 'top top',
		end: '+=5000',
		scrub: 0,
		pin: true
	}
})
hero_headline_move.to(hero_headline, {
	fontSize: '78vh'
}, 0).to(hero_headline, {
	scale: 25
}, 0.1)
// gsap end
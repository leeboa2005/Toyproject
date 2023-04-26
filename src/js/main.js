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

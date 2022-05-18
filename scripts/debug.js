//debug
debug = document.querySelector('.debug')
const url = new URL(document.location.href)
if (url.searchParams.get('debug') != null)
  debug.classList.remove('debug_hidden')
  document.querySelector('#debug_toggle').classList.remove('debug_hidden')
  upd_debug()

function toggleDebug(){
  debug.classList.toggle('debug_hidden')
}

function upd_debug(){
  debug.querySelector('#fontsize_style').innerHTML = 'fontsize_style: ' + debug.style.fontsize;
  debug.querySelector('#fontsize_computed').innerHTML = 'fontsize_computed: ' + parseFloat(window.getComputedStyle(debug, null).getPropertyValue('font-size')) + 'px';
  debug.querySelector('#inner_width').innerHTML = 'inner_width: ' + window.innerWidth;
  debug.querySelector('#inner_height').innerHTML = 'inner_height: ' + window.innerHeight;
  debug.querySelector('#client_width').innerHTML = 'client_width: ' + document.documentElement.clientWidth; //identical to next
  debug.querySelector('#client_height').innerHTML = 'client_height: ' + document.querySelector('html').clientHeight;//identical to prev
}

window.addEventListener('resize', upd_debug, true);


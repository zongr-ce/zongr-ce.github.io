// On narrow screens the page links scroll horizontally; make sure the
// current page's link is visible without the visitor having to scroll.
(function () {
  var pages = document.querySelector('.nav-pages');
  var active = pages && pages.querySelector('a.active');
  if (!active || pages.scrollWidth <= pages.clientWidth) return;
  var offset = active.getBoundingClientRect().left - pages.getBoundingClientRect().left;
  pages.scrollLeft = Math.max(0, pages.scrollLeft + offset - 8);
})();

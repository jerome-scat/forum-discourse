
// Remove CockpitLab top navigation bar from Discourse
document.addEventListener('DOMContentLoaded', function() {
  const topnavElements = document.querySelectorAll('.cockpitlab-topnav');
  topnavElements.forEach(element => {
    if (element) {
      element.remove();
    }
  });
});

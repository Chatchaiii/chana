// This script helps keep .fixed-bottom-bar at the bottom on mobile browsers

function fixBottomBar() {
  const bars = document.querySelectorAll('.fixed-bottom-bar');
  const vh = window.innerHeight;
  bars.forEach(bar => {
    // Set bottom to 0 and adjust height if needed
    bar.style.bottom = '0px';
    // Optionally, set width to 100vw to avoid horizontal shift
    bar.style.width = '100vw';
    // Optionally, set left/right to 0
    bar.style.left = '0';
    bar.style.right = '0';
    // Optionally, set maxWidth if you want to limit it
    // bar.style.maxWidth = '600px';
  });
}

// Run on load and on resize/orientation change
window.addEventListener('resize', fixBottomBar);
window.addEventListener('orientationchange', fixBottomBar);
window.addEventListener('DOMContentLoaded', fixBottomBar);
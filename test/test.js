const colors = [
    '#2D0A3D',
    '#330A3C',
    '#29083E',
    '#1F073F'
];

function interpolateColors(color1, color2, factor) {
    const r1 = parseInt(color1.slice(1, 3), 16);
    const g1 = parseInt(color1.slice(3, 5), 16);
    const b1 = parseInt(color1.slice(5, 7), 16);
    
    const r2 = parseInt(color2.slice(1, 3), 16);
    const g2 = parseInt(color2.slice(3, 5), 16);
    const b2 = parseInt(color2.slice(5, 7), 16);
    
    const r = Math.round(r1 + (r2 - r1) * factor);
    const g = Math.round(g1 + (g2 - g1) * factor);
    const b = Math.round(b1 + (b2 - b1) * factor);

    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

function updateBackground() {
    const scrollPosition = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const scrollRatio = scrollPosition / maxScroll;

    // Determine which pair of colors we're transitioning between
    const colorIndex = Math.min(Math.floor(scrollRatio * (colors.length - 1)), colors.length - 2);
    const nextColorIndex = colorIndex + 1;
    
    // Interpolate between the current color and the next color
    const factor = (scrollRatio * (colors.length - 1)) - colorIndex;
    const interpolatedColor = interpolateColors(colors[colorIndex], colors[nextColorIndex], factor);

    // Apply the interpolated gradient
    document.body.style.background = `linear-gradient(to bottom, ${interpolatedColor}, ${interpolatedColor})`;
}

// Initialize the background on page load
updateBackground();

// Update the background on scroll
document.addEventListener('scroll', updateBackground);
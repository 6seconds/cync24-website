const container = document.getElementById('scrollable-container');

// Initial background gradient
const initialGradient = 'radial-gradient(ellipse at bottom, #225E55, #134544, #033038, #002327, #02151E, #021014, #000D16)';
document.body.style.background = initialGradient;

const baseGradients = [
    [34, 94, 85],   // #225E55
    [19, 69, 68],   // #134544
    [3, 48, 56],    // #033038
    [0, 35, 39],    // #002327
    [2, 21, 30],    // #02151E
    [2, 16, 20],    // #021014
    [0, 13, 22]     // #000D16
];

function interpolateColor(color1, color2, factor) {
    const result = color1.slice();
    for (let i = 0; i < color1.length; i++) {
        result[i] = Math.round(color1[i] + factor * (color2[i] - color1[i]));
    }
    return result;
}

function linearChange(factor) {
    return factor; // Linear change for darkening
}

function generateDarkerColor(baseColor, factor) {
    return baseColor.map(c => Math.max(0, Math.floor(c * (1 - factor))));
}

function generateGradientColors(scrollPercentage) {
    return baseGradients.map(baseColor => {
        const factor = linearChange(scrollPercentage); // Linear darkening based on scroll percentage
        return generateDarkerColor(baseColor, factor);
    });
}

function updateGradient(scrollPercentage) {
    const colors = generateGradientColors(scrollPercentage);
    const newColors = colors.map(color => `rgb(${color.join(',')})`);
    const gradientString = `radial-gradient(ellipse at bottom, ${newColors.join(', ')})`;

    // Log the new gradient colors
    console.log(`New Gradient Colors: ${gradientString}`);

    // Apply the new gradient smoothly
    document.body.style.transition = 'background 0.6s ease'; // Increase transition duration
    document.body.style.background = gradientString;
}

let lastScrollTop = 0;
container.addEventListener('scroll', () => {
    const scrollPosition = container.scrollTop;
    const scrollHeight = container.scrollHeight - container.clientHeight;

    const scrollPercentage = scrollPosition / scrollHeight;

    // Throttle updates to once every 50 pixels of scroll change
    if (Math.abs(scrollPosition - lastScrollTop) > 50) {
        lastScrollTop = scrollPosition;
        updateGradient(scrollPercentage);
    }
});

// Ensure the initial gradient is applied without transition
document.body.style.transition = 'none';
document.body.style.background = initialGradient;

// Re-enable transitions after a short delay
setTimeout(() => {
    document.body.style.transition = 'background 0.6s ease'; // Increase transition duration
}, 100);

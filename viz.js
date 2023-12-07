// Import the required Looker Studio visualization library
import * as dscc from '@google/dscc';

// Function to render your visualization
function drawViz(data) {
    // Clear the previous visualization
    const viz = document.createElement('div');
    if (document.querySelector('svg')) {
        document.querySelector('svg').remove();
    }

    // Set up the SVG element
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    viz.appendChild(svg);

    // Get the user-configured style values
    const style = data.style;
    const glowColor = style.glowColor.value.color || style.glowColor.defaultValue;
    const glowRadius = style.glowRadius.value || style.glowRadius.defaultValue;

    // Apply styles and create the glow effect on the circles (bubbles)
    const glowEffectId = 'glow-effect';
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    const glowFilter = document.createElementNS('http://www.w3.org/2000/svg', 'filter');
    glowFilter.setAttribute('id', glowEffectId);
    
    // Define the Gaussian blur filter for the glow effect
    const feGaussianBlur = document.createElementNS('http://www.w3.org/2000/svg', 'feGaussianBlur');
    feGaussianBlur.setAttribute('stdDeviation', glowRadius);
    glowFilter.appendChild(feGaussianBlur);

    defs.appendChild(glowFilter);
    svg.appendChild(defs);

    // Example loop to draw bubbles based on the data
    // This is a placeholder and should be replaced with your data processing logic
    data.tables.DEFAULT.forEach(row => {
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        // Position and size your circle based on the data
        // For example, using row['geoData'] and row['intensityMetric']
        circle.setAttribute('cx', '50%'); // Placeholder value
        circle.setAttribute('cy', '50%'); // Placeholder value
        circle.setAttribute('r', '40'); // Placeholder value
        circle.setAttribute('fill', glowColor);
        circle.setAttribute('filter', `url(#${glowEffectId})`);

        svg.appendChild(circle);
    });

    document.body.appendChild(viz);
}

// Subscribe to the data and style changes
dscc.subscribeToData(drawViz, {transform: dscc.objectTransform});

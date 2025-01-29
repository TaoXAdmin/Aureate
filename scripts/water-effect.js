function initializeWaterEffect(options = {}) {
    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.style.position = "absolute";
    svg.style.width = "0";
    svg.style.height = "0";

    const filter = document.createElementNS(svgNS, "filter");
    filter.id = "waterDisplacement";

    const feTurbulence = document.createElementNS(svgNS, "feTurbulence");
    feTurbulence.setAttribute("type", "fractalNoise");
    feTurbulence.setAttribute("baseFrequency", options.baseFrequency || "0.1 0.3");
    feTurbulence.setAttribute("numOctaves", options.numOctaves || "3");
    feTurbulence.setAttribute("result", "turbulence");

    const feDisplacementMap = document.createElementNS(svgNS, "feDisplacementMap");
    feDisplacementMap.setAttribute("in", "SourceGraphic");
    feDisplacementMap.setAttribute("in2", "turbulence");
    feDisplacementMap.setAttribute("scale", options.initialScale || "200");
    feDisplacementMap.setAttribute("xChannelSelector", "R");
    feDisplacementMap.setAttribute("yChannelSelector", "B");

    // Animation unique combinant turbulence et déplacement
    const combinedAnimation = document.createElementNS(svgNS, "animate");
    combinedAnimation.setAttribute("attributeName", "baseFrequency");
    combinedAnimation.setAttribute("values", "0.1 0.3; 0.01 0.03"); // Transition fluide
    combinedAnimation.setAttribute("dur", "2s");
    combinedAnimation.setAttribute("repeatCount", "1");
    combinedAnimation.setAttribute("fill", "freeze"); // Conserve l'état final

    const displacementAnimation = document.createElementNS(svgNS, "animate");
    displacementAnimation.setAttribute("attributeName", "scale");
    displacementAnimation.setAttribute("values", "200; 2"); // Passage direct de forte à faible turbulence
    displacementAnimation.setAttribute("dur", "2s");
    displacementAnimation.setAttribute("repeatCount", "1");
    displacementAnimation.setAttribute("fill", "freeze");

    feTurbulence.appendChild(combinedAnimation);
    feDisplacementMap.appendChild(displacementAnimation);

    filter.appendChild(feTurbulence);
    filter.appendChild(feDisplacementMap);
    svg.appendChild(filter);
    document.body.appendChild(svg);

    document.querySelectorAll(options.selector || '.water-effect').forEach(img => {
        img.style.filter = "url(#waterDisplacement)";

        setTimeout(() => {
            combinedAnimation.beginElement();
            displacementAnimation.beginElement();

            // Pause de 1.5 secondes après stabilisation
            setTimeout(() => {
                img.style.filter = "none"; // Retire le filtre proprement
            }, 3500); // 2s + 1.5s
        }, 100);
    });
}

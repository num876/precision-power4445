export const projects = [
    {
        id: "lumina",
        title: "Lumina Dental Studio",
        category: "Modern Patient Booking Engine",
        result: "Zero-Latency Booking",
        description: "A high-performance dental landing page demonstration. Built with Supabase real-time data and a custom live calendar booking system. We designed this to solve manual scheduling bottlenecks, giving practitioners an automated way to handle intakes in record time.",
        problem: "Traditional dental websites rely on manual scheduling, leading to patient drop-off and front-desk friction.",
        solution: "We architected a zero-latency scheduling machine using Supabase for live data persistence and a bespoke calendar interface for autonomous patient intake.",
        tags: ["React", "Supabase", "Live Booking"],
        image: "./assets/lumina-mockup.png",
        link: "https://v0-lumina-dental-landing-page-blond.vercel.app/",
        color: "var(--accent-lumina)"
    },
    {
        id: "oxford",
        title: "Oxford Wrestling Academy",
        category: "Rapid-Enrollment Membership Site",
        result: "Registration Surges",
        description: "High-speed registration infrastructure for high-stakes branding. Powered by Supabase membership logic and performance-driven assets designed to stay stable during massive traffic spikes.",
        problem: "Athletic academies often face site crashes or friction during high-intensity enrollment periods.",
        solution: "Engineered for sub-second performance during enrollment surges—moving students from curiosity to confirmed members instantly with Supabase-driven registration.",
        tags: ["React", "Supabase-Auth", "GSAP"],
        image: "./assets/oxford-mockup.png",
        link: "https://v0-website-improvement-suggestions-tau.vercel.app/",
        color: "var(--accent-oxford)"
    }
];

export const renderProjects = () => {
    const projectGrid = document.querySelector('.project-grid');
    if (!projectGrid) return;

    projectGrid.innerHTML = projects.map(project => `
        <article class="project-card reveal" data-tilt data-id="${project.id}">
            <div class="project-image-link" style="cursor: pointer;">
                <div class="project-image-container">
                    <img src="${project.image}" alt="${project.title}" class="project-img">
                    <div class="project-result-badge">${project.result}</div>
                    <div class="project-overlay">
                        <span class="btn btn-primary btn-sm">Technical Brief</span>
                    </div>
                </div>
            </div>
            <div class="project-info">
                <div class="project-category" style="color: ${project.color}; text-transform: uppercase; font-size: 0.7rem; font-weight: 700; letter-spacing: 0.1em; margin-bottom: 5px;">${project.category}</div>
                <h3 class="project-title">${project.title}</h3>
                <p class="project-desc">${project.description}</p>
                <div class="project-tags">
                    ${project.tags.map(tag => `<span>${tag}</span>`).join('')}
                </div>
            </div>
        </article>
    `).join('');
};

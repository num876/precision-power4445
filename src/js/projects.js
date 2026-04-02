export const projects = [
    {
        id: "lumina",
        title: "Lumina Dental Studio",
        category: "Medical & Wellness",
        description: "A fear-free dentistry landing page designed with a calm, high-end 'medical spa' aesthetic.",
        problem: "Traditional dental websites feel cold, clinical, and anxiety-inducing, often leading to patient dropout before booking.",
        solution: "We created a 'Spa-like' digital experience using soft salmon palettes and human-centric imagery to shift the perception from 'clinical necessity' to 'wellness indulgence'.",
        tags: ["React", "Tailwind", "Framer Motion"],
        image: "./assets/lumina-mockup.png",
        link: "https://v0-lumina-dental-landing-page-blond.vercel.app/",
        color: "var(--accent-lumina)"
    },
    {
        id: "oxford",
        title: "Oxford Wrestling Academy",
        category: "Athletics & Training",
        description: "A bold, high-energy platform for elite freestyle and Greco-Roman wrestling.",
        problem: "Wrestling academies often rely on outdated, static sites that fail to convey the prestige, intensity, and discipline of the sport.",
        solution: "Implemented a high-contrast UI with industrial typography and aggressive orange accents to mirror the academy's 'Champions are Forged' philosophy.",
        tags: ["React", "Tailwind", "GSAP"],
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
                    <div class="project-overlay">
                        <span class="btn btn-primary btn-sm">View Case Study</span>
                    </div>
                </div>
            </div>
            <div class="project-info">
                <div class="project-category" style="color: ${project.color};">${project.category}</div>
                <h3 class="project-title">${project.title}</h3>
                <p class="project-desc">${project.description}</p>
                <div class="project-tags">
                    ${project.tags.map(tag => `<span>${tag}</span>`).join('')}
                </div>
            </div>
        </article>
    `).join('');
};

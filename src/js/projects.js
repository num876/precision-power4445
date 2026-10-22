export const projects = [
    {
        id: "lumina",
        title: "Lumina Dental Studio",
        category: "Healthcare & Clinic Web Design",
        result: "Live Calendar Booking",
        description: "A clean, modern dental clinic website and patient booking experience. Built with a bespoke interactive calendar and real-time database to eliminate scheduling friction and maximize patient conversions.",
        problem: "Traditional clinic websites rely on slow contact forms or phone-only booking, causing patient drop-off and front-desk friction.",
        solution: "Engineered an intuitive, mobile-optimized booking interface with live appointment confirmation and a calm, clinical visual aesthetic.",
        tags: ["Bespoke UI", "React", "Live Booking"],
        image: "./assets/lumina-mockup.png",
        link: "https://v0-lumina-dental-landing-page-blond.vercel.app/",
        color: "var(--accent-lumina)"
    },
    {
        id: "oxford",
        title: "Oxford Wrestling Academy",
        category: "Sports & Academy Web Design",
        result: "Fast-Load Enrollment",
        description: "A bold, dynamic membership website engineered for speed and conversion during seasonal registration surges. Combines high-impact visual design with streamlined athlete onboarding.",
        problem: "Sports academies often face site slowdowns and confusing registration funnels during peak enrollment periods.",
        solution: "Designed a high-contrast, mobile-first website with sub-second page loads and seamless digital registration to convert visitors into active members.",
        tags: ["Mobile-First", "High Performance", "Membership UI"],
        image: "./assets/oxford-mockup.png",
        link: "https://v0-website-improvement-suggestions-tau.vercel.app/",
        color: "var(--accent-oxford)"
    },
    {
        id: "contextly",
        title: "Contextly",
        category: "AI SaaS & Outreach Platform",
        result: "Automated Lead Intelligence",
        description: "An AI-powered sales intelligence web application that analyzes prospect URLs to generate hyper-personalized cold outreach emails and book client meetings.",
        problem: "Generic cold outreach suffers from low open and reply rates, while manually researching prospect websites and writing custom pitches takes hours.",
        solution: "Engineered a streamlined, conversion-first web application interface featuring live URL website scraping, AI personalization pipelines, and real-time Supabase data persistence.",
        tags: ["Next.js", "AI Integration", "Supabase", "SaaS UI"],
        image: "./assets/contextly-mockup.png",
        link: "https://v0-contextly-alpha.vercel.app/",
        color: "#818cf8"
    },
    {
        id: "lexis",
        title: "Lexis AI",
        category: "AI Content & Writing Platform",
        result: "Multi-Format AI Generation",
        description: "A modern SaaS platform and AI-powered writing assistant engineered for creators and businesses to ideate, draft, and publish high-converting blogs, emails, and social content.",
        problem: "Content creation workflows are fragmented across multiple tools, leading to writer's block, inconsistent brand voice, and hours lost in draft revisions.",
        solution: "Built an intuitive, dark-mode web application with rapid AI generation pipelines, versatile template controls, and frictionless export workflows.",
        tags: ["Next.js", "AI Assistant", "Tailwind CSS", "SaaS"],
        image: "./assets/lexis-mockup.png",
        link: "https://v0-lexis-ai-backend-ruddy.vercel.app/",
        color: "#3b82f6"
    },
    {
        id: "counter-combat",
        title: "Counter Combat Club",
        category: "Martial Arts & Combat Sports",
        result: "Direct Trial Booking Flow",
        description: "A high-octane, mobile-first academy website for Birmingham's premier Sambo and MMA training centre, engineered for instant trial sign-ups via phone and WhatsApp.",
        problem: "Traditional combat sports websites suffer from cluttered layouts, buried timetables, and slow contact forms that deter prospective students.",
        solution: "Designed a high-contrast, action-packed visual presence with prominent coach credentials, clear class schedules, and single-tap trial booking.",
        tags: ["Next.js", "Sports Web Design", "Tailwind CSS", "Mobile-First"],
        image: "./assets/counter-combat-mockup.png",
        link: "https://counter-combat-club.vercel.app/",
        color: "#ef4444"
    },
    {
        id: "forma",
        title: "Forma",
        category: "Sports Media & Neobrutalist Web Platform",
        result: "Live Scores & Historical Archives",
        description: "A bold neobrutalist digital publication and web application dedicated to football culture, live fixture telemetry, breaking news, and tactical history.",
        problem: "Mainstream sports media sites are overwhelmed with intrusive ads, sluggish trackers, and cluttered navigation that disrupt reading.",
        solution: "Engineered an aesthetic neobrutalist web app featuring real-time match scoreboards, crisp editorial typography, and high-speed archival exploration.",
        tags: ["Next.js", "Neobrutalism", "Tailwind CSS", "Live Scores"],
        image: "./assets/forma-mockup.png",
        link: "https://forma-two-navy.vercel.app/",
        color: "#fbbf24"
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

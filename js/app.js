
document.addEventListener('DOMContentLoaded', () => {
    // 1. Load Data
    let appData = window.initialAppData;

    // 2. Initial Render
    renderAll(appData);

    function renderAll(data) {
        renderLeadership(data.leadership);
        renderDepartmentLeads(data.departmentLeads);
        renderSponsors(data.sponsors);
        renderUpdates(data.updates);
    }

    // --- Render Functions ---

    function renderLeadership(items) {
        const container = document.getElementById('leadership-container');
        if (!container) return;
        container.innerHTML = items.map(item => `
            <div class="bg-primary-bg p-6 rounded-lg shadow-[0_0_20px_rgba(0,0,0,0.5)] border border-white/5 hover:border-vikes-green-neon transition-colors group">
                <img src="${item.image}" class="w-full h-64 rounded-md mb-4 object-cover grayscale group-hover:grayscale-0 transition-all" alt="${item.name}" />
                <h3 class="text-2xl font-semibold text-white">${item.name}</h3>
                <p class="text-vikes-green-neon">${item.role}</p>
            </div>
        `).join('');
    }

    function renderDepartmentLeads(items) {
        const container = document.getElementById('dept-leads-container');
        if (!container) return;
        container.innerHTML = items.map(item => `
            <div class="text-center group">
                <div class="w-24 h-24 rounded-full mx-auto bg-primary-bg flex items-center justify-center border border-white/10 group-hover:border-vikes-green-neon transition-colors">
                    <img src="${item.image}" class="w-full h-full rounded-full object-cover" alt="${item.name}" />
                </div>
                <h3 class="text-lg text-white font-semibold mt-4">${item.name}</h3>
                <p class="text-gray-500">${item.role}</p>
            </div>
        `).join('');
    }

    function renderSponsors(items) {
        const container = document.getElementById('sponsors-container');
        if (!container) return;

        // Helper to adjust alpha for hover effect (simple string replacement since format is known in data.js)
        const getHoverColor = (color) => color.replace('0.45', '0.8').replace('0.5', '0.8');

        let html = items.map(item => {
            const hoverColor = getHoverColor(item.glowColor);
            return `
            <div class="group relative rounded-xl overflow-hidden bg-secondary-bg shadow-[0_0_30px_${item.glowColor}] hover:shadow-[0_0_50px_${hoverColor}] transition-all duration-500 border border-white/10 hover:border-white/30 cursor-pointer h-64 flex flex-col">
                <div class="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10 opacity-90"></div>
                
                <div class="flex-1 flex items-center justify-center p-6 z-0">
                    <img src="${item.image}" alt="${item.name}" class="max-w-full max-h-32 object-contain transform group-hover:scale-105 transition-transform duration-700 ${item.classes || ''}" />
                </div>

                <div class="absolute bottom-0 left-0 p-6 z-20 w-full">
                    <span class="text-gray-400 font-bold uppercase tracking-widest text-xs mb-1 block drop-shadow-md">Sponsor</span>
                    <h3 class="text-white text-lg font-black uppercase tracking-tighter drop-shadow-xl truncate">${item.name}</h3>
                </div>
            </div>
            `;
        }).join('');

        // Placeholder card
        const placeholderColor = 'rgba(194,24,7,0.45)';
        const placeholderHover = 'rgba(194,24,7,0.8)';
        html += `
            <div class="group relative rounded-xl overflow-hidden bg-secondary-bg shadow-[0_0_30px_${placeholderColor}] hover:shadow-[0_0_50px_${placeholderHover}] transition-all duration-500 border border-white/10 hover:border-white/30 cursor-pointer h-64 flex flex-col">
                <div class="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10 opacity-90"></div>
                
                <div class="flex-1 flex items-center justify-center p-6 z-0">
                    <span class="text-gray-500 text-sm font-bold">[ YOUR LOGO ]</span>
                </div>

                <div class="absolute bottom-0 left-0 p-6 z-20 w-full">
                    <span class="text-gray-400 font-bold uppercase tracking-widest text-xs mb-1 block drop-shadow-md">Future Sponsor</span>
                     <h3 class="text-white text-lg font-black uppercase tracking-tighter drop-shadow-xl truncate">Join Us</h3>
                </div>
            </div>
        `;

        container.innerHTML = html;
    }

    function renderUpdates(images) {
        const container = document.querySelector('.swiper-wrapper');
        if (!container) return;
        container.innerHTML = images.map(img => `
            <div class="swiper-slide">
                <img src="${img}" class="w-full h-full object-cover" />
            </div>
        `).join('');

        // Re-init swiper if needed, though usually it handles DOM updates if configured, 
        // but safe to update loop here if we had access to the instance. 
        // For now, assuming Swiper will handle it or simpler re-instantiation might be needed if broken.
        // Actually, destructing and recreating swiper might be safest if dynamic updates happen often.
        if (window.mySwiperInstance) {
            window.mySwiperInstance.update();
        }
    }


});

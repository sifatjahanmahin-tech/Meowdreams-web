const products = [
    {
        id: 1,
        title: "Premium L-Shape Elevated Cat Lounge",
        price: "From $32.99",
        category: "beds",
        image: "https://ae-pic-a1.aliexpress-media.com/kf/S3caacebd144f4b4d913dc88628d1a8fdu.jpg_960x960q75.jpg",
        affiliateLink: "https://s.click.aliexpress.com/e/_c4o52iLH"
    },
    {
        id: 2,
        title: "Deluxe Winter Heated Kitten Shelter",
        price: "From $18.50",
        category: "beds",
        image: "https://ae-pic-a1.aliexpress-media.com/kf/S9464ec41317646c6b4d28acdce707666S.jpg_960x960q75.jpg",
        affiliateLink: "https://s.click.aliexpress.com/e/_c4MKZzUb"
    },
    {
        id: 3,
        title: "Pro-Performance Wooden Cat Exercise Wheel",
        price: "From $89.00",
        category: "toys",
        image: "https://ae-pic-a1.aliexpress-media.com/kf/Sef417193fb434363977bfb8103f1cd632.jpg_960x960q75.jpg",
        affiliateLink: "https://s.click.aliexpress.com/e/_c42KjfpV"
    },
    {
        id: 4,
        title: "Smart App-Controlled Self-Cleaning Litter Box",
        price: "Check Store",
        category: "essentials",
        image: "https://ae-pic-a1.aliexpress-media.com/kf/Se7ba726e594e4de684f9d22810a96ad7C.jpg_960x960q75.jpg",
        affiliateLink: "https://s.click.aliexpress.com/e/_c3x03E4P"
    },
    {
        id: 5,
        title: "Neakasa M1 Smart Automatic Litter System",
        price: "Check Store",
        category: "essentials",
        image: "https://ae-pic-a1.aliexpress-media.com/kf/Se0494b39238d4562808aec3cd421b6b5M.jpg_960x960q75.jpg",
        affiliateLink: "https://s.click.aliexpress.com/e/_c4FpfX03"
    },
    {
        id: 6,
        title: "Wall-Mounted Massage Self-Groomer",
        price: "From $5.99",
        category: "essentials",
        image: "https://ae-pic-a1.aliexpress-media.com/kf/S3c5ea1b72a1b498f8ffe3d51653070ecE.jpg_960x960q75.jpg",
        affiliateLink: "https://s.click.aliexpress.com/e/_c31PZeIj"
    },
    {
        id: 7,
        title: "Pro-Grade Wireless Pet Hair Vacuum",
        price: "From $24.95",
        category: "essentials",
        image: "https://ae-pic-a1.aliexpress-media.com/kf/S87ffb72381f24f189e7a88f515c6778fw.jpg_960x960q75.jpg",
        affiliateLink: "https://s.click.aliexpress.com/e/_c3hlUpsb"
    }
];

function renderProducts(filter = 'all') {
    const grid = document.getElementById('product-grid');
    grid.innerHTML = '';

    const filtered = filter === 'all'
        ? products
        : products.filter(p => p.category === filter);

    filtered.forEach(product => {
        const card = document.createElement('article');
        card.className = 'product-card';
        card.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" 
                     alt="${product.title}" 
                     loading="lazy" 
                     referrerpolicy="no-referrer"
                     onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1548802673-380ab8ebc7b7?auto=format&fit=crop&w=800&q=80'">
            </div>
            <div class="product-info">
                <div>
                    <span class="product-brand">Meowdreams Selection</span>
                    <h3 class="product-title">${product.title}</h3>
                    <p class="product-price">${product.price}</p>
                </div>
                <a href="${product.affiliateLink}" class="cta-btn" target="_blank" rel="noopener noreferrer" data-id="${product.id}">View on Store</a>
            </div>
        `;
        grid.appendChild(card);
    });

    // Simple analytics tracking
    document.querySelectorAll('.cta-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = e.target.getAttribute('data-id');
            const title = products.find(p => p.id == id).title;
            console.log(`Analytics: Product Clicked - ${title} (ID: ${id})`);
            // In a real app, you would send this to a backend or analytics service
        });
    });
}

// Initial Render
document.addEventListener('DOMContentLoaded', () => {
    // Theme Switcher Logic
    const themeToggleBtn = document.getElementById('theme-toggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

    // Check locally saved theme, fallback to system preference
    const currentTheme = localStorage.getItem('theme') || (prefersDarkScheme.matches ? 'dark' : 'light');

    if (currentTheme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
    }

    themeToggleBtn.addEventListener('click', () => {
        const isLight = document.documentElement.getAttribute('data-theme') === 'light';
        const newTheme = isLight ? 'dark' : 'light';

        if (newTheme === 'light') {
            document.documentElement.setAttribute('data-theme', 'light');
        } else {
            document.documentElement.removeAttribute('data-theme');
        }

        localStorage.setItem('theme', newTheme);
    });

    renderProducts();

    // Filter Logic
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderProducts(btn.getAttribute('data-filter'));
        });
    });

    // Scroll Animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('section, h1, h2, .product-card').forEach(el => {
        el.setAttribute('data-animate', '');
        observer.observe(el);
    });
});

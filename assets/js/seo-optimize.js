// SEO Optimization Script
// Lazy Loading cho hình ảnh để tăng tốc độ tải trang

document.addEventListener('DOMContentLoaded', function() {
    // 1. Lazy Loading Images
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // 2. Thêm alt text cho images nếu thiếu
    document.querySelectorAll('img:not([alt])').forEach(img => {
        img.alt = 'HTX Lâm Đồng Đại Ngàn - Rau sạch Đà Lạt';
    });
    
    // 3. Structured Data cho Products
    const productItems = document.querySelectorAll('.product-item');
    if (productItems.length > 0) {
        const productsData = {
            "@context": "https://schema.org",
            "@type": "ItemList",
            "itemListElement": []
        };
        
        productItems.forEach((item, index) => {
            const name = item.querySelector('.product-name')?.textContent || '';
            const price = item.querySelector('.product-price')?.textContent || '';
            const img = item.querySelector('.product-img')?.src || '';
            
            if (name) {
                productsData.itemListElement.push({
                    "@type": "ListItem",
                    "position": index + 1,
                    "item": {
                        "@type": "Product",
                        "name": name,
                        "image": img,
                        "offers": {
                            "@type": "Offer",
                            "price": price.replace(/[^0-9]/g, ''),
                            "priceCurrency": "VND",
                            "availability": "https://schema.org/InStock"
                        }
                    }
                });
            }
        });
        
        if (productsData.itemListElement.length > 0) {
            const script = document.createElement('script');
            script.type = 'application/ld+json';
            script.text = JSON.stringify(productsData);
            document.head.appendChild(script);
        }
    }
    
    // 4. Track outbound links
    document.querySelectorAll('a[href^="http"]').forEach(link => {
        if (!link.href.includes('lamdongcoop.com')) {
            link.addEventListener('click', function(e) {
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'click', {
                        'event_category': 'outbound',
                        'event_label': link.href
                    });
                }
            });
        }
    });
    
    // 5. Track phone clicks
    document.querySelectorAll('a[href^="tel:"]').forEach(link => {
        link.addEventListener('click', function() {
            if (typeof gtag !== 'undefined') {
                gtag('event', 'contact', {
                    'event_category': 'phone_click',
                    'event_label': link.href
                });
            }
        });
    });
    
    // 6. Track email clicks
    document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
        link.addEventListener('click', function() {
            if (typeof gtag !== 'undefined') {
                gtag('event', 'contact', {
                    'event_category': 'email_click',
                    'event_label': link.href
                });
            }
        });
    });
    
    // 7. Add schema for local business
    if (document.querySelector('.factory-header')) {
        const businessSchema = {
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "@id": "https://lamdongcoop.com/#organization",
            "name": "HTX Lâm Đồng Đại Ngàn",
            "image": "https://lamdongcoop.com/assets/img/htx01.JPG",
            "telephone": "+84767333379",
            "email": "rogger.hoang@gmail.com",
            "address": {
                "@type": "PostalAddress",
                "addressLocality": "Lâm Đồng",
                "addressCountry": "VN"
            },
            "priceRange": "$$",
            "openingHours": "Mo-Su 08:00-17:00",
            "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "reviewCount": "150"
            }
        };
        
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.text = JSON.stringify(businessSchema);
        document.head.appendChild(script);
    }
});

// Performance: Preload critical resources
const preloadLink = document.createElement('link');
preloadLink.rel = 'preload';
preloadLink.as = 'image';
preloadLink.href = '/assets/img/htx01.JPG';
document.head.appendChild(preloadLink);

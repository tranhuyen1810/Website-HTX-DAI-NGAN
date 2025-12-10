// Translation System for HTX Website
// Supports Vietnamese (vi) and English (en)

const translations = {
    vi: {
        // Navigation
        nav_home: "TRANG CHỦ",
        nav_capacity: "HỒ SƠ NĂNG LỰC",
        nav_partners: "MẠNG LƯỚI ĐỐI TÁC",
        nav_investment: "ĐẦU TƯ",
        nav_products: "SẢN PHẨM",
        nav_news: "TIN TỨC",
        nav_contact: "LIÊN HỆ",
        
        // Partners Section
        partners_subtitle: "ĐỐI TÁC & THÀNH VIÊN",
        partners_title: "MẠNG LƯỚI ĐỐI TÁC<br>& THÀNH VIÊN HTX",
        partners_desc: "Hợp tác cùng phát triển - Cùng nhau tạo giá trị bền vững",
        partners_strategic: "🤝 Đối Tác Chiến Lược",
        members_title: "👨‍🌾 Thành Viên Hợp Tác Xã",
        members_count: "Thành viên",
        members_land: "Hecta canh tác",
        members_villages: "Xã/Thôn tham gia",
        members_benefits_title: "Quyền Lợi Thành Viên HTX:",
        benefit_1: "✓ Hỗ trợ giống cây trồng chất lượng cao",
        benefit_2: "✓ Đào tạo kỹ thuật canh tác hữu cơ miễn phí",
        benefit_3: "✓ Thu mua sản phẩm với giá ổn định, hợp lý",
        benefit_4: "✓ Hỗ trợ vốn sản xuất lãi suất ưu đãi",
        benefit_5: "✓ Chia sẻ lợi nhuận cuối năm",
        benefit_6: "✓ Bảo hiểm nông nghiệp và hỗ trợ rủi ro",
        join_htx: "ĐĂNG KÝ THAM GIA HTX",
        
        // News Section
        news_subtitle: "CẬP NHẬT MỚI NHẤT",
        news_title: "TIN TỨC & SỰ KIỆN",
        news_desc: "Những thông tin mới nhất về HTX và ngành nông nghiệp",
        news_hot: "MỚI NHẤT",
        cat_event: "Sự kiện",
        cat_invest: "Đầu tư",
        cat_training: "Đào tạo",
        cat_partner: "Đối tác",
        news1_title: "HTX Đại Ngàn đạt chứng nhận VietGAP năm 2025",
        news1_desc: "Sau quá trình kiểm định nghiêm ngặt, HTX chính thức được cấp chứng nhận VietGAP cho toàn bộ vùng canh tác 500 hecta...",
        news2_title: "Khai trương nhà máy chế biến rau củ hiện đại",
        news2_desc: "Nhà máy với công suất 50 tấn/ngày chính thức đi vào hoạt động, tạo việc làm cho 100 lao động địa phương...",
        news3_title: "Hội thảo kỹ thuật canh tác hữu cơ cho thành viên",
        news3_desc: "Chương trình đào tạo thu hút hơn 80 nông dân tham gia, học cách sản xuất rau củ an toàn theo tiêu chuẩn quốc tế...",
        news4_title: "Ký kết hợp đồng cung ứng với VinMart",
        news4_desc: "HTX Đại Ngàn trở thành nhà cung cấp chính thức cho hệ thống VinMart trên toàn quốc với khối lượng 100 tấn/tháng...",
        read_more: "Đọc thêm →"
    },
    en: {
        // Navigation
        nav_home: "HOME",
        nav_capacity: "CAPACITY PROFILE",
        nav_partners: "PARTNER NETWORK",
        nav_investment: "INVESTMENT",
        nav_products: "PRODUCTS",
        nav_news: "NEWS",
        nav_contact: "CONTACT",
        
        // Partners Section
        partners_subtitle: "PARTNERS & MEMBERS",
        partners_title: "PARTNER NETWORK<br>& COOPERATIVE MEMBERS",
        partners_desc: "Collaborate for development - Together creating sustainable value",
        partners_strategic: "🤝 Strategic Partners",
        members_title: "👨‍🌾 Cooperative Members",
        members_count: "Members",
        members_land: "Hectares cultivated",
        members_villages: "Villages participated",
        members_benefits_title: "Cooperative Member Benefits:",
        benefit_1: "✓ Support for high-quality seedlings",
        benefit_2: "✓ Free organic farming technical training",
        benefit_3: "✓ Product purchase at stable, fair prices",
        benefit_4: "✓ Production capital support with preferential rates",
        benefit_5: "✓ Year-end profit sharing",
        benefit_6: "✓ Agricultural insurance and risk support",
        join_htx: "JOIN THE COOPERATIVE",
        
        // News Section
        news_subtitle: "LATEST UPDATES",
        news_title: "NEWS & EVENTS",
        news_desc: "Latest information about the Cooperative and agriculture industry",
        news_hot: "LATEST",
        cat_event: "Event",
        cat_invest: "Investment",
        cat_training: "Training",
        cat_partner: "Partner",
        news1_title: "Dai Ngan Cooperative Achieves VietGAP Certification 2025",
        news1_desc: "After rigorous inspection, the cooperative officially received VietGAP certification for the entire 500-hectare cultivation area...",
        news2_title: "Opening of Modern Vegetable Processing Plant",
        news2_desc: "The factory with a capacity of 50 tons/day officially went into operation, creating jobs for 100 local workers...",
        news3_title: "Organic Farming Technical Workshop for Members",
        news3_desc: "The training program attracted over 80 farmers to participate, learning how to produce safe vegetables according to international standards...",
        news4_title: "Signing Supply Contract with VinMart",
        news4_desc: "Dai Ngan Cooperative became the official supplier for VinMart system nationwide with a volume of 100 tons/month...",
        read_more: "Read more →"
    }
};

// Current language (default: Vietnamese)
let currentLang = 'vi';

// Initialize translation system
function initTranslation() {
    // Get language from localStorage or use default
    const savedLang = localStorage.getItem('preferredLanguage');
    if (savedLang && (savedLang === 'vi' || savedLang === 'en')) {
        currentLang = savedLang;
        setLanguage(currentLang);
    }
    
    // Add event listeners to language buttons (both old and new styles)
    const langButtons = document.querySelectorAll('.lang-btn, .lang-btn-icon');
    langButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            setLanguage(lang);
            
            // Update active state for all language buttons
            document.querySelectorAll('.lang-btn, .lang-btn-icon').forEach(b => b.classList.remove('active'));
            document.querySelectorAll(`[data-lang="${lang}"]`).forEach(b => b.classList.add('active'));
            
            // Save preference
            localStorage.setItem('preferredLanguage', lang);
        });
    });
}

// Set language and translate all elements
function setLanguage(lang) {
    currentLang = lang;
    
    // Find all elements with data-translate attribute
    const elements = document.querySelectorAll('[data-translate]');
    
    elements.forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[lang] && translations[lang][key]) {
            // Check if translation contains HTML (like <br>)
            if (translations[lang][key].includes('<br>')) {
                element.innerHTML = translations[lang][key];
            } else {
                element.textContent = translations[lang][key];
            }
        }
    });
    
    // Update language button states
    const langButtons = document.querySelectorAll('.lang-btn, .lang-btn-icon');
    langButtons.forEach(btn => {
        if (btn.getAttribute('data-lang') === lang) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTranslation);
} else {
    initTranslation();
}

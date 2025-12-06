// ===== PRODUCT DETAIL MODAL =====
const productData = {
  'hanhngo': {
    name: 'Hành Ngò Đà Lạt',
    price: '10.000đ/kg',
    image: 'assets/img/HanhNgo.jpg',
    description: 'Hành ngò tươi ngon từ cao nguyên Đà Lạt, giàu vitamin và khoáng chất, tốt cho sức khỏe.',
    specs: [
      'Xuất xứ: Đà Lạt, Lâm Đồng',
      'Trọng lượng: 1kg',
      'Bảo quản: Ngăn mát tủ lạnh 3-5 ngày',
      'Chứng nhận: VietGAP'
    ]
  },
  'bapcai': {
    name: 'Bắp Cải Đà Lạt',
    price: '5.000đ/500g',
    image: 'assets/img/Bắp cải.jpg',
    description: 'Bắp cải tươi xanh, giòn ngọt từ Đà Lạt. Giàu chất xơ và vitamin C.',
    specs: [
      'Xuất xứ: Đà Lạt, Lâm Đồng',
      'Trọng lượng: 500g',
      'Bảo quản: Ngăn mát tủ lạnh 5-7 ngày',
      'Chứng nhận: VietGAP, Organic'
    ]
  },
  'caithao': {
    name: 'Cải Thảo Đà Lạt',
    price: '5.000đ/bó',
    image: 'assets/img/cai-thao.png',
    description: 'Cải thảo tươi ngon, lá xanh mướt, ngọt thanh. Thích hợp cho nhiều món ăn.',
    specs: [
      'Xuất xứ: Đà Lạt, Lâm Đồng',
      'Trọng lượng: 1 bó (khoảng 500g)',
      'Bảo quản: Ngăn mát tủ lạnh 4-6 ngày',
      'Chứng nhận: VietGAP'
    ]
  },
  'otchuong': {
    name: 'Ớt Chuông Đà Lạt',
    price: '10.000đ/500g',
    image: 'assets/img/ot chuong.png',
    description: 'Ớt chuông đủ màu sắc, giòn ngọt, giàu vitamin A và C.',
    specs: [
      'Xuất xứ: Đà Lạt, Lâm Đồng',
      'Trọng lượng: 500g',
      'Màu sắc: Đỏ, vàng, xanh',
      'Bảo quản: Ngăn mát tủ lạnh 7-10 ngày'
    ]
  },
  'carot': {
    name: 'Cà Rốt Đà Lạt',
    price: '5.000đ/kg',
    image: 'assets/img/Ca Rot.jpg',
    description: 'Cà rốt tươi ngon, giòn ngọt, giàu beta-carotene và vitamin A.',
    specs: [
      'Xuất xứ: Đà Lạt, Lâm Đồng',
      'Trọng lượng: 1kg',
      'Bảo quản: Nơi khô ráo 2 tuần',
      'Chứng nhận: VietGAP'
    ]
  },
  'khoaitay': {
    name: 'Khoai Tây Đà Lạt',
    price: '15.000đ/kg',
    image: 'assets/img/khoai tay.jpg',
    description: 'Khoai tây chất lượng cao, bùi ngọt tự nhiên, giàu tinh bột.',
    specs: [
      'Xuất xứ: Đà Lạt, Lâm Đồng',
      'Trọng lượng: 1kg',
      'Bảo quản: Nơi khô ráo thoáng mát 3-4 tuần',
      'Chứng nhận: VietGAP'
    ]
  },
  'cucai': {
    name: 'Củ Cải Đà Lạt',
    price: '5.000đ/kg',
    image: 'assets/img/616_cu_cai.png',
    description: 'Củ cải trắng tươi ngon, giòn ngọt, giàu chất xơ và vitamin C.',
    specs: [
      'Xuất xứ: Đà Lạt, Lâm Đồng',
      'Trọng lượng: 1kg',
      'Bảo quản: Ngăn mát tủ lạnh 1-2 tuần',
      'Chứng nhận: VietGAP'
    ]
  },
  'khoailang': {
    name: 'Khoai Lang Đà Lạt',
    price: '5.000đ/kg',
    image: 'assets/img/khoai lang.jpg',
    description: 'Khoai lang thơm ngon, bùi ngọt, giàu vitamin A và chất xơ.',
    specs: [
      'Xuất xứ: Đà Lạt, Lâm Đồng',
      'Trọng lượng: 1kg',
      'Bảo quản: Nơi khô ráo thoáng mát 2-3 tuần',
      'Chứng nhận: VietGAP'
    ]
  },
  'chanhday': {
    name: 'Nước Cốt Chanh Dây Đà Lạt',
    price: '15.000đ/lọ',
    image: 'assets/img/chanhday1.jpg',
    description: 'Nước cốt chanh dây nguyên chất 100%, không đường, không chất bảo quản.',
    specs: [
      'Xuất xứ: Đà Lạt, Lâm Đồng',
      'Dung tích: 250ml',
      'Bảo quản: Ngăn mát tủ lạnh sau khi mở',
      'HSD: 6 tháng'
    ]
  },
  'taoxoan': {
    name: 'Tảo Xoăn Thăng Hoa',
    price: '25.000đ/500g',
    image: 'assets/img/tao xoan thang hoa.jpg',
    description: 'Tảo xoăn sấy thăng hoa, giữ nguyên dưỡng chất, giàu protein và vitamin.',
    specs: [
      'Xuất xứ: Đà Lạt, Lâm Đồng',
      'Trọng lượng: 500g',
      'Công nghệ: Sấy thăng hoa',
      'Bảo quản: Nơi khô ráo, tránh ánh sáng'
    ]
  }
};

function openProductDetail(productId) {
  const product = productData[productId];
  if (!product) return;

  const modal = document.getElementById('productModal');
  document.getElementById('modalProductImg').src = product.image;
  document.getElementById('modalProductTitle').textContent = product.name;
  document.getElementById('modalProductPrice').textContent = product.price;
  document.getElementById('modalProductDescription').textContent = product.description;
  
  const specsList = document.getElementById('modalProductSpecs');
  specsList.innerHTML = '';
  product.specs.forEach(spec => {
    const li = document.createElement('li');
    li.textContent = spec;
    specsList.appendChild(li);
  });
  
  modal.style.display = 'block';
}

function closeProductDetail() {
  document.getElementById('productModal').style.display = 'none';
}

// ===== NEWS DETAIL MODAL =====
const newsData = {
  '1': {
    title: 'HTX Đạt Chứng Nhận Hữu Cơ Quốc Tế',
    date: '02/12/2025',
    image: 'assets/img/news1.jpg',
    content: `
      <p>Hợp Tác Xã Lâm Đồng Đại Ngàn vinh dự nhận được chứng nhận hữu cơ quốc tế từ tổ chức IFOAM (International Federation of Organic Agriculture Movements).</p>
      <p>Đây là thành quả của quá trình nỗ lực không ngừng trong việc áp dụng các tiêu chuẩn canh tác hữu cơ nghiêm ngặt, từ khâu chọn giống, chăm sóc đến thu hoạch và chế biến.</p>
      <h3>Ý nghĩa của chứng nhận:</h3>
      <ul>
        <li>Khẳng định chất lượng sản phẩm đạt tiêu chuẩn quốc tế</li>
        <li>Mở rộng thị trường xuất khẩu sang các nước EU, Nhật Bản</li>
        <li>Tăng giá trị sản phẩm và thu nhập cho nông dân</li>
        <li>Bảo vệ môi trường và phát triển bền vững</li>
      </ul>
      <p>HTX cam kết tiếp tục duy trì và nâng cao chất lượng sản phẩm, mang đến cho người tiêu dùng những sản phẩm an toàn, sạch và giàu dinh dưỡng nhất.</p>
    `
  },
  '2': {
    title: 'Khai Mạc Thị Trường Nông Sản Sạch',
    date: '25/11/2025',
    image: 'assets/img/news2.jpg',
    content: `
      <p>Sáng ngày 25/11/2025, HTX Lâm Đồng Đại Ngàn đã tổ chức lễ khai mạc Thị trường Nông sản Sạch tại thành phố Đà Lạt.</p>
      <p>Thị trường hoạt động vào mỗi cuối tuần, cung cấp các sản phẩm rau củ quả tươi ngon, sạch, trực tiếp từ nông dân đến tay người tiêu dùng.</p>
      <h3>Đặc điểm nổi bật:</h3>
      <ul>
        <li>100% sản phẩm có nguồn gốc rõ ràng</li>
        <li>Giá cả hợp lý, ổn định</li>
        <li>Nhiều chương trình khuyến mãi hấp dẫn</li>
        <li>Tư vấn dinh dưỡng miễn phí</li>
      </ul>
    `
  },
  '3': {
    title: 'Hội Thảo: Nông Nghiệp Bền Vững',
    date: '15/11/2025',
    image: 'assets/img/news3.jpg',
    content: `
      <p>HTX Lâm Đồng Đại Ngàn phối hợp với Sở Nông nghiệp và Phát triển Nông thôn tỉnh Lâm Đồng tổ chức Hội thảo "Nông nghiệp Bền vững - Hướng đi cho Tương lai".</p>
      <p>Hội thảo thu hút hơn 200 đại biểu là nông dân, chuyên gia, nhà khoa học trong và ngoài nước tham dự.</p>
      <h3>Nội dung chính:</h3>
      <ul>
        <li>Ứng dụng công nghệ cao trong nông nghiệp</li>
        <li>Quản lý tài nguyên đất và nước bền vững</li>
        <li>Phát triển chuỗi giá trị nông sản an toàn</li>
        <li>Thích ứng với biến đổi khí hậu</li>
      </ul>
    `
  }
};

const communityData = {
  '1': {
    title: 'Chương Trình Đào Tạo Nông Dân',
    date: '01/12/2025',
    content: `
      <p>HTX Lâm Đồng Đại Ngàn tổ chức khóa đào tạo miễn phí về kỹ thuật trồng trọt hữu cơ cho hơn 100 nông dân địa phương.</p>
      <h3>Nội dung đào tạo:</h3>
      <ul>
        <li>Kỹ thuật làm đất và bón phân hữu cơ</li>
        <li>Phòng trừ sâu bệnh bằng biện pháp sinh học</li>
        <li>Quản lý cây trồng theo tiêu chuẩn VietGAP</li>
        <li>Kỹ năng quản lý sản xuất và tiêu thụ</li>
      </ul>
      <p>Khóa học kéo dài 2 tuần với sự tham gia của các chuyên gia hàng đầu trong lĩnh vực nông nghiệp hữu cơ.</p>
    `
  },
  '2': {
    title: 'Trao Tặng Rau Sạch Cho Cộng Đồng',
    date: '20/11/2025',
    content: `
      <p>Chương trình "Trao yêu thương - Gửi sức khỏe" của HTX Lâm Đồng Đại Ngàn đã trao tặng 500kg rau củ quả sạch cho cộng đồng.</p>
      <h3>Đối tượng nhận hỗ trợ:</h3>
      <ul>
        <li>Trung tâm bảo trợ xã hội tỉnh Lâm Đồng</li>
        <li>Bệnh viện Đa khoa Lâm Đồng</li>
        <li>50 gia đình có hoàn cảnh khó khăn</li>
      </ul>
      <p>Đây là hoạt động thường xuyên của HTX nhằm chia sẻ khó khăn và lan tỏa giá trị nhân văn trong cộng đồng.</p>
    `
  },
  '3': {
    title: 'Ngày Hội Nông Dân Vui Khỏe',
    date: '10/11/2025',
    content: `
      <p>Ngày hội Nông dân Vui Khỏe được tổ chức nhằm tôn vinh những thành tựu của nông dân HTX và tạo sân chơi lành mạnh.</p>
      <h3>Các hoạt động:</h3>
      <ul>
        <li>Thi đua sản xuất giỏi</li>
        <li>Trưng bày sản phẩm nông sản</li>
        <li>Các trò chơi dân gian</li>
        <li>Biểu diễn văn nghệ</li>
        <li>Trao giải thưởng cho nông dân xuất sắc</li>
      </ul>
    `
  }
};

const projectData = {
  'project1': {
    title: 'Nâng Cao Chất Lượng Sản Phẩm',
    period: '2023 - 2024',
    content: `
      <p>Dự án tập trung vào việc nâng cao chất lượng sản phẩm nông sản, đạt các chứng nhận quốc tế và mở rộng thị trường xuất khẩu.</p>
      <h3>Mục tiêu:</h3>
      <ul>
        <li>Đạt chứng nhận hữu cơ USDA và EU Organic</li>
        <li>Nâng cấp quy trình sản xuất theo tiêu chuẩn GlobalGAP</li>
        <li>Xuất khẩu sản phẩm sang 5 quốc gia châu Á và châu Âu</li>
        <li>Tăng 30% giá trị sản phẩm</li>
      </ul>
      <h3>Kết quả đạt được:</h3>
      <p>Đã đạt được chứng nhận hữu cơ quốc tế IFOAM, ký kết hợp đồng xuất khẩu với 3 đối tác tại Nhật Bản và Hàn Quốc.</p>
    `
  },
  'project2': {
    title: 'Xây Dựng Kho Lạnh',
    period: '2024 - 2025',
    content: `
      <p>Dự án đầu tư xây dựng hệ thống kho lạnh hiện đại, công suất 500 tấn, trang bị công nghệ làm lạnh tiên tiến.</p>
      <h3>Quy mô dự án:</h3>
      <ul>
        <li>Diện tích: 2000m²</li>
        <li>Công suất: 500 tấn</li>
        <li>Nhiệt độ: -5°C đến +10°C</li>
        <li>Tổng đầu tư: 15 tỷ đồng</li>
      </ul>
      <h3>Lợi ích:</h3>
      <ul>
        <li>Bảo quản sản phẩm tươi lâu hơn</li>
        <li>Giảm tổn thất sau thu hoạch</li>
        <li>Điều tiết giá cả theo mùa vụ</li>
        <li>Tăng khả năng cạnh tranh</li>
      </ul>
    `
  },
  'project3': {
    title: 'Phát Triển Bền Vững',
    period: '2025 - 2026',
    content: `
      <p>Dự án hướng tới phát triển nông nghiệp bền vững, bảo vệ môi trường và nâng cao đời sống nông dân.</p>
      <h3>Các hoạt động chính:</h3>
      <ul>
        <li>Phát triển nông nghiệp hữu cơ 100%</li>
        <li>Sử dụng năng lượng tái tạo (điện mặt trời)</li>
        <li>Quản lý nước tưới thông minh</li>
        <li>Tái chế chất thải nông nghiệp</li>
        <li>Đào tạo nông dân về phát triển bền vững</li>
      </ul>
      <h3>Mục tiêu:</h3>
      <p>Trở thành HTX nông nghiệp bền vững tiên phong tại Việt Nam, góp phần bảo vệ môi trường và phát triển cộng đồng.</p>
    `
  }
};

function openNewsDetail(newsId) {
  const news = newsData[newsId];
  if (!news) return;

  const modal = document.getElementById('newsModal');
  document.getElementById('modalNewsTitle').textContent = news.title;
  document.getElementById('modalNewsDate').textContent = news.date;
  document.getElementById('modalNewsImg').src = news.image;
  document.getElementById('modalNewsContent').innerHTML = news.content;
  
  modal.style.display = 'block';
}

function openCommunityDetail(communityId) {
  const community = communityData[communityId];
  if (!community) return;

  const modal = document.getElementById('newsModal');
  document.getElementById('modalNewsTitle').textContent = community.title;
  document.getElementById('modalNewsDate').textContent = community.date;
  document.getElementById('modalNewsImg').style.display = 'none';
  document.getElementById('modalNewsContent').innerHTML = community.content;
  
  modal.style.display = 'block';
}

function openProjectDetail(projectId) {
  const project = projectData[projectId];
  if (!project) return;

  const modal = document.getElementById('newsModal');
  document.getElementById('modalNewsTitle').textContent = project.title;
  document.getElementById('modalNewsDate').textContent = project.period;
  document.getElementById('modalNewsImg').style.display = 'none';
  document.getElementById('modalNewsContent').innerHTML = project.content;
  
  modal.style.display = 'block';
}

function closeNewsDetail() {
  document.getElementById('newsModal').style.display = 'none';
  document.getElementById('modalNewsImg').style.display = 'block';
}

// Close modal when clicking outside
window.onclick = function(event) {
  const productModal = document.getElementById('productModal');
  const newsModal = document.getElementById('newsModal');
  if (event.target == productModal) {
    closeProductDetail();
  }
  if (event.target == newsModal) {
    closeNewsDetail();
  }
}

// Quantity selector
function increaseQuantity() {
  const input = document.getElementById('productQuantity');
  input.value = parseInt(input.value) + 1;
}

function decreaseQuantity() {
  const input = document.getElementById('productQuantity');
  if (parseInt(input.value) > 1) {
    input.value = parseInt(input.value) - 1;
  }
}

function addToCart() {
  alert('Đã thêm sản phẩm vào giỏ hàng!');
  closeProductDetail();
}

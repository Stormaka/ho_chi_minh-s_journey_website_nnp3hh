import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const seedJourneyData = mutation({
  args: {},
  handler: async (ctx) => {
    // Clear existing data
    const existingEvents = await ctx.db.query("journeyEvents").collect();
    for (const event of existingEvents) {
      await ctx.db.delete(event._id);
    }

    const existingQuotes = await ctx.db.query("quotes").collect();
    for (const quote of existingQuotes) {
      await ctx.db.delete(quote._id);
    }

    const existingImages = await ctx.db.query("galleryImages").collect();
    for (const image of existingImages) {
      await ctx.db.delete(image._id);
    }

    // Journey events
     const journeyEvents = [
      {
        year: 1911,
        location: "Saigon",
        country: "France",
        title: "Khởi đầu hành trình",
        description: "Nguyễn Tất Thành rời quê hương lên tàu Amiral Latouche-Tréville với tên Ba đi tìm đường cứu nước.",
        significance: "Đây là bước khởi đầu quan trọng trong hành trình tìm đường cứu nước của Bác Hồ. Với quyết tâm cao độ, Người đã rời bỏ quê hương để tìm hiểu thế giới bên ngoài.",
        coordinates: { lat: 10.8231, lng: 106.6297 },
        action: "Rời quê hương, lên tàu đi tìm đường cứu nước,đổi tên thành anh Ba và làm phụ bếp trên tàu Amiral Latouche-Tréville .",
        affect: "Từ bỏ ảo tưởng cải cách cũng như hướng tới cách mạng quần chúng.",
  cognition: "Hồ Chí Minh nhận ra bản chất tư bản, từ bỏ ảo tưởng về sự hỗ trợ từ TBCN, định hình cách mạng dựa vào quần chúng và đoàn kết quốc tế, mở ra giai đoạn mới trong hành trình cứu nước."
},
      {
        year: 1912,
        location: "New York",
        country: "United States",
        title: "Đến Mỹ - Tìm hiểu dân chủ",
        description: "Làm việc tại khách sạn Parker House ở Boston, tìm hiểu về nền dân chủ Mỹ và phong trào đấu tranh của người da đen.",
        significance: "Tại Mỹ, Bác Hồ đã chứng kiến sự bất bình đẳng chủng tộc và hiểu được rằng chủ nghĩa đế quốc không chỉ áp bức người Việt mà còn áp bức nhiều dân tộc khác.",
        coordinates: { lat: 40.7128, lng: -74.0060 },
        action: "Làm việc, quan sát xã hội Mỹ, tiếp xúc các phong trào đấu tranh.",
        affect: "Chuyển từ yêu nước thuần túy sang đấu tranh giai cấp.",
        cognition: "Nhận ra cách mạng tư sản không mang tự do thực sự và đặc biệt xác định kẻ thù là chủ nghĩa đế quốc và giai cấp bóc lột."
      },
      {
        year: 1913,
        location: "London",
        country: "United Kingdom",
        title: "Học hỏi tại Anh",
        description: "Làm việc tại khách sạn Carlton, học tiếng Anh và tìm hiểu về chế độ chính trị Anh.",
        significance: "Tại London, Bác Hồ đã mở rộng hiểu biết về các hệ thống chính trị khác nhau và tiếp xúc với nhiều tư tưởng tiến bộ của thời đại.",
        coordinates: { lat: 51.5074, lng: -0.1278 },
        action: "Làm công nhân,tham gia phong trào công nhân,biểu tình.",
        affect: "Xác định con đường cách mạng vô sản.",
        cognition: "Nhận thức rõ hơn về vai trò giai cấp công nhân trong cách mạng; cần tổ chức chặt chẽ, đoàn kết quốc tế; và nhận ra: \"Chỉ có 2 giống người: người bóc lột và người bị bóc lột\"."
      },
      {
        year: 1917,
        location: "Paris",
        country: "France",
        title: "Trở về Pháp",
        description: "Chuyển đến Paris, tham gia các hoạt động chính trị và viết báo. Bắt đầu sử dụng tên Nguyễn Ái Quốc.",
        significance: "Sau thế chiến I,phong trào công nhân Pháp sôi động.Đây là thời kỳ Bác Hồ bắt đầu hoạt động chính trị tích cực, viết báo và tham gia vào phong trào đấu tranh của người Việt tại Pháp.",
        coordinates: { lat: 48.8566, lng: 2.3522 },
        action: "Tiếp cận báo chí,tổ chức công nhân,tư tưởng Marx.",
        affect: "Định hình tư duy cách mạng quốc tế.",
        cognition: "Nhận thức rõ bản chất bóc lột của chủ nghĩa thực dân-đế quốc;liên kết giải phóng dân tộc với cách mạng vô sản quốc tế."
      },
      {
        year: 1919,
        location: "Versailles",
        country: "France",
        title: "Quốc tế Cộng sản + Bản yêu sách 8 điều ",
        description: "Gửi Bản yêu sách 8 điều đến Hội nghị Versailles, đòi quyền tự do dân chủ cho nhân dân Đông Dương.",
        significance: "Đây là lần đầu tiên tiếng nói của nhân dân Việt Nam được đưa ra trước diễn đàn quốc tế, đánh dấu sự ra đời của Nguyễn Ái Quốc trên chính trường.",
        coordinates: { lat: 48.8048, lng: 2.1203 },
        action: "Gửi bản yêu sách của nhân dân An Nam đến Hội nghị Versailles,đòi quyền tự do,dân chủ;tham gia phong trào công nhân,tiếp cận Quốc tế Cộng sản.",
        affect: "Hy vọng, tự hào đại diện cho dân tộc.",
        cognition: "Nhận ra cần dựa vào sức mình,không trông chờ cải cách khi bản yêu sách bị từ chối,phơi bày bản chất lừa bịp của đế quốc"
      },
      {
        year: 1920,
        location: "Tours",
        country: "France",
        title: "Luận cương của Leenin + Đại hội Tours",
        description: "Tham dự Đại hội Tours của Đảng Xã hội Pháp, gia nhập Đảng Cộng sản Pháp.",
        significance: "Đây là bước ngoặt quan trọng khi Bác Hồ tìm thấy con đường cách mạng đúng đắn - chủ nghĩa Mác-Lênin, định hướng cho cả cuộc đời hoạt động cách mạng.",
        coordinates: { lat: 47.3941, lng: 0.6848 },
        action: "Tháng 7/1920,đọc “Luận cương về vấn đề dân tộc và thuộc địa” của Lênin. Tháng 12/1920,tham dự Đại hội Tours của Đảng Xã hội Pháp,gia nhập Đảng Cộng sản Pháp.",
        affect: "Chuyển từ yêu nước cảm tính sang cách mạng khoa học;trở thành người cộng sản Việt Nam đầu tiên;đặt nền móng cho Đảng cộng sản Việt Nam(1930).",
        cognition: "Nhận thức được vai trò của chủ nghĩa Mác-Lênin đối với cách mạng Việt Nam."
      },
    ];

    for (const event of journeyEvents) {
      await ctx.db.insert("journeyEvents", event);
    }

    // Famous quotes
    const quotes = [
      {
        text: "Không có gì quý hơn độc lập tự do",
        context: "Tuyên ngôn độc lập 2/9/1945",
        year: 1945,
        category: "independence",
      },
      {
        text: "Đi tìm đường cứu nước",
        context: "Động lực của hành trình ra đi năm 1911",
        year: 1911,
        category: "journey",
      },
      {
        text: "Yêu nước là phẩm chất cao đẹp nhất của con người",
        context: "Tư tưởng về lòng yêu nước",
        category: "patriotism",
      },
      {
        text: "Dân ta phải thống nhất, nước ta phải độc lập",
        context: "Lời kêu gọi đoàn kết dân tộc",
        category: "unity",
      },
      {
        text: "Cách mạng là sự nghiệp của quần chúng, không phải của một người",
        context: "Tư tưởng về vai trò của nhân dân",
        category: "revolution",
      },
    ];

    for (const quote of quotes) {
      await ctx.db.insert("quotes", quote);
    }

    // Gallery images (using placeholder URLs)
    const galleryImages = [
      {
        title: "Bác Hồ thời trẻ",
        description: "Hình ảnh Nguyễn Tất Thành thời niên thiếu",
        imageUrl: "https://nguoikesu.com/images/wiki/nguyen-tat-thanh/94fd7ff8aaa982926f7697267e142693.jpg",
        year: 1910,
        category: "early-life",
      },
      {
        title: "Tàu Amiral Latouche-Tréville",
        description: "Con tàu đưa Bác Hồ rời quê hương năm 1911",
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGPL92-4-FIL66kdHgf3GD5kV6MOjoxNTCCA&s",
        year: 1911,
        category: "journey",
      },
      {
        title: "Paris đầu thế kỷ 20",
        description: "Thành phố Paris nơi Bác Hồ sinh sống và hoạt động",
        imageUrl: "https://baotanglichsu.vn/DataFiles/Uploaded/image/data%20Hung/thang%205%20nam%202017/can%20nha%20so%209/2.jpg",
        year: 1917,
        category: "places",
      },
      {
        title: "Hội nghị Versailles 1919",
        description: "Nơi Bác Hồ gửi Bản yêu sách 8 điều",
        imageUrl: "https://images.hcmcpv.org.vn/res/news/2019/06/18-06-2019-yeu-sach-cua-nhan-dan-an-nam-mot-the-ky-van-ven-nguyen-gia-tri-57057029.jpg",
        year: 1919,
        category: "historical-events",
      },
    ];

    for (const image of galleryImages) {
      await ctx.db.insert("galleryImages", image);
    }

    return "Data seeded successfully";
  },
});

export const getJourneyEvents = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("journeyEvents").withIndex("by_year").collect();
  },
});

export const getQuotes = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("quotes").collect();
  },
});

export const getGalleryImages = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("galleryImages").collect();
  },
});

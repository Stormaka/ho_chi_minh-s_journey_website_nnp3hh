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
        country: "French Indochina",
        title: "Khởi đầu hành trình",
        description: "Nguyễn Tất Thành rời quê hương lên tàu Amiral Latouche-Tréville với tên Ba đi tìm đường cứu nước.",
        significance: "Đây là bước khởi đầu quan trọng trong hành trình tìm đường cứu nước của Bác Hồ. Với quyết tâm cao độ, Người đã rời bỏ quê hương để tìm hiểu thế giới bên ngoài.",
        coordinates: { lat: 10.8231, lng: 106.6297 },
      },
      {
        year: 1912,
        location: "New York",
        country: "United States",
        title: "Đến Mỹ - Tìm hiểu dân chủ",
        description: "Làm việc tại khách sạn Parker House ở Boston, tìm hiểu về nền dân chủ Mỹ và phong trào đấu tranh của người da đen.",
        significance: "Tại Mỹ, Bác Hồ đã chứng kiến sự bất bình đẳng chủng tộc và hiểu được rằng chủ nghĩa đế quốc không chỉ áp bức người Việt mà còn áp bức nhiều dân tộc khác.",
        coordinates: { lat: 40.7128, lng: -74.0060 },
      },
      {
        year: 1913,
        location: "London",
        country: "United Kingdom",
        title: "Học hỏi tại Anh",
        description: "Làm việc tại khách sạn Carlton, học tiếng Anh và tìm hiểu về chế độ chính trị Anh.",
        significance: "Tại London, Bác Hồ đã mở rộng hiểu biết về các hệ thống chính trị khác nhau và tiếp xúc với nhiều tư tưởng tiến bộ của thời đại.",
        coordinates: { lat: 51.5074, lng: -0.1278 },
      },
      {
        year: 1917,
        location: "Paris",
        country: "France",
        title: "Định cư tại Pháp",
        description: "Chuyển đến Paris, tham gia các hoạt động chính trị và viết báo. Bắt đầu sử dụng tên Nguyễn Ái Quốc.",
        significance: "Đây là thời kỳ Bác Hồ bắt đầu hoạt động chính trị tích cực, viết báo và tham gia vào phong trào đấu tranh của người Việt tại Pháp.",
        coordinates: { lat: 48.8566, lng: 2.3522 },
      },
      {
        year: 1919,
        location: "Versailles",
        country: "France",
        title: "Bản yêu sách 8 điều",
        description: "Gửi Bản yêu sách 8 điều đến Hội nghị Versailles, đòi quyền tự do dân chủ cho nhân dân Đông Dương.",
        significance: "Đây là lần đầu tiên tiếng nói của nhân dân Việt Nam được đưa ra trước diễn đàn quốc tế, đánh dấu sự ra đời của Nguyễn Ái Quốc trên chính trường.",
        coordinates: { lat: 48.8048, lng: 2.1203 },
      },
      {
        year: 1920,
        location: "Tours",
        country: "France",
        title: "Tham gia Đảng Cộng sản Pháp (Tháng 7)",
        description: "Tham dự Đại hội Tours của Đảng Xã hội Pháp, gia nhập Đảng Cộng sản Pháp.",
        significance: "Đây là bước ngoặt quan trọng khi Bác Hồ tìm thấy con đường cách mạng đúng đắn - chủ nghĩa Mác-Lênin, định hướng cho cả cuộc đời hoạt động cách mạng.",
        coordinates: { lat: 47.3941, lng: 0.6848 },
      },
      {
        year: 1920,
        location: "Paris",
        country: "France",
        title: "Thành lập Hội Liên hiệp thuộc địa (Tháng 12)",
        description: "Cùng với các nhà yêu nước khác thành lập Hội Liên hiệp thuộc địa, đấu tranh cho quyền lợi của các dân tộc thuộc địa.",
        significance: "Việc thành lập Hội Liên hiệp thuộc địa thể hiện tầm nhìn quốc tế của Bác Hồ, liên kết đấu tranh của các dân tộc bị áp bức trên thế giới.",
        coordinates: { lat: 48.8566, lng: 2.3522 },
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

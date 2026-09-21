export type Answer = { text: string; correct: boolean; feedback: string };
export type Encounter = { name: string; role: string; icon: string; position: { x: number; y: number }; lines: string[]; question: string; answers: Answer[] };
export type Region = { id: string; chapter: string; title: string; subtitle: string; image: string; accent: string; glyph: string; pageName: string; objective: string; lesson: string; encounters: Encounter[] };

const a = (text: string, correct: boolean, feedback: string): Answer => ({ text, correct, feedback });

const baseRegions: Region[] = [
  {
    id: "library", chapter: "Chương I", title: "Thư Viện Những Lối Rẽ", subtitle: "Khởi nguồn của khoa học", image: "/assets/region-1-market.png", accent: "#d8ad62", glyph: "⌘", pageName: "Ngọn Đèn Khoa Học",
    objective: "Tìm ba dấu vết để phân biệt khát vọng, khoa học và giáo điều.",
    lesson: "Chủ nghĩa xã hội khoa học ra đời từ những điều kiện lịch sử cụ thể, kế thừa thành tựu tư tưởng và dựa trên các phát kiến khoa học.",
    encounters: [
      { name: "Lam", role: "Thủ thư ký ức", icon: "📜", position: { x: 48, y: 30 }, lines: ["Biên Niên Sử Tương Lai đã bị xé thành bảy trang.", "Muốn tìm lại chúng, ta phải nhìn sự vật trong hoàn cảnh lịch sử cụ thể."], question: "Chủ nghĩa xã hội khoa học là gì?", answers: [a("Một bộ phận của chủ nghĩa Mác - Lênin", true, "Đúng. Nó nghiên cứu quy luật và con đường chuyển biến lên xã hội mới."), a("Mọi ước mơ về một xã hội tốt đẹp", false, "Khát vọng nhân đạo quan trọng nhưng chưa tự nó trở thành lý luận khoa học."), a("Một bản thiết kế xã hội bất biến", false, "Lý luận khoa học phải gắn với lịch sử và thực tiễn.")] },
      { name: "Cô Hạ", role: "Thợ in", icon: "🕯️", position: { x: 25, y: 62 }, lines: ["Tôi tìm thấy ba bản khắc: công nghiệp, khoa học và di sản tư tưởng.", "Chúng dường như cùng dẫn đến một bước ngoặt."], question: "Vì sao lý luận khoa học không xuất hiện chỉ từ ý muốn cá nhân?", answers: [a("Nó cần điều kiện kinh tế - xã hội và các tiền đề khoa học, tư tưởng", true, "Chính xác. Sự ra đời của lý luận có cơ sở khách quan và quá trình kế thừa."), a("Phải chờ một thiên tài nghĩ ra toàn bộ", false, "Cá nhân có vai trò nhưng không thể tách khỏi điều kiện lịch sử."), a("Xã hội luôn tự phát triển theo đường thẳng", false, "Lịch sử không vận động đơn giản hay không có mâu thuẫn.")] },
      { name: "Giáo sư Kha", role: "Người giữ bản khắc", icon: "📚", position: { x: 76, y: 58 }, lines: ["Ta thuộc mọi định nghĩa nhưng thư viện vẫn không mở cửa.", "Biết câu chữ chưa đồng nghĩa với hiểu phương pháp."], question: "Cách học nào phù hợp nhất?", answers: [a("Gắn lý luận với lịch sử, thực tiễn và các mối liên hệ", true, "Đúng. Học để nhận ra quy luật, điều kiện và khả năng vận dụng."), a("Thuộc lòng kết luận, không cần bối cảnh", false, "Tách kết luận khỏi bối cảnh dễ dẫn đến giáo điều."), a("Chỉ dựa vào trải nghiệm cá nhân", false, "Trải nghiệm không thay thế được phân tích khoa học.")] }
    ]
  },
  {
    id: "workers", chapter: "Chương II", title: "Thành Phố Công Xưởng", subtitle: "Chủ thể của lịch sử", image: "/assets/region-2-guild.png", accent: "#e67550", glyph: "⚙", pageName: "Bánh Răng Tiên Phong",
    objective: "Kết nối những người lao động đang bị chia tách trong thành phố công nghiệp.",
    lesson: "Sứ mệnh lịch sử của giai cấp công nhân do địa vị kinh tế - xã hội quy định và được hiện thực hóa thông qua sự trưởng thành, tổ chức và lãnh đạo chính trị.",
    encounters: [
      { name: "Bác Thợ Cả", role: "Công nhân cơ khí", icon: "⚒️", position: { x: 26, y: 56 }, lines: ["Máy móc thay đổi, nhưng người lao động vẫn không sở hữu tư liệu sản xuất chủ yếu.", "Đừng nhầm hình thức lao động mới với việc quan hệ sản xuất đã biến mất."], question: "Đặc điểm nào giúp nhận diện giai cấp công nhân hiện đại?", answers: [a("Vị trí trong sản xuất và quan hệ với tư liệu sản xuất", true, "Đúng. Không thể chỉ nhận diện bằng nghề nghiệp hay lao động chân tay."), a("Chỉ những người trực tiếp đứng máy", false, "Sản xuất hiện đại có nhiều hình thức lao động khác nhau."), a("Bất kỳ ai có thu nhập thấp", false, "Thu nhập không phải tiêu chí lý luận duy nhất.")] },
      { name: "Mai Lương", role: "Kỹ sư tự động hóa", icon: "🧑‍💻", position: { x: 51, y: 35 }, lines: ["Tôi vận hành tự động, Kỳ làm trên nền tảng số, bác Cả đứng máy.", "Chúng tôi khác nghề nhưng cùng tham gia nền sản xuất xã hội hóa cao."], question: "Điều kiện khách quan đã đủ để sứ mệnh lịch sử tự hoàn thành chưa?", answers: [a("Chưa, còn cần nhân tố chủ quan, tổ chức và sự lãnh đạo", true, "Chính xác. Sứ mệnh lịch sử không diễn ra tự động."), a("Đủ, lịch sử không cần con người hành động", false, "Cách hiểu này phủ nhận vai trò của tổ chức và ý thức."), a("Chỉ cần máy móc hiện đại hơn", false, "Công nghệ không tự giải quyết quan hệ xã hội.")] },
      { name: "Quản đốc Thép", role: "Người giữ cỗ máy", icon: "🏭", position: { x: 76, y: 58 }, lines: ["Ta chia các ngươi theo nghề, hợp đồng và mức lương.", "Các ngươi chẳng có điểm chung nào cả!"], question: "Sứ mệnh lịch sử gồm những nội dung nào?", answers: [a("Kinh tế; chính trị - xã hội; văn hóa - tư tưởng", true, "Đúng. Ba nội dung liên hệ và hỗ trợ lẫn nhau."), a("Chỉ tăng lương và giảm giờ làm", false, "Đó là yêu cầu thiết thực nhưng chưa bao quát toàn bộ."), a("Chỉ thay đổi bộ máy chính trị", false, "Sự biến đổi còn bao gồm kinh tế, văn hóa và con người.")] }
    ]
  },
  {
    id: "transition", chapter: "Chương III", title: "Cây Cầu Quá Độ", subtitle: "Giữa hai thời đại", image: "/assets/region-3-bank.png", accent: "#60aecd", glyph: "⌁", pageName: "La Bàn Quá Độ",
    objective: "Giữ cây cầu cân bằng giữa nóng vội và bảo thủ.",
    lesson: "Thời kỳ quá độ là quá trình lâu dài, phức tạp, trong đó những yếu tố cũ và mới cùng tồn tại, đấu tranh và chuyển hóa.",
    encounters: [
      { name: "Kiến trúc sư Vân", role: "Người xây cầu", icon: "🌉", position: { x: 48, y: 34 }, lines: ["Một bờ là xã hội cũ, bờ kia là mục tiêu tương lai.", "Cây cầu không thể xuất hiện sau một đêm, nhưng cũng không thể vì khó mà ngừng xây."], question: "Vì sao cần có thời kỳ quá độ?", answers: [a("Xã hội mới cần cơ sở vật chất, quan hệ xã hội và con người được xây dựng qua quá trình", true, "Đúng. Đây là quá trình cải biến sâu sắc và toàn diện."), a("Chỉ cần chờ các yếu tố cũ tự biến mất", false, "Cái cũ không tự mất nếu thiếu hoạt động cải tạo và xây dựng."), a("Để bỏ qua mọi bước phát triển", false, "Quá độ không đồng nghĩa với bỏ qua điều kiện khách quan.")] },
      { name: "Nhóm Nhảy Một Bước", role: "Những người nóng vội", icon: "🔥", position: { x: 25, y: 62 }, lines: ["Phá hết vật liệu cũ đi!", "Ngày mai cây cầu hoàn hảo sẽ tự xuất hiện."], question: "Điểm sai trong lập luận này?", answers: [a("Phủ nhận tính lâu dài và sự đan xen cũ - mới", true, "Chính xác. Ý chí không thể thay thế điều kiện khách quan."), a("Đặt mục tiêu thay đổi xã hội", false, "Mục tiêu không sai; vấn đề nằm ở phương pháp nóng vội."), a("Muốn loại bỏ bất công", false, "Khát vọng chính đáng cần bước đi phù hợp.")] },
      { name: "Nhóm Đứng Yên", role: "Những người bảo thủ", icon: "🪨", position: { x: 76, y: 60 }, lines: ["Cầu chưa hoàn hảo, vậy tốt nhất đừng xây nữa."], question: "Phương án phù hợp là gì?", answers: [a("Giữ phương hướng, xử lý mâu thuẫn cụ thể và xây theo giai đoạn", true, "Đúng. Cần chống cả nóng vội lẫn bảo thủ."), a("Quay về nguyên trạng", false, "Khó khăn không phủ nhận tính cần thiết của phát triển."), a("Sao chép nguyên mẫu từ nơi khác", false, "Mỗi con đường phải xuất phát từ điều kiện cụ thể.")] }
    ]
  },
  {
    id: "democracy", chapter: "Chương IV", title: "Quảng Trường Tiếng Nói", subtitle: "Dân chủ và pháp quyền", image: "/assets/region-4-valley.png", accent: "#9d7bd6", glyph: "◈", pageName: "Con Dấu Nhân Dân",
    objective: "Khôi phục quyền tham gia, trách nhiệm giải trình và cơ chế giám sát.",
    lesson: "Dân chủ xã hội chủ nghĩa gắn với quyền làm chủ của nhân dân và được bảo đảm bằng Nhà nước pháp quyền, pháp luật cùng cơ chế kiểm soát quyền lực.",
    encounters: [
      { name: "Đại biểu Liên", role: "Người triệu tập hội nghị", icon: "🗣️", position: { x: 26, y: 57 }, lines: ["Ai cũng được nói nhưng quyết định không được công khai.", "Có tiếng nói mà thiếu cơ chế thực hiện thì quyền làm chủ vẫn chưa đầy đủ."], question: "Dân chủ có nghĩa là ai muốn làm gì cũng được?", answers: [a("Không, quyền dân chủ gắn với pháp luật, trách nhiệm và lợi ích chung", true, "Đúng. Dân chủ khác với tùy tiện."), a("Có, mọi giới hạn đều chống dân chủ", false, "Quyền mỗi người tồn tại trong quan hệ với người khác và cộng đồng."), a("Không, vì chỉ cơ quan quản lý được quyết định", false, "Cách này gạt nhân dân khỏi vai trò chủ thể.")] },
      { name: "Thẩm phán Chính", role: "Người giữ Tòa Luật", icon: "⚖️", position: { x: 51, y: 35 }, lines: ["Pháp luật phải bảo đảm quyền, không phải khóa người dân bên ngoài.", "Quyền lực không được giám sát rất dễ xa rời mục đích."], question: "Quan hệ đúng giữa dân chủ và Nhà nước XHCN?", answers: [a("Nhà nước thể chế hóa và bảo đảm quyền làm chủ của nhân dân", true, "Chính xác. Dân chủ cần cơ chế để trở thành hiện thực."), a("Nhà nước thay nhân dân quyết định mọi việc", false, "Nhà nước không thể tách khỏi chủ thể quyền lực là nhân dân."), a("Có dân chủ thì không cần pháp luật", false, "Đây là cách đối lập giả tạo.")] },
      { name: "Quan Nhiếp Chính", role: "Kẻ nhân danh trật tự", icon: "🎭", position: { x: 76, y: 58 }, lines: ["Trao hết quyền cho ta. Không công khai, không giám sát, thành phố sẽ ổn định!"], question: "Cơ chế nào cần phục hồi?", answers: [a("Tham gia, công khai, giải trình và kiểm soát quyền lực", true, "Đúng. Các cơ chế giúp quyền lực phục vụ đúng mục đích."), a("Chỉ tổ chức nhiều cuộc bỏ phiếu", false, "Bỏ phiếu chưa đủ nếu thiếu thông tin và giám sát."), a("Dừng mọi quyết định", false, "Cần quy trình dân chủ và có trách nhiệm, không phải tê liệt.")] }
    ]
  },
  {
    id: "alliance", chapter: "Chương V", title: "Đồng Bằng Liên Minh", subtitle: "Sức mạnh của đồng tâm", image: "/assets/region-1-market.png", accent: "#69b887", glyph: "◎", pageName: "Nút Thắt Đồng Tâm",
    objective: "Kết nối Công Xưởng, Đồng Ruộng, Học Viện và Phố Dịch Vụ.",
    lesson: "Liên minh giai cấp, tầng lớp là yêu cầu khách quan và phải được xây dựng trên các mặt kinh tế, chính trị, văn hóa - xã hội.",
    encounters: [
      { name: "Bà Năm Lúa", role: "Đại diện nông dân", icon: "🌾", position: { x: 25, y: 59 }, lines: ["Không có lương thực, thành phố khó đứng vững.", "Nhưng đồng ruộng cũng cần máy móc, khoa học và thị trường."], question: "Vì sao các lực lượng cần liên minh?", answers: [a("Vì có lợi ích chung và phụ thuộc lẫn nhau", true, "Đúng. Liên minh có cơ sở khách quan."), a("Vì lợi ích của họ hoàn toàn giống nhau", false, "Liên minh không xóa bỏ khác biệt lợi ích."), a("Vì một lực lượng có thể ra lệnh", false, "Áp đặt không tạo liên minh bền vững.")] },
      { name: "Mai Lương", role: "Đại diện trí thức", icon: "🔬", position: { x: 50, y: 35 }, lines: ["Tri thức thành sức mạnh khi gắn với sản xuất và đời sống.", "Liên minh cần chính sách cụ thể trên nhiều lĩnh vực."], question: "Liên minh được xây dựng trên những mặt nào?", answers: [a("Kinh tế, chính trị, văn hóa - xã hội", true, "Chính xác. Không thể chỉ dừng ở hợp tác ngắn hạn."), a("Chỉ phân chia lợi ích kinh tế", false, "Đó là một mặt quan trọng nhưng chưa đầy đủ."), a("Chỉ tổ chức hoạt động văn hóa", false, "Văn hóa không thay thế cơ sở kinh tế và chính trị.")] },
      { name: "Người Giữ Đập", role: "Kẻ chia nguồn nước", icon: "💧", position: { x: 76, y: 58 }, lines: ["Mỗi vùng chỉ lo cho mình.", "Tranh giành sẽ giúp kẻ mạnh nhất chiến thắng!"], question: "Phân bổ nguồn nước thế nào?", answers: [a("Theo kế hoạch chung, nhu cầu cụ thể và nâng năng lực mọi khu vực", true, "Đúng. Bình đẳng không phải chia đều máy móc."), a("Chia tuyệt đối bằng nhau", false, "Công bằng cần xem xét nhu cầu và vai trò thực tế."), a("Ưu tiên hoàn toàn khu vực mạnh nhất", false, "Điều đó phá vỡ nền tảng liên minh.")] }
    ]
  },
  {
    id: "unity", chapter: "Chương VI", title: "Quần Đảo Sắc Màu", subtitle: "Thống nhất trong đa dạng", image: "/assets/region-5-palace.png", accent: "#e06d79", glyph: "✺", pageName: "Dải Lụa Đại Đoàn Kết",
    objective: "Nối lại ba cây cầu: bình đẳng, tôn trọng và đoàn kết.",
    lesson: "Giải quyết vấn đề dân tộc và tôn giáo phải tôn trọng nhu cầu chính đáng, củng cố đoàn kết và chống hành vi lợi dụng gây chia rẽ.",
    encounters: [
      { name: "Y Rin", role: "Giáo viên trên đảo", icon: "🪷", position: { x: 25, y: 60 }, lines: ["Ngôn ngữ và phong tục chúng tôi khác, nhưng quyền và cơ hội không thể thấp hơn.", "Đoàn kết không có nghĩa là mọi cộng đồng phải giống nhau."], question: "Nguyên tắc quan trọng trong quan hệ dân tộc?", answers: [a("Bình đẳng, tôn trọng quyền chính đáng và tăng cường đoàn kết", true, "Đúng. Thống nhất được xây trên cơ sở tôn trọng đa dạng."), a("Đồng nhất mọi văn hóa", false, "Xóa khác biệt không tạo đoàn kết thực chất."), a("Mỗi cộng đồng hoàn toàn tách biệt", false, "Cô lập làm suy yếu lợi ích chung.")] },
      { name: "Tịnh Tâm", role: "Người tổ chức cứu trợ", icon: "🤲", position: { x: 50, y: 34 }, lines: ["Niềm tin có thể nâng đỡ con người trong hoạn nạn.", "Nhưng có kẻ dùng tin đồn để biến khác biệt thành thù địch."], question: "Cần ứng xử thế nào với vấn đề tôn giáo?", answers: [a("Tôn trọng nhu cầu chính đáng và xử lý hành vi lợi dụng theo pháp luật", true, "Chính xác. Cần phân biệt niềm tin với lợi dụng niềm tin."), a("Xem mọi tôn giáo là chống đối", false, "Cách nhìn này xâm phạm nhu cầu chính đáng."), a("Bỏ qua mọi hành vi liên quan niềm tin", false, "Tôn trọng không có nghĩa là dung túng vi phạm.")] },
      { name: "Kẻ Buôn Tin Đồn", role: "Tay sai của Màn Sương", icon: "🌫️", position: { x: 76, y: 59 }, lines: ["Một lời đồn đủ cắt đứt mọi cây cầu.", "Khác biệt tất yếu dẫn đến xung đột!"], question: "Xử lý tin kích động sau thiên tai thế nào?", answers: [a("Xác minh, cứu trợ bình đẳng, phối hợp người uy tín và xử lý lợi dụng", true, "Đúng. Giải pháp xử lý cả thông tin và nguyên nhân xã hội."), a("Cấm mọi thảo luận về khác biệt", false, "Im lặng cưỡng ép không giải quyết định kiến."), a("Để mỗi nhóm tự bảo vệ mình", false, "Cách này làm đứt gãy đoàn kết.")] }
    ]
  },
  {
    id: "family", chapter: "Chương VII", title: "Ngôi Nhà Bình Minh", subtitle: "Từ mái ấm đến xã hội", image: "/assets/region-2-guild.png", accent: "#e89567", glyph: "⌂", pageName: "Mái Ấm Tương Lai",
    objective: "Giúp ba thế hệ xây dựng một mái nhà bình đẳng, tiến bộ và hạnh phúc.",
    lesson: "Gia đình là tế bào của xã hội, vừa chịu tác động của biến đổi xã hội vừa góp phần nuôi dưỡng con người và xây dựng xã hội mới.",
    encounters: [
      { name: "Bà Minh", role: "Người giữ nếp nhà", icon: "🫖", position: { x: 25, y: 59 }, lines: ["Ta muốn giữ những điều tốt đẹp của gia đình.", "Nhưng có lẽ không phải tập quán nào cũng còn phù hợp."], question: "Ứng xử thế nào với truyền thống gia đình?", answers: [a("Kế thừa giá trị tốt đẹp và thay đổi tập quán bất bình đẳng", true, "Đúng. Kế thừa luôn đi cùng chọn lọc và phát triển."), a("Giữ nguyên mọi tập quán", false, "Không phải yếu tố lâu đời nào cũng còn phù hợp."), a("Loại bỏ toàn bộ truyền thống", false, "Phủ định sạch trơn làm mất giá trị tích cực.")] },
      { name: "Gia đình Hòa", role: "Một mái nhà quá tải", icon: "👨‍👩‍👧", position: { x: 50, y: 35 }, lines: ["Cả hai vợ chồng đều đi làm, nhưng việc chăm sóc dồn lên một người.", "Sự im lặng đang biến mái ấm thành gánh nặng."], question: "Giải pháp phù hợp nhất?", answers: [a("Chia sẻ trách nhiệm, tôn trọng, đối thoại và bảo đảm bình đẳng", true, "Chính xác. Hôn nhân tiến bộ dựa trên tự nguyện và bình đẳng."), a("Giữ nguyên vì là việc riêng", false, "Gia đình chịu ảnh hưởng của điều kiện xã hội và quyền con người."), a("Ai thu nhập thấp hơn làm toàn bộ việc nhà", false, "Đóng góp gia đình không thể quy giản vào thu nhập.")] },
      { name: "Ông Trùm Màn Sương", role: "Kẻ gieo tư duy phiến diện", icon: "♠", position: { x: 76, y: 57 }, lines: ["Ta đã dùng Màn Sương để chia cắt mọi người và biến khác biệt thành đối đầu.", "Chọn đi: dân chủ hay kỷ cương, truyền thống hay tiến bộ! Ngươi không thể dung hòa chúng!"], question: "Phản biện cuối cùng của bạn?", answers: [a("Phân tích quan hệ cụ thể, không tuyệt đối hóa một phía", true, "Màn Sương tan vỡ. Bạn đã nối lý luận với lịch sử và thực tiễn."), a("Luôn chọn vế thứ nhất", false, "Đổi từ cực này sang cực khác vẫn là phiến diện."), a("Không cần hành động vì mọi lựa chọn như nhau", false, "Phức tạp đòi hỏi trách nhiệm, không phải buông xuôi.")] }
    ]
  }
];

const bonus = (name: string, icon: string, position: { x: number; y: number }, question: string, correct: string, wrong1: string, wrong2: string): Encounter => ({
  name, role: "Thử thách mở rộng", icon, position,
  lines: ["Trên bia đá có một tình huống chưa được giải đáp.", "Hãy vận dụng điều vừa học, đừng chỉ nhớ câu chữ."], question,
  answers: [a(correct, true, "Chính xác. Bạn đã vận dụng đúng luận điểm vào tình huống."), a(wrong1, false, "Phương án này mới nhìn một mặt của vấn đề."), a(wrong2, false, "Hãy xem lại điều kiện cụ thể và mối liên hệ giữa các yếu tố.")]
});

const extraChallenges: Record<string, Encounter[]> = {
  library: [],
  workers: [bonus("Bia Lao Động Số", "🧩", { x: 63, y: 72 }, "Lao động nền tảng số có thể thuộc giai cấp công nhân khi nào?", "Khi xét vị trí của họ trong quan hệ sản xuất, không chỉ tên nghề", "Chỉ khi họ làm việc trong nhà máy", "Bất cứ khi nào họ dùng máy tính")],
  transition: [
    bonus("Cột Mốc Cũ - Mới", "🧭", { x: 38, y: 72 }, "Trong thời kỳ quá độ, cái cũ và cái mới tồn tại thế nào?", "Đan xen, đấu tranh và chuyển hóa trong nhiều lĩnh vực", "Cái cũ biến mất ngay lập tức", "Hai phía tồn tại biệt lập, không tác động nhau"),
    bonus("Bản Đồ Việt Nam", "🗺️", { x: 63, y: 72 }, "Vận dụng con đường quá độ cần bắt đầu từ đâu?", "Điều kiện lịch sử cụ thể và thực tiễn của đất nước", "Một mô hình giống hệt từ bên ngoài", "Ý chí chủ quan không cần nguồn lực")
  ],
  democracy: [bonus("Hòm Thư Công Dân", "📮", { x: 62, y: 72 }, "Một quyết định đã lấy ý kiến nhưng không công khai kết quả còn thiếu gì?", "Minh bạch và trách nhiệm giải trình", "Thêm khẩu hiệu về dân chủ", "Giảm số người được tham gia")],
  alliance: [
    bonus("Kho Thóc Chung", "🌾", { x: 38, y: 72 }, "Bình đẳng lợi ích có đồng nghĩa chia đều máy móc?", "Không, cần xét nhu cầu, đóng góp và mục tiêu phát triển chung", "Có, mọi hoàn cảnh đều phải chia bằng nhau", "Không, nhóm mạnh nhất nên nhận tất cả"),
    bonus("Xưởng Máy Nông Nghiệp", "🚜", { x: 63, y: 72 }, "Vai trò của trí thức trong liên minh thể hiện rõ ở đâu?", "Đưa tri thức và khoa học gắn với sản xuất, đời sống", "Thay thế hoàn toàn công nhân và nông dân", "Chỉ đưa ra lý thuyết, không cần thực tiễn")
  ],
  unity: [bonus("Trạm Tin Cộng Đồng", "📻", { x: 62, y: 72 }, "Đoàn kết trong đa dạng đòi hỏi điều gì?", "Bình đẳng, tôn trọng khác biệt và lợi ích chung", "Mọi cộng đồng phải giống nhau", "Mỗi cộng đồng tự cô lập")],
  family: [
    bonus("Bếp Nhà Bình Đẳng", "🍲", { x: 38, y: 72 }, "Việc nhà và chăm sóc nên được phân chia thế nào?", "Theo tinh thần chia sẻ, bình đẳng và điều kiện thực tế", "Mặc định giao hết cho phụ nữ", "Chỉ dựa vào mức thu nhập"),
    bonus("Góc Học Tập", "🎓", { x: 63, y: 72 }, "Gia đình liên hệ với xã hội ra sao?", "Vừa chịu tác động xã hội, vừa nuôi dưỡng con người cho xã hội", "Hoàn toàn là chuyện riêng, không liên hệ xã hội", "Chỉ có chức năng tiêu dùng")
  ]
};

export const regions: Region[] = baseRegions.map((region) => ({ ...region, encounters: [...region.encounters, ...(extraChallenges[region.id] ?? [])] }));
export const journal = regions.map((region, index) => ({ id: region.id, number: index + 1, title: region.title, subtitle: region.subtitle, body: region.lesson }));

/* Sri Lanka Budget 2027 — dataset
 * Amounts are in Rs. million unless the field name says otherwise.
 * Sources: Appropriation Bill 2027 (via Sunday Times / The Morning, EY analysis),
 * Budget Speech live coverage (Ada Derana, Newswire, Newsfirst) — 12 Nov 2026.
 */
window.BUDGET = {
  meta: {
    speechDate: "2026-11-12",
    voteDate: "2026-11-20",
    sources: [
      { name: "Ministry of Finance — Budget Estimates 2027 (official, primary source)", url: "https://www.treasury.gov.lk" },
      { name: "Newswire — Budget 2027 live updates", url: "https://www.newswire.lk/2026/11/12/budget-2027-live-updates/" },
      { name: "Newsfirst — Budget Speech 2027 key highlights", url: "https://english.newsfirst.lk/2026/11/11/live-blog-budget-speech-2027-key-highlights" },
      { name: "Ada Derana — Budget 2027 live", url: "https://adaderana.lk/news/251513" },
      { name: "Sunday Times — Appropriation Bill 2027", url: "https://www.sundaytimes.lk/260927/news/appropriation-bill-2027-npp-estimates-expenditure-at-over-rs-4992-billion-658465.html" },
      { name: "The Morning — EY analysis of the Bill", url: "https://www.themorning.lk/articles/ZTA97tYbXJwU6ipek4LG" }
    ]
  },

  /* ===== Official figures: Budget Estimates 2027 (Treasury), Rs. million =====
   * 2025 = provisional actual, 2026 = revised estimate, 2027 = budget estimate, 2028–29 = projections */
  totals: {
    total:       { y2025: 7697949, y2026: 9480000, y2027: 9920003 },
    recurrent:   { y2025: 5263008, y2026: 5870354, y2027: 5963472 },
    capital:     { y2025: 1015825, y2026: 1731906, y2027: 1750000 },
    interest:    { y2025: 2500674, y2026: 2617260, y2027: 2643472 },
    amortization:{ y2025: 1419116, y2026: 1877740, y2027: 2206531 },
    revenue:     { y2025: 5542949, y2026: 6035339, y2027: 6251201 },
    tax:         { y2025: 5049192, y2026: 5478000, y2027: 5687000 },
    appropriated: 4992773,   // voted through the Appropriation Bill
    specialLaw:   4927230,   // paid under special laws (mainly debt service)
    borrowingLimit: 3800000
  },

  /* Every rupee of the Rs 9.92 tn, by economic category */
  categories: [
    { id: "interest", value: 2643472, name: { en: "Interest on debt", si: "ණය පොලිය", ta: "கடன் வட்டி" } },
    { id: "amort",    value: 2206531, name: { en: "Debt repayments", si: "ණය ආපසු ගෙවීම්", ta: "கடன் மீளச்செலுத்தல்" } },
    { id: "capital",  value: 1750000, name: { en: "Capital investment", si: "ප්‍රාග්ධන ආයෝජන", ta: "மூலதன முதலீடு" } },
    { id: "salaries", value: 946809,  name: { en: "Salaries & wages", si: "වැටුප් හා වේතන", ta: "சம்பளங்கள் மற்றும் கூலிகள்" } },
    { id: "pensions", value: 576468,  name: { en: "Pensions", si: "විශ්‍රාම වැටුප්", ta: "ஓய்வூதியங்கள்" } },
    { id: "pcgrants", value: 545050,  name: { en: "Grants to provincial councils", si: "පළාත් සභාවලට ප්‍රදාන", ta: "மாகாண சபைகளுக்கான மானியங்கள்" } },
    { id: "welfare",  value: 396509,  name: { en: "Welfare programmes", si: "සුබසාධන වැඩසටහන්", ta: "நலன்புரித் திட்டங்கள்" } },
    { id: "otherrec", value: 855164,  other: true, name: { en: "Other running costs", si: "වෙනත් මෙහෙයුම් වියදම්", ta: "ஏனைய இயக்கச் செலவுகள்" } }
  ],

  /* Where the money comes from, 2027 */
  revenue: [
    { id: "vat",      value: 2053000, name: { en: "VAT", si: "එකතු කළ අගය මත බද්ද (VAT)", ta: "பெறுமதி சேர் வரி (VAT)" } },
    { id: "income",   value: 1341000, name: { en: "Income taxes", si: "ආදායම් බදු", ta: "வருமான வரிகள்" } },
    { id: "excise",   value: 1066000, name: { en: "Excise (liquor, vehicles, fuel, cigarettes)", si: "සුරාබදු (මත්පැන්, වාහන, ඉන්ධන, සිගරට්)", ta: "கலால் (மதுபானம், வாகனம், எரிபொருள், சிகரெட்)" } },
    { id: "trade",    value: 759357,  name: { en: "Import duties & levies", si: "ආනයන තීරු බදු හා අය කිරීම්", ta: "இறக்குமதி தீர்வைகள் மற்றும் அறவீடுகள்" } },
    { id: "nontax",   value: 534201,  name: { en: "Non-tax revenue (fees, profits, rent)", si: "බදු නොවන ආදායම (ගාස්තු, ලාභ, කුලී)", ta: "வரியல்லா வருமானம் (கட்டணம், இலாபம், வாடகை)" } },
    { id: "sscl",     value: 394000,  name: { en: "Social Security Contribution Levy", si: "සමාජ ආරක්ෂණ දායක බද්ද", ta: "சமூகப் பாதுகாப்பு பங்களிப்பு அறவீடு" } },
    { id: "othertax", value: 73643,   name: { en: "Other taxes", si: "වෙනත් බදු", ta: "ஏனைய வரிகள்" } },
    { id: "grants",   value: 30000,   name: { en: "Grants", si: "ප්‍රදාන", ta: "நன்கொடைகள்" } }
  ],

  /* Revenue vs spending (excl. debt repayments), Rs. million */
  trend: [
    { year: "2025", revenue: 5542949, spend: 6278833 },
    { year: "2026", revenue: 6035339, spend: 7602260 },
    { year: "2027", revenue: 6251201, spend: 7713472, current: true },
    { year: "2028", revenue: 6782793, spend: 8497791, proj: true },
    { year: "2029", revenue: 7362965, spend: 9131791, proj: true }
  ],

  /* Debt service in rupees, Rs. million */
  debtRs: [
    { year: "2025", interest: 2500674, amort: 1419116 },
    { year: "2026", interest: 2617260, amort: 1877740 },
    { year: "2027", interest: 2643472, amort: 2206531, current: true },
    { year: "2028", interest: 2952791, amort: 2831531, proj: true },
    { year: "2029", interest: 3092791, amort: 2408531, proj: true }
  ],

  /* All spending heads, recurrent + capital [2025, 2026, 2027] (Rs. million).
   * Finance excludes interest & debt repayments (shown separately). */
  ministries: [
    { id: "finance",   rec: [333402, 361718, 330500], cap: [161016, 216087, 521350],
      name:  { en: "Finance, Planning & Economic Development (excl. debt service)", si: "මුදල්, ක්‍රමසම්පාදන හා ආර්ථික සංවර්ධන (ණය සේවාකරණය හැර)", ta: "நிதி, திட்டமிடல் மற்றும் பொருளாதார அபிவிருத்தி (கடன் சேவை தவிர்ந்த)" },
      short: { en: "Finance", si: "මුදල්", ta: "நிதி" } },
    { id: "pubadmin",  rec: [554741, 634990, 690000], cap: [23247, 35215, 43000],
      name:  { en: "Public Administration, Provincial Councils & Local Govt", si: "රාජ්‍ය පරිපාලන, පළාත් සභා හා පළාත් පාලන", ta: "பொது நிர்வாகம், மாகாண சபைகள் மற்றும் உள்ளூராட்சி" },
      short: { en: "Public Admin", si: "රාජ්‍ය පරිපාලන", ta: "பொது நிர்வாகம்" } },
    { id: "pcs",       rec: [470267, 533645, 574950], cap: [64567, 183761, 85000],
      name:  { en: "Provincial Councils (9)", si: "පළාත් සභා (9)", ta: "மாகாண சபைகள் (9)" },
      short: { en: "Provinces", si: "පළාත් සභා", ta: "மாகாணங்கள்" } },
    { id: "health",    rec: [376433, 449657, 470500], cap: [52306, 107082, 120000],
      name:  { en: "Health & Mass Media", si: "සෞඛ්‍ය හා ජනමාධ්‍ය", ta: "சுகாதாரம் மற்றும் வெகுஜன ஊடகம்" },
      short: { en: "Health", si: "සෞඛ්‍ය", ta: "சுகாதாரம்" } },
    { id: "transport", rec: [47950, 60297, 68000], cap: [390289, 498210, 432000],
      name:  { en: "Transport, Highways & Urban Development", si: "ප්‍රවාහන, මහාමාර්ග හා නාගරික සංවර්ධන", ta: "போக்குவரத்து, நெடுஞ்சாலைகள் மற்றும் நகர அபிவிருத்தி" },
      short: { en: "Transport", si: "ප්‍රවාහන", ta: "போக்குவரத்து" } },
    { id: "defence",   rec: [360034, 383845, 388000], cap: [56372, 215919, 70000],
      name:  { en: "Defence", si: "ආරක්ෂක", ta: "பாதுகாப்பு" },
      short: { en: "Defence", si: "ආරක්ෂක", ta: "பாதுகாப்பு" } },
    { id: "education", rec: [190553, 233853, 250000], cap: [47024, 72446, 78000],
      name:  { en: "Education, Higher & Vocational Education", si: "අධ්‍යාපන, උසස් අධ්‍යාපන හා වෘත්තීය අධ්‍යාපන", ta: "கல்வி, உயர்கல்வி மற்றும் தொழிற்கல்வி" },
      short: { en: "Education", si: "අධ්‍යාපන", ta: "கல்வி" } },
    { id: "security",  rec: [165676, 200183, 210000], cap: [11362, 20776, 20500],
      name:  { en: "Public Security & Parliamentary Affairs", si: "මහජන ආරක්ෂක හා පාර්ලිමේන්තු කටයුතු", ta: "பொது பாதுகாப்பு மற்றும் பாராளுமன்ற விவகாரங்கள்" },
      short: { en: "Public Security", si: "මහජන ආරක්ෂාව", ta: "பொது பாதுகாப்பு" } },
    { id: "agri",      rec: [93796, 94111, 99000], cap: [89356, 153715, 119000],
      name:  { en: "Agriculture, Livestock, Land & Irrigation", si: "කෘෂිකර්ම, පශු සම්පත්, ඉඩම් හා වාරිමාර්ග", ta: "விவசாயம், கால்நடை, காணி மற்றும் நீர்ப்பாசனம்" },
      short: { en: "Agriculture", si: "කෘෂිකර්ම", ta: "விவசாயம்" } },
    { id: "housing",   rec: [2635, 2421, 2800], cap: [64798, 70862, 79500],
      name:  { en: "Housing, Construction & Water Supply", si: "නිවාස, ඉදිකිරීම් හා ජල සම්පාදන", ta: "வீடமைப்பு, நிர்மாணம் மற்றும் நீர் வழங்கல்" } },
    { id: "rural",     rec: [24810, 27989, 43800], cap: [3192, 35485, 36000],
      name:  { en: "Rural Development, Social Security & Community Empowerment", si: "ග්‍රාමීය සංවර්ධන, සමාජ ආරක්ෂණ හා ප්‍රජා සවිබල ගැන්වීම්", ta: "கிராமிய அபிவிருத்தி, சமூகப் பாதுகாப்பு மற்றும் சமுதாய வலுவூட்டல்" } },
    { id: "justice",   rec: [34281, 42380, 48000], cap: [7688, 17312, 18000],
      name:  { en: "Justice & National Integration", si: "අධිකරණ හා ජාතික ඒකාබද්ධතා", ta: "நீதி மற்றும் தேசிய ஒருமைப்பாடு" } },
    { id: "ssu",       rec: [23479, 23129, 28000], cap: [4008, 10807, 12000],
      name:  { en: "President, Parliament & independent commissions", si: "ජනාධිපති, පාර්ලිමේන්තුව හා ස්වාධීන කොමිෂන් සභා", ta: "ஜனாதிபதி, பாராளுமன்றம் மற்றும் சுயாதீன ஆணைக்குழுக்கள்" } },
    { id: "energy",    rec: [858, 89759, 1200], cap: [6988, 21054, 29000],
      name:  { en: "Energy", si: "බලශක්ති", ta: "வலுசக்தி" } },
    { id: "digital",   rec: [4423, 6637, 6000], cap: [5773, 8900, 20000],
      name:  { en: "Digital Economy", si: "ඩිජිටල් ආර්ථික", ta: "டிஜிட்டல் பொருளாதாரம்" } },
    { id: "plantation",rec: [5137, 15550, 13000], cap: [7476, 12310, 13000],
      name:  { en: "Plantation & Community Infrastructure", si: "වැවිලි හා ප්‍රජා යටිතල පහසුකම්", ta: "பெருந்தோட்ட மற்றும் சமூக உட்கட்டமைப்பு" } },
    { id: "foreign",   rec: [16597, 21247, 22000], cap: [2190, 2170, 2700],
      name:  { en: "Foreign Affairs, Foreign Employment & Tourism", si: "විදේශ කටයුතු, විදේශ රැකියා හා සංචාරක", ta: "வெளிவிவகாரம், வெளிநாட்டு வேலைவாய்ப்பு மற்றும் சுற்றுலா" } },
    { id: "environment", rec: [11296, 14453, 15200], cap: [2754, 5325, 6000],
      name:  { en: "Environment", si: "පරිසර", ta: "சுற்றாடல்" } },
    { id: "women",     rec: [14532, 15855, 16750], cap: [547, 2868, 3250],
      name:  { en: "Women & Child Affairs", si: "කාන්තා හා ළමා කටයුතු", ta: "மகளிர் மற்றும் சிறுவர் அலுவல்கள்" } },
    { id: "buddha",    rec: [7931, 9615, 11000], cap: [1775, 4794, 7000],
      name:  { en: "Buddhasasana, Religious & Cultural Affairs", si: "බුද්ධශාසන, ආගමික හා සංස්කෘතික කටයුතු", ta: "புத்தசாசன, சமய மற்றும் கலாசார அலுவல்கள்" } },
    { id: "youth",     rec: [5284, 7500, 8500], cap: [2790, 6800, 8500],
      name:  { en: "Youth Affairs & Sports", si: "යෞවන කටයුතු හා ක්‍රීඩා", ta: "இளைஞர் விவகாரம் மற்றும் விளையாட்டு" } },
    { id: "industry",  rec: [4624, 5501, 6300], cap: [5014, 8712, 8800],
      name:  { en: "Industry & Entrepreneurship Development", si: "කර්මාන්ත හා ව්‍යවසායකත්ව සංවර්ධන", ta: "கைத்தொழில் மற்றும் தொழில்முனைவோர் அபிவிருத்தி" } },
    { id: "fisheries", rec: [4828, 7543, 4300], cap: [2889, 9355, 7400],
      name:  { en: "Fisheries, Aquatic & Ocean Resources", si: "ධීවර, ජලජ හා සාගර සම්පත්", ta: "கடற்றொழில், நீரியல் மற்றும் சமுத்திர வளங்கள்" } },
    { id: "science",   rec: [2594, 3204, 3600], cap: [1779, 3976, 4000],
      name:  { en: "Science & Technology", si: "විද්‍යා හා තාක්ෂණ", ta: "விஞ்ஞானம் மற்றும் தொழில்நுட்பம்" } },
    { id: "labour",    rec: [4189, 5200, 5500], cap: [496, 1200, 2000],
      name:  { en: "Labour", si: "කම්කරු", ta: "தொழில்" } },
    { id: "ports",     rec: [147, 610, 700], cap: [3, 4518, 3000],
      name:  { en: "Ports & Civil Aviation", si: "වරාය හා සිවිල් ගුවන් සේවා", ta: "துறைமுகங்கள் மற்றும் சிவில் விமான சேவைகள்" } },
    { id: "trade",     rec: [1837, 2203, 2400], cap: [124, 2251, 1000],
      name:  { en: "Trade, Commerce, Food Security & Co-operatives", si: "වෙළඳ, වාණිජ, ආහාර සුරක්ෂිතතා හා සමුපකාර", ta: "வர்த்தகம், வாணிபம், உணவுப் பாதுகாப்பு மற்றும் கூட்டுறவு" } }
  ],

  /* Provincial councils 2027, recurrent + capital (Rs. million) */
  provinces: [
    { id: "w",  rec: 91020, cap: 7775,  name: { en: "Western", si: "බස්නාහිර", ta: "மேல்" } },
    { id: "c",  rec: 72830, cap: 10025, name: { en: "Central", si: "මධ්‍යම", ta: "மத்திய" } },
    { id: "s",  rec: 72850, cap: 9100,  name: { en: "Southern", si: "දකුණු", ta: "தென்" } },
    { id: "nw", rec: 70330, cap: 9075,  name: { en: "North Western", si: "වයඹ", ta: "வடமேல்" } },
    { id: "e",  rec: 65120, cap: 10735, name: { en: "Eastern", si: "නැගෙනහිර", ta: "கிழக்கு" } },
    { id: "sb", rec: 58435, cap: 9650,  name: { en: "Sabaragamuwa", si: "සබරගමුව", ta: "சப்ரகமுவ" } },
    { id: "n",  rec: 52535, cap: 9400,  name: { en: "Northern", si: "උතුරු", ta: "வட" } },
    { id: "u",  rec: 49730, cap: 9850,  name: { en: "Uva", si: "ඌව", ta: "ஊவா" } },
    { id: "nc", rec: 42100, cap: 9390,  name: { en: "North Central", si: "උතුරු මැද", ta: "வடமத்திய" } }
  ],

  /* Biggest single capital projects named in the speech (Rs. million) */
  megaProjects: [
    { id: "railelec",   amount: 80000,
      name:  { en: "Railway electrification (phase 1)", si: "දුම්රිය විදුලිකරණය (පළමු අදියර)", ta: "ரயில்வே மின்மயமாக்கல் (முதல் கட்டம்)" },
      short: { en: "Rail electrification", si: "දුම්රිය විදුලිකරණය", ta: "ரயில் மின்மயமாக்கல்" } },
    { id: "kadawatha",  amount: 53450,
      name:  { en: "Central Expressway: Kadawatha–Mirigama", si: "මධ්‍යම අධිවේගය: කඩවත–මීරිගම", ta: "மத்திய அதிவேக வீதி: கடவத்தை–மீரிகம" },
      short: { en: "Kadawatha–Mirigama", si: "කඩවත–මීරිගම", ta: "கடவத்தை–மீரிகம" } },
    { id: "kurunegala", amount: 30000,
      name:  { en: "Kurunegala–Galewela Expressway", si: "කුරුණෑගල–ගලෙවෙල අධිවේගය", ta: "குருநாகல்–கலேவெல அதிவேக வீதி" },
      short: { en: "Kurunegala–Galewela", si: "කුරුණෑගල–ගලෙවෙල", ta: "குருநாகல்–கலேவெல" } },
    { id: "ruwanpura",  amount: 27000,
      name:  { en: "Ruwanpura Expressway (2027 tranche)", si: "රුවන්පුර අධිවේගය (2027 කොටස)", ta: "ருவன்புர அதிவேக வீதி (2027 பகுதி)" },
      short: { en: "Ruwanpura Expwy", si: "රුවන්පුර", ta: "ருவன்புர" } },
    { id: "grid",       amount: 26500,
      name:  { en: "Power transmission upgrade", si: "විදුලි සම්ප්‍රේෂණ පද්ධතිය නවීකරණය", ta: "மின் பரிமாற்ற வலையமைப்பு மேம்பாடு" },
      short: { en: "Power grid", si: "විදුලි ජාලය", ta: "மின் வலையமைப்பு" } },
    { id: "rambukkana", amount: 23050,
      name:  { en: "Central Expressway: Rambukkana–Galagedara", si: "මධ්‍යම අධිවේගය: රඹුක්කන–ගලගෙදර", ta: "மத்திய அதிவேக வீதி: ரம்புக்கனை–கலகெதர" },
      short: { en: "Rambukkana–Galagedara", si: "රඹුක්කන–ගලගෙදර", ta: "ரம்புக்கனை–கலகெதர" } },
    { id: "jetfuel",    amount: 22340,
      name:  { en: "Jet fuel pipeline & 92,000 t storage", si: "ජෙට් ඉන්ධන නළ මාර්ගය හා ටොන් 92,000 ගබඩාව", ta: "விமான எரிபொருள் குழாய் மற்றும் 92,000 தொன் சேமிப்பு" },
      short: { en: "Jet fuel pipeline", si: "ජෙට් ඉන්ධන නළය", ta: "விமான எரிபொருள் குழாய்" } },
    { id: "mahaweli",   amount: 19500,
      name:  { en: "Mahaweli water security", si: "මහවැලි ජල සුරක්ෂිතතාව", ta: "மகாவலி நீர் பாதுகாப்பு" },
      short: { en: "Mahaweli water", si: "මහවැලි ජලය", ta: "மகாவலி நீர்" } }
  ],

  /* People-focused programmes (Rs. million) */
  people: [
    { id: "socprot",  amount: 230000,
      name:  { en: "Social protection allowances (incl. Aswesuma)", si: "සමාජ ආරක්ෂණ දීමනා (අස්වැසුම ඇතුළුව)", ta: "சமூகப் பாதுகாப்பு கொடுப்பனவுகள் (அஸ்வெசும உட்பட)" },
      short: { en: "Social protection", si: "සමාජ ආරක්ෂණය", ta: "சமூகப் பாதுகாப்பு" } },
    { id: "district", amount: 50000,
      name:  { en: "District Development Programme (Rs 2 bn per district)", si: "දිස්ත්‍රික් සංවර්ධන වැඩසටහන (දිස්ත්‍රික්කයකට රු. බිලියන 2)", ta: "மாவட்ட அபிவிருத்தித் திட்டம் (மாவட்டத்திற்கு ரூ. 2 பில்லியன்)" },
      short: { en: "District development", si: "දිස්ත්‍රික් සංවර්ධනය", ta: "மாவட்ட அபிவிருத்தி" } },
    { id: "schools",  amount: 35000,
      name:  { en: "School & teacher-college infrastructure", si: "පාසල් හා ගුරු විද්‍යාල යටිතල පහසුකම්", ta: "பாடசாலை மற்றும் ஆசிரியர் கல்லூரி உட்கட்டமைப்பு" },
      short: { en: "School infrastructure", si: "පාසල් යටිතල", ta: "பாடசாலை உட்கட்டமைப்பு" } },
    { id: "praja",    amount: 25000,
      name:  { en: "Praja Shakthi rural development", si: "ප්‍රජා ශක්ති ග්‍රාමීය සංවර්ධනය", ta: "பிரஜா சக்தி கிராமிய அபிவிருத்தி" },
      short: { en: "Praja Shakthi", si: "ප්‍රජා ශක්ති", ta: "பிரஜா சக்தி" } },
    { id: "biomed",   amount: 15500,
      name:  { en: "High-end biomedical equipment for hospitals", si: "රෝහල් සඳහා උසස් ජෛව වෛද්‍ය උපකරණ", ta: "மருத்துவமனைகளுக்கான உயர்தர உயிர்மருத்துவ உபகரணங்கள்" },
      short: { en: "Hospital equipment", si: "රෝහල් උපකරණ", ta: "மருத்துவ உபகரணங்கள்" } },
    { id: "housing",  amount: 15000,
      name:  { en: "\"A Place of One's Own\" — 10,000 houses", si: "\"තමන්ගේම තැනක්\" — නිවාස 10,000", ta: "\"சொந்த இடம்\" — 10,000 வீடுகள்" },
      short: { en: "Housing", si: "නිවාස", ta: "வீடமைப்பு" } },
    { id: "women",    amount: 12500,
      name:  { en: "Loans for women-headed families (3%)", si: "කාන්තා ප්‍රධාන පවුල් සඳහා ණය (3%)", ta: "பெண் தலைமைக் குடும்பங்களுக்கான கடன்கள் (3%)" },
      short: { en: "Women-led families", si: "කාන්තා ප්‍රධාන පවුල්", ta: "பெண் தலைமைக் குடும்பங்கள்" } },
    { id: "vocational", amount: 11000,
      name:  { en: "Vocational education capital investment", si: "වෘත්තීය අධ්‍යාපන ප්‍රාග්ධන ආයෝජනය", ta: "தொழிற்கல்வி மூலதன முதலீடு" },
      short: { en: "Vocational training", si: "වෘත්තීය පුහුණුව", ta: "தொழிற் பயிற்சி" } }
  ],

  /* Proposal explorer (Rs. million). cat keys map to i18n "cat_*" */
  proposals: [
    // Infrastructure & transport
    { cat: "infra", amount: 22000, n: { en: "Road widening & development", si: "මාර්ග පුළුල් කිරීම හා සංවර්ධනය", ta: "வீதி அகலமாக்கல் மற்றும் அபிவிருத்தி" } },
    { cat: "infra", amount: 15000, n: { en: "BIA terminal expansion", si: "කටුනායක ගුවන්තොටුපළ පර්යන්ත පුළුල් කිරීම", ta: "கட்டுநாயக்க விமான நிலைய முனைய விரிவாக்கம்" } },
    { cat: "infra", amount: 10630, n: { en: "Five rural bridges (incl. Kokkilai)", si: "ග්‍රාමීය පාලම් පහක් (කොක්කිලායි ඇතුළුව)", ta: "ஐந்து கிராமிய பாலங்கள் (கொக்கிளாய் உட்பட)" } },
    { cat: "infra", amount: 6000, n: { en: "Ratmalana runway rehabilitation", si: "රත්මලාන ධාවන පථය ප්‍රතිසංස්කරණය", ta: "இரத்மலானை ஓடுபாதை புனரமைப்பு" } },
    { cat: "infra", amount: 5000, n: { en: "Five new trains", si: "නව දුම්රිය පහක්", ta: "ஐந்து புதிய ரயில்கள்" } },
    { cat: "infra", amount: 4500, n: { en: "Electric bus depots & charging", si: "විදුලි බස් ඩිපෝ හා ආරෝපණ", ta: "மின்சார பேருந்து டிப்போக்கள் மற்றும் மின்னேற்றம்" } },
    { cat: "infra", amount: 4500, n: { en: "Pothuhera–Rambukkana expressway", si: "පොතුහැර–රඹුක්කන අධිවේගය", ta: "பொத்துஹெர–ரம்புக்கனை அதிவேக வீதி" } },
    { cat: "infra", amount: 3200, n: { en: "Colombo canal & drainage restoration", si: "කොළඹ ඇළ මාර්ග හා ජලාපවහන ප්‍රතිසංස්කරණය", ta: "கொழும்பு கால்வாய் மற்றும் வடிகால் புனரமைப்பு" } },
    { cat: "infra", amount: 2000, n: { en: "Railway station repairs", si: "දුම්රිය ස්ථාන අලුත්වැඩියාව", ta: "ரயில் நிலைய பழுதுபார்ப்பு" } },
    { cat: "infra", amount: 1500, n: { en: "Digital road-safety demerit system", si: "ඩිජිටල් මාර්ග ආරක්ෂණ දඬුවම් ලකුණු පද්ධතිය", ta: "டிஜிட்டல் வீதிப் பாதுகாப்பு குறைப்புப் புள்ளி முறை" } },
    // Energy
    { cat: "energy", amount: 16300, n: { en: "Colombo Port–Kolonnawa fuel pipeline", si: "කොළඹ වරාය–කොලොන්නාව ඉන්ධන නළය", ta: "கொழும்பு துறைமுகம்–கொலன்னாவ எரிபொருள் குழாய்" } },
    { cat: "energy", amount: 3500, n: { en: "Rooftop solar battery subsidy (Rs 25,000/kW)", si: "වහල සූර්ය බැටරි සහනාධාරය (kW එකකට රු. 25,000)", ta: "கூரை சூரிய மின்கல மானியம் (kW ஒன்றுக்கு ரூ. 25,000)" } },
    // Education
    { cat: "education", amount: 2050, n: { en: "University of Vavuniya staff housing", si: "වවුනියාව විශ්වවිද්‍යාල කාර්ය මණ්ඩල නිවාස", ta: "வவுனியா பல்கலைக்கழக ஊழியர் வீடமைப்பு" } },
    { cat: "education", amount: 750, n: { en: "Repairs to cyclone-hit universities", si: "සුළි කුණාටුවෙන් හානි වූ විශ්වවිද්‍යාල අලුත්වැඩියාව", ta: "சூறாவளியால் பாதிக்கப்பட்ட பல்கலைக்கழக பழுதுபார்ப்பு" } },
    { cat: "education", amount: 100, n: { en: "Free spectacles for schoolchildren", si: "පාසල් සිසුන්ට නොමිලේ ඇස් කණ්ණාඩි", ta: "பாடசாலை மாணவர்களுக்கு இலவச மூக்குக் கண்ணாடி" } },
    // Health
    { cat: "health", amount: 3000, n: { en: "Replace ageing ambulances", si: "පැරණි ගිලන් රථ ප්‍රතිස්ථාපනය", ta: "பழைய அம்புலன்ஸ்களை மாற்றுதல்" } },
    { cat: "health", amount: 1725, n: { en: "100 new ambulances (Indian assistance)", si: "නව ගිලන් රථ 100 (ඉන්දියානු ආධාර)", ta: "100 புதிய அம்புலன்ஸ்கள் (இந்திய உதவி)" } },
    { cat: "health", amount: 1245, n: { en: "New hospital projects", si: "නව රෝහල් ව්‍යාපෘති", ta: "புதிய மருத்துவமனைத் திட்டங்கள்" } },
    { cat: "health", amount: 400, n: { en: "Wolbachia dengue control", si: "වොල්බැකියා ඩෙංගු පාලනය", ta: "வொல்பாக்கியா டெங்கு கட்டுப்பாடு" } },
    { cat: "health", amount: 250, n: { en: "Robotic surgery training centre", si: "රොබෝ ශල්‍යකර්ම පුහුණු මධ්‍යස්ථානය", ta: "ரோபோ அறுவை சிகிச்சை பயிற்சி மையம்" } },
    // Social
    { cat: "social", amount: 4500, n: { en: "Family empowerment programme", si: "පවුල් සවිබල ගැන්වීමේ වැඩසටහන", ta: "குடும்ப வலுவூட்டல் திட்டம்" } },
    { cat: "social", amount: 4000, n: { en: "Resettling ~13,000 displaced families (N & E)", si: "අවතැන් පවුල් 13,000ක් පමණ නැවත පදිංචි කිරීම (උතුර හා නැගෙනහිර)", ta: "இடம்பெயர்ந்த ~13,000 குடும்பங்களின் மீள்குடியேற்றம் (வடக்கு, கிழக்கு)" } },
    { cat: "social", amount: 2250, n: { en: "Decentralised budget (Rs 10 mn per MP)", si: "විමධ්‍යගත අයවැය (මන්ත්‍රීවරයෙකුට රු. මිලියන 10)", ta: "பரவலாக்கப்பட்ட நிதி (உறுப்பினருக்கு ரூ. 10 மில்லியன்)" } },
    { cat: "social", amount: 1000, n: { en: "Accessibility in government buildings", si: "රාජ්‍ය ආයතනවල ප්‍රවේශ පහසුකම්", ta: "அரச நிறுவனங்களில் அணுகல் வசதிகள்" } },
    // Agriculture & fisheries
    { cat: "agri", amount: 13000, n: { en: "Plantation sector", si: "වැවිලි අංශය", ta: "பெருந்தோட்டத் துறை" } },
    { cat: "agri", amount: 7500, n: { en: "Lower Malwathu Oya project", si: "පහළ මල්වතු ඔය ව්‍යාපෘතිය", ta: "கீழ் மல்வத்து ஓயா திட்டம்" } },
    { cat: "agri", amount: 5000, n: { en: "Small tea-holder fertiliser subsidy", si: "කුඩා තේ වතු හිමියන්ට පොහොර සහනාධාරය", ta: "சிறு தேயிலை உரிமையாளர் உர மானியம்" } },
    { cat: "agri", amount: 5000, n: { en: "Northern fisheries infrastructure", si: "උතුරු ධීවර යටිතල පහසුකම්", ta: "வடக்கு மீன்பிடி உட்கட்டமைப்பு" } },
    { cat: "agri", amount: 5000, n: { en: "Irrigation incl. Wayamba Canal", si: "වයඹ ඇළ ඇතුළු වාරිමාර්ග", ta: "வயம்ப கால்வாய் உட்பட நீர்ப்பாசனம்" } },
    { cat: "agri", amount: 3000, n: { en: "Complete Milco Badalgama factory", si: "මිල්කෝ බඩල්ගම කර්මාන්තශාලාව නිම කිරීම", ta: "மில்கோ படல்கம தொழிற்சாலை நிறைவு" } },
    { cat: "agri", amount: 2500, n: { en: "Coconut rehabilitation", si: "පොල් වගා ප්‍රතිසංස්කරණය", ta: "தென்னை புனர்வாழ்வு" } },
    // Security & disaster
    { cat: "security", amount: 9500, n: { en: "Sri Lanka Police modernisation", si: "ශ්‍රී ලංකා පොලිසිය නවීකරණය", ta: "இலங்கை பொலிஸ் நவீனமயமாக்கல்" } },
    { cat: "security", amount: 6200, n: { en: "Immigration & emigration", si: "ආගමන හා විගමන", ta: "குடிவரவு மற்றும் குடியகல்வு" } },
    { cat: "security", amount: 5000, n: { en: "El Niño preparedness", si: "එල් නිනෝ සූදානම", ta: "எல் நினோ முன்னாயத்தம்" } },
    { cat: "security", amount: 1000, n: { en: "Disaster safe centres", si: "ආපදා ආරක්ෂිත මධ්‍යස්ථාන", ta: "அனர்த்த பாதுகாப்பு மையங்கள்" } },
    { cat: "security", amount: 500, n: { en: "Coastal early-warning towers (120)", si: "වෙරළ පූර්ව අනතුරු ඇඟවීමේ කුළුණු (120)", ta: "கரையோர முன்னெச்சரிக்கை கோபுரங்கள் (120)" } },
    // Digital & economy
    { cat: "digital", amount: 28500, n: { en: "Digital transformation", si: "ඩිජිටල් පරිවර්තනය", ta: "டிஜிட்டல் மாற்றம்" } },
    { cat: "digital", amount: 23800, n: { en: "Research & development", si: "පර්යේෂණ හා සංවර්ධන", ta: "ஆராய்ச்சி மற்றும் அபிவிருத்தி" } },
    { cat: "digital", amount: 10000, n: { en: "Digital startups fund", si: "ඩිජිටල් නවෝත්පාදන ව්‍යාපාර අරමුදල", ta: "டிஜிட்டல் புத்தாக்க நிறுவன நிதியம்" } },
    { cat: "digital", amount: 7600, n: { en: "Science & technology coordination", si: "විද්‍යා හා තාක්ෂණ සම්බන්ධීකරණය", ta: "விஞ்ஞான தொழில்நுட்ப ஒருங்கிணைப்பு" } },
    { cat: "digital", amount: 1990, n: { en: "Single Trade Window", si: "තනි වෙළඳ කවුළුව", ta: "ஒற்றை வர்த்தக சாளரம்" } },
    // Tourism, sport & environment
    { cat: "tourism", amount: 2500, n: { en: "Sports culture programme", si: "ක්‍රීඩා සංස්කෘතිය වැඩසටහන", ta: "விளையாட்டுக் கலாசாரத் திட்டம்" } },
    { cat: "tourism", amount: 1500, n: { en: "Sugathadasa sports complex", si: "සුගතදාස ක්‍රීඩා සංකීර්ණය", ta: "சுகததாச விளையாட்டு வளாகம்" } },
    { cat: "tourism", amount: 800, n: { en: "Domestic air terminal", si: "දේශීය ගුවන් පර්යන්තය", ta: "உள்நாட்டு விமான முனையம்" } },
    { cat: "tourism", amount: 700, n: { en: "Wildlife hospital, Anuradhapura", si: "වනජීවී රෝහල, අනුරාධපුරය", ta: "வனவிலங்கு மருத்துவமனை, அனுராதபுரம்" } },
    { cat: "tourism", amount: 500, n: { en: "Marine tourism loans", si: "සාගර සංචාරක ණය", ta: "கடல் சுற்றுலா கடன்கள்" } }
  ],

  /* Allowance & benefit changes (Rs.) */
  allowances: [
    { id: "disability", from: 10000, to: 12500, unit: "month",
      n: { en: "Disability & kidney-patient allowance", si: "ආබාධිත හා වකුගඩු රෝගී දීමනාව", ta: "மாற்றுத்திறனாளி மற்றும் சிறுநீரக நோயாளர் கொடுப்பனவு" } },
    { id: "taxfree", from: 150000, to: 162500, unit: "month",
      n: { en: "Tax-free monthly income threshold", si: "බදු රහිත මාසික ආදායම් සීමාව", ta: "வரியற்ற மாதாந்த வருமான வரம்பு" } },
    { id: "dat", from: 70000, to: 95000, unit: "month",
      n: { en: "Medical officers' DAT allowance", si: "වෛද්‍ය නිලධාරීන්ගේ DAT දීමනාව", ta: "வைத்திய அதிகாரிகளின் DAT கொடுப்பனவு" } },
    { id: "nursing", from: 6000, to: 12000, unit: "month",
      n: { en: "Nurses & paramedics special duty allowance", si: "හෙද හා පරිපූරක වෛද්‍ය විශේෂ රාජකාරි දීමනාව", ta: "தாதியர் மற்றும் துணை மருத்துவ விசேட கடமைக் கொடுப்பனவு" } },
    { id: "trainee", from: 10500, to: 20000, unit: "month",
      n: { en: "Teacher-trainee allowance", si: "ගුරු අභ්‍යාසලාභී දීමනාව", ta: "ஆசிரியப் பயிலுநர் கொடுப்பனவு" } },
    { id: "prison", from: 8000, to: 16000, unit: "month",
      n: { en: "Prison officers' risk allowance", si: "බන්ධනාගාර නිලධාරීන්ගේ අවදානම් දීමනාව", ta: "சிறைச்சாலை அதிகாரிகளின் இடர் கொடுப்பனவு" } },
    { id: "student", from: 6250, to: 10000, unit: "month",
      n: { en: "Student-loan living allowance", si: "ශිෂ්‍ය ණය ජීවන දීමනාව", ta: "மாணவர் கடன் வாழ்க்கைக் கொடுப்பனவு" } },
    { id: "dhamma", from: 7500, to: 12500, unit: "year",
      n: { en: "Dhamma school teachers' payment", si: "දහම් පාසල් ගුරු දීමනාව", ta: "அறநெறிப் பாடசாலை ஆசிரியர் கொடுப்பனவு" } },
    { id: "lecturer", from: 1500, to: 4500, unit: "hour",
      n: { en: "Visiting lecturer pay", si: "බාහිර කථිකාචාර්ය ගෙවීම", ta: "வருகைதரு விரிவுரையாளர் கொடுப்பனவு" } },
    { id: "houseaid", from: 1000000, to: 1500000, unit: "once",
      n: { en: "Housing assistance per house", si: "නිවසකට නිවාස ආධාර", ta: "வீடொன்றுக்கான வீடமைப்பு உதவி" } },
    { id: "fisher", from: 1000000, to: 2000000, unit: "once",
      n: { en: "Fishermen's accidental-death compensation", si: "ධීවරයින්ගේ හදිසි මරණ වන්දිය", ta: "மீனவர் விபத்து மரண இழப்பீடு" } }
  ],


  /* Interest as a share of government revenue, % */
  interestShare: [
    { year: "2022", value: 79.1 },
    { year: "2025", value: 45.9 },
    { year: "2026*", value: 39.6 }
  ],

  /* Personal income tax (monthly, Rs.) — reported 2027 proposal vs current */
  tax: {
    current:  { relief: 150000, bands: [[83333, 0.06], [41667, 0.18], [41667, 0.24], [41667, 0.30], [Infinity, 0.36]] },
    proposed: { relief: 162500, bands: [[70833, 0.06], [50000, 0.12], [50000, 0.18], [50000, 0.24], [50000, 0.30], [Infinity, 0.36]] }
  }
};

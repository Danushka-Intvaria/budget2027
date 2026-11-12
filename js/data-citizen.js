/* Budget 2027 — sector view from the Treasury's "Citizens Budget 2027" (Department of National Budget, Nov 2026).
 * Figures in Rs. billion as published (rounded); converted to Rs. million on load.
 * Debt service (Rs 4,850 bn) and contingencies are not allocated to any sector. Loaded after data.js. */
(function (B) {
  const S = (id, rec, cap, name, short, subs) => ({ id, rec: rec * 1000, cap: cap * 1000, name, short,
    subs: (subs || []).map(([v, en, si, ta]) => ({ value: v * 1000, n: { en, si, ta } })) });

  B.sectors = [
    S("social", 907.1, 5.4,
      { en: "A Universal Social Protection System", si: "සර්වසාධාරණ සමාජ ආරක්ෂණ පද්ධතියක්", ta: "உலகளாவிய சமூகப் பாதுகாப்பு முறைமை" },
      { en: "Social protection", si: "සමාජ ආරක්ෂණය", ta: "சமூகப் பாதுகாப்பு" }, [
      [425.0, "Public service pensions (730,000 pensioners)", "රාජ්‍ය සේවා විශ්‍රාම වැටුප් (විශ්‍රාමිකයින් 730,000)", "அரச சேவை ஓய்வூதியம் (730,000 ஓய்வூதியர்)"],
      [142.9, "Aswesuma cash grants for low-income families", "අඩු ආදායම්ලාභී පවුල් සඳහා අස්වැසුම මුදල් ප්‍රදාන", "குறைந்த வருமானக் குடும்பங்களுக்கு அஸ்வெசும பணக் கொடை"],
      [82.0, "Widows', widowers' & orphans' pensions", "වැන්දඹු, වැන්දඹු පුරුෂ හා අනාථ විශ්‍රාම වැටුප්", "விதவைகள், தபுதாரர், அநாதைகள் ஓய்வூதியம்"],
      [63.0, "Gratuity payments", "පාරිතෝෂික ගෙවීම්", "பணிக்கொடை"],
      [60.0, "Compensation for fallen & injured soldiers", "මියගිය හා තුවාල ලත් සොල්දාදුවන්ට වන්දි", "உயிரிழந்த, காயமடைந்த படையினருக்கான இழப்பீடு"],
      [58.7, "Support for elderly people (over 70)", "වැඩිහිටියන් සඳහා ආධාර (70 ට වැඩි)", "முதியோருக்கான உதவி (70 வயதுக்கு மேல்)"],
      [22.1, "Support for low-income people with disabilities", "අඩු ආදායම්ලාභී ආබාධිත පුද්ගලයින්ට ආධාර", "குறைந்த வருமான மாற்றுத்திறனாளிகளுக்கான உதவி"],
      [6.6, "Support for kidney patients", "වකුගඩු රෝගීන්ට ආධාර", "சிறுநீரக நோயாளர்களுக்கான உதவி"],
      [52.2, "Other welfare", "වෙනත් සුබසාධන", "ஏனைய நலன்புரி"]
    ]),
    S("education", 645.4, 104.0,
      { en: "Building a Better Education System", si: "වඩා හොඳ අධ්‍යාපන ක්‍රමයක් ගොඩනැගීම", ta: "சிறந்த கல்வி முறைமையைக் கட்டியெழுப்புதல்" },
      { en: "Education", si: "අධ්‍යාපනය", ta: "கல்வி" }, [
      [562.7, "School education", "පාසල් අධ්‍යාපනය", "பாடசாலைக் கல்வி"],
      [148.4, "University education", "විශ්වවිද්‍යාල අධ්‍යාපනය", "பல்கலைக்கழகக் கல்வி"],
      [25.7, "Vocational education", "වෘත්තීය අධ්‍යාපනය", "தொழிற்கல்வி"],
      [5.6, "Pre-primary education", "පූර්ව ප්‍රාථමික අධ්‍යාපනය", "முன்பள்ளிக் கல்வி"],
      [5.4, "Science & technology", "විද්‍යාව හා තාක්ෂණය", "விஞ்ஞானம் மற்றும் தொழில்நுட்பம்"],
      [1.3, "Dhamma school education", "දහම් පාසල් අධ්‍යාපනය", "அறநெறிக் கல்வி"]
    ]),
    S("health", 578.8, 130.8,
      { en: "A Healthier Sri Lanka", si: "සෞඛ්‍ය සම්පන්න ශ්‍රී ලංකාවක්", ta: "ஆரோக்கியமான இலங்கை" },
      { en: "Health", si: "සෞඛ්‍ය", ta: "சுகாதாரம்" }, [
      [353.9, "Hospital operation", "රෝහල් මෙහෙයුම්", "மருத்துவமனை இயக்கம்"],
      [190.9, "Medicines & medical supplies", "ඖෂධ හා වෛද්‍ය සැපයුම්", "மருந்துகள் மற்றும் மருத்துவ விநியோகம்"],
      [104.9, "Hospital development", "රෝහල් සංවර්ධනය", "மருத்துவமனை அபிவிருத்தி"],
      [28.0, "Training the health workforce", "සෞඛ්‍ය කාර්ය මණ්ඩල පුහුණුව", "சுகாதார ஊழியர் பயிற்சி"],
      [11.2, "Nutrition incl. Thriposha", "පෝෂණය (ත්‍රිපෝෂ ඇතුළුව)", "போசாக்கு (திரிபோஷா உட்பட)"],
      [7.6, "Disease prevention", "රෝග වැළැක්වීම", "நோய்த் தடுப்பு"],
      [6.5, "Suwasariya ambulance service", "සුවසැරිය ගිලන් රථ සේවය", "சுவசெரிய அம்புலன்ஸ் சேவை"],
      [4.9, "Indigenous medicine", "දේශීය වෛද්‍ය", "சுதேச மருத்துவம்"],
      [1.4, "Health research", "සෞඛ්‍ය පර්යේෂණ", "சுகாதார ஆராய்ச்சி"]
    ]),
    S("transport", 58.65, 399.5,
      { en: "Safe, Reliable & Efficient Transport", si: "ආරක්ෂිත, විශ්වාසදායී හා කාර්යක්ෂම ප්‍රවාහනය", ta: "பாதுகாப்பான, நம்பகமான, திறமையான போக்குவரத்து" },
      { en: "Transport", si: "ප්‍රවාහනය", ta: "போக்குவரத்து" }, [
      [294.8, "Roads & expressways", "මාර්ග හා අධිවේගී මාර්ග", "வீதிகள் மற்றும் அதிவேக வீதிகள்"],
      [95.6, "Railway", "දුම්රිය", "ரயில்வே"],
      [45.15, "Public transport (buses)", "මහජන ප්‍රවාහනය (බස්)", "பொதுப் போக்குவரத்து (பேருந்து)"],
      [19.2, "Bridges", "පාලම්", "பாலங்கள்"],
      [3.7, "Ports & aviation", "වරාය හා ගුවන් සේවා", "துறைமுகம் மற்றும் விமான சேவை"]
    ]),
    S("security", 376.3, 51.2,
      { en: "National Security", si: "ජාතික ආරක්ෂාව", ta: "தேசிய பாதுகாப்பு" },
      { en: "National security", si: "ජාතික ආරක්ෂාව", ta: "தேசிய பாதுகாப்பு" }, [
      [234.0, "Tri-forces salaries & wages", "ත්‍රිවිධ හමුදා වැටුප් හා වේතන", "முப்படை சம்பளம் மற்றும் கூலி"],
      [79.0, "Tri-forces food & rations", "ත්‍රිවිධ හමුදා ආහාර හා සලාක", "முப்படை உணவு மற்றும் பங்கீடு"],
      [34.5, "Maintenance of army, navy & air force", "යුද, නාවික හා ගුවන් හමුදා නඩත්තුව", "இராணுவம், கடற்படை, விமானப்படை பராமரிப்பு"],
      [6.5, "Tri-forces uniforms", "ත්‍රිවිධ හමුදා නිල ඇඳුම්", "முப்படை சீருடைகள்"],
      [73.6, "Other (incl. Defence HQ, welfare)", "වෙනත් (ආරක්ෂක මූලස්ථානය, සුබසාධනය ඇතුළුව)", "ஏனையவை (பாதுகாப்புத் தலைமையகம், நலன்புரி உட்பட)"]
    ]),
    S("publicservice", 208.69, 163.16,
      { en: "People-Friendly Public Service", si: "ජනහිතකාමී රාජ්‍ය සේවයක්", ta: "மக்கள் நேய அரச சேவை" },
      { en: "Public service", si: "රාජ්‍ය සේවය", ta: "அரச சேவை" }, [
      [174.6, "District & divisional secretariats, provincial councils", "දිස්ත්‍රික් හා ප්‍රාදේශීය ලේකම් කාර්යාල, පළාත් සභා", "மாவட்ட, பிரதேச செயலகங்கள், மாகாண சபைகள்"],
      [127.9, "Financial affairs", "මූල්‍ය කටයුතු", "நிதி அலுவல்கள்"],
      [22.36, "Foreign affairs & overseas missions", "විදේශ කටයුතු හා විදේශ දූත මණ්ඩල", "வெளிவிவகாரம் மற்றும் வெளிநாட்டுத் தூதரகங்கள்"],
      [19.88, "Executive & legislature", "විධායකය හා ව්‍යවස්ථාදායකය", "நிறைவேற்றுத்துறை மற்றும் சட்டவாக்கம்"],
      [19.53, "Digital government services", "ඩිජිටල් රාජ්‍ය සේවා", "டிஜிட்டல் அரச சேவைகள்"],
      [7.34, "Government printing", "රජයේ මුද්‍රණ", "அரச அச்சகம்"]
    ]),
    S("society", 286.7, 55.7,
      { en: "A Peaceful and Fair Society", si: "සාමකාමී හා සාධාරණ සමාජයක්", ta: "அமைதியான, நியாயமான சமூகம்" },
      { en: "Justice & society", si: "යුක්තිය හා සමාජය", ta: "நீதி & சமூகம்" }, [
      [236.1, "Public security (police, immigration)", "මහජන ආරක්ෂාව (පොලිසිය, ආගමන)", "பொது பாதுகாப்பு (பொலிஸ், குடிவரவு)"],
      [73.2, "Courts, prisons, women & children", "අධිකරණ, බන්ධනාගාර, කාන්තා හා ළමා", "நீதிமன்றங்கள், சிறைச்சாலைகள், மகளிர் மற்றும் சிறுவர்"],
      [17.48, "Culture & religion", "සංස්කෘතිය හා ආගම", "கலாசாரம் மற்றும் சமயம்"],
      [15.54, "Democracy & media (incl. provincial council elections)", "ප්‍රජාතන්ත්‍රවාදය හා මාධ්‍ය (පළාත් සභා මැතිවරණ ඇතුළුව)", "ஜனநாயகம் மற்றும் ஊடகம் (மாகாண சபைத் தேர்தல் உட்பட)"]
    ]),
    S("agri", 118.8, 154.2,
      { en: "A Stronger Agriculture Sector", si: "ශක්තිමත් කෘෂිකාර්මික අංශයක්", ta: "வலுவான விவசாயத் துறை" },
      { en: "Agriculture", si: "කෘෂිකර්මය", ta: "விவசாயம்" }, [
      [123.0, "Agriculture (incl. Rs 44 bn fertiliser subsidy)", "කෘෂිකර්මය (රු. බිලියන 44 පොහොර සහනාධාරය ඇතුළුව)", "விவசாயம் (ரூ. 44 பில்லியன் உர மானியம் உட்பட)"],
      [93.0, "Irrigation", "වාරිමාර්ග", "நீர்ப்பாசனம்"],
      [22.5, "Plantations", "වැවිලි", "பெருந்தோட்டம்"],
      [13.4, "Land", "ඉඩම්", "காணி"],
      [11.7, "Fisheries", "ධීවර", "கடற்றொழில்"],
      [9.4, "Livestock & dairy", "පශු සම්පත් හා කිරි", "கால்நடை மற்றும் பால்"]
    ]),
    S("living", 12.9, 195.7,
      { en: "Support for Decent Living", si: "යහපත් ජීවන තත්ත්වයක් සඳහා සහාය", ta: "கண்ணியமான வாழ்க்கைக்கான ஆதரவு" },
      { en: "Water & housing", si: "ජලය හා නිවාස", ta: "நீர் & வீடமைப்பு" }, [
      [77.9, "Drinking water supply", "පානීය ජල සැපයුම", "குடிநீர் வழங்கல்"],
      [64.1, "Housing", "නිවාස", "வீடமைப்பு"],
      [42.0, "Rural development (incl. Praja Shakthi)", "ග්‍රාමීය සංවර්ධනය (ප්‍රජා ශක්ති ඇතුළුව)", "கிராமிய அபிவிருத்தி (பிரஜா சக்தி உட்பட)"],
      [17.0, "Youth & sports", "තරුණ හා ක්‍රීඩා", "இளைஞர் மற்றும் விளையாட்டு"],
      [7.4, "Urban infrastructure", "නාගරික යටිතල පහසුකම්", "நகர உட்கட்டமைப்பு"]
    ]),
    S("economy", 54.57, 107.4,
      { en: "Economic Services & Entrepreneurship", si: "ආර්ථික සේවා හා ව්‍යවසායකත්වය", ta: "பொருளாதார சேவைகள் மற்றும் தொழில்முனைவு" },
      { en: "Economy & business", si: "ආර්ථිකය හා ව්‍යාපාර", ta: "பொருளாதாரம் & வணிகம்" }, [
      [71.46, "Small & medium business loans", "සුළු හා මධ්‍ය පරිමාණ ව්‍යාපාර ණය", "சிறிய, நடுத்தர வணிகக் கடன்கள்"],
      [27.95, "Postal services", "තැපැල් සේවා", "தபால் சேவைகள்"],
      [26.54, "Industry & investment", "කර්මාන්ත හා ආයෝජන", "கைத்தொழில் மற்றும் முதலீடு"],
      [14.85, "Customs & trade", "රේගුව හා වෙළඳාම", "சுங்கம் மற்றும் வர்த்தகம்"],
      [12.29, "Tourism", "සංචාරක", "சுற்றுலா"],
      [8.9, "Labour & foreign employment", "කම්කරු හා විදේශ රැකියා", "தொழில் மற்றும் வெளிநாட்டு வேலைவாய்ப்பு"]
    ]),
    S("environment", 16.5, 45.5,
      { en: "Towards an Evergreen Life", si: "සදාහරිත ජීවිතයක් කරා", ta: "பசுமையான வாழ்வை நோக்கி" },
      { en: "Environment", si: "පරිසරය", ta: "சுற்றாடல்" }, [
      [15.2, "Disaster management", "ආපදා කළමනාකරණය", "அனர்த்த முகாமைத்துவம்"],
      [12.7, "Wastewater management", "අපජල කළමනාකරණය", "கழிவுநீர் முகாமைத்துவம்"],
      [10.5, "Environment management", "පරිසර කළමනාකරණය", "சுற்றாடல் முகாமைத்துவம்"],
      [7.7, "Storm water & flood control", "වැසි ජලය හා ගංවතුර පාලනය", "மழைநீர் மற்றும் வெள்ளக் கட்டுப்பாடு"],
      [6.5, "Wildlife protection", "වනජීවී ආරක්ෂණය", "வனவிலங்கு பாதுகாப்பு"],
      [5.8, "Coastal conservation", "වෙරළ සංරක්ෂණය", "கரையோரப் பாதுகாப்பு"],
      [3.7, "Solid waste management", "ඝන අපද්‍රව්‍ය කළමනාකරණය", "திண்மக் கழிவு முகாமைத்துவம்"]
    ]),
    S("energy", 1.2, 29.0,
      { en: "Reliable, Affordable & Sustainable Energy", si: "විශ්වාසදායී, දැරිය හැකි හා තිරසාර බලශක්තිය", ta: "நம்பகமான, மலிவான, நிலையான வலுசக்தி" },
      { en: "Energy", si: "බලශක්තිය", ta: "வலுசக்தி" }, [])
  ];

  // The Citizens Budget shows the Rs 230 bn is the Aswesuma programme itself (cash grants, elderly,
  // disability, kidney support); the full social-protection sector is Rs 912.5 bn.
  const asw = B.people.find((p) => p.id === "socprot");
  if (asw) {
    asw.name = { en: "Aswesuma programme (cash grants, elderly, disability, kidney support)", si: "අස්වැසුම වැඩසටහන (මුදල් ප්‍රදාන, වැඩිහිටි, ආබාධිත, වකුගඩු ආධාර)", ta: "அஸ்வெசும திட்டம் (பணக் கொடை, முதியோர், மாற்றுத்திறனாளி, சிறுநீரக உதவி)" };
    asw.short = { en: "Aswesuma", si: "අස්වැසුම", ta: "அஸ்வெசும" };
  }

  B.meta.sources.splice(1, 0, { name: "Ministry of Finance — Citizens Budget 2027 (Department of National Budget)", url: "https://www.treasury.gov.lk" });
})(window.BUDGET);

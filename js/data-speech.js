/* Budget 2027 — items announced in the final part of the Budget Speech (12 Nov 2026).
 * Source: completed live coverage (Newswire, Ada Derana). Loaded after data.js. */
(function (B) {
  /* Tax & levy changes. dir: "down" = relief, "up" = increase, "same" = no change */
  B.taxChanges = [
    { dir: "down", n: { en: "Tax-free income threshold raised to Rs 162,500 a month (Rs 1.95 mn a year)", si: "බදු රහිත ආදායම් සීමාව මසකට රු. 162,500 දක්වා (වසරකට රු. මිලියන 1.95) ඉහළ නංවයි", ta: "வரியற்ற வருமான வரம்பு மாதத்திற்கு ரூ. 162,500 ஆக (ஆண்டுக்கு ரூ. 1.95 மில்லியன்) உயர்த்தப்படுகிறது" } },
    { dir: "down", n: { en: "Income tax bands widened; rates 6%, 12%, 18%, 24%, 30% and 36%", si: "ආදායම් බදු පරාස පුළුල් කෙරේ; අනුපාත 6%, 12%, 18%, 24%, 30% හා 36%", ta: "வருமான வரிப் படிகள் விரிவாக்கம்; வீதங்கள் 6%, 12%, 18%, 24%, 30%, 36%" } },
    { dir: "down", n: { en: "Special Commodity Levy cut on sprats (Rs 100 → Rs 10/kg), Maldive fish (Rs 302 → Rs 10/kg) and dried chillies (−Rs 50/kg) from 13 Nov 2026", si: "හාල්මැස්සන් (රු. 100 → රු. 10/kg), උම්බලකඩ (රු. 302 → රු. 10/kg) හා වියළි මිරිස් (−රු. 50/kg) මත විශේෂ භාණ්ඩ බද්ද 2026 නොවැම්බර් 13 සිට අඩු කෙරේ", ta: "நெத்தலி (ரூ. 100 → ரூ. 10/கிலோ), மாசி (ரூ. 302 → ரூ. 10/கிலோ), காய்ந்த மிளகாய் (−ரூ. 50/கிலோ) மீதான விசேட பண்ட வரி 13 நவம்பர் 2026 முதல் குறைப்பு" } },
    { dir: "up", n: { en: "Special Commodity Levy on imported sugar up by Rs 10/kg", si: "ආනයනික සීනි මත විශේෂ භාණ්ඩ බද්ද කිලෝවකට රු. 10 කින් වැඩි කෙරේ", ta: "இறக்குமதி சீனி மீதான விசேட பண்ட வரி கிலோவுக்கு ரூ. 10 அதிகரிப்பு" } },
    { dir: "down", n: { en: "CESS cut by 25% on 800 tariff lines", si: "තීරු ගාස්තු පේළි 800 ක සෙස් බද්ද 25% කින් අඩු කෙරේ", ta: "800 சுங்க வரி வரிசைகளில் செஸ் வரி 25% குறைப்பு" } },
    { dir: "down", n: { en: "Ports & Airports Development Levy removed on newsprint (from 1 Jan 2027) and solar storage batteries", si: "පුවත්පත් කඩදාසි (2027 ජනවාරි 1 සිට) හා සූර්ය බලශක්ති ගබඩා බැටරි මත වරාය හා ගුවන්තොටුපළ සංවර්ධන බද්ද ඉවත් කෙරේ", ta: "செய்தித்தாள் காகிதம் (1 ஜனவரி 2027 முதல்) மற்றும் சூரிய சக்தி சேமிப்பு மின்கலங்கள் மீதான துறைமுக, விமான நிலைய அபிவிருத்தி வரி நீக்கம்" } },
    { dir: "down", n: { en: "Tourism Development Levy abolished from 1 April 2027", si: "සංචාරක සංවර්ධන බද්ද 2027 අප්‍රේල් 1 සිට අහෝසි කෙරේ", ta: "சுற்றுலா அபிவிருத்தி வரி 1 ஏப்ரல் 2027 முதல் நீக்கம்" } },
    { dir: "down", n: { en: "VAT exemption for books, textbooks, exercise books and printed educational material", si: "පොත්, පෙළපොත්, අභ්‍යාස පොත් හා මුද්‍රිත අධ්‍යාපනික ද්‍රව්‍ය සඳහා VAT නිදහස් කිරීම", ta: "புத்தகங்கள், பாடநூல்கள், பயிற்சிப் புத்தகங்கள், அச்சிடப்பட்ட கல்விப் பொருட்களுக்கு VAT விலக்கு" } },
    { dir: "down", n: { en: "Taxes on new communication towers removed for five years", si: "නව සන්නිවේදන කුළුණු මත බදු වසර පහකට ඉවත් කෙරේ", ta: "புதிய தொலைத்தொடர்பு கோபுரங்கள் மீதான வரிகள் ஐந்து ஆண்டுகளுக்கு நீக்கம்" } },
    { dir: "down", n: { en: "SSCL exemption on bunker fuel for ships on international routes", si: "ජාත්‍යන්තර නැව් සඳහා සපයන බංකර් ඉන්ධන මත SSCL නිදහස් කිරීම", ta: "சர்வதேச கப்பல்களுக்கான பங்கர் எரிபொருளுக்கு SSCL விலக்கு" } },
    { dir: "same", n: { en: "No tax cuts on the 10 most-consumed goods such as dhal, onions and milk powder", si: "පරිප්පු, ළූණු, කිරිපිටි වැනි වැඩිපුරම පරිභෝජනය කරන භාණ්ඩ 10 මත බදු අඩු කිරීමක් නැත", ta: "பருப்பு, வெங்காயம், பால்மா போன்ற அதிகம் நுகரப்படும் 10 பொருட்களுக்கு வரிக் குறைப்பு இல்லை" } }
  ];

  /* Allocations announced later in the speech (Rs. million) */
  B.proposals.push(
    { cat: "security", amount: 260000, n: { en: "Cyclone Ditwah reconstruction (reallocated in 2027)", si: "දිට්වා සුළි කුණාටු ප්‍රතිසංස්කරණය (2027 දී නැවත වෙන් කළ)", ta: "டித்வா சூறாவளி மீள்கட்டுமானம் (2027இல் மீள் ஒதுக்கீடு)" } },
    { cat: "social", amount: 5000, n: { en: "Clean Sri Lanka waste collection", si: "ක්ලීන් ශ්‍රී ලංකා කසළ එකතු කිරීම", ta: "கிளீன் ஸ்ரீ லங்கா கழிவு சேகரிப்பு" } },
    { cat: "tourism", amount: 5000, n: { en: "Elephant transit home, Polonnaruwa", si: "අලි අතරමැදි නිවහන, පොළොන්නරුව", ta: "யானை இடைத்தங்கல் இல்லம், பொலன்னறுவை" } },
    { cat: "digital", amount: 3430, n: { en: "Sri Lanka–Europe trade programme", si: "ශ්‍රී ලංකා–යුරෝපා වෙළඳ වැඩසටහන", ta: "இலங்கை–ஐரோப்பா வர்த்தகத் திட்டம்" } },
    { cat: "tourism", amount: 1000, n: { en: "Anuradhapura sports complex", si: "අනුරාධපුර ක්‍රීඩා සංකීර්ණය", ta: "அனுராதபுர விளையாட்டு வளாகம்" } },
    { cat: "digital", amount: 1000, n: { en: "Customs container scanners", si: "රේගු බහාලුම් ස්කෑනර්", ta: "சுங்க கொள்கலன் ஸ்கேனர்கள்" } },
    { cat: "social", amount: 722, n: { en: "Rehabilitating 1,328 places of worship", si: "ආගමික ස්ථාන 1,328ක් ප්‍රතිසංස්කරණය", ta: "1,328 வழிபாட்டுத் தலங்களின் புனரமைப்பு" } },
    { cat: "security", amount: 670, n: { en: "Island-wide digital radio system", si: "දිවයින පුරා ඩිජිටල් ගුවන් විදුලි පද්ධතිය", ta: "நாடளாவிய டிஜிட்டல் வானொலி அமைப்பு" } },
    { cat: "digital", amount: 500, n: { en: "Stock market development (incl. \"A Share for Everyone\")", si: "කොටස් වෙළඳපොළ සංවර්ධනය (\"සැමට කොටසක්\" ඇතුළුව)", ta: "பங்குச் சந்தை அபிவிருத்தி (\"அனைவருக்கும் ஒரு பங்கு\" உட்பட)" } },
    { cat: "social", amount: 182, n: { en: "Programme for vulnerable children", si: "අවදානමට ලක් වූ ළමුන් සඳහා වැඩසටහන", ta: "பாதிக்கப்படக்கூடிய சிறுவர்களுக்கான திட்டம்" } }
  );

  B.allowances.push(
    { id: "healthstaff", from: 2000, to: 4000, unit: "month",
      n: { en: "Other health staff special duty allowance", si: "වෙනත් සෞඛ්‍ය කාර්ය මණ්ඩල විශේෂ රාජකාරි දීමනාව", ta: "ஏனைய சுகாதார ஊழியர் விசேட கடமைக் கொடுப்பனவு" } },
    { id: "pirivena", from: 5, to: 50, unit: "day",
      n: { en: "Pirivena student monk daily allowance", si: "පිරිවෙන් භික්ෂු ශිෂ්‍ය දෛනික දීමනාව", ta: "பிரிவெனா மாணவ பிக்குகளின் நாளாந்தக் கொடுப்பனவு" } }
  );
})(window.BUDGET);

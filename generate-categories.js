/* Packin Club — static CATEGORY page generator.
   Replaces the old products.html?cat=... parameter URLs with real pages (one per category).
   Reads product-data.js and borrows the header/footer from a generated product page,
   so run  node generate-products.js  FIRST, then  node generate-categories.js
   Writes 7 files in the project root, e.g. compostable-retail-packaging.html. Safe to re-run. */
const fs = require('fs'), path = require('path'), vm = require('vm');
const ROOT = __dirname, SITE = 'https://packinclub.com';
const sb = { window: {}, console }; vm.createContext(sb);
vm.runInContext(fs.readFileSync(path.join(ROOT, 'product-data.js'), 'utf8'), sb);
const PACKIN = sb.window.PACKIN;
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const SHELL = fs.readFileSync(path.join(ROOT, 'products', 'compostable-carry-bags.html'), 'utf8');
const rootify = h => h.replace(/(href|src)="\.\.\//g, '$1="');

const CITIES = 'Delhi NCR, Noida, Gurugram, Ludhiana, Mumbai, Pune, Chennai and Coimbatore';
const CATS = {
 AGRI: { file: 'compostable-agriculture-packaging.html', short: 'Agriculture & Nursery',
  title: 'Compostable Mulch Film Manufacturer India | Packin Club',
  h1: 'Compostable Mulch Film & Nursery Bags for Agriculture',
  desc: 'Biodegradable mulch film and compostable nursery bags for farms and polyhouses. IS 17088 and CPCB certified, made to order in bulk from Delhi.',
  kw: 'compostable mulch film, biodegradable mulch film, agri mulch film India, garden mulch, organic mulch, plastic mulch alternative, nursery bags for plants, compostable nursery bags, mulch film manufacturer India',
  intro: ['Plastic mulch is cheap to lay and expensive to remove. Packin Club’s compostable agri mulch film does the same jobs as conventional plastic mulch, suppressing weeds, holding soil moisture and steadying root-zone temperature, and then tills back into the soil at harvest, so there is nothing to lift, collect or send to landfill.',
          'We are a Delhi-based manufacturer and supplier of biodegradable mulch film and compostable nursery bags for plants. Films are made to your bed width and crop cycle, and nursery bags come in sizes for seedlings and saplings.'],
  who: 'Vegetable and row-crop farmers, strawberry and melon growers, polyhouse operators, orchards, plant nurseries and agri-input companies that want a mulch film and plant bag which no longer leaves microplastic in the field.',
  choose: 'Match film thickness and field life to your crop cycle (3 to 6 months is typical for vegetables), and tell us the bed width and roll length your layer machine needs. For nursery bags, choose the size by plant height and root ball, and ask for a sample batch before a full season order.',
  faqs: [['Is compostable mulch film the same as biodegradable mulch film?','Compostable mulch film is a certified type of biodegradable film. It is tested to a standard such as IS 17088, so its breakdown is measured rather than just claimed. Ask for the certificate before you buy any biodegradable mulch film.'],
         ['Can I leave compostable mulch film in the field after harvest?','It is designed to be tilled into the soil at harvest, where it breaks down. Field life and breakdown time depend on thickness, soil temperature and moisture, so share your crop and region and we will recommend a grade.'],
         ['Do you make compostable nursery bags for plants in bulk?','Yes. Compostable nursery bags are supplied in bulk with a minimum order of 100 kg per specification. Request a sample first to check size and strength with your plants.'],
         ['Do you supply mulch film outside Delhi?','Yes. We ship from Delhi to farms and distributors in '+CITIES+' and other parts of India.']] },
 ROLL: { file: 'compostable-bags-on-roll.html', short: 'Bags on Roll',
  title: 'Compostable Garbage & Carry Bags on Roll India | Packin Club',
  h1: 'Compostable Bags on Roll: Garbage, Carry and Grocery',
  desc: 'Certified compostable garbage bags, carry bags and grocery bags on roll for retailers, supermarkets and housekeeping teams. Bulk supply from Delhi across India.',
  kw: 'compostable bags on roll, compostable garbage bag on roll, best compostable trash bags, compostable carry bags on roll, grocery store bags, compostable grocery bags on roll, corn starch bags, compostable plastic bags India',
  intro: ['Bags on roll are the fastest way to bag goods at a counter or line a bin, and the easiest place to replace plastic. Packin Club makes certified compostable garbage bags, carry bags and grocery bags on roll that tear cleanly, open easily and hold their load.',
          'Every roll is made from a corn-starch, PLA and PBAT compostable blend and is IS 17088 and CPCB certified. We supply from Delhi to supermarkets, grocers, housekeeping contractors and distributors across India.'],
  who: 'Supermarkets, kirana and grocery chains, vegetable and fruit sellers, hotels and housekeeping contractors, offices, housing societies and distributors who buy compostable trash bags and counter bags in volume.',
  choose: 'Pick the roll by use: garbage bags by bin size and load, carry bags by handle style and weight, grocery bags by what goes in them. We can print your brand on carry and grocery rolls with food-grade inks.',
  faqs: [['What are the best compostable trash bags for home and office use?','Look for bags that state IS 17088 certification, a tested load rating and a roll format that suits your bin size. Our compostable garbage bags on roll are made for that, and we can advise on size and thickness.'],
         ['Are compostable garbage bags strong enough for wet waste?','Yes, within the stated load. Compostable bags perform best for dry and wet household waste that is collected and composted soon after. Store rolls in a cool, dry place and use them within the 12-month shelf life.'],
         ['Can you print our logo on carry bags on roll?','Yes. We print up to 8 colours with food-grade flexographic inks on made-to-order rolls.'],
         ['Do you deliver compostable bags on roll to Mumbai, Pune, Chennai and Coimbatore?','Yes. We ship from Delhi to '+CITIES+' and other cities across India.']] },
 HEALTH: { file: 'compostable-healthcare-packaging.html', short: 'Healthcare & Hospital',
  title: 'Compostable Medical Waste Bags in India | Packin Club',
  h1: 'Compostable Medical Waste Bags for Healthcare',
  desc: 'Colour-coded compostable bio-medical waste bags for hospitals, clinics and labs. IS 17088 and CPCB certified, bulk supply from Delhi across India.',
  kw: 'compostable medical waste bags, biomedical waste bags compostable, hospital waste bags India, colour coded waste bags, compostable bags for hospitals, bio medical waste bag manufacturer',
  intro: ['Hospitals and clinics generate large volumes of colour-coded waste bags every day. Packin Club’s compostable medical waste bags are made in the standard red, yellow and green colours with biohazard marking and handling warnings.',
          'We are a Delhi-based manufacturer and supplier serving hospitals, diagnostic labs, nursing homes and waste-management contractors across India. Please check your local bio-medical waste rules for your facility before switching waste streams.'],
  who: 'Hospitals, clinics, diagnostic laboratories, nursing homes, dental practices and bio-medical waste contractors looking for a compostable option for suitable waste categories.',
  choose: 'Decide the colour code and bag size by waste category and bin size, then tell us the load. Ask us for the certificate and a sample before moving a full department over.',
  faqs: [['Are compostable medical waste bags allowed for bio-medical waste in India?','Rules for bio-medical waste depend on the waste category and your state pollution control board. Confirm the requirement for your facility, and we will share product certificates and specifications to support your approval.'],
         ['Which colours do you make?','Red, yellow and green bags are made with biohazard symbols and handling warnings. Other colours can be quoted on request.'],
         ['What is the minimum order for hospital waste bags?','The minimum order is 100 kg per specification. Samples are available so you can test strength and fit.'],
         ['Do you supply hospitals in Delhi, Gurugram, Noida and beyond?','Yes. We ship from Delhi to '+CITIES+' and other cities.']] },
 HORECA: { file: 'compostable-horeca-packaging.html', short: 'HORECA',
  title: 'Compostable Food Packaging for HORECA India | Packin Club',
  h1: 'Compostable Food Packaging for Hotels, Restaurants and Cafés',
  desc: 'Compostable cups, pouches, bread bags, cling film and bamboo tissue for restaurants, cafés and cloud kitchens. Bulk supply from Delhi.',
  kw: 'compostable food packaging, compostable aqueous coated cups, disposable paper cups, disposable cups, coffee cups, tea cups, custom paper cups, small tea cups, pouch bags, mini pouch, compostable pouches, compostable cling film, bamboo tissue, HORECA packaging India',
  intro: ['A café’s packaging is part of its brand. Packin Club supplies compostable food packaging for hotels, restaurants, cafés, bakeries and cloud kitchens: aqueous coated paper cups for tea and coffee, pouches, bread pouches, hot-liquid pouches, cling film and bamboo tissue.',
          'Our disposable paper cups use a water-based aqueous coating instead of a plastic lining, and can be printed with your design as custom paper cups. Small tea cups and larger coffee cups are available in a range of sizes.'],
  who: 'Cafés and tea stalls, restaurant and hotel groups, QSR chains, bakeries, caterers, cloud kitchens and event organisers who want compostable food packaging that looks good and meets food-contact needs.',
  choose: 'Choose cups by size and hot or cold use, pouches by the product and fill temperature, and film by the food you wrap. Tell us your volumes and print needs, and we will recommend a specification and send samples.',
  faqs: [['Are aqueous coated paper cups compostable?','Aqueous coated cups use a water-based coating rather than a plastic lining. Whether they compost depends on the coating and the facility, so we supply the certification for each product. See our article on whether aqueous coated paper cups are actually compostable.'],
         ['Can I get custom paper cups with my own print?','Yes. Cups can be printed to your artwork on made-to-order runs. Share your size, quantity and artwork for a quote.'],
         ['Do you make a compostable pouch bag or mini pouch for food?','Yes. We make compostable pouches in several sizes, including bread pouches and hot-liquid pouches. Tell us the food, temperature and weight.'],
         ['Can you supply restaurants and cafés in Mumbai, Pune, Chennai and Coimbatore?','Yes. We ship from Delhi to '+CITIES+' and other cities across India.']] },
 IND: { file: 'compostable-industrial-packaging.html', short: 'Industrial',
  title: 'Compostable Stretch Film & Garbage Bags India | Packin Club',
  h1: 'Compostable Garbage Bags and Industrial Packaging Film',
  desc: 'Compostable garbage bags, stretch film, shrink film and wire wrap for factories and warehouses. IS 17088 certified, supplied from Delhi.',
  kw: 'compostable garbage bags manufacturer, compostable trash bags India, compostable stretch film, compostable shrink film, compostable pallet wrap, industrial compostable packaging, electrical wire packaging wrap, plastic alternative packaging for businesses',
  intro: ['Factories, warehouses and facility teams use plastic in volume: bin liners, pallet wrap, shrink wrap and protective film. Packin Club’s compostable garbage bags, stretch film, shrink film and wire wrap give you a certified alternative made from a corn-starch, PLA and PBAT compostable blend.',
          'As a Delhi-based manufacturer and supplier, we make these in bulk to your width, thickness and length, and ship across India, including industrial belts around Delhi NCR, Ludhiana, Pune and Chennai.'],
  who: 'Manufacturers, warehouses and logistics operators, facility-management companies, electrical and electronics makers and distributors that want to replace single-use plastic film and bin liners.',
  choose: 'For garbage bags, choose size and load. For stretch film, choose width, micron and core size for your wrapper. Run a trial pallet before you commit to a full order, and tell us if your loads are heavy or sharp-edged.',
  faqs: [['Is compostable stretch film strong enough for pallet wrapping?','Compostable stretch film is formulated for secure pallet wrapping at standard micron ranges. Test a trial pallet on your wrapper and load type, and we will adjust the grade.'],
         ['Where can I buy a compostable garbage bag manufacturer’s bulk supply?','You can order bulk compostable garbage bags directly from Packin Club, a Delhi-based manufacturer and supplier. The minimum order is 100 kg per specification.'],
         ['Does compostable shrink film work with a heat tunnel?','Yes, within its shrink range. Share your machine and product size so we can match the grade.'],
         ['Do you deliver to Ludhiana, Gurugram and Noida factories?','Yes. We ship from Delhi to '+CITIES+' and other industrial cities.']] },
 RETAIL: { file: 'compostable-retail-packaging.html', short: 'Retail',
  title: 'Compostable Carry Bags & Courier Mailers India | Packin Club',
  h1: 'Compostable Carry Bags, Courier Mailers and Retail Packaging',
  desc: 'Compostable carry bags, courier mailers, grocery, garment and loop handle bags for retailers and e-commerce brands. Printed in bulk from Delhi.',
  kw: 'compostable carry bags, compostable courier bags, mailer bags, shipping bags, mailing bags, poly mailer bags, poly mailers, compostable grocery bags, garment bags, garment bags for travel, pet poop bags, dog waste bags, corn starch dog poop bags, bioplastic bags, compostable carry bags manufacturer India',
  intro: ['Retail and e-commerce brands ship millions of bags every year. Packin Club makes compostable carry bags (W-cut, U-cut, D-cut and loop handle), compostable courier mailers, grocery bags, garment bags and pet poop bags that look premium and perform like plastic.',
          'Our compostable courier bags and mailers replace plastic poly mailers with a self-seal, tamper-evident strip. Carry bags and garment bags can be printed with your brand, and garment bags suit both storage and travel. We are a Delhi-based manufacturer and supplier shipping across India.'],
  who: 'D2C and e-commerce brands, fashion and apparel stores, supermarkets, gifting and boutique retailers, pet-care brands and distributors who want certified shipping bags, mailing bags and shopping bags.',
  choose: 'For mailers, choose size and thickness by what you ship. For carry bags, choose handle style, size and load. Share your artwork and quantity, and we will send a sample for approval before production.',
  faqs: [['Are compostable courier bags a good replacement for poly mailers?','Yes. Compostable mailers do the job of poly mailer bags, with a self-seal strip and print options, and are made from a certified compostable blend instead of conventional plastic.'],
         ['Can I print my brand on compostable carry bags?','Yes. We print up to 8 colours with food-grade flexographic inks, and can quote custom sizes and handle styles.'],
         ['Do you make corn starch dog poop bags?','Yes. Our compostable pet poop bags are made from a corn-starch based compostable blend, as a dog waste bag alternative to plastic.'],
         ['Do you supply retailers in Mumbai, Pune, Chennai, Coimbatore and Ludhiana?','Yes. We ship from Delhi to '+CITIES+' and other cities across India.']] },
 TEMPLE: { file: 'compostable-temple-packaging.html', short: 'Temple & Religious',
  title: 'Compostable Prasadam Pouches for Temples India | Packin Club',
  h1: 'Compostable Prasadam Pouches for Temples and Trusts',
  desc: 'Compostable prasadam pouches for temples, trusts and langar services. Certified, printed to your temple name and supplied in bulk from Delhi across India.',
  kw: 'compostable prasadam pouches, prasad packing pouch, temple packaging India, biodegradable prasad bags, compostable pouch bags, langar packaging, pouch bags',
  intro: ['Temples and trusts distribute prasadam to thousands of devotees a day, and much of it ends up in plastic pouches that outlast the festival. Packin Club’s compostable prasadam pouches give you a certified alternative that returns to soil.',
          'We are a Delhi-based manufacturer and supplier of compostable pouches printed with your temple or trust name. Sizes suit laddoo, dry prasadam and dry sweets, and we supply in bulk across India.'],
  who: 'Temples, religious trusts, gurdwaras, langar and bhandara organisers, pilgrimage and yatra services, and sweet shops that pack prasadam.',
  choose: 'Choose the pouch size by the weight of prasadam you pack, and tell us your daily and festival volumes. We print your name or design, and send samples before bulk production.',
  faqs: [['Can compostable pouches hold oily or sweet prasadam?','Pouches are made for dry and lightly oily food. Tell us the prasadam you pack so we can recommend the right grade.'],
         ['Can you print our temple name on the pouches?','Yes. We print your temple or trust name and design on made-to-order pouches.'],
         ['What is the minimum order for temple pouches?','The minimum order is 100 kg per specification. Please contact us for festival-season lead times.'],
         ['Do you supply temples across India?','Yes. We ship from Delhi to '+CITIES+' and other cities.']] }
};
const SPECKEYS = ['Base material', 'Certification', 'Compostability'];
const g = k => (CATS_BY_KEY[k]);
const CATS_BY_KEY = CATS;

function page(key) {
  const c = CATS[key], url = SITE + '/' + c.file;
  const prods = PACKIN.products.filter(p => p.cat === key);
  const cards = prods.map(p => {
    const specs = SPECKEYS.map(k => (p.specs || []).find(s => s.k === k)).filter(Boolean).map(s =>
      '<div style="display:flex; justify-content:space-between; gap:14px; font-size:12.5px; border-bottom:1px solid #14342C14; padding-bottom:7px;"><span style="color:#14342C99;">' + esc(s.k) + '</span><span style="text-align:right; font-weight:500;">' + esc(s.v) + '</span></div>').join('');
    return '<div class="pc-card" style="border:1px solid #14342C1a; border-radius:4px; overflow:hidden; background:#fff; display:flex; flex-direction:column;">' +
      '<a href="products/' + p.slug + '.html" style="display:block; height:190px; background:#14342C; position:relative;"><img src="' + esc(p.image) + '" alt="' + esc(p.name) + ' from Packin Club" loading="lazy" style="position:absolute; inset:0; width:100%; height:100%; object-fit:cover;"></a>' +
      '<div style="padding:20px 22px 22px; display:flex; flex-direction:column; flex:1;"><h3 style="font-family:Newsreader,serif; font-weight:500; font-size:21px; margin:0 0 6px;"><a href="products/' + p.slug + '.html" style="color:#14342C; text-decoration:none;">' + esc(p.name) + '</a></h3>' +
      '<p style="font-size:13.5px; line-height:1.55; color:#14342C99; margin:0 0 14px;">' + esc(p.blurb) + '</p>' +
      '<div style="display:flex; flex-direction:column; gap:8px; flex:1; margin-bottom:16px;">' + specs + '</div>' +
      '<a href="products/' + p.slug + '.html" style="color:#C1622D; text-decoration:none; font-size:13.5px; font-weight:600;">View ' + esc(p.name) + ' specs →</a></div></div>';
  }).join('');
  const others = Object.keys(CATS).filter(k => k !== key).map(k => '<a href="' + CATS[k].file + '" style="color:#3f7a26; text-decoration:none; font-weight:600; font-size:14.5px;">' + esc(CATS[k].short) + '</a>').join(' &nbsp;·&nbsp; ');
  const h2 = t => '<h2 style="font-family:Newsreader,serif; font-weight:500; font-size:clamp(22px,2.4vw,30px); letter-spacing:-0.01em; margin:clamp(40px,5vw,60px) 0 18px; padding-bottom:14px; border-bottom:1px solid #14342C18;">' + t + '</h2>';
  const pp = t => '<p style="font-size:16px; line-height:1.75; color:#14342C; margin:0 0 14px; max-width:760px;">' + esc(t) + '</p>';
  const faqHtml = c.faqs.map(f => '<h3 style="font-family:Newsreader,serif; font-weight:500; font-size:19px; margin:22px 0 8px;">' + esc(f[0]) + '</h3>' + pp(f[1])).join('');
  const ld = [
    { '@context': 'https://schema.org', '@type': 'CollectionPage', name: c.h1, url, description: c.desc, isPartOf: { '@id': SITE + '/#organization' } },
    { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE + '/' }, { '@type': 'ListItem', position: 2, name: 'Products', item: SITE + '/products.html' }, { '@type': 'ListItem', position: 3, name: c.short, item: url }] },
    { '@context': 'https://schema.org', '@type': 'ItemList', itemListElement: prods.map((p, i) => ({ '@type': 'ListItem', position: i + 1, url: SITE + '/products/' + p.slug + '.html', name: p.name })) },
    { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: c.faqs.map(f => ({ '@type': 'Question', name: f[0], acceptedAnswer: { '@type': 'Answer', text: f[1] } })) }
  ].map(o => '<script type="application/ld+json">' + JSON.stringify(o).replace(/</g, '\\u003c') + '</script>').join('\n');

  const headTop = rootify(SHELL.slice(0, SHELL.indexOf('<title>')));
  const headRest = rootify(SHELL.slice(SHELL.indexOf('<link rel="preconnect"'), SHELL.indexOf('<body>')));
  const headerBlock = rootify(SHELL.slice(SHELL.indexOf('<!-- HEADER -->'), SHELL.indexOf('<!-- HERO -->')));
  const tailBlock = rootify(SHELL.slice(SHELL.indexOf('<!-- QUOTE CTA -->')));
  const meta = '<title>' + esc(c.title) + '</title>\n<meta name="description" content="' + esc(c.desc) + '">\n<meta name="keywords" content="' + esc(c.kw) + '">\n<link rel="canonical" href="' + url + '">\n' +
    '<meta property="og:title" content="' + esc(c.title) + '">\n<meta property="og:description" content="' + esc(c.desc) + '">\n<meta property="og:image" content="' + SITE + '/' + prods[0].image + '">\n<meta property="og:url" content="' + url + '">\n<meta property="og:type" content="website">\n<meta name="twitter:card" content="summary_large_image">\n' + ld + '\n';
  const hero = '<section style="background:#14342C; color:#F7F4EC; padding:clamp(120px,15vw,168px) clamp(20px,4vw,40px) clamp(48px,6vw,72px);"><div style="max-width:1280px; margin:0 auto;">' +
    '<nav aria-label="Breadcrumb" style="font-size:13px; color:#F7F4EC99; margin-bottom:18px;"><a href="index.html" style="color:#F7F4EC99; text-decoration:none;">Home</a> / <a href="products.html" style="color:#F7F4EC99; text-decoration:none;">Products</a> / ' + esc(c.short) + '</nav>' +
    '<h1 style="font-family:Newsreader,serif; font-weight:500; font-size:clamp(34px,5vw,60px); line-height:1.08; letter-spacing:-0.02em; margin:0 0 20px; max-width:900px;">' + esc(c.h1) + '</h1>' +
    '<p style="font-size:clamp(16px,1.4vw,19px); line-height:1.6; color:#F7F4ECcc; max-width:680px; margin:0 0 28px;">' + esc(c.desc) + '</p>' +
    '<a href="contact.html" style="display:inline-flex; background:#6FAF45; color:#14342C; font-weight:600; font-size:15px; padding:15px 26px; border-radius:2px; text-decoration:none;">Get a quote →</a></div></section>';
  const body = '<section style="background:#F7F4EC; padding:clamp(48px,6vw,84px) clamp(20px,4vw,40px) clamp(60px,8vw,110px);"><div style="max-width:1280px; margin:0 auto;">' +
    c.intro.map(pp).join('') + h2('Products in this category') +
    '<div style="display:grid; grid-template-columns:repeat(auto-fill,minmax(280px,1fr)); gap:18px;">' + cards + '</div>' +
    h2('Who buys ' + esc(c.short.toLowerCase()) + ' packaging') + pp(c.who) +
    h2('How to choose the right specification') + pp(c.choose) +
    h2('Certified, made in bulk, supplied across India') +
    pp('Every Packin Club product is made to IS 17088, is CPCB certified, and returns to soil within 240 days under industrial composting conditions. We make to order with a minimum of 100 kg per specification, and ship from Delhi to ' + CITIES + ' and other cities.') +
    h2('Frequently asked questions') + faqHtml +
    '<div style="margin-top:48px; padding-top:24px; border-top:1px solid #14342C18;"><div style="font-size:13px; letter-spacing:0.1em; text-transform:uppercase; color:#8C8579; margin-bottom:10px;">Other categories</div><div>' + others + ' &nbsp;·&nbsp; <a href="products.html" style="color:#C1622D; text-decoration:none; font-weight:600; font-size:14.5px;">All products →</a></div></div>' +
    '</div></section>\n';
  return headTop + meta + headRest + '<body>\n<div class="pc-site" style="overflow-x:hidden; min-height:100vh;">\n\n' + headerBlock + hero + '\n' + body + tailBlock;
}
Object.keys(CATS).forEach(k => { fs.writeFileSync(path.join(ROOT, CATS[k].file), page(k), 'utf8'); console.log('wrote ' + CATS[k].file); });

/* Packin Club, shared product catalogue.
   Loaded as a classic script in <helmet>; exposes window.PACKIN. */
(function () {
  var CATS = {
    AGRI: 'Agriculture & Nursery', ROLL: 'Bags on Roll', HEALTH: 'Healthcare & Hospital',
    HORECA: 'HORECA', IND: 'Industrial', RETAIL: 'Retail', TEMPLE: 'Temple & Religious'
  };
  var SHORT = {
    AGRI: 'Agriculture', ROLL: 'Bags on Roll', HEALTH: 'Healthcare',
    HORECA: 'HORECA', IND: 'Industrial', RETAIL: 'Retail', TEMPLE: 'Temple'
  };

  function slug(name) {
    return name.toLowerCase()
      .replace(/\([^)]*\)/g, ' ')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  // Spec rows common to the entire range.
  function base(extra) {
    var common = [
      ['Base material', 'Corn-starch + PLA + PBAT compostable blend'],
      ['Certification', 'IS 17088 · CPCB certified · EN 13432'],
      ['Compostability', 'Returns to soil within 240 days (industrial)'],
      ['Printing', 'Up to 8-colour flexographic, food-grade inks'],
      ['Shelf life', '12 months from date of manufacture'],
      ['Min. order qty', '100 kg per specification']
    ];
    return (extra || []).concat(common).map(function (r) { return { k: r[0], v: r[1] }; });
  }

  var P = [
    {
      name: 'Compostable Agri Mulch Film', cat: 'AGRI', form: 'film',
      image: 'product_images/agri-mulch-film.jpeg',
      blurb: 'Suppresses weeds and holds soil moisture, then tills back into the earth, no retrieval, no residue.',
      desc: 'A field-grade biodegradable mulch film engineered to perform like conventional polyethylene mulch through a full growing season, then break down in situ. Lay it, plant through it, and till it back into the soil at harvest. There is nothing to lift, collect, or send to landfill, and no microplastic left in your field.',
      features: [
        'Suppresses weed growth without herbicides',
        'Retains soil moisture and stabilises root-zone temperature',
        'Tills directly into soil, zero retrieval labour',
        'Leaves no microplastic residue behind',
        'Available in black, clear, and silver-reflective finishes'
      ],
      specs: base([
        ['Thickness', '15 – 25 microns'],
        ['Roll width', '0.6 m – 2.0 m (made to bed size)'],
        ['Roll length', '400 m – 1000 m'],
        ['Field life', '3 – 6 months (formulated to crop cycle)']
      ]),
      applications: [
        'Vegetable and row-crop beds',
        'Strawberry and melon cultivation',
        'Polyhouse and tunnel farming',
        'Orchard and plantation ground cover'
      ]
    },
    {
      name: 'Compostable Nursery Bags', cat: 'AGRI', form: 'bag',
      image: 'product_images/Nursery-bag.jpg',
      blurb: 'Grow-bags that go straight into the ground at transplant, roots and all.',
      desc: 'Seedling and sapling grow-bags that you plant whole. The bag breaks down in the soil as the plant establishes, so roots are never disturbed at transplant and transplant shock is all but eliminated. A cleaner, faster alternative to single-use polythene nursery sleeves.',
      features: [
        'Plant the whole bag, no transplant shock',
        'Breaks down as roots establish',
        'Breathable walls promote healthy root structure',
        'Eliminates polythene waste at nurseries',
        'Punched drainage holes standard'
      ],
      specs: base([
        ['Sizes', '4"×6" to 10"×12" (custom on request)'],
        ['Thickness', '25 – 50 microns'],
        ['Gusset', 'Bottom-gusseted for fill stability'],
        ['Drainage', 'Pre-punched holes']
      ]),
      applications: [
        'Forestry and reforestation saplings',
        'Vegetable and flower seedlings',
        'Retail nursery and garden centres',
        'Horticulture and landscaping projects'
      ]
    },
    {
      name: 'Compostable Carry Bags on Roll', cat: 'ROLL', form: 'roll',
      image: 'product_images/compostablecarrybag.jpg',
      blurb: 'Perforated carry bags on a roll for fast, fuss-free dispensing at the till.',
      desc: 'Carry bags supplied on a perforated roll for high-throughput counters. Staff tear off one bag at a time with one hand, keeping queues moving while staying fully compliant with single-use-plastic bans. Mount on any standard roll dispenser.',
      features: [
        'One-handed tear-off dispensing',
        'Fits standard counter roll holders',
        'Consistent perforation, clean separation',
        'Compliant with single-use plastic bans',
        'Brandable with up to 8-colour print'
      ],
      specs: base([
        ['Bag size', '10"×14" to 16"×20"'],
        ['Bags per roll', '250 – 500'],
        ['Thickness', '20 – 40 microns'],
        ['Core', '1.5" cardboard core']
      ]),
      applications: [
        'Supermarket and grocery checkouts',
        'Produce and bakery sections',
        'Pharmacy and convenience counters',
        'Quick-service retail tills'
      ]
    },
    {
      name: 'Compostable Garbage Bag on Roll', cat: 'ROLL', form: 'roll',
      image: 'product_images/garbage-bag-roll.jpg',
      blurb: 'Leak-resistant bin liners on a roll for busy kitchens and facilities.',
      desc: 'Bin liners on a perforated roll for kitchens, offices, and facilities that get through a lot of them. Leak-resistant seams hold wet waste, and the whole liner composts with its contents in an industrial facility, no separating the bag from the food scraps.',
      features: [
        'Leak-resistant heat-sealed base',
        'Composts together with organic waste',
        'Perforated roll for quick replacement',
        'Sized to standard bins',
        'Available in multiple colours for waste segregation'
      ],
      specs: base([
        ['Bag size', '19"×21" to 30"×37"'],
        ['Bags per roll', '15 – 30'],
        ['Thickness', '30 – 51 microns'],
        ['Seal', 'Heat-sealed leak-resistant base']
      ]),
      applications: [
        'Commercial and home kitchens',
        'Offices and co-working spaces',
        'Hotels and facility management',
        'Municipal wet-waste collection'
      ]
    },
    {
      name: 'Compostable Grocery Bags on Roll', cat: 'ROLL', form: 'roll',
      image: 'product_images/GroceryBags.jpg',
      blurb: 'Tear-off grocery bags on a roll for produce sections and checkouts.',
      desc: 'Lightweight produce and grocery bags on a roll, positioned right where shoppers reach for loose fruit and veg. Tear off, fill, and weigh, the bag is food-safe, breathable, and fully compostable, so it can go into the green bin with peels and trimmings.',
      features: [
        'Food-contact safe',
        'Breathable, reduces produce sweating',
        'Easy tear-off at point of use',
        'Composts with food waste',
        'Mountable on hanging or counter dispensers'
      ],
      specs: base([
        ['Bag size', '8"×12" to 12"×16"'],
        ['Bags per roll', '300 – 600'],
        ['Thickness', '15 – 25 microns'],
        ['Core', '1.5" cardboard core']
      ]),
      applications: [
        'Loose-produce and fruit sections',
        'Bakery and deli counters',
        'Bulk and refill stores',
        'Farmers markets'
      ]
    },
    {
      name: 'Compostable Medical Waste Bags', cat: 'HEALTH', form: 'bag',
      image: 'product_images/medical_waste_bag.jpg',
      blurb: 'Colour-coded, compliant bags for the safe handling of non-hazardous clinical waste.',
      desc: 'Colour-coded biomedical waste bags for the segregation and safe handling of non-hazardous clinical waste, made to a compostable specification. Strong seams and a high load rating meet the demands of hospital waste streams while reducing the plastic burden of healthcare facilities.',
      features: [
        'Colour-coded for BMWM segregation',
        'High puncture and tear resistance',
        'Leak-proof heat-sealed seams',
        'Printable with biohazard markings',
        'Compostable alternative to LDPE liners'
      ],
      specs: base([
        ['Colours', 'Yellow · Red · Blue (as per protocol)'],
        ['Sizes', '19"×21" to 33"×39"'],
        ['Thickness', '50 – 75 microns'],
        ['Compliance', 'Made for BMWM 2016 segregation']
      ]),
      applications: [
        'Hospitals and nursing homes',
        'Clinics and diagnostic labs',
        'Pharmaceutical facilities',
        'Veterinary practices'
      ]
    },
    {
      name: 'Compostable Bamboo Tissue', cat: 'HORECA', form: 'tissue',
      image: 'product_images/Bamboo_tissue.jpeg',
      blurb: 'Soft, strong bamboo-pulp tissue for tables and washrooms, plastic- and chlorine-free.',
      desc: 'Tissue made from fast-renewing bamboo pulp, soft, surprisingly strong, and free of plastic wrap and chlorine bleaching. From napkins to washroom rolls, it delivers the comfort guests expect while keeping your back-of-house waste fully compostable.',
      features: [
        'Made from fast-renewing bamboo pulp',
        'Chlorine- and BPA-free',
        'Plastic-free paper outer wrap',
        'Soft yet high wet-strength',
        'Available as napkins, rolls, and facials'
      ],
      specs: base([
        ['Ply', '1, 2, and 3-ply options'],
        ['Sheet size', '30 × 30 cm (napkin)'],
        ['GSM', '17 – 23 GSM per ply'],
        ['Packing', 'Paper-wrapped, plastic-free']
      ]),
      applications: [
        'Restaurants and cafés',
        'Hotel rooms and washrooms',
        'Corporate pantries and offices',
        'Event and banquet catering'
      ]
    },
    {
      name: 'Compostable Bread Pouch', cat: 'HORECA', form: 'pouch',
      image: 'product_images/Bread_pouch.jpg',
      blurb: 'Keeps loaves fresh and breathable, then composts along with the crumbs.',
      desc: 'A breathable bread and bakery pouch that keeps loaves fresh without trapping moisture and going soggy. Crystal clear for shelf appeal, food-contact safe, and fully compostable, so day-old bread and its bag can go into the same green bin.',
      features: [
        'Breathable, keeps crust crisp',
        'High-clarity for shelf display',
        'Food-contact safe',
        'Re-closable or heat-sealable formats',
        'Composts with bakery waste'
      ],
      specs: base([
        ['Sizes', 'Standard loaf, baguette, and bun packs'],
        ['Thickness', '20 – 30 microns'],
        ['Seal', 'Side-seal with optional tin-tie'],
        ['Window', 'Full-clarity body']
      ]),
      applications: [
        'Artisan and retail bakeries',
        'Supermarket in-store bakery',
        'Cafés and patisseries',
        'Home and cloud bakeries'
      ]
    },
    {
      name: 'Compostable Cling Film', cat: 'HORECA', form: 'film',
      image: 'product_images/compostable-cling-film.jpeg',
      blurb: 'Clings and seals like conventional wrap, without the petroleum plastic.',
      desc: 'A compostable cling wrap that clings, stretches, and seals to bowls and trays the way kitchen teams expect, minus the petroleum plastic. Food-safe and microwave-friendly, it covers prep and storage without leaving PVC behind.',
      features: [
        'Genuine cling and stretch',
        'Food-contact safe',
        'Microwave-friendly',
        'Cutter-box or bulk roll formats',
        'No PVC, no plasticisers'
      ],
      specs: base([
        ['Roll width', '300 mm / 450 mm'],
        ['Roll length', '30 m – 300 m'],
        ['Thickness', '9 – 12 microns'],
        ['Format', 'Cutter box or catering roll']
      ]),
      applications: [
        'Commercial kitchen mise-en-place',
        'Deli and takeaway counters',
        'Catering and banquet prep',
        'Retail fresh-food wrapping'
      ]
    },
    {
      name: 'Compostable Hot Liquid Pouches', cat: 'HORECA', form: 'pouch',
      image: 'product_images/hot-liquid-pouches.jpeg',
      blurb: 'Hold hot soups, curries, and beverages without leaching or leaking.',
      desc: 'Heat-tolerant pouches built to hold hot soups, curries, gravies, and beverages without leaching, softening, or leaking. A compostable answer to the plastic-lined parcel bag for cloud kitchens and delivery-first menus.',
      features: [
        'Holds liquids up to 95°C',
        'Leak-proof reinforced seals',
        'No chemical leaching into food',
        'Stand-up and flat-pouch formats',
        'Spout and zip options available'
      ],
      specs: base([
        ['Capacity', '250 ml – 1000 ml'],
        ['Heat tolerance', 'Up to 95°C'],
        ['Seal', 'Triple-layer leak-proof seal'],
        ['Format', 'Stand-up / flat / spouted']
      ]),
      applications: [
        'Cloud kitchens and food delivery',
        'Soup, curry, and gravy takeaway',
        'Hot beverage and chai service',
        'Catering and tiffin services'
      ]
    },
    {
      name: 'Compostable PLA Coated Paper Cups', cat: 'HORECA', form: 'cup',
      image: 'product_images/PLA-coated-cups.jpg',
      blurb: 'PLA-lined cups for hot and cold drinks, fully compostable, no plastic film.',
      desc: 'Paper cups lined with plant-based PLA instead of polyethylene, so the whole cup composts cleanly, no plastic film to peel away first. Rated for hot and cold service and printable to your brand, they are the drop-in replacement for the standard PE-lined cup.',
      features: [
        'Plant-based PLA lining, not PE',
        'Fully compostable, no plastic film',
        'Rated for hot and cold beverages',
        'Single and double-wall options',
        'Compatible with compostable lids'
      ],
      specs: base([
        ['Capacity', '120 ml – 500 ml'],
        ['Wall', 'Single or double-wall'],
        ['Lining', 'PLA (corn-based) bioplastic'],
        ['Lids', 'Matching CPLA / paper lids available']
      ]),
      applications: [
        'Coffee shops and cafés',
        'QSR and food courts',
        'Office pantries and events',
        'Juice and cold-beverage bars'
      ]
    },
    {
      name: 'Compostable Tiffin Sheet', cat: 'HORECA', form: 'film',
      image: 'product_images/Compostable-Tiffin-sheet.jpeg',
      blurb: 'Food-grade liner sheets for tiffins, rotis, and takeaway.',
      desc: 'Food-grade liner sheets for wrapping rotis, parathas, and packing tiffins and takeaway. Non-stick, grease-resistant, and compostable, they keep food fresh and hands clean without the foil or plastic film.',
      features: [
        'Food-grade, grease-resistant surface',
        'Non-stick, food peels away clean',
        'Keeps rotis soft and fresh',
        'Cut-sheet or roll formats',
        'Composts with food waste'
      ],
      specs: base([
        ['Sheet size', '30×30 cm to 40×40 cm'],
        ['Format', 'Pre-cut sheets or roll'],
        ['Thickness', '12 – 18 microns'],
        ['Finish', 'Non-stick food-grade']
      ]),
      applications: [
        'Tiffin and meal-delivery services',
        'Roti and paratha wrapping',
        'Takeaway and parcel counters',
        'Home and commercial kitchens'
      ]
    },
    {
      name: 'Compostable Electrical Wire Packaging Wrap', cat: 'IND', form: 'film',
      image: 'product_images/compostable-wire-wrap.jpeg',
      blurb: 'Protective wrap for spooled wire and cable, certified to compost.',
      desc: 'A tough protective wrap for spooled wire, cable, and coiled industrial goods. It bundles and shields product through storage and transit, then composts at end of life, letting manufacturers cut plastic from their packaging line without compromising protection.',
      features: [
        'High tensile and tear strength',
        'Dust and abrasion protection',
        'Conforms tightly to coils and spools',
        'Printable for branding and SKU info',
        'Compostable end-of-life'
      ],
      specs: base([
        ['Roll width', '200 mm – 1000 mm'],
        ['Thickness', '25 – 50 microns'],
        ['Tensile', 'High machine-direction strength'],
        ['Format', 'Sheet or roll']
      ]),
      applications: [
        'Wire and cable manufacturing',
        'Electrical component packing',
        'Coiled and spooled goods',
        'Industrial export packaging'
      ]
    },
    {
      name: 'Compostable Garbage Bags', cat: 'IND', form: 'bag',
      image: 'product_images/garbage_bags.jpg',
      blurb: 'Sturdy bin bags that hold the load, and break down after.',
      desc: 'Heavy-duty bin bags rated for real industrial and municipal loads, they hold the weight, resist tearing, and then break down in composting rather than persisting in landfill. Available across a full size and gauge range for every bin in the building.',
      features: [
        'High load and tear rating',
        'Leak-resistant sealed base',
        'Full size and gauge range',
        'Colour options for waste segregation',
        'Composts in industrial facilities'
      ],
      specs: base([
        ['Sizes', '17"×19" to 36"×45"'],
        ['Thickness', '30 – 75 microns'],
        ['Load rating', 'Up to 15 kg (size-dependent)'],
        ['Packing', 'Flat-pack or rolls']
      ]),
      applications: [
        'Facility and building management',
        'Municipal solid-waste collection',
        'Industrial and warehouse waste',
        'Events and public spaces'
      ]
    },
    {
      name: 'Compostable Shrink Film', cat: 'IND', form: 'film',
      image: 'product_images/shrink-film.jpeg',
      blurb: 'Shrinks tight around multipacks and trays, then composts away.',
      desc: 'A heat-shrinkable film that pulls tight around multipacks, trays, and bundled product for a secure, tamper-evident finish, then composts at end of life. A direct replacement for conventional shrink wrap on existing tunnel lines.',
      features: [
        'Tight, uniform shrink finish',
        'Tamper-evident bundling',
        'Runs on standard shrink tunnels',
        'High clarity for product visibility',
        'Compostable end-of-life'
      ],
      specs: base([
        ['Thickness', '19 – 30 microns'],
        ['Shrink ratio', 'Up to 70%'],
        ['Roll width', 'Made to pack size'],
        ['Compatibility', 'Standard shrink tunnels']
      ]),
      applications: [
        'Beverage and FMCG multipacks',
        'Tray and case bundling',
        'Printing and stationery packs',
        'Retail-ready packaging'
      ]
    },
    {
      name: 'Compostable Stretch Film', cat: 'IND', form: 'roll',
      image: 'product_images/compostable-stretch-film.jpeg',
      blurb: 'Compostable pallet wrap for end-of-line bundling and logistics.',
      desc: 'Pallet stretch wrap with the cling and load-retention of conventional film, formulated to compost. It secures loads through warehousing and transit and removes a major source of single-use plastic from the logistics chain.',
      features: [
        'High stretch and cling',
        'Strong load retention on pallets',
        'Hand and machine grades',
        'Puncture-resistant',
        'Compostable end-of-life'
      ],
      specs: base([
        ['Roll width', '250 mm / 500 mm'],
        ['Thickness', '17 – 25 microns'],
        ['Stretch', 'Up to 250%'],
        ['Grade', 'Hand or machine']
      ]),
      applications: [
        'Pallet and load unitising',
        'Warehouse and 3PL operations',
        'Export and freight bundling',
        'End-of-line packaging'
      ]
    },
    {
      name: 'Compostable Carry Bags (W-cut, U-cut)', cat: 'RETAIL', form: 'bag',
      image: 'product_images/CompostableCarrybagSizes(U-Wcut).jpg',
      blurb: 'Everyday retail carry bags in W- and U-cut styles, sized for any counter.',
      desc: 'The everyday retail carry bag, in classic W-cut and U-cut handle styles and a full size range. Strong enough for a real shopping load, fully compliant with single-use-plastic rules, and printable so your brand travels home with the customer.',
      features: [
        'W-cut and U-cut handle styles',
        'Full size range for any counter',
        'Strong handles and seams',
        'Up to 8-colour brand printing',
        'Single-use-plastic-ban compliant'
      ],
      specs: base([
        ['Styles', 'W-cut · U-cut'],
        ['Sizes', '8"×10" to 16"×20"'],
        ['Thickness', '20 – 50 microns'],
        ['Load rating', 'Up to 5 kg (size-dependent)']
      ]),
      applications: [
        'Apparel and footwear retail',
        'Grocery and kirana stores',
        'Pharmacy and convenience',
        'General merchandise counters'
      ]
    },
    {
      name: 'Compostable Courier Bags / Mailers', cat: 'RETAIL', form: 'bag',
      image: 'product_images/mailer_bags.jpg',
      blurb: 'Tamper-evident e-commerce mailers with a self-seal strip and write-on surface.',
      desc: 'E-commerce mailers built for the warehouse: a peel-and-seal adhesive strip, a tamper-evident closure, and a matte write-on surface for labels and notes. Opaque, water-resistant, and fully compostable, the sustainable upgrade to the standard poly mailer.',
      features: [
        'Permanent self-seal adhesive strip',
        'Tamper-evident closure',
        'Matte write-on surface',
        'Opaque and water-resistant',
        'Compostable poly-mailer replacement'
      ],
      specs: base([
        ['Sizes', '9"×12" to 16"×20" (+ custom)'],
        ['Thickness', '50 – 60 microns'],
        ['Closure', 'Peel-and-seal + tamper-evident lip'],
        ['Finish', 'Matte, write-on, opaque']
      ]),
      applications: [
        'E-commerce and D2C fulfilment',
        'Apparel and accessories shipping',
        'Subscription and gift boxes',
        'Returns and reverse logistics'
      ]
    },
    {
      name: 'Compostable D-Cut Shopping Bags', cat: 'RETAIL', form: 'bag',
      image: 'product_images/Compostable_D-Cut-Shopping-Bags.jpg',
      blurb: 'Premium D-cut shoppers with a clean, brandable finish.',
      desc: 'A premium D-cut shopping bag with a clean die-cut handle and a smooth, brandable face that feels closer to fabric than film. Made for boutiques, gifting, and any counter where the bag is part of the brand experience.',
      features: [
        'Clean D-cut die handle',
        'Premium fabric-like finish',
        'Excellent print surface',
        'Comfortable to carry',
        'Compostable and SUP-compliant'
      ],
      specs: base([
        ['Sizes', '10"×13" to 14"×18"'],
        ['Thickness', '40 – 60 microns'],
        ['Handle', 'Reinforced D-cut'],
        ['Finish', 'Matte fabric-like']
      ]),
      applications: [
        'Boutiques and fashion retail',
        'Gifting and hampers',
        'Salons and lifestyle stores',
        'Events and exhibitions'
      ],
      price: 250, oldPrice: 300
    },
    {
      name: 'Compostable Garment Bags', cat: 'RETAIL', form: 'bag',
      image: 'product_images/Garment--Bags.jpg',
      blurb: 'Breathable garment covers that protect apparel in transit and storage.',
      desc: 'Breathable garment covers that protect apparel from dust and damage in transit and storage, without trapping moisture. Clear for easy identification and fully compostable, a clean replacement for the polythene suit and dress cover.',
      features: [
        'Breathable, no trapped moisture',
        'Dust and snag protection',
        'High clarity for identification',
        'Hanger-hole and gusset options',
        'Compostable end-of-life'
      ],
      specs: base([
        ['Sizes', 'Shirt, suit, and gown lengths'],
        ['Thickness', '15 – 25 microns'],
        ['Format', 'On-roll or pre-cut with hanger hole'],
        ['Finish', 'Clear or frosted']
      ]),
      applications: [
        'Apparel manufacturing and export',
        'Dry cleaners and laundries',
        'Bridal and formalwear stores',
        'Uniform and workwear suppliers'
      ]
    },
    {
      name: 'Compostable Grocery Bags', cat: 'RETAIL', form: 'bag',
      image: 'product_images/biodegradable-grocery-bag-roll.jpg',
      blurb: 'Reliable grocery carriers for fresh produce and daily shopping.',
      desc: 'Dependable grocery carriers sized and gauged for a real weekly shop, fresh produce, packaged goods, and everything in between. Food-contact safe and fully compostable, they take the place of the everyday polythene grocery bag.',
      features: [
        'Strong base and handles',
        'Food-contact safe',
        'Full daily-shop size range',
        'Printable for store branding',
        'Single-use-plastic-ban compliant'
      ],
      specs: base([
        ['Sizes', '10"×14" to 16"×20"'],
        ['Thickness', '25 – 50 microns'],
        ['Load rating', 'Up to 6 kg (size-dependent)'],
        ['Handle', 'W-cut, U-cut, or loop']
      ]),
      applications: [
        'Supermarkets and grocery chains',
        'Kirana and provision stores',
        'Organic and refill stores',
        'Daily-needs retail'
      ]
    },
    {
      name: 'Compostable Loop Handle Bags', cat: 'RETAIL', form: 'bag',
      image: 'product_images/compostable-Loop-Handle-bags.jpeg',
      blurb: 'Premium loop-handle bags for retail and gifting, with a refined feel.',
      desc: 'Loop-handle bags with a soft, comfortable carry and a refined, fabric-like body, the premium choice for retail and gifting. The flexible loop handle is heat-welded for strength, and the whole bag composts at end of life.',
      features: [
        'Soft, comfortable loop handles',
        'Heat-welded handle strength',
        'Premium fabric-like body',
        'Excellent print and finish',
        'Compostable and SUP-compliant'
      ],
      specs: base([
        ['Sizes', '10"×14" to 15"×18"'],
        ['Thickness', '40 – 60 microns'],
        ['Handle', 'Heat-welded flexi-loop'],
        ['Finish', 'Matte premium']
      ]),
      applications: [
        'Premium retail and boutiques',
        'Gifting and corporate hampers',
        'Restaurants and takeaway',
        'Events and brand activations'
      ]
    },
    {
      name: 'Compostable Pet Poop Bags', cat: 'RETAIL', form: 'bag',
      image: 'product_images/Pet-Poop-Bags.jpg',
      blurb: "Strong, leak-proof waste bags that don't outlive the walk.",
      desc: "Strong, leak-proof pet-waste bags that do their one job cleanly and then break down, instead of sitting in landfill for centuries after a five-minute walk. Supplied on tidy tear-off rolls that fit standard dispensers.",
      features: [
        'Leak-proof and odour-resistant',
        'Easy-open, easy-tie',
        'Tear-off rolls for dispensers',
        'Fits standard leash clips',
        'Composts in industrial facilities'
      ],
      specs: base([
        ['Bag size', '9"×13"'],
        ['Bags per roll', '15 – 20'],
        ['Thickness', '18 – 25 microns'],
        ['Packing', 'Rolls in retail cartons']
      ]),
      applications: [
        'Pet stores and vet clinics',
        'Dog-walking and pet services',
        'Parks and public spaces',
        'Pet-owner retail and D2C'
      ]
    },
    {
      name: 'Compostable Prasadam Pouches', cat: 'TEMPLE', form: 'pouch',
      image: 'product_images/Prasadam-Pouches.png',
      blurb: 'Food-safe pouches for temple prasadam and offerings.',
      desc: 'Food-safe pouches for distributing temple prasadam and offerings to devotees, clean, dignified, and fully compostable, so high-footfall festivals and daily darshan generate no plastic waste. Printable with temple branding and motifs.',
      features: [
        'Food-contact safe',
        'Dignified, clean presentation',
        'Printable with temple motifs',
        'Heat-sealable or fold-close',
        'Composts with food offerings'
      ],
      specs: base([
        ['Sizes', '4"×6" to 8"×10"'],
        ['Thickness', '20 – 35 microns'],
        ['Seal', 'Side-seal, optional zip'],
        ['Print', 'Custom temple branding']
      ]),
      applications: [
        'Temples and religious trusts',
        'Festival and event distribution',
        'Langar and bhandara services',
        'Pilgrimage and yatra logistics'
      ]
    }
  ];

  P.forEach(function (p) {
    p.slug = slug(p.name);
    p.catName = CATS[p.cat];
    p.catShort = SHORT[p.cat];
    p.price = p.price || null;
    p.oldPrice = p.oldPrice || null;
  });

  window.PACKIN = {
    products: P,
    cats: CATS,
    short: SHORT,
    bySlug: function (s) { return P.filter(function (p) { return p.slug === s; })[0] || null; },
    slug: slug
  };
})();
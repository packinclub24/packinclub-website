/* Packin Club, SEO blog catalogue.
   Loaded as a classic script in <helmet>; exposes window.PACKIN_BLOG.
   Content is informational/commercial intent, written for organic search.
   PackinClub is positioned as a "provider / supplier", never as a manufacturer. */
(function () {
  function slug(s) {
    return s.toLowerCase().replace(/&/g, ' and ').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  }

 var POSTS = [
    {
      title: 'Compostable vs Biodegradable Packaging: What\u2019s the Real Difference?',
      cat: 'Guides',
      keyword: 'compostable vs biodegradable packaging',
      secondaryKeywords: ['difference between compostable and biodegradable', 'IS 17088 certified packaging', 'certified compostable packaging India', 'is biodegradable plastic compostable'],
      date: '2025-02-04',
      readMins: 7,
      author: 'Packin Club Editorial',
      excerpt: '\u201CBiodegradable\u201D and \u201Ccompostable\u201D get used as if they mean the same thing on packaging labels. They don\u2019t \u2014 and the gap between them decides whether your packaging turns into soil or into microplastic.',
      metaTitle: 'Compostable vs Biodegradable Packaging: Which One Is Real?',
      metaDescription: 'Confused by compostable vs biodegradable packaging labels? Here\u2019s the real difference, what IS 17088 certification actually checks, and which one your business should buy.',
      takeaways: [
        '\u201CBiodegradable\u201D has no fixed timeline or test \u2014 almost anything qualifies eventually, which is exactly why the word gets misused.',
        '\u201CCompostable\u201D is a certified, tested claim: the material has to become CO\u2082, water and humus within a set window, with nothing toxic left behind.',
        'In India, that certification is IS 17088. Globally, the equivalents are EN 13432 and ASTM D6400.',
        'If you\u2019re buying packaging to defend a sustainability claim or stay ahead of plastic-ban enforcement, certified compostable is the only version worth paying for.'
      ],
      body: [
        { p: ['Walk down any packaging aisle, or scroll any B2B supplier catalogue, and you\u2019ll see \u201Ccompostable\u201D and \u201Cbiodegradable\u201D sitting next to each other like synonyms. Sometimes they\u2019re even printed on the same bag. They\u2019re not interchangeable, and mixing them up is probably the single most common mistake we see businesses make when they first move away from plastic.', 'Getting this right matters for two reasons that have nothing to do with semantics: it protects you from a greenwashing accusation, and it determines whether the packaging you bought actually satisfies India\u2019s single-use plastic rules.'] },
        { h: 'What \u201Cbiodegradable\u201D actually promises', p: ['Here\u2019s the uncomfortable truth about the word \u201Cbiodegradable\u201D: it just means microorganisms can eventually break the material down. That\u2019s it. No law says how long \u201Ceventually\u201D is, no standard sets the conditions required, and nothing specifies what\u2019s left behind once it\u2019s \u201Cdegraded.\u201D A plastic bag that takes 200 years to fragment into smaller plastic pieces can still, technically, wear the label \u201Cbiodegradable.\u201D', 'That\u2019s why the word shows up so often on products that have no business calling themselves eco-friendly. It sounds responsible without the seller ever having to prove anything.'] },
        { h: 'What \u201Ccompostable\u201D actually requires', p: ['Compostable is a different category of claim entirely \u2014 it\u2019s certified and time-bound. To legitimately call something compostable, it has to break down into carbon dioxide, water and nutrient-rich humus inside a defined window, typically around 240 days under industrial composting conditions, and it has to do that without leaving toxic residue or persistent microplastic fragments behind.'], ul: ['A fixed decomposition timeline, not an open-ended \u201Ceventually\u201D', 'Specific temperature, moisture and microbial conditions the material was actually tested against', 'Ecotoxicity testing \u2014 the leftover compost has to be safe enough to grow plants in', 'Third-party certification, not a manufacturer\u2019s own say-so'] },
        { h: 'The certifications actually worth checking for', p: ['A claim is only as trustworthy as the standard backing it. In India, that\u2019s IS 17088, overseen by the CPCB. Internationally, the closest equivalents are EN 13432 in Europe and ASTM D6400 in the US.', 'If a supplier says \u201Ccompostable\u201D but can\u2019t point you to one of these three, that\u2019s worth pausing on. A supplier with a genuine certified product will usually volunteer the certificate before you even ask \u2014 it\u2019s their strongest selling point, so they tend to lead with it.'] },
        { h: 'So which one should you actually buy?', p: ['For nearly every commercial use case we come across \u2014 retail carry bags, courier mailers, food packaging \u2014 certified compostable is the safer bet. It\u2019s verifiable if anyone questions your claims, it holds up against a plastic-ban audit, and it does what your marketing says it does. \u201CBiodegradable\u201D on its own leaves you exposed on both counts.'] }
      ],
      faqs: [
        { q: 'Is biodegradable the same thing as compostable?', a: 'No, and the difference is bigger than it sounds. Every compostable material is biodegradable, but the reverse isn\u2019t true \u2014 most biodegradable materials never meet the stricter, tested, certified bar that \u201Ccompostable\u201D requires.' },
        { q: 'Does India\u2019s plastic ban allow biodegradable plastic?', a: 'Generally not if it\u2019s just fragmenting into microplastics without a certified end point. Certified compostable products meeting IS 17088 are the safer compliance route \u2014 it\u2019s worth checking current CPCB guidance for your specific product category, since enforcement details shift.' },
        { q: 'How do I actually check if packaging is genuinely compostable, not just labeled that way?', a: 'Ask for the certificate \u2014 IS 17088, EN 13432, or ASTM D6400 \u2014 and a stated decomposition timeline. Any supplier selling a genuinely certified product will have this ready to send over, usually within the same conversation.' }
      ]
    },
    {
      title: 'Are Compostable Bags Really Eco-Friendly? An Honest Look',
      cat: 'Sustainability',
      keyword: 'are compostable bags eco friendly',
      secondaryKeywords: ['compostable bags pros and cons', 'compostable bags vs plastic bags environment', 'do compostable bags actually work', 'eco friendly carry bags India'],
      date: '2025-02-18',
      readMins: 6,
      author: 'Packin Club Editorial',
      excerpt: 'Compostable bags get sold as a guilt-free swap for plastic. The real answer is more nuanced than that \u2014 and understanding the nuance is what actually helps you use them well.',
      metaTitle: 'Are Compostable Bags Really Eco-Friendly? An Honest Answer',
      metaDescription: 'A straight answer on whether compostable bags are actually eco-friendly \u2014 the real benefits, the conditions they need to break down properly, and where they fall short.',
      takeaways: [
        'Compostable bags skip the centuries-long persistence and microplastic shedding that conventional plastic bags leave behind.',
        'They deliver their full environmental benefit only when they actually reach the right end-of-life: industrial composting.',
        'Sent to landfill instead, they break down more slowly \u2014 still a better outcome than plastic, just not the best-case outcome.',
        'Pairing a certified compostable bag with clear disposal instructions is what actually makes it eco-friendly in practice, not just on paper.'
      ],
      body: [
        { p: ['It\u2019s a fair question, and honestly a healthy one to ask. \u201CEco-friendly\u201D gets stamped on a lot of things that don\u2019t deserve it, and compostable packaging only earns the label under the right conditions. Here\u2019s the version of the answer we\u2019d give a friend, not a marketing brochure.'] },
        { h: 'What\u2019s genuinely better about them', p: ['Certified compostable bags are usually made from plant-based inputs \u2014 corn starch, PLA, PBAT \u2014 rather than fossil-fuel polyethylene. The real advantages hold up:'], ul: ['They return to soil as humus instead of sitting around for centuries', 'They don\u2019t shed the persistent microplastic fragments that conventional bags leave in soil and waterways', 'The feedstock is renewable, not petroleum-based', 'Certified versions are specifically tested to leave nothing toxic behind'] },
        { h: 'The honest caveat nobody puts on the label', p: ['A compostable bag only reaches its full potential when it\u2019s actually composted \u2014 ideally at an industrial facility that holds the temperature and microbial activity needed to break it down within months.', 'Thrown into a landfill instead, it decomposes far more slowly. That\u2019s still a better outcome than conventional plastic, since it doesn\u2019t leave the same lasting microplastic trail \u2014 it just isn\u2019t the bag\u2019s best-case scenario.'] },
        { h: 'What actually makes them eco-friendly in practice', p: ['The material is only half the story. How the product gets used and disposed of is the other half. Brands that get real environmental value from compostable packaging tend to do three things consistently:'], ul: ['Choose certified compostable products (IS 17088 / EN 13432) instead of vague \u201Cbiodegradable\u201D claims', 'Print clear disposal guidance so the bag actually ends up where it can do its job', 'Work with a supplier who\u2019s upfront about what the product can and can\u2019t do'] },
        { h: 'So, verdict?', p: ['Yes \u2014 certified compostable bags are a meaningfully better choice than conventional plastic, and one you can defend if a customer or regulator asks about it. They\u2019re not a magic fix for waste, and being honest about their end-of-life is part of using them responsibly.'] }
      ],
      faqs: [
        { q: 'Will a compostable bag break down in my backyard compost bin?', a: 'Some are certified for home composting, but a lot of them need the higher, sustained heat of an industrial facility instead. Check the specific product\u2019s certification before assuming.' },
        { q: 'What actually happens if a compostable bag ends up in landfill?', a: 'It breaks down more slowly without proper composting conditions \u2014 but unlike conventional plastic, it isn\u2019t leaving persistent microplastic fragments behind while it does.' },
        { q: 'Are compostable bags actually strong enough for daily use, or do they tear easily?', a: 'Modern certified compostable films hold up well \u2014 they\u2019re engineered to match conventional bags for strength across retail, grocery and courier use.' }
      ]
    },
    {
      title: 'India\u2019s Single-Use Plastic Ban: A Practical Compliance Guide for Businesses',
      cat: 'Compliance',
      keyword: 'single use plastic ban india compliance',
      secondaryKeywords: ['India plastic ban list of items', 'single use plastic ban business guide', 'plastic ban penalty India', 'compostable alternatives to banned plastic'],
      date: '2025-03-03',
      readMins: 9,
      author: 'Packin Club Editorial',
      excerpt: 'The ban is already in force, and enforcement keeps tightening. Here\u2019s what it actually covers, what it means for your packaging line, and how to switch without stalling operations.',
      metaTitle: 'India\u2019s Plastic Ban: A Business Compliance Guide That Skips the Jargon',
      metaDescription: 'What India\u2019s single-use plastic ban actually bans, what the penalties look like, and a practical, phased way for businesses to switch to compliant packaging.',
      takeaways: [
        'The ban targets a defined list of single-use plastic items and sets minimum thickness rules for carry bags.',
        'Non-compliance carries real financial penalties, plus the reputational cost of being named publicly.',
        'Certified compostable alternatives give you the most future-proof, defensible compliance position.',
        'A phased approach \u2014 audit, prioritise, substitute \u2014 lets you switch without disrupting day-to-day operations.'
      ],
      body: [
        { p: ['India\u2019s move against single-use plastic is one of the bigger packaging shifts the country has seen. For most businesses, the question stopped being whether to adapt a while ago \u2014 it\u2019s now just how quickly and how smoothly. Here\u2019s the practical version of what you need to know.', 'One caveat worth stating upfront: rules evolve and enforcement varies by state, so always confirm the current position with official CPCB notifications for your specific product line before making a final call.'] },
        { h: 'What\u2019s actually covered', p: ['The ban targets specific single-use plastic items \u2014 the ones with low utility and a high tendency to end up as litter \u2014 alongside thickness rules for plastic carry bags. The categories that come up most often for businesses include:'], ul: ['Lightweight plastic carry bags below the mandated thickness', 'Plastic cutlery, plates, cups and straws across many food-service contexts', 'Certain plastic wrapping and films', 'A range of disposable plastic service-ware items'] },
        { h: 'What it actually costs to get wrong', p: ['Enforcement isn\u2019t just theoretical \u2014 it includes financial penalties, stock seizure, and increasingly, public reputational fallout. For a consumer-facing brand, being named for non-compliance in local media or social channels can end up costing a lot more than the fine itself.'] },
        { h: 'Why compostable tends to be the safer long-term bet', p: ['Businesses generally have three real paths here: reuse models, recyclable materials, or certified compostable alternatives. Compostable packaging is often the most practical drop-in replacement, because it keeps the convenience customers already expect while matching the actual intent behind the ban.', 'The key detail: a product certified to IS 17088 gives you a documented, defensible compliance position \u2014 not just a hopeful one you\u2019re guessing will hold up.'] },
        { h: 'A phased switch that won\u2019t derail operations', p: ['You don\u2019t need to overhaul everything in one week. A staged approach tends to work better in practice:'], ul: ['Audit \u2014 list out every plastic SKU currently in use', 'Prioritise \u2014 start with the highest-risk, highest-volume items first', 'Substitute \u2014 match each one to a certified compostable equivalent', 'Trial \u2014 test it on your real packing lines before rolling out fully', 'Communicate \u2014 tell customers about the switch, since it doubles as a brand story'] },
        { h: 'Getting samples and specs without the back-and-forth', p: ['The fastest way to de-risk a switch is to trial actual samples on your real operations, not just read a spec sheet. A supplier that\u2019s worth your time will match your existing sizes and volumes and send over specifications and certifications upfront, before you\u2019ve even placed a trial order.'] }
      ],
      faqs: [
        { q: 'Is compostable packaging exempt from the plastic ban, or do I still need to check something?', a: 'Certified compostable products meeting IS 17088 are generally intended as a compliant alternative to banned single-use plastics \u2014 but it\u2019s worth confirming current CPCB guidance for your exact product before assuming full exemption.' },
        { q: 'What\u2019s the minimum thickness allowed for plastic carry bags right now?', a: 'Thickness rules have tightened across several notifications, and honestly, a lot of businesses just skip tracking the moving target and switch to certified compostable carry bags instead, which sidesteps the issue entirely.' },
        { q: 'Realistically, how long does switching a business over to compostable packaging take?', a: 'With a phased audit-and-substitute approach and a responsive supplier, most businesses get their core items switched over within a few weeks, not months.' }
      ]
    },
    {
      title: 'What Is IS 17088? Compostable Plastic Certification Explained',
      cat: 'Certification',
      keyword: 'IS 17088 certification explained',
      secondaryKeywords: ['IS 17088 vs EN 13432', 'what does IS 17088 test', 'CPCB compostable certification', 'how to verify compostable packaging certificate'],
      date: '2025-03-17',
      readMins: 6,
      author: 'Packin Club Editorial',
      excerpt: 'IS 17088 is the Indian standard that separates genuinely compostable packaging from a marketing claim. Here\u2019s exactly what it tests and why it should matter to whoever\u2019s signing the purchase order.',
      metaTitle: 'What Is IS 17088? The Compostable Certification Explained Simply',
      metaDescription: 'IS 17088 explained in plain terms: what the Indian compostable plastics standard actually tests, how it compares to EN 13432, and how to verify a supplier\u2019s claim.',
      takeaways: [
        'IS 17088 is India\u2019s standard for compostable plastics, broadly aligned with international norms.',
        'It tests disintegration, biodegradation and ecotoxicity together \u2014 not just one of the three.',
        'A certified product is your best proof against a greenwashing accusation and your strongest case for plastic-ban compliance.',
        'Always ask a supplier to actually show you the certificate, not just repeat the claim.'
      ],
      body: [
        { p: ['When a packaging product calls itself compostable in India, IS 17088 is the standard that\u2019s supposed to back that claim up. Knowing what it actually covers turns you into a much sharper buyer \u2014 and it\u2019s a five-minute read, not a legal deep-dive.'] },
        { h: 'The standard, in one line', p: ['IS 17088 lays out the requirements and test methods for plastics designed to be composted. It\u2019s broadly aligned with international standards like EN 13432 and ASTM D6400, so a product certified to it is speaking a language that global buyers already recognise.'] },
        { h: 'What it\u2019s actually testing for', p: ['Certification here isn\u2019t a single pass/fail checkbox. A material has to satisfy several distinct criteria at once:'], ul: ['Biodegradation \u2014 the material has to convert to CO\u2082 at a defined rate within a set period', 'Disintegration \u2014 it has to physically break apart, with no visible fragments left', 'Ecotoxicity \u2014 the resulting compost has to be safe enough to support healthy plant growth', 'Heavy-metal and chemical limits \u2014 kept controlled so the residue stays clean'] },
        { h: 'Why this actually matters to you, not just the supplier', p: ['Two reasons. First, compliance \u2014 a certified product gives you a documented basis for meeting single-use plastic rules, instead of a hope. Second, trust \u2014 certification is your defence if anyone accuses your packaging of greenwashing, since the claim has been independently verified rather than self-declared.'] },
        { h: 'How to actually verify a supplier\u2019s claim', p: ['Treat the certificate as the source of truth, not the marketing copy around it. A supplier worth buying from will share their IS 17088 documentation without hesitation and can explain the test conditions if you ask. If a supplier hedges, delays, or can\u2019t produce it \u2014 that silence tells you what you need to know.'] }
      ],
      faqs: [
        { q: 'Is IS 17088 basically the same thing as EN 13432?', a: 'They\u2019re closely aligned and test the same core properties. EN 13432 is Europe\u2019s standard, IS 17088 is India\u2019s, and the two are broadly compatible with each other.' },
        { q: 'If a product is IS 17088 certified, does that mean it composts at home?', a: 'Not automatically. The standard mainly addresses industrial composting conditions. Home-compostability is a separate, additional certification you\u2019d need to check for specifically.' },
        { q: 'Who actually issues IS 17088 certification, and can I check it independently?', a: 'It\u2019s administered through recognised certification bodies with CPCB oversight. A legitimate supplier should be able to provide the certificate on request \u2014 don\u2019t take a verbal claim at face value.' }
      ]
    },
    {
      title: 'Compostable Courier Bags for E-commerce: The Complete Guide',
      cat: 'E-commerce',
      keyword: 'compostable courier bags for ecommerce',
      secondaryKeywords: ['compostable mailers India', 'eco friendly courier bags for online store', 'compostable poly mailer alternative', 'sustainable packaging for D2C brands'],
      date: '2025-03-31',
      readMins: 8,
      author: 'Packin Club Editorial',
      excerpt: 'The mailer is the most visible piece of packaging your customer ever touches. Here\u2019s how compostable courier bags actually hold up, where they save you money, and what to check before you order.',
      metaTitle: 'Compostable Courier Bags for E-commerce: A Complete Buying Guide',
      metaDescription: 'Compostable courier bags for online brands, explained: strength, tamper-evidence, sizing, branding, real cost comparisons, and how to switch from poly mailers.',
      takeaways: [
        'Compostable mailers match poly mailers on strength, opacity and tamper-evidence \u2014 the performance gap most people worry about isn\u2019t really there anymore.',
        'For ecommerce, they double as an unmissable, low-cost brand signal, since the mailer arrives before the product does.',
        'Look for a self-seal strip, a write-on surface, and a stated certification before you commit to an order.',
        'Switching is easier than it sounds when a supplier matches your existing sizes instead of forcing you into new ones.'
      ],
      body: [
        { p: ['For an online brand, the courier bag is the first physical thing a customer actually holds \u2014 it\u2019s packaging and marketing happening at the same moment. Indian ecommerce brands are increasingly replacing traditional poly mailers with certified compostable courier bags, both to cut plastic dependency and to meet customer expectations that have shifted noticeably in the last couple of years.'] },
        { h: 'Do compostable mailers actually perform, or is that a claim?', p: ['They genuinely do. Modern certified compostable mailers are built to handle everything a poly mailer handles:'], ul: ['A tamper-evident, permanent self-seal adhesive strip', 'Opaque, water-resistant construction that protects contents through transit', 'A matte, write-on surface for labels and return notes', 'Strength and puncture-resistance matched to real shipping demands'] },
        { h: 'The brand opportunity most brands underuse', p: ['A compostable mailer is a story your customer unboxes before they even see the product. Print it with your brand and a short line about why you made the switch, and a routine delivery quietly becomes a values signal \u2014 the kind that tends to earn repeat orders and the occasional unboxing post. Conventional plastic just can\u2019t do that work for you.'] },
        { h: 'What to actually check before you order', p: ['Not every \u201Ceco\u201D mailer on the market is equal. A quick checklist that saves you a bad order:'], ul: ['A stated certification (IS 17088 / EN 13432), not just the word \u201Cbiodegradable\u201D on its own', 'Thickness matched to your product weight \u2014 typically 50\u201360 microns for most ecommerce use', 'A seal that\u2019s actually reliable through the courier network, not just in a showroom sample', 'Custom sizing and printing that matches your existing catalogue'] },
        { h: 'How to switch without disrupting your fulfilment flow', p: ['The simplest path: send your supplier your current mailer dimensions and order volumes, request samples, and run them through your real fulfilment process before committing to a full order. A responsive supplier will match your existing sizes so nothing else in your packing workflow has to change.'] }
      ],
      faqs: [
        { q: 'Are compostable courier bags actually strong enough for real shipping, not just light packages?', a: 'Yes \u2014 certified compostable mailers are made to match conventional poly mailers on strength, puncture-resistance and seal reliability, including for heavier or bulkier items.' },
        { q: 'Can I get compostable mailers printed with my own logo and brand colours?', a: 'Yes, most suppliers can custom-print in multiple colours and produce them to your specific sizes.' },
        { q: 'Do compostable mailers cost noticeably more than plastic poly mailers?', a: 'There can be a modest premium, but it\u2019s been shrinking as compostable material supply has matured \u2014 and the brand value and compliance upside often make up the difference for most D2C businesses.' }
      ]
    },
    {
      title: 'How Long Does Compostable Packaging Take to Decompose?',
      cat: 'Guides',
      keyword: 'how long does compostable packaging take to decompose',
      secondaryKeywords: ['compostable packaging decomposition time', 'industrial composting timeline', 'how fast does compostable plastic break down', 'compostable packaging landfill vs compost'],
      date: '2025-04-14',
      readMins: 5,
      author: 'Packin Club Editorial',
      excerpt: 'The honest answer is \u201Cit depends\u201D \u2014 mostly on the material and the conditions it actually ends up in. Here are realistic timelines, not marketing round numbers.',
      metaTitle: 'How Long Does Compostable Packaging Really Take to Decompose?',
      metaDescription: 'Realistic decomposition timelines for compostable packaging \u2014 industrial composting vs home composting vs landfill \u2014 and the four factors that actually control the speed.',
      takeaways: [
        'In industrial composting, certified compostable packaging typically breaks down within roughly 240 days.',
        'Home composting is slower and depends heavily on whether that specific product is certified for it.',
        'Temperature, moisture, oxygen and microbial activity are the four things actually driving the speed.',
        'Even outside ideal conditions, it still avoids the centuries-long persistence that conventional plastic leaves behind.'
      ],
      body: [
        { p: ['\u201CHow long does it actually take?\u201D is the question we get asked more than any other about compostable packaging \u2014 which makes sense, since it\u2019s really the whole point of switching in the first place. Here\u2019s the realistic picture, not the rounded-off version.'] },
        { h: 'The benchmark: industrial composting', p: ['Under the standards governing compostable plastics, the benchmark is decomposition within roughly 240 days \u2014 but only inside an industrial composting environment, one that holds high temperature, controlled moisture, and intense microbial activity. Certified compostable packaging is specifically designed and tested against this window, not against a rough guess.'] },
        { h: 'Home composting takes noticeably longer', p: ['A home compost heap almost never reaches the sustained temperatures an industrial facility maintains, so breakdown is slower and a lot more variable from one household to the next. Some products are specifically certified for home composting; plenty aren\u2019t. The certification tells you which \u2014 the marketing copy usually won\u2019t.'] },
        { h: 'What\u2019s actually controlling the speed', p: ['Four conditions do most of the work here:'], ul: ['Temperature \u2014 heat speeds up microbial breakdown significantly', 'Moisture \u2014 microbes simply need water to function', 'Oxygen \u2014 aerobic composting runs faster and cleaner than anaerobic conditions', 'Microbial activity \u2014 a living, active compost pile breaks material down quicker than a neglected one'] },
        { h: 'And if it ends up in landfill instead?', p: ['Composting conditions are largely absent in a landfill, so breakdown slows down considerably. The key point still holds, though: even there, certified compostable material isn\u2019t leaving the persistent microplastic residue that conventional plastic does over its centuries-long life.'] }
      ],
      faqs: [
        { q: 'Does compostable packaging always break down in 240 days, no matter where it ends up?', a: 'That figure specifically refers to industrial composting conditions. Home composting and landfill both take longer, depending on temperature, moisture and microbial activity in that particular setting.' },
        { q: 'What happens if compostable packaging ends up in the ocean instead?', a: 'It\u2019s not designed for marine degradation specifically, but unlike plastic, it won\u2019t persist as microplastic for centuries. Routing it to proper composting is still the best outcome by a wide margin.' },
        { q: 'Is it better if compostable packaging breaks down faster?', a: 'Not necessarily \u2014 the goal is reliable, complete breakdown into safe humus within the certified window, not the fastest possible disintegration.' }
      ]
    },
    {
      title: 'Compostable Packaging for Restaurants & Cloud Kitchens',
      cat: 'Food Service',
      keyword: 'compostable food packaging for restaurants',
      secondaryKeywords: ['compostable packaging for cloud kitchens', 'eco friendly food delivery packaging', 'compostable takeaway containers India', 'leak proof compostable packaging'],
      date: '2025-04-28',
      readMins: 7,
      author: 'Packin Club Editorial',
      excerpt: 'Food packaging has to survive heat, grease and a bumpy delivery ride \u2014 and then still break down cleanly afterward. Here\u2019s how to pick compostable formats that actually hold up in real kitchens.',
      metaTitle: 'Compostable Food Packaging for Restaurants & Cloud Kitchens',
      metaDescription: 'A practical guide to compostable food packaging for restaurants and cloud kitchens \u2014 cups, containers, pouches and films built to survive heat, grease and delivery.',
      takeaways: [
        'Food service is one of the highest-impact places a business can remove single-use plastic from.',
        'The real challenge isn\u2019t the material itself \u2014 it\u2019s performance under heat, grease and a delivery journey.',
        'PLA-lined cups, hot-liquid pouches and food-grade films are proven, working compostable formats, not experimental ones.',
        'Match each menu item to the right format instead of forcing one packaging type across your whole menu.'
      ],
      body: [
        { p: ['Few sectors generate as much single-use plastic waste as food service, and few are as visible to the customer holding the bag. Compostable packaging is a natural fit here \u2014 but only if it can actually survive hot food, oil, and a rough ride to someone\u2019s front door.'] },
        { h: 'The real test isn\u2019t sustainability \u2014 it\u2019s heat and grease', p: ['Early \u201Ceco\u201D food packaging earned a bad reputation for a simple reason: it failed in actual use. Paper straws went soggy, flimsy boxes leaked through the bottom. Modern certified compostable formats are engineered specifically to survive these stresses \u2014 holding hot liquids, resisting grease, and keeping their shape through a delivery route.'] },
        { h: 'Formats that actually work, item by item', p: ['The trick is matching the format to what\u2019s actually being packed, not using one solution for everything:'], ul: ['PLA-coated paper cups \u2014 for hot and cold drinks, fully compostable with no plastic film to peel off first', 'Hot-liquid pouches \u2014 for soups, curries and gravies that would defeat a standard paper box', 'Food-grade liner sheets \u2014 for rotis, wraps and tiffins', 'Bagasse and moulded-fibre containers \u2014 for rice, biryani and full meals', 'Compostable cutlery and bowls \u2014 for both dine-in and takeaway service'] },
        { h: 'Cloud kitchens are a special case worth calling out', p: ['A delivery-first kitchen lives or dies on the last mile. Leak-proof, heat-tolerant compostable pouches and sealed containers protect both the food and the brand \u2014 a soggy delivery bag undoes everything the kitchen got right in the first ten minutes. Reliability here isn\u2019t a nice-to-have; it\u2019s the actual product the customer is judging you on.'] },
        { h: 'Getting it right before you commit', p: ['Trial samples with your actual dishes before switching your whole menu over, and lean on a supplier who can tell you which format suits which item rather than pushing one product across the board. The goal is packaging your customer never has to think about \u2014 until they notice it composts.'] }
      ],
      faqs: [
        { q: 'Can compostable packaging actually hold hot food and liquids without failing?', a: 'Yes \u2014 formats like PLA-lined cups and hot-liquid pouches are specifically engineered to hold food and beverages at high temperatures without leaching or leaking through.' },
        { q: 'Is compostable food packaging actually food-safe for direct contact?', a: 'Certified compostable food packaging is made to food-contact-safe specifications \u2014 it\u2019s still worth confirming food-grade certification directly with your supplier before large orders.' },
        { q: 'Does switching to compostable food packaging cost noticeably more?', a: 'Costs have come down significantly over the past couple of years. Most operators find the brand and compliance benefits outweigh the remaining price difference.' }
      ]
    },
    {
      title: 'PLA-Coated Paper Cups: Are They Actually Compostable?',
      cat: 'Food Service',
      keyword: 'are pla coated paper cups compostable',
      secondaryKeywords: ['PLA lined cups vs PE lined cups', 'compostable coffee cups India', 'are paper cups recyclable', 'biodegradable cup lining'],
      date: '2025-05-12',
      readMins: 6,
      author: 'Packin Club Editorial',
      excerpt: 'A standard paper cup isn\u2019t recyclable because of the plastic lining hiding inside it. PLA-coated cups fix that problem \u2014 here\u2019s how, and what \u201Ccompostable\u201D actually means once you buy one.',
      metaTitle: 'Are PLA-Coated Paper Cups Actually Compostable? Full Answer',
      metaDescription: 'PLA-coated paper cups explained \u2014 how the plant-based lining differs from PE plastic, whether they\u2019re genuinely compostable, and how to dispose of them correctly.',
      takeaways: [
        'Most conventional \u201Cpaper\u201D cups are actually lined with PE plastic, which is why they\u2019re hard to recycle.',
        'PLA-coated cups swap that lining for a plant-based bioplastic instead.',
        'That swap lets the entire cup be certified compostable \u2014 there\u2019s no plastic film to separate out first.',
        'They still need industrial composting to break down within the certified window, not just any bin.'
      ],
      body: [
        { p: ['Here\u2019s a fact that surprises most people the first time they hear it: the typical disposable \u201Cpaper\u201D coffee cup isn\u2019t really paper all the way through, and it\u2019s not easily recyclable. Understanding why explains exactly what PLA-coated cups are fixing.'] },
        { h: 'The problem hiding inside a conventional paper cup', p: ['To actually hold liquid without collapsing, a standard paper cup gets lined with a thin layer of polyethylene, or PE \u2014 fossil-fuel plastic. That lining is fused directly to the paper, which makes the cup difficult to recycle in practice and means it isn\u2019t compostable at all. Billions end up in landfill every year as a direct result.'] },
        { h: 'How PLA changes the whole equation', p: ['PLA, or polylactic acid, is a bioplastic made from plant sources like corn starch. In a PLA-coated cup, this plant-based lining does the same waterproofing job PE used to \u2014 but because PLA itself is compostable, the entire cup can be certified compostable as one piece. There\u2019s no plastic film to peel off or separate before disposal.'] },
        { h: 'So are they genuinely compostable, or is that a stretch?', p: ['They genuinely are \u2014 when certified and disposed of correctly. A PLA-lined cup carrying IS 17088 or EN 13432 certification will break down into CO\u2082, water and humus under industrial composting conditions. The same caveat applies here as everywhere else: PLA needs the sustained heat of industrial composting to break down within the expected window, not a windowsill compost bin.'] },
        { h: 'Getting the full benefit out of them', p: ['Pair PLA cups with compostable lids where you can, and route them to industrial composting whenever that\u2019s available to you. Even outside ideal conditions, they still sidestep the recycling headache and microplastic legacy that PE-lined cups leave behind.'] }
      ],
      faqs: [
        { q: 'Can I just toss PLA cups in the regular recycling bin?', a: 'No \u2014 PLA is a compostable bioplastic, not a recyclable plastic. It belongs in composting, ideally an industrial facility, not the recycling stream.' },
        { q: 'Will PLA cups break down in a home compost bin?', a: 'Usually not reliably \u2014 PLA generally needs the higher, sustained temperatures of industrial composting. Home breakdown tends to be slow and inconsistent unless the specific product is home-certified.' },
        { q: 'Are PLA-coated cups actually safe to use for hot drinks?', a: 'Yes, they\u2019re designed for it \u2014 double-wall versions add extra insulation if you\u2019re serving very hot beverages.' }
      ]
    },
    {
      title: 'The True Cost of Switching to Compostable Packaging',
      cat: 'Business',
      keyword: 'cost of switching to compostable packaging',
      secondaryKeywords: ['compostable packaging price comparison', 'is compostable packaging expensive', 'ROI of sustainable packaging', 'compostable vs plastic packaging cost India'],
      date: '2025-05-26',
      readMins: 7,
      author: 'Packin Club Editorial',
      excerpt: 'The sticker price is only one line in a much bigger equation. Here\u2019s how to actually think through the real cost \u2014 and the returns most businesses never bother calculating.',
      metaTitle: 'The True Cost of Switching to Compostable Packaging',
      metaDescription: 'An honest look at the real cost of compostable packaging \u2014 unit price versus hidden savings, compliance risk, brand value, and how to switch without overpaying.',
      takeaways: [
        'Compostable packaging can carry a modest per-unit premium over plastic \u2014 but that gap has narrowed considerably.',
        'Looking only at the premium ignores compliance savings, brand value and customer loyalty sitting on the other side of the ledger.',
        'Right-sizing, order volume and supplier choice all move the real cost more than people expect.',
        'For most businesses, the total return ends up justifying the switch once you account for everything.'
      ],
      body: [
        { p: ['Whenever a business starts looking at compostable packaging, the first question is almost always about price. It\u2019s the right question to ask \u2014 the common version of it is just too narrow. Unit cost is one input into the decision; total cost and total return are what actually determine whether it was worth it.'] },
        { h: 'The honest part first: yes, there\u2019s a premium', p: ['Certified compostable packaging can cost more per unit than the cheapest conventional plastic on the market. We won\u2019t pretend otherwise. But two things are also true: that premium has shrunk considerably as materials and supply chains have matured, and it\u2019s often smaller than businesses expect once they actually request a real quote instead of guessing based on old pricing.'] },
        { h: 'The costs plastic never puts on its invoice', p: ['Conventional plastic carries costs that never show up on the purchase order itself:'], ul: ['Compliance risk \u2014 fines, seized stock and legal exposure under tightening plastic-ban enforcement', 'Reputational risk \u2014 the rising commercial cost of being seen as a laggard on sustainability', 'Lost sales \u2014 customers quietly choosing a competitor with cleaner packaging credentials instead'] },
        { h: 'The returns most businesses forget to count', p: ['Compostable packaging also works as a marketing and loyalty asset. A branded compostable mailer or cup does promotional work that plain packaging simply can\u2019t, and a growing share of customers now actively prefer \u2014 and will pay a little more for \u2014 brands that have visibly made the switch.'] },
        { h: 'How to actually keep the cost down', p: ['There are real, practical levers here, not just theory:'], ul: ['Right-size your packaging so you\u2019re not paying for material you don\u2019t need', 'Consolidate order volume to improve per-unit pricing', 'Standardise formats across your product line where you reasonably can', 'Work with a supplier who quotes against your real sizes and volumes, not a generic price list'] },
        { h: 'Where this actually lands', p: ['Looked at purely as a unit price, compostable packaging looks like a cost. Looked at as compliance insurance, a brand asset, and a hedge against where plastic regulation is clearly heading, it\u2019s an investment most businesses come out ahead on once the full picture is on the table.'] }
      ],
      faqs: [
        { q: 'Is compostable packaging really that much more expensive than plastic?', a: 'It can carry a modest premium, but that gap has narrowed and is often offset by compliance savings and brand value. Requesting a quote against your actual sizes is the only way to get an accurate number for your business.' },
        { q: 'What\u2019s the quickest way to bring the cost of switching down?', a: 'Right-size your packaging, consolidate your order volume, standardise formats across products, and work with a supplier who prices to your actual requirements rather than a flat catalogue rate.' },
        { q: 'Does compostable packaging genuinely drive more sales, or is that just a talking point?', a: 'A growing share of customers do prefer brands with credible sustainability practices, and branded compostable packaging effectively does double duty as marketing at the doorstep.' }
      ]
    },
    {
      title: 'Home Composting vs Industrial Composting: What You Need to Know',
      cat: 'Guides',
      keyword: 'home composting vs industrial composting',
      secondaryKeywords: ['is compostable packaging home compostable', 'industrial composting facility India', 'home compostable vs industrial compostable certification', 'compost bin temperature'],
      date: '2025-06-09',
      author: 'Packin Club Editorial',
      readMins: 6,
      excerpt: 'A product certified \u201Ccompostable\u201D might actually need an industrial facility to break down \u2014 not your garden bin. Here\u2019s the real difference, and why it matters more than it sounds.',
      metaTitle: 'Home vs Industrial Composting: The Difference That Actually Matters',
      metaDescription: 'Home composting vs industrial composting explained \u2014 the real difference in temperature and time, and why matching a product\u2019s certification to your setup matters.',
      takeaways: [
        'Industrial composting reaches high, sustained temperatures that a home bin simply can\u2019t maintain.',
        'A lot of compostable products are certified for industrial composting only, not home composting.',
        'Home-compostable certification is a separate, stricter claim \u2014 not something you should assume by default.',
        'Always match a product\u2019s certification to the disposal route your customers actually have access to.'
      ],
      body: [
        { p: ['\u201CCompostable\u201D and \u201Chome-compostable\u201D sound like the same promise, but they\u2019re not \u2014 and confusing the two is exactly how well-meaning customers end up disappointed when packaging doesn\u2019t break down in their garden bin the way they expected. Here\u2019s the distinction every buyer should actually understand before making a claim.'] },
        { h: 'Industrial composting, in practice', p: ['Industrial, or commercial, composting facilities maintain high temperatures \u2014 often 55\u201370\u00B0C \u2014 alongside controlled moisture, oxygen and genuinely intense microbial activity. These conditions reliably break down certified compostable packaging, typically within around 240 days. This is the environment most compostable packaging standards actually assume when they set that timeline.'] },
        { h: 'Home composting, and where it falls short', p: ['A backyard compost heap or bin runs a lot cooler and far less consistently. It\u2019s genuinely excellent for food scraps and garden waste, but it rarely reaches the temperatures needed to break down many compostable plastics within a reasonable time. Some products are specifically engineered and certified for home composting \u2014 most simply aren\u2019t, and assuming otherwise is where problems start.'] },
        { h: 'Why the distinction actually matters for your business', p: ['It governs what you can honestly tell your customers. If your packaging is certified for industrial composting only, telling people to \u201Cjust compost it at home\u201D sets them up to fail \u2014 and risks a greenwashing backlash when it doesn\u2019t break down the way you promised. Matching the claim to the actual certification is what keeps you trusted.'] },
        { h: 'Choosing the right product for your situation', p: ['Base your decision on the disposal route realistically available to your customers and your region\u2019s composting infrastructure, then pick a certified product that actually matches it. Communicate the correct disposal method clearly on the packaging itself, rather than leaving customers to guess.'] }
      ],
      faqs: [
        { q: 'Can I just compost any compostable packaging at home?', a: 'No, not reliably. A lot of products are certified for industrial composting only. Home-compostability is a separate certification you need to check for specifically, rather than assume.' },
        { q: 'What temperature does an industrial composting facility actually reach?', a: 'Commonly around 55\u201370\u00B0C with controlled moisture and aeration \u2014 far hotter and more consistent than a typical home compost bin.' },
        { q: 'How do I actually find out which type of composting a specific product needs?', a: 'Check its certification directly. A credible supplier will clearly state whether a product is industrial-compostable, home-compostable, or both.' }
      ]
    },
    {
      title: 'Compostable Mulch Film: A Practical Guide for Indian Farmers',
      cat: 'Agriculture',
      keyword: 'compostable mulch film for farmers',
      secondaryKeywords: ['biodegradable mulch film India', 'plastic mulch alternative agriculture', 'compostable film for crops', 'mulch film soil health'],
      date: '2025-06-16',
      readMins: 7,
      author: 'Packin Club Editorial',
      excerpt: 'Plastic mulch boosts yields but leaves the soil full of microplastic fragments season after season. Compostable mulch film delivers the same benefits, then tills right back into the earth.',
      metaTitle: 'Compostable Mulch Film: A Practical Guide for Indian Farmers',
      metaDescription: 'How compostable mulch film works for Indian farms \u2014 weed suppression, moisture retention, no retrieval labour, and how it actually compares to plastic mulch.',
      takeaways: [
        'Plastic mulch raises yields but has to be retrieved every season, and it leaves microplastic behind in the soil regardless.',
        'Compostable mulch film delivers the same agronomic benefits, then tills straight into the soil afterward.',
        'It removes the labour and cost of lifting and disposing of plastic film at the end of each season.',
        'The film\u2019s working life can be matched to your specific crop cycle rather than a generic timeline.'
      ],
      body: [
        { p: ['Mulching is one of the most effective tools in modern farming \u2014 and also one of the most plastic-intensive. Compostable mulch film offers a way to keep the agronomic gains farmers rely on while ending the plastic problem that\u2019s historically come bundled with them.'] },
        { h: 'Why farmers mulch in the first place', p: ['Mulch film earns its place in the field because it\u2019s doing several jobs at once, not just one:'], ul: ['Suppresses weeds without needing herbicides', 'Retains soil moisture, cutting down on irrigation needs', 'Stabilises root-zone temperature through the growing season', 'Keeps produce cleaner and can improve both yield and quality'] },
        { h: 'The hidden cost of plastic mulch that doesn\u2019t show up at harvest', p: ['Conventional plastic mulch has to be lifted, collected and disposed of at the end of every single season \u2014 labour-intensive, costly, and in practice, never fully complete. The fragments left behind accumulate in the soil as microplastic, year after year, with real consequences for long-term soil health that most farms don\u2019t notice until it\u2019s already a problem.'] },
        { h: 'How compostable mulch film actually solves this', p: ['Compostable mulch film performs the same agronomic functions all season long, then simply breaks down in the soil afterward. There\u2019s nothing to retrieve \u2014 you till it back into the earth, where it decomposes without leaving microplastic behind. Its working life can be formulated specifically to match the length of your crop cycle, so it holds until the job\u2019s done.'] },
        { h: 'Is it actually right for your farm?', p: ['Compostable mulch film suits a wide range of crops \u2014 vegetables, row crops, strawberries, melons \u2014 across both open-field and polyhouse cultivation. The most reliable way to evaluate it isn\u2019t to take our word for it, but to trial it on a section of your land and compare the season\u2019s labour and results directly against plastic.'] }
      ],
      faqs: [
        { q: 'Do I still need to pull up compostable mulch film after harvest, like plastic?', a: 'No \u2014 unlike plastic mulch, it\u2019s designed to be tilled straight into the soil, where it breaks down without leaving microplastic behind.' },
        { q: 'Will compostable mulch film hold up for a full growing season without failing early?', a: 'Yes \u2014 its working life can be formulated to match your specific crop cycle, after which it starts breaking down on schedule.' },
        { q: 'Which crops actually suit compostable mulch film best?', a: 'It works well across vegetables, row crops, strawberries and melons, in both open-field and polyhouse settings.' }
      ]
    },
    {
      title: 'How to Spot Greenwashing in \u201CEco-Friendly\u201D Packaging',
      cat: 'Sustainability',
      keyword: 'how to spot greenwashing in packaging',
      secondaryKeywords: ['greenwashing red flags packaging', 'eco friendly packaging claims verification', 'fake sustainable packaging', 'genuine compostable packaging certification'],
      date: '2025-06-20',
      readMins: 6,
      author: 'Packin Club Editorial',
      excerpt: 'Vague green claims are everywhere on packaging right now. Here are the actual red flags that separate genuinely certified compostable packaging from marketing dressed up in leaf icons.',
      metaTitle: 'How to Spot Greenwashing in \u201CEco-Friendly\u201D Packaging',
      metaDescription: 'A practical buyer\u2019s guide to spotting greenwashing in packaging \u2014 the red-flag phrases, the questions worth asking a supplier, and the certifications that actually prove a claim.',
      takeaways: [
        'Vague words like \u201Ceco-friendly\u201D and \u201Cnatural\u201D mean essentially nothing on their own, without proof attached.',
        '\u201CBiodegradable\u201D with no stated timeline or standard is the single biggest red flag to watch for.',
        'A genuine claim cites an actual certification \u2014 IS 17088, EN 13432 or ASTM D6400.',
        'A trustworthy supplier will share certificates readily and be honest about end-of-life conditions, not vague about them.'
      ],
      body: [
        { p: ['Green leaves, earthy colour palettes and reassuring words sell packaging \u2014 whether or not anything real is standing behind them. Greenwashing thrives specifically because most buyers don\u2019t know which signals are trustworthy and which are just design choices. This guide is meant to fix that gap.'] },
        { h: 'Red flag one: vague, undefined language', p: ['Words like \u201Ceco-friendly,\u201D \u201Cnatural,\u201D \u201Cgreen\u201D and \u201Cearth-conscious\u201D have no agreed definition behind them anywhere. On their own, they commit the seller to nothing measurable. Treat them as decoration on the label, not as evidence of anything.'] },
        { h: 'Red flag two: \u201Cbiodegradable\u201D with no specifics attached', p: ['As we\u2019ve covered elsewhere, almost anything is biodegradable on a long enough timeline \u2014 that\u2019s exactly the loophole the word exploits. A \u201Cbiodegradable\u201D claim with no stated timeline, no stated conditions, and no certification attached is the single most common form of packaging greenwashing we come across.'] },
        { h: 'Red flag three: no certification anywhere in sight', p: ['Genuinely compostable packaging cites a recognised standard \u2014 IS 17088 in India, or EN 13432 / ASTM D6400 internationally. If a product is making a strong environmental claim but names no standard and can\u2019t produce a certificate, that absence is telling you something important on its own.'] },
        { h: 'The questions that actually cut through the marketing', p: ['Ask a prospective supplier these directly, and watch how quickly they answer:'], ul: ['Which certification does this product actually hold, and can you send me the certificate?', 'Under what conditions does it break down, and how long does that actually take?', 'Is it home-compostable, industrial-compostable, or both?', 'What is it actually made from?'] },
        { h: 'What a trustworthy answer actually looks like', p: ['A credible supplier answers all of the above without hesitation, draws a clear line between \u201Ccompostable\u201D and \u201Cbiodegradable\u201D unprompted, and is upfront about end-of-life conditions rather than implying the product will vanish anywhere, instantly, no matter where it ends up. That transparency is usually the real tell.'] }
      ],
      faqs: [
        { q: 'What\u2019s the single most common greenwashing claim you see in packaging?', a: 'A vague \u201Cbiodegradable\u201D label with no stated timeline, conditions or certification attached \u2014 it\u2019s by far the most common, and the most misleading, since it sounds definitive while promising nothing.' },
        { q: 'Which certifications actually prove packaging is genuinely compostable?', a: 'Look specifically for IS 17088 in India, EN 13432 in Europe, or ASTM D6400 in the US. A legitimate supplier will share the certificate directly, not just reference it.' },
        { q: 'How does a business avoid accidentally greenwashing its own packaging claims?', a: 'Use genuinely certified products, state claims precisely rather than loosely, and print honest disposal guidance. Match every claim you make to documented evidence you can actually produce if asked.' }
      ]
    }
  ];

  // category brand colour for hero blocks
  var CAT_BG = {
    'Guides': '#14342C', 'Sustainability': '#0f2820', 'Compliance': '#3d2b16',
    'Certification': '#14342C', 'E-commerce': '#0f2820', 'Food Service': '#3d2b16',
    'Business': '#14342C', 'Agriculture': '#0f2820'
  };

  // category thumbnail image (minimalistic/earthy). Fill in real URLs below;
  // any category left blank falls back to the flat heroBg + subtle gradient
  // look on cards, and to a flat heroBg on the article hero.
  var CAT_THUMB = {
    'Guides': '', 'Sustainability': '', 'Compliance': '',
    'Certification': '', 'E-commerce': '', 'Food Service': '',
    'Business': '', 'Agriculture': ''
  };

  // per-post override: set p.thumb here by slug if a specific post needs its
  // own image instead of the category default, e.g.
  // var THUMB_OVERRIDE = { 'compostable-vs-biodegradable-packaging-what-s-the-real-difference': 'https://...jpg' };
   var THUMB_OVERRIDE = {
    'compostable-vs-biodegradable-packaging-what-s-the-real-difference': 'thumbnail_blog/CompostablevsBiodegradable_homepage.png',
    'are-compostable-bags-really-eco-friendly-an-honest-look': 'thumbnail_blog/AnHonestLook.png',
    'india-s-single-use-plastic-ban-a-practical-compliance-guide-for-businesses': 'thumbnail_blog/IndiaSingle-UsePlasticBan_homepage.png',
    'what-is-is-17088-compostable-plastic-certification-explained': 'thumbnail_blog/IS17088_homepage.png',
    'compostable-courier-bags-for-e-commerce-the-complete-guide': 'thumbnail_blog/compostable-courier-bags.png',
    'how-long-does-compostable-packaging-take-to-decompose': 'thumbnail_blog/decompose-packaging.png',
    'compostable-packaging-for-restaurants-and-cloud-kitchens': 'thumbnail_blog/Compostable-Packaging-for-Restaurants.png',
    'pla-coated-paper-cups-are-they-actually-compostable': 'thumbnail_blog/PLA-Coated-Paper-Cups.png',
    'the-true-cost-of-switching-to-compostable-packaging': 'thumbnail_blog/True-Cost-of-Switching-to-Compostable-Packaging.png',
    'home-composting-vs-industrial-composting-what-you-need-to-know': 'thumbnail_blog/Home-Composting-vs-Industrial-Composting.png',
    'compostable-mulch-film-a-practical-guide-for-indian-farmers': 'thumbnail_blog/Compostable_mulch_film.png',
    'how-to-spot-greenwashing-in-eco-friendly-packaging': 'thumbnail_blog/Eco-FriendlyPackaging.png'
  };
  POSTS.forEach(function (p) {
    p.slug = slug(p.title);
    p.heroBg = CAT_BG[p.cat] || '#14342C';
    p.thumb = THUMB_OVERRIDE[p.slug] || CAT_THUMB[p.cat] || '';
    var d = new Date(p.date + 'T00:00:00');
    p.dateLabel = d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
    p.ts = d.getTime();
    // word count estimate for display only
    var words = 0;
    p.body.forEach(function (s) {
      (s.p || []).forEach(function (t) { words += t.split(' ').length; });
      (s.ul || []).forEach(function (t) { words += t.split(' ').length; });
    });
    p.words = words;
  });

  window.PACKIN_BLOG = {
    posts: POSTS,
    cats: ['All', 'Guides', 'Sustainability', 'Compliance', 'Certification', 'E-commerce', 'Food Service', 'Business', 'Agriculture'],
    bySlug: function (s) { return POSTS.filter(function (p) { return p.slug === s; })[0] || null; },
    slug: slug
  };
})();
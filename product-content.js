// Extra buyer-guide content for product pages (Node only: used by generate-products.js).
// Key = product slug. Every field is optional: a section is only shown if you fill it in.
//   whoTitle:       heading for the first section
//   who:            who buys and uses this product (array of paragraphs)
//   sizing:         tip on picking a size (shown under the sizes table built from the specs)
//   thicknessTitle: (optional) heading for the thickness section, e.g. for tissue or cups
//   thickness:      how to choose thickness (or ply, wall, capacity)
//   disposal:       disposal and storage
//   faqs:           [{ q, a }, ...]  (6 per product)
// After editing, run:  node generate-products.js
// Only write facts you can back up (specs, certificates, what you really offer).

const MOQ = (note) => ({ q: `What is the minimum order quantity?`, a: `The minimum order is 100 kg per specification. ${note}` });
const QUOTE = (note) => ({ q: `How do I get samples and a quote?`, a: `Use the quote form on this page or the contact page. ${note} We send samples and a quote within two business days.` });
const PRINT = (note) => ({ q: `Can I print my brand on it?`, a: `Yes. Printing is available in up to 8 colours using flexographic, food-grade inks. ${note}` });

module.exports = {
  'compostable-agri-mulch-film': {
    whoTitle: `Who uses compostable agri mulch film`,
    who: [
      `Compostable mulch film is bought by growers who want the weed control and moisture retention of plastic mulch without the cost of lifting and disposing of it at the end of the season. Typical users are vegetable and row-crop farms, strawberry and melon growers, polyhouse and tunnel operations, and orchards and plantations that use ground cover.`,
      `Because the film is tilled into the soil at harvest instead of being collected, it suits farms where retrieval labour is expensive or where used plastic mulch is hard to clean and dispose of.`
    ],
    sizing: `Order the film width to match your bed: rolls run from 0.6 m to 2.0 m wide and from 400 m to 1000 m long, made to bed size. Longer rolls mean fewer changeovers on a mulch-laying machine, while shorter rolls are easier to handle by hand on small plots. Give us your bed width, row length and laying method when you request a quote.`,
    thickness: `Mulch film is made in 15 to 25 microns. Thinner film costs less per hectare and suits short crops and careful machine laying. Thicker film is more forgiving in wind and on rough soil, and is the safer choice for longer crops. The field life, from 3 to 6 months, is formulated to the crop cycle, so tell us your crop, planting date and expected harvest date. The film should last the crop but not far beyond it.`,
    disposal: `At the end of the crop, till the film into the soil instead of lifting it. Our specification states that the film returns to soil within 240 days in industrial composting. In the field the rate depends on soil temperature, moisture and microbial activity, so it will vary by region and season. Remove drip tape, clips and pegs before tilling. Store unused rolls in a cool, dry place away from direct sunlight; shelf life is 12 months from the date of manufacture.`,
    faqs: [
      { q: `What roll widths and lengths are available?`, a: `Widths run from 0.6 m to 2.0 m and lengths from 400 m to 1000 m. Widths are made to your bed size.` },
      { q: `How long does the film last in the field?`, a: `The field life is 3 to 6 months and is formulated to the crop cycle. Share your crop and planting window so the formulation can be matched.` },
      { q: `Do I need to remove the film at harvest?`, a: `No. The film is designed to be tilled directly into the soil, so there is nothing to lift or send to landfill. Remove non-compostable accessories such as drip tape first.` },
      { q: `Which colours are available?`, a: `Black, clear and silver-reflective finishes are available.` },
      MOQ(`Share your roll width and length and we will confirm what that means in rolls.`),
      QUOTE(`Tell us your crop, bed width and planting date so we can suggest a thickness and roll size.`)
    ]
  },

  'compostable-nursery-bags': {
    whoTitle: `Who uses compostable nursery bags`,
    who: [
      `Compostable nursery bags are used by forestry and reforestation programmes, vegetable and flower seedling growers, retail nurseries and garden centres, and horticulture and landscaping contractors. They suit any operation that raises seedlings or saplings in bags and wants to avoid stripping polythene sleeves at transplant.`,
      `Because the whole bag is planted with the seedling, the roots are not disturbed at transplant and there is no polythene sleeve to collect afterwards. That helps most where large numbers of saplings are planted in the field and sleeve removal adds labour.`
    ],
    sizing: `Bags run from 4"×6" to 10"×12", with custom sizes on request. Choose by the root system at planting time: small seedlings and herbs suit the smaller sizes, while tree saplings that stay in the nursery for months need the larger ones. The bags are bottom-gusseted for fill stability and come with pre-punched drainage holes.`,
    thickness: `Nursery bags are made in 25 to 50 microns. A thinner wall breaks down sooner after planting and suits fast-growing seedlings that go into the ground quickly. A thicker wall holds its shape for longer, which suits saplings that stay in the nursery for several months or are moved by hand and truck. As a rule, match the wall to the time the plant spends in the bag: the longer the holding period, the thicker the film. Trial a small batch under your own watering and handling conditions before a full order.`,
    disposal: `Plant the bag together with the seedling. Our specification states that the bag returns to soil within 240 days in industrial composting. In the ground, breakdown depends on soil temperature, moisture and microbial activity. Cut off any plastic ties or labels before planting. Store unused bags in a cool, dry place; shelf life is 12 months from the date of manufacture.`,
    faqs: [
      { q: `What sizes are the nursery bags?`, a: `Sizes run from 4"×6" to 10"×12". Custom sizes are available on request.` },
      { q: `Can the bag be planted with the seedling?`, a: `Yes. The bag is designed to be planted whole and to break down in the soil as the plant establishes, so the roots are not disturbed at transplant.` },
      { q: `Do the bags have drainage holes?`, a: `Yes. Drainage holes are pre-punched as standard, and the walls are breathable to support healthy root structure.` },
      PRINT(`Many nurseries use print for the species name, brand or size.`),
      MOQ(`Tell us your bag size and thickness and we will confirm the quantity this represents.`),
      QUOTE(`Share your bag size, how long plants stay in the bag, and your planting season.`)
    ]
  },

  'compostable-carry-bags-on-roll': {
    whoTitle: `Who uses compostable carry bags on roll`,
    who: [
      `Carry bags on a roll are used at counters where speed matters: supermarket and grocery checkouts, produce and bakery sections, pharmacy and convenience counters, and quick-service retail tills. Staff tear off one bag at a time with one hand, which keeps queues moving.`,
      `The perforated roll mounts on a standard counter roll holder, so a store can switch from plastic rolls without buying new fixtures. Our specification lists the bags as compostable and compliant with single-use plastic bans.`
    ],
    sizing: `Bags run from 10"×14" to 16"×20", with 250 to 500 bags per roll on a 1.5" cardboard core. Choose by the typical purchase: smaller sizes suit pharmacy and bakery items, larger sizes suit grocery baskets. More bags per roll means fewer changeovers at a busy counter, but also a heavier roll, so check what your dispenser can carry.`,
    thickness: `Rolls are made in 20 to 40 microns. Lighter film suits light items such as bakery goods and pharmacy purchases. Heavier film is better for packaged groceries and items with corners. Thicker film is stronger but uses more material per bag, so choose the thinnest gauge that carries your typical load, and trial it at one counter before rolling out to every till.`,
    disposal: `Used bags should go to industrial composting where it is available, and not into plastic recycling. Our specification states that the bag returns to soil within 240 days in industrial composting. Bags used for food can go in with food waste. Keep unused rolls in a cool, dry place; shelf life is 12 months from the date of manufacture.`,
    faqs: [
      { q: `What bag sizes and roll counts are available?`, a: `Bag sizes run from 10"×14" to 16"×20", with 250 to 500 bags per roll on a 1.5" cardboard core.` },
      { q: `Will the roll fit my counter dispenser?`, a: `The rolls are made to fit standard counter roll holders. Send us your dispenser model or roll dimensions and we will check.` },
      { q: `Can staff tear off one bag at a time?`, a: `Yes. The roll is perforated for one-handed tear-off with clean separation.` },
      PRINT(`Print your store name or message on every bag.`),
      MOQ(`Share your bag size and thickness and we will confirm the number of rolls.`),
      QUOTE(`Tell us your bag size, daily usage and dispenser type.`)
    ]
  },

  'compostable-garbage-bag-on-roll': {
    whoTitle: `Who uses compostable garbage bags on roll`,
    who: [
      `Bin liners on a roll are used where bags are changed many times a day: commercial and home kitchens, offices and co-working spaces, hotels and facility management teams, and municipal wet-waste collection. The perforated roll lets staff pull a fresh liner quickly.`,
      `Because the liner composts together with organic waste in an industrial facility, kitchens and wet-waste collectors do not need to separate the bag from the food scraps. Several colours are available, which helps with waste segregation.`
    ],
    sizing: `Bags run from 19"×21" to 30"×37", with 15 to 30 bags per roll. Match the bag to the bin: measure the bin height and its circumference, and choose a bag long enough to fold over the rim. A bag that is too small slips into the bin, and one that is too large wastes material.`,
    thickness: `Liners are made in 30 to 51 microns. Light, dry waste such as office paper bins sits comfortably at the lower end. Wet kitchen waste and heavier loads suit the higher end, because the liner has to hold weight and resist tearing at the rim. The base is heat-sealed to resist leaks. If your team lifts full bags out by the top, choose the stronger gauge.`,
    disposal: `Compost the bag together with its contents in an industrial composting facility, and keep it out of the plastic recycling stream. Our specification states that the bag returns to soil within 240 days in industrial composting. Compostable liners are designed to degrade, so avoid leaving wet waste in a bag longer than necessary, especially in hot weather. Store unused rolls in a cool, dry place; shelf life is 12 months from the date of manufacture.`,
    faqs: [
      { q: `What bag sizes are available?`, a: `Sizes run from 19"×21" to 30"×37", with 15 to 30 bags per roll.` },
      { q: `Are the liners leak-resistant?`, a: `Yes. The base is heat-sealed to resist leaks, which suits wet kitchen waste.` },
      { q: `Can the liner be composted with food waste?`, a: `Yes. The liner composts together with organic waste in an industrial composting facility, so the waste does not need to be emptied out first.` },
      { q: `Can I get different colours for segregation?`, a: `Yes. Multiple colours are available to support waste segregation.` },
      MOQ(`Share your bag size and thickness and we will confirm the number of rolls.`),
      QUOTE(`Tell us your bin sizes and how many liners you use each week.`)
    ]
  },

  'compostable-grocery-bags-on-roll': {
    whoTitle: `Who uses compostable grocery bags on roll`,
    who: [
      `Produce bags on a roll are used where shoppers pick loose items: fruit and vegetable sections, bakery and deli counters, bulk and refill stores, and farmers markets. Customers tear off a bag, fill it and weigh it.`,
      `The bags are food-contact safe and breathable, which helps reduce sweating on fresh produce, and they can go with food waste to composting. The rolls mount on hanging or counter dispensers.`
    ],
    sizing: `Bags run from 8"×12" to 12"×16", with 300 to 600 bags per roll on a 1.5" cardboard core. Smaller sizes suit herbs, chillies and mushrooms, while larger sizes suit leafy vegetables and bigger fruit. A store that stocks both can mount two rolls side by side.`,
    thickness: `Rolls are made in 15 to 25 microns. Thin film is enough for light loose produce such as leafy greens and small fruit. Heavier produce such as potatoes, onions and root vegetables suits the thicker end, because corners and weight put more load on the film. Trial the film with your heaviest line before ordering in volume.`,
    disposal: `Used bags can go to composting together with peels and trimmings where an industrial composting facility collects food waste. Our specification states that the bag returns to soil within 240 days in industrial composting. Keep unused rolls in a cool, dry place; shelf life is 12 months from the date of manufacture.`,
    faqs: [
      { q: `What bag sizes and roll counts are available?`, a: `Bags run from 8"×12" to 12"×16", with 300 to 600 bags per roll.` },
      { q: `Are the bags safe for food contact?`, a: `Yes. They are food-contact safe and suitable for loose produce, bakery and deli items.` },
      { q: `Are the bags breathable?`, a: `Yes. The film is breathable, which reduces sweating on fresh produce.` },
      { q: `What dispensers do the rolls fit?`, a: `They can be mounted on hanging or counter dispensers. Send us your dispenser details and we will confirm the core fit.` },
      MOQ(`Tell us your bag size and thickness and we will confirm the number of rolls.`),
      QUOTE(`Share your produce range and the dispenser you use.`)
    ]
  },

  'compostable-medical-waste-bags': {
    whoTitle: `Who uses compostable medical waste bags`,
    who: [
      `These bags are made for hospitals and nursing homes, clinics and diagnostic labs, pharmaceutical facilities and veterinary practices that segregate biomedical waste by colour. They are colour-coded, printable with biohazard markings, and made for BMWM 2016 segregation.`,
      `They are a compostable-film alternative to LDPE liners for the segregation step. Before switching, check that the specification meets the requirements of your state pollution control board and your biomedical waste treatment provider.`
    ],
    sizing: `Bags run from 19"×21" to 33"×39". Choose the size from the bin or container the bag lines, and leave enough length to tie the neck securely. Colours are supplied as per your segregation protocol.`,
    thickness: `Medical waste bags are made in 50 to 75 microns. The lower end suits light dressings and soft waste. The higher end suits heavier loads and bags that are handled and moved often, because the film has to resist puncture and tearing. Sharps belong in rigid puncture-proof containers, not in bags. Seams are heat-sealed to prevent leaks.`,
    disposal: `Used bags that contain biomedical waste must be handled under your facility's biomedical waste protocol and sent to an authorised treatment facility. They are not for ordinary composting. Store unused bags in a cool, dry place; shelf life is 12 months from the date of manufacture.`,
    faqs: [
      { q: `Which colours are available?`, a: `Yellow, red and blue, as per your segregation protocol.` },
      { q: `What sizes are available?`, a: `Sizes run from 19"×21" to 33"×39".` },
      { q: `Are the bags approved under the BMWM Rules 2016?`, a: `They are made for BMWM 2016 colour segregation, as stated in the specification. Acceptance depends on your state pollution control board and treatment provider, so confirm your requirement with them and share it with us when you request a quote.` },
      { q: `Can biohazard markings be printed on the bags?`, a: `Yes. The bags can be printed with biohazard markings, using up to 8-colour flexographic printing.` },
      MOQ(`Share your size, colour and thickness and we will confirm the quantity.`),
      QUOTE(`Tell us your colours, sizes and monthly volumes.`)
    ]
  },

  'compostable-bamboo-tissue': {
    whoTitle: `Who uses compostable bamboo tissue`,
    who: [
      `Bamboo tissue is used by restaurants and cafés, hotels for rooms and washrooms, corporate pantries and offices, and event and banquet caterers. It is made from fast-renewing bamboo pulp and is chlorine-free and BPA-free.`,
      `The tissue is paper-wrapped, so it avoids the plastic outer wrap used on many tissue packs. It is available as napkins, rolls and facials, and combines softness with high wet strength.`
    ],
    sizing: `The napkin sheet is 30 × 30 cm. Choose the napkin format for table service and counters, rolls for washrooms and dispensers, and facials for rooms and reception areas. Tell us the dispenser you use so the sheet size and roll core can be matched.`,
    thicknessTitle: `How to choose ply and GSM`,
    thickness: `Tissue is available in 1, 2 and 3-ply, at 17 to 23 GSM per ply. One-ply napkins suit quick-service counters and high-volume use. Two-ply suits table service and hotel washrooms. Three-ply is the premium choice for rooms and banquets. A higher GSM feels softer and absorbs more, but costs more per sheet, so choose by the guest experience you want and the volume you use.`,
    disposal: `Used bamboo tissue is a paper product and can go with food waste for composting where a facility collects it. The outer wrap is paper, so there is no plastic wrap to separate. Keep unused tissue dry; shelf life is 12 months from the date of manufacture.`,
    faqs: [
      { q: `What ply options are available?`, a: `1, 2 and 3-ply, at 17 to 23 GSM per ply.` },
      { q: `What size is the napkin?`, a: `The napkin sheet is 30 × 30 cm.` },
      { q: `Is the tissue made from bamboo?`, a: `Yes. It is made from fast-renewing bamboo pulp and is chlorine-free and BPA-free.` },
      { q: `Is the packaging plastic-free?`, a: `Yes. The tissue is paper-wrapped, with no plastic outer wrap.` },
      MOQ(`Share your format and ply and we will confirm the quantity this represents.`),
      QUOTE(`Tell us the format (napkin, roll or facial), ply and monthly volume.`)
    ]
  },

  'compostable-bread-pouch': {
    whoTitle: `Who uses compostable bread pouches`,
    who: [
      `Bread pouches are used by artisan and retail bakeries, in-store bakeries at supermarkets, cafés and patisseries, and home and cloud bakeries. The pouch is clear for shelf appeal and food-contact safe.`,
      `The film is breathable, which helps keep the crust crisp instead of trapping moisture and going soggy. Day-old bread and the pouch can go into the same green bin for composting.`
    ],
    sizing: `Pouches are made for standard loaves, baguettes and bun packs. When you request a quote, send the length, width and height of your packed product and tell us how you close the pouch. Leave room for the closure so that the pouch seals without straining.`,
    thickness: `Bread pouches are made in 20 to 30 microns. Soft sliced bread and buns pack well at the lower end. Baguettes and crusty loaves have harder edges that can rub through the film in transit, so the higher end suits them better. The pouch has a side seal, with an optional tin-tie, and a full-clarity body.`,
    disposal: `Used pouches can go to composting together with bakery waste where an industrial composting facility is available. Our specification states that the pouch returns to soil within 240 days in industrial composting. Store unused pouches in a cool, dry place; shelf life is 12 months from the date of manufacture.`,
    faqs: [
      { q: `What sizes are available?`, a: `Standard loaf, baguette and bun-pack sizes are available. Send your product dimensions and we will match a size.` },
      { q: `Does the pouch keep bread fresh?`, a: `The film is breathable, which keeps the crust crisp and avoids a soggy finish.` },
      { q: `How is the pouch closed?`, a: `It has a side seal with an optional tin-tie. Re-closable and heat-sealable formats are available.` },
      { q: `Is it safe for food contact?`, a: `Yes. The pouch is food-contact safe.` },
      MOQ(`Share your pouch size and thickness and we will confirm the quantity.`),
      QUOTE(`Tell us the loaf size, closure type and weekly volume.`)
    ]
  },
  'compostable-cling-film': {
    whoTitle: `Who uses compostable cling film`,
    who: [
      `Compostable cling film is used in commercial kitchen mise-en-place, at deli and takeaway counters, in catering and banquet preparation, and for retail fresh-food wrapping. It clings, stretches and seals to bowls and trays in the way kitchen teams expect.`,
      `It contains no PVC and no plasticisers, and it is food-contact safe and microwave-friendly. It is supplied as a cutter box for a kitchen counter or as a catering roll for bulk use.`
    ],
    sizing: `Rolls are 300 mm or 450 mm wide and 30 m to 300 m long. Choose 300 mm for bowls, plates and small containers, and 450 mm for trays, large bowls and gastronomy pans. Short rolls in a cutter box suit a counter, and long catering rolls suit a busy production kitchen.`,
    thickness: `Cling film is made in 9 to 12 microns. Thinner film clings and stretches easily over bowls and small containers. Slightly thicker film resists tearing when you wrap large trays or irregular shapes. Because film this thin stretches fast, test it on your most awkward container before ordering in volume.`,
    disposal: `Used cling film that has touched food can go with food waste to composting where a facility collects it. Do not put it into plastic recycling. Our specification states that the film returns to soil within 240 days in industrial composting. Keep rolls in a cool, dry place; shelf life is 12 months from the date of manufacture.`,
    faqs: [
      { q: `What roll widths and lengths are available?`, a: `Rolls are 300 mm or 450 mm wide, from 30 m to 300 m long, as a cutter box or a catering roll.` },
      { q: `Does the film cling like normal cling wrap?`, a: `Yes. It clings, stretches and seals to bowls and trays without using PVC or plasticisers.` },
      { q: `Is it microwave-friendly?`, a: `The film is described as microwave-friendly. As with any wrap, leave a vent and follow your kitchen's food-safety procedure.` },
      { q: `Is it safe for food contact?`, a: `Yes. It is food-contact safe.` },
      MOQ(`Tell us your roll width and length and we will confirm the number of rolls.`),
      QUOTE(`Share your roll width, length and whether you want cutter boxes or catering rolls.`)
    ]
  },

  'compostable-hot-liquid-pouches': {
    whoTitle: `Who uses compostable hot liquid pouches`,
    who: [
      `Hot liquid pouches are used by cloud kitchens and food delivery businesses, soup, curry and gravy takeaway counters, hot beverage and chai services, and catering and tiffin operations. They are a compostable alternative to plastic-lined parcel bags for delivery-first menus.`,
      `The pouch holds liquids up to 95°C and uses a reinforced triple-layer seal to resist leaks. There is no chemical leaching into the food, and the pouch comes in stand-up, flat and spouted formats.`
    ],
    sizing: `Capacities run from 250 ml to 1000 ml. Choose the pouch by the portion you sell, and leave headspace so that the seal is not under strain. Stand-up pouches suit soups and curries that are served from the pouch, flat pouches suit pre-filled portions in a delivery bag, and spouted pouches suit beverages.`,
    thicknessTitle: `How to choose capacity and format`,
    thickness: `The heat tolerance is up to 95°C, so do not fill at higher temperatures. Pick the format by how the pouch is used: stand-up for portions that sit on a table, flat for stacking in delivery bags, and spouted or zip options where the customer pours or reseals. Test a pouch with your actual recipe, as oily gravies and acidic liquids can behave differently from water.`,
    disposal: `Empty the pouch before disposal. Used pouches can go to industrial composting along with food waste where it is available, and should not go into plastic recycling. Our specification states that the pouch returns to soil within 240 days in industrial composting. Store unused pouches in a cool, dry place; shelf life is 12 months from the date of manufacture.`,
    faqs: [
      { q: `What temperature can the pouch hold?`, a: `Liquids up to 95°C.` },
      { q: `Are the pouches leak-proof?`, a: `They use a reinforced triple-layer seal designed to be leak-proof.` },
      { q: `What capacities and formats are available?`, a: `Capacities run from 250 ml to 1000 ml, in stand-up, flat and spouted formats, with zip options.` },
      { q: `Does anything leach into the food?`, a: `No. The pouch is designed with no chemical leaching into hot food.` },
      MOQ(`Share your pouch capacity and format and we will confirm the quantity.`),
      QUOTE(`Tell us what you fill the pouch with, the fill temperature and your monthly volume.`)
    ]
  },

  'compostable-aqueous-coated-paper-cups': {
    whoTitle: `Who uses compostable aqueous coated paper cups`,
    who: [
      `These cups are used by coffee shops and cafés, quick-service restaurants and food courts, office pantries and events, and juice and cold-beverage bars. They are rated for hot and cold service and can be printed to your brand.`,
      `The cup is lined with a water-based aqueous coating instead of polyethylene, so there is no plastic film to peel away before the cup is composted. It is a replacement for the standard PE-lined paper cup.`
    ],
    sizing: `Capacities run from 120 ml to 500 ml. Smaller cups suit espresso and tasting portions, medium sizes suit tea and coffee, and the larger sizes suit cold drinks and juices. Matching paper lids are available, and the cups are compatible with compostable lids.`,
    thicknessTitle: `How to choose capacity and wall type`,
    thickness: `Cups come in single-wall and double-wall options. Single-wall suits cold drinks and quick hot servings. Double-wall adds insulation, which suits hot drinks that customers carry away. Match the lid to the cup and test your hottest drink before a full order.`,
    disposal: `Because the lining is water-based and not polyethylene, the whole cup is designed to go to composting without removing a plastic film. Send used cups, with a compostable lid if you use one, to a composting facility where one is available. Check what your local facility accepts. Store unused cups in a cool, dry place; shelf life is 12 months from the date of manufacture.`,
    faqs: [
      { q: `What cup sizes are available?`, a: `Capacities run from 120 ml to 500 ml.` },
      { q: `Can the cups hold hot and cold drinks?`, a: `Yes. They are rated for both hot and cold beverages.` },
      { q: `What is the lining made of?`, a: `An aqueous, water-based coating, not polyethylene, so there is no plastic film in the cup.` },
      { q: `Are single-wall and double-wall cups available?`, a: `Yes. Both options are available, along with matching paper lids.` },
      MOQ(`Tell us your cup size and wall type and we will confirm the quantity this represents.`),
      QUOTE(`Share your cup sizes, hot or cold use, and whether you need printing.`)
    ]
  },

  'compostable-pouches': {
    whoTitle: `Who uses compostable pouches`,
    who: [
      `Compostable pouches are used for grocery and grain packaging, snacks and dry goods, retail and takeaway counters, and home and commercial kitchens. The pouch has a food-grade, grease-resistant surface, and a sturdy seal that holds its shape when filled.`,
      `They replace plastic pouches without losing strength or shelf appeal, and come in stand-up or flat formats with a matte or kraft-look finish.`
    ],
    sizing: `Pouch sizes run from 10×15 cm to 25×35 cm. Choose by the fill weight and volume of your product, and leave headspace for the seal. Stand-up pouches show well on a shelf, and flat pouches suit counters and takeaway.`,
    thickness: `Pouches are made in 80 to 120 microns. The lower end suits light snacks and small portions. The higher end suits grains, pulses and heavier dry goods, where the pouch has to stand up and resist rubbing at the corners. Match the film to the fill weight, and test with your real product and your sealing equipment.`,
    disposal: `Used pouches can go to composting with food waste where an industrial composting facility is available. Our specification states that the pouch returns to soil within 240 days in industrial composting. Store unused pouches in a cool, dry place; shelf life is 12 months from the date of manufacture.`,
    faqs: [
      { q: `What pouch sizes are available?`, a: `Sizes run from 10×15 cm to 25×35 cm, in stand-up or flat formats.` },
      { q: `Are the pouches food-safe and grease-resistant?`, a: `Yes. The surface is food-grade and grease-resistant.` },
      { q: `What finish do the pouches have?`, a: `A matte or kraft-look compostable film.` },
      PRINT(`Print your brand, product name and batch details on the pouch.`),
      MOQ(`Share your pouch size and thickness and we will confirm the quantity.`),
      QUOTE(`Tell us what you pack, the fill weight and the format you prefer.`)
    ]
  },

  'compostable-electrical-wire-packaging-wrap': {
    whoTitle: `Who uses compostable wire packaging wrap`,
    who: [
      `This wrap is used by wire and cable manufacturers, electrical component packers, producers of coiled and spooled goods, and exporters of industrial products. It bundles and shields the product through storage and transit.`,
      `It combines high tensile and tear strength with dust and abrasion protection, and it conforms tightly to coils and spools. It can be printed for branding and SKU information, and it lets a manufacturer cut plastic from the packaging line.`
    ],
    sizing: `Roll widths run from 200 mm to 1000 mm, supplied as sheet or roll. Choose the width from the height of your coil or spool plus the overlap you need, and give us the coil diameter when you request a quote.`,
    thickness: `The wrap is made in 25 to 50 microns, with high machine-direction strength. Lighter coils and short storage suit the lower end. Heavy spools, rough handling and export shipping suit the higher end. Test the wrap on your own wrapping process, as the machine speed and tension affect how the film performs.`,
    disposal: `Industrial packaging rarely goes into a municipal composting stream, so arrange collection with a composter that accepts compostable film from your site. Our specification states that the wrap returns to soil within 240 days in industrial composting. Store unused rolls in a cool, dry place; shelf life is 12 months from the date of manufacture.`,
    faqs: [
      { q: `What widths are available?`, a: `Roll widths run from 200 mm to 1000 mm, supplied as sheet or roll.` },
      { q: `How strong is the wrap?`, a: `It has high tensile and tear strength, with high machine-direction strength, and protects against dust and abrasion.` },
      { q: `Can it be printed with SKU or brand information?`, a: `Yes. It is printable for branding and SKU information, in up to 8 colours.` },
      { q: `Does it fit tightly around coils?`, a: `Yes. The film conforms tightly to coils and spools.` },
      MOQ(`Tell us your roll width and thickness and we will confirm the quantity.`),
      QUOTE(`Share your coil size and weight, and how you wrap them today.`)
    ]
  },

  'compostable-garbage-bags': {
    whoTitle: `Who uses compostable garbage bags`,
    who: [
      `Heavy-duty compostable bin bags are used for facility and building management, municipal solid-waste collection, industrial and warehouse waste, and events and public spaces. They are rated for real loads and resist tearing.`,
      `A full size and gauge range is available, with a leak-resistant sealed base and colour options for waste segregation. Bags are supplied flat-packed or on rolls.`
    ],
    sizing: `Bags run from 17"×19" to 36"×45". Measure the bin height and circumference, and choose a bag long enough to fold over the rim. For wheelie bins and large containers, take the dimensions from the container and not from the standard size name.`,
    thickness: `Bags are made in 30 to 75 microns, with a load rating of up to 15 kg, depending on size. Light office and washroom waste suits the lower gauges. Wet, heavy or sharp-edged waste suits the higher gauges, which resist tearing. Check the load against the size you need, as the rating is size-dependent.`,
    disposal: `A compostable bag delivers its benefit when the waste inside goes to composting. If the bag is sent to landfill with mixed waste, it will not compost in the same way. Our specification states that the bag returns to soil within 240 days in industrial composting. Store unused bags in a cool, dry place; shelf life is 12 months from the date of manufacture.`,
    faqs: [
      { q: `What load can the bags carry?`, a: `The load rating is up to 15 kg, depending on size.` },
      { q: `What sizes and thicknesses are available?`, a: `Sizes run from 17"×19" to 36"×45", in 30 to 75 microns.` },
      { q: `Can I get coloured bags for segregation?`, a: `Yes. Colour options are available for waste segregation.` },
      { q: `How are the bags supplied?`, a: `Flat-packed or on rolls.` },
      MOQ(`Tell us your bag size and thickness and we will confirm the quantity.`),
      QUOTE(`Share your bin sizes, typical load and weekly usage.`)
    ]
  },

  'compostable-shrink-film': {
    whoTitle: `Who uses compostable shrink film`,
    who: [
      `Compostable shrink film is used for beverage and FMCG multipacks, tray and case bundling, printing and stationery packs, and retail-ready packaging. It pulls tight around the product for a secure, tamper-evident finish.`,
      `It runs on standard shrink tunnels and is a direct replacement for conventional shrink wrap on existing lines. The film has high clarity for product visibility.`
    ],
    sizing: `The roll width is made to your pack size. Give us the length, width and height of the pack when you request a quote, and we will advise the roll width. A shrink ratio of up to 70% means the film pulls in a long way, so allow room for it to close around the product.`,
    thickness: `Shrink film is made in 19 to 30 microns. Lighter film suits small, light packs such as stationery and printed items. Heavier film suits heavier multipacks and bundles. Tunnel temperature and speed may need adjusting from the settings you use for conventional film, so run a test on your own line before a production order.`,
    disposal: `Used film can go to industrial composting where a facility is available and should not go into plastic recycling. Our specification states that the film returns to soil within 240 days in industrial composting. Store unused rolls in a cool, dry place; shelf life is 12 months from the date of manufacture.`,
    faqs: [
      { q: `What is the shrink ratio?`, a: `Up to 70%.` },
      { q: `Will it run on my shrink tunnel?`, a: `It is designed for standard shrink tunnels. Share your tunnel type and settings and we can advise before you order.` },
      { q: `What thicknesses are available?`, a: `19 to 30 microns.` },
      { q: `Is the finish tamper-evident?`, a: `Yes. The film pulls tight for a secure, tamper-evident bundle.` },
      MOQ(`Tell us your roll width and thickness and we will confirm the quantity.`),
      QUOTE(`Share your pack dimensions and the tunnel you use.`)
    ]
  },

  'compostable-stretch-film': {
    whoTitle: `Who uses compostable stretch film`,
    who: [
      `Compostable stretch film is used for pallet and load unitising, in warehouse and 3PL operations, for export and freight bundling, and at end-of-line packaging. It has the cling and load retention of conventional pallet wrap.`,
      `It is available in hand and machine grades and is puncture-resistant. It removes a major source of single-use plastic from the logistics chain.`
    ],
    sizing: `Roll widths are 250 mm and 500 mm. The 250 mm width suits hand-wrapping of smaller loads and bundles, and 500 mm suits full pallets. Tell us your pallet size and whether you wrap by hand or by machine.`,
    thickness: `Film is made in 17 to 25 microns, with stretch of up to 250%. Hand grade suits occasional wrapping and lighter loads. Machine grade suits high-volume lines and heavier pallets. More stretch means less film per pallet, so test how many wraps your load needs, and check that the load stays tight after transit.`,
    disposal: `Used film can go to industrial composting where a facility is available and should not go into plastic recycling. Our specification states that the film returns to soil within 240 days in industrial composting. For warehouse waste, arrange collection with a composter that accepts compostable film. Store unused rolls in a cool, dry place; shelf life is 12 months from the date of manufacture.`,
    faqs: [
      { q: `What roll widths are available?`, a: `250 mm and 500 mm.` },
      { q: `Is it available for hand and machine wrapping?`, a: `Yes. Both hand and machine grades are available.` },
      { q: `How much does it stretch?`, a: `Up to 250%.` },
      { q: `Does it hold a pallet load tightly?`, a: `Yes. It has strong cling and load retention, and is puncture-resistant.` },
      MOQ(`Share your roll width and grade and we will confirm the number of rolls.`),
      QUOTE(`Tell us your pallet size, load weight and whether you wrap by hand or machine.`)
    ]
  },
  'compostable-carry-bags': {
    whoTitle: `Who uses compostable carry bags`,
    who: [
      `Compostable carry bags are used by apparel and footwear retailers, grocery and kirana stores, pharmacies and convenience stores, and general merchandise counters. They come in W-cut and U-cut handle styles across a full size range.`,
      `The bags have strong handles and seams for a real shopping load and can be printed in up to 8 colours, so the brand travels home with the customer. Our specification lists them as compliant with single-use plastic bans.`
    ],
    sizing: `Bags run from 8"×10" to 16"×20". Pick the size from the largest item you sell at the counter, and add a little for the handle gap. Smaller sizes suit pharmacy and accessories, and larger sizes suit apparel and grocery.`,
    thickness: `Bags are made in 20 to 50 microns, with a load rating of up to 5 kg, depending on size. Lower gauges suit light items such as medicines and small accessories. Higher gauges suit boxed items, footwear and anything with corners. Because the rating depends on size, tell us your heaviest typical purchase when you request a quote, and trial a batch at the counter before ordering in volume.`,
    disposal: `Used bags should go to industrial composting where it is available and should not go into plastic recycling. Our specification states that the bag returns to soil within 240 days in industrial composting. Customers can reuse the bag before disposal. Store unused bags in a cool, dry place; shelf life is 12 months from the date of manufacture.`,
    faqs: [
      { q: `What is the difference between W-cut and U-cut bags?`, a: `Both are handle-cut styles. Tell us your size and the load you carry and we will recommend the style that suits your counter.` },
      { q: `How much weight can the bag carry?`, a: `The load rating is up to 5 kg, depending on size.` },
      { q: `What sizes are available?`, a: `Sizes run from 8"×10" to 16"×20".` },
      PRINT(`Print your logo and message on one or both sides.`),
      MOQ(`Share your bag size and thickness and we will confirm the quantity.`),
      QUOTE(`Tell us your size, typical load and the handle style you prefer.`)
    ]
  },

  'compostable-d-cut-shopping-bags': {
    whoTitle: `Who uses compostable D-cut shopping bags`,
    who: [
      `D-cut shopping bags are used by boutiques and fashion retailers, for gifting and hampers, in salons and lifestyle stores, and at events and exhibitions. They suit any counter where the bag is part of the brand experience.`,
      `The bag has a clean die-cut handle, a premium fabric-like finish, and an excellent print surface. It is compostable and compliant with single-use plastic rules, as stated in the specification.`
    ],
    sizing: `Bags run from 10"×13" to 14"×18". Choose the size from your largest typical purchase, such as a folded garment or a gift box, and leave a little room so that the bag closes comfortably. The D-cut handle is reinforced.`,
    thickness: `Bags are made in 40 to 60 microns. The lower end suits light garments, jewellery and cosmetics. The higher end suits boxed gifts, denim and heavier purchases, and keeps its shape better when carried. The finish is matte and fabric-like. Test a print proof on the finish before you order a full run, as colours can look different on matte film.`,
    disposal: `Used bags should go to industrial composting where it is available. Our specification states that the bag returns to soil within 240 days in industrial composting. Customers can reuse the bag before disposal. Store unused bags in a cool, dry place; shelf life is 12 months from the date of manufacture.`,
    faqs: [
      { q: `What sizes are available?`, a: `Sizes run from 10"×13" to 14"×18".` },
      { q: `Is the handle reinforced?`, a: `Yes. The D-cut handle is reinforced.` },
      { q: `What does the finish look like?`, a: `A matte, fabric-like finish with an excellent print surface.` },
      PRINT(`The matte surface takes brand artwork well.`),
      MOQ(`Tell us your bag size and thickness and we will confirm the quantity.`),
      QUOTE(`Share your bag size, artwork and what customers carry in it.`)
    ]
  },

  'compostable-garment-bags': {
    whoTitle: `Who uses compostable garment bags`,
    who: [
      `Garment bags are used in apparel manufacturing and export, by dry cleaners and laundries, in bridal and formalwear stores, and by uniform and workwear suppliers. They protect clothing from dust and snags in transit and storage.`,
      `The film is breathable, so it does not trap moisture, and clear or frosted for easy identification. Hanger-hole and gusset options are available.`
    ],
    sizing: `Sizes cover shirt, suit and gown lengths. Send the garment length and width, including any gusset you need for bulk, when you request a quote. Bags are supplied on a roll or pre-cut with a hanger hole.`,
    thickness: `Garment bags are made in 15 to 25 microns. Shirts and light garments suit the lower end. Suits, gowns and garments that are stored for longer suit the higher end, because the film has to resist snags and handling. Choose clear for fast identification or frosted for a discreet look.`,
    disposal: `Used bags should go to industrial composting where it is available and should not go into plastic recycling. Our specification states that the bag returns to soil within 240 days in industrial composting. Store unused bags in a cool, dry place away from direct sunlight; shelf life is 12 months from the date of manufacture.`,
    faqs: [
      { q: `What garment sizes are covered?`, a: `Shirt, suit and gown lengths. Send your garment dimensions and we will match a size.` },
      { q: `Are hanger-hole bags available?`, a: `Yes. Bags are available on roll or pre-cut with a hanger hole, with gusset options.` },
      { q: `Is the film breathable?`, a: `Yes. It is breathable, so it does not trap moisture.` },
      { q: `Is it clear or frosted?`, a: `Both finishes are available.` },
      MOQ(`Share your bag size and thickness and we will confirm the quantity.`),
      QUOTE(`Tell us your garment types, lengths and whether you want a hanger hole.`)
    ]
  },

  'compostable-grocery-bags': {
    whoTitle: `Who uses compostable grocery bags`,
    who: [
      `Grocery carrier bags are used by supermarkets and grocery chains, kirana and provision stores, organic and refill stores, and daily-needs retailers. They are sized and gauged for a weekly shop, with a strong base and handles.`,
      `The bags are food-contact safe and printable for store branding. Our specification lists them as compliant with single-use plastic bans.`
    ],
    sizing: `Bags run from 10"×14" to 16"×20". Small sizes suit a few items, and larger sizes suit a full basket. The handle can be W-cut, U-cut or loop, so choose the style that your customers and counter staff find easiest.`,
    thickness: `Bags are made in 25 to 50 microns, with a load rating of up to 6 kg, depending on size. Lower gauges suit light packaged goods. Higher gauges suit heavier items such as bottles, cans and bulk staples. The rating depends on the size, so tell us your heaviest typical basket when you request a quote.`,
    disposal: `Used bags should go to industrial composting where it is available, and bags that held food can go in with food waste. Our specification states that the bag returns to soil within 240 days in industrial composting. Store unused bags in a cool, dry place; shelf life is 12 months from the date of manufacture.`,
    faqs: [
      { q: `How much can a grocery bag carry?`, a: `The load rating is up to 6 kg, depending on size.` },
      { q: `What handle styles are available?`, a: `W-cut, U-cut or loop.` },
      { q: `Are the bags safe for food contact?`, a: `Yes. They are food-contact safe.` },
      { q: `What sizes are available?`, a: `Sizes run from 10"×14" to 16"×20".` },
      MOQ(`Tell us your bag size and thickness and we will confirm the quantity.`),
      QUOTE(`Share your size, typical basket weight and handle style.`)
    ]
  },

  'compostable-loop-handle-bags': {
    whoTitle: `Who uses compostable loop handle bags`,
    who: [
      `Loop-handle bags are used by premium retailers and boutiques, for gifting and corporate hampers, by restaurants and takeaway, and at events and brand activations. They give a soft, comfortable carry and a refined, fabric-like body.`,
      `The flexible loop handle is heat-welded for strength. The bag is compostable and compliant with single-use plastic rules, as stated in the specification.`
    ],
    sizing: `Bags run from 10"×14" to 15"×18". Choose the size from the largest item you pack, and leave room so that the bag closes without strain. Larger sizes suit hampers and boxed gifts, and smaller sizes suit accessories and takeaway.`,
    thickness: `Bags are made in 40 to 60 microns. The lower end suits light garments and small gifts. The higher end suits boxed items, hampers and heavier takeaway, and holds its shape better when carried. The finish is a matte premium surface. Check a print proof on the finish before you place a full order.`,
    disposal: `Used bags should go to industrial composting where it is available. Our specification states that the bag returns to soil within 240 days in industrial composting. Customers can reuse the bag before disposal. Store unused bags in a cool, dry place; shelf life is 12 months from the date of manufacture.`,
    faqs: [
      { q: `What sizes are available?`, a: `Sizes run from 10"×14" to 15"×18".` },
      { q: `How is the handle attached?`, a: `The flexible loop handle is heat-welded for strength.` },
      { q: `What does the finish look like?`, a: `A matte premium finish with a fabric-like body.` },
      PRINT(`The finish suits detailed brand artwork.`),
      MOQ(`Share your bag size and thickness and we will confirm the quantity.`),
      QUOTE(`Tell us your bag size, artwork and what goes in the bag.`)
    ]
  },

  'compostable-pet-poop-bags': {
    whoTitle: `Who uses compostable pet poop bags`,
    who: [
      `Pet waste bags are used by pet stores and vet clinics, dog-walking and pet services, parks and public spaces, and pet-owner retail and D2C brands. They are leak-proof and odour-resistant, and easy to open and tie.`,
      `The bags come on tear-off rolls that fit standard dispensers and leash clips, packed in retail cartons.`
    ],
    sizing: `The bag size is 9"×13", with 15 to 20 bags per roll. The rolls are packed in retail cartons, which suits shelf display in a pet store. For dispenser stations in parks, tell us the dispenser model so that the core size can be matched.`,
    thickness: `Bags are made in 18 to 25 microns. The film is thin enough to open easily with one hand, and strong enough to hold the contents without leaking. If you supply public dispensers that are exposed to heat and moisture, store rolls in a cool, dry place and trial a batch before a full rollout.`,
    disposal: `Do not add pet waste to a compost heap used for food crops. Check whether your local composting facility accepts pet waste; if it does not, dispose of the bag in general waste as per local rules. Our specification states that the bag returns to soil within 240 days in industrial composting. Store unused rolls in a cool, dry place; shelf life is 12 months from the date of manufacture.`,
    faqs: [
      { q: `What size are the bags and how many are on a roll?`, a: `The bag size is 9"×13", with 15 to 20 bags per roll.` },
      { q: `Are the bags leak-proof?`, a: `Yes. They are leak-proof and odour-resistant.` },
      { q: `Do the rolls fit standard dispensers?`, a: `Yes. They are tear-off rolls that fit standard dispensers and leash clips.` },
      { q: `Can pet waste bags go into a compost bin?`, a: `Not into a heap used for food crops. Check with your local composting facility whether it accepts pet waste, and follow local rules if it does not.` },
      MOQ(`Tell us your roll count and carton size and we will confirm the quantity.`),
      QUOTE(`Share how you sell the bags, such as retail cartons or dispenser refills.`)
    ]
  },

  'compostable-prasadam-pouches': {
    whoTitle: `Who uses compostable prasadam pouches`,
    who: [
      `Prasadam pouches are used by temples and religious trusts, at festival and event distribution, in langar and bhandara services, and in pilgrimage and yatra logistics. They are food-contact safe, with a clean and dignified presentation.`,
      `They can be printed with temple branding and motifs, sealed by heat or folded closed, and composted together with food offerings.`
    ],
    sizing: `Pouches run from 4"×6" to 8"×10". Choose the size from the portion you distribute, such as a handful of sweets or a boxed serving, and leave room to seal the pouch. Smaller pouches suit daily darshan, and larger pouches suit festivals and special offerings.`,
    thickness: `Pouches are made in 20 to 35 microns. The lower end suits dry items. The higher end suits heavier or sharper contents. If your prasadam is oily, such as ghee-based sweets, test samples before ordering in volume. The pouch has a side seal with an optional zip.`,
    disposal: `Used pouches can go to composting together with food offerings where an industrial composting facility is available. Our specification states that the pouch returns to soil within 240 days in industrial composting. Store unused pouches in a cool, dry place; shelf life is 12 months from the date of manufacture.`,
    faqs: [
      { q: `What sizes are available?`, a: `Sizes run from 4"×6" to 8"×10".` },
      { q: `Is the pouch safe for food?`, a: `Yes. It is food-contact safe.` },
      { q: `Can we print our temple name and motifs?`, a: `Yes. Custom temple branding can be printed in up to 8 colours.` },
      { q: `How is the pouch sealed?`, a: `With a side seal, with an optional zip. It can be heat-sealed or fold-closed.` },
      MOQ(`Share your pouch size and thickness and we will confirm the quantity.`),
      QUOTE(`Tell us the type of prasadam, the serving size and how many you distribute.`)
    ]
  },
  'compostable-courier-bags-mailers': {
    whoTitle: 'Who uses compostable courier mailers',
    who: [
      'Packin Club courier mailers are made for businesses that ship parcels every day: online stores and D2C brands, apparel and accessory sellers, subscription and gift box companies, and teams that handle returns and reverse logistics.',
      'The permanent self-seal strip and tamper-evident lip suit busy packing tables, and the matte write-on surface is meant for shipping labels and handwritten notes. If you use plastic poly mailers today, this is a compostable replacement in the same opaque, water-resistant format.'
    ],
    sizing: 'Measure your packed item at its widest and tallest points, then choose a mailer with enough room for the item plus the adhesive strip and flap. A mailer that is too tight strains at the seal, and one that is too large wastes material and shipping space. Sizes run from 9"×12" to 16"×20", and custom sizes are available.',
    thickness: 'Mailers are made in 50 to 60 microns. Soft, light items such as t-shirts, innerwear and accessories usually travel well at the lower end of that range. Heavier or harder items such as footwear, folded denim, books or products with firm corners are better suited to the thicker end, because the film has to resist rubbing and pressure during sorting and handling. A mailer is a cover, not a cushion, so wrap fragile goods in a protective layer first. When you request a quote, tell us the product weight and shipping route, and trial a small batch on your own packing line before ordering in volume.',
    disposal: 'Compostable mailers are designed for industrial composting, where temperature and moisture are controlled. They do not belong in the plastic recycling stream. Our specification states that the mailer returns to soil within 240 days in industrial composting. Remove paper labels and tape where you can, and check which composting facility serves your customers, as access differs from city to city. Store unused mailers in a cool, dry place; shelf life is 12 months from the date of manufacture.',
    faqs: [
      { q: 'What sizes do the compostable courier mailers come in?', a: 'Standard sizes run from 9"×12" to 16"×20". Custom sizes are available on request.' },
      { q: 'What is the minimum order quantity?', a: 'The minimum order is 100 kg per specification. Share your size and thickness and we will confirm what that means in number of mailers.' },
      { q: 'Can I print my brand on the mailers?', a: 'Yes. Printing is available in up to 8 colours using flexographic, food-grade inks.' },
      { q: 'Are the mailers water-resistant?', a: 'Yes. The film is opaque and water-resistant, which protects parcels from splashes and damp conditions in transit. It is not a sealed waterproof container.' },
      { q: 'How should customers dispose of the mailer?', a: 'Send it to industrial composting where available. It should not go into plastic recycling. Removing paper labels first helps.' },
      { q: 'How do I get samples and a quote?', a: 'Use the quote form on this page or the contact page. We send samples and a quote within two business days.' }
    ]
  }
};

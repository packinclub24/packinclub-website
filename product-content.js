// Extra buyer-guide content for product pages (Node only: used by generate-products.js).
// Key = product slug. Every field is optional: a section is only shown if you fill it in.
//   whoTitle:   (optional) heading for the first section
//   who:        who buys and uses this product (1-2 short paragraphs, array of strings)
//   sizing:     tip on picking a size (string)
//   thickness:  how to choose thickness (string)
//   disposal:   disposal and storage (string)
//   faqs:       [{ q: 'Question?', a: 'Answer.' }, ...]  (aim for 6)
// After editing, run:  node generate-products.js
// Only write facts you can back up (specs, certificates, what you really offer).
module.exports = {
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

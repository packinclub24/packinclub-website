/* Packin Club — customer testimonials.
   Source: real customer reviews, originally posted on IndiaMART, reused here
   with each customer's explicit permission (confirmed by Soham, Sept 2026).
   Each entry can optionally be pinned to a specific product via "forSlug"
   (must match a product-data.js slug exactly). Entries with no "forSlug"
   are treated as general/company-wide and used as fallback on any product
   page that has no reviews of its own — this guarantees every product page
   always has at least one real review, satisfying Google's Product schema
   requirement (offers/review/aggregateRating) without ever inventing one. */

window.PACKIN_REVIEWS = [
  // -------- Pinned to a specific product (exact match to their review) --------
  {
    author: 'Papneet Singh',
    location: 'New Delhi, Delhi',
    rating: 5,
    text: 'Quality is good. Bags are strong enough for our use.',
    forSlug: 'compostable-garbage-bags'
  },
  {
    author: 'Pradyum Arora',
    location: 'New Delhi, Delhi',
    rating: 5,
    text: 'Good quality shrink film. Packaging was also proper.',
    forSlug: 'compostable-shrink-film'
  },
  {
    author: 'Amit Kumar Abhinandan',
    location: 'Begusarai, Bihar',
    rating: 5,
    text: 'Courier bags are good. Delivery was also on time.',
    forSlug: 'compostable-courier-bags-mailers'
  },

  // -------- General / company-wide (product they mentioned was too generic
  //          to pin confidently to one of the 24 catalog pages) --------
  {
    author: 'Amol Anandrao Shelke',
    location: 'Bhiwandi, Maharashtra',
    rating: 5,
    text: 'Film quality is good and we got what we required.'
  },
  {
    author: 'Jatin',
    location: 'Gurgaon, Haryana',
    rating: 4,
    text: 'Quality is good. We are satisfied with the bags.'
  },
  {
    author: 'Rajeev Ranjan',
    location: 'Noida, Uttar Pradesh',
    rating: 5,
    text: 'Response was good and delivery was on time. Quality is also good.'
  },
  {
    author: 'Dhiraj Khanna',
    location: 'Bahadurgarh, Haryana',
    rating: 5,
    text: 'Product was good and received the material properly.'
  },
  {
    author: 'Pratik',
    location: 'Ahmedabad, Gujarat',
    rating: 5,
    text: 'Good quality bags. We will order again.'
  }
];

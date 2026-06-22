// ── MOCK DATA ──────────────────────────────────────────────────────────────

export const services = [
  { id: 1, name: 'Box Braids', category: 'braids', price: 120, duration: '4-6 hrs', icon: '🪢', description: 'Classic protective box braids in any length and thickness.' },
  { id: 2, name: 'Knotless Braids', category: 'braids', price: 150, duration: '5-7 hrs', icon: '✨', description: 'Tension-free knotless box braids for a natural look.' },
  { id: 3, name: 'Goddess Braids', category: 'braids', price: 100, duration: '2-3 hrs', icon: '👑', description: 'Large, thick braids worn close to the scalp.' },
  { id: 4, name: 'Senegalese Twists', category: 'twists', price: 130, duration: '4-5 hrs', icon: '🌀', description: 'Elegant rope-like twists for a sleek protective style.' },
  { id: 5, name: 'Marley Twists', category: 'twists', price: 110, duration: '3-4 hrs', icon: '🌿', description: 'Full, textured twists with a natural Afro feel.' },
  { id: 6, name: 'Starter Locs', category: 'locks', price: 80, duration: '2-3 hrs', icon: '🔒', description: 'Begin your loc journey with professional starter locs.' },
  { id: 7, name: 'Loc Retwist', category: 'locks', price: 60, duration: '1-2 hrs', icon: '🔄', description: 'Professional retwisting to maintain and define locs.' },
  { id: 8, name: 'Wig Installation', category: 'wig-installation', price: 80, duration: '1-2 hrs', icon: '💆', description: 'Secure wig installation with glue or tape method.' },
  { id: 9, name: 'Wig Customisation', category: 'wig-installation', price: 120, duration: '2-3 hrs', icon: '✂️', description: 'Custom wig fitting, bleaching knots and baby hair.' },
  { id: 10, name: 'Frontal Sew-In', category: 'frontal-closure', price: 200, duration: '4-5 hrs', icon: '💎', description: 'Full frontal sew-in for a flawless natural hairline.' },
  { id: 11, name: 'Closure Sew-In', category: 'frontal-closure', price: 160, duration: '3-4 hrs', icon: '🌹', description: 'Closure sew-in with versatile parting options.' },
  { id: 12, name: 'Blowout & Style', category: 'hair-styling', price: 70, duration: '1-2 hrs', icon: '💨', description: 'Professional blowout and styling for any occasion.' },
  { id: 13, name: 'Deep Conditioning', category: 'hair-treatments', price: 55, duration: '1 hr', icon: '💧', description: 'Intensive moisture treatment for dry, damaged hair.' },
  { id: 14, name: 'Bridal Makeup', category: 'makeup', price: 180, duration: '2-3 hrs', icon: '💄', description: 'Full bridal makeup for your special day.' },
  { id: 15, name: 'Cut & Shape', category: 'barbers', price: 35, duration: '30-45 min', icon: '✂️', description: 'Professional barbering cuts for all hair types.' },
];

export const providers = [
  {
    id: 1,
    name: 'Amara Okafor',
    title: 'Hair Braiding Specialist',
    location: 'London, UK',
    rating: 4.9,
    reviews: 127,
    startingPrice: 80,
    services: ['braids', 'twists', 'locks'],
    bio: 'With over 8 years of experience, Amara specialises in protective styling, knotless braids, and loc maintenance. Known for her meticulous attention to detail and gentle technique.',
    verified: true,
    image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=400&fit=crop',
    portfolio: [
      'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=300&h=300&fit=crop',
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=300&h=300&fit=crop',
    ],
    availability: ['Mon', 'Tue', 'Thu', 'Fri', 'Sat'],
  },
  {
    id: 2,
    name: 'Zoe Williams',
    title: 'Wig & Extensions Expert',
    location: 'Manchester, UK',
    rating: 4.8,
    reviews: 94,
    startingPrice: 75,
    services: ['wig-installation', 'frontal-closure', 'hair-styling'],
    bio: 'Zoe is a certified wig installation artist with a passion for natural-looking results. Her expertise spans lace front installations, closure sew-ins, and wig customisation.',
    verified: true,
    image: 'https://images.unsplash.com/photo-1526510747491-58f928ec870f?w=400&h=400&fit=crop',
    portfolio: [
      'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=300&h=300&fit=crop',
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=300&fit=crop',
    ],
    availability: ['Tue', 'Wed', 'Fri', 'Sat', 'Sun'],
  },
  {
    id: 3,
    name: 'Temi Adeyemi',
    title: 'Natural Hair & Loc Specialist',
    location: 'Birmingham, UK',
    rating: 5.0,
    reviews: 63,
    startingPrice: 55,
    services: ['locks', 'twists', 'hair-treatments'],
    bio: 'Temi is a natural hair advocate with deep expertise in loc journeys, retwists, and healthy hair treatments. She creates a calm, nurturing experience for every client.',
    verified: true,
    image: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400&h=400&fit=crop',
    portfolio: [
      'https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=300&h=300&fit=crop',
    ],
    availability: ['Mon', 'Wed', 'Sat'],
  },
  {
    id: 4,
    name: 'Chisom Nwosu',
    title: 'MUA & Bridal Specialist',
    location: 'London, UK',
    rating: 4.9,
    reviews: 211,
    startingPrice: 90,
    services: ['makeup'],
    bio: 'Award-winning makeup artist specialising in bridal, editorial, and glam looks. Chisom is known for her flawless airbrushed skin prep and long-lasting finishes.',
    verified: true,
    image: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=400&h=400&fit=crop',
    portfolio: [],
    availability: ['Fri', 'Sat', 'Sun'],
  },
];

export const products = [
  // WIGS
  { id: 1, name: 'Luxe Silk Lace Front Wig', category: 'wigs', price: 299, originalPrice: 380, rating: 4.9, reviews: 84, inStock: true, badge: 'Best Seller',
    description: 'Premium 13x4 lace front wig. Pre-plucked, bleached knots, baby hairs. 180% density.',
    images: {
      '#2B1206': 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&h=700&fit=crop',
      '#6B3A2A': 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=600&h=700&fit=crop',
      '#C4A882': 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=600&h=700&fit=crop',
      '#1A0A00': 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&h=700&fit=crop',
      '#8B4513': 'https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=600&h=700&fit=crop',
    },
    defaultColor: '#2B1206',
  },
  { id: 2, name: 'Body Wave HD Lace Wig', category: 'wigs', price: 249, originalPrice: 320, rating: 4.8, reviews: 102, inStock: true, badge: 'New',
    description: 'Silky body wave human hair wig with HD transparent lace. Ultra natural hairline.',
    images: {
      '#2B1206': 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=600&h=700&fit=crop',
      '#1A0A00': 'https://images.unsplash.com/photo-1526510747491-58f928ec870f?w=600&h=700&fit=crop',
      '#C4A882': 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=600&h=700&fit=crop',
    },
    defaultColor: '#2B1206',
  },
  // BUNDLES
  { id: 3, name: 'Brazilian Body Wave Bundle', category: 'bundles', price: 89, originalPrice: 120, rating: 4.7, reviews: 156, inStock: true, badge: null,
    description: 'Grade 12A Brazilian body wave hair bundles. Double weft, minimal shedding.',
    images: {
      '#2B1206': 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&h=700&fit=crop',
      '#1A0A00': 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=600&h=700&fit=crop',
    },
    defaultColor: '#2B1206',
  },
  { id: 4, name: 'Peruvian Straight Bundle', category: 'bundles', price: 79, originalPrice: null, rating: 4.6, reviews: 88, inStock: true, badge: null,
    description: 'Silky straight Peruvian hair. 3-bundle deal available.',
    images: { '#1A0A00': 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=600&h=700&fit=crop' },
    defaultColor: '#1A0A00',
  },
  // TREATMENTS
  { id: 5, name: 'Deep Moisture Mask', category: 'treatments', price: 28, originalPrice: 35, rating: 4.9, reviews: 210, inStock: true, badge: 'Best Seller',
    description: 'Intense hydration treatment for dry, brittle hair. With shea butter & argan oil.',
    images: { '#F5E6D3': 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600&h=700&fit=crop' },
    defaultColor: '#F5E6D3',
  },
  { id: 6, name: 'Scalp Serum Elixir', category: 'treatments', price: 45, originalPrice: null, rating: 4.8, reviews: 67, inStock: true, badge: 'New',
    description: 'Targeted scalp serum to promote hair growth and reduce dandruff.',
    images: { '#E8F4F8': 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=600&h=700&fit=crop' },
    defaultColor: '#E8F4F8',
  },
  // ACCESSORIES
  { id: 7, name: 'Satin Bonnet Set', category: 'accessories', price: 18, originalPrice: 25, rating: 4.7, reviews: 304, inStock: true, badge: null,
    description: 'Set of 3 satin sleep bonnets to protect your hair overnight.',
    images: { '#E8A2A2': 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=700&fit=crop' },
    defaultColor: '#E8A2A2',
  },
  // LASHES
  { id: 8, name: 'Mink Lash Collection', category: 'lashes', price: 22, originalPrice: null, rating: 4.9, reviews: 178, inStock: true, badge: 'Best Seller',
    description: '3D faux mink lashes. Reusable up to 25 times. Natural to dramatic styles.',
    images: { '#1A0A00': 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=600&h=700&fit=crop' },
    defaultColor: '#1A0A00',
  },
];

export const hairColors = [
  { hex: '#2B1206', name: 'Natural Black' },
  { hex: '#1A0A00', name: 'Jet Black' },
  { hex: '#6B3A2A', name: 'Dark Brown' },
  { hex: '#8B4513', name: 'Medium Brown' },
  { hex: '#C4A882', name: 'Blonde' },
  { hex: '#D4A017', name: 'Honey Blonde' },
  { hex: '#E8D5B7', name: 'Light Blonde' },
  { hex: '#8B0000', name: 'Burgundy' },
  { hex: '#4B0082', name: 'Dark Purple' },
  { hex: '#FF6B6B', name: 'Copper Red' },
  { hex: '#2C2C54', name: 'Midnight Blue' },
  { hex: '#1B4332', name: 'Forest Green' },
  { hex: '#E8A2A2', name: 'Dusty Rose' },
  { hex: '#B0C4DE', name: 'Steel Blue' },
];

export const hairLengths = [10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30];

export const hairTextures = [
  'Straight', 'Body Wave', 'Deep Wave', 'Curly', 'Kinky Curly',
  'Water Wave', 'Loose Wave', 'Afro Kinky', 'Yaki Straight', 'Jerry Curl',
];

export const categories = [
  { id: 'wigs', label: 'Wigs', icon: '💆', path: '/shop/wigs' },
  { id: 'bundles', label: 'Hair Bundles', icon: '✨', path: '/shop/bundles' },
  { id: 'treatments', label: 'Hair Treatments', icon: '💧', path: '/shop/treatments' },
  { id: 'accessories', label: 'Hair Accessories', icon: '🎀', path: '/shop/accessories' },
  { id: 'lashes', label: 'Lashes', icon: '👁️', path: '/shop/lashes' },
];

export const serviceCategories = [
  { id: 'braids', label: 'Braids', icon: '🪢', color: 'bg-primary-container' },
  { id: 'twists', label: 'Twists', icon: '🌀', color: 'bg-secondary-container' },
  { id: 'locks', label: 'Locks', icon: '🔒', color: 'bg-tertiary-container' },
  { id: 'wig-installation', label: 'Wig Installation', icon: '💆', color: 'bg-primary-fixed' },
  { id: 'frontal-closure', label: 'Frontal & Closure', icon: '💎', color: 'bg-surface-container-highest' },
  { id: 'hair-styling', label: 'Hair Styling', icon: '💨', color: 'bg-secondary-container' },
  { id: 'hair-treatments', label: 'Hair Treatments', icon: '💧', color: 'bg-tertiary-fixed' },
  { id: 'makeup', label: 'Makeup', icon: '💄', color: 'bg-primary-container' },
  { id: 'barbers', label: 'Barbers', icon: '✂️', color: 'bg-surface-container-high' },
];

export const faqData = [
  { category: 'Booking', questions: [
    { q: 'How do I book a service?', a: 'Browse services, choose a provider, select a date and time, and confirm your booking. You\'ll receive an instant confirmation.' },
    { q: 'Can I reschedule my appointment?', a: 'Yes! You can reschedule up to 24 hours before your appointment through your dashboard or by contacting support.' },
    { q: 'What if my provider cancels?', a: 'You\'ll be notified immediately and we\'ll help you rebook with another provider at no extra cost.' },
  ]},
  { category: 'Payments', questions: [
    { q: 'What payment methods do you accept?', a: 'We accept all major credit/debit cards, Apple Pay, Google Pay, and PayPal.' },
    { q: 'Is my payment secure?', a: 'Yes. All payments are processed through Stripe with 256-bit encryption.' },
  ]},
  { category: 'Orders', questions: [
    { q: 'How long does delivery take?', a: 'Standard delivery is 3-5 business days. Express delivery (1-2 days) is available at checkout.' },
    { q: 'Can I track my order?', a: 'Yes! You\'ll receive a tracking number by email once your order is dispatched.' },
  ]},
  { category: 'Providers', questions: [
    { q: 'How are providers verified?', a: 'All providers go through an ID check, qualification verification, and portfolio review before being listed.' },
    { q: 'Can I leave a review?', a: 'Yes, after each appointment you\'ll be prompted to leave a star rating and written review.' },
  ]},
  { category: 'Account', questions: [
    { q: 'How do I earn referral credits?', a: 'Share your unique referral code. When a friend signs up and makes their first booking, you both earn £10 credit.' },
    { q: 'How do I delete my account?', a: 'Contact our support team and we\'ll process your account deletion within 7 business days.' },
  ]},
];

export const teamMembers = [
  { name: 'Tsemaye Okoroh', role: 'Founder & CEO', bio: 'Hair enthusiast and entrepreneur on a mission to modernise the Black beauty industry through technology.' },
  { name: 'Adaeze Chukwu', role: 'Head of Product', bio: 'Former UX designer at Deliveroo. Passionate about creating seamless beauty experiences.' },
  { name: 'Kemi Adeola', role: 'Head of Community', bio: 'Connecting providers and clients to build the most trusted beauty marketplace in the UK.' },
];

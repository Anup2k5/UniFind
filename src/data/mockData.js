export const CATEGORIES = [
  { id: 'all', name: 'All Categories', icon: 'Layers', count: 0 },
  { id: 'electronics', name: 'Electronics & Gadgets', icon: 'Laptop', count: 0, color: 'text-blue-500 bg-blue-50 dark:bg-blue-950/50' },
  { id: 'wallets-ids', name: 'Wallets & Student IDs', icon: 'CreditCard', count: 0, color: 'text-amber-500 bg-amber-50 dark:bg-amber-950/50' },
  { id: 'keys', name: 'Keys & Lanyards', icon: 'Key', count: 0, color: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/50' },
  { id: 'bags', name: 'Bags & Backpacks', icon: 'Briefcase', count: 0, color: 'text-purple-500 bg-purple-50 dark:bg-purple-950/50' },
  { id: 'clothing', name: 'Clothing & Jackets', icon: 'Shirt', count: 0, color: 'text-pink-500 bg-pink-50 dark:bg-pink-950/50' },
  { id: 'books', name: 'Books & Notebooks', icon: 'BookOpen', count: 0, color: 'text-orange-500 bg-orange-50 dark:bg-orange-950/50' },
  { id: 'accessories', name: 'Jewelry & Watches', icon: 'Watch', count: 0, color: 'text-indigo-500 bg-indigo-50 dark:bg-indigo-950/50' },
  { id: 'sports', name: 'Sports & Bottles', icon: 'Dumbbell', count: 0, color: 'text-teal-500 bg-teal-50 dark:bg-teal-950/50' },
  { id: 'other', name: 'Other Campus Items', icon: 'HelpCircle', count: 0, color: 'text-gray-500 bg-gray-50 dark:bg-gray-950/50' },
];

export const CAMPUS_LOCATIONS = [
  { id: 'library', name: 'Central University Library (Levels 1-4)', building: 'Bldg A - Library Commons', area: 'North Quad' },
  { id: 'student-union', name: 'Student Union & Dining Hall', building: 'Bldg C - Student Center', area: 'Central Campus' },
  { id: 'science-quad', name: 'Science Quad & BioTech Labs', building: 'Bldg D - Hall of Sciences', area: 'East Quad' },
  { id: 'engineering-hall', name: 'Turing Engineering & Tech Hall', building: 'Bldg E - Engineering', area: 'South Campus' },
  { id: 'sports-complex', name: 'Recreation & Sports Center (Gym)', building: 'Bldg G - Athletics', area: 'West Campus' },
  { id: 'shuttle-stops', name: 'Campus Shuttle Bus / Transit Center', building: 'Transit Hub', area: 'Perimeter' },
  { id: 'arts-center', name: 'Fine Arts Center & Concert Hall', building: 'Bldg F - Performing Arts', area: 'South Quad' },
  { id: 'law-annex', name: 'Graduate Commons & Law Annex', building: 'Bldg B - Graduate Wing', area: 'North Quad' },
];

export const SAFE_DROP_OFF_ZONES = [
  {
    id: 'desk-lib',
    name: 'Central Library Circulation Desk',
    building: 'Main Library 1st Floor Lobby',
    hours: '24/7 during semester',
    phone: '(555) 019-4821',
    officerInCharge: 'Officer Davis',
    status: 'Open Now'
  },
  {
    id: 'desk-security',
    name: 'Campus Public Safety & Security HQ',
    building: 'Hall of Administration, Room 102',
    hours: '24/7 Always Open',
    phone: '(555) 019-9111',
    officerInCharge: 'Capt. Miller',
    status: 'Open Now'
  },
  {
    id: 'desk-union',
    name: 'Student Union Welcome & Info Desk',
    building: 'Student Life Center, Ground Floor',
    hours: 'Mon-Sun: 8:00 AM - 10:00 PM',
    phone: '(555) 019-3382',
    officerInCharge: 'Student Staff Team',
    status: 'Open Now'
  },
  {
    id: 'desk-gym',
    name: 'Recreation Center Equipment Desk',
    building: 'Sports Complex, Front Turnstiles',
    hours: 'Mon-Fri: 6:00 AM - 11:00 PM',
    phone: '(555) 019-7720',
    officerInCharge: 'Coach Bradley',
    status: 'Open Now'
  }
];

export const DEMO_USERS = [
  {
    id: 'user-1',
    name: 'Anup Kumar',
    email: 'anup.kumar@university.edu',
    studentId: 'ADMIN-2024-001',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
    department: 'Campus Public Safety & System Administration',
    phone: '+1 (555) 234-5678',
    reputation: 'Lead Administrator',
    badge: 'Verified Staff & Admin'
  },
  {
    id: 'user-2',
    name: 'Marcus Chen',
    email: 'm.chen@student.university.edu',
    studentId: 'STU-2023-4192',
    role: 'student',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    department: 'Mechanical Engineering, Class of 2025',
    phone: '+1 (555) 876-5432',
    reputation: '2 items recovered'
  },
  {
    id: 'user-3',
    name: 'Priya Patel',
    email: 'p.patel@student.university.edu',
    studentId: 'STU-2025-9921',
    role: 'student',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    department: 'Biomedical Sciences, Class of 2027',
    phone: '+1 (555) 345-6789',
    reputation: '1 item recovered'
  },
  {
    id: 'admin-1',
    name: 'Officer Davis (Campus Security)',
    email: 'safety-admin@university.edu',
    studentId: 'SEC-OFFICER-042',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80',
    department: 'Department of Campus Safety & Police Services',
    phone: '(555) 019-9111',
    badge: 'Verified Staff'
  }
];

export const INITIAL_ITEMS = [
  {
    id: 'item-101',
    title: 'Space Gray MacBook Air 13" (M2)',
    type: 'lost', // 'lost' | 'found'
    status: 'Lost', // 'Lost' | 'Found' | 'Matched' | 'Claimed' | 'Resolved'
    category: 'electronics',
    location: 'Central University Library (Levels 1-4)',
    specificLocation: '3rd Floor silent study desks near window table #14',
    date: '2026-11-13',
    time: '14:30',
    description: 'Space Gray 13-inch MacBook Air with distinctive sticker on lid ("Octocat" and a green retro Python sticker). Has a clear matte protective case with a small scratch near the top right corner.',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
    reporter: {
      id: 'user-1',
      name: 'Anup Kumar',
      email: 'anup.kumar@student.university.edu',
      phone: '+1 (555) 234-5678',
      studentId: 'STU-2024-8841'
    },
    views: 89,
    claimsCount: 0,
    tags: ['laptop', 'apple', 'macbook', 'gray', 'stickers'],
    verificationQuestion: 'What stickers are on the keyboard deck or what is the login lock screen message?',
    safeZone: null,
    createdAt: '2026-11-13T15:00:00Z',
    isUrgent: true
  },
  {
    id: 'item-102',
    title: 'Found: Apple MacBook Air Space Gray',
    type: 'found',
    status: 'Matched',
    category: 'electronics',
    location: 'Central University Library (Levels 1-4)',
    specificLocation: 'Turned into 1st Floor Helpdesk by a library patron',
    date: '2026-11-13',
    time: '16:00',
    description: 'Found a MacBook Air left behind on Level 3 tables. Has stickers and a hard shell case. Turned over to Library Circulation desk for safe holding.',
    image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=800&q=80',
    reporter: {
      id: 'user-2',
      name: 'Marcus Chen',
      email: 'm.chen@student.university.edu',
      phone: '+1 (555) 876-5432',
      studentId: 'STU-2023-4192'
    },
    views: 64,
    claimsCount: 1,
    tags: ['laptop', 'apple', 'stickers', 'macbook'],
    verificationQuestion: 'Describe the stickers on the lid and specify the serial number ending or user account name.',
    safeZone: 'Central Library Circulation Desk',
    matchedItemId: 'item-101',
    createdAt: '2026-11-13T16:15:00Z',
    isUrgent: false
  },
  {
    id: 'item-103',
    title: 'Hydro Flask 32oz Wide Mouth (Pacific Blue)',
    type: 'lost',
    status: 'Lost',
    category: 'sports',
    location: 'Recreation & Sports Center (Gym)',
    specificLocation: 'Weight room near bench press area #3',
    date: '2026-11-12',
    time: '18:15',
    description: 'Cobalt/Pacific Blue 32oz Hydro Flask with black flex boot on bottom and yellow paracord handle. Has a National Parks sticker and several outdoor trail stickers.',
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80',
    reporter: {
      id: 'user-2',
      name: 'Marcus Chen',
      email: 'm.chen@student.university.edu',
      phone: '+1 (555) 876-5432',
      studentId: 'STU-2023-4192'
    },
    views: 42,
    claimsCount: 0,
    tags: ['water bottle', 'hydro flask', 'blue', 'gym', 'stickers'],
    verificationQuestion: 'Which specific national park sticker is on the bottle?',
    safeZone: null,
    createdAt: '2026-11-12T19:00:00Z',
    isUrgent: false
  },
  {
    id: 'item-104',
    title: 'Official Student Campus ID Card & Dorm Keycard',
    type: 'found',
    status: 'Found',
    category: 'wallets-ids',
    location: 'Student Union & Dining Hall',
    specificLocation: 'Table near Panda Express food court',
    date: '2026-11-13',
    time: '12:45',
    description: 'University Student ID card found on dining table. Name on card is "Alex R. Vance". Stored safely with Student Union info desk staff.',
    image: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=800&q=80',
    reporter: {
      id: 'user-3',
      name: 'Priya Patel',
      email: 'p.patel@student.university.edu',
      phone: '+1 (555) 345-6789',
      studentId: 'STU-2025-9921'
    },
    views: 110,
    claimsCount: 0,
    tags: ['id card', 'student id', 'dorm key', 'wallet'],
    verificationQuestion: 'Confirm full middle name and student ID digits for identity verification.',
    safeZone: 'Student Union Welcome & Info Desk',
    createdAt: '2026-11-13T13:00:00Z',
    isUrgent: true
  },
  {
    id: 'item-105',
    title: 'Apple AirPods Pro (2nd Gen) in White Magsafe Case',
    type: 'found',
    status: 'Found',
    category: 'electronics',
    location: 'Turing Engineering & Tech Hall',
    specificLocation: 'Room 204 Computer Lab, left on workstation PC-08',
    date: '2026-11-13',
    time: '11:20',
    description: 'AirPods Pro 2nd Gen inside white wireless charging case with a mini silicone carabiner clip. Case has subtle initial engraving on front.',
    image: 'https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?auto=format&fit=crop&w=800&q=80',
    reporter: {
      id: 'admin-1',
      name: 'Officer Davis (Campus Security)',
      email: 'safety-admin@university.edu',
      phone: '(555) 019-9111',
      studentId: 'SEC-OFFICER-042'
    },
    views: 154,
    claimsCount: 2,
    tags: ['airpods', 'apple', 'earbuds', 'audio', 'headphones'],
    verificationQuestion: 'What initials or emoji are engraved on the charging case, or what is the Bluetooth device name?',
    safeZone: 'Campus Public Safety & Security HQ',
    createdAt: '2026-11-13T11:45:00Z',
    isUrgent: false
  },
  {
    id: 'item-106',
    title: 'The North Face Jester Backpack (Black/Charcoal)',
    type: 'lost',
    status: 'Lost',
    category: 'bags',
    location: 'Campus Shuttle Bus / Transit Center',
    specificLocation: 'North Campus Shuttle Route 4, back seat row',
    date: '2026-11-12',
    time: '17:40',
    description: 'Black North Face backpack containing Organic Chemistry binder, Texas Instruments TI-84 calculator, and black spiral notebooks. Extremely important for upcoming midterms!',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
    reporter: {
      id: 'user-3',
      name: 'Priya Patel',
      email: 'p.patel@student.university.edu',
      phone: '+1 (555) 345-6789',
      studentId: 'STU-2025-9921'
    },
    views: 78,
    claimsCount: 0,
    tags: ['backpack', 'north face', 'bag', 'binder', 'chemistry', 'notes'],
    verificationQuestion: 'What color is the pencil pouch inside the front pocket, and what course code is written on the binder?',
    safeZone: null,
    createdAt: '2026-11-12T18:00:00Z',
    isUrgent: true
  },
  {
    id: 'item-107',
    title: 'Honda Car Key with University Alumni Lanyard',
    type: 'found',
    status: 'Claimed',
    category: 'keys',
    location: 'Science Quad & BioTech Labs',
    specificLocation: 'Path between Greenhouse and Chemistry Atrium',
    date: '2026-11-11',
    time: '09:15',
    description: 'Single black Honda electronic key fob attached to a blue university woven lanyard with a silver gym membership scanner tag.',
    image: 'https://images.unsplash.com/photo-1582139329536-e7284fece509?auto=format&fit=crop&w=800&q=80',
    reporter: {
      id: 'admin-1',
      name: 'Officer Davis (Campus Security)',
      email: 'safety-admin@university.edu',
      phone: '(555) 019-9111',
      studentId: 'SEC-OFFICER-042'
    },
    views: 95,
    claimsCount: 1,
    tags: ['keys', 'car key', 'honda', 'lanyard'],
    verificationQuestion: 'What is the number written on the gym membership tag or car model?',
    safeZone: 'Campus Public Safety & Security HQ',
    createdAt: '2026-11-11T10:00:00Z',
    isUrgent: false
  },
  {
    id: 'item-108',
    title: 'Ray-Ban Clubmaster Classic Sunglasses in Brown Case',
    type: 'lost',
    status: 'Lost',
    category: 'accessories',
    location: 'Fine Arts Center & Concert Hall',
    specificLocation: 'Auditorium main seating area, row G seat 12',
    date: '2026-11-11',
    time: '19:30',
    description: 'Black and gold Ray-Ban Clubmaster sunglasses inside the standard brown leather Ray-Ban snap case with cleaning cloth.',
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80',
    reporter: {
      id: 'user-1',
      name: 'Anup Kumar',
      email: 'anup.kumar@student.university.edu',
      phone: '+1 (555) 234-5678',
      studentId: 'STU-2024-8841'
    },
    views: 52,
    claimsCount: 0,
    tags: ['sunglasses', 'ray-ban', 'glasses', 'accessories'],
    verificationQuestion: 'Are they prescription lenses or standard UV lenses, and what color is the cleaning cloth?',
    safeZone: null,
    createdAt: '2026-11-11T21:00:00Z',
    isUrgent: false
  },
  {
    id: 'item-109',
    title: 'Graphing Calculator TI-84 Plus CE (Mint Green)',
    type: 'found',
    status: 'Resolved',
    category: 'electronics',
    location: 'Turing Engineering & Tech Hall',
    specificLocation: 'Lecture Hall 101, left under desk seat 4',
    date: '2026-11-09',
    time: '15:10',
    description: 'Mint green TI-84 Plus CE graphing calculator. Slide cover has student initials inside.',
    image: 'https://images.unsplash.com/photo-1594980596870-8aa52a78d8cd?auto=format&fit=crop&w=800&q=80',
    reporter: {
      id: 'user-2',
      name: 'Marcus Chen',
      email: 'm.chen@student.university.edu',
      phone: '+1 (555) 876-5432',
      studentId: 'STU-2023-4192'
    },
    views: 122,
    claimsCount: 1,
    tags: ['calculator', 'math', 'ti-84', 'electronics', 'mint'],
    verificationQuestion: 'What are the initials inscribed inside the slide cover?',
    safeZone: 'Central Library Circulation Desk',
    createdAt: '2026-11-09T16:00:00Z',
    isUrgent: false
  },
  {
    id: 'item-110',
    title: 'Brown Leather Bi-fold Wallet (Fossil)',
    type: 'found',
    status: 'Found',
    category: 'wallets-ids',
    location: 'Recreation & Sports Center (Gym)',
    specificLocation: 'Locker Room benches, near locker #118',
    date: '2026-11-13',
    time: '08:30',
    description: 'Men brown leather Fossil bi-fold wallet. Contains driver license and student card. Handed over directly to Athletics front desk.',
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=800&q=80',
    reporter: {
      id: 'admin-1',
      name: 'Officer Davis (Campus Security)',
      email: 'safety-admin@university.edu',
      phone: '(555) 019-9111',
      studentId: 'SEC-OFFICER-042'
    },
    views: 83,
    claimsCount: 0,
    tags: ['wallet', 'leather', 'fossil', 'cards', 'license'],
    verificationQuestion: 'State the name on the driver license or specific card types inside.',
    safeZone: 'Recreation Center Equipment Desk',
    createdAt: '2026-11-13T09:00:00Z',
    isUrgent: true
  }
];

export const INITIAL_CLAIMS = [
  {
    id: 'claim-301',
    itemId: 'item-102',
    itemTitle: 'Found: Apple MacBook Air Space Gray',
    itemImage: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=800&q=80',
    claimantId: 'user-1',
    claimantName: 'Anup Kumar',
    claimantEmail: 'anup.kumar@student.university.edu',
    claimantPhone: '+1 (555) 234-5678',
    claimantStudentId: 'STU-2024-8841',
    claimDate: '2026-11-13T17:10:00Z',
    proofAnswers: 'The lid has an Octocat github sticker and a green python logo. The user login account is "anupk" with password hint "cs2026". Serial number ends with 4K89.',
    proofImage: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=300&q=80',
    status: 'Pending', // 'Pending' | 'Approved' | 'Rejected'
    adminNotes: 'Proof matches reporter description perfectly. High confidence match.',
    pickupCode: 'PICKUP-LIB-9428'
  },
  {
    id: 'claim-302',
    itemId: 'item-107',
    itemTitle: 'Honda Car Key with University Alumni Lanyard',
    itemImage: 'https://images.unsplash.com/photo-1582139329536-e7284fece509?auto=format&fit=crop&w=800&q=80',
    claimantId: 'user-2',
    claimantName: 'Marcus Chen',
    claimantEmail: 'm.chen@student.university.edu',
    claimantPhone: '+1 (555) 876-5432',
    claimantStudentId: 'STU-2023-4192',
    claimDate: '2026-11-12T11:00:00Z',
    proofAnswers: 'Honda Civic 2021 key. The blue gym barcode is #08492 from the campus rec center.',
    proofImage: null,
    status: 'Approved',
    adminNotes: 'Verified at Public Safety HQ with student ID. Awaiting student collection.',
    pickupCode: 'PICKUP-SEC-4190'
  }
];

export const INITIAL_NOTIFICATIONS = [
  {
    id: 'notif-1',
    userId: 'user-1',
    type: 'match',
    title: 'High Potential Match Detected!',
    message: 'A Found item matching your "Space Gray MacBook Air 13" was reported at Central University Library.',
    itemId: 'item-102',
    time: '20 minutes ago',
    read: false,
    date: '2026-11-13T17:00:00Z'
  },
  {
    id: 'notif-2',
    userId: 'user-2',
    type: 'claim_update',
    title: 'Claim Approved by Public Safety',
    message: 'Your claim for "Honda Car Key with University Alumni Lanyard" has been approved! Use pickup code PICKUP-SEC-4190.',
    itemId: 'item-107',
    time: '1 hour ago',
    read: false,
    date: '2026-11-13T16:20:00Z'
  },
  {
    id: 'notif-3',
    userId: 'user-1',
    type: 'system',
    title: 'Item Report Published',
    message: 'Your lost report for "Ray-Ban Clubmaster Classic" is active on the campus bulletin.',
    itemId: 'item-108',
    time: 'Yesterday',
    read: true,
    date: '2026-11-12T09:00:00Z'
  },
  {
    id: 'notif-4',
    userId: 'admin-1',
    type: 'admin_alert',
    title: 'New Verification Claim Submitted',
    message: 'Anup Kumar submitted a claim request for MacBook Air (Found at Library). Review required.',
    itemId: 'item-102',
    time: '35 minutes ago',
    read: false,
    date: '2026-11-13T17:15:00Z'
  }
];

export const SAMPLE_PHOTO_PRESETS = [
  { name: 'MacBook / Laptop', url: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80' },
  { name: 'Water Bottle / Flask', url: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80' },
  { name: 'Earbuds / AirPods', url: 'https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?auto=format&fit=crop&w=800&q=80' },
  { name: 'Backpack / Bag', url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80' },
  { name: 'Keys / Fob', url: 'https://images.unsplash.com/photo-1582139329536-e7284fece509?auto=format&fit=crop&w=800&q=80' },
  { name: 'Glasses / Sunglasses', url: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80' },
  { name: 'Student ID / Wallet', url: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=800&q=80' },
  { name: 'Hoodie / Jacket', url: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80' },
  { name: 'Textbook / Notebook', url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80' },
];

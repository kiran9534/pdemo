import { User, Blog } from '../types';

export const mockUsers: User[] = [
  {
    id: 'user-1',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin',
    avatarUrl: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=150'
  },
  {
    id: 'user-2',
    name: 'Core User',
    email: 'user@example.com',
    role: 'core',
    avatarUrl: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150'
  }
];

export const mockBlogs: Blog[] = [
  {
    id: 'blog-1',
    title: 'Summer Fashion Trends 2025',
    content: `<p>As we approach the summer of 2025, fashion enthusiasts are eagerly anticipating the trends that will dominate the season. This year, designers are drawing inspiration from sustainable materials and ethical production processes.</p>
    
    <h2>Sustainable Fabrics</h2>
    <p>Eco-friendly materials are taking center stage this summer. Expect to see an abundance of organic cotton, hemp, and recycled polyester in everything from casual wear to high-end fashion statements.</p>
    
    <h2>Vibrant Colors</h2>
    <p>After several seasons of neutrals and pastels, vibrant colors are making a comeback. Electric blues, sunset oranges, and bold yellows will be seen everywhere from accessories to complete outfits.</p>
    
    <h2>Oversized Silhouettes</h2>
    <p>Comfort continues to be a priority, with oversized shirts, loose-fitting pants, and flowing dresses dominating the runway. These pieces offer both style and ease of movement for the warm summer months.</p>`,
    summary: 'Discover the hottest fashion trends for Summer 2025, including sustainable fabrics, vibrant colors, and comfortable silhouettes.',
    coverImage: 'https://images.pexels.com/photos/994517/pexels-photo-994517.jpeg',
    category: 'trends',
    status: 'published',
    createdAt: '2025-04-15T14:30:00Z',
    updatedAt: '2025-04-15T16:45:00Z',
    authorId: 'user-1',
    tags: ['fashion', 'summer', 'trends', 'sustainable'],
    seoScore: 87
  },
  {
    id: 'blog-2',
    title: 'Review: The Ultimate Smart Home Hub',
    content: `<p>Smart home technology has evolved rapidly in recent years, and the latest hub from TechConnect represents a significant leap forward in how we control our living spaces.</p>
    
    <h2>Design and Setup</h2>
    <p>The TechConnect Hub features a sleek, minimalist design that blends seamlessly into any home décor. Setting up the device took less than 10 minutes, with an intuitive app guiding the process.</p>
    
    <h2>Connectivity</h2>
    <p>With support for WiFi, Bluetooth, Zigbee, and Z-Wave protocols, the hub connects effortlessly with over 10,000 smart devices from various manufacturers. During testing, we connected lights, thermostats, locks, and cameras without any compatibility issues.</p>
    
    <h2>Voice Control</h2>
    <p>The built-in voice assistant is responsive and accurate, understanding commands even in noisy environments. It integrates with major voice platforms, allowing you to choose your preferred assistant.</p>
    
    <h2>Verdict</h2>
    <p>At $199, the TechConnect Hub isn't the cheapest option on the market, but its comprehensive compatibility and reliable performance make it worth the investment for anyone serious about smart home technology.</p>`,
    summary: 'An in-depth review of the TechConnect Smart Home Hub, examining its design, connectivity options, voice control capabilities, and overall value.',
    coverImage: 'https://images.pexels.com/photos/1034812/pexels-photo-1034812.jpeg',
    category: 'reviews',
    status: 'published',
    createdAt: '2025-04-10T09:15:00Z',
    updatedAt: '2025-04-10T11:30:00Z',
    authorId: 'user-2',
    tags: ['smart home', 'technology', 'review', 'gadgets'],
    seoScore: 92
  },
  {
    id: 'blog-3',
    title: '5 Tips for Sustainable Shopping',
    content: `<p>As consumers become more environmentally conscious, sustainable shopping practices are gaining popularity. Here are five effective strategies to reduce your environmental footprint while still enjoying the shopping experience.</p>
    
    <h2>1. Research Brand Ethics</h2>
    <p>Before making a purchase, take time to investigate a brand's ethical practices. Look for transparency regarding manufacturing processes, worker conditions, and environmental impact.</p>
    
    <h2>2. Invest in Quality</h2>
    <p>Rather than buying multiple cheap items that quickly wear out, invest in fewer, high-quality pieces that will last longer. This approach reduces waste and often saves money in the long run.</p>
    
    <h2>3. Shop Secondhand</h2>
    <p>Thrift stores, consignment shops, and online marketplaces offer pre-loved items that extend product lifecycles and prevent usable goods from entering landfills.</p>
    
    <h2>4. Embrace Minimalism</h2>
    <p>Before making a purchase, ask yourself if you truly need the item. Adopting a more minimalist approach to consumption reduces clutter and environmental impact.</p>
    
    <h2>5. Choose Sustainable Materials</h2>
    <p>When possible, opt for products made from sustainable or recycled materials. Look for certifications like GOTS for textiles or FSC for wood products.</p>`,
    summary: 'Learn practical strategies for more sustainable shopping habits, including researching brand ethics, investing in quality, and choosing eco-friendly materials.',
    coverImage: 'https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg',
    category: 'tips',
    status: 'draft',
    createdAt: '2025-04-05T13:20:00Z',
    updatedAt: '2025-04-05T15:10:00Z',
    authorId: 'user-1',
    tags: ['sustainability', 'shopping', 'eco-friendly', 'tips'],
    seoScore: 78
  }
];
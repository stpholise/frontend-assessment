// Product schema for Swagger
/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - name
 *         - category
 *         - subCategory
 *         - price
 *         - stock
 *         - brand
 *         - description
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the product
 *         name:
 *           type: string
 *           description: The name of the product
 *         category:
 *           type: string
 *           description: The category of the product
 *         subCategory:
 *           type: string
 *           description: The subcategory of the product
 *         price:
 *           type: number
 *           description: The price of the product
 *         stock:
 *           type: integer
 *           description: The number of items in stock
 *         brand:
 *           type: string
 *           description: The brand of the product
 *         description:
 *           type: string
 *           description: A description of the product
 *         imageUrl:
 *           type: string
 *           description: URL of the product image
 *         rating:
 *           type: number
 *           description: The average rating of the product
 *         reviews:
 *           type: integer
 *           description: The number of reviews for the product
 *         specifications:
 *           type: object
 *           description: Additional specifications of the product
 *     NewProductPayload:
 *      type: object
 *      required:
 *        - name
 *        - category
 *        - subCategory
 *        - price
 *        - stock
 *        - brand
 *        - description
 *        - imageUrl
 *      properties:
 *        name:
 *          type: string
 *          description: The name of the product
 *        category:
 *          type: string
 *          description: The category of the product
 *        subCategory:
 *          type: string
 *          description: The subcategory of the product
 *        price:
 *          type: number
 *          description: The price of the product
 *        stock:
 *          type: integer
 *          description: The number of items in stock
 *        brand:
 *          type: string
 *          description: The brand of the product
 *        description:
 *          type: string
 *          description: A description of the product
 *        imageUrl:
 *          type: string
 *          description: URL of the product image
 *        specifications:
 *          type: object
 *          description: Additional specifications of the product
 *     UpdateProductPayload:
 *      type: object
 *      properties:
 *        name:
 *          type: string
 *          description: The name of the product
 *        category:
 *          type: string
 *          description: The category of the product
 *        subCategory:
 *          type: string
 *          description: The subcategory of the product
 *        price:
 *          type: number
 *          description: The price of the product
 *        stock:
 *          type: integer
 *          description: The number of items in stock
 *        brand:
 *          type: string
 *          description: The brand of the product
 *        description:
 *          type: string
 *          description: A description of the product
 *        imageUrl:
 *          type: string
 *          description: URL of the product image
 *        specifications:
 *          type: object
 *          description: Additional specifications of the product
 */

export interface Product {
  id: number;
  name: string;
  category: string;
  subCategory: string;
  price: number;
  stock: number;
  brand: string;
  description: string;
  imageUrl: string;
  rating: number;
  reviews: number;
  specifications: Record<string, string | number | boolean>;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Ultra-Slim Laptop Pro",
    category: "Electronics",
    subCategory: "Computers",
    price: 1299.99,
    stock: 50,
    brand: "TechMaster",
    description:
      "Powerful and lightweight laptop with 16GB RAM, 512GB SSD, and a 4K display.",
    imageUrl:
      "https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832_1280.jpg",
    rating: 4.7,
    reviews: 128,
    specifications: {
      processor: "Intel Core i7",
      screenSize: "15.6 inches",
      weight: "1.8 kg",
      battery: "Up to 12 hours",
    },
  },
  {
    id: 2,
    name: "SmartPhone X",
    category: "Electronics",
    subCategory: "Phones",
    price: 899.99,
    stock: 100,
    brand: "Galactica",
    description:
      "5G-enabled smartphone with a triple-lens camera system and all-day battery life.",
    imageUrl:
      "https://cdn.pixabay.com/photo/2018/08/14/13/23/ocean-3605547_1280.jpg",
    rating: 4.5,
    reviews: 256,
    specifications: {
      screenSize: "6.5 inches",
      storage: "256GB",
      camera: "Triple 12MP Ultra Wide",
      waterResistant: "IP68",
    },
  },
  {
    id: 3,
    name: "Noise-Cancelling Headphones",
    category: "Electronics",
    subCategory: "Audio",
    price: 249.99,
    stock: 200,
    brand: "SoundWave",
    description:
      "Over-ear headphones with active noise cancellation and 30-hour battery life.",
    imageUrl:
      "https://cdn.pixabay.com/photo/2024/10/28/17/47/landscape-9156801_1280.jpg",
    rating: 4.6,
    reviews: 89,
    specifications: {
      type: "Over-ear",
      wireless: true,
      batteryLife: "30 hours",
      weight: "250g",
    },
  },
  {
    id: 4,
    name: "Pro Runner 3000",
    category: "Sports",
    subCategory: "Footwear",
    price: 129.99,
    stock: 75,
    brand: "SprintMaster",
    description:
      "Lightweight running shoes with responsive cushioning and breathable mesh upper.",
    imageUrl:
      "https://cdn.pixabay.com/photo/2024/10/17/16/14/waterfall-9128051_1280.jpg",
    rating: 4.4,
    reviews: 62,
    specifications: {
      type: "Road running",
      weight: "255g",
      dropHeight: "8mm",
      material: "Synthetic mesh",
    },
  },
  {
    id: 5,
    name: "Smart Coffee Maker",
    category: "Home",
    subCategory: "Kitchen Appliances",
    price: 79.99,
    stock: 30,
    brand: "BrewGenius",
    description:
      "Wi-Fi enabled coffee maker with scheduling and customizable brew strength.",
    imageUrl:
      "https://cdn.pixabay.com/photo/2017/08/30/01/05/milky-way-2695569_1280.jpg",
    rating: 4.2,
    reviews: 45,
    specifications: {
      capacity: "12 cups",
      programmable: true,
      filterType: "Permanent",
      warranty: "2 years",
    },
  },
  // {
  //   id: 6,
  //   name: "Ultra HD Smart TV X1000",
  //   category: "Electronics",
  //   subCategory: "Televisions",
  //   price: 1299.99,
  //   stock: 45,
  //   brand: "TechVision",
  //   description:
  //     "65-inch 4K Ultra HD Smart TV with AI-powered picture optimization and immersive sound system",
  //   imageUrl:
  //     "https://cdn.pixabay.com/photo/2024/10/28/17/47/landscape-9156798_1280.jpg",
  //   rating: 4.7,
  //   reviews: 328,
  //   specifications: {
  //     screenSize: 65,
  //     resolution: "3840x2160",
  //     refreshRate: 120,
  //     smartFeatures: true,
  //     hdmiPorts: 4,
  //     energyEfficiencyClass: "A+",
  //   },
  // },
  // {
  //   id: 7,
  //   name: "Professional Chef Knife Set",
  //   category: "Kitchen",
  //   subCategory: "Cutlery",
  //   price: 199.99,
  //   stock: 72,
  //   brand: "CulinaryPro",
  //   description:
  //     "8-piece premium stainless steel knife set with ergonomic handles and wooden storage block",
  //   imageUrl:
  //     "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg",
  //   rating: 4.9,
  //   reviews: 156,
  //   specifications: {
  //     material: "German stainless steel",
  //     pieceCount: 8,
  //     dishwasherSafe: false,
  //     bladeHardness: "58 HRC",
  //     warranty: "Lifetime",
  //     includesSharpener: true,
  //   },
  // },
  // {
  //   id: 8,
  //   name: "Wireless Gaming Mouse Pro",
  //   category: "Gaming",
  //   subCategory: "Accessories",
  //   price: 79.99,
  //   stock: 123,
  //   brand: "GameTech",
  //   description:
  //     "High-precision wireless gaming mouse with customizable RGB lighting and 12 programmable buttons",
  //   imageUrl:
  //     "https://cdn.pixabay.com/photo/2024/10/28/17/47/landscape-9156800_1280.jpg",
  //   rating: 4.5,
  //   reviews: 892,
  //   specifications: {
  //     dpi: 16000,
  //     batteryLife: "70 hours",
  //     weight: "93g",
  //     rgb: true,
  //     wirelessType: "2.4GHz",
  //     programmableButtons: 12,
  //   },
  // },
  // {
  //   id: 9,
  //   name: "Organic Cotton Bedding Set",
  //   category: "Home",
  //   subCategory: "Bedding",
  //   price: 149.99,
  //   stock: 89,
  //   brand: "EcoComfort",
  //   description:
  //     "Luxurious 100% organic cotton bedding set including duvet cover, fitted sheet, and 4 pillowcases",
  //   imageUrl:
  //     "https://cdn.pixabay.com/photo/2014/04/14/20/11/pink-324175_1280.jpg",
  //   rating: 4.8,
  //   reviews: 234,
  //   specifications: {
  //     material: "Organic Cotton",
  //     threadCount: 400,
  //     size: "King",
  //     organic: true,
  //     pieces: 6,
  //     colorfast: true,
  //   },
  // },
  // {
  //   id: 10,
  //   name: "Smart Fitness Watch Elite",
  //   category: "Sports",
  //   subCategory: "Wearables",
  //   price: 249.99,
  //   stock: 167,
  //   brand: "FitTech",
  //   description:
  //     "Advanced fitness tracker with heart rate monitoring, GPS, and 14-day battery life",
  //   imageUrl:
  //     "https://cdn.pixabay.com/photo/2024/10/29/19/51/black-cat-9159906_1280.jpg",
  //   rating: 4.6,
  //   reviews: 1243,
  //   specifications: {
  //     batteryLife: "14 days",
  //     waterproof: true,
  //     displaySize: "1.4 inch",
  //     gps: true,
  //     sensors: 8,
  //     compatibility: "iOS/Android",
  //   },
  // },
  // {
  //   id: 11,
  //   name: "Professional Hair Dryer Plus",
  //   category: "Beauty",
  //   subCategory: "Hair Care",
  //   price: 159.99,
  //   stock: 94,
  //   brand: "StylePro",
  //   description:
  //     "Salon-grade hair dryer with ionic technology and multiple heat settings",
  //   imageUrl:
  //     "https://cdn.pixabay.com/photo/2017/12/15/13/51/polynesia-3021072_1280.jpg",
  //   rating: 4.7,
  //   reviews: 567,
  //   specifications: {
  //     power: "2100W",
  //     speeds: 3,
  //     heatSettings: 5,
  //     cordLength: "3m",
  //     weight: "590g",
  //     ionicTechnology: true,
  //   },
  // },
  // {
  //   id: 12,
  //   name: "Wireless Noise-Canceling Headphones",
  //   category: "Electronics",
  //   subCategory: "Audio",
  //   price: 299.99,
  //   stock: 142,
  //   brand: "SoundMaster",
  //   description:
  //     "Premium wireless headphones with active noise cancellation and 30-hour battery life",
  //   imageUrl:
  //     "https://cdn.pixabay.com/photo/2024/10/29/19/53/farm-9159919_1280.jpg",
  //   rating: 4.8,
  //   reviews: 892,
  //   specifications: {
  //     batteryLife: "30 hours",
  //     bluetooth: "5.0",
  //     weight: "250g",
  //     noiseCancellation: true,
  //     driverSize: "40mm",
  //     foldable: true,
  //   },
  // },
  // {
  //   id: 13,
  //   name: "Smart Home Security Camera",
  //   category: "Electronics",
  //   subCategory: "Security",
  //   price: 129.99,
  //   stock: 234,
  //   brand: "SecureView",
  //   description:
  //     "1080p HD wireless security camera with night vision and two-way audio",
  //   imageUrl:
  //     "https://cdn.pixabay.com/photo/2024/05/26/10/15/bird-8788491_1280.jpg",
  //   rating: 4.4,
  //   reviews: 445,
  //   specifications: {
  //     resolution: "1080p",
  //     nightVision: true,
  //     fieldOfView: "130°",
  //     storage: "Cloud/Local",
  //     powerSource: "Wired",
  //     weatherproof: true,
  //   },
  // },
  // {
  //   id: 14,
  //   name: "Premium Coffee Maker",
  //   category: "Kitchen",
  //   subCategory: "Appliances",
  //   price: 189.99,
  //   stock: 67,
  //   brand: "BrewMaster",
  //   description:
  //     "10-cup programmable coffee maker with built-in grinder and thermal carafe",
  //   imageUrl:
  //     "https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072821_1280.jpg",
  //   rating: 4.6,
  //   reviews: 678,
  //   specifications: {
  //     capacity: "10 cups",
  //     programmable: true,
  //     builtInGrinder: true,
  //     brewingTemperature: "200°F",
  //     filterType: "Permanent",
  //     warranty: "2 years",
  //   },
  // },
  // {
  //   id: 15,
  //   name: "Ergonomic Office Chair",
  //   category: "Furniture",
  //   subCategory: "Office",
  //   price: 299.99,
  //   stock: 45,
  //   brand: "ComfortPlus",
  //   description:
  //     "High-back ergonomic office chair with adjustable lumbar support and armrests",
  //   imageUrl:
  //     "https://cdn.pixabay.com/photo/2018/08/21/23/29/forest-3622519_1280.jpg",
  //   rating: 4.5,
  //   reviews: 389,
  //   specifications: {
  //     maxWeight: "300 lbs",
  //     adjustableHeight: true,
  //     material: "Mesh/Premium Fabric",
  //     recline: "120°",
  //     armrests: "4D Adjustable",
  //     warranty: "5 years",
  //   },
  // },
  // {
  //   id: 16,
  //   name: "Smart Coffee Maker",
  //   category: "Home",
  //   subCategory: "Kitchen Appliances",
  //   price: 79.99,
  //   stock: 30,
  //   brand: "BrewGenius",
  //   description:
  //     "Wi-Fi enabled coffee maker with scheduling and customizable brew strength.",
  //   imageUrl:
  //     "https://cdn.pixabay.com/photo/2018/08/15/13/10/galaxy-3608029_1280.jpg",
  //   rating: 4.2,
  //   reviews: 45,
  //   specifications: {
  //     capacity: "12 cups",
  //     programmable: true,
  //     filterType: "Permanent",
  //     warranty: "2 years",
  //   },
  // },
];

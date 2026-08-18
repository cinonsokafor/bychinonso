export type ServiceTag =
  | "brand-strategy"
  | "visual-identity"
  | "website-strategy"
  | "website-design"
  | "website-development"
  | "3d-development";

export interface Project {
  slug: string;
  title: string;
  description: string;
  href: string;
  year: string;
  image: string;
  services: ServiceTag[];
}

export const SERVICE_LABELS: Record<ServiceTag, string> = {
  "brand-strategy": "Brand Strategy",
  "visual-identity": "Visual Identity",
  "website-strategy": "Website Strategy",
  "website-design": "Website Design",
  "website-development": "Website Development",
  "3d-development": "3D Development",
};

// Filter pills shown above the grid, in source order (mirrors hero_work_filters)
export const FILTERS: { key: "all" | ServiceTag; label: string }[] = [
  { key: "all", label: "All Projects" },
  { key: "brand-strategy", label: "Brand Strategy" },
  { key: "visual-identity", label: "Visual Identity" },
  { key: "website-strategy", label: "Website Strategy" },
  { key: "website-design", label: "Website Design" },
  { key: "website-development", label: "Website Development" },
];



export interface Testimonial {
  slug: string;
  quote: string; // full quote; line-splitting is handled at render time by SplitText
  headshot: string;
  name: string;
  role: string;
}
export interface ServiceItem {
  slug: string;
  title: string;
  image: string;
}

export const services: ServiceItem[] = [
  {
    slug: "brand-strategy",
    title: "Brand Strategy",
    image:
      "https://cdn.prod.website-files.com/68b66e92dfdef050e1802fa7/697ef10d5fcc93485bf8dfb4_Brand%20Strategy.avif",
  },
  {
    slug: "visual-identity",
    title: "Visual Identity",
    image:
      "https://cdn.prod.website-files.com/68b66e92dfdef050e1802fa7/697ef16f889c1ea502d8ee65_Visual%20Identity.avif",
  },
  {
    slug: "website-strategy",
    title: "Website Strategy",
    image:
      "https://cdn.prod.website-files.com/68b66e92dfdef050e1802fa7/697ef17ae082299197a3aa88_Website%20Strategy.avif",
  },
  {
    slug: "website-design",
    title: "Website Design",
    image:
      "https://cdn.prod.website-files.com/68b66e92dfdef050e1802fa7/697ef15eca91ffc3ae831e4e_Web%20Design.avif",
  },
  {
    slug: "website-development",
    title: "Website Development",
    image:
      "https://cdn.prod.website-files.com/68b66e92dfdef050e1802fa7/697ef13b8c2c03a57cff1df0_Webflow%20Development.avif",
  },
  {
    slug: "3d-development",
    title: "3D Development",
    image:
      "https://cdn.prod.website-files.com/68b66e92dfdef050e1802fa7/697ef14da1c89e5e19e5cca4_3D%20Development.avif",
  },
];



export const testimonials: Testimonial[] = [
  {
    slug: "andrew-tynes",
    quote:
      '"For years, our website struggled to showcase our work effectively and attract the right clients. Within just 30 days of launching the new site with MONOLOG, we generated $100k in new sales and receive 2-3 qualified inquiries every week."',
    headshot:
      "https://cdn.prod.website-files.com/68b66e92dfdef050e1802fa7/69ce9284075cd51831cdc1d1_1753282172963.avif",
    name: "Andrew Tynes",
    role: "Owner, Mammoth Murals",
  },
  {
    slug: "jonathon-shannon",
    quote:
      '"Huy and his team are a rare collaborator who cares as much about "your thing." Highly talented and humble, Huy is always willing to delve deeper to find the most interesting and elegant solution to the problem. We\'d strongly recommend Huy to brands looking for a true web partner for their business."',
    headshot:
      "https://cdn.prod.website-files.com/68b66e92dfdef050e1802fa7/690df5490b74ae9f75ed17eb_Default.avif",
    name: "Jonathon Shannon",
    role: "Creative Director, Supersolid",
  },
  {
    slug: "johnny-hyde",
    quote:
      '"Lead management has significantly improved since launch — leads are much easier to qualify, and showcasing our completed work is now far more streamlined. The design is not only impressive but innovative; it truly stands out."',
    headshot:
      "https://cdn.prod.website-files.com/68b66e92dfdef050e1802fa7/690df5543d7243082ccbfcaa_OH_STAFF%C2%A9ANDYMACPHERSON-14%201.avif",
    name: "Johnny Hyde",
    role: "Director, OH Architecture",
  },
];


export const projects: Project[] = [
  {
    slug: "oh-architecture",
    title: "OH Architecture",
    description:
      "Brand refresh and website for a practice with a decade of crafting high-end homes for Australian families.",
    href: "https://www.oharchitecture.com.au/",
    year: "2025",
    image:
      "https://cdn.prod.website-files.com/68b66e92dfdef050e1802fa7/68e36f423545f0f0d624de8c_image%206.avif",
    services: [
      "brand-strategy",
      "website-strategy",
      "visual-identity",
      "website-design",
      "website-development",
    ],
  },
  {
    slug: "mammoth-murals",
    title: "Mammoth Murals",
    description:
      "Brand strategy, identity and website for an established mural agency with a decade of large-scale public art behind it.",
    href: "https://mammothmurals.com/",
    year: "2025",
    image:
      "https://cdn.prod.website-files.com/68b66e92dfdef050e1802fa7/68e36fd385a3ac7e20eb2a7c_IMG_2674%201.avif",
    services: [
      "brand-strategy",
      "website-strategy",
      "visual-identity",
      "website-design",
      "website-development",
    ],
  },
  {
    slug: "supersolid",
    title: "Supersolid",
    description:
      "Website for a 100% creative-owned Sydney agency built to merge commercial value with cultural impact.",
    href: "https://www.supersolid.agency/",
    year: "2025",
    image:
      "https://cdn.prod.website-files.com/68b66e92dfdef050e1802fa7/68e36f6a67c0bb840486917e_image-1.avif",
    services: ["website-design", "website-development", "3d-development"],
  },
  {
    slug: "slik",
    title: "SLIK",
    description:
      "Website for an Australian activation agency pushing creativity further for some of the country's most ambitious brands.",
    href: "https://www.slik.com.au/",
    year: "2026",
    image:
      "https://cdn.prod.website-files.com/68b66e92dfdef050e1802fa7/6a10111e38d73116c8849278_Slik.avif",
    services: ["website-development", "3d-development"],
  },
  {
    slug: "hiss-university-of-sydney",
    title: "HISS (University of Sydney)",
    description:
      "Brand identity and website for a University of Sydney initiative challenging the norms of queer education on a global stage.",
    href: "https://www.hiss.sydney/",
    year: "2025",
    image:
      "https://cdn.prod.website-files.com/68b66e92dfdef050e1802fa7/68e36feaa84a7e56f526ef97_15_Mikeas_34513%201.avif",
    services: ["visual-identity", "website-design", "website-development"],
  },
  {
    slug: "backhouse",
    title: "Backhouse",
    description:
      "Website for an embedded production partner behind campaigns for Netflix, A24, HBO, Apple and Google.",
    href: "https://www.backhouse.com/",
    year: "2026",
    image:
      "https://cdn.prod.website-files.com/68b66e92dfdef050e1802fa7/6a1010bcc3947445ad687f5d_Backhouse.avif",
    services: ["website-design", "website-development", "3d-development"],
  },
  {
    slug: "squiggle",
    title: "Squiggle (University of Sydney)",
    description:
      "Website for a social enterprise transforming interpersonal experiences through gamified, research-based education.",
    href: "https://www.squiggle.sydney/",
    year: "2026",
    image:
      "https://cdn.prod.website-files.com/68b66e92dfdef050e1802fa7/6a4cb0704d2b210c25519b1b_Squiggle.avif",
    services: ["website-strategy", "website-design", "website-development"],
  },
];

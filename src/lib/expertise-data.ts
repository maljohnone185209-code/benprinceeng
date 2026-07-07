import residential from "@/assets/expertise/residential-construction.webp.asset.json";
import commercial from "@/assets/expertise/commercial-buildings.webp.asset.json";
import industrial from "@/assets/expertise/industrial-facilities.jpg.asset.json";
import civil from "@/assets/expertise/civil-engineering.png.asset.json";
import road from "@/assets/expertise/road-construction.jpg.asset.json";
import drainage from "@/assets/expertise/drainage-systems.jpg.asset.json";
import infra from "@/assets/expertise/infrastructure-development.jpg.asset.json";
import steel from "@/assets/expertise/structural-steel-works.jpg.asset.json";
import fabrication from "@/assets/expertise/fabrication.jpg.asset.json";
import facility from "@/assets/expertise/facility-maintenance.jpg.asset.json";
import surveying from "@/assets/expertise/surveying.jpg.asset.json";
import geo from "@/assets/expertise/geotechnical-investigation.jpg.asset.json";
import architectural from "@/assets/expertise/architectural-design.jpg.asset.json";
import pm from "@/assets/expertise/project-management.png.asset.json";
import solar from "@/assets/expertise/solar-energy-solutions.jpg.asset.json";
import pool from "@/assets/expertise/swimming-pool-construction.jpg.asset.json";

export type Expertise = {
  slug: string;
  title: string;
  image: string;
  scope: string;
};

export const WHATSAPP_URL = "https://wa.me/2348063691299";
export const WHATSAPP_DISPLAY = "+234 806 369 1299";

export const expertiseItems: Expertise[] = [
  {
    slug: "residential-construction",
    title: "Residential Construction",
    image: residential.url,
    scope:
      "We deliver high-quality residential construction projects, providing complete building solutions from planning and foundation works to finishing. Every home is constructed with attention to durability, functionality, safety, and superior craftsmanship.",
  },
  {
    slug: "commercial-buildings",
    title: "Commercial Buildings",
    image: commercial.url,
    scope:
      "We construct modern commercial facilities including office complexes, retail developments, educational buildings, healthcare facilities, and mixed-use developments while maintaining exceptional quality, efficiency, and structural integrity.",
  },
  {
    slug: "industrial-facilities",
    title: "Industrial Facilities",
    image: industrial.url,
    scope:
      "We develop industrial facilities that meet operational requirements through quality construction, durable structural systems, and engineering solutions designed for long-term performance and efficiency.",
  },
  {
    slug: "civil-engineering",
    title: "Civil Engineering",
    image: civil.url,
    scope:
      "We execute civil engineering works including roads, drainage systems, foundations, concrete structures, and infrastructure projects using proven engineering practices and quality materials.",
  },
  {
    slug: "road-construction",
    title: "Road Construction",
    image: road.url,
    scope:
      "We construct durable road networks using modern engineering techniques, quality materials, and effective project management to improve transportation infrastructure and long-term performance.",
  },
  {
    slug: "drainage-systems",
    title: "Drainage Systems",
    image: drainage.url,
    scope:
      "We design and construct efficient drainage systems that effectively manage stormwater, reduce flooding risks, and protect surrounding infrastructure and communities.",
  },
  {
    slug: "infrastructure-development",
    title: "Infrastructure Development",
    image: infra.url,
    scope:
      "We deliver infrastructure development projects that support sustainable growth through the construction of essential public facilities, utilities, and engineering works.",
  },
  {
    slug: "structural-steel-works",
    title: "Structural Steel Works",
    image: steel.url,
    scope:
      "We fabricate and install structural steel systems for commercial, industrial, and engineering projects while maintaining strict quality standards, precision, and safety.",
  },
  {
    slug: "oil-and-gas-facilities",
    title: "Oil & Gas Facilities",
    image: steel.url,
    scope:
      "We deliver oil and gas facility works including pipeline construction, plant fabrication, installation and maintenance, executed to international HSE and quality standards.",
  },
  {
    slug: "fabrication",
    title: "Fabrication",
    image: fabrication.url,
    scope:
      "We provide precision steel and metal fabrication services for structural and industrial applications, delivering durable solutions that meet project specifications and engineering standards.",
  },
  {
    slug: "facility-maintenance",
    title: "Facility Maintenance",
    image: facility.url,
    scope:
      "We provide preventive and corrective maintenance services that ensure buildings, engineering facilities, and infrastructure continue to operate safely, efficiently, and reliably.",
  },
  {
    slug: "surveying",
    title: "Surveying",
    image: surveying.url,
    scope:
      "We provide professional surveying services including topographic surveys, engineering surveys, boundary surveys, and accurate site measurements to support planning, design, and construction.",
  },
  {
    slug: "geotechnical-investigation",
    title: "Geotechnical Investigation",
    image: geo.url,
    scope:
      "We conduct comprehensive geotechnical investigations to evaluate soil and subsurface conditions, providing reliable engineering data for safe and efficient project delivery.",
  },
  {
    slug: "marine-surveys",
    title: "Marine Surveys",
    image: surveying.url,
    scope:
      "We deliver hydrographic and marine surveying services — bathymetry, coastal mapping and offshore site investigation — using modern instrumentation and rigorous methodology.",
  },
  {
    slug: "architectural-design",
    title: "Architectural Design",
    image: architectural.url,
    scope:
      "We develop innovative architectural designs that combine aesthetics, functionality, sustainability, and technical excellence to transform ideas into practical and inspiring spaces.",
  },
  {
    slug: "project-management",
    title: "Project Management",
    image: pm.url,
    scope:
      "We provide professional project management services that oversee planning, scheduling, budgeting, quality assurance, risk management, and execution from conception to successful completion.",
  },
  {
    slug: "procurement",
    title: "Procurement",
    image: pm.url,
    scope:
      "We manage end-to-end procurement for construction and engineering projects — sourcing quality-assured materials and equipment through a vetted supply chain with transparent commercial controls.",
  },
  {
    slug: "solar-energy-solutions",
    title: "Solar Energy Solutions",
    image: solar.url,
    scope:
      "We design and install efficient solar energy systems that provide reliable, cost-effective, and environmentally responsible power solutions for residential, commercial, and institutional projects.",
  },
  {
    slug: "swimming-pool-construction",
    title: "Swimming Pool Construction",
    image: pool.url,
    scope:
      "We design and construct premium residential and commercial swimming pools using quality materials, modern construction techniques, and reliable filtration systems to create beautiful and long-lasting recreational facilities.",
  },
  {
    slug: "transport-and-logistics",
    title: "Transport & Logistics",
    image: road.url,
    scope:
      "We provide reliable transport and logistics for engineering and construction projects — moving equipment, materials and personnel to any site safely and on schedule.",
  },
];

export const expertiseBySlug: Record<string, Expertise> = Object.fromEntries(
  expertiseItems.map((e) => [e.slug, e]),
);

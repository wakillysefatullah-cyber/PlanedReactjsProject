
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Boxes,
  CheckCircle2,
  Code2,
  Database,
  FileBarChart,
  Globe2,
  Layers3,
  Lightbulb,
  Package,
  ShieldCheck,
  ShoppingBag,
  ShoppingCart,
  Target,
  TrendingUp,
  Users,
  Wallet,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import {
  FaGithub,
  FaLinkedin,
  FaGitAlt,
} from "react-icons/fa";

// ================= FEATURES =================

const features = [
  {
    number: "01",
    icon: Users,
    title: "Ledger Management",
    description:
      "Manage customer and supplier accounts, organize account records, and keep track of business balances.",
  },
  {
    number: "02",
    icon: ShoppingCart,
    title: "Sales Management",
    description:
      "Create sales transactions, manage invoices, record payments, and monitor customer balances.",
  },
  {
    number: "03",
    icon: ShoppingBag,
    title: "Purchase Management",
    description:
      "Record purchases, manage supplier transactions, and keep your purchasing activities organized.",
  },
  {
    number: "04",
    icon: Package,
    title: "Inventory Management",
    description:
      "Monitor available products, track stock movements, and maintain organized inventory records.",
  },
  {
    number: "05",
    icon: Wallet,
    title: "Financial Management",
    description:
      "Organize receipts, payments, expenses, and other important financial activities.",
  },
  {
    number: "06",
    icon: FileBarChart,
    title: "Reports & Analytics",
    description:
      "Understand business activities through organized reports and meaningful financial information.",
  },
];

// ================= WORKFLOW =================

const workflow = [
  {
    icon: Users,
    title: "Manage Accounts",
    description: "Organize customers and suppliers.",
  },
  {
    icon: ShoppingBag,
    title: "Record Purchases",
    description: "Keep purchasing transactions organized.",
  },
  {
    icon: Boxes,
    title: "Track Inventory",
    description: "Monitor products and stock quantities.",
  },
  {
    icon: TrendingUp,
    title: "Manage Sales",
    description: "Record sales and customer balances.",
  },
  {
    icon: BarChart3,
    title: "Review Reports",
    description: "Understand your business performance.",
  },
];

// ================= TECHNOLOGIES =================

const technologies = [
  {
    name: "React.js",
    category: "Frontend",
    description:
      "Building interactive and reusable user interfaces for EasyCount.",
    icon: Code2,
  },
  {
    name: "Tailwind CSS",
    category: "Styling",
    description:
      "Creating modern, responsive, and consistent user interfaces.",
    icon: Layers3,
  },
  {
    name: "Spring Boot",
    category: "Backend",
    description:
      "Developing backend services, APIs, and application logic.",
    icon: Zap,
  },
  {
    name: "PostgreSQL",
    category: "Database",
    description:
      "Storing and managing structured business and transaction data.",
    icon: Database,
  },
  {
    name: "Git",
    category: "Version Control",
    description:
      "Tracking source-code changes, managing versions, and maintaining development history.",
    icon: FaGitAlt,
  },
  {
    name: "GitHub",
    category: "Code Hosting & Collaboration",
    description:
      "Hosting repositories, sharing source code, managing project versions, and collaborating with developers.",
    icon: FaGithub,
  },
];

// ================= DEVELOPMENT TEAM =================

const developers = [
  {
    name: "Sefatullah Wakilly",
    role: "Frontend Developer",
    initials: "SW",
    image: "/sefatullah.jpg",
    description:
      "Focused on designing and developing responsive user interfaces, implementing frontend functionality, and creating an intuitive experience for EasyCount users.",
    responsibilities: [
      "Frontend development",
      "React.js implementation",
      "User interface and experience",
    ],
    github: "",
    linkedin: "",
  },
  {
    name: "Safiullah Muhammadi",
    role: "Backend Developer",
    initials: "SM",
    image: "/wqewqewqe.JPG",
    description:
      "Focused on backend development, application architecture, API integration, and database operations that support the EasyCount platform.",
    responsibilities: [
      "Backend development",
      "API development",
      "Database management",
    ],
    github: "",
    linkedin: "",
  },
];

// ================= TECHNOLOGY GROUPS =================

const technologyGroups = [
  {
    title: "Frontend & Styling",
    description: "Technologies used to build the user interface.",
    items: ["React.js", "Tailwind CSS", "HTML-5"],
  },
  {
    title: "Backend & Database",
    description: "Technologies responsible for application logic and data.",
    items: ["Spring Boot", "PostgreSQL", "Rest API"],
  },
  {
    title: "Version Control & Collaboration",
    description: "Tools used to track development and collaborate on code.",
    items: ["Git", "GitHub", "LinkedIn"],
  },
];


// ================= ABOUT COMPONENT =================

export default function About() {
  return (
    <main className="min-h-screen bg-[#F5F6F8] text-[#172238]">
      <Link
  to="/"
  className="fixed top-6 right-8 z-50
  inline-flex items-center gap-2
  rounded-lg border border-white/20
  bg-slate-800/80 backdrop-blur-md
  px-4 py-3 font-semibold text-white
  shadow-lg transition-all duration-300
  hover:border-yellow-400
  hover:bg-yellow-400 hover:text-black"
>
  <ArrowLeft size={18} />
  Back to Dashboard
</Link>
      {/* ================= HERO SECTION ================= */}

      <section className="relative isolate overflow-hidden bg-[#101A30] text-white">

        <div className="pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full border border-white/10" />

        <div className="pointer-events-none absolute -right-20 -top-20 h-[350px] w-[350px] rounded-full border border-yellow-400/10" />

        <div className="pointer-events-none absolute bottom-0 left-0 h-80 w-80 rounded-full bg-yellow-400/5 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-6 py-20 md:grid-cols-2 md:px-10 md:py-28">

          <div>

            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-yellow-400/30 bg-yellow-400/10 px-4 py-2">

              <span className="h-2 w-2 rounded-full bg-yellow-400" />

              <span className="text-xs font-bold tracking-[0.18em] text-yellow-300">
                BUSINESS MANAGEMENT SOFTWARE
              </span>

            </div>

            <h1 className="max-w-2xl text-5xl leading-tight font-extrabold tracking-tight md:text-7xl">

              Meet

              <span className="block text-yellow-400">
                EasyCount.
              </span>

              <span className="mt-2 block text-3xl leading-snug font-semibold text-white md:text-4xl">
                Simplify your business.
                <br />
                Manage with confidence.
              </span>

            </h1>

            <p className="mt-7 max-w-xl text-base leading-8 text-slate-300 md:text-lg">
              A centralized business management and accounting
              platform designed to help small and medium-sized
              businesses organize their daily operations,
              transactions, inventory, and financial records.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">

              <a
                href="#introduction"
                className="inline-flex items-center gap-2 rounded-lg bg-yellow-400 px-6 py-3.5 font-bold text-[#101A30] transition hover:bg-yellow-300"
              >
                Discover EasyCount
                <ArrowRight size={19} />
              </a>

              <a
                href="#team"
                className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-6 py-3.5 font-semibold text-white transition hover:border-yellow-400 hover:text-yellow-400"
              >
                Meet Our Team
              </a>

            </div>

          </div>

          {/* HERO DASHBOARD VISUAL */}

          <div className="relative mx-auto w-full max-w-lg">

            <div className="absolute inset-0 rounded-3xl bg-yellow-400/10 blur-3xl" />

            <div className="relative rounded-2xl border border-white/10 bg-white/5 p-5 shadow-2xl backdrop-blur-xl md:p-7">

              <div className="mb-7 flex items-center justify-between">

                <div>
                  <p className="text-sm text-slate-400">
                    EasyCount Overview
                  </p>

                  <h3 className="mt-1 text-xl font-bold">
                    Business Dashboard
                  </h3>
                </div>

                <div className="rounded-xl bg-yellow-400 p-3 text-[#101A30]">
                  <BarChart3 size={25} />
                </div>

              </div>

              <div className="grid grid-cols-2 gap-3">

                {[
                  {
                    icon: ShoppingCart,
                    label: "Sales",
                    color: "text-green-400",
                  },
                  {
                    icon: ShoppingBag,
                    label: "Purchases",
                    color: "text-blue-400",
                  },
                  {
                    icon: Package,
                    label: "Inventory",
                    color: "text-yellow-400",
                  },
                  {
                    icon: Wallet,
                    label: "Payments",
                    color: "text-purple-400",
                  },
                ].map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.label}
                      className="rounded-xl border border-white/10 bg-white/[0.06] p-5"
                    >
                      <Icon size={25} className={item.color} />

                      <p className="mt-4 font-semibold">
                        {item.label}
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        Business module
                      </p>
                    </div>
                  );
                })}

              </div>

              <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.06] p-5">

                <div className="flex items-center justify-between">

                  <span className="text-sm text-slate-300">
                    Connected business operations
                  </span>

                  <CheckCircle2 className="text-yellow-400" size={20} />

                </div>

                <div className="mt-4 flex gap-1.5">

                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item) => (
                    <div
                      key={item}
                      className="h-2 flex-1 rounded-full bg-yellow-400/70"
                    />
                  ))}

                </div>

              </div>

              <p className="mt-5 text-center text-xs tracking-widest text-slate-500">
                ONE PLATFORM · ORGANIZED BUSINESS
              </p>

            </div>

            <div className="absolute -bottom-6 -left-5 hidden items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 text-[#101A30] shadow-xl sm:flex">

              <div className="rounded-lg bg-yellow-100 p-2">
                <ShieldCheck className="text-[#101A30]" />
              </div>

              <div>
                <p className="text-sm font-bold">
                  Built for Business
                </p>

                <p className="text-xs text-slate-500">
                  Organized operations
                </p>
              </div>

            </div>

          </div>

        </div>

      </section>


      {/* ================= INTRODUCTION ================= */}

      <section
        id="introduction"
        className="mx-auto max-w-7xl scroll-mt-8 px-6 py-20 md:px-10 md:py-28"
      >

        <div className="grid items-center gap-12 md:grid-cols-2">

          <div>

            <span className="text-sm font-bold tracking-[0.2em] text-yellow-600">
              ABOUT THE PRODUCT
            </span>

            <h2 className="mt-4 text-3xl leading-tight font-extrabold md:text-5xl">
              One platform.

              <span className="block text-yellow-600">
                Better business control.
              </span>
            </h2>

            <p className="mt-7 leading-8 text-slate-600">
              EasyCount is a business management and accounting
              system developed to simplify everyday business
              operations for small and medium-sized businesses.
            </p>

            <p className="mt-4 leading-8 text-slate-600">
              It brings essential business activities such as
              ledger management, sales, purchases, inventory,
              receipts, payments, and expenses into one
              centralized platform.
            </p>

            <p className="mt-4 leading-8 text-slate-600">
              Our goal is to reduce manual work, improve
              organization, and make important business
              information easier to manage and understand.
            </p>

          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm md:p-10">

            <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-xl bg-yellow-100">
              <Lightbulb size={30} className="text-[#101A30]" />
            </div>

            <h3 className="text-2xl font-bold">
              Why EasyCount?
            </h3>

            <p className="mt-4 leading-8 text-slate-600">
              Managing a business involves many connected
              activities. Keeping customer records, tracking
              products, recording transactions, and monitoring
              expenses can become difficult when information
              is scattered across different places.
            </p>

            <div className="mt-7 space-y-4">

              {[
                "Organized business information",
                "Centralized transaction management",
                "Simplified inventory tracking",
                "Better visibility into business activities",
              ].map((item) => (

                <div key={item} className="flex items-center gap-3">

                  <CheckCircle2
                    size={20}
                    className="shrink-0 text-yellow-600"
                  />

                  <span className="text-sm font-medium text-slate-700">
                    {item}
                  </span>

                </div>

              ))}

            </div>

          </div>

        </div>

      </section>


      {/* ================= MISSION AND VISION ================= */}

      <section className="bg-white py-20 md:py-24">

        <div className="mx-auto grid max-w-7xl gap-6 px-6 md:grid-cols-2 md:px-10">

          <div className="rounded-2xl bg-[#101A30] p-8 text-white md:p-10">

            <div className="mb-7 flex h-14 w-14 items-center justify-center rounded-xl bg-yellow-400 text-[#101A30]">
              <Target size={30} />
            </div>

            <p className="text-sm font-bold tracking-widest text-yellow-400">
              OUR MISSION
            </p>

            <h2 className="mt-4 text-3xl font-bold">
              Making business management simpler.
            </h2>

            <p className="mt-5 leading-8 text-slate-300">
              Our mission is to provide businesses with an
              organized and accessible platform that simplifies
              daily operations, supports accurate record keeping,
              and helps users manage their business activities
              more efficiently.
            </p>

          </div>

          <div className="rounded-2xl border border-slate-200 bg-[#F5F6F8] p-8 md:p-10">

            <div className="mb-7 flex h-14 w-14 items-center justify-center rounded-xl bg-yellow-100 text-[#101A30]">
              <Globe2 size={30} />
            </div>

            <p className="text-sm font-bold tracking-widest text-yellow-700">
              OUR VISION
            </p>

            <h2 className="mt-4 text-3xl font-bold text-[#101A30]">
              A more organized business future.
            </h2>

            <p className="mt-5 leading-8 text-slate-600">
              Our vision is to continuously improve EasyCount
              as a practical business management solution,
              making useful digital tools more accessible to
              small and medium-sized businesses.
            </p>

          </div>

        </div>

      </section>


      {/* ================= FEATURES ================= */}

      <section
        id="features"
        className="scroll-mt-8 py-20 md:py-28"
      >

        <div className="mx-auto max-w-7xl px-6 md:px-10">

          <div className="mx-auto mb-14 max-w-2xl text-center">

            <span className="text-sm font-bold tracking-[0.2em] text-yellow-600">
              OUR CAPABILITIES
            </span>

            <h2 className="mt-4 text-3xl font-extrabold md:text-5xl">
              Everything your business needs.
            </h2>

            <p className="mt-5 leading-8 text-slate-500">
              A collection of connected modules designed to
              organize the essential activities of your business.
            </p>

          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

            {features.map((feature) => {
              const Icon = feature.icon;

              return (

                <article
                  key={feature.number}
                  className="group rounded-2xl border border-slate-200 bg-white p-7 transition duration-300 hover:-translate-y-1 hover:border-yellow-400 hover:shadow-xl"
                >

                  <div className="flex items-start justify-between">

                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-yellow-100 text-[#101A30] transition group-hover:bg-yellow-400">
                      <Icon size={27} />
                    </div>

                    <span className="text-sm font-bold text-slate-300">
                      {feature.number}
                    </span>

                  </div>

                  <h3 className="mt-7 text-xl font-bold">
                    {feature.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-slate-500">
                    {feature.description}
                  </p>

                  <div className="mt-6 h-1 w-10 rounded-full bg-yellow-400 transition-all group-hover:w-20" />

                </article>

              );
            })}

          </div>

        </div>

      </section>


      {/* ================= WORKFLOW ================= */}

      <section className="bg-[#101A30] py-20 text-white md:py-24">

        <div className="mx-auto max-w-7xl px-6 md:px-10">

          <div className="mx-auto mb-14 max-w-2xl text-center">

            <span className="text-sm font-bold tracking-[0.2em] text-yellow-400">
              THE WORKFLOW
            </span>

            <h2 className="mt-4 text-3xl font-extrabold md:text-5xl">
              How EasyCount works.
            </h2>

            <p className="mt-5 leading-8 text-slate-400">
              Connect your essential business activities through
              an organized workflow.
            </p>

          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">

            {workflow.map((item, index) => {
              const Icon = item.icon;

              return (

                <div
                  key={item.title}
                  className="relative rounded-xl border border-white/10 bg-white/[0.04] p-6 text-center"
                >

                  <span className="absolute right-4 top-4 text-sm font-bold text-yellow-400">
                    0{index + 1}
                  </span>

                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-yellow-400 text-[#101A30]">
                    <Icon size={29} />
                  </div>

                  <h3 className="mt-6 font-bold">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-slate-400">
                    {item.description}
                  </p>

                  {index !== workflow.length - 1 && (
                    <ArrowRight
                      size={18}
                      className="absolute -right-3 top-1/2 z-10 hidden -translate-y-1/2 text-yellow-400 lg:block"
                    />
                  )}

                </div>

              );
            })}

          </div>

          <p className="mt-10 text-center text-xs text-slate-500">
            Workflow illustration. Actual processes depend on
            the implemented business rules.
          </p>

        </div>

      </section>


      {/* ================= DEVELOPMENT TEAM ================= */}

      <section
        id="team"
        className="scroll-mt-8 bg-white py-20 md:py-28"
      >

        <div className="mx-auto max-w-7xl px-6 md:px-10">

          <div className="mx-auto mb-14 max-w-2xl text-center">

            <span className="text-sm font-bold tracking-[0.2em] text-yellow-600">
              THE PEOPLE BEHIND EASYCOUNT
            </span>

            <h2 className="mt-4 text-3xl font-extrabold md:text-5xl">
              Meet our development team.
            </h2>

            <p className="mt-5 leading-8 text-slate-500">
              Two developers, working together to turn an idea
              into a practical business management solution.
            </p>

          </div>

          <div className="mx-auto grid max-w-4xl gap-7 md:grid-cols-2">

            {developers.map((developer) => (

              <article
                key={developer.initials}
                className="group overflow-hidden rounded-2xl border border-slate-200 bg-[#F8F9FB] transition duration-300 hover:-translate-y-1 hover:border-yellow-400 hover:shadow-xl"
              >

                <div className="h-2 bg-yellow-400" />

                <div className="p-7 md:p-9">

                  {/* Developer information */}

                  <div className="flex items-center gap-5">

                    <div className="h-24 w-24 shrink-0 overflow-hidden rounded-2xl border-2 border-yellow-400 bg-[#101A30] shadow-lg">

                      {developer.image ? (

                        <img
                          src={developer.image}
                          alt={developer.name}
                          className="h-full w-full object-cover object-top"
                        />

                      ) : (

                        <div className="flex h-full w-full items-center justify-center text-2xl font-extrabold text-yellow-400">
                          {developer.initials}
                        </div>

                      )}

                    </div>

                    <div className="min-w-0">

                      <h3 className="text-xl font-bold text-[#101A30]">
                        {developer.name}
                      </h3>

                      <p className="mt-2 text-sm font-semibold text-yellow-700">
                        {developer.role}
                      </p>

                    </div>

                  </div>

                  <p className="mt-7 text-sm leading-7 text-slate-600">
                    {developer.description}
                  </p>

                  <div className="my-6 h-px bg-slate-200" />

                  <h4 className="mb-4 text-sm font-bold text-[#101A30]">
                    Areas of responsibility
                  </h4>

                  <div className="space-y-3">

                    {developer.responsibilities.map((item) => (

                      <div
                        key={item}
                        className="flex items-center gap-3"
                      >

                        <CheckCircle2
                          size={18}
                          className="shrink-0 text-yellow-600"
                        />

                        <span className="text-sm text-slate-600">
                          {item}
                        </span>

                      </div>

                    ))}

                  </div>

                  {/* Developer social links */}

                  {(developer.github || developer.linkedin) && (

                    <div className="mt-7 flex gap-3">

                      {developer.github && (

                        <a
                          href={developer.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${developer.name} GitHub`}
                          className="flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-3 text-sm font-semibold transition hover:border-yellow-400 hover:bg-yellow-50"
                        >
                          <FaGithub size={19} />
                          GitHub
                        </a>

                      )}

                      {developer.linkedin && (

                        <a
                          href={developer.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${developer.name} LinkedIn`}
                          className="flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-3 text-sm font-semibold transition hover:border-yellow-400 hover:bg-yellow-50"
                        >
                          <FaLinkedin size={19} />
                          LinkedIn
                        </a>

                      )}

                    </div>

                  )}

                </div>

              </article>

            ))}

          </div>

          {/* Collaboration information */}

          <div className="mx-auto mt-10 max-w-4xl rounded-xl bg-[#101A30] p-7 text-center text-white md:p-10">

            <Code2
              size={32}
              className="mx-auto mb-4 text-yellow-400"
            />

            <h3 className="text-xl font-bold">
              Built through collaboration.
            </h3>

            <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-slate-300">
              Combining frontend design and backend engineering
              to create an organized and useful business solution.
            </p>

          </div>

        </div>

      </section>


      {/* ================= TECHNOLOGIES ================= */}

      <section
        id="technologies"
        className="py-20 md:py-28"
      >

        <div className="mx-auto max-w-7xl px-6 md:px-10">

          <div className="mx-auto mb-14 max-w-2xl text-center">

            <span className="text-sm font-bold tracking-[0.2em] text-yellow-600">
              OUR TECHNOLOGY
            </span>

            <h2 className="mt-4 text-3xl font-extrabold md:text-5xl">
              Built with modern technologies.
            </h2>

            <p className="mt-5 leading-8 text-slate-500">
              The tools and technologies used to develop,
              manage, and maintain the EasyCount application.
            </p>

          </div>

          {/* Technology cards */}

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

            {technologies.map((technology) => {

              const Icon = technology.icon;

              return (

                <article
                  key={technology.name}
                  className="group rounded-2xl border border-slate-200 bg-white p-7 text-center transition duration-300 hover:-translate-y-1 hover:border-yellow-400 hover:shadow-xl"
                >

                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#101A30] text-yellow-400 transition duration-300 group-hover:scale-110 group-hover:bg-yellow-400 group-hover:text-[#101A30]">

                    <Icon size={32} />

                  </div>

                  <h3 className="mt-5 text-lg font-bold text-[#101A30]">
                    {technology.name}
                  </h3>

                  <span className="mt-2 inline-block rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-800">
                    {technology.category}
                  </span>

                  <p className="mt-4 text-sm leading-7 text-slate-500">
                    {technology.description}
                  </p>

                </article>

              );

            })}

          </div>


          {/* Technology categories */}

          <div className="mt-12 grid gap-5 md:grid-cols-3">

            {technologyGroups.map((group) => (

              <div
                key={group.title}
                className="rounded-xl border border-slate-200 bg-white p-6"
              >

                <h3 className="text-base font-bold text-[#101A30]">
                  {group.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {group.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">

                  {group.items.map((item) => (

                    <span
                      key={item}
                      className="rounded-lg bg-[#101A30] px-3 py-2 text-xs font-semibold text-white"
                    >
                      {item}
                    </span>

                  ))}

                </div>

              </div>

            ))}

          </div>

          {/* Git and GitHub explanation */}

          <div className="mt-12 overflow-hidden rounded-2xl bg-[#101A30] text-white">

            <div className="grid md:grid-cols-2">

              {/* Git */}

              <div className="border-b border-white/10 p-8 md:border-r md:border-b-0 md:p-10">

                <div className="flex items-center gap-4">

                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white text-[#F05032]">
                    <FaGitAlt size={34} />
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold">
                      Git
                    </h3>

                    <p className="mt-1 text-sm text-yellow-400">
                      Version Control System
                    </p>
                  </div>

                </div>

                <p className="mt-6 text-sm leading-8 text-slate-300">
                  Git is a distributed version control system
                  that helps developers track changes in source
                  code, manage different versions, and return
                  to previous versions when necessary.
                </p>

                <div className="mt-6 space-y-3">

                  {[
                    "Track source-code changes",
                    "Create and manage branches",
                    "Maintain development history",
                  ].map((item) => (

                    <div key={item} className="flex items-center gap-3">

                      <CheckCircle2
                        size={18}
                        className="text-yellow-400"
                      />

                      <span className="text-sm text-slate-300">
                        {item}
                      </span>

                    </div>

                  ))}

                </div>

              </div>


              {/* GitHub */}

              <div className="p-8 md:p-10">

                <div className="flex items-center gap-4">

                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white text-[#101A30]">
                    <FaGithub size={34} />
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold">
                      GitHub
                    </h3>

                    <p className="mt-1 text-sm text-yellow-400">
                      Code Hosting & Collaboration
                    </p>
                  </div>

                </div>

                <p className="mt-6 text-sm leading-8 text-slate-300">
                  GitHub is a platform for hosting Git
                  repositories, sharing source code, reviewing
                  changes, and collaborating with other
                  developers on software projects.
                </p>

                <div className="mt-6 space-y-3">

                  {[
                    "Host project repositories",
                    "Collaborate with team members",
                    "Share and review code changes",
                  ].map((item) => (

                    <div key={item} className="flex items-center gap-3">

                      <CheckCircle2
                        size={18}
                        className="text-yellow-400"
                      />

                      <span className="text-sm text-slate-300">
                        {item}
                      </span>

                    </div>

                  ))}

                </div>

                <a
                  href="https://github.com/wakillysefatullah-cyber/PlanedReactjsProject"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-7 inline-flex items-center gap-2 rounded-lg bg-yellow-400 px-5 py-3 text-sm font-bold text-[#101A30] transition hover:bg-yellow-300"
                >
                  Explore EasyCount Repository
                  <ArrowUpRight size={18} />
                </a>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* ================= CLOSING CTA ================= */}

      <section className="px-6 pb-20 md:px-10 md:pb-28">

        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-yellow-400 px-7 py-16 text-center md:px-16">

          <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full border-[30px] border-[#101A30]/5" />

          <div className="relative">

            <p className="text-sm font-bold tracking-[0.2em] text-[#101A30]/70">
              EASYCOUNT
            </p>

            <h2 className="mx-auto mt-4 max-w-3xl text-3xl leading-tight font-extrabold text-[#101A30] md:text-5xl">
              Make every business operation count.
            </h2>

            <p className="mx-auto mt-5 max-w-xl leading-8 text-[#101A30]/75">
              Bringing your business activities together
              through one organized management platform.
            </p>

            <a
              href="/"
              className="mt-8 inline-flex items-center gap-2 rounded-lg bg-[#101A30] px-7 py-4 font-bold text-white transition hover:bg-[#1D2C48]"
            >
              Back to Dashboard
              <ArrowUpRight size={19} />
            </a>

          </div>

        </div>

      </section>


      {/* ================= FOOTER ================= */}

      <footer className="bg-[#101A30] px-6 py-10 text-white md:px-10">

        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 md:flex-row">

          <div className="text-center md:text-left">

            <h2 className="text-2xl font-extrabold">
              Easy<span className="text-yellow-400">Count.</span>
            </h2>

            <p className="mt-2 text-sm text-slate-400">
              Business Management & Accounting System
            </p>

          </div>

          <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-300">

            <a
              href="/"
              className="transition hover:text-yellow-400"
            >
              Dashboard
            </a>

            <a
              href="#introduction"
              className="transition hover:text-yellow-400"
            >
              About
            </a>

            <a
              href="#features"
              className="transition hover:text-yellow-400"
            >
              Features
            </a>

            <a
              href="#team"
              className="transition hover:text-yellow-400"
            >
              Our Team
            </a>

            <a
              href="#technologies"
              className="transition hover:text-yellow-400"
            >
              Technologies
            </a>

          </div>

        </div>

        <div className="mx-auto mt-8 max-w-7xl border-t border-white/10 pt-6 text-center">

          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} EasyCount. All rights reserved.
          </p>

        </div>

      </footer>

    </main>
  );
}

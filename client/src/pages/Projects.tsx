import { useState } from "react";
import { FreeQuoteModal } from "@/components/FreeQuoteModal";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

export default function Projects() {
  const [filter, setFilter] = useState("All");

  const projects = [
    {
      id: 1,
      title: "Koradi Site ",
      category: "Residential",
      capacity: "3kW",
      location: "Amravati, MH",
      image: "/images/Korade site.jpg",
    },
    {
      id: 2,
      title: "Himgiri Apartments",
      category: "Residential",
      capacity: "5kW",
      location: "Nagpur, MH",
      image: "client/Public/images/himgiri.jpeg",
    },
    {
      id: 3,
      title: "Gokul Girdhar 7+ Sites",
      category: "Commercial",
      capacity: "25.4KW",
      location: "Saroj Nagar, Nagpur, MH",
      image: "/images/gokul girdhar.jpeg",
    },
    {
      id: 4,
      title: "Pauni School Anandam Vidyalay",
      category: "Commercial",
      capacity: "20kW",
      location: "Nagpur, MH",
      image: "images/pauni School .jpg",
    },
    {
      id: 5,
      title: "Mangalam Tuli Apartment",
      category: "Commercial",
      capacity: "20kW",
      location: "Friends Colony Nagpur, MH",
      image: "Public/images/mangalm tulsi.jpg",
    },
    {
      id: 6,
      title: "Balaji Appertment 12+ Sites",
      category: "Residential",
      capacity: "53kW",
      location: "Nagpur, MH",
      image: "/images/balaji.jpeg",
    },
    {
      id: 7,
      title: "Ginning Mill",
      category: "Industrial",
      capacity: "300kW",
      location: "Rural Amravati, MH",
      image: "/images/ginning mill.jpg",
    },
  ];

  const filteredProjects =
    filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <div className="flex flex-col min-h-screen pt-20">
      <section className="bg-secondary text-white py-20">
        <div className="container-custom text-center">
          <h1 className="text-4xl lg:text-6xl font-display font-bold mb-6">
            Our Portfolio
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Take a look at some of our recent installations powering homes and
            businesses.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {["All", "Residential", "Commercial", "Industrial"].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${
                  filter === cat
                    ? "bg-secondary text-white shadow-lg shadow-secondary/30 scale-105"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence>
              {filteredProjects.map((project) => (
                <motion.div
                  layout
                  key={project.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="group rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
                >
                  <div className="aspect-[4/3] overflow-hidden relative">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                      <p className="text-white font-medium">
                        Completed in 2023
                      </p>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-secondary bg-secondary/10 px-2 py-1 rounded">
                        {project.category}
                      </span>
                      <span className="text-sm font-bold text-primary flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                        {project.capacity}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mb-1">{project.title}</h3>
                    <p className="text-gray-500 text-sm">{project.location}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          <div className="mt-16 text-center">
            <div className="inline-block p-8 bg-gray-50 rounded-3xl border border-dashed border-gray-300 max-w-2xl">
              <h3 className="text-2xl font-bold mb-4">
                Want your roof to be next?
              </h3>
              <p className="text-gray-600 mb-6">
                Join hundreds of happy customers who are generating their own
                clean electricity.
              </p>
              <FreeQuoteModal>
                <Button className="btn-primary rounded-full px-8 text-lg">
                  Get Your Proposal
                </Button>
              </FreeQuoteModal>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

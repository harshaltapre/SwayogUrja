import { useState } from "react";
import { FreeQuoteModal } from "@/components/FreeQuoteModal";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

export default function Projects() {
  const [filter, setFilter] = useState("All");

  const projects = [
    {
      id: 1,
      title: "Green Villa Residence",
      category: "Residential",
      capacity: "5kW",
      location: "Pune, MH",
      image:
        "https://images.unsplash.com/photo-1611365892117-00ac5ef43c90?w=800&auto=format&fit=crop&q=60",
    },
    {
      id: 2,
      title: "Tech Park Rooftop",
      category: "Commercial",
      capacity: "100kW",
      location: "Mumbai, MH",
      image:
        "https://images.unsplash.com/photo-1595833215549-a29241940985?w=800&auto=format&fit=crop&q=60",
    },
    {
      id: 3,
      title: "Steel Factory Plant",
      category: "Industrial",
      capacity: "500kW",
      location: "Nashik, MH",
      image:
        "https://images.unsplash.com/photo-1566093097221-85652050523e?w=800&auto=format&fit=crop&q=60",
    },
    {
      id: 4,
      title: "Modern Apartment Complex",
      category: "Residential",
      capacity: "25kW",
      location: "Pune, MH",
      image:
        "https://images.unsplash.com/photo-1592833159057-65a269f51c58?w=800&auto=format&fit=crop&q=60",
    },
    {
      id: 5,
      title: "School Campus",
      category: "Commercial",
      capacity: "40kW",
      location: "Satara, MH",
      image:
        "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=800&auto=format&fit=crop&q=60",
    },
    {
      id: 6,
      title: "Warehousing Unit",
      category: "Industrial",
      capacity: "200kW",
      location: "Nagpur, MH",
      image:
        "https://images.unsplash.com/photo-1617155093730-a8bf47be792d?w=800&auto=format&fit=crop&q=60",
    },
  ];

  const filteredProjects =
    filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <div className="flex flex-col min-h-screen pt-20">
      {/* Header */}
      <section className="bg-secondary/5 py-20">
        <div className="container-custom text-center">
          <h1 className="text-4xl lg:text-6xl font-display font-bold text-gray-900 mb-6">
            Our Portfolio
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
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

import { motion } from "framer-motion";
import { FreeQuoteModal } from "@/components/FreeQuoteModal";
import { Button } from "@/components/ui/button";
import { Target, Lightbulb, Heart, Award } from "lucide-react";

export default function About() {
  return (
    <div className="flex flex-col min-h-screen pt-20">
      <section className="bg-secondary text-white py-20">
        <div className="container-custom text-center">
          <h1 className="text-4xl lg:text-6xl font-display font-bold mb-6">
            Powering a Brighter Future
          </h1>
            <p className="text-xl text-black/80 max-w-2xl mx-auto">
            Swayog Urja is dedicated to accelerating the adoption of sustainable
            energy through innovation, quality, and customer-centricity.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 relative">
              {/* team working */}
              <img
                src="https://pixabay.com/get/gd5806187bf0311761e6002d7fbe976fa0e5c539140bb7b57ac7285466442972af556a3f9e8ec556ba6575a026e703e688eb1257f3cb55fbeab1fc3487dd2df9c_1280.jpg"
                alt="Our Team"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-xl border border-gray-100 max-w-xs hidden md:block">
                <p className="text-lg font-bold text-gray-900 italic">
                  "Our mission is to make solar accessible to every household."
                </p>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <span className="text-primary font-semibold uppercase tracking-wider text-sm">
                Who We Are
              </span>
              <h2 className="text-3xl lg:text-4xl font-display font-bold mt-2 mb-6">
                More Than Just a Solar Company
              </h2>
              <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
                <p>
                  Founded in 2017, Swayog Urja began with a simple belief: clean
                  energy should be reliable and affordable. Over the years, we
                  have grown into one of the most trusted solar EPC companies in
                  the region.
                </p>
                <p>
                  We specialize in end-to-end solar solutions, from site
                  assessment and design to installation and maintenance. Our
                  team of certified engineers ensures that every project meets
                  global quality standards.
                </p>
                <p>
                  We are driven by the vision of a self-reliant India powered by
                  the sun. Every installation we complete is a step towards
                  reducing carbon emissions and creating a sustainable legacy
                  for future generations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-display font-bold">Our Core Values</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Target,
                title: "Excellence",
                desc: "We strive for perfection in every installation.",
              },
              {
                icon: Lightbulb,
                title: "Innovation",
                desc: "Adopting the latest technology for better efficiency.",
              },
              {
                icon: Heart,
                title: "Integrity",
                desc: "Transparent pricing and honest advice, always.",
              },
              {
                icon: Award,
                title: "Quality",
                desc: "Only premium components with verified warranties.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow text-center"
              >
                <div className="w-16 h-16 mx-auto bg-secondary/10 text-secondary rounded-full flex items-center justify-center mb-6">
                  <item.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary">
        <div className="container-custom flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-primary-foreground">
            <h2 className="text-3xl font-display font-bold mb-2">
              Join our growing family
            </h2>
            <p className="text-lg opacity-90">
              Start your solar journey with a free consultation today.
            </p>
          </div>
          <FreeQuoteModal>
            <Button
              size="lg"
              className="bg-white text-primary hover:bg-white/90 px-8 h-14 rounded-full font-bold text-lg shadow-lg"
            >
              Contact Us Now
            </Button>
          </FreeQuoteModal>
        </div>
      </section>
    </div>
  );
}

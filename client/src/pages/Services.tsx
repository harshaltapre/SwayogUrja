import { FreeQuoteModal } from "@/components/FreeQuoteModal";
import { Button } from "@/components/ui/button";
import { Check, Sun, Factory, Building2, Wrench, ArrowRight } from "lucide-react";
import { Link } from "wouter";

export default function Services() {
  const services = [
    {
      id: "residential",
      title: "Residential Solar",
      subtitle: "For Homes & Housing Societies",
      description: "Transform your roof into a power plant. Generate your own electricity and drastically reduce your monthly bills. We offer aesthetically pleasing designs that blend with your home architecture.",
      features: ["30% - 90% Bill Reduction", "Govt. Subsidy Support", "25 Year Performance Warranty", "Net Metering Setup"],
      icon: Sun,
      color: "bg-orange-50 text-orange-600",
      image: "Public/images/com.jpeg"
    },
    {
      id: "commercial",
      title: "Commercial Solar",
      subtitle: "For Offices, Schools & Hospitals",
      description: "Smart businesses choose solar. Reduce your operational overheads and claim accelerated depreciation benefits. Show your commitment to sustainability.",
      features: ["Accelerated Depreciation (40%)", "High ROI (3-4 Years)", "Reduced Carbon Footprint", "Customized Carport Solutions"],
      icon: Building2,
      color: "bg-blue-50 text-blue-600",
      image: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=800&auto=format&fit=crop&q=60"
    },
    {
      id: "industrial",
      title: "Industrial Solar",
      subtitle: "For Factories & Warehouses",
      description: "Large-scale energy solutions for power-intensive industries. Utilize your shed roofs or unused ground space to generate megawatts of power.",
      features: ["Grid-Interactive Systems", "High Capacity Inverters", "Load Flow Analysis", "Peak Load Shaving"],
      icon: Factory,
      color: "bg-slate-50 text-slate-600",
      image: "https://images.unsplash.com/photo-1548613053-220e7534d3d4?w=800&auto=format&fit=crop&q=60"
    },
    {
      id: "maintenance",
      title: "O&M Services",
      subtitle: "Operations & Maintenance",
      description: "Keep your solar plant running at peak efficiency. We offer comprehensive cleaning, monitoring, and repair services for existing solar installations.",
      features: ["Regular Panel Cleaning", "Inverter Health Check", "Remote Monitoring", "Performance Reporting"],
      icon: Wrench,
      color: "bg-green-50 text-green-600",
      image: "https://images.unsplash.com/photo-1594818379496-da1e345b0ded?w=800&auto=format&fit=crop&q=60"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen pt-20">
      <section className="bg-secondary text-white py-20">
        <div className="container-custom text-center">
          <h1 className="text-4xl lg:text-6xl font-display font-bold mb-6">Our Services</h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Comprehensive solar energy solutions tailored to your specific requirements.
          </p>
        </div>
      </section>

      <div className="container-custom py-20 space-y-24">
        {services.map((service, idx) => (
          <div key={service.id} className={`flex flex-col ${idx % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 lg:gap-20 items-center`}>
            <div className="flex-1 w-full">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3] group">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60" />
              </div>
            </div>
            
            <div className="flex-1 space-y-6">
              <div className={`inline-flex p-3 rounded-2xl ${service.color}`}>
                <service.icon className="h-8 w-8" />
              </div>
              <div>
                <h2 className="text-3xl font-display font-bold text-gray-900">{service.title}</h2>
                <p className="text-primary font-medium mt-1">{service.subtitle}</p>
              </div>
              <p className="text-gray-600 text-lg leading-relaxed">
                {service.description}
              </p>
              
              <ul className="space-y-3">
                {service.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 font-medium text-gray-700">
                    <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <Check className="h-3.5 w-3.5 text-green-600" />
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>
              
              <div className="pt-4 flex gap-4">
                <FreeQuoteModal>
                  <Button className="rounded-full px-6">Get Quote</Button>
                </FreeQuoteModal>
                <Link href="/projects">
                  <Button variant="outline" className="rounded-full px-6">View Projects <ArrowRight className="ml-2 h-4 w-4" /></Button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <section className="bg-gray-50 py-20">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-8">Not sure which system fits your needs?</h2>
          <FreeQuoteModal>
            <Button size="lg" className="rounded-full px-10 h-14 text-lg bg-primary text-primary-foreground hover:bg-primary/90">
              Consult an Expert for Free
            </Button>
          </FreeQuoteModal>
        </div>
      </section>
    </div>
  );
}

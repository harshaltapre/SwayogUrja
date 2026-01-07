import { FreeQuoteModal } from "@/components/FreeQuoteModal";
import { Button } from "@/components/ui/button";
import { Check, Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export default function Pricing() {
  const packages = [
    {
      name: "Basic Home",
      capacity: "3 kW",
      desc: "Perfect for 2-3 BHK apartments with basic appliances.",
      price: "₹1,80,000*",
      savings: "₹3,500 / month",
      features: [
        "Tier-1 Polycrystalline Panels",
        "String Inverter",
        "Galvanized Structure",
        "5 Years System Warranty",
        "Net Metering Assistance"
      ]
    },
    {
      name: "Premium Home",
      capacity: "5 kW",
      popular: true,
      desc: "Ideal for bungalows with ACs and geysers.",
      price: "₹2,75,000*",
      savings: "₹6,000 / month",
      features: [
        "Tier-1 Mono-PERC Panels (High Eff.)",
        "Smart WiFi Inverter",
        "Aluminium Structure (Rust-Free)",
        "5 Years System Warranty",
        "Priority Support"
      ]
    },
    {
      name: "Large Villa",
      capacity: "10 kW",
      desc: "For large homes with high consumption.",
      price: "₹5,20,000*",
      savings: "₹12,000 / month",
      features: [
        "Bifacial Solar Panels",
        "Advanced Monitoring App",
        "Elevated Structure Design",
        "5 Years System Warranty",
        "Quarterly Cleaning (1 Year)"
      ]
    }
  ];

  return (
    <div className="flex flex-col min-h-screen pt-20">
      <section className="bg-secondary/5 py-20">
        <div className="container-custom text-center">
          <h1 className="text-4xl lg:text-6xl font-display font-bold mb-6">Transparent Pricing</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Estimated costs for standard on-grid solar systems. Prices may vary based on site conditions and subsidy.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            {packages.map((pkg, i) => (
              <div 
                key={i} 
                className={`relative rounded-3xl p-8 border-2 transition-all duration-300 ${
                  pkg.popular 
                    ? "border-primary bg-white shadow-2xl scale-105 z-10" 
                    : "border-gray-100 bg-white hover:border-gray-200 shadow-lg"
                }`}
              >
                {pkg.popular && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full shadow-sm">
                    Most Popular
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <h3 className="text-xl font-bold text-gray-900">{pkg.name}</h3>
                  <div className="text-secondary font-bold text-4xl mt-4 mb-2">{pkg.capacity}</div>
                  <p className="text-sm text-gray-500 mb-6 px-4">{pkg.desc}</p>
                  
                  <div className="bg-gray-50 rounded-xl p-4 mb-2">
                    <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold">Estimated Cost</p>
                    <p className="text-2xl font-bold text-gray-900">{pkg.price}</p>
                  </div>
                  <div className="text-sm font-medium text-green-600 flex items-center justify-center gap-1">
                    Save approx. {pkg.savings} <Tooltip><TooltipTrigger><Info className="h-3 w-3" /></TooltipTrigger><TooltipContent>Based on avg. generation of 4 units/kW/day @ ₹7/unit</TooltipContent></Tooltip>
                  </div>
                </div>
                
                <ul className="space-y-4 mb-8">
                  {pkg.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-gray-600">
                      <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      {feat}
                    </li>
                  ))}
                </ul>
                
                <FreeQuoteModal>
                  <Button className={`w-full rounded-xl py-6 font-bold ${pkg.popular ? "btn-primary" : "bg-gray-900 text-white hover:bg-gray-800"}`}>
                    Get This Package
                  </Button>
                </FreeQuoteModal>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center text-sm text-gray-500">
            <p>* Prices are indicative and subject to change based on brand of components, structure height, and cable length. Government subsidy is extra.</p>
          </div>
          
          <div className="mt-16 p-8 bg-primary/10 rounded-2xl border border-primary/20 flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <h3 className="text-2xl font-bold mb-2">Need a Custom Commercial Solution?</h3>
              <p className="text-gray-700">For capacities above 10kW or industrial requirements, we offer tailored proposals with ROI analysis.</p>
            </div>
            <FreeQuoteModal>
              <Button size="lg" className="bg-secondary text-white hover:bg-secondary/90">Contact for Custom Quote</Button>
            </FreeQuoteModal>
          </div>
        </div>
      </section>
    </div>
  );
}

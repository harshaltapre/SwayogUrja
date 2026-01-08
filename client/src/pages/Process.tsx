import { CheckCircle2 } from "lucide-react";
import { FreeQuoteModal } from "@/components/FreeQuoteModal";
import { Button } from "@/components/ui/button";

export default function Process() {
  const steps = [
    {
      title: "Free Consultation",
      desc: "We analyze your electricity bills and roof area to understand your energy needs. We provide a preliminary estimation of savings and system size.",
      number: "01",
    },
    {
      title: "Site Inspection",
      desc: "Our engineers visit your property to check shadow-free area, roof strength, and electrical infrastructure. This ensures maximum efficiency for your plant.",
      number: "02",
    },
    {
      title: "Custom Design",
      desc: "We create a detailed 3D design of the solar plant layout tailored to your roof. We select the best components optimized for your specific location.",
      number: "03",
    },
    {
      title: "Installation",
      desc: "Our certified installation team sets up the structure, panels, and inverters with precision and safety. We ensure minimal disruption to your daily routine.",
      number: "04",
    },
    {
      title: "Testing & Net Metering",
      desc: "We perform rigorous testing of the system. We also handle all the paperwork and coordination with the electricity board for Net Metering installation.",
      number: "05",
    },
    {
      title: "Support & Maintenance",
      desc: "Once the system is live, we provide remote monitoring support and periodic maintenance to ensure your plant generates peak power for years.",
      number: "06",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen pt-20">
      <section className="bg-secondary text-white py-20">
        <div className="container-custom text-center">
          <h1 className="text-4xl lg:text-6xl font-display font-bold mb-6">
            How It Works
          </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Our seamless 6-step process takes you from consultation to
            generation without any hassle.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <div
                key={i}
                className="relative p-8 rounded-2xl border border-gray-200 bg-white hover:border-primary/50 hover:shadow-xl transition-all duration-300 group"
              >
                <div className="text-6xl font-bold text-gray-100 absolute top-4 right-4 group-hover:text-primary/10 transition-colors">
                  {step.number}
                </div>
                <div className="relative z-10">
                  <div className="w-12 h-12 bg-secondary text-white rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-secondary/30">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-20 bg-primary/10 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 border border-primary/20">
            <div>
              <h3 className="text-2xl font-bold mb-2 text-gray-900">
                Ready to start step 1?
              </h3>
              <p className="text-gray-600">
                Get your free consultation and quote today.
              </p>
            </div>
            <FreeQuoteModal>
              <Button
                size="lg"
                className="rounded-full px-8 bg-primary text-primary-foreground hover:bg-primary/90 font-bold shadow-lg"
              >
                Start Now
              </Button>
            </FreeQuoteModal>
          </div>
        </div>
      </section>
    </div>
  );
}

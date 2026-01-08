import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Sun, Phone } from "lucide-react";
import { useState } from "react";
import { FreeQuoteModal } from "./FreeQuoteModal";

export function Navbar() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Process", href: "/process" },
    { label: "Projects", href: "/projects" },
    { label: "Pricing", href: "/pricing" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  const isActive = (href: string) => location === href;

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="container-custom h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-primary/10 p-2 rounded-lg group-hover:bg-primary/20 transition-colors">
            <img 
              src="https://images.unsplash.com/photo-1509391366360-2e959784a276?w=32&h=32&fit=crop&q=80" 
              alt="Swayog Energy" 
              className="h-8 w-8"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold leading-none text-secondary">SWAYOG</span>
            <span className="text-[10px] font-bold tracking-widest text-primary uppercase">Urja</span>
          </div>
        </Link>
        <div className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 hover:bg-secondary/5 hover:text-secondary ${
                isActive(item.href)
                  ? "bg-secondary/10 text-secondary font-semibold"
                  : "text-gray-600"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden lg:flex items-center gap-4">
          <a href="tel:+91 8484833070" className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-secondary transition-colors">
            <Phone className="h-4 w-4" />
            +91 848 483 3070
          </a>
          <FreeQuoteModal>
            <Button className="btn-primary rounded-full px-6 bg-primary text-primary-foreground hover:bg-primary/90">
              Get Free Quote
            </Button>
          </FreeQuoteModal>
        </div>

        {/* Mobile Menu */}
        <div className="lg:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-gray-600">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col gap-6 mt-8">
                <div className="flex flex-col gap-2">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`text-lg font-medium px-4 py-3 rounded-lg transition-colors ${
                        isActive(item.href)
                          ? "bg-secondary/10 text-secondary"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
                <div className="border-t pt-6">
                  <FreeQuoteModal>
                    <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-bold">
                      Get Free Quote
                    </Button>
                  </FreeQuoteModal>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}

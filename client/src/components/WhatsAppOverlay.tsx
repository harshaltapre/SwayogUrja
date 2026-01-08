import { SiWhatsapp } from "react-icons/si";

export function WhatsAppOverlay() {
  const phoneNumber = "9272099152";
  const message = encodeURIComponent("Hello Swayog Urja, I'm interested in solar installation.");
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 left-6 z-[100] bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform duration-300 flex items-center justify-center group"
      aria-label="Chat on WhatsApp"
      data-testid="link-whatsapp-chat"
    >
      <SiWhatsapp className="w-8 h-8" />
      <span className="absolute left-full ml-3 px-3 py-1.5 bg-black/80 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        Chat with us
      </span>
    </a>
  );
}

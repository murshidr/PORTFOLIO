import Nav from "@/components/Nav";
import Contact from "@/components/Contact";

export default function ContactPage() {
  return (
    <main className="relative bg-cream min-h-screen flex flex-col justify-center">
      <Nav />
      <div className="pt-32 flex-1 flex items-center">
        <Contact />
      </div>
    </main>
  );
}

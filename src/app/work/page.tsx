import Nav from "@/components/Nav";
import ProjectList from "@/components/ProjectList";
import Contact from "@/components/Contact";

export default function WorkPage() {
  return (
    <main className="relative bg-cream min-h-screen">
      <Nav />
      <div className="pt-32">
        <ProjectList />
      </div>
      <Contact />
    </main>
  );
}

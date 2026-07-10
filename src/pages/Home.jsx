import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import FeatureCard from "../components/FeatureCard";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />

      <section className="grid md:grid-cols-3 gap-6 p-10 bg-gray-100">
        <FeatureCard
          title="Create Quiz"
          description="Teachers can create unlimited quizzes."
        />

        <FeatureCard
          title="Attempt Quiz"
          description="Students can solve quizzes online."
        />

        <FeatureCard
          title="Instant Results"
          description="Scores are calculated automatically."
        />
      </section>
    </>
  );
}
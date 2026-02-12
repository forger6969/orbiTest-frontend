import Header from "../Components/Header";
import DotGrid from "../Components/DotGrid";
import Hero from "../Components/Hero";

const Home = () => {
  return (
    <div style={{ position: "relative", minHeight: "100vh" }}>
      {/* DOT BACKGROUND */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
        }}
      >
        <DotGrid
          dotSize={1.5}
          gap={15}
          baseColor="#d9d7d9"
          activeColor="#3300ff"
          proximity={120}
          shockRadius={100}
          shockStrength={15}
          resistance={950}
          returnDuration={1.5}
        />
      </div>

      {/* CONTENT */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <div className="z-50 bg-white">
        <Header />

        </div>
        <Hero />
      </div>
    </div>
  );
};

export default Home;

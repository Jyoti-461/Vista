import Navbar from "../components/Navbar";
//import HeroImage from "../components/HeroImage";
import Hero from "../components/Hero";
import Countdown from "../components/Countdown";
import Stats from "../components/Stats";
//import Sponsors from "../components/Sponsors";
import Events from "../components/Events";
//import RegisterForm from "../components/RegisterForm";
import Footer from "../components/Footer";
import Team from "../components/Team";
import About from "../components/About";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <>
      <Navbar />
      
      <Hero />
      <Countdown />
      <About />
      <Stats />
      
      <Events />
      <Team />
      <Footer />
    </>
  );
};

export default Home;
//<Sponsors />
// <HeroImage />
//<RegisterForm />
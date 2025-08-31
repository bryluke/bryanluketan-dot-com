import styles from "./Home.module.css";
import ThemeToggle from "@/src/components/ThemeToggle";
import ColorPicker from "@/src/components/ColorPicker";

export default function Home() {
  return (
    <div className={styles.root}>
      <div className={styles.controls}>
        <ThemeToggle />
        <ColorPicker />
      </div>
      
      <div className={styles.intro}>
        Hi, I'm Bryan Luke Tan.
      </div>
      <div className={styles.description}>
        Welcome to my digital garden: a space for my profile, portfolio, blog, freelance services, projects, and coding sandbox. <br />
        This site is minimal by design, giving me room to experiment and grow.
      </div>
      {/* Add more sections and animations as you expand! */}
    </div>
  );
}

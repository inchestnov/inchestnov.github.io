import { LanguageProvider } from './context/LanguageContext';
import { ScrollProgress } from './components/ScrollProgress';
import { TopBar } from './components/TopBar/TopBar';
import { HeroSection } from './components/HeroSection';
import { SkillsSection } from './components/SkillsSection';
import { ExperienceSection } from './components/ExperienceSection/ExperienceSection';
import { ProjectsSection } from './components/ProjectsSection/ProjectsSection';
import { RoadmapSection } from './components/RoadmapSection/RoadmapSection';
import { SiteFooter } from './components/SiteFooter';

export function App() {
  return (
    <LanguageProvider>
      <ScrollProgress />
      <TopBar />
      <HeroSection />
      <SkillsSection />
      <main className="main-content">
        <ExperienceSection />
      </main>
      <ProjectsSection />
      <RoadmapSection />
      <SiteFooter />
    </LanguageProvider>
  );
}

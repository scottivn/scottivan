import { HomeHero } from "@/components/home/HomeHero";
import { ThisWeekModule } from "@/components/home/ThisWeekModule";
import { CategoriesGrid } from "@/components/home/CategoriesGrid";
import { StoryBlock } from "@/components/home/StoryBlock";
import { HoursStrip } from "@/components/home/HoursStrip";

export default function HomePage() {
  return (
    <main className="flex-1 flex flex-col">
      <HomeHero />
      <ThisWeekModule />
      <CategoriesGrid />
      <StoryBlock />
      <HoursStrip />
    </main>
  );
}

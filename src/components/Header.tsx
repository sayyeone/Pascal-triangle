import { Button } from "@/components/ui/button";
import { Triangle, FlaskConical, BookOpen, ChevronDown } from "lucide-react";

interface HeaderProps {
  onNavigate: (section: string) => void;
}

export const Header = ({ onNavigate }: HeaderProps) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center shadow-lg">
              <Triangle className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg hidden sm:block">Pascal's Triangle</span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            <Button
              variant="ghost"
              onClick={() => onNavigate("intro")}
              className="text-muted-foreground hover:text-foreground"
            >
              <BookOpen className="w-4 h-4 mr-2" />
              Pengenalan
            </Button>
            <Button
              variant="ghost"
              onClick={() => onNavigate("visualization")}
              className="text-muted-foreground hover:text-foreground"
            >
              <Triangle className="w-4 h-4 mr-2" />
              Visualisasi
            </Button>
            <Button
              variant="ghost"
              onClick={() => onNavigate("demo")}
              className="text-muted-foreground hover:text-foreground"
            >
              <FlaskConical className="w-4 h-4 mr-2" />
              Demo
            </Button>
          </nav>

          {/* CTA */}
          <Button
            variant="hero"
            size="sm"
            onClick={() => onNavigate("demo")}
          >
            Coba Demo
            <ChevronDown className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </header>
  );
};

import React, { useEffect } from 'react';
import { Link } from 'wouter';
import { useTranslation } from 'react-i18next';
import { Moon, Sun, Globe, LogOut, User, LayoutDashboard, ChevronDown, Mail, Phone, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import { useTheme } from '@/hooks/use-theme';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import logoPng from "@assets/logo_1772459405886.png";

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const { t, i18n } = useTranslation();
  const { theme, setTheme } = useTheme();
  const { user, isAuthenticated, logout } = useAuth();

  useEffect(() => {
    document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
  }, [i18n.language]);

  const toggleLang = (lng: string) => i18n.changeLanguage(lng);

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-primary/20">
      <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <img src={logoPng} alt="Biblical Financial Courses" className="h-10 w-auto" />
          </Link>

          <nav className="hidden lg:flex items-center gap-6">
            <DropdownMenu>
              <DropdownMenuTrigger className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
                Faith Activities <ChevronDown className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem className="font-bold text-xs uppercase text-muted-foreground px-2 py-1">Spiritual Growth</DropdownMenuItem>
                <DropdownMenuItem>Worship</DropdownMenuItem>
                <DropdownMenuItem>Reading</DropdownMenuItem>
                <DropdownMenuItem>Meditation</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="font-bold text-xs uppercase text-muted-foreground px-2 py-1">Community</DropdownMenuItem>
                <DropdownMenuItem>Games</DropdownMenuItem>
                <DropdownMenuItem>Testimonies</DropdownMenuItem>
                <DropdownMenuItem>Prayers</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
                Along Activities <ChevronDown className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Testimony Along</DropdownMenuItem>
                <DropdownMenuItem>Pray Along</DropdownMenuItem>
                <DropdownMenuItem>Sing Along</DropdownMenuItem>
                <DropdownMenuItem>Read Along</DropdownMenuItem>
                <DropdownMenuItem>Meditate Along</DropdownMenuItem>
                <DropdownMenuItem>Game Along</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link href="/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Courses
            </Link>
            <Link href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Donate
            </Link>
          </nav>

          <div className="flex items-center gap-2 md:gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-1 px-2 h-9">
                  <Globe className="w-4 h-4" />
                  <span className="hidden sm:inline">English</span>
                  <ChevronDown className="w-3 h-3 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => toggleLang('en')}>English</DropdownMenuItem>
                <DropdownMenuItem onClick={() => toggleLang('sw')}>Swahili</DropdownMenuItem>
                <DropdownMenuItem onClick={() => toggleLang('fr')}>Français</DropdownMenuItem>
                <DropdownMenuItem onClick={() => toggleLang('ar')}>العربية</DropdownMenuItem>
                <DropdownMenuItem onClick={() => toggleLang('pt')}>Português</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>

            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="rounded-full gap-2 pl-2">
                    <img 
                      src={user?.profileImageUrl || `https://ui-avatars.com/api/?name=${user?.firstName || 'U'}&background=random`} 
                      alt="Avatar" 
                      className="w-7 h-7 rounded-full"
                    />
                    <ChevronDown className="w-4 h-4 text-muted-foreground" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <Link href="/dashboard">
                    <DropdownMenuItem className="cursor-pointer">
                      <LayoutDashboard className="w-4 h-4 mr-2" />
                      Dashboard
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => logout()} className="text-destructive cursor-pointer">
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button asChild className="rounded-full font-semibold shadow-sm hover:shadow-md transition-all">
                <a href="/api/login">Login</a>
              </Button>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1">
        {children}
      </main>

      <footer className="bg-background border-t pt-16 pb-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            <div className="space-y-6">
              <img src={logoPng} alt="Logo" className="h-12 w-auto" />
              <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
                A community of faith where believers come together to worship, pray, study, and grow spiritually.
              </p>
              <div className="flex items-center gap-4">
                <Link href="#"><Facebook className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" /></Link>
                <Link href="#"><Twitter className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" /></Link>
                <Link href="#"><Instagram className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" /></Link>
                <Link href="#"><Youtube className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" /></Link>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-6">Faith Activities</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-primary transition-colors">Worship</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Reading</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Meditation</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Games</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-6">Community</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-primary transition-colors">Testimonies</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Prayers</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Donate</Link></li>
              </ul>
              <h4 className="font-bold text-lg mt-8 mb-6">Along Activities</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-primary transition-colors">Testimony Along</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Pray Along</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Sing Along</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-6">Get in Touch</h4>
              <ul className="space-y-4 text-sm text-muted-foreground mb-8">
                <li className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-primary" />
                  <span>info@biblicalfinancialcourses.com</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-primary" />
                  <span>+1 (651) 348-9258</span>
                </li>
              </ul>
              <h4 className="font-bold text-lg mb-4">Newsletter</h4>
              <p className="text-xs text-muted-foreground mb-4">Subscribe for updates and devotionals</p>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="bg-muted border-none rounded-lg px-4 py-2 text-sm w-full focus:ring-1 focus:ring-primary outline-none"
                />
                <Button className="bg-primary hover:bg-primary/90 text-white rounded-lg px-4">Subscribe</Button>
              </div>
            </div>
          </div>
          
          <div className="border-t pt-8 text-center text-xs text-muted-foreground">
            © {new Date().getFullYear()} Biblical Financial Courses. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

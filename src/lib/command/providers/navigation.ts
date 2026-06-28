import { CommandProvider, PaletteCommand } from "../types";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export class NavigationCommandProvider implements CommandProvider {
  constructor(private router: AppRouterInstance) {}

  getCommands(): PaletteCommand[] {
    return [
      {
        id: "nav.home",
        title: "Go to Home Page",
        category: "Navigation",
        action: () => this.router.push("/"),
        shortcut: "G H",
        iconName: "Home"
      },
      {
        id: "nav.about",
        title: "Go to About Page",
        category: "Navigation",
        action: () => this.router.push("/about/"),
        shortcut: "G A",
        iconName: "User"
      },
      {
        id: "nav.case-studies",
        title: "Go to Case Studies",
        category: "Navigation",
        action: () => this.router.push("/case-studies/"),
        shortcut: "G C",
        iconName: "Briefcase"
      },
      {
        id: "nav.services",
        title: "Go to Services Page",
        category: "Navigation",
        action: () => this.router.push("/services/"),
        shortcut: "G S",
        iconName: "Cpu"
      },
      {
        id: "nav.blog",
        title: "Go to Blog Page",
        category: "Navigation",
        action: () => this.router.push("/blog/"),
        shortcut: "G B",
        iconName: "BookOpen"
      },
      {
        id: "nav.resume",
        title: "Go to Resume Page",
        category: "Navigation",
        action: () => this.router.push("/resume/"),
        shortcut: "G R",
        iconName: "FileText"
      },
      {
        id: "nav.contact",
        title: "Go to Contact Page",
        category: "Navigation",
        action: () => this.router.push("/contact/"),
        shortcut: "G M",
        iconName: "Mail"
      }
    ];
  }
}

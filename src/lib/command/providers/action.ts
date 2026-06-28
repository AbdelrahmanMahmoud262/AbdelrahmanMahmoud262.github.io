import { CommandProvider, PaletteCommand } from "../types";
import { PERSONAL_INFO } from "@/constants";

export class ActionCommandProvider implements CommandProvider {
  constructor(private onActionExecuted?: (message: string) => void) {}

  getCommands(): PaletteCommand[] {
    return [
      {
        id: "action.download-resume",
        title: "Download Resume PDF",
        category: "Actions",
        action: () => {
          if (typeof window !== "undefined") {
            const link = document.createElement("a");
            link.href = "/resume.pdf";
            link.download = "Abdelrahman_Mahmoud_Nasr_Resume.pdf";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            this.onActionExecuted?.("Resume download started!");
          }
        },
        shortcut: "⌘D",
        iconName: "Download"
      },
      {
        id: "action.copy-email",
        title: "Copy Email to Clipboard",
        category: "Actions",
        action: () => {
          if (typeof navigator !== "undefined" && navigator.clipboard) {
            navigator.clipboard.writeText(PERSONAL_INFO.email);
            this.onActionExecuted?.("Email copied to clipboard!");
          }
        },
        shortcut: "⌘E",
        iconName: "Copy"
      },
      {
        id: "action.open-linkedin",
        title: "Open LinkedIn Profile",
        category: "Actions",
        action: () => {
          if (typeof window !== "undefined") {
            window.open(PERSONAL_INFO.linkedin, "_blank");
          }
        },
        iconName: "Linkedin"
      },
      {
        id: "action.open-github",
        title: "Open GitHub Profile",
        category: "Actions",
        action: () => {
          if (typeof window !== "undefined") {
            window.open(PERSONAL_INFO.github, "_blank");
          }
        },
        iconName: "Github"
      }
    ];
  }
}

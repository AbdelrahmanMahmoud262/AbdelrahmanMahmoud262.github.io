export interface PaletteCommand {
  id: string;
  title: string;
  category: "Navigation" | "Actions" | "System";
  action: () => void;
  shortcut?: string;
  iconName?: string;
}

export interface CommandProvider {
  getCommands(): PaletteCommand[];
}

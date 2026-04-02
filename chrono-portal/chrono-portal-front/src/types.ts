export interface Banner {
  id: number;
  title: string;
  subtitle: string;
  imageUrl: string;
  sortOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Gameplay {
  id: number;
  title: string;
  description: string;
  iconUrl: string;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface GameScreenshot {
  id: number;
  title: string;
  imageUrl: string;
  sortOrder: number;
  createdAt: string;
}

export interface DevProcess {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface HomePageData {
  banners: Banner[];
  gameplays: Gameplay[];
  screenshots: GameScreenshot[];
  devProcesses: DevProcess[];
}

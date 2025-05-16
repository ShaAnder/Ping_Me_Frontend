import { createContext } from "react";
import { CategoryInterface } from "../@types/category.d";
import { ServerInterface } from "../@types/server";

export interface NewServerData {
  name: string;
  server: string;
  description: string;
  category: string;
  category_name: string;
  server_image_urls: {
    server_icon_url: string;
    banner_image_url: string;
  };
}

export interface ServerContextType {
  servers: ServerInterface[];
  categories: CategoryInterface[];
  loadingCategories: boolean;
  loadingServers: boolean;
  refreshServers: (categoryName?: string) => Promise<void>;
  refreshCategories: () => Promise<void>;
  addServer: (data: NewServerData) => Promise<void>;
}

export const ServerContext = createContext<ServerContextType | undefined>(
  undefined
);

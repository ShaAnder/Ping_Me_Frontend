import { createContext } from "react";
import { CategoryInterface } from "../@types/category.d";
import { ServerInterface } from "../@types/server";
import { MessageTypeInterface } from "../@types/message";

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
  servers: ServerInterface[] | null;
  categories: CategoryInterface[];
  loadingCategories: boolean;
  loadingServers: boolean;
  refreshServers: (categoryName?: string) => Promise<void>;
  refreshCategories: () => Promise<void>;
  addServer: (data: NewServerData) => Promise<void>;
  messagesByChannel: { [channelId: string]: MessageTypeInterface[] };
  loadingMessages: boolean;
  fetchMessagesForChannel: (channelId: string) => Promise<void>;
}

export const ServerContext = createContext<ServerContextType | undefined>(
  undefined
);

export interface ServerInterface {
  id: number;
  name: string;
  server: string;
  description: string;
  category: string;
  server_image_urls: {
    server_icon_url: string;
    banner_image_url: string;
  };
  channel_server: {
    id: number;
    name: string;
    server: number;
    topic: string;
    owner: number;
  }[];
}

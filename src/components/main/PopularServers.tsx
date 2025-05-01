import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  Typeography,
} from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { useParams } from "react-router-dom";
import useCrud from "../../hooks/useFetchCRUDData";
import { useEffect } from "react";
import { Link } from "react-router-dom";

interface PopularServer {
  id: number;
  name: string;
  category: string;
  server_image_urls: {
    server_icon_url: string;
    banner_image_url: string;
  };
}

const ExplorePopularServers = () => {
  const { categoryName } = useParams();
  const { dataCRUD, error, loading, fetchData } = useCrud<PopularServer>(
    [],
    "/server_list/select/"
  );
  return <></>;
};

export default ExplorePopularServers;

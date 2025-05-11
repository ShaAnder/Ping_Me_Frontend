import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useCallback, useRef, useEffect } from "react";

interface MainScrollProps {
  children: React.ReactNode;
}

const ScrollContainer = styled(Box)(({ theme }) => ({
  height: `calc(100vh - 22vh)`,
  overflowY: "scroll",
  "&::-webkit-scrollbar": {
    width: "8px",
    height: "8px",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "#888",
    borderRadius: "10px",
  },
  "&::-webkit-scrollbar-track": {
    backgroundColor: "transparent",
    borderRadius: "6px",
  },
  "&::-webkit-scrollbar-corner": {
    backgroundColor: "transparent",
    borderRadius: "4px",
  },
}));

const MainScroll = ({ children }: MainScrollProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [scrollToBottom, children]);

  return <ScrollContainer ref={scrollRef}>{children}</ScrollContainer>;
};

export default MainScroll;

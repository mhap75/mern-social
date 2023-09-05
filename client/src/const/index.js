import {
  AttachFileOutlined,
  GifBoxOutlined,
  MicOutlined,
} from "@mui/icons-material";

export const serverUrl =
  process.env.NODE_ENV === "production"
    ? process.env.SERVER_URL
    : "http://localhost:3001";
import {memo, useState} from "react";
import {
  Box,
  Button,
  Divider,
  IconButton,
  InputBase,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { serverUrl } from "@/const/index.js";
import { selectAuth, setPosts } from "@/states/index.js";
import { FlexBetween, UserImage, WidgetWrapper } from "@/components";
import { light } from "@mui/material/styles/createPalette.js";
import classes from "./classes.module.scss";
import {
  AttachFileOutlined,
  DeleteOutlined,
  EditOutlined,
  GifBoxOutlined,
  ImageOutlined,
  MicOutlined,
  MoreHorizOutlined,
} from "@mui/icons-material";
import Dropzone from "react-dropzone";

function ShareWidget({ picturePath }) {
  const [isOpenImg, setIsOpenImg] = useState(false);
  const [image, setImage] = useState(null);
  const [post, setPost] = useState("");
  const dispatch = useDispatch();
  const {
    palette: {
      neutral: { medium, mediumMain },
      primary: { main },
      background: { alt },
    },
  } = useTheme();
  const {
    token,
    user: { _id },
  } = useSelector(selectAuth);
  const isNotMobile = useMediaQuery("(min-width: 1000px)");
  const icons = [
    { icon: <GifBoxOutlined sx={{ color: mediumMain }} />, title: "Clip" },
    {
      icon: <AttachFileOutlined sx={{ color: mediumMain }} />,
      title: "Attachment",
    },
    { icon: <MicOutlined sx={{ color: mediumMain }} />, title: "Audio" },
  ];

  const handleAddPost = async () => {
    try {
      const formData = new FormData();
      formData.append("userId", _id);
      formData.append("description", post);
      if (image) {
        formData.append("picture", image);
        formData.append("picturePath", image.name);
      }

      const res = await fetch(`${serverUrl}/posts`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      const posts = await res.json();
      dispatch(setPosts({ posts }));
      setImage(null);
      setPost("");
    } catch (e) {
      console.error(e.json());
    }
  };

  return (
    <WidgetWrapper>
      <FlexBetween gap="1.5rem">
        <UserImage img={picturePath} />
        <InputBase
          placeholder="What do you want to share?"
          onChange={({ target }) => setPost(target.value)}
          value={post}
          sx={{ backgroundColor: light }}
          className={classes.share_input}
        />
      </FlexBetween>

      {isOpenImg && (
        <Box
          border={`1px solid ${medium}`}
          borderRadius="5px"
          mt="1rem"
          p="1rem"
        >
          <Dropzone
            accept={{
              "image/*": [".png", ".jpeg", ".jpg"],
            }}
            multiple={false}
            onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
          >
            {({ getRootProps, getInputProps }) => (
              <FlexBetween gap="1rem">
                <Box
                  {...getRootProps()}
                  border={`2px dashed ${main}`}
                  p="1rem"
                  borderRadius="5px"
                  sx={{ "&:hover": { cursor: "pointer" } }}
                  width="100%"
                >
                  <input {...getInputProps()} />
                  {!image ? (
                    <p>Add a picture</p>
                  ) : (
                    <FlexBetween>
                      <Typography>{image.name}</Typography>
                      <EditOutlined />
                    </FlexBetween>
                  )}
                </Box>
                {image && (
                  <IconButton onClick={() => setImage(null)} color="error">
                    <DeleteOutlined />
                  </IconButton>
                )}
              </FlexBetween>
            )}
          </Dropzone>
        </Box>
      )}

      <Divider sx={{ marginBlock: "1.25rem" }} />

      <FlexBetween>
        <FlexBetween gap=".25rem" onClick={() => setIsOpenImg((s) => !s)}>
          <ImageOutlined sx={{ color: mediumMain }} />
          <Typography
            color={mediumMain}
            sx={{ "&:hover": { cursor: "pointer", color: medium } }}
          >
            Image
          </Typography>
        </FlexBetween>

        {isNotMobile ? (
          <>
            {icons.map(({ icon, title }) => (
              <FlexBetween gap=".25rem" key={title}>
                {icon}
                <Typography color={mediumMain}>{title}</Typography>
              </FlexBetween>
            ))}
          </>
        ) : (
          <FlexBetween gap="0.25rem">
            <MoreHorizOutlined sx={{ color: mediumMain }} />
          </FlexBetween>
        )}

        <Button
          disabled={!post}
          onClick={handleAddPost}
          sx={{
            color: alt,
            backgroundColor: main,
            borderRadius: "3rem",
            "&:hover": {
              backgroundColor: main,
              opacity: 0.5,
            },
          }}
        >
          POST
        </Button>
      </FlexBetween>
    </WidgetWrapper>
  );
}

export default memo(ShareWidget);

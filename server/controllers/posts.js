// CREATE POST
import User from "../models/User.js";
import Post from "../models/Post.js";

export const createPost = async (req, res) => {
  const { body } = req;

  try {
    const { userId, description, picturePath } = body;
    const user = await User.findById(userId);
    const newPost = await Post.create({
      userId,
      description,
      picturePath,
      userPicturePath: user.picturePath,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      likes: {},
      comments: [],
    });

    const posts = await Post.find();

    res.status(201).json(posts);
  } catch (e) {
    res.status(409).json({ error: e.message });
  }
};

// READ ALL POSTS
export const getFeedPosts = async (req, res) => {
  try {
    const posts = await Post.find();

    res.status(200).json(posts);
  } catch (e) {
    res.status(404).json({ error: e.message });
  }
};

export const getUserPosts = async (req, res) => {
  const { params } = req;

  try {
    const { user } = params;
    const posts = await Post.find({ userId: user });

    res.status(200).json(posts);
  } catch (e) {
    res.status(404).json({ error: e.message });
  }
};

// UPDATE POST LIKES
export const likePost = async (req, res) => {
  const { params, body } = req;

  try {
    const { id } = params;
    const { userId } = body;
    const posts = await Post.findById(id);
    const isLiked = posts.likes.get(userId);

    if (isLiked) {
      posts.likes.delete(userId);
    } else {
      posts.likes.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: posts.likes },
      { new: true },
    );

    res.status(200).json(updatedPost);
  } catch (e) {
    res.status(404).json({ error: e.message });
  }
};

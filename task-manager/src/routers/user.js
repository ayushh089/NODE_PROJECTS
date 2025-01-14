const express = require("express");
const User = require("../models/user");
const auth = require("../middleware/auth");
const router = new express.Router();
const multer = require("multer");
const sharp = require("sharp");
//signup ->data added to db
router.post("/users", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

//login route
router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();

    res.send({ user, token });
  } catch (e) {
    res.status(400).send();
  }
});
router.get("/users/me", auth, async (req, res) => {
  res.send(req.user);
});

router.patch("/users/me", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  try {
    updates.forEach((updates) => {
      req.user[updates] = req.body[updates];
    });
    await req.user.save();

    res.send(req.user);
  } catch (e) {
    res.status(400).send(e);
  }
});
// router.patch("/users/:id", async (req, res) => {
//   const updates = Object.keys(req.body);
//   try {
//     const _id = await req.params.id;
//     const user = await User.findById(_id);
//     updates.forEach((updates) => {
//       user[updates] = req.body[updates];
//     });
//     await user.save();
//     if (!user) {
//       return res.status(404).send();
//     }
//     res.send(user);
//   } catch (e) {
//     res.status(400).send(e);
//   }
// });
//delete
router.delete("/users/me", auth, async (req, res) => {
  try {
    await req.user.deleteOne();
    res.send(req.user);
  } catch (e) {
    res.status(500).send(e.message);
  }
});
router.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();
    res.sendStatus(200);
  } catch (e) {
    res.status(500).send();
  }
});
router.post("/users/logutAll", auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.sendStatus(200);
  } catch (e) {
    res.sendStatus(500).send();
  }
});
const upload = multer({
  // dest: "avatars",
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      cb(new Error("file must be a image"));
    }
    cb(undefined, true);
    // cb(new Error("file must be a pdf"));
    // cb(undefined, true);
    // cb(undefined, false);
  },
});
router.post(
  "/users/me/avatar",
  auth,
  upload.single("avatar"),
  async (req, res) => {
    const buffer = await sharp(req.file.buffer)
      .resize({ width: 250, height: 250 })
      .png()
      .toBuffer();
    req.user.avatar = buffer;
    await req.user.save();
    res.send(200);
  },
  (error, req, res, next) => {
    res.sendStatus(400).send({ error: error.message });
  }
);
router.delete("/users/me/avatar", auth, async (req, res) => {
  req.user.avatar = undefined;
  await req.user.save();
  res.sendStatus(200);
});

router.get("/users/:id/avatar", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user || !user.avatar) {
      throw new Error();
    }
    res.set("Content-Type", "image/png");
    res.send(user.avatar);
  } catch (e) {}
});
module.exports = router;

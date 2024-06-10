"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const userController_1 = require("./controllers/userController");
const authControllers_1 = require("./controllers/authControllers");
const auth_1 = require("./middlewares/auth");
const isSuperAdmin_1 = require("./middlewares/isSuperAdmin");
const postControllers_1 = require("./controllers/postControllers");
const latestControllers_1 = require("./controllers/latestControllers");
const commentControllers_1 = require("./controllers/commentControllers");
const likeControllers_1 = require("./controllers/likeControllers");
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json());
exports.app.use((0, cors_1.default)());
exports.app.get('/healthy', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Server is healthy'
    });
});
// auth routes
exports.app.post('/api/auth/register', authControllers_1.registerUser);
exports.app.post('/api/auth/login', authControllers_1.login);
// user routes
exports.app.get('/api/users', auth_1.auth, isSuperAdmin_1.isSuperAdmin, userController_1.getAllUsers);
exports.app.get('/api/users/profile', auth_1.auth, userController_1.getMyProfile);
exports.app.put('/api/users/profile', auth_1.auth, userController_1.updateProfile);
exports.app.delete('/api/users', auth_1.auth, userController_1.deleteAccount);
exports.app.delete('/api/users/:id', auth_1.auth, isSuperAdmin_1.isSuperAdmin, userController_1.deleteUser);
// post routes
exports.app.get('/api/posts', auth_1.auth, postControllers_1.getMyPosts);
exports.app.get('/api/posts/:topic', auth_1.auth, postControllers_1.getGenrePosts);
exports.app.post('/api/posts', auth_1.auth, postControllers_1.createPost);
exports.app.put('/api/posts/:id', auth_1.auth, postControllers_1.updatePostTopic);
exports.app.put('/api/posts/own/:id', auth_1.auth, postControllers_1.updateMyPost);
exports.app.delete('/api/posts/:id', auth_1.auth, isSuperAdmin_1.isSuperAdmin, postControllers_1.deleteOtherUserPost);
exports.app.delete('/api/posts/own/:id', auth_1.auth, postControllers_1.deleteMyPost);
// Latests routes
exports.app.get('/api/latests', latestControllers_1.getLatests);
exports.app.post('/api/latests', auth_1.auth, isSuperAdmin_1.isSuperAdmin, latestControllers_1.createLatest);
exports.app.put('/api/latests/:id', auth_1.auth, latestControllers_1.updateLatest);
exports.app.delete('/api/latests/:id', auth_1.auth, latestControllers_1.deleteLatest);
// Comments routes
exports.app.get('/api/comments/:id', auth_1.auth, commentControllers_1.getPostComments);
exports.app.post('/api/comments/:id', auth_1.auth, commentControllers_1.createComment);
exports.app.delete('/api/comments/:id', auth_1.auth, commentControllers_1.deleteOthersComment);
exports.app.delete('/api/comments/own/:id', auth_1.auth, commentControllers_1.deleteMyComment);
// Likes endpoint
exports.app.post('/api/likes/:id', auth_1.auth, likeControllers_1.sendOrRemoveLike);
exports.app.get('/api/likes/posts/:id', auth_1.auth, likeControllers_1.getPostLikes);
exports.app.get('/api/likes/users', auth_1.auth, likeControllers_1.getUserLikes);

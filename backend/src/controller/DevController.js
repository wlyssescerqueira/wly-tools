const axios = require('axios');
const Dev = require('../model/Dev');
const Post = require('../database/sql/app/models');

const sequelize = require('sequelize');

module.exports = {
    async List(req, res){

    const lista = await Dev.find().sort('-createdAt');

    return res.json(lista);

    },

    async sqlList(req, res){

        const lista = await Post.devs.findAll();

        return res.json(lista);
    },

    async index(req, res){

        const { user } = req.headers;

        const loggedDev = await Dev.findById(user);

        const users = await Dev.find({
            $and: [
                { _id: { $ne: user} },
                { _id: { $nin: loggedDev.likes } },
                { _id: { $nin: loggedDev.dislikes } },
            ],
        });

        return res.json(users);
    },

    async sqlindex(req, res){

        const { user } = req.headers;

        const users = await Post.devs.findAll({
            where: {
                _id: {
                        [sequelize.Op.notIn]: sequelize.literal('( SELECT id_dev FROM likes b WHERE id_dev = devs._id AND b.[like_] = 1 )'),
                        [sequelize.Op.ne]: user
                    },
            }
        })
        //console.log(users);
        return res.json(users);
    },

    async store(req, res) {

        const { username } = req.body;

        const userExists = await Dev.findOne({user: username});

        if (userExists){
            return res.json(userExists);
        }

        const response = await axios.get(`https://api.github.com/users/${username}`);

        const { name, bio, avatar_url: avatar, login } = response.data;

        const dev = await Dev.create({
            name: login,
            user: username,
            bio: bio,
            avatar: avatar
        });

        return res.json(dev);
    },

    async sqlstore(req, res) {

        const { username } = req.body;

        const userExists = await Post.devs.findAll({
            where: {
                user: username
            }});

        if (userExists.length > 0){
            return res.json(userExists[0]);
        }

        const response = await axios.get(`https://api.github.com/users/${username}`);

        const { name, bio, avatar_url: avatar, login } = response.data;

        const dev = await Post.devs.create({
            name: login,
            user: username,
            bio: bio,
            avatar: avatar
        });

        return res.json(dev);
    },
};
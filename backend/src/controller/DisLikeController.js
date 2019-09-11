const Dev = require('../model/Dev');
const Post = require('../database/sql/app/models');

const Op = require('sequelize').Op;

module.exports = {
    async store(req, res){

        const { user } = req.headers;
        const { devId } = req.params;

        const loggedDev = await Dev.findById(user);
        const targetDev = await Dev.findById(devId);

        if (!loggedDev) {
            return res.status(400).json({erro: "User not exists"})
        }

        if (!targetDev) {
            return res.status(400).json({erro: "User not exists"})
        }

        loggedDev.dislikes.push(targetDev._id);

        await loggedDev.save();

        return res.json(loggedDev);
    },

    async sqlstore(req, res){

        const { user } = req.headers; // loggedDev
        const { devId } = req.params; // targetDev

        const ret = await Post.devs.update({
            like_: 0
        },
            {
            where: {
                id_dev : user,
                id_devlike: devId
            }
        });

        const loggedDev = await Post.devs.findAll({
            where: {
                _id: user
            }
        });

        return res.json(loggedDev[0]);
    }
};
const Dev = require('../model/Dev');
const Post = require('../database/sql/app/models');

module.exports = {
    async store(req, res){

        const { user } = req.headers;
        const { devId } = req.params;

        const loggedDev = await Dev.findById(user);
        const targetDev = await Dev.findById(devId);

        if (!targetDev) {
            return res.status(400).json({erro: "User not exists"})
        }

        if (targetDev.likes.includes(loggedDev._id)){
            const loggedSocket = req.connectedUsers[user];
            const targetSocket = req.connectedUsers[devId];

            if(loggedSocket){
                req.io.to(loggedSocket).emit('match', targetDev);
            }


            if(targetSocket){
                req.io.to(targetSocket).emit('match', loggedDev);
            }
        }

        loggedDev.likes.push(targetDev._id);

        await loggedDev.save();

        return res.json(loggedDev);
    },

    async sqlstore(req, res){

        const { user } = req.headers; // loggedDev
        const { devId } = req.params; // targetDev

        const ret = await Post.devs.update({
            like_: 1
        },
            {
            where: {
                id_dev : user,
                id_devlike: devId
            }
        });

        if(!ret[0]){
            const dev = await Post.likes.create({
                id_dev: user,
                id_devlike: devId,
                like_: 1
            });
        }

        const targetDev = await Post.likes.findAll({
            where: {
                id_dev: devId,
                id_devlike: user,
                like_: 1
            }
        });

        const loggedDev = await Post.devs.findAll({
            where: {
                _id: user
            }
        });

        if(targetDev[0]){

            const targetDev = await Post.devs.findAll({
                where: {
                    _id: devId
                }
            });

            const loggedSocket = req.connectedUsers[user];
            const targetSocket = req.connectedUsers[devId];

            if(loggedSocket){
                req.io.to(loggedSocket).emit('match', targetDev[0]);
                console.log('deu match');
            }

            if(targetSocket){
                req.io.to(targetSocket).emit('match', loggedDev[0]);
                console.log('deu match');
            }
        }
        return res.json(loggedDev[0]);
    }
};
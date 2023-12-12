const db = require("../../database/models");
const { use } = require("../apiRoutes/apiProductRoutes");

const apiControllersUser = {
    list: (req, res) => {
        db.User.findAll({
            attributes: [
                "first_name",
                "last_name",
                "email",
            ]
        })
            .then(users => {
                let resultado = {
                    meta: {
                        status: 200,
                        total: users.length,
                        url: "api/users"
                    },
                    data: users
                }
                res.json(resultado);
            })
    },
    detail: (req, res) => {
        db.User.findByPk(req.params.id)
            .then(user => {
                let resultado = {
                    meta: {
                        status: 200,
                        total: user.length,
                        url: "api/users/:id"
                    },
                    data: user
                }
                res.json(resultado);
            })
    }
}

module.exports = apiControllersUser;
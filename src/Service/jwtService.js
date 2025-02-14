import db from "../models"

const getGroupWithRole = async (user) => {
    //scope

    let role = await db.Group.findOne({
        where: { id: user.groupId },
        attributes: ["id", "name", "description"],
        include: {
            model: db.Role,
            attributes: ["id", "url", "description"],
            through: { attributes: [] }
        }

    })

    return role;
}
const createJwt = (payload) => {

}
module.exports = {
    getGroupWithRole
}
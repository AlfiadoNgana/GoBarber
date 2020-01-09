const { Appoitment, User } = require('../models')
const { Op } = require('sequelize')
const moment = require('moment')

class ScheduleController {
  async index(req, res) {
    const appoitments = await Appoitment.findAll({
      include: [{ model: User }],
      where: {
        provider_id: req.session.user.id,
        date: {
          [Op.between]: [
            moment()
              .startOf('day')
              .format(),
            moment()
              .endOf('day')
              .format(),
          ],
        },
      },
    })
    console.log(appoitments)
    return res.render('schedule/index', { appoitments })
  }
}

module.exports = new ScheduleController()

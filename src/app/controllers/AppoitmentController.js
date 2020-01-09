const { User } = require('../models')

class AppoitmentController {
  async create(req, res) {
    const provider = await User.findByPk(req.params.provider)
    return res.render('appoitment/create', { provider })
  }
}

module.exports = new AppoitmentController()

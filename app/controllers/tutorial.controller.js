const axios = require('axios');
const db = require("../models");
const Tutorial = db.tutorials;

exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

  Tutorial.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.marketId;
  axios.get(`http://194.195.119.155:7000/match-data/${id}?token=ancffvtgbhnjm345yhdfdhhdhhdhjjskk`)
  .then(response => {
    const datas = JSON.parse(response.data.result[id].diamond).data.t3;
    let sampleData = [];
    datas.filter(function (itm) {
        let {mid, sid, nat} = itm;
        sampleData.push({mid: mid, sid: sid, nat: nat})
    });
    res.send(sampleData);
  })
  .catch(error => console.log(error))
};

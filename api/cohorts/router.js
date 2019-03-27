const router = require("express").Router()

const db = require("../../data/dbConfig")

router.get("/", (_req, res) => {
  db("cohorts")
    .catch(err => {
      res.status(500).json(err)
    })
    .then(cohorts => {
      res.status(200).json(cohorts)
    })
})

router.get("/:id", (_req, res) => {
  const { id } = req.params
  db("cohorts")
    .where({ id })
    .catch(err => {
      res.status(404).json(err)
    })
    .then(([cohort]) => {
      res.status(200).json(cohort)
    })
})

router.post("/", (req, res) => {
  const { name } = req.body
  name == null
    ? res.status(400).json({
        message: "Please include a name."
      })
    : db("cohorts")
        .insert({ name })
        .catch(_err => {
          res.status(500).json({
            message: "Error inserting cohort."
          })
        })
        .then(([id]) => {
          db("cohorts")
            .where({ id })
            .catch(_err => {
              res.status(500).json({
                message: "Error retrieving inserted cohort."
              })
            })
            .then(([cohort]) => {
              res.status(200).json(cohort)
            })
        })
})

router.put("/:id", (req, res) => {
  const { id } = req.params
  const { name } = req.body
  name == null
    ? res.status(400).json({
        message: "Please include a name."
      })
    : db("cohorts")
        .where({ id })
        .update({ name })
        .catch(_err => {
          res.status(500).json({
            message: "Error updating cohort."
          })
        })
        .then(num => {
          num == 0
            ? res.status(404).json({
                message: "Invalid ID."
              })
            : db("cohorts")
                .where({ id })
                .catch(_err => {
                  res.status(500).json({
                    message: "Error retrieving inserted cohort."
                  })
                })
                .then(([cohort]) => {
                  res.status(200).json(cohort)
                })
        })
})

router.delete("/:id", (req, res) => {
  const { id } = req.params
  db("cohorts")
    .where({ id })
    .del()
    .catch(_err => {
      res.status(500).json({
        message: "Error deleting cohort."
      })
    })
    .then(num => {
      num == 0
        ? res.status(404).json({
            message: "Invalid ID."
          })
        : res.status(200).json({
            message: "Zoo was deleted"
          })
    })
})

module.exports = router

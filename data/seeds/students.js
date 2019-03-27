exports.seed = function(knex) {
  return knex("students")
    .del()
    .then(function() {
      return knex("students").insert([
        {
          cohort_id: 1,
          name: "John Doe"
        },
        {
          cohort_id: 1,
          name: "Jane Doe"
        }
      ])
    })
}

exports.up = function(knex) {
  return knex.schema.createTable("students", function(tbl) {
    tbl.increments()
    tbl.string("name", 255).notNullable()
    tbl
      .integer("cohort_id")
      .notNullable()
      .references("id")
      .inTable("cohorts")
      .onDelete("CASCADE")
  })
}

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("students")
}

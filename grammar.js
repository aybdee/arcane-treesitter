module.exports = grammar({
  name: "arcane",

  extras: ($) => [/\s/, $.comment],

  rules: {
    // Program structure
    program: ($) => repeat($.statement),

    statement: ($) =>
      choice($.definition, $.animate_declaration, $.axis_declaration),

    // Definition statement
    definition: ($) =>
      seq(
        "Define",
        $.identifier,
        "as",
        choice($.expression, seq($.expression, $.math_transform)),
      ),

    // Expressions
    expression: ($) => choice($.math_function, $.algebraic_expression),

    // Animation
    animate_declaration: ($) =>
      seq(
        "@",
        choice(
          $.identifier,
          seq(
            choice($.identifier, $.math_function),
            optional($.math_transform),
          ),
        ),
        optional(seq("and", choice($.sweep_dot, $.sweep_rectangle_dot))),
      ),

    sweep_dot: ($) => "sweep dot across",
    sweep_rectangle_dot: ($) => "sweep rectangle dot across",

    sweep: ($) =>
      seq("from", $.numerical_expression, "to", $.numerical_expression),

    assign: ($) => seq($.identifier, "=", $.numerical_expression),

    math_transform: ($) => seq($.sweep),

    // Axis declaration
    axis_declaration: ($) =>
      seq("on", "axis", $.identifier, "{", repeat($.animate_declaration), "}"),

    // Math functions
    math_function: ($) =>
      choice($.regular_math_function, $.parametric_math_function),

    regular_math_function: ($) =>
      seq(
        "f",
        "(",
        $.identifier,
        repeat(seq(",", $.identifier)),
        ")",
        "=",
        $.algebraic_expression,
      ),

    parametric_math_function: ($) =>
      seq(
        "parametric",
        "(",
        $.identifier,
        repeat(seq(",", $.identifier)),
        ")",
        "=",
        "(",
        $.algebraic_expression,
        repeat(seq(",", $.algebraic_expression)),
        ")",
      ),

    trigonometric_function: ($) =>
      seq(choice("sin", "cos", "tan"), "(", $.algebraic_expression, ")"),

    // Algebraic expressions
    algebraic_expression: ($) =>
      seq($.algebraic_term, repeat(seq(choice("+", "-"), $.algebraic_term))),

    algebraic_term: ($) =>
      seq(
        $.algebraic_factor,
        repeat(seq(choice("*", "/", "mod"), $.algebraic_factor)),
      ),

    algebraic_factor: ($) =>
      seq($.algebraic_base, repeat(seq("^", $.algebraic_base))),

    algebraic_base: ($) =>
      seq(
        optional("-"),
        choice(
          $.number,
          $.identifier,
          seq($.number, $.identifier),
          seq("(", $.algebraic_expression, ")"),
          $.trigonometric_function,
          $.constant,
        ),
      ),

    // Numerical expressions
    numerical_expression: ($) =>
      seq($.numerical_term, repeat(seq(choice("+", "-"), $.numerical_term))),

    numerical_term: ($) =>
      seq(
        $.numerical_factor,
        repeat(seq(choice("*", "/", "mod"), $.numerical_factor)),
      ),

    numerical_factor: ($) =>
      seq($.numerical_base, repeat(seq("^", $.numerical_base))),

    numerical_base: ($) =>
      choice($.number, seq("(", $.numerical_expression, ")"), $.constant),

    // Constants and terminals
    constant: ($) => choice("PI", "e"),
    number: ($) => /[0-9]+(\.[0-9]+)?/,
    identifier: ($) => /[a-zA-Z_][a-zA-Z0-9_]*/,
    comment: ($) => token(seq("#", /.*/)),
  },
});

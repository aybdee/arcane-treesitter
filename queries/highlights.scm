; Keywords
[
  "Define"
  "as"
  "on"
  "axis"
  "parametric"
  "sweep"
  "dot"
  "across"
  "rectangle"
  "from"
  "to"
  "and"
] @keyword

; Operators
[
  "+"
  "-"
  "*"
  "/"
  "^"
  "="
  "mod"
] @operator

; Functions
"f" @keyword.function
[
  "sin"
  "cos"
  "tan"
] @function.builtin

; Math symbols and constants
[
  "PI"
  "e"
] @constant.builtin

; Punctuation
[
  "("
  ")"
  "{"
  "}"
  ","
  "@"
] @punctuation.delimiter

; Identifiers
(identifier) @variable

; Numbers
(number) @number

; Comments
(comment) @comment

; Special highlighting for function definitions
(regular_math_function
  (identifier) @function)

(parametric_math_function
  (identifier) @function)

; Math expressions
(algebraic_expression) @expression
(numerical_expression) @expression

; Animation declarations get special highlighting
(animate_declaration
  "@" @operator.special)

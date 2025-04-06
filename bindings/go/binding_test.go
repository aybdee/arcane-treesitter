package tree_sitter_arcane_test

import (
	"testing"

	tree_sitter "github.com/tree-sitter/go-tree-sitter"
	tree_sitter_arcane "github.com/arcane/bindings/go"
)

func TestCanLoadGrammar(t *testing.T) {
	language := tree_sitter.NewLanguage(tree_sitter_arcane.Language())
	if language == nil {
		t.Errorf("Error loading Arcane grammar")
	}
}

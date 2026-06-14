### {{ .Get "title" | default (T "header_ontology_validation" ) }} {.ontology-validation}
{{ printf "\n" }}
{{- .Inner }}
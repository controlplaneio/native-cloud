{{- $key := .Page.Params.ontology.key | default "" -}}
{{- $title := .Get "title" | default (T "header_ontology_validation" ) -}}
{{- $id := cond (ne $key "") (printf "%s-value-validation" ($key | urlize)) "value-validation" -}}
<h3 id="{{ $id }}" class="ontology-validation">{{ $title }}</h3>
{{ printf "\n" }}
{{- .Inner }}

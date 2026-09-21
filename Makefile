SHELL := /bin/bash
.DEFAULT_GOAL := help
export ASTRO_TELEMETRY_DISABLED := 1
export TMPDIR := $(shell pwd)/.tmp
export BUN_TMPDIR := $(shell pwd)/.tmp

.PHONY: help install dev build preview check validate test test-routes test-acceptance test-e2e test-e2e-ui test-all migrate clean clean-all

# ─── Meta ─────────────────────────────────────────────────────────────────────

## help: Show this list of targets (default)
help:
	@echo "native.cloud (Astro + Starlight Galaxy) make targets:"
	@grep -E '^## [a-zA-Z0-9_-]+:' $(MAKEFILE_LIST) | sed 's/^## //' \
	  | awk -F': ' '{printf "  \033[36m%-20s\033[0m %s\n", $$1, $$2}'

# ─── Dependencies ─────────────────────────────────────────────────────────────

## install: Install project dependencies
install:
	@mkdir -p .tmp
	@bun install

# ─── Development & Build ──────────────────────────────────────────────────────

## dev: Start local Astro development server
dev:
	@mkdir -p .tmp
	@bun run dev

## build: Build production static site to dist/
build:
	@mkdir -p .tmp
	@bun run build

## preview: Preview the built production site locally
preview:
	@mkdir -p .tmp
	@bun run preview

## migrate: Re-run content migration from site/ and ontology/
migrate:
	@mkdir -p .tmp
	@bun run scripts/migrate-content.mjs

## check: Type-check Astro templates and TypeScript
check:
	@mkdir -p .tmp
	@bun run check

## validate: Validate ontology data integrity, paths, and constraints
validate:
	@mkdir -p .tmp
	@bun run validate

## test: Run static route crawler and acceptance tests against build
test: build test-routes test-acceptance

## test-routes: Run fast static route and content crawler test
test-routes:
	@mkdir -p .tmp
	@bun run test

## test-acceptance: Run DOM and acceptance specification tests
test-acceptance:
	@mkdir -p .tmp
	@node --test tests/acceptance/adversarial-validation.test.mjs tests/acceptance/acceptance.test.mjs

## test-e2e: Run Playwright browser acceptance tests against preview server
test-e2e:
	@mkdir -p .tmp
	@bun run test:e2e

## test-e2e-ui: Open interactive Playwright Test UI
test-e2e-ui:
	@mkdir -p .tmp
	@bun run test:e2e:ui

## test-all: Run check, validation, route tests, acceptance tests, and e2e
test-all: check validate build test-routes test-acceptance test-e2e

# ─── Cleanup ──────────────────────────────────────────────────────────────────

## clean: Remove build output, test reports, and cache directories
clean:
	@rm -rf dist/ .astro/ /tmp/hugo_cache .hugo_build.lock playwright-report/ test-results/ .tmp/
	@echo "Cleaned build artifacts: dist/, .astro/, playwright-report/, .tmp/"

## clean-all: Remove build artifacts and node_modules
clean-all: clean
	@rm -rf node_modules package-lock.json bun.lock
	@echo "Cleaned node_modules and lockfile"

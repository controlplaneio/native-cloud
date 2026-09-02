SHELL := /bin/bash
.DEFAULT_GOAL := help
export ASTRO_TELEMETRY_DISABLED := 1
export PLAYWRIGHT_BROWSERS_PATH := /tmp/ms-playwright

.PHONY: help install dev build preview check test test-routes test-acceptance test-e2e test-e2e-ui test-all migrate clean clean-all

# ─── Meta ─────────────────────────────────────────────────────────────────────

## help: Show this list of targets (default)
help:
	@echo "native.cloud (Astro + Starlight Galaxy) — make targets:"
	@grep -E '^## [a-zA-Z0-9_-]+:' $(MAKEFILE_LIST) | sed 's/^## //' \
	  | awk -F': ' '{printf "  \033[36m%-20s\033[0m %s\n", $$1, $$2}'

# ─── Dependencies ─────────────────────────────────────────────────────────────

## install: Install project dependencies
install:
	@npm install --cache /tmp/npm_cache

# ─── Development & Build ──────────────────────────────────────────────────────

## dev: Start local Astro development server
dev:
	@npm run dev

## build: Build production static site to dist/
build:
	@npm run build

## preview: Preview the built production site locally
preview:
	@npm run preview

## migrate: Re-run content migration from site/ and ontology/
migrate:
	@node scripts/migrate-content.mjs

## check: Type-check Astro templates and TypeScript
check:
	@npm run check

## validate: Validate ontology data integrity, paths, and constraints
validate:
	@npm run validate

## test: Run static route crawler and acceptance tests against build
test: build test-routes test-acceptance

## test-routes: Run fast static route and content crawler test
test-routes:
	@npm run test

## test-acceptance: Run DOM and acceptance specification tests
test-acceptance:
	@node --test tests/acceptance/validation.test.mjs tests/acceptance/acceptance.test.mjs

## test-e2e: Run Playwright browser acceptance tests against preview server
test-e2e:
	@npm run test:e2e

## test-e2e-ui: Open interactive Playwright Test UI
test-e2e-ui:
	@npm run test:e2e:ui

## test-all: Run check, validation, route tests, acceptance tests, and e2e
test-all: check validate build test-routes test-acceptance test-e2e

# ─── Cleanup ──────────────────────────────────────────────────────────────────

## clean: Remove build output, test reports, and cache directories
clean:
	@rm -rf dist/ .astro/ /tmp/hugo_cache .hugo_build.lock playwright-report/ test-results/
	@echo "Cleaned build artifacts: dist/, .astro/, playwright-report/"

## clean-all: Remove build artifacts and node_modules
clean-all: clean
	@rm -rf node_modules package-lock.json
	@echo "Cleaned node_modules and lockfile"

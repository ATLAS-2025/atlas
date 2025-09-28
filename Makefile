# ------------------------------
# Atlas Desktop Build Pipeline
# ------------------------------

.PHONY: build-backend
build-backend: ## Build FastAPI backend into single binary
	cd backend && \
	poetry install && \
	poetry run alembic upgrade head && \
	poetry run python migrations/seed.py && \
	poetry run pyinstaller main.py --onefile --name backend \
		--distpath ../src-tauri/bin \
		--hidden-import=aiosqlite \
		--hidden-import=passlib.handlers.bcrypt \
		--add-data "db.sqlite;."
	
	# Ensure db.sqlite is in bin folder
	cp backend/db.sqlite ../src-tauri/bin/db.sqlite || true

.PHONY: build-frontend
build-frontend: ## Build Next.js frontend static export
	cd frontend && \
	pnpm install && \
	pnpm next build && \
	pnpm next export

	# Copy exported frontend to Tauri folder
	rm -rf src-tauri/frontend-out
	cp -r frontend/out src-tauri/frontend-out

.PHONY: build-tauri
build-tauri: build-backend build-frontend ## Build full Tauri installer
	cd src-tauri && cargo tauri build

.PHONY: build-all
build-all: build-tauri ## Full pipeline: backend + frontend + installer
	@echo "✅ Build complete! Installer is in src-tauri/target/release/bundle/"

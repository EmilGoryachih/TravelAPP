#!make

.PHONY: run
run:
	@cd .. && uvicorn MainModule.main:app --reload --port 5000

.PHONY: init-alembic
init-alembic:
	@alembic init alembic && cd ..

.PHONY: migration-create
migration-create:
	@cd src && alembic revision --autogenerate -m "$(name)" && cd ..

.PHONY: migration-up
migration-up:
	@cd src && alembic upgrade head && cd ..

.PHONY: migration-down
migration-down:
	@cd src && alembic downgrade -1 && cd ..

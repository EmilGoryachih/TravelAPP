#!make

.PHONY: run
run:
	@cd /code && uvicorn main:app --reload --host 0.0.0.0 --port 80

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

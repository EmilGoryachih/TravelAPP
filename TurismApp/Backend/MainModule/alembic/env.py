import asyncio
from logging.config import fileConfig
from sqlalchemy.ext.asyncio import create_async_engine
from sqlalchemy.ext.declarative import declarative_base
from alembic import context

from dbModels import User  # импортируйте модель User



# Определите базу для использования в Alembic
Base = declarative_base()

# Чтение конфигурации
config = context.config

# Если есть конфигурационный файл, читаем его
if config.config_file_name is not None:
    fileConfig(config.config_file_name)

target_metadata = User.Base.metadata  # или какой бы метаданные вы не использовали

# Функция для запуска миграций в асинхронном режиме
async def run_migrations_online():
    connectable = create_async_engine(config.get_main_option("sqlalchemy.url"), future=True)

    async with connectable.connect() as connection:
        await connection.run_sync(Base.metadata.create_all)

# Функция для выполнения миграций
def run_migrations():
    loop = asyncio.get_event_loop()
    loop.run_until_complete(run_migrations_online())

if context.is_offline_mode():
    raise RuntimeError("Offline mode is not supported for asynchronous migrations")
else:
    run_migrations()

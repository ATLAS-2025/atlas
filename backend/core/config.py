from pydantic import BaseSettings, RedisDsn
from dotenv import load_dotenv
import os

# Load environment variables from .env
load_dotenv()
print(os.getenv("DATABASE_URL"))

class EnvironmentType:
    DEVELOPMENT = "development"
    PRODUCTION = "production"


class Config(BaseSettings):
    DEBUG: int = 0
    DEFAULT_LOCALE: str = "en_US"
    ENVIRONMENT: str = EnvironmentType.PRODUCTION

    # DATABASE_URL from env, fallback to sqlite
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///app.db")

    REDIS_URL: RedisDsn = os.getenv("REDIS_URL", "redis://localhost:6379/7")
    RELEASE_VERSION: str = "0.1"
    SHOW_SQL_ALCHEMY_QUERIES: int = 0
    SECRET_KEY: str = os.getenv("SECRET_KEY", "super-secret-key")
    JWT_ALGORITHM: str = "HS256"
    JWT_EXPIRE_MINUTES: int = 60 * 24
    CELERY_BROKER_URL: str = os.getenv(
        "CELERY_BROKER_URL", "amqp://rabbit:password@localhost:5672"
    )
    CELERY_BACKEND_URL: str = os.getenv(
        "CELERY_BACKEND_URL", "redis://localhost:6379/0"
    )

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"


config: Config = Config()

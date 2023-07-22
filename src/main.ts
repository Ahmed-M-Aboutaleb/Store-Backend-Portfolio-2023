import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';

const PORT = parseInt(process.env.SERVER_PORT);
const VERSION = 'v1';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.use(helmet());
    app.enableCors();
    app.useGlobalPipes(new ValidationPipe());
    app.setGlobalPrefix(VERSION);
    await app.listen(PORT);
    Logger.log(
        `🚀 Server running on ${PORT} Port and ${VERSION} version`,
        'Bootstrap',
    );
}
bootstrap();

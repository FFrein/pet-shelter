# pet-shelter-server

# После запуска в контейнере сервера

docker exec -it pet-shelter-server sh
npx prisma generate
npx prisma migrate deploy

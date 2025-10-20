
up:
	docker-compose up --build

down:
	docker-compose down

migrate:
	docker-compose exec web python manage.py migrate

test:
	docker-compose exec web pytest

seed:
	docker-compose exec web python manage.py seed_data

shell:
	docker-compose exec web python manage.py shell
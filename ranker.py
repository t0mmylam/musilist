def showAlbumRankings(cursor):
   cursor.execute("SELECT name, rating FROM albums ORDER BY rating DESC")
   albums = cursor.fetchall()
   print('ALBUM LIST')
   for i, album in enumerate(albums, 1):
      print(f'{i}. {album[0]}: {album[1]}')

try:
   import psycopg2
   from psycopg2 import Error

   connection = psycopg2.connect(
      database="musirank", user='tommylam', password='', host='localhost', port= '5432'
   )
   cursor = connection.cursor()
   print("PostgreSQL server information")
   print(connection.get_dsn_parameters(), "\n")

   running = True
   while running:
      print("--------Music Ranker--------")
      print('''0. Exit
1. View Rankings'''
            )
      user = int(input("Input: "))
      match user:
         case 0:
               running = False
         case 1:
               showAlbumRankings(cursor)
         case other:
               running = False
except (Exception, Error) as error:
   print("Error while connecting to PostgreSQL", error)
finally:
   if (connection):
      cursor.close()
      connection.close()
      print("Connection Closed.")
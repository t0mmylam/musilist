def getCollection():
    from pymongo import MongoClient
    import pymongo

    CONNECTION_STRING = "mongodb://localhost:27017"

    from pymongo import MongoClient
    client = MongoClient(CONNECTION_STRING)
    music = client["music"]
    return music["albums"]


class Album:
    def __init__(self, nameIn, artistIn, releasedIn, ratingIn, languageIn):
        self.name = nameIn
        self.artist = artistIn
        self.released = releasedIn
        self.rating = ratingIn
        self.language = languageIn

music = getCollection()
print(music)
running = True
while running:
    print("--------Music Ranker--------")
    print('''0. Exit
1. Add Album
2. View Rankings
3. Edit Album'''
          )
    user = int(input("Input: "))
    match user:
        case 0:
            running = False
        case 1:
            name = input("Album Name: ")
            artist = input("Artist Name: ")
            released = input("Release Date: ")
            rating = input("Rating (0/10): ")
            language = input("Language: ")
            newAlbum = Album(name, artist, released, rating, language)
            music.insert_one(newAlbum.__dict__)
        case other:
            running = False
a = Album("test", "test", "test", "test", "test")

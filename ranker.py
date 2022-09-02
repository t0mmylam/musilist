def getCollection():
    from pymongo import MongoClient
    import pymongo

    CONNECTION_STRING = "mongodb://localhost:27017"

    from pymongo import MongoClient
    client = MongoClient(CONNECTION_STRING)
    music = client["music"]
    return music["albums"]

class Album:
    def __init__(self, nameIn, albumIn, releasedIn, ratingIn, languageIn):
        self.name = nameIn
        self.album = albumIn
        self.released = releasedIn
        self.rating = ratingIn
        self.language = languageIn

if __name__ == "__main__":
    music = getCollection()
    print(music)
    a = Album("test", "test", "test", "test", "test")
    music.insert_one({"test" : "test"})



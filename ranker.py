def getCollection():
    from pymongo import MongoClient

    CONNECTION_STRING = "mongodb://localhost:27017"

    from pymongo import MongoClient
    client = MongoClient(CONNECTION_STRING)
    music = client["music"]
    return music["albums"]

def csvOutput(collection):
    cursor = collection.find().sort("rating", -1).collation({"locale": "en_US", "numericOrdering": True})
    import pandas as pd
    df = pd.DataFrame(list(cursor))
    del df['_id']
    df.to_csv('ALBUMS.csv', index=False)

def showAlbumRankings(collection):
    try:
        cursor = collection.find().sort("rating", -1).collation({"locale": "en_US", "numericOrdering": True})
    except:
        print("Error Connecting to MongoDB")
    finally:
        print("\nRANKINGS")
        for document in cursor:
            print(f'{document["name"]} - {document["artist"]}: {document["rating"]}')


def addAlbum(collection):
    name = input("Album Name: ")
    artist = input("Artist Name: ")
    released = input("Release Date: ")
    rating = int(input("Rating (0/10): "))
    language = input("Language: ")
    newAlbum = Album(name, artist, released, rating, language)
    try:
        collection.insert_one(newAlbum.__dict__)
    except:
        print("Error adding album.")
    else:
        print(f"Successfully added {name}.")


def editAlbum(collection, name):
    print("Editing Album: ", name, "(Leave unchanged fields blank).")
    artist = input("Artist Name: ")
    released = input("Release Date: ")
    rating = int(input("Rating (0/10): "))
    language = input("Language: ")
    edits = {}
    if artist:
        edits["artist"] = artist
    if released:
        edits["released"] = released
    if rating:
        edits["rating"] = rating
    if language:
        edits["language"] = language
    try:
        collection.update_one({"name": name}, edits)
    except:
        print("Error editing album.")
    else:
        print(f"Successfully edited {name}.")


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
1. View Rankings
2. Add Album
3. Edit Album
4. Delete Album
5. Output To CSV'''
          )
    user = int(input("Input: "))
    match user:
        case 0:
            running = False
        case 1:
            showAlbumRankings(music)
        case 2:
            addAlbum(music)
        case 3:
            name = input("Album Name: ")
            editAlbum(music, name)
        case 4:
            name = input("Album Name: ")
            try:
                music.delete_one({"name": name})
            except:
                print("Error deleting album.")
            else:
                print(f"Successfully deleted {name}.")
        case 5:
            csvOutput(music)
        case other:
            running = False
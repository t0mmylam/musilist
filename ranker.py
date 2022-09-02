def getDatabase():
    from pymongo import MongoClient
    import pymongo

    CONNECTION_STRING = "mongodb://localhost:27017"

    from pymongo import MongoClient
    client = MongoClient(CONNECTION_STRING)

    return client["music"]

if __name__ == "__main__":
    dbname = getDatabase()
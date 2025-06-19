import json
import psycopg2

DEFAULT_IMAGE_URL = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/480px-No_image_available.svg.png"

# Connect to PostgreSQL
conn = psycopg2.connect(
    dbname="smart_recommender",
    user="postgres",
    password="Kichu2003!",
    host="localhost",
    port="5432"
)

def safe_float(value):
    try:
        return float(value)
    except (TypeError, ValueError):
        return 0.0

def safe_int(value):
    try:
        return int(value)
    except (TypeError, ValueError):
        return 0

print("Connected to DB:", conn.get_dsn_parameters()["dbname"])
cur = conn.cursor()

# Load JSON lines
with open("/Users/joshinsam/Downloads/meta_Electronics.jsonl", "r") as file:
    for line in file:
        data = json.loads(line)
        
        asin = data.get("parent_asin")
        if not asin:
            print("Skipping product with missing ASIN.")
            continue

        name = data.get("title", "")
        if not name:
            print(f"Skipping ASIN {asin} due to missing name/title.")
            continue

        if data.get("price") is None:
            print(f"Skipping product with ASIN {asin} due to missing price.")
            continue
        else:
            price = safe_float(data.get("price"))

        brand = data.get("brand", "")
        category = data.get("main_category", "")
        average_rating = safe_float(data.get("average_rating"))
        rating = safe_float(data.get("rating_number"))
        description = " ".join(data.get("description", []))

        # Handle image safely
        images = data.get("images", [])
        image_url = (
            images[0].get("thumb")
            if images and isinstance(images[0], dict) and "thumb" in images[0]
            else DEFAULT_IMAGE_URL
        )

        # Insert into the database
        cur.execute("""
            INSERT INTO products (asin, name, image_url, price, brand, description, category, rating, average_rating)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
            ON CONFLICT (asin) DO NOTHING;
        """, (asin, name, image_url, price, brand, description, category, rating, average_rating))

        print(f"Inserted product: {name} (ASIN: {asin})")

conn.commit()
cur.close()
conn.close()

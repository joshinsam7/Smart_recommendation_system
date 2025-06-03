import json
import psycopg2

DEFAULT_IMAGE_URL = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/480px-No_image_available.svg.png"

def safe_float(val):
    try:
        return float(val)
    except:
        return None

def extract_imdb_rating(features):
    if not isinstance(features, list):
        return None
    for item in features:
        if isinstance(item, str) and item.startswith("IMDb "):
            try:
                return float(item.split("IMDb ")[1])
            except:
                return None
    return None


# Connect to PostgreSQL
conn = psycopg2.connect(
    dbname="smart_recommender",
    user="postgres",
    password="Kichu2003!",
    host="localhost",
    port="5432"
)
print("Connected to DB:", conn.get_dsn_parameters()["dbname"])

cur = conn.cursor()

# Load JSON lines
with open("/Users/joshinsam/Downloads/meta_Movies_and_TV.jsonl", "r") as f:
    lines = f.readlines()
    product_meta = [json.loads(line.strip()) for line in lines] 

for i, p in enumerate(product_meta): 
    try:
        images = p.get('images')
        features = p.get('features')

        has_valid_image = (
            isinstance(images, list) and
            any(isinstance(img, dict) and any(k in img for k in ['360w', '480w', '720w','1080w','1440w']) for img in images)
        )

        if not p.get('title') or not has_valid_image or not p.get('average_rating'):
            print(f"Skipping row {i}: missing required fields")
            continue

        # ✅ Set image_url from best available resolution
        image_url = DEFAULT_IMAGE_URL
        if has_valid_image:
            for k in ['720w', '1080w', '1440w', '480w', '360w']:
                for img in images:
                    if isinstance(img, dict) and img.get(k):
                        image_url = img[k]
                        break
                if image_url != DEFAULT_IMAGE_URL:
                    break

        cur.execute("""
            INSERT INTO products (id, name, category, price, asin, image_url, rating, imdb_rating) 
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
        """, (
            i + 1,
            p.get('title'),
            p.get('main_category'),
            safe_float(p.get('price')),
            p.get('parent_asin'),
            image_url,
            safe_float(p.get('average_rating')),
            extract_imdb_rating(features)
        ))

    except Exception as e:
        print(f"Failed to insert row {i}: {e}")
        conn.rollback()  # ensures DB is not locked for future rows

conn.commit()
cur.close()
conn.close()

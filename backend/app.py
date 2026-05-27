from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from dotenv import load_dotenv
from bson.objectid import ObjectId

import os

# LOAD ENV
load_dotenv()

# FLASK APP
app = Flask(__name__)

# ENABLE CORS
CORS(app)

# MONGO CONNECTION
client = MongoClient(
    os.getenv("MONGO_URI")
)

db = client["ecommerceDB"]

collection = db["products"]

# =========================================
# HOME
# =========================================

@app.route("/")
def home():

    return jsonify({
        "message": "Backend running ✅"
    })

# =========================================
# GET PRODUCTS
# =========================================

@app.route("/products", methods=["GET"])
def get_products():

    products = []

    for item in collection.find():

        item["_id"] = str(item["_id"])

        products.append(item)

    return jsonify(products)

# =========================================
# ADD PRODUCT
# =========================================

@app.route("/add-product", methods=["POST"])
def add_product():

    data = request.json

    product = {

        "name": data.get("name"),

        "brand": data.get("brand"),

        "category": data.get("category"),

        "description": data.get("description"),

        "price": data.get("price"),

        "stock": data.get("stock"),

        "rating": data.get("rating"),

        "discount": data.get("discount"),

        # MAIN IMAGE
        "image": data.get("image"),

        # MULTIPLE IMAGES
        "images": data.get("images", [])

    }

    collection.insert_one(product)

    return jsonify({
        "message": "Product added successfully"
    })

# =========================================
# UPDATE PRODUCT
# =========================================

@app.route(
    "/update-product/<id>",
    methods=["PUT"]
)
def update_product(id):

    data = request.json

    try:

        updated_product = {

            "name": data.get("name"),

            "brand": data.get("brand"),

            "category": data.get("category"),

            "description": data.get("description"),

            "price": data.get("price"),

            "stock": data.get("stock"),

            "rating": data.get("rating"),

            "discount": data.get("discount"),

            # MAIN IMAGE
            "image": data.get("image"),

            # MULTIPLE IMAGES
            "images": data.get("images", [])

        }

        collection.update_one(

            {"_id": ObjectId(id)},

            {
                "$set": updated_product
            }
        )

        return jsonify({
            "message": "Product updated successfully"
        })

    except Exception as e:

        return jsonify({
            "error": str(e)
        }), 500

# =========================================
# DELETE PRODUCT
# =========================================

@app.route(
    "/delete-product/<id>",
    methods=["DELETE"]
)
def delete_product(id):

    try:

        collection.delete_one(
            {"_id": ObjectId(id)}
        )

        return jsonify({
            "message": "Product deleted successfully"
        })

    except Exception as e:

        return jsonify({
            "error": str(e)
        }), 500

# =========================================
# RUN SERVER
# =========================================

if __name__ == "__main__":

    app.run(
    host="0.0.0.0",
    port=int(os.environ.get("PORT", 5000))
)
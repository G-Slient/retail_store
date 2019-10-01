from flask import request, jsonify, Flask
from flask_cors import CORS, cross_origin
from math import radians, cos, sin, asin, sqrt
import pymongo
import collections
import random
import ast
import pandas as pd
import warnings
import datetime
import matplotlib.pyplot as plt
import seaborn as sns
plt.style.use("fivethirtyeight")
warnings.simplefilter('ignore')

app = Flask(__name__)
client = pymongo.MongoClient("mongodb://admin:admin@190.168.43.68:27017/item_catalog")

combos = pd.read_csv("combos.csv")
combos['items'] = combos['items'].apply(lambda x: ast.literal_eval(x))
combos['item_base'] = combos['item_base'].apply(lambda x: ast.literal_eval(x))
combos['item_add'] = combos['item_add'].apply(lambda x: ast.literal_eval(x))
combos_2 = combos[combos['item_length'] == 2]
combos_2.reset_index(drop=True)


def haversine(lon1, lat1, lon2, lat2):
    """
    Calculate the great circle distance between two points
    on the earth (specified in decimal degrees)
    """
    # convert decimal degrees to radians
    lon1, lat1, lon2, lat2 = map(radians, [lon1, lat1, lon2, lat2])

    # haversine formula
    dlon = lon2 - lon1
    dlat = lat2 - lat1
    a = sin(dlat/2)**2 + cos(lat1) * cos(lat2) * sin(dlon/2)**2
    c = 2 * asin(sqrt(a))
    r = 6371  # Radius of earth in kilometers. Use 3956 for miles
    return c * r


def find_item_add(item_name):
    for i, row in combos_2.iterrows():
        # print(row['item_base'])
        if item_name.lower() in row['item_base']:
            return row['item_add'][0].upper()
    return "-1"


@app.route('/get_item', methods=['GET'])
def get_item():
    result = {
        "error_code": 0
    }

    if request.method == 'GET':
        db = client['item_catalog']
        item_id = request.args['id']
        store_id = request.args['store_id']
        print(item_id, store_id)
        ldict = {}
        col = db[store_id]
        if col.find_one({"id": item_id}, {"name": 1, "price": 1, "offer_id": 1}):
            value = col.find_one({"id": item_id}, {"name": 1, "price": 1, "offer_id": 1})
            result['item_id'] = item_id
            result['name'] = value['name']
            result['price'] = value['price']
            result['offer_id'] = value['offer_id']
            result['item_add'] = find_item_add(value['name'])

            return jsonify(result)
        result['error_code'] = 1
        return jsonify(result)
    else:
        result['error_code'] = 1
        return jsonify(result)


@app.route('/mall_recommend', methods=['GET'])
def mall_recommend():
    result = {
        "error_code": 0
    }

    if request.method == 'GET':
        db = client['item_catalog']
        item_list = request.args['list'].split(",")
        print(item_list)
        col = db['shopping_lists']
        col.insert_one({
            "items": item_list
        })

        ldict = {}
        for store in db.list_collection_names():
            if "store_" in store:
                col = db[store]
                ldict[store] = 0  # [0, 0]

                for item_name in item_list:
                    if col.find({"name": item_name.upper()}).count() >= 1:
                        ldict[store] += 1  # [0]
        sorted_ldict = sorted(ldict.items(), key=lambda kv: kv[1], reverse=True)
        sorted_ldict = collections.OrderedDict(sorted_ldict)
        print(sorted_ldict)

        result = {
            'store_ids': list(sorted_ldict.keys()),
            'items_found': list(sorted_ldict.values()),
        }
        return jsonify(result)
    else:
        result['error_code'] = "Only POST request allowed."
        return jsonify(result)


@app.route('/combo_recommend', methods=['GET'])
def combo_recommend():
    result = {
        "error_code": 0
    }

    if request.method == 'GET':
        db = client['item_catalog']
        item_list = request.args['list'].split(",")
        item_list = [i.lower() for i in item_list]
        lift_threshold = 0
        items_add = []
        for i, row in combos.iterrows():
            list_1 = list(row['item_base'])
            list_2 = item_list
            if len(list_2) > len(list_1):
                list_1, list_2 = list_2, list_1
            if (set(list_2).issubset(set(list_1))) & (row['lift'] > lift_threshold):
                items_add.append(list(row['item_add'])[0])
        items_add = list(set(items_add))
        print(items_add)
        result = {
            'items_add': items_add,
        }
        return jsonify(result)
    else:
        result['error_code'] = "Only POST request allowed."
        return jsonify(result)


@app.route('/transaction_complete', methods=['GET'])
def transaction_complete():
    result = {
        "success": 0
    }

    if request.method == 'GET':
        db = client['item_catalog']
        value = ast.literal_eval(request.args['complete_data'])
        print(value)
        # transaction_id = request.args['complete_data']['transaction_id']
        user_id = value['userid']
        current_date = datetime.datetime.now()

        date_time = {
            "second": current_date.second,
            "minute": current_date.minute,
            "hour": current_date.hour,
            "day": current_date.day,
            "month": current_date.month,
            "year": current_date.year,
        }
        date = str(current_date.day) + str(current_date.month) + str(current_date.year)
        store_id = value['shop_id']
        total_bill_price = value['total_bill_price']
        discount_price = value['discount_price']
        transaction_id = "S" + str(store_id.split("_")[1]) + str(random.randint(10, 20)) + "U" + user_id + str(random.randint(1000, 9999))
        item_list = value['item_ids']   #.split(",")
        quantity = value['quantity']   #.split(",")
        col = db[store_id]
        price = [col.find_one({"id": item_list[i]}, {"price": 1})['price'] for i in range(len(item_list))]
        transaction = {
            "transaction_id": transaction_id,
            "user_id": user_id,
            "date": date,
            "date_time": date_time,
            "store_id": store_id,
            "total_bill_price": total_bill_price,
            "discount_price": discount_price,
            "items": [{
                    "id": item_list[i],
                    "quantity": quantity[i],
                    "price": price[i]
                } for i in range(len(item_list))],
        }
        col = db['transactions']
        print(transaction)
        col.insert_one(transaction)

        hashable_string = str(user_id) + "_" + str(current_date.second) + str(current_date.minute) + str(current_date.hour) + \
                          str(current_date.day) + str(current_date.month) + str(current_date.year)
        hashed_string = str(hash(hashable_string))
        col = db['completed_transactions']
        col.insert_one({"hash": hashed_string})

        result = {
            'hashed_string': hashed_string,
            'success': 1,
        }

        return jsonify(result)
    else:
        result['error_code'] = "Only POST request allowed."
        return jsonify(result)


@app.route('/check_hash', methods=['GET'])
def check_hash():
    result = {
        "success": "0"
    }

    if request.method == 'GET':
        db = client['item_catalog']
        hash_check = request.args['hash']
        col = db['completed_transactions']
        if col.find({"hash": str(hash_check)}, {"hash": 1}).count() >= 1:
            result['success'] = "1"
            return jsonify(result)
        return jsonify(result)
    else:
        result['success'] = "0"
        return jsonify(result)


@app.route('/most_needed_items', methods=['GET'])
def most_needed_items():
    result = {
        "success": 0
    }

    if request.method == 'GET':
        db = client['item_catalog']
        col = db['shopping_lists']

        store_id = request.args['store_id']
        col1 = db[store_id]

        item_dict = {}
        for sh_list in col.find():
            for item in sh_list['items']:
                if item in item_dict.keys():
                    item_dict[item] += 1
                else:
                    item_dict[item] = 1

        item_dict_copy = item_dict.copy()

        for item_name in item_dict_copy.keys():
            if col1.find({"name": item_name.upper()}).count() >= 1:
                del item_dict[item_name]

        sorted_item_dict = sorted(item_dict.items(), key=lambda kv: kv[1], reverse=True)
        sorted_item_dict = collections.OrderedDict(sorted_item_dict)
        if len(sorted_item_dict.keys()) >= 1:
            plt.figure(figsize=(18, 8))
            sns.barplot(list(sorted_item_dict.keys()), list(sorted_item_dict.values()))
            plt.xlabel("Item Identifier")
            plt.ylabel("Item Need Count")
            plt.savefig("most_items_needed.png")
            plt.close()
        result = {
            'store_ids': list(sorted_item_dict.keys()),
            'items_found': list(sorted_item_dict.values()),
            'image_name': 'most_items_needed.png',
            'success': 1,
        }

        return jsonify(result)
    else:
        result['error_code'] = "Only POST request allowed."
        return jsonify(result)


@app.route('/most_bought_items', methods=['GET'])
def most_bought_items():
    result = {
        "success": 0
    }

    if request.method == 'GET':
        db = client['item_catalog']
        store_id = request.args['store_id']
        col = db['transactions']
        current_date = datetime.datetime.now()
        date = str(current_date.day) + str(current_date.month) + str(current_date.year)

        item_dict = {}
        for items in col.find({"store_id": store_id, "date": date}, {"items": 1}):  #
            print(items['items'])
            for item in items['items']:
                if item['id'] not in item_dict.keys():
                    item_dict[item['id']] = [int(item['quantity']), item['price']]
                else:
                    item_dict[item['id']][0] += int(item['quantity'])

        for key, value in item_dict.items():
            item_dict[key][1] = item_dict[key][1] * item_dict[key][0]

        sorted_item_dict = sorted(item_dict.items(), key=lambda kv: kv[1][0], reverse=True)
        sorted_item_dict = collections.OrderedDict(sorted_item_dict)

        if len(sorted_item_dict.keys()) >= 1:
            plt.figure(figsize=(8, 4))
            sns.barplot(list(sorted_item_dict.keys()), [item_dict[i][0] for i in sorted_item_dict.keys()])
            plt.xlabel("Item Identifier")
            plt.ylabel("Item Bought Count")
            plt.savefig("most_items_bought.png")
            plt.close()
        result = {
            'item_names': list(sorted_item_dict.keys()),
            'item_quantities': [item_dict[i][0] for i in sorted_item_dict.keys()],
            'item_prices': [item_dict[i][1] for i in sorted_item_dict.keys()],
            'image_name': 'most_items_bought.png',
            'success': 1,
        }

        return jsonify(result)
    else:
        result['error_code'] = "Only POST request allowed."
        return jsonify(result)


@app.route('/assoc_rules', methods=['GET'])
def assoc_rules():
    result = {
        "success": 0
    }

    if request.method == 'GET':
        result = {
            'rule_1': {
                "item_base": combos['item_base'].iloc[0],
                "item_add": combos['item_add'].iloc[0],
                'lift': combos['lift'].iloc[0],
            },
            'rule_2': {
                "item_base": combos['item_base'].iloc[1],
                "item_add": combos['item_add'].iloc[1],
                'lift': combos['lift'].iloc[1],
            },
            'rule_3': {
                "item_base": combos['item_base'].iloc[2],
                "item_add": combos['item_add'].iloc[2],
                'lift': combos['lift'].iloc[2],
            },
            'rule_4': {
                "item_base": combos['item_base'].iloc[3],
                "item_add": combos['item_add'].iloc[3],
                'lift': combos['lift'].iloc[3],
            },
            'rule_5': {
                "item_base": combos['item_base'].iloc[4],
                "item_add": combos['item_add'].iloc[4],
                'lift': combos['lift'].iloc[4],
            },
            'success': 1,
        }

        return jsonify(result)
    else:
        result['error_code'] = "Only POST request allowed."
        return jsonify(result)


if __name__ == "__main__":
    # init()
    CORS(app)
    app.run(host='0.0.0.0', port=5000, debug=True)

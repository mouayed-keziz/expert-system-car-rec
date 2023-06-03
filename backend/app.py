import os
from flask import Flask, jsonify, request
from flask_cors import CORS
from main import API_ENDPOINT


app = Flask(__name__)
CORS(app)


@app.route('/', methods=["POST"])
def hello_world():
    data = request.get_json()
    country = data.get("country")
    carType = data.get("cartype")
    fuel = data.get("fuel")
    money = data.get("money")
    print("-------------------")
    print(country, carType, fuel, money)
    result = API_ENDPOINT(country, carType, fuel, money)
    if result == "no idea":
        return jsonify({"name": "no idea", "img": "https://media.makeameme.org/created/nothing-absolutely-nothing-37ab272bb4.jpg"})
    else:
        dict = {
            "mercides class S": "https://i.gaw.to/vehicles/photos/40/23/402332-2021-mercedes-benz-s-class.jpg",
            "Peugot E-208": "https://images.frandroid.com/wp-content/uploads/2022/11/peugeot-e208-00002.jpeg",
            "Tesla model 3": "https://www.largus.fr/images/2023-04/Tesla-Model-3-grande-autonomie-propulsion-noire-1_14.jpg",
            "Audi_Rs3": "https://www.motorlegend.com/images-voiture/large/audi-rs3-iii-sportback-2-5-tfsi-400-ch-133917.jpg",
            "Toyota Hilux": "https://i0.wp.com/rayhaber.com/wp-content/uploads/2021/11/toyota-hilux-uluslararasi-pick-up-odulunu-kazandi.jpg?fit=1780%2C1000&ssl=1",
            "mercides class A": "https://images.caradisiac.com/logos/0/0/5/8/270058/S8-mercedes-classe-a-3-la-fiche-fiabilite-express-de-caradisiac-194156.jpg",

        }
        return {"name": result, "img": dict[result]}


if __name__ == '__main__':
    app.run(debug=True)
    os.system("cls")
